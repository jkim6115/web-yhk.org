import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/post-loader";

const BASE_URL = "https://web-yhk.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...posts.map((p) => ({
      url: `${BASE_URL}/posts/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "never" as const,
      priority: 0.8,
    })),
  ];
}
