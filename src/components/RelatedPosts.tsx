import Link from "next/link";
import styles from "./RelatedPosts.module.css";

interface RelatedPost {
  slug: string;
  title: string;
  created_at: string;
  tags: string[];
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>관련 포스트</h2>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className={styles.card}>
            <p className={styles.title}>{post.title}</p>
            <div className={styles.meta}>
              {post.tags.length > 0 && (
                <span className={styles.tag}>{post.tags[0]}</span>
              )}
              <time className={styles.date}>{post.created_at}</time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
