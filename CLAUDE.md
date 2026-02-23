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

- Blog posts are `.md` files in `/posts/` with YAML frontmatter (`title`, `date`)
- [src/lib/post-loader.ts](src/lib/post-loader.ts) loads and parses posts using `gray-matter` (frontmatter) and `remark`/`remark-html` (markdown → HTML)
- Currently exports only `getPostData(slug)` — no post listing function yet
- Post pages at `/posts/[slug]` are async server components that render the HTML via `dangerouslySetInnerHTML`

### Key Paths

- `src/app/` — App Router pages and layouts
- `src/app/page.tsx` — Home page (currently default Next.js scaffold, not yet a blog index)
- `src/app/page.module.css` — Home page styles
- `src/app/posts/[slug]/page.tsx` — Dynamic post route
- `src/lib/post-loader.ts` — Markdown loading utilities
- `posts/` — Markdown content files

### Configuration

- Path alias `@/*` → `./src/*`
- React Compiler enabled (`reactCompiler: true`) in [next.config.ts](next.config.ts) via `babel-plugin-react-compiler`
- Fonts: Noto Sans KR (body), Noto Sans Mono (code) via `next/font/google`
- Language set to Korean (`lang="ko"` in root layout)
- CSS Modules for component styles; CSS custom properties for light/dark theme in [src/app/globals.css](src/app/globals.css)
- Layout metadata (`title`, `description`) is still placeholder from create-next-app
