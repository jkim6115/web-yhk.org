---
title: "JavaScript 비동기 처리: callback에서 async/await까지"
created_at: "2025-09-10"
tags: ["javascript"]
---

JavaScript의 비동기 처리는 언어의 핵심이다. callback 지옥에서 시작해 Promise, 그리고 async/await까지 흐름을 이해하면 코드가 훨씬 명확해진다.

## 콜백(Callback)

```javascript
fs.readFile("data.txt", "utf-8", function(err, data) {
  if (err) {
    console.error(err);
    return;
  }
  parseData(data, function(err, parsed) {
    if (err) {
      console.error(err);
      return;
    }
    saveResult(parsed, function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("완료");
    });
  });
});
```

중첩이 깊어질수록 가독성이 떨어진다. 이걸 "콜백 지옥"이라고 부른다.

## Promise

```javascript
readFile("data.txt")
  .then(data => parseData(data))
  .then(parsed => saveResult(parsed))
  .then(() => console.log("완료"))
  .catch(err => console.error(err));
```

체이닝으로 가독성이 나아졌다. 에러도 `.catch` 하나로 처리할 수 있다.

## async/await

```javascript
async function processFile() {
  try {
    const data = await readFile("data.txt");
    const parsed = await parseData(data);
    await saveResult(parsed);
    console.log("완료");
  } catch (err) {
    console.error(err);
  }
}
```

동기 코드처럼 읽히면서 비동기 처리가 가능하다. 현재 표준이다.

## 병렬 실행

순서가 상관없는 비동기 작업은 병렬로 실행하면 빠르다.

```javascript
// 순차 실행 (느림)
const user = await fetchUser(id);
const posts = await fetchPosts(id);

// 병렬 실행 (빠름)
const [user, posts] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
]);
```

## 에러 처리 팁

```javascript
// 유틸 함수로 try-catch 보일러플레이트 줄이기
async function to<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    return [null, await promise];
  } catch (err) {
    return [err as Error, null];
  }
}

const [err, data] = await to(fetchData());
if (err) return handleError(err);
```

비동기를 이해하면 JavaScript의 절반은 이해한 셈이다.
