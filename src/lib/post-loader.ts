import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { unstable_cache } from "next/cache";

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
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      contentHtml,
      title: data.title as string,
      created_at: data.created_at as string,
      tags: (data.tags as string[]) ?? [],
    };
  },
  ["post-data"]
);
