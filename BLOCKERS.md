# 블로커

> 막힐 때마다 기록. 활성 블로커가 있어도 의존 없는 다른 태스크는 계속 진행.

## 활성

### B-001 (2026-05-24) — YouTube 자막 추출 ToS 회색지대
- **태스크**: T-028 YoutubeTranscriptClient
- **상황**: YouTube 공식 자막 API가 없고, `ytInitialPlayerResponse` 스크래핑 + `timedtext` 호출은 비공식 경로
- **현재 구현**: watch HTML → ytInitialPlayerResponse → captionTracks → fmt=json3 직접 호출 (Mozilla UA)
- **위험**: YouTube가 응답 형식을 바꾸면 깨짐. 상업적 사용 시 ToS 검토 필요
- **MVP 영향**: 본인 학습용으로는 OK. 자막 못 가져오는 영상은 `transcript_status=UNAVAILABLE`로 저장하고 진행
- **다음 단계** (v1 이후 검토): YouTube Data API v3 사용 또는 공식 파트너 채널과 협의
- **2026-07-20 갱신**: 공개 유료 출시의 공식 launch gate로 승격 — 허용 경로 후보와 카피 금지
  규칙은 `docs/MONETIZATION-DESIGN.md` §4.2, 게이트는 동 문서 §15·PAY-6

### B-002 (2026-07-17) — EAS Free 플랜 iOS 클라우드 빌드 월 쿼터 소진
- **상황**: 7월 쿼터(build 17·18로 사용) 소진 → 7월 통합본(`b266e6b`)의 TestFlight 컷 불가
- **에러**: `This account has used its iOS builds from the Free plan this month, which will reset in 13 days (on Sat Aug 01 2026).`
- **영향**: TestFlight는 build 18(7/9, 통합 전 커밋 3c10afc)로 고정. 코드/게이트 문제 아님 —
  backend UP·tsc·expo export 전부 통과 후 유료 단계에서만 막힘
- **해제**: 2026-08-01 쿼터 리셋 대기, 또는 `eas build --local`(크레딧 0).
  상세: `docs/troubleshooting.md` 2026-07-18 항목

### B-003 (2026-07-20) — 릴리스 게이트: PAY-1 백엔드는 PAY-3 전 프로덕션 배포 금지
- **상황**: PAY-1이 Shadow 쓰기(클립 생성/편집, 녹음 업로드, SRS 채점, rep, 덱/라이브러리, 임포트)에
  `403 SHADOW_REQUIRED` 게이트를 추가함. 배포된 모바일 빌드는 이 코드를 모른다 —
  `AI_NOT_ALLOWED`/`SPARRING_NOT_ALLOWED`만 처리(mobile compose.tsx:48, sparring.tsx:55).
- **영향**: allowlist에 없는 계정은 배포 즉시 핵심 드릴/저장 루프가 무한 재시도 알림으로 깨짐
  (drill-runner.tsx onError). paywall은 PAY-3에서 오므로 그 전 배포는 무료 사용자 전원 차단.
- **완화**: 배포는 수동 트리거(.github/workflows/deploy.yml)라 merge≠배포. 서버 기존 유료(pro)
  사용자는 V21 백필로 양쪽 capability 유지.
- **해제 조건**: PAY-3 클라이언트(SHADOW_REQUIRED→paywall 라우팅) 배포와 함께, 또는 오너가
  명시 승인한 롤아웃 플랜과 함께만 프로덕션 배포.

## 해결됨

(없음)
