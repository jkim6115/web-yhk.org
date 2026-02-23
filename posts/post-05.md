---
title: "Git 브랜치 전략: Git Flow vs GitHub Flow"
created_at: "2026-01-15"
tags: ["git", "devops"]
---

팀 프로젝트를 시작할 때마다 브랜치 전략을 어떻게 가져갈지 고민하게 된다. 대표적인 두 가지 전략을 비교해봤다.

## Git Flow

Vincent Driessen이 2010년에 제안한 전략으로, 복잡하지만 체계적이다.

### 브랜치 구조

- `main` — 프로덕션 코드
- `develop` — 개발 통합 브랜치
- `feature/*` — 기능 개발
- `release/*` — 릴리즈 준비
- `hotfix/*` — 긴급 버그 수정

### 흐름

```
feature → develop → release → main
                              ↘ hotfix → main & develop
```

정기 릴리즈가 있는 대형 프로젝트에 적합하다. 하지만 브랜치가 많아 복잡해질 수 있다.

## GitHub Flow

GitHub에서 제안한 단순한 전략이다.

### 브랜치 구조

- `main` — 항상 배포 가능한 상태
- `feature/*` — 기능 개발 (main에서 분기, PR로 머지)

```bash
git checkout -b feature/login
# 작업 후
git push origin feature/login
# GitHub에서 PR 생성 → 리뷰 → main에 머지 → 자동 배포
```

CI/CD가 잘 갖춰진 팀, 지속적 배포(CD) 환경에 적합하다.

## 어떤 걸 선택할까?

| 상황 | 추천 전략 |
|------|-----------|
| 버전 관리가 중요한 앱 | Git Flow |
| 빠른 배포 주기 | GitHub Flow |
| 소규모 팀 | GitHub Flow |
| 엔터프라이즈 | Git Flow |

나는 개인 프로젝트나 스타트업에선 GitHub Flow를, 버전을 명시적으로 관리해야 하는 프로젝트엔 Git Flow를 쓴다. 팀 상황에 맞게 선택하면 된다.
