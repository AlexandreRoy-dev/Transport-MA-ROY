"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "article" | "li" | "section";
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const vh = window.innerHeight || 1;
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < vh * 0.72 && rect.bottom > vh * 0.08;
    if (alreadyInView) {
      el.classList.add("is-in");
      return;
    }

    // A 0.5 threshold never fires when the block is taller than the viewport.
    // Cap it by the share of the element that can actually sit on screen.
    const height = Math.max(rect.height, 1);
    const reachable = Math.min(1, vh / height);
    const threshold = Math.min(0.45, Math.max(0.12, reachable * 0.55));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.pending = "false";
        el.classList.add("is-in");
        io.disconnect();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    el.dataset.pending = "true";
    io.observe(el);
    const frame = requestAnimationFrame(() => {
      el.dataset.ready = "true";
    });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  const style = { "--reveal-delay": `${delay}s` } as CSSProperties;

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-pending="false"
      data-ready="false"
      className={`reveal${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
