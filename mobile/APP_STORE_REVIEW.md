# Mimi iOS — App Store review packet

> Read-only audit: 2026-07-16 (America/Toronto)<br>
> Source branch: `codex/store-ios` from `codex/and-m-integration`<br>
> Target bundle: `ai.daeseon.mimi`

This is the replacement for the missing file referenced by
`docs/HANDOFF-2026-07-15.md`. It separates verified App Store Connect state from
copy that is ready to paste after the owner supplies the remaining private values.

## 1. Stop conditions before submission

Do not submit the current menu version yet.

1. **There is no App Store version 1.1.0 record.** App Store Connect currently
   returns only version 1.0, which is `READY_FOR_SALE` with build 11.
2. **Build 22 is not the current menu build.** Build 22 was uploaded on
   2026-07-15; the five-tab menu landed on 2026-07-16.
3. **A new iOS build is required.** Use `<NEW_BUILD_NUMBER>` until App Store
   Connect reports the real number. Do not assume it will be 23.
4. **The external TestFlight link is stale.** The Friends group contains builds
   11, 9, and 7. Build 22 is internal-only and reports
   `READY_FOR_BETA_SUBMISSION` externally.
5. **Two primary tabs are access-gated.** Speaking and AI grading in Write require
   an invite/server entitlement. App Review must receive a demo account with that
   access, and the owner must accept the remaining review risk described below.

## 2. Verified App Store Connect snapshot

| Area | Verified state |
| --- | --- |
| Public App Store | Version 1.0, `READY_FOR_SALE`, build 11 `VALID` |
| Version 1.1.0 | Not present |
| Build 22 | Marketing version 1.1.0, `VALID`, not expired |
| Build 22 TestFlight | Internal `IN_BETA_TESTING`; external `READY_FOR_BETA_SUBMISSION`; no beta review submission |
| Friends external group | Public link enabled; attached builds are 11, 9, and 7 |
| Age rating | `FOUR_PLUS` |
| App names | `Mimi: English Shadowing` for en-US and ko |
| Subtitles | Empty for en-US and ko; optional but worth filling |
| Privacy URLs | en-US `/en/privacy`; ko `/ko/privacy` |
| Support URLs | en-US `/support` (redirects to `/en/support`); ko points to the site root |
| Review access | Demo account name/password and notes exist for version 1.0 |
| Review contact | First name, last name, phone, and email are all absent in the API response |

### Existing version 1.0 screenshots

- en-US: five 6.9-inch iPhone images at 1320×2868, five 6.5-inch images at
  1284×2778, and two 12.9-inch iPad images at 2064×2752. All report `COMPLETE`.
- ko: no screenshot set.
- The repository's `frontend/public/screenshots/shot-*.jpeg` files are not the
  App Store source assets. They are 736×1600 support/README images, show the old
  four-tab navigation, include a right-edge overlay, and one has large black areas.

## 3. Product/review risk that notes cannot erase

The current five-tab navigation is Home · Shadowing · Speaking · Write · Me, but a
normal free account cannot use live Speaking or AI answer grading. The UI calls
those features invite-only and there is no way to buy or request access in the app.

Apple's review guidance requires full reviewer access, accurate metadata, and
specific notes for new or non-obvious behavior. It also says beta builds do not
belong on the App Store. Transparent notes and an entitled demo account reduce the
risk, but do not guarantee approval of two gated primary tabs.

Owner decision required before submission:

- **Submit as-is:** give App Review an entitled demo account and use the notes
  below. Remaining risk: Apple may treat the public experience as incomplete or
  the business model as unclear.
- **Change the public experience first:** make the two primary tabs generally
  usable or move gated actions out of primary navigation. This packet does not
  implement that option because menu and monetization changes are out of scope.

## 4. App Review notes — copy-ready draft

Paste this into Notes for Review after replacing `<NEW_BUILD_NUMBER>`. Enter the
demo credentials only in App Store Connect; never commit them to this repository.

