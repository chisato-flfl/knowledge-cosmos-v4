"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Book, RelatedBook } from "@/lib/types";

interface RelatedBookPanelProps {
  relatedBooks: RelatedBook[];
  allBooks: Book[];
  onClose: () => void;
  selectedBook?: Book | null;
}

export default function RelatedBookPanel({
  relatedBooks,
  allBooks,
  onClose,
  selectedBook,
}: RelatedBookPanelProps) {
  const getBook = (id: string) => allBooks.find((b) => b.id === id);

  const displayBooks =
    selectedBook && relatedBooks.length === 0
      ? [
          {
            bookId: selectedBook.id,
            title: selectedBook.title,
            relevance: `あなたはこの本と出会っていました`,
            questions: selectedBook.questions,
          },
        ]
      : relatedBooks;

  return (
    <motion.div
      className="glass-card rounded-2xl overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ width: "320px", maxHeight: "calc(100vh - 160px)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-violet-400">✦</span>
          <span className="text-sm font-medium text-slate-200">
            {relatedBooks.length > 0 ? "共鳴した本" : selectedBook?.title ?? "本の詳細"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-600 hover:text-slate-400 transition-colors text-sm"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 240px)" }}>
        <div className="p-4 space-y-4">
          {displayBooks.map((rb, idx) => {
            const book = getBook(rb.bookId);
            const color = book?.color ?? "#7c3aed";
            const keywords = book?.keywords ?? [];

            return (
              <motion.div
                key={rb.bookId}
                className="space-y-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
              >
                {/* Book header */}
                <div className="flex items-start gap-3">
                  {/* Planet icon */}
                  <div
                    className="flex-shrink-0 rounded-full mt-0.5"
                    style={{
                      width: 28,
                      height: 28,
                      background: `radial-gradient(circle at 35% 35%, ${color}ff, ${color}66)`,
                      boxShadow: `0 0 12px 4px ${color}40`,
                    }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-100 leading-snug">
                      {rb.title || book?.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {rb.relevance}
                    </p>
                  </div>
                </div>

                {/* Keywords */}
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pl-10">
                    {keywords.slice(0, 4).map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: `${color}18`,
                          border: `1px solid ${color}30`,
                          color: `${color}cc`,
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}

                {/* Questions — the heart of the product */}
                <div className="pl-10 space-y-2.5">
                  <p className="text-[10px] text-slate-600 tracking-widest">
                    AIからの問い
                  </p>
                  {rb.questions.map((q, qi) => (
                    <motion.blockquote
                      key={qi}
                      className="relative pl-3 text-xs text-slate-300 leading-relaxed italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.12 + qi * 0.1 + 0.2 }}
                    >
                      <span
                        className="absolute left-0 top-0 text-violet-500 not-italic"
                        style={{ fontSize: "16px", lineHeight: 1 }}
                      >
                        "
                      </span>
                      {q}
                    </motion.blockquote>
                  ))}
                </div>

                {/* Divider */}
                {idx < displayBooks.length - 1 && (
                  <div className="border-t border-white/5 pt-2" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer message */}
        <div className="px-5 py-4 border-t border-white/5">
          <p className="text-[11px] text-slate-600 text-center leading-relaxed">
            AIは答えを出しません。
            <br />
            問いの中に、あなたの答えがあります。
          </p>
        </div>
      </div>
    </motion.div>
  );
}
