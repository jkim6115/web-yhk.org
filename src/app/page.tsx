import Link from "next/link";
import { getAllPosts } from "@/lib/post-loader";
import TagSidebar from "@/components/TagSidebar";
import styles from "./page.module.css";

const POSTS_PER_PAGE = 10;

interface HomeProps {
  searchParams: Promise<{ page?: string; tag?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page, tag } = await searchParams;
  const activeTag = tag ?? null;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10));

  const allPosts = getAllPosts();

  const allTags = Array.from(
    new Set(allPosts.flatMap((p) => p.tags))
  ).sort();

  const filteredPosts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));

  const posts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  const pageHref = (p: number) =>
    activeTag ? `/?tag=${activeTag}&page=${p}` : `/?page=${p}`;

  return (
    <div className={styles.container}>
      <TagSidebar allTags={allTags} activeTag={activeTag} />

      <div className={styles.content}>
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <Link href={`/posts/${post.slug}`} className={styles.title}>
                {post.title}
              </Link>
              <span className={styles.date}>{post.created_at}</span>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <nav className={styles.pagination}>
            {safePage > 1 ? (
              <Link href={pageHref(safePage - 1)} className={styles.pageBtn}>
                ← 이전
              </Link>
            ) : (
              <span className={styles.pageBtnDisabled}>← 이전</span>
            )}

            <span className={styles.pageInfo}>
              {safePage} / {totalPages}
            </span>

            {safePage < totalPages ? (
              <Link href={pageHref(safePage + 1)} className={styles.pageBtn}>
                다음 →
              </Link>
            ) : (
              <span className={styles.pageBtnDisabled}>다음 →</span>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
