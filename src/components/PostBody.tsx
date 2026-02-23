"use client";

import { useEffect, useRef } from "react";

interface PostBodyProps {
  html: string;
  className?: string;
}

export default function PostBody({ html, className }: PostBodyProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pres = ref.current?.querySelectorAll("pre");
    pres?.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.textContent = "복사";
      btn.className = "copy-btn";
      btn.onclick = async () => {
        const code = pre.querySelector("code")?.textContent ?? "";
        await navigator.clipboard.writeText(code);
        btn.textContent = "완료!";
        setTimeout(() => {
          btn.textContent = "복사";
        }, 2000);
      };
      pre.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
