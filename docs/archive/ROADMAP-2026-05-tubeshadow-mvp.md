# TubeShadow MVP — 24시간 Claude Code 실행 로드맵

> 이 문서는 Claude Code가 24시간 자동 실행 중 **매 태스크 시작 시 다시 읽어야 하는 가장 중요한 문서**입니다.
> 어떤 결정이든 막힐 때, 어떤 기능이든 추가하고 싶을 때, **반드시 섹션 0의 NORTH STAR로 돌아가서 확인하세요.**

---
## 0. PRODUCT NORTH STAR (절대 잊지 말 것)

### 0.1 한 줄 미션
> **"개발자/지식노동자가 YouTube 영상에서 직접 클립을 따다가, 자기 라이브러리에 모으고, Anki처럼 자동 복습하면서, 앱 안에서 AI 설명까지 받는 영어 쉐도잉 학습 도구."**

### 0.2 타겟 사용자 (페르소나 = 우리 자신)
- 5년차+ 개발자
- 영어를 진지한 도구로 쓰려고 함 (면접, 일터 커뮤니케이션, 컨퍼런스)
- 일반 영어 학습 앱(Cake, Duolingo)은 너무 가볍거나 자기 목적이랑 안 맞음
- 매일 30분~1시간 쓰는 진지한 학습자

### 0.3 절대 타협 안 할 5가지 가치
1. **사용자 자유 구간 선택** — 자동 자막 분할에 의존 X. 드래그로 본인이 정함.
2. **평생 복습 가능한 본인 라이브러리** — 일회성 콘텐츠 소비 X. 저장한 클립이 자산.
3. **앱 안에서 AI 설명** — ChatGPT 다른 탭 안 가도 됨. 마찰 제거.
4. **마찰 제거 = 차별화** — 기능 새로움보다 UX 품질이 핵심.
5. **운영 비용 낮게** — 사용자 1000명까지 거의 무료 유지.

### 0.4 v0 OUT-OF-SCOPE (욕심내지 말 것 — 매우 중요)
다음 기능들은 **v0에 절대 들어가지 않음**. Claude Code가 이걸 추가하려는 충동이 들면 즉시 멈추고 스킵.

- ❌ 발음 점수 / AI 평가 (Azure Pronunciation Assessment, ELSA 식)
- ❌ 프로소디 마크업 (강세/연음/인토네이션 시각화)
- ❌ 직독직해 표시 / Korean translation  **→ 2026-05 재검토 후 출시됨 (§0.4.1 참조)**
- ❌ 사용자간 라이브러리 공유 / 소셜 기능
- ❌ 모바일 네이티브 앱 (iOS/Android) — 웹만
- ❌ 결제 / 구독 / Stripe 연동
- ❌ 영어 외 다른 언어 (학습 콘텐츠)
- ❌ 개발자 외 다른 직종 큐레이션
- ❌ 자막 없는 영상 Whisper STT (개발자 영상은 99% 자막 있음)
- ❌ Whisper API 호출 (비용 폭발 가능성)
- ❌ 자체 STT / 음성 분석
- ❌ 다국어 UI (한국어 UI 하나로 가도 됨, 또는 영어 하나)  **→ 2026-05 재검토 후 출시됨 (§0.4.1 참조)**

### 0.4.1 스코프 진화 노트 (2026-05)

위 §0.4는 **원래 24h MVP 기준의 정직한 역사 기록**이다. 이후 제품이 sentence-mining 학습 도구로 발전하면서, 위 목록 중 **두 항목이 의도적으로 재검토되어 출시**되었다. 진실의 원천은 코드다:

- **직독직해 / 번역** — sentence mining의 핵심 가치로 판단되어 출시. 근거: 마이그레이션 `V10__clip_analysis_primary_translation`, `V11__clip_analysis_chunked_translation`; 도메인 `ClipAnalysis.primaryTranslation` / `chunkedTranslation`; E2E `primary-translation.spec.ts`, `chunked-translation.spec.ts`.
- **다국어 UI (i18n)** — 한/영 학습자 UX를 위해 next-intl로 출시. 근거: `frontend/app/[locale]/…` 라우팅 + `next-intl` 로케일.

나머지 §0.4 항목(발음 점수, 프로소디, 결제, **영어 외 학습 콘텐츠**, Whisper/STT, 소셜, 네이티브 앱, 개발자 외 큐레이션)은 **여전히 OUT-OF-SCOPE이며 미출시**다. 새 기능을 제안하기 전, 이 노트 + 마이그레이션 + E2E를 함께 확인해 실제 출시 여부를 검증할 것.

### 0.5 v0에 반드시 들어가는 것
- ✅ YouTube URL 임포트 (자막 있는 영상)
- ✅ 드래그로 구간 클립 저장
- ✅ 클립 라이브러리 (검색, 태그)
- ✅ 클립 단위 무한반복 + 속도 조절
- ✅ 사용자 음성 녹음 + 본인녹음 vs 원본 A/B 재생
- ✅ AI 인라인 설명 (문법, 핵심 표현, 문맥) — Claude API 사용
- ✅ SRS 복습 큐 (SM-2 알고리즘)
- ✅ 개발자 큐레이션 컬렉션 (씨드 데이터 30개)
- ✅ 회원가입 / 로그인 / 사용자별 데이터 격리

---

## 1. CLAUDE CODE 작업 원칙

이 규칙들은 24시간 실행 내내 지켜야 합니다.

### 1.1 매 태스크 시작 시 자동 행동
1. **섹션 0 NORTH STAR 다시 읽기** (특히 0.3 가치, 0.4 OUT-OF-SCOPE)
2. 현재 태스크의 **Product Anchor** 확인 (북스타의 어느 부분과 연결되는지)
3. 의존성(Depends on) 확인 → 선행 태스크 완료 확인
4. 작업 후 **Acceptance Criteria** 자체 검증

### 1.2 절대 금지
- ❌ v0 OUT-OF-SCOPE 기능 추가 (어떤 이유로도)
- ❌ "이왕 하는 김에..." → 즉시 멈추고 v0 범위로 복귀
- ❌ API 키 하드코딩 → 환경변수 사용
- ❌ console.log / println 남기기 → 적절한 로거 사용
- ❌ 테스트 없는 비즈니스 로직 작성
- ❌ 임의의 라이브러리 추가 → 섹션 2 기술 스택 준수
- ❌ 마이그레이션 없이 DB 스키마 변경

### 1.3 막혔을 때 행동
- 의사결정 필요한 모호한 상황 → 작업 중지 + `BLOCKERS.md`에 질문 기록 + 다음 독립 가능한 태스크로 이동
- 같은 에러 3회 반복 → 작업 중지 + `BLOCKERS.md`에 기록 + 다음 태스크
- v0 범위 의심되는 기능 요구 → 즉시 중지 + 섹션 0.4 확인

