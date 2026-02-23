---
title: "TypeScript 제네릭을 제대로 활용하는 법"
created_at: "2026-02-20"
tags: ["typescript"]
---

TypeScript를 처음 배울 때 제네릭(Generic)은 가장 헷갈리는 개념 중 하나다. `Array<T>`, `Promise<T>` 같은 내장 타입을 쓰면서도 직접 제네릭을 작성하는 건 다른 이야기다.

## 제네릭이 필요한 이유

`any`를 쓰면 타입 안전성이 사라진다. 그렇다고 모든 타입에 대해 오버로드를 작성하는 것도 비현실적이다. 제네릭은 타입을 파라미터로 받아서 재사용 가능한 컴포넌트를 만들게 해준다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello"); // result: string
const num = identity(42); // 타입 추론으로 result: number
```

## 제약 조건(Constraints)

`extends` 키워드로 제네릭 타입에 제약을 걸 수 있다.

```typescript
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

getLength("hello");    // OK
getLength([1, 2, 3]);  // OK
getLength(42);         // 오류: number에는 length가 없음
```

## 실전 예시: API 응답 래퍼

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchUser(): Promise<ApiResponse<User>> {
  const res = await fetch("/api/user");
  return res.json();
}
```

제네릭을 잘 활용하면 코드 중복을 줄이면서도 타입 안전성을 유지할 수 있다. 처음엔 어색하지만 익숙해지면 없어선 안 될 도구가 된다.
