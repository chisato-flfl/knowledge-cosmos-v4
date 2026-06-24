"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CosmicQuestionsPanelProps {
  questions: string[];
  isLoading: boolean;
}

export default function CosmicQuestionsPanel({
  questions,
  isLoading,
}: CosmicQuestionsPanelProps) {
  return (
    <motion.div
      className="mt-1 pt-5 border-t border-violet-500/15"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          className="flex gap-0.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-violet-400 text-[10px]">✦</span>
          <span className="text-violet-300/60 text-[8px] mt-0.5">✦</span>
        </motion.div>
        <span className="text-[11px] font-medium text-violet-300 tracking-widest uppercase">
          宇宙から返ってきた問い
        </span>
      </div>

      {/* Loading state */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="flex items-center gap-2 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="text-violet-400 text-xs"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.span>
            <span className="text-xs text-slate-500 italic tracking-wider">
              宇宙が響いています…
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="questions"
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {questions.map((q, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.18 + 0.1, duration: 0.45, ease: "easeOut" }}
              >
                {/* Decorative dot */}
                <div className="flex items-start gap-3">
                  <motion.span
                    className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-violet-400"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 2.5 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                  <p className="text-sm text-slate-100 leading-relaxed italic font-light tracking-wide">
                    {q}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Footer */}
            {questions.length > 0 && (
              <motion.p
                className="text-[10px] text-slate-600 text-center pt-2 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: questions.length * 0.18 + 0.4 }}
              >
                答えは、問いの奥にある
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
