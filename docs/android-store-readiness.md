# Mimi Android / Google Play 최초 등록 준비

- 감사 기준일: 2026-07-16
- 기준 브랜치: `codex/and-m-integration`
- 작업 브랜치: `codex/store-android`
- 패키지: `ai.daeseon.mimi`
- 앱 버전: `1.1.0`

이 문서는 Play Console에 값을 입력하거나 AAB를 업로드하는 실행 문서가 아니다. 최초 등록에 필요한 입력 초안, 오너 작업, 실패조건과 검증 절차를 분리한 체크리스트다. Play Console의 실제 값은 저장소에서 확인할 수 없으므로 별도로 표시하지 않은 Console 상태도 `[unverified]`다.

## 1. 현재 판정

내부 테스트용 등록 준비는 **조건부**다. 저장소 쪽 production Android 경로는 AAB, internal track, draft release로 명시했지만 다음 항목은 Play Console 또는 새 AAB에서 확인해야 한다.

Dependency 참고: clean install 뒤 `npm audit --omit=dev --json`은 moderate 11, high 0, critical 0을 보고했다. 대부분 Expo config/build tooling과 `uuid` 경로에 연결돼 있으며 production 앱에서 실제로 악용 가능한지는 `[unverified]`다. audit의 제안에는 Expo 46으로의 major downgrade가 포함돼 자동 수정하지 않았다. 별도 dependency triage 후에만 버전을 변경한다.

출시를 막는 항목:

- `[unverified]` Play Console 앱 생성 및 Play App Signing 약관 수락 여부
- `[unverified]` Play App Signing의 upload certificate가 EAS production keystore와 일치하는지
- 개인정보처리방침이 실제 코드의 OpenAI 음성·텍스트 처리를 제3자 목록에 포함하지 않음
- AI 기능의 Play AI-generated content 정책 적용 여부와 인앱 신고/플래그 대응이 미확정
- 앱 없이 계정 삭제를 요청할 웹 경로가 미확정. 현재 support page는 인앱 삭제만 안내하고, 전용 URL `https://mimi.daeseon.ai/en/account-deletion`은 감사 시점에 HTTP 404였음
- Android 규격으로 캡처된 스크린샷과 1024×500 feature graphic을 저장소에서 찾지 못함. 저장소 밖 자산은 `[unverified]`
- 현재 소스 HEAD로 만든 production AAB가 없음. 로컬 release merged manifest는 생성·검사했지만 AAB 자체는 `[unverified]`

내부 테스트 트랙에만 올리는 동안에도 앱 품질과 정책 위반 가능성이 사라지는 것은 아니다. Data safety 양식은 internal-only 앱에는 면제될 수 있지만, closed/open/production 트랙으로 이동하기 전에 완료해야 한다.

## 2. 서명 경로

권장 경로:

```text
EAS production remote keystore
  -> production AAB의 upload signature
  -> Play Console upload certificate
  -> Google Play App Signing
  -> Google이 tester용 APK에 app-signing key로 재서명
```

용어를 혼동하면 안 된다.

- **Upload key**: EAS가 AAB를 서명하는 키다. Play Console의 upload certificate와 일치해야 한다.
- **App-signing key**: Google Play가 최종 배포 APK를 서명하는 키다. 보통 upload key와 다르다.
- EAS keystore가 존재한다는 사실만으로 Play App Signing 등록까지 확인되지는 않는다.

### 2026-07-16 read-only 조회 결과

- EAS production build credential: remote JKS 구성됨
- key alias: `3673721e16de1e037e809d808bfa0adf`
- EAS upload SHA-1: `0B:73:31:DF:FF:09:DC:85:E2:68:68:A5:6C:E5:CF:08:FA:2D:D1:57`
- Play Store submission용 Google service account: `None assigned yet`
- Play Console upload certificate SHA-1: `[unverified]`
- Play App Signing 활성화 및 app-signing certificate: `[unverified]`

따라서 production signing 상태는 **EAS upload keystore만 확인됨**이다. Play App Signing과의 연결은 아직 확인되지 않았다.

### 최초 수동 등록 — 오너 작업

