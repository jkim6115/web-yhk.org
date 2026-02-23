---
title: "React useEffect 완벽 정리"
created_at: "2026-02-10"
---

`useEffect`는 React에서 가장 많이 쓰이면서도 가장 많이 오용되는 훅이다. 정확히 언제, 어떻게 써야 하는지 정리해봤다.

## 기본 구조

```javascript
useEffect(() => {
  // 실행할 코드

  return () => {
    // 클린업 코드 (선택)
  };
}, [의존성 배열]);
```

## 의존성 배열의 세 가지 형태

| 형태 | 실행 시점 |
|------|-----------|
| 없음 | 매 렌더링마다 |
| `[]` | 마운트 시 한 번만 |
| `[a, b]` | a 또는 b가 변경될 때 |

## 흔한 실수: 무한 루프

```javascript
// 잘못된 예
useEffect(() => {
  setCount(count + 1); // count가 바뀌면 effect 재실행 → 무한 루프
}, [count]);

// 올바른 예
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // 마운트 시 한 번만
```

## 클린업이 필요한 경우

타이머, 이벤트 리스너, 구독(subscription)은 반드시 클린업해야 메모리 누수를 막을 수 있다.

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(timer); // 컴포넌트 언마운트 시 정리
}, []);
```

## React 18의 Strict Mode와 useEffect

React 18의 Strict Mode에서는 개발 환경에서 effect를 두 번 실행한다. 클린업이 제대로 구현되어 있는지 확인하기 위함이다. 당황하지 말고 클린업 함수를 잘 작성하면 된다.

`useEffect`를 남용하지 말 것. 단순한 파생 상태는 `useMemo`로, 이벤트 핸들러 내 로직은 그냥 함수로 처리하면 된다.
