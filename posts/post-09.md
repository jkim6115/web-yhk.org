---
title: "PostgreSQL 인덱스 제대로 이해하기"
created_at: "2025-11-18"
tags: ["postgresql", "database"]
---

쿼리가 느리다면 십중팔구 인덱스 문제다. 인덱스를 이해하면 데이터베이스 성능을 극적으로 개선할 수 있다.

## 인덱스란?

책의 색인(index)과 같다. 특정 컬럼의 값을 별도의 자료구조(주로 B-Tree)로 관리해서 전체 테이블을 스캔하지 않고 빠르게 찾을 수 있게 한다.

## EXPLAIN ANALYZE로 쿼리 분석

```sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'test@example.com';
```

출력에서 `Seq Scan`이 보이면 인덱스가 없거나 사용되지 않는 것이다. `Index Scan`이 보이면 인덱스를 쓰고 있는 것.

## 기본 인덱스 생성

```sql
-- 단일 컬럼 인덱스
CREATE INDEX idx_users_email ON users(email);

-- 복합 인덱스
CREATE INDEX idx_posts_user_date ON posts(user_id, created_at DESC);

-- 유니크 인덱스
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);
```

## 복합 인덱스의 순서가 중요하다

```sql
-- (user_id, created_at) 인덱스가 있을 때
SELECT * FROM posts WHERE user_id = 1;              -- 사용 가능
SELECT * FROM posts WHERE user_id = 1 AND created_at > '2025-01-01'; -- 사용 가능
SELECT * FROM posts WHERE created_at > '2025-01-01'; -- 사용 불가 (앞 컬럼 조건 없음)
```

## 인덱스를 피해야 하는 경우

- 자주 수정되는 테이블 (쓰기 성능 저하)
- 카디널리티가 낮은 컬럼 (예: boolean, 성별)
- 데이터가 매우 적은 테이블

## Partial Index

조건부 인덱스로 인덱스 크기를 줄일 수 있다.

```sql
-- 삭제되지 않은 게시물만 인덱싱
CREATE INDEX idx_posts_active ON posts(created_at)
WHERE deleted_at IS NULL;
```

인덱스는 만능이 아니다. 남용하면 쓰기 성능이 나빠지고 디스크 공간을 낭비한다. EXPLAIN으로 실제 실행 계획을 확인하면서 필요한 곳에만 추가하자.
