import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Knowledge Cosmos — 自分の知識に問いかける宇宙",
  description:
    "読んだ本が星になる。あなたの悩みが光を呼ぶ。知識は点ではなく、宇宙だ。",
  openGraph: {
    title: "Knowledge Cosmos",
    description: "自分の知識に問いかける宇宙",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-[#07071a] text-slate-200 min-h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
