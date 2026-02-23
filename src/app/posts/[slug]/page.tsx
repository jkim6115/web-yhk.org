import type { Metadata } from "next";
import { getAllPosts, getPostData } from "@/lib/post-loader";
import PostBody from "@/components/PostBody";
import styles from "./page.module.css";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const description = postData.contentHtml
    .replace(/<[^>]+>/g, "")
    .slice(0, 150)
    .trim();

  return {
    title: postData.title,
    description,
    openGraph: {
      type: "article",
      url: `/posts/${slug}`,
      title: postData.title,
      description,
      publishedTime: postData.created_at,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const description = postData.contentHtml
    .replace(/<[^>]+>/g, "")
    .slice(0, 150)
    .trim();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postData.title,
    description,
    datePublished: postData.created_at,
    author: { "@type": "Person", name: "yhk" },
    url: `https://web-yhk.org/posts/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{postData.title}</h1>
          <time className={styles.date}>{postData.created_at}</time>
        </header>
        <PostBody html={postData.contentHtml} className={styles.body} />
      </article>
    </>
  );
}