### 1.4 코드 품질
- 백엔드: Java 21 + Spring Boot, 도메인 중심 설계, 패키지별 책임 분리
- 디자인 패턴 적용 시 **이유를 주석으로 명시** (왜 Strategy인가, 왜 Factory인가)
- 의미 있는 단위로 커밋 (한 태스크 = 1~3 커밋)
- 커밋 메시지: `[T-XXX] <짧은 설명>` 형식

### 1.5 매 5개 태스크 후 자동 체크포인트
- 진행 상황을 `PROGRESS.md`에 갱신
- 섹션 0 NORTH STAR 다시 읽기 (드리프트 점검)
- 추가된 의존성/라이브러리 정리

---

## 2. 기술 스택 (확정 — 변경 금지)

### 2.1 백엔드
- **언어**: Java 21
- **프레임워크**: Spring Boot 3.x (최신 안정 버전)
- **빌드**: Gradle (Kotlin DSL)
- **DB**: PostgreSQL (Docker로 로컬 실행)
- **마이그레이션**: Flyway
- **인증**: Spring Security + JWT
- **API 문서**: Springdoc OpenAPI
- **테스트**: JUnit 5 + Mockito + Testcontainers

### 2.2 프론트엔드
- **프레임워크**: Next.js 14+ (App Router)
- **언어**: TypeScript (strict)
- **스타일**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **상태 관리**: Zustand (간단한 글로벌 상태)
- **API 호출**: TanStack Query (React Query)
- **테스트**: Vitest + Testing Library

### 2.3 외부 의존성
- **YouTube**: IFrame Player API (영상 재생)
- **YouTube 자막**: youtube-transcript 또는 동등 라이브러리 (백엔드에서 호출)
- **AI**: Anthropic Claude API (모델은 비용 고려해 Haiku부터 시작)
- **저장소**: 로컬 파일 시스템 (MVP) → 추후 S3 마이그레이션 가능하게 추상화

### 2.4 디렉터리 구조 (확정)
```
tubeshadow/
├── backend/
│   ├── src/main/java/com/tubeshadow/
│   │   ├── common/        # 공통 유틸, 예외, 베이스 클래스
│   │   ├── auth/          # 인증/사용자
│   │   ├── video/         # YouTube 영상 도메인
│   │   ├── clip/          # 클립 도메인
│   │   ├── analysis/      # AI 분석
│   │   ├── recording/     # 사용자 녹음
│   │   ├── review/        # SRS 복습 큐
│   │   └── TubeshadowApplication.java
│   ├── src/test/...
│   ├── build.gradle.kts
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (app)/
│   │   │   ├── library/
│   │   │   ├── review/
│   │   │   ├── player/[clipId]/
│   │   │   └── import/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   │   ├── api/
│   │   └── stores/
│   └── package.json
├── docker-compose.yml
├── ROADMAP.md           ← 이 문서
├── PROGRESS.md          ← 진행 상황 갱신
├── BLOCKERS.md          ← 막힌 항목 기록
└── README.md
```

---

## 3. 사전 준비물 (사용자가 미리 준비)

Claude Code 실행 전에 사용자가 준비해야 할 것:

- [ ] `ANTHROPIC_API_KEY` 발급 + 환경변수 설정
- [ ] PostgreSQL Docker 실행 가능한 환경
- [ ] Java 21 SDK
- [ ] Node.js 20+
- [ ] Git 리포지토리 초기화

이게 없으면 Claude Code는 STAGE 0 T-001에서 멈추고 사용자에게 요청.

---

## 4. 스테이지 + 태스크

각 태스크 형식:
```
### T-XXX: <태스크명>
- **Stage**: <스테이지>
- **Estimated**: <시간>
- **Depends on**: <선행 태스크 ID>
- **Product Anchor**: <북스타 0.x 중 어디>
- **Deliverable**: <구체적 산출물>
- **Acceptance Criteria**: <완료 기준>
```

---

## STAGE 0: 프로젝트 부트스트랩
**목표**: 백엔드/프론트엔드 빈 프로젝트가 실행되고 hello world API/페이지가 떠야 함.
**완료 시 동작**: `localhost:8080/health` 응답, `localhost:3000` 페이지 로드.

### T-001: Git 리포 + 모노레포 구조
- **Estimated**: 15분
- **Depends on**: 없음
- **Product Anchor**: 전체 (인프라)
- **Deliverable**: `tubeshadow/` 루트 + `backend/`, `frontend/`, `docker-compose.yml`, `.gitignore`, `README.md`
- **Acceptance Criteria**: `git status` 깨끗, 디렉터리 구조가 섹션 2.4와 일치

### T-002: PostgreSQL docker-compose 셋업
- **Estimated**: 15분
- **Depends on**: T-001
- **Product Anchor**: 전체 (인프라)
- **Deliverable**: `docker-compose.yml`에 postgres 서비스 + 환경변수 + 볼륨
- **Acceptance Criteria**: `docker compose up -d` → `psql` 접속 가능

### T-003: Spring Boot 프로젝트 초기화
- **Estimated**: 20분
- **Depends on**: T-001
- **Product Anchor**: 전체 (인프라)
- **Deliverable**: `backend/build.gradle.kts`, `TubeshadowApplication.java`, 기본 application.yml
- **Acceptance Criteria**: `./gradlew bootRun` 성공, 빈 Spring 앱 기동

### T-004: 백엔드 패키지 구조 + 베이스 클래스
- **Estimated**: 20분
- **Depends on**: T-003
- **Product Anchor**: 전체 (코드 품질)
- **Deliverable**: 섹션 2.4의 패키지 디렉터리 + `common/` 안에 BaseEntity, GlobalExceptionHandler, ApiResponse 래퍼
- **Acceptance Criteria**: 패키지 구조 컴파일됨, 글로벌 예외 핸들러가 RuntimeException 잡음

### T-005: 백엔드 Health 엔드포인트
- **Estimated**: 10분
- **Depends on**: T-004
- **Product Anchor**: 전체 (인프라)
- **Deliverable**: `GET /api/health` → `{status: "ok"}`
- **Acceptance Criteria**: curl 호출 시 200 응답

### T-006: 백엔드 application.yml dev/prod 프로파일
- **Estimated**: 15분
- **Depends on**: T-005
- **Product Anchor**: 전체 (운영)
- **Deliverable**: `application.yml`, `application-dev.yml`, `application-prod.yml`. DB 연결, 로깅 레벨
- **Acceptance Criteria**: `SPRING_PROFILES_ACTIVE=dev`로 기동 시 dev DB 사용

