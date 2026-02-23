# web-yhk.org

오로지 Claude Code로만 개발한 Next.js App Router 기반의 블로그.

## 기술 스택

- **Next.js 16** — App Router, Static Generation, Turbopack
- **React 19** — React Compiler 활성화
- **TypeScript**
- **Markdown** — gray-matter(frontmatter), unified/remark/rehype 파이프라인
  - GFM(테이블, strikethrough, task list), rehypeSlug, rehypeHighlight
- **CSS Modules** — 전역 CSS 변수(라이트/다크 테마)
- **Fonts** — Noto Sans KR (본문), Noto Sans Mono (코드) via next/font

## 개발

```bash
npm run dev    # 개발 서버 (localhost:3000, Turbopack)
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 서버
npm run lint   # ESLint
```

## 구조

```
posts/                        # 마크다운 포스트 (.md)
src/
  app/
    layout.tsx                # 루트 레이아웃 (헤더, 폰트, 메타데이터)
    page.tsx                  # 홈 (태그 필터, 페이지네이션 10개/페이지)
    not-found.tsx             # 커스텀 404 페이지
    sitemap.ts                # /sitemap.xml 자동 생성
    robots.ts                 # /robots.txt 자동 생성
    rss.xml/route.ts          # RSS 2.0 피드 (/rss.xml)
    posts/[slug]/
      page.tsx                # 포스트 페이지 (정적 생성, JSON-LD)
      opengraph-image.tsx     # 동적 OG 이미지 (1200×630)
  components/
    PostBody.tsx              # 코드 블록 복사 버튼 (클라이언트)
    TableOfContents.tsx       # 목차 (IntersectionObserver, 1140px 이하 숨김)
    TagSidebar.tsx            # 태그 필터 사이드바
    RelatedPosts.tsx          # 관련 포스트 (공유 태그 기반, 최대 3개)
  lib/
    post-loader.ts            # 마크다운 로딩 유틸 (unstable_cache 적용)
```

## 포스트 작성

`/posts` 디렉토리에 `.md` 파일 추가. frontmatter 형식:

```yaml
---
title: 포스트 제목
created_at: "2026-02-23"
tags:
  - tag1
  - tag2
---
```
