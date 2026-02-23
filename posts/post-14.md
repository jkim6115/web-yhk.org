---
title: "쉘 스크립트로 반복 작업 자동화하기"
created_at: "2025-08-22"
---

매일 하는 귀찮은 작업이 있다면 쉘 스크립트로 자동화할 수 있다. Python보다 간단한 작업에는 bash 스크립트가 더 빠르다.

## 기본 구조

```bash
#!/bin/bash
# 첫 줄은 shebang. 어떤 인터프리터를 쓸지 지정한다.

set -e  # 오류 발생 시 즉시 중단
set -u  # 미정의 변수 사용 시 오류

echo "스크립트 시작"
```

## 변수와 조건문

```bash
NAME="world"
echo "Hello, $NAME!"

if [ -f "./config.json" ]; then
  echo "설정 파일 존재"
else
  echo "설정 파일 없음"
  exit 1
fi
```

## 반복문

```bash
# 파일 목록 순회
for file in *.md; do
  echo "처리 중: $file"
  # 작업 수행
done

# 범위 반복
for i in {1..5}; do
  echo "Step $i"
done
```

## 함수

```bash
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "배포 시작"
```

## 실전 예시: 백업 스크립트

```bash
#!/bin/bash
set -e

BACKUP_DIR="$HOME/backups"
DATE=$(date '+%Y%m%d_%H%M%S')
SOURCE_DIR="$1"

if [ -z "$SOURCE_DIR" ]; then
  echo "사용법: $0 <백업할 디렉토리>"
  exit 1
fi

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" "$SOURCE_DIR"
echo "백업 완료: $BACKUP_DIR/backup_$DATE.tar.gz"

# 7일 이상 된 백업 삭제
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
echo "오래된 백업 정리 완료"
```

## 유용한 팁

- `$?`: 이전 명령의 종료 코드 (0이면 성공)
- `$#`: 인자 개수
- `$@`: 모든 인자
- `$(command)`: 명령 실행 결과를 문자열로

처음엔 syntax가 낯설지만 익숙해지면 반복 작업을 자동화하는 데 이만한 도구가 없다.
