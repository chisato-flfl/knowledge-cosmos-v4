// Rule-based question recommendation engine.
// When ANTHROPIC_API_KEY is available, the API route uses Claude instead.

const LEARNING_QUESTIONS = [
  "なぜ私は学び続けたいのだろう？",
  "学ぶことと、生きることはどう繋がっているのだろう？",
  "本当に「知る」とは何だろう？",
  "知れば知るほど、わからないことが増えていないだろうか？",
  "誰かに伝えられない知識は、知識だろうか？",
];

const FREEDOM_QUESTIONS = [
  "自由とは、何かからの解放だろうか、それとも何かへ向かう力だろうか？",
  "なぜ私は自由を求めるのだろう？",
  "責任と自由は、どう結びついているのだろう？",
  "自由になったとき、私は何をするだろう？",
  "自由でない状態に、まだ気づいていないことはないだろうか？",
];

const LIBERAL_ARTS_QUESTIONS = [
  "なぜ私は学び続けたいのだろう？",
  "知識と自由は、どう関係しているのだろう？",
  "自分らしい生き方とは何だろう？",
  "何のために知識を得るのだろう？",
  "教養が人を変えるとしたら、どう変えるのだろう？",
];

const LIFE_QUESTIONS = [
  "人生に意味はあるのだろうか？あるとしたら、誰が決めるのだろう？",
  "どう生きたいのだろう？",
  "後悔しない選択とは、何だろう？",
  "人生の中で、何を残したいのだろう？",
  "今の自分は、未来の自分に何を伝えたいだろう？",
];

const WORK_QUESTIONS = [
  "何のために働くのだろう？",
  "仕事と生きがいは、同じでなければならないだろうか？",
  "もし生活に困らなければ、今の仕事を続けるだろうか？",
  "好きなことと、できることはどちらを選ぶべきだろう？",
  "働くことは、人を豊かにするだろうか、それとも消耗させるだろうか？",
];

const CAREER_QUESTIONS = [
  "何が変わることを恐れているのだろう？",
  "今の自分は、5年前の自分が想像していた自分だろうか？",
  "選ばなかった道を、なぜ気にするのだろう？",
  "成功とは、誰にとっての成功だろう？",
  "この迷いは、何かに気づくためのサインだろうか？",
];

const MONEY_QUESTIONS = [
  "お金とは、何を象徴しているのだろう？",
  "豊かさとは、何だろう？",
  "お金があれば、何が変わるのだろう？",
  "何のためにお金を使いたいのだろう？",
  "お金と幸せは、どう関係しているのだろう？",
];

const HAPPINESS_QUESTIONS = [
  "幸せとは、状態だろうか、それとも向かう先だろうか？",
  "今の自分は幸せだろうか？幸せかどうか、どうやってわかるのだろう？",
  "幸せになることと、幸せでいることは違うだろうか？",
  "他者の幸せと、自分の幸せはどう関係するのだろう？",
  "幸せを求めることが、不幸を生むことはないだろうか？",
];

const PHILOSOPHY_QUESTIONS = [
  "考えることは、生きることとどう違うのだろう？",
  "問いに答えがなくても、問い続ける意味はあるだろうか？",
  "真実とは何だろう？どうやって知ることができるのだろう？",
  "自分の信念は、本当に自分のものだろうか？",
  "なぜ人は哲学を必要とするのだろう？",
];

const TIME_QUESTIONS = [
  "時間は有限だということを、本当に感じているだろうか？",
  "今していることは、時間をかけるだけの価値があるだろうか？",
  "過去は変えられないが、過去の意味は変えられるだろうか？",
  "急いでいる理由は、本当は何だろう？",
  "時間を使うことと、時間を生きることは違うだろうか？",
];

const TECH_QUESTIONS = [
  "テクノロジーは人を自由にするだろうか、それとも縛るだろうか？",
  "AIが答えを出せる世界で、問いを持つことの意味は何だろう？",
  "人間にしかできないことは、何だろう？",
  "テクノロジーの発展は、人を幸せにするだろうか？",
  "自分はテクノロジーを使っているか、使われているか？",
];

const CHANGE_QUESTIONS = [
  "何が変わることを恐れているのだろう？",
  "変化しない自分と、変化した自分は、同じ人だろうか？",
  "変わることと、成長することは同じだろうか？",
  "変えてはいけないものは、あるだろうか？",
  "変化を求めているのは、今に不満があるからだろうか？",
];

const SOLITUDE_QUESTIONS = [
  "一人でいることと、孤独でいることは違うだろうか？",
  "孤独は、何かを教えてくれているのだろうか？",
  "誰かといるとき、なぜ孤独を感じることがあるのだろう？",
  "自分と向き合う時間は、十分にあるだろうか？",
  "孤独を恐れているとしたら、何を恐れているのだろう？",
];

