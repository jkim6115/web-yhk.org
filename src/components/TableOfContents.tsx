"use client";

import { useEffect, useState } from "react";
import type { PostHeading } from "@/lib/post-loader";
import styles from "./TableOfContents.module.css";

interface TableOfContentsProps {
  headings: PostHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className={styles.toc} aria-label="목차">
      <p className={styles.title}>목차</p>
      <ol className={styles.list}>
        {headings.map((h) => (
          <li
            key={h.id}
            className={
              styles[`level${h.level}` as "level1" | "level2" | "level3"]
            }
          >
            <a
              href={`#${h.id}`}
              className={h.id === activeId ? styles.active : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