### T-007: 백엔드 OpenAPI/Swagger 셋업
- **Estimated**: 15분
- **Depends on**: T-005
- **Product Anchor**: 전체 (개발 효율)
- **Deliverable**: springdoc-openapi 의존성 + `/swagger-ui.html` 접근 가능
- **Acceptance Criteria**: 브라우저에서 swagger UI 열림, T-005 health 엔드포인트 표시

### T-008: Next.js 프로젝트 초기화
- **Estimated**: 20분
- **Depends on**: T-001
- **Product Anchor**: 전체 (인프라)
- **Deliverable**: `frontend/` 안에 Next.js 14+ App Router + TypeScript + Tailwind
- **Acceptance Criteria**: `npm run dev` → `localhost:3000` 기본 페이지 로드

### T-009: shadcn/ui 셋업 + 기본 컴포넌트
- **Estimated**: 20분
- **Depends on**: T-008
- **Product Anchor**: 전체 (UI 품질)
- **Deliverable**: `components/ui/` 안에 Button, Card, Input, Dialog 추가 (shadcn CLI 사용)
- **Acceptance Criteria**: 메인 페이지에서 Button 컴포넌트 import 후 렌더링

### T-010: 프론트엔드 API 클라이언트 베이스
- **Estimated**: 30분
- **Depends on**: T-008
- **Product Anchor**: 전체 (개발 효율)
- **Deliverable**: `lib/api/client.ts` — fetch 래퍼, baseURL, 인증 토큰 인터셉터, 에러 처리
- **Acceptance Criteria**: 메인 페이지에서 T-005 health 엔드포인트 호출 → 응답 표시

### 🚦 STAGE 0 게이트
- [ ] `docker compose up -d` → DB 기동
- [ ] `cd backend && ./gradlew bootRun` → 백엔드 기동
- [ ] `cd frontend && npm run dev` → 프론트엔드 기동
- [ ] 프론트에서 백엔드 health 호출 성공
- [ ] **NORTH STAR 재확인** — 다음 스테이지로 갈 준비 됐는가

---

## STAGE 1: 도메인 모델 + DB 스키마
**목표**: v0의 모든 엔티티가 DB에 존재하고 Repository로 CRUD 가능.
**완료 시 동작**: Repository 단위 테스트가 모든 엔티티에 대해 통과.

### T-011: User 엔티티 + Repository
- **Estimated**: 25분
- **Depends on**: T-006
- **Product Anchor**: 0.5 (✅ 회원가입/로그인/데이터 격리)
- **Deliverable**: `auth/domain/User.java` + `UserRepository` (Spring Data JPA) + 필드: id, email, passwordHash, displayName, createdAt
- **Acceptance Criteria**: 단위 테스트로 save/findByEmail 통과

### T-012: Flyway 셋업 + V1 마이그레이션 (users 테이블)
- **Estimated**: 25분
- **Depends on**: T-011
- **Product Anchor**: 0.5 (인프라)
- **Deliverable**: Flyway 의존성 + `db/migration/V1__create_users.sql`
- **Acceptance Criteria**: 백엔드 기동 시 마이그레이션 적용됨, users 테이블 존재

### T-013: Video 엔티티 + Repository
- **Estimated**: 25분
- **Depends on**: T-012
- **Product Anchor**: 0.5 (✅ YouTube 임포트)
- **Deliverable**: `video/domain/Video.java` — youtubeId(unique), title, channelName, durationSeconds, thumbnailUrl, createdAt + Repository + V2 마이그레이션
- **Acceptance Criteria**: 같은 youtubeId 중복 저장 시 예외, Repository 테스트 통과

### T-014: Clip 엔티티 + Repository
- **Estimated**: 30분
- **Depends on**: T-013, T-011
- **Product Anchor**: 0.3.1 (사용자 자유 구간 선택), 0.3.2 (라이브러리)
- **Deliverable**: `clip/domain/Clip.java` — id, userId(FK), videoId(FK), startMs, endMs, name, tags(varchar[] 또는 별도 테이블), transcript(text), createdAt + Repository + V3 마이그레이션
- **Acceptance Criteria**: 한 사용자가 같은 영상의 다른 구간 여러 클립 저장 가능, Repository 테스트 통과

### T-015: ClipAnalysis 엔티티 + Repository
- **Estimated**: 25분
- **Depends on**: T-014
- **Product Anchor**: 0.3.3 (앱 안에서 AI 설명)
- **Deliverable**: `analysis/domain/ClipAnalysis.java` — clipId(FK, unique), grammarNotes(text), keyExpressions(text/json), vocabularyHints(text/json), generatedAt, model + Repository + V4 마이그레이션
- **Acceptance Criteria**: 한 클립당 분석 1개 (unique constraint), 캐시 활용 가능

### T-016: Recording 엔티티 + Repository
- **Estimated**: 25분
- **Depends on**: T-014
- **Product Anchor**: 0.5 (✅ 녹음 + 비교)
- **Deliverable**: `recording/domain/Recording.java` — id, userId(FK), clipId(FK), filePath, durationMs, createdAt + Repository + V5 마이그레이션
- **Acceptance Criteria**: 한 클립에 여러 녹음 누적 저장 가능, 시간순 정렬 쿼리 동작

### T-017: ReviewItem 엔티티 + Repository
- **Estimated**: 30분
- **Depends on**: T-014
- **Product Anchor**: 0.5 (✅ SRS 복습 큐), 0.3.2 (평생 복습)
- **Deliverable**: `review/domain/ReviewItem.java` — id, userId(FK), clipId(FK), easiness(double, 기본 2.5), intervalDays(int, 기본 0), repetitions(int, 기본 0), dueDate(date), lastReviewedAt + Repository + V6 마이그레이션
- **Acceptance Criteria**: 사용자별 오늘 due 항목 조회 쿼리 동작 (`findByUserIdAndDueDateLessThanEqual`)

### T-018: 엔티티 관계 통합 테스트
- **Estimated**: 30분
- **Depends on**: T-011~T-017
- **Product Anchor**: 전체 (코드 품질)
- **Deliverable**: `@DataJpaTest` 통합 테스트 — User 생성 → Video 생성 → Clip 생성 → ClipAnalysis 생성 → Recording 생성 → ReviewItem 생성. 카스케이드/지연 로딩 검증
- **Acceptance Criteria**: 테스트 1개로 전체 도메인 객체 생성/조회 검증

### 🚦 STAGE 1 게이트
- [ ] Flyway 마이그레이션 6개 적용됨
- [ ] 모든 Repository 단위 테스트 통과
- [ ] **NORTH STAR 재확인** — 도메인 모델이 0.3, 0.5 가치를 반영하는가

---