```text
Submission target
- Version: 1.1.0
- Build: <NEW_BUILD_NUMBER>
- Bundle ID: ai.daeseon.mimi

What changed in this version
1. The bottom navigation is now Home, Shadowing, Speaking, Write, and Me.
2. Home puts reviews due today first, shows learning progress, and keeps every
   existing practice pack reachable.
3. Speaking is the live voice-practice center. Write lets learners compose an
   English sentence and request AI feedback.
4. Practice progress, session summaries, milestones, and long-card text layout
   have been improved. Existing learning routes and saved user data remain intact.

Reviewer access
- Mimi requires an account. Please use the active demo credentials entered in
  the App Review Information fields.
- The review account has server-side access to the controlled AI rollout so that
  both Speaking and AI grading in Write can be reviewed.
- Please keep the production backend available during review.

Business model and feature access
- The current iOS app has no In-App Purchase, subscription, checkout, pricing
  screen, upgrade button, or external purchase link.
- Core shadowing, drills, saved clips, recordings, and spaced-repetition review
  are available to signed-in users without a purchase.
- Live AI conversation and AI answer grading are currently limited to invited or
  server-entitled accounts during a controlled rollout. They are not sold in this
  app version. The supplied review account has access.

Suggested review path
1. Sign in with the App Review demo account.
2. Home: open the due-review card and return to Home.
3. Shadowing: open a prepared video, select a caption line, loop it, and tap the
   microphone only if you want to test recording.
4. Speaking: start a short voice session. Microphone audio is used for that live
   session.
5. Write: enter a sentence and tap the AI check action.
6. Me: account deletion is available after entering the current password.

Permissions
- Microphone access is requested only after the reviewer taps a recording or talk
  control. A quick A/B shadowing take remains on-device; a take is uploaded only
  when the user saves it or explicitly requests transcription/AI voice practice.
- The app does not open, upload, or store the user's photo library. The photo
  purpose string is present because the linked Expo image module references the
  iOS photo-library API and Apple static validation requires the string.
- The source does not invoke Apple's Speech Recognition API directly. The current
  speech-to-text path records after an explicit tap and sends that audio to the
  service's configured transcription provider.

Support: https://mimi.daeseon.ai/en/support
Privacy: https://mimi.daeseon.ai/en/privacy
```

### If Apple asks the four business-model questions again

1. **Who uses gated features?** Invited/server-entitled accounts, including the
   App Review demo account. Core learning remains available without purchase.
2. **Where can users buy access?** Nowhere in the current iOS app. It contains no
   checkout or external purchase link.
3. **What previously purchased content can users access?** None in this version.
4. **What is unlocked without IAP?** Controlled AI conversation and AI grading
   can be enabled server-side for invited accounts. They are not sold in this app
   version. State this plainly; do not reuse the build-11 claim that every feature
   is available to every account.

## 5. Store metadata drafts

### What's New — en-US

```text
• New five-tab navigation: Home, Shadowing, Speaking, Write, and Me.
• Home now puts due reviews first and keeps every practice pack easy to reach.
• Added clearer learning-progress summaries, session progress, and milestones.
• Fixed practice cards so longer text no longer gets cut off.
```

### What's New — ko

```text
• 홈·쉐도잉·스피킹·영작·나 5탭으로 학습 흐름을 다시 정리했습니다.
• 홈 최상단에서 오늘 복습을 바로 시작하고 모든 연습팩에 쉽게 들어갈 수 있습니다.
• 익힘 요약, 세션 진행, 마일스톤 표시를 더 명확하게 다듬었습니다.
• 긴 문장이 연습 카드에서 잘리던 문제를 수정했습니다.
```

### Subtitle

- en-US: `Shadow. Speak. Remember.`
- ko: `내 영상으로 말하는 영어`

### Promotional text — en-US

```text
Turn captioned videos into a daily loop: choose a line, shadow it, save it, and review it before you forget.
```

### Promotional text — ko

```text
내가 고른 영상의 한 문장을 듣고, 따라 말하고, 저장하고, 잊기 전에 다시 복습하세요.
```

### Description — en-US

