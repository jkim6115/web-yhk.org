# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000) — Turbopack 활성화
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

This is a **Next.js 16.1.6 App Router** blog site using file-based markdown content.

### Content System

- Blog posts are `.md` files in `/posts/` with YAML frontmatter (`title`, `created_at`, `tags`)
- [src/lib/post-loader.ts](src/lib/post-loader.ts) exports:
  - `getAllPosts()` — async, reads all `.md` files, returns sorted list (newest first) with `{ slug, title, created_at, tags }`; cached via `unstable_cache`
  - `getPostData(slug)` — async, parses single post, returns `{ slug, title, created_at, tags, contentHtml, headings }` or `null` if file not found; cached via `unstable_cache`
  - `PostHeading` type: `{ level: number; text: string; id: string }`
- Post pages at `/posts/[slug]` are statically generated (`generateStaticParams`) and use `PostBody` (client component) for copy button injection
- Markdown pipeline: `unified → remarkParse → remarkGfm → remarkRehype → rehypeSlug → rehypeHighlight → rehypeStringify`
  - GFM 지원: 테이블, strikethrough, task list 등
  - `rehypeSlug`: 각 헤딩에 `id` 자동 부여 (github-slugger 기반)
  - 코드 하이라이팅: highlight.js 클래스 출력, CSS 변수 기반 라이트/다크 테마 (`globals.css`)
- Currently 15 posts in `/posts/`

### Key Paths

- `src/app/layout.tsx` — Root layout with header (site title link) and `<main>` container; RSS alternate link in metadata
- `src/app/layout.module.css` — Header and centered container styles (`<main>` max-width: 960px)
- `src/app/globals.css` — CSS custom properties for light/dark theme, base typography
- `src/app/page.tsx` — Home page: tag-filtered, paginated post list (10 per page, `?page=N&tag=T` query params)
- `src/app/page.module.css` — Post list and pagination styles
- `src/app/posts/[slug]/page.tsx` — Static post route with `generateStaticParams`, `generateMetadata`, JSON-LD; calls `notFound()` if slug not found
- `src/app/posts/[slug]/page.module.css` — Post layout (article centered at 680px, ToC absolutely positioned to the right), content typography
- `src/app/posts/[slug]/opengraph-image.tsx` — Dynamic OG image (1200×630); Noto Sans KR Bold 폰트 로드, 다크 배경에 제목+날짜 렌더링; Next.js가 자동으로 `og:image` 메타태그 추가
- `src/app/not-found.tsx` + `src/app/not-found.module.css` — Custom 404 page
- `src/app/rss.xml/route.ts` — RSS 2.0 feed (`/rss.xml`)
- `src/app/sitemap.ts` — Auto-generates `/sitemap.xml` with all post URLs
- `src/app/robots.ts` — Auto-generates `/robots.txt`
- `src/components/PostBody.tsx` — Client component; `useEffect`로 코드 블록에 복사 버튼 삽입
- `src/components/TableOfContents.tsx` — Client component; `IntersectionObserver`로 현재 섹션 하이라이트, 1140px 이하에서 숨김
- `src/components/TableOfContents.module.css` — ToC styles (`.active` 클래스로 현재 섹션 강조)
- `src/components/TagSidebar.tsx` — Tag filter sidebar (links to `/?tag=T`); accepts `allTags` and `activeTag`
- `src/components/TagSidebar.module.css` — Sidebar styles
- `src/lib/post-loader.ts` — Markdown loading utilities (cached)
- `posts/` — Markdown content files (15 posts)

### Post Page Layout

포스트 페이지는 `position: relative; max-width: 680px; margin: 0 auto`인 `.layout` 래퍼 안에 `<article>`이 중앙 정렬되고, `<aside class="tocAside">`가 `position: absolute; left: calc(100% + 2rem)`으로 오른쪽에 배치됨.
- ToC sticky: `.tocSticky { position: sticky; top: 2rem }` — `.tocAside`의 `height: 100%`가 sticky 동작의 핵심
- 1140px 이하에서 `.tocAside { display: none }`

### Configuration

- Path alias `@/*` → `./src/*`
- React Compiler enabled (`reactCompiler: true`) in [next.config.ts](next.config.ts) via `babel-plugin-react-compiler`
- `poweredByHeader: false` in [next.config.ts](next.config.ts)
- Turbopack: `next dev --turbopack` (dev only)
- Fonts: Noto Sans KR (body, weights 400/500/700), Noto Sans Mono (code, weight 400) via `next/font/google` with `display: "swap"`
- Language set to Korean (`lang="ko"` in root layout)
- CSS custom properties: `--bg`, `--fg`, `--fg-muted`, `--border`, `--accent`, `--code-bg`, `--max-width` (680px)
- `globals.css`: highlight.js 토큰 색상 (`.hljs-*`), 복사 버튼 (`.copy-btn`) 전역 스타일 포함
- Site domain: `https://web-yhk.org`
- Root metadata: `title.default: "web-yhk.org"`, `title.template: "%s | web-yhk.org"`, `description: "개발 블로그"`, RSS alternate link
- Per-post metadata: title, description (본문 앞 150자), OpenGraph article, JSON-LD BlogPosting 스키마
