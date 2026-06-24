import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Book, RelatedBook } from "@/lib/types";
import { recommendQuestions } from "@/lib/questionRecommender";

const SYSTEM_PROMPT = `あなたは哲学的な問いを届ける「知識の宇宙」です。
ユーザーが考えていることと、共鳴した本から、「次に考えると面白そうな問い」を4〜5個提案してください。

厳守するルール:
1. 答えを出さない
2. アドバイスをしない
3. 問題解決をしない
4. 問い返しのみを行う
5. 哲学的・内省的な視点で問いかける
6. 日本語で書く
7. 各問いは1文で「〜だろうか？」「〜のだろう？」などで終わる
8. 具体的すぎず、普遍的すぎない深さを持つ

返答はJSON形式のみ（他のテキストは含めない）:
{ "questions": ["問い1", "問い2", "問い3", "問い4"] }`;

export async function POST(req: NextRequest) {
  try {
    const { worry, books, relatedBooks } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      try {
        const client = new Anthropic({ apiKey });

        const bookTitles = (relatedBooks as RelatedBook[])
          .map((rb) => rb.title)
          .join("、");

        const allKeywords = (relatedBooks as RelatedBook[])
          .flatMap((rb) => {
            const book = (books as Book[]).find((b) => b.id === rb.bookId);
            return book?.keywords ?? [];
          })
          .filter((v, i, a) => a.indexOf(v) === i)
          .slice(0, 12)
          .join("、");

        const userMessage = `ユーザーの問い: ${worry}
共鳴した本: ${bookTitles || "（なし）"}
関連キーワード: ${allKeywords || "（なし）"}

この問いと本から、次に考えると面白そうな哲学的な問いを4〜5個提案してください。`;

        const message = await client.messages.create({
          model: "claude-opus-4-7",
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        });

        const content = message.content[0];
        if (content.type === "text") {
          const jsonMatch = content.text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
              return NextResponse.json({ questions: parsed.questions });
            }
          }
        }
      } catch (err) {
        console.error("[recommend-questions] Claude API error:", err);
        // Fall through to rule-based
      }
    }

    // Rule-based fallback
    const bookKeywords = (relatedBooks as RelatedBook[]).flatMap((rb) => {
      const book = (books as Book[]).find((b) => b.id === rb.bookId);
      return book?.keywords ?? [];
    });

    const questions = recommendQuestions(worry ?? "", bookKeywords);
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("[recommend-questions] Error:", err);
    return NextResponse.json({ questions: [] }, { status: 500 });
  }
}
