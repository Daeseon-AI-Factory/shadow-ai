# CLAUDE.md — Claude Code 표준 지침

**이 파일은 매 세션 시작 시 자동으로 읽힙니다. 항상 가장 먼저 ROADMAP.md를 읽으세요.**

## 0. 절대 첫 번째로 할 일

매 세션 시작 시:
1. **`ROADMAP.md`를 처음부터 끝까지 읽기** (특히 섹션 0 NORTH STAR)
2. **`PROGRESS.md`를 읽고** 어디까지 끝났는지 확인
3. **`BLOCKERS.md`를 읽고** 활성 블로커 있는지 확인
4. 다음 진행할 태스크 ID를 확정한 후 사용자에게 보고
5. 사용자 확인 후 작업 시작

## 1. 프로젝트 정체성

- **이름**: Mimi (구명 TubeShadow — repo·백엔드 패키지 `com.tubeshadow`는 내부명으로 유지)
- **목적**: 개발자/지식노동자를 위한 YouTube 기반 영어 쉐도잉 훈련 도구.
  파는 것은 훈련 워크플로(구간 반복·녹음·A/B 비교·저장·복습)이며 YouTube 시청권이 아니다.
- **수익화**: 한 앱에서 Free Preview → Shadow → AI 3단계.
  유료화(PAY 트랙) 작업의 진실의 원천은 `docs/MONETIZATION-DESIGN.md`
- **자세한 내용**: `ROADMAP.md` 섹션 0 참조 (2026-07-20 현행화 — 구 24시간 MVP 로드맵은
  `docs/archive/`로 이동)

## 2. 핵심 작업 원칙

- **ROADMAP.md가 진실의 원천(source of truth)이다.** 이 파일과 충돌하면 ROADMAP을 따른다.
- **NORTH STAR(섹션 0)와 충돌하는 어떤 결정도 하지 않는다.** 새 기능 제안 시 OUT-OF-SCOPE(0.4) 먼저 확인.
- **태스크 단위로 일한다.** 한 번에 하나씩, 완료 후 PROGRESS.md 갱신.
- **막히면 멈춘다.** BLOCKERS.md에 기록 + 사용자에게 보고. 추측해서 진행 X.

## 3. 코드 표준

### 백엔드 (Java / Spring Boot)
- Java 21
- Spring Boot 3.x (최신 안정 버전)
- Gradle (Kotlin DSL)
- 패키지 구조: `com.tubeshadow.<도메인>` (auth, video, clip, analysis, recording, review, common)
- 디자인 패턴 사용 시 **주석으로 의도 명시**
- 단위 테스트: JUnit 5 + Mockito
- 통합 테스트: Testcontainers (PostgreSQL)
- 모든 API: OpenAPI 어노테이션으로 문서화

### 프론트엔드 (TypeScript / Next.js)
- Next.js 14+ App Router
- TypeScript strict mode (no `any`)
- Tailwind + shadcn/ui
- 상태 관리: Zustand
- API 호출: TanStack Query
- 컴포넌트는 `'use client'` 필요한 곳만 명시

### 공통
- 커밋 메시지: `[<트랙ID>] <짧은 설명>` 형식 — 현행 트랙 ID는 `PAY-N`
  (`docs/MONETIZATION-DESIGN.md` §14). 구 `T-XXX` 체계는 완료된 역사
- 한 태스크 = 1~3 커밋
- 의미 있는 단위로 자주 커밋
- 절대 API 키 / 시크릿 하드코딩 X (환경변수만)

## 4. 명령어 (Claude Code가 자주 실행할 것)

### 백엔드
```bash
cd backend
./gradlew bootRun           # 개발 서버
./gradlew test              # 테스트 실행
./gradlew flywayMigrate     # DB 마이그레이션
```

### 프론트엔드
```bash
cd frontend
npm run dev                 # 개발 서버 (3100 포트)
npm run build               # 빌드
npm run test                # Vitest 테스트
npm run lint                # ESLint
```

### 인프라
```bash
docker compose up -d        # PostgreSQL 기동
docker compose logs -f db   # DB 로그
docker compose down         # 종료
```

## 5. 사용자 권한 정책

다음 작업은 **사용자 명시적 승인 후에만** 실행:
- 환경변수 파일 변경 (.env)
- 의존성 추가 (build.gradle, package.json)
- 데이터베이스 마이그레이션 새로 생성
- 외부 API 호출 (Anthropic, YouTube 등 — 비용 발생 가능)
- 배포 명령어

다음 작업은 **자유롭게** 실행 가능:
- 코드 파일 생성/수정/삭제 (소스 디렉터리 내)
- 테스트 실행
- 빌드
- 로컬 서버 기동/종료
- Git 커밋 (단, push는 사용자 확인 후)

## 6. 진행 추적 의무

