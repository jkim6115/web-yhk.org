import { getPostData } from "@/lib/post-loader";
import styles from "./page.module.css";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{postData.title}</h1>
        <time className={styles.date}>{postData.created_at}</time>
      </header>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
  );
}
