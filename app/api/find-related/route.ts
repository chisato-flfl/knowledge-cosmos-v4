import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { findRelatedBooksMock } from "@/lib/mockData";
import { Book, FindRelatedResponse } from "@/lib/types";

async function findRelatedWithAI(
  worry: string,
  books: Book[]
): Promise<FindRelatedResponse> {
  const client = new Anthropic();

  const bookList = books
    .map((b) => `- ${b.title}（キーワード: ${b.keywords.join("、")}）`)
    .join("\n");

  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 1200,
    system: `あなたは「知識の宇宙」の案内人です。
ユーザーの悩みと本のつながりを見つけ、答えではなく「問い」を返します。
答えを出さず、ユーザー自身が内省できる問いを投げかけてください。
哲学的で、静かで、神秘的なトーンで話してください。`,
    messages: [
      {
        role: "user",
        content: `ユーザーの悩み・問い: 「${worry}」

ユーザーの本棚:
${bookList}

以下のJSON形式で回答してください:
{
  "relatedBooks": [
    {
      "bookId": "（本の正確なタイトルをそのまま使用）",
      "relevance": "この本がなぜあなたの悩みと共鳴するかの説明（1〜2文）",
      "questions": [
        "内省的な問い1？",
        "内省的な問い2？"
      ]
    }
  ],
  "cosmicQuery": "悩みを宇宙的な視点で言い換えた一文"
}

最も関連する本を1〜3冊選んでください。
relatedBooks[].bookIdは本棚にある本のタイトルと完全一致させてください。
JSONのみを返してください。`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in response");

  return JSON.parse(jsonMatch[0]);
}

export async function POST(req: NextRequest) {
  try {
    const { worry, books } = await req.json() as { worry: string; books: Book[] };

    if (!worry || !books) {
      return NextResponse.json({ error: "worry and books required" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      try {
        const result = await findRelatedWithAI(worry, books);
        const mapped = {
          ...result,
          relatedBooks: result.relatedBooks.map((rb) => {
            const matchedBook = books.find(
              (b) => b.title === rb.bookId || rb.bookId.includes(b.title)
            );
            return { ...rb, bookId: matchedBook?.id ?? rb.bookId };
          }),
        };
        return NextResponse.json(mapped);
      } catch {
        // Fall through to mock
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    const results = findRelatedBooksMock(worry, books);

    const cosmicQueries: Record<string, string> = {
      転職: "あなたは今、どの星へ向かおうとしているのでしょうか",
      仕事: "あなたの労働は、何のために輝いていますか",
      将来: "あなたの宇宙には、どんな星座を描きたいですか",
      不安: "その暗闇の中に、すでに光はありますか",
      人間関係: "あなたの周りの星々と、どんな引力で結ばれていますか",
      お金: "あなたが本当に豊かにしたいものは何ですか",
      生きがい: "あなたが燃え尽きるまで輝かせたいものは何ですか",
    };

    let cosmicQuery = "あなたの問いは、どんな宇宙の謎と共鳴していますか";
    for (const [trigger, query] of Object.entries(cosmicQueries)) {
      if (worry.includes(trigger)) {
        cosmicQuery = query;
        break;
      }
    }

    const response: FindRelatedResponse = {
      relatedBooks: results.map((r) => ({
        bookId: r.book.id,
        title: r.book.title,
        relevance: r.relevance,
        questions: r.book.questions.slice(0, 2),
      })),
      cosmicQuery,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("find-related error:", error);
    return NextResponse.json({ error: "Failed to find related books" }, { status: 500 });
  }
}
