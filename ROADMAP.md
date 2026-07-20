# Mimi (shadow-ai) — 현행 로드맵

> 최종 갱신: 2026-07-20. 이 문서는 짧게 유지한다 — 세부 명세는 각 트랙 문서가 진실의 원천이다.
> 구 버전(TubeShadow 24시간 MVP 로드맵, 2026-05, 866줄)은
> `docs/archive/ROADMAP-2026-05-tubeshadow-mvp.md`에 보존. STAGE 0~9 / T-XXX 태스크 체계는
> 완료된 역사이며 더 이상 실행 지침이 아니다.

---

## 0. NORTH STAR

- **제품명: Mimi** (구명 TubeShadow — repo·백엔드 패키지 `com.tubeshadow`는 내부명으로 유지)
- **한 줄**: 개발자/지식노동자를 위한 YouTube 기반 영어 쉐도잉 훈련 도구.
  **파는 것은 Mimi의 훈련 워크플로다** — 구간 선택·반복 → 녹음 → 원본 A/B 비교 → 저장 →
  잊기 전 복습. YouTube 영상 시청권을 팔지 않는다 (오너 확정, `docs/MONETIZATION-DESIGN.md` §0).
- **버티컬 전략**: 개발자 니치 먼저 완전히. 유료 수백 명 + D30 리텐션 + 입소문 전까지
  버티컬 2 착수 금지.
- **수익화 구조**: 한 앱에서 Free Preview → Shadow → AI 3단계.
  백엔드가 `SHADOW_ACCESS` / `AI_ACCESS` capability를 중앙 판정. 전체 명세·개발 순서(PAY-1~PAY-6)는
  `docs/MONETIZATION-DESIGN.md` (PAY-0.1) — 유료화 작업의 유일한 진실의 원천.
- **절대 가치 5** (구 로드맵 §0.3 승계, 여전히 유효):
  ① 사용자 자유 구간 선택 ② 평생 복습 라이브러리 ③ 앱 안 AI 설명 ④ 마찰 제거 = 차별화
  ⑤ 낮은 운영 비용.

## 1. 현재 상태 (2026-07-20 기준, 검증된 것만)

- **main = 7월 모바일 작업 통합본**: redesign R1–R4, UX U1–U4, realtime sparring, verbs,
  android-readiness, m-menu가 `b266e6b`(2026-07-17)로 병합됨. 롤백점
  `backup/main-pre-integration`(3c10afc).
- **TestFlight는 build 18 (v1.1.0, 커밋 3c10afc = 7/7 main, 7/9 빌드)** — 7월 작업 미반영.
  EAS Free 플랜 iOS 클라우드 빌드 월 쿼터 소진, **2026-08-01 리셋** (BLOCKERS B-002).
  우회: `eas build --local`.
- **PAY-0 완료**: 수익화 설계 문서 커밋(`17702af`) + 적대 검증 리뷰(주장 25건 확인, 발견 13건)
  + PAY-0.1 반영.
- 웹(`frontend/`)은 `mimi.daeseon.ai` 배포, 백엔드는 AWS(ECS/RDS). 모바일이 주 표면.

## 2. 다음 작업 (순서)

1. **PAY-1** — capability core (`user_entitlements` + `AccessPolicy`) + AI gate 구멍 봉합
   (클립 자동분석·regenerate). 명세: `docs/MONETIZATION-DESIGN.md` §14 PAY-1. **지금 착수 가능.**
2. **PAY-2~PAY-6** — provider adapter → 모바일 paywall → 스토어 카탈로그/sandbox → AI 비용 가드
   → 정책/릴리스 패킷. 같은 문서 §14.
3. **TestFlight 재개** — 8/1 쿼터 리셋 후 (또는 `eas build --local`) 통합본 컷.
4. **대청소** (별도 세션, 급하지 않음) — 루트 잉여 md 아카이브, docs/ 학습 데이터 분리,
   병합 완료 브랜치 정리 (주의: Track C/D에 main 밖 커밋 존재 — 일괄 삭제 금지).

## 3. OUT OF SCOPE (지금)

- 별도 Free/AI 앱 분리, 광고, 모바일 웹 결제/외부 결제 링크, Supabase 마이그레이션,
  AI 크레딧 팩·팀/가족/평생 플랜 (`docs/MONETIZATION-DESIGN.md` §1.2)
- My Voice, 신규 영작 게임, discover 피드, 무관 UX 리디자인
- 버티컬 2 (위 전략 게이트 통과 전)
- YouTube 자막 스크래핑 경로의 상용 적합성 단정 — 공개 유료 출시 전 launch gate (B-001, PAY-6)

## 4. 세션 시작 절차

1. 이 문서 → `PROGRESS.md` → `BLOCKERS.md` 순서로 읽는다 (CLAUDE.md §0).
2. 유료화 작업이면 `docs/MONETIZATION-DESIGN.md`를 해당 트랙 범위만큼 읽는다.
3. 다음 태스크를 확정해 사용자에게 보고하고, 확인 후 시작한다.

**진실의 원천 맵**: 유료화 = `docs/MONETIZATION-DESIGN.md` · 문제 이력 = `docs/troubleshooting.md` ·
스토어 준비 = `docs/android-store-readiness.md`, `docs/ios-release-checklist.md` ·
블로커 = `BLOCKERS.md` · 세션 로그 = `content/logs/shadow-ai/` (블로그 fetch 경로, 이동 금지).

---

매 결정 시 자문: **이게 마찰을 더 만드는가, 줄이는가?** 그리고: **이게 돈 받는 워크플로를
앞당기는가?**
