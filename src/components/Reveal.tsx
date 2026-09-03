"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const [inView, setInView] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setPending(false);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    const rect = el.getBoundingClientRect();
    const already =
      rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

    if (already) {
      setInView(true);
    } else {
      setPending(true);
      io.observe(el);
    }

    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={(node) => {
        ref.current = node;
      }}
      data-pending={pending && !inView ? "true" : "false"}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}s` : "0s" }}
    >
      {children}
    </Tag>
  );
}