## STAGE 2: 인증 + 사용자 컨텍스트
**목표**: 회원가입/로그인 동작, JWT로 인증된 사용자만 API 호출 가능.
**완료 시 동작**: 프론트에서 회원가입 → 로그인 → 보호된 API 호출 가능.

### T-019: PasswordEncoder + JWT 유틸
- **Estimated**: 30분
- **Depends on**: T-011
- **Product Anchor**: 0.5 (인증 인프라)
- **Deliverable**: BCryptPasswordEncoder Bean, `JwtTokenProvider` (서명, 검증, 사용자 ID 추출) + 환경변수에서 시크릿 키
- **Acceptance Criteria**: 단위 테스트로 토큰 생성/검증/만료 동작

### T-020: Spring Security 설정
- **Estimated**: 30분
- **Depends on**: T-019
- **Product Anchor**: 0.5 (인증 인프라)
- **Deliverable**: `SecurityConfig` — `/api/auth/**` 공개, 나머지 인증 필요. JWT 필터 등록
- **Acceptance Criteria**: 인증 없이 보호된 엔드포인트 호출 시 401

### T-021: 회원가입 API
- **Estimated**: 25분
- **Depends on**: T-020
- **Product Anchor**: 0.5 (회원가입)
- **Deliverable**: `POST /api/auth/signup` — email, password, displayName. 비밀번호 해싱 후 저장. 중복 이메일 검증
- **Acceptance Criteria**: 통합 테스트 — 회원가입 성공 → DB에 사용자 존재 + 해시된 비밀번호. 중복 시 409

### T-022: 로그인 API
- **Estimated**: 25분
- **Depends on**: T-021
- **Product Anchor**: 0.5 (로그인)
- **Deliverable**: `POST /api/auth/login` — email, password 검증 후 JWT 발급
- **Acceptance Criteria**: 통합 테스트 — 올바른 자격 증명 시 200 + 토큰. 잘못된 자격 증명 시 401

### T-023: 인증 컨텍스트 주입 (커스텀 어노테이션)
- **Estimated**: 30분
- **Depends on**: T-022
- **Product Anchor**: 전체 (개발 효율)
- **Deliverable**: `@CurrentUser` 커스텀 어노테이션 + ArgumentResolver. 컨트롤러에서 현재 사용자 ID 주입
- **Acceptance Criteria**: 테스트용 보호 엔드포인트가 현재 사용자 정보 반환

### T-024: 프론트엔드 회원가입/로그인 페이지
- **Estimated**: 45분
- **Depends on**: T-022, T-009
- **Product Anchor**: 0.5 (로그인 UX)
- **Deliverable**: `app/(auth)/signup/page.tsx`, `app/(auth)/login/page.tsx`. shadcn Form + Input + Button. 성공 시 토큰 저장 → `/library`로 이동
- **Acceptance Criteria**: 브라우저에서 회원가입 → 로그인 → 라이브러리 페이지(빈 페이지여도 OK)로 라우팅

### T-025: 프론트엔드 인증 스토어 + 보호 라우트
- **Estimated**: 30분
- **Depends on**: T-024
- **Product Anchor**: 0.5 (인증 UX)
- **Deliverable**: Zustand 스토어 — token, user. localStorage 영속화. `(app)` 그룹 layout에서 미인증 시 `/login`으로 리다이렉트
- **Acceptance Criteria**: 미인증 상태로 `/library` 접근 시 로그인 페이지로 이동

### 🚦 STAGE 2 게이트
- [ ] 회원가입 → 로그인 → 보호 페이지 접근 플로우 전체 동작
- [ ] 토큰 만료 시 자동 로그아웃 (선택)
- [ ] **NORTH STAR 재확인** — 인증이 0.5 핵심 기능 잘 받쳐주는가

---

## STAGE 3: YouTube 통합
**목표**: YouTube URL을 임포트하면 자막까지 추출되어 영상이 플레이어에 뜨고 자막이 동기화됨.
**완료 시 동작**: URL 붙여넣기 → 메타데이터 + 자막 로드 → IFrame Player에서 영상 재생 + 자막 하이라이트.

### T-026: YouTube URL 파싱 유틸
- **Estimated**: 20분
- **Depends on**: T-013
- **Product Anchor**: 0.5 (YouTube 임포트)
- **Deliverable**: `video/util/YoutubeUrlParser.java` — 다양한 YouTube URL 형식에서 video ID 추출 (watch?v=, youtu.be, embed, shorts)
- **Acceptance Criteria**: 단위 테스트 — 5가지 URL 형식 모두 동일 ID 추출

### T-027: YouTube 메타데이터 페치 (oEmbed)
- **Estimated**: 30분
- **Depends on**: T-026
- **Product Anchor**: 0.5 (YouTube 임포트)
- **Deliverable**: `video/infrastructure/YoutubeMetadataClient.java` — youtube oEmbed로 title, author, thumbnail 페치. 결과를 Video 엔티티에 저장
- **Acceptance Criteria**: 실제 YouTube URL로 메타데이터 가져옴 (통합 테스트)

### T-028: YouTube 자막 추출
- **Estimated**: 60분
- **Depends on**: T-027
- **Product Anchor**: 0.3.1, 0.5 (자막 기반 클립)
- **Deliverable**: `video/infrastructure/YoutubeTranscriptClient.java` — 자막 추출 라이브러리 사용 (예: `kkdai/youtube` 또는 동등). 자막 없을 시 명확한 예외. 결과: List<TranscriptSegment{startMs, endMs, text}>
- **Acceptance Criteria**: 자막 있는 영상 → 세그먼트 리스트 반환. 자막 없는 영상 → `NoTranscriptAvailableException`
- **⚠️ 주의**: 비공식 라이브러리는 ToS 회색지대. 본인 학습 MVP 단계에선 OK지만 상용 시 검토 필요. `BLOCKERS.md`에 메모.

### T-029: 영상 임포트 API
- **Estimated**: 30분
- **Depends on**: T-028
- **Product Anchor**: 0.5 (YouTube 임포트)
- **Deliverable**: `POST /api/videos/import` — body: `{url}`. 이미 존재하면 기존 Video 반환, 없으면 메타데이터+자막 페치 후 저장
- **Acceptance Criteria**: 같은 URL 2회 호출 시 두 번째는 즉시 반환 (중복 페치 안 함)

### T-030: 영상 단건 조회 API (자막 포함)
- **Estimated**: 25분
- **Depends on**: T-029
- **Product Anchor**: 0.5 (재생)
- **Deliverable**: `GET /api/videos/{id}` — Video + transcript segments 반환
- **Acceptance Criteria**: 응답에 자막 세그먼트 시간 정보 포함

