---
title: "REST API 설계 원칙과 흔한 실수들"
created_at: "2025-10-15"
tags: ["api", "backend"]
---

API를 설계할 때마다 "이게 맞나?" 하는 고민이 생긴다. 몇 가지 원칙을 정리해두면 결정이 쉬워진다.

## URL은 리소스를 표현한다

URL에 동사를 넣지 말자. 행위는 HTTP 메서드로 표현한다.

```
# 나쁜 예
GET  /getUsers
POST /createPost
GET  /deleteComment?id=5

# 좋은 예
GET    /users
POST   /posts
DELETE /comments/5
```

## HTTP 메서드 올바르게 사용

| 메서드 | 의미 | 멱등성 |
|--------|------|--------|
| GET | 조회 | O |
| POST | 생성 | X |
| PUT | 전체 수정 | O |
| PATCH | 부분 수정 | O |
| DELETE | 삭제 | O |

## 복수형 명사 사용

```
/user  → /users
/post  → /posts
```

일관성이 중요하다. 단수/복수를 섞지 말자.

## 중첩 리소스

```
GET /users/123/posts          → 유저 123의 게시물 목록
GET /users/123/posts/456      → 유저 123의 게시물 456
POST /users/123/posts         → 유저 123의 게시물 생성
```

중첩이 너무 깊어지면 (3단계 이상) 가독성이 나빠진다. 그럴 땐 쿼리 파라미터로 대신하는 것도 방법이다.

## HTTP 상태 코드

흔히 쓰는 것만 잘 알아도 충분하다.

```
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

## 흔한 실수

1. 모든 응답에 200 반환하고 body에 에러 담기
2. POST로 모든 것 처리
3. 에러 메시지 없이 500만 반환
4. 페이지네이션 없이 전체 목록 반환

API는 나중에 쓰는 사람(나 포함)을 위해 일관되고 예측 가능하게 만드는 것이 핵심이다.
