---
title: "웹 성능 최적화: Core Web Vitals 개선하기"
created_at: "2025-08-05"
---

Google의 Core Web Vitals는 실제 사용자 경험을 측정하는 지표다. SEO와 직결되기도 하니 무시할 수 없다.

## 세 가지 핵심 지표

### LCP (Largest Contentful Paint)
페이지에서 가장 큰 콘텐츠가 렌더링되는 시간. **2.5초 이하**가 목표.

### FID / INP (Interaction to Next Paint)
사용자 입력에 얼마나 빠르게 반응하는지. **200ms 이하**가 목표.

### CLS (Cumulative Layout Shift)
예상치 못한 레이아웃 이동. **0.1 이하**가 목표.

## LCP 개선

### 이미지 최적화

```tsx
import Image from "next/image";

// next/image는 자동으로 WebP 변환, lazy loading, 크기 최적화
<Image
  src="/hero.jpg"
  alt="히어로 이미지"
  width={1200}
  height={600}
  priority  // LCP 대상 이미지는 priority 속성 추가
/>
```

### 폰트 최적화

```tsx
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",  // FOUT 방지
});
```

## CLS 개선

레이아웃 이동의 주요 원인은 크기가 명시되지 않은 이미지나 동적으로 삽입되는 콘텐츠다.

```css
/* 이미지에 명시적 크기 설정 */
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
}
```

## 번들 크기 줄이기

```bash
# Next.js 번들 분석
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

불필요한 라이브러리를 제거하고, 동적 import로 필요할 때만 로드하자.

```javascript
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Spinner />,
});
```

## 측정 도구

- [PageSpeed Insights](https://pagespeed.web.dev/) — Google의 공식 측정 도구
- Chrome DevTools Performance 탭
- Lighthouse (DevTools 내장)

성능 최적화는 측정 → 개선 → 재측정의 반복이다. 감으로 하지 말고 데이터로 접근하자.
