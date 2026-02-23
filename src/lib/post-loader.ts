import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { unstable_cache } from "next/cache";

export type PostHeading = { level: number; text: string; id: string };

function extractHeadings(html: string): PostHeading[] {
  return [
    ...html.matchAll(/<h([1-3])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g),
  ].map((m) => ({
    level: parseInt(m[1], 10),
    id: m[2],
    text: m[3].replace(/<[^>]+>/g, "").trim(),
  }));
}

const postsDirectory = path.join(process.cwd(), "posts");

export const getAllPosts = unstable_cache(
  async () => {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        return {
          slug,
          title: data.title as string,
          created_at: data.created_at as string,
          tags: (data.tags as string[]) ?? [],
        };
      })
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  },
  ["all-posts"]
);

export const getPostData = unstable_cache(
  async (slug: string) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);
    const contentHtml = String(processedContent);

    return {
      slug,
      contentHtml,
      headings: extractHeadings(contentHtml),
      title: data.title as string,
      created_at: data.created_at as string,
      tags: (data.tags as string[]) ?? [],
    };
  },
  ["post-data"]
);
