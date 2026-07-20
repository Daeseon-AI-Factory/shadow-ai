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

## 해결됨

(없음)