const RELATIONSHIP_QUESTIONS = [
  "他者を理解することは、本当にできるのだろうか？",
  "人はなぜ繋がりを求めるのだろう？",
  "関係が変わるとき、何が変わっているのだろう？",
  "受け入れることと、許すことは違うだろうか？",
  "誰かのために生きることと、自分のために生きることは矛盾するだろうか？",
];

const SELF_QUESTIONS = [
  "自分とは、何だろう？",
  "「本当の自分」は存在するだろうか？",
  "自分を変えたいとき、何を変えたいのだろう？",
  "他者から見える自分と、自分が感じる自分は同じだろうか？",
  "自分を好きになるとは、どういうことだろう？",
];

const MEANING_QUESTIONS = [
  "何のために生きているのだろう？",
  "意味は与えられるものだろうか、自分で作るものだろうか？",
  "目的のない時間は、無駄だろうか？",
  "やりがいとは、何が与えてくれるのだろう？",
  "意味を問うこと自体に、意味はあるだろうか？",
];

const SOCIETY_QUESTIONS = [
  "社会のために生きることと、自分のために生きることは矛盾するだろうか？",
  "世界は変えられるだろうか？変えるべきだろうか？",
  "今の社会のルールは、誰が決めたのだろう？",
  "一人の人間が社会に与える影響は、どれくらいあるのだろう？",
  "正しさとは、誰が決めるのだろう？",
];

const FUTURE_QUESTIONS = [
  "未来を考えるとき、何を望んでいるのだろう？",
  "不確実な未来に向かって、どう生きればいいだろう？",
  "今の選択は、10年後の自分にどう映るだろう？",
  "未来への不安と、未来への期待はどちらが大きいだろう？",
  "準備することと、今を生きることはどう両立するだろう？",
];

const HISTORY_QUESTIONS = [
  "過去から学ぶとは、どういうことだろう？",
  "歴史は繰り返すとしたら、何が変わらないのだろう？",
  "今の自分は、過去のどんな選択の積み重ねだろう？",
  "過去を変えられなくても、過去の意味は変えられるだろうか？",
  "人類が積み重ねてきたものを、私はどう受け継ぐだろう？",
];

const BOOKS_QUESTIONS = [
  "本を読むことは、自分をどう変えるだろう？",
  "なぜ今の自分はこの問いに引き寄せられたのだろう？",
  "著者との対話から、私は何を探しているのだろう？",
  "読んだ言葉は、どこへ行くのだろう？",
  "本が問いかけてくれることと、人が問いかけてくれることは違うだろうか？",
];

const GROWTH_QUESTIONS = [
  "成長とは何だろう？誰にとっての成長だろう？",
  "変わることと、成長することは同じだろうか？",
  "成長を求めることが、今の自分を否定することにならないだろうか？",
  "何のために成長したいのだろう？",
  "成長しない選択は、できるだろうか？",
];

const ANXIETY_QUESTIONS = [
  "この不安は、何から来ているのだろう？",
  "恐れていることが実現したとして、本当にそれは最悪だろうか？",
  "不安は、何かを教えてくれているのだろうか？",
  "不安なまま動くことは、できるだろうか？",
  "安心とは、何が与えてくれるのだろう？",
];

const CREATIVITY_QUESTIONS = [
  "何かを作ることの喜びは、何から来るのだろう？",
  "創造とは、新しいものを生むことだろうか、それとも再発見だろうか？",
  "自分の内側にあるものを、どうやって外に出すだろう？",
  "美しさとは何だろう？誰が決めるのだろう？",
  "表現したいものは、何だろう？",
];

const CAPITALISM_QUESTIONS = [
  "資本主義の中で、私はどう生きたいのだろう？",
  "豊かさとは、何だろう？数字で表せるものだろうか？",
  "経済成長と人間の幸福は、どう関係しているのだろう？",
  "消費することと、生きることはどう違うのだろう？",
  "お金に換算できない価値とは、何だろう？",
];

const HUMAN_QUESTIONS = [
  "人間とは何だろう？他の生き物とどう違うのだろう？",
  "知性は人を豊かにするだろうか？",
  "歴史の流れの中で、今の自分はどこにいるのだろう？",
  "人類として受け継いできたものを、私はどう次へ渡すだろう？",
  "人間であることの、誇りと重さは何だろう？",
];