1. Play Console에서 새 앱을 만들고 패키지 `ai.daeseon.mimi`를 사용한다.
2. Play App Signing 약관을 읽고 수락한다.
3. **새 source HEAD로 production AAB를 만든 뒤** 로컬에서 AAB upload certificate SHA-1을 추출한다.
4. Play Console이 표시하는 upload certificate SHA-1과 3번 값을 문자 단위로 대조한다.
5. Play Console이 표시하는 app-signing certificate SHA-1도 별도로 기록한다. 이 값은 Google 로그인, API allowlist 등에서 필요할 수 있다.
6. Expo 문서상 첫 Google Play 업로드는 최소 한 번 수동으로 수행해야 한다. 이번 트랙에서는 업로드하지 않는다.

### 이후 EAS Submit 자동화 — 최초 수동 업로드 후에만

- Google Play 서비스 계정에 필요한 최소 권한만 부여한다.
- 서비스 계정 JSON은 저장소나 작업 폴더에 넣지 않는다. EAS credential 저장 경로를 사용한다.
- `eas.json` 기본값은 `track: internal`, `releaseStatus: draft`다. 이 기본값은 제출 실행 권한이 아니다.
- 서비스 계정 생성, Play Console 연결, EAS credential 등록 상태는 모두 `[unverified]`다.

실패조건:

- AAB upload SHA-1과 Play Console upload certificate SHA-1 불일치
- Play App Signing 미등록 또는 약관 미수락
- 기존 패키지명 충돌
- 현재 HEAD AAB가 아닌 과거 산출물 사용
- 서비스 계정 JSON 또는 `.jks`/`.keystore`가 Git 추적 대상에 포함됨

공식 근거:

- [Google Play App Signing](https://developer.android.com/studio/publish/app-signing)
- [Expo: Submit to Google Play](https://docs.expo.dev/submit/android/)
- [Expo: EAS JSON reference](https://docs.expo.dev/eas/json/)

## 3. Play Console에서 오너가 입력할 항목

### Developer account 선행조건

계정 유형, 생성일, 본인확인 상태는 저장소에서 확인할 수 없어 모두 `[unverified]`다.

- Personal/Organization 중 실제 법적 주체와 맞는 계정 유형 확인
- legal identity, developer/contact email, phone 등 Play가 요구하는 항목 확인 및 인증
- Organization이면 Google Payments profile과 D-U-N-S/법인 정보 일치 확인
- 새 Personal account이면 Play Console mobile app을 통한 실제 Android device verification 완료
- account owner 권한으로 앱 생성과 Play App Signing 약관 처리

공식 근거:

- [Verify developer identity](https://support.google.com/googleplay/android-developer/answer/10841920?hl=en)
- [Device verification for new accounts](https://support.google.com/googleplay/android-developer/answer/14316361?hl=en)

### 앱 생성과 기본 설정

| 항목 | 초안 / 권고 | 상태 |
| --- | --- | --- |
| 앱 이름 | `Mimi` | 저장소 이름과 일치 |
| 기본 언어 | English (United States) | `[unverified]` 오너 결정 |
| 앱/게임 | App | 코드 기능 기준 권고 |
| 카테고리 | Education | 권고, Console 최종 선택 `[unverified]` |
| 무료/유료 | 현재 제품 정책 확인 후 선택 | `[unverified]`; 최초 무료 앱은 나중에 유료로 전환할 수 없음 |
| 광고 포함 | `No` 후보 | 알려진 모바일 광고 SDK 이름 검색에서는 찾지 못했으나 실제 운영/원격 콘텐츠는 `[unverified]` |
| 연락 이메일 | `showep12@gmail.com` 후보 | 공개 정책의 연락처와 일치; 오너 확인 필요 |
| 개인정보처리방침 | `https://mimi.daeseon.ai/en/privacy` | 감사 시 HTTP 200; 내용 보완 필요 |
| 약관 | `https://mimi.daeseon.ai/en/terms` | 감사 시 HTTP 200 |
| 지원 | `https://mimi.daeseon.ai/en/support` | 감사 시 HTTP 200 |
| 계정 삭제 | 앱 없이 삭제 요청 가능한 명시적 웹 경로 제공 | support page는 인앱 삭제만 안내; `/en/account-deletion`은 감사 시 HTTP 404 |

### App access

로그인 없이 핵심 기능을 검토할 수 없다면 reviewer용 계정을 제공한다.

- 만료되지 않는 reviewer 이메일/비밀번호
- 로그인 이후 핵심 경로: 영상 선택 → 클립/분석 → 녹음 → 복습 → 음성 스파링
- AI allowlist나 사용량 gate가 있다면 reviewer 계정도 통과하도록 설정
- 2FA, 지역 제한, 결제벽이 있으면 재현 가능한 우회 설명
- 비밀번호를 저장소 문서나 Git에 기록하지 않음

reviewer 계정의 실제 생성·로그인·AI 접근 상태는 `[unverified]`다.

## 4. 스토어 설명 초안

Google Play 한도는 앱 이름 30자, 짧은 설명 80자, 전체 설명 4,000자다. 현지화별로 각각 입력한다.

### English (United States)

App name:

> Mimi

Short description:

> Shadow real English, practice speaking, and review what you learn

Full description:

> Learn English from the videos and expressions you actually care about.
>
> Mimi turns short video moments into focused speaking practice. Choose a clip, study the transcript, repeat each line, record your own take, and review useful expressions on a spaced schedule.
>
> Key features:
> - Import a video and work with short transcript ranges
> - Loop lines for listening and shadowing practice
> - Record and replay your pronunciation
> - Get AI-assisted explanations and speaking feedback
> - Practice saved expressions through review drills
> - Use voice sparring to answer in real time
> - Track progress and learning streaks
>
> A Mimi account is required to sync clips, recordings, and learning progress. Microphone access is requested only when you start a speaking or recording feature. Some text and audio are sent to service providers to generate analysis, transcription, and voice responses; see the privacy policy for details.

### 한국어

앱 이름:

> Mimi

짧은 설명:

> 실제 영어를 쉐도잉하고, 직접 말하고, 배운 표현을 복습하세요

전체 설명:

> 내가 보고 싶은 영상과 실제 표현으로 영어를 연습하세요.
>
> Mimi는 짧은 영상 구간을 듣기, 쉐도잉, 말하기, 복습 연습으로 바꿔 줍니다. 클립을 고르고 자막을 확인한 뒤, 한 줄씩 반복해서 듣고 직접 녹음하며 유용한 표현을 간격 반복으로 복습할 수 있습니다.
>
> 주요 기능:
> - 영상과 짧은 자막 구간 가져오기
> - 문장 반복 재생과 쉐도잉
> - 내 발음 녹음 및 다시 듣기
> - AI를 활용한 표현 설명과 말하기 피드백
> - 저장한 표현 복습 드릴
> - 실시간 음성 스파링
> - 학습 진행 상황과 연속 학습일 확인
>
> 클립, 녹음, 학습 진행 상황을 동기화하려면 Mimi 계정이 필요합니다. 마이크 권한은 말하기 또는 녹음 기능을 시작할 때만 요청합니다. 분석, 음성 전사, 음성 응답을 위해 일부 텍스트와 오디오가 서비스 제공업체로 전송될 수 있습니다. 자세한 내용은 개인정보처리방침을 확인하세요.

설명 초안의 기능은 코드에서 확인한 범위에 맞췄다. 실제 Play 입력 전에는 production 앱에서 각 기능이 reviewer 계정으로 동작하는지 다시 확인한다.

공식 근거: [Create and set up your app](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en-EN)

## 5. Data safety 초안

Google의 `collected`는 기기 밖으로 전송되는 데이터를 포함한다. 서버에서 곧바로 버리더라도 전송 자체를 누락하면 안 된다. 아래는 Console 답변 확정본이 아니라 코드 기반 초안이다.

| Play 데이터 유형 후보 | 코드에서 확인된 사용 | 목적 후보 | 필수/선택 후보 | 남은 확인 |
| --- | --- | --- | --- | --- |
| Name | 계정 display name | Account management, App functionality | 계정 생성 시 필수 | 운영 DB/로그의 추가 사용 `[unverified]` |
| Email address | 가입, 로그인, reviewer/AI gate | Account management, App functionality | 필수 | 지원·마케팅 사용 `[unverified]` |
| User IDs | UUID 기반 계정과 소유 데이터 | Account management, App functionality | 필수 | 외부 provider 전송 여부 `[unverified]` |
| Voice or sound recordings | 저장형 shadowing 녹음, 전사용 음성, realtime 음성 | App functionality | 기능 사용 시 선택 | provider 보존·학습·삭제 조건 `[unverified]` |
| Other user-generated content | 영상 URL/클립, 자막 범위, 메모, 답변·전사 텍스트 | App functionality, Personalization | 기능 사용 시 선택 | 공개 공유 여부; 현재 코드만으로 전체 흐름 `[unverified]` |
| App interactions / Other actions | 복습 응답, 진행도, review schedule, streak | App functionality, Personalization | 기능 사용 시 생성 | analytics/운영 로그 포함 범위 `[unverified]` |

제3자 처리 흐름으로 코드에서 확인된 후보:

- YouTube: 사용자가 선택한 영상의 자막과 metadata
- Google Gemini, OpenAI, Anthropic Claude: 텍스트 분석 fallback
- OpenAI 또는 OpenAI-compatible provider: 음성 전사
- OpenAI Realtime: 기기와 provider 사이의 실시간 음성
- 호스팅 및 저장소 제공자: 계정, 클립, 진행도, 저장형 녹음

`공유하지 않음`으로 답하려면 각 provider가 Google 정의의 service provider 요건을 충족하는지 계약과 처리 목적을 확인해야 한다. 이 검토는 `[unverified]`다.

### Data safety 제출 전 확인표

- [ ] 개인정보처리방침에 OpenAI, 전사, realtime 음성, provider fallback을 반영
- [ ] 각 provider의 보존 기간, 모델 학습 사용 여부, 삭제 요청 전파 절차 확인
- [ ] HTTPS 설정이 아니라 실제 production 트래픽 기준으로 전송 중 암호화 확인
- [ ] 저장형 녹음과 일시적 전사 음성을 Console에서 정확히 구분
- [ ] 필수/선택 수집 여부를 로그인 및 기능별로 재현
- [ ] 데이터 판매 여부와 광고/마케팅 사용 여부를 오너가 확인
- [ ] 계정 삭제 후 DB row, object/file, provider 보관본이 삭제되는지 end-to-end 검증

코드에는 Settings의 계정 삭제 경로와 DB cascade가 있다. 녹음 binary 삭제는 best-effort로 예외를 삼키므로, 삭제 실패 시 orphan file 탐지·재처리 동작은 `[unverified]`다.

공식 근거:

- [Google Play Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)
- [Account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)

## 6. 콘텐츠 등급, 대상 연령, AI 정책

### Content rating

- Play Console의 IARC 설문을 오너가 직접 완료한다.
- 앱 안에 AI 대화, 음성 대화, YouTube 기반 콘텐츠가 있으므로 설문 질문을 단순 교육 앱으로 가정해 모두 `No`로 처리하지 않는다.
- 설문 답변과 실제 reviewer 계정 경험이 다르면 실패다.
- 등급 결과와 인증서는 Console에서만 확인 가능하므로 `[unverified]`다.

공식 근거: [Content rating requirements](https://support.google.com/googleplay/android-developer/answer/9859655?hl=en)

### Target audience

공개 개인정보처리방침은 13세 미만 대상이 아니라고 적고 있지만, 이것만으로 Play의 대상 연령 답변이 결정되지는 않는다. 실제 마케팅, 언어, 콘텐츠, 사용자층을 기준으로 오너가 연령대를 선택해야 한다. 아동 연령대를 포함하면 Families 관련 추가 의무가 생길 수 있다.

### AI-generated content

Google 정책은 적용 대상 AI 생성 앱에 앱을 나가지 않고 offensive content를 신고/플래그할 수 있는 기능을 요구한다. 저장소 검색에서는 해당 동작을 찾지 못했다. Mimi의 AI 분석·음성 스파링이 정책 적용 대상인지와 필요한 신고 UX는 Play 제출 전 정책 검토가 필요하다.

- 현재 상태: `[unverified]` 정책 적합성
- 권고: closed/open/production 전에 정책 적용 여부를 확정하고, 적용된다면 공용 UI 트랙에서 인앱 신고와 moderation 처리 경로를 구현·검증
- 이번 STORE-AND 범위에서는 공용 UI를 수정하지 않음

공식 근거: [AI-Generated Content policy](https://support.google.com/googleplay/android-developer/answer/13985936?hl=en)

## 7. Android 권한 설명

| 권한 | 사용자 가치 / Play 설명 초안 | 설정 상태 |
| --- | --- | --- |
| `RECORD_AUDIO` | 사용자가 녹음·발음 확인·음성 스파링을 시작할 때 영어 음성을 캡처 | 명시적 허용 |
| `MODIFY_AUDIO_SETTINGS` | 녹음과 재생 사이에서 Android 오디오 모드를 전환 | 명시적 허용; normal permission |
| `READ_EXTERNAL_STORAGE` | 앱 기능에 필요하지 않음 | `blockedPermissions` 제거 지시 구성; AAB `[unverified]` |
| `WRITE_EXTERNAL_STORAGE` | 앱 기능에 필요하지 않음 | `blockedPermissions` 제거 지시 구성; AAB `[unverified]` |
| `SYSTEM_ALERT_WINDOW` | 앱 기능에 필요하지 않음; 설치된 React Native의 debug manifest에서 선언됨 | `blockedPermissions` 제거 지시 구성; AAB `[unverified]` |

추가 확인:

- Expo introspection에서 의존성 권한과 `tools:node=remove` marker를 확인한다.
- 새 production AAB의 merged manifest에서 같은 목록을 다시 확인한다.
- `SYSTEM_ALERT_WINDOW`의 source는 `mobile/node_modules/react-native/ReactAndroid/src/debug/AndroidManifest.xml`로 확인했다. 제품 기능에서 사용하지 않으므로 최종 production manifest에서도 제거한다.
- Android 13+ 사진/미디어 권한을 앱이 실제로 요청하지 않는지 기기에서 확인한다.

`android.blockedPermissions`는 Expo가 라이브러리 manifest에서 추가한 권한을 최종 manifest에서 제거하기 위한 설정이다.

공식 근거: [Expo app config: blockedPermissions](https://docs.expo.dev/versions/latest/config/app/)

### Target API

2026-07-16 현재 새 앱 제출 최소값은 API 35이고, Google 공지상 2026-08-31부터 새 앱과 업데이트는 API 36 이상이어야 한다. 설치된 React Native version catalog는 `targetSdk = "36"`, `compileSdk = "36"`이며 Expo root plugin은 이 catalog의 `targetSdk`를 앱 기본값으로 사용한다. 저장소에 별도 target SDK override는 없다.

- 로컬 release merged manifest target: API 36 (`:app:processReleaseMainManifest` exit 0)
- 새 production AAB의 실제 target API: `[unverified]`
- 통과 기준: AAB inspection과 Play Console 둘 다 target API 36 이상 표시

공식 근거: [Google Play target API requirements](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)

## 8. 스토어 그래픽과 스크린샷

### 필수 규격

| 자산 | Google Play 요구사항 | 현재 저장소 |
| --- | --- | --- |
| Store icon | 512×512, 32-bit PNG with alpha, 최대 1024KB | `mobile/assets/images/icon.png`은 1024×1024 PNG, alpha 없음; 별도 store icon 필요 |
| Feature graphic | 1024×500, JPEG 또는 24-bit PNG, alpha 없음 | 찾지 못함 |
| Phone screenshots | 최소 2장, JPEG 또는 24-bit PNG, 320–3840px, 긴 변이 짧은 변의 2배 이하 | Android 캡처 세트 없음 |

권장 Android phone 세트:

1. Today / 학습 진입
2. 영상 자막과 구간 선택
3. 문장 반복과 shadowing 녹음
4. AI 설명 또는 speaking feedback
5. 복습 queue와 진행도
6. 음성 sparring과 session report

추천 노출 조건을 맞추려면 1080×1920 portrait 기준 최소 4장을 준비한다. 각 이미지는 실제 production Android UI를 캡처하고, 알림·실사용 이메일·토큰·개인 영상 기록을 제거한다. 현재 `frontend/public/screenshots`의 8장은 모두 736×1600으로 긴 변이 짧은 변의 2배를 초과하므로 Play phone screenshot 요구조건에 그대로 사용할 수 없다.

공식 근거: [Add preview assets](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en)

## 9. 내부 테스트 트랙 준비

오너 순서:

1. Store listing, App content, privacy/account deletion 입력을 저장한다.
2. reviewer 계정과 앱 접근 지침을 등록한다.
3. Play App Signing 및 upload certificate를 대조한다.
4. 현재 HEAD의 첫 AAB를 **Play Console에서 수동으로** internal track draft에 추가한다.
5. 테스터 Google 계정 또는 Google Group을 등록한다. Internal testing은 최대 100명까지 지원한다.
6. opt-in URL을 테스터에게만 전달한다.
7. 최소 다음을 실기기에서 확인한다: clean install, login, microphone deny/allow, recording upload/playback, transcription, realtime sparring, account deletion.
8. crash/ANR, pre-launch report, policy warning을 검토한 뒤에만 다음 트랙을 판단한다.

내부 테스트도 store listing 자산을 공유한다. 자산을 등록하면 다른 test track에도 보일 수 있다. 테스트 목록, release, opt-in URL은 모두 `[unverified]`이며 이번 작업에서 생성하지 않는다.

### 새 personal developer account 조건

Play developer account 유형과 생성일은 `[unverified]`다. 개인 계정이 2023-11-13 이후 생성됐다면 production access 신청 전에 **closed test에서 최소 12명의 tester가 14일 연속 opt-in** 상태여야 한다. Internal testing은 이 closed-test gate를 대신하지 않는다. 이 조건은 지금 준비하는 internal track의 접근 자체를 막지는 않지만, 이후 공개 일정에는 포함해야 한다.

공식 근거:

- [Set up an internal test](https://support.google.com/googleplay/android-developer/answer/9845334?hl=en)
- [Testing requirements for new personal accounts](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)

## 10. 자동화 가능한 항목

저장소/CI에서 자동화 가능:

- `app.json`, `eas.json` JSON parse 및 Expo schema/introspection 검사
- production profile의 `buildType=app-bundle` 검사
- submit profile의 `track=internal`, `releaseStatus=draft` 검사
- 최종 manifest의 권한 allowlist diff
- AAB의 package, versionCode, versionName, upload certificate fingerprint 추출
- store copy 글자 수 검사
- icon, feature graphic, screenshot 크기/format/alpha 검사
- Git tracked files에서 keystore·service-account filename과 credential-shaped content 검사
- 개인정보처리방침의 provider 목록과 backend provider 설정 간 drift 검사

사람/오너 확인이 필요한 항목:

- Play App Signing 약관과 certificate UI
- 개인정보·계약·보존정책에 근거한 Data safety 최종 답변
- IARC content rating, target audience, ads 선언
- 앱 접근용 reviewer 계정
- AI 신고 정책 적용 판단과 moderation 운영
- 스토어 자산의 실제 UI·카피 품질 검수
- first manual upload와 tester 관리

## 11. 검증 계획과 통과 기준

### 저장소 단계

1. JSON parse가 성공한다.
2. Expo introspection에서 `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`, `SYSTEM_ALERT_WINDOW` 항목에 `tools:node=remove`가 붙는다.
3. production EAS profile에 AAB/internal/draft가 정확히 나온다.
4. TypeScript `--noEmit`이 통과한다.
5. Git diff whitespace 검사와 secret filename 추적 검사가 통과한다.

2026-07-16 로컬 확인 결과:

- JSON parse, TypeScript `--noEmit`, Expo public config: exit 0
- EAS CLI 20.5.1의 `@expo/eas-json` resolver: `buildType=app-bundle`, `track=internal`, `releaseStatus=draft`
- JDK 17과 Android SDK를 명시한 `:app:processReleaseMainManifest`: exit 0, target SDK 36
- merged release manifest 허용 권한: `MODIFY_AUDIO_SETTINGS`, `RECORD_AUDIO`; 차단한 storage/overlay 권한 3개는 없음

### 새 AAB 생성 후 — 이번 작업에서는 실행하지 않음

1. AAB package가 `ai.daeseon.mimi`다.
2. versionCode가 이전 Play artifact보다 크다.
3. target API가 36 이상이다.
4. upload certificate SHA-1이 Play Console upload certificate와 같다.
5. merged manifest 권한이 설명된 allowlist와 같다.
6. 설치 가능한 Play-generated APK가 production API에 연결된다.

### Play Console 단계 — 오너 작업

1. 모든 App content 설문에 초안이 아닌 실제 동작 기준 답변이 들어간다.
2. account deletion URL이 HTTP 200이고 앱 없이 삭제 요청을 제출할 수 있다.
3. reviewer 계정으로 Google reviewer가 핵심 기능에 접근할 수 있다.
4. internal tester가 opt-in → 설치 → 핵심 흐름 → 계정 삭제를 완료한다.

## 12. 이번 트랙에서 실행하지 않는 외부 작업

- Play Console 앱 생성, 값 입력, 자산 업로드
- AAB 업로드, release 생성, rollout, publish
- `eas build`, `eas submit`
- 서비스 계정 생성/권한 부여/JSON 다운로드 또는 저장
- Play App Signing 약관 수락 또는 키 교체
- production tester 초대 및 opt-in URL 배포
- Android store 이미지 생성
- 개인정보처리방침·공용 UI·iOS 파일 수정

이 문서의 `[unverified]`는 Play Console, 새 production AAB, 실제 기기 또는 법무/운영 확인 없이는 제거하지 않는다.
