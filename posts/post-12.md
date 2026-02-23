---
title: "GitHub Actions로 CI/CD 파이프라인 구축하기"
created_at: "2025-09-28"
---

매번 직접 배포하는 게 귀찮아서 GitHub Actions를 도입했다. 설정 파일 하나로 테스트, 빌드, 배포를 자동화할 수 있다.

## 기본 구조

`.github/workflows/` 디렉토리에 YAML 파일을 만들면 된다.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Node.js 설정
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: 의존성 설치
        run: npm ci

      - name: 린트
        run: npm run lint

      - name: 빌드
        run: npm run build
```

## PR 시 자동 테스트

`pull_request` 트리거를 추가하면 PR을 열 때마다 워크플로우가 실행된다. GitHub UI에서 통과 여부를 바로 확인할 수 있다.

## Vercel 자동 배포 연동

Vercel은 GitHub 연동 시 자동으로 배포해주지만, Actions로 직접 배포할 수도 있다.

```yaml
- name: Vercel 배포
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
    vercel-args: "--prod"
```

## 환경 변수 관리

민감한 값은 GitHub Settings → Secrets에 저장하고 `${{ secrets.KEY_NAME }}`으로 참조한다.

```yaml
- name: 배포
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
  run: npm run deploy
```

## 캐시로 속도 개선

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

처음엔 설정이 번거롭게 느껴지지만, 한 번 구축해두면 코드 푸시만으로 전체 파이프라인이 돌아간다. 시간 투자 대비 효과가 확실하다.
