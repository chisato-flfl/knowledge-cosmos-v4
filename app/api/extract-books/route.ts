import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Fallback mock titles for demo mode
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

    // Demo mode: no OpenAI key
    if (!OPENAI_API_KEY) {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return NextResponse.json({ titles: DEMO_TITLES });
    }

    // Real mode: use OpenAI Vision API
    const bytes = await imageFile.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = imageFile.type || "image/jpeg";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:${mimeType};base64,${base64}` },
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
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content ?? "{}";

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ titles: [] });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ titles: parsed.titles ?? [] });
  } catch (error) {
    console.error("extract-books error:", error);
    // Fallback to demo titles on error
    return NextResponse.json({ titles: DEMO_TITLES });
  }
}
