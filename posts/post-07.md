---
title: "CSS Grid와 Flexbox, 언제 뭘 써야 할까"
created_at: "2025-12-20"
tags: ["css"]
---

CSS 레이아웃을 잡을 때 Grid와 Flexbox 사이에서 고민하는 경우가 많다. 둘 다 강력하지만 목적이 다르다.

## Flexbox: 1차원 레이아웃

Flexbox는 **한 방향(행 또는 열)**으로 아이템을 배치할 때 최적이다.

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

주로 쓰는 곳:
- 네비게이션 바
- 버튼 그룹
- 카드 내부 레이아웃
- 수직 중앙 정렬

## CSS Grid: 2차원 레이아웃

Grid는 **행과 열을 동시에** 제어할 때 강력하다.

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.sidebar { grid-row: 1 / -1; }
```

주로 쓰는 곳:
- 페이지 전체 레이아웃
- 카드 그리드
- 대시보드

## 실전 카드 그리드 예시

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

`auto-fill`과 `minmax`를 조합하면 미디어 쿼리 없이도 반응형 그리드를 만들 수 있다.

## 결론

- **한 방향 정렬** → Flexbox
- **2차원 배치** → Grid
- **중첩해서 사용** → 얼마든지 가능

실제로는 Grid로 전체 레이아웃을 잡고, 내부 요소는 Flexbox로 정렬하는 패턴을 가장 많이 쓴다.
