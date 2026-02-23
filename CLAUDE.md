# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

This is a **Next.js 16.1.6 App Router** blog site using file-based markdown content.

### Content System

- Blog posts are `.md` files in `/posts/` with YAML frontmatter (`title`, `created_at`, `tags`)
- [src/lib/post-loader.ts](src/lib/post-loader.ts) exports:
  - `getAllPosts()` — reads all `.md` files, returns sorted list (newest first) with `{ slug, title, created_at, tags }`
  - `getPostData(slug)` — parses single post, returns `{ slug, title, created_at, tags, contentHtml }`
- Post pages at `/posts/[slug]` are async server components that render HTML via `dangerouslySetInnerHTML`
- Currently 15 posts in `/posts/`

### Key Paths

- `src/app/layout.tsx` — Root layout with header (site title link) and `<main>` container
- `src/app/layout.module.css` — Header and centered container styles (max-width: 680px)
- `src/app/globals.css` — CSS custom properties for light/dark theme, base typography
- `src/app/page.tsx` — Home page: tag-filtered, paginated post list (10 per page, `?page=N&tag=T` query params)
- `src/app/page.module.css` — Post list and pagination styles
- `src/app/posts/[slug]/page.tsx` — Dynamic post route
- `src/app/posts/[slug]/page.module.css` — Post content typography (headings, code, blockquote)
- `src/components/TagSidebar.tsx` — Tag filter sidebar (links to `/?tag=T`); accepts `allTags` and `activeTag`
- `src/components/TagSidebar.module.css` — Sidebar styles
- `src/lib/post-loader.ts` — Markdown loading utilities
- `posts/` — Markdown content files (15 posts)

### Configuration

- Path alias `@/*` → `./src/*`
- React Compiler enabled (`reactCompiler: true`) in [next.config.ts](next.config.ts) via `babel-plugin-react-compiler`
- Fonts: Noto Sans KR (body), Noto Sans Mono (code) via `next/font/google`
- Language set to Korean (`lang="ko"` in root layout)
- CSS custom properties: `--bg`, `--fg`, `--fg-muted`, `--border`, `--accent`, `--code-bg`, `--max-width`
- Metadata: `title: "yhk.org"`, `description: "개발 블로그"`
