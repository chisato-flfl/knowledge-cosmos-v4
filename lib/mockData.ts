import { Book } from "./types";

const BOOK_COLORS = [
  "#7c3aed", "#3b82f6", "#a855f7", "#6366f1", "#8b5cf6",
  "#0ea5e9", "#d946ef", "#2dd4bf", "#f59e0b", "#ec4899",
  "#ef4444", "#10b981", "#f97316", "#84cc16", "#06b6d4",
  "#8b5cf6", "#e11d48", "#0284c7", "#16a34a", "#d97706",
  "#7c3aed", "#3b82f6", "#a855f7", "#6366f1", "#8b5cf6",
  "#0ea5e9",
];

export const MOCK_BOOKS: Book[] = [
  {
    id: "newtype",
    title: "ニュータイプの時代",
    keywords: ["感性", "問題発見", "美意識", "意味", "直感"],
    themes: ["新しい思考様式", "問題発見の時代", "感性の価値"],
    questions: [
      "あなたは「正解」を求めていますか、それとも「問い」を求めていますか？",
      "意味のない豊かさと、意味のある貧しさ、どちらを選びますか？",
      "あなたが「美しい」と感じるものは、何を語っていますか？",
    ],
    color: BOOK_COLORS[0],
    size: 17,
  },
  {
    id: "philosophy14",
    title: "14歳からの哲学入門",
    keywords: ["哲学", "問い", "存在", "真理", "思考"],
    themes: ["哲学的思考", "自己探求", "世界の見方"],
    questions: [
      "「なぜ」と問い続けることを、あなたはいつやめましたか？",
      "あなたが「当たり前」と思っていることは、本当に当たり前ですか？",
      "考えることと、答えを出すことは、どう違いますか？",
    ],
    color: BOOK_COLORS[1],
    size: 15,
  },
  {
    id: "japan-asia",
    title: "日本企業 変貌するアジアでの役割と挑戦",
    keywords: ["日本企業", "アジア", "グローバル化", "変革", "競争力"],
    themes: ["ビジネス戦略", "アジアの変容", "日本の役割"],
    questions: [
      "あなたの組織は、変化を恐れていますか？それとも変化を創っていますか？",
      "グローバルな視点から見た時、あなた自身はどう見えますか？",
      "日本の強みとは何だと思いますか？",
    ],
    color: BOOK_COLORS[2],
    size: 14,
  },
  {
    id: "weapon-philosophy",
    title: "武器になる哲学",
    keywords: ["哲学", "ビジネス", "思想", "判断力", "教養"],
    themes: ["実践哲学", "知的武装", "意思決定"],
    questions: [
      "哲学を学ぶことで、何を「切り拓こう」としていますか？",
      "あなたの判断基準は、何に基づいていますか？",
      "知識と知恵の違いを、あなたはどう感じますか？",
    ],
    color: BOOK_COLORS[3],
    size: 16,
  },
  {
    id: "liberal-arts",
    title: "自由になるための技術 リベラルアーツ",
    keywords: ["リベラルアーツ", "自由", "教養", "批判的思考", "創造性"],
    themes: ["知的自由", "教養の本質", "自律した思考"],
    questions: [
      "あなたにとって「自由」とは何ですか？",
      "誰かに決められた答えではなく、自分の答えで生きていますか？",
      "教養は、あなたをどこへ連れて行きますか？",
    ],
    color: BOOK_COLORS[4],
    size: 16,
  },
  {
    id: "art-thinking",
    title: "13歳からのアート思考",
    keywords: ["アート思考", "創造性", "自己表現", "感性", "問い"],
    themes: ["創造的思考", "自己表現", "正解のない世界"],
    questions: [
      "あなたが「美しい」と感じるものに、理由はいりますか？",
      "正解のない問いに向き合うとき、あなたはどんな気持ちになりますか？",
      "子どもの頃の「なんで？」を、今も大切にしていますか？",
    ],
    color: BOOK_COLORS[5],
    size: 15,
  },
  {
    id: "geopolitics13",
    title: "13歳からの地政学",
    keywords: ["地政学", "国際関係", "地理", "権力", "資源"],
    themes: ["世界の構造", "地理と歴史", "国際政治"],
    questions: [
      "世界の出来事を、地図を広げて見たことはありますか？",
      "あなたが生まれた場所は、あなたの世界観にどう影響していますか？",
      "地球規模で考えると、あなたの悩みはどう見えますか？",
    ],
    color: BOOK_COLORS[6],
    size: 14,
  },
  {
    id: "ai-driven",
    title: "AI DRIVEN",
    keywords: ["AI", "人工知能", "デジタル変革", "未来", "テクノロジー"],
    themes: ["AI時代の働き方", "テクノロジーと人間", "変革"],
    questions: [
      "AIに任せるべきことと、人間がすべきことの境界線はどこですか？",
      "テクノロジーが進化しても変わらない、人間の本質とは何ですか？",
      "あなたはAIと協力することで、何を実現したいですか？",
    ],
    color: BOOK_COLORS[7],
    size: 15,
  },
  {
    id: "read-think",
    title: "自分の頭で考える読書",
    keywords: ["読書", "思考", "批判的思考", "知識", "自律"],
    themes: ["読書の本質", "独立した思考", "知的成長"],
    questions: [
      "本を読んだ後、あなたの考えはどう変わりましたか？",
      "誰かの言葉を鵜呑みにせず、自分で考えた経験はありますか？",
      "読書はあなたにとって、どんな旅ですか？",
    ],
    color: BOOK_COLORS[8],
    size: 14,
  },
  {
    id: "viewpoint",
    title: "視点という教養",
    keywords: ["視点", "教養", "多様性", "世界観", "観察"],
    themes: ["物の見方", "知的視野", "多角的思考"],
    questions: [
      "同じ出来事を、全く違う立場から見たことはありますか？",
      "あなたの「常識」は、誰かの「非常識」かもしれません。気づいていますか？",
      "新しい視点を得た時、あなたは何を感じますか？",
    ],
    color: BOOK_COLORS[9],
    size: 15,
  },
  {
    id: "cause-effect",
    title: "「原因」と「結果」の法則",
    keywords: ["思考", "原因と結果", "意識", "自己責任", "引き寄せ"],
    themes: ["思考の法則", "自己実現", "因果"],
    questions: [
      "今のあなたの状況は、過去のどんな思考から生まれましたか？",
      "あなたの思考のクセを、客観的に見たことはありますか？",
      "望む未来に向けて、今どんな思考を選びますか？",
    ],
    color: BOOK_COLORS[10],
    size: 16,
  },
  {
    id: "異彩",
    title: "異彩を、放て",
    keywords: ["多様性", "障がい", "アート", "個性", "インクルージョン"],
    themes: ["多様性と社会", "アートと生き方", "異彩の価値"],
    questions: [
      "「普通」という枠は、誰が決めたのでしょうか？",
      "あなたの中にある「異彩」に気づいていますか？",
      "違いは弱さですか、それとも強さですか？",
    ],
    color: BOOK_COLORS[11],
    size: 17,
  },
  {
    id: "die-with-zero",
    title: "DIE WITH ZERO",
    keywords: ["経験", "お金", "人生設計", "死", "今を生きる"],
    themes: ["人生の使い方", "経験の価値", "時間の有限性"],
    questions: [
      "あなたは死ぬ前に、何を経験したいですか？",
      "お金を残すことと、経験に使うこと、あなたはどちらを選びますか？",
      "今この瞬間の喜びを、未来のために犠牲にしていませんか？",
    ],
    color: BOOK_COLORS[12],
    size: 16,
  },
  {
    id: "study-philosophy",
    title: "勉強の哲学",
    keywords: ["勉強", "哲学", "言語", "自己変容", "欲望"],
    themes: ["学ぶことの意味", "自己変容", "知と欲望"],
    questions: [
      "学ぶことで、あなたは何者に変わりたいですか？",
      "「知らない自分」になることを、恐れていますか？",
      "勉強とは、自分を壊すことだと感じますか？",
    ],
    color: BOOK_COLORS[13],
    size: 15,
  },
  {
    id: "100books",
    title: "百冊で耕す",
    keywords: ["読書", "人生", "選書", "教養", "思考力"],
    themes: ["読書の技法", "知的耕し", "本との対話"],
    questions: [
      "あなたの人生を変えた一冊は何ですか？",
      "本を読むことで、どんな自分を育てていますか？",
      "今のあなたに必要な本は、どんなテーマですか？",
    ],
    color: BOOK_COLORS[14],
    size: 14,
  },
  {
    id: "expression",
    title: "生きるための表現手引き",
    keywords: ["表現", "自己表現", "生きること", "言葉", "アート"],
    themes: ["表現の本質", "生きることと表現", "コミュニケーション"],
    questions: [
      "あなたは今、何を表現したいですか？",
      "表現することは、あなたにとってどんな意味がありますか？",
      "言葉にできないものを、どう伝えますか？",
    ],
    color: BOOK_COLORS[15],
    size: 15,
  },
  {
    id: "buddhism",
    title: "仏教概論",
    keywords: ["仏教", "無常", "悟り", "苦", "縁起"],
    themes: ["仏教思想", "無常観", "解脱"],
    questions: [
      "すべては変わるという事実を、あなたは受け入れていますか？",
      "苦しみの根源は何だと思いますか？",
      "今この瞬間に、完全に存在することができますか？",
    ],
    color: BOOK_COLORS[16],
    size: 14,
  },
  {
    id: "silence",
    title: "静寂の技法",
    keywords: ["静寂", "内省", "マインドフルネス", "集中", "本質"],
    themes: ["静けさの力", "内なる知恵", "集中と深さ"],
    questions: [
      "騒がしい世界の中で、あなたはどこに静けさを見つけますか？",
      "沈黙の中に、どんな声が聞こえますか？",
      "立ち止まることを、あなたは許していますか？",
    ],
    color: BOOK_COLORS[17],
    size: 15,
  },
  {
    id: "art-brain",
    title: "アート脳",
    keywords: ["アート", "創造性", "感性", "右脳", "視覚"],
    themes: ["芸術的思考", "創造力", "感性と知性"],
    questions: [
      "あなたの中の「アーティスト」は、今どこにいますか？",
      "論理だけでは解けない問いに、どう向き合いますか？",
      "美を見ることは、世界を変えますか？",
    ],
    color: BOOK_COLORS[18],
    size: 15,
  },
  {
    id: "influence",
    title: "影響力の武器",
    keywords: ["影響力", "心理学", "説得", "人間行動", "社会的証明"],
    themes: ["社会心理学", "人間行動の法則", "コミュニケーション"],
    questions: [
      "あなたは誰かに影響を与えていますか？また、誰かに影響を受けていますか？",
      "「なぜそれを選んだか」を、本当に自分で決めていますか？",
      "人を動かすものは、何だと思いますか？",
    ],
    color: BOOK_COLORS[19],
    size: 16,
  },
  {
    id: "cafe-edge",
    title: "世界の果てのカフェ",
    keywords: ["目的", "人生の意味", "問い", "旅", "自己発見"],
    themes: ["人生の目的", "自己探求", "本質的な問い"],
    questions: [
      "あなたはなぜここにいるのですか？",
      "何が好きで、何をしているとき喜びを感じますか？",
      "死ぬ時に後悔しないために、今何をしますか？",
    ],
    color: BOOK_COLORS[20],
    size: 17,
  },
  {
    id: "manimani",
    title: "まにまに",
    keywords: ["詩", "言葉", "感性", "日常", "美"],
    themes: ["言葉と感性", "日常の詩", "美の発見"],
    questions: [
      "あなたの日常の中に、詩はありますか？",
      "言葉にした瞬間、消えてしまうものがあると思いますか？",
      "何気ない瞬間に、あなたは美を感じていますか？",
    ],
    color: BOOK_COLORS[21],
    size: 14,
  },
  {
    id: "capitalism-life",
    title: "資本主義と、生きていく。",
    keywords: ["資本主義", "経済", "生き方", "社会", "お金"],
    themes: ["資本主義の中の生き方", "経済と個人", "社会との向き合い方"],
    questions: [
      "資本主義の中で、あなたはどう生きていますか？",
      "お金と自由の関係を、どう考えますか？",
      "社会のルールと自分の価値観が衝突する時、あなたはどうしますか？",
    ],
    color: BOOK_COLORS[22],
    size: 15,
  },
  {
    id: "ai-think",
    title: "AIを使って考え、全技術",
    keywords: ["AI", "思考法", "テクノロジー", "プロンプト", "知的生産"],
    themes: ["AI活用", "思考の拡張", "知的生産性"],
    questions: [
      "AIを使うことで、あなたの思考はどう変わりましたか？",
      "AIに任せることと、自分で考えることの境界線はどこですか？",
      "テクノロジーは、あなたの可能性を広げていますか？",
    ],
    color: BOOK_COLORS[23],
    size: 14,
  },
  {
    id: "buddha-statue",
    title: "超図解 仏像大事典",
    keywords: ["仏像", "仏教", "美術", "歴史", "文化"],
    themes: ["仏教美術", "日本文化", "信仰と表現"],
    questions: [
      "仏像に込められた祈りを、あなたは感じたことがありますか？",
      "形のあるものに、形のないものを見たことはありますか？",
      "美術と信仰は、どこで交わりますか？",
    ],
    color: BOOK_COLORS[24],
    size: 14,
  },
  {
    id: "wind-valley",
    title: "「風の谷」という希望",
    keywords: ["コミュニティ", "自然", "持続可能性", "希望", "共生"],
    themes: ["共同体の可能性", "自然との共生", "新しい生き方"],
    questions: [
      "あなたが理想とする「場所」はどんな場所ですか？",
      "一人では生きられないことを、あなたは受け入れていますか？",
      "希望とは、あなたにとって何ですか？",
    ],
    color: BOOK_COLORS[25],
    size: 16,
  },
];

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

