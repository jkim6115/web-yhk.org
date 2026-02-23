---
title: "Docker로 개발 환경 통일하기"
created_at: "2026-01-05"
tags: ["docker", "devops"]
---

"내 컴퓨터에서는 잘 되는데요"는 개발자 세계의 고전 밈이다. Docker를 쓰면 이 문제를 대부분 해결할 수 있다.

## Docker의 핵심 개념

- **이미지(Image)**: 컨테이너의 설계도. 읽기 전용.
- **컨테이너(Container)**: 이미지를 실행한 인스턴스.
- **Dockerfile**: 이미지를 빌드하는 명령어 모음.
- **docker-compose**: 여러 컨테이너를 함께 관리.

## 기본 Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## docker-compose로 풀스택 환경 구성

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

실행은 간단하다.

```bash
docker compose up -d       # 백그라운드로 실행
docker compose logs -f     # 로그 확인
docker compose down        # 종료
```

## 개발 환경에서 핫 리로드 설정

개발 중엔 소스 변경이 바로 반영되어야 한다. 볼륨 마운트를 활용하자.

```yaml
services:
  app:
    volumes:
      - .:/app
      - /app/node_modules  # node_modules는 컨테이너 것 사용
    command: npm run dev
```

Docker를 도입하면 초기 설정이 조금 번거롭지만, 팀 전체의 개발 환경이 동일해지고 배포 환경과도 일치하게 된다. 장기적으로 봤을 때 도입하지 않을 이유가 없다.
