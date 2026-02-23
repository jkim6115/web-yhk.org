import Link from "next/link";
import { getAllPosts } from "@/lib/post-loader";
import styles from "./page.module.css";

export default function Home() {
  const posts = getAllPosts();

  return (
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
  );
}