```text
Mimi turns videos you care about into English you can actually say.

Import a captioned YouTube video, choose a line, and loop it until the rhythm and wording feel natural. Record a take, compare it with the original, save useful clips, and meet them again through spaced-repetition review.

HOME
See what is due today, check your learning progress, and reach every practice pack from one hub.

SHADOWING
Import captioned videos, select a precise range, loop at your pace, and compare your own recording with the source.

PRACTICE AND REVIEW
Build recall with sentence patterns, collocations, phrasal verbs, developer-English packs, and review schedules that bring difficult items back.

SPEAKING AND WRITING
Selected accounts can use live AI conversation and AI answer grading during the current controlled rollout. These AI features are not sold in this app version. The core shadowing, drill, clip, recording, and SRS experience remains available without a purchase.

Your videos. Your clips. English that comes back when you need it.
```

### Description — ko

```text
미미는 내가 관심 있는 영상을 실제로 말할 수 있는 영어로 바꿔줍니다.

자막 있는 유튜브 영상을 가져와 한 문장을 고르고, 리듬과 표현이 입에 붙을 때까지 반복하세요. 내 목소리를 녹음해 원본과 비교하고, 필요한 클립을 저장한 뒤 간격 반복으로 잊기 전에 다시 만납니다.

홈
오늘 복습할 항목과 익힘 진척을 확인하고 모든 연습팩으로 바로 이동합니다.

쉐도잉
자막 구간을 정확히 선택해 원하는 속도로 반복하고, 내 녹음과 원본을 비교합니다.

연습과 복습
문장 패턴, 콜로케이션, 구동사, 개발 영어 팩을 연습하고 어려운 항목을 복습 일정에 맞춰 다시 만납니다.

스피킹과 영작
실시간 AI 대화와 AI 답안 채점은 현재 일부 초대 계정에 순차적으로 제공되며 이 앱 버전에서 판매하지 않습니다. 쉐도잉·드릴·클립·녹음·SRS 복습은 구매 없이 이용할 수 있습니다.

내 영상, 내 클립, 필요할 때 바로 나오는 영어.
```

### Keywords

- en-US: `english,shadowing,speaking,listening,youtube,esl,fluency,phrases,review,vocabulary`
- ko: `영어,쉐도잉,영어회화,영어듣기,유튜브영어,영작,영어복습,영어표현,SRS`

## 6. URL values to enter

| Locale | Support URL | Privacy Policy URL | Marketing URL |
| --- | --- | --- | --- |
| en-US | `https://mimi.daeseon.ai/en/support` | `https://mimi.daeseon.ai/en/privacy` | `https://mimi.daeseon.ai` |
| ko | `https://mimi.daeseon.ai/ko/support` | `https://mimi.daeseon.ai/ko/privacy` | `https://mimi.daeseon.ai` |

The tested `/support`, localized support/privacy, and English terms routes returned
HTTP 200 during this audit; `/support` resolved to `/en/support`. The source updates
in this branch are not public until the owner deploys the website; deployment was
deliberately not performed here.

## 7. Permission explanation and privacy-label audit

### iOS purpose strings in source

| Key | Source behavior | Submission note |
| --- | --- | --- |
| `NSMicrophoneUsageDescription` | Used by on-device A/B recording, saved clip recordings, opt-in transcription, and live voice practice | Keep; wording should cover recording and voice feedback |
| `NSSpeechRecognitionUsageDescription` | Configured by `expo-speech-recognition`, but no source import or runtime call was found | Reconfirm whether the package can be removed in a separate cross-platform change; do not claim the app invokes Apple Speech directly |
| `NSPhotoLibraryUsageDescription` | No photo picker/library call found; retained because `expo-image` links a photo-library loader that previously triggered ITMS-90683 | Keep for the current dependency set; explain that Mimi does not open/upload/store photos |
| `ITSAppUsesNonExemptEncryption` | `false` | Keep unless the binary's encryption use changes |

No ATT request, `NSUserTrackingUsageDescription`, advertising SDK, or analytics SDK
was found in the mobile source/dependency scan. This is not a substitute for
checking the generated binary's privacy manifests.

### App Privacy data types to reconcile in App Store Connect

The App Store Connect API used here did not expose the current App Privacy answers,
and no browser session was available. The owner must compare the live answers with
the code-backed candidates below and publish any corrections.

