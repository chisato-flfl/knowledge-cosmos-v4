import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const DEMO_TITLES = [
  "サピエンス全史",
  "LIFE SHIFT",
  "嫌われる勇気",
  "人新世の資本論",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return NextResponse.json({ titles: DEMO_TITLES });
    }

    const client = new Anthropic({ apiKey });

    const bytes = await imageFile.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = (imageFile.type || "image/jpeg") as
      | "image/jpeg"
      | "image/png"
      | "image/gif"
      | "image/webp";

    const response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mimeType, data: base64 },
            },
            {
              type: "text",
              text: `この本棚の写真から、見えている本の背表紙に書かれたタイトルをすべて抽出してください。
日本語の本も英語の本も含めてください。
JSONの配列形式で返してください: {"titles": ["タイトル1", "タイトル2", ...]}
タイトルのみを返し、著者名や出版社名は含めないでください。`,
            },
          ],
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ titles: [] });
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ titles: [] });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ titles: parsed.titles ?? [] });
  } catch (error) {
    console.error("extract-books error:", error);
    return NextResponse.json({ titles: DEMO_TITLES });
  }
}