export const FALLBACK_QUESTIONS = [
  "この問いは、なぜ今の私に浮かんだのだろう？",
  "この問いの奥に、何があるのだろう？",
  "もし答えがわかったとして、何が変わるのだろう？",
  "この問いを誰かに話したら、何が起こるだろう？",
  "この問いは、10年後の自分にも大切だろうか？",
];

// Keyword → questions mapping (multiple keys can point to the same array)
const KEYWORD_QUESTIONS: Record<string, string[]> = {
  自由: FREEDOM_QUESTIONS,
  学び: LEARNING_QUESTIONS,
  学習: LEARNING_QUESTIONS,
  勉強: LEARNING_QUESTIONS,
  教育: LEARNING_QUESTIONS,
  知識: LEARNING_QUESTIONS,
  リベラルアーツ: LIBERAL_ARTS_QUESTIONS,
  教養: LIBERAL_ARTS_QUESTIONS,
  人生: LIFE_QUESTIONS,
  生き方: LIFE_QUESTIONS,
  生きる: LIFE_QUESTIONS,
  仕事: WORK_QUESTIONS,
  働く: WORK_QUESTIONS,
  働き方: WORK_QUESTIONS,
  転職: CAREER_QUESTIONS,
  キャリア: CAREER_QUESTIONS,
  就職: CAREER_QUESTIONS,
  お金: MONEY_QUESTIONS,
  金銭: MONEY_QUESTIONS,
  資産: MONEY_QUESTIONS,
  資本: CAPITALISM_QUESTIONS,
  資本主義: CAPITALISM_QUESTIONS,
  経済: CAPITALISM_QUESTIONS,
  幸福: HAPPINESS_QUESTIONS,
  幸せ: HAPPINESS_QUESTIONS,
  哲学: PHILOSOPHY_QUESTIONS,
  思想: PHILOSOPHY_QUESTIONS,
  存在: PHILOSOPHY_QUESTIONS,
  時間: TIME_QUESTIONS,
  AI: TECH_QUESTIONS,
  テクノロジー: TECH_QUESTIONS,
  技術: TECH_QUESTIONS,
  デジタル: TECH_QUESTIONS,
  変化: CHANGE_QUESTIONS,
  変わる: CHANGE_QUESTIONS,
  変革: CHANGE_QUESTIONS,
  孤独: SOLITUDE_QUESTIONS,
  一人: SOLITUDE_QUESTIONS,
  人間関係: RELATIONSHIP_QUESTIONS,
  他者: RELATIONSHIP_QUESTIONS,
  コミュニティ: RELATIONSHIP_QUESTIONS,
  自己: SELF_QUESTIONS,
  自分: SELF_QUESTIONS,
  アイデンティティ: SELF_QUESTIONS,
  意味: MEANING_QUESTIONS,
  目的: MEANING_QUESTIONS,
  生きがい: MEANING_QUESTIONS,
  社会: SOCIETY_QUESTIONS,
  世界: SOCIETY_QUESTIONS,
  未来: FUTURE_QUESTIONS,
  歴史: HISTORY_QUESTIONS,
  過去: HISTORY_QUESTIONS,
  本: BOOKS_QUESTIONS,
  読書: BOOKS_QUESTIONS,
  成長: GROWTH_QUESTIONS,
  不安: ANXIETY_QUESTIONS,
  恐れ: ANXIETY_QUESTIONS,
  心配: ANXIETY_QUESTIONS,
  創造: CREATIVITY_QUESTIONS,
  芸術: CREATIVITY_QUESTIONS,
  人類: HUMAN_QUESTIONS,
  人間: HUMAN_QUESTIONS,
};

export function recommendQuestions(
  worry: string,
  bookKeywords: string[]
): string[] {
  const collected: string[] = [];
  const seen = new Set<string>();

  const addUp = (questions: string[], limit: number) => {
    let n = 0;
    for (const q of questions) {
      if (n >= limit) break;
      if (!seen.has(q)) {
        collected.push(q);
        seen.add(q);
        n++;
      }
    }
  };

  // Priority 1: keywords found directly in the worry text
  for (const [key, questions] of Object.entries(KEYWORD_QUESTIONS)) {
    if (worry.includes(key)) {
      addUp(questions, 3);
    }
  }

  // Priority 2: keywords from related books
  if (collected.length < 5) {
    for (const [key, questions] of Object.entries(KEYWORD_QUESTIONS)) {
      if (
        bookKeywords.some(
          (bk) => bk === key || bk.includes(key) || key.includes(bk)
        )
      ) {
        addUp(questions, 1);
      }
    }
  }

  // Priority 3: universal fallback
  if (collected.length < 4) {
    addUp(FALLBACK_QUESTIONS, 4 - collected.length);
  }

  return collected.slice(0, 5);
}
