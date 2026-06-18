import { Book } from "./types";

const BOOK_COLORS = [
  "#7c3aed", // purple
  "#3b82f6", // blue
  "#a855f7", // violet
  "#6366f1", // indigo
  "#8b5cf6", // purple-500
  "#0ea5e9", // sky
  "#d946ef", // fuchsia
  "#2dd4bf", // teal
  "#f59e0b", // amber (warm star)
  "#ec4899", // pink
];

export const MOCK_BOOKS: Book[] = [
  {
    id: "sapiens",
    title: "サピエンス全史",
    keywords: ["人類史", "文明", "認知革命", "農業革命", "貨幣", "宗教"],
    themes: ["人類の起源", "社会の構造", "歴史的転換点"],
    questions: [
      "あなたが当然と思っている「常識」は、いつ誰が作ったのでしょうか？",
      "7万年前の人類と今の自分に、本質的な違いはあると思いますか？",
      "人類が最も大切にしてきたものは何だと感じますか？",
    ],
    color: BOOK_COLORS[0],
    size: 18,
  },
  {
    id: "life-shift",
    title: "LIFE SHIFT",
    keywords: ["キャリア", "人生100年時代", "学び直し", "老後", "働き方"],
    themes: ["働き方", "生き方", "人生設計"],
    questions: [
      "何歳からでも人生は再設計できると、あなたは信じていますか？",
      "学び続けるとは、あなたにとってどういう意味を持ちますか？",
      "100年の人生で、今の自分はどの段階にいると感じますか？",
    ],
    color: BOOK_COLORS[1],
    size: 16,
  },
  {
    id: "嫌われる勇気",
    title: "嫌われる勇気",
    keywords: ["アドラー心理学", "承認欲求", "課題の分離", "自由", "対人関係"],
    themes: ["心理学", "対人関係", "自己肯定"],
    questions: [
      "あなたが今最も承認を求めているのは、誰からですか？",
      "「課題の分離」を実践したら、何が変わると思いますか？",
      "嫌われることを恐れずに生きた場合、最初に何をしますか？",
    ],
    color: BOOK_COLORS[2],
    size: 17,
  },
  {
    id: "人新世",
    title: "人新世の資本論",
    keywords: ["資本主義", "気候変動", "脱成長", "環境", "経済"],
    themes: ["経済思想", "環境問題", "社会変革"],
    questions: [
      "成長し続けることが幸福と直結していると思いますか？",
      "あなたの消費の一つひとつが、地球に何を残していると思いますか？",
    ],
    color: BOOK_COLORS[3],
    size: 15,
  },
  {
    id: "think-again",
    title: "Think Again",
    keywords: ["思考", "再考", "アイデンティティ", "学習", "謙虚さ"],
    themes: ["メタ認知", "学習", "意見の更新"],
    questions: [
      "最後に自分の意見を大きく変えたのはいつですか？",
      "「自分が間違っているかもしれない」と思える余地を、どれほど持っていますか？",
    ],
    color: BOOK_COLORS[4],
    size: 14,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    keywords: ["習慣", "行動変容", "小さな変化", "システム", "自己改善"],
    themes: ["行動科学", "自己啓発", "継続性"],
    questions: [
      "今の自分の習慣は、なりたい自分を形成していますか？",
      "1%の改善を積み重ねた先に、どんな自分を想像しますか？",
    ],
    color: BOOK_COLORS[5],
    size: 15,
  },
  {
    id: "ikigai",
    title: "生き甲斐",
    keywords: ["目的", "意味", "情熱", "使命", "生きがい"],
    themes: ["人生の意味", "自己実現", "哲学"],
    questions: [
      "あなたが「これのために生まれた」と感じる瞬間はありますか？",
      "情熱と社会への貢献が交わる場所を、見つけたことがありますか？",
    ],
    color: BOOK_COLORS[6],
    size: 16,
  },
];

export const DEMO_EXTRACT_TITLES = [
  "サピエンス全史",
  "LIFE SHIFT",
  "嫌われる勇気",
  "人新世の資本論",
];

// Generate a book entry from a title (for books not in our database)
export function generateBookFromTitle(title: string, index: number): Book {
  return {
    id: `book-${Date.now()}-${index}`,
    title,
    keywords: ["思想", "人生", "学び"],
    themes: ["哲学", "自己成長"],
    questions: [
      `「${title}」があなたに問いかけていることは何ですか？`,
      "この本と出会ったとき、あなたは何を求めていましたか？",
    ],
    color: BOOK_COLORS[index % BOOK_COLORS.length],
    size: 14,
  };
}

// Keyword-based semantic search (fallback when no OpenAI key)
export function findRelatedBooksMock(
  worry: string,
  books: Book[]
): { book: Book; relevance: string; score: number }[] {
  const worryLower = worry.toLowerCase();

  const keywordMap: Record<string, string[]> = {
    転職: ["キャリア", "働き方", "学び直し", "自由"],
    仕事: ["キャリア", "働き方", "習慣", "目的"],
    将来: ["人生100年時代", "人生設計", "生きがい", "目的"],
    不安: ["承認欲求", "自由", "課題の分離", "習慣"],
    人間関係: ["対人関係", "承認欲求", "課題の分離", "アドラー心理学"],
    お金: ["資本主義", "経済", "キャリア"],
    環境: ["気候変動", "資本主義", "脱成長"],
    生きがい: ["目的", "意味", "情熱", "生きがい"],
    学び: ["学び直し", "思考", "習慣", "学習"],
    変化: ["再考", "習慣", "人生設計", "小さな変化"],
    自分: ["自己肯定", "課題の分離", "アイデンティティ", "目的"],
    社会: ["文明", "資本主義", "人類史", "経済"],
    歴史: ["人類史", "文明", "認知革命"],
    幸福: ["生きがい", "承認欲求", "自由", "目的"],
  };

  const relevantKeywords = new Set<string>();
  for (const [trigger, keywords] of Object.entries(keywordMap)) {
    if (worryLower.includes(trigger)) {
      keywords.forEach((k) => relevantKeywords.add(k));
    }
  }

  // Also do simple token matching
  const worryTokens = worryLower.split(/[\s、。，．　]+/);

  return books
    .map((book) => {
      let score = 0;
      const matchedKeywords: string[] = [];

      book.keywords.forEach((kw) => {
        if (relevantKeywords.has(kw)) {
          score += 3;
          matchedKeywords.push(kw);
        }
        if (worryLower.includes(kw.toLowerCase())) {
          score += 5;
          matchedKeywords.push(kw);
        }
        worryTokens.forEach((token) => {
          if (token.length > 1 && kw.includes(token)) score += 1;
        });
      });

      book.themes.forEach((theme) => {
        if (worryLower.includes(theme.toLowerCase())) score += 2;
      });

      const relevance =
        matchedKeywords.length > 0
          ? `「${matchedKeywords[0]}」というテーマが、あなたの問いと共鳴しています`
          : `${book.themes[0]}の視点があなたの悩みと交差しています`;

      return { book, relevance, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
