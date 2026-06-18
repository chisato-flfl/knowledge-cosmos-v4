import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { MOCK_BOOKS, generateBookFromTitle } from "@/lib/mockData";
import { Book } from "@/lib/types";

const BOOK_COLORS = [
  "#7c3aed",
  "#3b82f6",
  "#a855f7",
  "#6366f1",
  "#8b5cf6",
  "#0ea5e9",
  "#d946ef",
  "#2dd4bf",
  "#f59e0b",
  "#ec4899",
];

async function generateMetadataWithAI(title: string, index: number): Promise<Book> {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 600,
    system: `あなたは読書体験を哲学的に深める案内人です。
本のキーワード、テーマ、問いを生成します。
「問い」は答えを押しつけず、読者自身が内省できるものにしてください。`,
    messages: [
      {
        role: "user",
        content: `「${title}」という本について、以下のJSON形式で情報を生成してください:
{
  "keywords": ["キーワード1", "キーワード2", "キーワード3", "キーワード4", "キーワード5"],
  "themes": ["テーマ1", "テーマ2", "テーマ3"],
  "questions": ["問い1？", "問い2？", "問い3？"]
}
keywordsは本の核心概念を5個、themesは大きなテーマを3個、questionsは読者への内省的な問いを3個。
JSONのみを返してください。`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

  return {
    id: `book-${Date.now()}-${index}`,
    title,
    keywords: parsed.keywords ?? ["思想", "人生", "学び", "成長", "変化"],
    themes: parsed.themes ?? ["哲学", "自己成長", "人生"],
    questions: parsed.questions ?? [
      `「${title}」があなたに問いかけていることは何ですか？`,
      "この本と出会ったとき、あなたは何を求めていましたか？",
    ],
    color: BOOK_COLORS[index % BOOK_COLORS.length],
    size: 14 + Math.floor(Math.random() * 6),
  };
}

export async function POST(req: NextRequest) {
  try {
    const { titles } = await req.json() as { titles: string[] };

    if (!titles || !Array.isArray(titles)) {
      return NextResponse.json({ error: "titles array required" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    const books: Book[] = await Promise.all(
      titles.map(async (title: string, index: number) => {
        const mockBook = MOCK_BOOKS.find(
          (b) => b.title === title || title.includes(b.title) || b.title.includes(title)
        );

        if (mockBook) {
          return { ...mockBook, id: `${mockBook.id}-${Date.now()}` };
        }

        if (apiKey) {
          try {
            return await generateMetadataWithAI(title, index);
          } catch {
            return generateBookFromTitle(title, index);
          }
        }

        return generateBookFromTitle(title, index);
      })
    );

    return NextResponse.json({ books });
  } catch (error) {
    console.error("book-metadata error:", error);
    return NextResponse.json({ error: "Failed to generate metadata" }, { status: 500 });
  }
}