### T-031: 프론트엔드 영상 임포트 페이지
- **Estimated**: 30분
- **Depends on**: T-029, T-024
- **Product Anchor**: 0.5 (임포트 UX)
- **Deliverable**: `app/(app)/import/page.tsx` — URL 입력 → 임포트 → 성공 시 플레이어 페이지로 이동
- **Acceptance Criteria**: URL 붙여넣고 임포트 → 메타데이터 표시 → "쉐도잉 시작" 버튼

### T-032: 프론트엔드 YouTube IFrame Player 래퍼
- **Estimated**: 60분
- **Depends on**: T-031
- **Product Anchor**: 0.5 (재생)
- **Deliverable**: `components/player/YoutubePlayer.tsx` — IFrame Player API 로드, `videoId` prop, 재생 컨트롤(play, pause, seekTo, setPlaybackRate, getCurrentTime) 외부 노출
- **Acceptance Criteria**: 페이지에서 컴포넌트 마운트 시 영상 재생 가능, 외부에서 seekTo 호출 가능

### T-033: 프론트엔드 자막 동기 표시
- **Estimated**: 45분
- **Depends on**: T-030, T-032
- **Product Anchor**: 0.5 (재생)
- **Deliverable**: `components/player/TranscriptPanel.tsx` — 자막 세그먼트 리스트. 현재 재생 시간에 해당하는 세그먼트 하이라이트, 클릭 시 해당 시간으로 seek
- **Acceptance Criteria**: 재생 중 자막 자동 스크롤 + 하이라이트, 자막 클릭 시 영상 점프

### 🚦 STAGE 3 게이트
- [ ] URL 임포트 → 자막 추출 → 플레이어에서 영상 재생 + 자막 하이라이트 전체 플로우
- [ ] 자막 없는 영상은 명확한 에러 메시지
- [ ] **NORTH STAR 재확인** — 0.3.1 "사용자 자유 구간 선택" 준비 완료

---

## STAGE 4: 클립 생성 + 라이브러리
**목표**: 영상에서 드래그로 구간 선택 → 클립 저장 → 라이브러리에서 보임 → 무한 반복 재생.
**완료 시 동작**: 사용자가 자기 라이브러리에 5개 클립 만들고 각 클립 무한 루프 재생 가능.

### T-034: 클립 저장 API
- **Estimated**: 30분
- **Depends on**: T-014, T-030
- **Product Anchor**: 0.3.1, 0.3.2
- **Deliverable**: `POST /api/clips` — body: `{videoId, startMs, endMs, name, tags}`. 자막 자동 추출하여 저장 (Video 자막에서 해당 구간 텍스트 슬라이스)
- **Acceptance Criteria**: 클립 저장 시 transcript 필드 자동 채워짐

### T-035: 클립 목록 API
- **Estimated**: 25분
- **Depends on**: T-034
- **Product Anchor**: 0.3.2 (라이브러리)
- **Deliverable**: `GET /api/clips` — 페이징, 검색(name/transcript LIKE), 태그 필터. 현재 사용자 클립만
- **Acceptance Criteria**: 다른 사용자 클립은 안 보임 (데이터 격리), 검색 동작

### T-036: 클립 단건 조회 + 삭제 API
- **Estimated**: 20분
- **Depends on**: T-035
- **Product Anchor**: 0.3.2
- **Deliverable**: `GET /api/clips/{id}` (Video 정보 + 자막 포함), `DELETE /api/clips/{id}` (소유자만)
- **Acceptance Criteria**: 다른 사용자가 삭제 시도 시 403

### T-037: 프론트엔드 영상 페이지 — 구간 선택 UI
- **Estimated**: 75분
- **Depends on**: T-033
- **Product Anchor**: 0.3.1 (자유 구간 선택, 절대 타협 안 함)
- **Deliverable**: 자막 패널에서 시작 자막 클릭 → 끝 자막 클릭 → 선택된 범위 시각화. 또는 자막 텍스트 위에 드래그. "이 구간 클립 저장" 버튼
- **Acceptance Criteria**: 시작/끝 자막 선택 → 시간 범위 정확히 캡처

### T-038: 프론트엔드 클립 저장 모달
- **Estimated**: 30분
- **Depends on**: T-037, T-034
- **Product Anchor**: 0.3.4 (마찰 제거 UX)
- **Deliverable**: 모달 — 이름 입력 (자막 첫 문장 기본값), 태그 입력. 저장 시 API 호출 → 라이브러리로 이동 옵션
- **Acceptance Criteria**: 저장 후 토스트 알림 + 라이브러리에서 즉시 보임

### T-039: 프론트엔드 라이브러리 페이지
- **Estimated**: 45분
- **Depends on**: T-035
- **Product Anchor**: 0.3.2 (라이브러리)
- **Deliverable**: `app/(app)/library/page.tsx` — 클립 카드 그리드. 카드: 영상 썸네일, 클립 이름, 시간 범위, 자막 미리보기 2줄, 태그. 검색바, 태그 필터
- **Acceptance Criteria**: 클립 카드 클릭 시 플레이어 페이지로 이동

### T-040: 프론트엔드 클립 플레이어 페이지 (무한 반복)
- **Estimated**: 60분
- **Depends on**: T-036, T-032
- **Product Anchor**: 0.5 (무한반복 + 속도 조절)
- **Deliverable**: `app/(app)/player/[clipId]/page.tsx` — 클립의 영상 startMs로 점프 → endMs 도달 시 startMs로 자동 점프 (무한 루프). 속도 조절 슬라이더 (0.5x~1.5x)
- **Acceptance Criteria**: 클립 범위 밖으로 안 나감, 속도 조절 즉시 반영

### T-041: 프론트엔드 클립 자막 표시 + 큰 글씨
- **Estimated**: 25분
- **Depends on**: T-040
- **Product Anchor**: 0.3.4 (UX)
- **Deliverable**: 플레이어 페이지 하단에 현재 클립 자막 큰 글씨로 표시 (쉐도잉용)
- **Acceptance Criteria**: 자막이 명확히 읽힘, 시간 동기 (한 자막 세그먼트 단위)

### 🚦 STAGE 4 게이트
- [ ] 영상 임포트 → 구간 선택 → 클립 저장 → 라이브러리에서 보임 → 플레이어에서 무한 반복 재생
- [ ] 0.3.1 "자유 구간 선택"이 직관적인가 (드래그 또는 자막 클릭 모두 OK)
- [ ] **NORTH STAR 재확인** — v0의 절반 완성. 0.3.1, 0.3.2 충실히 구현됐는가

---

## STAGE 5: AI 인라인 설명
**목표**: 클립 저장 시 백그라운드로 Claude API 호출 → 분석 결과 캐싱 → 플레이어에서 즉시 표시.
**완료 시 동작**: 클립 저장 → 몇 초 후 분석 결과 나타남. 같은 클립 다시 봐도 API 재호출 없음.

