import Link from "next/link";
import styles from "./TagSidebar.module.css";

interface TagSidebarProps {
  allTags: string[];
  activeTag: string | null;
}

export default function TagSidebar({ allTags, activeTag }: TagSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.tagList}>
        <li>
          <Link
            href="/"
            className={activeTag === null ? styles.tagItemActive : styles.tagItem}
          >
            전체
          </Link>
        </li>
        {allTags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/?tag=${tag}`}
              className={activeTag === tag ? styles.tagItemActive : styles.tagItem}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
