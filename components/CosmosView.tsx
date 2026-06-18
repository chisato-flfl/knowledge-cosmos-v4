"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book } from "@/lib/types";

interface BookNode extends Book {
  cx: number;
  cy: number;
}

interface Connection {
  from: BookNode;
  to: BookNode;
  keyword: string;
}

interface CosmosViewProps {
  books: Book[];
  highlightedBookIds: Set<string>;
  onBookClick: (book: Book) => void;
}

function sunflowerPosition(
  index: number,
  total: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number
): { x: number; y: number } {
  if (total <= 1) return { x: cx, y: cy };

  const goldenAngle = 137.508 * (Math.PI / 180);
  const angle = index * goldenAngle;
  // Start from 18% to avoid center crowding; fill full elliptical area
  const t = 0.18 + 0.82 * Math.sqrt((index + 1) / total);

  return {
    x: cx + t * rx * Math.cos(angle),
    y: cy + t * ry * Math.sin(angle),
  };
}

function buildConnections(nodes: BookNode[]): Connection[] {
  const connections: Connection[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const sharedKeywords = a.keywords.filter((k) => b.keywords.includes(k));
      if (sharedKeywords.length > 0) {
        const key = [a.id, b.id].sort().join("-");
        if (!seen.has(key)) {
          seen.add(key);
          connections.push({ from: a, to: b, keyword: sharedKeywords[0] });
        }
      }
    }
  }
  return connections;
}

export default function CosmosView({
  books,
  highlightedBookIds,
  onBookClick,
}: CosmosViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<BookNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });

  const recalculate = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const w = width || 800;
    const h = height || 600;
    setDims({ w, h });

    const padH = 50;
    const padTop = 30;
    const padBottom = 50;
    const rx = w / 2 - padH;
    const ry = (h - padTop - padBottom) / 2;
    const cx = w / 2;
    const cy = padTop + ry;

    const newNodes: BookNode[] = books.map((book, i) => {
      const pos = sunflowerPosition(i, books.length, cx, cy, rx, ry);
      return { ...book, cx: pos.x, cy: pos.y };
    });

    setNodes(newNodes);
    setConnections(buildConnections(newNodes));
  }, [books]);

  useEffect(() => {
    recalculate();
    const ro = new ResizeObserver(recalculate);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recalculate]);

  if (books.length === 0) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="text-center space-y-4 opacity-40">
          <div className="text-5xl mb-4">✦</div>
          <p className="text-slate-400 text-sm tracking-widest">
            本棚を撮影して、宇宙を始めよう
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative select-none">
      {/* SVG for connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
      >
        <defs>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <AnimatePresence>
          {connections.map((conn, idx) => {
            const fromHighlighted = highlightedBookIds.has(conn.from.id);
            const toHighlighted = highlightedBookIds.has(conn.to.id);
            const isActive = fromHighlighted && toHighlighted;
            const isPartial = fromHighlighted || toHighlighted;

            return (
              <motion.line
                key={`${conn.from.id}-${conn.to.id}`}
                x1={conn.from.cx}
                y1={conn.from.cy}
                x2={conn.to.cx}
                y2={conn.to.cy}
                stroke={
                  isActive
                    ? "#a855f7"
                    : isPartial
                    ? "#6366f1"
                    : "rgba(99,102,241,0.15)"
                }
                strokeWidth={isActive ? 1.5 : isPartial ? 1 : 0.5}
                strokeDasharray={isActive ? "none" : "6 4"}
                filter={isActive ? "url(#glow-filter)" : undefined}
                opacity={isActive ? 0.9 : isPartial ? 0.5 : 0.3}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isActive ? 0.9 : isPartial ? 0.5 : 0.3,
                }}
                transition={{ delay: idx * 0.03, duration: 0.5 }}
              />
            );
          })}
        </AnimatePresence>
      </svg>

      {/* Book nodes */}
      <AnimatePresence>
        {nodes.map((node, idx) => {
          const isHighlighted = highlightedBookIds.has(node.id);
          const isHovered = hoveredId === node.id;
          const radius = node.size;

          return (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: node.cx,
                top: node.cy,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                delay: idx * 0.08,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {/* Outer glow ring when highlighted */}
              {isHighlighted && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: radius * 4,
                    height: radius * 4,
                    left: -radius * 1.5,
                    top: -radius * 1.5,
                    background: `radial-gradient(circle, ${node.color}30 0%, transparent 70%)`,
                  }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              {/* Planet body */}
              <motion.button
                className={`rounded-full focus:outline-none relative z-10 book-star ${
                  isHighlighted ? "highlighted" : ""
                }`}
                style={
                  {
                    width: radius * 2,
                    height: radius * 2,
                    background: `radial-gradient(circle at 35% 35%, ${node.color}ff, ${node.color}88)`,
                    boxShadow: isHighlighted
                      ? `0 0 ${radius * 2}px ${radius}px ${node.color}60,
                         0 0 ${radius * 4}px ${radius * 2}px ${node.color}30`
                      : `0 0 ${radius}px ${radius / 2}px ${node.color}40`,
                    "--float-duration": `${5 + idx * 0.7}s`,
                    "--float-delay": `${idx * 0.4}s`,
                  } as React.CSSProperties
                }
                onClick={() => onBookClick(node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
              />

              {/* Title label */}
              <div
                className="absolute z-10 pointer-events-none text-center w-max"
                style={{
                  top: radius + 6,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <span className="text-[10px] text-slate-300 drop-shadow-md px-1.5 py-0.5 rounded bg-[#07071a]/60 backdrop-blur-sm border border-white/5">
                  {node.title.length > 14 ? node.title.slice(0, 14) + "…" : node.title}
                </span>
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {(isHovered || isHighlighted) && (
                  <motion.div
                    className="absolute z-20 pointer-events-none"
                    style={{
                      bottom: radius + 8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      whiteSpace: "nowrap",
                    }}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="glass-card rounded-lg px-3 py-1.5 text-xs text-slate-200 max-w-[200px] text-center">
                      <span className="truncate block">{node.title}</span>
                      {isHighlighted && (
                        <span className="text-violet-400 text-[10px] block mt-0.5">
                          ✦ 共鳴しています
                        </span>
                      )}
                    </div>
                    {/* Tooltip arrow */}
                    <div
                      className="w-2 h-2 mx-auto"
                      style={{
                        borderLeft: "4px solid transparent",
                        borderRight: "4px solid transparent",
                        borderTop: "4px solid rgba(13,13,43,0.7)",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
