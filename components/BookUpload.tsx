"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book } from "@/lib/types";

interface BookUploadProps {
  onBooksExtracted: (books: Book[]) => void;
}

type Phase = "idle" | "dragging" | "scanning" | "generating" | "done";

export default function BookUpload({ onBooksExtracted }: BookUploadProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedTitles, setExtractedTitles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;

      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      setPhase("scanning");

      try {
        // Step 1: Extract titles via OCR
        const formData = new FormData();
        formData.append("image", file);

        const extractRes = await fetch("/api/extract-books", {
          method: "POST",
          body: formData,
        });
        const { titles } = await extractRes.json();
        setExtractedTitles(titles);

        setPhase("generating");

        // Step 2: Generate metadata for each book
        const metaRes = await fetch("/api/book-metadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ titles }),
        });
        const { books } = await metaRes.json();

        setPhase("done");
        await new Promise((r) => setTimeout(r, 800));

        onBooksExtracted(books);
        setPhase("idle");
        setPreview(null);
        setExtractedTitles([]);
      } catch (err) {
        console.error(err);
        setPhase("idle");
      }
    },
    [onBooksExtracted]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setPhase("idle");
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      e.target.value = "";
    },
    [processFile]
  );

  const isProcessing = phase === "scanning" || phase === "generating" || phase === "done";

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />

      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            className="glass-card rounded-2xl p-4 w-72"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Preview with scan overlay */}
            {preview && (
              <div className="relative w-full h-28 rounded-lg overflow-hidden mb-3">
                <img
                  src={preview}
                  alt="本棚"
                  className="w-full h-full object-cover opacity-60"
                />
                {phase === "scanning" && (
                  <div className="scan-overlay">
                    <div className="scan-line" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-card rounded-lg px-3 py-1 text-xs text-violet-300">
                    {phase === "scanning" ? "📡 背表紙を解析中..." : phase === "generating" ? "✨ メタデータ生成中..." : "✨ 完了!"}
                  </div>
                </div>
              </div>
            )}

            {/* Extracted titles */}
            {extractedTitles.length > 0 && (
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 tracking-widest mb-2">
                  発見された本
                </p>
                {extractedTitles.map((title, i) => (
                  <motion.div
                    key={title}
                    className="flex items-center gap-2 text-xs text-slate-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-violet-400">✦</span>
                    <span className="truncate">{title}</span>
                    {phase === "done" && (
                      <span className="ml-auto text-emerald-400">✓</span>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Loading indicator */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-violet-400"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">
                {phase === "scanning" ? "OCR解析" : phase === "generating" ? "宇宙に追加中" : "完了"}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="upload-btn"
            className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3 group"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setPhase("dragging");
            }}
            onDragLeave={() => setPhase("idle")}
            onDrop={handleDrop}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(99,102,241,0.3))",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              {phase === "dragging" ? "⬇" : "📚"}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-200">
                {phase === "dragging" ? "ドロップして追加" : "本棚を撮影する"}
              </p>
              <p className="text-[11px] text-slate-500">
                画像をアップロード → 宇宙に追加
              </p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
