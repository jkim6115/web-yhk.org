---
title: "Vim 기본기 익히기: 처음 1주일 생존 가이드"
created_at: "2025-11-03"
---

서버에 접속했더니 nano도 없고 vim만 있었다. 그 날 이후로 vim을 조금씩 공부했다. 처음 1주일에 필요한 것만 정리한다.

## 모드 이해가 핵심

Vim은 모드(mode) 기반 에디터다.

- **Normal 모드**: 기본 상태. 명령어 입력.
- **Insert 모드**: 텍스트 입력. `i`로 진입, `Esc`로 Normal로 복귀.
- **Visual 모드**: 텍스트 선택. `v`로 진입.
- **Command 모드**: `:` 입력 후 명령.

처음엔 `Esc`를 자주 누르는 게 습관이 되어야 한다.

## 생존에 필요한 최소 명령어

### 이동

```
h j k l   ← ↓ ↑ →
w         다음 단어
b         이전 단어
0         줄 처음
$         줄 끝
gg        파일 처음
G         파일 끝
:42       42번 줄로 이동
```

### 편집

```
i         커서 앞에서 Insert 진입
a         커서 뒤에서 Insert 진입
o         아래에 새 줄 추가 후 Insert
dd        현재 줄 삭제 (잘라내기)
yy        현재 줄 복사
p         붙여넣기
u         실행 취소
Ctrl+r    다시 실행
```

### 검색

```
/keyword  앞으로 검색
n         다음 결과
N         이전 결과
```

### 저장과 종료

```
:w        저장
:q        종료
:wq       저장 후 종료
:q!       강제 종료 (저장 안 함)
```

## vimrc 기본 설정

```vim
set number          " 줄 번호 표시
set relativenumber  " 상대적 줄 번호
set tabstop=2
set shiftwidth=2
set expandtab
set hlsearch        " 검색 결과 하이라이트
set incsearch       " 입력하면서 검색
```

솔직히 VSCode가 훨씬 편하다. 하지만 SSH 접속 환경이나 터미널 작업에서 vim을 조금이라도 알아두면 당황하지 않을 수 있다. 최소한 저장하고 나오는 법은 알아야 한다.
