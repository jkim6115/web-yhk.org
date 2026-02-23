---
title: "Next.js App Router로 블로그 만들기"
created_at: "2026-01-28"
tags: ["nextjs", "react"]
---

Pages Router에서 App Router로 넘어온 지 꽤 됐는데, 실제로 써보니 확실히 편한 점이 많다. 이 블로그도 App Router로 만들었는데 구조를 간단히 소개한다.

## App Router의 핵심 개념

### 서버 컴포넌트 (기본값)

App Router에서 모든 컴포넌트는 기본적으로 서버 컴포넌트다. 데이터 페칭을 컴포넌트 안에서 바로 할 수 있다.

```tsx
// app/posts/page.tsx
async function PostsPage() {
  const posts = await getPosts(); // 서버에서 직접 실행

  return (
    <ul>
      {posts.map(post => (
        <li key={post.slug}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### 클라이언트 컴포넌트

상태나 이벤트 핸들러가 필요하면 `"use client"` 지시어를 추가한다.

```tsx
"use client";

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## 파일 기반 라우팅

```
app/
  layout.tsx        → 루트 레이아웃
  page.tsx          → /
  posts/
    page.tsx        → /posts
    [slug]/
      page.tsx      → /posts/:slug
```

## 마크다운 블로그 구현

`gray-matter`로 frontmatter를 파싱하고, `remark`로 마크다운을 HTML로 변환한다.

```typescript
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getPost(slug: string) {
  const fileContent = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data, content } = matter(fileContent);
  const processed = await remark().use(html).process(content);

  return {
    frontmatter: data,
    contentHtml: processed.toString(),
  };
}
```

App Router 덕분에 getStaticProps 같은 별도의 데이터 페칭 함수 없이 컴포넌트 안에서 바로 비동기 처리가 가능해졌다. 코드가 훨씬 직관적이다.