### T-042: Anthropic Claude 클라이언트
- **Estimated**: 45분
- **Depends on**: T-006
- **Product Anchor**: 0.3.3 (앱 안에서 AI 설명)
- **Deliverable**: `analysis/infrastructure/ClaudeClient.java` — API 키는 환경변수, 모델은 `claude-haiku-4-5-20251001` (비용 최우선). 메서드: `analyzeClip(transcript) -> AnalysisResult`
- **Acceptance Criteria**: 단위 테스트 (mock) + 통합 테스트 (실제 API 호출, 환경변수 있을 때만)

### T-043: 클립 분석 프롬프트 설계
- **Estimated**: 45분
- **Depends on**: T-042
- **Product Anchor**: 0.3.3
- **Deliverable**: `analysis/prompt/ClipAnalysisPrompt.java` — 입력: 자막 텍스트. 출력 JSON 스키마:
  ```json
  {
    "grammar_notes": ["string"],
    "key_expressions": [{"phrase": "string", "meaning": "string", "usage": "string"}],
    "vocabulary": [{"word": "string", "meaning": "string", "level": "basic|intermediate|advanced"}],
    "context_summary": "string"
  }
  ```
  프롬프트에 "must return valid JSON only" + 예시 1개 포함
- **Acceptance Criteria**: 5개 다른 자막에 대해 응답이 항상 valid JSON, 필드 누락 없음

### T-044: 클립 저장 시 비동기 분석 트리거
- **Estimated**: 30분
- **Depends on**: T-043, T-034
- **Product Anchor**: 0.3.3, 0.3.4 (마찰 제거 — 사용자 대기 X)
- **Deliverable**: `@Async` 메서드로 클립 저장 후 ClaudeClient 호출 → ClipAnalysis 저장. Spring `@EnableAsync` 설정
- **Acceptance Criteria**: 클립 저장 API 응답 시간이 분석 대기로 늘어나지 않음 (비동기 검증)

### T-045: 클립 분석 조회 API
- **Estimated**: 20분
- **Depends on**: T-015, T-044
- **Product Anchor**: 0.3.3
- **Deliverable**: `GET /api/clips/{id}/analysis` — ClipAnalysis 반환. 아직 생성 중이면 202 + pending 상태
- **Acceptance Criteria**: 생성 완료 후 200 + 분석 결과, 진행 중일 땐 202

### T-046: 프론트엔드 클립 플레이어에 AI 설명 패널
- **Estimated**: 60분
- **Depends on**: T-045, T-040
- **Product Anchor**: 0.3.3, 0.3.4 (인라인, 마찰 제거)
- **Deliverable**: 플레이어 페이지에 사이드 패널/탭 — Grammar / Expressions / Vocabulary 섹션. pending 시 스피너 + 안내. 분석 없을 시 "분석 생성하기" 버튼
- **Acceptance Criteria**: 클립 저장 직후 플레이어 접근 → 분석 준비되면 자동 표시 (폴링 또는 SSE)

### T-047: 분석 재생성 API + UI
- **Estimated**: 25분
- **Depends on**: T-046
- **Product Anchor**: 0.3.3 (재시도 가능)
- **Deliverable**: `POST /api/clips/{id}/analysis/regenerate` — 기존 ClipAnalysis 삭제 + 재생성 트리거. 프론트에서 "다시 분석" 버튼
- **Acceptance Criteria**: 재생성 후 새 분석 결과로 갱신됨

### 🚦 STAGE 5 게이트
- [ ] 클립 저장 → 비동기 분석 → 플레이어에서 자동 표시
- [ ] 분석 결과가 실제로 학습에 도움되는 품질인가 (수동 검수 5개 클립)
- [ ] API 비용이 예상 범위 내인가 (Haiku 클립당 비용 측정, $0.01 이하 확인)
- [ ] **NORTH STAR 재확인** — 0.3.3 "앱 안에서 AI 설명" 충실히 구현됐는가

---

## STAGE 6: 녹음 + A/B 비교
**목표**: 클립 재생 중 녹음 버튼 → 사용자 음성 캡처 → 본인 녹음 vs 원본 A/B 재생 + 어제 녹음 비교.
**완료 시 동작**: 같은 클립 어제 녹음과 오늘 녹음 나란히 들어볼 수 있음.

### T-048: 녹음 파일 저장 인터페이스
- **Estimated**: 25분
- **Depends on**: T-006
- **Product Anchor**: 0.5 (녹음 + 비교)
- **Deliverable**: `recording/infrastructure/RecordingStorage.java` 인터페이스 + `LocalRecordingStorage` 구현체 (로컬 파일 시스템). 메서드: `save(byte[], userId, clipId) -> filePath`, `load(filePath) -> byte[]`, `delete(filePath)`
- **Acceptance Criteria**: 인터페이스 추상화로 추후 S3 구현체 추가 가능. 사용자/클립별 디렉터리 격리

### T-049: 녹음 업로드 API
- **Estimated**: 35분
- **Depends on**: T-048, T-016
- **Product Anchor**: 0.5
- **Deliverable**: `POST /api/clips/{id}/recordings` — multipart/form-data로 오디오 파일 + duration. 저장 후 Recording 엔티티 생성
- **Acceptance Criteria**: 파일 크기 제한 (예: 10MB), 미지원 포맷 시 400, 통합 테스트

### T-050: 녹음 목록 API + 단건 스트리밍 API
- **Estimated**: 35분
- **Depends on**: T-049
- **Product Anchor**: 0.5 (어제 녹음 비교)
- **Deliverable**: `GET /api/clips/{id}/recordings` — 시간순. `GET /api/recordings/{id}/audio` — 오디오 바이트 스트리밍 (Content-Type: audio/webm 등)
- **Acceptance Criteria**: 본인 녹음만 조회 가능, 다른 사용자 녹음 접근 시 403

### T-051: 녹음 삭제 API
- **Estimated**: 15분
- **Depends on**: T-050
- **Product Anchor**: 0.5
- **Deliverable**: `DELETE /api/recordings/{id}` — 소유자만. 파일 + 엔티티 삭제
- **Acceptance Criteria**: 파일 시스템에서도 실제 삭제 확인

### T-052: 프론트엔드 MediaRecorder 래퍼
- **Estimated**: 45분
- **Depends on**: T-040
- **Product Anchor**: 0.5
- **Deliverable**: `components/recording/Recorder.tsx` — 마이크 권한 요청, 녹음 시작/정지, 결과 Blob 반환. 권한 거부 처리
- **Acceptance Criteria**: Chrome/Safari에서 녹음 동작, 권한 거부 시 명확한 안내

