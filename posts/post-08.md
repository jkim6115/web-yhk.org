---
title: "Zustand로 전역 상태 관리하기"
created_at: "2025-12-05"
---

Redux의 보일러플레이트에 지쳐있었는데 Zustand를 써보고 바로 메인 상태 관리 라이브러리로 채택했다. 설정이 거의 없고 직관적이다.

## 설치

```bash
npm install zustand
```

## 기본 스토어 만들기

```typescript
import { create } from "zustand";

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

## 컴포넌트에서 사용

```tsx
function Counter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <span>{count}</span>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

Context API처럼 Provider로 감쌀 필요가 없다. 그냥 훅처럼 불러서 쓰면 된다.

## 셀렉터로 최적화

필요한 값만 구독하면 불필요한 리렌더링을 막을 수 있다.

```tsx
// count만 변해도 전체 리렌더링
const store = useCounterStore();

// count가 변할 때만 리렌더링
const count = useCounterStore((state) => state.count);
```

## 미들웨어: persist

상태를 localStorage에 저장해 새로고침 후에도 유지할 수 있다.

```typescript
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: string) => set({ theme }),
    }),
    { name: "app-storage" }
  )
);
```

Redux Toolkit이 "괜찮아진" Redux라면, Zustand는 "다시 생각한" 상태 관리다. 번들 크기도 작고 학습 곡선도 완만해서 적극 추천한다.