| Candidate data type | Code-backed reason | Likely use/linkage to confirm |
| --- | --- | --- |
| Name | User supplies a display name | App functionality; linked to account |
| Email Address | Required account email | Authentication/app functionality; linked |
| User ID | Server assigns an account ID | App functionality; linked |
| Audio Data | Saved recordings and opt-in voice/transcription requests | App functionality; saved recordings are linked |
| Other User Content | Clips, notes, selected transcript ranges, and practice input | App functionality/personalization; linked when saved |
| Product Interaction | SRS state, review schedule, progress, and streaks | App functionality/personalization; linked |

Payment-card data is not received by Mimi in the current implementation. Do not
mark the table above as final legal advice; it is an engineering reconciliation
list against Apple's data-type definitions.

## 8. Screenshot capture list

Capture from the new menu build, not build 22 and not the 736×1600 repository
images.

Capture targets for this universal iPhone/iPad app:

- iPhone 6.9-inch portrait: 1320×2868; five clean images are recommended for the
  sequence below.
- iPad 12.9-inch portrait: 2064×2752; three clean images are recommended.
- Add a ko localization set if the Korean product page should not inherit English
  imagery.

Suggested sequence:

1. Home — due review first, mastery/progress summary.
2. Shadowing — video/clip library and import action.
3. Video practice — one selected line, loop controls, recording comparison.
4. Practice packs — all packs remain reachable from Home.
5. Review — recall/order exercise and grading controls.
6. Optional Speaking/Write — only if the image clearly states invite access and
   the review account can reproduce the shown state.

Capture rules:

- No debug/assistive overlay, black region, placeholder, private email, or secret.
- Use owned/cleared sample content and non-personal demo data.
- Show the actual five-tab navigation and the same build submitted for review.
- Check light and dark themes on-device, even if the store set uses one theme.

## 9. Owner-only inputs and external actions

Owner input required:

- Decide whether the two gated primary tabs can ship as-is.
- Create/validate an App Review demo account with AI access; store credentials only
  in App Store Connect.
- Enter App Review first name, last name, phone, and email.
- Confirm whether the support page must also publish a legal address and telephone
  number for the selected storefronts. The current page publishes an email only;
  do not invent or commit private contact details.
- Confirm/publish the App Privacy answers and DSA/trader/account-agreement status.
- Confirm rights to every video/logo/person visible in screenshots.
- Capture and approve the new iPhone/iPad screenshots.
- Confirm the exact release mode after approval (manual, automatic, or scheduled).

External work deliberately not performed:

- No EAS build or submit.
- No TestFlight group change or beta review submission.
- No App Store version creation, build attachment, App Review submission, or release.
- No website deployment.

## 10. Exact `eas.json` patch proposal — not applied

Replace the entire `submit.production.ios` object with this block:

```json
"ios": {
  "ascAppId": "6780742714"
}
```

Why: the current object commits a developer-specific absolute key path and key
metadata. EAS CLI 20.5.1 source shows that when all three local ASC key fields are
absent, non-interactive submit resolves the submission key from EAS Credentials;
`ascAppId` remains necessary for non-interactive app selection.

Precondition: verify that an App Store Connect submission key is still configured
in EAS Credentials before applying this patch. That remote credential state was
not reconfigured or mutated during this audit.

Related clean-install gap: `mobile/scripts/release-ios.sh` separately requires a
developer-specific ASC key path and macOS paths. It was not edited here; update it
in a release-automation track if the EAS remote-credential patch is adopted.

Security follow-up: the local `.p8` file inspected during this audit was readable
by group/others (`-rw-r--r--`). The owner should restrict it outside the repository,
for example with `chmod 600 "$ASC_API_KEY_PATH"`. This audit did not change the file.

## 11. Sources used for the checklist

- Apple App Review Guidelines: <https://developer.apple.com/app-store/review/guidelines/>
- Apple required/localizable properties: <https://developer.apple.com/help/app-store-connect/reference/app-information/required-localizable-and-editable-properties/>
- Apple screenshot specifications: <https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/>
- Apple app privacy details: <https://developer.apple.com/app-store/app-privacy-details/>
- Expo EAS JSON reference: <https://docs.expo.dev/eas/json/>