### T-053: 프론트엔드 녹음 UI + 업로드
- **Estimated**: 45분
- **Depends on**: T-052, T-049
- **Product Anchor**: 0.5
- **Deliverable**: 플레이어 페이지에 녹음 버튼 (큰 빨간 버튼). 녹음 중 시각화 (파형 또는 깜빡임). 녹음 후 자동 업로드 → 토스트
- **Acceptance Criteria**: 녹음 → 업로드 → 녹음 목록에 즉시 반영

### T-054: 프론트엔드 A/B 재생 + 녹음 타임라인
- **Estimated**: 60분
- **Depends on**: T-053, T-050
- **Product Anchor**: 0.5 (어제 녹음 vs 오늘 녹음)
- **Deliverable**: 플레이어 페이지에 녹음 목록 (시간순). 각 녹음에 "원본 → 본인 → 원본" 자동 A/B 재생 버튼. 어제/지난주 녹음과 오늘 녹음 나란히 비교 UI
- **Acceptance Criteria**: 같은 클립 다른 날짜 녹음 2개 비교 청취 가능

### 🚦 STAGE 6 게이트
- [ ] 클립 재생 → 녹음 → 업로드 → 어제 녹음 vs 오늘 녹음 비교 전체 플로우
- [ ] 마이크 권한 미허용 케이스 적절히 처리
- [ ] **NORTH STAR 재확인** — 발음 점수 없이도 본인 발전 체감 가능한가 (0.3.2 + 0.4 발음 평가 OUT 검증)

---

## STAGE 7: SRS 복습 큐
**목표**: 저장된 클립이 SM-2 알고리즘으로 자동 복습 일정에 들어감. 매일 due 클립 목록 + 복습 흐름.
**완료 시 동작**: 클립 저장 → 첫 복습 → Easy/Good/Hard 응답 → 다음 복습 일정 자동 계산.

### T-055: SM-2 알고리즘 구현
- **Estimated**: 45분
- **Depends on**: T-017
- **Product Anchor**: 0.5 (SRS)
- **Deliverable**: `review/domain/Sm2Calculator.java` — 입력: 현재 ReviewItem + quality(0~5). 출력: 새 easiness, interval, repetitions, nextDueDate. 표준 SM-2 공식 구현
- **Acceptance Criteria**: 단위 테스트 — quality < 3 시 repetitions=0+interval=1, quality >= 3 시 표준 진행. 5가지 시나리오 테스트

### T-056: 클립 저장 시 ReviewItem 자동 생성
- **Estimated**: 20분
- **Depends on**: T-055, T-034
- **Product Anchor**: 0.5
- **Deliverable**: 클립 저장 후 ReviewItem(dueDate=오늘, easiness=2.5, interval=0) 생성
- **Acceptance Criteria**: 클립 저장 즉시 복습 큐에 들어감

### T-057: 복습 큐 API
- **Estimated**: 25분
- **Depends on**: T-056
- **Product Anchor**: 0.5
- **Deliverable**: `GET /api/review/queue?date=today` — 오늘 due ReviewItem + 연결된 Clip 정보. 우선순위: due 지난 거부터
- **Acceptance Criteria**: 다른 사용자 큐 안 보임. 빈 큐일 땐 빈 배열

### T-058: 복습 응답 API
- **Estimated**: 25분
- **Depends on**: T-057
- **Product Anchor**: 0.5
- **Deliverable**: `POST /api/review/items/{id}/respond` — body: `{quality: 0~5}`. Sm2Calculator 적용 → ReviewItem 갱신
- **Acceptance Criteria**: 응답 후 nextDueDate 정확히 계산됨 (단위 테스트와 일치)

### T-059: 프론트엔드 복습 페이지
- **Estimated**: 60분
- **Depends on**: T-058
- **Product Anchor**: 0.5 (평생 복습)
- **Deliverable**: `app/(app)/review/page.tsx` — 오늘 due 클립 카드 표시 → 클릭 시 플레이어 모드. 재생 후 "쉽다(Easy) / 보통(Good) / 어렵다(Hard) / 다시(Again)" 4개 버튼 → 응답 → 다음 클립 자동
- **Acceptance Criteria**: 모든 큐 소진 시 "오늘 복습 완료" 메시지. 진행 카운트(3/10)

### T-060: 대시보드 위젯 (오늘 due, 연속 일수)
- **Estimated**: 30분
- **Depends on**: T-059
- **Product Anchor**: 0.5 (학습 동기)
- **Deliverable**: 라이브러리 페이지 상단 또는 메인에 "오늘 due 7개", "연속 5일" 위젯. 연속 일수 계산 로직 (백엔드 또는 클라이언트)
- **Acceptance Criteria**: 위젯 클릭 시 복습 페이지로 이동

### 🚦 STAGE 7 게이트
- [ ] 클립 저장 → 복습 → 응답 → 다음 일정 → 다음날 다시 복습 사이클 검증
- [ ] **NORTH STAR 재확인** — 0.3.2 "평생 복습 자산" 충실히 구현됐는가

---

## STAGE 8: 개발자 큐레이션 컬렉션
**목표**: 미리 큐레이션된 30개 영상이 "추천" 섹션에 있어서 신규 사용자가 즉시 시작 가능.
**완료 시 동작**: 회원가입 직후 "추천 영상 30개" 보임 → 클릭 → 클립 따기 시작.

### T-061: 큐레이션 영상 메타데이터 시드
- **Estimated**: 90분 (영상 고르는 시간 포함)
- **Depends on**: T-029
- **Product Anchor**: 0.5 (큐레이션)
- **Deliverable**: `db/migration/V7__seed_curated_videos.sql` 또는 부트스트랩 Java 코드 — 개발자 영상 30개 URL + 카테고리 (예: tech_talk, interview, conference, code_review, demo)
  - 추천 콘텐츠 소스: AWS re:Invent, Google I/O, KubeCon, YC interviews, Lex Fridman tech episodes, GitHub Octoverse
  - 각 영상은 자막 있는지 사전 확인
- **Acceptance Criteria**: 마이그레이션 후 30개 큐레이션 영상이 DB에 존재

### T-062: Collection 도메인
- **Estimated**: 30분
- **Depends on**: T-061
- **Product Anchor**: 0.5
- **Deliverable**: `Collection` 엔티티 (id, name, description) + `CollectionVideo` 조인 테이블 (collection_id, video_id, order). 마이그레이션 + Repository
- **Acceptance Criteria**: 한 영상이 여러 컬렉션에 속할 수 있음

