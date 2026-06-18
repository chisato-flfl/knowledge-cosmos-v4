"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Book, FindRelatedResponse, RelatedBook } from "@/lib/types";
import StarField from "@/components/StarField";
import CosmosView from "@/components/CosmosView";
import BookUpload from "@/components/BookUpload";
import WorryCometInput from "@/components/WorryCometInput";
import RelatedBookPanel from "@/components/RelatedBookPanel";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const [relatedBooks, setRelatedBooks] = useState<RelatedBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleBooksExtracted = useCallback((newBooks: Book[]) => {
    setBooks((prev) => {
      // Deduplicate by title
      const existingTitles = new Set(prev.map((b) => b.title));
      const unique = newBooks.filter((b) => !existingTitles.has(b.title));
      return [...prev, ...unique];
    });
  }, []);

  const handleRelatedResult = useCallback((result: FindRelatedResponse) => {
    const ids = new Set(result.relatedBooks.map((rb) => rb.bookId));
    setHighlightedIds(ids);
    setRelatedBooks(result.relatedBooks);
    setSelectedBook(null);

    if (result.relatedBooks.length > 0) {
      setPanelOpen(true);
    }
  }, []);

  const handleBookClick = useCallback(
    (book: Book) => {
      setSelectedBook(book);
      if (relatedBooks.length === 0) {
        // Show book detail
        setPanelOpen(true);
      } else {
        // Show related panel if this book is highlighted
        if (highlightedIds.has(book.id)) {
          setPanelOpen(true);
        } else {
          setSelectedBook(book);
          setRelatedBooks([]);
          setHighlightedIds(new Set([book.id]));
          setPanelOpen(true);
        }
      }
    },
    [relatedBooks, highlightedIds]
  );

  const handleClose = useCallback(() => {
    setPanelOpen(false);
    setSelectedBook(null);
    setHighlightedIds(new Set());
    setRelatedBooks([]);
  }, []);

  const bookCount = books.length;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#07071a]">
      {/* Background */}
      <StarField count={200} />

      {/* Top bar */}
      <motion.header
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <h1 className="text-base font-semibold tracking-wider text-slate-200">
            Knowledge{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cosmos
            </span>
          </h1>
          <p className="text-[10px] text-slate-600 tracking-widest mt-0.5">
            自分の知識に問いかける宇宙
          </p>
        </div>

        {/* Book counter */}
        <AnimatePresence>
          {bookCount > 0 && (
            <motion.div
              className="glass-card rounded-full px-4 py-1.5 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="text-violet-400 text-xs">✦</span>
              <span className="text-xs text-slate-300">
                {bookCount}冊の星
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Cosmos canvas */}
      <div className="absolute inset-0 pt-16 pb-32">
        <CosmosView
          books={books}
          highlightedBookIds={highlightedIds}
          onBookClick={handleBookClick}
        />
      </div>

      {/* Side panel */}
      <div className="absolute right-4 top-16 bottom-32 z-30 flex items-center pointer-events-none">
        <AnimatePresence>
          {panelOpen && (
            <div className="pointer-events-auto">
              <RelatedBookPanel
                relatedBooks={relatedBooks}
                allBooks={books}
                onClose={handleClose}
                selectedBook={selectedBook}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <motion.footer
        className="absolute bottom-0 left-0 right-0 z-20 px-6 py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Gradient fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(7,7,26,0.95) 0%, rgba(7,7,26,0.6) 60%, transparent 100%)",
          }}
        />

        <div className="relative flex flex-col items-center gap-4">
          {/* Worry input */}
          <WorryCometInput
            books={books}
            onResult={handleRelatedResult}
          />

          {/* Upload button */}
          <BookUpload onBooksExtracted={handleBooksExtracted} />
        </div>
      </motion.footer>

      {/* Demo hint — shows when empty */}
      <AnimatePresence>
        {bookCount === 0 && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center space-y-3 mb-32">
              <motion.div
                className="text-6xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                🌌
              </motion.div>
              <p className="text-slate-500 text-sm tracking-wide">
                あなたの本棚が、ここに宇宙を作ります
              </p>
              <p className="text-slate-700 text-xs">
                下のボタンから本棚の写真をアップロードしてください
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
