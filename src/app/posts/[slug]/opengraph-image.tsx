import { ImageResponse } from "next/og";
import { getPostData } from "@/lib/post-loader";
import { notFound } from "next/navigation";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(): Promise<ArrayBuffer | undefined> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
      }
    ).then((r) => r.text());
    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
    if (!match) return undefined;
    return fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return undefined;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);
  if (!post) notFound();

  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <p
          style={{
            color: "#60a5fa",
            fontSize: 22,
            margin: 0,
            marginBottom: 24,
          }}
        >
          web-yhk.org
        </p>
        <h1
          style={{
            color: "#e5e5e5",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            color: "#6b7280",
            fontSize: 20,
            margin: 0,
            marginTop: 36,
          }}
        >
          {post.created_at}
        </p>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Noto Sans KR", data: fontData, weight: 700 }]
        : [],
    }
  );
}