export function findRelatedBooksMock(
  worry: string,
  books: Book[]
): { book: Book; relevance: string; score: number }[] {
  const worryLower = worry.toLowerCase();

  const keywordMap: Record<string, string[]> = {
    転職: ["自由", "リベラルアーツ", "目的", "人生の意味"],
    仕事: ["AI", "ビジネス", "判断力", "影響力", "変革"],
    将来: ["人生設計", "目的", "美意識", "希望"],
    不安: ["自由", "哲学", "原因と結果", "静寂"],
    人間関係: ["多様性", "視点", "影響力", "インクルージョン"],
    お金: ["資本主義", "経験", "今を生きる"],
    環境: ["地政学", "自然", "共生", "持続可能性"],
    生きがい: ["目的", "意味", "感性", "アート"],
    学び: ["読書", "教養", "批判的思考", "リベラルアーツ", "自己変容"],
    変化: ["変革", "感性", "AI", "問題発見"],
    自分: ["自己表現", "個性", "哲学", "問い", "自律"],
    社会: ["多様性", "地政学", "変革", "資本主義"],
    AI: ["AI", "テクノロジー", "未来", "プロンプト"],
    哲学: ["哲学", "思想", "問い", "真理", "無常"],
    アート: ["アート思考", "感性", "創造性", "異彩", "アート"],
    死: ["死", "今を生きる", "経験", "人生の意味"],
    自由: ["自由", "リベラルアーツ", "教養", "批判的思考"],
    静かさ: ["静寂", "内省", "マインドフルネス"],
    仏教: ["仏教", "無常", "悟り", "縁起"],
  };

  const relevantKeywords = new Set<string>();
  for (const [trigger, keywords] of Object.entries(keywordMap)) {
    if (worryLower.includes(trigger)) {
      keywords.forEach((k) => relevantKeywords.add(k));
    }
  }

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