### T-063: 추천 컬렉션 API + 프론트 화면
- **Estimated**: 45분
- **Depends on**: T-062
- **Product Anchor**: 0.5 (신규 사용자 진입)
- **Deliverable**: `GET /api/collections` — 공개 컬렉션 목록. `GET /api/collections/{id}` — 영상 목록 포함. 프론트엔드 `/discover` 페이지
- **Acceptance Criteria**: 신규 사용자도 즉시 컬렉션 → 영상 → 플레이어 → 클립 저장 가능

### 🚦 STAGE 8 게이트
- [ ] 회원가입 → 추천 영상 30개 보임 → 1개 클릭 → 클립 저장 플로우 동작
- [ ] **NORTH STAR 재확인** — 신규 사용자가 5분 안에 첫 클립 저장 가능한가 (마찰 제거 검증)

---

## STAGE 9: 폴리시 + 배포
**목표**: 실제 사용 가능한 상태로 배포. 본인 + 친구 3명이 매일 쓸 수 있는 품질.

### T-064: 에러 바운더리 + 로딩 상태
- **Estimated**: 45분
- **Depends on**: STAGE 7 완료
- **Product Anchor**: 0.3.4 (UX)
- **Deliverable**: 프론트엔드 모든 페이지에 ErrorBoundary, 모든 API 호출에 로딩 스피너. 실패 시 사용자 친화적 메시지
- **Acceptance Criteria**: 백엔드 강제 종료 후 프론트가 깨지지 않음, 명확한 에러 표시

### T-065: 모바일 반응형 점검
- **Estimated**: 45분
- **Depends on**: T-064
- **Product Anchor**: 0.3.4 (UX, 모바일도 일단 사용 가능)
- **Deliverable**: 모든 페이지 모바일 뷰포트(375px) 점검 + 수정. 특히 플레이어 페이지, 라이브러리 그리드
- **Acceptance Criteria**: 모바일 Chrome에서 핵심 플로우 (임포트, 클립 저장, 복습, 녹음) 동작

### T-066: 백엔드 Dockerfile + 배포 준비
- **Estimated**: 45분
- **Depends on**: STAGE 7 완료
- **Product Anchor**: 운영
- **Deliverable**: `backend/Dockerfile` (멀티 스테이지 빌드), prod profile 환경변수 문서화
- **Acceptance Criteria**: `docker build` 성공, 컨테이너 기동 시 정상 동작

### T-067: 프론트엔드 Vercel 배포
- **Estimated**: 30분
- **Depends on**: T-064
- **Product Anchor**: 운영
- **Deliverable**: Vercel 프로젝트 연결 + 환경변수 (`NEXT_PUBLIC_API_URL`)
- **Acceptance Criteria**: 배포된 URL에서 프론트 접근 가능

### T-068: 백엔드 호스팅 배포 (Railway 또는 Render)
- **Estimated**: 60분
- **Depends on**: T-066
- **Product Anchor**: 운영
- **Deliverable**: Railway/Render에 백엔드 + PostgreSQL 호스팅. 환경변수 (DB, JWT secret, Anthropic API key)
- **Acceptance Criteria**: 배포된 백엔드 URL로 프론트가 정상 호출

### T-069: 종단간 스모크 테스트
- **Estimated**: 30분
- **Depends on**: T-067, T-068
- **Product Anchor**: 전체
- **Deliverable**: 배포 환경에서 회원가입 → 영상 임포트 → 클립 저장 → AI 분석 확인 → 녹음 → 복습 전체 사이클 수동 테스트. 발견된 버그는 `BLOCKERS.md`에 기록
- **Acceptance Criteria**: 위 사이클 무중단 통과

### 🚦 STAGE 9 게이트 (최종)
- [ ] 배포된 환경에서 전체 사이클 동작
- [ ] 본인이 5개 클립 저장 + 복습 가능한 상태
- [ ] **NORTH STAR 최종 검증** — 0.1 미션과 0.3 5가지 가치 모두 충족하는가
- [ ] **OUT-OF-SCOPE 검증** — 0.4 항목이 하나도 들어가지 않았는가

---

## 5. 24시간 시간 예산 (참고)

총 태스크: 69개. 평균 30~35분 → 약 35~40시간. **24시간 안에 다 못 함이 정상.**

24시간 안에 우선순위:
- **MUST**: STAGE 0~4 (38 태스크) + STAGE 7 (6 태스크) — v0의 최소 기능
- **SHOULD**: STAGE 5 (6 태스크) — AI 설명
- **NICE**: STAGE 6, 8, 9 — 녹음, 큐레이션, 배포

24시간 후 못 끝낸 부분은 다음 세션으로. 절대 품질 깎아서 다 끝내려 하지 말 것.

---

## 6. 절대 금지 사항 (다시 강조)

1. ❌ **섹션 0.4 OUT-OF-SCOPE 기능을 v0에 추가하기**
2. ❌ **NORTH STAR 확인 없이 새 기능 만들기**
3. ❌ **테스트 없이 비즈니스 로직 작성**
4. ❌ **하드코딩된 API 키 / 시크릿**
5. ❌ **마이그레이션 없이 DB 스키마 변경**
6. ❌ **임의로 다른 라이브러리/프레임워크 도입**
7. ❌ **사용자 데이터 격리 미흡 (다른 사용자 데이터 접근 가능)**
8. ❌ **품질 깎아서 태스크 끝내기 — 차라리 다음 세션으로 미루기**

---

## 7. 진행 추적 파일 (Claude Code가 갱신)

### PROGRESS.md 형식
```
# 진행 상황

## 완료
- [x] T-001: Git 리포 + 모노레포 구조 (2026-MM-DD HH:MM)
- [x] T-002: ...

## 진행 중
- [ ] T-015: ClipAnalysis 엔티티

## 다음
- [ ] T-016, T-017, ...
```

### BLOCKERS.md 형식
```
# 블로커

## 활성
- B-001 (2026-MM-DD): T-028 YouTube 자막 라이브러리 — ToS 회색지대. 본인 학습 OK, 상용 시 검토.

## 해결됨
- B-000: ...
```

---

## 8. 마지막 알림 — Claude Code에게

**이 프로젝트의 핵심은 기능 개수가 아니라 마찰 제거다.**

- 사용자가 ChatGPT 안 가도 됨 → 그래서 AI 설명이 인라인이어야 함
- 사용자가 Anki 설정 안 해도 됨 → 그래서 SRS가 자동으로 들어와야 함
- 사용자가 자막 분할에 갇히지 않음 → 그래서 자유 구간 선택이 필요함

**기능을 더 넣고 싶다는 충동이 들 때, 그게 마찰을 더 만드는지 줄이는지 물어봐.** 더 만들면 v0에 안 들어감.

매 태스크 시작 시 섹션 0 다시 읽기.