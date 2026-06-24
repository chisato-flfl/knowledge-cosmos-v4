"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, FindRelatedResponse } from "@/lib/types";

interface WorryCometInputProps {
  books: Book[];
  onResult: (result: FindRelatedResponse, worry: string) => void;
  disabled?: boolean;
}

export default function WorryCometInput({
  books,
  onResult,
  disabled,
}: WorryCometInputProps) {
  const [worry, setWorry] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [cosmicQuery, setCosmicQuery] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!worry.trim() || books.length === 0 || isSearching) return;

    setIsSearching(true);
    setCosmicQuery(null);

    try {
      const res = await fetch("/api/find-related", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worry: worry.trim(), books }),
      });

      const data: FindRelatedResponse = await res.json();
      setCosmicQuery(data.cosmicQuery);

      await new Promise((r) => setTimeout(r, 600));
      onResult(data, worry.trim());
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setWorry("");
    setCosmicQuery(null);
    onResult({ relatedBooks: [], cosmicQuery: "" }, "");
  };

  return (
    <div className="w-full max-w-lg space-y-2">
      {/* Cosmic query display */}
      <AnimatePresence>
        {cosmicQuery && (
          <motion.p
            className="text-center text-xs text-violet-400 italic px-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ✦ {cosmicQuery}
          </motion.p>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        {/* Comet decoration */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              className="absolute -left-6 top-1/2 -translate-y-1/2 text-lg pointer-events-none"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
            >
              ☄️
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={worry}
            onChange={(e) => setWorry(e.target.value)}
            placeholder={
              books.length === 0
                ? "まず本棚を追加してください..."
                : "今、何に悩んでいますか？（例：転職が不安）"
            }
            disabled={books.length === 0 || isSearching || disabled}
            className="cosmos-input w-full rounded-full px-5 py-3 text-sm pr-24"
            maxLength={120}
          />

          {/* Character indicator */}
          {worry.length > 80 && (
            <span className="absolute right-20 top-1/2 -translate-y-1/2 text-[10px] text-slate-600">
              {worry.length}/120
            </span>
          )}
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={!worry.trim() || books.length === 0 || isSearching}
          className="rounded-full px-4 py-3 text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0"
          style={{
            background:
              worry.trim() && !isSearching
                ? "linear-gradient(135deg, #7c3aed, #6366f1)"
                : "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: worry.trim() && !isSearching ? "white" : "rgba(226,232,240,0.4)",
          }}
          whileHover={worry.trim() && !isSearching ? { scale: 1.05 } : {}}
          whileTap={worry.trim() && !isSearching ? { scale: 0.95 } : {}}
        >
          {isSearching ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                ✦
              </motion.span>
              <span>探索中</span>
            </>
          ) : (
            <>
              <span>✦</span>
              <span>問いかける</span>
            </>
          )}
        </motion.button>

        {/* Clear button */}
        <AnimatePresence>
          {(worry || cosmicQuery) && !isSearching && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="text-slate-600 hover:text-slate-400 transition-colors flex-shrink-0 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              クリア
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      {/* Hint */}
      {books.length > 0 && !isSearching && !cosmicQuery && (
        <p className="text-center text-[11px] text-slate-600">
          あなたの悩みが、眠っていた本を呼び覚まします
        </p>
      )}
    </div>
  );
}
