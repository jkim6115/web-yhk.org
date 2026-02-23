# web-yhk.org

개발 블로그. Next.js App Router 기반 정적 사이트.

## 기술 스택

- **Next.js 16** — App Router, Static Generation
- **React 19** — React Compiler 활성화
- **TypeScript**
- **Markdown** — gray-matter(frontmatter), remark(HTML 변환)
- **CSS Modules** — 전역 CSS 변수(라이트/다크 테마)

## 개발

```bash
npm run dev    # 개발 서버 (localhost:3000)
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 서버
npm run lint   # ESLint
```

## 구조

```
posts/               # 마크다운 포스트 (.md)
src/
  app/
    layout.tsx       # 루트 레이아웃 (헤더, 폰트, 메타데이터)
    page.tsx         # 홈 (태그 필터, 페이지네이션)
    sitemap.ts       # /sitemap.xml 자동 생성
    robots.ts        # /robots.txt 자동 생성
    posts/[slug]/
      page.tsx       # 포스트 페이지 (정적 생성)
  components/
    TagSidebar.tsx   # 태그 필터 사이드바
  lib/
    post-loader.ts   # 마크다운 로딩 유틸 (캐싱 적용)
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
