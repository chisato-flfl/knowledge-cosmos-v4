import { NextRequest, NextResponse } from "next/server";
import { MOCK_BOOKS, generateBookFromTitle } from "@/lib/mockData";
import { Book } from "@/lib/types";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
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
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 600,
      messages: [
        {
          role: "system",
          content: `あなたは読書体験を哲学的に深める案内人です。
本のキーワード、テーマ、問いを生成します。
「問い」は答えを押しつけず、読者自身が内省できるものにしてください。`,
        },
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
    }),
  });

  if (!response.ok) throw new Error("OpenAI error");

  const data = await response.json();
  const content = data.choices[0]?.message?.content ?? "{}";
  const jsonMatch = content.match(/\{[\s\S]*\}/);
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

    const books: Book[] = await Promise.all(
      titles.map(async (title: string, index: number) => {
        // Check if we have mock data for this title
        const mockBook = MOCK_BOOKS.find(
          (b) => b.title === title || title.includes(b.title) || b.title.includes(title)
        );

        if (mockBook) {
          return { ...mockBook, id: `${mockBook.id}-${Date.now()}` };
        }

        // Use OpenAI if available
        if (OPENAI_API_KEY) {
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