매 태스크 완료 후:
1. **`PROGRESS.md`에 체크마크 + 완료 시간 기록**
2. 다음 태스크로 자동 이동 (의존성 충족 시)
3. 5개 태스크마다 NORTH STAR 다시 읽기

블로커 발생 시:
1. **즉시 `BLOCKERS.md`에 기록**
2. 의존 없는 다음 태스크로 이동 또는 사용자에게 보고
3. 절대 임의로 우회하지 않음

## 7. 절대 금지 (재강조)

- ❌ ROADMAP.md 섹션 0.4 OUT-OF-SCOPE 기능 추가
- ❌ NORTH STAR 확인 없이 새 기능 만들기
- ❌ 테스트 없이 비즈니스 로직 작성
- ❌ 하드코딩된 API 키 / 시크릿
- ❌ 마이그레이션 없이 DB 스키마 변경
- ❌ 임의 라이브러리/프레임워크 도입
- ❌ 사용자 데이터 격리 미흡
- ❌ 품질 깎아서 태스크 끝내기

---

**기억: 이 프로젝트의 핵심은 기능 개수가 아니라 마찰 제거다.**

---

매 결정 시 자문: 이게 마찰을 더 만드는가, 줄이는가?


## Cross-repo log aggregation (위성 repo)

이 repo는 [daseon-blog](https://github.com/Daeseon-AI-Factory/daseon-blog)의 cross-repo log aggregation **위성**이다. 로그는 **`content/logs/shadow-ai/`** 아래에 저장한다. 블로그가 30초 이내 fetch해서 [daeseon.ai/projects/shadow-ai](https://daeseon.ai/projects/shadow-ai) 타임라인에 자동 반영한다.

**Slug: `shadow-ai`** (= repo 이름과 동일, 블로그 프로젝트 mdx 파일명과 동일). 다른 슬러그 절대 사용 금지 — frontmatter `project:` 필드와 폴더 경로 모두 `shadow-ai`로 고정.


## Project log (required, dual-write)

When you fix or decide something non-trivial in this repo, write BOTH of these in the same turn as the commit:

1. `docs/troubleshooting.md` — terse problem-indexed reference (Symptom / Cause / Fix / Commit / Pattern). Append a new entry below the `---` divider.
2. `content/logs/<project-slug>/<YYYY-MM-DD>-<short-slug>.mdx` — dated narrative with frontmatter:

```yaml
---
title: "Concrete one-line title"
date: "YYYY-MM-DD"
project: "shadow-ai"
kind: "troubleshoot | tech-retro | ux-retro | business | monetization | update"
visibility: "public | unlisted | private"
language: "en"
summary: "One or two sentences."
tags: ["topic", "stack"]
---
```

### What counts as non-trivial

LOG IT: build/deploy errors, hidden coupling, dependency migrations, architecture or infra decisions, design/copy choices made on judgment, strategy or pricing memos.

DON'T LOG: routine renames, lint fixes, typo fixes, dependency bumps with no behavior change, formatting commits.

### Anti-hallucination rules (non-negotiable)

1. **Symptom is literal.** Paste the actual error/output in a fenced code block. No paraphrasing.
2. **Cause is verified.** Only state what you read in the actual code or ran in the actual command. If you guessed, write `Hypothesis: ...` and `Verified by: ...`. If unverifiable, omit Cause or mark `Suspected:` with an explicit caveat.
3. **Fix names actual files.** `git diff` is the source of truth. If `git diff` doesn't show the change, don't claim you made it.
4. **Commit hash AFTER committing.** Use `git rev-parse HEAD` after the commit lands. Never write a hash that doesn't exist yet.
5. **Date from git.** `git log -1 --format=%cI` for the commit time. For forward-looking entries (decisions being written in the moment), today's date from the session start. Never guess.
6. **Pattern is rare.** Only write a Pattern line if a recurring lesson is obvious from this one incident. Padding it with generic advice is worse than omitting.
7. **No fabricated metrics.** "Took about 60s" if you saw 60s. "Took 1m 23s exactly" only if you have the timestamp.

### Visibility defaults by kind

- `business`, `monetization` → `private` by default (strategy memos shouldn't ship accidentally)
- `knowledge`-style facts → `unlisted` if you have such a type
- Everything else → `public`

Override per entry in frontmatter.

### Skip rule for routine commits

The Stop hook blocks the turn until the most recent commit is either logged OR explicitly marked routine. To skip without writing an entry:

- Option A — put `[no-log]` (or `[skip-log]`) anywhere in the commit message. The hook auto-appends a `<!-- skipped: <hash> <subject> -->` line to `docs/troubleshooting.md` so it stops firing.
- Option B — append the same `<!-- skipped: <hash> <subject> -->` line yourself, then commit. Same effect.

Routine = typo fix, lint fix, formatting commit, dep bump without behavior change, file rename. Anything else: write the entry.