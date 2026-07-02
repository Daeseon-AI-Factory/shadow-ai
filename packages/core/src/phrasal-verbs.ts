// AUTO-GENERATED from docs/default_verb_v3.md — DO NOT EDIT BY HAND.
// Regenerate: python3 scripts/build-verb-pack.py
//
// 102 base verbs + their phrasal verbs / patterns, frequency-tiered (T1 daily core,
// T2 common, T3 idiom/low-freq) with easy-English glosses for idioms. The premise:
// master the base verbs + the chunks that hang off them and you can describe almost
// any action; learn new words by re-expressing them through these patterns.
// 103 groups, 1956 entries (T1 453 / T2 1184 / T3 319).
// Pairs with verbKey() in practice-cards.ts for SRS (card_key = `pv:<id>#<index>`).

export interface VerbItem {
  cue: string; // Korean gloss (the prompt: recall the English from this)
  model: string; // the English phrasal verb / pattern (the answer)
  tier: 1 | 2 | 3; // 1 = daily core, 2 = common, 3 = idiom / low-frequency
  star?: boolean; // author's within-verb priority (separate axis from tier)
  easyEn?: string; // plain-English meaning for idioms / opaque entries
  example?: string; // one natural example sentence using the pattern
  exampleKo?: string; // Korean translation of the example
}

export interface VerbGroup {
  id: string; // stable slug, e.g. "cut" ("extra" for the appendix group)
  verb: string; // base verb in caps, e.g. "CUT"
  gloss: string; // one-line Korean description of the verb's role
  items: VerbItem[];
}

export const VERB_PACK: VerbGroup[] = [
  {
    "id": "be",
    "verb": "BE",
    "gloss": "be는 상태 설명의 뼈대다.",
    "items": [
      {
        "cue": "~안에 있다 / ~상황에 있다",
        "model": "be in [place/situation]",
        "tier": 1,
        "star": true,
        "example": "I'm in a meeting right now, can I call you back in ten?",
        "exampleKo": "나 지금 회의 중인데, 10분 뒤에 다시 전화해도 될까?"
      },
      {
        "cue": "~에 있다 / ~수준이다",
        "model": "be at [place/level]",
        "tier": 1,
        "star": true,
        "example": "She's at the airport already, boarding starts soon.",
        "exampleKo": "걔 벌써 공항에 있어, 곧 탑승 시작해."
      },
      {
        "cue": "~에 켜져 있다 / ~에 관여 중이다",
        "model": "be on [topic/system]",
        "tier": 1,
        "star": true,
        "example": "Are you on Slack? I just sent you the file.",
        "exampleKo": "슬랙 켜져 있어? 방금 파일 보냈어."
      },
      {
        "cue": "~출신이다 / ~에서 왔다",
        "model": "be from [place/source]",
        "tier": 1,
        "star": true,
        "example": "He's from Chicago but he's lived in Seoul for years.",
        "exampleKo": "걔는 시카고 출신인데 서울에서 몇 년째 살고 있어."
      },
      {
        "cue": "~와 함께 있다 / ~팀 소속이다",
        "model": "be with [person/team]",
        "tier": 1,
        "star": true,
        "example": "I'm with the design team now, we handle all the UI stuff.",
        "exampleKo": "나 지금 디자인팀 소속이야, UI 관련은 다 우리가 맡아."
      },
      {
        "cue": "~에 관심이 많다",
        "model": "be into [topic]",
        "tier": 1,
        "star": true,
        "easyEn": "to like or be very interested in something",
        "example": "My roommate is really into rock climbing these days.",
        "exampleKo": "내 룸메이트가 요즘 암벽 등반에 완전 빠져 있어."
      },
      {
        "cue": "~이 다 떨어졌다",
        "model": "be out of [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to have none of something left",
        "example": "We're out of coffee again, someone needs to grab more.",
        "exampleKo": "커피 또 다 떨어졌어, 누가 좀 사와야겠다."
      },
      {
        "cue": "~에게 달려 있다",
        "model": "be up to [person]",
        "tier": 1,
        "star": true,
        "easyEn": "to be someone's decision or responsibility",
        "example": "Where we eat is totally up to you.",
        "exampleKo": "어디서 먹을지는 완전히 너한테 달렸어."
      },
      {
        "cue": "막 ~하려고 하다",
        "model": "be about to [verb]",
        "tier": 1,
        "star": true,
        "example": "I was about to text you, funny timing.",
        "exampleKo": "막 너한테 문자 보내려던 참이었어, 타이밍 웃기다."
      },
      {
        "cue": "~하기로 되어 있다",
        "model": "be supposed to [verb]",
        "tier": 1,
        "star": true,
        "example": "You're supposed to submit the form by Friday.",
        "exampleKo": "그 양식 금요일까지 제출하기로 되어 있어."
      },
      {
        "cue": "~에 익숙하다",
        "model": "be used to [-ing/noun]",
        "tier": 1,
        "star": true,
        "easyEn": "to be familiar with something through experience",
        "example": "I'm used to working late, it doesn't bother me anymore.",
        "exampleKo": "난 늦게까지 일하는 거에 익숙해서 이제 별로 안 힘들어."
      },
      {
        "cue": "~을 책임지다",
        "model": "be responsible for [thing]",
        "tier": 1,
        "star": true,
        "example": "I'm responsible for the payment flow, so ping me if it breaks.",
        "exampleKo": "결제 흐름은 내가 책임지니까, 문제 생기면 나한테 연락해."
      },
      {
        "cue": "~에 익숙하다 / 잘 안다",
        "model": "be familiar with [thing]",
        "tier": 1,
        "star": true,
        "example": "Are you familiar with this codebase? I could use some help.",
        "exampleKo": "이 코드베이스 좀 알아? 도움이 좀 필요해서."
      },
      {
        "cue": "~을 잘하다",
        "model": "be good at [-ing]",
        "tier": 1,
        "star": true,
        "example": "She's really good at explaining complicated stuff simply.",
        "exampleKo": "걔는 복잡한 걸 쉽게 설명하는 걸 정말 잘해."
      },
      {
        "cue": "~에 관심 있다",
        "model": "be interested in [thing]",
        "tier": 1,
        "star": true,
        "example": "I'm interested in that role, can you tell me more?",
        "exampleKo": "그 자리에 관심 있는데, 좀 더 얘기해줄 수 있어?"
      },
      {
        "cue": "~을 알고 있다",
        "model": "be aware of [thing]",
        "tier": 1,
        "star": true,
        "example": "Just so you're aware of it, the deadline moved up to Monday.",
        "exampleKo": "참고로 알아둬, 마감이 월요일로 앞당겨졌어."
      },
      {
        "cue": "~을 끝내다 / ~에 질리다",
        "model": "be done with [thing]",
        "tier": 1,
        "example": "I'm done with this project, finally shipped it last night.",
        "exampleKo": "이 프로젝트 드디어 끝냈어, 어젯밤에 배포했어."
      },
      {
        "cue": "~을 담당하다",
        "model": "be in charge of [thing]",
        "tier": 1,
        "example": "Maria is in charge of the whole onboarding process.",
        "exampleKo": "마리아가 온보딩 전체 과정을 담당하고 있어."
      },
      {
        "cue": "기꺼이 ~하다 / ~할 의향이 있다",
        "model": "be willing to [verb]",
        "tier": 1,
        "star": true,
        "example": "I'm willing to stay late if that helps us hit the deadline.",
        "exampleKo": "마감 맞추는 데 도움 된다면 기꺼이 늦게까지 남을게."
      },
      {
        "cue": "~을 위한 것이다 / ~에 찬성하다",
        "model": "be for [purpose/person]",
        "tier": 2,
        "star": true,
        "easyEn": "to support something or be intended for someone",
        "example": "This meeting room is for the client demo, so don't book it.",
        "exampleKo": "이 회의실은 클라이언트 시연용이니까 예약하지 마."
      },
      {
        "cue": "~에 반대하다",
        "model": "be against [idea]",
        "tier": 2,
        "star": true,
        "easyEn": "to oppose or disagree with something",
        "example": "Honestly, I'm against rushing this release.",
        "exampleKo": "솔직히 난 이 출시를 서두르는 거에 반대야."
      },
      {
        "cue": "~을 잘 관리하고 있다",
        "model": "be on top of [thing]",
        "tier": 2,
        "easyEn": "to be managing something well and in control",
        "example": "Don't worry, I'm on top of the bug reports.",
        "exampleKo": "걱정 마, 버그 리포트는 내가 잘 챙기고 있어."
      },
      {
        "cue": "~이 밀려 있다",
        "model": "be behind on [thing]",
        "tier": 2,
        "easyEn": "to be late or not have done enough yet",
        "example": "I'm a bit behind on emails, I'll get to yours today.",
        "exampleKo": "이메일이 좀 밀려 있어, 오늘 안에 답장할게."
      },
      {
        "cue": "~이 부족하다",
        "model": "be short on [thing]",
        "tier": 2,
        "easyEn": "to not have enough of something",
        "example": "We're short on time, so let's skip the intro slides.",
        "exampleKo": "시간이 부족하니까 인트로 슬라이드는 건너뛰자."
      },
      {
        "cue": "(서버/시스템이) 가동 중이다 / 깨어 있다",
        "model": "be up",
        "tier": 2,
        "star": true,
        "easyEn": "to be running or awake",
        "example": "The server's up again, you should be able to log in now.",
        "exampleKo": "서버 다시 살아났어, 이제 로그인될 거야."
      },
      {
        "cue": "(서버/시스템이) 다운되다 / 작동을 멈추다",
        "model": "be down",
        "tier": 2,
        "star": true,
        "easyEn": "to be not working or stopped (system)",
        "example": "The site's been down for an hour, people are complaining.",
        "exampleKo": "사이트가 한 시간째 다운돼서 사람들이 항의하고 있어."
      },
      {
        "cue": "마감이 ~이다 / 기한이 ~까지다",
        "model": "be due [date]",
        "tier": 2,
        "star": true,
        "easyEn": "to be expected or required by a certain time",
        "example": "The report is due tomorrow at noon, don't forget.",
        "exampleKo": "그 보고서 내일 정오가 마감이야, 잊지 마."
      },
      {
        "cue": "쉬는 날이다 / 자리에 없다 / (기기가) 꺼져 있다",
        "model": "be off",
        "tier": 2,
        "easyEn": "to be away, not working, or turned off",
        "example": "I'm off on Friday, so ask Kevin if you need anything.",
        "exampleKo": "나 금요일에 쉬니까 뭐 필요하면 케빈한테 물어봐."
      },
      {
        "cue": "끝나다 / 종료되다",
        "model": "be over",
        "tier": 2,
        "easyEn": "to be finished or ended",
        "example": "The meeting's over, you can head out whenever.",
        "exampleKo": "회의 끝났어, 아무 때나 나가도 돼."
      },
      {
        "cue": "비상 대기 중이다 / 당직이다",
        "model": "be on call",
        "tier": 2,
        "easyEn": "to be ready to work if needed at any time",
        "example": "I'm on call this weekend, so I can't really go far.",
        "exampleKo": "이번 주말에 당직이라 멀리는 못 가."
      },
      {
        "cue": "~할 의향이 있다 / ~에 응할 마음이 있다",
        "model": "be up for [thing]",
        "tier": 2,
        "easyEn": "to be willing or eager to do something",
        "example": "I'm up for grabbing lunch if you are.",
        "exampleKo": "너만 괜찮으면 나 점심 먹으러 갈 마음 있어."
      },
      {
        "cue": "~에 동의하다 / 적극 지지하다",
        "model": "be on board with [thing]",
        "tier": 2,
        "easyEn": "to agree with and support a plan",
        "example": "Once she explained it, everyone was on board with the plan.",
        "exampleKo": "걔가 설명하고 나니까 다들 그 계획에 동의했어."
      },
      {
        "cue": "(이해/의견이) 일치하다",
        "model": "be on the same page",
        "tier": 2,
        "easyEn": "to share the same understanding or opinion",
        "example": "Let's do a quick sync so we're all on the same page.",
        "exampleKo": "다 같이 이해 맞추게 잠깐 싱크 좀 하자."
      },
      {
        "cue": "~의 대상이다 / ~에 따라 달라질 수 있다",
        "model": "be subject to [thing]",
        "tier": 2,
        "easyEn": "to be affected or controlled by something",
        "example": "These prices are subject to change without notice.",
        "exampleKo": "이 가격들은 예고 없이 변경될 수 있어."
      },
      {
        "cue": "~할 능력이 있다",
        "model": "be capable of [-ing]",
        "tier": 2,
        "example": "This laptop is capable of running two VMs at once.",
        "exampleKo": "이 노트북은 가상머신 두 개를 동시에 돌릴 능력이 돼."
      }
    ]
  },
  {
    "id": "have",
    "verb": "HAVE",
    "gloss": "have는 소유, 경험, 문제, 의무를 만든다.",
    "items": [
      {
        "cue": "~해야 한다",
        "model": "have to [verb]",
        "tier": 1,
        "star": true,
        "example": "I have to leave by five to catch my train.",
        "exampleKo": "기차 타려면 5시까지는 나가야 해."
      },
      {
        "cue": "~에 접근 권한이 있다",
        "model": "have access to [system/data]",
        "tier": 1,
        "star": true,
        "example": "Do you have access to the production database?",
        "exampleKo": "운영 데이터베이스에 접근 권한 있어?"
      },
      {
        "cue": "~경험이 있다",
        "model": "have experience with [tool/domain]",
        "tier": 1,
        "star": true,
        "example": "I have experience with React, but not much with Vue.",
        "exampleKo": "리액트는 경험이 있는데 뷰는 별로 없어."
      },
      {
        "cue": "~에 어려움을 겪다",
        "model": "have trouble with [thing]",
        "tier": 1,
        "star": true,
        "example": "I'm having trouble with the login flow again.",
        "exampleKo": "로그인 흐름에서 또 어려움을 겪고 있어."
      },
      {
        "cue": "~에 문제가 있다",
        "model": "have a problem with [thing]",
        "tier": 1,
        "star": true,
        "example": "We have a problem with the payment gateway timing out.",
        "exampleKo": "결제 게이트웨이가 타임아웃되는 문제가 있어."
      },
      {
        "cue": "~와 관련이 있다",
        "model": "have something to do with [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to be related or connected to something",
        "example": "This bug has something to do with the last deploy.",
        "exampleKo": "이 버그는 지난 배포랑 뭔가 관련이 있어."
      },
      {
        "cue": "~와 관련이 없다",
        "model": "have nothing to do with [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to have no connection to something",
        "example": "That outage had nothing to do with our team.",
        "exampleKo": "그 장애는 우리 팀이랑 전혀 관련이 없었어."
      },
      {
        "cue": "~을 염두에 두고 있다",
        "model": "have [thing] in mind",
        "tier": 1,
        "star": true,
        "easyEn": "to be thinking of or considering something",
        "example": "Do you have a specific date in mind for the launch?",
        "exampleKo": "출시일로 염두에 둔 특정 날짜가 있어?"
      },
      {
        "cue": "~에 대해 전혀 모른다",
        "model": "have no idea about [thing]",
        "tier": 1,
        "example": "Honestly, I have no idea about the tax stuff.",
        "exampleKo": "솔직히 세금 관련은 전혀 몰라."
      },
      {
        "cue": "~하는 데 어려움을 겪다",
        "model": "have a hard time [-ing]",
        "tier": 1,
        "star": true,
        "easyEn": "to find something difficult to do",
        "example": "I'm having a hard time focusing today.",
        "exampleKo": "오늘 집중하는 게 좀 힘들어."
      },
      {
        "cue": "~에 영향을 미치다",
        "model": "have an impact on [thing]",
        "tier": 1,
        "star": true,
        "example": "That decision could have a big impact on our runway.",
        "exampleKo": "그 결정이 우리 자금 여력에 큰 영향을 미칠 수 있어."
      },
      {
        "cue": "~이 남아 있다",
        "model": "have [thing] left",
        "tier": 1,
        "star": true,
        "easyEn": "to still have some amount remaining",
        "example": "I only have two days left before the deadline.",
        "exampleKo": "마감까지 이틀밖에 안 남았어."
      },
      {
        "cue": "~을 통제하고 있다",
        "model": "have [thing] under control",
        "tier": 2,
        "star": true,
        "easyEn": "to be managing something successfully",
        "example": "Don't worry, I have the release under control.",
        "exampleKo": "걱정 마, 릴리스는 내가 통제하고 있어."
      },
      {
        "cue": "~을 집에 초대하다",
        "model": "have [person] over",
        "tier": 2,
        "star": true,
        "easyEn": "to invite someone to your home",
        "example": "We're having some friends over for dinner Saturday.",
        "exampleKo": "토요일에 친구 몇 명 저녁 초대했어."
      },
      {
        "cue": "입고 있다 / 일정이 있다",
        "model": "have [thing] on",
        "tier": 2,
        "star": true,
        "easyEn": "to be wearing something or have it scheduled",
        "example": "I have a dentist appointment on at three, so I'll be out.",
        "exampleKo": "3시에 치과 예약이 있어서 자리 비울 거야."
      },
      {
        "cue": "~에게 악감정이 있다",
        "model": "have [thing] against [person]",
        "tier": 2,
        "easyEn": "to dislike someone for a reason",
        "example": "I don't know why, but she has something against me.",
        "exampleKo": "이유는 모르겠는데 걔가 나한테 악감정이 있어."
      },
      {
        "cue": "~에게 ~하게 시키다",
        "model": "have [person] do [verb]",
        "tier": 2,
        "example": "I'll have Mike double-check the numbers before we send it.",
        "exampleKo": "보내기 전에 마이크한테 숫자 다시 확인시킬게."
      },
      {
        "cue": "~을 처리되게 하다",
        "model": "have [thing] done",
        "tier": 2,
        "example": "I need to have the car serviced this weekend.",
        "exampleKo": "이번 주말에 차 정비 맡겨야 해."
      },
      {
        "cue": "처리할 일이 많다",
        "model": "have a lot going on",
        "tier": 2,
        "easyEn": "to have many things happening or be very busy",
        "example": "Sorry I'm slow to reply, I've got a lot going on right now.",
        "exampleKo": "답장 늦어서 미안, 지금 처리할 일이 너무 많아."
      },
      {
        "cue": "~에 발언권이 있다",
        "model": "have a say in [thing]",
        "tier": 2,
        "easyEn": "to have the right to share an opinion on a decision",
        "example": "I wish I had a say in who we hire.",
        "exampleKo": "누굴 채용할지에 내가 발언권이 있으면 좋겠어."
      },
      {
        "cue": "~에 영향을 끼치다",
        "model": "have an effect on [thing]",
        "tier": 2,
        "example": "Skipping breakfast really has an effect on my mood.",
        "exampleKo": "아침을 거르면 내 기분에 확실히 영향을 끼쳐."
      },
      {
        "cue": "~을 통제하다 / 좌우하다",
        "model": "have control over [thing]",
        "tier": 2,
        "example": "We don't have much control over the vendor's timeline.",
        "exampleKo": "우리가 그 업체 일정을 좌우할 수 있는 건 별로 없어."
      },
      {
        "cue": "~와 잠깐 이야기하다 / 한마디 하다",
        "model": "have a word with [person]",
        "tier": 2,
        "easyEn": "to talk briefly with someone, often seriously",
        "example": "Can I have a word with you after the meeting?",
        "exampleKo": "회의 끝나고 잠깐 얘기 좀 할 수 있을까?"
      },
      {
        "cue": "~을 가동시키다 / 돌아가게 만들다",
        "model": "have [thing] up and running",
        "tier": 2,
        "easyEn": "to have something working and operating properly",
        "example": "We finally have the staging server up and running.",
        "exampleKo": "드디어 스테이징 서버를 가동시켰어."
      },
      {
        "cue": "~에 이해관계가 있다",
        "model": "have a stake in [thing]",
        "tier": 2,
        "easyEn": "to have a personal interest or share in something",
        "example": "She has a stake in the company, so she cares a lot.",
        "exampleKo": "그 사람은 회사에 지분이 있어서 신경을 많이 써."
      },
      {
        "cue": "~의 편이 되어주다 / 뒤를 봐주다",
        "model": "have [person]'s back",
        "tier": 2,
        "easyEn": "to support and protect someone",
        "example": "Go ahead and speak up, I've got your back.",
        "exampleKo": "그냥 말해, 내가 네 편 들어줄게."
      },
      {
        "cue": "~와 끝까지 따져서 해결하다",
        "model": "have it out with [person]",
        "tier": 3,
        "easyEn": "to argue openly to settle a disagreement",
        "example": "I'm just going to have it out with him and clear the air.",
        "exampleKo": "그냥 걔랑 끝까지 따져서 오해를 풀 거야."
      }
    ]
  },
  {
    "id": "do",
    "verb": "DO",
    "gloss": "do는 처리, 수행, 반복, 제거를 만든다.",
    "items": [
      {
        "cue": "~을 하다 / 처리하다",
        "model": "do [task]",
        "tier": 1,
        "star": true,
        "example": "Can you do the dishes before you head out?",
        "exampleKo": "나가기 전에 설거지 좀 해줄래?"
      },
      {
        "cue": "~에 대해 조치를 취하다",
        "model": "do something about [problem]",
        "tier": 1,
        "star": true,
        "example": "We really need to do something about the parking situation at the office.",
        "exampleKo": "사무실 주차 문제에 대해 진짜 뭔가 조치를 취해야 해."
      },
      {
        "cue": "~에서 잘하다",
        "model": "do well in [area]",
        "tier": 1,
        "star": true,
        "example": "She always does well in math but hates history.",
        "exampleKo": "걔는 수학은 항상 잘하는데 역사는 싫어해."
      },
      {
        "cue": "~에 대해 조사하다",
        "model": "do research on [topic]",
        "tier": 1,
        "star": true,
        "example": "I did a ton of research on which laptop to buy before pulling the trigger.",
        "exampleKo": "어떤 노트북을 살지 결정하기 전에 엄청 많이 조사했어."
      },
      {
        "cue": "~의 부탁을 들어주다",
        "model": "do [person] a favor",
        "tier": 1,
        "star": true,
        "easyEn": "to help someone by doing something for them",
        "example": "Hey, can you do me a favor and grab my package from the front desk?",
        "exampleKo": "야, 부탁 하나만 들어줄래? 프런트에서 내 택배 좀 받아줘."
      },
      {
        "cue": "~에서 못하다",
        "model": "do badly in [area]",
        "tier": 2,
        "star": true,
        "example": "I did badly in chemistry, so I had to retake it over the summer.",
        "exampleKo": "화학을 너무 못해서 여름에 재수강해야 했어."
      },
      {
        "cue": "~을 테스트하다",
        "model": "do testing on [system]",
        "tier": 2,
        "star": true,
        "example": "We're doing testing on the new checkout flow before we ship it Friday.",
        "exampleKo": "금요일에 배포하기 전에 새 결제 흐름을 테스트하고 있어."
      },
      {
        "cue": "~와 거래하다",
        "model": "do business with [company/person]",
        "tier": 2,
        "star": true,
        "example": "We've been doing business with that vendor for almost ten years now.",
        "exampleKo": "저 업체랑 거의 10년째 거래해오고 있어."
      },
      {
        "cue": "~없이 지내다",
        "model": "do without [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to manage even though you do not have something",
        "example": "The wifi's down, so we'll just have to do without it this morning.",
        "exampleKo": "와이파이가 나가서 오늘 아침엔 그냥 없이 지내야 해."
      },
      {
        "cue": "다시 하다",
        "model": "do over [task]",
        "tier": 2,
        "easyEn": "to do something again from the start",
        "example": "The formatting got messed up, so I had to do the whole slide over.",
        "exampleKo": "서식이 다 엉망이 돼서 슬라이드 전체를 처음부터 다시 해야 했어."
      },
      {
        "cue": "~을 없애다",
        "model": "do away with [thing]",
        "tier": 2,
        "easyEn": "to get rid of or stop using something",
        "example": "They finally did away with the annoying weekly status meeting.",
        "exampleKo": "드디어 그 짜증나는 주간 상황 회의를 없앴어."
      },
      {
        "cue": "~와 관련 있다",
        "model": "have to do with [thing]",
        "tier": 2,
        "easyEn": "to be related or connected to something",
        "example": "Honestly, the bug has nothing to do with your code.",
        "exampleKo": "솔직히 그 버그는 네 코드랑 아무 상관 없어."
      },
      {
        "cue": "효과가 있다 / 문제를 해결하다",
        "model": "do the trick",
        "tier": 2,
        "easyEn": "to work and solve the problem",
        "example": "Just restart the router — that usually does the trick.",
        "exampleKo": "그냥 공유기 재시작해 봐, 보통 그러면 해결돼."
      },
      {
        "cue": "~을 손으로/수동으로 하다",
        "model": "do [thing] by hand",
        "tier": 2,
        "easyEn": "to do something manually, not by machine",
        "example": "We used to enter all the receipts by hand before we got the app.",
        "exampleKo": "그 앱 쓰기 전엔 영수증을 전부 손으로 입력했었어."
      },
      {
        "cue": "잠그다 / 꾸미다",
        "model": "do up [button/zipper/room]",
        "tier": 3,
        "easyEn": "to fasten something, or to decorate a room",
        "example": "Do up your jacket, it's freezing outside.",
        "exampleKo": "재킷 잠가, 밖에 엄청 추워."
      },
      {
        "cue": "~이 있으면 좋겠다",
        "model": "could do with [thing]",
        "tier": 3,
        "easyEn": "to want or need something",
        "example": "Man, I could do with a coffee right about now.",
        "exampleKo": "아, 지금 커피 한 잔 있으면 딱 좋겠다."
      },
      {
        "cue": "~에게 공정하게 대하다",
        "model": "do right by [person]",
        "tier": 3,
        "easyEn": "to treat someone fairly and well",
        "example": "He stayed late to finish her part too — he really does right by his team.",
        "exampleKo": "걔는 남아서 동료 몫까지 끝냈어, 팀원들한테 정말 잘해줘."
      }
    ]
  },
  {
    "id": "make",
    "verb": "MAKE",
    "gloss": "make는 만들기, 결과, 보상, 의미를 만든다.",
    "items": [
      {
        "cue": "~을 만들다",
        "model": "make [thing]",
        "tier": 1,
        "star": true,
        "example": "I'll make some coffee before the meeting.",
        "exampleKo": "회의 전에 커피 좀 내릴게."
      },
      {
        "cue": "~에게 ~하게 만들다",
        "model": "make [person] do [verb]",
        "tier": 1,
        "star": true,
        "example": "My boss made me redo the whole report.",
        "exampleKo": "상사가 나한테 보고서를 전부 다시 하게 시켰어."
      },
      {
        "cue": "~을 확실히 하다",
        "model": "make sure [that sentence]",
        "tier": 1,
        "star": true,
        "example": "Make sure you save the file before you close it.",
        "exampleKo": "닫기 전에 파일 꼭 저장해."
      },
      {
        "cue": "말이 되다",
        "model": "make sense",
        "tier": 1,
        "star": true,
        "example": "Wait, that doesn't make sense to me.",
        "exampleKo": "잠깐, 그거 나한테는 말이 안 되는데."
      },
      {
        "cue": "~을 이해하다",
        "model": "make sense of [thing]",
        "tier": 1,
        "star": true,
        "example": "I can't make sense of these instructions at all.",
        "exampleKo": "이 설명서를 도무지 이해할 수가 없어."
      },
      {
        "cue": "지어내다",
        "model": "make up [story/excuse]",
        "tier": 1,
        "star": true,
        "easyEn": "to invent a false story or excuse",
        "example": "He totally made up an excuse for being late.",
        "exampleKo": "걔 지각한 거 완전히 핑계를 지어냈어."
      },
      {
        "cue": "~에 도착하다 / 참석하다",
        "model": "make it to [place/event]",
        "tier": 1,
        "star": true,
        "easyEn": "to succeed in getting to a place or event",
        "example": "Sorry, I couldn't make it to your birthday party.",
        "exampleKo": "미안, 네 생일 파티에 못 갔어."
      },
      {
        "cue": "변화를 가져오다 / 차이를 만들다",
        "model": "make a difference",
        "tier": 1,
        "star": true,
        "example": "Even a small donation can make a difference.",
        "exampleKo": "작은 기부도 변화를 가져올 수 있어."
      },
      {
        "cue": "~에서 진전을 이루다",
        "model": "make progress on [thing]",
        "tier": 1,
        "star": true,
        "example": "We're finally making progress on the new feature.",
        "exampleKo": "드디어 새 기능에서 진전을 이루고 있어."
      },
      {
        "cue": "~을 실현시키다 / 성사시키다",
        "model": "make [thing] happen",
        "tier": 1,
        "star": true,
        "example": "If you want that promotion, go make it happen.",
        "exampleKo": "그 승진을 원하면 가서 실현시켜."
      },
      {
        "cue": "~이 작동하게 만들다 / 통하게 하다",
        "model": "make [thing] work",
        "tier": 1,
        "star": true,
        "example": "I don't care how, just make it work by Friday.",
        "exampleKo": "어떻게든 상관없으니까 금요일까지 되게 해."
      },
      {
        "cue": "결정을 내리다",
        "model": "make a decision",
        "tier": 1,
        "example": "We need to make a decision before lunch.",
        "exampleKo": "점심 전에 결정을 내려야 해."
      },
      {
        "cue": "~을 만회하다",
        "model": "make up for [loss/mistake]",
        "tier": 2,
        "star": true,
        "easyEn": "to do something to fix or balance a past mistake or loss",
        "example": "I'll stay late tonight to make up for yesterday.",
        "exampleKo": "어제 못한 거 만회하려고 오늘 늦게까지 있을게."
      },
      {
        "cue": "겨우 알아보다 / 이해하다",
        "model": "make out [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to barely see, hear, or understand something",
        "example": "I could barely make out what she was saying over the noise.",
        "exampleKo": "시끄러워서 걔가 뭐라는지 겨우 알아들었어."
      },
      {
        "cue": "~을 ~로 만들다",
        "model": "make [thing] into [thing]",
        "tier": 2,
        "star": true,
        "example": "They turned the garage into a home gym.",
        "exampleKo": "걔네 차고를 홈짐으로 만들었어."
      },
      {
        "cue": "~을 활용하다",
        "model": "make use of [thing]",
        "tier": 2,
        "star": true,
        "example": "Let's make use of the extra time and clean up.",
        "exampleKo": "남는 시간 활용해서 정리 좀 하자."
      },
      {
        "cue": "~을 위한 공간을 만들다",
        "model": "make room for [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you make room for one more chair?",
        "exampleKo": "의자 하나 더 놓을 공간 좀 만들어 줄래?"
      },
      {
        "cue": "~을 버텨내다",
        "model": "make it through [difficulty]",
        "tier": 2,
        "star": true,
        "easyEn": "to survive or reach the end of a hard time",
        "example": "It was a rough week, but we made it through.",
        "exampleKo": "힘든 한 주였지만 우린 버텨냈어."
      },
      {
        "cue": "~로 어떻게든 버티다",
        "model": "make do with [thing]",
        "tier": 2,
        "easyEn": "manage using what you have, even if not enough",
        "example": "We're out of milk, so just make do with water.",
        "exampleKo": "우유 다 떨어졌으니까 그냥 물로 어떻게든 버텨."
      },
      {
        "cue": "~로 만들어져 있다",
        "model": "be made of [material]",
        "tier": 2,
        "example": "This table is made of solid oak.",
        "exampleKo": "이 테이블은 단단한 참나무로 만들어졌어."
      },
      {
        "cue": "~을 원료로 만들어지다",
        "model": "be made from [material]",
        "tier": 2,
        "example": "Wine is made from grapes.",
        "exampleKo": "와인은 포도를 원료로 만들어져."
      },
      {
        "cue": "~로 만들어져 있다",
        "model": "be made out of [material]",
        "tier": 2,
        "example": "That jacket is made out of recycled plastic.",
        "exampleKo": "저 재킷은 재활용 플라스틱으로 만들어졌어."
      },
      {
        "cue": "결정을 내리다 / 전화를 걸다",
        "model": "make a call",
        "tier": 2,
        "example": "It's your project, so you make the call.",
        "exampleKo": "네 프로젝트니까 네가 결정해."
      },
      {
        "cue": "~을 최대한 활용하다",
        "model": "make the most of [thing]",
        "tier": 2,
        "easyEn": "use a situation or thing as well as possible",
        "example": "It's only two days off, so make the most of it.",
        "exampleKo": "이틀밖에 안 쉬니까 최대한 알차게 보내."
      },
      {
        "cue": "~와 화해하다",
        "model": "make up with [person]",
        "tier": 2,
        "easyEn": "become friends again after an argument",
        "example": "Did you finally make up with your sister?",
        "exampleKo": "너 결국 언니랑 화해했어?"
      },
      {
        "cue": "~로 향하다 / ~에 도움이 되다",
        "model": "make for [place/result]",
        "tier": 3,
        "easyEn": "to move toward a place, or to help create a result",
        "example": "A little planning makes for a smoother trip.",
        "exampleKo": "약간의 계획이 더 순조로운 여행에 도움이 돼."
      },
      {
        "cue": "~을 훔쳐 달아나다",
        "model": "make off with [thing]",
        "tier": 3,
        "easyEn": "to steal something and quickly leave",
        "example": "Someone made off with my bike right outside the store.",
        "exampleKo": "누가 가게 바로 앞에서 내 자전거를 훔쳐 달아났어."
      }
    ]
  },
  {
    "id": "get",
    "verb": "GET",
    "gloss": "get은 영어에서 제일 큰 뼈대다. 얻다, 되다, 도착하다, 이해하다, 처리하다.",
    "items": [
      {
        "cue": "일어나다",
        "model": "get up",
        "tier": 1,
        "star": true,
        "example": "I get up at six so I can hit the gym before work.",
        "exampleKo": "나는 출근 전에 헬스장 가려고 6시에 일어나."
      },
      {
        "cue": "들어가다 / 도착하다",
        "model": "get in",
        "tier": 1,
        "star": true,
        "example": "Text me when you get in and I'll come grab you.",
        "exampleKo": "도착하면 문자 줘, 내가 데리러 나갈게."
      },
      {
        "cue": "들어가다 / 관심 갖다 / 빠지다",
        "model": "get into [place/topic]",
        "tier": 1,
        "star": true,
        "example": "I've really been getting into rock climbing lately.",
        "exampleKo": "요즘 암벽등반에 완전 빠졌어."
      },
      {
        "cue": "나가다",
        "model": "get out",
        "tier": 1,
        "star": true,
        "example": "Let's get out of here, this party is dead.",
        "exampleKo": "여기 나가자, 이 파티 완전 재미없어."
      },
      {
        "cue": "~에서 나오다 / ~을 피하다",
        "model": "get out of [place/task]",
        "tier": 1,
        "star": true,
        "example": "I'm trying to get out of the meeting on Friday.",
        "exampleKo": "나 금요일 회의 좀 빠지려고 하고 있어."
      },
      {
        "cue": "타다",
        "model": "get on [bus/train]",
        "tier": 1,
        "star": true,
        "example": "We got on the wrong train and ended up in Brooklyn.",
        "exampleKo": "우리 엉뚱한 기차를 타서 결국 브루클린까지 갔어."
      },
      {
        "cue": "내리다 / 퇴근하다",
        "model": "get off [bus/train/work]",
        "tier": 1,
        "star": true,
        "example": "I get off work at five, so let's meet at six.",
        "exampleKo": "나 5시에 퇴근하니까 6시에 만나자."
      },
      {
        "cue": "극복하다",
        "model": "get over [problem/person]",
        "tier": 1,
        "star": true,
        "easyEn": "recover from something upsetting or difficult",
        "example": "It took me months to get over the breakup.",
        "exampleKo": "그 이별을 극복하는 데 몇 달 걸렸어."
      },
      {
        "cue": "끝까지 해내다",
        "model": "get through [task/difficulty]",
        "tier": 1,
        "star": true,
        "example": "I just need to get through this deadline and then I'm free.",
        "exampleKo": "이 마감만 끝까지 해내면 나 자유야."
      },
      {
        "cue": "그럭저럭 지내다",
        "model": "get by",
        "tier": 1,
        "star": true,
        "easyEn": "manage to live or work with what you have",
        "example": "Rent is brutal, but we get by.",
        "exampleKo": "월세가 살인적이지만 그럭저럭 버티고 있어."
      },
      {
        "cue": "~와 잘 지내다",
        "model": "get along with [person]",
        "tier": 1,
        "star": true,
        "easyEn": "have a friendly relationship with someone",
        "example": "I get along with everyone on my team except one guy.",
        "exampleKo": "우리 팀에서 딱 한 명 빼고 다 잘 지내."
      },
      {
        "cue": "돌아오다",
        "model": "get back",
        "tier": 1,
        "star": true,
        "example": "I'll cook once I get back from the store.",
        "exampleKo": "마트에서 돌아오면 요리할게."
      },
      {
        "cue": "나중에 다시 답하다",
        "model": "get back to [person]",
        "tier": 1,
        "star": true,
        "easyEn": "reply to someone later",
        "example": "Let me check my calendar and I'll get back to you.",
        "exampleKo": "일정 확인하고 나중에 다시 답할게."
      },
      {
        "cue": "~에 익숙해지다",
        "model": "get used to [-ing/noun]",
        "tier": 1,
        "star": true,
        "easyEn": "become familiar with something over time",
        "example": "It took a week to get used to waking up early.",
        "exampleKo": "일찍 일어나는 데 익숙해지는 데 일주일 걸렸어."
      },
      {
        "cue": "~을 제거하다",
        "model": "get rid of [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "remove or throw away something you do not want",
        "example": "We finally got rid of that ugly couch.",
        "exampleKo": "드디어 그 못생긴 소파를 치워버렸어."
      },
      {
        "cue": "시작하다",
        "model": "get started",
        "tier": 1,
        "star": true,
        "example": "Alright, let's get started, we've got a lot to cover.",
        "exampleKo": "자, 시작하자, 다룰 게 많아."
      },
      {
        "cue": "막히다",
        "model": "get stuck",
        "tier": 1,
        "star": true,
        "example": "I got stuck on this bug for like three hours.",
        "exampleKo": "이 버그에서 세 시간쯤 막혀 있었어."
      },
      {
        "cue": "끝내다",
        "model": "get done",
        "tier": 1,
        "star": true,
        "example": "Can we get this done before lunch?",
        "exampleKo": "이거 점심 전에 끝낼 수 있을까?"
      },
      {
        "cue": "~와 연락하다",
        "model": "get in touch with [person]",
        "tier": 1,
        "star": true,
        "easyEn": "contact or communicate with someone",
        "example": "Get in touch with Sarah, she handles the invoices.",
        "exampleKo": "사라한테 연락해, 걔가 청구서 담당이야."
      },
      {
        "cue": "(~와) 모이다 / 만나다",
        "model": "get together (with [person])",
        "tier": 1,
        "star": true,
        "example": "We should get together for coffee sometime next week.",
        "exampleKo": "다음 주쯤 커피나 한잔하러 모이자."
      },
      {
        "cue": "돌아다니다 / 우회하다",
        "model": "get around [place/problem]",
        "tier": 2,
        "star": true,
        "easyEn": "move from place to place, or avoid a problem",
        "example": "It's easy to get around the city on the subway.",
        "exampleKo": "지하철로 도시를 돌아다니기 쉬워."
      },
      {
        "cue": "결국 시간을 내서 ~하다",
        "model": "get around to [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "finally find time to do something",
        "example": "I finally got around to fixing the leaky faucet.",
        "exampleKo": "드디어 시간 내서 새는 수도꼭지를 고쳤어."
      },
      {
        "cue": "생각을 전달하다",
        "model": "get across [idea]",
        "tier": 2,
        "star": true,
        "easyEn": "make an idea clearly understood by others",
        "example": "I couldn't get my point across in the meeting.",
        "exampleKo": "회의에서 내 생각을 제대로 전달 못 했어."
      },
      {
        "cue": "떠나다 / 도망가다",
        "model": "get away",
        "tier": 2,
        "example": "We just need to get away for the weekend.",
        "exampleKo": "우리 주말에 어디든 좀 떠나야 해."
      },
      {
        "cue": "~하고도 처벌을 피하다",
        "model": "get away with [thing]",
        "tier": 2,
        "easyEn": "do something wrong without being caught or punished",
        "example": "He always cuts in line and somehow gets away with it.",
        "exampleKo": "걔는 맨날 새치기하는데 어떻게든 걸리지 않고 넘어가."
      },
      {
        "cue": "앞서가다",
        "model": "get ahead",
        "tier": 2,
        "easyEn": "make progress or succeed, especially at work",
        "example": "You have to network if you want to get ahead here.",
        "exampleKo": "여기서 앞서가려면 인맥을 쌓아야 해."
      },
      {
        "cue": "뒤처지다",
        "model": "get behind",
        "tier": 2,
        "example": "I got behind on emails after being out sick.",
        "exampleKo": "아파서 쉬고 나니 이메일이 밀렸어."
      },
      {
        "cue": "~이 밀리다",
        "model": "get behind on [thing]",
        "tier": 2,
        "example": "I'm really getting behind on my rent.",
        "exampleKo": "월세가 진짜 많이 밀리고 있어."
      },
      {
        "cue": "~에 도착하다 / ~에게 영향을 주다",
        "model": "get to [place/person]",
        "tier": 2,
        "easyEn": "reach a place, or start to upset someone",
        "example": "The constant noise from upstairs is really getting to me.",
        "exampleKo": "위층 소음이 계속되니 진짜 신경 쓰여."
      },
      {
        "cue": "~을 의미하려 하다",
        "model": "get at [meaning]",
        "tier": 2,
        "easyEn": "try to express or suggest a meaning",
        "example": "I'm not sure what you're getting at here.",
        "exampleKo": "네가 지금 무슨 말을 하려는 건지 모르겠어."
      },
      {
        "cue": "~와 잘 지내다 / ~을 계속 진행하다",
        "model": "get on with [person/task]",
        "tier": 2,
        "easyEn": "continue a task, or have a good relationship",
        "example": "Let's stop chatting and get on with the work.",
        "exampleKo": "수다는 그만하고 일 계속 하자."
      },
      {
        "cue": "~에 본격적으로 착수하다",
        "model": "get down to [task/business]",
        "tier": 2,
        "star": true,
        "easyEn": "start seriously focusing on a task",
        "example": "Enough small talk, let's get down to business.",
        "exampleKo": "잡담은 그만하고 본론으로 들어가자."
      },
      {
        "cue": "~을 빨리 끝내버리다",
        "model": "get [thing] over with",
        "tier": 2,
        "star": true,
        "easyEn": "finish something unpleasant as soon as possible",
        "example": "I hate dentist visits, so I just want to get it over with.",
        "exampleKo": "치과 가는 거 싫어서 그냥 빨리 끝내버리고 싶어."
      },
      {
        "cue": "~을 따라잡다 / 숙지하다",
        "model": "get up to speed on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "learn what you need to know about something",
        "example": "Give me a day to get up to speed on the project.",
        "exampleKo": "프로젝트 숙지할 시간 하루만 줘."
      },
      {
        "cue": "~의 요령을 터득하다",
        "model": "get the hang of [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "learn how to do something with practice",
        "example": "Once you get the hang of it, parallel parking is easy.",
        "exampleKo": "요령만 터득하면 평행 주차는 쉬워."
      },
      {
        "cue": "~를 이해시키다 / ~와 연락이 닿다",
        "model": "get through to [person]",
        "tier": 2,
        "easyEn": "succeed in making someone understand you",
        "example": "I keep explaining but I just can't get through to him.",
        "exampleKo": "계속 설명하는데 걔를 도무지 이해시킬 수가 없어."
      },
      {
        "cue": "~에게 앙갚음하다 / 복수하다",
        "model": "get back at [person]",
        "tier": 2,
        "easyEn": "do something bad to someone who hurt you",
        "example": "She pranked me, so I'm gonna get back at her.",
        "exampleKo": "걔가 나한테 장난쳤으니 앙갚음할 거야."
      },
      {
        "cue": "~을 장악하다 / 잘 관리하다",
        "model": "get on top of [thing]",
        "tier": 2,
        "easyEn": "gain control of something and manage it well",
        "example": "I finally feel like I'm getting on top of my workload.",
        "exampleKo": "드디어 내 업무량을 잘 관리하고 있는 것 같아."
      },
      {
        "cue": "~을 다시 시작하다 / ~에 다시 빠져들다",
        "model": "get back into [thing]",
        "tier": 2,
        "easyEn": "start doing or enjoying something again",
        "example": "I'm trying to get back into running after the winter.",
        "exampleKo": "겨울 지나고 다시 달리기를 시작하려고 해."
      },
      {
        "cue": "~와 연락이 닿다 / ~을 구하다",
        "model": "get a hold of [person/thing]",
        "tier": 2,
        "easyEn": "manage to contact someone or obtain something",
        "example": "I've been trying to get a hold of the landlord all day.",
        "exampleKo": "하루 종일 집주인이랑 연락이 닿으려고 애쓰고 있어."
      },
      {
        "cue": "출발하다 / 시작하다",
        "model": "get going",
        "tier": 2,
        "example": "We should get going, traffic's only gonna get worse.",
        "exampleKo": "이제 출발하자, 차 막히는 거 더 심해질 거야."
      },
      {
        "cue": "~에 끼다 / 동참하다",
        "model": "get in on [thing]",
        "tier": 3,
        "easyEn": "become involved in an activity others are doing",
        "example": "They're all pitching in on a gift and I want to get in on it.",
        "exampleKo": "다들 선물 돈 모으는데 나도 끼고 싶어."
      }
    ]
  },
  {
    "id": "go",
    "verb": "GO",
    "gloss": "go는 이동, 진행, 변화, 상태를 만든다.",
    "items": [
      {
        "cue": "나가다",
        "model": "go out",
        "tier": 1,
        "star": true,
        "example": "I'm gonna go out for a bit, need anything from Target?",
        "exampleKo": "나 잠깐 나갔다 올게, 타겟에서 뭐 필요한 거 있어?"
      },
      {
        "cue": "들어가다",
        "model": "go in",
        "tier": 1,
        "star": true,
        "example": "Just go in, the door's unlocked.",
        "exampleKo": "그냥 들어가, 문 안 잠겼어."
      },
      {
        "cue": "자세히 들어가다",
        "model": "go into [detail/topic]",
        "tier": 1,
        "star": true,
        "example": "I won't go into the details now, but the deploy broke prod.",
        "exampleKo": "지금 자세히는 안 들어갈게, 근데 배포가 프로덕션을 망가뜨렸어."
      },
      {
        "cue": "계속되다 / 발생하다",
        "model": "go on",
        "tier": 1,
        "star": true,
        "example": "What's going on with the login bug?",
        "exampleKo": "로그인 버그는 어떻게 돼가고 있어?"
      },
      {
        "cue": "검토하다",
        "model": "go over [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "review or examine something carefully",
        "example": "Can you go over my PR before I merge it?",
        "exampleKo": "머지하기 전에 내 PR 좀 검토해줄 수 있어?"
      },
      {
        "cue": "겪다 / 자세히 살펴보다",
        "model": "go through [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "experience something, or examine it carefully",
        "example": "She's going through a rough divorce right now.",
        "exampleKo": "걔 지금 힘든 이혼 과정을 겪고 있어."
      },
      {
        "cue": "돌아가다",
        "model": "go back",
        "tier": 1,
        "star": true,
        "example": "Sorry, can we go back? I missed that last slide.",
        "exampleKo": "미안, 뒤로 돌아갈 수 있어? 방금 슬라이드 놓쳤어."
      },
      {
        "cue": "~로 돌아가다",
        "model": "go back to [thing]",
        "tier": 1,
        "star": true,
        "example": "Let's go back to what you said about the pricing.",
        "exampleKo": "네가 가격에 대해 말한 걸로 다시 돌아가 보자."
      },
      {
        "cue": "진행하다",
        "model": "go ahead",
        "tier": 1,
        "star": true,
        "example": "Go ahead, I'm listening.",
        "exampleKo": "어서 말해, 듣고 있어."
      },
      {
        "cue": "떠나다 / 사라지다",
        "model": "go away",
        "tier": 1,
        "star": true,
        "example": "I keep restarting it but the error won't go away.",
        "exampleKo": "계속 재시작하는데 에러가 안 사라져."
      },
      {
        "cue": "~을 선택하다",
        "model": "go with [option]",
        "tier": 1,
        "star": true,
        "easyEn": "choose or decide on an option",
        "example": "Let's just go with the blue logo, it looks cleaner.",
        "exampleKo": "그냥 파란색 로고로 가자, 그게 더 깔끔해 보여."
      },
      {
        "cue": "올라가다",
        "model": "go up",
        "tier": 1,
        "star": true,
        "example": "Gas prices went up again this week.",
        "exampleKo": "이번 주에 기름값이 또 올랐어."
      },
      {
        "cue": "내려가다 / 발생하다",
        "model": "go down",
        "tier": 1,
        "star": true,
        "example": "The site went down around 3am last night.",
        "exampleKo": "어젯밤 3시쯤에 사이트가 다운됐어."
      },
      {
        "cue": "잘못되다 / 틀어지다",
        "model": "go wrong",
        "tier": 1,
        "star": true,
        "example": "If anything goes wrong, just call me.",
        "exampleKo": "뭔가 잘못되면 그냥 나한테 전화해."
      },
      {
        "cue": "돌아다니다",
        "model": "go around [place]",
        "tier": 2,
        "star": true,
        "example": "We spent the afternoon going around downtown Seattle.",
        "exampleKo": "우리 오후 내내 시애틀 시내를 돌아다녔어."
      },
      {
        "cue": "지나가다 / ~에 따라 판단하다",
        "model": "go by",
        "tier": 2,
        "star": true,
        "easyEn": "pass by, or use something to decide or judge",
        "example": "Don't go by the photos, the place is way smaller in person.",
        "exampleKo": "사진만 보고 판단하지 마, 실제로는 훨씬 작아."
      },
      {
        "cue": "~을 선택하다 / 시도하다",
        "model": "go for [option/goal]",
        "tier": 2,
        "star": true,
        "easyEn": "choose something, or try hard to get it",
        "example": "I think I'm gonna go for the ramen tonight.",
        "exampleKo": "오늘 밤엔 라멘으로 갈까 봐."
      },
      {
        "cue": "~에 어긋나다 / 반대하다",
        "model": "go against [rule/idea]",
        "tier": 2,
        "star": true,
        "example": "That kind of goes against everything we agreed on.",
        "exampleKo": "그건 우리가 합의한 거랑 좀 어긋나잖아."
      },
      {
        "cue": "알람이 울리다 / 폭발하다 / 상하다",
        "model": "go off",
        "tier": 2,
        "easyEn": "ring suddenly, explode, or become spoiled",
        "example": "My alarm went off but I slept right through it.",
        "exampleKo": "알람이 울렸는데 그냥 못 듣고 계속 잤어."
      },
      {
        "cue": "~없이 지내다",
        "model": "go without [thing]",
        "tier": 2,
        "example": "I can't go without coffee in the morning.",
        "exampleKo": "아침에 커피 없이는 못 버텨."
      },
      {
        "cue": "~을 추구하다 / 뒤쫓다",
        "model": "go after [goal/person]",
        "tier": 2,
        "example": "He quit his job to go after his startup idea.",
        "exampleKo": "걔는 스타트업 아이디어를 좇으려고 직장을 그만뒀어."
      },
      {
        "cue": "~에 동의하고 따르다",
        "model": "go along with [idea]",
        "tier": 2,
        "easyEn": "agree with or accept a plan or idea",
        "example": "I'll go along with whatever the team decides.",
        "exampleKo": "팀이 결정하는 대로 그냥 따를게."
      },
      {
        "cue": "일부러 애쓰다",
        "model": "go out of [one’s way]",
        "tier": 2,
        "easyEn": "make a special effort to do something",
        "example": "She went out of her way to help me move.",
        "exampleKo": "걔가 나 이사하는 거 도와주려고 일부러 애써줬어."
      },
      {
        "cue": "계획을 끝까지 실행하다",
        "model": "go through with [plan]",
        "tier": 2,
        "easyEn": "do something you planned, even if difficult",
        "example": "I wasn't sure at first, but I'm going through with the surgery.",
        "exampleKo": "처음엔 확신이 없었는데, 수술은 끝까지 받기로 했어."
      },
      {
        "cue": "~을 진행하다 / 추진하다",
        "model": "go ahead with [plan]",
        "tier": 2,
        "star": true,
        "example": "The client gave the okay, so we're going ahead with the launch.",
        "exampleKo": "클라이언트가 승인해서 우리 출시를 진행해."
      },
      {
        "cue": "~을 어기다 / 번복하다",
        "model": "go back on [promise/word]",
        "tier": 2,
        "star": true,
        "easyEn": "fail to keep a promise you made",
        "example": "He promised he'd help and then went back on it.",
        "exampleKo": "걔가 도와준다고 해놓고 말을 번복했어."
      },
      {
        "cue": "~에 착수하다 / ~을 처리하다(방식)",
        "model": "go about [-ing/task]",
        "tier": 2,
        "star": true,
        "easyEn": "start dealing with a task in a certain way",
        "example": "How do you usually go about debugging this kind of thing?",
        "exampleKo": "보통 이런 거 디버깅은 어떻게 처리해?"
      },
      {
        "cue": "(서비스/기능이) 출시되다 / 가동되다",
        "model": "go live",
        "tier": 2,
        "easyEn": "start operating or become publicly available",
        "example": "The new checkout page goes live Monday morning.",
        "exampleKo": "새 결제 페이지가 월요일 아침에 오픈돼."
      },
      {
        "cue": "~와 사귀다 / 데이트하다",
        "model": "go out with [person]",
        "tier": 2,
        "easyEn": "have a romantic relationship with someone",
        "example": "How long have you been going out with Jake?",
        "exampleKo": "제이크랑 사귄 지 얼마나 됐어?"
      },
      {
        "cue": "~에 맞서다 / 겨루다",
        "model": "go up against [opponent]",
        "tier": 2,
        "easyEn": "compete or fight against someone strong",
        "example": "We're going up against Google on this one, so it won't be easy.",
        "exampleKo": "이번엔 구글이랑 맞붙는 거라서 쉽지 않을 거야."
      },
      {
        "cue": "~를 살살 다루다 / 봐주다",
        "model": "go easy on [person]",
        "tier": 2,
        "easyEn": "treat someone gently and not too harshly",
        "example": "Go easy on the new intern, it's only her first week.",
        "exampleKo": "신입 인턴한테 좀 살살 해, 이제 겨우 첫 주야."
      },
      {
        "cue": "~에 대해 계속 떠들다",
        "model": "go on about [thing]",
        "tier": 2,
        "easyEn": "keep talking about something for too long",
        "example": "He keeps going on about his new Tesla, it's exhausting.",
        "exampleKo": "걔 새 테슬라 얘기 계속 떠들어대, 진짜 지친다."
      },
      {
        "cue": "왔다 갔다 하다 / (의견을) 주고받다",
        "model": "go back and forth",
        "tier": 2,
        "easyEn": "move or switch repeatedly between two things",
        "example": "We went back and forth on the name for like an hour.",
        "exampleKo": "우리 이름 가지고 한 시간 정도 왔다 갔다 했어."
      }
    ]
  },
  {
    "id": "come",
    "verb": "COME",
    "gloss": "come은 오다, 나오다, 발생하다, 결과적으로 ~되다.",
    "items": [
      {
        "cue": "들어오다",
        "model": "come in",
        "tier": 1,
        "star": true,
        "example": "Come in, the door's open.",
        "exampleKo": "들어와, 문 열려 있어."
      },
      {
        "cue": "나오다 / 공개되다",
        "model": "come out",
        "tier": 1,
        "star": true,
        "easyEn": "be released or become public",
        "example": "The new iPhone comes out next Friday.",
        "exampleKo": "새 아이폰이 다음 주 금요일에 나와."
      },
      {
        "cue": "생기다 / 언급되다",
        "model": "come up",
        "tier": 1,
        "star": true,
        "easyEn": "happen or be mentioned, often unexpectedly",
        "example": "Your name came up in the meeting today.",
        "exampleKo": "오늘 회의에서 네 이름이 언급됐어."
      },
      {
        "cue": "~을 생각해내다",
        "model": "come up with [idea/solution]",
        "tier": 1,
        "star": true,
        "easyEn": "think of or produce an idea or solution",
        "example": "We need to come up with a better name for the app.",
        "exampleKo": "우리 앱에 더 나은 이름을 생각해내야 해."
      },
      {
        "cue": "돌아오다",
        "model": "come back",
        "tier": 1,
        "star": true,
        "example": "I'll come back after lunch to finish this.",
        "exampleKo": "점심 먹고 이거 마저 끝내러 돌아올게."
      },
      {
        "cue": "들르다",
        "model": "come over",
        "tier": 1,
        "star": true,
        "easyEn": "come to someone's home to visit",
        "example": "Come over Saturday and we'll watch the game.",
        "exampleKo": "토요일에 들러, 같이 경기 보자."
      },
      {
        "cue": "~에서 오다 / 비롯되다",
        "model": "come from [place/source]",
        "tier": 1,
        "star": true,
        "example": "This bug comes from the caching layer, not the API.",
        "exampleKo": "이 버그는 API가 아니라 캐싱 레이어에서 비롯된 거야."
      },
      {
        "cue": "우연히 발견하다 / 마주치다",
        "model": "come across [thing/person]",
        "tier": 2,
        "star": true,
        "easyEn": "find or meet by chance",
        "example": "I came across a great coffee shop near the office.",
        "exampleKo": "사무실 근처에서 괜찮은 커피숍을 우연히 발견했어."
      },
      {
        "cue": "해내다 / 전달되다",
        "model": "come through",
        "tier": 2,
        "star": true,
        "easyEn": "succeed or deliver what was promised",
        "example": "Thanks for coming through on the deadline.",
        "exampleKo": "마감 지켜줘서 고마워, 정말 해냈어."
      },
      {
        "cue": "~에 이르다",
        "model": "come to [amount/conclusion]",
        "tier": 2,
        "star": true,
        "easyEn": "add up to or reach a total or decision",
        "example": "The bill came to eighty bucks with tip.",
        "exampleKo": "팁까지 해서 계산이 80달러 나왔어."
      },
      {
        "cue": "결국 ~의 문제로 귀결되다",
        "model": "come down to [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "be decided by one key factor",
        "example": "It all comes down to how much time we have.",
        "exampleKo": "결국 우리한테 시간이 얼마나 있느냐의 문제야."
      },
      {
        "cue": "~에서 나오다",
        "model": "come out of [place/situation]",
        "tier": 2,
        "star": true,
        "example": "Some good ideas came out of that messy meeting.",
        "exampleKo": "그 엉망이던 회의에서 좋은 아이디어가 몇 개 나왔어."
      },
      {
        "cue": "~에 들어오다 / 돈을 상속받다",
        "model": "come into [place/money]",
        "tier": 2,
        "star": true,
        "easyEn": "receive or inherit money",
        "example": "She came into some money when her grandma passed.",
        "exampleKo": "할머니가 돌아가시고 그녀는 돈을 좀 상속받았어."
      },
      {
        "cue": "함께 가다 / 진전되다",
        "model": "come along",
        "tier": 2,
        "easyEn": "go with someone; or make progress",
        "example": "We're grabbing lunch, want to come along?",
        "exampleKo": "우리 점심 먹으러 가는데 같이 갈래?"
      },
      {
        "cue": "생각을 바꾸다 / 들르다",
        "model": "come around",
        "tier": 2,
        "easyEn": "change your mind to agree",
        "example": "He was against it at first, but he came around.",
        "exampleKo": "처음엔 반대했는데 결국 생각을 바꿨어."
      },
      {
        "cue": "병에 걸리다",
        "model": "come down with [illness]",
        "tier": 2,
        "easyEn": "start to get an illness",
        "example": "I think I'm coming down with a cold.",
        "exampleKo": "나 감기 걸리는 것 같아."
      },
      {
        "cue": "~이 딸려 오다",
        "model": "come with [thing]",
        "tier": 2,
        "easyEn": "be included along with something",
        "example": "The apartment comes with a washer and dryer.",
        "exampleKo": "그 아파트는 세탁기랑 건조기가 딸려 와."
      },
      {
        "cue": "~라는 인상을 주다 / ~처럼 보이다",
        "model": "come off as [impression]",
        "tier": 2,
        "easyEn": "give a certain impression to others",
        "example": "I didn't mean to come off as rude in that email.",
        "exampleKo": "그 이메일에서 무례하게 보이려던 건 아니었어."
      },
      {
        "cue": "발생하다",
        "model": "come about",
        "tier": 3,
        "easyEn": "happen or occur",
        "example": "Nobody really knows how the fight came about.",
        "exampleKo": "그 싸움이 어쩌다 발생한 건지 아무도 몰라."
      },
      {
        "cue": "~보다 먼저 오다 / 우선하다",
        "model": "come before [thing]",
        "tier": 3,
        "easyEn": "be presented to a group or person for a decision",
        "example": "The proposal comes before the board next week.",
        "exampleKo": "그 제안은 다음 주에 이사회에 먼저 올라가."
      },
      {
        "cue": "~을 뒤쫓다 / 공격하다",
        "model": "come after [person]",
        "tier": 3,
        "easyEn": "chase or try to harm someone",
        "example": "Their lawyers are coming after us for the copyright.",
        "exampleKo": "그쪽 변호사들이 저작권 문제로 우리를 뒤쫓고 있어."
      },
      {
        "cue": "(예상 못 한) 문제/장벽에 부딪히다",
        "model": "come up against [problem/obstacle]",
        "tier": 3,
        "easyEn": "face a problem or obstacle",
        "example": "We came up against a nasty bug right before launch.",
        "exampleKo": "출시 직전에 골치 아픈 버그에 부딪혔어."
      },
      {
        "cue": "(제품·발표 등을) 내놓다 / 불쑥 말하다",
        "model": "come out with [statement/product]",
        "tier": 3,
        "easyEn": "release something; or suddenly say something",
        "example": "Apple just came out with a new pair of AirPods.",
        "exampleKo": "애플이 방금 새 에어팟을 내놨어."
      },
      {
        "cue": "~를 호되게 나무라다 / 강하게 단속하다",
        "model": "come down on [person]",
        "tier": 3,
        "easyEn": "criticize or punish someone harshly",
        "example": "My boss came down on me hard for missing the call.",
        "exampleKo": "통화 놓쳤다고 상사한테 호되게 혼났어."
      },
      {
        "cue": "기대에 못 미치다 / 부족하다",
        "model": "come up short",
        "tier": 3,
        "easyEn": "fail to reach a goal or amount",
        "example": "We hustled all quarter but still came up short on sales.",
        "exampleKo": "분기 내내 열심히 했지만 매출은 여전히 목표에 못 미쳤어."
      }
    ]
  },
  {
    "id": "take",
    "verb": "TAKE",
    "gloss": "take는 잡다, 가져가다, 맡다, 시간이 걸리다, 받아들이다.",
    "items": [
      {
        "cue": "꺼내다 / 데리고 나가다",
        "model": "take out [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "remove something; or take someone out socially",
        "example": "Can you take out the trash before you leave?",
        "exampleKo": "나가기 전에 쓰레기 좀 내다 버려 줄래?"
      },
      {
        "cue": "맡다 / 떠안다",
        "model": "take on [task/responsibility]",
        "tier": 1,
        "star": true,
        "easyEn": "accept or start a new task",
        "example": "I can take on the payments feature this sprint if nobody else has it.",
        "exampleKo": "이번 스프린트에 결제 기능 아무도 안 맡았으면 내가 맡을게."
      },
      {
        "cue": "벗다 / 쉬다 / 이륙하다",
        "model": "take off [clothes/time]",
        "tier": 1,
        "star": true,
        "easyEn": "remove clothes; leave; or depart",
        "example": "I'm taking Friday off to catch up on sleep.",
        "exampleKo": "밀린 잠 좀 자려고 금요일에 쉬려고."
      },
      {
        "cue": "넘겨받다 / 장악하다",
        "model": "take over [task/system]",
        "tier": 1,
        "star": true,
        "easyEn": "take control of a task or system",
        "example": "Can you take over the deploy while I'm in this meeting?",
        "exampleKo": "나 회의 들어가 있는 동안 배포 좀 넘겨받아 줄래?"
      },
      {
        "cue": "가져가다 / 빼앗다",
        "model": "take away [thing]",
        "tier": 1,
        "star": true,
        "example": "They took away my parking spot without even telling me.",
        "exampleKo": "말도 없이 내 주차 자리를 빼앗아 갔어."
      },
      {
        "cue": "처리하다 / 돌보다",
        "model": "take care of [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "handle or look after something or someone",
        "example": "Don't worry about the invoices, I'll take care of it.",
        "exampleKo": "인보이스는 걱정 마, 내가 처리할게."
      },
      {
        "cue": "~을 고려하다",
        "model": "take into account [factor]",
        "tier": 1,
        "star": true,
        "easyEn": "consider something when deciding",
        "example": "We need to take the timezone difference into account when we schedule the call.",
        "exampleKo": "통화 잡을 때 시차를 고려해야 해."
      },
      {
        "cue": "~에 책임지다",
        "model": "take responsibility for [thing]",
        "tier": 1,
        "star": true,
        "example": "I'll take responsibility for the outage, it was my config change.",
        "exampleKo": "이번 장애는 내가 책임질게, 내 설정 변경 때문이었어."
      },
      {
        "cue": "휴가를 내다",
        "model": "take time off",
        "tier": 1,
        "star": true,
        "example": "I really need to take some time off before I burn out.",
        "exampleKo": "번아웃 오기 전에 진짜 휴가 좀 내야겠어."
      },
      {
        "cue": "메모하다",
        "model": "take notes",
        "tier": 1,
        "star": true,
        "example": "Go ahead and start, I'll take notes.",
        "exampleKo": "시작해, 내가 메모할게."
      },
      {
        "cue": "한번 보다",
        "model": "take a look at [thing]",
        "tier": 1,
        "star": true,
        "example": "Can you take a look at my PR when you get a sec?",
        "exampleKo": "시간 날 때 내 PR 한번 봐 줄래?"
      },
      {
        "cue": "시간이 좀 걸리다",
        "model": "take a while",
        "tier": 1,
        "star": true,
        "example": "The build's gonna take a while, grab a coffee.",
        "exampleKo": "빌드 시간 좀 걸릴 거야, 커피나 한잔해."
      },
      {
        "cue": "(일이) 일어나다 / (행사가) 열리다",
        "model": "take place",
        "tier": 1,
        "star": true,
        "easyEn": "happen or be held",
        "example": "The all-hands takes place every Monday at 10.",
        "exampleKo": "전체 회의는 매주 월요일 10시에 열려."
      },
      {
        "cue": "~을 활용하다 / ~을 (부당하게) 이용하다",
        "model": "take advantage of [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "use an opportunity; or unfairly exploit someone",
        "example": "You should take advantage of the free trial while it lasts.",
        "exampleKo": "무료 체험 있을 때 활용하는 게 좋아."
      },
      {
        "cue": "~에 참여하다",
        "model": "take part in [activity]",
        "tier": 1,
        "star": true,
        "easyEn": "participate in an activity",
        "example": "A bunch of us are taking part in the hackathon this weekend.",
        "exampleKo": "이번 주말 해커톤에 우리 몇 명 참여해."
      },
      {
        "cue": "받아들이다 / 이해하다",
        "model": "take in [information/person]",
        "tier": 2,
        "star": true,
        "easyEn": "absorb and understand information",
        "example": "Give me a second to take all this in.",
        "exampleKo": "이거 좀 이해할 시간을 줘."
      },
      {
        "cue": "시작하다 / 차지하다",
        "model": "take up [hobby/space/time]",
        "tier": 2,
        "star": true,
        "easyEn": "start a hobby; or fill space or time",
        "example": "I've been thinking about taking up climbing this summer.",
        "exampleKo": "이번 여름에 클라이밍 시작해 볼까 생각 중이야."
      },
      {
        "cue": "적다 / 내리다",
        "model": "take down [notes/system]",
        "tier": 2,
        "star": true,
        "easyEn": "write down; or remove and shut down",
        "example": "Let me take down your number real quick.",
        "exampleKo": "네 번호 얼른 적어 둘게."
      },
      {
        "cue": "돌려받다 / 취소하다",
        "model": "take back [thing/words]",
        "tier": 2,
        "star": true,
        "easyEn": "return something; or retract what you said",
        "example": "Okay, I take it back, you were right about the bug.",
        "exampleKo": "알았어, 취소할게, 그 버그 네 말이 맞았어."
      },
      {
        "cue": "~을 닮다",
        "model": "take after [person]",
        "tier": 2,
        "easyEn": "look or behave like a relative",
        "example": "She totally takes after her mom.",
        "exampleKo": "걔는 완전히 엄마를 닮았어."
      },
      {
        "cue": "분해하다",
        "model": "take apart [thing]",
        "tier": 2,
        "example": "He took the whole keyboard apart just to clean it.",
        "exampleKo": "걔는 청소하려고 키보드를 통째로 분해했어."
      },
      {
        "cue": "~에게 과정을 설명하다",
        "model": "take [person] through [process]",
        "tier": 2,
        "easyEn": "explain a process step by step",
        "example": "Let me take you through the new onboarding flow.",
        "exampleKo": "새 온보딩 과정을 설명해 줄게."
      },
      {
        "cue": "~에서 가져오다",
        "model": "take [thing] from [source]",
        "tier": 2,
        "example": "I took that snippet from the docs, so it should work.",
        "exampleKo": "그 코드는 문서에서 가져온 거라 될 거야."
      },
      {
        "cue": "~을 ~로 가져가다",
        "model": "take [thing] to [place/person]",
        "tier": 2,
        "example": "Can you take these files to Sarah in accounting?",
        "exampleKo": "이 서류들 회계팀 세라한테 갖다줄래?"
      },
      {
        "cue": "제안을 받아들이다",
        "model": "take [person] up on [offer]",
        "tier": 2,
        "easyEn": "accept someone's offer or invitation",
        "example": "Thanks for the offer, I'll take you up on it.",
        "exampleKo": "제안 고마워, 그거 받아들일게."
      },
      {
        "cue": "(문제·안건을) ~에게 제기하다 / 상의하다",
        "model": "take [thing] up with [person]",
        "tier": 2,
        "easyEn": "raise an issue with someone",
        "example": "I'll take it up with my manager tomorrow.",
        "exampleKo": "그 건은 내일 매니저한테 얘기해 볼게."
      },
      {
        "cue": "~에게 화풀이하다",
        "model": "take it out on [person]",
        "tier": 2,
        "easyEn": "unfairly direct your anger at someone",
        "example": "I get it, you're stressed, but don't take it out on me.",
        "exampleKo": "스트레스받는 거 알겠는데 나한테 화풀이하지 마."
      },
      {
        "cue": "~를 대신해 (일을) 맡다",
        "model": "take over for [person]",
        "tier": 2,
        "easyEn": "do someone's job in their place",
        "example": "Can you take over for me on support while I'm out?",
        "exampleKo": "나 자리 비운 동안 지원 업무 좀 대신 맡아 줄래?"
      },
      {
        "cue": "~을 당연하게 여기다",
        "model": "take [thing] for granted",
        "tier": 2,
        "easyEn": "fail to appreciate what you have",
        "example": "We took the CI pipeline for granted until it broke.",
        "exampleKo": "CI 파이프라인 고장 나기 전까진 당연하게 여겼어."
      },
      {
        "cue": "~을 책임지고 맡다 / 주도하다",
        "model": "take charge of [thing]",
        "tier": 2,
        "easyEn": "take control and lead something",
        "example": "Someone needs to take charge of this project before it stalls.",
        "exampleKo": "이 프로젝트 멈추기 전에 누군가 책임지고 맡아야 해."
      },
      {
        "cue": "~에 자부심을 갖다",
        "model": "take pride in [thing/-ing]",
        "tier": 2,
        "easyEn": "feel proud of something",
        "example": "I take a lot of pride in keeping our code clean.",
        "exampleKo": "우리 코드 깔끔하게 유지하는 데 자부심이 커."
      }
    ]
  },
  {
    "id": "give",
    "verb": "GIVE",
    "gloss": "give는 주다, 양보하다, 포기하다, 발생시키다.",
    "items": [
      {
        "cue": "포기하다",
        "model": "give up",
        "tier": 1,
        "star": true,
        "easyEn": "stop trying",
        "example": "I couldn't figure out the bug at 2am, so I just gave up and went to bed.",
        "exampleKo": "새벽 2시에 버그를 못 잡아서 그냥 포기하고 자러 갔어."
      },
      {
        "cue": "~를 도와주다",
        "model": "give [person] a hand",
        "tier": 1,
        "star": true,
        "easyEn": "help someone",
        "example": "Hey, can you give me a hand carrying these boxes upstairs?",
        "exampleKo": "저기, 이 상자들 위층으로 옮기는 것 좀 도와줄래?"
      },
      {
        "cue": "~에 피드백을 주다",
        "model": "give feedback on [thing]",
        "tier": 1,
        "star": true,
        "example": "Can you give feedback on my slides before the meeting?",
        "exampleKo": "회의 전에 내 슬라이드에 피드백 좀 줄 수 있어?"
      },
      {
        "cue": "한번 해보다",
        "model": "give it a try",
        "tier": 1,
        "star": true,
        "easyEn": "attempt something",
        "example": "I've never used Figma, but I'll give it a try.",
        "exampleKo": "피그마 써본 적 없지만 한번 해볼게."
      },
      {
        "cue": "~에게 업데이트를 주다",
        "model": "give [person] an update on [thing]",
        "tier": 1,
        "example": "Let me give you a quick update on the launch real quick.",
        "exampleKo": "출시 관련해서 빠르게 업데이트 하나 줄게."
      },
      {
        "cue": "~에 대한 기대를 접다 / ~을 단념하다",
        "model": "give up on [person/thing]",
        "tier": 1,
        "star": true,
        "easyEn": "stop hoping for someone or something",
        "example": "After three rejections, I kind of gave up on that job.",
        "exampleKo": "세 번 떨어지고 나니까 그 일자리는 좀 단념했어."
      },
      {
        "cue": "~에게 미리 귀띔해주다 / 알려주다",
        "model": "give [person] a heads-up",
        "tier": 1,
        "star": true,
        "easyEn": "warn someone in advance",
        "example": "Just giving you a heads-up that I'll be out Friday.",
        "exampleKo": "금요일에 자리 비운다고 미리 귀띔해두는 거야."
      },
      {
        "cue": "굴복하다 / 양보하다",
        "model": "give in",
        "tier": 2,
        "star": true,
        "easyEn": "stop resisting and agree",
        "example": "My kid begged for ice cream and I finally gave in.",
        "exampleKo": "애가 아이스크림 사달라고 졸라서 결국 못 이겼어."
      },
      {
        "cue": "나눠주다 / 고갈되다",
        "model": "give out [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "hand out; or stop working",
        "example": "They were giving out free samples at the store entrance.",
        "exampleKo": "가게 입구에서 무료 샘플을 나눠주고 있었어."
      },
      {
        "cue": "공짜로 주다 / 폭로하다",
        "model": "give away [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "give for free; or reveal a secret",
        "example": "Don't give away the ending, I haven't watched it yet!",
        "exampleKo": "결말 말하지 마, 나 아직 안 봤단 말이야!"
      },
      {
        "cue": "돌려주다",
        "model": "give back [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you give back my charger when you're done?",
        "exampleKo": "다 쓰면 내 충전기 돌려줄래?"
      },
      {
        "cue": "냄새/빛/열을 내다",
        "model": "give off [smell/light/heat]",
        "tier": 2,
        "star": true,
        "easyEn": "send out smell, light, or heat",
        "example": "This candle gives off a really nice vanilla smell.",
        "exampleKo": "이 초는 진짜 좋은 바닐라 향을 내."
      },
      {
        "cue": "~에 대해 발표하다",
        "model": "give a presentation on [topic]",
        "tier": 2,
        "star": true,
        "example": "I'm giving a presentation on our Q3 numbers tomorrow.",
        "exampleKo": "내일 우리 3분기 실적에 대해 발표해."
      },
      {
        "cue": "~에게 접근 권한을 주다",
        "model": "give access to [person]",
        "tier": 2,
        "star": true,
        "example": "Can you give access to the shared drive to the new intern?",
        "exampleKo": "새 인턴한테 공유 드라이브 접근 권한 좀 줄 수 있어?"
      },
      {
        "cue": "~에게 공을 인정하다",
        "model": "give [person] credit for [thing]",
        "tier": 2,
        "easyEn": "acknowledge someone's good work",
        "example": "Give Sarah credit for this — the whole idea was hers.",
        "exampleKo": "이건 세라한테 공을 돌려야 해, 아이디어 전부 걔 거였어."
      },
      {
        "cue": "~에게 허락하다",
        "model": "give [person] permission to [verb]",
        "tier": 2,
        "example": "My manager gave me permission to work from home on Fridays.",
        "exampleKo": "매니저가 금요일마다 재택근무 해도 된다고 허락해줬어."
      },
      {
        "cue": "~에 굴복하다 / 못 이기다",
        "model": "give in to [pressure/temptation]",
        "tier": 2,
        "easyEn": "stop resisting pressure or temptation",
        "example": "I told myself no dessert, but I gave in to the temptation.",
        "exampleKo": "디저트 안 먹기로 했는데 유혹에 못 이겼어."
      },
      {
        "cue": "~을 좀 생각해보다 / 고민해보다",
        "model": "give [thing] some thought",
        "tier": 2,
        "easyEn": "think carefully about something",
        "example": "Let me give it some thought and get back to you tomorrow.",
        "exampleKo": "좀 생각해보고 내일 답 줄게."
      },
      {
        "cue": "~를 일단 선의로 봐주다 / 믿어주다",
        "model": "give [person] the benefit of the doubt",
        "tier": 2,
        "easyEn": "choose to trust someone despite doubt",
        "example": "He was late, but I'll give him the benefit of the doubt this time.",
        "exampleKo": "걔가 늦긴 했는데 이번엔 일단 좋게 봐줄게."
      },
      {
        "cue": "(지역사회 등에) 환원하다 / 베풀다",
        "model": "give back to [community]",
        "tier": 2,
        "easyEn": "help your community in return",
        "example": "Now that the startup did well, she wants to give back to her hometown.",
        "exampleKo": "스타트업이 잘되고 나서 그녀는 고향에 환원하고 싶어 해."
      },
      {
        "cue": "(퇴사·해지를) 미리 통보하다",
        "model": "give notice",
        "tier": 2,
        "easyEn": "formally announce you are quitting",
        "example": "I'm giving my two weeks' notice on Monday.",
        "exampleKo": "월요일에 퇴사 통보할 거야."
      },
      {
        "cue": "~을 초래하다",
        "model": "give rise to [problem/result]",
        "tier": 3,
        "easyEn": "cause something to happen",
        "example": "Skipping tests always gives rise to bugs down the line.",
        "exampleKo": "테스트를 건너뛰면 항상 나중에 버그를 초래해."
      },
      {
        "cue": "~에게 길을 내주다 / ~로 바뀌다",
        "model": "give way to [thing]",
        "tier": 3,
        "easyEn": "be replaced by something; or stop resisting it",
        "example": "The old office vibe gave way to a much more relaxed one.",
        "exampleKo": "예전의 사무실 분위기가 훨씬 편한 분위기로 바뀌었어."
      }
    ]
  },
  {
    "id": "put",
    "verb": "PUT",
    "gloss": "put은 놓다, 넣다, 배치하다, 미루다, 참다.",
    "items": [
      {
        "cue": "입다 / 틀다",
        "model": "put on [clothes/music]",
        "tier": 1,
        "star": true,
        "example": "Hold on, let me put on a jacket real quick.",
        "exampleKo": "잠깐만, 재킷 좀 얼른 입을게."
      },
      {
        "cue": "미루다",
        "model": "put off [task/event]",
        "tier": 1,
        "star": true,
        "easyEn": "delay something to a later time",
        "example": "Can we put off the meeting till Monday? I'm swamped today.",
        "exampleKo": "회의 월요일로 미뤄도 될까? 오늘 너무 바빠서."
      },
      {
        "cue": "참고 견디다",
        "model": "put up with [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "accept something unpleasant without complaining",
        "example": "I don't know how you put up with that noisy neighbor.",
        "exampleKo": "저 시끄러운 이웃을 어떻게 참고 견디는지 모르겠어."
      },
      {
        "cue": "내려놓다 / 적다",
        "model": "put down [thing]",
        "tier": 1,
        "star": true,
        "example": "Put your phone down and look at me for a sec.",
        "exampleKo": "핸드폰 좀 내려놓고 잠깐 나 봐봐."
      },
      {
        "cue": "제자리에 돌려놓다",
        "model": "put back [thing]",
        "tier": 1,
        "star": true,
        "example": "Put the milk back in the fridge when you're done.",
        "exampleKo": "다 쓰면 우유 냉장고에 다시 넣어놔."
      },
      {
        "cue": "치우다",
        "model": "put away [thing]",
        "tier": 1,
        "star": true,
        "example": "Kids, put away your toys before dinner.",
        "exampleKo": "얘들아, 저녁 먹기 전에 장난감 치워."
      },
      {
        "cue": "조립하다 / 준비하다",
        "model": "put together [thing]",
        "tier": 1,
        "star": true,
        "example": "It took me two hours to put together that IKEA desk.",
        "exampleKo": "그 이케아 책상 조립하는 데 두 시간 걸렸어."
      },
      {
        "cue": "~을 ~에 넣다",
        "model": "put [thing] into [place/system]",
        "tier": 1,
        "star": true,
        "example": "I already put the new client's info into Salesforce.",
        "exampleKo": "새 고객 정보는 이미 세일즈포스에 넣어놨어."
      },
      {
        "cue": "끄다 / 내놓다",
        "model": "put out [fire/message]",
        "tier": 2,
        "star": true,
        "easyEn": "stop a fire burning; or publicly release something",
        "example": "The team just put out a statement about the outage.",
        "exampleKo": "팀에서 방금 장애에 대한 성명을 냈어."
      },
      {
        "cue": "올리다 / 게시하다",
        "model": "put up [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "build, hang, or display something",
        "example": "We put up the new banner in the lobby this morning.",
        "exampleKo": "오늘 아침에 로비에 새 현수막 걸었어."
      },
      {
        "cue": "투입하다 / 제출하다",
        "model": "put in [effort/time/request]",
        "tier": 2,
        "star": true,
        "easyEn": "contribute time or effort; or submit a request",
        "example": "She really put in the hours to get this launch ready.",
        "exampleKo": "그녀는 이번 출시 준비하느라 정말 많은 시간을 쏟았어."
      },
      {
        "cue": "제안하다",
        "model": "put forward [idea/proposal]",
        "tier": 2,
        "star": true,
        "easyEn": "suggest an idea or plan for consideration",
        "example": "I'm gonna put forward a new pricing idea at standup.",
        "exampleKo": "스탠드업에서 새 가격 아이디어를 제안하려고."
      },
      {
        "cue": "제쳐두다 / 따로 빼두다",
        "model": "put aside [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "save it for later, or stop considering it",
        "example": "Let's put that debate aside and focus on shipping.",
        "exampleKo": "그 논쟁은 제쳐두고 출시에 집중하자."
      },
      {
        "cue": "~를 힘들게 하다",
        "model": "put [person] through [difficulty]",
        "tier": 2,
        "easyEn": "make someone experience something hard",
        "example": "Sorry to put you through all this paperwork.",
        "exampleKo": "이 서류 작업 다 시키게 해서 미안해."
      },
      {
        "cue": "전화 연결해주다",
        "model": "put [person] through to [person]",
        "tier": 2,
        "easyEn": "connect someone by phone to another person",
        "example": "Hold on, I'll put you through to billing.",
        "exampleKo": "잠시만요, 청구 부서로 연결해 드릴게요."
      },
      {
        "cue": "~을 뒤로하고 잊다",
        "model": "put behind [thing]",
        "tier": 2,
        "easyEn": "stop letting a bad past event affect you",
        "example": "That layoff was rough, but I've put it behind me.",
        "exampleKo": "그 정리해고는 힘들었지만, 이제 다 잊고 넘어갔어."
      },
      {
        "cue": "~을 보류하다",
        "model": "put [thing] on hold",
        "tier": 2,
        "easyEn": "pause or delay something for now",
        "example": "We had to put the redesign on hold until Q3.",
        "exampleKo": "3분기까지 리디자인을 보류해야 했어."
      },
      {
        "cue": "~을 마련하다 / 적용하다",
        "model": "put [thing] in place",
        "tier": 2,
        "easyEn": "create or arrange something so it is ready to use",
        "example": "Once we put the backup system in place, we're good.",
        "exampleKo": "백업 시스템만 마련해 놓으면 괜찮아."
      },
      {
        "cue": "~에 압박을 가하다",
        "model": "put pressure on [person/thing]",
        "tier": 2,
        "example": "The deadline is putting a lot of pressure on the team.",
        "exampleKo": "마감일이 팀에 큰 압박을 주고 있어."
      },
      {
        "cue": "~을 중단시키다 / 끝장내다",
        "model": "put a stop to [thing]",
        "tier": 2,
        "example": "The manager finally put a stop to the overtime.",
        "exampleKo": "매니저가 드디어 야근을 중단시켰어."
      },
      {
        "cue": "~을 균형 있게 / 제대로 보게 하다",
        "model": "put [thing] in perspective",
        "tier": 2,
        "easyEn": "see something's real importance by comparing it",
        "example": "Losing one deal hurts, but put it in perspective—we closed ten.",
        "exampleKo": "거래 하나 놓친 건 아프지만, 크게 보면 열 개는 성사시켰잖아."
      },
      {
        "cue": "다시 말하면 / 바꿔 말하면",
        "model": "put it another way",
        "tier": 2,
        "easyEn": "say the same thing in different words",
        "example": "Put it another way, we're basically out of budget.",
        "exampleKo": "바꿔 말하면, 우리 예산은 거의 바닥났다는 거야."
      },
      {
        "cue": "생각을 전달하다",
        "model": "put across [idea]",
        "tier": 3,
        "easyEn": "explain an idea so people understand it",
        "example": "He's smart, but he struggles to put his ideas across.",
        "exampleKo": "걔 똑똑한데, 자기 생각을 전달하는 걸 어려워해."
      },
      {
        "cue": "(휴가·승진 등을) 신청하다",
        "model": "put in for [thing]",
        "tier": 3,
        "easyEn": "formally apply or request something",
        "example": "I put in for two weeks off in August.",
        "exampleKo": "8월에 2주 휴가 신청했어."
      },
      {
        "cue": "~을 정확히 짚어내다",
        "model": "put one's finger on [thing]",
        "tier": 3,
        "easyEn": "identify exactly what is wrong or different",
        "example": "Something feels off about this build, but I can't put my finger on it.",
        "exampleKo": "이 빌드 뭔가 이상한데, 정확히 뭔지 못 짚겠어."
      }
    ]
  },
  {
    "id": "set",
    "verb": "SET",
    "gloss": "set은 설정하다, 준비하다, 시작시키다, 따로 두다.",
    "items": [
      {
        "cue": "설정하다 / 준비하다",
        "model": "set up [system/meeting/environment]",
        "tier": 1,
        "star": true,
        "example": "Can you set up the Zoom meeting for tomorrow's standup?",
        "exampleKo": "내일 스탠드업 줌 미팅 좀 잡아줄래요?"
      },
      {
        "cue": "제시하다 / 출발하다",
        "model": "set out [goal/plan]",
        "tier": 2,
        "star": true,
        "easyEn": "clearly describe or explain a plan or goal",
        "example": "The CEO set out our goals for the next quarter in the email.",
        "exampleKo": "대표가 이메일에서 다음 분기 목표를 제시했어요."
      },
      {
        "cue": "울리게 하다 / 촉발하다 / 출발하다",
        "model": "set off [alarm/event]",
        "tier": 2,
        "star": true,
        "easyEn": "cause something to start, like an alarm",
        "example": "My smoke alarm went off because I set it off burning toast again.",
        "exampleKo": "토스트를 또 태워서 화재경보기를 울리게 했어요."
      },
      {
        "cue": "따로 빼두다",
        "model": "set aside [time/money]",
        "tier": 2,
        "star": true,
        "easyEn": "save time or money for a purpose",
        "example": "I set aside twenty minutes every morning to clear my inbox.",
        "exampleKo": "매일 아침 이메일 정리하려고 20분을 따로 빼둬요."
      },
      {
        "cue": "지연시키다",
        "model": "set back [schedule/person]",
        "tier": 2,
        "star": true,
        "easyEn": "delay progress; or cost someone money",
        "example": "The server crash set us back two days on the launch.",
        "exampleKo": "서버 다운 때문에 출시가 이틀 지연됐어요."
      },
      {
        "cue": "값을 ~로 설정하다",
        "model": "set [value] to [number]",
        "tier": 2,
        "star": true,
        "example": "Just set the timeout to 30 and see if that fixes it.",
        "exampleKo": "타임아웃 값을 30으로 설정하고 고쳐지는지 봐요."
      },
      {
        "cue": "~에게 ~을 마련해주다 / 소개해주다",
        "model": "set [person] up with [thing/person]",
        "tier": 2,
        "star": true,
        "easyEn": "arrange for someone to meet or get something",
        "example": "My roommate set me up with her coworker last weekend.",
        "exampleKo": "룸메이트가 지난 주말에 자기 동료를 소개해줬어요."
      },
      {
        "cue": "~을 ~시각으로 잡다",
        "model": "set [thing] for [time/date]",
        "tier": 2,
        "example": "Let's set the demo for Thursday at 2.",
        "exampleKo": "데모를 목요일 2시로 잡죠."
      },
      {
        "cue": "~을 ~위에 놓다",
        "model": "set [thing] on [surface]",
        "tier": 2,
        "example": "Just set your coffee on the desk, I'll grab a coaster.",
        "exampleKo": "커피는 책상 위에 놔둬요, 컵받침 가져올게요."
      },
      {
        "cue": "풀어주다",
        "model": "set [person] free",
        "tier": 2,
        "example": "They finally set the dog free from the shelter and adopted him.",
        "exampleKo": "결국 그 개를 보호소에서 풀어주고 입양했어요."
      },
      {
        "cue": "~하려고 착수하다 / 작정하고 ~하다",
        "model": "set out to [verb]",
        "tier": 2,
        "easyEn": "begin with a clear goal to do something",
        "example": "We set out to build something simple and it kind of ballooned.",
        "exampleKo": "간단한 걸 만들려고 시작했는데 좀 커져버렸어요."
      },
      {
        "cue": "~가 성공/실패하도록 만들다",
        "model": "set [person] up for [success/failure]",
        "tier": 2,
        "easyEn": "put someone in a position likely to succeed or fail",
        "example": "Throwing him into that project with no training set him up for failure.",
        "exampleKo": "교육도 없이 그 프로젝트에 넣은 건 그를 실패하게 만든 거예요."
      },
      {
        "cue": "기대치를 설정하다 / 미리 합의하다",
        "model": "set expectations",
        "tier": 2,
        "example": "Let's set expectations early so nobody's surprised at the deadline.",
        "exampleKo": "마감 때 놀라지 않게 미리 기대치를 맞춰두죠."
      },
      {
        "cue": "~을 진행시키다 / 가동하다",
        "model": "set [thing] in motion",
        "tier": 2,
        "easyEn": "start a process or chain of events",
        "example": "Once you approve it, I'll set the whole rollout in motion.",
        "exampleKo": "승인만 해주면 전체 배포를 진행시킬게요."
      },
      {
        "cue": "~을 위한 발판을 마련하다",
        "model": "set the stage for [thing]",
        "tier": 2,
        "easyEn": "create the right conditions for something to happen",
        "example": "This deal really sets the stage for us to expand into Asia.",
        "exampleKo": "이번 계약이 아시아 진출의 발판을 마련해줘요."
      },
      {
        "cue": "선례를 남기다",
        "model": "set a precedent",
        "tier": 2,
        "easyEn": "do something that becomes an example for the future",
        "example": "If we refund him, we set a precedent for everyone else.",
        "exampleKo": "그에게 환불해주면 다른 모두에게 선례를 남기는 거예요."
      },
      {
        "cue": "내려놓다 / 적다",
        "model": "set down [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "put something down on a surface",
        "example": "Set the box down over there, it's heavy.",
        "exampleKo": "그 상자 저기 내려놔요, 무거워요."
      },
      {
        "cue": "~하기 시작하다",
        "model": "set about [-ing]",
        "tier": 3,
        "star": true,
        "easyEn": "start doing a task",
        "example": "She set about fixing the bug the second she saw the report.",
        "exampleKo": "그녀는 리포트를 보자마자 버그를 고치기 시작했어요."
      },
      {
        "cue": "시작되다",
        "model": "set in",
        "tier": 3,
        "easyEn": "begin and likely continue, often something bad",
        "example": "Panic set in when I realized I'd deleted the wrong branch.",
        "exampleKo": "엉뚱한 브랜치를 지운 걸 깨닫자 공황이 시작됐어요."
      },
      {
        "cue": "구별되게 만들다",
        "model": "set apart [thing]",
        "tier": 3,
        "easyEn": "make someone or something clearly different",
        "example": "Our fast support is what sets us apart from the competition.",
        "exampleKo": "빠른 고객지원이 우리를 경쟁사와 구별되게 해줘요."
      },
      {
        "cue": "~와 ~를 대립시키다",
        "model": "set [person] against [person]",
        "tier": 3,
        "easyEn": "make two people oppose each other",
        "example": "That decision set the whole team against the manager.",
        "exampleKo": "그 결정이 팀 전체를 매니저와 대립시켰어요."
      }
    ]
  },
  {
    "id": "keep",
    "verb": "KEEP",
    "gloss": "keep은 유지하다, 계속하다, 막다, 기록하다.",
    "items": [
      {
        "cue": "유지하다 / 따라가다",
        "model": "keep up",
        "tier": 1,
        "star": true,
        "easyEn": "continue at the same pace or level",
        "example": "You're walking too fast, I can't keep up.",
        "exampleKo": "너 너무 빨리 걸어서 못 따라가겠어."
      },
      {
        "cue": "~을 따라가다",
        "model": "keep up with [person/work]",
        "tier": 1,
        "star": true,
        "easyEn": "stay at the same level or pace as something",
        "example": "There are so many new AI tools coming out, it's hard to keep up with all of them.",
        "exampleKo": "새로운 AI 도구가 너무 많이 나와서 다 따라가기 힘들어."
      },
      {
        "cue": "~을 추적하다 / 기록하다",
        "model": "keep track of [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "stay aware of or record something over time",
        "example": "I use a spreadsheet to keep track of all my expenses.",
        "exampleKo": "나는 지출을 다 기록하려고 스프레드시트를 써."
      },
      {
        "cue": "~을 명심하다",
        "model": "keep in mind [thing]",
        "tier": 1,
        "star": true,
        "example": "Keep in mind that the office closes early on Fridays.",
        "exampleKo": "금요일엔 사무실이 일찍 닫는다는 거 명심해."
      },
      {
        "cue": "~을 지켜보다",
        "model": "keep an eye on [thing/person]",
        "tier": 1,
        "star": true,
        "easyEn": "watch something carefully over time",
        "example": "Can you keep an eye on my laptop while I grab a coffee?",
        "exampleKo": "나 커피 가져오는 동안 내 노트북 좀 봐줄래?"
      },
      {
        "cue": "계속하다",
        "model": "keep going",
        "tier": 1,
        "star": true,
        "example": "I know it's late, but let's keep going and finish this section.",
        "exampleKo": "늦은 거 아는데, 계속해서 이 부분 끝내자."
      },
      {
        "cue": "계속 ~하다",
        "model": "keep on [-ing]",
        "tier": 2,
        "star": true,
        "example": "He just kept on talking even after everyone left.",
        "exampleKo": "다들 떠난 뒤에도 걔는 계속 말하더라."
      },
      {
        "cue": "들어오지 못하게 하다",
        "model": "keep out [person/thing]",
        "tier": 2,
        "star": true,
        "example": "We put up a fence to keep the deer out of the garden.",
        "exampleKo": "사슴이 정원에 못 들어오게 울타리를 쳤어."
      },
      {
        "cue": "~을 피하다",
        "model": "keep away from [thing/person]",
        "tier": 2,
        "star": true,
        "example": "Keep away from that guy, he's nothing but trouble.",
        "exampleKo": "저 사람은 피해, 골칫거리밖에 안 돼."
      },
      {
        "cue": "숨기다 / 막다",
        "model": "keep back [information/person]",
        "tier": 2,
        "star": true,
        "easyEn": "hold something back, or hide information",
        "example": "Don't keep anything back, just tell me what really happened.",
        "exampleKo": "아무것도 숨기지 말고 진짜 무슨 일이 있었는지 말해."
      },
      {
        "cue": "낮게 유지하다",
        "model": "keep down [cost/noise]",
        "tier": 2,
        "star": true,
        "example": "We're trying to keep costs down this quarter.",
        "exampleKo": "이번 분기엔 비용을 낮게 유지하려고 하고 있어."
      },
      {
        "cue": "~에 접근하지 않다 / 피하다",
        "model": "keep off [grass/topic]",
        "tier": 2,
        "star": true,
        "example": "Let's keep off politics at dinner tonight.",
        "exampleKo": "오늘 저녁 식사 때는 정치 얘기는 피하자."
      },
      {
        "cue": "~가 ~하지 못하게 막다",
        "model": "keep [person] from [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "stop someone or something from doing something",
        "example": "The rain kept us from going to the beach.",
        "exampleKo": "비 때문에 해변에 못 갔어."
      },
      {
        "cue": "~을 지키다",
        "model": "keep to [schedule/plan]",
        "tier": 2,
        "star": true,
        "easyEn": "follow a plan or schedule without changing",
        "example": "If we keep to the schedule, we'll ship by Friday.",
        "exampleKo": "일정만 지키면 금요일까지 출시할 수 있어."
      },
      {
        "cue": "~을 통제하다",
        "model": "keep [thing] under control",
        "tier": 2,
        "example": "Don't worry, we've got the situation under control.",
        "exampleKo": "걱정 마, 상황은 우리가 통제하고 있어."
      },
      {
        "cue": "계속 알려주다",
        "model": "keep [person] posted",
        "tier": 2,
        "easyEn": "regularly tell someone about new developments",
        "example": "I'll keep you posted as soon as I hear back from them.",
        "exampleKo": "그쪽에서 답 오는 대로 바로 알려줄게."
      },
      {
        "cue": "~을 동기화 상태로 유지하다",
        "model": "keep [thing] in sync",
        "tier": 2,
        "easyEn": "keep two things matching and updated together",
        "example": "I need to keep my phone and laptop calendars in sync.",
        "exampleKo": "폰이랑 노트북 캘린더를 동기화 상태로 유지해야 해."
      },
      {
        "cue": "~에게 계속 정보를 공유하다 / 상황을 알려주다",
        "model": "keep [person] in the loop",
        "tier": 2,
        "star": true,
        "easyEn": "keep someone informed and included in updates",
        "example": "Make sure to keep Sarah in the loop on this project.",
        "exampleKo": "이 프로젝트는 Sarah한테도 계속 상황 공유해 줘."
      },
      {
        "cue": "~을 빈틈없이 챙기다 / 뒤처지지 않게 관리하다",
        "model": "keep on top of [thing]",
        "tier": 2,
        "easyEn": "manage something well so nothing is missed or late",
        "example": "With three deadlines this week, I'm struggling to keep on top of everything.",
        "exampleKo": "이번 주에 마감이 셋이라 모든 걸 빈틈없이 챙기기가 벅차."
      },
      {
        "cue": "~을 꾸준히 계속하다 / 매달리다",
        "model": "keep at [it/thing]",
        "tier": 2,
        "easyEn": "continue working hard at something without stopping",
        "example": "Learning guitar is hard, but if you keep at it you'll get there.",
        "exampleKo": "기타 배우는 거 어렵지만, 꾸준히 하면 될 거야."
      },
      {
        "cue": "~을 혼자만 알다 / 비밀로 하다",
        "model": "keep [thing] to oneself",
        "tier": 2,
        "easyEn": "keep something private and not tell others",
        "example": "I'd keep that to yourself until the deal is official.",
        "exampleKo": "거래가 확정될 때까지는 그거 혼자만 알고 있어."
      },
      {
        "cue": "~을 최신 상태로 유지하다",
        "model": "keep [thing] up to date",
        "tier": 2,
        "easyEn": "keep something current with the newest information",
        "example": "We need to keep the docs up to date after every release.",
        "exampleKo": "릴리스할 때마다 문서를 최신 상태로 유지해야 해."
      },
      {
        "cue": "~을 계속 주시하다 / 파악하다",
        "model": "keep tabs on [thing/person]",
        "tier": 2,
        "easyEn": "watch or check on something regularly",
        "example": "My manager likes to keep tabs on how the project is going.",
        "exampleKo": "우리 매니저는 프로젝트가 어떻게 돌아가는지 계속 주시하는 걸 좋아해."
      }
    ]
  },
  {
    "id": "let",
    "verb": "LET",
    "gloss": "let은 허락하다, 내버려두다, 놓아주다.",
    "items": [
      {
        "cue": "들여보내다",
        "model": "let [person] in",
        "tier": 1,
        "star": true,
        "example": "Can you let the plumber in? He's at the front door.",
        "exampleKo": "배관공 좀 들여보내 줄래? 현관에 와 있어."
      },
      {
        "cue": "내보내다",
        "model": "let [person] out",
        "tier": 1,
        "star": true,
        "example": "Let the dog out before we leave, okay?",
        "exampleKo": "나가기 전에 강아지 좀 내보내 줘, 알겠지?"
      },
      {
        "cue": "실망시키다",
        "model": "let [person] down",
        "tier": 1,
        "star": true,
        "easyEn": "fail someone who was depending on you",
        "example": "I'll get the slides done tonight — I won't let you down.",
        "exampleKo": "오늘 밤에 슬라이드 끝낼게 — 실망시키지 않을게."
      },
      {
        "cue": "놓아주다",
        "model": "let go of [thing/person]",
        "tier": 1,
        "star": true,
        "example": "You've gotta let go of that grudge, it's not worth it.",
        "exampleKo": "그 원한은 이제 놓아줘, 그럴 가치 없어."
      },
      {
        "cue": "알려주다",
        "model": "let [person] know",
        "tier": 1,
        "star": true,
        "example": "Let me know when the build finishes.",
        "exampleKo": "빌드 끝나면 알려줘."
      },
      {
        "cue": "약해지다",
        "model": "let up",
        "tier": 2,
        "star": true,
        "easyEn": "become weaker or less intense",
        "example": "Let's wait five minutes — the rain should let up soon.",
        "exampleKo": "5분만 기다리자 — 비가 곧 약해질 거야."
      },
      {
        "cue": "봐주다 / 처벌하지 않다",
        "model": "let [person] off",
        "tier": 2,
        "star": true,
        "easyEn": "decide not to punish someone",
        "example": "The cop let me off with just a warning.",
        "exampleKo": "경찰이 경고만 하고 봐줬어."
      },
      {
        "cue": "들여보내다 / 비밀을 알려주다",
        "model": "let [person] into [place/secret]",
        "tier": 2,
        "star": true,
        "example": "Security wouldn't let us into the server room without a badge.",
        "exampleKo": "보안팀이 출입증 없이는 서버실에 들여보내 주질 않았어."
      },
      {
        "cue": "지나가게 해주다",
        "model": "let [person] through",
        "tier": 2,
        "example": "Let the ambulance through, everybody move over!",
        "exampleKo": "구급차 지나가게 해, 다들 비켜!"
      },
      {
        "cue": "~에게 비밀을 알려주다",
        "model": "let [person] in on [secret]",
        "tier": 2,
        "easyEn": "tell someone a secret or private information",
        "example": "Okay, I'll let you in on a secret — we're launching Friday.",
        "exampleKo": "좋아, 비밀 하나 알려줄게 — 우리 금요일에 출시해."
      },
      {
        "cue": "포기하다 / 놓아주다",
        "model": "let [thing] go",
        "tier": 2,
        "easyEn": "stop trying to keep or control something",
        "example": "That project's dead. Just let it go and move on.",
        "exampleKo": "그 프로젝트는 끝났어. 그냥 포기하고 넘어가."
      },
      {
        "cue": "~가 처리하게 두다",
        "model": "let [person] handle [thing]",
        "tier": 2,
        "example": "Let Sarah handle the client call, she knows them best.",
        "exampleKo": "고객 통화는 사라가 처리하게 둬, 걔가 그 사람들 제일 잘 알아."
      },
      {
        "cue": "내색하다 / (비밀·아는 것을) 흘리다",
        "model": "let on (that [clause])",
        "tier": 3,
        "easyEn": "show that you know a secret",
        "example": "Don't let on that we already know about the surprise party.",
        "exampleKo": "우리가 깜짝 파티 이미 아는 거 티내지 마."
      },
      {
        "cue": "~를 봐주다 / 책임을 면하게 해주다",
        "model": "let [person] off the hook",
        "tier": 3,
        "easyEn": "free someone from blame or responsibility",
        "example": "He missed the deadline, but the boss let him off the hook.",
        "exampleKo": "걔가 마감을 놓쳤는데 상사가 봐줬어."
      }
    ]
  },
  {
    "id": "leave",
    "verb": "LEAVE",
    "gloss": "leave는 떠나다, 남기다, 빼다, 맡기다.",
    "items": [
      {
        "cue": "빼다 / 누락하다",
        "model": "leave out [thing]",
        "tier": 1,
        "star": true,
        "example": "You left out the part where you crashed the car.",
        "exampleKo": "너 차 박살 낸 부분은 빼먹었잖아."
      },
      {
        "cue": "남겨두다",
        "model": "leave behind [thing/person]",
        "tier": 1,
        "star": true,
        "example": "Don't leave your laptop behind on the train again.",
        "exampleKo": "기차에 노트북 또 놓고 내리지 마."
      },
      {
        "cue": "~로 떠나다",
        "model": "leave for [place]",
        "tier": 1,
        "star": true,
        "example": "We're leaving for Chicago first thing tomorrow.",
        "exampleKo": "우리 내일 아침 일찍 시카고로 떠나."
      },
      {
        "cue": "~을 빼놓다",
        "model": "leave [thing] out",
        "tier": 1,
        "star": true,
        "example": "Leave the onions out, I'm allergic.",
        "exampleKo": "양파는 빼주세요, 저 알레르기 있어요."
      },
      {
        "cue": "~을 혼자 두다",
        "model": "leave [person] alone",
        "tier": 1,
        "example": "Just leave him alone, he's having a rough day.",
        "exampleKo": "그냥 좀 놔둬, 걔 오늘 힘든 날이야."
      },
      {
        "cue": "중단하다",
        "model": "leave off [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "stop at a certain point",
        "example": "Where did we leave off last time?",
        "exampleKo": "우리 지난번에 어디까지 했더라?"
      },
      {
        "cue": "~에서 출발하다",
        "model": "leave from [place]",
        "tier": 2,
        "star": true,
        "example": "The bus leaves from gate 4, not gate 2.",
        "exampleKo": "버스는 2번이 아니라 4번 게이트에서 출발해."
      },
      {
        "cue": "~을 ~에 두고 가다",
        "model": "leave [thing] in [place]",
        "tier": 2,
        "star": true,
        "example": "I think I left my phone in the car.",
        "exampleKo": "나 폰 차에 두고 온 것 같아."
      },
      {
        "cue": "~을 ~에게 맡기다",
        "model": "leave [thing] with [person]",
        "tier": 2,
        "star": true,
        "example": "Can you leave the keys with the front desk?",
        "exampleKo": "열쇠 프런트에 맡겨줄 수 있어?"
      },
      {
        "cue": "~을 ~에게 맡기다",
        "model": "leave [thing] to [person]",
        "tier": 2,
        "star": true,
        "example": "Leave the slides to me, I'll finish them tonight.",
        "exampleKo": "슬라이드는 나한테 맡겨, 오늘 밤에 끝낼게."
      },
      {
        "cue": "~에게 맡기다",
        "model": "leave it up to [person]",
        "tier": 2,
        "star": true,
        "example": "Honestly, I'll leave it up to you.",
        "exampleKo": "솔직히 그건 너한테 맡길게."
      },
      {
        "cue": "~을 일단 제쳐두다",
        "model": "leave aside [issue]",
        "tier": 2,
        "example": "Let's leave the budget aside for now and talk timeline.",
        "exampleKo": "예산 문제는 일단 제쳐두고 일정부터 얘기하자."
      },
      {
        "cue": "~을 열어두다 / 미결로 두다",
        "model": "leave [thing] open",
        "tier": 2,
        "example": "Let's leave that ticket open until QA signs off.",
        "exampleKo": "그 티켓은 QA 승인 날 때까지 열어두자."
      },
      {
        "cue": "~에게 인상을 남기다",
        "model": "leave [person] with [impression]",
        "tier": 2,
        "example": "She left me with the impression that she's not staying long.",
        "exampleKo": "그 사람은 오래 안 있을 것 같은 인상을 남겼어."
      },
      {
        "cue": "~을 ~에서 빼다 / 제외하다 (\"leave me out of this\")",
        "model": "leave [person/thing] out of [thing]",
        "tier": 2,
        "example": "Leave me out of this, it's between you two.",
        "exampleKo": "난 이 일에서 빼줘, 그건 너희 둘 사이 일이야."
      }
    ]
  },
  {
    "id": "bring",
    "verb": "BRING",
    "gloss": "bring은 가져오다, 꺼내다, 유발하다.",
    "items": [
      {
        "cue": "언급하다 / 제기하다",
        "model": "bring up [topic/issue]",
        "tier": 1,
        "star": true,
        "easyEn": "start talking about a subject",
        "example": "Can we bring up the budget issue at tomorrow's standup?",
        "exampleKo": "내일 스탠드업에서 예산 문제 좀 꺼내도 될까요?"
      },
      {
        "cue": "데려오다 / 도입하다",
        "model": "bring in [person/tool/idea]",
        "tier": 1,
        "star": true,
        "example": "We should bring in a designer before we ship this.",
        "exampleKo": "출시하기 전에 디자이너 한 명 데려와야 해요."
      },
      {
        "cue": "되돌리다 / 다시 가져오다",
        "model": "bring back [thing]",
        "tier": 1,
        "star": true,
        "example": "Please bring back the dark mode toggle, everyone misses it.",
        "exampleKo": "다크 모드 토글 좀 되살려 주세요, 다들 그리워해요."
      },
      {
        "cue": "~을 ~에게 가져오다",
        "model": "bring [thing] to [place/person]",
        "tier": 1,
        "star": true,
        "example": "Can you bring the charger to me? I left it on your desk.",
        "exampleKo": "충전기 좀 나한테 갖다줄래? 네 책상에 두고 왔어."
      },
      {
        "cue": "드러내다",
        "model": "bring out [quality/result]",
        "tier": 2,
        "star": true,
        "easyEn": "make a quality become easy to notice",
        "example": "Good lighting really brings out the color in these photos.",
        "exampleKo": "조명이 좋으니까 이 사진들 색감이 확 살아나네요."
      },
      {
        "cue": "가져오다 / 데려오다",
        "model": "bring over [thing/person]",
        "tier": 2,
        "star": true,
        "example": "I'll bring over some pizza after work.",
        "exampleKo": "퇴근하고 피자 좀 사 갈게."
      },
      {
        "cue": "데리고 오다 / 가져오다",
        "model": "bring along [thing/person]",
        "tier": 2,
        "star": true,
        "example": "Feel free to bring along a friend to the meetup.",
        "exampleKo": "모임에 친구 데려와도 돼요."
      },
      {
        "cue": "낮추다 / 무너뜨리다",
        "model": "bring down [cost/system]",
        "tier": 2,
        "star": true,
        "example": "We need to bring down our AWS costs this quarter.",
        "exampleKo": "이번 분기에 AWS 비용을 좀 줄여야 해요."
      },
      {
        "cue": "모으다",
        "model": "bring together [people/things]",
        "tier": 2,
        "star": true,
        "example": "This app brings together all your notes in one place.",
        "exampleKo": "이 앱은 네 모든 메모를 한곳에 모아줘요."
      },
      {
        "cue": "초래하다",
        "model": "bring about [change/result]",
        "tier": 2,
        "star": true,
        "easyEn": "cause something to happen",
        "example": "The new manager brought about a lot of changes fast.",
        "exampleKo": "새 매니저가 많은 변화를 빠르게 가져왔어요."
      },
      {
        "cue": "~를 논의/프로젝트에 참여시키다",
        "model": "bring [person] into [discussion/project]",
        "tier": 2,
        "star": true,
        "example": "Let's bring Sarah into this project, she knows the API.",
        "exampleKo": "세라를 이 프로젝트에 참여시키자, API를 잘 아니까."
      },
      {
        "cue": "~을 가지고 오다",
        "model": "bring [thing] with [person]",
        "tier": 2,
        "example": "Don't forget to bring your laptop with you tomorrow.",
        "exampleKo": "내일 노트북 꼭 챙겨 와."
      },
      {
        "cue": "제안하다 / 날짜를 앞당기다",
        "model": "bring forward [idea/date]",
        "tier": 2,
        "easyEn": "move an event to an earlier time",
        "example": "Can we bring the launch forward to Friday?",
        "exampleKo": "출시를 금요일로 앞당길 수 있을까요?"
      },
      {
        "cue": "~을 ~에게 (의제로) 꺼내다 / 이야기를 꺼내다",
        "model": "bring [thing] up with [person]",
        "tier": 2,
        "easyEn": "start discussing a subject with someone",
        "example": "I'll bring it up with my boss on Monday.",
        "exampleKo": "월요일에 상사한테 그 얘기 꺼내볼게요."
      },
      {
        "cue": "~에게 상황을 파악시키다 / 최신 정보를 공유하다",
        "model": "bring [person] up to speed (on [thing])",
        "tier": 2,
        "easyEn": "give someone the latest information they need",
        "example": "Let me bring you up to speed on the deploy real quick.",
        "exampleKo": "배포 상황 빠르게 공유해 줄게요."
      },
      {
        "cue": "설득해서 마음을 바꾸게 하다",
        "model": "bring [person] around",
        "tier": 3,
        "easyEn": "persuade someone to change their opinion",
        "example": "He was against it at first, but we brought him around.",
        "exampleKo": "처음엔 반대했는데 결국 설득해서 마음 바꿨어요."
      }
    ]
  },
  {
    "id": "turn",
    "verb": "TURN",
    "gloss": "turn은 방향, 변화, 작동, 결과를 만든다.",
    "items": [
      {
        "cue": "켜다",
        "model": "turn on [device]",
        "tier": 1,
        "star": true,
        "example": "Can you turn on the AC? It's roasting in here.",
        "exampleKo": "에어컨 좀 켜줄래? 여기 너무 덥다."
      },
      {
        "cue": "끄다",
        "model": "turn off [device]",
        "tier": 1,
        "star": true,
        "example": "Don't forget to turn off the oven when you're done.",
        "exampleKo": "다 하면 오븐 끄는 거 잊지 마."
      },
      {
        "cue": "키우다 / 나타나다",
        "model": "turn up [volume/person]",
        "tier": 1,
        "star": true,
        "easyEn": "raise the volume; or arrive or appear unexpectedly",
        "example": "Turn up the volume, I love this song.",
        "exampleKo": "볼륨 좀 키워, 나 이 노래 완전 좋아해."
      },
      {
        "cue": "낮추다 / 거절하다",
        "model": "turn down [volume/offer]",
        "tier": 1,
        "star": true,
        "easyEn": "lower the volume; or reject an offer or request",
        "example": "Turn it down a bit, the neighbors are gonna complain.",
        "exampleKo": "소리 좀 줄여, 옆집에서 항의하겠다."
      },
      {
        "cue": "결과가 ~로 드러나다",
        "model": "turn out",
        "tier": 1,
        "star": true,
        "easyEn": "end up happening in a certain way",
        "example": "The demo turned out way better than we expected.",
        "exampleKo": "데모가 예상보다 훨씬 잘 나왔어."
      },
      {
        "cue": "알고 보니 ~이다",
        "model": "turn out to be [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "be found to actually be something",
        "example": "The bug turned out to be a typo in the config file.",
        "exampleKo": "그 버그가 알고 보니 설정 파일 오타였어."
      },
      {
        "cue": "~로 변하다",
        "model": "turn into [thing]",
        "tier": 1,
        "star": true,
        "example": "That quick fix turned into a three-day rewrite.",
        "exampleKo": "그 간단한 수정이 3일짜리 재작성으로 변했어."
      },
      {
        "cue": "~에 의지하다",
        "model": "turn to [person/tool]",
        "tier": 1,
        "star": true,
        "easyEn": "go to someone or something for help",
        "example": "When I get stuck, I usually turn to Stack Overflow first.",
        "exampleKo": "막히면 나는 보통 스택오버플로우부터 찾아봐."
      },
      {
        "cue": "제출하다",
        "model": "turn in [assignment]",
        "tier": 2,
        "star": true,
        "easyEn": "submit or deliver completed work",
        "example": "I need to turn in the report by 5 today.",
        "exampleKo": "오늘 5시까지 보고서 제출해야 해."
      },
      {
        "cue": "상황을 개선하다 / 방향을 돌리다",
        "model": "turn around [situation]",
        "tier": 2,
        "star": true,
        "easyEn": "change a bad situation into a good one",
        "example": "The new manager really turned the team around.",
        "exampleKo": "새 매니저가 팀 분위기를 확 바꿔놨어."
      },
      {
        "cue": "뒤집다 / 넘기다",
        "model": "turn over [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "flip it; or hand it to someone",
        "example": "Turn the pancake over before it burns.",
        "exampleKo": "타기 전에 팬케이크 뒤집어."
      },
      {
        "cue": "~에 등을 돌리다",
        "model": "turn against [person/idea]",
        "tier": 2,
        "star": true,
        "easyEn": "stop supporting and start opposing someone",
        "example": "Half the fans turned against him after that trade.",
        "exampleKo": "그 트레이드 이후로 팬 절반이 그에게 등을 돌렸어."
      },
      {
        "cue": "돌려보내다",
        "model": "turn away [person]",
        "tier": 2,
        "easyEn": "refuse to let someone enter or stay",
        "example": "They turned us away because the place was fully booked.",
        "exampleKo": "예약이 꽉 차서 우리를 돌려보냈어."
      },
      {
        "cue": "되돌아가다",
        "model": "turn back",
        "tier": 2,
        "example": "We were almost there, but the storm made us turn back.",
        "exampleKo": "거의 다 왔는데 폭풍 때문에 되돌아가야 했어."
      },
      {
        "cue": "A에서 B로 바뀌다",
        "model": "turn from A to B",
        "tier": 2,
        "example": "Her mood turned from excited to annoyed in seconds.",
        "exampleKo": "그녀 기분이 순식간에 신남에서 짜증으로 바뀌었어."
      },
      {
        "cue": "~쪽으로 향하다",
        "model": "turn toward [thing]",
        "tier": 2,
        "example": "Everyone turned toward the door when he walked in.",
        "exampleKo": "그가 들어오자 모두 문 쪽으로 고개를 돌렸어."
      },
      {
        "cue": "~을 ~에게 넘기다",
        "model": "turn [thing] over to [person]",
        "tier": 2,
        "easyEn": "hand control or responsibility to someone",
        "example": "I'm turning the project over to Sarah next week.",
        "exampleKo": "다음 주에 이 프로젝트를 사라에게 넘길 거야."
      },
      {
        "cue": "(작업·요청을) 빨리 처리해서 넘기다 / 완료해 돌려주다",
        "model": "turn [thing] around",
        "tier": 2,
        "easyEn": "finish and return work quickly",
        "example": "Can you turn this around by tomorrow morning?",
        "exampleKo": "이거 내일 아침까지 처리해서 넘겨줄 수 있어?"
      }
    ]
  },
  {
    "id": "run",
    "verb": "RUN",
    "gloss": "run은 달리다, 실행하다, 운영하다, 문제를 만나다.",
    "items": [
      {
        "cue": "문제를 만나다 / 우연히 마주치다",
        "model": "run into [problem/person]",
        "tier": 1,
        "star": true,
        "easyEn": "meet by chance; or hit a problem",
        "example": "I ran into Jake at Trader Joe's this morning.",
        "exampleKo": "오늘 아침에 트레이더 조에서 우연히 제이크를 만났어."
      },
      {
        "cue": "~이 다 떨어지다",
        "model": "run out of [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "use all of something until none remains",
        "example": "We ran out of coffee, so I'm running to the store.",
        "exampleKo": "커피가 다 떨어져서 지금 가게에 가는 길이야."
      },
      {
        "cue": "빠르게 검토하다 / 설명하다",
        "model": "run through [plan/process]",
        "tier": 1,
        "star": true,
        "easyEn": "quickly review or go over something",
        "example": "Let me run through the agenda real quick before we start.",
        "exampleKo": "시작하기 전에 안건을 빠르게 한번 훑어볼게요."
      },
      {
        "cue": "~에게 의견을 물어보다",
        "model": "run by [person]",
        "tier": 1,
        "star": true,
        "easyEn": "tell someone to get their opinion or approval",
        "example": "Can I run something by you after standup?",
        "exampleKo": "스탠드업 끝나고 뭐 하나 의견 좀 물어봐도 돼?"
      },
      {
        "cue": "도망가다",
        "model": "run away",
        "tier": 1,
        "star": true,
        "example": "The dog got scared by the fireworks and ran away.",
        "exampleKo": "강아지가 불꽃놀이에 놀라서 도망갔어."
      },
      {
        "cue": "쿼리/테스트/스크립트를 실행하다",
        "model": "run [query/test/script]",
        "tier": 1,
        "example": "I ran the tests and everything passed.",
        "exampleKo": "테스트 돌렸는데 다 통과했어."
      },
      {
        "cue": "시간을 초과하다 / 차로 치다",
        "model": "run over [time/person]",
        "tier": 2,
        "star": true,
        "easyEn": "go past a time limit; or hit with a vehicle",
        "example": "Sorry, the last meeting ran over by ten minutes.",
        "exampleKo": "미안, 앞 회의가 10분 넘어갔어."
      },
      {
        "cue": "~로 작동하다",
        "model": "run on [system/fuel]",
        "tier": 2,
        "star": true,
        "easyEn": "work using a particular power source or fuel",
        "example": "The whole backend runs on AWS now.",
        "exampleKo": "백엔드 전체가 이제 AWS에서 돌아가."
      },
      {
        "cue": "~에서 도망치다 / ~에서 실행되다",
        "model": "run from [thing/place]",
        "tier": 2,
        "star": true,
        "easyEn": "escape from; or operate from a place",
        "example": "You can't run from your problems forever.",
        "exampleKo": "문제를 영원히 피할 수는 없어."
      },
      {
        "cue": "돌아다니다",
        "model": "run around [place]",
        "tier": 2,
        "star": true,
        "easyEn": "move about busily doing many things",
        "example": "I was running around all day trying to get everything ready.",
        "exampleKo": "하루 종일 이것저것 준비하느라 정신없이 돌아다녔어."
      },
      {
        "cue": "우연히 발견하다",
        "model": "run across [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "find something by chance",
        "example": "I ran across an old photo of us while cleaning my desk.",
        "exampleKo": "책상 정리하다가 우리 옛날 사진을 우연히 발견했어."
      },
      {
        "cue": "닳다 / 약해지다",
        "model": "run down [battery/system]",
        "tier": 2,
        "star": true,
        "easyEn": "lose power or become weak",
        "example": "My phone battery runs down so fast lately.",
        "exampleKo": "요즘 폰 배터리가 너무 빨리 닳아."
      },
      {
        "cue": "문제에 부딪히다",
        "model": "run up against [problem]",
        "tier": 2,
        "star": true,
        "easyEn": "meet a difficulty or obstacle",
        "example": "We ran up against a rate limit on the API.",
        "exampleKo": "API 요청 한도 문제에 부딪혔어."
      },
      {
        "cue": "뒤쫓다",
        "model": "run after [person]",
        "tier": 2,
        "example": "She ran after the bus but it pulled away.",
        "exampleKo": "그녀가 버스를 뒤쫓아 뛰었는데 그냥 떠나버렸어."
      },
      {
        "cue": "선거에 출마하다",
        "model": "run for [position]",
        "tier": 2,
        "easyEn": "compete to be elected to a position",
        "example": "He's running for city council this year.",
        "exampleKo": "그 사람 올해 시의원 선거에 출마해."
      },
      {
        "cue": "~에게 도움을 청하러 가다",
        "model": "run to [person]",
        "tier": 2,
        "easyEn": "go to someone for help or support",
        "example": "Whenever I'm stuck, I just run to my mom.",
        "exampleKo": "막힐 때마다 나는 그냥 엄마한테 도움을 청하러 가."
      },
      {
        "cue": "(아이디어를) 그대로 밀고 나가다 / 추진하다",
        "model": "run with [idea/plan]",
        "tier": 2,
        "easyEn": "accept an idea and develop it further",
        "example": "I like where this is going—let's run with it.",
        "exampleKo": "방향 마음에 들어, 이대로 밀고 나가자."
      },
      {
        "cue": "~에게 (확인차) 보여주고 의견을 묻다",
        "model": "run [thing] past [person]",
        "tier": 2,
        "easyEn": "show someone to get their opinion or approval",
        "example": "Let me run the final draft past my manager before we send it.",
        "exampleKo": "보내기 전에 최종본을 매니저한테 확인받아 볼게."
      },
      {
        "cue": "(시스템을) 가동시키다 / 정상 작동하게 하다",
        "model": "get [system] up and running",
        "tier": 2,
        "easyEn": "make something working and fully operational",
        "example": "It took a while, but I got the dev server up and running.",
        "exampleKo": "좀 걸리긴 했는데 개발 서버 정상 가동시켰어."
      },
      {
        "cue": "집안 내력이다",
        "model": "run in [family]",
        "tier": 3,
        "easyEn": "be common in a family and passed from parents to children",
        "example": "Diabetes runs in my family, so I get checked every year.",
        "exampleKo": "당뇨가 우리 집안 내력이라서 매년 검진받아."
      }
    ]
  },
  {
    "id": "work",
    "verb": "WORK",
    "gloss": "work는 일하다, 작동하다, 해결하다, 협업하다.",
    "items": [
      {
        "cue": "~작업을 하다",
        "model": "work on [task/project]",
        "tier": 1,
        "star": true,
        "example": "I'm working on the checkout redesign this sprint.",
        "exampleKo": "이번 스프린트엔 결제 화면 리디자인 작업을 하고 있어."
      },
      {
        "cue": "~와 일하다 / ~을 다루다",
        "model": "work with [person/tool]",
        "tier": 1,
        "star": true,
        "example": "I work with Sarah on the backend team.",
        "exampleKo": "난 백엔드 팀에서 사라랑 같이 일해."
      },
      {
        "cue": "~에서 일하다 / ~에게 효과가 있다",
        "model": "work for [company/person]",
        "tier": 1,
        "star": true,
        "easyEn": "be employed by; or be acceptable to someone",
        "example": "She works for Google now.",
        "exampleKo": "걔 지금 구글에서 일해."
      },
      {
        "cue": "~분야/장소에서 일하다",
        "model": "work in [field/place]",
        "tier": 1,
        "star": true,
        "example": "I work in marketing at a startup downtown.",
        "exampleKo": "난 시내 스타트업에서 마케팅 분야에 일해."
      },
      {
        "cue": "해결되다 / 운동하다",
        "model": "work out",
        "tier": 1,
        "star": true,
        "easyEn": "exercise; or end up resolved successfully",
        "example": "Don't worry, it'll all work out.",
        "exampleKo": "걱정 마, 다 잘 풀릴 거야."
      },
      {
        "cue": "~을 해결하다 / 계산하다",
        "model": "work [thing] out",
        "tier": 1,
        "star": true,
        "easyEn": "solve or figure something out",
        "example": "Let me work out the numbers and get back to you.",
        "exampleKo": "내가 숫자 계산해보고 다시 알려줄게."
      },
      {
        "cue": "제한을 우회하다",
        "model": "work around [limitation]",
        "tier": 1,
        "star": true,
        "easyEn": "find a way to avoid a problem",
        "example": "The API's down, so we'll have to work around it for now.",
        "exampleKo": "API가 다운돼서 일단 우회해야 할 것 같아."
      },
      {
        "cue": "~을 향해 노력하다",
        "model": "work toward [goal]",
        "tier": 1,
        "star": true,
        "example": "We're all working toward the launch next month.",
        "exampleKo": "우리 다 다음 달 출시를 향해 노력하고 있어."
      },
      {
        "cue": "재택근무하다",
        "model": "work from home",
        "tier": 1,
        "star": true,
        "example": "I work from home on Fridays.",
        "exampleKo": "난 금요일엔 재택근무해."
      },
      {
        "cue": "차근차근 해결하다",
        "model": "work through [problem]",
        "tier": 2,
        "star": true,
        "easyEn": "study material from start to finish",
        "example": "Let's work through the bug together on a call.",
        "exampleKo": "통화하면서 그 버그 같이 차근차근 해결하자."
      },
      {
        "cue": "~에 불리하게 작용하다",
        "model": "work against [goal/person]",
        "tier": 2,
        "star": true,
        "easyEn": "make success harder for someone or something",
        "example": "The tight deadline is really working against us.",
        "exampleKo": "촉박한 마감이 우리한테 정말 불리하게 작용하고 있어."
      },
      {
        "cue": "~아래에서 일하다",
        "model": "work under [condition/person]",
        "tier": 2,
        "star": true,
        "example": "I worked under a great manager at my last job.",
        "exampleKo": "전 직장에서 정말 좋은 매니저 밑에서 일했어."
      },
      {
        "cue": "갚다 / 소모하다",
        "model": "work off [debt/calories]",
        "tier": 2,
        "easyEn": "reduce something through effort or activity",
        "example": "I went for a run to work off that huge lunch.",
        "exampleKo": "점심 많이 먹은 거 소모하려고 달리기하러 갔어."
      },
      {
        "cue": "점점 ~수준에 도달하다",
        "model": "work up to [level]",
        "tier": 2,
        "easyEn": "gradually build up to a higher level",
        "example": "Start with 5k and work up to a half marathon.",
        "exampleKo": "5km부터 시작해서 점점 하프 마라톤 수준까지 올려."
      },
      {
        "cue": "계산해보니 ~가 되다",
        "model": "work out to [amount]",
        "tier": 2,
        "easyEn": "add up to a total amount",
        "example": "With tax and tip, it works out to about $40 each.",
        "exampleKo": "세금이랑 팁까지 하면 계산해보니 1인당 40달러쯤 돼."
      },
      {
        "cue": "자료를 끝까지 공부하다",
        "model": "work through [book/material]",
        "tier": 2,
        "easyEn": "study material from start to finish",
        "example": "I'm working through the whole React course this week.",
        "exampleKo": "이번 주에 그 리액트 강의를 처음부터 끝까지 공부하고 있어."
      },
      {
        "cue": "~와 (협의해서) 해결하다 / 합의를 보다",
        "model": "work [thing] out with [person]",
        "tier": 2,
        "easyEn": "reach an agreement with someone by discussing",
        "example": "I'll work it out with the client and let you know.",
        "exampleKo": "내가 고객이랑 협의해서 해결하고 알려줄게."
      },
      {
        "cue": "(초안·견적·제안서를) 작성하다 / 준비해내다",
        "model": "work up [draft/estimate/proposal]",
        "tier": 2,
        "easyEn": "prepare or create a document or estimate",
        "example": "Can you work up a quick estimate by tomorrow?",
        "exampleKo": "내일까지 간단히 견적 하나 만들어줄 수 있어?"
      },
      {
        "cue": "~와 함께(나란히) 일하다 / 협업하다",
        "model": "work alongside [person/team]",
        "tier": 2,
        "example": "I've been working alongside the design team all week.",
        "exampleKo": "이번 주 내내 디자인 팀이랑 나란히 협업하고 있어."
      },
      {
        "cue": "~을 (일정·계획에) 끼워 넣다 / 반영하다",
        "model": "work [thing] into [schedule/plan]",
        "tier": 2,
        "easyEn": "fit something into a schedule or plan",
        "example": "Let's work the demo into Thursday's schedule.",
        "exampleKo": "데모를 목요일 일정에 끼워 넣자."
      }
    ]
  },
  {
    "id": "look",
    "verb": "LOOK",
    "gloss": "look은 보기, 찾기, 조사하기, 기대하기의 핵심이다.",
    "items": [
      {
        "cue": "~을 보다 / 살펴보다",
        "model": "look at [thing]",
        "tier": 1,
        "star": true,
        "example": "Look at this error log, it's been spamming us all morning.",
        "exampleKo": "이 에러 로그 좀 봐, 아침 내내 우리한테 계속 뜨고 있어."
      },
      {
        "cue": "~을 찾다",
        "model": "look for [thing]",
        "tier": 1,
        "star": true,
        "example": "I'm looking for my keys, have you seen them anywhere?",
        "exampleKo": "나 열쇠 찾고 있는데, 어디서 본 적 있어?"
      },
      {
        "cue": "~을 조사하다",
        "model": "look into [issue]",
        "tier": 1,
        "star": true,
        "example": "Can you look into why the payments are failing?",
        "exampleKo": "결제가 왜 실패하는지 좀 조사해 줄 수 있어?"
      },
      {
        "cue": "찾아보다",
        "model": "look up [word/info]",
        "tier": 1,
        "star": true,
        "example": "Hold on, let me look up their number real quick.",
        "exampleKo": "잠깐만, 그 사람들 번호 빨리 찾아볼게."
      },
      {
        "cue": "조심하다",
        "model": "look out",
        "tier": 1,
        "star": true,
        "easyEn": "be careful; watch for danger",
        "example": "Look out, there's a car coming!",
        "exampleKo": "조심해, 차 온다!"
      },
      {
        "cue": "~을 기대하다",
        "model": "look forward to [-ing/noun]",
        "tier": 1,
        "star": true,
        "example": "I'm really looking forward to the long weekend.",
        "exampleKo": "이번 긴 주말이 정말 기대돼."
      },
      {
        "cue": "~처럼 보이다",
        "model": "look like [thing]",
        "tier": 1,
        "star": true,
        "example": "This bug looks like the same one we fixed last week.",
        "exampleKo": "이 버그 지난주에 우리가 고친 거랑 똑같아 보이는데."
      },
      {
        "cue": "훑어보다 / 검토하다",
        "model": "look over [document]",
        "tier": 2,
        "star": true,
        "example": "Can you look over my email before I send it?",
        "exampleKo": "보내기 전에 내 이메일 한 번 검토해 줄래?"
      },
      {
        "cue": "자세히 훑어보다",
        "model": "look through [document/list]",
        "tier": 2,
        "star": true,
        "example": "I looked through the whole report but couldn't find the numbers.",
        "exampleKo": "보고서 전체를 훑어봤는데 그 수치를 못 찾겠더라."
      },
      {
        "cue": "돌보다 / 관리하다",
        "model": "look after [person/thing]",
        "tier": 2,
        "star": true,
        "easyEn": "take care of someone or something",
        "example": "Can you look after my dog while I'm in Chicago?",
        "exampleKo": "나 시카고 가 있는 동안 우리 강아지 좀 돌봐줄 수 있어?"
      },
      {
        "cue": "~을 돌아보다",
        "model": "look back on [time/event]",
        "tier": 2,
        "star": true,
        "example": "Looking back on my first job, I learned a ton.",
        "exampleKo": "첫 직장을 돌아보면 정말 많이 배웠어."
      },
      {
        "cue": "깔보다",
        "model": "look down on [person]",
        "tier": 2,
        "star": true,
        "easyEn": "think someone is less important than you",
        "example": "Don't look down on him just because he's new here.",
        "exampleKo": "그 사람 여기 새로 왔다고 깔보지 마."
      },
      {
        "cue": "존경하다",
        "model": "look up to [person]",
        "tier": 2,
        "star": true,
        "easyEn": "respect and admire someone",
        "example": "I've always looked up to my older sister.",
        "exampleKo": "난 항상 우리 언니를 존경해 왔어."
      },
      {
        "cue": "마치 ~처럼 보이다",
        "model": "look as if [sentence]",
        "tier": 2,
        "star": true,
        "example": "You look as if you haven't slept in days.",
        "exampleKo": "너 며칠 동안 잠 안 잔 사람처럼 보여."
      },
      {
        "cue": "둘러보다",
        "model": "look around [place]",
        "tier": 2,
        "example": "We spent an hour just looking around the new office.",
        "exampleKo": "우리 새 사무실 둘러보는 데만 한 시간 썼어."
      },
      {
        "cue": "시선을 돌리다",
        "model": "look away",
        "tier": 2,
        "example": "She looked away the second I mentioned the layoffs.",
        "exampleKo": "내가 정리해고 얘기 꺼내자마자 그녀는 시선을 돌렸어."
      },
      {
        "cue": "~을 조심하다 / 챙기다",
        "model": "look out for [thing/person]",
        "tier": 2,
        "example": "Look out for scam texts, they're going around again.",
        "exampleKo": "사기 문자 조심해, 요즘 또 돌고 있어."
      },
      {
        "cue": "~에게 ~을 기대하다",
        "model": "look to [person] for [thing]",
        "tier": 2,
        "example": "The whole team looks to her for design decisions.",
        "exampleKo": "팀 전체가 디자인 결정은 그녀에게 기대."
      },
      {
        "cue": "~을 내다보다 / 앞날을 계획하다",
        "model": "look ahead to [thing/time]",
        "tier": 2,
        "easyEn": "think about something that will happen in the future",
        "example": "Let's look ahead to next quarter and set some goals.",
        "exampleKo": "다음 분기를 내다보고 목표 좀 세워보자."
      },
      {
        "cue": "~너머를 보다",
        "model": "look beyond [thing]",
        "tier": 3,
        "easyEn": "think about more than the obvious or immediate thing",
        "example": "Try to look beyond the price and think about quality.",
        "exampleKo": "가격 너머를 보고 품질도 생각해 봐."
      },
      {
        "cue": "(~에게) 잠깐 들러 보다 / 안부를 살피다",
        "model": "look in on [person]",
        "tier": 3,
        "easyEn": "make a short visit to see if someone is okay",
        "example": "I'll look in on Grandma on my way home tonight.",
        "exampleKo": "오늘 밤 집 가는 길에 할머니 잠깐 들러 볼게."
      }
    ]
  },
  {
    "id": "use",
    "verb": "USE",
    "gloss": "use는 도구, 목적, 활용을 만든다.",
    "items": [
      {
        "cue": "~을 ~용도로 사용하다",
        "model": "use [thing] for [purpose]",
        "tier": 1,
        "star": true,
        "example": "I use my Notes app for grocery lists all the time.",
        "exampleKo": "난 장 볼 목록 적는 데 항상 메모 앱을 써."
      },
      {
        "cue": "~하기 위해 ~을 사용하다",
        "model": "use [thing] to [verb]",
        "tier": 1,
        "star": true,
        "example": "I used ChatGPT to draft the email real quick.",
        "exampleKo": "이메일 초안 빨리 쓰려고 ChatGPT를 썼어."
      },
      {
        "cue": "~을 ~로 사용하다",
        "model": "use [thing] as [thing]",
        "tier": 1,
        "star": true,
        "example": "He uses an old mug as a pen holder on his desk.",
        "exampleKo": "걔는 책상에서 낡은 머그컵을 펜꽂이로 써."
      },
      {
        "cue": "~에 익숙하다",
        "model": "be used to [-ing/noun]",
        "tier": 1,
        "star": true,
        "easyEn": "be familiar with something so it feels normal",
        "example": "I'm used to waking up at 6 now, so it's no big deal.",
        "exampleKo": "이제 6시에 일어나는 데 익숙해서 별거 아니야."
      },
      {
        "cue": "예전에 ~하곤 했다",
        "model": "used to [verb]",
        "tier": 1,
        "star": true,
        "easyEn": "did something regularly in the past, but not now",
        "example": "I used to smoke, but I quit a couple years ago.",
        "exampleKo": "예전엔 담배 피웠는데, 몇 년 전에 끊었어."
      },
      {
        "cue": "~을 ~와 함께 사용하다",
        "model": "use [thing] with [thing]",
        "tier": 2,
        "star": true,
        "example": "Just use this charger with your laptop, it's the fast one.",
        "exampleKo": "이 충전기를 네 노트북이랑 같이 써, 이게 고속 충전이야."
      },
      {
        "cue": "~을 ~에 사용하다",
        "model": "use [thing] on [target]",
        "tier": 2,
        "star": true,
        "example": "Don't use that cleaner on the screen, it'll ruin it.",
        "exampleKo": "그 세제를 화면에 쓰지 마, 망가져."
      },
      {
        "cue": "다 써버리다",
        "model": "use up [resource]",
        "tier": 2,
        "star": true,
        "example": "We already used up all the printer paper this week.",
        "exampleKo": "이번 주에 프린터 용지를 벌써 다 써버렸어."
      },
      {
        "cue": "~을 활용하다",
        "model": "make use of [thing]",
        "tier": 2,
        "star": true,
        "example": "You should make use of the free gym at work.",
        "exampleKo": "회사에 있는 무료 헬스장 좀 활용해 봐."
      },
      {
        "cue": "~을 실제로 활용하다",
        "model": "put [thing] to use",
        "tier": 2,
        "star": true,
        "example": "Finally putting my Spanish to use on this trip.",
        "exampleKo": "이번 여행에서 드디어 내 스페인어를 실제로 써먹고 있어."
      },
      {
        "cue": "~을 ~에게 불리하게 사용하다",
        "model": "use [thing] against [person]",
        "tier": 2,
        "example": "Anything you say can be used against you in court.",
        "exampleKo": "당신이 하는 말은 법정에서 불리하게 사용될 수 있습니다."
      },
      {
        "cue": "~을 ~에서 사용하다",
        "model": "use [thing] in [context]",
        "tier": 2,
        "example": "We use Slack in every meeting to share links.",
        "exampleKo": "우리는 모든 회의에서 링크 공유할 때 슬랙을 써."
      },
      {
        "cue": "~대신 ~을 사용하다",
        "model": "use [thing] instead of [thing]",
        "tier": 2,
        "example": "I use honey instead of sugar in my coffee.",
        "exampleKo": "난 커피에 설탕 대신 꿀을 넣어."
      },
      {
        "cue": "~이 필요 없다 / 쓸모없다고 여기다",
        "model": "have no use for [thing]",
        "tier": 3,
        "easyEn": "not need or want something at all",
        "example": "I have no use for a printer anymore, everything's digital.",
        "exampleKo": "이제 프린터는 필요 없어, 다 디지털이라."
      },
      {
        "cue": "~해봐야 소용없다",
        "model": "no use [-ing]",
        "tier": 3,
        "easyEn": "it will not help, so there is no reason to do it",
        "example": "It's no use texting him, he never checks his phone.",
        "exampleKo": "걔한테 문자해봐야 소용없어, 폰을 안 봐."
      },
      {
        "cue": "~에게 도움이 되다 / 쓸모가 있다",
        "model": "be of use to [person]",
        "tier": 3,
        "easyEn": "be helpful or useful to someone",
        "example": "Let me know if any of these notes are of use to you.",
        "exampleKo": "이 노트들 중에 너한테 도움 되는 거 있으면 말해줘."
      }
    ]
  },
  {
    "id": "move",
    "verb": "MOVE",
    "gloss": "move는 이동, 이사, 진행, 감정 변화를 만든다.",
    "items": [
      {
        "cue": "다음으로 넘어가다 / 잊고 나아가다",
        "model": "move on",
        "tier": 1,
        "star": true,
        "example": "It didn't work out, but I've moved on.",
        "exampleKo": "잘 안 됐지만 난 이제 다 잊고 넘어갔어."
      },
      {
        "cue": "다음 주제로 넘어가다",
        "model": "move on to [topic]",
        "tier": 1,
        "star": true,
        "example": "Let's move on to the budget numbers.",
        "exampleKo": "예산 수치로 넘어가죠."
      },
      {
        "cue": "앞으로 진행하다",
        "model": "move forward",
        "tier": 1,
        "star": true,
        "example": "Great, let's move forward.",
        "exampleKo": "좋아요, 그대로 진행합시다."
      },
      {
        "cue": "~을 진행하다 / 추진하다",
        "model": "move forward with [plan/thing]",
        "tier": 1,
        "star": true,
        "example": "We're moving forward with the new vendor.",
        "exampleKo": "우리는 새 업체로 진행하기로 했어요."
      },
      {
        "cue": "이사 들어오다",
        "model": "move in",
        "tier": 2,
        "star": true,
        "example": "My roommate moves in this weekend.",
        "exampleKo": "내 룸메이트가 이번 주말에 이사 들어와."
      },
      {
        "cue": "이사 나가다",
        "model": "move out",
        "tier": 2,
        "star": true,
        "example": "They moved out last month.",
        "exampleKo": "걔네 지난달에 이사 나갔어."
      },
      {
        "cue": "옆으로 비키다",
        "model": "move over",
        "tier": 2,
        "star": true,
        "example": "Can you move over? I need to sit down.",
        "exampleKo": "좀 비켜줄래? 나 앉아야 해."
      },
      {
        "cue": "올라가다 / 앞당겨지다",
        "model": "move up",
        "tier": 2,
        "star": true,
        "example": "The meeting got moved up to 9 a.m.",
        "exampleKo": "회의가 오전 9시로 앞당겨졌어."
      },
      {
        "cue": "내려가다",
        "model": "move down",
        "tier": 2,
        "star": true,
        "example": "Scroll down a bit, it's near the bottom.",
        "exampleKo": "조금 아래로 내려봐, 거의 맨 밑에 있어."
      },
      {
        "cue": "돌아다니다",
        "model": "move around [place]",
        "tier": 2,
        "star": true,
        "example": "I spent the afternoon moving around downtown.",
        "exampleKo": "오후 내내 시내를 돌아다녔어."
      },
      {
        "cue": "이사 가다 / 멀어지다",
        "model": "move away",
        "tier": 2,
        "star": true,
        "example": "My best friend moved away to Seattle.",
        "exampleKo": "제일 친한 친구가 시애틀로 이사 갔어."
      },
      {
        "cue": "다시 이사 오다 / 뒤로 가다",
        "model": "move back",
        "tier": 2,
        "star": true,
        "example": "After college she moved back home.",
        "exampleKo": "대학 졸업하고 걔는 다시 집으로 이사 왔어."
      },
      {
        "cue": "~로 들어가다 / 진출하다",
        "model": "move into [place/field]",
        "tier": 2,
        "star": true,
        "example": "The company's moving into the AI space.",
        "exampleKo": "그 회사는 AI 분야로 진출하고 있어."
      },
      {
        "cue": "~에서 나가다",
        "model": "move out of [place]",
        "tier": 2,
        "star": true,
        "example": "We're moving out of the old office next week.",
        "exampleKo": "우리 다음 주에 예전 사무실에서 나가."
      },
      {
        "cue": "~쪽으로 나아가다",
        "model": "move toward [goal]",
        "tier": 2,
        "star": true,
        "example": "Every rep helps you move toward your fitness goal.",
        "exampleKo": "한 세트 한 세트가 네 운동 목표에 다가가게 해줘."
      },
      {
        "cue": "과정을 거쳐가다",
        "model": "move through [process]",
        "tier": 2,
        "example": "Your application is still moving through review.",
        "exampleKo": "당신의 신청서는 아직 심사 과정을 거치는 중이에요."
      },
      {
        "cue": "A에서 B로 이동하다",
        "model": "move from A to B",
        "tier": 2,
        "example": "We're moving from Slack to Teams next quarter.",
        "exampleKo": "다음 분기에 슬랙에서 팀즈로 옮길 거예요."
      },
      {
        "cue": "~에 감동받다",
        "model": "be moved by [thing]",
        "tier": 2,
        "easyEn": "feel strong emotion because of something",
        "example": "I was really moved by her speech.",
        "exampleKo": "그녀의 연설에 정말 감동받았어."
      },
      {
        "cue": "~을 밀고 나가다",
        "model": "move ahead with [thing]",
        "tier": 2,
        "example": "Let's move ahead with the launch.",
        "exampleKo": "출시를 그대로 밀고 나갑시다."
      },
      {
        "cue": "~로 승진하다 / 올라가다",
        "model": "move up to [role/position]",
        "tier": 2,
        "example": "She moved up to team lead this year.",
        "exampleKo": "그녀는 올해 팀장으로 승진했어."
      },
      {
        "cue": "~을 넘어서다 / 극복하다",
        "model": "move past [thing]",
        "tier": 2,
        "example": "It took a while, but I finally moved past the breakup.",
        "exampleKo": "시간이 좀 걸렸지만 결국 그 이별을 극복했어."
      }
    ]
  },
  {
    "id": "hold",
    "verb": "HOLD",
    "gloss": "hold는 잡다, 유지하다, 지연시키다, 버티다.",
    "items": [
      {
        "cue": "기다리다 / 붙잡다",
        "model": "hold on",
        "tier": 1,
        "star": true,
        "example": "Hold on, I left my phone in the car.",
        "exampleKo": "잠깐만, 나 차에 폰 두고 왔어."
      },
      {
        "cue": "지연시키다 / 버티다",
        "model": "hold up [thing/person]",
        "tier": 1,
        "star": true,
        "example": "Sorry I'm late, a train wreck on the 405 held me up for an hour.",
        "exampleKo": "늦어서 미안, 405번 도로 사고 때문에 한 시간 지체됐어."
      },
      {
        "cue": "미루다 / 막다",
        "model": "hold off [thing]",
        "tier": 2,
        "star": true,
        "example": "Let's hold off the launch until QA signs off.",
        "exampleKo": "QA 승인 나기 전까지 출시는 미루자."
      },
      {
        "cue": "막다 / 억제하다",
        "model": "hold back [thing/person]",
        "tier": 2,
        "star": true,
        "example": "I wanted to say something in the meeting but I held back.",
        "exampleKo": "회의에서 뭔가 말하고 싶었는데 참았어."
      },
      {
        "cue": "유지하다 / 낮게 유지하다",
        "model": "hold down [job/cost]",
        "tier": 2,
        "star": true,
        "example": "With two kids and a mortgage, he's lucky to hold down a steady job.",
        "exampleKo": "애 둘에 대출까지 있으니, 그가 안정적인 직장을 유지하는 건 다행이야."
      },
      {
        "cue": "버티다",
        "model": "hold out",
        "tier": 2,
        "star": true,
        "example": "The old laptop is barely holding out until my new one ships.",
        "exampleKo": "새 노트북 올 때까지 이 낡은 게 겨우 버티고 있어."
      },
      {
        "cue": "~을 고집하며 기다리다",
        "model": "hold out for [thing]",
        "tier": 2,
        "star": true,
        "example": "She turned down three offers and held out for a remote role.",
        "exampleKo": "그녀는 제안 세 개를 거절하고 재택 자리를 고집하며 기다렸어."
      },
      {
        "cue": "꽉 붙잡다 / 유지하다",
        "model": "hold onto [thing]",
        "tier": 2,
        "star": true,
        "example": "Hold onto that receipt in case you want to return it.",
        "exampleKo": "반품할지도 모르니까 그 영수증 잘 갖고 있어."
      },
      {
        "cue": "~을 지키다",
        "model": "hold to [plan/promise]",
        "tier": 2,
        "star": true,
        "example": "Whatever happens, we're holding to the Friday deadline.",
        "exampleKo": "무슨 일이 있어도 금요일 마감은 지킬 거야."
      },
      {
        "cue": "~에게 기준/약속을 지키게 하다",
        "model": "hold [person] to [standard/promise]",
        "tier": 2,
        "star": true,
        "example": "He promised to cover the shift, so I'm holding him to it.",
        "exampleKo": "그가 근무 대신 서주겠다고 약속했으니, 그 약속 꼭 지키게 할 거야."
      },
      {
        "cue": "유지되다 / 무너지지 않다",
        "model": "hold together",
        "tier": 2,
        "star": true,
        "example": "The plan is messy, but somehow it all holds together.",
        "exampleKo": "계획이 엉성한데도 어찌어찌 다 굴러가긴 해."
      },
      {
        "cue": "~을 이유로 안 좋게 보다",
        "model": "hold against [person]",
        "tier": 2,
        "easyEn": "keep being upset with someone for something they did",
        "example": "He forgot my birthday once and I still hold it against him.",
        "exampleKo": "걔가 내 생일 한 번 까먹은 걸 나 아직도 마음에 담아두고 있어."
      },
      {
        "cue": "~에게 책임을 묻다",
        "model": "hold [person] accountable for [thing]",
        "tier": 2,
        "example": "If the numbers are off, we hold the vendor accountable for it.",
        "exampleKo": "수치가 틀리면 그 업체에 책임을 물을 거야."
      },
      {
        "cue": "~을 제자리에 고정하다",
        "model": "hold [thing] in place",
        "tier": 2,
        "example": "Use a couple of clamps to hold the shelf in place while the glue dries.",
        "exampleKo": "접착제 마르는 동안 클램프 몇 개로 선반을 제자리에 고정해."
      },
      {
        "cue": "~을 미루다 / 보류하다",
        "model": "hold off on [thing/-ing]",
        "tier": 2,
        "star": true,
        "example": "Let's hold off on buying the tickets until the dates are confirmed.",
        "exampleKo": "날짜 확정될 때까지 표 사는 건 보류하자."
      },
      {
        "cue": "~하는 것을 참다 / 자제하다",
        "model": "hold back from [-ing]",
        "tier": 2,
        "example": "I had to hold back from laughing during his serious speech.",
        "exampleKo": "그의 진지한 연설 중에 웃음을 참아야 했어."
      },
      {
        "cue": "연기하다 / 계속 보유하다",
        "model": "hold over [thing]",
        "tier": 3,
        "easyEn": "delay something to a later time",
        "example": "They held over the sale until Monday because of the storm.",
        "exampleKo": "폭풍 때문에 세일을 월요일까지 연기했어."
      },
      {
        "cue": "~속에서도 버티다 / 견디다",
        "model": "hold up under [pressure/scrutiny]",
        "tier": 3,
        "easyEn": "stay strong or true when tested",
        "example": "His story didn't hold up under a few simple questions.",
        "exampleKo": "그의 이야기는 간단한 질문 몇 개에도 버티지 못했어."
      }
    ]
  },
  {
    "id": "carry",
    "verb": "CARRY",
    "gloss": "carry는 들고 가다, 수행하다, 이어지다.",
    "items": [
      {
        "cue": "수행하다",
        "model": "carry out [task/plan]",
        "tier": 1,
        "star": true,
        "example": "We carried out the migration over the weekend so nobody would notice downtime.",
        "exampleKo": "아무도 다운타임을 눈치채지 못하게 주말에 마이그레이션을 수행했어요."
      },
      {
        "cue": "계속하다",
        "model": "carry on",
        "tier": 2,
        "star": true,
        "example": "Sorry, go ahead and carry on — I didn't mean to interrupt.",
        "exampleKo": "미안, 계속해 — 방해할 생각은 아니었어."
      },
      {
        "cue": "~을 계속하다",
        "model": "carry on with [thing]",
        "tier": 2,
        "star": true,
        "example": "Let's carry on with the standup, we can cover that bug after.",
        "exampleKo": "스탠드업 계속 진행하죠, 그 버그는 끝나고 다뤄도 돼요."
      },
      {
        "cue": "이월되다 / 이어지다",
        "model": "carry over [thing]",
        "tier": 2,
        "star": true,
        "example": "My unused vacation days carry over into next year.",
        "exampleKo": "안 쓴 휴가 일수는 내년으로 이월돼요."
      },
      {
        "cue": "들고 다니다",
        "model": "carry around [thing]",
        "tier": 2,
        "star": true,
        "example": "I hate carrying around my laptop charger, but I always need it.",
        "exampleKo": "노트북 충전기 들고 다니는 거 싫은데, 늘 필요하더라고."
      },
      {
        "cue": "가져가다 / 흥분시키다",
        "model": "carry away [thing/person]",
        "tier": 2,
        "star": true,
        "example": "The movers carried away the couch before I could say goodbye to it.",
        "exampleKo": "작별 인사도 하기 전에 이삿짐 센터가 소파를 가져가 버렸어."
      },
      {
        "cue": "~을 ~안으로 들고 가다",
        "model": "carry [thing] into [place]",
        "tier": 2,
        "example": "Can you carry these boxes into the garage for me?",
        "exampleKo": "이 상자들 좀 차고 안으로 들여다 줄래?"
      },
      {
        "cue": "~을 지니고 다니다",
        "model": "carry [thing] with [person]",
        "tier": 2,
        "example": "I always carry a portable charger with me when I travel.",
        "exampleKo": "여행할 때 나는 항상 보조 배터리를 지니고 다녀."
      },
      {
        "cue": "감정에 휩쓸리다",
        "model": "be carried away by [emotion]",
        "tier": 2,
        "easyEn": "lose control because of strong feelings",
        "example": "Don't get carried away by the hype — let's see if it actually ships.",
        "exampleKo": "과대광고에 휩쓸리지 마 — 실제로 출시되는지 지켜보자."
      },
      {
        "cue": "계속 ~하다",
        "model": "carry on [-ing]",
        "tier": 2,
        "example": "She just carried on talking like nothing had happened.",
        "exampleKo": "그녀는 아무 일도 없었다는 듯이 계속 얘기했어."
      },
      {
        "cue": "다시 가져가다",
        "model": "carry back [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "take something back to where it came from",
        "example": "Can you carry this mug back to the kitchen when you're done?",
        "exampleKo": "다 쓰면 이 머그컵 주방으로 다시 가져다 줄래?"
      },
      {
        "cue": "해내다",
        "model": "carry off [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "manage to do something difficult successfully",
        "example": "He was nervous, but he carried off the whole presentation like a pro.",
        "exampleKo": "그는 긴장했지만 발표 전체를 프로처럼 잘 해냈어."
      },
      {
        "cue": "끝까지 해내다",
        "model": "carry through [plan]",
        "tier": 3,
        "star": true,
        "easyEn": "finish or complete a plan you started",
        "example": "It's a solid plan, but do we have the budget to carry it through?",
        "exampleKo": "괜찮은 계획인데, 끝까지 해낼 예산은 있는 거야?"
      },
      {
        "cue": "~을 이어가다 / 이월하다",
        "model": "carry forward [thing]",
        "tier": 3,
        "easyEn": "continue something or move it to a later time",
        "example": "Let's carry this momentum forward into the next sprint.",
        "exampleKo": "이 기세를 다음 스프린트까지 이어가자."
      },
      {
        "cue": "~에게 영향력이 있다",
        "model": "carry weight with [person]",
        "tier": 3,
        "easyEn": "have real influence on someone's opinion",
        "example": "Her opinion carries a lot of weight with the leadership team.",
        "exampleKo": "그녀의 의견은 리더십 팀에 상당한 영향력이 있어."
      }
    ]
  },
  {
    "id": "pull",
    "verb": "PULL",
    "gloss": "pull은 당기다, 빼내다, 해내다, 멈춰 세우다.",
    "items": [
      {
        "cue": "빼내다 / 철수하다",
        "model": "pull out [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you pull out the couch? I dropped my phone behind it.",
        "exampleKo": "소파 좀 빼줄래? 뒤에 폰 떨어뜨렸어."
      },
      {
        "cue": "차를 길가에 세우다",
        "model": "pull over",
        "tier": 2,
        "star": true,
        "example": "You should pull over, you've been driving for six hours straight.",
        "exampleKo": "차 좀 세워, 여섯 시간 내리 운전했잖아."
      },
      {
        "cue": "멈춰 서다 / 끌어올리다",
        "model": "pull up",
        "tier": 2,
        "star": true,
        "example": "A cab pulled up right as I walked out the door.",
        "exampleKo": "문 나서자마자 택시가 딱 멈춰 섰어."
      },
      {
        "cue": "끌어내리다 / 철거하다",
        "model": "pull down [thing]",
        "tier": 2,
        "star": true,
        "example": "They're finally pulling down that old warehouse on Fifth Street.",
        "exampleKo": "5번가에 있던 그 낡은 창고를 드디어 철거하나 봐."
      },
      {
        "cue": "끌어들이다",
        "model": "pull in [thing/person]",
        "tier": 2,
        "star": true,
        "example": "That new sign out front is really pulling in customers.",
        "exampleKo": "저 앞에 새로 단 간판이 손님들을 진짜 끌어들이네."
      },
      {
        "cue": "어려운 일을 해내다",
        "model": "pull off [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "succeed at something difficult or surprising",
        "example": "I can't believe you pulled off the whole launch in one week.",
        "exampleKo": "네가 그 런칭을 일주일 만에 다 해냈다는 게 안 믿겨."
      },
      {
        "cue": "버텨내다 / 회복하다",
        "model": "pull through [difficulty]",
        "tier": 2,
        "star": true,
        "easyEn": "survive or recover from a serious problem",
        "example": "It was a rough surgery, but Grandpa pulled through.",
        "exampleKo": "수술이 힘들었지만 할아버지 잘 버텨내셨어."
      },
      {
        "cue": "멀어지다 / 빠져나가다",
        "model": "pull away",
        "tier": 2,
        "star": true,
        "example": "The bus was already pulling away when I got to the stop.",
        "exampleKo": "정류장 도착했더니 버스가 이미 출발하고 있더라."
      },
      {
        "cue": "물러나다 / 철회하다",
        "model": "pull back",
        "tier": 2,
        "star": true,
        "example": "The client pulled back at the last minute, so the deal's off.",
        "exampleKo": "클라이언트가 막판에 발을 빼서 거래 무산됐어."
      },
      {
        "cue": "분해하다 / 갈라놓다",
        "model": "pull apart [thing]",
        "tier": 2,
        "star": true,
        "example": "He pulled the engine apart just to see how it worked.",
        "exampleKo": "그냥 어떻게 작동하는지 보려고 엔진을 다 분해했어."
      },
      {
        "cue": "힘을 합치다 / 정신 차리다",
        "model": "pull together",
        "tier": 2,
        "star": true,
        "easyEn": "join efforts and work together as a team",
        "example": "If we all pull together, we can hit the deadline.",
        "exampleKo": "우리 다 같이 힘 합치면 마감 맞출 수 있어."
      },
      {
        "cue": "응원하다",
        "model": "pull for [person/team]",
        "tier": 2,
        "easyEn": "support someone and hope they succeed",
        "example": "I'm pulling for you in the interview tomorrow, you've got this.",
        "exampleKo": "내일 면접 응원할게, 넌 할 수 있어."
      },
      {
        "cue": "~를 ~에 끌어들이다",
        "model": "pull [person] into [thing]",
        "tier": 2,
        "example": "Don't pull me into your argument with your brother.",
        "exampleKo": "너희 형이랑 싸우는 데 나 끌어들이지 마."
      },
      {
        "cue": "~를 따로 불러내다",
        "model": "pull [person] aside",
        "tier": 2,
        "example": "The manager pulled me aside after the meeting to talk about the numbers.",
        "exampleKo": "회의 끝나고 매니저가 나 따로 불러서 실적 얘기했어."
      },
      {
        "cue": "~에서 손을 떼다 / 빠지다 / 철수하다",
        "model": "pull out of [deal/place/commitment]",
        "tier": 2,
        "star": true,
        "example": "We had to pull out of the deal once we saw the fine print.",
        "exampleKo": "세부 조항 보고 나서 우리 그 거래에서 손 뗄 수밖에 없었어."
      },
      {
        "cue": "~을 줄이다 / 축소하다",
        "model": "pull back on [spending/plan]",
        "tier": 2,
        "example": "We're pulling back on marketing spend until next quarter.",
        "exampleKo": "다음 분기까지 마케팅 비용을 줄이기로 했어."
      },
      {
        "cue": "~을 앞서 나가다",
        "model": "pull ahead of [competitor]",
        "tier": 2,
        "example": "Their app pulled ahead of ours after that big update.",
        "exampleKo": "그 큰 업데이트 이후로 걔네 앱이 우리 앱을 앞서 나갔어."
      },
      {
        "cue": "~을 중단시키다 / 접다",
        "model": "pull the plug on [project/thing]",
        "tier": 2,
        "easyEn": "stop or end a project or activity",
        "example": "After two years of no traction, they finally pulled the plug on the project.",
        "exampleKo": "2년 동안 성과가 없어서 결국 그 프로젝트를 접었어."
      },
      {
        "cue": "제 몫을 다하다",
        "model": "pull your weight",
        "tier": 2,
        "easyEn": "do your fair share of the work",
        "example": "Everyone's staying late except him, he never pulls his weight.",
        "exampleKo": "다들 야근하는데 걔만 빠져, 제 몫을 한 번을 안 해."
      },
      {
        "cue": "~에 맞서 당기다",
        "model": "pull against [thing]",
        "tier": 3,
        "easyEn": "move or pull in the opposite direction from something",
        "example": "The current was strong, so we had to pull against it the whole way back.",
        "exampleKo": "물살이 세서 돌아오는 내내 그것에 맞서 노를 저어야 했어."
      }
    ]
  },
  {
    "id": "push",
    "verb": "PUSH",
    "gloss": "push는 밀다, 추진하다, 압박하다, 반대하다.",
    "items": [
      {
        "cue": "반대하다 / 미루다",
        "model": "push back",
        "tier": 2,
        "star": true,
        "easyEn": "disagree with or resist something; or postpone it",
        "example": "I floated the idea of skipping tests, but the whole team pushed back.",
        "exampleKo": "테스트를 건너뛰자고 제안했는데, 팀 전체가 반대했어."
      },
      {
        "cue": "~에 이의를 제기하다",
        "model": "push back on [idea/deadline]",
        "tier": 2,
        "star": true,
        "easyEn": "object to or resist a particular idea or deadline",
        "example": "Our lead pushed back on the Friday deadline and got us two more days.",
        "exampleKo": "우리 리드가 금요일 마감에 이의를 제기해서 이틀을 더 받아냈어."
      },
      {
        "cue": "밀어붙여 해내다",
        "model": "push through [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "force something to get completed or approved despite resistance",
        "example": "It was a mess, but we pushed the migration through before the demo.",
        "exampleKo": "엉망이었지만, 데모 전에 마이그레이션을 밀어붙여서 끝냈어."
      },
      {
        "cue": "배포하다 / 내보내다",
        "model": "push out [release/change]",
        "tier": 2,
        "star": true,
        "example": "We're pushing out the hotfix tonight so nobody hits that crash tomorrow.",
        "exampleKo": "오늘 밤에 핫픽스를 배포할 거라 내일은 아무도 그 크래시를 안 겪을 거야."
      },
      {
        "cue": "올리다",
        "model": "push up [number/price]",
        "tier": 2,
        "star": true,
        "example": "The chip shortage pushed up the price of every laptop this year.",
        "exampleKo": "칩 부족 때문에 올해 모든 노트북 가격이 올랐어."
      },
      {
        "cue": "낮추다",
        "model": "push down [number/price]",
        "tier": 2,
        "star": true,
        "example": "Buying in bulk really pushed down our cloud costs.",
        "exampleKo": "대량으로 구매하니까 클라우드 비용이 확 낮아졌어."
      },
      {
        "cue": "밀어내다",
        "model": "push away [person/thing]",
        "tier": 2,
        "star": true,
        "example": "He keeps canceling plans and pushing away everyone who cares about him.",
        "exampleKo": "걔는 계속 약속을 취소하면서 자기를 아끼는 사람들을 다 밀어내."
      },
      {
        "cue": "계속 추진하다",
        "model": "push ahead",
        "tier": 2,
        "star": true,
        "example": "Feedback's been rough, but let's push ahead and ship version one.",
        "exampleKo": "피드백이 좀 거칠었지만, 계속 추진해서 버전 1을 출시하자."
      },
      {
        "cue": "강하게 요구하다",
        "model": "push for [change/result]",
        "tier": 2,
        "star": true,
        "easyEn": "strongly ask for or demand a change or result",
        "example": "A bunch of us are pushing for remote Fridays next quarter.",
        "exampleKo": "우리 중 여러 명이 다음 분기에 금요일 재택을 강하게 요구하고 있어."
      },
      {
        "cue": "~에게 억지로 ~하게 하다",
        "model": "push [person] into [-ing]",
        "tier": 2,
        "example": "My parents kind of pushed me into studying accounting.",
        "exampleKo": "부모님이 나를 좀 억지로 회계 공부하게 만드셨어."
      },
      {
        "cue": "~을 ~에 푸시하다 / 올리다 (코드를 저장소·운영에 올리다)",
        "model": "push [thing] to [place/branch]",
        "tier": 2,
        "star": true,
        "example": "I just pushed the fix to the staging branch, can you review it?",
        "exampleKo": "방금 수정 사항을 스테이징 브랜치에 푸시했는데, 리뷰해줄 수 있어?"
      },
      {
        "cue": "~을 계속 밀고 나가다 / 추진하다",
        "model": "push forward with [plan/project]",
        "tier": 2,
        "example": "The board approved it, so we're pushing forward with the Austin office.",
        "exampleKo": "이사회가 승인해서, 오스틴 사무실 건을 계속 밀고 나갈 거야."
      },
      {
        "cue": "밀고 들어가다",
        "model": "push in",
        "tier": 3,
        "star": true,
        "easyEn": "press something inward, or move into a space ahead of others",
        "example": "The drawer won't close unless you push in on the left side.",
        "exampleKo": "왼쪽을 밀어 넣지 않으면 서랍이 안 닫혀."
      },
      {
        "cue": "~에 맞서 밀다 / 반대하다",
        "model": "push against [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "press hard on something, often something that resists you",
        "example": "I pushed against the door with my shoulder but it wouldn't budge.",
        "exampleKo": "어깨로 문을 밀었는데 꿈쩍도 안 했어."
      },
      {
        "cue": "밀어 넘어뜨리다",
        "model": "push over [thing/person]",
        "tier": 3,
        "easyEn": "push someone or something so they fall down",
        "example": "The dog got so excited he almost pushed my little sister over.",
        "exampleKo": "강아지가 너무 신나서 우리 여동생을 넘어뜨릴 뻔했어."
      },
      {
        "cue": "~을 밀치고 지나가다 / 한계를 넘다",
        "model": "push past [person/limit]",
        "tier": 3,
        "easyEn": "move forcefully past someone, or go beyond a limit",
        "example": "She pushed past me in the subway without even saying sorry.",
        "exampleKo": "그 여자가 미안하다는 말도 없이 지하철에서 나를 밀치고 지나갔어."
      }
    ]
  },
  {
    "id": "pick",
    "verb": "PICK",
    "gloss": "pick은 집다, 고르다, 배우다, 알아차리다.",
    "items": [
      {
        "cue": "집다 / 데리러 가다 / 배우다",
        "model": "pick up [thing/person]",
        "tier": 1,
        "star": true,
        "example": "Can you pick up some milk on your way home?",
        "exampleKo": "집에 오는 길에 우유 좀 사다 줄래?"
      },
      {
        "cue": "고르다",
        "model": "pick out [thing]",
        "tier": 2,
        "star": true,
        "example": "I picked out a birthday card for Sarah at Target.",
        "exampleKo": "타깃에서 새라한테 줄 생일 카드를 골랐어."
      },
      {
        "cue": "괴롭히다",
        "model": "pick on [person]",
        "tier": 2,
        "star": true,
        "easyEn": "repeatedly tease, criticize, or treat someone unfairly",
        "example": "Stop picking on your little brother.",
        "exampleKo": "네 동생 그만 좀 괴롭혀."
      },
      {
        "cue": "세세히 비판하다 / 분해하다",
        "model": "pick apart [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "criticize something in great detail to find its faults",
        "example": "The reviewers picked apart my whole proposal in ten minutes.",
        "exampleKo": "리뷰어들이 10분 만에 내 제안서를 낱낱이 물고 늘어졌어."
      },
      {
        "cue": "선택지 중에서 고르다",
        "model": "pick from [options]",
        "tier": 2,
        "star": true,
        "example": "There are five templates to pick from on the dashboard.",
        "exampleKo": "대시보드에 고를 수 있는 템플릿이 다섯 개 있어."
      },
      {
        "cue": "알아차리다",
        "model": "pick up on [signal/detail]",
        "tier": 2,
        "star": true,
        "easyEn": "notice a small detail or hint that others miss",
        "example": "She picked up on the fact that I was stressed right away.",
        "exampleKo": "그녀는 내가 스트레스 받고 있다는 걸 바로 알아챘어."
      },
      {
        "cue": "A와 B 중 고르다",
        "model": "pick between A and B",
        "tier": 2,
        "example": "I can't pick between the blue one and the gray one.",
        "exampleKo": "파란색이랑 회색 중에 못 고르겠어."
      },
      {
        "cue": "~보다 ~을 고르다",
        "model": "pick [thing] over [thing]",
        "tier": 2,
        "example": "I'd pick Notion over Google Docs any day.",
        "exampleKo": "난 언제든 구글 독스보다 노션을 택할 거야."
      },
      {
        "cue": "~를 역할에 뽑다",
        "model": "pick [person] for [role]",
        "tier": 2,
        "example": "They picked Jake for team lead on the new project.",
        "exampleKo": "그들은 새 프로젝트 팀장으로 제이크를 뽑았어."
      },
      {
        "cue": "남이 못 한 몫·부족한 부분을 대신 떠맡다",
        "model": "pick up the slack",
        "tier": 2,
        "easyEn": "do the extra work someone else failed to do",
        "example": "Two people are out sick, so we've gotta pick up the slack.",
        "exampleKo": "두 명이 아파서 빠졌으니까 우리가 빈자리를 메워야 해."
      },
      {
        "cue": "뒤지다 / 골라내다",
        "model": "pick through [things]",
        "tier": 3,
        "star": true,
        "easyEn": "search carefully through many things to find what you want",
        "example": "I spent an hour picking through the thrift store for a decent jacket.",
        "exampleKo": "괜찮은 재킷 하나 찾으려고 중고 가게를 한 시간 동안 뒤졌어."
      },
      {
        "cue": "조금씩 먹다 / 흠잡다",
        "model": "pick at [food/problem]",
        "tier": 3,
        "easyEn": "eat only tiny amounts; or keep touching something repeatedly",
        "example": "He just picked at his salad the whole dinner.",
        "exampleKo": "그는 저녁 내내 샐러드를 깨작거리기만 했어."
      },
      {
        "cue": "(누가) 중단한 지점부터 이어받아 하다",
        "model": "pick up where [person] left off",
        "tier": 3,
        "easyEn": "continue something from the point where someone stopped",
        "example": "I'll pick up where you left off on the report tomorrow.",
        "exampleKo": "내일 네가 멈춘 데서부터 보고서를 이어서 할게."
      }
    ]
  },
  {
    "id": "drop",
    "verb": "DROP",
    "gloss": "drop은 떨어뜨리다, 내려주다, 줄다, 중단하다.",
    "items": [
      {
        "cue": "내려주다 / 전달하다 / 줄어들다",
        "model": "drop off [person/thing]",
        "tier": 1,
        "star": true,
        "example": "Can you drop off the kids at soccer practice on your way to work?",
        "exampleKo": "출근길에 애들 축구 연습장에 좀 내려줄 수 있어?"
      },
      {
        "cue": "잠깐 들르다",
        "model": "drop by [place]",
        "tier": 2,
        "star": true,
        "easyEn": "visit somewhere briefly, often without planning ahead",
        "example": "I'll drop by your desk after lunch to grab that file.",
        "exampleKo": "점심 먹고 그 파일 가지러 네 자리에 잠깐 들를게."
      },
      {
        "cue": "잠깐 들르다",
        "model": "drop in",
        "tier": 2,
        "star": true,
        "easyEn": "make a short, casual visit without planning ahead",
        "example": "Feel free to drop in anytime this weekend, we'll be home.",
        "exampleKo": "이번 주말 아무 때나 편하게 들러, 우리 집에 있을 거야."
      },
      {
        "cue": "중퇴하다 / 빠지다",
        "model": "drop out",
        "tier": 2,
        "star": true,
        "easyEn": "quit a school, course, or activity before finishing",
        "example": "He dropped out after his second year to start a company.",
        "exampleKo": "걔는 2학년 마치고 중퇴하고 회사를 차렸어."
      },
      {
        "cue": "~에서 빠지다",
        "model": "drop out of [school/program]",
        "tier": 2,
        "star": true,
        "easyEn": "stop attending a school or program before finishing",
        "example": "She dropped out of nursing school when she realized it wasn't for her.",
        "exampleKo": "걔는 간호학교가 자기랑 안 맞는 걸 깨닫고 중퇴했어."
      },
      {
        "cue": "~에서 ~로 떨어지다",
        "model": "drop from [number] to [number]",
        "tier": 2,
        "example": "Our conversion rate dropped from 8% to 3% after the redesign.",
        "exampleKo": "리디자인 이후로 전환율이 8%에서 3%로 떨어졌어."
      },
      {
        "cue": "~을 계획/목록에서 빼다",
        "model": "drop [thing] from [plan/list]",
        "tier": 2,
        "example": "Let's drop the podcast feature from this sprint and focus on the login bug.",
        "exampleKo": "이번 스프린트에서 팟캐스트 기능은 빼고 로그인 버그에 집중하자."
      },
      {
        "cue": "맡은 일을 실수로 놓치다 / 그르치다",
        "model": "drop the ball",
        "tier": 2,
        "easyEn": "fail to handle a task you were responsible for",
        "example": "I totally dropped the ball on the client email, I'll send it right now.",
        "exampleKo": "클라이언트 이메일을 완전히 깜빡했네, 지금 바로 보낼게."
      },
      {
        "cue": "뒤로 처지다",
        "model": "drop back",
        "tier": 3,
        "star": true,
        "easyEn": "move back to a position behind where you were",
        "example": "The runner started strong but dropped back in the last lap.",
        "exampleKo": "그 선수는 초반엔 잘 나가다가 마지막 바퀴에서 뒤로 처졌어."
      },
      {
        "cue": "사라지다 / 떨어져 나가다",
        "model": "drop away",
        "tier": 3,
        "star": true,
        "easyEn": "gradually decrease or disappear over time",
        "example": "A lot of the early signups just dropped away after the free trial ended.",
        "exampleKo": "초반 가입자 상당수가 무료 체험 끝나고 그냥 떨어져 나갔어."
      },
      {
        "cue": "아래로 떨어지다",
        "model": "drop down",
        "tier": 3,
        "star": true,
        "easyEn": "move down to a lower position or level",
        "example": "The temperature's supposed to drop down to freezing tonight.",
        "exampleKo": "오늘 밤 기온이 영하로 뚝 떨어진대."
      },
      {
        "cue": "잠깐 들르다",
        "model": "drop into [place]",
        "tier": 3,
        "star": true,
        "easyEn": "visit a place briefly without planning ahead",
        "example": "I might drop into that new coffee place on Fifth Street later.",
        "exampleKo": "이따 5번가에 새로 생긴 커피숍에 잠깐 들를까 봐."
      },
      {
        "cue": "~을 ~에게 전달하다",
        "model": "drop [thing] to [person/place]",
        "tier": 3,
        "easyEn": "deliver or bring something to a person or place",
        "example": "Can you drop these documents to Sarah before you leave?",
        "exampleKo": "가기 전에 이 서류들 사라한테 좀 전달해 줄래?"
      },
      {
        "cue": "짧게 연락하다",
        "model": "drop [person] a line",
        "tier": 3,
        "easyEn": "send someone a short, casual message",
        "example": "Drop me a line when you land and I'll come pick you up.",
        "exampleKo": "도착하면 짧게 연락 줘, 내가 데리러 갈게."
      },
      {
        "cue": "~에게 예고 없이 불쑥 들르다 / 찾아가다",
        "model": "drop in on [person]",
        "tier": 3,
        "easyEn": "visit someone suddenly without telling them in advance",
        "example": "We were in the neighborhood so we decided to drop in on my grandma.",
        "exampleKo": "동네에 온 김에 할머니한테 불쑥 들르기로 했어."
      }
    ]
  },
  {
    "id": "pass",
    "verb": "PASS",
    "gloss": "pass는 지나가다, 건네다, 통과하다, 전달하다.",
    "items": [
      {
        "cue": "~을 ~에게 건네다",
        "model": "pass [thing] to [person]",
        "tier": 1,
        "star": true,
        "example": "Can you pass the salt to your brother?",
        "exampleKo": "형한테 소금 좀 건네줄래?"
      },
      {
        "cue": "전달하다 / 거절하다",
        "model": "pass on [information/offer]",
        "tier": 2,
        "star": true,
        "example": "I'll pass on the details to the rest of the team.",
        "exampleKo": "나머지 팀원들한테 세부사항 전달할게요."
      },
      {
        "cue": "기절하다 / 나눠주다",
        "model": "pass out",
        "tier": 2,
        "star": true,
        "easyEn": "to suddenly lose consciousness and faint",
        "example": "It was so hot at the concert that a couple of people passed out.",
        "exampleKo": "콘서트장이 너무 더워서 몇 명이 기절했어."
      },
      {
        "cue": "돌아가시다",
        "model": "pass away",
        "tier": 2,
        "star": true,
        "easyEn": "to die",
        "example": "Her grandfather passed away last spring.",
        "exampleKo": "그분 할아버지가 지난봄에 돌아가셨어."
      },
      {
        "cue": "돌리다 / 나눠 돌리다",
        "model": "pass around [thing]",
        "tier": 2,
        "star": true,
        "example": "I'll pass around a signup sheet, so put your name down.",
        "exampleKo": "신청서 돌릴 테니까 이름 적으세요."
      },
      {
        "cue": "지나가다",
        "model": "pass by [place/person]",
        "tier": 2,
        "star": true,
        "example": "I pass by your office every morning on my way to the gym.",
        "exampleKo": "나 매일 아침 헬스장 가는 길에 네 사무실 지나가."
      },
      {
        "cue": "통과하다",
        "model": "pass through [place/process]",
        "tier": 2,
        "star": true,
        "example": "The order still has to pass through customs before it ships.",
        "exampleKo": "그 주문은 배송되기 전에 아직 세관을 통과해야 해."
      },
      {
        "cue": "건너뛰다 / 승진에서 제외하다",
        "model": "pass over [person/thing]",
        "tier": 2,
        "star": true,
        "example": "They passed me over for the promotion again.",
        "exampleKo": "이번에도 승진에서 나를 제외했어."
      },
      {
        "cue": "물려주다",
        "model": "pass down [thing]",
        "tier": 2,
        "star": true,
        "example": "My mom passed this ring down to me.",
        "exampleKo": "엄마가 이 반지를 나한테 물려주셨어."
      },
      {
        "cue": "메시지를 전달하다",
        "model": "pass along [message]",
        "tier": 2,
        "example": "Can you pass along the message to Sarah?",
        "exampleKo": "새라한테 그 메시지 좀 전해줄래?"
      },
      {
        "cue": "기회를 놓치다 / 거절하다",
        "model": "pass up [chance]",
        "tier": 2,
        "easyEn": "to choose not to take an offer or chance",
        "example": "I'm not gonna pass up free tickets to the game.",
        "exampleKo": "경기 공짜 티켓을 놓칠 순 없지."
      },
      {
        "cue": "~을 ~에게 전달하다 / 넘겨주다",
        "model": "pass [thing] on to [person]",
        "tier": 2,
        "star": true,
        "example": "I'll pass this ticket on to whoever's on call tonight.",
        "exampleKo": "이 티켓은 오늘 밤 당직인 사람한테 넘길게요."
      },
      {
        "cue": "~을 ~에게 전달해주다 / 전해주다",
        "model": "pass [thing] along to [person]",
        "tier": 2,
        "example": "Let me pass this feedback along to the design team.",
        "exampleKo": "이 피드백을 디자인 팀에 전해줄게요."
      },
      {
        "cue": "~을 ~인 척하다",
        "model": "pass off [thing] as [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "to falsely present something as something it is not",
        "example": "He tried to pass off a fake watch as a real Rolex.",
        "exampleKo": "그 사람이 가짜 시계를 진짜 롤렉스인 척 팔려고 했어."
      },
      {
        "cue": "~로 통하다",
        "model": "pass for [thing]",
        "tier": 3,
        "easyEn": "to be accepted or mistaken as something else",
        "example": "With that jacket, he could easily pass for a bouncer.",
        "exampleKo": "그 재킷 입으면 그 사람 완전 경비원으로 통하겠어."
      }
    ]
  },
  {
    "id": "hand",
    "verb": "HAND",
    "gloss": "hand는 손으로 건네다, 제출하다, 인계하다.",
    "items": [
      {
        "cue": "~을 ~에게 건네다",
        "model": "hand [thing] to [person]",
        "tier": 1,
        "star": true,
        "example": "Can you hand that stapler to Maria? She's right behind you.",
        "exampleKo": "그 스테이플러 마리아한테 좀 건네줄래? 바로 네 뒤에 있어."
      },
      {
        "cue": "제출하다",
        "model": "hand in [assignment/document]",
        "tier": 2,
        "star": true,
        "example": "I still need to hand in my expense report before Friday.",
        "exampleKo": "금요일 전에 경비 보고서를 제출해야 해."
      },
      {
        "cue": "나눠주다",
        "model": "hand out [thing]",
        "tier": 2,
        "star": true,
        "example": "They were handing out free samples at the entrance.",
        "exampleKo": "입구에서 무료 샘플을 나눠주고 있었어."
      },
      {
        "cue": "넘겨주다 / 인계하다",
        "model": "hand over [thing/task]",
        "tier": 2,
        "star": true,
        "example": "I'm on vacation next week, so I'll hand over the project to Dan.",
        "exampleKo": "다음 주에 휴가라서 이 프로젝트를 댄한테 넘길 거야."
      },
      {
        "cue": "돌려주다",
        "model": "hand back [thing]",
        "tier": 2,
        "star": true,
        "example": "The waiter handed back my card with the receipt.",
        "exampleKo": "웨이터가 영수증이랑 내 카드를 돌려줬어."
      },
      {
        "cue": "물려주다 / 판결을 내리다",
        "model": "hand down [thing]",
        "tier": 2,
        "star": true,
        "example": "My grandpa handed down this watch to my dad.",
        "exampleKo": "할아버지가 이 시계를 우리 아빠한테 물려주셨어."
      },
      {
        "cue": "인계하다",
        "model": "hand off [task]",
        "tier": 2,
        "star": true,
        "example": "Let me finish this ticket, then I'll hand off the rest to QA.",
        "exampleKo": "이 티켓만 끝내고 나머지는 QA한테 인계할게."
      },
      {
        "cue": "~를 ~에게 넘기다",
        "model": "hand [person] over to [authority/team]",
        "tier": 2,
        "star": true,
        "example": "Security handed the guy over to the police.",
        "exampleKo": "보안팀이 그 남자를 경찰에 넘겼어."
      },
      {
        "cue": "~을 ~에게 제출하다",
        "model": "hand [thing] in to [person]",
        "tier": 2,
        "example": "Just hand your timesheet in to Rachel by end of day.",
        "exampleKo": "근무 기록표는 오늘 안으로 레이첼한테 제출해."
      },
      {
        "cue": "~을 ~에게 인계하다 / 넘기다 (업무·작업)",
        "model": "hand [thing] off to [person]",
        "tier": 2,
        "star": true,
        "example": "I'll hand this bug off to Kevin since he wrote that module.",
        "exampleKo": "이 버그는 케빈이 그 모듈을 짰으니까 걔한테 넘길게."
      },
      {
        "cue": "돌리다",
        "model": "hand around [thing]",
        "tier": 3,
        "easyEn": "to give something to each person in a group",
        "example": "She handed around a plate of cookies during the meeting.",
        "exampleKo": "그녀가 회의 중에 쿠키 접시를 돌렸어."
      }
    ]
  },
  {
    "id": "fill",
    "verb": "FILL",
    "gloss": "fill은 채우다, 작성하다, 대신하다, 정보를 알려주다.",
    "items": [
      {
        "cue": "빈칸을 채우다",
        "model": "fill in [blank/form]",
        "tier": 1,
        "star": true,
        "example": "Just fill in your name and email and hit submit.",
        "exampleKo": "이름이랑 이메일만 빈칸에 채우고 제출 누르세요."
      },
      {
        "cue": "양식을 작성하다",
        "model": "fill out [form]",
        "tier": 1,
        "star": true,
        "example": "You'll need to fill out this form before your first visit.",
        "exampleKo": "첫 방문 전에 이 양식을 작성하셔야 해요."
      },
      {
        "cue": "가득 채우다",
        "model": "fill up [tank/bottle]",
        "tier": 2,
        "star": true,
        "example": "Let me fill up the tank before we get on the highway.",
        "exampleKo": "고속도로 타기 전에 기름 가득 채울게."
      },
      {
        "cue": "~을 ~로 채우다",
        "model": "fill [thing] with [thing]",
        "tier": 2,
        "star": true,
        "example": "She filled the jar with cookies for the kids.",
        "exampleKo": "그녀는 아이들 주려고 병을 쿠키로 가득 채웠어."
      },
      {
        "cue": "~를 대신하다",
        "model": "fill in for [person]",
        "tier": 2,
        "star": true,
        "example": "Can you fill in for me at the meeting? I'm out sick.",
        "exampleKo": "회의에서 나 대신 좀 들어가 줄래? 나 몸이 안 좋아서."
      },
      {
        "cue": "~에게 상황을 알려주다",
        "model": "fill [person] in on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to tell someone the details they missed",
        "example": "I missed standup — can you fill me in on what they decided?",
        "exampleKo": "나 스탠드업 놓쳤는데, 뭘 결정했는지 좀 알려줄래?"
      },
      {
        "cue": "시간을 ~로 채우다",
        "model": "fill [time] with [activity]",
        "tier": 2,
        "example": "We filled the afternoon with board games since it was raining.",
        "exampleKo": "비가 와서 오후 시간을 보드게임으로 채웠어."
      },
      {
        "cue": "~로 가득 차다",
        "model": "be filled with [emotion/thing]",
        "tier": 2,
        "example": "The room was filled with laughter when he walked in.",
        "exampleKo": "그가 들어오자 방이 웃음으로 가득 찼어."
      },
      {
        "cue": "~을 재료로 메우다",
        "model": "fill [thing] in with [material]",
        "tier": 3,
        "easyEn": "to put material into a hole to make it full",
        "example": "He filled the cracks in with putty before painting the wall.",
        "exampleKo": "그는 벽을 칠하기 전에 갈라진 틈을 퍼티로 메웠어."
      }
    ]
  },
  {
    "id": "clear",
    "verb": "CLEAR",
    "gloss": "clear는 치우다, 명확하게 하다, 허가받다.",
    "items": [
      {
        "cue": "정리하다 / 해명하다",
        "model": "clear up [confusion/problem]",
        "tier": 2,
        "star": true,
        "example": "Let me clear up the confusion about the deadline — it's Friday, not Monday.",
        "exampleKo": "마감일 관련 혼란을 정리할게요. 월요일이 아니라 금요일이에요."
      },
      {
        "cue": "비우다",
        "model": "clear out [space]",
        "tier": 2,
        "star": true,
        "example": "We need to clear out the garage this weekend before the movers come.",
        "exampleKo": "이사 오기 전에 이번 주말에 차고를 비워야 해."
      },
      {
        "cue": "치우다",
        "model": "clear away [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you clear away these dishes so I can start cooking?",
        "exampleKo": "요리 시작하게 이 접시들 좀 치워 줄래?"
      },
      {
        "cue": "표면을 치우다",
        "model": "clear off [surface]",
        "tier": 2,
        "star": true,
        "example": "Clear off the table — dinner's almost ready.",
        "exampleKo": "테이블 좀 치워, 저녁 거의 다 됐어."
      },
      {
        "cue": "~에게 확인/허가받다",
        "model": "clear [thing] with [person]",
        "tier": 2,
        "star": true,
        "easyEn": "get someone's approval before doing it",
        "example": "I want to clear the new pricing with Sarah before we announce it.",
        "exampleKo": "발표하기 전에 새 가격 정책을 사라한테 확인받고 싶어."
      },
      {
        "cue": "~에서 ~을 치우다",
        "model": "clear [thing] from [place]",
        "tier": 2,
        "star": true,
        "example": "Please clear the boxes from the hallway — someone could trip.",
        "exampleKo": "복도에서 상자들 좀 치워 줘, 누가 걸려 넘어질 수 있어."
      },
      {
        "cue": "~에게 ~을 명확히 해주다",
        "model": "clear [thing] up for [person]",
        "tier": 2,
        "example": "Thanks for clearing that up for me — I totally misread the instructions.",
        "exampleKo": "명확히 해줘서 고마워, 내가 설명을 완전히 잘못 읽었네."
      },
      {
        "cue": "~을 위한 길을 열다",
        "model": "clear the way for [thing]",
        "tier": 2,
        "easyEn": "make it possible for something to happen",
        "example": "Getting the budget approved cleared the way for us to hire two engineers.",
        "exampleKo": "예산이 승인되면서 엔지니어 두 명을 채용할 길이 열렸어."
      },
      {
        "cue": "(오해·문제를) ~와 풀다 / 해소하다",
        "model": "clear [thing] up with [person]",
        "tier": 2,
        "easyEn": "resolve a problem or misunderstanding with someone",
        "example": "I finally cleared up the misunderstanding with my landlord about the rent.",
        "exampleKo": "집주인과 월세에 관한 오해를 드디어 풀었어."
      },
      {
        "cue": "~에 대한 승인 / 허가를 받다 (예: 배포·릴리스 승인)",
        "model": "be cleared for [thing/action]",
        "tier": 2,
        "easyEn": "be officially allowed to do something",
        "example": "We're cleared for release — QA signed off this morning.",
        "exampleKo": "릴리스 승인 났어, QA가 오늘 아침에 사인했어."
      },
      {
        "cue": "통과하다",
        "model": "clear through [process/security]",
        "tier": 3,
        "star": true,
        "easyEn": "to pass an official check or process",
        "example": "It took forever to clear through security at LAX today.",
        "exampleKo": "오늘 LAX에서 보안 검색 통과하는 데 엄청 오래 걸렸어."
      },
      {
        "cue": "~에서 ~을 제거하다",
        "model": "clear [place] of [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "to remove all of something from a place",
        "example": "The crew cleared the road of debris after the storm.",
        "exampleKo": "작업반이 폭풍 후에 도로에서 잔해를 제거했어."
      },
      {
        "cue": "혐의를 벗기다",
        "model": "clear [person] of [charge]",
        "tier": 3,
        "easyEn": "to remove all of something from a place",
        "example": "The new evidence cleared him of all charges.",
        "exampleKo": "새 증거가 그의 모든 혐의를 벗겨 줬어."
      }
    ]
  },
  {
    "id": "clean",
    "verb": "CLEAN",
    "gloss": "clean은 청소, 정리, 제거다.",
    "items": [
      {
        "cue": "정리하다 / 청소하다",
        "model": "clean up [place/code/data]",
        "tier": 1,
        "star": true,
        "example": "Can you clean up this function before we merge? It's got dead code everywhere.",
        "exampleKo": "머지하기 전에 이 함수 좀 정리해줄래? 죽은 코드가 여기저기 널려 있어."
      },
      {
        "cue": "완전히 비우다",
        "model": "clean out [place/container]",
        "tier": 2,
        "star": true,
        "example": "I finally cleaned out the garage this weekend and found my old skateboard.",
        "exampleKo": "이번 주말에 드디어 창고를 싹 비웠는데 옛날 스케이트보드를 찾았어."
      },
      {
        "cue": "표면을 닦다",
        "model": "clean off [surface]",
        "tier": 2,
        "star": true,
        "example": "Let me clean off the counter before I start cooking.",
        "exampleKo": "요리 시작하기 전에 조리대 좀 닦을게."
      },
      {
        "cue": "치우다",
        "model": "clean away [dirt/mess]",
        "tier": 2,
        "star": true,
        "example": "The kids spilled juice, so I'm cleaning away the mess now.",
        "exampleKo": "애들이 주스를 쏟아서 지금 그 난장판을 치우는 중이야."
      },
      {
        "cue": "~뒤를 치우다",
        "model": "clean up after [person/event]",
        "tier": 2,
        "star": true,
        "example": "I'm so tired of cleaning up after my roommate every single day.",
        "exampleKo": "매일같이 룸메이트 뒤치다꺼리하는 거 진짜 지긋지긋해."
      },
      {
        "cue": "~로 닦다",
        "model": "clean [thing] with [tool]",
        "tier": 2,
        "star": true,
        "example": "Just clean the screen with a microfiber cloth, not paper towels.",
        "exampleKo": "화면은 종이 타월 말고 극세사 천으로 닦아."
      },
      {
        "cue": "표면에서 ~을 닦아내다",
        "model": "clean [thing] from [surface]",
        "tier": 2,
        "example": "You can clean the marker off the whiteboard with a little rubbing alcohol.",
        "exampleKo": "화이트보드에 묻은 마커는 소독용 알코올 살짝 쓰면 지울 수 있어."
      },
      {
        "cue": "~에서 ~을 완전히 치우다",
        "model": "clean [thing] out of [place]",
        "tier": 2,
        "example": "We need to clean all the old test files out of the repo.",
        "exampleKo": "레포에서 오래된 테스트 파일들을 전부 걷어내야 해."
      },
      {
        "cue": "~용도로 정리하다",
        "model": "clean [thing] up for [purpose]",
        "tier": 2,
        "example": "I cleaned up the spare room for my parents' visit this weekend.",
        "exampleKo": "이번 주말 부모님 오셔서 손님방을 정리해 뒀어."
      }
    ]
  },
  {
    "id": "cut",
    "verb": "CUT",
    "gloss": "cut은 자르다, 줄이다, 차단하다.",
    "items": [
      {
        "cue": "끊다 / 차단하다",
        "model": "cut off [thing/person]",
        "tier": 1,
        "star": true,
        "example": "My call dropped halfway through, feels like Verizon cut me off.",
        "exampleKo": "통화가 중간에 끊겼어, 버라이즌이 나를 끊어버린 것 같아."
      },
      {
        "cue": "~을 줄이다",
        "model": "cut down on [thing]",
        "tier": 1,
        "star": true,
        "example": "I'm trying to cut down on coffee, so just one cup a day now.",
        "exampleKo": "커피를 줄이려고 해서 이제 하루에 한 잔만 마셔."
      },
      {
        "cue": "잘라내다 / 끊다",
        "model": "cut out [thing]",
        "tier": 2,
        "star": true,
        "example": "I cut out sugar for a month and honestly feel way better.",
        "exampleKo": "한 달 동안 설탕을 끊었는데 솔직히 훨씬 컨디션이 좋아."
      },
      {
        "cue": "~을 줄이다",
        "model": "cut back on [thing]",
        "tier": 2,
        "star": true,
        "example": "We need to cut back on cloud spend before the next invoice hits.",
        "exampleKo": "다음 청구서 나오기 전에 클라우드 비용을 줄여야 해."
      },
      {
        "cue": "끼어들다",
        "model": "cut in",
        "tier": 2,
        "star": true,
        "example": "Sorry to cut in, but we're almost out of time on this topic.",
        "exampleKo": "끼어들어서 미안한데, 이 주제에 시간이 거의 다 됐어."
      },
      {
        "cue": "뚫고 지나가다 / 핵심으로 들어가다",
        "model": "cut through [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "get past obstacles quickly to reach what matters",
        "example": "Let's cut through the noise and just decide who owns the launch.",
        "exampleKo": "쓸데없는 얘기는 접고 누가 이 출시를 맡을지 바로 정하자."
      },
      {
        "cue": "~을 자르다 / 잠식하다",
        "model": "cut into [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "reduce something such as profits or time",
        "example": "The AWS fees are really cutting into our margins this quarter.",
        "exampleKo": "이번 분기에 AWS 요금이 우리 마진을 정말 갉아먹고 있어."
      },
      {
        "cue": "잘게 자르다",
        "model": "cut up [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you cut up the pizza before everyone gets here?",
        "exampleKo": "다들 오기 전에 피자 좀 잘게 잘라줄래?"
      },
      {
        "cue": "~을 계획/예산에서 빼다",
        "model": "cut [thing] from [plan/budget]",
        "tier": 2,
        "example": "We cut the offsite from the budget to save some cash.",
        "exampleKo": "돈을 좀 아끼려고 워크숍을 예산에서 뺐어."
      },
      {
        "cue": "~로부터 단절되다 / 고립되다 (예: 네트워크·팀에서)",
        "model": "be cut off from [people/resource]",
        "tier": 2,
        "easyEn": "be separated or isolated from people or things",
        "example": "During the outage I was totally cut off from the team on Slack.",
        "exampleKo": "장애가 났을 때 슬랙에서 팀과 완전히 단절됐었어."
      },
      {
        "cue": "가로지르다 / 여러 영역에 걸치다",
        "model": "cut across [place/topic]",
        "tier": 3,
        "star": true,
        "easyEn": "go straight across; also apply to many areas",
        "example": "This bug cuts across both the mobile app and the web dashboard.",
        "exampleKo": "이 버그는 모바일 앱과 웹 대시보드 양쪽에 걸쳐 있어."
      },
      {
        "cue": "잘라내다",
        "model": "cut away [thing]",
        "tier": 3,
        "star": true,
        "easyEn": "to remove something by cutting it off",
        "example": "Just cut away the dead branches and the tree will be fine.",
        "exampleKo": "죽은 가지만 잘라내면 나무는 괜찮을 거야."
      },
      {
        "cue": "새 시스템으로 전환하다",
        "model": "cut over to [system]",
        "tier": 3,
        "easyEn": "switch from an old system to a new one",
        "example": "We cut over to the new payment system at midnight and it held up.",
        "exampleKo": "자정에 새 결제 시스템으로 전환했는데 잘 버텼어."
      },
      {
        "cue": "~에 적합하다",
        "model": "be cut out for [role]",
        "tier": 3,
        "easyEn": "have the right qualities for a job",
        "example": "Honestly, I'm not cut out for sales, I hate cold calling.",
        "exampleKo": "솔직히 난 영업에 안 맞아, 콜드콜이 너무 싫어."
      },
      {
        "cue": "대충 처리하다 / 편법으로 줄이다 (품질·절차를 깎다)",
        "model": "cut corners",
        "tier": 3,
        "easyEn": "do work cheaply or quickly, lowering quality",
        "example": "They cut corners on testing and now prod is on fire.",
        "exampleKo": "테스트를 대충 하더니 지금 운영 서버가 난리 났어."
      },
      {
        "cue": "(대화·일에) 끼어들다 / 가로막다",
        "model": "cut in on [person/conversation]",
        "tier": 3,
        "easyEn": "to interrupt someone while they are talking",
        "example": "He kept cutting in on me every time I tried to explain the plan.",
        "exampleKo": "내가 계획을 설명하려고 할 때마다 그가 계속 끼어들었어."
      }
    ]
  },
  {
    "id": "break",
    "verb": "BREAK",
    "gloss": "break는 깨다, 고장 나다, 나누다, 발생하다.",
    "items": [
      {
        "cue": "고장 나다 / 무너지다",
        "model": "break down",
        "tier": 1,
        "star": true,
        "example": "My car broke down on the highway this morning, so I'm running late.",
        "exampleKo": "오늘 아침 고속도로에서 차가 고장 나서 늦고 있어요."
      },
      {
        "cue": "나눠 설명하다 / 분해하다",
        "model": "break [thing] down",
        "tier": 1,
        "star": true,
        "example": "Can you break the pricing down for me? I don't get how we got to $500.",
        "exampleKo": "가격을 좀 나눠서 설명해 줄래요? 어떻게 500달러가 나왔는지 모르겠어요."
      },
      {
        "cue": "헤어지다 / 쪼개다",
        "model": "break up",
        "tier": 1,
        "star": true,
        "example": "The meeting broke up around noon and everyone grabbed lunch.",
        "exampleKo": "회의가 정오쯤 끝나고 다들 점심 먹으러 갔어요."
      },
      {
        "cue": "~와 헤어지다 / 관계를 끝내다",
        "model": "break up with [person]",
        "tier": 1,
        "example": "She broke up with her boyfriend right before the holidays.",
        "exampleKo": "그녀는 연휴 직전에 남자친구와 헤어졌어요."
      },
      {
        "cue": "침입하다 / 길들이다",
        "model": "break in",
        "tier": 2,
        "star": true,
        "example": "Someone broke in through the back window while they were away.",
        "exampleKo": "그들이 없는 사이 누군가 뒷창문으로 침입했어요."
      },
      {
        "cue": "침입하다 / 진입하다",
        "model": "break into [place/field]",
        "tier": 2,
        "star": true,
        "example": "He's trying to break into tech after years in marketing.",
        "exampleKo": "그는 마케팅 일을 몇 년 하고 나서 IT 업계에 진입하려고 하고 있어요."
      },
      {
        "cue": "발생하다",
        "model": "break out",
        "tier": 2,
        "star": true,
        "example": "A fire broke out in the kitchen but nobody got hurt.",
        "exampleKo": "주방에서 불이 났지만 아무도 다치지 않았어요."
      },
      {
        "cue": "~에서 벗어나다",
        "model": "break out of [place/pattern]",
        "tier": 2,
        "star": true,
        "example": "I need to break out of this habit of checking my phone every five minutes.",
        "exampleKo": "5분마다 폰 확인하는 이 습관에서 벗어나야 해요."
      },
      {
        "cue": "중단하다 / 떼어내다",
        "model": "break off [thing]",
        "tier": 2,
        "star": true,
        "example": "They broke off the negotiations after the last offer fell through.",
        "exampleKo": "마지막 제안이 무산된 후 그들은 협상을 중단했어요."
      },
      {
        "cue": "돌파하다",
        "model": "break through [barrier]",
        "tier": 2,
        "star": true,
        "example": "We finally broke through and closed the deal after months of talks.",
        "exampleKo": "몇 달간의 협상 끝에 마침내 돌파해서 계약을 성사시켰어요."
      },
      {
        "cue": "~에서 떨어져 나오다",
        "model": "break away from [group]",
        "tier": 2,
        "star": true,
        "example": "A few engineers broke away from the team to start their own thing.",
        "exampleKo": "엔지니어 몇 명이 팀에서 떨어져 나와 자기들 사업을 시작했어요."
      },
      {
        "cue": "부서지다 / 분해하다",
        "model": "break apart [thing]",
        "tier": 2,
        "star": true,
        "example": "The old chair just broke apart when he sat down on it.",
        "exampleKo": "그가 앉자마자 낡은 의자가 그냥 부서졌어요."
      },
      {
        "cue": "~을 부분으로 나누다",
        "model": "break [thing] into [parts]",
        "tier": 2,
        "example": "Let's break the project into three phases so it feels less overwhelming.",
        "exampleKo": "부담이 덜하도록 프로젝트를 세 단계로 나눠 봅시다."
      },
      {
        "cue": "소식을 조심스럽게 전하다",
        "model": "break [news] to [person]",
        "tier": 2,
        "easyEn": "tell someone about important or upsetting news",
        "example": "I had to break the news to my parents that I'm dropping out.",
        "exampleKo": "부모님께 자퇴한다는 소식을 조심스럽게 전해야 했어요."
      },
      {
        "cue": "손익분기점을 맞추다",
        "model": "break even",
        "tier": 2,
        "easyEn": "earn back exactly what you spent, with no profit or loss",
        "example": "If we sell forty tickets, we break even on the venue.",
        "exampleKo": "티켓을 40장 팔면 대관비 손익분기점을 맞춰요."
      },
      {
        "cue": "~을 더 작은 부분으로 나누다 / 쪼개서 설명하다",
        "model": "break [thing] down into [parts]",
        "tier": 2,
        "star": true,
        "example": "Break the ticket down into smaller tasks so we can split them up.",
        "exampleKo": "나눠서 맡을 수 있게 이 티켓을 더 작은 작업으로 쪼개 주세요."
      },
      {
        "cue": "~와 결별하다",
        "model": "break with [tradition/person]",
        "tier": 3,
        "easyEn": "to stop following a tradition or end a relationship",
        "example": "The new CEO broke with tradition and let everyone work from home.",
        "exampleKo": "새 CEO는 전통과 결별하고 모두가 재택근무하게 했어요."
      },
      {
        "cue": "어색한 분위기를 깨다 / 긴장을 풀다",
        "model": "break the ice",
        "tier": 3,
        "easyEn": "make people feel relaxed in a new social situation",
        "example": "He told a quick joke to break the ice before the interview started.",
        "exampleKo": "면접이 시작되기 전에 그는 어색한 분위기를 깨려고 짧은 농담을 했어요."
      }
    ]
  },
  {
    "id": "fix",
    "verb": "FIX",
    "gloss": "fix는 고치다, 고정하다, 정하다.",
    "items": [
      {
        "cue": "버그/문제를 고치다",
        "model": "fix [bug/problem]",
        "tier": 1,
        "star": true,
        "example": "I think I finally fixed the bug that was crashing the checkout page.",
        "exampleKo": "결제 페이지를 뻗게 만들던 그 버그 드디어 고친 것 같아."
      },
      {
        "cue": "수리하다 / 꾸미다 / 연결해주다",
        "model": "fix up [place/person]",
        "tier": 2,
        "star": true,
        "example": "We spent the whole weekend fixing up the old apartment before we moved in.",
        "exampleKo": "이사 들어가기 전에 주말 내내 그 낡은 아파트 수리했어."
      },
      {
        "cue": "~을 제자리에 고정하다",
        "model": "fix [thing] in [place]",
        "tier": 2,
        "star": true,
        "example": "Make sure you fix the shelf in place before you load it up with books.",
        "exampleKo": "책 올리기 전에 선반부터 제자리에 단단히 고정해."
      },
      {
        "cue": "~을 ~에 고정하다",
        "model": "fix [thing] to [thing]",
        "tier": 2,
        "star": true,
        "example": "Just fix the camera to the tripod and we're good to go.",
        "exampleKo": "카메라를 삼각대에 고정하기만 하면 준비 끝이야."
      },
      {
        "cue": "~을 ~방법으로 고치다",
        "model": "fix [problem] with [method]",
        "tier": 2,
        "star": true,
        "example": "I fixed the login issue with a quick cache clear.",
        "exampleKo": "로그인 문제는 캐시 한 번 비우는 걸로 해결했어."
      },
      {
        "cue": "~을 ~를 위해 고치다",
        "model": "fix [thing] for [person]",
        "tier": 3,
        "star": true,
        "easyEn": "decide on a specific date or time for something",
        "example": "Can you fix the printer for my mom? It's been jamming all week.",
        "exampleKo": "우리 엄마 프린터 좀 고쳐줄 수 있어? 일주일째 종이가 걸려."
      },
      {
        "cue": "~에 집착하다",
        "model": "be fixed on [idea]",
        "tier": 3,
        "easyEn": "focused on one idea and unwilling to change your mind",
        "example": "He's so fixed on launching in June that he won't even consider a delay.",
        "exampleKo": "걔는 6월 출시에 완전히 꽂혀 있어서 연기는 아예 생각도 안 해."
      },
      {
        "cue": "행사 날짜/시간을 정하다",
        "model": "fix [date/time] for [event]",
        "tier": 3,
        "easyEn": "decide on a specific date or time for something",
        "example": "Let's fix a date for the team offsite before everyone's calendar fills up.",
        "exampleKo": "다들 일정 차기 전에 팀 워크숍 날짜부터 정하자."
      },
      {
        "cue": "~을 응시하다",
        "model": "fix [eyes] on [thing]",
        "tier": 3,
        "easyEn": "look at something steadily without looking away",
        "example": "She fixed her eyes on the exit sign and didn't say a word.",
        "exampleKo": "걔는 출구 표지판을 뚫어지게 응시한 채 한 마디도 안 했어."
      },
      {
        "cue": "~의 위치/상황을 파악하다",
        "model": "get a fix on [thing]",
        "tier": 3,
        "easyEn": "get a clear understanding of a situation or location",
        "example": "Give me a sec to get a fix on where the outage is actually coming from.",
        "exampleKo": "장애가 정확히 어디서 나는 건지 파악할 시간 좀 줘."
      }
    ]
  },
  {
    "id": "build",
    "verb": "BUILD",
    "gloss": "build는 만들다, 쌓다, 기반 위에 확장하다.",
    "items": [
      {
        "cue": "쌓아 올리다 / 강화하다",
        "model": "build up [thing]",
        "tier": 2,
        "star": true,
        "example": "She's been building up her savings so she can quit and travel next year.",
        "exampleKo": "그녀는 내년에 일 그만두고 여행하려고 저축을 쌓아 오고 있어."
      },
      {
        "cue": "~을 기반으로 발전시키다",
        "model": "build on [idea/system]",
        "tier": 2,
        "star": true,
        "example": "Let's build on what the last team already figured out instead of starting over.",
        "exampleKo": "처음부터 다시 하지 말고 지난 팀이 이미 알아낸 걸 기반으로 발전시키자."
      },
      {
        "cue": "~안에 포함해 만들다",
        "model": "build into [system/process]",
        "tier": 2,
        "star": true,
        "example": "We built the safety checks right into the deploy pipeline so nobody skips them.",
        "exampleKo": "아무도 건너뛰지 못하게 안전 점검을 배포 파이프라인 안에 아예 넣어서 만들었어."
      },
      {
        "cue": "~에서 시작해 만들다",
        "model": "build from [base]",
        "tier": 2,
        "star": true,
        "example": "I just built the whole app from the free starter template Vercel gives you.",
        "exampleKo": "그냥 Vercel이 주는 무료 스타터 템플릿에서 시작해서 앱 전체를 만들었어."
      },
      {
        "cue": "확장해서 구축하다",
        "model": "build out [system/feature]",
        "tier": 2,
        "star": true,
        "example": "We're building out the reporting feature next sprint, so hold your questions till then.",
        "exampleKo": "다음 스프린트에 리포팅 기능을 확장해서 구축할 거니까 질문은 그때까지 좀 참아줘."
      },
      {
        "cue": "~을 위해 만들다",
        "model": "build for [user/use case]",
        "tier": 2,
        "star": true,
        "example": "We built this for people who've never touched a spreadsheet in their life.",
        "exampleKo": "우리는 이걸 평생 스프레드시트 한 번 안 만져본 사람들을 위해 만들었어."
      },
      {
        "cue": "~로 만들다",
        "model": "build with [tool/material]",
        "tier": 2,
        "star": true,
        "example": "The whole backend is built with Go, and honestly it's been rock solid.",
        "exampleKo": "백엔드 전체를 Go로 만들었는데, 솔직히 엄청 안정적이었어."
      },
      {
        "cue": "~을 중심으로 설계하다",
        "model": "build around [constraint/idea]",
        "tier": 2,
        "star": true,
        "example": "We had to build the whole schedule around the fact that she's only free on weekends.",
        "exampleKo": "그녀가 주말에만 시간이 되는 걸 중심으로 일정을 통째로 짜야 했어."
      },
      {
        "cue": "~을 습관으로 만들다",
        "model": "build [thing] into [habit]",
        "tier": 2,
        "example": "I finally built flossing into my morning routine and it actually stuck.",
        "exampleKo": "드디어 치실 쓰는 걸 아침 루틴에 넣어서 습관으로 만들었는데 진짜 자리 잡았어."
      },
      {
        "cue": "처음부터 만들다",
        "model": "build [thing] from scratch",
        "tier": 2,
        "easyEn": "make something completely new from the beginning",
        "example": "They didn't use any framework — they built the editor from scratch.",
        "exampleKo": "걔네는 아무 프레임워크도 안 쓰고 에디터를 처음부터 만들었어."
      },
      {
        "cue": "시간을 두고 쌓다",
        "model": "build [thing] over time",
        "tier": 2,
        "example": "Trust isn't instant; you build it over time by showing up.",
        "exampleKo": "신뢰는 한 번에 생기는 게 아니라 꾸준히 나타나면서 시간을 두고 쌓는 거야."
      },
      {
        "cue": "~을 향해 점점 고조시키다 / 차근차근 쌓아 나아가다",
        "model": "build up to [thing/event]",
        "tier": 2,
        "example": "The talk kind of drags at first but it really builds up to a great ending.",
        "exampleKo": "그 강연이 처음엔 좀 늘어지는데 마지막엔 정말 멋진 결말로 점점 고조돼."
      },
      {
        "cue": "~ 위에 얹어서 (확장해) 만들다",
        "model": "build on top of [thing/framework]",
        "tier": 2,
        "example": "Our dashboard is built on top of Grafana, so we didn't reinvent the charts.",
        "exampleKo": "우리 대시보드는 Grafana 위에 얹어서 만든 거라 차트를 새로 만들 필요가 없었어."
      },
      {
        "cue": "~의 타당성을 뒷받침할 근거를 모으다",
        "model": "build a case for [decision/change]",
        "tier": 2,
        "easyEn": "gather reasons and evidence to support an idea",
        "example": "I'm putting together the numbers to build a case for hiring one more designer.",
        "exampleKo": "디자이너 한 명 더 뽑자는 걸 뒷받침할 근거를 모으려고 숫자를 정리하고 있어."
      },
      {
        "cue": "~을 기반으로 하다",
        "model": "build upon [idea/system]",
        "tier": 3,
        "star": true,
        "easyEn": "use something as a base to develop it further",
        "example": "This proposal builds upon the research we did last quarter.",
        "exampleKo": "이 제안은 우리가 지난 분기에 했던 연구를 기반으로 한 거야."
      }
    ]
  },
  {
    "id": "open",
    "verb": "OPEN",
    "gloss": "open은 열다, 시작하다, 공개하다.",
    "items": [
      {
        "cue": "열다 / 공개하다 / 마음을 열다",
        "model": "open up [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you open up the staging environment so I can test my branch?",
        "exampleKo": "내 브랜치 테스트하게 스테이징 환경 좀 열어줄래요?"
      },
      {
        "cue": "~에게 개방하다",
        "model": "open [thing] to [person/public]",
        "tier": 2,
        "star": true,
        "example": "We're opening the beta to everyone next Monday.",
        "exampleKo": "다음 주 월요일에 베타를 전체 사용자에게 개방할 거예요."
      },
      {
        "cue": "~용도로 열다",
        "model": "open [thing] for [purpose]",
        "tier": 2,
        "star": true,
        "example": "They opened the parking lot for the farmers market on weekends.",
        "exampleKo": "주말마다 파머스 마켓용으로 주차장을 개방했어요."
      },
      {
        "cue": "~로 시작하다",
        "model": "open with [topic]",
        "tier": 2,
        "star": true,
        "example": "Let's open with last quarter's numbers before we get into the roadmap.",
        "exampleKo": "로드맵 얘기하기 전에 지난 분기 실적으로 시작합시다."
      },
      {
        "cue": "~에서 열리다",
        "model": "open in [app/browser]",
        "tier": 2,
        "star": true,
        "example": "The link just opens in Chrome, not the app.",
        "exampleKo": "그 링크는 앱이 아니라 그냥 크롬에서 열려요."
      },
      {
        "cue": "~에 대해 털어놓다",
        "model": "open up about [feeling/problem]",
        "tier": 2,
        "star": true,
        "example": "He finally opened up about how burned out he's been at work.",
        "exampleKo": "그는 마침내 회사에서 얼마나 번아웃됐는지 털어놨어요."
      },
      {
        "cue": "~에게 마음을 열다",
        "model": "open up to [person]",
        "tier": 2,
        "star": true,
        "example": "It took her a while, but she started to open up to me.",
        "exampleKo": "시간이 좀 걸렸지만 그녀는 나에게 마음을 열기 시작했어요."
      },
      {
        "cue": "~로 계정/파일을 열다",
        "model": "open [account/file] with [provider/app]",
        "tier": 2,
        "example": "I just opened my account with Chime instead of a regular bank.",
        "exampleKo": "일반 은행 대신 그냥 Chime으로 계좌를 열었어요."
      },
      {
        "cue": "~에 열려 있다",
        "model": "be open to [idea]",
        "tier": 2,
        "example": "I'm totally open to switching to Postgres if it's cleaner.",
        "exampleKo": "더 깔끔하다면 Postgres로 바꾸는 것도 얼마든지 열려 있어요."
      },
      {
        "cue": "~에 대해 솔직하게 터놓다 / 숨기지 않다",
        "model": "be open about [thing]",
        "tier": 2,
        "example": "She's really open about her salary, which is kind of refreshing.",
        "exampleKo": "그녀는 자기 연봉을 아주 솔직하게 터놓는데, 좀 신선해요."
      },
      {
        "cue": "~에게 솔직하게 (숨김없이) 대하다",
        "model": "be open with [person]",
        "tier": 2,
        "example": "Just be open with your manager about the deadline slipping.",
        "exampleKo": "마감이 밀리는 거 매니저한테 솔직하게 얘기해요."
      },
      {
        "cue": "~공간으로 이어지다",
        "model": "open into [space]",
        "tier": 3,
        "star": true,
        "easyEn": "lead directly into another room or space",
        "example": "The kitchen opens into the living room, so it feels really big.",
        "exampleKo": "주방이 거실로 이어져서 정말 넓게 느껴져요."
      },
      {
        "cue": "~쪽으로 나 있다",
        "model": "open onto [view/street]",
        "tier": 3,
        "star": true,
        "easyEn": "face or lead directly to a view or street",
        "example": "Our balcony opens onto the harbor, so the view is amazing.",
        "exampleKo": "우리 발코니가 항구 쪽으로 나 있어서 전망이 끝내줘요."
      },
      {
        "cue": "펼쳐지다",
        "model": "open out",
        "tier": 3,
        "easyEn": "become wider or spread out",
        "example": "The trail was narrow at first, then opened out into a wide meadow.",
        "exampleKo": "그 길은 처음엔 좁다가 넓은 초원으로 펼쳐졌어요."
      }
    ]
  },
  {
    "id": "close",
    "verb": "CLOSE",
    "gloss": "close는 닫다, 종료하다, 가까워지다.",
    "items": [
      {
        "cue": "폐업하다 / 종료하다",
        "model": "close down [business/service]",
        "tier": 2,
        "star": true,
        "example": "They're closing down the coffee shop on 5th Street next month.",
        "exampleKo": "다음 달에 5번가에 있는 그 커피숍이 문을 닫는대."
      },
      {
        "cue": "막다 / 차단하다",
        "model": "close off [area/option]",
        "tier": 2,
        "star": true,
        "example": "The cops closed off the whole block after the accident.",
        "exampleKo": "사고 나고 경찰이 그 블록 전체를 막았어."
      },
      {
        "cue": "~에 가까워지다",
        "model": "close in on [target]",
        "tier": 2,
        "star": true,
        "example": "The deadline's closing in on us, so let's hustle.",
        "exampleKo": "마감이 코앞이니까 서두르자."
      },
      {
        "cue": "문을 닫다 / 간격을 좁히다",
        "model": "close up [shop/gap]",
        "tier": 2,
        "star": true,
        "example": "We usually close up around 9 on weeknights.",
        "exampleKo": "평일엔 보통 9시쯤 문 닫아."
      },
      {
        "cue": "마무리하다 / 정산하다",
        "model": "close out [task/account]",
        "tier": 2,
        "star": true,
        "example": "I just need to close out these two tickets and I'm done for the day.",
        "exampleKo": "이 티켓 두 개만 마무리하면 오늘 일 끝이야."
      },
      {
        "cue": "~로 마무리하다",
        "model": "close with [remark/point]",
        "tier": 2,
        "star": true,
        "example": "Let me close with a quick shout-out to the design team.",
        "exampleKo": "디자인 팀에게 간단히 감사 인사하면서 마무리할게요."
      },
      {
        "cue": "~을 일반에 닫다",
        "model": "close [thing] to [public]",
        "tier": 2,
        "star": true,
        "example": "They closed the trail to the public because of the mudslide.",
        "exampleKo": "산사태 때문에 그 등산로를 일반인 출입 금지했어."
      },
      {
        "cue": "계약을 체결하다",
        "model": "close [deal] with [person/company]",
        "tier": 2,
        "example": "We finally closed the deal with Samsung this morning.",
        "exampleKo": "오늘 아침에 드디어 삼성이랑 계약 체결했어."
      },
      {
        "cue": "~에 가깝다",
        "model": "be close to [-ing/noun]",
        "tier": 2,
        "example": "We're really close to hitting our Q2 target.",
        "exampleKo": "우리 2분기 목표 거의 다 왔어."
      },
      {
        "cue": "거의 ~할 뻔하다",
        "model": "come close to [-ing]",
        "tier": 2,
        "example": "I came close to missing my flight this morning.",
        "exampleKo": "오늘 아침에 비행기 놓칠 뻔했어."
      },
      {
        "cue": "~와 친하다 / 가깝게 지내다",
        "model": "be close with [person]",
        "tier": 2,
        "example": "I'm pretty close with my old college roommate.",
        "exampleKo": "나 대학 때 룸메랑 꽤 친해."
      },
      {
        "cue": "~부터 ~까지 닫다",
        "model": "close [thing] from [date] to [date]",
        "tier": 3,
        "star": true,
        "easyEn": "shut a place during a set period of time",
        "example": "The gym is closed from Dec 24 to Jan 2 for the holidays.",
        "exampleKo": "헬스장은 연말이라 12월 24일부터 1월 2일까지 문 닫아."
      }
    ]
  },
  {
    "id": "start",
    "verb": "START",
    "gloss": "start는 시작, 출발, 출신 상태를 만든다.",
    "items": [
      {
        "cue": "다시 시작하다",
        "model": "start over",
        "tier": 1,
        "star": true,
        "example": "This design isn't working. Let's just scrap it and start over.",
        "exampleKo": "이 디자인은 안 되겠어. 그냥 엎고 다시 시작하자."
      },
      {
        "cue": "~부터 시작하다",
        "model": "start with [thing]",
        "tier": 1,
        "star": true,
        "example": "Let's start with the easy tickets and save the hard ones for tomorrow.",
        "exampleKo": "쉬운 티켓부터 시작하고 어려운 건 내일로 미루자."
      },
      {
        "cue": "~하기 시작하다",
        "model": "start to [verb]",
        "tier": 1,
        "example": "It started to rain right as we left the office.",
        "exampleKo": "우리가 사무실을 나서자마자 비가 오기 시작했어."
      },
      {
        "cue": "~하기 시작하다",
        "model": "start [-ing]",
        "tier": 1,
        "example": "I started using Notion for my notes and I'm never going back.",
        "exampleKo": "메모를 노션으로 쓰기 시작했는데 이제 다시는 안 돌아갈 거야."
      },
      {
        "cue": "~을 시작하다",
        "model": "get started on [thing]",
        "tier": 1,
        "example": "Can you get started on the deck? The client meeting is Friday.",
        "exampleKo": "발표 자료 시작해 줄래? 클라이언트 미팅이 금요일이야."
      },
      {
        "cue": "시작하다 / 시동 걸다",
        "model": "start up [company/system]",
        "tier": 2,
        "star": true,
        "example": "He started up a little coffee shop right after college.",
        "exampleKo": "그는 대학 졸업하자마자 작은 커피숍을 차렸어."
      },
      {
        "cue": "시작하다",
        "model": "start off",
        "tier": 2,
        "star": true,
        "example": "Let's start off with quick intros before we dive in.",
        "exampleKo": "본격적으로 들어가기 전에 간단한 자기소개로 시작하죠."
      },
      {
        "cue": "~로 시작하다",
        "model": "start off with [thing]",
        "tier": 2,
        "star": true,
        "example": "We started off with tacos and honestly should've stopped there.",
        "exampleKo": "우리 타코로 시작했는데 솔직히 거기서 멈췄어야 했어."
      },
      {
        "cue": "시작하다",
        "model": "start out",
        "tier": 2,
        "star": true,
        "example": "We started out really strong but kind of lost steam by Q3.",
        "exampleKo": "우리 처음엔 정말 잘 나갔는데 3분기쯤 되니까 좀 힘이 빠졌어."
      },
      {
        "cue": "~로 시작하다",
        "model": "start out as [role]",
        "tier": 2,
        "star": true,
        "example": "She started out as an intern and now she runs the whole team.",
        "exampleKo": "그녀는 인턴으로 시작해서 지금은 팀 전체를 이끌고 있어."
      },
      {
        "cue": "~을 시작하다",
        "model": "start on [task]",
        "tier": 2,
        "star": true,
        "example": "I'll start on the bug fix after lunch.",
        "exampleKo": "점심 먹고 버그 수정 시작할게."
      },
      {
        "cue": "~에서 시작하다",
        "model": "start from [point]",
        "tier": 2,
        "star": true,
        "example": "Just start from the top and read me the whole error.",
        "exampleKo": "그냥 처음부터 시작해서 에러 전체를 읽어 줘."
      },
      {
        "cue": "~하는 것으로 시작하다",
        "model": "start by [-ing]",
        "tier": 2,
        "star": true,
        "example": "Let's start by figuring out who's actually blocked.",
        "exampleKo": "실제로 누가 막혀 있는지 파악하는 것부터 시작하자."
      },
      {
        "cue": "~분야/장소에서 시작하다",
        "model": "start in [field/place]",
        "tier": 2,
        "star": true,
        "example": "She started in marketing before she switched over to product.",
        "exampleKo": "그녀는 프로덕트로 옮기기 전에 마케팅에서 시작했어."
      },
      {
        "cue": "~로 시작하다",
        "model": "start as [role]",
        "tier": 2,
        "example": "I started as a barista at Starbucks when I was nineteen.",
        "exampleKo": "나 열아홉 살 때 스타벅스에서 바리스타로 시작했어."
      },
      {
        "cue": "~하는 것으로 시작하다 (발표/설명 도입)",
        "model": "start off by [-ing]",
        "tier": 2,
        "example": "I'll start off by walking you through last week's numbers.",
        "exampleKo": "지난주 수치를 짚어 드리는 것으로 시작하겠습니다."
      },
      {
        "cue": "~을 다시 가동하다 / 재시작하다 (서버/서비스)",
        "model": "start [thing] back up",
        "tier": 2,
        "example": "Can you start the staging server back up? It went down overnight.",
        "exampleKo": "스테이징 서버 다시 켜 줄 수 있어? 밤사이에 내려갔어."
      }
    ]
  },
  {
    "id": "stop",
    "verb": "STOP",
    "gloss": "stop은 멈추다, 막다, 들르다.",
    "items": [
      {
        "cue": "잠깐 들르다",
        "model": "stop by [place]",
        "tier": 1,
        "star": true,
        "easyEn": "visit a place for a short time",
        "example": "I'll stop by your desk after lunch to grab those files.",
        "exampleKo": "점심 먹고 네 자리에 잠깐 들러서 그 파일들 가져갈게."
      },
      {
        "cue": "~가 ~하지 못하게 막다",
        "model": "stop [person] from [-ing]",
        "tier": 1,
        "star": true,
        "example": "Nothing's stopping me from just deploying it right now.",
        "exampleKo": "지금 바로 배포하는 걸 막을 건 아무것도 없어."
      },
      {
        "cue": "~에서 멈추다",
        "model": "stop at [place/point]",
        "tier": 1,
        "star": true,
        "example": "Let's stop at the coffee shop on the corner before the meeting.",
        "exampleKo": "회의 전에 모퉁이 커피숍에 들르자."
      },
      {
        "cue": "~하던 것을 멈추다",
        "model": "stop doing [thing]",
        "tier": 1,
        "star": true,
        "example": "You need to stop refreshing the dashboard every five seconds.",
        "exampleKo": "5초마다 대시보드 새로고침하는 거 좀 그만해."
      },
      {
        "cue": "~하기 위해 멈추다",
        "model": "stop to do [thing]",
        "tier": 1,
        "star": true,
        "example": "He stopped to tie his shoe and totally lost the group.",
        "exampleKo": "걔가 신발끈 묶으려고 멈췄다가 일행을 완전히 놓쳤어."
      },
      {
        "cue": "잠깐 들르다",
        "model": "stop in [place]",
        "tier": 2,
        "star": true,
        "easyEn": "visit a place for a short time",
        "example": "Can you stop in at the pharmacy and pick up my prescription?",
        "exampleKo": "약국에 잠깐 들러서 내 처방약 좀 받아다 줄래?"
      },
      {
        "cue": "가는 길에 들르다",
        "model": "stop off [place]",
        "tier": 2,
        "star": true,
        "easyEn": "stop somewhere briefly during a trip",
        "example": "We stopped off at a diner on the way to Chicago.",
        "exampleKo": "시카고 가는 길에 식당에 잠깐 들렀어."
      },
      {
        "cue": "경유하다",
        "model": "stop over [place]",
        "tier": 2,
        "star": true,
        "easyEn": "stay somewhere briefly while traveling to another place",
        "example": "Our flight stops over in Tokyo for about three hours.",
        "exampleKo": "우리 비행기는 도쿄에서 세 시간 정도 경유해."
      },
      {
        "cue": "~을 위해 멈추다",
        "model": "stop for [thing]",
        "tier": 2,
        "star": true,
        "example": "Let's stop for gas before we hit the highway.",
        "exampleKo": "고속도로 타기 전에 기름 넣으러 잠깐 멈추자."
      },
      {
        "cue": "멈추다",
        "model": "come to a stop",
        "tier": 2,
        "example": "The train slowly came to a stop right before our platform.",
        "exampleKo": "기차가 우리 승강장 바로 앞에서 천천히 멈췄어."
      },
      {
        "cue": "~을 중단시키다 / 그만두게 하다",
        "model": "put a stop to [thing]",
        "tier": 2,
        "example": "Management finally put a stop to the endless Friday meetings.",
        "exampleKo": "경영진이 드디어 끝없는 금요일 회의를 중단시켰어."
      },
      {
        "cue": "막다",
        "model": "stop up [hole/drain]",
        "tier": 3,
        "easyEn": "block or plug an opening",
        "example": "Some hair stopped up the drain and now the sink won't empty.",
        "exampleKo": "머리카락이 배수구를 막아서 이제 싱크대 물이 안 빠져."
      },
      {
        "cue": "~까지는 하지 않다",
        "model": "stop short of [-ing]",
        "tier": 3,
        "easyEn": "almost do something but decide not to",
        "example": "He stopped short of quitting, but he made it clear he was fed up.",
        "exampleKo": "걔가 그만두기 직전까지 갔지만, 진짜 지쳤다는 건 확실히 티 냈어."
      }
    ]
  },
  {
    "id": "say",
    "verb": "SAY",
    "gloss": "say는 말하다, 표현하다, 암시하다.",
    "items": [
      {
        "cue": "~에게 ~라고 말하다",
        "model": "say [thing] to [person]",
        "tier": 1,
        "star": true,
        "example": "Did you say that to Rachel, or are you just telling me?",
        "exampleKo": "그거 레이철한테 말한 거야, 아니면 나한테만 말하는 거야?"
      },
      {
        "cue": "~에 대해 뭔가를 보여주다/말하다",
        "model": "say something about [thing]",
        "tier": 1,
        "star": true,
        "example": "The fact that he showed up early says something about how much he wants this job.",
        "exampleKo": "그가 일찍 나타났다는 건 이 일을 얼마나 원하는지 뭔가를 말해줘."
      },
      {
        "cue": "~에 동의하다/거절하다",
        "model": "say yes/no to [thing]",
        "tier": 1,
        "star": true,
        "example": "I already said yes to the Friday meeting, so I can't move it.",
        "exampleKo": "금요일 회의는 이미 하겠다고 했어서 못 옮겨."
      },
      {
        "cue": "~을 ~언어/방식으로 말하다",
        "model": "say [thing] in [language/way]",
        "tier": 1,
        "star": true,
        "example": "How do you say \"deadline\" in Korean?",
        "exampleKo": "\"deadline\"을 한국어로 어떻게 말해?"
      },
      {
        "cue": "소리 내어 말하다",
        "model": "say [thing] out loud",
        "tier": 1,
        "star": true,
        "example": "Just say the number out loud so we all hear it.",
        "exampleKo": "그 숫자 소리 내서 말해봐, 우리 다 들을 수 있게."
      },
      {
        "cue": "~라고 말하다 (간접화법)",
        "model": "say (that) [sentence]",
        "tier": 1,
        "star": true,
        "example": "She said the demo got pushed to next week.",
        "exampleKo": "데모가 다음 주로 밀렸다고 하더라."
      },
      {
        "cue": "말할 필요도 없다",
        "model": "go without saying",
        "tier": 2,
        "star": true,
        "easyEn": "be so obvious it does not need saying",
        "example": "It goes without saying, but back up your work before the migration.",
        "exampleKo": "말할 필요도 없지만, 마이그레이션 전에 작업 백업해."
      },
      {
        "cue": "그것은 ~에 대해 많은 것을 보여준다",
        "model": "that says a lot about [person/thing]",
        "tier": 2,
        "easyEn": "it shows something important about someone or something",
        "example": "He remembered everyone's name on day one — that says a lot about him.",
        "exampleKo": "그는 첫날에 모두의 이름을 다 외웠어, 그건 그에 대해 많은 걸 보여줘."
      },
      {
        "cue": "확실히 말하다",
        "model": "say for sure",
        "tier": 2,
        "example": "I can't say for sure until I see the logs.",
        "exampleKo": "로그를 봐야 확실히 말할 수 있어."
      },
      {
        "cue": "혼잣말하다",
        "model": "say to oneself",
        "tier": 2,
        "example": "I said to myself, just ship it and fix the rest later.",
        "exampleKo": "그냥 일단 배포하고 나머지는 나중에 고치자고 혼잣말했어."
      },
      {
        "cue": "~인 것 같다 / 아마 ~일 것이다 (조심스러운 추측·완충)",
        "model": "I'd say (that) [sentence]",
        "tier": 2,
        "example": "I'd say it'll take about two hours to wrap up.",
        "exampleKo": "마무리하는 데 두 시간쯤 걸릴 것 같아."
      },
      {
        "cue": "말할 것도 없이 / 당연히",
        "model": "needless to say",
        "tier": 2,
        "example": "Needless to say, the client was not happy about the delay.",
        "exampleKo": "말할 것도 없이, 고객은 그 지연에 대해 기분이 좋지 않았어."
      },
      {
        "cue": "아무리 줄여 말해도 그 정도다 (절제된 표현)",
        "model": "to say the least",
        "tier": 2,
        "easyEn": "the truth is even stronger than what was said",
        "example": "The launch was rough, to say the least.",
        "exampleKo": "이번 출시는, 아무리 좋게 말해도, 순탄치 않았어."
      },
      {
        "cue": "중얼거리다",
        "model": "say [thing] under one’s breath",
        "tier": 3,
        "star": true,
        "easyEn": "say something very quietly so others barely hear",
        "example": "He said \"finally\" under his breath when the build passed.",
        "exampleKo": "빌드가 통과되자 그는 \"드디어\"라고 나지막이 중얼거렸어."
      }
    ]
  },
  {
    "id": "tell",
    "verb": "TELL",
    "gloss": "tell은 알려주다, 구분하다, 혼내다.",
    "items": [
      {
        "cue": "~에게 ~에 대해 말해주다",
        "model": "tell [person] about [thing]",
        "tier": 1,
        "star": true,
        "example": "Did you tell Sarah about the meeting getting moved to 3?",
        "exampleKo": "회의가 3시로 옮겨진 거 세라한테 말했어?"
      },
      {
        "cue": "~에게 ~하라고 말하다",
        "model": "tell [person] to [verb]",
        "tier": 1,
        "star": true,
        "example": "My boss told me to redo the whole slide deck before Friday.",
        "exampleKo": "상사가 금요일 전까지 슬라이드 전체를 다시 만들라고 했어."
      },
      {
        "cue": "A와 B 차이를 말하다",
        "model": "tell the difference between A and B",
        "tier": 1,
        "star": true,
        "example": "Honestly, I can't tell the difference between these two fonts.",
        "exampleKo": "솔직히 이 두 폰트 차이를 못 알아보겠어."
      },
      {
        "cue": "~에게 ~을 말해주다 (예: tell me the answer)",
        "model": "tell [person] [thing]",
        "tier": 1,
        "star": true,
        "example": "Just tell me the price and I'll decide right now.",
        "exampleKo": "그냥 가격만 말해줘, 지금 바로 결정할게."
      },
      {
        "cue": "~에게 ~라고 말해주다 (간접화법)",
        "model": "tell [person] (that) [sentence]",
        "tier": 1,
        "star": true,
        "example": "She told me she's not coming to the standup today.",
        "exampleKo": "그녀가 오늘 스탠드업에 안 온다고 나한테 말했어."
      },
      {
        "cue": "~인 걸 알 수 있다 / 보면 안다",
        "model": "I can tell (that) [sentence]",
        "tier": 1,
        "star": true,
        "easyEn": "I can notice or sense it is true",
        "example": "I can tell you didn't sleep last night.",
        "exampleKo": "너 어젯밤에 못 잔 거 딱 보면 알아."
      },
      {
        "cue": "A와 B를 구별하다",
        "model": "tell apart A and B",
        "tier": 2,
        "star": true,
        "easyEn": "see the difference between two similar things",
        "example": "The twins look so alike I can't tell them apart.",
        "exampleKo": "쌍둥이가 너무 닮아서 둘을 구별 못 하겠어."
      },
      {
        "cue": "A와 B를 구별하다",
        "model": "tell A from B",
        "tier": 2,
        "star": true,
        "easyEn": "see the difference between two things",
        "example": "Can you even tell real leather from fake?",
        "exampleKo": "진짜 가죽이랑 가짜 가죽 구별할 수 있어?"
      },
      {
        "cue": "혼내다",
        "model": "tell off [person]",
        "tier": 2,
        "star": true,
        "easyEn": "angrily criticize someone for doing something wrong",
        "example": "The manager told him off in front of the whole team.",
        "exampleKo": "매니저가 팀 전체 앞에서 그를 혼냈어."
      },
      {
        "cue": "고자질하다",
        "model": "tell on [person]",
        "tier": 2,
        "star": true,
        "easyEn": "report someone's bad behavior to an authority",
        "example": "Don't tell on me if I skip the last session.",
        "exampleKo": "나 마지막 세션 빠져도 고자질하지 마."
      },
      {
        "cue": "~을 보고 알 수 있다",
        "model": "tell by [sign]",
        "tier": 2,
        "star": true,
        "easyEn": "know something from a sign or clue",
        "example": "I could tell by her face that the demo went badly.",
        "exampleKo": "그녀 표정을 보고 데모가 잘 안 됐다는 걸 알았어."
      },
      {
        "cue": "경험상 ~에게 말하다",
        "model": "tell [person] from experience",
        "tier": 2,
        "example": "Let me tell you from experience, don't deploy on a Friday.",
        "exampleKo": "경험상 말하는데, 금요일에는 배포하지 마."
      },
      {
        "cue": "사실대로 말하면 / 솔직히 말하면",
        "model": "to tell (you) the truth",
        "tier": 2,
        "easyEn": "speaking honestly",
        "example": "To tell you the truth, I never liked that logo.",
        "exampleKo": "솔직히 말하면, 나 그 로고 한 번도 안 좋아했어."
      },
      {
        "cue": "~는 알 수 없다 / 예측할 수 없다",
        "model": "there's no telling [what/how ...]",
        "tier": 2,
        "easyEn": "it is impossible to know or predict",
        "example": "There's no telling how long this outage will last.",
        "exampleKo": "이 장애가 얼마나 갈지는 알 수가 없어."
      },
      {
        "cue": "~을 ~했다고 혼내다 / 나무라다",
        "model": "tell [person] off for [-ing]",
        "tier": 2,
        "easyEn": "angrily criticize someone for doing something",
        "example": "She told me off for pushing straight to main.",
        "exampleKo": "내가 메인에 바로 푸시했다고 그녀가 나를 나무랐어."
      },
      {
        "cue": "~에 대해 말하다",
        "model": "tell of [thing]",
        "tier": 3,
        "easyEn": "describe or talk about something",
        "example": "The report tells of a major shift in user behavior.",
        "exampleKo": "그 보고서는 사용자 행동의 큰 변화에 대해 말하고 있어."
      },
      {
        "cue": "~에게 불리하게 작용하다",
        "model": "tell against [person]",
        "tier": 3,
        "easyEn": "be a disadvantage to someone",
        "example": "Missing the deadline is going to tell against us at review.",
        "exampleKo": "마감을 놓친 게 평가 때 우리에게 불리하게 작용할 거야."
      },
      {
        "cue": "솔직히 말하다",
        "model": "tell [person] straight",
        "tier": 3,
        "easyEn": "tell someone honestly and directly",
        "example": "Let me tell you straight, the design just isn't working.",
        "exampleKo": "솔직히 말할게, 그 디자인은 그냥 안 먹혀."
      }
    ]
  },
  {
    "id": "ask",
    "verb": "ASK",
    "gloss": "ask는 묻다, 요청하다, 초대하다.",
    "items": [
      {
        "cue": "~을 요청하다",
        "model": "ask for [thing/help]",
        "tier": 1,
        "star": true,
        "example": "If you get stuck on the deploy, just ask for help in the channel.",
        "exampleKo": "배포하다 막히면 그냥 채널에 도움을 요청해."
      },
      {
        "cue": "~에 대해 묻다",
        "model": "ask about [thing]",
        "tier": 1,
        "star": true,
        "example": "A few users asked about the new pricing, so I put up a FAQ.",
        "exampleKo": "몇몇 사용자가 새 요금제에 대해 물어봐서 FAQ를 올렸어."
      },
      {
        "cue": "~에게 ~해달라고 요청하다",
        "model": "ask [person] to [verb]",
        "tier": 1,
        "star": true,
        "example": "Can you ask Mike to review my PR before lunch?",
        "exampleKo": "점심 전에 마이크한테 내 PR 리뷰해달라고 요청해줄래?"
      },
      {
        "cue": "~에게 ~에 대해 묻다",
        "model": "ask [person] about [thing]",
        "tier": 1,
        "example": "I asked Sarah about the deadline and she said Friday.",
        "exampleKo": "세라한테 마감일에 대해 물어봤더니 금요일이래."
      },
      {
        "cue": "~에게 ~을 요청하다",
        "model": "ask [person] for [thing]",
        "tier": 1,
        "example": "I asked my manager for a day off next Monday.",
        "exampleKo": "다음 주 월요일에 쉬겠다고 매니저한테 요청했어."
      },
      {
        "cue": "여기저기 물어보다",
        "model": "ask around",
        "tier": 2,
        "star": true,
        "example": "I don't know a good dentist here, but I'll ask around.",
        "exampleKo": "여기 괜찮은 치과는 모르는데, 여기저기 물어볼게."
      },
      {
        "cue": "데이트 신청하다",
        "model": "ask [person] out",
        "tier": 2,
        "star": true,
        "easyEn": "invite someone to go on a date",
        "example": "He finally asked her out after months of hesitating.",
        "exampleKo": "그는 몇 달을 망설이다가 드디어 그녀한테 데이트 신청했어."
      },
      {
        "cue": "들어오라고 하다",
        "model": "ask [person] in",
        "tier": 2,
        "star": true,
        "example": "She was standing at the door, so I asked her in for coffee.",
        "exampleKo": "그녀가 문 앞에 서 있길래 커피 마시라고 들어오라고 했어."
      },
      {
        "cue": "집에 초대하다",
        "model": "ask [person] over",
        "tier": 2,
        "star": true,
        "easyEn": "invite someone to come to your home",
        "example": "Why don't we ask the new neighbors over for dinner this weekend?",
        "exampleKo": "이번 주말에 새 이웃을 저녁 식사에 집으로 초대하는 게 어때?"
      },
      {
        "cue": "~에게 ~을 요구하다",
        "model": "ask [thing] of [person]",
        "tier": 2,
        "star": true,
        "easyEn": "request something from someone",
        "example": "This job asks a lot of you, especially during crunch time.",
        "exampleKo": "이 일은 특히 마감 기간에 너한테 많은 걸 요구해."
      },
      {
        "cue": "~을 찾으려고 여기저기 묻다",
        "model": "ask around for [thing]",
        "tier": 2,
        "example": "I asked around for a charger but nobody had one that fit.",
        "exampleKo": "충전기를 찾으려고 여기저기 물어봤는데 맞는 걸 가진 사람이 없었어."
      },
      {
        "cue": "어서 물어봐 / 얼마든지 물어봐",
        "model": "ask away",
        "tier": 2,
        "easyEn": "feel free to ask as much as you want",
        "example": "Sure, I've got time before the standup—ask away.",
        "exampleKo": "물론이지, 스탠드업 전까지 시간 있어. 얼마든지 물어봐."
      },
      {
        "cue": "안부를 묻다",
        "model": "ask after [person]",
        "tier": 3,
        "star": true,
        "easyEn": "ask how someone is doing",
        "example": "My grandma always asks after you when I call her.",
        "exampleKo": "우리 할머니는 내가 전화할 때마다 항상 네 안부를 물으셔."
      }
    ]
  },
  {
    "id": "talk",
    "verb": "TALK",
    "gloss": "talk는 대화, 논의, 설득을 만든다.",
    "items": [
      {
        "cue": "~에게 말하다",
        "model": "talk to [person]",
        "tier": 1,
        "star": true,
        "example": "I'll talk to Sarah about the deadline and get back to you.",
        "exampleKo": "내가 사라한테 마감일 얘기해보고 다시 알려줄게."
      },
      {
        "cue": "~와 이야기하다",
        "model": "talk with [person]",
        "tier": 1,
        "star": true,
        "example": "I need to talk with my manager before I commit to anything.",
        "exampleKo": "뭐라도 확정하기 전에 매니저랑 얘기해봐야 해."
      },
      {
        "cue": "~에 대해 말하다",
        "model": "talk about [thing]",
        "tier": 1,
        "star": true,
        "example": "Can we talk about the budget for a sec?",
        "exampleKo": "잠깐 예산 얘기 좀 할 수 있을까?"
      },
      {
        "cue": "논의하다",
        "model": "talk over [issue]",
        "tier": 2,
        "star": true,
        "easyEn": "discuss something together",
        "example": "Let's talk over the pricing when you're free this afternoon.",
        "exampleKo": "오늘 오후에 시간 되면 가격 건 좀 논의하자."
      },
      {
        "cue": "차근차근 이야기하며 설명하다",
        "model": "talk through [problem/process]",
        "tier": 2,
        "star": true,
        "easyEn": "discuss something step by step",
        "example": "Hold on, let's talk through the whole deploy step by step.",
        "exampleKo": "잠깐, 배포 과정 처음부터 차근차근 얘기해보자."
      },
      {
        "cue": "~에게 과정을 설명해주다",
        "model": "talk [person] through [process]",
        "tier": 2,
        "star": true,
        "easyEn": "explain a process to someone step by step",
        "example": "Don't worry, I'll talk you through the setup on a quick call.",
        "exampleKo": "걱정 마, 짧게 통화하면서 설정 과정 하나씩 알려줄게."
      },
      {
        "cue": "깔보듯 말하다",
        "model": "talk down to [person]",
        "tier": 2,
        "star": true,
        "easyEn": "speak to someone as if they are not smart",
        "example": "I hate how that vendor talks down to us like we don't get it.",
        "exampleKo": "그 업체가 우리가 뭘 모르는 것처럼 깔보듯 말하는 게 너무 싫어."
      },
      {
        "cue": "설득해서 ~하게 하다",
        "model": "talk [person] into [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "persuade someone to do something",
        "example": "My roommate talked me into signing up for the gym.",
        "exampleKo": "룸메이트가 나 설득해서 헬스장 등록하게 했어."
      },
      {
        "cue": "설득해서 ~하지 않게 하다",
        "model": "talk [person] out of [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "persuade someone not to do something",
        "example": "I tried to talk her out of quitting, but she'd made up her mind.",
        "exampleKo": "그녀가 그만두지 않게 설득하려고 했는데 이미 마음을 굳혔더라."
      },
      {
        "cue": "말대꾸하다",
        "model": "talk back to [person]",
        "tier": 2,
        "star": true,
        "easyEn": "reply rudely to someone in authority",
        "example": "He got in trouble for talking back to his teacher.",
        "exampleKo": "걔는 선생님한테 말대꾸하다가 혼났어."
      },
      {
        "cue": "좋게 말하다 / 띄워주다",
        "model": "talk up [thing/person]",
        "tier": 2,
        "easyEn": "praise something to make it sound better",
        "example": "The recruiter really talked up the company during my interview.",
        "exampleKo": "면접 때 채용 담당자가 회사를 엄청 띄워주더라."
      },
      {
        "cue": "핵심을 피해서 말하다",
        "model": "talk around [issue]",
        "tier": 3,
        "star": true,
        "easyEn": "avoid discussing the main point directly",
        "example": "Stop talking around it and just tell me if we're over budget.",
        "exampleKo": "빙빙 돌리지 말고 예산 초과인지 아닌지 그냥 말해줘."
      },
      {
        "cue": "일 얘기만 하다",
        "model": "talk shop",
        "tier": 3,
        "easyEn": "talk about work in a social situation",
        "example": "We promised no talking shop at dinner, but here we are.",
        "exampleKo": "저녁 자리에선 일 얘기 안 하기로 했는데 또 하고 있네."
      },
      {
        "cue": "~관점에서 말하다",
        "model": "talk in terms of [thing]",
        "tier": 3,
        "easyEn": "describe something using a particular measure or idea",
        "example": "Can you talk in terms of hours instead of story points?",
        "exampleKo": "스토리 포인트 말고 시간 기준으로 말해줄 수 있어?"
      },
      {
        "cue": "진정시키다 / 설득해서 (가격을) 깎게 하다",
        "model": "talk [person] down",
        "tier": 3,
        "easyEn": "calmly persuade someone to be less upset or to lower a price",
        "example": "She was panicking, so I talked her down before the demo.",
        "exampleKo": "그녀가 패닉이라서 데모 전에 내가 진정시켰어."
      },
      {
        "cue": "(말이 어긋나) 서로 딴소리하다 / 소통이 안 되다",
        "model": "talk past [person]",
        "tier": 3,
        "easyEn": "keep missing each other's point when talking",
        "example": "We spent the whole meeting talking past each other.",
        "exampleKo": "우리 회의 내내 서로 딴소리만 하고 소통이 안 됐어."
      }
    ]
  },
  {
    "id": "call",
    "verb": "CALL",
    "gloss": "call은 부르다, 전화하다, 취소하다, 지적하다.",
    "items": [
      {
        "cue": "다시 전화하다",
        "model": "call back [person]",
        "tier": 1,
        "star": true,
        "example": "Can you call me back after lunch? I'm heading into a meeting.",
        "exampleKo": "점심 먹고 나서 다시 전화해 줄래? 나 지금 회의 들어가."
      },
      {
        "cue": "취소하다",
        "model": "call off [event/plan]",
        "tier": 2,
        "star": true,
        "easyEn": "cancel something that was planned",
        "example": "They called off the picnic because it started pouring.",
        "exampleKo": "비가 쏟아지기 시작해서 소풍을 취소했어."
      },
      {
        "cue": "지적하다",
        "model": "call out [person/problem]",
        "tier": 2,
        "star": true,
        "easyEn": "publicly criticize someone or name a problem openly",
        "example": "Someone finally called out the bug in the deploy script during standup.",
        "exampleKo": "누군가 스탠드업에서 드디어 배포 스크립트의 버그를 지적했어."
      },
      {
        "cue": "~에 대해 ~를 지적하다",
        "model": "call [person] out on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "publicly criticize someone for something they did",
        "example": "She called me out on skipping the code review, and honestly she was right.",
        "exampleKo": "그녀가 내가 코드 리뷰를 건너뛴 걸 지적했는데, 솔직히 맞는 말이었어."
      },
      {
        "cue": "부르다 / 투입하다",
        "model": "call in [person]",
        "tier": 2,
        "star": true,
        "easyEn": "ask someone to come in to help or work",
        "example": "We had to call in a backend engineer to fix the outage.",
        "exampleKo": "장애를 해결하려고 백엔드 엔지니어를 투입해야 했어."
      },
      {
        "cue": "병가 전화하다",
        "model": "call in sick",
        "tier": 2,
        "star": true,
        "easyEn": "phone work to say you are too sick to come",
        "example": "I'm gonna call in sick tomorrow; I can barely get out of bed.",
        "exampleKo": "내일 병가 전화할 거야. 침대에서 일어나지도 못하겠어."
      },
      {
        "cue": "지명하다 / 요청하다",
        "model": "call on [person]",
        "tier": 2,
        "star": true,
        "easyEn": "ask someone to speak, or ask them for help",
        "example": "The teacher called on me right when I wasn't paying attention.",
        "exampleKo": "내가 딴생각하고 있을 때 선생님이 딱 나를 지명했어."
      },
      {
        "cue": "전화하다 / 불러오다",
        "model": "call up [person/info]",
        "tier": 2,
        "star": true,
        "easyEn": "phone someone, or bring up information on a screen",
        "example": "Let me call up the invoice and check the total real quick.",
        "exampleKo": "청구서를 화면에 불러와서 총액을 빨리 확인해 볼게."
      },
      {
        "cue": "요구하다 / 필요로 하다",
        "model": "call for [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "require or demand something",
        "example": "This recipe calls for two cups of flour, not one.",
        "exampleKo": "이 레시피는 밀가루가 한 컵이 아니라 두 컵이 필요해."
      },
      {
        "cue": "여러 곳에 전화하다",
        "model": "call around",
        "tier": 2,
        "star": true,
        "easyEn": "phone several different places",
        "example": "I called around to a few shops, but nobody had the part in stock.",
        "exampleKo": "몇 군데 가게에 전화해 봤는데, 아무도 그 부품 재고가 없더라."
      },
      {
        "cue": "~를 오라고 부르다",
        "model": "call over [person]",
        "tier": 2,
        "star": true,
        "example": "Call Jake over, he needs to see this error message.",
        "exampleKo": "제이크 좀 오라고 불러, 이 에러 메시지를 봐야 해."
      },
      {
        "cue": "~에 대해 전화하다",
        "model": "call about [thing]",
        "tier": 2,
        "star": true,
        "example": "Hi, I'm calling about the apartment listing on Craigslist.",
        "exampleKo": "안녕하세요, 크레이그리스트에 올라온 아파트 매물 때문에 전화드렸어요."
      },
      {
        "cue": "~에 의문을 제기하다",
        "model": "call into question [thing]",
        "tier": 2,
        "easyEn": "make people doubt whether something is true",
        "example": "These results call into question everything we assumed about the users.",
        "exampleKo": "이 결과는 우리가 사용자에 대해 가정했던 모든 것에 의문을 제기해."
      },
      {
        "cue": "~에 주의를 끌다",
        "model": "call attention to [thing]",
        "tier": 2,
        "easyEn": "make people notice something",
        "example": "I just want to call attention to the deadline; it's this Friday.",
        "exampleKo": "마감일에 주의를 좀 끌고 싶은데, 이번 주 금요일이야."
      },
      {
        "cue": "~을 ~라고 부르다",
        "model": "call [thing] by [name]",
        "tier": 2,
        "example": "Everyone calls him Chip, but his real name is Charles.",
        "exampleKo": "다들 그를 칩이라고 부르지만, 진짜 이름은 찰스야."
      },
      {
        "cue": "미리 전화해두다",
        "model": "call ahead",
        "tier": 2,
        "easyEn": "phone in advance to arrange something",
        "example": "Call ahead before you drive over; they close early on Sundays.",
        "exampleKo": "거기 가기 전에 미리 전화해 둬. 일요일엔 일찍 문 닫아."
      },
      {
        "cue": "그만하고 오늘 일을 마치다",
        "model": "call it a day",
        "tier": 3,
        "easyEn": "stop working for the day",
        "example": "We've been at this for ten hours, let's call it a day.",
        "exampleKo": "열 시간째 이거 붙잡고 있었으니, 오늘은 이만 끝내자."
      }
    ]
  },
  {
    "id": "check",
    "verb": "CHECK",
    "gloss": "check는 확인, 점검, 검토다.",
    "items": [
      {
        "cue": "체크인하다 / 안부 확인하다",
        "model": "check in",
        "tier": 1,
        "star": true,
        "example": "I'll check in around 3 to see how the demo's going.",
        "exampleKo": "데모 어떻게 돼가는지 3시쯤 안부 확인할게."
      },
      {
        "cue": "~와 상태 확인하다",
        "model": "check in with [person]",
        "tier": 1,
        "star": true,
        "example": "Let me check in with Sarah before we lock the release date.",
        "exampleKo": "출시 날짜 확정하기 전에 새라랑 상태 확인 좀 할게."
      },
      {
        "cue": "확인해보다 / 살펴보다",
        "model": "check out [thing/person]",
        "tier": 1,
        "star": true,
        "example": "You should check out that new taco place on 5th Street.",
        "exampleKo": "5번가에 새로 생긴 타코집 한번 가봐."
      },
      {
        "cue": "상태를 확인하다",
        "model": "check on [thing/person]",
        "tier": 1,
        "star": true,
        "example": "Can you check on the build while I grab coffee?",
        "exampleKo": "나 커피 가져오는 동안 빌드 상태 좀 확인해줄래?"
      },
      {
        "cue": "~에게 확인하다",
        "model": "check with [person]",
        "tier": 1,
        "star": true,
        "example": "Let me check with my manager and I'll get back to you.",
        "exampleKo": "매니저한테 확인하고 다시 연락할게."
      },
      {
        "cue": "~이 있는지 확인하다",
        "model": "check for [error]",
        "tier": 1,
        "star": true,
        "example": "Check for typos before you send that email to the client.",
        "exampleKo": "그 이메일 클라이언트한테 보내기 전에 오타 있는지 확인해."
      },
      {
        "cue": "검토하다",
        "model": "check over [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you check over my slides before the meeting?",
        "exampleKo": "회의 전에 내 슬라이드 좀 검토해줄래?"
      },
      {
        "cue": "꼼꼼히 확인하다",
        "model": "check through [list/document]",
        "tier": 2,
        "star": true,
        "example": "I checked through the whole invoice and the total's off by ten bucks.",
        "exampleKo": "청구서 전부 꼼꼼히 확인했는데 총액이 10달러 안 맞아."
      },
      {
        "cue": "체크 표시하다",
        "model": "check off [item]",
        "tier": 2,
        "star": true,
        "example": "I finished the report, so I can check that off my list.",
        "exampleKo": "보고서 끝냈으니까 목록에서 체크 표시할 수 있어."
      },
      {
        "cue": "상태를 확인하다",
        "model": "check up on [person/thing]",
        "tier": 2,
        "star": true,
        "example": "I'm gonna check up on my grandma this weekend.",
        "exampleKo": "이번 주말에 할머니 안부 확인하러 갈 거야."
      },
      {
        "cue": "체크인하다 / 조사하다",
        "model": "check into [hotel/issue]",
        "tier": 2,
        "star": true,
        "example": "We checked into the hotel around midnight and crashed immediately.",
        "exampleKo": "우리 자정쯤 호텔 체크인하고 바로 곯아떨어졌어."
      },
      {
        "cue": "~와 대조하다",
        "model": "check against [spec/source]",
        "tier": 2,
        "star": true,
        "example": "Check those numbers against the original spec before we ship.",
        "exampleKo": "배포하기 전에 그 숫자들 원래 스펙이랑 대조해봐."
      },
      {
        "cue": "체크아웃하다",
        "model": "check out of [hotel]",
        "tier": 2,
        "example": "We need to check out of the hotel by 11 tomorrow.",
        "exampleKo": "내일 11시까지 호텔 체크아웃해야 해."
      },
      {
        "cue": "~에게 다시 확인하다",
        "model": "double-check with [person]",
        "tier": 2,
        "example": "Let me double-check with Tom that the meeting's still at 2.",
        "exampleKo": "회의 아직 2시인지 톰한테 다시 확인할게."
      },
      {
        "cue": "나중에 다시 확인하다 / 다시 들르다",
        "model": "check back",
        "tier": 2,
        "example": "They're out of stock, but check back next week.",
        "exampleKo": "품절인데 다음 주에 다시 확인해봐."
      },
      {
        "cue": "~의 상태를 잠깐 확인하다",
        "model": "check in on [person/thing]",
        "tier": 2,
        "example": "I'll check in on the tests and let you know if they pass.",
        "exampleKo": "테스트 상태 잠깐 확인하고 통과하면 알려줄게."
      },
      {
        "cue": "~에서 확인하다",
        "model": "check [thing] from [source]",
        "tier": 3,
        "easyEn": "to confirm something is correct by using a source.",
        "example": "I checked the address from Google Maps to make sure we're going to the right place.",
        "exampleKo": "제대로 가는 건지 구글 맵에서 주소 확인했어."
      }
    ]
  },
  {
    "id": "find",
    "verb": "FIND",
    "gloss": "find는 찾다, 알아내다, 발견하다.",
    "items": [
      {
        "cue": "알아내다",
        "model": "find out [thing]",
        "tier": 1,
        "star": true,
        "example": "Can you find out when the store closes?",
        "exampleKo": "그 가게 몇 시에 문 닫는지 알아봐 줄래?"
      },
      {
        "cue": "~에 대해 알아내다",
        "model": "find out about [thing]",
        "tier": 1,
        "star": true,
        "example": "I'll find out about the refund policy before I buy it.",
        "exampleKo": "사기 전에 환불 정책에 대해 알아볼게."
      },
      {
        "cue": "~에서 ~을 찾다",
        "model": "find [thing] in [place]",
        "tier": 1,
        "star": true,
        "example": "I finally found my keys in the couch cushions.",
        "exampleKo": "드디어 소파 쿠션 사이에서 열쇠를 찾았어."
      },
      {
        "cue": "~를 위해 ~을 찾아주다",
        "model": "find [thing] for [person]",
        "tier": 1,
        "star": true,
        "example": "I found a great dentist for my mom near her place.",
        "exampleKo": "엄마 집 근처에 좋은 치과를 찾아 드렸어."
      },
      {
        "cue": "~할 방법을 찾다",
        "model": "find a way to [verb]",
        "tier": 1,
        "star": true,
        "example": "We need to find a way to cut the load time in half.",
        "exampleKo": "로딩 시간을 절반으로 줄일 방법을 찾아야 해."
      },
      {
        "cue": "~하기 어렵다고 느끼다",
        "model": "find it hard to [verb]",
        "tier": 1,
        "star": true,
        "example": "I find it hard to focus with all the Slack pings.",
        "exampleKo": "슬랙 알림이 계속 와서 집중하기가 어려워."
      },
      {
        "cue": "어느새 ~상황에 처하다",
        "model": "find yourself in [situation]",
        "tier": 2,
        "star": true,
        "easyEn": "to unexpectedly end up in a particular situation",
        "example": "I found myself in a two-hour meeting I didn't even need to be in.",
        "exampleKo": "어느새 굳이 안 들어가도 될 두 시간짜리 회의에 앉아 있었어."
      },
      {
        "cue": "흠잡다",
        "model": "find fault with [thing/person]",
        "tier": 2,
        "star": true,
        "example": "My boss finds fault with everything, no matter how good it is.",
        "exampleKo": "우리 상사는 아무리 잘해도 뭐든 흠을 잡아."
      },
      {
        "cue": "~와 공통점을 찾다",
        "model": "find [thing] in common with [person]",
        "tier": 2,
        "star": true,
        "example": "Turns out I have a lot in common with the new guy on the team.",
        "exampleKo": "알고 보니 팀에 새로 온 사람이랑 공통점이 많더라."
      },
      {
        "cue": "~방법으로 찾다",
        "model": "find [thing] by [method]",
        "tier": 2,
        "example": "You can find most bugs just by checking the console logs.",
        "exampleKo": "콘솔 로그만 확인해도 대부분의 버그는 찾을 수 있어."
      },
      {
        "cue": "~을 통해 찾다",
        "model": "find [thing] through [source]",
        "tier": 2,
        "example": "I found this apartment through a friend, not an agent.",
        "exampleKo": "이 아파트는 중개인 말고 친구를 통해서 찾았어."
      },
      {
        "cue": "~할 시간을 내다",
        "model": "find time to [verb]",
        "tier": 2,
        "example": "I can never find time to hit the gym during the week.",
        "exampleKo": "주중에는 도무지 헬스장 갈 시간을 못 내겠어."
      },
      {
        "cue": "~을 파악해 익숙해지다 / 길을 알게 되다",
        "model": "find your way around [place/codebase]",
        "tier": 2,
        "easyEn": "to learn how to navigate or get familiar with something",
        "example": "Give me a week to find my way around the new codebase.",
        "exampleKo": "새 코드베이스에 익숙해지는 데 일주일만 줘."
      },
      {
        "cue": "~에게 유리/불리한 판결을 내리다",
        "model": "find for/against [person]",
        "tier": 3,
        "easyEn": "to decide a court case for or against someone.",
        "example": "The judge found for the tenant and threw out the eviction.",
        "exampleKo": "판사는 세입자에게 유리한 판결을 내리고 퇴거 요구를 기각했어."
      }
    ]
  },
  {
    "id": "think",
    "verb": "THINK",
    "gloss": "think는 생각, 검토, 상상, 회상을 만든다.",
    "items": [
      {
        "cue": "~에 대해 생각하다",
        "model": "think about [thing]",
        "tier": 1,
        "star": true,
        "example": "I've been thinking about switching to a standing desk.",
        "exampleKo": "스탠딩 데스크로 바꿀까 계속 생각 중이야."
      },
      {
        "cue": "~을 떠올리다 / ~라고 생각하다",
        "model": "think of [thing/person]",
        "tier": 1,
        "star": true,
        "example": "When I hear that song I always think of my college roommate.",
        "exampleKo": "그 노래 들으면 항상 대학 룸메이트가 떠올라."
      },
      {
        "cue": "심사숙고하다",
        "model": "think over [decision]",
        "tier": 2,
        "star": true,
        "example": "Let me think it over and I'll get back to you tomorrow.",
        "exampleKo": "좀 심사숙고해보고 내일 다시 얘기할게."
      },
      {
        "cue": "끝까지 생각해보다",
        "model": "think through [problem/plan]",
        "tier": 2,
        "star": true,
        "example": "We need to think this through before we ship it on Friday.",
        "exampleKo": "금요일에 배포하기 전에 이거 끝까지 생각해봐야 해."
      },
      {
        "cue": "생각해내다",
        "model": "think up [idea]",
        "tier": 2,
        "star": true,
        "example": "She thought up a clever name for the new app in like five minutes.",
        "exampleKo": "걔가 새 앱 이름을 한 5분 만에 기발하게 생각해냈어."
      },
      {
        "cue": "앞일을 생각하다",
        "model": "think ahead",
        "tier": 2,
        "star": true,
        "example": "Book your flights now and think ahead — prices only go up.",
        "exampleKo": "지금 항공권 예약해, 앞일 생각해야지, 가격은 오르기만 해."
      },
      {
        "cue": "~을 회상하다",
        "model": "think back on [time/event]",
        "tier": 2,
        "star": true,
        "example": "I think back on my first job and can't believe how clueless I was.",
        "exampleKo": "첫 직장을 회상하면 내가 얼마나 아무것도 몰랐는지 믿기지가 않아."
      },
      {
        "cue": "A를 B로 생각하다",
        "model": "think of A as B",
        "tier": 2,
        "star": true,
        "example": "Try to think of feedback as a gift, not an attack.",
        "exampleKo": "피드백을 공격이 아니라 선물로 생각하려고 해봐."
      },
      {
        "cue": "속으로 생각하다",
        "model": "think to oneself",
        "tier": 2,
        "star": true,
        "example": "This meeting could've been an email, I thought to myself.",
        "exampleKo": "이 회의는 이메일로 됐을 텐데, 하고 속으로 생각했어."
      },
      {
        "cue": "생각을 소리 내어 말하다",
        "model": "think aloud",
        "tier": 2,
        "example": "Sorry, I'm just thinking aloud here — don't take it as final.",
        "exampleKo": "미안, 그냥 생각 소리 내서 하는 거야, 확정으로 받아들이지 마."
      },
      {
        "cue": "~관점에서 생각하다",
        "model": "think in terms of [thing]",
        "tier": 2,
        "easyEn": "to consider something from a particular point of view",
        "example": "Stop thinking in terms of hours and start thinking about results.",
        "exampleKo": "시간 관점에서 생각하지 말고 결과를 생각하기 시작해."
      },
      {
        "cue": "~을 높이 평가하다",
        "model": "think highly of [person]",
        "tier": 2,
        "easyEn": "to respect or admire someone a lot",
        "example": "Everyone on the team thinks highly of our new manager.",
        "exampleKo": "팀 사람들 다 새 매니저를 높이 평가해."
      },
      {
        "cue": "~을 다시 한 번 신중히 생각하다",
        "model": "think twice about [thing]",
        "tier": 2,
        "easyEn": "to carefully consider before deciding to do something.",
        "example": "I'd think twice about quitting before you have another offer lined up.",
        "exampleKo": "다른 오퍼 잡히기 전에 그만두는 건 다시 한번 신중히 생각해봐."
      },
      {
        "cue": "다시 생각하고 하지 않기로 하다",
        "model": "think better of [thing]",
        "tier": 3,
        "easyEn": "to change your mind and decide not to do something.",
        "example": "I almost texted my ex, but I thought better of it.",
        "exampleKo": "전 여친한테 문자 보낼 뻔했는데 다시 생각하고 관뒀어."
      },
      {
        "cue": "~을 대수롭지 않게 여기다",
        "model": "think nothing of [thing]",
        "tier": 3,
        "easyEn": "to see something as easy or not a problem.",
        "example": "He thinks nothing of driving four hours just to grab lunch.",
        "exampleKo": "걔는 점심 먹으러 네 시간 운전하는 걸 아무렇지도 않게 여겨."
      },
      {
        "cue": "즉석에서 빠르게 판단하고 대처하다",
        "model": "think on your feet",
        "tier": 3,
        "easyEn": "to react and make decisions quickly without preparation.",
        "example": "Bartenders have to think on their feet when it gets crazy busy.",
        "exampleKo": "바텐더는 정신없이 바쁠 때 즉석에서 빠르게 대처해야 해."
      }
    ]
  },
  {
    "id": "know",
    "verb": "KNOW",
    "gloss": "know는 지식, 경험, 인식의 뼈대다.",
    "items": [
      {
        "cue": "~에 대해 알다",
        "model": "know about [thing]",
        "tier": 1,
        "star": true,
        "example": "I don't really know about the new pricing tier — ask Sarah, she set it up.",
        "exampleKo": "새 요금제에 대해선 잘 몰라. 세라한테 물어봐, 걔가 만들었어."
      },
      {
        "cue": "~을 알아가다",
        "model": "get to know [person/thing]",
        "tier": 1,
        "star": true,
        "example": "It took me a few weeks to really get to know my new teammates.",
        "exampleKo": "새 팀원들을 제대로 알아가는 데 몇 주 걸렸어."
      },
      {
        "cue": "~하는 법을 알다",
        "model": "know how to [verb]",
        "tier": 1,
        "star": true,
        "example": "Does anyone here know how to reset the staging database?",
        "exampleKo": "여기 스테이징 DB 초기화하는 법 아는 사람 있어?"
      },
      {
        "cue": "~에게 (~을) 알려주다",
        "model": "let [person] know (about [thing])",
        "tier": 1,
        "star": true,
        "example": "Let me know when the build is done and I'll deploy it.",
        "exampleKo": "빌드 끝나면 알려줘, 내가 배포할게."
      },
      {
        "cue": "~의 존재를 알다",
        "model": "know of [person/thing]",
        "tier": 2,
        "star": true,
        "easyEn": "be aware that something or someone exists",
        "example": "I've never used it, but I know of a tool that does exactly that.",
        "exampleKo": "써본 적은 없는데 딱 그거 하는 툴이 있는 건 알아."
      },
      {
        "cue": "경험상 알다",
        "model": "know from experience",
        "tier": 2,
        "star": true,
        "example": "I know from experience that skipping tests always bites you later.",
        "exampleKo": "경험상 테스트 건너뛰면 나중에 꼭 발목 잡혀."
      },
      {
        "cue": "~로 알다 / ~라는 이름으로 알다",
        "model": "know by [sign/name]",
        "tier": 2,
        "star": true,
        "example": "You'll know the office by the big red door on the corner.",
        "exampleKo": "모퉁이에 있는 큰 빨간 문 보고 그 사무실인 줄 알 거야."
      },
      {
        "cue": "~로 유명하다",
        "model": "be known for [thing]",
        "tier": 2,
        "star": true,
        "example": "That little cafe is known for its ridiculously good cinnamon rolls.",
        "exampleKo": "그 작은 카페는 말도 안 되게 맛있는 시나몬롤로 유명해."
      },
      {
        "cue": "~로 알려져 있다",
        "model": "be known as [thing]",
        "tier": 2,
        "star": true,
        "example": "Around the office he's known as the guy who fixes everything.",
        "exampleKo": "사무실에서 걔는 뭐든 고치는 사람으로 알려져 있어."
      },
      {
        "cue": "~에게 알려져 있다",
        "model": "be known to [person/group]",
        "tier": 2,
        "star": true,
        "example": "This bug has been known to the dev team for weeks now.",
        "exampleKo": "이 버그는 개발팀에 벌써 몇 주째 알려져 있어."
      },
      {
        "cue": "~할 만큼 어리석지는 않다",
        "model": "know better than to [verb]",
        "tier": 2,
        "star": true,
        "easyEn": "be sensible enough not to do something.",
        "example": "She knows better than to reply-all on a company-wide email.",
        "exampleKo": "걔는 전체 메일에 전체 답장할 만큼 어리석지는 않아."
      },
      {
        "cue": "~을 속속들이 알다",
        "model": "know [thing] inside out",
        "tier": 2,
        "easyEn": "know something completely and in full detail.",
        "example": "Ask Mike about the billing code — he knows it inside out.",
        "exampleKo": "결제 코드는 마이크한테 물어봐, 걔가 속속들이 알아."
      },
      {
        "cue": "확실히 알다",
        "model": "know [thing] for sure",
        "tier": 2,
        "example": "I think the meeting's at three, but I can't say for sure.",
        "exampleKo": "회의 3시인 것 같은데 확실히는 모르겠어."
      },
      {
        "cue": "내가 아는 한",
        "model": "as far as I know",
        "tier": 2,
        "star": true,
        "example": "As far as I know, the client hasn't signed the contract yet.",
        "exampleKo": "내가 아는 한 클라이언트가 아직 계약서에 서명 안 했어."
      },
      {
        "cue": "외우거나 찾아보지 않고 바로 알다",
        "model": "know [thing] off the top of one's head",
        "tier": 2,
        "easyEn": "know it immediately without checking or looking it up.",
        "example": "I don't know his phone number off the top of my head — give me a sec.",
        "exampleKo": "걔 전화번호 바로는 기억 안 나, 잠깐만."
      },
      {
        "cue": "~을 훤히 꿰다 / 능숙하게 다루다",
        "model": "know one's way around [thing/place]",
        "tier": 2,
        "easyEn": "be very familiar with a place or subject.",
        "example": "Give the new intern to David — he knows his way around the codebase.",
        "exampleKo": "새 인턴은 데이비드한테 붙여, 걔가 코드베이스를 훤히 꿰고 있어."
      },
      {
        "cue": "내가 알기로는 아니다",
        "model": "not that I know of",
        "tier": 2,
        "easyEn": "no, based on what I currently know",
        "example": "\"Is the server down again?\" \"Not that I know of.\"",
        "exampleKo": "\"서버 또 다운됐어?\" \"내가 알기론 아냐.\""
      },
      {
        "cue": "얼굴만 알다",
        "model": "know [person] by sight",
        "tier": 3,
        "easyEn": "recognize someone's face without knowing them personally.",
        "example": "I know the new manager by sight, but we've never actually talked.",
        "exampleKo": "새 매니저 얼굴만 알지, 실제로 얘기해본 적은 없어."
      }
    ]
  },
  {
    "id": "learn",
    "verb": "LEARN",
    "gloss": "learn은 배우다, 알게 되다, 경험에서 얻다.",
    "items": [
      {
        "cue": "~에 대해 배우다",
        "model": "learn about [thing]",
        "tier": 1,
        "star": true,
        "example": "I want to learn more about how our billing system actually works.",
        "exampleKo": "우리 결제 시스템이 실제로 어떻게 돌아가는지 더 알고 싶어."
      },
      {
        "cue": "~에게서 / ~로부터 배우다",
        "model": "learn from [person/mistake/experience]",
        "tier": 1,
        "star": true,
        "example": "Honestly, I learned a lot from my last manager about giving feedback.",
        "exampleKo": "솔직히 예전 매니저한테서 피드백 주는 법을 많이 배웠어."
      },
      {
        "cue": "~하는 법을 배우다",
        "model": "learn to [verb]",
        "tier": 1,
        "star": true,
        "example": "I'm finally learning to say no when my plate's already full.",
        "exampleKo": "이미 일이 꽉 찼을 때 거절하는 법을 이제야 배우고 있어."
      },
      {
        "cue": "~하는 방법을 배우다",
        "model": "learn how to [verb]",
        "tier": 1,
        "star": true,
        "example": "Can you show me how to set up the staging environment?",
        "exampleKo": "스테이징 환경 세팅하는 방법 좀 알려줄 수 있어?"
      },
      {
        "cue": "~에게서 ~을 배우다",
        "model": "learn [thing] from [person/source]",
        "tier": 1,
        "star": true,
        "example": "I learned that trick from a coworker on my first week.",
        "exampleKo": "그 요령은 첫 주에 동료한테서 배웠어."
      },
      {
        "cue": "~하면서 배우다",
        "model": "learn by [-ing]",
        "tier": 2,
        "star": true,
        "example": "I mostly learned React by building small side projects.",
        "exampleKo": "나는 주로 작은 사이드 프로젝트를 만들면서 React를 배웠어."
      },
      {
        "cue": "~에 대해 알게 되다",
        "model": "learn of [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "find out about something, often in a formal way",
        "example": "We only learned of the outage after customers started emailing.",
        "exampleKo": "고객들이 이메일을 보내고 나서야 장애가 났다는 걸 알게 됐어."
      },
      {
        "cue": "경험을 통해 배우다",
        "model": "learn through [experience]",
        "tier": 2,
        "star": true,
        "example": "You really learn patience through raising a toddler.",
        "exampleKo": "어린애를 키우면서 인내심을 진짜 경험으로 배우게 돼."
      },
      {
        "cue": "시간이 지나며 배우다",
        "model": "learn [thing] over time",
        "tier": 2,
        "example": "You'll learn the codebase over time, don't stress about it.",
        "exampleKo": "코드베이스는 시간이 지나면서 익히게 되니까 너무 걱정하지 마."
      },
      {
        "cue": "고생해서 배우다",
        "model": "learn [thing] the hard way",
        "tier": 2,
        "easyEn": "learn it through a difficult or painful experience.",
        "example": "I learned to always back up my files the hard way.",
        "exampleKo": "파일은 항상 백업해야 한다는 걸 고생하고 나서 배웠어."
      },
      {
        "cue": "외우다",
        "model": "learn [thing] by heart",
        "tier": 2,
        "easyEn": "memorize it so you can repeat it exactly.",
        "example": "I had to learn my whole speech by heart for the wedding.",
        "exampleKo": "결혼식 축사를 통째로 외워야 했어."
      },
      {
        "cue": "처음부터 배우다",
        "model": "learn from scratch",
        "tier": 2,
        "easyEn": "learn it starting from the very beginning.",
        "example": "They handed me no docs, so I had to learn it from scratch.",
        "exampleKo": "문서를 하나도 안 줘서 처음부터 다 배워야 했어."
      },
      {
        "cue": "(업무) 요령을 익히다",
        "model": "learn the ropes",
        "tier": 2,
        "easyEn": "learn how to do a new job or task.",
        "example": "Give her a couple weeks to learn the ropes before the big launch.",
        "exampleKo": "큰 출시 전에 걔가 업무 요령 익힐 시간을 몇 주 줘."
      },
      {
        "cue": "일하면서 배우다 / 실무로 익히다",
        "model": "learn on the job",
        "tier": 2,
        "example": "There's no training, you kind of just learn on the job here.",
        "exampleKo": "따로 교육은 없고, 여기선 그냥 일하면서 배우는 편이야."
      },
      {
        "cue": "(실수에서) 교훈을 얻다",
        "model": "learn one's lesson",
        "tier": 2,
        "easyEn": "finally understand not to repeat a mistake.",
        "example": "I forgot to save again, but this time I learned my lesson.",
        "exampleKo": "또 저장을 깜빡했는데, 이번엔 확실히 교훈을 얻었어."
      }
    ]
  },
  {
    "id": "explain",
    "verb": "EXPLAIN",
    "gloss": "explain은 설명, 원인, 방식 전달이다.",
    "items": [
      {
        "cue": "~에게 ~을 설명하다",
        "model": "explain [thing] to [person]",
        "tier": 1,
        "star": true,
        "example": "Can you explain the refund process to my mom? She keeps calling me about it.",
        "exampleKo": "환불 절차 좀 우리 엄마한테 설명해 줄래? 자꾸 그것 때문에 나한테 전화하셔."
      },
      {
        "cue": "왜 ~인지 설명하다",
        "model": "explain why [sentence]",
        "tier": 1,
        "star": true,
        "example": "Let me explain why we pushed the deadline to Friday.",
        "exampleKo": "왜 마감을 금요일로 미뤘는지 설명할게요."
      },
      {
        "cue": "어떻게 ~인지 설명하다",
        "model": "explain how [sentence]",
        "tier": 1,
        "star": true,
        "example": "Can you explain how you got the build to pass? Mine keeps failing.",
        "exampleKo": "빌드 어떻게 통과시켰는지 설명해 줄래? 내 건 계속 실패해."
      },
      {
        "cue": "~관점에서 설명하다",
        "model": "explain [thing] in terms of [thing]",
        "tier": 2,
        "star": true,
        "example": "He explained the whole thing in terms of supply and demand.",
        "exampleKo": "그는 그 전체를 수요와 공급 관점에서 설명했어."
      },
      {
        "cue": "~로 설명하다",
        "model": "explain [thing] by [reason/method]",
        "tier": 2,
        "star": true,
        "example": "She explained the delay by pointing to the port strike.",
        "exampleKo": "그녀는 항구 파업을 들어 지연을 설명했어."
      },
      {
        "cue": "예시로 설명하다",
        "model": "explain [thing] with [example]",
        "tier": 2,
        "star": true,
        "example": "Let me explain the discount with a quick example.",
        "exampleKo": "간단한 예시로 그 할인을 설명해 줄게."
      },
      {
        "cue": "자세히 설명하다",
        "model": "explain [thing] in detail",
        "tier": 2,
        "star": true,
        "example": "Can you explain the billing change in detail? I'm still confused.",
        "exampleKo": "요금 변경을 자세히 설명해 줄래? 아직도 헷갈려."
      },
      {
        "cue": "변명으로 넘기다",
        "model": "explain away [problem/evidence]",
        "tier": 2,
        "star": true,
        "easyEn": "make a problem seem unimportant by giving reasons.",
        "example": "Don't try to explain away the missed numbers, just tell me what happened.",
        "exampleKo": "빠진 수치를 변명으로 넘기려 하지 말고, 그냥 무슨 일이 있었는지 말해줘."
      },
      {
        "cue": "예시/이야기로 설명하다",
        "model": "explain [thing] through [example/story]",
        "tier": 2,
        "example": "The coach explained teamwork through a story about his old college team.",
        "exampleKo": "코치는 자기 옛 대학 팀 이야기로 팀워크를 설명했어."
      },
      {
        "cue": "~을 ~로 설명하다",
        "model": "explain [thing] as [thing]",
        "tier": 2,
        "example": "The doctor explained the rash as a reaction to the new soap.",
        "exampleKo": "의사는 그 발진을 새 비누에 대한 반응으로 설명했어."
      },
      {
        "cue": "~에게 명확히 설명하다",
        "model": "explain [thing] clearly to [person]",
        "tier": 2,
        "example": "Make sure you explain the return policy clearly to the new hire.",
        "exampleKo": "신입 직원한테 반품 정책을 명확히 설명해 줘."
      }
    ]
  },
  {
    "id": "show",
    "verb": "SHOW",
    "gloss": "show는 보여주다, 나타나다, 안내하다.",
    "items": [
      {
        "cue": "나타나다",
        "model": "show up",
        "tier": 1,
        "star": true,
        "easyEn": "to arrive or appear somewhere",
        "example": "Half the team didn't show up to the standup this morning.",
        "exampleKo": "오늘 아침 스탠드업에 팀의 절반이 안 나타났어."
      },
      {
        "cue": "자랑하다 / 과시하다",
        "model": "show off [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to display something proudly to impress people",
        "example": "He's always showing off his new Tesla in the parking lot.",
        "exampleKo": "걔는 주차장에서 맨날 새 테슬라 자랑해."
      },
      {
        "cue": "~에게 ~을 보여주다",
        "model": "show [thing] to [person]",
        "tier": 1,
        "star": true,
        "example": "Can you show that error to Mike before we file the ticket?",
        "exampleKo": "티켓 올리기 전에 그 에러 마이크한테 보여줄 수 있어?"
      },
      {
        "cue": "~에게 ~하는 법을 보여주다",
        "model": "show [person] how to [verb]",
        "tier": 1,
        "star": true,
        "example": "Let me show you how to reset your password real quick.",
        "exampleKo": "비밀번호 재설정하는 법 금방 보여줄게."
      },
      {
        "cue": "~에 나타나다 / 출근하다",
        "model": "show up for [event/work]",
        "tier": 1,
        "star": true,
        "easyEn": "to arrive for work or an event",
        "example": "I can't believe he didn't show up for work on launch day.",
        "exampleKo": "출시일에 걔가 출근을 안 했다는 게 믿기지가 않아."
      },
      {
        "cue": "~에게 ~를 구경시켜주다",
        "model": "show [person] around [place]",
        "tier": 2,
        "star": true,
        "example": "I'll show you around the office after you grab your badge.",
        "exampleKo": "출입증 받고 나면 사무실 구경시켜줄게."
      },
      {
        "cue": "안으로 안내하다",
        "model": "show [person] in",
        "tier": 2,
        "star": true,
        "example": "The client's here — can you show her in?",
        "exampleKo": "고객분 오셨어 — 안으로 안내해 줄래?"
      },
      {
        "cue": "밖으로 안내하다",
        "model": "show [person] out",
        "tier": 2,
        "star": true,
        "example": "The meeting's over, let me show you out.",
        "exampleKo": "회의 끝났으니 밖으로 안내해 드릴게요."
      },
      {
        "cue": "~을 화면/차트에 보여주다",
        "model": "show [thing] on [screen/chart]",
        "tier": 2,
        "star": true,
        "example": "Can you show the revenue numbers on the chart instead of a table?",
        "exampleKo": "매출 수치를 표 말고 차트에 보여줄 수 있어?"
      },
      {
        "cue": "~을 ~로 표시하다",
        "model": "show [thing] as [thing]",
        "tier": 2,
        "star": true,
        "example": "The dashboard shows pending orders as yellow.",
        "exampleKo": "대시보드는 대기 중인 주문을 노란색으로 표시해."
      },
      {
        "cue": "결과가 데이터에 나타나다",
        "model": "show [result] in [data]",
        "tier": 2,
        "example": "The drop-off shows up clearly in last week's data.",
        "exampleKo": "이탈률이 지난주 데이터에 확실히 나타나."
      },
      {
        "cue": "~를 방으로 안내하다",
        "model": "show [person] into [room]",
        "tier": 2,
        "example": "The receptionist showed us into the conference room.",
        "exampleKo": "안내 직원이 우리를 회의실로 안내했어."
      },
      {
        "cue": "~의 징후를 보이다",
        "model": "show signs of [thing]",
        "tier": 2,
        "example": "The server's showing signs of memory leaks again.",
        "exampleKo": "서버가 또 메모리 누수 징후를 보이고 있어."
      },
      {
        "cue": "~에 대한 성과/결실이 있다",
        "model": "have [something] to show for [effort/time]",
        "tier": 2,
        "easyEn": "to have a result that proves your effort was worthwhile.",
        "example": "I worked all weekend and have nothing to show for it.",
        "exampleKo": "주말 내내 일했는데 보여줄 성과가 하나도 없어."
      },
      {
        "cue": "드러나다",
        "model": "show through",
        "tier": 3,
        "star": true,
        "easyEn": "to become visible or noticeable.",
        "example": "He tried to stay calm, but his nerves showed through.",
        "exampleKo": "침착한 척했지만 긴장한 게 다 드러났어."
      }
    ]
  },
  {
    "id": "try",
    "verb": "TRY",
    "gloss": "try는 시도, 테스트, 입어보기다.",
    "items": [
      {
        "cue": "~하려고 노력하다",
        "model": "try to [verb]",
        "tier": 1,
        "star": true,
        "example": "I'm trying to finish this before lunch.",
        "exampleKo": "점심 전에 이거 끝내려고 하고 있어."
      },
      {
        "cue": "한번 ~해보다",
        "model": "try [-ing]",
        "tier": 1,
        "star": true,
        "example": "Try restarting it — that usually fixes the freeze.",
        "exampleKo": "한번 재시작해봐 — 보통 그러면 멈춤이 풀려."
      },
      {
        "cue": "입어보다",
        "model": "try on [clothes]",
        "tier": 1,
        "star": true,
        "easyEn": "to put on clothing to see if it fits",
        "example": "Can I try these on before I buy them?",
        "exampleKo": "사기 전에 이거 입어봐도 돼요?"
      },
      {
        "cue": "시험해보다",
        "model": "try out [tool/method]",
        "tier": 1,
        "star": true,
        "easyEn": "to test something to see if it works",
        "example": "We're trying out Notion for the team this month.",
        "exampleKo": "이번 달에 팀에서 노션을 한번 시험해보고 있어."
      },
      {
        "cue": "다시 시도하다",
        "model": "try again",
        "tier": 1,
        "star": true,
        "example": "It timed out — let me try again.",
        "exampleKo": "타임아웃 났어 — 다시 시도해볼게."
      },
      {
        "cue": "~을 한번 해보다",
        "model": "give [thing] a try",
        "tier": 1,
        "example": "You should give oat milk a try, it's actually good.",
        "exampleKo": "귀리 우유 한번 마셔봐, 진짜 괜찮아."
      },
      {
        "cue": "(구어) ~해보다",
        "model": "try and [verb]",
        "tier": 1,
        "example": "Try and get here by nine, okay?",
        "exampleKo": "9시까지 와보도록 해, 알았지?"
      },
      {
        "cue": "선발 시험을 보다",
        "model": "try out for [team/role]",
        "tier": 2,
        "star": true,
        "easyEn": "to compete or audition for a spot on a team",
        "example": "My daughter's trying out for the soccer team tomorrow.",
        "exampleKo": "우리 딸이 내일 축구팀 선발 시험 봐."
      },
      {
        "cue": "~을 노리다",
        "model": "try for [goal]",
        "tier": 2,
        "star": true,
        "easyEn": "to attempt to get or achieve something",
        "example": "We're trying for a spot in the finals this year.",
        "exampleKo": "올해 결승 자리를 노리고 있어."
      },
      {
        "cue": "~을 ~로 해보다",
        "model": "try [thing] with [method/tool]",
        "tier": 2,
        "star": true,
        "example": "Try opening the file with VS Code instead.",
        "exampleKo": "그 파일 VS Code로 한번 열어봐."
      },
      {
        "cue": "~을 ~에 시험해보다",
        "model": "try [thing] on [target]",
        "tier": 2,
        "example": "Let's try the new prompt on a few real emails first.",
        "exampleKo": "새 프롬프트를 실제 이메일 몇 개에 먼저 시험해보자."
      },
      {
        "cue": "~를 ~죄로 재판하다",
        "model": "try [person] for [crime]",
        "tier": 2,
        "easyEn": "to put someone on trial for a crime",
        "example": "They're trying him for fraud next month.",
        "exampleKo": "다음 달에 그를 사기죄로 재판해."
      },
      {
        "cue": "최선을 다하다",
        "model": "try one’s best",
        "tier": 2,
        "example": "I don't know if it'll work, but I'll try my best.",
        "exampleKo": "될지는 모르겠지만 최선을 다할게."
      },
      {
        "cue": "~을 ~에게 시험 삼아 해보다 / 반응을 떠보다",
        "model": "try [thing] out on [person]",
        "tier": 2,
        "easyEn": "to test an idea on someone to see their reaction",
        "example": "Let me try this idea out on Sarah before the meeting.",
        "exampleKo": "회의 전에 이 아이디어 세라한테 한번 반응 떠볼게."
      }
    ]
  },
  {
    "id": "help",
    "verb": "HELP",
    "gloss": "help는 돕다, 거들다, 버티게 하다.",
    "items": [
      {
        "cue": "거들다 / 도와주다",
        "model": "help out",
        "tier": 1,
        "star": true,
        "example": "Can you help out this weekend? We're short two people at the booth.",
        "exampleKo": "이번 주말에 좀 거들어 줄래? 부스에 사람이 둘이나 모자라."
      },
      {
        "cue": "~을 거들다",
        "model": "help out with [thing]",
        "tier": 1,
        "star": true,
        "example": "I can help out with the slides if you handle the demo.",
        "exampleKo": "네가 데모를 맡으면 내가 슬라이드는 거들게."
      },
      {
        "cue": "~가 ~하는 것을 돕다",
        "model": "help [person] with [thing]",
        "tier": 1,
        "star": true,
        "example": "Can you help me with this bug? I've been stuck on it all morning.",
        "exampleKo": "이 버그 좀 도와줄래? 아침 내내 막혀 있어."
      },
      {
        "cue": "~가 ~하도록 돕다",
        "model": "help [person] do [verb]",
        "tier": 1,
        "star": true,
        "example": "My roommate helped me move the couch up the stairs.",
        "exampleKo": "룸메이트가 소파를 계단 위로 옮기는 걸 도와줬어."
      },
      {
        "cue": "~가 ~하도록 돕다",
        "model": "help [person] to [verb]",
        "tier": 1,
        "star": true,
        "example": "This app helped me to finally stick with my morning workouts.",
        "exampleKo": "이 앱 덕분에 드디어 아침 운동을 꾸준히 하게 됐어."
      },
      {
        "cue": "~하지 않을 수 없다",
        "model": "can’t help [-ing]",
        "tier": 1,
        "star": true,
        "easyEn": "to be unable to stop yourself from doing something.",
        "example": "I can't help laughing every time he does that impression.",
        "exampleKo": "걔가 그 성대모사 할 때마다 웃지 않을 수가 없어."
      },
      {
        "cue": "~함으로써 돕다",
        "model": "help by [-ing]",
        "tier": 2,
        "star": true,
        "example": "You can help by just testing the new build and reporting bugs.",
        "exampleKo": "새 빌드를 테스트하고 버그만 알려줘도 도움이 돼."
      },
      {
        "cue": "~가 어려움을 견디게 돕다",
        "model": "help [person] through [difficulty]",
        "tier": 2,
        "star": true,
        "example": "My sister really helped me through the divorce.",
        "exampleKo": "언니가 이혼하는 동안 정말 나를 버티게 해줬어."
      },
      {
        "cue": "마음껏 먹다/마시다",
        "model": "help yourself to [food/drink]",
        "tier": 2,
        "star": true,
        "easyEn": "to take as much food or drink as you want.",
        "example": "There's pizza in the kitchen, help yourself to as much as you want.",
        "exampleKo": "부엌에 피자 있으니까 마음껏 먹어."
      },
      {
        "cue": "~가 상황에서 벗어나게 돕다",
        "model": "help [person] out of [situation]",
        "tier": 2,
        "example": "Thanks for helping me out of that awkward conversation with my boss.",
        "exampleKo": "상사랑 어색한 대화에서 빠져나오게 도와줘서 고마워."
      },
      {
        "cue": "~가 들어가도록 돕다",
        "model": "help [person] into [place]",
        "tier": 2,
        "example": "The driver helped the old man into the taxi.",
        "exampleKo": "기사가 노인이 택시에 타도록 도와줬어."
      },
      {
        "cue": "~을 진전시키다",
        "model": "help [thing] along",
        "tier": 3,
        "easyEn": "to help something make progress.",
        "example": "A little coffee should help the meeting along.",
        "exampleKo": "커피 좀 마시면 회의가 좀 더 잘 진행될 거야."
      }
    ]
  },
  {
    "id": "need",
    "verb": "NEED",
    "gloss": "need는 필요, 의무, 요구사항이다.",
    "items": [
      {
        "cue": "~해야 한다",
        "model": "need to [verb]",
        "tier": 1,
        "star": true,
        "example": "I need to finish this before the standup.",
        "exampleKo": "스탠드업 전에 이거 끝내야 해."
      },
      {
        "cue": "~을 ~용도로 필요로 하다",
        "model": "need [thing] for [purpose]",
        "tier": 1,
        "star": true,
        "example": "I need a bigger monitor for coding all day.",
        "exampleKo": "하루 종일 코딩하려면 더 큰 모니터가 필요해."
      },
      {
        "cue": "~에게서 ~이 필요하다",
        "model": "need [thing] from [person]",
        "tier": 1,
        "star": true,
        "example": "I need the API key from Sarah before I can deploy.",
        "exampleKo": "배포하려면 Sarah한테서 API 키를 받아야 해."
      },
      {
        "cue": "~에 도움이 필요하다",
        "model": "need help with [thing]",
        "tier": 1,
        "star": true,
        "example": "Can you help me with this merge conflict?",
        "exampleKo": "이 머지 충돌 좀 도와줄 수 있어?"
      },
      {
        "cue": "~가 ~해줘야 한다",
        "model": "need [person] to [verb]",
        "tier": 1,
        "star": true,
        "example": "I need you to review my PR before lunch.",
        "exampleKo": "점심 전에 네가 내 PR 좀 리뷰해줘야 해."
      },
      {
        "cue": "~까지 ~이 필요하다",
        "model": "need [thing] by [date/time]",
        "tier": 1,
        "star": true,
        "example": "I need the designs by Friday or we'll slip the release.",
        "exampleKo": "금요일까지 디자인이 필요해, 안 그러면 릴리스가 밀려."
      },
      {
        "cue": "~할 필요 없다",
        "model": "no need to [verb]",
        "tier": 1,
        "star": true,
        "example": "No need to reply, I already figured it out.",
        "exampleKo": "답장 안 해도 돼, 이미 해결했어."
      },
      {
        "cue": "~이 필요하다",
        "model": "be in need of [thing]",
        "tier": 2,
        "star": true,
        "example": "This code is in need of a serious cleanup.",
        "exampleKo": "이 코드는 대대적인 정리가 필요해."
      },
      {
        "cue": "~에 대한 필요가 있다",
        "model": "there is a need for [thing]",
        "tier": 2,
        "star": true,
        "example": "There's a real need for better docs on this project.",
        "exampleKo": "이 프로젝트에는 더 나은 문서가 정말 필요해."
      },
      {
        "cue": "~상황에서 ~이 필요하다",
        "model": "need [thing] in [situation]",
        "tier": 2,
        "example": "You need a backup plan in case the server goes down.",
        "exampleKo": "서버가 다운되는 상황에 대비해 백업 계획이 필요해."
      },
      {
        "cue": "프로젝트에 ~이 필요하다",
        "model": "need [thing] on [project]",
        "tier": 2,
        "example": "We need another engineer on this project to hit the deadline.",
        "exampleKo": "마감을 맞추려면 이 프로젝트에 엔지니어가 한 명 더 필요해."
      },
      {
        "cue": "~보다 ~이 더 필요하다",
        "model": "need [thing] more than [thing]",
        "tier": 2,
        "example": "Right now we need users more than we need new features.",
        "exampleKo": "지금은 새 기능보다 사용자가 더 필요해."
      },
      {
        "cue": "필요하다면 / 필요시에는",
        "model": "if need be",
        "tier": 3,
        "easyEn": "if it is necessary",
        "example": "I can stay late to fix it, if need be.",
        "exampleKo": "필요하다면 늦게까지 남아서 고칠 수 있어."
      }
    ]
  },
  {
    "id": "want",
    "verb": "WANT",
    "gloss": "want는 원하다, 요청하다, 참여 의사다.",
    "items": [
      {
        "cue": "~하고 싶다",
        "model": "want to [verb]",
        "tier": 1,
        "star": true,
        "example": "I want to grab coffee before the standup.",
        "exampleKo": "스탠드업 전에 커피 한 잔 마시고 싶어."
      },
      {
        "cue": "~가 ~하기를 원하다",
        "model": "want [person] to [verb]",
        "tier": 1,
        "star": true,
        "example": "I want you to review my PR before lunch.",
        "exampleKo": "점심 전에 내 PR 좀 리뷰해줬으면 해."
      },
      {
        "cue": "~용도로 ~을 원하다",
        "model": "want [thing] for [purpose]",
        "tier": 1,
        "star": true,
        "example": "I want a bigger monitor for coding at home.",
        "exampleKo": "집에서 코딩할 용도로 더 큰 모니터를 원해."
      },
      {
        "cue": "~에게서 ~을 원하다",
        "model": "want [thing] from [person]",
        "tier": 1,
        "star": true,
        "example": "I want an honest answer from you, not excuses.",
        "exampleKo": "변명 말고 너한테서 솔직한 대답을 듣고 싶어."
      },
      {
        "cue": "~을 돌려받고 싶다",
        "model": "want [thing] back",
        "tier": 1,
        "star": true,
        "example": "Can I get my charger back? I left it on your desk.",
        "exampleKo": "내 충전기 돌려받을 수 있을까? 네 책상에 두고 왔어."
      },
      {
        "cue": "~에 대해 알고 싶다",
        "model": "want to know about [thing]",
        "tier": 1,
        "star": true,
        "example": "I want to know about the new deployment process.",
        "exampleKo": "새 배포 프로세스에 대해 알고 싶어."
      },
      {
        "cue": "참여하고 싶다",
        "model": "want in",
        "tier": 2,
        "star": true,
        "easyEn": "want to join or be included",
        "example": "You're doing a side project? I want in.",
        "exampleKo": "사이드 프로젝트 한다고? 나도 끼고 싶어."
      },
      {
        "cue": "빠지고 싶다",
        "model": "want out",
        "tier": 2,
        "star": true,
        "easyEn": "want to leave or quit",
        "example": "This deal feels off. I want out.",
        "exampleKo": "이 거래 뭔가 이상해. 나 빠질래."
      },
      {
        "cue": "~죄로 수배 중이다",
        "model": "be wanted for [crime]",
        "tier": 2,
        "easyEn": "be sought by the police for a crime",
        "example": "The guy's wanted for armed robbery in three states.",
        "exampleKo": "그 남자는 세 개 주에서 무장 강도죄로 수배 중이야."
      },
      {
        "cue": "나한테 뭘 원하는 거야?",
        "model": "what do you want from me?",
        "tier": 2,
        "example": "I already apologized twice. What do you want from me?",
        "exampleKo": "이미 두 번이나 사과했잖아. 나한테 뭘 더 원하는 거야?"
      },
      {
        "cue": "~이 처리되길 원하다",
        "model": "want [thing] done",
        "tier": 2,
        "example": "I want this bug fixed before we ship tonight.",
        "exampleKo": "오늘 밤 출시 전에 이 버그가 처리되길 원해."
      },
      {
        "cue": "~에 끼고 싶다 / ~에 참여하고 싶다",
        "model": "want in on [thing]",
        "tier": 2,
        "easyEn": "want to take part in or share in something",
        "example": "They're launching a startup and I want in on it.",
        "exampleKo": "걔네 스타트업 차린다는데 나도 거기 끼고 싶어."
      },
      {
        "cue": "~에서 빠지고 싶다 / ~에서 손 떼고 싶다",
        "model": "want out of [thing]",
        "tier": 2,
        "easyEn": "want to leave or escape from something",
        "example": "I want out of this project before it burns me out.",
        "exampleKo": "번아웃 오기 전에 이 프로젝트에서 손 떼고 싶어."
      },
      {
        "cue": "부족한 것이 없다",
        "model": "want for nothing",
        "tier": 3,
        "easyEn": "have everything you need; lack nothing",
        "example": "Her grandparents made sure she wanted for nothing.",
        "exampleKo": "그녀의 조부모는 그녀가 부족한 것 하나 없게 해줬어."
      }
    ]
  },
  {
    "id": "handle",
    "verb": "HANDLE",
    "gloss": "handle은 처리하다, 다루다, 감당하다.",
    "items": [
      {
        "cue": "문제/요청을 처리하다",
        "model": "handle [problem/request]",
        "tier": 1,
        "star": true,
        "example": "Don't worry, I'll handle the refund request before end of day.",
        "exampleKo": "걱정 마, 환불 요청은 내가 오늘 안에 처리할게."
      },
      {
        "cue": "~을 감당하지 못하다 / 처리하지 못하다",
        "model": "can't handle [thing]",
        "tier": 1,
        "star": true,
        "example": "My laptop can't handle two Docker containers at once — it just freezes.",
        "exampleKo": "내 노트북은 도커 컨테이너 두 개를 동시에 감당 못 해. 그냥 멈춰버려."
      },
      {
        "cue": "~을 조심히 다루다",
        "model": "handle [thing] with care",
        "tier": 2,
        "star": true,
        "example": "Handle that box with care, there's glassware inside.",
        "exampleKo": "그 박스 조심히 다뤄, 안에 유리그릇 있어."
      },
      {
        "cue": "~함으로써 처리하다",
        "model": "handle [thing] by [-ing]",
        "tier": 2,
        "star": true,
        "example": "We handled the outage by rolling back to the last stable build.",
        "exampleKo": "마지막 안정 빌드로 롤백해서 장애를 처리했어."
      },
      {
        "cue": "~로부터 온 요청을 처리하다",
        "model": "handle [request] from [person]",
        "tier": 2,
        "star": true,
        "example": "Can you handle the design request from Sarah? She pinged me twice already.",
        "exampleKo": "세라한테 온 디자인 요청 좀 처리해 줄래? 벌써 두 번이나 나한테 연락했어."
      },
      {
        "cue": "~를 대신해 ~을 처리하다",
        "model": "handle [thing] for [person/team]",
        "tier": 2,
        "star": true,
        "example": "I'll handle the deployment for the backend team so they can focus on the bug.",
        "exampleKo": "백엔드 팀 대신 배포는 내가 처리할게, 걔네는 버그에 집중하게."
      },
      {
        "cue": "압박 속에서 ~을 처리하다",
        "model": "handle [thing] under pressure",
        "tier": 2,
        "star": true,
        "example": "She really knows how to handle a launch under pressure — total calm.",
        "exampleKo": "걔는 압박 속에서 출시를 어떻게 처리하는지 확실히 알아. 완전 침착하더라."
      },
      {
        "cue": "~을 파악하다 / 감 잡다",
        "model": "get a handle on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "start to understand or control something",
        "example": "Give me a day to get a handle on the new codebase before I start changing things.",
        "exampleKo": "뭔가 고치기 전에 새 코드베이스 파악하게 하루만 줘."
      },
      {
        "cue": "절차를 통해 처리하다",
        "model": "handle [thing] through [process]",
        "tier": 2,
        "example": "All expense claims are handled through the HR portal now, not email.",
        "exampleKo": "경비 청구는 이제 이메일 말고 다 인사 포털을 통해 처리돼."
      },
      {
        "cue": "~을 ~방식으로 처리하다",
        "model": "handle [thing] in [way]",
        "tier": 2,
        "example": "Let's handle this in a separate ticket so we don't block the release.",
        "exampleKo": "이건 별도 티켓으로 처리하자, 릴리스 막히지 않게."
      },
      {
        "cue": "문제 없이 처리하다",
        "model": "handle [thing] without [problem]",
        "tier": 2,
        "example": "The migration ran overnight and handled all 2 million rows without a hitch.",
        "exampleKo": "마이그레이션이 밤새 돌아서 200만 행을 문제 없이 다 처리했어."
      }
    ]
  },
  {
    "id": "manage",
    "verb": "MANAGE",
    "gloss": "manage는 관리하다, 해내다, 버티다.",
    "items": [
      {
        "cue": "가까스로 ~해내다",
        "model": "manage to [verb]",
        "tier": 1,
        "star": true,
        "easyEn": "succeed in doing something difficult",
        "example": "We were slammed all week, but we managed to ship the update before the deadline.",
        "exampleKo": "한 주 내내 정신없었지만, 마감 전에 가까스로 업데이트를 배포해냈어요."
      },
      {
        "cue": "팀/프로젝트를 관리하다",
        "model": "manage [team/project]",
        "tier": 1,
        "star": true,
        "example": "She manages the whole checkout team now, so loop her in on any payment bugs.",
        "exampleKo": "이제 그녀가 결제 팀 전체를 관리하니까, 결제 버그는 다 그녀한테 공유해."
      },
      {
        "cue": "~없이 해내다",
        "model": "manage without [thing]",
        "tier": 2,
        "star": true,
        "example": "The wifi was down all morning, so we just had to manage without it.",
        "exampleKo": "오전 내내 와이파이가 끊겨서, 그냥 그거 없이 버텨야 했어."
      },
      {
        "cue": "~을 가지고 어떻게든 해내다",
        "model": "manage with [thing]",
        "tier": 2,
        "star": true,
        "example": "I only had my laptop and a bad hotspot, but I managed with that for the demo.",
        "exampleKo": "노트북이랑 신호 약한 핫스팟밖에 없었지만, 그걸로 어떻게든 데모를 해냈어."
      },
      {
        "cue": "~하면서 해내다",
        "model": "manage by [-ing]",
        "tier": 2,
        "star": true,
        "example": "He got through the crunch by managing his time really tightly and skipping meetings.",
        "exampleKo": "그는 시간을 아주 빡빡하게 관리하고 회의를 빼면서 그 바쁜 시기를 버텨냈어."
      },
      {
        "cue": "위기/문제를 헤쳐나가다",
        "model": "manage through [crisis/problem]",
        "tier": 2,
        "star": true,
        "example": "The startup managed through the funding crisis without laying anyone off.",
        "exampleKo": "그 스타트업은 아무도 해고하지 않고 자금 위기를 헤쳐나갔어."
      },
      {
        "cue": "시스템에서 리스크를 관리하다",
        "model": "manage [risk] in [system]",
        "tier": 2,
        "star": true,
        "example": "Our job is to manage fraud risk in the payment system without slowing down real users.",
        "exampleKo": "우리 일은 실제 사용자를 느리게 하지 않으면서 결제 시스템의 사기 리스크를 관리하는 거야."
      },
      {
        "cue": "~명 규모 팀을 관리하다",
        "model": "manage [team] of [number]",
        "tier": 2,
        "example": "At my last job I managed a team of eight engineers across two time zones.",
        "exampleKo": "지난 직장에서 두 개 시간대에 걸쳐 엔지니어 8명 규모 팀을 관리했어요."
      },
      {
        "cue": "~를 위해 ~을 관리하다",
        "model": "manage [thing] for [client/team]",
        "tier": 2,
        "example": "I manage the ad accounts for a couple of e-commerce clients on the side.",
        "exampleKo": "부업으로 이커머스 클라이언트 몇 곳의 광고 계정을 관리하고 있어요."
      },
      {
        "cue": "제약 속에서 ~을 관리하다",
        "model": "manage [thing] under [constraint]",
        "tier": 2,
        "example": "We had to manage the whole launch under a really tight budget.",
        "exampleKo": "우리는 정말 빠듯한 예산 속에서 출시 전체를 관리해야 했어."
      },
      {
        "cue": "~의 기대치를 관리하다",
        "model": "manage [person's] expectations",
        "tier": 2,
        "star": true,
        "example": "Let's be upfront about the timeline so we manage the client's expectations early.",
        "exampleKo": "일정에 대해 솔직하게 말해서 클라이언트 기대치를 미리 관리하자."
      },
      {
        "cue": "상사를 잘 관리하다 / 상향 관리하다",
        "model": "manage up",
        "tier": 3,
        "star": true,
        "easyEn": "handle the relationship with your boss well",
        "example": "Half of doing well here is just learning how to manage up with your boss.",
        "exampleKo": "여기서 잘하는 것의 절반은 그냥 상사를 잘 관리하는 법을 익히는 거야."
      }
    ]
  },
  {
    "id": "change",
    "verb": "CHANGE",
    "gloss": "change는 바꾸다, 변하다, 전환하다.",
    "items": [
      {
        "cue": "~로 변하다 / 옷을 갈아입다",
        "model": "change into [thing]",
        "tier": 1,
        "star": true,
        "example": "Give me two minutes to change into something warmer.",
        "exampleKo": "따뜻한 옷으로 갈아입게 2분만 줘."
      },
      {
        "cue": "A에서 B로 바뀌다",
        "model": "change from A to B",
        "tier": 1,
        "star": true,
        "example": "The meeting changed from 3 to 4, so we've got extra time.",
        "exampleKo": "회의가 3시에서 4시로 바뀌어서 시간이 좀 더 생겼어."
      },
      {
        "cue": "~을 ~로 바꾸다",
        "model": "change [thing] to [thing]",
        "tier": 1,
        "star": true,
        "example": "Can you change the font to something bigger? I can't read it.",
        "exampleKo": "폰트를 좀 더 큰 걸로 바꿔줄래? 잘 안 보여."
      },
      {
        "cue": "옷을 갈아입고 나오다",
        "model": "change out of [clothes]",
        "tier": 1,
        "star": true,
        "example": "Hang on, let me change out of my gym clothes real quick.",
        "exampleKo": "잠깐, 운동복 좀 얼른 갈아입고 올게."
      },
      {
        "cue": "마음을 바꾸다 / 생각을 바꾸다",
        "model": "change [one's] mind",
        "tier": 1,
        "star": true,
        "example": "I was gonna skip the party, but I changed my mind.",
        "exampleKo": "파티 안 가려다가 마음 바꿨어."
      },
      {
        "cue": "~를 위해 바뀌다",
        "model": "change for [reason/person]",
        "tier": 2,
        "star": true,
        "example": "I'm not changing for anyone — this is just who I am.",
        "exampleKo": "누굴 위해서도 안 바꿔. 난 원래 이런 사람이야."
      },
      {
        "cue": "~시스템으로 전환하다",
        "model": "change over to [system]",
        "tier": 2,
        "star": true,
        "example": "We're finally changing over to Slack next month.",
        "exampleKo": "드디어 다음 달에 슬랙으로 전환해."
      },
      {
        "cue": "다시 바꾸다",
        "model": "change back",
        "tier": 2,
        "star": true,
        "example": "I tried the dark theme but changed it back after an hour.",
        "exampleKo": "다크 테마 써봤는데 한 시간 만에 다시 바꿨어."
      },
      {
        "cue": "변화를 주다",
        "model": "change up [routine/design]",
        "tier": 2,
        "star": true,
        "example": "Let's change up the layout — the homepage feels stale.",
        "exampleKo": "레이아웃에 변화 좀 주자. 홈페이지가 좀 식상해."
      },
      {
        "cue": "시간/상황에 따라 바뀌다",
        "model": "change with [time/context]",
        "tier": 2,
        "star": true,
        "example": "My priorities change with whatever's on fire that week.",
        "exampleKo": "내 우선순위는 그 주에 급한 일에 따라 바뀌어."
      },
      {
        "cue": "파일/시스템에서 ~을 바꾸다",
        "model": "change [thing] in [file/system]",
        "tier": 2,
        "example": "You need to change the API key in the .env file, not in the code.",
        "exampleKo": "코드 말고 .env 파일에서 API 키를 바꿔야 해."
      },
      {
        "cue": "화면/페이지에서 ~을 바꾸다",
        "model": "change [thing] on [page/screen]",
        "tier": 2,
        "example": "Change the button color on the checkout page to green.",
        "exampleKo": "결제 페이지에서 버튼 색을 초록색으로 바꿔."
      },
      {
        "cue": "더 좋게 바꾸다",
        "model": "change [thing] for the better",
        "tier": 2,
        "example": "That new manager really changed things for the better.",
        "exampleKo": "그 새 매니저가 상황을 정말 더 좋게 바꿔놨어."
      },
      {
        "cue": "더 나쁘게 바꾸다",
        "model": "change [thing] for the worse",
        "tier": 2,
        "example": "The update changed the app for the worse — it's so slow now.",
        "exampleKo": "업데이트가 앱을 더 나쁘게 만들었어. 이제 엄청 느려."
      },
      {
        "cue": "평소와 달리 / 기분 전환으로",
        "model": "for a change",
        "tier": 2,
        "easyEn": "to do something different from the usual routine",
        "example": "Let's just order takeout tonight for a change.",
        "exampleKo": "오늘은 기분 전환 삼아 그냥 배달 시켜 먹자."
      }
    ]
  },
  {
    "id": "update",
    "verb": "UPDATE",
    "gloss": "update는 갱신하다, 알려주다, 최신화하다.",
    "items": [
      {
        "cue": "~에게 계속 업데이트해주다",
        "model": "keep [person] updated on [thing]",
        "tier": 1,
        "star": true,
        "example": "Keep me updated on the deal with Salesforce, okay?",
        "exampleKo": "세일즈포스랑 하는 거래 계속 나한테 업데이트해줘, 알았지?"
      },
      {
        "cue": "~에게 ~에 대해 업데이트하다",
        "model": "update [person] on [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you update Sarah on where we are with the launch?",
        "exampleKo": "세라한테 우리 출시 진행 상황 좀 업데이트해줄래?"
      },
      {
        "cue": "시스템을 ~버전으로 업데이트하다",
        "model": "update [system] to [version]",
        "tier": 2,
        "star": true,
        "example": "I finally updated my Mac to Sequoia last night.",
        "exampleKo": "어젯밤에 드디어 맥을 세쿼이아 버전으로 업데이트했어."
      },
      {
        "cue": "~에서 가져와 업데이트하다",
        "model": "update [thing] from [source]",
        "tier": 2,
        "star": true,
        "example": "The dashboard updates the numbers straight from Stripe.",
        "exampleKo": "대시보드는 스트라이프에서 바로 숫자를 가져와 업데이트해."
      },
      {
        "cue": "문서를 정보로 업데이트하다",
        "model": "update [document] with [information]",
        "tier": 2,
        "star": true,
        "example": "I updated the doc with the new pricing.",
        "exampleKo": "문서를 새 가격으로 업데이트했어."
      },
      {
        "cue": "~을 위해 업데이트하다",
        "model": "update [thing] for [reason/user]",
        "tier": 2,
        "star": true,
        "example": "We updated the app for our older users who kept complaining about the tiny font.",
        "exampleKo": "글씨 작다고 계속 불평하던 나이 드신 사용자분들을 위해 앱을 업데이트했어."
      },
      {
        "cue": "최신 정보로 업데이트되어 있다",
        "model": "be updated with [latest info]",
        "tier": 2,
        "star": true,
        "example": "Don't worry, the wiki's fully updated with the latest specs.",
        "exampleKo": "걱정 마, 위키는 최신 사양으로 완전히 업데이트돼 있어."
      },
      {
        "cue": "DB/파일에서 필드를 업데이트하다",
        "model": "update [field] in [database/file]",
        "tier": 2,
        "star": true,
        "example": "Just update the status field in the orders table and we're good.",
        "exampleKo": "주문 테이블에서 상태 필드만 업데이트하면 끝이야."
      },
      {
        "cue": "화면/페이지에서 ~을 업데이트하다",
        "model": "update [thing] on [page/screen]",
        "tier": 2,
        "example": "Your balance updates on the home screen right after you pay.",
        "exampleKo": "결제하면 바로 홈 화면에서 잔액이 업데이트돼."
      },
      {
        "cue": "마감 전 업데이트하다",
        "model": "update [thing] before [deadline]",
        "tier": 2,
        "example": "Can you update the slides before the 3 o'clock meeting?",
        "exampleKo": "3시 회의 전에 슬라이드 좀 업데이트해줄 수 있어?"
      },
      {
        "cue": "변경 후 업데이트하다",
        "model": "update [thing] after [change]",
        "tier": 2,
        "example": "I'll update the README after we merge this PR.",
        "exampleKo": "이 PR 머지하고 나서 README 업데이트할게."
      }
    ]
  },
  {
    "id": "feel",
    "verb": "FEEL",
    "gloss": "feel은 감각·감정·직관의 동사다. (몸·마음으로) 느끼다, ~한 기분이다, 만져서 알다, ~인 것 같다, (남의 처지를) 헤아리다.",
    "items": [
      {
        "cue": "~한 기분/상태이다. feel tired / sick / confident. (기분·컨디션 표현의 기본형, 연결동사 용법)",
        "model": "feel [adjective]",
        "tier": 1,
        "star": true,
        "example": "I feel exhausted after that three-hour standup.",
        "exampleKo": "그 세 시간짜리 스탠드업 끝나고 완전 지쳤어."
      },
      {
        "cue": "~하고 싶다. I feel like taking a break. (= want to)",
        "model": "feel like [-ing]",
        "tier": 1,
        "star": true,
        "easyEn": "want to do something",
        "example": "I feel like grabbing tacos for lunch.",
        "exampleKo": "점심으로 타코 먹고 싶다."
      },
      {
        "cue": "편하게/얼마든지 ~하세요. Feel free to reach out. (직장 이메일·슬랙 단골)",
        "model": "feel free to [verb]",
        "tier": 1,
        "star": true,
        "example": "Feel free to ping me on Slack if anything breaks.",
        "exampleKo": "뭔가 깨지면 편하게 슬랙으로 저 태그하세요."
      },
      {
        "cue": "~에 대해 어떻게 느끼다/생각하다. How do you feel about the deadline? (면접·1:1 단골)",
        "model": "feel about [thing]",
        "tier": 1,
        "star": true,
        "example": "How do you feel about pushing the launch to Friday?",
        "exampleKo": "출시를 금요일로 미루는 거 어떻게 생각해?"
      },
      {
        "cue": "~를 불쌍히/안쓰럽게 여기다, 동정하다.",
        "model": "feel sorry for [person]",
        "tier": 1,
        "example": "I feel sorry for the new guy, they threw him on-call his first week.",
        "exampleKo": "신입 진짜 안됐어, 첫 주부터 온콜 시키더라."
      },
      {
        "cue": "~를 안쓰럽게 여기다, 마음으로 헤아리다, 공감하다. I really feel for you.",
        "model": "feel for [person]",
        "tier": 2,
        "easyEn": "feel sympathy for someone who is suffering",
        "example": "You lost the whole PR to a bad rebase? I really feel for you.",
        "exampleKo": "리베이스 잘못해서 PR 통째로 날렸다고? 진짜 마음이 안 좋다."
      },
      {
        "cue": "~할 기운/컨디션이 되다. I don't feel up to it today. (주로 부정·의문문)",
        "model": "feel up to [thing]",
        "tier": 2,
        "easyEn": "have the energy or health to do something",
        "example": "I'm wiped out, I don't feel up to another meeting today.",
        "exampleKo": "완전 뻗었어, 오늘 회의 또 할 기운이 없어."
      },
      {
        "cue": "떠보다, 의중·분위기를 살피다, 간을 보다. Let me feel out the team first.",
        "model": "feel out [person/situation]",
        "tier": 2,
        "easyEn": "carefully find out what someone thinks or feels",
        "example": "Let me feel out the team before we commit to the deadline.",
        "exampleKo": "마감 확정하기 전에 팀 분위기 좀 살펴볼게."
      },
      {
        "cue": "~에 대해 강한 의견/확신을 갖다. I feel strongly about this approach.",
        "model": "feel strongly about [thing]",
        "tier": 2,
        "example": "I feel strongly about keeping the tests in the same PR.",
        "exampleKo": "테스트를 같은 PR에 넣는 거에 대해선 확고한 생각이 있어."
      },
      {
        "cue": "~할 필요를 느끼다. I don't feel the need to refactor it now.",
        "model": "feel the need to [verb]",
        "tier": 2,
        "example": "Honestly, I don't feel the need to rewrite this right now.",
        "exampleKo": "솔직히 이걸 지금 다시 짤 필요는 못 느끼겠어."
      },
      {
        "cue": "~에 대한 감을 잡다, 익숙해지다. get a feel for the codebase. (온보딩 단골)",
        "model": "get a feel for [thing]",
        "tier": 2,
        "easyEn": "become familiar with how something works",
        "example": "Give me a couple days to get a feel for the codebase.",
        "exampleKo": "코드베이스 감 잡게 며칠만 줘."
      },
      {
        "cue": "편안하다, 익숙해서 마음이 놓이다. I feel at home with this stack.",
        "model": "feel at home",
        "tier": 2,
        "easyEn": "feel comfortable and relaxed in a place",
        "example": "I feel at home with the Next.js and Tailwind setup.",
        "exampleKo": "Next.js에 Tailwind 조합은 나한테 아주 익숙해서 편해."
      },
      {
        "cue": "소외감을 느끼다, 끼지 못한/빠진 느낌이 들다.",
        "model": "feel left out",
        "tier": 2,
        "easyEn": "feel excluded from a group",
        "example": "They planned the offsite in the group chat and I totally felt left out.",
        "exampleKo": "단톡방에서 워크숍 다 정해버려서 나만 완전 소외감 들었어."
      },
      {
        "cue": "어울리지 않는/겉도는 느낌이 들다, 어색하다.",
        "model": "feel out of place",
        "tier": 2,
        "easyEn": "feel that you do not belong somewhere",
        "example": "I was the only non-designer in the meeting and felt totally out of place.",
        "exampleKo": "회의에서 디자이너 아닌 사람이 나 혼자라 완전 겉도는 기분이었어."
      },
      {
        "cue": "~가 …하는 것을 느끼다 (지각동사). I felt the floor shake. / I felt my phone buzz.",
        "model": "feel [thing] [verb]",
        "tier": 2,
        "example": "I felt my phone buzz in the middle of the demo.",
        "exampleKo": "데모 중간에 폰이 진동하는 게 느껴졌어."
      },
      {
        "cue": "~라고 생각하다/느끼다 (의견을 부드럽게 말할 때; feel like [clause]보다 격식 있어 직장 이메일·글에 적합). I feel that we should test this first.",
        "model": "feel that [clause]",
        "tier": 2,
        "example": "I feel that we should ship the fix before adding new features.",
        "exampleKo": "새 기능 붙이기 전에 이 수정부터 배포해야 한다고 봐."
      },
      {
        "cue": "~하는 게 편하다/부담 없다, 자신 있다. Do you feel comfortable working with React? (면접 단골)",
        "model": "feel comfortable [-ing]",
        "tier": 2,
        "example": "Do you feel comfortable owning the whole auth flow?",
        "exampleKo": "인증 흐름 전체를 맡는 게 부담 없으세요?"
      },
      {
        "cue": "몸이 좀 안 좋다, 컨디션이 별로다. (관용구)",
        "model": "feel under the weather",
        "tier": 3,
        "easyEn": "feel slightly sick or unwell",
        "example": "I'm gonna work from home today, feeling a bit under the weather.",
        "exampleKo": "오늘은 몸이 좀 안 좋아서 재택할게."
      },
      {
        "cue": "더듬어 나아가다; 조심스럽게/탐색하듯 진행하다. We're still feeling our way.",
        "model": "feel one's way",
        "tier": 3,
        "easyEn": "move or act slowly and carefully while learning",
        "example": "We just started with this framework, so we're still feeling our way.",
        "exampleKo": "이 프레임워크 이제 막 시작해서 아직 더듬더듬 익히는 중이야."
      },
      {
        "cue": "(주로 돈·예산이) 쪼들리다, 경제적 압박을 느끼다. (관용구) Startups feel the pinch when funding dries up.",
        "model": "feel the pinch",
        "tier": 3,
        "easyEn": "have less money than before; struggle with money",
        "example": "With rent up again, everyone on my team is feeling the pinch.",
        "exampleKo": "월세 또 올라서 우리 팀 다들 주머니 사정이 빠듯해."
      },
      {
        "cue": "압박/부담을 받다. The team is feeling the heat before launch.",
        "model": "feel the heat",
        "tier": 3,
        "easyEn": "feel strong pressure or stress",
        "example": "QA found a blocker and now the whole team is feeling the heat.",
        "exampleKo": "QA에서 블로커 하나 찾아서 지금 팀 전체가 압박받고 있어."
      },
      {
        "cue": "(informal·성적) 몸을 더듬다, 추행하다. ※ feel up to와 혼동 금지 — 직장에서 쓰지 말 것.",
        "model": "feel up [person]",
        "tier": 3,
        "easyEn": "touch someone's body in a sexual way",
        "example": "He got fired for trying to feel up a coworker at the party.",
        "exampleKo": "걔 회식에서 동료 몸을 더듬으려다 잘렸어."
      }
    ]
  },
  {
    "id": "send",
    "verb": "SEND",
    "gloss": "send는 무언가를 한 지점에서 다른 지점으로 보내는 동사다. 보내다, 발송하다, 전달하다, (사람을) 부르다, (신호를) 전하다.",
    "items": [
      {
        "cue": "~에게 ~을 보내다 (가장 기본형)",
        "model": "send [thing] to [person]",
        "tier": 1,
        "star": true,
        "example": "Did you send the invoice to Rachel yet?",
        "exampleKo": "레이철한테 청구서 보냈어?"
      },
      {
        "cue": "~에게 ~을 보내주다 (수여동사 2목적어, 예: send me the file)",
        "model": "send [person] [thing]",
        "tier": 1,
        "star": true,
        "example": "Can you send me the file before the standup?",
        "exampleKo": "스탠드업 전에 그 파일 좀 보내줄래?"
      },
      {
        "cue": "(여러 곳에) 발송하다, 배포하다 (이메일·청구서·초대장 등)",
        "model": "send out [thing]",
        "tier": 1,
        "star": true,
        "example": "We're sending out the newsletter tomorrow morning.",
        "exampleKo": "우리 내일 아침에 뉴스레터 발송해."
      },
      {
        "cue": "(이쪽으로/그 사람에게) 보내주다 (예: send over the draft, can you send that over?)",
        "model": "send over [thing]",
        "tier": 1,
        "star": true,
        "example": "Just send over the draft and I'll take a look.",
        "exampleKo": "초안 이쪽으로 보내주면 내가 볼게."
      },
      {
        "cue": "돌려보내다, 반송하다, 반품하다",
        "model": "send back [thing]",
        "tier": 1,
        "star": true,
        "example": "The shirt didn't fit, so I sent it back.",
        "exampleKo": "셔츠가 안 맞아서 반품했어."
      },
      {
        "cue": "제출하다 (지원서·양식), (인력·지원을) 투입하다",
        "model": "send in [thing]",
        "tier": 2,
        "star": true,
        "example": "Make sure you send in your application by Friday.",
        "exampleKo": "금요일까지 지원서 꼭 제출해."
      },
      {
        "cue": "부치다, 발송하다; (떠나는 사람을) 배웅하다",
        "model": "send off [thing]",
        "tier": 2,
        "example": "I sent off the package this morning at the post office.",
        "exampleKo": "오늘 아침에 우체국에서 소포 부쳤어."
      },
      {
        "cue": "(시스템·채널을 통해) 전송하다, 보내 처리하다 (NA에서는 send over가 더 흔함)",
        "model": "send through [thing]",
        "tier": 2,
        "example": "Send the report through and I'll get it approved.",
        "exampleKo": "보고서 시스템으로 전송해 주면 내가 승인받을게."
      },
      {
        "cue": "회람하다, 여러 사람에게 돌리다 (예: send around the agenda)",
        "model": "send around [thing]",
        "tier": 2,
        "easyEn": "give something to many people in turn",
        "example": "Can you send around the agenda before the meeting?",
        "exampleKo": "회의 전에 안건 좀 돌려줄래?"
      },
      {
        "cue": "(오라고) 부르다, 호출하다; 청해서 가져오게 하다 (예: send for help, send for backup)",
        "model": "send for [person/thing]",
        "tier": 2,
        "easyEn": "ask or order someone to come to you",
        "example": "Someone fell on the trail, send for help!",
        "exampleKo": "누가 등산로에서 넘어졌어, 도움 요청해!"
      },
      {
        "cue": "돌려보내다, 내쫓다; 멀리 보내다",
        "model": "send away [person]",
        "tier": 2,
        "example": "He showed up two hours late, so they sent him away.",
        "exampleKo": "그 사람이 두 시간 늦게 와서 그냥 돌려보냈어."
      },
      {
        "cue": "상부에 올리다, (윗선에) 에스컬레이션하다",
        "model": "send [something] up the chain",
        "tier": 2,
        "easyEn": "pass a decision or issue to higher-level managers",
        "example": "This is above my pay grade, let me send it up the chain.",
        "exampleKo": "이건 내 선에서 결정할 수 없어서 윗선에 올릴게."
      },
      {
        "cue": "안부를 전하다",
        "model": "send my/your regards (to [person])",
        "tier": 2,
        "easyEn": "send a friendly greeting to someone",
        "example": "Send my regards to your mom when you see her.",
        "exampleKo": "어머니 뵈면 안부 전해줘."
      },
      {
        "cue": "(받은 것을) 다른 사람에게 전달하다, 포워딩하다 (NA에서는 forward가 더 자연스러움)",
        "model": "send on [thing] (to [person])",
        "tier": 3,
        "easyEn": "pass something you received to another person",
        "example": "I'll send the email on to Mark since it's his account.",
        "exampleKo": "그 이메일 마크 담당이니까 그쪽으로 전달할게."
      },
      {
        "cue": "우편·온라인으로 주문하다 (멀리 신청해서 받다, 예: send away for a brochure)",
        "model": "send away for [thing]",
        "tier": 3,
        "easyEn": "order something by mail and wait for delivery",
        "example": "I sent away for the free sample and it took three weeks.",
        "exampleKo": "무료 샘플을 우편으로 신청했는데 3주나 걸렸어."
      },
      {
        "cue": "(음식 등을) 배달 주문하다 (예: send out for pizza)",
        "model": "send out for [thing]",
        "tier": 3,
        "easyEn": "order food to be delivered to you",
        "example": "Nobody wants to cook, let's send out for pizza.",
        "exampleKo": "아무도 요리하기 싫어하니까 피자 배달 시키자."
      },
      {
        "cue": "쫓아내다, 단칼에 돌려보내다 (관용구)",
        "model": "send [someone] packing",
        "tier": 3,
        "easyEn": "force someone to leave suddenly",
        "example": "The salesman kept pushing, so I sent him packing.",
        "exampleKo": "영업사원이 계속 밀어붙여서 그냥 쫓아냈어."
      },
      {
        "cue": "등골을 오싹하게 만들다 (관용구)",
        "model": "send shivers/chills down [someone's] spine",
        "tier": 3,
        "easyEn": "make someone feel sudden fear or strong emotion",
        "example": "That scream in the dark sent shivers down my spine.",
        "exampleKo": "어둠 속의 그 비명 소리에 등골이 오싹했어."
      },
      {
        "cue": "소식을 전하다, 기별하다 (다소 격식·문어체)",
        "model": "send word (to [person])",
        "tier": 3,
        "easyEn": "send a message or news to someone",
        "example": "Send word when you land and I'll come pick you up.",
        "exampleKo": "도착하면 기별해, 내가 데리러 갈게."
      }
    ]
  },
  {
    "id": "spend",
    "verb": "SPEND",
    "gloss": "spend는 자원을 소모하는 뼈대다. 돈·시간·노력을 어딘가에 쓰거나 들이다, 시간을 보내다.",
    "items": [
      {
        "cue": "[돈]을 [무엇]에 쓰다",
        "model": "spend [money] on [thing]",
        "tier": 1,
        "star": true,
        "example": "I spent way too much money on a mechanical keyboard last week.",
        "exampleKo": "지난주에 기계식 키보드에 돈을 너무 많이 썼어."
      },
      {
        "cue": "[무엇]을 하는 데 [시간]을 쓰다 (예: spend time coding)",
        "model": "spend [time] -ing",
        "tier": 1,
        "star": true,
        "example": "I spent all morning coding and forgot to eat lunch.",
        "exampleKo": "오전 내내 코딩하느라 점심 먹는 걸 깜빡했어."
      },
      {
        "cue": "[사람]과 [시간]을 보내다",
        "model": "spend [time] with [person]",
        "tier": 1,
        "star": true,
        "example": "I want to spend more time with my kids on weekends.",
        "exampleKo": "주말엔 아이들이랑 시간을 더 보내고 싶어."
      },
      {
        "cue": "[장소(도시·나라 등)]에서 [시간]을 보내다",
        "model": "spend [time] in [place]",
        "tier": 1,
        "example": "We spent a week in Tokyo and ate our way through the city.",
        "exampleKo": "우리는 도쿄에서 일주일을 보내면서 실컷 먹고 다녔어."
      },
      {
        "cue": "[회사·특정 장소]에서 [시간]을 보내다/근무하다 (예: spent 3 years at Amazon)",
        "model": "spend [time] at [place/company]",
        "tier": 1,
        "example": "She spent three years at Amazon before joining our team.",
        "exampleKo": "그녀는 우리 팀에 오기 전에 아마존에서 3년 근무했어."
      },
      {
        "cue": "[돈]을 들여 [무엇]을 하다 (예: spent $500 fixing it)",
        "model": "spend [money] -ing [thing]",
        "tier": 2,
        "example": "I spent $500 fixing my car and it broke down again the next day.",
        "exampleKo": "차 고치는 데 500달러를 썼는데 다음 날 또 고장 났어."
      },
      {
        "cue": "([무엇]에) 거금을 쓰다",
        "model": "spend a fortune (on [thing])",
        "tier": 2,
        "easyEn": "spend a very large amount of money",
        "example": "They spent a fortune on their wedding and regretted it later.",
        "exampleKo": "걔네는 결혼식에 거금을 썼는데 나중에 후회했어."
      },
      {
        "cue": "하룻밤을 보내다, 자고 가다",
        "model": "spend the night",
        "tier": 2,
        "easyEn": "sleep at a place overnight",
        "example": "It got late, so I just spent the night at Jake's place.",
        "exampleKo": "늦어져서 그냥 제이크네 집에서 자고 왔어."
      },
      {
        "cue": "제대로/가치 있게 쓴 [돈·시간] (예: time well spent)",
        "model": "[money/time] well spent",
        "tier": 2,
        "easyEn": "worth the money or time you used",
        "example": "That workshop was expensive but honestly it was money well spent.",
        "exampleKo": "그 워크숍 비쌌지만 솔직히 돈값 제대로 한 거야."
      },
      {
        "cue": "예산을 초과해 쓰다, 과소비하다",
        "model": "overspend (the budget)",
        "tier": 2,
        "example": "We overspent the budget again this quarter and marketing is not happy.",
        "exampleKo": "이번 분기에 또 예산을 초과했더니 마케팅팀이 뿔났어."
      },
      {
        "cue": "현명하게 (돈을) 쓰다",
        "model": "spend wisely",
        "tier": 2,
        "example": "Money's tight right now, so we really need to spend wisely.",
        "exampleKo": "지금 돈이 빠듯하니까 정말 현명하게 써야 해."
      },
      {
        "cue": "아낌없이/펑펑 쓰다",
        "model": "spend freely",
        "tier": 2,
        "example": "After he got the bonus, he started spending freely on everything.",
        "exampleKo": "보너스 받고 나서 걔는 뭐든 펑펑 쓰기 시작했어."
      },
      {
        "cue": "(저축·예비 자금·런웨이를) 점점 헐어 써서 줄이다",
        "model": "spend down [savings/reserves]",
        "tier": 3,
        "easyEn": "slowly use up your savings or money over time",
        "example": "If we keep spending down our runway like this, we'll be out of cash by fall.",
        "exampleKo": "이런 식으로 런웨이를 계속 헐어 쓰면 가을엔 돈이 바닥날 거야."
      }
    ]
  },
  {
    "id": "pay",
    "verb": "PAY",
    "gloss": "pay은 \"돈을 치르다\"가 기본 뼈대. 값을 내다, 빚을 갚다, 대가를 치르다, 보답하다, (노력이) 결실을 맺다, 주의를 기울이다.",
    "items": [
      {
        "cue": "~의 값을 치르다, 결제하다; (잘못의) 대가를 치르다",
        "model": "pay for [thing]",
        "tier": 1,
        "star": true,
        "example": "I'll pay for the coffee, you grab the table.",
        "exampleKo": "커피는 내가 낼게, 너는 자리 잡아."
      },
      {
        "cue": "~에 주의를 기울이다, 신경 쓰다",
        "model": "pay attention to [thing]",
        "tier": 1,
        "star": true,
        "example": "Pay attention to the error message before you rerun the script.",
        "exampleKo": "스크립트 다시 돌리기 전에 에러 메시지 잘 봐."
      },
      {
        "cue": "(빚을) 다 갚다; (노력·투자가) 결실을 맺다, 성과를 내다",
        "model": "pay off",
        "tier": 2,
        "star": true,
        "easyEn": "finish paying a debt; or bring a good result",
        "example": "All those late nights finally paid off — we shipped on time.",
        "exampleKo": "그 야근들이 드디어 결실을 맺었어, 제때 출시했잖아."
      },
      {
        "cue": "(빌린) 돈을 갚다; (당한 것을) 되갚다, 앙갚음하다",
        "model": "pay [person] back / pay back [money]",
        "tier": 2,
        "star": true,
        "example": "Can you spot me twenty bucks? I'll pay you back tomorrow.",
        "exampleKo": "20달러만 빌려줄래? 내일 갚을게."
      },
      {
        "cue": "(빚·원금을) 조금씩 갚아 나가다 (예: pay down technical debt = 기술 부채를 줄여 나가다)",
        "model": "pay down [debt]",
        "tier": 2,
        "easyEn": "reduce a debt by paying part of it over time",
        "example": "This sprint we're going to pay down some of that technical debt.",
        "exampleKo": "이번 스프린트엔 기술 부채 좀 갚아 나가려고."
      },
      {
        "cue": "(큰돈·보험금·배당금을) 지급하다, 풀다",
        "model": "pay out [money]",
        "tier": 2,
        "easyEn": "give out a large sum of money",
        "example": "The insurance company paid out fifteen grand for the water damage.",
        "exampleKo": "보험사가 누수 피해로 만 오천 달러를 지급했어."
      },
      {
        "cue": "(마지못해) 돈을 다 내다, 빚을 청산하다",
        "model": "pay up",
        "tier": 2,
        "easyEn": "pay money you owe, often unwillingly",
        "example": "They finally caught him and made him pay up.",
        "exampleKo": "결국 그 사람 잡아서 돈을 다 토해내게 했어."
      },
      {
        "cue": "(계좌·연금·펀드에) 돈을 납입하다, 불입하다",
        "model": "pay into [account]",
        "tier": 2,
        "example": "I pay into my 401(k) every paycheck.",
        "exampleKo": "월급 받을 때마다 퇴직연금에 납입해."
      },
      {
        "cue": "생활비를 벌다, 먹고살게 해 주다; 청구서를 결제하다",
        "model": "pay the bills",
        "tier": 2,
        "easyEn": "earn enough money to cover your living costs",
        "example": "The gig doesn't excite me, but it pays the bills.",
        "exampleKo": "그 일이 신나진 않지만 먹고는 살게 해줘."
      },
      {
        "cue": "(~에 대한) 대가를 치르다, 혹독한 값을 치르다",
        "model": "pay the price (for [thing])",
        "tier": 2,
        "easyEn": "suffer a bad result because of something you did",
        "example": "He skipped testing and paid the price when prod went down.",
        "exampleKo": "테스트를 건너뛰더니 서버가 다운되면서 대가를 치렀어."
      },
      {
        "cue": "임금 인상 / 임금 삭감",
        "model": "a pay raise / a pay cut",
        "tier": 2,
        "example": "She got a pay raise after landing the big client.",
        "exampleKo": "큰 고객을 따내고 나서 임금 인상을 받았어."
      },
      {
        "cue": "카드로 결제하다 / 현금으로 내다",
        "model": "pay by [card] / pay in cash",
        "tier": 2,
        "example": "Can I pay by card, or is it cash only?",
        "exampleKo": "카드로 결제해도 돼요, 아니면 현금만 받아요?"
      },
      {
        "cue": "방문하다, 들르다",
        "model": "pay a visit (to [person/place]) / pay [person] a visit",
        "tier": 2,
        "example": "We paid my grandma a visit over the weekend.",
        "exampleKo": "주말에 할머니 댁에 들렀어."
      },
      {
        "cue": "내 권한·결정 범위 밖이다 (직급상 내가 정할 일이 아니다)",
        "model": "above [one's] pay grade",
        "tier": 3,
        "easyEn": "not something I have the power to decide",
        "example": "Honestly, that call is above my pay grade — ask the director.",
        "exampleKo": "솔직히 그건 내 권한 밖이야, 디렉터한테 물어봐."
      },
      {
        "cue": "(성공·인정 전에) 응당한 고생과 수고를 거치다, 밑바닥부터 경력을 쌓다",
        "model": "pay [one's] dues",
        "tier": 3,
        "easyEn": "work hard for a long time before getting success",
        "example": "He paid his dues doing support before he made senior engineer.",
        "exampleKo": "시니어 엔지니어 되기 전에 그는 서포트 일하면서 밑바닥부터 고생했어."
      },
      {
        "cue": "받은 호의를 (직접 갚는 대신) 다른 사람에게 베풀다",
        "model": "pay it forward",
        "tier": 3,
        "easyEn": "help someone else instead of repaying the person who helped you",
        "example": "A stranger covered my toll, so I paid it forward at the coffee shop.",
        "exampleKo": "모르는 사람이 내 통행료를 내줘서, 나도 커피숍에서 다른 사람한테 베풀었어."
      },
      {
        "cue": "~에게 경의·찬사를 표하다",
        "model": "pay tribute to [person]",
        "tier": 3,
        "easyEn": "publicly show respect or praise for someone",
        "example": "The whole team paid tribute to Maria on her last day.",
        "exampleKo": "팀 전체가 마리아의 마지막 날에 찬사를 보냈어."
      },
      {
        "cue": "(~에) 바가지를 쓰다, 엄청난 돈을 내다",
        "model": "pay through the nose (for [thing])",
        "tier": 3,
        "easyEn": "pay much more money than something is worth",
        "example": "We paid through the nose for parking near the stadium.",
        "exampleKo": "경기장 근처 주차하느라 바가지 썼어."
      },
      {
        "cue": "조의를 표하다, 문상하다; 예를 갖춰 인사하다",
        "model": "pay [one's] respects (to [person])",
        "tier": 3,
        "easyEn": "formally show respect, often to someone who has died",
        "example": "I'm heading to the funeral home to pay my respects.",
        "exampleKo": "조의를 표하러 장례식장에 가는 길이야."
      },
      {
        "cue": "~를 칭찬하다, 칭찬의 말을 건네다",
        "model": "pay [person] a compliment",
        "tier": 3,
        "easyEn": "say something nice and admiring to someone",
        "example": "She paid me a compliment on the deck I put together.",
        "exampleKo": "내가 만든 슬라이드에 대해 그녀가 칭찬을 해줬어."
      },
      {
        "cue": "(입막음·뇌물로) ~를 매수하다, 돈을 주고 입막음하다",
        "model": "pay [person] off",
        "tier": 3,
        "easyEn": "give someone money secretly to keep them quiet",
        "example": "They tried to pay off the witness to keep him quiet.",
        "exampleKo": "그들은 증인 입을 막으려고 돈으로 매수하려 했어."
      }
    ]
  },
  {
    "id": "follow",
    "verb": "FOLLOW",
    "gloss": "follow는 '뒤를 따라가다'가 뼈대다. (사람·사물을) 따라가다, (규칙·지시를) 따르다, (말을) 이해하다, 추적하다, 뒤이어 일어나다.",
    "items": [
      {
        "cue": "지시·규칙·단계를 따르다, 그대로 하다",
        "model": "follow [instructions/rules/steps]",
        "tier": 1,
        "star": true,
        "example": "Just follow the instructions in the README and it'll build fine.",
        "exampleKo": "그냥 README에 있는 지시대로만 하면 문제없이 빌드될 거예요."
      },
      {
        "cue": "후속 조치를 하다; (나중에) 다시 연락하거나 확인하다",
        "model": "follow up",
        "tier": 1,
        "star": true,
        "example": "Thanks for the demo — I'll follow up once I've talked to my team.",
        "exampleKo": "데모 고마워요. 팀이랑 얘기해보고 다시 연락드릴게요."
      },
      {
        "cue": "~에 대해 후속으로 확인·처리하다",
        "model": "follow up on [thing]",
        "tier": 1,
        "star": true,
        "example": "Can you follow up on that invoice? It still hasn't been paid.",
        "exampleKo": "그 청구서 건 좀 확인해줄래요? 아직 결제가 안 됐어요."
      },
      {
        "cue": "~에게 추가로(후속) 연락하다",
        "model": "follow up with [person]",
        "tier": 1,
        "example": "I'll follow up with Sarah about the deadline tomorrow.",
        "exampleKo": "마감일 관련해서 내일 Sarah한테 다시 연락해볼게요."
      },
      {
        "cue": "(시작한 일을) 끝까지 해내다, 약속을 이행하다",
        "model": "follow through",
        "tier": 2,
        "star": true,
        "easyEn": "finish doing what you started or promised",
        "example": "He's full of big ideas but he never follows through.",
        "exampleKo": "걔는 아이디어는 거창한데 끝까지 해내는 법이 없어."
      },
      {
        "cue": "~을 끝까지 이행하다, 완수하다",
        "model": "follow through on [a promise/plan]",
        "tier": 2,
        "easyEn": "fully carry out a promise you made",
        "example": "She actually followed through on her promise to quit smoking.",
        "exampleKo": "걔는 담배 끊겠다는 약속을 진짜로 끝까지 지켰어."
      },
      {
        "cue": "~을 끝까지 밀고 나가다, 실행에 옮기다",
        "model": "follow through with [a plan/decision]",
        "tier": 2,
        "easyEn": "carry a plan all the way to completion",
        "example": "We decided to move to Austin, and we're following through with it.",
        "exampleKo": "우리 Austin으로 이사하기로 했고, 그걸 그대로 밀고 나가는 중이야."
      },
      {
        "cue": "(설명·시범을) 따라 하다, 함께 진행을 따라가다",
        "model": "follow along",
        "tier": 2,
        "star": true,
        "example": "Open your laptop and follow along — I'll go slow.",
        "exampleKo": "노트북 열고 같이 따라 해봐요. 천천히 갈게요."
      },
      {
        "cue": "~을 같이 따라 하다, 보면서 똑같이 진행하다",
        "model": "follow along with [a tutorial/speaker]",
        "tier": 2,
        "example": "I built the whole app just by following along with a YouTube tutorial.",
        "exampleKo": "유튜브 튜토리얼 보면서 그대로 따라 하니까 앱 하나가 통째로 만들어지더라고요."
      },
      {
        "cue": "(말을) 이해 못 하겠다 / 이해돼요?, 알아듣다",
        "model": "I don't follow / do you follow?",
        "tier": 2,
        "star": true,
        "easyEn": "I do not understand what you mean",
        "example": "Wait, I don't follow — why did you delete the branch?",
        "exampleKo": "잠깐, 무슨 말인지 모르겠어요. 브랜치를 왜 지운 거예요?"
      },
      {
        "cue": "대화·논리·흐름을 따라가며 이해하다",
        "model": "follow the conversation/argument/logic",
        "tier": 2,
        "easyEn": "understand something as it develops",
        "example": "The meeting jumped around so much I couldn't follow the conversation.",
        "exampleKo": "회의가 너무 이리저리 튀어서 대화를 따라가질 못하겠더라고요."
      },
      {
        "cue": "절차·규정대로 처리하다 (직장)",
        "model": "follow protocol / follow procedure",
        "tier": 2,
        "example": "I get that it's urgent, but we still have to follow protocol.",
        "exampleKo": "급한 건 알겠는데, 그래도 절차는 지켜야 해요."
      },
      {
        "cue": "~의 주도·방식을 따르다, ~가 하는 대로 하다",
        "model": "follow [someone]'s lead",
        "tier": 2,
        "easyEn": "do what someone else does; let them guide you",
        "example": "I've never been here — I'll just follow your lead.",
        "exampleKo": "난 여기 처음이라, 그냥 네가 하는 대로 따라갈게."
      },
      {
        "cue": "(SNS에서) 맞팔하다, 다시 팔로우해 주다",
        "model": "follow back",
        "tier": 2,
        "example": "Hey, I followed you — follow me back!",
        "exampleKo": "야, 나 너 팔로우했어. 맞팔해줘!"
      },
      {
        "cue": "~을 졸졸 따라다니다",
        "model": "follow [someone] around",
        "tier": 2,
        "example": "My puppy follows me around the house all day.",
        "exampleKo": "우리 강아지가 하루 종일 집 안에서 나를 졸졸 따라다녀."
      },
      {
        "cue": "직감·본능을 따르다",
        "model": "follow your gut / follow your instincts",
        "tier": 2,
        "easyEn": "trust your natural feeling instead of careful thought",
        "example": "The numbers looked fine, but I followed my gut and passed on the deal.",
        "exampleKo": "숫자는 괜찮아 보였지만, 나는 직감을 믿고 그 거래를 안 하기로 했어."
      },
      {
        "cue": "다음과 같다 (목록·내용을 도입할 때)",
        "model": "as follows",
        "tier": 2,
        "easyEn": "as shown next in the following list",
        "example": "The steps to reset your password are as follows.",
        "exampleKo": "비밀번호 재설정 단계는 다음과 같습니다."
      },
      {
        "cue": "후속 (이메일·회의·질문); 후속 연락·조치 (명사형) — 동사 follow up과 구분",
        "model": "a follow-up [email/meeting/question]",
        "tier": 2,
        "example": "I'll send a quick follow-up email with the notes from today.",
        "exampleKo": "오늘 회의 메모 담아서 간단히 후속 이메일 하나 보낼게요."
      },
      {
        "cue": "~에 뒤이어 ~, ~ 다음에 (순서·시간; 기술 문서에서 흔함)",
        "model": "[X] followed by [Y]",
        "tier": 2,
        "example": "The script runs the build, followed by the deploy step.",
        "exampleKo": "그 스크립트는 빌드를 돌리고, 그다음에 배포 단계를 실행해요."
      },
      {
        "cue": "(남이 한 대로) 따라 하다, 선례를 따르다",
        "model": "follow suit",
        "tier": 3,
        "easyEn": "do the same thing someone else just did",
        "example": "Once one store dropped its prices, the others followed suit.",
        "exampleKo": "한 매장이 가격을 내리자, 다른 데들도 따라서 내렸어."
      },
      {
        "cue": "돈의 흐름을 추적하다 (조사·분석)",
        "model": "follow the money",
        "tier": 3,
        "easyEn": "follow where the money goes to find the truth",
        "example": "If you want to know who's really behind it, follow the money.",
        "exampleKo": "누가 진짜 배후인지 알고 싶으면, 돈의 흐름을 쫓아봐."
      }
    ]
  },
  {
    "id": "mean",
    "verb": "MEAN",
    "gloss": "mean은 \"의미·의도·결과\"의 뼈대다. 뜻하다, 작정하다(의도하다), ~를 수반하다·초래하다, 진심이다. ~로 정해져 있다.",
    "items": [
      {
        "cue": "~을 의미하다, 뜻하다 (단어·표현의 뜻). 예: What does this acronym mean?",
        "model": "mean [thing]",
        "tier": 1,
        "star": true,
        "example": "Wait, what does \"idempotent\" actually mean?",
        "exampleKo": "잠깐, \"idempotent\"이 정확히 무슨 뜻이야?"
      },
      {
        "cue": "내 말은, 그러니까 (말 정정·부연하는 회화 필러). 예: I mean, it works, but it's slow.",
        "model": "I mean ...",
        "tier": 1,
        "star": true,
        "easyEn": "used to explain or correct what you just said",
        "example": "I mean, it works, but nobody's touched that code in years.",
        "exampleKo": "내 말은, 돌아가긴 하는데 몇 년 동안 아무도 그 코드 안 건드렸어."
      },
      {
        "cue": "~할 작정이다, ~하려고 하다 (의도). 흔히 부정형: I didn't mean to interrupt = 끼어들 생각은 아니었다.",
        "model": "mean to [verb]",
        "tier": 1,
        "star": true,
        "easyEn": "intend to do something",
        "example": "Sorry, I didn't mean to reply-all on that.",
        "exampleKo": "미안, 그거 전체답장 할 생각은 아니었어."
      },
      {
        "cue": "(말·행동)으로 ~라는 뜻으로 말하다. 예: What do you mean by 'flaky test'?",
        "model": "mean by [thing]",
        "tier": 1,
        "star": true,
        "example": "What do you mean by \"soon\" — today or next week?",
        "exampleKo": "\"곧\"이라는 게 무슨 뜻이야, 오늘이야 다음 주야?"
      },
      {
        "cue": "~하기로 되어 있다, ~해야 한다 (예정·규칙·역할). 예: This script is meant to run nightly.",
        "model": "be meant to [verb]",
        "tier": 2,
        "star": true,
        "easyEn": "be supposed or expected to do something",
        "example": "This job is meant to run every night at 2 a.m.",
        "exampleKo": "이 작업은 매일 새벽 2시에 돌기로 되어 있어."
      },
      {
        "cue": "~에게 큰 의미가 있다, 소중하다. 예: Your review meant a lot to me.",
        "model": "mean [a lot / the world] to [person]",
        "tier": 2,
        "star": true,
        "easyEn": "be very important to someone",
        "example": "Honestly, your feedback on the demo meant a lot to me.",
        "exampleKo": "솔직히, 데모에 대한 네 피드백은 나한테 큰 의미였어."
      },
      {
        "cue": "~를 수반하다, ~라는 뜻이다 (필연적 결과). 예: Refactoring this means rewriting the tests.",
        "model": "mean [-ing] / mean [that-clause]",
        "tier": 2,
        "easyEn": "have something as a necessary result",
        "example": "Switching to the new API means updating every client.",
        "exampleKo": "새 API로 바꾸는 건 모든 클라이언트를 업데이트해야 한다는 뜻이야."
      },
      {
        "cue": "~를 위한 것이다, ~에 딱 맞다/어울리다. 예: This endpoint is meant for internal use only.",
        "model": "be meant for [person / purpose]",
        "tier": 2,
        "easyEn": "be intended for a certain person or use",
        "example": "That dashboard is meant for the ops team, not customers.",
        "exampleKo": "그 대시보드는 고객용이 아니라 운영팀을 위한 거야."
      },
      {
        "cue": "선의로 하다, 악의는 없다 (결과는 별개라는 뉘앙스). 예: He means well, but the PR broke prod.",
        "model": "mean well",
        "tier": 2,
        "easyEn": "want to help, even if the results are bad",
        "example": "He means well, but he keeps merging without reviews.",
        "exampleKo": "그 사람 악의는 없는데, 자꾸 리뷰 없이 머지해."
      },
      {
        "cue": "진심이다, 농담이 아니다. 예: I mean it — ship it today.",
        "model": "mean it",
        "tier": 2,
        "easyEn": "be serious and not joking",
        "example": "Take the rest of the day off — I mean it.",
        "exampleKo": "오늘 남은 시간 쉬어, 진심이야."
      },
      {
        "cue": "~가 ~하도록 의도하다. 예: I didn't mean for the deploy to go out yet.",
        "model": "mean for [person] to [verb]",
        "tier": 2,
        "easyEn": "intend for someone to do something",
        "example": "I didn't mean for you to spend your whole weekend on this.",
        "exampleKo": "네가 주말을 통째로 여기에 쓰라고 한 건 아니었어."
      },
      {
        "cue": "그렇다고 ~인 것은 아니다 (논리적 반박·단서). 예: Just because it compiles doesn't mean it works.",
        "model": "[thing] doesn't mean [that-clause]",
        "tier": 2,
        "example": "Just because it passed CI doesn't mean it's ready to ship.",
        "exampleKo": "CI를 통과했다고 해서 배포 준비가 된 건 아니야."
      },
      {
        "cue": "(그러니까) ~라는 말이지?, ~라는 거야? (상대 말 확인·재진술). 예: You mean the staging server, not prod?",
        "model": "you mean [thing / that-clause]?",
        "tier": 2,
        "easyEn": "used to confirm what someone just said",
        "example": "You mean the staging server, right, not production?",
        "exampleKo": "그러니까 프로덕션 말고 스테이징 서버 말하는 거지?"
      },
      {
        "cue": "무슨 말인지 알지(요)?, 그런 거 있잖아 (이해 확인 회화 태그). 예: It's a bit hacky, if you know what I mean.",
        "model": "know what I mean? / if you know what I mean",
        "tier": 2,
        "easyEn": "used to check the listener understands you",
        "example": "It's kind of held together with duct tape, if you know what I mean.",
        "exampleKo": "그거 대충 임시로 때워 놓은 거야, 무슨 말인지 알지?"
      },
      {
        "cue": "진지하다, 작정하고 덤비다. 예: When the CTO joins the call, they mean business.",
        "model": "mean business",
        "tier": 3,
        "easyEn": "be serious and determined to act",
        "example": "Once legal got involved, you could tell they meant business.",
        "exampleKo": "법무팀이 끼어들고 나니까 작정하고 덤빈다는 게 느껴지더라."
      },
      {
        "cue": "그렇게 될 운명이다, 될 일은 된다. 예: Guess this feature just wasn't meant to be.",
        "model": "(be) meant to be",
        "tier": 3,
        "easyEn": "sure to happen, as if it was always going to",
        "example": "We killed the side project — guess it just wasn't meant to be.",
        "exampleKo": "그 사이드 프로젝트 접었어, 될 일이 아니었나 봐."
      }
    ]
  },
  {
    "id": "seem",
    "verb": "SEEM",
    "gloss": "seem은 '판단·인상'을 다루는 연결동사다. 단정하지 않고 ~인 것 같다, ~처럼 보이다, ~인 듯하다로 부드럽게 말한다.",
    "items": [
      {
        "cue": "~해 보이다, ~인 것 같다 (It seems reasonable. 합리적인 것 같다)",
        "model": "seem [adj]",
        "tier": 1,
        "star": true,
        "example": "That price seems fair for a two-bedroom in Austin.",
        "exampleKo": "오스틴 방 두 개짜리치고 그 가격은 적당한 것 같아."
      },
      {
        "cue": "~하는 것 같다, ~하는 듯하다 (They seem to agree. 동의하는 것 같다)",
        "model": "seem to [verb]",
        "tier": 1,
        "star": true,
        "example": "The new hires seem to like the open office setup.",
        "exampleKo": "신입들이 오픈 오피스 구조를 좋아하는 것 같아."
      },
      {
        "cue": "~인 것 같다, ~처럼 보이다 (It seems like a good idea. 좋은 생각 같다)",
        "model": "seem like [thing]",
        "tier": 1,
        "star": true,
        "example": "Honestly, that seems like a waste of money to me.",
        "exampleKo": "솔직히 그건 돈 낭비인 것 같아."
      },
      {
        "cue": "~인 것 같다, 보아하니 ~이다 (It seems that the build failed. 빌드가 실패한 것 같다)",
        "model": "it seems (that) [clause]",
        "tier": 1,
        "star": true,
        "example": "It seems the CI pipeline broke again overnight.",
        "exampleKo": "밤사이에 CI 파이프라인이 또 깨진 것 같아."
      },
      {
        "cue": "~인 것 같다, ~인 듯하다 (It seems to be working now. 이제 작동하는 것 같다)",
        "model": "seem to be [thing/adj]",
        "tier": 1,
        "star": true,
        "example": "The Wi-Fi seems to be back up now, try it.",
        "exampleKo": "와이파이가 이제 다시 되는 것 같아, 한번 해봐."
      },
      {
        "cue": "아무리 해도 ~이 안 되는 것 같다 (I can't seem to fix it. 도무지 못 고치겠다)",
        "model": "can't seem to [verb]",
        "tier": 1,
        "star": true,
        "example": "I can't seem to get this coffee machine to work.",
        "exampleKo": "이 커피 머신이 도무지 작동을 안 하네."
      },
      {
        "cue": "~하지 않는 것 같다, ~인 것 같지 않다 (It doesn't seem to work. 안 되는 것 같다)",
        "model": "doesn't seem to [verb]",
        "tier": 1,
        "star": true,
        "example": "The link doesn't seem to open on my phone.",
        "exampleKo": "그 링크가 내 폰에서는 안 열리는 것 같아."
      },
      {
        "cue": "~이 있는 것 같다 (There seems to be a delay. 지연이 있는 것 같다)",
        "model": "there seems to be [thing]",
        "tier": 2,
        "example": "There seems to be a mix-up with our lunch order.",
        "exampleKo": "우리 점심 주문에 뭔가 착오가 있는 것 같아."
      },
      {
        "cue": "~인 것 같다 (구어, It seems like nobody noticed. 아무도 못 본 것 같다)",
        "model": "seems like [clause]",
        "tier": 2,
        "example": "Seems like everyone already left for the weekend.",
        "exampleKo": "다들 벌써 주말이라고 퇴근한 것 같네."
      },
      {
        "cue": "마치 ~인 것처럼 보이다 (It seems as if it's stuck. 멈춘 것처럼 보인다)",
        "model": "seem as if / seem as though [clause]",
        "tier": 2,
        "example": "It seems as if the download just froze halfway.",
        "exampleKo": "다운로드가 중간에 멈춘 것처럼 보여."
      },
      {
        "cue": "~인 것 같다 (한 발 물러선 조심스러운 단정; It would seem we underestimated it. 우리가 과소평가한 것 같네요)",
        "model": "it would seem (that) [clause]",
        "tier": 2,
        "example": "It would seem we booked the wrong hotel for the trip.",
        "exampleKo": "보아하니 여행 호텔을 잘못 예약한 것 같네요."
      },
      {
        "cue": "~라고 생각하는/아는/믿는 것 같다 (종종 가벼운 반박 뉘앙스; You seem to think it's easy. 쉽다고 생각하는 것 같네)",
        "model": "seem to think / know / believe [clause]",
        "tier": 2,
        "example": "You seem to think I have all day for this.",
        "exampleKo": "내가 이거에 온종일 매달릴 시간이 있다고 생각하는 것 같네."
      },
      {
        "cue": "그건 맞지 않는/뭔가 이상한 것 같다 (직장에서 자주 쓰는 완곡한 이의 제기)",
        "model": "that doesn't seem right / seems off",
        "tier": 2,
        "example": "These numbers don't seem right, let me double-check the totals.",
        "exampleKo": "이 숫자들이 뭔가 맞지 않는 것 같아, 합계를 다시 확인해볼게."
      },
      {
        "cue": "내가 보기엔 ~인 것 같다 (의견을 완곡하게 말할 때; It seems to me that we should refactor. 내 생각엔 리팩터링해야 할 것 같다)",
        "model": "it seems to me (that) [clause]",
        "tier": 2,
        "example": "It seems to me we should just push the launch to next week.",
        "exampleKo": "내가 보기엔 그냥 출시를 다음 주로 미루는 게 나을 것 같아."
      },
      {
        "cue": "[사람]이 보기엔 ~한 것 같다 (That seems fine to me. 내가 보기엔 괜찮은 것 같다)",
        "model": "seem [adj] to [person]",
        "tier": 2,
        "example": "That plan seems fine to me, let's go with it.",
        "exampleKo": "내가 보기엔 그 계획 괜찮은 것 같아, 그걸로 가자."
      },
      {
        "cue": "(적어도) 그런 것 같네 / 겉보기엔 그렇다",
        "model": "so it seems / or so it seems",
        "tier": 3,
        "easyEn": "that is how it appears, though maybe not true",
        "example": "So the meeting got moved to Friday, or so it seems.",
        "exampleKo": "회의가 금요일로 옮겨진 것 같긴 한데, 겉보기엔 그래."
      }
    ]
  },
  {
    "id": "miss",
    "verb": "MISS",
    "gloss": "miss는 '놓치다'가 뼈대다. 못 잡다·못 맞히다, 빠뜨리다, 빠지다(결석), 그리워하다.",
    "items": [
      {
        "cue": "(버스·비행기·회의·기회를) 놓치다, 못 잡다. ex: miss the bus / miss the meeting",
        "model": "miss [thing]",
        "tier": 1,
        "star": true,
        "example": "I missed the last train, so I'm just gonna grab an Uber home.",
        "exampleKo": "막차를 놓쳐서 그냥 우버 불러서 집에 가려고."
      },
      {
        "cue": "핵심을 놓치다, 요점을 못 잡다. ex: you're missing the point",
        "model": "miss the point",
        "tier": 1,
        "star": true,
        "example": "I think you're missing the point — it's not about the money, it's about respect.",
        "exampleKo": "너 핵심을 놓치고 있는 것 같아. 돈 문제가 아니라 존중의 문제야."
      },
      {
        "cue": "(좋은 기회·혜택을) 놓치다, 못 누리다. ex: miss out on the discount",
        "model": "miss out on [thing]",
        "tier": 1,
        "star": true,
        "example": "Book now or you'll miss out on the early-bird discount.",
        "exampleKo": "지금 예약 안 하면 얼리버드 할인 놓쳐."
      },
      {
        "cue": "(못 껴서) 손해 보다, 빠지다. ex: I don't want you to miss out",
        "model": "miss out",
        "tier": 1,
        "star": true,
        "example": "Come with us to Vegas — I don't want you to miss out.",
        "exampleKo": "우리랑 베가스 가자. 너 빠지는 거 아쉬우니까."
      },
      {
        "cue": "(전화·회의에서 한 말·정보를) 못 듣다, 못 알아듣다. ex: Sorry, I missed that — can you say it again?",
        "model": "miss that / miss [what was said]",
        "tier": 1,
        "star": true,
        "example": "Sorry, I missed that — the connection cut out. Can you say it again?",
        "exampleKo": "미안, 못 들었어. 연결이 끊겼거든. 다시 말해줄래?"
      },
      {
        "cue": "전화를 못 받다; 부재중 전화. ex: I missed your call / a missed call",
        "model": "miss a call / missed call",
        "tier": 1,
        "example": "Hey, I missed your call — was it about the meeting?",
        "exampleKo": "야, 네 전화 못 받았어. 회의 관련이었어?"
      },
      {
        "cue": "빗나가다, 기대에 못 미치다, 핵심을 벗어나다. ex: the demo missed the mark",
        "model": "miss the mark",
        "tier": 2,
        "easyEn": "fail to reach the intended goal or standard",
        "example": "The new ad campaign totally missed the mark with younger users.",
        "exampleKo": "새 광고 캠페인은 젊은 사용자들한테 완전히 헛다리 짚었어."
      },
      {
        "cue": "사라지다, 없어지다, 행방불명되다. ex: the file went missing",
        "model": "go missing",
        "tier": 2,
        "example": "The contract went missing right before the deadline — nobody can find it.",
        "exampleKo": "마감 직전에 계약서가 사라졌어. 아무도 못 찾아."
      },
      {
        "cue": "빠져 있다, 없다. ex: a semicolon is missing / something's missing here",
        "model": "be missing",
        "tier": 2,
        "example": "There's a comma missing on line 12, that's why the build's breaking.",
        "exampleKo": "12번째 줄에 쉼표가 빠져 있어. 그래서 빌드가 깨지는 거야."
      },
      {
        "cue": "(길 안내) 바로 보여요, 못 찾을 리 없어요.",
        "model": "you can't miss it",
        "tier": 2,
        "example": "It's the big red building right on the corner — you can't miss it.",
        "exampleKo": "모퉁이에 있는 큰 빨간 건물이에요. 못 찾을 리 없어요."
      },
      {
        "cue": "아슬아슬하게 놓치다 / 가까스로 피하다. ex: narrowly miss the train",
        "model": "narrowly / barely miss [thing]",
        "tier": 2,
        "example": "We narrowly missed our connecting flight in Chicago by like two minutes.",
        "exampleKo": "시카고에서 환승 비행기를 2분 차이로 아슬아슬하게 놓쳤어."
      },
      {
        "cue": "(절차·단계를) 빠뜨리다, 누락하다. ex: did I miss a step in the setup?",
        "model": "miss a step",
        "tier": 2,
        "example": "Wait, did I miss a step? The app won't connect after install.",
        "exampleKo": "잠깐, 내가 단계를 하나 빠뜨렸나? 설치 후에 앱이 연결이 안 돼."
      },
      {
        "cue": "(기회·타이밍의) 적기를 놓치다. ex: we missed the window to launch",
        "model": "miss the window",
        "tier": 2,
        "easyEn": "miss the right time to do something",
        "example": "If we don't ship by Friday, we'll miss the window for the holiday launch.",
        "exampleKo": "금요일까지 출시 못 하면 연휴 런칭 타이밍을 놓쳐."
      },
      {
        "cue": "(이미 늦어) 기회를 놓치다. ex: we missed the boat on that trend",
        "model": "miss the boat",
        "tier": 3,
        "easyEn": "lose a chance by acting too late",
        "example": "Honestly, we kind of missed the boat on the whole AI hype.",
        "exampleKo": "솔직히 우리 그 AI 열풍은 이미 놓친 셈이야."
      },
      {
        "cue": "흔들림 없이, 당황하지 않고 곧바로. ex: he answered without missing a beat",
        "model": "without missing a beat",
        "tier": 3,
        "easyEn": "responding instantly, with no pause or hesitation",
        "example": "I asked him a tough question and he answered without missing a beat.",
        "exampleKo": "내가 까다로운 질문을 던졌는데 그 사람 조금도 당황 안 하고 바로 답하더라."
      },
      {
        "cue": "들쭉날쭉한, 운에 좌우되는, 일관성 없는. ex: the wifi here is hit or miss",
        "model": "hit or miss",
        "tier": 3,
        "easyEn": "sometimes good, sometimes bad; not reliable",
        "example": "The wifi at this café is hit or miss — great one day, dead the next.",
        "exampleKo": "이 카페 와이파이는 들쭉날쭉해. 어떤 날은 잘 되고 어떤 날은 먹통이야."
      },
      {
        "cue": "무슨 일이 있어도 꼭 갈게/참석할게.",
        "model": "wouldn't miss it (for the world)",
        "tier": 3,
        "easyEn": "I will definitely come; nothing would stop me",
        "example": "Your wedding? Are you kidding — I wouldn't miss it for the world.",
        "exampleKo": "네 결혼식? 무슨 소리야, 무슨 일이 있어도 꼭 갈게."
      },
      {
        "cue": "큰일 날 뻔함, 아슬아슬하게 비켜감 (사고·충돌). ex: that was a near miss",
        "model": "near miss",
        "tier": 3,
        "easyEn": "a situation where an accident was barely avoided",
        "example": "A cyclist swerved right in front of my car — man, that was a near miss.",
        "exampleKo": "자전거 타는 사람이 내 차 바로 앞으로 확 꺾어 들어왔어. 와, 큰일 날 뻔했다."
      }
    ]
  },
  {
    "id": "end",
    "verb": "END",
    "gloss": "end는 '끝'을 다루는 뼈대다. 끝나다, 끝내다, 그리고 결국 ~한 상태/결과에 이르다(end up).",
    "items": [
      {
        "cue": "결국 ~하게 되다, 결국 ~한 처지가 되다 (의도와 다르게 도달한 결말)",
        "model": "end up",
        "tier": 1,
        "star": true,
        "example": "I only went in for coffee, but I ended up buying a whole cake.",
        "exampleKo": "커피만 마시러 갔는데 결국 케이크를 통째로 사고 말았어."
      },
      {
        "cue": "결국 ~하고 말다, 어쩌다 보니 ~하게 되다 (We ended up rewriting the whole thing)",
        "model": "end up [-ing]",
        "tier": 1,
        "star": true,
        "example": "We ended up rewriting the whole auth flow from scratch.",
        "exampleKo": "결국 인증 로직 전체를 처음부터 다시 짜게 됐어."
      },
      {
        "cue": "결국 ~을 갖게/떠안게 되다 (We ended up with a ton of tech debt)",
        "model": "end up with [thing]",
        "tier": 1,
        "star": true,
        "example": "We rushed the release and ended up with a ton of tech debt.",
        "exampleKo": "릴리스를 서두르다가 결국 기술 부채만 잔뜩 떠안았어."
      },
      {
        "cue": "결국 ~에 처하게 되다, ~로 흘러가다 (ended up in prod, ended up in a meeting)",
        "model": "end up in [place/state]",
        "tier": 1,
        "example": "That untested change ended up in prod on a Friday night.",
        "exampleKo": "테스트도 안 한 그 변경이 결국 금요일 밤 프로덕션에 올라갔어."
      },
      {
        "cue": "결국엔, 마지막에 가서는 (긴 과정 끝의 결론)",
        "model": "in the end",
        "tier": 1,
        "star": true,
        "example": "We argued about it for an hour, but in the end we just went with the simplest option.",
        "exampleKo": "한 시간을 티격태격했지만 결국엔 그냥 제일 간단한 방법으로 갔어."
      },
      {
        "cue": "~을 끝내다, 종료하다 (end the call / the meeting / the relationship) — 타동사",
        "model": "end [thing]",
        "tier": 1,
        "star": true,
        "example": "Let's end the call here and pick this up tomorrow.",
        "exampleKo": "오늘 통화는 여기서 끝내고 내일 이어서 하자."
      },
      {
        "cue": "~이 끝날 때까지, (기한) ~까지 (by the end of the day = 오늘 퇴근 전까지/EOD, by the end of the week = 이번 주 안에)",
        "model": "by the end of [time]",
        "tier": 1,
        "star": true,
        "example": "Can you send me the draft by the end of the day?",
        "exampleKo": "오늘 퇴근 전까지 초안 좀 보내줄 수 있어?"
      },
      {
        "cue": "~의 끝에, ~이 끝날 무렵에 (문자 그대로의 위치/시점: at the end of the file / the sprint / the month)",
        "model": "at the end of [thing]",
        "tier": 1,
        "example": "There's a TODO comment at the end of the file you should check.",
        "exampleKo": "파일 끝에 확인해봐야 할 TODO 주석이 하나 있어."
      },
      {
        "cue": "~로 끝나다, ~로 귀결되다 (end in failure / disaster / a tie)",
        "model": "end in [thing]",
        "tier": 2,
        "example": "If we skip QA, this is going to end in disaster.",
        "exampleKo": "QA를 건너뛰면 이건 재앙으로 끝날 거야."
      },
      {
        "cue": "~로 끝맺다, ~으로 마무리하다 (Let's end with a quick recap)",
        "model": "end with [thing]",
        "tier": 2,
        "example": "Let's end with a quick recap of the action items.",
        "exampleKo": "액션 아이템 간단히 정리하는 걸로 마무리하자."
      },
      {
        "cue": "결국 따지고 보면, 중요한 건 (직장에서 핵심을 짚을 때 흔함)",
        "model": "at the end of the day",
        "tier": 2,
        "star": true,
        "easyEn": "in the end, what matters most after everything",
        "example": "At the end of the day, if the customer's happy, we did our job.",
        "exampleKo": "결국 따지고 보면 고객이 만족하면 우리 할 일은 다 한 거야."
      },
      {
        "cue": "끝나다, 막을 내리다 (The sprint came to an end)",
        "model": "come to an end",
        "tier": 2,
        "example": "The sprint came to an end and we still hadn't touched the backlog.",
        "exampleKo": "스프린트가 끝났는데 백로그는 손도 못 댔어."
      },
      {
        "cue": "~을 끝내다, 종결시키다 (격식 있는 표현)",
        "model": "bring [thing] to an end",
        "tier": 2,
        "example": "The new manager brought the endless debate to an end pretty fast.",
        "exampleKo": "새 매니저가 끝없던 논쟁을 꽤 빨리 종결시켰어."
      },
      {
        "cue": "~을 끝장내다, 종식시키다 (put an end to the confusion)",
        "model": "put an end to [thing]",
        "tier": 2,
        "example": "We renamed the variable to put an end to all the confusion.",
        "exampleKo": "혼란을 끝내려고 변수 이름을 아예 바꿔버렸어."
      },
      {
        "cue": "막다른 길, 더 진전 없는 상황 (This approach is a dead end)",
        "model": "dead end",
        "tier": 2,
        "easyEn": "a situation with no way to make progress",
        "example": "I spent two days on this API and it's just a dead end.",
        "exampleKo": "이 API에 이틀을 썼는데 그냥 막다른 길이야."
      },
      {
        "cue": "종단간의, 전 과정 전체의 (end-to-end testing / encryption — 기술 용어)",
        "model": "end-to-end",
        "tier": 2,
        "easyEn": "covering the whole process from start to finish",
        "example": "We need proper end-to-end tests before we ship this.",
        "exampleKo": "이거 배포하기 전에 제대로 된 종단간 테스트가 필요해."
      },
      {
        "cue": "최종 사용자, 실제 쓰는 사람 (제품/기술 맥락)",
        "model": "end user",
        "tier": 2,
        "example": "The end user doesn't care how clever the code is, they just want it to work.",
        "exampleKo": "최종 사용자는 코드가 얼마나 똑똑한지 관심 없어, 그냥 작동하길 바랄 뿐이야."
      },
      {
        "cue": "최종 목표, 궁극적인 목적",
        "model": "end goal",
        "tier": 2,
        "example": "The end goal isn't more features, it's less friction.",
        "exampleKo": "최종 목표는 기능을 늘리는 게 아니라 마찰을 줄이는 거야."
      },
      {
        "cue": "최종 결과물, 모든 게 끝난 뒤의 결과",
        "model": "end result",
        "tier": 2,
        "example": "We changed the plan three times, but the end result looks great.",
        "exampleKo": "계획을 세 번이나 바꿨는데 최종 결과물은 아주 좋아."
      },
      {
        "cue": "프런트엔드(사용자 화면 쪽) / 백엔드(서버 쪽) — 개발 직군·시스템 아키텍처 용어 (front-end developer, back-end service)",
        "model": "front end / back end",
        "tier": 2,
        "easyEn": "the user-facing side / the server side of software",
        "example": "She's a front-end dev, so ask her about the UI and me about the back end.",
        "exampleKo": "걔는 프런트엔드 개발자라 UI는 걔한테 물어보고 백엔드는 나한테 물어봐."
      },
      {
        "cue": "겨우 먹고살다, 수입에 맞춰 빠듯하게 생활하다 (관용구)",
        "model": "make ends meet",
        "tier": 3,
        "easyEn": "earn just enough money to pay for basic needs",
        "example": "After rent went up, we're barely making ends meet.",
        "exampleKo": "월세가 오른 뒤로 우리 겨우 먹고살고 있어."
      },
      {
        "cue": "남은 자잘한 일들을 마무리 짓다, 끝마무리하다",
        "model": "tie up loose ends",
        "tier": 3,
        "easyEn": "finish the small remaining tasks or details",
        "example": "I just need to tie up a few loose ends before I log off.",
        "exampleKo": "퇴근하기 전에 자잘한 일 몇 개만 마무리하면 돼."
      },
      {
        "cue": "~하게 마무리하다 (end the quarter on a high note = 좋게 끝맺다)",
        "model": "end on [a high/low note]",
        "tier": 3,
        "easyEn": "finish in a good or bad way",
        "example": "We closed the big deal Friday, so we ended the quarter on a high note.",
        "exampleKo": "금요일에 큰 계약을 따내서 분기를 좋게 마무리했어."
      },
      {
        "cue": "연이어, 쉬지 않고 계속 (for hours/days on end)",
        "model": "on end",
        "tier": 3,
        "easyEn": "without stopping, for a long time",
        "example": "The server was throwing errors for hours on end last night.",
        "exampleKo": "어젯밤에 서버가 몇 시간이나 쉬지 않고 에러를 뱉었어."
      }
    ]
  },
  {
    "id": "stand",
    "verb": "STAND",
    "gloss": "stand는 '서다'가 뼈대다. 서 있다, 견디다, 위치하다, 입장을 지키다, 의미하다/대표하다.",
    "items": [
      {
        "cue": "일어서다; (구어) ~을 바람맞히다; (IT) 서버·환경을 구축하다/띄우다 (stand up a server/environment)",
        "model": "stand up / stand [person] up",
        "tier": 1,
        "star": true,
        "example": "He stood me up last night, so I just went home and watched Netflix.",
        "exampleKo": "걔가 어젯밤에 날 바람맞혀서, 그냥 집에 가서 넷플릭스 봤어."
      },
      {
        "cue": "두드러지다, 눈에 띄다 (이력서·후보가 돋보이다)",
        "model": "stand out (from [others])",
        "tier": 1,
        "star": true,
        "example": "Her portfolio really stood out from the other applicants.",
        "exampleKo": "그 사람 포트폴리오가 다른 지원자들 사이에서 확실히 눈에 띄었어."
      },
      {
        "cue": "~을 의미하다/~의 약자다 (What does API stand for?); (부정문) ~을 용납하다/좌시하다 (I won't stand for it)",
        "model": "stand for [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to represent or be the short form of something",
        "example": "What does SLA stand for again? I always forget.",
        "exampleKo": "SLA가 무슨 약자였지? 난 맨날 까먹어."
      },
      {
        "cue": "~을 못 견디다, 질색하다",
        "model": "can't stand [thing/-ing]",
        "tier": 1,
        "star": true,
        "easyEn": "to strongly dislike someone or something",
        "example": "I can't stand meetings that could've been an email.",
        "exampleKo": "이메일로 끝낼 수 있는 회의는 정말 못 참겠어."
      },
      {
        "cue": "대기하다; 곁을 지키다; (약속·결정·발언을) 고수하다 (I stand by what I said)",
        "model": "stand by ([person/decision])",
        "tier": 2,
        "star": true,
        "easyEn": "to support someone or stay loyal to a decision",
        "example": "It got messy, but I stand by what I said in the review.",
        "exampleKo": "좀 복잡해지긴 했지만, 난 리뷰에서 한 말 그대로 고수할 거야."
      },
      {
        "cue": "옹호하다, 편들다, (권리를) 위해 나서다 (stand up for yourself)",
        "model": "stand up for [person/thing]",
        "tier": 2,
        "easyEn": "to defend or support someone or something",
        "example": "You've got to stand up for yourself when they pile on the work.",
        "exampleKo": "일을 잔뜩 떠넘길 땐 네 목소리를 내야 해."
      },
      {
        "cue": "(강자·압력에) 맞서다; (혹사·검증을) 견뎌내다 (stand up to scrutiny)",
        "model": "stand up to [person/pressure]",
        "tier": 2,
        "easyEn": "to resist or face someone or something strong",
        "example": "Let's make sure this design can stand up to a load test before we ship.",
        "exampleKo": "배포하기 전에 이 설계가 부하 테스트를 견딜 수 있는지 확인하자."
      },
      {
        "cue": "(부재중인) ~을 대신하다, 대타로 뛰다",
        "model": "stand in for [person]",
        "tier": 2,
        "easyEn": "to take someone's place for a while",
        "example": "Can you stand in for me at the standup? I've got a dentist appointment.",
        "exampleKo": "나 대신 스탠드업 좀 들어가 줄래? 치과 예약이 있어서."
      },
      {
        "cue": "뒤로 물러서다; (거리를 두고) 한발 떨어져 객관적으로 보다",
        "model": "stand back",
        "tier": 2,
        "example": "Let me stand back for a second and look at the bigger picture here.",
        "exampleKo": "잠깐 한발 물러서서 전체 그림을 좀 볼게."
      },
      {
        "cue": "(비상·경계·동원을) 해제하다, 철수하다 (We can stand down now) — 온콜/인시던트 상황에서 흔함; (직책에서) 물러나다·사퇴하다 (이 뜻은 주로 英, 美는 step down)",
        "model": "stand down",
        "tier": 2,
        "easyEn": "to stop being on alert or active duty",
        "example": "The incident's resolved, so we can stand down now.",
        "exampleKo": "장애 다 해결됐으니까 이제 대기 해제해도 돼."
      },
      {
        "cue": "(하는 일 없이) 빈둥거리며 서 있다",
        "model": "stand around",
        "tier": 2,
        "example": "Don't just stand around, grab a box and help us move.",
        "exampleKo": "멀뚱히 서 있지 말고, 박스 하나 들고 이사 좀 도와."
      },
      {
        "cue": "(성공할) 가능성이 있다 (주로 부정문: don't stand a chance)",
        "model": "stand a chance (of [-ing])",
        "tier": 2,
        "easyEn": "to have a real possibility of succeeding",
        "example": "Honestly, we don't stand a chance against them in the finals.",
        "exampleKo": "솔직히 결승에서 걔네한테는 우리가 이길 가능성이 없어."
      },
      {
        "cue": "현재 상황으로는, 지금 이대로라면",
        "model": "as it stands / as things stand",
        "tier": 2,
        "easyEn": "in the current situation; as things are now",
        "example": "As it stands, we're not going to make Friday's deadline.",
        "exampleKo": "지금 이대로면 금요일 마감은 못 맞출 것 같아."
      },
      {
        "cue": "(수치·기록이) ~에 달하다, ~이다 (Revenue stands at $1M)",
        "model": "stand at [number]",
        "tier": 2,
        "easyEn": "to be at a particular level or amount",
        "example": "Our monthly revenue currently stands at about 40 grand.",
        "exampleKo": "우리 월 매출이 현재 대략 4만 달러쯤 돼."
      },
      {
        "cue": "(어떤 사안에 대해) 어떤 입장·상황인지 묻다 (Where do we stand on the deadline?) — 회의에서 진행 상황·합의 여부 확인 시 자주 씀",
        "model": "where do [you/we] stand (on [thing])",
        "tier": 2,
        "easyEn": "what is your opinion or current status on something",
        "example": "Where do we stand on the launch date? Are we still good for Monday?",
        "exampleKo": "출시일은 어떻게 됐어? 월요일 그대로 가는 거 맞아?"
      },
      {
        "cue": "~을 얻을/잃을 처지·가능성이 크다 (You stand to gain a lot)",
        "model": "stand to [gain/lose]",
        "tier": 3,
        "easyEn": "to be likely to gain or lose something",
        "example": "If this deal goes through, you stand to make a fortune.",
        "exampleKo": "이 거래가 성사되면 넌 큰돈을 벌 수 있어."
      },
      {
        "cue": "물러서지 않고 자기 입장을 고수하다",
        "model": "stand one's ground",
        "tier": 3,
        "easyEn": "to refuse to change your opinion when others oppose you",
        "example": "Everyone pushed back, but she stood her ground on the pricing.",
        "exampleKo": "다들 반대했지만, 그 사람은 가격 문제에서 물러서지 않았어."
      },
      {
        "cue": "(입장·원칙을) 확고히 지키다, 굽히지 않다",
        "model": "stand firm (on [thing])",
        "tier": 3,
        "easyEn": "to keep your opinion strongly and refuse to change",
        "example": "We stood firm on the refund policy and they finally backed off.",
        "exampleKo": "우리가 환불 정책을 확고히 지키니까 걔네가 결국 물러섰어."
      },
      {
        "cue": "세월의 검증을 견디다, 오래도록 통하다",
        "model": "stand the test of time",
        "tier": 3,
        "easyEn": "to stay good or valid over many years",
        "example": "Good old plain text still stands the test of time.",
        "exampleKo": "오래된 그냥 텍스트 파일이 여전히 세월의 검증을 견뎌내네."
      },
      {
        "cue": "내가 틀렸음을 인정하다, 정정을 받아들이다 (I stand corrected)",
        "model": "stand corrected",
        "tier": 3,
        "easyEn": "to admit that you were wrong",
        "example": "Oh, you're right, it was 2019 not 2020 — I stand corrected.",
        "exampleKo": "아, 네 말이 맞네, 2020년이 아니라 2019년이었어. 내가 틀렸어."
      },
      {
        "cue": "당연하다, 이치에 맞다 (It stands to reason that…)",
        "model": "stand to reason",
        "tier": 3,
        "easyEn": "to be logical or obvious",
        "example": "It stands to reason that fewer meetings means more actual work gets done.",
        "exampleKo": "회의가 적을수록 실제 일이 더 많이 된다는 건 당연한 얘기지."
      }
    ]
  },
  {
    "id": "fall",
    "verb": "FALL",
    "gloss": "fall은 \"떨어지다/넘어지다\"가 뼈대. 가치·수치가 하락하다, 어떤 상태로 빠지다, 계획이 무산되다, 어떤 범주에 속하다.",
    "items": [
      {
        "cue": "잠들다",
        "model": "fall asleep",
        "tier": 1,
        "star": true,
        "example": "I fell asleep on the couch before the game even ended.",
        "exampleKo": "경기가 끝나기도 전에 소파에서 잠들었어."
      },
      {
        "cue": "(~와) 사랑에 빠지다",
        "model": "fall in love (with [person])",
        "tier": 1,
        "star": true,
        "example": "I fell in love with Portland the first time I visited.",
        "exampleKo": "처음 갔을 때 포틀랜드에 홀딱 반해버렸어."
      },
      {
        "cue": "부서지다, 무너지다; (계획·관계가) 와해되다; (사람이 정신적으로) 무너지다",
        "model": "fall apart",
        "tier": 1,
        "star": true,
        "example": "My headphones are falling apart, the left ear barely works.",
        "exampleKo": "내 헤드폰이 망가지고 있어, 왼쪽 귀가 거의 안 돼."
      },
      {
        "cue": "(계획·거래가) 무산되다, 깨지다, 성사되지 못하다",
        "model": "fall through",
        "tier": 2,
        "star": true,
        "easyEn": "(of a plan or deal) to fail to happen",
        "example": "The apartment deal fell through, so we're back to searching.",
        "exampleKo": "그 아파트 거래가 무산돼서 다시 집을 알아보고 있어."
      },
      {
        "cue": "(일정·진도에서) 뒤처지다, 밀리다",
        "model": "fall behind",
        "tier": 2,
        "star": true,
        "example": "I fell behind this sprint, still catching up on tickets.",
        "exampleKo": "이번 스프린트에서 뒤처져서 아직 티켓들 따라잡는 중이야."
      },
      {
        "cue": "(지불·업무가) 밀리다, ~을 제때 못 따라가다",
        "model": "fall behind on [payments/work]",
        "tier": 2,
        "example": "We fell behind on rent for a couple months after the layoff.",
        "exampleKo": "해고당하고 나서 두어 달 월세가 밀렸어."
      },
      {
        "cue": "(여의치 않을 때) ~에 의지하다, ~을 비상수단으로 쓰다 (cf. 명사 fallback)",
        "model": "fall back on [plan/skill/person]",
        "tier": 2,
        "star": true,
        "easyEn": "to use something for support when other plans fail",
        "example": "If the API times out, we just fall back on the cached data.",
        "exampleKo": "API가 타임아웃되면 그냥 캐시된 데이터에 의지해."
      },
      {
        "cue": "(속임수에) 속아넘어가다; (~에게) 홀딱 반하다",
        "model": "fall for [it] / fall for [person]",
        "tier": 2,
        "star": true,
        "easyEn": "to be tricked; or to become attracted to someone",
        "example": "Don't fall for it, that email is a phishing scam.",
        "exampleKo": "속지 마, 그 이메일 피싱 사기야."
      },
      {
        "cue": "(목표·기대에) 못 미치다, 부족하다",
        "model": "fall short (of [goal/expectation])",
        "tier": 2,
        "star": true,
        "easyEn": "to fail to reach a goal or expectation",
        "example": "Sales fell short of our target by about ten percent.",
        "exampleKo": "매출이 목표에 10퍼센트 정도 못 미쳤어."
      },
      {
        "cue": "~의 범주에 속하다, ~ 소관이다 (it falls under my team)",
        "model": "fall under [category/jurisdiction]",
        "tier": 2,
        "star": true,
        "easyEn": "to belong to a category or be someone's responsibility",
        "example": "That request falls under the design team, not us.",
        "exampleKo": "그 요청은 우리가 아니라 디자인 팀 소관이야."
      },
      {
        "cue": "떨어져 나가다; (수치·수요·품질이) 감소하다, 줄다",
        "model": "fall off",
        "tier": 2,
        "example": "App downloads really fell off after the holidays.",
        "exampleKo": "연휴 지나고 앱 다운로드가 확 줄었어."
      },
      {
        "cue": "~에 속하다; (습관·함정에) 빠지다",
        "model": "fall into [category/habit/trap]",
        "tier": 2,
        "easyEn": "to enter a group, a habit, or a trap",
        "example": "It's easy to fall into the habit of checking Slack every five minutes.",
        "exampleKo": "5분마다 슬랙 확인하는 습관에 빠지기 쉬워."
      },
      {
        "cue": "(머리카락·이빨이) 빠지다; (사이가) 틀어지다 — 단, 다툼 뜻은 NA에선 명사 \"have a falling-out\"이 더 자연스러움",
        "model": "fall out",
        "tier": 2,
        "example": "My hair started falling out from all the stress last year.",
        "exampleKo": "작년에 스트레스 때문에 머리가 빠지기 시작했어."
      },
      {
        "cue": "뒤로 물러나다, 후퇴하다; (시계를) 한 시간 되돌리다 (서머타임 해제, \"spring forward, fall back\")",
        "model": "fall back",
        "tier": 2,
        "example": "Don't forget the clocks fall back an hour this weekend.",
        "exampleKo": "이번 주말에 시계 한 시간 되돌리는 거 잊지 마."
      },
      {
        "cue": "넘어지다, 쓰러지다; (논리·계획이) 허점을 드러내다, 무너지다",
        "model": "fall down",
        "tier": 2,
        "example": "The whole plan falls down if the vendor can't deliver on time.",
        "exampleKo": "업체가 제때 납품 못 하면 계획 전체가 무너져."
      },
      {
        "cue": "넘어지다, 자빠지다; (물건이) 쓰러지다",
        "model": "fall over",
        "tier": 2,
        "example": "The ladder fell over the second I stepped off it.",
        "exampleKo": "내가 내려서자마자 사다리가 쓰러졌어."
      },
      {
        "cue": "(관리 소홀로) 누락되다, 빠뜨려져 처리 안 되다 (= slip through the cracks)",
        "model": "fall through the cracks",
        "tier": 2,
        "easyEn": "to be missed or forgotten by mistake",
        "example": "That bug fell through the cracks because nobody owned the ticket.",
        "exampleKo": "그 버그는 아무도 티켓을 맡지 않아서 누락됐어."
      },
      {
        "cue": "(일이) 제자리를 찾다, 맞아떨어지다, 정리되다",
        "model": "fall into place",
        "tier": 2,
        "easyEn": "(of things) to become clear and organized as expected",
        "example": "Once we hired a PM, everything just fell into place.",
        "exampleKo": "PM을 뽑고 나니까 모든 게 딱딱 맞아떨어졌어."
      },
      {
        "cue": "(농담·시도·발표가) 먹히지 않다, 반응 없이 실패하다",
        "model": "fall flat",
        "tier": 2,
        "easyEn": "to fail to get the wanted reaction",
        "example": "My joke totally fell flat in the standup this morning.",
        "exampleKo": "오늘 아침 스탠드업에서 내 농담이 완전히 먹히지 않았어."
      },
      {
        "cue": "(책임·부담이) ~에게 돌아가다; (날짜가) ~에 해당하다",
        "model": "fall on [person] / fall on [date]",
        "tier": 2,
        "easyEn": "(duty) to become someone's job; (date) to happen on",
        "example": "The cleanup work always falls on me somehow.",
        "exampleKo": "뒷정리 일은 어쩐지 늘 나한테 돌아와."
      },
      {
        "cue": "병이 나다, 앓아눕다 (다소 격식체; NA 구어로는 보통 get sick)",
        "model": "fall ill",
        "tier": 2,
        "example": "She fell ill right before the big presentation.",
        "exampleKo": "그녀는 중요한 발표 직전에 병이 났어."
      },
      {
        "cue": "~의 희생양이 되다, ~에 당하다 (fall victim to a scam / fall prey to phishing)",
        "model": "fall victim to [thing] / fall prey to [thing]",
        "tier": 2,
        "easyEn": "to be harmed or affected by something bad",
        "example": "My uncle fell victim to a crypto scam and lost his savings.",
        "exampleKo": "삼촌이 암호화폐 사기의 희생양이 돼서 저축을 다 날렸어."
      },
      {
        "cue": "(계획·습관 등이) 흐지부지되다, 도중에 밀려나 중단되다",
        "model": "fall by the wayside",
        "tier": 3,
        "easyEn": "to be abandoned or stop being done over time",
        "example": "My gym routine fell by the wayside once work got busy.",
        "exampleKo": "일이 바빠지면서 운동 루틴이 흐지부지됐어."
      },
      {
        "cue": "(인기·사용·애정에서) 밀려나다; ~의 총애를 잃다, 더 이상 쓰이지 않게 되다 (the library fell out of favor/use)",
        "model": "fall out of [favor/use/love]",
        "tier": 3,
        "easyEn": "to stop being popular, used, or loved",
        "example": "Fax machines have totally fallen out of use at our office.",
        "exampleKo": "우리 사무실에선 팩스기가 완전히 안 쓰이게 됐어."
      }
    ]
  },
  {
    "id": "catch",
    "verb": "CATCH",
    "gloss": "catch는 '잡다/붙잡다'가 뼈대다. (날아오는 걸) 받다, 따라잡다, 알아채다·알아듣다, (병에) 걸리다, (현장을) 들키게 잡다, 시간 맞춰 타다.",
    "items": [
      {
        "cue": "따라잡다; 밀린 일을 처리하다; (오랜만에) 근황을 나누다 (Let's catch up sometime)",
        "model": "catch up",
        "tier": 1,
        "star": true,
        "example": "We haven't talked in forever — let's catch up over coffee this weekend.",
        "exampleKo": "우리 진짜 오랜만이다 — 이번 주말에 커피 마시면서 근황 나누자."
      },
      {
        "cue": "밀린 ~을 만회하다 (catch up on sleep / email / work)",
        "model": "catch up on [thing]",
        "tier": 1,
        "star": true,
        "example": "I'm gonna stay in tonight and catch up on sleep.",
        "exampleKo": "오늘 밤엔 집에 있으면서 밀린 잠 좀 자려고."
      },
      {
        "cue": "~와 근황을 나누다; (앞선) ~를 따라잡다",
        "model": "catch up with [person]",
        "tier": 1,
        "star": true,
        "example": "I grabbed lunch with Sarah yesterday to catch up with her.",
        "exampleKo": "어제 사라랑 점심 먹으면서 근황 나눴어."
      },
      {
        "cue": "(말을) 알아듣다·알아채다 (Sorry, I didn't catch that)",
        "model": "(didn't) catch [that]",
        "tier": 1,
        "star": true,
        "easyEn": "to hear or understand what someone said",
        "example": "Sorry, I didn't catch that — can you say it again?",
        "exampleKo": "죄송해요, 못 알아들었는데 다시 말씀해 주실래요?"
      },
      {
        "cue": "(병에) 걸리다",
        "model": "catch a cold / catch the flu",
        "tier": 1,
        "star": true,
        "easyEn": "to become sick with a cold or flu",
        "example": "Half the office is out — everyone's catching a cold right now.",
        "exampleKo": "사무실 절반이 결근이야 — 지금 다들 감기 걸리는 중이야."
      },
      {
        "cue": "(차편을) 시간 맞춰 잡아타다",
        "model": "catch the bus / catch a flight",
        "tier": 1,
        "star": true,
        "easyEn": "to get on a bus or plane in time",
        "example": "I gotta run or I'll miss catching the bus.",
        "exampleKo": "빨리 가야 해, 안 그러면 버스 놓쳐."
      },
      {
        "cue": "(뒤처졌다가) ~의 수준까지 따라잡다 (catch up to the competition)",
        "model": "catch up to [person/thing]",
        "tier": 2,
        "example": "We're behind, but a couple good releases and we'll catch up to the competition.",
        "exampleKo": "우리가 뒤처져 있긴 한데, 좋은 출시 몇 번이면 경쟁사 수준까지 따라잡을 거야."
      },
      {
        "cue": "(아이디어·유행이) 인기를 얻다·자리잡다; 이해하다·감을 잡다",
        "model": "catch on",
        "tier": 2,
        "star": true,
        "easyEn": "to become popular; or to start to understand",
        "example": "Nobody used the app at first, but it's really catching on now.",
        "exampleKo": "처음엔 아무도 그 앱을 안 썼는데, 요즘 진짜 인기 끌고 있어."
      },
      {
        "cue": "~을 알아차리다·간파하다",
        "model": "catch on to [thing]",
        "tier": 2,
        "easyEn": "to start to understand or notice something",
        "example": "It took the team a while to catch on to what he was actually planning.",
        "exampleKo": "팀이 그가 실제로 뭘 계획하는지 알아채기까지 좀 걸렸어."
      },
      {
        "cue": "~의 허를 찌르다, 방심한 틈을 노리다 (The question caught me off guard)",
        "model": "catch [person] off guard",
        "tier": 2,
        "star": true,
        "easyEn": "to surprise someone who is not ready",
        "example": "Their question about the budget totally caught me off guard.",
        "exampleKo": "예산에 대한 그 질문에 완전히 허를 찔렸어."
      },
      {
        "cue": "~가 ...하는 현장을 잡다·들키다 (catch them in the act)",
        "model": "catch [person] doing [-ing]",
        "tier": 2,
        "star": true,
        "easyEn": "to find someone while they are doing something",
        "example": "I caught the dog eating my sandwich off the counter.",
        "exampleKo": "강아지가 조리대에서 내 샌드위치 먹는 현장을 딱 잡았어."
      },
      {
        "cue": "(놓친 내용을) ~에게 알려줘 따라잡게 하다 (Can you catch me up on the project?)",
        "model": "catch [person] up",
        "tier": 2,
        "easyEn": "to tell someone the news they missed",
        "example": "I missed standup — can you catch me up on the project?",
        "exampleKo": "스탠드업 놓쳤어 — 프로젝트 어떻게 됐는지 알려줄 수 있어?"
      },
      {
        "cue": "~에 휘말리다·휩쓸리다; ~에 푹 몰두하다",
        "model": "get caught up in [thing]",
        "tier": 2,
        "easyEn": "to become very involved in something",
        "example": "I got so caught up in the game I forgot to eat dinner.",
        "exampleKo": "게임에 너무 빠져서 저녁 먹는 것도 깜빡했어."
      },
      {
        "cue": "~의 눈길을 끌다",
        "model": "catch [person]'s eye",
        "tier": 2,
        "easyEn": "to attract someone's attention or notice",
        "example": "That red jacket in the window really caught my eye.",
        "exampleKo": "진열창의 저 빨간 재킷이 딱 눈에 들어왔어."
      },
      {
        "cue": "~의 주의·관심을 끌다",
        "model": "catch [person]'s attention",
        "tier": 2,
        "example": "You need a strong subject line to catch people's attention in email.",
        "exampleKo": "이메일에서 사람들 관심 끌려면 제목이 강해야 해."
      },
      {
        "cue": "~을 흘끗 보다",
        "model": "catch a glimpse of [thing]",
        "tier": 2,
        "example": "I only caught a glimpse of the actor as he rushed into the hotel.",
        "exampleKo": "그 배우가 호텔로 급히 들어가는 걸 흘끗 봤을 뿐이야."
      },
      {
        "cue": "불이 붙다; (인기가) 급속히 번지다",
        "model": "catch fire",
        "tier": 2,
        "easyEn": "to start burning; or to quickly become very popular",
        "example": "That new show caught fire on TikTok and now everyone's watching it.",
        "exampleKo": "그 새 드라마가 틱톡에서 확 떠서 이제 다들 보고 있어."
      },
      {
        "cue": "숨을 고르다·돌리다",
        "model": "catch your breath",
        "tier": 2,
        "easyEn": "to rest until you can breathe normally again",
        "example": "Give me a sec to catch my breath — those stairs are no joke.",
        "exampleKo": "잠깐만, 숨 좀 돌리고 — 저 계단 장난 아니네."
      },
      {
        "cue": "나중에 봐 (격식 없는 작별 인사)",
        "model": "catch you later",
        "tier": 2,
        "easyEn": "an informal way to say goodbye",
        "example": "Alright, I'm heading out — catch you later!",
        "exampleKo": "자, 나 갈게 — 나중에 봐!"
      },
      {
        "cue": "~의 낌새를 채다, ~에 대한 소문을 듣다 (cf. get wind of)",
        "model": "catch wind of [thing]",
        "tier": 3,
        "easyEn": "to hear news or a rumor about something",
        "example": "The boss caught wind of the layoffs before they were announced.",
        "exampleKo": "사장이 발표 전에 정리해고 낌새를 미리 챘어."
      },
      {
        "cue": "운이 트이다 (보통 부정문: can't catch a break)",
        "model": "catch a break",
        "tier": 3,
        "easyEn": "to get a bit of good luck",
        "example": "First my car breaks down, now this — I just can't catch a break.",
        "exampleKo": "차 고장 나더니 이제 이것까지 — 진짜 되는 일이 하나도 없네."
      },
      {
        "cue": "현행범으로·딱 걸린 채로 붙잡다",
        "model": "catch [person] red-handed",
        "tier": 3,
        "easyEn": "to find someone just as they do something wrong",
        "example": "Security caught him red-handed slipping the watch into his pocket.",
        "exampleKo": "경비가 그가 시계를 주머니에 넣는 걸 현행범으로 딱 잡았어."
      }
    ]
  },
  {
    "id": "watch",
    "verb": "WATCH",
    "gloss": "watch는 시간을 들여 주의 깊게 본다. 지켜보다, 감시하다, 시청하다, 조심하다, 보살피다.",
    "items": [
      {
        "cue": "~을 보다, 시청하다 (TV·영상·경기 등을 시간 들여 보는 것)",
        "model": "watch [show/video/thing]",
        "tier": 1,
        "star": true,
        "example": "I stayed up till 2 watching the whole season of The Bear.",
        "exampleKo": "나 새벽 2시까지 '더 베어' 시즌 전체를 다 봤어."
      },
      {
        "cue": "조심해! 위험해! (갑작스런 경고)",
        "model": "watch out",
        "tier": 1,
        "star": true,
        "example": "Watch out! There's a car backing up.",
        "exampleKo": "조심해! 차가 후진하고 있어."
      },
      {
        "cue": "~을 조심하다, ~을 경계하며 살피다 (조심해야 할 대상)",
        "model": "watch out for [thing/person]",
        "tier": 1,
        "star": true,
        "example": "Watch out for the third step, it's loose.",
        "exampleKo": "세 번째 계단 조심해, 헐거워."
      },
      {
        "cue": "~가 …하는 것을 지켜보다 (지각동사: watch him leave / watch her coding)",
        "model": "watch [person] [verb/-ing]",
        "tier": 1,
        "star": true,
        "example": "I love watching my dog chase squirrels in the yard.",
        "exampleKo": "난 우리 개가 마당에서 다람쥐 쫓는 걸 보는 게 너무 좋아."
      },
      {
        "cue": "~이 나타나는지 주의해서 살피다, ~을 기다리며 지켜보다 (watch out for의 '위험 경계'보다 '징후·등장'을 기다리는 쪽 뉘앙스)",
        "model": "watch for [thing]",
        "tier": 2,
        "example": "Watch for the confirmation email, it should land in a few minutes.",
        "exampleKo": "확인 이메일 오는지 잘 봐, 몇 분 안에 올 거야."
      },
      {
        "cue": "~을 보살피다, 지켜주다 (책임지고 돌봄)",
        "model": "watch over [person/thing]",
        "tier": 2,
        "example": "Can you watch over the kids while I run to the store?",
        "exampleKo": "나 가게 잠깐 다녀올 동안 애들 좀 봐줄래?"
      },
      {
        "cue": "조심해, 말조심해 (가벼운 경고·위협)",
        "model": "watch it",
        "tier": 2,
        "easyEn": "Be careful, or stop what you are doing.",
        "example": "Hey, watch it — that coffee's still hot.",
        "exampleKo": "야, 조심해 — 그 커피 아직 뜨거워."
      },
      {
        "cue": "몸조심해, 행동 조심해",
        "model": "watch yourself",
        "tier": 2,
        "easyEn": "Be careful with how you behave.",
        "example": "It's a rough neighborhood at night, so watch yourself.",
        "exampleKo": "밤에는 좀 험한 동네니까 몸조심해."
      },
      {
        "cue": "발밑 조심해; (비유) 언행·처신을 조심해",
        "model": "watch your step",
        "tier": 2,
        "easyEn": "Be careful where you walk or how you act.",
        "example": "Watch your step, the floor's still wet.",
        "exampleKo": "발밑 조심해, 바닥 아직 젖었어."
      },
      {
        "cue": "말조심해, 욕설·무례한 말 삼가",
        "model": "watch your mouth / watch your language",
        "tier": 2,
        "easyEn": "Do not say rude or offensive words.",
        "example": "Watch your mouth, your grandma's right there.",
        "exampleKo": "말조심해, 할머니 바로 옆에 계셔."
      },
      {
        "cue": "등 뒤를 조심해 (배신·위험을 경계하라)",
        "model": "watch your back",
        "tier": 2,
        "easyEn": "Stay alert for danger or people who might hurt you.",
        "example": "After that layoff, everyone's telling him to watch his back.",
        "exampleKo": "그 정리해고 이후로 다들 그한테 등 뒤 조심하라고 하더라."
      },
      {
        "cue": "watch the time = 시간을 신경 쓰다, 늦지 않게 시간을 확인하다. (※ watch the clock은 '지루해서/빨리 끝나길 바라며 시계만 들여다보다'라는 부정적 관용구 뉘앙스도 있음 — a clock-watcher)",
        "model": "watch the time / watch the clock",
        "tier": 2,
        "example": "We gotta watch the time, our flight boards in 40 minutes.",
        "exampleKo": "시간 신경 써야 해, 우리 비행기 40분 뒤에 탑승 시작이야."
      },
      {
        "cue": "(로그·빌드·테스트·지표를) 모니터링하다, 돌아가는 걸 지켜보다 (개발 현장; watch [thing]의 '감시·관찰' 용법)",
        "model": "watch the logs / build / tests / metrics",
        "tier": 2,
        "example": "I'll watch the logs while you push the fix to staging.",
        "exampleKo": "네가 스테이징에 수정본 올리는 동안 내가 로그 지켜볼게."
      },
      {
        "cue": "내 담당·책임 하에 (여기서 watch는 명사 '근무·당번'; Not on my watch! = 내가 있는 한 안 돼 / happened on my watch = 내 근무 중에 터졌다)",
        "model": "on [my/someone's] watch",
        "tier": 2,
        "easyEn": "While someone is in charge or on duty.",
        "example": "Not on my watch — we are not shipping with that bug.",
        "exampleKo": "내가 있는 한 안 돼 — 그 버그 있는 채로 배포 못 해."
      },
      {
        "cue": "망을 보다, 경계 서다 (watch는 명사)",
        "model": "keep watch",
        "tier": 2,
        "easyEn": "Guard a place and look out for danger.",
        "example": "You grab some sleep, I'll keep watch for a couple hours.",
        "exampleKo": "넌 좀 자, 내가 두어 시간 망 볼게."
      },
      {
        "cue": "두고 보다, 섣불리 움직이지 않고 관망하다 (NA에서는 'wait and see'가 더 흔함)",
        "model": "watch and wait / wait-and-see",
        "tier": 2,
        "example": "Let's just wait and see how the numbers look next week.",
        "exampleKo": "그냥 다음 주에 수치가 어떻게 나오는지 두고 보자."
      },
      {
        "cue": "보고 배워 (시범 보일 때 쓰는, 약간 으스대는 듯한 구어 표현)",
        "model": "watch and learn",
        "tier": 3,
        "easyEn": "Watch how I do it and learn from me.",
        "example": "You've been struggling with that knot for ten minutes — here, watch and learn.",
        "exampleKo": "너 그 매듭 10분째 씨름하고 있잖아 — 자, 보고 배워."
      }
    ]
  },
  {
    "id": "back",
    "verb": "BACK",
    "gloss": "back은 뒤를 받쳐 주는 동작이다. 뒤로 가다(후진), 뒤를 봐주다(지지·후원), 한 발 물러서다, 뒤로 미루다.",
    "items": [
      {
        "cue": "백업하다(자료) / 후진하다(차) / 뒷받침하다(주장을 데이터로) / (교통·하수·일이) 밀리다, 막히다 (I'm backed up with work = 일이 밀렸다)",
        "model": "back up",
        "tier": 1,
        "star": true,
        "example": "Did you back up the database before the migration? I'm kind of backed up with tickets so I forgot.",
        "exampleKo": "마이그레이션 전에 DB 백업했어? 나 티켓이 밀려서 깜빡했어."
      },
      {
        "cue": "~를 지지하다, 편들다, 거들어 주다 (회의·논쟁에서 같은 편을 들어 줌)",
        "model": "back [person] up",
        "tier": 1,
        "star": true,
        "example": "If Sarah pushes back on the deadline in standup, back me up on this.",
        "exampleKo": "스탠드업에서 사라가 마감일 두고 딴지 걸면 내 편 좀 들어줘."
      },
      {
        "cue": "물러나다, 손 떼다, (압박·간섭을) 거두다. 'Back off!' = 비켜/그만 좀 해",
        "model": "back off",
        "tier": 1,
        "star": true,
        "example": "Just back off for a second and let me finish the demo.",
        "exampleKo": "잠깐만 좀 물러나 있어, 데모 좀 끝내게."
      },
      {
        "cue": "(주장·입장에서) 물러서다, 굽히다, 양보하다",
        "model": "back down",
        "tier": 2,
        "star": true,
        "easyEn": "Stop arguing and give up your position.",
        "example": "He wouldn't back down even after the data proved him wrong.",
        "exampleKo": "데이터가 틀렸다는 걸 보여줬는데도 걔는 물러서질 않더라."
      },
      {
        "cue": "(약속·거래·계획에서) 발을 빼다, 발뺌하다, 막판에 빠지다",
        "model": "back out",
        "tier": 2,
        "star": true,
        "easyEn": "Withdraw from a plan or agreement.",
        "example": "They backed out at the last minute, so now we're short a person.",
        "exampleKo": "걔네가 막판에 발을 빼서 지금 한 명 부족해."
      },
      {
        "cue": "~(약속·계약·거래)에서 발을 빼다, 손을 떼다, 취소하다",
        "model": "back out of [something]",
        "tier": 2,
        "star": true,
        "easyEn": "Withdraw from a plan, deal, or promise.",
        "example": "We backed out of the deal once we saw the fine print.",
        "exampleKo": "세부 조항 보고 나서 우리는 그 거래에서 손 뗐어."
      },
      {
        "cue": "지지하다, 후원하다, (돈을) 대다, (후보·프로젝트에) 베팅하다 (back a startup = 스타트업에 투자·지원하다)",
        "model": "back [something/someone]",
        "tier": 2,
        "star": true,
        "easyEn": "Support, fund, or invest in someone or something.",
        "example": "A couple of angels are backing the startup, so runway isn't a problem yet.",
        "exampleKo": "엔젤 투자자 몇 명이 그 스타트업에 돈을 대서 아직 런웨이는 문제 없어."
      },
      {
        "cue": "~의 후원·뒷받침을 받다 (data-backed = 데이터로 뒷받침된, a VC-backed startup = VC 투자를 받은 스타트업)",
        "model": "be backed by [something/someone]",
        "tier": 2,
        "easyEn": "Be supported or funded by someone.",
        "example": "Every claim in the deck is backed by real usage numbers.",
        "exampleKo": "덱에 있는 모든 주장은 실제 사용 수치로 뒷받침돼 있어."
      },
      {
        "cue": "연달아, 연속으로 (back-to-back meetings = 회의가 줄줄이 연달아 있음)",
        "model": "back-to-back",
        "tier": 2,
        "star": true,
        "easyEn": "One right after another with no gap.",
        "example": "I've got back-to-back meetings until 4, ping me after.",
        "exampleKo": "4시까지 회의가 줄줄이라, 그 다음에 연락 줘."
      },
      {
        "cue": "왔다 갔다 / (의견·이메일을) 주고받다, 옥신각신하다 (go back and forth = 결론 없이 계속 주고받다)",
        "model": "back and forth",
        "tier": 2,
        "star": true,
        "example": "We went back and forth over email all morning and still didn't settle it.",
        "exampleKo": "오전 내내 이메일로 왔다 갔다 했는데도 결론을 못 냈어."
      },
      {
        "cue": "~의 뒤를 봐주다, 든든히 지지하다 ('I've got your back' = 내가 뒤에서 받쳐 줄게)",
        "model": "have [person]'s back",
        "tier": 2,
        "star": true,
        "easyEn": "Support and protect someone who needs help.",
        "example": "Don't worry about the review, I've got your back.",
        "exampleKo": "리뷰 걱정 마, 내가 뒤에서 받쳐 줄게."
      },
      {
        "cue": "~에서 뒷걸음치다 / (입장·약속·계획에서) 슬그머니 발을 빼다, 거리를 두다",
        "model": "back away from [something]",
        "tier": 2,
        "example": "Management is quietly backing away from the return-to-office plan.",
        "exampleKo": "경영진이 사무실 복귀 계획에서 슬그머니 발을 빼고 있어."
      },
      {
        "cue": "후진해서 들어가다(주차) / 후진하다 ~를 들이받다 / (숫자를) 역산해서 구하다",
        "model": "back into [something]",
        "tier": 2,
        "example": "Back into the spot by the garage so it's easier to load in the morning.",
        "exampleKo": "차고 옆 자리에 후진으로 대, 아침에 짐 싣기 편하게."
      },
      {
        "cue": "~를 궁지로 몰다, 빠져나갈 수 없게 만들다",
        "model": "back [someone] into a corner",
        "tier": 2,
        "easyEn": "Force someone into a position with no escape.",
        "example": "Don't back him into a corner or he'll just say no to everything.",
        "exampleKo": "걔를 궁지로 몰지 마, 그럼 다 거절해 버려."
      },
      {
        "cue": "~를 뒤로 미루다, 후순위로 돌리다 (당장 급하지 않은 일로 제쳐 둠)",
        "model": "put [something] on the back burner",
        "tier": 2,
        "easyEn": "Delay something to deal with it later.",
        "example": "Let's put the redesign on the back burner and ship the bug fixes first.",
        "exampleKo": "리디자인은 일단 뒤로 미루고 버그 수정부터 내보내자."
      },
      {
        "cue": "약속을 어기다, 말을 번복하다, 한 말을 뒤집다",
        "model": "go back on [one's word/promise]",
        "tier": 2,
        "easyEn": "Break a promise you made.",
        "example": "He went back on his word about the raise, so I'm updating my resume.",
        "exampleKo": "걔가 연봉 인상 약속을 번복해서, 나 이력서 다시 손보는 중이야."
      },
      {
        "cue": "(배포·코드·변경·정책을) 되돌리다, 롤백하다, 이전 버전으로 복구하다 (roll back the deploy = 배포를 롤백하다)",
        "model": "roll back [something]",
        "tier": 2,
        "star": true,
        "easyEn": "Return something to an earlier version or state.",
        "example": "Prod is throwing errors, roll back the deploy now.",
        "exampleKo": "프로덕션에서 에러 나, 지금 배포 롤백해."
      },
      {
        "cue": "(다른 방법이 안 될 때) ~에 의지하다, ~를 대비책·차선책으로 쓰다 (fall back on a default = 기본값으로 되돌아가다)",
        "model": "fall back on [something]",
        "tier": 2,
        "easyEn": "Use something as a backup when other options fail.",
        "example": "If the API times out, we fall back on the cached response.",
        "exampleKo": "API가 타임아웃 나면 캐시된 응답을 차선책으로 써."
      },
      {
        "cue": "~를 줄이다, 절감하다 (cut back on spending/meetings = 지출·회의를 줄이다)",
        "model": "cut back on [something]",
        "tier": 2,
        "easyEn": "Reduce the amount of something.",
        "example": "We're cutting back on recurring meetings to free up focus time.",
        "exampleKo": "집중 시간 확보하려고 정기 회의를 줄이고 있어."
      },
      {
        "cue": "(실패·병·부진에서) 회복하다, 다시 일어서다, 반등하다 (bounce back from a setback = 좌절에서 다시 일어서다)",
        "model": "bounce back",
        "tier": 2,
        "easyEn": "Recover quickly after a problem or illness.",
        "example": "Rough launch week, but the numbers bounced back by Friday.",
        "exampleKo": "출시 주간은 험했는데, 금요일쯤엔 수치가 다시 반등했어."
      },
      {
        "cue": "대략적인 어림 계산, 봉투 뒷면 계산 (정밀하지 않은 빠른 추정 — 면접 추정 문제에서 자주 씀)",
        "model": "back-of-the-envelope [calculation]",
        "tier": 3,
        "easyEn": "A rough, quick estimate that is not exact.",
        "example": "Give me a back-of-the-envelope number for hosting costs before we commit.",
        "exampleKo": "확정하기 전에 호스팅 비용 대략 어림잡아서 알려줘."
      }
    ]
  },
  {
    "id": "write",
    "verb": "WRITE",
    "gloss": "write는 글·기호를 표면에 남기는 동사다. (글을) 쓰다, 적다, 작성하다, (코드를) 짜다, (편지·메일로) 연락하다.",
    "items": [
      {
        "cue": "~을 적어두다, 메모하다",
        "model": "write down [thing]",
        "tier": 1,
        "star": true,
        "example": "Hold on, let me write down your number before I forget.",
        "exampleKo": "잠깐, 잊어버리기 전에 네 번호 좀 적어둘게."
      },
      {
        "cue": "코드를 작성하다, 코딩하다",
        "model": "write code",
        "tier": 1,
        "star": true,
        "example": "I've been writing code all morning and I still haven't fixed the bug.",
        "exampleKo": "오전 내내 코딩했는데 아직도 그 버그를 못 고쳤어."
      },
      {
        "cue": "(보고서·문서·노트를) 정식으로 작성하다, 정리해서 쓰다",
        "model": "write up [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you write up the meeting notes and send them to the team?",
        "exampleKo": "회의 노트 정리해서 팀에 보내줄 수 있어?"
      },
      {
        "cue": "~을 (특정 언어로) 작성하다 (예: write it in Python)",
        "model": "write [thing] in [language]",
        "tier": 2,
        "example": "Just write it in Python, everyone on the team already knows it.",
        "exampleKo": "그냥 파이썬으로 짜, 팀원들 다 파이썬 알잖아."
      },
      {
        "cue": "~에게 편지·메일을 쓰다, 연락하다",
        "model": "write to [person]",
        "tier": 2,
        "star": true,
        "example": "I wrote to their support team but nobody's gotten back to me yet.",
        "exampleKo": "거기 고객지원팀에 메일 보냈는데 아직 아무도 답이 없어."
      },
      {
        "cue": "~에게 (이메일·편지를) 써 보내다 — 미국식은 to 없이 쓰기도 함 (예: write me an email, I'll write you)",
        "model": "write [person] [thing]",
        "tier": 2,
        "example": "Write me an email with the details and I'll take a look tonight.",
        "exampleKo": "자세한 내용 메일로 보내주면 오늘 밤에 볼게."
      },
      {
        "cue": "(빚·자산을) 손실 처리하다, 탕감하다, 장부에서 지우다",
        "model": "write off [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "Cancel a debt or record something as a loss.",
        "example": "The client never paid, so we just wrote off the debt.",
        "exampleKo": "그 고객이 결국 돈을 안 내서 그냥 손실 처리했어."
      },
      {
        "cue": "답장하다, 회신하다",
        "model": "write back (to [person])",
        "tier": 2,
        "example": "She wrote back within five minutes saying she was in.",
        "exampleKo": "그 사람 5분 만에 하겠다고 답장 왔어."
      },
      {
        "cue": "(생략 없이) 풀어서 다 적다; (수표·처방전을) 작성하다",
        "model": "write out [thing]",
        "tier": 2,
        "example": "Don't use the abbreviation, just write out the full company name.",
        "exampleKo": "약자 쓰지 말고 회사 이름 다 풀어서 적어."
      },
      {
        "cue": "~에 대해 (글을) 쓰다",
        "model": "write about [thing]",
        "tier": 2,
        "example": "He's writing about how he quit his job to travel for a year.",
        "exampleKo": "그 사람은 직장 그만두고 1년 동안 여행한 얘기를 쓰고 있어."
      },
      {
        "cue": "~을 가망 없다고 단념하다, ~로 치부하다 (예: write it off as a fluke)",
        "model": "write off [thing/person] as [X]",
        "tier": 2,
        "easyEn": "Decide someone or something is not important or useful.",
        "example": "One bad review? I'd just write it off as a fluke.",
        "exampleKo": "안 좋은 리뷰 하나? 나라면 그냥 어쩌다 그런 거라고 넘길래."
      },
      {
        "cue": "~에 기고하다, ~를 위해 글을 쓰다",
        "model": "write for [publication/company]",
        "tier": 2,
        "example": "She writes for The Atlantic now, mostly tech pieces.",
        "exampleKo": "그 사람 지금 애틀랜틱에 기고해, 주로 테크 관련 글."
      },
      {
        "cue": "(회사·방송에) 의견·문의 편지를 보내다",
        "model": "write in (to [company/show])",
        "tier": 2,
        "easyEn": "Send a letter or message to an organization.",
        "example": "If you're that unhappy with it, write in to the company and complain.",
        "exampleKo": "그게 그렇게 불만이면 회사에 편지 보내서 항의해."
      },
      {
        "cue": "(계약·코드·규정에) ~을 명시해 넣다",
        "model": "write [thing] into [contract/code]",
        "tier": 2,
        "easyEn": "Include something officially in a contract or code.",
        "example": "Make sure they write the deadline into the contract before you sign.",
        "exampleKo": "서명하기 전에 마감일을 계약서에 꼭 명시하게 해."
      },
      {
        "cue": "수표를 쓰다, 발행하다",
        "model": "write a check",
        "tier": 2,
        "example": "Who even writes a check anymore? Just Venmo me.",
        "exampleKo": "요즘 누가 수표를 써, 그냥 벤모로 보내."
      },
      {
        "cue": "~을 서면으로 받아두다, 문서로 남기다",
        "model": "get [thing] in writing",
        "tier": 2,
        "easyEn": "Get something as a written, official record.",
        "example": "Get that promise in writing, don't just take his word for it.",
        "exampleKo": "그 약속 서면으로 받아둬, 말만 믿지 말고."
      },
      {
        "cue": "(투표용지에) 후보 이름을 직접 적어 넣다",
        "model": "write in [name]",
        "tier": 3,
        "easyEn": "Add a candidate not printed on the ballot.",
        "example": "Neither candidate was any good, so I wrote in my brother's name.",
        "exampleKo": "두 후보 다 별로여서 그냥 우리 형 이름을 적어 넣었어."
      },
      {
        "cue": "별것 아니다, 특별히 내세울 것 없다",
        "model": "nothing to write home about",
        "tier": 3,
        "easyEn": "Not special or impressive.",
        "example": "The new update is fine, but honestly nothing to write home about.",
        "exampleKo": "새 업데이트 나쁘진 않은데, 솔직히 별로 내세울 건 없어."
      },
      {
        "cue": "(능력·입지 덕에) 원하는 조건을 마음대로 정하다",
        "model": "write your own ticket",
        "tier": 3,
        "easyEn": "Set your own terms because you are highly valued.",
        "example": "With three offers on the table, she can basically write her own ticket.",
        "exampleKo": "제안이 세 개나 들어와서 그 사람은 사실상 조건을 마음대로 정할 수 있어."
      }
    ]
  },
  {
    "id": "read",
    "verb": "READ",
    "gloss": "read는 글자·신호를 의미로 바꾸는 동사다. 읽다, 해석하다, (분위기·의도를) 파악하다, (계기가) 가리키다, (글이) ~라고 쓰여 있다.",
    "items": [
      {
        "cue": "(책·글·코드를) 읽다",
        "model": "read [thing]",
        "tier": 1,
        "star": true,
        "example": "I read the whole PR before lunch and left a few comments.",
        "exampleKo": "점심 전에 PR 전체를 다 읽고 코멘트 몇 개 남겼어."
      },
      {
        "cue": "~에 대해 (글로) 읽다, 읽어서 접하다",
        "model": "read about [topic]",
        "tier": 1,
        "star": true,
        "example": "I read about the layoffs on Bloomberg this morning.",
        "exampleKo": "오늘 아침에 블룸버그에서 정리해고에 대한 기사를 읽었어."
      },
      {
        "cue": "(특정 주제를) 미리 공부하다, 사전 조사하다 (read up on the company before the interview)",
        "model": "read up on [topic]",
        "tier": 2,
        "star": true,
        "easyEn": "study a subject by reading about it beforehand",
        "example": "Read up on the company before your interview tomorrow.",
        "exampleKo": "내일 면접 전에 그 회사에 대해 미리 좀 조사해 둬."
      },
      {
        "cue": "처음부터 끝까지 다 읽다, 통독하다",
        "model": "read through [thing]",
        "tier": 2,
        "star": true,
        "example": "Can you read through the contract before we sign it?",
        "exampleKo": "우리 서명하기 전에 계약서 처음부터 끝까지 좀 읽어봐 줄래?"
      },
      {
        "cue": "(글·문서를) 검토하다, 살펴보다 (read over my essay)",
        "model": "read over [thing]",
        "tier": 2,
        "star": true,
        "example": "Mind reading over my email to the client real quick?",
        "exampleKo": "내가 고객한테 보낼 이메일 좀 빨리 검토해 줄 수 있어?"
      },
      {
        "cue": "(실제보다) 확대 해석하다, 없는 의미를 갖다 붙이다 (don't read too much into it)",
        "model": "read into [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "Find a meaning that is not really there.",
        "example": "He just said hi, don't read too much into it.",
        "exampleKo": "그냥 인사한 거야, 너무 확대 해석하지 마."
      },
      {
        "cue": "소리 내어 읽다, (목록·결과를) 낭독하다; (시스템이 값을) 출력하다",
        "model": "read out [thing]",
        "tier": 2,
        "example": "She read out the winners at the end of the ceremony.",
        "exampleKo": "그녀가 시상식 끝에 수상자들을 낭독했어."
      },
      {
        "cue": "(계기·화면·목록에서) 수치를 읽어 내다, 읽어 주다",
        "model": "read off [thing]",
        "tier": 2,
        "easyEn": "read a value from a screen, gauge, or list",
        "example": "Just read off the numbers on the meter and I'll type them in.",
        "exampleKo": "계량기 숫자만 읽어 줘, 내가 입력할게."
      },
      {
        "cue": "(받아 적은 내용을) 다시 읽어 확인해 주다 (read it back to me)",
        "model": "read back [thing]",
        "tier": 2,
        "easyEn": "read something aloud again to confirm it is correct",
        "example": "Let me read it back to you so we're sure I got the address right.",
        "exampleKo": "주소 제대로 받아 적었는지 확인하게 다시 읽어줄게."
      },
      {
        "cue": "~로 해석하다, ~라는 뜻으로 받아들이다 (I read that as a yes)",
        "model": "read [thing] as [meaning]",
        "tier": 2,
        "example": "He didn't say no, so I read that as a yes.",
        "exampleKo": "싫다고는 안 했으니까 나는 그걸 승낙으로 받아들였어."
      },
      {
        "cue": "(표지판·문서에) ~라고 쓰여 있다, ~라고 적혀 있다",
        "model": "[sign/text] reads ...",
        "tier": 2,
        "star": true,
        "example": "The sign on the door reads \"Closed for renovations.\"",
        "exampleKo": "문에 붙은 표지판에 \"공사로 인해 휴업\"이라고 쓰여 있어."
      },
      {
        "cue": "분위기를 읽다, 좌중의 분위기를 파악하다",
        "model": "read the room",
        "tier": 2,
        "star": true,
        "easyEn": "Sense the mood and feelings of the people present.",
        "example": "He kept cracking jokes at the funeral—he just can't read the room.",
        "exampleKo": "걔는 장례식에서 계속 농담을 하더라, 분위기를 진짜 못 읽어."
      },
      {
        "cue": "행간을 읽다, 숨은 뜻을 파악하다",
        "model": "read between the lines",
        "tier": 2,
        "star": true,
        "easyEn": "Understand the hidden meaning that is not stated directly.",
        "example": "Her email was polite, but read between the lines and she's furious.",
        "exampleKo": "이메일은 정중했지만 행간을 읽어 보면 완전 화나 있는 거야."
      },
      {
        "cue": "~의 마음을 읽다, 속을 꿰뚫어 보다",
        "model": "read [someone]'s mind",
        "tier": 2,
        "easyEn": "Know exactly what someone is thinking.",
        "example": "I was about to order pizza—are you reading my mind?",
        "exampleKo": "나 방금 피자 시키려던 참인데, 너 내 마음 읽는 거야?"
      },
      {
        "cue": "소리 내어 읽다",
        "model": "read aloud / read out loud",
        "tier": 2,
        "example": "Read the last paragraph aloud so everyone can hear it.",
        "exampleKo": "다들 들을 수 있게 마지막 문단 소리 내서 읽어 줘."
      },
      {
        "cue": "(중단하지 말고) 계속 읽어 나가다 (Read on to find out more)",
        "model": "read on",
        "tier": 2,
        "example": "Read on to find out how the project finally shipped.",
        "exampleKo": "그 프로젝트가 결국 어떻게 출시됐는지 계속 읽어 보세요."
      },
      {
        "cue": "~의 속마음을 훤히 들여다보다",
        "model": "read [someone] like a book",
        "tier": 3,
        "easyEn": "Easily understand what someone thinks or feels.",
        "example": "You can't hide anything from me—I read you like a book.",
        "exampleKo": "넌 나한테 아무것도 못 숨겨, 네 속을 훤히 들여다보거든."
      },
      {
        "cue": "(프로그램이 데이터·파일을) 읽어 들이다, 입력받다",
        "model": "read in [data/file]",
        "tier": 3,
        "easyEn": "Load data or a file into a program.",
        "example": "The script reads in the CSV and dumps it straight into the database.",
        "exampleKo": "그 스크립트가 CSV를 읽어 들여서 바로 DB에 넣어."
      },
      {
        "cue": "(음성·낭독을) 따라 같이 읽어 나가다",
        "model": "read along",
        "tier": 3,
        "easyEn": "Follow the words while someone reads aloud.",
        "example": "Pull up the lyrics and read along while the song plays.",
        "exampleKo": "가사 띄워 놓고 노래 나오는 동안 같이 따라 읽어."
      },
      {
        "cue": "(무전·통화에서) ~의 말이 잘 들리다/수신되다 (I read you loud and clear)",
        "model": "read [someone] (comms)",
        "tier": 3,
        "easyEn": "hear and understand someone clearly over radio",
        "example": "I read you loud and clear—head to the north exit.",
        "exampleKo": "아주 잘 들려요, 북쪽 출구로 이동하세요."
      },
      {
        "cue": "~를 호되게 꾸짖다, 단단히 경고하다",
        "model": "read [someone] the riot act",
        "tier": 3,
        "easyEn": "scold someone severely and warn them to stop",
        "example": "The coach read the whole team the riot act after that loss.",
        "exampleKo": "코치가 그 패배 후에 팀 전체를 아주 호되게 꾸짖었어."
      }
    ]
  },
  {
    "id": "hear",
    "verb": "HEAR",
    "gloss": "hear는 소리/정보가 내 쪽으로 들어오는 동사다. (귀로) 듣다, 소식을 전해 듣다, 연락을 받다, 알아듣다.",
    "items": [
      {
        "cue": "~라고 들었다, ~라는 소식을 듣다",
        "model": "hear (that) [clause]",
        "tier": 1,
        "star": true,
        "example": "I heard that Sarah's leaving the team next month.",
        "exampleKo": "새라가 다음 달에 팀을 떠난다고 들었어."
      },
      {
        "cue": "~에 대한 소식을 듣다, ~에 대해 전해 듣다",
        "model": "hear about [thing]",
        "tier": 1,
        "star": true,
        "example": "Did you hear about the layoffs at the Austin office?",
        "exampleKo": "오스틴 사무실 정리해고 소식 들었어?"
      },
      {
        "cue": "~에게서 연락(소식)을 받다",
        "model": "hear from [person]",
        "tier": 1,
        "star": true,
        "example": "I haven't heard from my landlord since I sent the deposit.",
        "exampleKo": "보증금 보낸 뒤로 집주인한테서 연락이 없어."
      },
      {
        "cue": "~가 …하는 것(소리)을 듣다 (지각동사)",
        "model": "hear [person] [-ing] / hear [person] [verb]",
        "tier": 1,
        "star": true,
        "example": "I heard the neighbors arguing again last night.",
        "exampleKo": "어젯밤에 옆집 사람들이 또 싸우는 소리를 들었어."
      },
      {
        "cue": "~에게서 답장(회신)을 받다 (업무 필수)",
        "model": "hear back from [person]",
        "tier": 1,
        "star": true,
        "example": "Still waiting to hear back from the recruiter about the offer.",
        "exampleKo": "채용 담당자한테서 오퍼 관련 회신을 아직 기다리고 있어."
      },
      {
        "cue": "~의 존재(이름)를 들어서 알다, 들어본 적 있다",
        "model": "hear of [thing] / hear of [person]",
        "tier": 1,
        "star": true,
        "example": "I've never heard of that coffee shop — is it new?",
        "exampleKo": "그 커피숍은 처음 들어보는데, 새로 생긴 거야?"
      },
      {
        "cue": "무슨 말인지 알겠어, 네 말 이해해/공감해",
        "model": "I hear you",
        "tier": 1,
        "star": true,
        "easyEn": "I understand what you mean",
        "example": "I hear you, the deadline's tight, but we can't push it.",
        "exampleKo": "무슨 말인지 알겠어, 마감이 빠듯하지만 미룰 수는 없어."
      },
      {
        "cue": "제 말 들리세요? / 소리가 안 들려요 (화상회의 필수 표현)",
        "model": "can you hear me? / I can't hear you",
        "tier": 1,
        "star": true,
        "example": "Can you hear me? I think you're on mute.",
        "exampleKo": "제 말 들리세요? 음소거되신 것 같아요."
      },
      {
        "cue": "~의 말을 (중간에 끊지 않고) 끝까지 들어주다",
        "model": "hear [person] out",
        "tier": 2,
        "star": true,
        "easyEn": "listen to all of what someone has to say",
        "example": "Just hear me out before you say no.",
        "exampleKo": "안 된다고 하기 전에 내 말 끝까지 좀 들어봐."
      },
      {
        "cue": "~에 대해 좋은 얘기 많이 들었어요",
        "model": "I've heard good things about [person] / [thing]",
        "tier": 2,
        "example": "I've heard good things about Dr. Kim, so I booked with her.",
        "exampleKo": "김 선생님에 대해 좋은 얘기 많이 들어서 예약했어."
      },
      {
        "cue": "내 말 제대로 들었잖아(다시 말 안 해), 맞게 들은 거야",
        "model": "you heard me / you heard right",
        "tier": 2,
        "easyEn": "I mean what I said and will not repeat it",
        "example": "No, you heard me — I'm not covering his shift again.",
        "exampleKo": "아니, 내 말 제대로 들었잖아. 그 사람 근무 또 안 대신해."
      },
      {
        "cue": "제가 이해한 바로는 ~라는 말씀이군요 (회의에서 상대 말을 확인·재진술)",
        "model": "what I'm hearing is (that) [clause]",
        "tier": 2,
        "example": "So what I'm hearing is that we need another week to ship.",
        "exampleKo": "그러니까 제가 이해한 바로는, 출시하는 데 일주일이 더 필요하다는 말씀이군요."
      },
      {
        "cue": "~의 말이 또렷이 들리다 / 무슨 말인지 확실히 알겠다",
        "model": "hear [someone] loud and clear",
        "tier": 2,
        "easyEn": "hear and understand someone very clearly",
        "example": "Loud and clear — I'll have the report done by Friday.",
        "exampleKo": "확실히 알겠어요. 금요일까지 보고서 끝내 놓을게요."
      },
      {
        "cue": "~의 입장(해명)을 들어보다",
        "model": "hear [someone]'s side (of the story)",
        "tier": 2,
        "example": "Let's hear his side before we blame anyone.",
        "exampleKo": "누구 탓하기 전에 그 사람 입장부터 들어보자."
      },
      {
        "cue": "(제안 등을) 절대 받아들이지 않다, 들으려고도 하지 않다",
        "model": "won't hear of [it]",
        "tier": 3,
        "easyEn": "refuse to allow or even consider something",
        "example": "I offered to pay, but she wouldn't hear of it.",
        "exampleKo": "내가 내겠다고 했는데 그 사람이 한사코 안 들으려고 했어."
      },
      {
        "cue": "소문으로(입소문으로) 전해 듣다",
        "model": "hear (it) through the grapevine",
        "tier": 3,
        "easyEn": "learn news informally through rumor or gossip",
        "example": "I heard through the grapevine that they're getting acquired.",
        "exampleKo": "소문으로 그 회사가 인수된다는 얘기를 들었어."
      },
      {
        "cue": "그 일은 이걸로 끝이 아니다, 계속 들먹여질 것이다",
        "model": "not hear the last of [it] / [someone]",
        "tier": 3,
        "easyEn": "you will hear about this matter again",
        "example": "Trust me, we haven't heard the last of this bug.",
        "exampleKo": "장담하는데, 이 버그는 이걸로 끝이 아닐 거야."
      }
    ]
  },
  {
    "id": "see",
    "verb": "SEE",
    "gloss": "see는 '인식'의 뼈대다. (눈으로) 보다, 이해하다·알겠다, 알아보다·확인하다, 만나다, 챙겨서 처리하다.",
    "items": [
      {
        "cue": "(눈으로) 보다; 이해하다·알겠다(I see); ~을 알다",
        "model": "see [thing]",
        "tier": 1,
        "star": true,
        "example": "Did you see my message about the deploy?",
        "exampleKo": "내가 배포 관련해서 보낸 메시지 봤어?"
      },
      {
        "cue": "~인지 (해 보고) 확인하다, 알아보다 (Let me see if it works)",
        "model": "see if / see whether [clause]",
        "tier": 1,
        "star": true,
        "example": "Let me see if the build passed before we merge.",
        "exampleKo": "머지하기 전에 빌드가 통과됐는지 확인해 볼게."
      },
      {
        "cue": "어디 보자; (생각·확인할 때) 음, 그러니까",
        "model": "let me see / let's see",
        "tier": 1,
        "star": true,
        "easyEn": "give me a moment to think or check",
        "example": "Let's see, I think the meeting is at three.",
        "exampleKo": "어디 보자, 회의가 세 시인 것 같은데."
      },
      {
        "cue": "또 봐, 잘 가 (가벼운 작별 인사)",
        "model": "see you (around / later)",
        "tier": 1,
        "star": true,
        "example": "Alright, I'm heading out. See you around!",
        "exampleKo": "자, 나 갈게. 또 봐!"
      },
      {
        "cue": "~가 …하는 것을 보다 (동작 전체); ~가 …하고 있는 것을 보다 (진행 중) (I saw him leave / I saw her crossing the street)",
        "model": "see [person] [verb] / see [person] [-ing]",
        "tier": 1,
        "star": true,
        "example": "I saw him leave the office right after lunch.",
        "exampleKo": "점심 먹고 바로 그가 사무실을 나가는 걸 봤어."
      },
      {
        "cue": "~을 …로 여기다·간주하다 (I see this as an opportunity)",
        "model": "see [thing] as [X]",
        "tier": 2,
        "star": true,
        "example": "I see this bug as a chance to clean up the whole module.",
        "exampleKo": "난 이 버그를 모듈 전체를 정리할 기회로 봐."
      },
      {
        "cue": "~을 맡아 처리하다·챙기다; 반드시 ~하도록 하다 (다소 격식체)",
        "model": "see to [thing] / see to it that [clause]",
        "tier": 2,
        "easyEn": "make sure something is done or dealt with",
        "example": "Can you see to it that the invoices go out by Friday?",
        "exampleKo": "청구서가 금요일까지 나가도록 꼭 챙겨 줄래?"
      },
      {
        "cue": "속셈을 간파하다, 꿰뚫어 보다 (I saw through his excuse)",
        "model": "see through [person / thing]",
        "tier": 2,
        "easyEn": "realize the truth behind someone's lies",
        "example": "I saw right through his excuse about the traffic.",
        "exampleKo": "차 막혔다는 그의 핑계, 난 바로 속셈을 간파했어."
      },
      {
        "cue": "끝까지 해내다, 완수하다 (see the project through)",
        "model": "see [thing] through",
        "tier": 2,
        "easyEn": "continue something until it is fully finished",
        "example": "It's a pain, but I want to see this project through.",
        "exampleKo": "힘들긴 해도 이 프로젝트는 끝까지 해내고 싶어."
      },
      {
        "cue": "배웅하다, 떠나는 사람을 전송하다 (공항·역에서)",
        "model": "see [person] off / see off",
        "tier": 2,
        "easyEn": "go with someone to say goodbye as they leave",
        "example": "We went to the airport to see my sister off.",
        "exampleKo": "우리는 여동생을 배웅하러 공항에 갔어."
      },
      {
        "cue": "문까지 배웅하다; (oneself) 알아서 나가다 (I'll see myself out)",
        "model": "see [person] out / see [oneself] out",
        "tier": 2,
        "easyEn": "walk someone to the door as they leave",
        "example": "Thanks for coming, I'll see you out.",
        "exampleKo": "와 줘서 고마워, 문까지 배웅할게."
      },
      {
        "cue": "~을 알아보다, 처리 방법을 찾아보다 (I'll see about it)",
        "model": "see about [thing]",
        "tier": 2,
        "easyEn": "find out about something and deal with it",
        "example": "I'll see about getting us a bigger meeting room.",
        "exampleKo": "더 큰 회의실 잡을 수 있는지 알아볼게."
      },
      {
        "cue": "두고 보다, 지켜보다",
        "model": "wait and see",
        "tier": 2,
        "example": "We don't have to decide today, let's just wait and see.",
        "exampleKo": "오늘 결정 안 해도 돼, 그냥 두고 보자."
      },
      {
        "cue": "직접 확인하다 (See for yourself)",
        "model": "see for [oneself]",
        "tier": 2,
        "example": "Don't take my word for it, go see for yourself.",
        "exampleKo": "내 말만 믿지 말고, 직접 가서 확인해 봐."
      },
      {
        "cue": "미리 알아채다, 예상하다 (보통 안 좋은 일; I didn't see it coming)",
        "model": "see [thing] coming",
        "tier": 2,
        "easyEn": "expect something before it happens",
        "example": "They laid off half the team and nobody saw it coming.",
        "exampleKo": "팀 절반을 정리해고 했는데 아무도 예상 못 했어."
      },
      {
        "cue": "(~와) 의견이 완전히 일치하다 (주로 부정문: we don't see eye to eye)",
        "model": "see eye to eye (with [person])",
        "tier": 2,
        "easyEn": "completely agree with someone",
        "example": "My boss and I just don't see eye to eye on remote work.",
        "exampleKo": "나랑 상사는 재택근무에 관해선 도무지 의견이 안 맞아."
      },
      {
        "cue": "~의 요점·의미를 이해하다 (주로 부정문: I don't see the point)",
        "model": "see the point (of / in [thing])",
        "tier": 2,
        "easyEn": "understand the reason or value of something",
        "example": "Honestly, I don't see the point of this meeting.",
        "exampleKo": "솔직히 이 회의를 왜 하는지 모르겠어."
      },
      {
        "cue": "내가 보기엔, 내가 아는 한",
        "model": "as far as I can see",
        "tier": 2,
        "easyEn": "based on what I know or can tell",
        "example": "As far as I can see, everything's working fine now.",
        "exampleKo": "내가 보기엔 지금 다 잘 돌아가고 있어."
      },
      {
        "cue": "~인 점을 고려하면, ~이니까 (구어체)",
        "model": "seeing as / seeing that [clause]",
        "tier": 2,
        "easyEn": "because; considering that",
        "example": "Seeing as it's already late, let's finish this tomorrow.",
        "exampleKo": "이미 늦었으니까 이건 내일 마무리하자."
      },
      {
        "cue": "~에 관해 …를 만나 상의하다 (see HR about my contract)",
        "model": "see [person] about [thing]",
        "tier": 2,
        "example": "I need to see HR about my contract renewal.",
        "exampleKo": "계약 갱신 건으로 인사팀을 만나 상의해야 해."
      },
      {
        "cue": "어떻게든 해보다, 방법을 찾아보다 (I'll see what I can do)",
        "model": "see what [I] can do",
        "tier": 2,
        "easyEn": "try to help or find a solution",
        "example": "I can't promise anything, but I'll see what I can do.",
        "exampleKo": "장담은 못 하지만 어떻게든 해볼게."
      },
      {
        "cue": "오랜만이야 (오래간만에 만났을 때 하는 인사)",
        "model": "long time no see",
        "tier": 2,
        "easyEn": "we have not seen each other for a long time",
        "example": "Hey, long time no see! How've you been?",
        "exampleKo": "야, 오랜만이야! 그동안 어떻게 지냈어?"
      },
      {
        "cue": "~하는 것이 적절하다고 판단하다 (do as you see fit) — 다소 격식체",
        "model": "see fit (to [verb])",
        "tier": 3,
        "easyEn": "decide that something is the right thing to do",
        "example": "Spend the budget however you see fit.",
        "exampleKo": "예산은 네가 적절하다고 판단하는 대로 쓰면 돼."
      },
      {
        "cue": "(마침내) 깨닫다, 진실을 알게 되다",
        "model": "see the light",
        "tier": 3,
        "easyEn": "finally understand or realize the truth",
        "example": "After three failed launches, he finally saw the light and hired a designer.",
        "exampleKo": "세 번 출시에 실패하고 나서야 그는 마침내 깨닫고 디자이너를 고용했어."
      },
      {
        "cue": "몹시 화가 나다, 분통이 터지다",
        "model": "see red",
        "tier": 3,
        "easyEn": "suddenly become very angry",
        "example": "When I found out they charged me twice, I just saw red.",
        "exampleKo": "두 번 청구됐다는 걸 알고 나니까 그냥 분통이 터졌어."
      }
    ]
  },
  {
    "id": "live",
    "verb": "LIVE",
    "gloss": "live는 '살다'의 뼈대다. 생존하다, 거주하다, (삶·경험을) 살아내다, 무언가에 기대어 먹고살다.",
    "items": [
      {
        "cue": "[장소]에 살다, 거주하다 (live abroad/downtown처럼 부사와 바로 결합하기도)",
        "model": "live in [place]",
        "tier": 1,
        "star": true,
        "example": "I live in Brooklyn, right off the Bedford stop.",
        "exampleKo": "나 브루클린 살아, 베드포드 역 바로 근처야."
      },
      {
        "cue": "동거하다, 함께 살다",
        "model": "live together",
        "tier": 1,
        "example": "We've been living together since March and it's going great.",
        "exampleKo": "우리 3월부터 같이 살고 있는데 아주 잘 지내."
      },
      {
        "cue": "[형용사]한 삶을 살다 ('live a healthy/normal/quiet life') — 매우 흔한 연어, 학습자 필수",
        "model": "live a [adjective] life",
        "tier": 1,
        "example": "After the burnout, I just want to live a quiet life.",
        "exampleKo": "번아웃 겪고 나니까 그냥 조용한 삶을 살고 싶어."
      },
      {
        "cue": "[기대·기준]에 부응하다, 명성에 걸맞게 해내다 (면접 표현: 'live up to expectations')",
        "model": "live up to [expectations/standards]",
        "tier": 2,
        "star": true,
        "easyEn": "reach the standard that people expect of you",
        "example": "The new hire really lived up to the hype in his first week.",
        "exampleKo": "새로 온 사람 첫 주부터 기대에 완전히 부응하더라."
      },
      {
        "cue": "[불편·문제·결정]을 감수하고 받아들이다 ('I can live with that' = 그 정도는 괜찮다); (사람과) 동거하다",
        "model": "live with [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "accept something unpleasant and keep going",
        "example": "It's not my first choice, but I can live with it.",
        "exampleKo": "내가 원하던 건 아닌데, 그 정도는 감수할 수 있어."
      },
      {
        "cue": "[돈·음식]으로 먹고살다, ~을 주식으로 삼다; (유산·기억·전통이) 계속 이어지다/살아있다",
        "model": "live on [money/food]",
        "tier": 2,
        "star": true,
        "example": "In college I basically lived on ramen and coffee.",
        "exampleKo": "대학 때 나 거의 라면이랑 커피로 먹고살았어."
      },
      {
        "cue": "[사람]에게 얹혀살다, [저축·땅·이자]에 기대어 생계를 잇다 (미국 구어로는 'live off of'도 흔함)",
        "model": "live off [person/savings/land]",
        "tier": 2,
        "easyEn": "get your money or food from a person or source",
        "example": "He's 30 and still living off his parents.",
        "exampleKo": "걔 서른인데 아직도 부모님한테 얹혀살아."
      },
      {
        "cue": "[힘든 시기·사건]을 겪어내다, 견뎌 살아남다",
        "model": "live through [hard times]",
        "tier": 2,
        "example": "My grandma lived through the war, so nothing scares her.",
        "exampleKo": "우리 할머니는 전쟁을 겪어내신 분이라 무서워하는 게 없어."
      },
      {
        "cue": "[원칙·신조·규칙]에 따라 살다",
        "model": "live by [a rule/code/principle]",
        "tier": 2,
        "example": "She lives by one rule: never go to bed angry.",
        "exampleKo": "걔는 딱 하나의 신조로 살아, 화난 채로 잠들지 말자는 거."
      },
      {
        "cue": "[것]을 낙으로 삼고 살다, ~을 위해 살다 ('I live for Fridays')",
        "model": "live for [thing]",
        "tier": 2,
        "easyEn": "enjoy something so much it is your main joy",
        "example": "Honestly, I live for Friday happy hour.",
        "exampleKo": "솔직히 나 금요일 해피아워를 낙으로 살아."
      },
      {
        "cue": "월급으로 근근이 살다, 저축 없이 빠듯하게 생활하다 ('from paycheck to paycheck'으로도 씀)",
        "model": "live paycheck to paycheck",
        "tier": 2,
        "easyEn": "spend all your pay with nothing left to save",
        "example": "Rent's so high here that most of us live paycheck to paycheck.",
        "exampleKo": "여기 월세가 너무 비싸서 우리 대부분 월급으로 근근이 살아."
      },
      {
        "cue": "따로 살다, 별거하다",
        "model": "live apart",
        "tier": 2,
        "example": "They're still married but they've been living apart for a year.",
        "exampleKo": "걔네 아직 부부인데 1년째 따로 살고 있어."
      },
      {
        "cue": "(창피한 일·실수)를 사람들이 잊게 만들다, 떨쳐내다 (주로 부정형 'never live it down')",
        "model": "live [thing] down",
        "tier": 3,
        "easyEn": "make people forget something embarrassing you did",
        "example": "I tripped on stage and my friends will never let me live it down.",
        "exampleKo": "무대에서 넘어졌는데 친구들이 절대 안 잊게 놀려대."
      },
      {
        "cue": "(꿈·환상)을 실현하며 살다; (여생)을 보내다",
        "model": "live out [a dream/one's days]",
        "tier": 3,
        "easyEn": "make a dream real; spend the rest of your life",
        "example": "He quit his job to live out his dream of opening a bakery.",
        "exampleKo": "걔 빵집 열겠다는 꿈을 실현하려고 회사 관뒀어."
      },
      {
        "cue": "신나게 즐기다, 흥청망청 놀다",
        "model": "live it up",
        "tier": 3,
        "easyEn": "enjoy yourself in an exciting, expensive way",
        "example": "We got a bonus, so let's live it up this weekend.",
        "exampleKo": "보너스 나왔으니까 이번 주말엔 신나게 즐기자."
      },
      {
        "cue": "[것]에 푹 빠져 살다, ~이 삶의 전부다 ('I live and breathe code')",
        "model": "live and breathe [thing]",
        "tier": 3,
        "easyEn": "love something so much it fills your whole life",
        "example": "Our lead dev lives and breathes code, even on weekends.",
        "exampleKo": "우리 리드 개발자는 주말에도 코드에 푹 빠져 살아."
      },
      {
        "cue": "꿈꾸던 삶을 살다 (직장에서 종종 반어적으로 'Living the dream' = 아주 잘나가지(빈정))",
        "model": "live the dream",
        "tier": 3,
        "easyEn": "have the perfect life you always wanted",
        "example": "\"How's work?\" \"Oh, living the dream,\" she said, staring at the bug tracker.",
        "exampleKo": "\"일은 어때?\" \"뭐, 꿈같은 삶이지\" 하고 버그 트래커 쳐다보며 말하더라."
      },
      {
        "cue": "호화롭게 살다, 떵떵거리며 즐기며 살다 (미국 구어)",
        "model": "live large",
        "tier": 3,
        "easyEn": "live in a rich way and spend a lot of money",
        "example": "Ever since the startup sold, they've been living large in Miami.",
        "exampleKo": "스타트업 팔고 나서 걔네 마이애미에서 떵떵거리며 살아."
      },
      {
        "cue": "[사람·것]이여 영원하라, ~만세 ('Long live the king')",
        "model": "long live [person/thing]",
        "tier": 3,
        "easyEn": "may this person or thing last a long time",
        "example": "Long live the queen of spreadsheets — Maria just saved our quarter.",
        "exampleKo": "스프레드시트의 여왕 만세, 마리아가 이번 분기를 살렸어."
      },
      {
        "cue": "살면서 배운다 (실수에서 교훈을 얻다)",
        "model": "live and learn",
        "tier": 3,
        "easyEn": "you learn from the mistakes you make in life",
        "example": "I sent the email to the wrong client. Oh well, live and learn.",
        "exampleKo": "엉뚱한 고객한테 메일 보냈네. 뭐, 살면서 배우는 거지."
      },
      {
        "cue": "오래 살아 ~하게 되다, 결국 ~하다 ('live to regret it' = 결국 후회하게 되다; 'lived to see ~' = 살아서 ~을 보다)",
        "model": "live to [verb]",
        "tier": 3,
        "easyEn": "live long enough to finally do something",
        "example": "If you skip the tests now, you'll live to regret it.",
        "exampleKo": "지금 테스트 건너뛰면 결국 후회하게 될 거야."
      },
      {
        "cue": "서로 간섭 말고 각자 살게 두자, 너그럽게 봐주며 살다",
        "model": "live and let live",
        "tier": 3,
        "easyEn": "let others live their way and do not bother them",
        "example": "He codes in tabs, I use spaces — live and let live.",
        "exampleKo": "걔는 탭으로 코딩하고 난 스페이스 쓰는데, 각자 알아서 살자는 주의야."
      }
    ]
  },
  {
    "id": "grow",
    "verb": "GROW",
    "gloss": "grow는 점점 커지고 자라나는 변화의 뼈대다. 자라다, 늘다, 키우다, 점점 ~해지다(차차 되다).",
    "items": [
      {
        "cue": "자라다, 성장하다; 어른이 되다; (~에서) 자라다 (Where did you grow up?); (명령형) 철 좀 들어라",
        "model": "grow up",
        "tier": 1,
        "star": true,
        "example": "I grew up in a small town outside Seattle.",
        "exampleKo": "난 시애틀 외곽의 작은 마을에서 자랐어."
      },
      {
        "cue": "(사업·매출·팀·고객을) 키우다, 성장시키다",
        "model": "grow [a business] / grow [revenue]",
        "tier": 2,
        "star": true,
        "example": "We're trying to grow the business without hiring a huge team.",
        "exampleKo": "우리는 큰 팀을 뽑지 않고 사업을 키우려고 하고 있어."
      },
      {
        "cue": "점점 ~해지다 (grow tired 점점 지치다, grow dark 점점 어두워지다)",
        "model": "grow [adjective] (grow tired / cold / dark)",
        "tier": 2,
        "star": true,
        "example": "It was getting late and everyone grew tired.",
        "exampleKo": "시간이 늦어지면서 다들 점점 지쳐갔어."
      },
      {
        "cue": "(자라서) ~에 맞게 되다; (역할·일에) 차차 적응해 잘 해내게 되다 (I grew into the role)",
        "model": "grow into [role/thing]",
        "tier": 2,
        "star": true,
        "easyEn": "slowly get good enough for a job or role",
        "example": "I was nervous at first, but I grew into the role.",
        "exampleKo": "처음엔 긴장했는데, 차차 그 역할에 적응해서 잘하게 됐어."
      },
      {
        "cue": "~만큼 증가하다, 늘다 (매출이 20% 늘다)",
        "model": "grow by [percent/amount]",
        "tier": 2,
        "star": true,
        "example": "Our revenue grew by 20% last quarter.",
        "exampleKo": "우리 매출이 지난 분기에 20% 늘었어."
      },
      {
        "cue": "(자라서 옷이) 작아 못 입게 되다; (습관·취미에서) 벗어나 안 하게 되다; ~에서 비롯되다/생겨나다",
        "model": "grow out of [thing]",
        "tier": 2,
        "easyEn": "get too big or old for something; stop a habit",
        "example": "My son already grew out of these shoes.",
        "exampleKo": "우리 아들이 벌써 이 신발이 작아져서 못 신어."
      },
      {
        "cue": "(처음엔 별로였다가) 점점 좋아지게 되다, 마음에 들기 시작하다 (It grows on you)",
        "model": "grow on [person]",
        "tier": 2,
        "easyEn": "start to like something more as time passes",
        "example": "I wasn't sure about the new logo, but it's growing on me.",
        "exampleKo": "새 로고가 별로였는데, 점점 마음에 들기 시작하네."
      },
      {
        "cue": "(사이가) 점점 멀어지다, 소원해지다",
        "model": "grow apart",
        "tier": 2,
        "easyEn": "slowly become less close to someone",
        "example": "We used to be close, but we just grew apart after college.",
        "exampleKo": "우리 예전엔 친했는데, 대학 졸업하고 그냥 점점 멀어졌어."
      },
      {
        "cue": "(머리카락·손톱·잘린 부분이) 다시 자라다",
        "model": "grow back",
        "tier": 2,
        "example": "Don't worry, your hair will grow back in a few months.",
        "exampleKo": "걱정 마, 머리는 몇 달 지나면 다시 자라."
      },
      {
        "cue": "(자신감·인기·규모가) 점점 커지다, 늘다",
        "model": "grow in [confidence/popularity]",
        "tier": 2,
        "example": "The app has really grown in popularity this year.",
        "exampleKo": "그 앱이 올해 인기가 정말 많이 늘었어."
      },
      {
        "cue": "~에 점점 싫증나다, 지겨워지다",
        "model": "grow tired of [thing/-ing]",
        "tier": 2,
        "example": "I've grown tired of eating the same lunch every day.",
        "exampleKo": "매일 똑같은 점심 먹는 게 점점 지겨워졌어."
      },
      {
        "cue": "~에 점점 익숙해지다 (다소 격식)",
        "model": "grow accustomed to [thing/-ing]",
        "tier": 2,
        "easyEn": "become used to something over time",
        "example": "It took a while, but I've grown accustomed to working from home.",
        "exampleKo": "시간이 좀 걸렸지만, 재택근무에 점점 익숙해졌어."
      },
      {
        "cue": "~을 점점 좋아하게 되다, ~에 정들다",
        "model": "grow fond of [person/thing]",
        "tier": 2,
        "easyEn": "start to like someone or something",
        "example": "I've really grown fond of this little coffee shop.",
        "exampleKo": "이 작은 커피숍에 정말 정들었어."
      },
      {
        "cue": "나이 들다, 늙다 (grow old together 함께 늙어가다)",
        "model": "grow old",
        "tier": 2,
        "example": "We promised we'd grow old together.",
        "exampleKo": "우리는 함께 늙어가자고 약속했어."
      },
      {
        "cue": "X에서 Y로 늘어나다, 성장하다 (직원이 10명에서 100명으로 늘다)",
        "model": "grow from [X] to [Y]",
        "tier": 2,
        "example": "The team grew from 5 people to 50 in just two years.",
        "exampleKo": "팀이 2년 만에 5명에서 50명으로 늘었어."
      },
      {
        "cue": "(작물·식물을) 재배하다, 기르다 (grow vegetables 채소를 기르다)",
        "model": "grow [crops/plants/vegetables]",
        "tier": 2,
        "example": "We grow our own tomatoes in the backyard every summer.",
        "exampleKo": "우리는 매년 여름 뒷마당에서 직접 토마토를 길러."
      }
    ]
  },
  {
    "id": "sign",
    "verb": "SIGN",
    "gloss": "sign은 이름을 쓰는 동작이 뼈대다. 서명하다 → 가입/등록하다, 승인하다, 계약·합류하다, 양도하다.",
    "items": [
      {
        "cue": "(서비스·수업·이벤트에) 등록하다, 가입하다, 신청하다",
        "model": "sign up",
        "tier": 1,
        "star": true,
        "example": "The gym class fills up fast, so sign up early.",
        "exampleKo": "그 헬스장 수업은 금방 차니까 일찍 등록해."
      },
      {
        "cue": "[thing](수업·뉴스레터·헬스장 등)에 등록하다/신청하다",
        "model": "sign up for [thing]",
        "tier": 1,
        "star": true,
        "example": "I signed up for a pottery class on Tuesday nights.",
        "exampleKo": "화요일 밤에 하는 도자기 수업에 등록했어."
      },
      {
        "cue": "로그인하다; (방문 시) 방명록·출입대장에 서명하다",
        "model": "sign in",
        "tier": 1,
        "star": true,
        "example": "Sign in with your work email, not your personal one.",
        "exampleKo": "개인 이메일 말고 회사 이메일로 로그인해."
      },
      {
        "cue": "[thing](계정·서비스 등)에 로그인하다",
        "model": "sign in to [thing] / sign into [thing]",
        "tier": 1,
        "example": "I can't sign in to Slack, it keeps rejecting my password.",
        "exampleKo": "슬랙에 로그인이 안 돼, 계속 비밀번호를 거부해."
      },
      {
        "cue": "로그아웃하다; 퇴실하며 서명하다; (물건을) 대출 기록하고 가져가다",
        "model": "sign out",
        "tier": 1,
        "star": true,
        "example": "Don't forget to sign out before you leave the shared computer.",
        "exampleKo": "공용 컴퓨터 떠나기 전에 로그아웃하는 거 잊지 마."
      },
      {
        "cue": "[문서·서류]에 서명하다 (기본 뜻)",
        "model": "sign [document]",
        "tier": 1,
        "star": true,
        "example": "Can you sign the lease and send it back to me today?",
        "exampleKo": "오늘 임대 계약서에 서명해서 나한테 다시 보내줄 수 있어?"
      },
      {
        "cue": "[thing](계정·서비스 등)에서 로그아웃하다",
        "model": "sign out of [thing]",
        "tier": 2,
        "example": "I signed out of Netflix on the hotel TV before checking out.",
        "exampleKo": "체크아웃하기 전에 호텔 TV에서 넷플릭스 로그아웃했어."
      },
      {
        "cue": "(작업·문서를) 승인하며 마무리하다; (이메일·방송을) 끝맺다, 작별하다",
        "model": "sign off",
        "tier": 2,
        "star": true,
        "easyEn": "approve something, or end a message or broadcast",
        "example": "Once QA signs off, we can ship it Friday.",
        "exampleKo": "QA가 승인하면 금요일에 배포할 수 있어."
      },
      {
        "cue": "[thing]을 최종 승인하다, 결재하다",
        "model": "sign off on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "give final approval for something",
        "example": "Legal still hasn't signed off on the new contract.",
        "exampleKo": "법무팀이 아직 새 계약서를 최종 승인 안 했어."
      },
      {
        "cue": "(회사·프로젝트에) 합류하다, 계약하고 들어오다",
        "model": "sign on",
        "tier": 2,
        "easyEn": "agree to join a company or project",
        "example": "She signed on right after the seed round closed.",
        "exampleKo": "그녀는 시드 라운드가 마무리되자마자 합류했어."
      },
      {
        "cue": "[role](직책)로(서) 합류/계약하다",
        "model": "sign on as [role]",
        "tier": 2,
        "easyEn": "join a company or project in a certain role",
        "example": "He signed on as head of design last month.",
        "exampleKo": "그는 지난달에 디자인 총괄로 합류했어."
      },
      {
        "cue": "[회사·팀·소속사]와 계약하다",
        "model": "sign with [company/team]",
        "tier": 2,
        "easyEn": "make a contract to join a company or team",
        "example": "The rookie just signed with the Lakers for three years.",
        "exampleKo": "그 신인은 방금 레이커스와 3년 계약을 맺었어."
      },
      {
        "cue": "[thing](택배 등)을 받았다고 수령 서명하다",
        "model": "sign for [thing]",
        "tier": 2,
        "easyEn": "sign your name to show you received something",
        "example": "Someone needs to be home to sign for the package.",
        "exampleKo": "택배 수령 서명을 하려면 누군가 집에 있어야 해."
      },
      {
        "cue": "[thing]의 소유권·권리를 [person]에게 양도하다",
        "model": "sign over [thing] to [person]",
        "tier": 3,
        "easyEn": "give someone legal ownership by signing a document",
        "example": "He signed the car over to his brother when he moved abroad.",
        "exampleKo": "그는 해외로 이사하면서 차를 형에게 양도했어."
      },
      {
        "cue": "[thing](권리 등)을 서명으로 포기·양도하다",
        "model": "sign away [thing]",
        "tier": 3,
        "easyEn": "give up a right by signing a document",
        "example": "Read it twice before you sign away your rights.",
        "exampleKo": "네 권리를 포기하기 전에 두 번 읽어봐."
      },
      {
        "cue": "정식으로 계약서에 서명하다, 확정 동의하다 (관용구)",
        "model": "sign on the dotted line",
        "tier": 3,
        "easyEn": "formally sign a contract to agree to it",
        "example": "Everything's agreed, we just need you to sign on the dotted line.",
        "exampleKo": "다 합의됐고, 이제 정식으로 계약서에 서명만 하면 돼."
      },
      {
        "cue": "[대출·서류]에 연대 보증 서명하다; (구어) ~에 동의·지지하다",
        "model": "co-sign [thing]",
        "tier": 3,
        "easyEn": "sign a loan with someone to share the responsibility",
        "example": "My dad co-signed my first apartment lease.",
        "exampleKo": "우리 아빠가 내 첫 아파트 임대 계약에 연대 보증을 서줬어."
      }
    ]
  },
  {
    "id": "walk",
    "verb": "WALK",
    "gloss": "walk는 '발로 이동하다'가 뼈대다. 걷다 → 데려다주다/산책시키다 → 떠나다/발 빼다 → (단계별로) 설명하며 안내하다.",
    "items": [
      {
        "cue": "~에게 ~를 단계별로 차근차근 설명해주다 (면접 필수: walk me through your resume/your solution)",
        "model": "walk [person] through [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "explain something to someone step by step",
        "example": "Can you walk me through how the login flow works before the demo?",
        "exampleKo": "데모 전에 로그인 흐름이 어떻게 돌아가는지 차근차근 설명해줄 수 있어?"
      },
      {
        "cue": "~를 처음부터 끝까지 짚어보다/시연하다 (walk through the code, the plan)",
        "model": "walk through [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "go through or review something step by step",
        "example": "Let's walk through the deploy steps one more time so nothing breaks.",
        "exampleKo": "아무것도 안 터지게 배포 단계를 한 번 더 처음부터 짚어보자."
      },
      {
        "cue": "~에서 손을 떼다/포기하다, (협상·거래를) 깨고 나오다",
        "model": "walk away from [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "decide to stop being involved in something",
        "example": "The price kept climbing, so we walked away from the deal.",
        "exampleKo": "가격이 계속 올라서 우리는 그 거래에서 손을 뗐어."
      },
      {
        "cue": "그냥 떠나버리다, 발을 빼다, 단념하다",
        "model": "walk away",
        "tier": 2,
        "star": true,
        "easyEn": "leave a situation; give up on it",
        "example": "If they won't budge on salary, I'm ready to just walk away.",
        "exampleKo": "연봉에서 안 물러서면 난 그냥 발 뺄 준비 됐어."
      },
      {
        "cue": "(개를) 산책시키다 / ~를 (집까지) 걸어서 데려다주다",
        "model": "walk [the dog] / walk [person] home",
        "tier": 2,
        "example": "I'll walk the dog and then walk you home, it's on the way.",
        "exampleKo": "개 산책 시키고 너도 집까지 데려다줄게, 가는 길이야."
      },
      {
        "cue": "박차고 나가버리다, (항의로) 퇴장하다, 파업하다 (명사 a walkout)",
        "model": "walk out",
        "tier": 2,
        "easyEn": "leave suddenly in protest; go on strike",
        "example": "Half the team walked out when they announced the pay cut.",
        "exampleKo": "임금 삭감 발표하니까 팀 절반이 박차고 나가버렸어."
      },
      {
        "cue": "(했던 말·입장을) 번복하다/철회하다, 한발 물러서다 (walk it back)",
        "model": "walk back [statement]",
        "tier": 2,
        "easyEn": "say you no longer fully mean what you said before",
        "example": "He walked back his comment after everyone pushed back on it.",
        "exampleKo": "다들 반발하니까 그는 했던 말을 슬쩍 번복했어."
      },
      {
        "cue": "~로 걸어 들어가다 / (함정·문제에) 제 발로 빠지다 (walk into a trap)",
        "model": "walk into [thing]",
        "tier": 2,
        "easyEn": "enter something; or get into trouble unaware",
        "example": "I walked into that argument without knowing they'd already decided.",
        "exampleKo": "걔네가 이미 결정한 줄 모르고 그 논쟁에 제 발로 걸어 들어갔어."
      },
      {
        "cue": "~에게 다가가다, 성큼 걸어가 말을 걸다",
        "model": "walk up to [person]",
        "tier": 2,
        "example": "She just walked up to the CEO and pitched her idea.",
        "exampleKo": "걔가 그냥 CEO한테 성큼 다가가서 아이디어를 던졌어."
      },
      {
        "cue": "~를 지나치다, 그냥 스쳐 지나가다",
        "model": "walk past / walk by [thing]",
        "tier": 2,
        "example": "I walked right past the office and didn't even notice.",
        "exampleKo": "사무실을 그냥 지나쳐 놓고 알아채지도 못했어."
      },
      {
        "cue": "~를 버리고 떠나다, (책임·관계를) 내팽개치고 가버리다",
        "model": "walk out on [person]",
        "tier": 3,
        "easyEn": "suddenly abandon someone you are responsible for",
        "example": "He walked out on his family and never looked back.",
        "exampleKo": "그는 가족을 버리고 떠나서는 뒤도 안 돌아봤어."
      },
      {
        "cue": "(남이 뭔가 하던 중에) 불쑥 들어가 맞닥뜨리다/목격하다",
        "model": "walk in on [person/thing]",
        "tier": 3,
        "easyEn": "enter and unexpectedly find something happening",
        "example": "I walked in on them planning my surprise party.",
        "exampleKo": "내 깜짝 파티 준비하던 걸 불쑥 들어가 딱 마주쳤어."
      },
      {
        "cue": "홱 가버리다 / (walk off [stress/a meal]) 걸어서 풀다·삭이다",
        "model": "walk off",
        "tier": 3,
        "easyEn": "leave suddenly; or get rid of a feeling by walking",
        "example": "I was so mad I just walked off to cool down.",
        "exampleKo": "너무 화나서 그냥 홱 가버려서 좀 삭혔어."
      },
      {
        "cue": "~를 거머쥐다, (상·이득을) 손쉽게 차지하다",
        "model": "walk away with [thing]",
        "tier": 3,
        "easyEn": "win or take something, often easily",
        "example": "She walked away with the top prize like it was nothing.",
        "exampleKo": "걔가 아무것도 아닌 듯 대상을 거머쥐었어."
      },
      {
        "cue": "~를 함부로 대하다, 짓밟다, 호구 취급하다",
        "model": "walk (all) over [person]",
        "tier": 3,
        "easyEn": "treat someone badly and use them unfairly",
        "example": "Stop letting your boss walk all over you like that.",
        "exampleKo": "상사가 널 그렇게 함부로 대하게 계속 놔두지 마."
      },
      {
        "cue": "~를 슬쩍 들고 가버리다 / (상을) 거뜬히 타가다",
        "model": "walk off with [thing]",
        "tier": 3,
        "easyEn": "steal something; or win a prize easily",
        "example": "Someone walked off with my charger from the break room.",
        "exampleKo": "누가 휴게실에서 내 충전기를 슬쩍 들고 가버렸어."
      },
      {
        "cue": "살얼음판 걷듯 눈치 보며 조심하다",
        "model": "walk on eggshells",
        "tier": 3,
        "easyEn": "be very careful not to upset someone",
        "example": "Ever since the layoffs, we're all walking on eggshells around him.",
        "exampleKo": "정리해고 이후로 다들 그 사람 눈치 보며 살얼음판 걷듯 조심해."
      },
      {
        "cue": "아슬아슬하게 줄타기하다, 위태로운 균형을 잡다",
        "model": "walk a (fine/thin) line",
        "tier": 3,
        "easyEn": "balance carefully between two risky options",
        "example": "As a manager you walk a fine line between friend and boss.",
        "exampleKo": "매니저는 친구와 상사 사이에서 아슬아슬하게 줄타기해야 해."
      },
      {
        "cue": "식은 죽 먹기, 아주 쉬운 일",
        "model": "a walk in the park",
        "tier": 3,
        "easyEn": "something very easy to do",
        "example": "After last quarter, this project is a walk in the park.",
        "exampleKo": "지난 분기 겪고 나니 이번 프로젝트는 식은 죽 먹기야."
      },
      {
        "cue": "말한 대로 실제로 실천하다, 행동으로 보여주다",
        "model": "walk the walk / walk the talk",
        "tier": 3,
        "easyEn": "actually do what you say you will do",
        "example": "Anyone can promise change, but can he actually walk the walk?",
        "exampleKo": "변화야 누구나 약속하지, 근데 걔가 진짜 말한 대로 실천할 수 있을까?"
      },
      {
        "cue": "(혐의를 벗고) 풀려나다, 무죄로 석방되다",
        "model": "walk free",
        "tier": 3,
        "easyEn": "leave court without punishment; be found not guilty",
        "example": "The jury didn't buy it and he walked free.",
        "exampleKo": "배심원단이 안 믿어줘서 그는 무죄로 풀려났어."
      }
    ]
  },
  {
    "id": "throw",
    "verb": "THROW",
    "gloss": "throw의 뼈대는 '힘껏 던지다'. 던지다 → 버리다, 갑자기 일으키다(파티·성질·에러), 헷갈리게 하다.",
    "items": [
      {
        "cue": "~를 향해 (겨냥해) 던지다, 집어던지다",
        "model": "throw [thing] at [person/place]",
        "tier": 1,
        "star": true,
        "example": "Some kid threw a rock at the bus window this morning.",
        "exampleKo": "오늘 아침에 어떤 애가 버스 창문에 돌을 집어던졌어."
      },
      {
        "cue": "버리다; (기회·돈을) 날려버리다",
        "model": "throw away [thing]",
        "tier": 1,
        "star": true,
        "example": "Don't throw away those receipts, we need them for taxes.",
        "exampleKo": "그 영수증들 버리지 마, 세금 신고할 때 필요해."
      },
      {
        "cue": "버리다; (아이디어·이름을) 던져보다, 제안하다; (사람을) 내쫓다",
        "model": "throw out [thing]",
        "tier": 1,
        "star": true,
        "example": "Let me throw out an idea real quick before we wrap up.",
        "exampleKo": "끝내기 전에 아이디어 하나만 잠깐 던져볼게."
      },
      {
        "cue": "토하다, 게우다",
        "model": "throw up",
        "tier": 1,
        "star": true,
        "easyEn": "vomit",
        "example": "I felt so carsick I almost threw up on the way here.",
        "exampleKo": "오는 길에 멀미가 너무 심해서 토할 뻔했어."
      },
      {
        "cue": "(프로그래밍) 예외/에러를 던지다, 발생시키다",
        "model": "throw an exception / throw an error",
        "tier": 2,
        "star": true,
        "easyEn": "in coding, make the program signal an error",
        "example": "If the token's expired, the API just throws a 401 error.",
        "exampleKo": "토큰이 만료되면 API가 그냥 401 에러를 던져."
      },
      {
        "cue": "파티를 열다, 자리를 마련하다",
        "model": "throw a party",
        "tier": 2,
        "star": true,
        "easyEn": "host or organize a party",
        "example": "We're throwing a little party for Jenna's promotion on Friday.",
        "exampleKo": "금요일에 제나 승진 기념으로 조촐하게 파티 열려고."
      },
      {
        "cue": "덤으로 끼워주다; (말·의견을) 슬쩍 덧붙이다",
        "model": "throw in [thing]",
        "tier": 2,
        "easyEn": "add something extra, often for free",
        "example": "Buy the laptop today and they'll throw in a free case.",
        "exampleKo": "오늘 노트북 사면 케이스를 덤으로 끼워준대."
      },
      {
        "cue": "헷갈리게 하다, (계산·일정을) 어긋나게 하다; (옷·습관을) 벗어던지다",
        "model": "throw off [thing]",
        "tier": 2,
        "easyEn": "confuse someone or disrupt a plan or schedule",
        "example": "Sorry, that last question totally threw me off.",
        "exampleKo": "미안, 방금 그 질문에 완전 헷갈렸어."
      },
      {
        "cue": "급조하다, 대충 뚝딱 만들다",
        "model": "throw together [thing]",
        "tier": 2,
        "easyEn": "make something quickly and carelessly",
        "example": "I just threw together a quick deck before the meeting.",
        "exampleKo": "회의 전에 슬라이드 대충 뚝딱 만들었어."
      },
      {
        "cue": "(자기가 살려고) 남에게 책임을 떠넘기다, 동료를 희생시키다",
        "model": "throw [someone] under the bus",
        "tier": 2,
        "star": true,
        "easyEn": "blame or sacrifice someone to protect yourself",
        "example": "He totally threw me under the bus in front of the boss.",
        "exampleKo": "걔가 상사 앞에서 나한테 완전 책임을 떠넘겼어."
      },
      {
        "cue": "~에 몰두하다, 전념하다",
        "model": "throw oneself into [work]",
        "tier": 2,
        "easyEn": "start doing something with full energy and effort",
        "example": "After the breakup she just threw herself into work.",
        "exampleKo": "헤어지고 나서 걔는 그냥 일에 몰두했어."
      },
      {
        "cue": "성질부리다, 화를 버럭 내다, 떼쓰다",
        "model": "throw a fit / throw a tantrum",
        "tier": 2,
        "easyEn": "suddenly become very angry or upset",
        "example": "My toddler throws a fit every time I turn off the TV.",
        "exampleKo": "우리 애는 TV 끌 때마다 떼를 써."
      },
      {
        "cue": "~에게 (받으라고) 던져주다, 패스하다, 토스하다",
        "model": "throw [thing] to [person]",
        "tier": 2,
        "example": "Throw me the keys, I'll start the car.",
        "exampleKo": "열쇠 나한테 던져줘, 내가 시동 걸게."
      },
      {
        "cue": "(옷을) 대충 걸쳐 입다, 후딱 걸치다",
        "model": "throw on [clothes]",
        "tier": 2,
        "easyEn": "quickly put on a piece of clothing",
        "example": "Give me a sec, let me throw on a hoodie.",
        "exampleKo": "잠깐만, 후드티 하나 대충 걸치고 올게."
      },
      {
        "cue": "포기하다, 백기를 들다",
        "model": "throw in the towel",
        "tier": 3,
        "easyEn": "give up; admit defeat",
        "example": "After three failed builds I finally threw in the towel for the night.",
        "exampleKo": "빌드 세 번 실패하고 나서 오늘 밤은 결국 포기했어."
      },
      {
        "cue": "계획을 망치다, 차질을 빚게 하다",
        "model": "throw a wrench into [plan] / throw a wrench in the works",
        "tier": 3,
        "easyEn": "cause a problem that ruins a plan",
        "example": "The client changing the deadline really threw a wrench into our plan.",
        "exampleKo": "클라이언트가 마감을 바꾸는 바람에 우리 계획이 완전히 틀어졌어."
      },
      {
        "cue": "예상 밖의 변수를 던지다, 허를 찌르는 상황을 만들다",
        "model": "throw a curveball",
        "tier": 3,
        "easyEn": "surprise someone with something unexpected",
        "example": "The interviewer threw me a curveball with that last question.",
        "exampleKo": "면접관이 마지막 질문으로 내 허를 찔렀어."
      },
      {
        "cue": "권력·영향력을 함부로 휘두르다",
        "model": "throw your weight around",
        "tier": 3,
        "easyEn": "use your power in a forceful, annoying way",
        "example": "The new manager loves throwing his weight around.",
        "exampleKo": "새 매니저는 권력을 함부로 휘두르는 걸 좋아해."
      },
      {
        "cue": "~와 한편이 되다, 손잡다",
        "model": "throw in with [person]",
        "tier": 3,
        "easyEn": "decide to join and support someone",
        "example": "I decided to throw in with the startup instead of taking the safe job.",
        "exampleKo": "안정적인 직장 대신 그 스타트업이랑 손잡기로 했어."
      },
      {
        "cue": "신중함을 버리고 과감하게 밀어붙이다",
        "model": "throw caution to the wind",
        "tier": 3,
        "easyEn": "take a risk without worrying about it",
        "example": "We threw caution to the wind and booked the trip anyway.",
        "exampleKo": "우리는 신중함 따위 버리고 그냥 여행을 예약했어."
      },
      {
        "cue": "도전장을 내밀다, 정면승부를 걸다",
        "model": "throw down the gauntlet",
        "tier": 3,
        "easyEn": "openly challenge someone to a contest",
        "example": "Our rival team threw down the gauntlet with that new feature.",
        "exampleKo": "경쟁 팀이 그 새 기능으로 도전장을 내밀었어."
      },
      {
        "cue": "(은근히) 깎아내리다, 돌려서 디스하다 (구어/슬랭)",
        "model": "throw shade (at [someone])",
        "tier": 3,
        "easyEn": "subtly insult or criticize someone",
        "example": "She threw shade at my presentation in the group chat.",
        "exampleKo": "걔가 단톡방에서 내 발표를 은근히 깎아내렸어."
      },
      {
        "cue": "돈을 펑펑 쓰다, 과시하듯 낭비하다",
        "model": "throw money around",
        "tier": 3,
        "easyEn": "spend money carelessly to impress others",
        "example": "He's been throwing money around ever since he got the bonus.",
        "exampleKo": "걔는 보너스 받고 나서부터 돈을 펑펑 쓰고 다녀."
      }
    ]
  },
  {
    "id": "draw",
    "verb": "DRAW",
    "gloss": "draw는 선을 긋고 끌어당기는 게 뼈대다. 그리다, 끌어당기다(관심·사람), 뽑아내다(돈·정보), 도출하다(결론), 비기다.",
    "items": [
      {
        "cue": "그리다 — 그림·도표·차트를 그리다. (예: draw a diagram on the whiteboard 화이트보드에 도표를 그리다 — 기술 면접 단골)",
        "model": "draw [a diagram/picture/chart]",
        "tier": 2,
        "star": true,
        "example": "Can you draw a quick diagram of the data flow on the whiteboard?",
        "exampleKo": "화이트보드에 데이터 흐름 도표 좀 빠르게 그려줄 수 있어요?"
      },
      {
        "cue": "작성하다 — 계획·계약서·목록을 정식으로 작성하다. (예: draw up a proposal 제안서를 작성하다)",
        "model": "draw up [a plan/contract/list]",
        "tier": 2,
        "star": true,
        "easyEn": "prepare or write something formally",
        "example": "Legal is drawing up the contract, so we should have it by Friday.",
        "exampleKo": "법무팀에서 계약서를 작성 중이라 금요일까지는 받을 거예요."
      },
      {
        "cue": "활용하다, 끌어다 쓰다 — 경험·지식·자원에 의지해 활용하다. (예: I drew on my past projects 이전 프로젝트 경험을 활용했다)",
        "model": "draw on/upon [experience/knowledge]",
        "tier": 2,
        "star": true,
        "easyEn": "use your experience or knowledge as a resource",
        "example": "For this pitch I'm drawing on everything I learned at my last startup.",
        "exampleKo": "이번 발표는 예전 스타트업에서 배운 걸 전부 끌어다 쓰고 있어요."
      },
      {
        "cue": "~에 주의·관심을 끌다, ~을 부각시키다. (예: I want to draw your attention to this risk 이 리스크에 주목해 주세요)",
        "model": "draw [attention] to [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "make people notice something",
        "example": "Before we move on, I want to draw your attention to this one bug.",
        "exampleKo": "넘어가기 전에 이 버그 하나에 주목해 주셨으면 해요."
      },
      {
        "cue": "결론을 도출하다 — (데이터·근거에서) 결론을 이끌어내다. (예: we can't draw a conclusion from one data point 데이터 한 개로는 결론을 못 낸다)",
        "model": "draw a conclusion (from [data])",
        "tier": 2,
        "star": true,
        "easyEn": "form a decision based on facts or evidence",
        "example": "We can't draw a conclusion from just one week of data.",
        "exampleKo": "데이터 일주일치만으로는 결론을 낼 수 없어요."
      },
      {
        "cue": "선을 긋다, 한계를 정하다 — 여기까지는 받아들이지만 그 이상은 안 된다고 선을 긋다. (예: I draw the line at working weekends 주말 근무는 선을 긋는다)",
        "model": "draw the line (at [thing])",
        "tier": 2,
        "easyEn": "set a limit on what you will accept",
        "example": "I'm happy to help, but I draw the line at answering Slack at 2 a.m.",
        "exampleKo": "돕는 건 좋은데, 새벽 2시에 슬랙 답하는 건 선을 그어요."
      },
      {
        "cue": "끌어내다 (정보·의견을 이끌어내다); 질질 끌다 (회의·과정을 길게 늘이다). (예: draw out the quieter teammates 말 없는 팀원의 의견을 끌어내다). ※ '돈 인출' 뜻의 draw out은 영국식 — 미국은 withdraw/take out.",
        "model": "draw out [info/opinion/meeting]",
        "tier": 3,
        "easyEn": "get information from someone; or make something last longer",
        "example": "In retros I try to draw out the folks who never speak up.",
        "exampleKo": "회고 때는 말 안 하는 사람들의 의견을 끌어내려고 해요."
      },
      {
        "cue": "A와 B를 구분 짓다, 경계를 긋다 (둘을 구별하다). ※ 한계를 정하는 'draw the line'(위 항목)과 다름.",
        "model": "draw a line/distinction between [A] and [B]",
        "tier": 3,
        "easyEn": "show how two things are different",
        "example": "Let's draw a clear line between a bug and a feature request.",
        "exampleKo": "버그랑 기능 요청은 명확히 구분 짓읍시다."
      },
      {
        "cue": "A와 B를 비교하다, 유사점을 짚어내다.",
        "model": "draw a comparison/parallel between [A] and [B]",
        "tier": 3,
        "easyEn": "point out how two things are similar",
        "example": "You could draw a parallel between our rollout and how Slack scaled early on.",
        "exampleKo": "우리 출시랑 슬랙 초창기 확장을 비교해 볼 수 있어요."
      },
      {
        "cue": "물러서다, 주춤하다, (관여에서) 발을 빼다. ※ 구어에서는 pull back이 더 흔함.",
        "model": "draw back (from [thing])",
        "tier": 3,
        "easyEn": "move back; stop being involved",
        "example": "Once he saw the workload, he drew back from the project.",
        "exampleKo": "그는 업무량을 보고 나서 그 프로젝트에서 발을 뺐어요."
      },
      {
        "cue": "(자금·재고·예비비를) 끌어 쓰다, 줄이다. (금융: drawdown = 인출·하락폭)",
        "model": "draw down [funds/reserves]",
        "tier": 3,
        "easyEn": "gradually use up money or supplies",
        "example": "We're drawing down the runway fast, so we need revenue soon.",
        "exampleKo": "자금을 빠르게 끌어 쓰고 있어서 곧 매출이 필요해요."
      },
      {
        "cue": "아무것도 못 떠올리다, 허탕 치다. (예: I drew a blank on the answer 답이 도무지 안 떠올랐다 — 면접 회상에 유용)",
        "model": "draw a blank",
        "tier": 3,
        "easyEn": "be unable to remember or think of anything",
        "example": "They asked me about hash maps and I totally drew a blank.",
        "exampleKo": "해시맵에 대해 물어봤는데 머릿속이 완전히 하얘졌어요."
      },
      {
        "cue": "사람들을 끌어모으다, 인파를 끌다.",
        "model": "draw a crowd",
        "tier": 3,
        "easyEn": "attract a lot of people",
        "example": "The free pizza always draws a crowd at these meetups.",
        "exampleKo": "이런 모임에선 공짜 피자가 늘 사람들을 끌어모아요."
      },
      {
        "cue": "비난·공격을 사다, 도마에 오르다. (예: the decision drew criticism 그 결정이 비난을 샀다)",
        "model": "draw fire / draw criticism",
        "tier": 3,
        "easyEn": "attract criticism or attack",
        "example": "The decision to raise prices drew a lot of criticism online.",
        "exampleKo": "가격 인상 결정은 온라인에서 많은 비난을 샀어요."
      },
      {
        "cue": "급여를 받다 — 정기적으로 급여를 받다. (예: the founder still draws a salary 창업자가 여전히 급여를 받는다). ※ 계좌에서 '돈을 draw(인출)'는 영국식 — 미국은 withdraw.",
        "model": "draw a salary",
        "tier": 3,
        "easyEn": "receive regular pay from a job",
        "example": "She still draws a salary even though she stepped back as CEO.",
        "exampleKo": "그녀는 CEO에서 물러났는데도 여전히 급여를 받아요."
      },
      {
        "cue": "~에서 영감을 얻다.",
        "model": "draw inspiration from [thing]",
        "tier": 3,
        "easyEn": "get new ideas or motivation from something",
        "example": "We drew a lot of inspiration from Linear's clean UI.",
        "exampleKo": "우리는 Linear의 깔끔한 UI에서 영감을 많이 얻었어요."
      },
      {
        "cue": "끝나가다, 마무리되어 가다. (예: the meeting drew to a close 회의가 마무리되었다)",
        "model": "draw to a close/an end",
        "tier": 3,
        "easyEn": "slowly come to an end",
        "example": "As the quarter draws to a close, let's lock the roadmap.",
        "exampleKo": "분기가 마무리되어 가니 로드맵을 확정합시다."
      },
      {
        "cue": "제비뽑기로 정하다, 추첨하다. ※ 미국 구어에서는 'draw the short straw(불리한 역할을 맡다)'가 가장 흔함.",
        "model": "draw lots / draw straws",
        "tier": 3,
        "easyEn": "choose by random selection",
        "example": "Nobody wanted the on-call shift, so we drew straws.",
        "exampleKo": "아무도 온콜 당번을 안 하려고 해서 제비뽑기로 정했어요."
      },
      {
        "cue": "앞서 나가다 (경기에서 격차를 벌리다); (몸을) 떼어 물러나다. ※ 주로 스포츠·물리적 맥락.",
        "model": "draw away (from [others])",
        "tier": 3,
        "easyEn": "move ahead of others; or move away from something",
        "example": "By the last lap she'd drawn away from the whole pack.",
        "exampleKo": "마지막 바퀴쯤엔 그녀가 무리 전체를 따돌리고 앞서 나갔어요."
      },
      {
        "cue": "(사람·요소를) 모으다, 결집시키다; 가까워지다. (예: the crisis drew the team together 위기가 팀을 결집시켰다)",
        "model": "draw together",
        "tier": 3,
        "easyEn": "bring people or things closer; unite",
        "example": "That outage was rough, but it really drew the team together.",
        "exampleKo": "그 장애는 힘들었지만 팀을 정말 결집시켰어요."
      },
      {
        "cue": "사로잡다, 빠져들게 하다 — (이야기·디자인·발표가) 사람의 관심을 끌어 몰입시키다. (예: the opening demo really drew the audience in 첫 데모가 청중을 완전히 사로잡았다)",
        "model": "draw [someone/people] in",
        "tier": 3,
        "easyEn": "attract and hold someone's interest",
        "example": "The opening demo instantly drew the whole room in.",
        "exampleKo": "첫 데모가 순식간에 방 안 사람들을 전부 사로잡았어요."
      }
    ]
  },
  {
    "id": "point",
    "verb": "POINT",
    "gloss": "point는 방향을 가리키는 게 뼈대다. 가리키다, 지적하다, 향하다, (증거·데이터가) 시사하다.",
    "items": [
      {
        "cue": "[것]을 지적하다, 짚어서 알려주다 (회의·코드리뷰: 'I'd like to point out~')",
        "model": "point out",
        "tier": 1,
        "star": true,
        "easyEn": "to mention something or call attention to it",
        "example": "I'd just like to point out that we're already two days behind on this.",
        "exampleKo": "우리가 이미 이 건에서 이틀 늦었다는 점만 짚고 넘어갈게요."
      },
      {
        "cue": "~라는 점을 지적하다",
        "model": "point out that [clause]",
        "tier": 1,
        "easyEn": "to mention or note that something is true",
        "example": "She pointed out that nobody had actually tested the checkout flow on mobile.",
        "exampleKo": "그녀는 아무도 모바일에서 결제 흐름을 실제로 테스트하지 않았다는 점을 지적했어요."
      },
      {
        "cue": "본론으로 들어가다, 핵심만 말하다",
        "model": "get to the point",
        "tier": 1,
        "star": true,
        "easyEn": "to say the main thing without delay",
        "example": "Okay, let me get to the point — we're cutting the feature.",
        "exampleKo": "자, 본론만 말할게요. 그 기능은 뺄 거예요."
      },
      {
        "cue": "~해봐야 소용없다, ~할 의미가 없다",
        "model": "there's no point (in [-ing])",
        "tier": 1,
        "star": true,
        "easyEn": "there is no reason or use in doing it",
        "example": "There's no point in rebuilding it if we're deprecating it next month.",
        "exampleKo": "다음 달에 없앨 거면 그걸 다시 만들어봐야 소용없어요."
      },
      {
        "cue": "관점, 시각 ('from a user's point of view')",
        "model": "point of view",
        "tier": 1,
        "star": true,
        "example": "From a user's point of view, three clicks to log in is way too many.",
        "exampleKo": "사용자 관점에서 보면 로그인에 세 번 클릭은 너무 많아요."
      },
      {
        "cue": "좋은 지적이야, 일리 있는 말이야 (회의 맞장구)",
        "model": "good point / fair point",
        "tier": 1,
        "star": true,
        "easyEn": "that is a valid or reasonable remark",
        "example": "Fair point — let's add a fallback for when the API times out.",
        "exampleKo": "일리 있는 지적이에요. API가 타임아웃될 때 대비책을 넣죠."
      },
      {
        "cue": "요점은 ~이다, 내 말은 ~라는 거다",
        "model": "the point is (that)",
        "tier": 1,
        "easyEn": "the main thing I want to say is",
        "example": "The point is, we don't have the budget to hire two more people right now.",
        "exampleKo": "요점은 지금 두 명을 더 뽑을 예산이 없다는 거예요."
      },
      {
        "cue": "현 시점에서는, 이제 와서는",
        "model": "at this point",
        "tier": 1,
        "star": true,
        "example": "At this point I'd rather just rewrite it than keep patching it.",
        "exampleKo": "이제 와서는 계속 땜질하느니 그냥 새로 짜는 게 낫겠어요."
      },
      {
        "cue": "[것]을 가리키다; (데이터·증거가) [것]을 시사하다 ('the metrics point to a memory leak')",
        "model": "point to",
        "tier": 2,
        "star": true,
        "easyEn": "to suggest or indicate something as the cause",
        "example": "The logs point to a memory leak in the image resizer.",
        "exampleKo": "로그를 보면 이미지 리사이저에 메모리 누수가 있다는 걸 시사해요."
      },
      {
        "cue": "[사람/것]을 (손가락 등으로) 콕 가리키다",
        "model": "point at",
        "tier": 2,
        "example": "The kid pointed at the puppy in the window and started giggling.",
        "exampleKo": "그 아이가 창문 안 강아지를 손가락으로 가리키며 까르르 웃기 시작했어요."
      },
      {
        "cue": "[사람]에게 [것]을 짚어서 알려주다",
        "model": "point [thing] out to [person]",
        "tier": 2,
        "easyEn": "to show or mention something to someone",
        "example": "Thanks for pointing that typo out to me before I hit send.",
        "exampleKo": "보내기 누르기 전에 그 오타를 짚어줘서 고마워요."
      },
      {
        "cue": "[사람]에게 [것]을 알려주다/안내하다 ('Can you point me to the docs?')",
        "model": "point [person] to [thing]",
        "tier": 2,
        "easyEn": "to direct someone to where something is",
        "example": "Can you point me to the docs for setting up the webhook?",
        "exampleKo": "웹훅 설정하는 문서 어디 있는지 알려줄 수 있어요?"
      },
      {
        "cue": "일부러/반드시 ~하다, 꼭 챙겨서 하다",
        "model": "make a point of [-ing]",
        "tier": 2,
        "easyEn": "to make sure you do something on purpose",
        "example": "I make a point of replying to every customer email within a day.",
        "exampleKo": "저는 모든 고객 이메일에 하루 안에 꼭 답장하려고 챙겨요."
      },
      {
        "cue": "요점/핵심을 놓치다, 잘못 이해하다",
        "model": "miss the point",
        "tier": 2,
        "star": true,
        "easyEn": "to fail to understand the main idea",
        "example": "I think you're missing the point — the bug isn't the UI, it's the data.",
        "exampleKo": "핵심을 놓치고 계신 것 같아요. 버그는 UI가 아니라 데이터예요."
      },
      {
        "cue": "무슨 말인지 알겠어, 그 지적 인정해",
        "model": "point taken",
        "tier": 2,
        "easyEn": "I understand and accept your criticism",
        "example": "Point taken, I'll add tests before I push next time.",
        "exampleKo": "무슨 말인지 알겠어요, 다음엔 푸시하기 전에 테스트 추가할게요."
      },
      {
        "cue": "고충, 불편한 지점 (제품·UX에서 자주)",
        "model": "pain point",
        "tier": 2,
        "easyEn": "a specific problem that frustrates users or customers",
        "example": "The biggest pain point for our users is that the app logs them out too often.",
        "exampleKo": "우리 사용자들의 가장 큰 고충은 앱이 너무 자주 로그아웃시키는 거예요."
      },
      {
        "cue": "담당자, 연락 창구",
        "model": "point of contact (POC)",
        "tier": 2,
        "easyEn": "the person you go to for communication",
        "example": "Sarah's your point of contact for anything billing-related.",
        "exampleKo": "결제 관련된 건 뭐든 사라가 담당자예요."
      },
      {
        "cue": "단일 장애점 (이것 하나 죽으면 전체가 멈추는 지점; 시스템 디자인 면접 필수)",
        "model": "single point of failure",
        "tier": 2,
        "easyEn": "one part whose failure stops the whole system",
        "example": "That one database is a single point of failure — if it goes down, everything does.",
        "exampleKo": "그 데이터베이스 하나가 단일 장애점이에요. 그게 죽으면 전부 멈춰요."
      },
      {
        "cue": "핵심 논점, 강조해서 말할 거리",
        "model": "talking point",
        "tier": 2,
        "easyEn": "a key topic prepared for discussion",
        "example": "Let's keep the pricing change as our main talking point in the demo.",
        "exampleKo": "데모에서는 가격 변경을 핵심 논점으로 계속 밀고 가죠."
      },
      {
        "cue": "간결하고 핵심을 찌르는 ('short and to the point')",
        "model": "to the point",
        "tier": 2,
        "easyEn": "short, clear, and focused on what matters",
        "example": "Keep the email short and to the point — nobody reads long ones.",
        "exampleKo": "이메일은 짧고 핵심만 찌르게 써요. 긴 건 아무도 안 읽어요."
      },
      {
        "cue": "글머리표 항목 (문서·슬라이드)",
        "model": "bullet point",
        "tier": 2,
        "example": "Can you turn that paragraph into a few bullet points for the slide?",
        "exampleKo": "그 문단을 슬라이드용 글머리표 몇 개로 바꿔줄 수 있어요?"
      },
      {
        "cue": "출발점, 시작점 ('a good starting point')",
        "model": "starting point",
        "tier": 2,
        "example": "This template is a decent starting point, but we'll tweak the colors.",
        "exampleKo": "이 템플릿이 괜찮은 출발점이에요, 색은 좀 손보겠지만요."
      },
      {
        "cue": "강점, 셀링 포인트 ('the main selling point is~')",
        "model": "selling point",
        "tier": 2,
        "easyEn": "a feature that makes something attractive to buy",
        "example": "The main selling point is that it works offline.",
        "exampleKo": "가장 큰 강점은 오프라인에서도 작동한다는 거예요."
      },
      {
        "cue": "핵심과 무관한, 논점에서 벗어난",
        "model": "beside the point",
        "tier": 3,
        "easyEn": "not relevant to what is being discussed",
        "example": "Whose fault it was is kind of beside the point right now.",
        "exampleKo": "누구 잘못인지는 지금 논점과 좀 상관없어요."
      },
      {
        "cue": "[사람]을 탓하다, 책임을 전가하다",
        "model": "point a finger at / point fingers",
        "tier": 3,
        "easyEn": "to blame someone",
        "example": "Instead of pointing fingers, let's just figure out how to fix it.",
        "exampleKo": "서로 탓하지 말고, 그냥 어떻게 고칠지 생각하죠."
      },
      {
        "cue": "단적인 예, 바로 그 사례",
        "model": "case in point",
        "tier": 3,
        "easyEn": "a clear example of what was just said",
        "example": "Rushing the last release broke prod — case in point, we need more QA time.",
        "exampleKo": "지난 배포를 서두르다 운영을 터뜨렸잖아요. 단적인 예로, QA 시간이 더 필요해요."
      },
      {
        "cue": "걸림돌, 합의가 막히는 지점 (협상·논의에서)",
        "model": "sticking point",
        "tier": 3,
        "easyEn": "an issue that blocks agreement or progress",
        "example": "The only sticking point left in the deal is the renewal terms.",
        "exampleKo": "이 계약에서 남은 유일한 걸림돌은 갱신 조건이에요."
      }
    ]
  },
  {
    "id": "settle",
    "verb": "SETTLE",
    "gloss": "settle은 '자리를 잡고 가라앉아 안정되다'가 뼈대다. 정착하다, (문제를) 해결하다, (선택을) 결정하다, (마음·속이) 진정되다, (돈을) 정산하다.",
    "items": [
      {
        "cue": "진정하다, 차분해지다; (결혼·이사 등으로) 한곳에 정착해 안정된 생활을 하다",
        "model": "settle down",
        "tier": 1,
        "star": true,
        "easyEn": "to become calm, or to start a stable settled life",
        "example": "Kids, settle down—the movie's about to start.",
        "exampleKo": "얘들아, 진정해. 영화 곧 시작해."
      },
      {
        "cue": "(새 집·새 직장 등 낯선 환경에) 적응하다, 자리를 잡다",
        "model": "settle in",
        "tier": 2,
        "star": true,
        "easyEn": "to get comfortable and used to a new place or job",
        "example": "It took me a couple weeks to settle down after moving to Denver.",
        "exampleKo": "덴버로 이사한 뒤 자리 잡는 데 몇 주 걸렸어."
      },
      {
        "cue": "(더 나은 것을 포기하고) ~로 만족하다, 아쉬운 대로 받아들이다 (don't settle for less)",
        "model": "settle for [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to accept something less than what you wanted",
        "example": "How are you settling in at the new job?",
        "exampleKo": "새 직장에는 좀 적응하고 있어?"
      },
      {
        "cue": "(여러 선택지 중) ~로 결정하다, ~로 정하다 (settle on a name/date/approach)",
        "model": "settle on [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "to decide on or choose something",
        "example": "Don't settle for a cheap monitor—your eyes will thank you.",
        "exampleKo": "싼 모니터로 만족하지 마. 나중에 눈이 고마워할 거야."
      },
      {
        "cue": "(새 일·일상·환경)에 적응해 자리를 잡다 (settle into the new role)",
        "model": "settle into [a job / routine / place]",
        "tier": 2,
        "easyEn": "to get used to a new job, routine, or place",
        "example": "We finally settled on 'Aurora' for the project name.",
        "exampleKo": "프로젝트 이름은 결국 '오로라'로 정했어."
      },
      {
        "cue": "(분쟁·문제·논쟁을) 해결하다, 매듭짓다, 결말짓다",
        "model": "settle [a dispute / matter / argument]",
        "tier": 2,
        "star": true,
        "easyEn": "to resolve or end a disagreement",
        "example": "Give me a week to settle into the new role before you pile on more.",
        "exampleKo": "일 더 얹기 전에 새 역할에 적응할 일주일만 줘."
      },
      {
        "cue": "(빚·계산을) 정산하다, 셈을 치르다 (let's settle up later)",
        "model": "settle up (with [person])",
        "tier": 2,
        "easyEn": "to pay back money you owe someone",
        "example": "Legal helped us settle the dispute with the vendor.",
        "exampleKo": "법무팀이 그 업체와의 분쟁을 매듭짓는 걸 도와줬어."
      },
      {
        "cue": "(소송을) 합의로 끝내다, 법정 밖에서 합의하다",
        "model": "settle [a lawsuit] / settle out of court",
        "tier": 2,
        "easyEn": "to end a legal case by agreement instead of a trial",
        "example": "You covered dinner, so let me settle up with you later.",
        "exampleKo": "저녁 네가 냈으니까 이따 내가 정산할게."
      },
      {
        "cue": "그럼 결정 났다, 그걸로 끝이다 (논의·고민을 끝내는 말)",
        "model": "that settles it",
        "tier": 2,
        "easyEn": "that makes the decision final",
        "example": "The company chose to settle out of court instead of going to trial.",
        "exampleKo": "회사는 재판까지 가는 대신 법정 밖에서 합의하기로 했어."
      },
      {
        "cue": "차분히 ~에 착수하다, 본격적으로 ~을 시작하다 (settle down to work)",
        "model": "settle down to [work / -ing]",
        "tier": 3,
        "easyEn": "to start working calmly and with focus",
        "example": "The forecast says rain, so that settles it—we're staying in.",
        "exampleKo": "일기예보에 비 온대. 그럼 결정 났네. 우린 그냥 집에 있자."
      },
      {
        "cue": "(혼란·소동이) 가라앉다; 상황이 진정되길 기다리다",
        "model": "let the dust settle",
        "tier": 3,
        "easyEn": "to wait until a confusing situation becomes calm",
        "example": "Coffee's done, let's settle down to work.",
        "exampleKo": "커피 다 됐으니 이제 차분히 일 시작하자."
      },
      {
        "cue": "신경을 가라앉히다, 마음을 진정시키다; 속을 가라앉히다",
        "model": "settle one's nerves / settle one's stomach",
        "tier": 3,
        "easyEn": "to make yourself calm, or ease an upset stomach",
        "example": "Let's let the dust settle before we push another release.",
        "exampleKo": "또 배포하기 전에 상황이 좀 진정되게 놔두자."
      },
      {
        "cue": "묵은 원한을 갚다, 앙갚음하다, 보복하다 (idiom)",
        "model": "settle a/the score",
        "tier": 3,
        "easyEn": "to get revenge for a past wrong",
        "example": "I had some ginger tea to settle my stomach before the flight.",
        "exampleKo": "비행기 타기 전에 속 가라앉히려고 생강차 좀 마셨어."
      },
      {
        "cue": "(의자 등에) 편히 기대어 앉다, 느긋이 자리 잡다 (settle back and relax)",
        "model": "settle back",
        "tier": 3,
        "easyEn": "to lean back and relax comfortably",
        "example": "He came back to the reunion just to settle an old score.",
        "exampleKo": "걔는 묵은 원한 갚으려고 동창회에 나온 거였어."
      },
      {
        "cue": "(오래 머물) 자리를 잡고 ~에 대비하다, ~할 채비로 눌러앉다",
        "model": "settle in for [the night / a long wait]",
        "tier": 3,
        "easyEn": "to get comfortable and ready to stay a long time",
        "example": "Grab some popcorn and settle back—this one's long.",
        "exampleKo": "팝콘 챙기고 편히 기대 앉아. 이거 좀 길어."
      }
    ]
  },
  {
    "id": "count",
    "verb": "COUNT",
    "gloss": "count는 '세다'가 뼈대다. 수를 세다, (가치 있는 것으로) 치다·중요하다·유효하다, 믿고 의지하다(count on).",
    "items": [
      {
        "cue": "~를 믿다, ~에 의지하다, ~을 기대하다 (You can count on me. / Don't count on it. / I'm counting on you to finish it.)",
        "model": "count on [person] / count on [thing] / count on [person] to do / count on -ing",
        "tier": 1,
        "star": true,
        "easyEn": "to rely on or trust someone or something",
        "example": "Don't worry, you can count on me to have the slides ready by Friday.",
        "exampleKo": "걱정 마, 금요일까지 슬라이드 준비해 놓을 테니까 나만 믿어."
      },
      {
        "cue": "(수를) 세다, 헤아리다 (count the votes / count to ten)",
        "model": "count [things]",
        "tier": 1,
        "star": true,
        "example": "Hang on, let me count the chairs before we set up.",
        "exampleKo": "잠깐, 세팅하기 전에 의자 수 좀 세어 볼게."
      },
      {
        "cue": "중요하다, 유효하다, 의미가 있다 (Every vote counts. / It's the thought that counts. / This one doesn't count.)",
        "model": "[thing] counts",
        "tier": 1,
        "star": true,
        "easyEn": "it matters or has value",
        "example": "Even a small fix counts, so go ahead and push it.",
        "exampleKo": "작은 수정도 의미 있으니까 그냥 올려."
      },
      {
        "cue": "끼워주다, 한 명으로 포함시키다 (Count me in!)",
        "model": "count [person] in",
        "tier": 2,
        "easyEn": "to include someone in an activity",
        "example": "Poker night on Friday? Count me in.",
        "exampleKo": "금요일에 포커? 나 낄게."
      },
      {
        "cue": "빼다, 제외하다 (Count me out.)",
        "model": "count [person] out",
        "tier": 2,
        "easyEn": "to exclude someone from an activity",
        "example": "If it's another 6 a.m. hike, count me out.",
        "exampleKo": "또 새벽 6시 등산이면 난 빼줘."
      },
      {
        "cue": "~에 산입되다, ~의 일부로 인정되다 (These hours count toward your PTO. / It counts toward your grade.)",
        "model": "count toward(s) [thing]",
        "tier": 2,
        "easyEn": "to be included as part of a total",
        "example": "Does this training session count toward my CE credits?",
        "exampleKo": "이 교육 세션도 내 보수교육 학점에 산입되나요?"
      },
      {
        "cue": "~에게 불리하게 작용하다, 감점·약점이 되다 (Will this count against me in the review?)",
        "model": "count against [person]",
        "tier": 2,
        "easyEn": "to be a disadvantage to someone",
        "example": "Be honest in the retro—it won't count against you.",
        "exampleKo": "회고 때 솔직하게 말해, 너한테 불리하게 작용 안 하니까."
      },
      {
        "cue": "다 더하다, 합산하다 (Count up the totals.)",
        "model": "count up [things]",
        "tier": 2,
        "example": "Can you count up the totals before we send the invoice?",
        "exampleKo": "인보이스 보내기 전에 합계 좀 다 더해 줄래?"
      },
      {
        "cue": "(숫자를) 거꾸로 세다, 카운트다운하다 (count down from ten)",
        "model": "count down (from [number])",
        "tier": 2,
        "example": "Everyone got their drinks? Okay, count down from ten!",
        "exampleKo": "다들 잔 들었어? 좋아, 10부터 거꾸로 세자!"
      },
      {
        "cue": "가치가 있다 / 아무 소용 없다 (Experience counts for a lot. / All that work counted for nothing.)",
        "model": "count for [something] / count for nothing",
        "tier": 2,
        "easyEn": "to have value, or to have no value",
        "example": "Twenty years of experience counts for a lot in this role.",
        "exampleKo": "이 자리에선 20년 경력이 큰 가치가 있어."
      },
      {
        "cue": "~로 간주되다, ~으로 쳐지다 (Does this count as overtime? / A retweet counts as engagement.)",
        "model": "count as [something]",
        "tier": 2,
        "easyEn": "to be accepted or considered as something",
        "example": "Wait, does a coffee run count as a break?",
        "exampleKo": "잠깐, 커피 사러 가는 것도 휴식으로 쳐지나?"
      },
      {
        "cue": "세다가 수를 놓치다, 너무 많아 못 세다 (I've lost count of how many times this broke.)",
        "model": "lose count (of [things])",
        "tier": 2,
        "easyEn": "to forget the number because there are too many",
        "example": "I've lost count of how many times this build has failed today.",
        "exampleKo": "오늘 이 빌드가 몇 번 실패했는지 세다가 놓쳤어."
      },
      {
        "cue": "~을 손꼽아 기다리다, ~까지 날짜를 세다 (We're counting down to the launch.)",
        "model": "count down to [event]",
        "tier": 2,
        "easyEn": "to eagerly wait for an event as time passes",
        "example": "The whole team is counting down to the launch next Tuesday.",
        "exampleKo": "팀 전체가 다음 주 화요일 출시를 손꼽아 기다리고 있어."
      },
      {
        "cue": "~를 ~의 하나로 꼽다, ~에 포함시키다 (I count her among my closest mentors.)",
        "model": "count [person/thing] among [group]",
        "tier": 3,
        "easyEn": "to consider someone or something part of a group",
        "example": "I count Sarah among the best managers I've ever had.",
        "exampleKo": "세라는 내가 겪은 최고의 매니저 중 하나로 꼽아."
      },
      {
        "cue": "한 개씩 세어 내놓다, 따로 세다 (She counted out the bills onto the table.)",
        "model": "count out [money/items]",
        "tier": 3,
        "easyEn": "to count things one by one",
        "example": "The cashier counted out my change onto the counter.",
        "exampleKo": "계산원이 거스름돈을 카운터에 한 장씩 세어 내놨어."
      },
      {
        "cue": "(차례로) 번호를 외치다 (Count off by twos.)",
        "model": "count off",
        "tier": 3,
        "easyEn": "to say numbers in turn one after another",
        "example": "Alright everyone, count off by twos.",
        "exampleKo": "자 다들, 둘씩 번호 외쳐."
      },
      {
        "cue": "가진 것에 감사하다",
        "model": "count your blessings",
        "tier": 3,
        "easyEn": "to appreciate the good things you have",
        "example": "Rough week, but honestly I should count my blessings.",
        "exampleKo": "힘든 한 주였지만 솔직히 가진 것에 감사해야지."
      },
      {
        "cue": "김칫국부터 마시지 마라, 결과 나오기 전에 좋아하지 마라",
        "model": "don't count your chickens (before they hatch)",
        "tier": 3,
        "easyEn": "do not assume success before it actually happens",
        "example": "They haven't signed yet, so don't count your chickens.",
        "exampleKo": "아직 계약 안 했으니까 김칫국부터 마시지 마."
      },
      {
        "cue": "인원수를 세다, 머릿수를 세다 (Let me count heads before we order.)",
        "model": "count heads",
        "tier": 3,
        "easyEn": "to count how many people are present",
        "example": "Let me count heads real quick before I order lunch.",
        "exampleKo": "점심 주문하기 전에 인원수 빨리 좀 셀게."
      },
      {
        "cue": "(잠들려고) 양을 세다",
        "model": "count sheep",
        "tier": 3,
        "easyEn": "to try to fall asleep by counting imagined sheep",
        "example": "I was so wired I ended up counting sheep till 3 a.m.",
        "exampleKo": "너무 말똥말똥해서 결국 새벽 3시까지 양을 셌어."
      }
    ]
  },
  {
    "id": "plan",
    "verb": "PLAN",
    "gloss": "plan은 '미리 정해 둔다'가 뼈대다. 계획하다, 작정하다, 대비하다, 설계하다.",
    "items": [
      {
        "cue": "~할 계획이다, ~하려고 한다 (가장 기본). \"I plan to ship it Friday.\"",
        "model": "plan to [verb]",
        "tier": 1,
        "star": true,
        "example": "I plan to push the fix before I log off.",
        "exampleKo": "로그아웃하기 전에 그 수정 사항 올릴 계획이에요."
      },
      {
        "cue": "~할 작정이다, ~할 예정이다 (구어에서 plan to와 거의 같게 씀). \"Are you planning on attending the standup?\"",
        "model": "plan on [-ing]",
        "tier": 1,
        "star": true,
        "example": "Are you planning on grabbing lunch with the team?",
        "exampleKo": "팀이랑 점심 같이 먹을 예정이에요?"
      },
      {
        "cue": "~에 대비해 계획하다, ~을 미리 준비하다. \"We need to plan for scale / for the worst case.\"",
        "model": "plan for [thing]",
        "tier": 1,
        "star": true,
        "example": "We need to plan for a traffic spike when the ad goes live.",
        "exampleKo": "광고 나가면 트래픽 몰릴 거 대비해서 계획 세워야 해요."
      },
      {
        "cue": "미리미리 계획하다, 앞일을 대비하다. \"Book early and plan ahead.\"",
        "model": "plan ahead",
        "tier": 1,
        "star": true,
        "example": "Flights get pricey in December, so plan ahead.",
        "exampleKo": "12월엔 항공권이 비싸지니까 미리미리 계획해요."
      },
      {
        "cue": "~을 계획하다, ~을 짜다 (타동사 기본). \"plan the sprint / a meeting / the launch.\"",
        "model": "plan [the thing]",
        "tier": 1,
        "star": true,
        "example": "Can you plan the sprint before Monday's standup?",
        "exampleKo": "월요일 스탠드업 전에 스프린트 좀 짜 줄래요?"
      },
      {
        "cue": "계획을 세우다, 약속을 잡다. \"Let's make plans for Q3.\"",
        "model": "make plans (to/for)",
        "tier": 1,
        "example": "Let's make plans to grab drinks after the launch.",
        "exampleKo": "출시 끝나고 술 한잔하기로 약속 잡죠."
      },
      {
        "cue": "선약이 있다, (저녁 등) 약속이 있다. \"I have plans tonight.\"",
        "model": "have plans",
        "tier": 1,
        "example": "Sorry, I can't — I have plans tonight.",
        "exampleKo": "미안, 안 되겠어. 오늘 저녁에 선약 있어."
      },
      {
        "cue": "계획대로, 예정대로. \"The deploy went as planned.\"",
        "model": "as planned",
        "tier": 2,
        "star": true,
        "example": "The migration went exactly as planned.",
        "exampleKo": "마이그레이션은 정확히 계획대로 됐어요."
      },
      {
        "cue": "~을 꼼꼼히/세세하게 짜다, 구상을 끝까지 그리다. \"Let's plan out the rollout step by step.\"",
        "model": "plan out [thing]",
        "tier": 2,
        "example": "Let's plan out the rollout step by step so nothing breaks.",
        "exampleKo": "뭐 하나 안 터지게 롤아웃을 단계별로 꼼꼼히 짜 봅시다."
      },
      {
        "cue": "~을 피해서/고려해서 일정을 잡다. \"We planned the release around the holidays.\"",
        "model": "plan around [thing]",
        "tier": 2,
        "easyEn": "arrange your schedule to avoid or fit something",
        "example": "We planned the release around Thanksgiving so nobody's on call during the holiday.",
        "exampleKo": "연휴에 아무도 대기 안 하게 추수감사절을 피해서 릴리스 일정을 잡았어요."
      },
      {
        "cue": "계획대로 진행되다 (부정으로 자주 씀). \"Nothing went according to plan.\"",
        "model": "go according to plan",
        "tier": 2,
        "example": "Honestly, nothing went according to plan today.",
        "exampleKo": "솔직히 오늘 하나도 계획대로 안 됐어요."
      },
      {
        "cue": "계획 변경 (갑자기 바뀜). \"Change of plans — we're demoing today.\"",
        "model": "change of plans",
        "tier": 2,
        "example": "Change of plans — the client wants the demo today instead.",
        "exampleKo": "계획 변경이에요. 고객이 데모를 오늘 하재요."
      },
      {
        "cue": "차선책, 대안, 백업 계획. \"If the API is down, what's our Plan B?\"",
        "model": "Plan B",
        "tier": 2,
        "easyEn": "a backup plan if the first one fails",
        "example": "If Stripe goes down mid-checkout, what's our Plan B?",
        "exampleKo": "결제 중에 스트라이프가 죽으면 우리 차선책이 뭐죠?"
      },
      {
        "cue": "작전, 전략, 실행 방안 (미국 직장에서 흔함). \"What's the game plan for the migration?\"",
        "model": "game plan",
        "tier": 2,
        "easyEn": "an overall strategy or plan of action",
        "example": "So what's the game plan for the database migration?",
        "exampleKo": "그래서 DB 마이그레이션 작전이 뭐예요?"
      },
      {
        "cue": "실행 계획, 후속 조치 계획. \"Let's turn this into an action plan.\"",
        "model": "action plan / plan of action",
        "tier": 2,
        "example": "Great feedback — let's turn it into an action plan by Friday.",
        "exampleKo": "피드백 좋네요. 금요일까지 실행 계획으로 정리합시다."
      },
      {
        "cue": "사업 계획(서). \"The founders pitched their business plan.\"",
        "model": "business plan",
        "tier": 2,
        "example": "The founders pitched their business plan to a room full of VCs.",
        "exampleKo": "창업자들이 VC들 가득한 방에서 사업 계획을 발표했어요."
      },
      {
        "cue": "종합 계획, 큰 그림. \"This is all part of the master plan.\"",
        "model": "master plan",
        "tier": 2,
        "example": "Don't worry, the messy first draft is all part of the master plan.",
        "exampleKo": "걱정 마, 엉망인 초안도 다 큰 그림의 일부야."
      },
      {
        "cue": "(SaaS) 요금제, 구독 플랜. \"We're on the free plan / upgrade to the Pro plan.\"",
        "model": "pricing plan / subscription plan",
        "tier": 2,
        "example": "We're still on the free plan, but we should upgrade to Pro this month.",
        "exampleKo": "우린 아직 무료 요금제인데, 이번 달엔 프로로 업그레이드해야 해요."
      },
      {
        "cue": "퇴직 연금 제도 (미국 직장 복지). \"Does the company match the 401(k) plan?\"",
        "model": "retirement plan / 401(k) plan",
        "tier": 2,
        "example": "Does the company match on the 401(k) plan?",
        "exampleKo": "회사가 401(k) 퇴직연금 매칭해 줘요?"
      },
      {
        "cue": "계획대로 밀고 나가다, 계획을 고수하다. \"Let's stick to the plan and not add scope.\"",
        "model": "stick to the plan",
        "tier": 2,
        "example": "Let's stick to the plan and not add any new scope this sprint.",
        "exampleKo": "이번 스프린트엔 계획대로 밀고 나가고 새 범위는 추가하지 말죠."
      },
      {
        "cue": "계획은 ~하는 것이다 (스탠드업/회의에서 매우 흔함). \"The plan is to launch next week.\"",
        "model": "the plan is to [verb]",
        "tier": 2,
        "example": "The plan is to launch next Tuesday, pending QA.",
        "exampleKo": "계획은 QA만 통과하면 다음 주 화요일에 출시하는 거예요."
      },
      {
        "cue": "아무리 잘 짠 계획도 (어긋나기 마련이다) — 속담. \"The best-laid plans... the server crashed anyway.\"",
        "model": "the best-laid plans",
        "tier": 3,
        "easyEn": "even careful plans can still go wrong",
        "example": "The best-laid plans... we rehearsed the demo all week and the server still crashed.",
        "exampleKo": "아무리 잘 짠 계획도... 일주일 내내 데모 리허설했는데 서버가 그냥 죽어 버렸어요."
      }
    ]
  },
  {
    "id": "figure",
    "verb": "FIGURE",
    "gloss": "figure는 머릿속으로 따져서 알아내고 짐작하는 게 핵심이다. 알아내다, 해결하다, ~라고 생각하다, 예상하다, (중요하게) 등장하다.",
    "items": [
      {
        "cue": "알아내다, 이해하다, (문제를) 해결하다 — 머리 써서 답·방법을 찾다. \"Let me figure out why the build is failing.\"",
        "model": "figure out [thing] / figure out how to [verb]",
        "tier": 1,
        "star": true,
        "example": "I need to figure out why the deploy keeps timing out.",
        "exampleKo": "배포가 왜 자꾸 타임아웃 나는지 알아내야 해."
      },
      {
        "cue": "~라고 생각하다/짐작하다 (= I guess/think). \"I figured you'd already left.\" 북미 회화에서 매우 흔함",
        "model": "figure (that) [clause]",
        "tier": 2,
        "star": true,
        "easyEn": "think or guess that something is true",
        "example": "I figured you'd want coffee, so I grabbed you one.",
        "exampleKo": "너 커피 마시고 싶을 것 같아서 하나 사 왔어."
      },
      {
        "cue": "(사람) 속을 도무지 모르겠다, 이해가 안 된다. \"I can't figure her out.\" figure out의 분리형 — 사람의 성격·속내를 파악하다",
        "model": "can't figure [person] out",
        "tier": 2,
        "easyEn": "cannot understand what someone is really like",
        "example": "I've worked with Dave for a year and I still can't figure him out.",
        "exampleKo": "데이브랑 일한 지 1년인데 아직도 그 사람 속을 모르겠어."
      },
      {
        "cue": "~에 요소로 작용하다, 영향을 주다. \"How does cost figure into the decision?\"",
        "model": "figure into [thing]",
        "tier": 2,
        "easyEn": "be one factor that affects a result",
        "example": "How does the timeline figure into which vendor we pick?",
        "exampleKo": "어떤 업체를 고를지에 일정이 어떻게 작용하는데?"
      },
      {
        "cue": "~을 예상하다, 계획·일정에 넣다, 기대하다. \"I figured on finishing by 5.\" 비격식",
        "model": "figure on [thing] / figure on [-ing]",
        "tier": 3,
        "easyEn": "expect something or include it in your plans",
        "example": "I figured on wrapping up by six, so let's not add anything new.",
        "exampleKo": "여섯 시까지는 끝낼 걸로 잡았으니까 새로 뭐 추가하지 말자."
      },
      {
        "cue": "(계산·고려에) ~을 넣다/포함하다. \"Did you figure in the tax?\"",
        "model": "figure in [thing]",
        "tier": 3,
        "easyEn": "include something when you calculate or decide",
        "example": "Did you figure in the shipping when you gave me that total?",
        "exampleKo": "그 총액 알려줄 때 배송비도 넣은 거야?"
      },
      {
        "cue": "참 알다가도 모르겠네, 어이없네 (예상 밖 결과에 던지는 감탄)",
        "model": "go figure",
        "tier": 3,
        "easyEn": "that is surprising and hard to explain",
        "example": "The cheap tires lasted longer than the expensive ones. Go figure.",
        "exampleKo": "싼 타이어가 비싼 것보다 더 오래 갔어. 참 알다가도 모르겠네."
      },
      {
        "cue": "그럴 줄 알았다, 예상한 대로네 (당연하다는 듯한 빈정거림)",
        "model": "it figures / that figures",
        "tier": 3,
        "easyEn": "that is exactly what I expected",
        "example": "The one day I skip standup is the day they announce layoffs. It figures.",
        "exampleKo": "내가 스탠드업 빠진 날 하필 정리해고 발표하네. 그럴 줄 알았어."
      },
      {
        "cue": "말이 안 된다, 앞뒤가 안 맞는다, 이해가 안 간다",
        "model": "it doesn't figure",
        "tier": 3,
        "easyEn": "that does not make sense",
        "example": "He says he was home all night, but his car was downtown. It doesn't figure.",
        "exampleKo": "밤새 집에 있었다는데 차는 시내에 있었대. 앞뒤가 안 맞잖아."
      },
      {
        "cue": "누가 알았겠어, 뜻밖이네 (예상 못 한 결과에 대한 놀람)",
        "model": "who'd have figured / who would have figured",
        "tier": 3,
        "easyEn": "nobody expected that to happen",
        "example": "Who'd have figured that little side project would end up paying the bills?",
        "exampleKo": "그 작은 사이드 프로젝트가 밥값을 하게 될 줄 누가 알았겠어?"
      }
    ]
  },
  {
    "id": "sort",
    "verb": "SORT",
    "gloss": "sort는 뒤섞인 걸 가르고 줄 세우는 뼈대 동사다. 분류하다, 정렬하다, (문제를) 해결·정리하다, 가려내다.",
    "items": [
      {
        "cue": "어느 정도, 약간, 뭐랄까 (말할 때 buffer로도 자주 씀)",
        "model": "sort of",
        "tier": 1,
        "star": true,
        "easyEn": "somewhat; partly; not completely",
        "example": "I'm sort of tired, but let's just finish it tonight.",
        "exampleKo": "좀 피곤하긴 한데, 그냥 오늘 밤에 끝내자."
      },
      {
        "cue": "(문제·상황을) 해결하다, 처리하다; (어질러진 걸) 정리·정돈하다",
        "model": "sort out [thing/problem]",
        "tier": 2,
        "star": true,
        "easyEn": "fix a problem or organize something messy",
        "example": "Can you sort out the billing issue before the client calls?",
        "exampleKo": "고객이 전화하기 전에 결제 문제 좀 해결해 줄래?"
      },
      {
        "cue": "(배열·목록·데이터를) 정렬하다 — 코딩/인터뷰 핵심",
        "model": "sort [array/list/data]",
        "tier": 2,
        "star": true,
        "example": "Just sort the array first, then the binary search works.",
        "exampleKo": "일단 배열부터 정렬하면 이진 탐색이 먹혀."
      },
      {
        "cue": "[기준(날짜·이름·크기 등)]으로 정렬하다",
        "model": "sort by [criterion]",
        "tier": 2,
        "star": true,
        "example": "Let's sort the tickets by priority so we hit the urgent ones first.",
        "exampleKo": "급한 것부터 처리하게 티켓을 우선순위로 정렬하자."
      },
      {
        "cue": "(많은 것을) 하나하나 살펴보며 추리다/정리하다",
        "model": "sort through [things]",
        "tier": 2,
        "example": "I spent all morning sorting through my inbox.",
        "exampleKo": "오전 내내 받은편지함을 하나하나 정리했어."
      },
      {
        "cue": "[것들]을 [그룹·범주]로 분류해 넣다",
        "model": "sort [things] into [groups/categories]",
        "tier": 2,
        "example": "Sort these receipts into business and personal, please.",
        "exampleKo": "이 영수증들 업무용이랑 개인용으로 분류해 줘."
      },
      {
        "cue": "오름차순/내림차순으로 정렬하다",
        "model": "sort in ascending/descending order",
        "tier": 2,
        "example": "Sort the results in descending order so the top scores show first.",
        "exampleKo": "제일 높은 점수가 먼저 뜨게 내림차순으로 정렬해."
      },
      {
        "cue": "온갖, 갖가지 [것]",
        "model": "all sorts of [things]",
        "tier": 2,
        "easyEn": "many different kinds of things",
        "example": "We got all sorts of weird bugs after that deploy.",
        "exampleKo": "그 배포 이후로 온갖 이상한 버그가 다 터졌어."
      },
      {
        "cue": "일종의 [것]; 비슷한 거",
        "model": "a sort of [thing]",
        "tier": 2,
        "easyEn": "a kind of thing; something similar",
        "example": "It's a sort of dashboard, but way simpler.",
        "exampleKo": "일종의 대시보드인데, 훨씬 단순한 거야."
      },
      {
        "cue": "[것]이 처리·해결되게 하다, 정리되게 만들다",
        "model": "get [thing] sorted (out)",
        "tier": 2,
        "easyEn": "get something fixed or organized",
        "example": "Let me get the deploy sorted out and I'll ping you.",
        "exampleKo": "배포 처리해 놓고 너한테 알려줄게."
      },
      {
        "cue": "정렬 순서 (오름차순/내림차순 등 정렬 방향) — 기술 용어",
        "model": "sort order",
        "tier": 2,
        "example": "Check the sort order — it's showing oldest first right now.",
        "exampleKo": "정렬 순서 확인해 봐, 지금 오래된 게 먼저 뜨고 있어."
      },
      {
        "cue": "[A]를 [B]와 구분해 가려내다 (옥석을 가리다)",
        "model": "sort [A] from [B]",
        "tier": 3,
        "easyEn": "separate one type of thing from another",
        "example": "It's hard to sort the real leads from the spam.",
        "exampleKo": "진짜 고객 문의랑 스팸을 가려내기가 힘들어."
      },
      {
        "cue": "마음·생활을 추스르다, 정신 차리다",
        "model": "sort [oneself] out",
        "tier": 3,
        "easyEn": "deal with your problems and become organized",
        "example": "I just need a weekend to sort myself out.",
        "exampleKo": "그냥 나 좀 추스를 주말이 필요해."
      },
      {
        "cue": "컨디션이 안 좋은, 기분이 언짢은",
        "model": "out of sorts",
        "tier": 3,
        "easyEn": "feeling slightly unwell or in a bad mood",
        "example": "I've been out of sorts all day — I think I'm coming down with something.",
        "exampleKo": "하루 종일 컨디션이 안 좋아, 몸살 오려나 봐."
      },
      {
        "cue": "일종의 ~ (그저 그런 수준의)",
        "model": "of sorts",
        "tier": 3,
        "easyEn": "a kind of thing, but not a good example",
        "example": "They gave us a training session of sorts, but it wasn't much help.",
        "exampleKo": "일종의 교육이라고 해주긴 했는데, 별 도움은 안 됐어."
      }
    ]
  },
  {
    "id": "step",
    "verb": "STEP",
    "gloss": "step은 '발을 한 걸음 옮기다'가 뼈대다. 나서다, 물러나다, 개입하다, 자리를 비우다, 단계별로 짚어가다.",
    "items": [
      {
        "cue": "[person]가 더 책임지고 나서다, 수준을 한 단계 끌어올리다 (I stepped up to lead the release.)",
        "model": "step up",
        "tier": 2,
        "star": true,
        "easyEn": "take on more responsibility, or improve your performance",
        "example": "When Sarah quit, I stepped up and took over the whole launch.",
        "exampleKo": "Sarah가 그만두자 내가 나서서 런칭 전체를 맡았어."
      },
      {
        "cue": "(직책·역할에서) 물러나다, 사임하다 (The CTO stepped down last month.)",
        "model": "step down",
        "tier": 2,
        "star": true,
        "easyEn": "leave an important job or official position",
        "example": "He's stepping down as CEO at the end of the year.",
        "exampleKo": "그는 연말에 CEO 자리에서 물러나."
      },
      {
        "cue": "개입하다, (남을) 대신해 나서다 (My manager stepped in to unblock us.)",
        "model": "step in",
        "tier": 2,
        "star": true,
        "easyEn": "get involved to help or handle a problem",
        "example": "Things were getting heated, so my boss stepped in.",
        "exampleKo": "분위기가 험악해져서 상사가 개입했어."
      },
      {
        "cue": "한발 물러서서 큰 그림을 보다, 거리를 두다 (Let's step back and rethink the design.)",
        "model": "step back",
        "tier": 2,
        "star": true,
        "easyEn": "pause to look at the whole situation calmly",
        "example": "Let's step back for a sec and figure out what we're actually solving.",
        "exampleKo": "잠깐 한발 물러서서 우리가 진짜 뭘 풀려는 건지 짚어보자."
      },
      {
        "cue": "(잠깐) 자리를 비우다, 밖으로 나가다 (I'll step out for a sec.)",
        "model": "step out",
        "tier": 2,
        "easyEn": "leave a place for a short time",
        "example": "I'm gonna step out and grab a coffee, back in five.",
        "exampleKo": "잠깐 나가서 커피 좀 사올게, 5분 뒤에 올게."
      },
      {
        "cue": "옆으로 비키다; (자리를) 양보하고 물러나다 (He stepped aside so a new lead could take over.)",
        "model": "step aside",
        "tier": 2,
        "easyEn": "move aside, or give up your position for someone",
        "example": "He stepped aside so a younger lead could run the team.",
        "exampleKo": "그는 더 젊은 리드가 팀을 이끌 수 있게 자리를 양보하고 물러났어."
      },
      {
        "cue": "[thing]에서 잠시 손을 떼다, 떨어지다 (I stepped away from the project for a week.)",
        "model": "step away (from [thing])",
        "tier": 2,
        "easyEn": "take a break from something for a while",
        "example": "I stepped away from Slack for a couple hours to actually get work done.",
        "exampleKo": "실제로 일 좀 하려고 몇 시간 슬랙에서 손 뗐어."
      },
      {
        "cue": "(코드·로직·과정을) 한 단계씩 짚어가다 (Let me step through the algorithm.)",
        "model": "step through [thing]",
        "tier": 2,
        "easyEn": "go through something carefully, one stage at a time",
        "example": "Let me step through the bug with you real quick.",
        "exampleKo": "이 버그 빠르게 한 단계씩 같이 짚어볼게."
      },
      {
        "cue": "[person]를 대신해 대타로 들어가다 (Can you step in for me at the standup?)",
        "model": "step in for [person]",
        "tier": 2,
        "easyEn": "temporarily do someone's job in their place",
        "example": "Can you step in for me at standup tomorrow? I've got a dentist appointment.",
        "exampleKo": "내일 스탠드업에 나 대신 들어가 줄 수 있어? 치과 예약이 있어서."
      },
      {
        "cue": "(역할·상황에) 들어가 맡다; step into [person]'s shoes = ~의 역할을 이어받다",
        "model": "step into [role/situation]",
        "tier": 2,
        "easyEn": "begin taking on a role or situation",
        "example": "She's stepping into the PM role next week and filling Dave's shoes.",
        "exampleKo": "그녀가 다음 주에 PM 역할을 맡아서 Dave의 자리를 이어받아."
      },
      {
        "cue": "실력·수준을 끌어올리다 (We need to step up our game on testing.)",
        "model": "step up [one's] game",
        "tier": 2,
        "easyEn": "improve how well you do something",
        "example": "Our competitors are shipping fast, we really need to step up our game.",
        "exampleKo": "경쟁사들이 빠르게 내놓고 있어서, 우리 정말 실력을 끌어올려야 해."
      },
      {
        "cue": "책임지고 나서다, 제 역할을 다하다 (관용구)",
        "model": "step up to the plate",
        "tier": 2,
        "easyEn": "take responsibility and deal with a task",
        "example": "Nobody wanted the on-call shift, so Mike stepped up to the plate.",
        "exampleKo": "아무도 온콜 근무를 원하지 않아서 Mike가 책임지고 나섰어."
      },
      {
        "cue": "남의 영역을 침범하다, 기분을 상하게 하다 (I don't want to step on your toes here.)",
        "model": "step on [person]'s toes",
        "tier": 2,
        "easyEn": "upset someone by interfering in their area",
        "example": "I can help with the API stuff, but I don't want to step on your toes.",
        "exampleKo": "API 쪽 도와줄 수 있는데, 네 영역을 침범하고 싶진 않아."
      },
      {
        "cue": "조치를 취하다 (We took steps to prevent the outage.)",
        "model": "take steps (to [verb])",
        "tier": 2,
        "easyEn": "take action to achieve or prevent something",
        "example": "We've taken steps to make sure this outage never happens again.",
        "exampleKo": "이런 장애가 다시는 안 생기게 조치를 취했어."
      },
      {
        "cue": "한 단계씩, 차근차근 (Walk me through it step by step.)",
        "model": "step by step",
        "tier": 2,
        "example": "Just walk me through the setup step by step.",
        "exampleKo": "그냥 설치 과정을 차근차근 하나씩 설명해 줘."
      },
      {
        "cue": "앞으로 나서다, 자원하다·제보하다 (A volunteer stepped forward.)",
        "model": "step forward",
        "tier": 2,
        "easyEn": "offer to help, or give information to authorities",
        "example": "If anyone saw what happened, please step forward.",
        "exampleKo": "무슨 일이 있었는지 본 사람이 있으면 앞으로 나서 주세요."
      },
      {
        "cue": "발밑 조심해; 언행을 조심해",
        "model": "watch your step",
        "tier": 2,
        "easyEn": "be careful, in walking or in how you behave",
        "example": "Watch your step, the floor's still wet over there.",
        "exampleKo": "발밑 조심해, 저쪽 바닥 아직 젖었어."
      },
      {
        "cue": "선을 넘다, 규범·기대에서 벗어나다",
        "model": "step out of line",
        "tier": 2,
        "easyEn": "behave badly or break the accepted rules",
        "example": "He stepped out of line in the meeting and everyone noticed.",
        "exampleKo": "그가 회의에서 선을 넘었고 다들 알아챘어."
      },
      {
        "cue": "~와 보조가 안 맞다, 엇박자다 (The plan is out of step with reality.)",
        "model": "out of step (with [thing/person])",
        "tier": 2,
        "easyEn": "not matching or not agreeing with something",
        "example": "Honestly, the deadline is totally out of step with reality.",
        "exampleKo": "솔직히 그 마감일은 현실이랑 완전히 엇박자야."
      },
      {
        "cue": "한발 앞서 있다 (Stay one step ahead of the competition.)",
        "model": "one step ahead (of [person])",
        "tier": 2,
        "easyEn": "acting early so you stay in front of someone",
        "example": "We ship features early to stay one step ahead of the competition.",
        "exampleKo": "경쟁사보다 한발 앞서려고 기능을 일찍 내놓는 거야."
      },
      {
        "cue": "~을 넘어가다, 타고 넘다 (literal)",
        "model": "step over [thing]",
        "tier": 2,
        "example": "Careful, just step over the cables so you don't trip.",
        "exampleKo": "조심해, 걸려 넘어지지 않게 케이블 그냥 넘어가."
      },
      {
        "cue": "서둘러, 속도 내 (관용구)",
        "model": "step on it",
        "tier": 3,
        "easyEn": "hurry up; go faster",
        "example": "We're late for the flight, step on it!",
        "exampleKo": "비행기 늦었어, 서둘러!"
      },
      {
        "cue": "~와 발맞추다, 보조를 맞추다",
        "model": "in step (with [thing/person])",
        "tier": 3,
        "easyEn": "matching or moving together with something",
        "example": "Marketing and engineering are finally in step on the roadmap.",
        "exampleKo": "마케팅이랑 엔지니어링이 드디어 로드맵에서 발을 맞추고 있어."
      }
    ]
  },
  {
    "id": "lay",
    "verb": "LAY",
    "gloss": "lay는 '평평하게 놓다·눕히다'가 뼈대인 타동사. 거기서 규칙을 정하고(확립), 계획을 펼쳐 보이고, 사람을 내보내고(해고), 기반을 깐다. (자동사 lie '눕다'와 혼동 주의)",
    "items": [
      {
        "cue": "(경영상 이유로) 해고하다·정리해고하다. 'The company laid off 200 people' = 200명을 정리해고했다. 수동 'be/get laid off' = 해고당하다 (테크 업계 필수 표현). 별개로 'lay off [the coffee/sugar]' = ~을 그만두다·끊다, 'Lay off!' = 그만 좀 해·집적대지 마.",
        "model": "lay off [person] / lay [person] off",
        "tier": 2,
        "star": true,
        "easyEn": "end someone's job because fewer workers are needed",
        "example": "They laid off half the engineering team right before the holidays.",
        "exampleKo": "그들은 연휴 직전에 엔지니어링 팀의 절반을 정리해고했어."
      },
      {
        "cue": "(계획·생각을) 조목조목 펼쳐 설명하다; (물건·UI를) 배치하다. 'lay out the roadmap' = 로드맵을 제시하다 (면접·스탠드업에서 매우 흔함). 참고: 'lay out [money]' = 큰돈을 지출하다 — 다소 격식·영국식, 미국 일상 회화는 shell out/fork out을 더 씀.",
        "model": "lay out [plan/idea] / lay [thing] out",
        "tier": 2,
        "star": true,
        "easyEn": "explain something clearly in detail, or arrange items",
        "example": "Can you lay out the plan for next quarter in the standup tomorrow?",
        "exampleKo": "내일 스탠드업에서 다음 분기 계획 좀 조목조목 설명해 줄래?"
      },
      {
        "cue": "(규칙·원칙을) 확립하다·못박아 정하다. 'lay down the ground rules' = 기본 원칙을 정하다. 'lay down the law' = 단호하게 명령·엄포를 놓다. 문자 그대로는 '내려놓다'.",
        "model": "lay down [rules/principles]",
        "tier": 2,
        "star": true,
        "easyEn": "firmly establish rules or principles",
        "example": "Before we start, let's lay down some ground rules for the group chat.",
        "exampleKo": "시작하기 전에 단톡방 기본 원칙부터 좀 정하자."
      },
      {
        "cue": "~을 (조심히) 놓다·눕히다·깔다. 'lay the cable' = 케이블을 깔다, 'lay it on the table' = 탁자에 놓다. (사람·자신이 '눕다'는 자동사 lie down — lay/lie 혼동 주의)",
        "model": "lay [thing] down / lay [thing] [place]",
        "tier": 2,
        "easyEn": "put something down carefully or in a place",
        "example": "Just lay the laptop down on the couch, I'll grab it later.",
        "exampleKo": "노트북 그냥 소파에 놔둬, 이따 내가 챙길게."
      },
      {
        "cue": "~을 위한 기반·사전 작업을 닦다·마련하다. 'lay the groundwork for the migration' = 마이그레이션의 토대를 마련하다. (업무에서 매우 흔함)",
        "model": "lay the groundwork for [thing]",
        "tier": 2,
        "easyEn": "do the early work that makes something possible",
        "example": "This sprint we're just laying the groundwork for the big migration next month.",
        "exampleKo": "이번 스프린트는 다음 달 대규모 마이그레이션을 위한 기반 작업만 하는 거야."
      },
      {
        "cue": "(비행기 환승 때문에) ~에서 경유·대기 체류하다. 명사 layover = 경유 대기 시간 (미국식; 영국식 stopover).",
        "model": "lay over (in [place])",
        "tier": 2,
        "easyEn": "stop somewhere between flights on a journey",
        "example": "I've got a four-hour layover in Chicago on the way to New York.",
        "exampleKo": "뉴욕 가는 길에 시카고에서 네 시간 경유 대기가 있어."
      },
      {
        "cue": "(새 환경의) 상황·돌아가는 판세를 파악하다. 미국식 표현 (영국식은 'lie of the land'). 새 팀/코드베이스에 적응할 때 자주 씀.",
        "model": "get the lay of the land",
        "tier": 2,
        "easyEn": "learn how a new place or situation works",
        "example": "Give me a week to get the lay of the land before I start changing anything.",
        "exampleKo": "뭘 바꾸기 전에 일주일만 판세 좀 파악하게 해 줘."
      },
      {
        "cue": "책임·탓을 ~에게 돌리다·전가하다. (변형: lay the blame at someone's feet/door)",
        "model": "lay the blame on [person]",
        "tier": 2,
        "easyEn": "say that something is someone's fault",
        "example": "Don't lay the blame on me, you're the one who pushed to prod on Friday.",
        "exampleKo": "나한테 탓 돌리지 마, 금요일에 프로덕션에 배포한 건 너잖아."
      },
      {
        "cue": "몸을 사리다·잠잠히 지내다·잠적하다. (구어로 lay low, 규범 표현은 lie low)",
        "model": "lay low / lie low",
        "tier": 2,
        "easyEn": "stay hidden and avoid attention for a while",
        "example": "After that email thread blew up, I just laid low for a couple of days.",
        "exampleKo": "그 이메일 스레드가 터지고 나서 나 며칠 그냥 몸 사렸어."
      },
      {
        "cue": "~의 기초·토대를 놓다·마련하다. (groundwork와 의미 유사, 다른 콜로케이션)",
        "model": "lay the foundation(s) for [thing]",
        "tier": 2,
        "easyEn": "create the basic things something needs to succeed",
        "example": "These early hires really laid the foundation for the whole company culture.",
        "exampleKo": "이 초기 멤버들이 회사 문화 전체의 토대를 놓은 거야."
      },
      {
        "cue": "~을 호되게 비난하다·몰아세우다·들들 볶다. (구어, 다소 격하게 따질 때)",
        "model": "lay into [person]",
        "tier": 3,
        "easyEn": "criticize or attack someone strongly",
        "example": "My manager laid into me for missing the deadline, it was brutal.",
        "exampleKo": "매니저가 마감 놓친 걸로 나를 호되게 몰아세웠어, 진짜 살벌했어."
      },
      {
        "cue": "(병·부상으로) 앓아 누워 있다·몸져눕다. 'laid up with the flu' = 독감으로 드러눕다.",
        "model": "be laid up (with [illness])",
        "tier": 3,
        "easyEn": "be stuck in bed because of illness or injury",
        "example": "I'm laid up with the flu, so I'll be joining the meeting from bed.",
        "exampleKo": "나 독감으로 앓아누워서 회의는 침대에서 들어갈게."
      },
      {
        "cue": "~을 한쪽에 치워두다·(논쟁·감정을) 제쳐두다; (돈·시간을) 따로 떼어 두다. (다소 격식 — 일상 회화는 set aside/put aside가 더 흔함)",
        "model": "lay aside [thing]",
        "tier": 3,
        "easyEn": "put something to one side, or save it",
        "example": "Let's lay aside the pricing debate and focus on shipping the feature.",
        "exampleKo": "가격 논쟁은 일단 제쳐두고 기능 출시에 집중하자."
      },
      {
        "cue": "~에 대한 권리·소유권을 주장하다; (공로를) 자기 것이라 주장하다.",
        "model": "lay claim to [thing]",
        "tier": 3,
        "easyEn": "say that something belongs to you",
        "example": "Three different teams are laying claim to that budget line.",
        "exampleKo": "세 팀이 그 예산 항목에 대해 서로 자기 거라고 주장하고 있어."
      },
      {
        "cue": "(우려·소문·논란을) 잠재우다·종식시키다. (사람을) 안장하다.",
        "model": "lay [concerns/rumors] to rest",
        "tier": 3,
        "easyEn": "end worries or rumors by proving them wrong",
        "example": "The CEO's email finally laid the layoff rumors to rest.",
        "exampleKo": "CEO 이메일이 드디어 정리해고 소문을 잠재웠어."
      },
      {
        "cue": "~을 (처음) 보다·목격하다. 'the first time I laid eyes on it' = 그걸 처음 봤을 때.",
        "model": "lay eyes on [thing/person]",
        "tier": 3,
        "easyEn": "see something or someone",
        "example": "The first time I laid eyes on that codebase, I knew we were in trouble.",
        "exampleKo": "그 코드베이스를 처음 봤을 때 우리 큰일 났다는 걸 알았어."
      },
      {
        "cue": "(칭찬·아첨·과장을) 지나치게 늘어놓다·오버하다.",
        "model": "lay it on thick",
        "tier": 3,
        "easyEn": "praise or exaggerate far too much",
        "example": "He was really laying it on thick about how amazing my presentation was.",
        "exampleKo": "걔가 내 발표가 얼마나 대단했는지 완전 오버해서 칭찬하더라."
      },
      {
        "cue": "솔직히 다 털어놓다; (지위·평판 등을) 걸고 위험을 무릅쓰다.",
        "model": "lay it (all) on the line",
        "tier": 3,
        "easyEn": "speak very honestly, or risk something important",
        "example": "Okay, let me lay it all on the line: we're way behind schedule.",
        "exampleKo": "좋아, 솔직히 다 말할게. 우리 일정 한참 뒤처졌어."
      },
      {
        "cue": "(감춰진 것을) 드러내다·낱낱이 폭로하다. 'lay bare the problems' = 문제를 다 까발리다.",
        "model": "lay [thing] bare",
        "tier": 3,
        "easyEn": "reveal something hidden completely",
        "example": "The postmortem laid bare just how fragile our deploy process is.",
        "exampleKo": "사후 분석에서 우리 배포 프로세스가 얼마나 허술한지 다 드러났어."
      },
      {
        "cue": "~을 초토화하다·쑥대밭으로 만들다 (강한 비유·다소 과장).",
        "model": "lay waste to [thing]",
        "tier": 3,
        "easyEn": "destroy something completely",
        "example": "That one bad review basically laid waste to our launch week.",
        "exampleKo": "그 악평 하나가 우리 출시 주간을 완전히 쑥대밭으로 만들었어."
      },
      {
        "cue": "(협상·논의에서) 속내·계획·패를 솔직히 다 드러내다. 'Let me lay my cards on the table' = 솔직히 말할게요. (cf. put your cards on the table)",
        "model": "lay your cards on the table",
        "tier": 3,
        "easyEn": "honestly tell people your real plans or intentions",
        "example": "Let me lay my cards on the table: I don't think we can hit that date.",
        "exampleKo": "솔직히 패 다 까고 말할게. 그 날짜 못 맞출 것 같아."
      }
    ]
  },
  {
    "id": "roll",
    "verb": "ROLL",
    "gloss": "roll은 '구르다/굴리다'가 뼈대다. 거기서 굴려 내보내다(배포·출시), 되돌리다(롤백), 이월하다, 합산하다, 밀려들다로 뻗는다.",
    "items": [
      {
        "cue": "(제품·기능을) 출시하다, 배포하다 (\"we rolled out the new feature to all users\"); (반죽 등을) 밀어 펴다",
        "model": "roll out [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "release or introduce something to many people",
        "example": "We're rolling out dark mode to everyone next Tuesday.",
        "exampleKo": "다음 주 화요일에 다크 모드를 전체 사용자에게 배포할 거예요."
      },
      {
        "cue": "(이전 상태로) 되돌리다, 롤백하다 (\"roll back the release\"); (가격·규제·정책을) 축소·인하하다",
        "model": "roll back [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "return something to an earlier state, or reduce it",
        "example": "The deploy broke checkout, so we rolled it back within ten minutes.",
        "exampleKo": "배포 때문에 결제가 망가져서 10분 안에 롤백했어요."
      },
      {
        "cue": "(남은 예산·휴가가) 이월되다 / [thing] 이월하다 (\"unused budget rolls over\"); (자금·401k·계좌를) 옮기다(이전); 뒤집다, 뒹굴다",
        "model": "roll over",
        "tier": 2,
        "star": true,
        "easyEn": "carry over to a later time, or transfer accounts",
        "example": "Any vacation days you don't use roll over into next year.",
        "exampleKo": "안 쓴 휴가는 내년으로 이월돼요."
      },
      {
        "cue": "(수치·데이터를) 합산·집계하다 (\"roll up the numbers\"); (소매를) 걷어붙이다 (= roll up your sleeves, 본격적으로 일에 착수하다)",
        "model": "roll up [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "combine numbers or data into one total",
        "example": "Can you roll up the regional numbers into one dashboard for the exec meeting?",
        "exampleKo": "임원 회의용으로 지역별 수치를 대시보드 하나로 합산해 줄래요?"
      },
      {
        "cue": "(주문·돈·사람·결과가) 밀려들다, 쏟아져 들어오다 (\"orders are rolling in\")",
        "model": "roll in",
        "tier": 2,
        "easyEn": "arrive in large numbers or amounts",
        "example": "We launched an hour ago and the orders are already rolling in.",
        "exampleKo": "한 시간 전에 출시했는데 벌써 주문이 밀려들어오고 있어요."
      },
      {
        "cue": "일을 시작하다, 첫발을 떼다, 굴러가게 만들다",
        "model": "get the ball rolling",
        "tier": 2,
        "star": true,
        "easyEn": "start an activity or process",
        "example": "Let's set up a quick call today just to get the ball rolling on the project.",
        "exampleKo": "프로젝트 첫발을 떼게 오늘 짧게 통화 한번 잡죠."
      },
      {
        "cue": "계속 잘 풀리는 중, 연속으로 성공하는 중 (\"the team's on a roll\")",
        "model": "on a roll",
        "tier": 2,
        "easyEn": "having continued success for a while",
        "example": "Don't jinx it, but the sales team's really on a roll this quarter.",
        "exampleKo": "재수 없는 소리 하긴 싫지만, 영업팀 이번 분기 진짜 잘 나가고 있어요."
      },
      {
        "cue": "(예상 못 한 어려움·변화에) 유연하게 대처하다, 잘 버텨내다",
        "model": "roll with the punches",
        "tier": 2,
        "easyEn": "stay calm and adapt to problems and changes",
        "example": "Client keeps changing the scope, but you just have to roll with the punches.",
        "exampleKo": "클라이언트가 자꾸 범위를 바꾸는데, 그냥 유연하게 대처하는 수밖에 없죠."
      },
      {
        "cue": "수시로, 마감 없이 계속 (채용·접수 등을 상시로) (\"we review applications on a rolling basis\")",
        "model": "on a rolling basis",
        "tier": 2,
        "easyEn": "continuously, with no single fixed deadline",
        "example": "There's no deadline — we review applications on a rolling basis.",
        "exampleKo": "마감은 따로 없고 지원서를 상시로 검토해요."
      },
      {
        "cue": "운에 맡기고 모험하다, 한번 걸어보다",
        "model": "roll the dice",
        "tier": 2,
        "easyEn": "take a risk and hope for luck",
        "example": "We could wait for more data, or just roll the dice and ship it Friday.",
        "exampleKo": "데이터를 더 기다릴 수도 있지만, 그냥 운에 맡기고 금요일에 출시할 수도 있죠."
      },
      {
        "cue": "자, 시작하자 / 시작할 준비가 다 됐다",
        "model": "let's roll / ready to roll",
        "tier": 2,
        "easyEn": "let's start; we are ready to begin",
        "example": "Everybody's got their laptops open? Cool, let's roll.",
        "exampleKo": "다들 노트북 열었죠? 좋아요, 시작합시다."
      },
      {
        "cue": "여러 개를 하나로 합친 (\"two roles rolled into one\")",
        "model": "[things] rolled into one",
        "tier": 2,
        "easyEn": "several things combined into a single one",
        "example": "At a startup you're basically designer and PM rolled into one.",
        "exampleKo": "스타트업에서는 사실상 디자이너랑 PM을 하나로 합친 역할이에요."
      },
      {
        "cue": "(창문·블라인드 등을) 내리다",
        "model": "roll down [thing]",
        "tier": 2,
        "example": "It's freezing in here — can you roll down the window a little?",
        "exampleKo": "여기 너무 추운데 창문 좀 살짝 내려줄래요?"
      },
      {
        "cue": "(잔액·날짜·일정을) 다음 기간으로 이월·이동하다 (회계·계획에서)",
        "model": "roll forward [thing]",
        "tier": 3,
        "easyEn": "move a balance or date to the next period",
        "example": "We'll roll forward the unspent budget into Q3.",
        "exampleKo": "안 쓴 예산은 3분기로 이월할게요."
      },
      {
        "cue": "(프로젝트·팀에서) 빠지다, 손을 떼다 (컨설팅·스태핑 표현; 반대는 roll onto)",
        "model": "roll off [project]",
        "tier": 3,
        "easyEn": "finish working on a project and leave it",
        "example": "I roll off the client project at the end of the month, so let's hand things over soon.",
        "exampleKo": "저 이번 달 말에 그 클라이언트 프로젝트에서 빠지니까 인수인계 곧 하죠."
      },
      {
        "cue": "극진히 환대하다, 융숭하게 대접하다",
        "model": "roll out the red carpet",
        "tier": 3,
        "easyEn": "welcome someone in a special, generous way",
        "example": "When the investors visited, the CEO really rolled out the red carpet.",
        "exampleKo": "투자자들이 왔을 때 대표가 정말 극진하게 대접했어요."
      },
      {
        "cue": "(책임자가) 문책당하다, 목이 날아가다",
        "model": "heads will roll",
        "tier": 3,
        "easyEn": "people will be punished or fired",
        "example": "If we lose this account, heads will roll upstairs.",
        "exampleKo": "이 거래처를 놓치면 윗선에서 누군가 문책당할 거예요."
      },
      {
        "cue": "(기성품·라이브러리를 안 쓰고) 직접 만들어 쓰다, 자체 구현하다 (\"don't roll your own crypto\", \"roll your own auth\") — 개발 현장에서 매우 흔함",
        "model": "roll your own [thing]",
        "tier": 3,
        "easyEn": "build it yourself instead of using existing tools",
        "example": "Please don't roll your own auth — just use Auth0.",
        "exampleKo": "인증은 직접 구현하지 말고 그냥 Auth0 써요."
      }
    ]
  },
  {
    "id": "kick",
    "verb": "KICK",
    "gloss": "kick은 발로 차듯 무언가를 갑자기·세게 작동시키는 뼈대다. 시작하다, 효력이 발동되다, 내쫓다, 자극을 주다.",
    "items": [
      {
        "cue": "(회의·프로젝트·스프린트·빌드를) 시작하다, 착수하다. 명사 kickoff = 착수 회의. 'Let's kick off the sprint.'",
        "model": "kick off [thing] / kick [thing] off",
        "tier": 1,
        "star": true,
        "easyEn": "start a meeting, project, or event",
        "example": "Let's kick off the sprint with a quick planning call at 10.",
        "exampleKo": "10시에 간단한 기획 통화로 스프린트를 시작하죠."
      },
      {
        "cue": "(효과·할인·약·기능·정책이) 작동하기 시작하다, 발효되다; (돈을) 십시일반 보태다. 'The discount kicks in at checkout.' 'Everyone kicked in $20.'",
        "model": "kick in",
        "tier": 2,
        "star": true,
        "easyEn": "start to take effect or start working",
        "example": "The free shipping kicks in once your cart hits $50.",
        "exampleKo": "장바구니가 50달러를 넘으면 무료 배송이 적용돼요."
      },
      {
        "cue": "내쫓다, 쫓아내다, (팀·프로젝트·자리에서) 퇴출시키다.",
        "model": "kick [person] out (of [place])",
        "tier": 2,
        "star": true,
        "example": "They kicked him out of the group chat after he leaked the roadmap.",
        "exampleKo": "그가 로드맵을 유출한 뒤에 사람들이 그를 단톡방에서 내쫓았어요."
      },
      {
        "cue": "(아이디어를) 격식 없이 논의하다, 이리저리 굴려보다; (생각·물건이) 어딘가 떠돌다·굴러다니다. 'Let's kick around some ideas.'",
        "model": "kick around [thing] / kick [thing] around",
        "tier": 2,
        "easyEn": "discuss ideas in a casual, informal way",
        "example": "Let's kick around a few ideas before we commit to anything.",
        "exampleKo": "뭔가 확정하기 전에 아이디어를 몇 개 편하게 던져보죠."
      },
      {
        "cue": "느긋하게 쉬다, 긴장을 풀다 ('kick back and relax'); 명사 kickback = 리베이트, 뇌물성 사례금.",
        "model": "kick back / a kickback",
        "tier": 2,
        "easyEn": "relax and rest; (noun) a secret illegal payment",
        "example": "After that deploy, I just want to kick back and watch a movie.",
        "exampleKo": "그 배포 끝나고 나서는 그냥 느긋하게 쉬면서 영화나 보고 싶어요."
      },
      {
        "cue": "~을 무척 즐기다, ~에서 재미를 느끼다. 'I get a kick out of debugging.'",
        "model": "get a kick out of [thing] / [-ing]",
        "tier": 2,
        "easyEn": "enjoy something a lot; find it fun",
        "example": "Honestly, I get a kick out of tracking down weird bugs.",
        "exampleKo": "솔직히 저는 이상한 버그 잡는 게 너무 재밌어요."
      },
      {
        "cue": "(나쁜) 습관·중독을 끊다.",
        "model": "kick the habit",
        "tier": 2,
        "easyEn": "stop a bad habit or addiction",
        "example": "I finally kicked the habit of checking Slack right when I wake up.",
        "exampleKo": "드디어 일어나자마자 슬랙 확인하는 습관을 끊었어요."
      },
      {
        "cue": "(프로젝트·성장·과정에) 시동을 걸다, 본격적으로 출발시키다, (경기·동력을) 부양하다. 'Let's kickstart the project.' (cf. 크라우드펀딩 플랫폼 Kickstarter)",
        "model": "kick-start [thing] / kickstart [thing]",
        "tier": 2,
        "easyEn": "give something a strong, energetic start",
        "example": "A small ad budget should kick-start our signups this month.",
        "exampleKo": "적은 광고 예산이면 이번 달 가입자 수에 시동을 걸 수 있을 거예요."
      },
      {
        "cue": "(결정·문제 해결을) 미루다, 뒤로 떠넘기다. 회의 단골 표현.",
        "model": "kick the can down the road",
        "tier": 3,
        "easyEn": "delay dealing with a problem until later",
        "example": "We keep kicking the can down the road on the pricing decision.",
        "exampleKo": "우리는 가격 결정을 계속 뒤로 미루고만 있어요."
      },
      {
        "cue": "(도입·구매 전에) 직접 만져보고 점검하다, 가볍게 테스트해 보다. 'Let's kick the tires on this tool.'",
        "model": "kick the tires",
        "tier": 3,
        "easyEn": "test or check something before buying it",
        "example": "Before we sign the contract, let's kick the tires on the free trial.",
        "exampleKo": "계약하기 전에 무료 체험으로 한번 직접 써보고 점검해봐요."
      },
      {
        "cue": "소란을 피우다, 강하게 항의하다; (먼지·문제 등을) 일으키다.",
        "model": "kick up a fuss / kick up [thing]",
        "tier": 3,
        "easyEn": "complain loudly or cause a noisy protest",
        "example": "A few users kicked up a fuss when we changed the login flow.",
        "exampleKo": "로그인 방식을 바꾸자 몇몇 사용자가 강하게 항의했어요."
      },
      {
        "cue": "한 단계 끌어올리다, 강도·수준을 높이다. 'Let's kick it up a notch.'",
        "model": "kick [thing] up a notch",
        "tier": 3,
        "easyEn": "increase the level, intensity, or quality",
        "example": "The demo's fine, but let's kick it up a notch with a live example.",
        "exampleKo": "데모는 괜찮은데, 실시간 예시로 한 단계 더 끌어올려봐요."
      },
      {
        "cue": "본격적으로 돌아가기 시작하다, 속도가 붙다, 가동되다.",
        "model": "kick into gear / kick into high gear",
        "tier": 3,
        "easyEn": "start working actively and gain speed",
        "example": "Once QA signs off, the release really kicks into gear.",
        "exampleKo": "QA 승인만 떨어지면 릴리스가 본격적으로 돌아가기 시작해요."
      },
      {
        "cue": "(실수·놓친 기회 때문에) 자책하다, 땅을 치고 후회하다.",
        "model": "kick oneself (for [-ing])",
        "tier": 3,
        "easyEn": "feel angry at yourself for a mistake",
        "example": "I could kick myself for not backing up that file before the crash.",
        "exampleKo": "충돌 나기 전에 그 파일 백업 안 한 게 정말 후회막심이에요."
      },
      {
        "cue": "(pants) 정신 차리게 하는 자극·동기부여; (teeth) 뼈아픈 좌절·배신.",
        "model": "a kick in the pants / a kick in the teeth",
        "tier": 3,
        "easyEn": "a push to act; or a painful disappointment",
        "example": "That bad review was a kick in the pants to finally fix the onboarding.",
        "exampleKo": "그 혹평이 결국 온보딩을 손보게 만든 자극제였어요."
      },
      {
        "cue": "매정하게 차버리다, 내치다, 버리다. (구어)",
        "model": "kick [person/thing] to the curb",
        "tier": 3,
        "easyEn": "reject or get rid of someone or something",
        "example": "They kicked our proposal to the curb without even a reply.",
        "exampleKo": "그쪽은 답장 한 통 없이 우리 제안을 매정하게 차버렸어요."
      },
      {
        "cue": "마지못해 끌려가듯, 죽어라 버티면서. 'dragged kicking and screaming.'",
        "model": "kicking and screaming",
        "tier": 3,
        "easyEn": "very unwillingly, while strongly resisting",
        "example": "Our team got dragged kicking and screaming into using the new tool.",
        "exampleKo": "우리 팀은 마지못해 끌려가듯 새 툴을 쓰게 됐어요."
      },
      {
        "cue": "재미 삼아, 그냥 심심풀이로.",
        "model": "for kicks / just for kicks",
        "tier": 3,
        "easyEn": "just for fun or amusement",
        "example": "I rewrote the whole script in Rust just for kicks over the weekend.",
        "exampleKo": "주말에 그냥 재미 삼아 스크립트 전체를 러스트로 다시 짰어요."
      },
      {
        "cue": "여전히 건재하다, 멀쩡히 잘 지내다.",
        "model": "alive and kicking",
        "tier": 3,
        "easyEn": "still active, healthy, and doing well",
        "example": "That old side project? Still alive and kicking, believe it or not.",
        "exampleKo": "그 오래된 사이드 프로젝트요? 믿기 힘들겠지만 아직도 멀쩡히 잘 굴러가요."
      },
      {
        "cue": "죽다, 뻗다. (속어, 격식 X)",
        "model": "kick the bucket",
        "tier": 3,
        "easyEn": "die",
        "example": "My laptop finally kicked the bucket after eight solid years.",
        "exampleKo": "제 노트북이 꼬박 8년 만에 드디어 뻗어버렸어요."
      }
    ]
  },
  {
    "id": "wrap",
    "verb": "WRAP",
    "gloss": "wrap의 본질은 \"감싸다/두르다\"다. 물건을 싸다, 둘러 감다, (일을) 마무리하다, (머리로) 완전히 이해하다.",
    "items": [
      {
        "cue": "~을 마무리하다, 끝내다 (회의·프로젝트·하루). 목적어 없이 'let's wrap up'처럼도 씀",
        "model": "wrap up [thing]",
        "tier": 1,
        "star": true,
        "easyEn": "to finish or complete something",
        "example": "Let's wrap up the standup, I've got a call at ten.",
        "exampleKo": "스탠드업 마무리하자, 나 10시에 콜 있어."
      },
      {
        "cue": "~을 완전히 이해하다, 머릿속에 정리하다 (보통 어렵거나 낯선 것). 예: I can't wrap my head around this codebase",
        "model": "wrap [one's] head around [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "fully understand something difficult or confusing",
        "example": "I still can't wrap my head around how our billing code works.",
        "exampleKo": "우리 결제 코드가 어떻게 돌아가는지 아직도 이해가 안 돼."
      },
      {
        "cue": "~을 ~로 감싸다/싸다. (프로그래밍) 예: wrap the component in a provider, wrap the call in a try/catch",
        "model": "wrap [thing] in [thing]",
        "tier": 2,
        "star": true,
        "example": "Just wrap that API call in a try/catch so it doesn't crash.",
        "exampleKo": "그 API 호출을 try/catch로 감싸서 안 터지게 해."
      },
      {
        "cue": "~을 ~에 두르다, 감다 (예: wrap a cable around the post)",
        "model": "wrap [thing] around [thing]",
        "tier": 2,
        "example": "Wrap the charger cable around your hand before you toss it in the bag.",
        "exampleKo": "충전 케이블을 손에 감아서 가방에 넣어."
      },
      {
        "cue": "~를 빙 둘러 감싸며 돌다, ~를 따라 휘감다 (예: the porch wraps around the house)",
        "model": "wrap around [thing]",
        "tier": 2,
        "example": "The trail wraps around the whole lake, it's about three miles.",
        "exampleKo": "그 산책로가 호수를 빙 둘러 있어, 한 5킬로 정도야."
      },
      {
        "cue": "~에 푹 빠지다, 정신이 팔리다, 몰두하다 (예: he's so wrapped up in his work)",
        "model": "be/get wrapped up in [thing]",
        "tier": 2,
        "easyEn": "be completely focused on or deeply involved in something",
        "example": "He's so wrapped up in his side project he forgot to eat lunch.",
        "exampleKo": "걔 자기 사이드 프로젝트에 푹 빠져서 점심 먹는 것도 까먹었어."
      },
      {
        "cue": "(회의·기간의) 요약, 정리, 마무리. 예: a quick wrap-up, a wrap-up meeting(마무리 회의)",
        "model": "a wrap-up (of [thing])",
        "tier": 2,
        "easyEn": "a short summary of something",
        "example": "Can you send a quick wrap-up of the meeting to the channel?",
        "exampleKo": "회의 요약 간단히 채널에 올려줄 수 있어?"
      },
      {
        "cue": "감싸는 것; (코드) 래퍼, 다른 함수·API를 감싼 층",
        "model": "a wrapper (around [thing])",
        "tier": 2,
        "example": "I wrote a little wrapper around the Stripe SDK so the calls are cleaner.",
        "exampleKo": "Stripe SDK 감싸는 작은 래퍼를 만들었어, 그러면 호출이 더 깔끔해."
      },
      {
        "cue": "~을 선물용으로 포장하다",
        "model": "gift-wrap [thing]",
        "tier": 2,
        "example": "Can you gift-wrap this for me? It's for my mom's birthday.",
        "exampleKo": "이거 선물 포장 해주실 수 있어요? 엄마 생신 선물이에요."
      },
      {
        "cue": "뽁뽁이, 완충용 에어캡 포장재 (동사로 bubble-wrap [thing]도 씀)",
        "model": "bubble wrap",
        "tier": 2,
        "example": "The monitor came buried in bubble wrap, took forever to unpack.",
        "exampleKo": "모니터가 뽁뽁이에 잔뜩 싸여 왔어, 뜯는 데 한참 걸렸어."
      },
      {
        "cue": "이걸로 다 끝났다, 마무리됐다 (원래 촬영 종료 신호; 다소 캐주얼)",
        "model": "that's a wrap",
        "tier": 3,
        "easyEn": "we are finished; it is done",
        "example": "Ship the last commit and that's a wrap for the release.",
        "exampleKo": "마지막 커밋 올리면 이번 릴리스는 이걸로 끝이야."
      },
      {
        "cue": "~을 비밀로 하다, 공개하지 않다 (예: keep the launch under wraps)",
        "model": "keep [thing] under wraps",
        "tier": 3,
        "easyEn": "keep something secret or hidden",
        "example": "Keep the new pricing under wraps until we announce it Monday.",
        "exampleKo": "새 가격은 월요일에 발표할 때까지 비밀로 해."
      },
      {
        "cue": "~을 수축 비닐로 밀봉 포장하다",
        "model": "shrink-wrap [thing]",
        "tier": 3,
        "easyEn": "to wrap something tightly in plastic",
        "example": "The pallets get shrink-wrapped before they go on the truck.",
        "exampleKo": "그 팔레트들은 트럭에 싣기 전에 수축 비닐로 밀봉 포장돼."
      },
      {
        "cue": "자동 줄바꿈 (텍스트가 줄 끝에서 다음 줄로 넘어감)",
        "model": "word wrap / text wrapping",
        "tier": 3,
        "easyEn": "text moves to the next line automatically",
        "example": "Turn on word wrap so the long lines don't run off the screen.",
        "exampleKo": "자동 줄바꿈 켜, 긴 줄이 화면 밖으로 안 나가게."
      }
    ]
  },
  {
    "id": "reach",
    "verb": "REACH",
    "gloss": "reach는 '뻗어서 닿다'가 뼈대다. 도달하다, (사람에게) 연락이 닿다, (합의·목표에) 이르다, 손을 뻗다.",
    "items": [
      {
        "cue": "~에게 (먼저) 연락하다, 손을 내밀다 (I'll reach out to the team)",
        "model": "reach out to [person]",
        "tier": 1,
        "star": true,
        "example": "I'll reach out to the design team and get their sign-off before we ship.",
        "exampleKo": "내가 디자인 팀에 연락해서 출시 전에 승인받을게."
      },
      {
        "cue": "(먼저) 연락하다, 문의·도움을 요청하다 (Feel free to reach out if you have questions)",
        "model": "reach out",
        "tier": 1,
        "star": true,
        "example": "Feel free to reach out if anything on the invoice looks off.",
        "exampleKo": "청구서에 이상한 부분 있으면 언제든 연락 주세요."
      },
      {
        "cue": "~에 도착하다, 다다르다 (전치사 없이 바로 목적어: reach the office)",
        "model": "reach [a place / destination]",
        "tier": 1,
        "star": true,
        "example": "If traffic's clear, we'll reach the airport by six.",
        "exampleKo": "길 안 막히면 6시까지 공항에 도착할 거야."
      },
      {
        "cue": "~에게 연락이 닿다 (You can reach me at this number)",
        "model": "reach [person] (at [number / email])",
        "tier": 2,
        "star": true,
        "example": "You can reach me at 555-0182 or just Slack me.",
        "exampleKo": "555-0182로 연락하거나 그냥 슬랙 주면 돼요."
      },
      {
        "cue": "~을 잡으려 손을 뻗다; (목표를) 추구하다 (reach for the stars)",
        "model": "reach for [thing]",
        "tier": 2,
        "example": "She reached for her coffee without even looking up from the screen.",
        "exampleKo": "그녀는 화면에서 눈도 안 떼고 커피를 잡으려고 손을 뻗었다."
      },
      {
        "cue": "(시간이 좀 지난 뒤) 다시 연락하다, 후속으로 follow up하다 (I'll reach back out next week)",
        "model": "reach back out (to [person])",
        "tier": 2,
        "example": "Let me check with finance and I'll reach back out next week.",
        "exampleKo": "재무팀에 확인해보고 다음 주에 다시 연락드릴게요."
      },
      {
        "cue": "도움·지원을 청하다, 손을 내밀어 구하다 (reach out for help)",
        "model": "reach out for [help / support]",
        "tier": 2,
        "example": "Don't be afraid to reach out for help if the deadline's crushing you.",
        "exampleKo": "마감이 너무 벅차면 주저 말고 도움을 청해."
      },
      {
        "cue": "~안으로 손을 넣다 (reach into your bag)",
        "model": "reach into [thing]",
        "tier": 2,
        "example": "He reached into his backpack and pulled out a charger.",
        "exampleKo": "그는 백팩 안으로 손을 넣어 충전기를 꺼냈다."
      },
      {
        "cue": "손 닿는 곳에 / 닿지 않는 곳에; (목표가) 손에 잡힐 듯/멀게",
        "model": "within reach / out of reach",
        "tier": 2,
        "example": "With one more sale, hitting quota is finally within reach.",
        "exampleKo": "한 건만 더 팔면 드디어 할당량 달성이 손에 잡혀."
      },
      {
        "cue": "~하는 지경·단계에 이르다 (We've reached a point where...)",
        "model": "reach a point where [clause]",
        "tier": 2,
        "example": "We've reached a point where the old spreadsheet just can't keep up.",
        "exampleKo": "이제 예전 스프레드시트로는 도저히 감당이 안 되는 지경에 이르렀어."
      },
      {
        "cue": "~의 끝에 다다르다 (reach the end of the road)",
        "model": "reach the end (of [thing])",
        "tier": 2,
        "example": "By the time we reached the end of the meeting, half the room had zoned out.",
        "exampleKo": "회의가 끝날 무렵엔 절반은 이미 딴생각하고 있었어."
      },
      {
        "cue": "위로/아래로 손을 뻗다 (reach up to grab a box)",
        "model": "reach up / reach down",
        "tier": 2,
        "example": "Can you reach up and grab that box off the top shelf for me?",
        "exampleKo": "위로 손 뻗어서 맨 위 선반에 있는 저 상자 좀 꺼내줄래?"
      },
      {
        "cue": "정원·최대 수용량에 도달하다 (The event has reached capacity)",
        "model": "reach capacity",
        "tier": 2,
        "example": "Sorry, the workshop's reached capacity, but I can add you to the waitlist.",
        "exampleKo": "죄송해요, 워크숍이 정원이 다 찼는데 대기자 명단엔 올려드릴 수 있어요."
      },
      {
        "cue": "~을 가로질러 손을 뻗다; (진영·부서를 넘어) 협력의 손을 내밀다",
        "model": "reach across [thing] / reach across the aisle",
        "tier": 3,
        "easyEn": "work together with people from an opposing group",
        "example": "To get this bill passed, both senators had to reach across the aisle.",
        "exampleKo": "이 법안을 통과시키려면 두 상원의원이 당파를 넘어 협력해야 했다."
      }
    ]
  },
  {
    "id": "deal",
    "verb": "DEAL",
    "gloss": "deal의 중심 뼈대는 '다루다/처리하다'. 여기서 거래하다, (카드·몫을) 나눠주다, (타격·벌을) 가하다로 뻗고, a great deal처럼 '양·정도'를 나타내는 명사로도 쓴다.",
    "items": [
      {
        "cue": "(문제·일·사람을) 처리하다, 다루다, 대응하다 — \"I'll deal with the bug today.\"",
        "model": "deal with [problem/task/person]",
        "tier": 1,
        "star": true,
        "example": "I'll deal with the payment bug after standup.",
        "exampleKo": "결제 버그는 스탠드업 끝나고 처리할게."
      },
      {
        "cue": "대단한 일 / 큰 문제 — \"It's not a big deal\" 별거 아냐",
        "model": "[a/no] big deal",
        "tier": 1,
        "star": true,
        "example": "Relax, it's not a big deal — we can push the demo to Friday.",
        "exampleKo": "진정해, 별거 아냐. 데모는 금요일로 미루면 돼."
      },
      {
        "cue": "아주 많은, 다량의 — \"a great deal of time/effort\" (격식체; 회화에선 a lot of가 더 흔함)",
        "model": "a great deal (of) [thing]",
        "tier": 2,
        "easyEn": "a large amount of something",
        "example": "We spent a great deal of money on ads that went nowhere.",
        "exampleKo": "우리는 아무 성과도 없는 광고에 아주 많은 돈을 썼어."
      },
      {
        "cue": "거래를 성사시키다, 합의하다, 협상을 타결하다",
        "model": "make / cut / strike a deal (with [person])",
        "tier": 2,
        "star": true,
        "example": "They finally struck a deal with Netflix last night.",
        "exampleKo": "걔네 어젯밤에 드디어 넷플릭스랑 거래를 성사시켰어."
      },
      {
        "cue": "거래(협상)를 깨는 결정적 결격 사유, 절대 양보 못 할 조건",
        "model": "deal-breaker",
        "tier": 2,
        "star": true,
        "easyEn": "a condition serious enough to stop a deal or plan",
        "example": "No remote work? That's a deal-breaker for me.",
        "exampleKo": "재택근무가 안 된다고? 그건 나한텐 절대 양보 못 할 조건이야."
      },
      {
        "cue": "거래를 매듭짓다, 계약을 최종 성사시키다",
        "model": "close / seal the deal",
        "tier": 2,
        "example": "Take them to dinner and close the deal.",
        "exampleKo": "저녁 대접하고 그 계약 매듭지어."
      },
      {
        "cue": "(상품·서비스를) 취급하다, 거래하다, ~를 전문으로 하다 — \"We deal in used hardware.\"",
        "model": "deal in [goods/service]",
        "tier": 2,
        "easyEn": "to buy and sell a type of product",
        "example": "That shop deals in vintage vinyl records.",
        "exampleKo": "그 가게는 빈티지 LP 레코드를 전문으로 취급해."
      },
      {
        "cue": "(타격·벌을) 가하다, 안기다 — \"deal a blow to the economy\"",
        "model": "deal (out) a blow / [punishment] (to [someone])",
        "tier": 2,
        "easyEn": "to cause harm or damage to someone or something",
        "example": "The layoffs dealt a huge blow to team morale.",
        "exampleKo": "정리해고는 팀 사기에 큰 타격을 안겼어."
      },
      {
        "cue": "마약을 팔다, 밀매하다",
        "model": "deal drugs",
        "tier": 2,
        "easyEn": "to sell illegal drugs",
        "example": "He got arrested for dealing drugs behind the gym.",
        "exampleKo": "걔 체육관 뒤에서 마약 팔다가 체포됐어."
      },
      {
        "cue": "(받아들이고) 알아서 해라, 감수해라 (다소 직설적·퉁명스러운 관용구)",
        "model": "deal with it",
        "tier": 2,
        "example": "The office is out of oat milk, so just deal with it.",
        "exampleKo": "사무실에 오트밀크 다 떨어졌으니까 그냥 알아서 감수해."
      },
      {
        "cue": "이미 끝난 일, 확정된 사안 — \"It's a done deal.\"",
        "model": "done deal",
        "tier": 2,
        "easyEn": "something already decided and final",
        "example": "Don't bother arguing — the merger's a done deal.",
        "exampleKo": "따져봐야 소용없어. 합병은 이미 끝난 일이야."
      },
      {
        "cue": "진짜배기, 명실상부한 것/사람",
        "model": "the real deal",
        "tier": 2,
        "easyEn": "someone or something that is genuine, not fake",
        "example": "I met her at the conference and she's the real deal.",
        "exampleKo": "학회에서 그분 만났는데, 진짜배기더라."
      },
      {
        "cue": "거래 결렬, 합의 불가, 안 됨",
        "model": "no deal",
        "tier": 2,
        "example": "If they won't lower the price, then no deal.",
        "exampleKo": "저쪽이 가격 안 내리면 거래는 없어."
      },
      {
        "cue": "있잖아, 상황은 이래, 자 들어봐 — 본론·조건을 꺼낼 때 쓰는 구어 표현 (북미 직장 회화 빈출)",
        "model": "here's the deal",
        "tier": 2,
        "easyEn": "let me explain the situation or the terms",
        "example": "Okay, here's the deal — I cover the backend, you take the UI.",
        "exampleKo": "자 들어봐, 백엔드는 내가 맡을 테니 넌 UI를 맡아."
      },
      {
        "cue": "무슨 상황이야?, 어떻게 된 거야?, ~는 왜 그래? (구어체)",
        "model": "what's the deal (with [thing/person])?",
        "tier": 2,
        "easyEn": "what is happening, or why is it like this",
        "example": "What's the deal with the Wi-Fi? It's been down all morning.",
        "exampleKo": "와이파이 왜 이래? 아침 내내 안 되잖아."
      },
      {
        "cue": "그렇게 하자, 합의됐어, 콜! — 제안을 수락할 때",
        "model": "it's a deal / Deal!",
        "tier": 2,
        "example": "You buy the coffee, I'll grab lunch — deal!",
        "exampleKo": "네가 커피 사고 내가 점심 살게. 콜!"
      },
      {
        "cue": "나눠주다, 분배하다 (= dish out)",
        "model": "deal out [things/cards/money]",
        "tier": 3,
        "easyEn": "to give things out to several people",
        "example": "The manager dealt out gift cards to everyone who stayed late.",
        "exampleKo": "매니저가 야근한 사람들 모두에게 기프트카드를 나눠줬어."
      },
      {
        "cue": "(게임·계획에) 끼워주다, 참여시키다 — \"Deal me in.\"",
        "model": "deal [someone] in",
        "tier": 3,
        "easyEn": "to include someone in a game or plan",
        "example": "You guys are grabbing tacos? Deal me in.",
        "exampleKo": "너희 타코 먹으러 가? 나도 끼워줘."
      },
      {
        "cue": "(게임·계획에서) 빼다, 제외하다",
        "model": "deal [someone] out",
        "tier": 3,
        "easyEn": "to leave someone out of a game or plan",
        "example": "I'm too tired for poker tonight, so deal me out.",
        "exampleKo": "오늘 밤 포커는 너무 피곤해서 난 빼줘."
      },
      {
        "cue": "(카드 게임에서) 카드를 돌리다, 패를 나누다",
        "model": "deal the cards",
        "tier": 3,
        "easyEn": "to give cards to players in a game",
        "example": "Stop talking and deal the cards already.",
        "exampleKo": "그만 떠들고 어서 카드나 돌려."
      },
      {
        "cue": "부당한 대우, 불공평한 처사 — \"got a raw deal\"",
        "model": "raw deal",
        "tier": 3,
        "easyEn": "unfair or bad treatment",
        "example": "The new hires got a raw deal with those shifts.",
        "exampleKo": "신입들이 그 교대 근무 때문에 부당한 대우를 받았어."
      }
    ]
  },
  {
    "id": "shut",
    "verb": "SHUT",
    "gloss": "shut은 '닫아서 막는다'가 뼈대다. 닫다, 끄다, 차단하다, 가두다.",
    "items": [
      {
        "cue": "(서버·시스템을) 끄다; (사업·공장을) 영구 폐쇄하다",
        "model": "shut [thing] down",
        "tier": 1,
        "star": true,
        "example": "We're shutting the staging server down for an hour to push the migration.",
        "exampleKo": "마이그레이션 적용하려고 스테이징 서버 한 시간 동안 끌 거예요."
      },
      {
        "cue": "(수도·전기·가스 등) 공급을 끊다; (기계·기능을) 끄다",
        "model": "shut [thing] off",
        "tier": 1,
        "star": true,
        "example": "The landlord shut off the water while they fixed the pipe upstairs.",
        "exampleKo": "윗집 파이프 고치는 동안 집주인이 물을 끊었어."
      },
      {
        "cue": "입 다물다, 조용히 하다 (구어); shut [person] up = ~의 입을 막다",
        "model": "shut up",
        "tier": 1,
        "star": true,
        "example": "Just shut up and let her finish the story.",
        "exampleKo": "좀 조용히 하고 걔가 얘기 끝내게 놔둬."
      },
      {
        "cue": "배제하다, (사람·소리·생각을) 막아 들이지 않다; (경기에서) 완봉으로 이기다",
        "model": "shut [person/thing] out",
        "tier": 2,
        "star": true,
        "example": "They totally shut me out of the planning meeting.",
        "exampleKo": "걔네가 기획 회의에서 나를 완전히 배제했어."
      },
      {
        "cue": "(사람이) 마음을 닫고 감정·반응을 멈추다 (스트레스 상황에서)",
        "model": "shut down",
        "tier": 2,
        "easyEn": "to stop talking or reacting because of stress or emotion",
        "example": "Whenever my boss raises his voice, I just shut down and go quiet.",
        "exampleKo": "상사가 언성 높이면 나는 그냥 마음을 닫고 조용해져."
      },
      {
        "cue": "입 다물다, 비밀을 지키다",
        "model": "keep your mouth shut",
        "tier": 2,
        "example": "I told him about the layoffs, but keep your mouth shut for now.",
        "exampleKo": "정리해고 얘기 걔한테 했는데, 당분간 입 다물고 있어."
      },
      {
        "cue": "안에 가두다, 들여놓고 문을 닫다",
        "model": "shut [person/animal] in",
        "tier": 3,
        "easyEn": "to keep a person or animal inside a closed space",
        "example": "We shut the dog in the kitchen while the movers were here.",
        "exampleKo": "이삿짐센터 사람들 있는 동안 강아지를 부엌에 가둬뒀어."
      },
      {
        "cue": "격리하다; (혼자) 틀어박히다",
        "model": "shut [oneself] away",
        "tier": 3,
        "easyEn": "to stay alone and away from other people",
        "example": "He shut himself away for a week to finish his thesis.",
        "exampleKo": "걔는 논문 끝내려고 일주일 동안 틀어박혀 있었어."
      },
      {
        "cue": "~로부터 단절시키다, 고립시키다",
        "model": "shut [oneself] off from [thing]",
        "tier": 3,
        "easyEn": "to keep yourself separate from something or someone",
        "example": "After the breakup she shut herself off from all her friends.",
        "exampleKo": "이별하고 나서 걔는 친구들 모두랑 연을 끊고 지냈어."
      },
      {
        "cue": "(가능성을) 차단하다, ~을 거절하다",
        "model": "shut the door on [thing]",
        "tier": 3,
        "easyEn": "to refuse or end any chance of something",
        "example": "His rude email pretty much shut the door on any future deal.",
        "exampleKo": "걔의 무례한 이메일이 앞으로의 거래 가능성을 완전히 닫아버렸어."
      },
      {
        "cue": "(문·서랍 등에) ~을 끼다, 끼이게 하다",
        "model": "shut [thing] in [place]",
        "tier": 3,
        "easyEn": "to catch or trap something by closing a door or drawer",
        "example": "Ouch, I shut my finger in the car door.",
        "exampleKo": "아야, 손가락을 차 문에 끼었어."
      },
      {
        "cue": "명백한[뻔한] 사건·문제",
        "model": "open-and-shut case",
        "tier": 3,
        "easyEn": "a case or problem that is very clear and easy to decide",
        "example": "With his fingerprints on the knife, it's an open-and-shut case.",
        "exampleKo": "칼에 걔 지문이 있으니까 이건 너무 뻔한 사건이야."
      },
      {
        "cue": "눈 감고도 할 만큼 아주 쉽게 하다",
        "model": "do [thing] with your eyes shut",
        "tier": 3,
        "easyEn": "to do something very easily",
        "example": "I've run this deploy so many times I could do it with my eyes shut.",
        "exampleKo": "이 배포는 너무 많이 해봐서 눈 감고도 하겠어."
      }
    ]
  },
  {
    "id": "play",
    "verb": "PLAY",
    "gloss": "play는 '하다·놀다'의 뼈대다. (게임·스포츠를) 하다, (악기를) 연주하다, (음악·영상을) 재생하다, (역할을) 맡다/연기하다.",
    "items": [
      {
        "cue": "게임·스포츠를 하다 (play soccer, play chess)",
        "model": "play [game/sport]",
        "tier": 1,
        "star": true,
        "example": "We usually play pickup basketball on Sundays at the park.",
        "exampleKo": "우리는 보통 일요일에 공원에서 농구 픽업 게임을 해."
      },
      {
        "cue": "~에서 역할을 하다, 한몫하다 (QA plays a key role in releases)",
        "model": "play a role / play a part (in [thing])",
        "tier": 1,
        "star": true,
        "example": "Honestly, QA plays a huge role in keeping our releases from breaking.",
        "exampleKo": "솔직히 QA가 릴리스가 안 깨지게 하는 데 큰 역할을 해."
      },
      {
        "cue": "축소·경시하다, 대수롭지 않게 말하다 (don't play down the risk; = downplay)",
        "model": "play down [thing]",
        "tier": 2,
        "easyEn": "to make something seem less important than it is",
        "example": "Don't play down the outage in the postmortem — it cost us real customers.",
        "exampleKo": "사후 회고에서 장애를 대수롭지 않게 말하지 마, 실제로 고객을 잃었잖아."
      },
      {
        "cue": "강조하다, 부각시키다 (때로 과장하다) (play up your strengths)",
        "model": "play up [thing]",
        "tier": 2,
        "easyEn": "to emphasize something or make it seem more important",
        "example": "In the interview, play up the fact that you shipped that feature solo.",
        "exampleKo": "면접에서 그 기능을 혼자 출시했다는 점을 부각시켜."
      },
      {
        "cue": "(시간을 두고) 전개되다, 펼쳐지다 (let's see how it plays out)",
        "model": "play out",
        "tier": 2,
        "star": true,
        "easyEn": "to develop or happen over time",
        "example": "Let's not panic and just see how the rollout plays out this week.",
        "exampleKo": "조급해하지 말고 이번 주에 배포가 어떻게 전개되는지 지켜보자."
      },
      {
        "cue": "이것저것 만져보며 실험하다, 만지작거리다 (play around with the settings)",
        "model": "play around with [thing]",
        "tier": 2,
        "star": true,
        "example": "I spent all morning playing around with the notification settings.",
        "exampleKo": "오전 내내 알림 설정을 이것저것 만져봤어."
      },
      {
        "cue": "장단을 맞춰주다, 일단 협조하는 척하다 (just play along for now)",
        "model": "play along (with [person/idea])",
        "tier": 2,
        "easyEn": "to pretend to agree or cooperate for now",
        "example": "She's clearly wrong, but just play along until the meeting's over.",
        "exampleKo": "걔가 확실히 틀렸지만 회의 끝날 때까지 그냥 장단 맞춰줘."
      },
      {
        "cue": "(녹음·녹화를) 다시 재생하다 (play back the call)",
        "model": "play back [recording]",
        "tier": 2,
        "example": "Let me play back the sales call so we catch what the client actually asked for.",
        "exampleKo": "영업 통화를 다시 재생해서 고객이 실제로 뭘 요청했는지 확인해 볼게."
      },
      {
        "cue": "(생각을) 굴려보다, (수치·데이터를) 이리저리 만져보다 (play with an idea; play with the numbers)",
        "model": "play with [thing]",
        "tier": 2,
        "easyEn": "to experiment with an idea or with numbers",
        "example": "I've been playing with the idea of switching us over to Postgres.",
        "exampleKo": "우리를 Postgres로 갈아타게 하는 아이디어를 계속 굴려보고 있어."
      },
      {
        "cue": "상황 봐가며 즉흥적으로 정하다 (let's play it by ear)",
        "model": "play it by ear",
        "tier": 2,
        "easyEn": "to decide what to do as the situation develops",
        "example": "I'm not sure how long dinner will run, so let's play it by ear.",
        "exampleKo": "저녁이 얼마나 길어질지 몰라서 상황 봐가면서 정하자."
      },
      {
        "cue": "안전하게 가다, 무리하지 않다",
        "model": "play it safe",
        "tier": 2,
        "example": "With the deadline this tight, let's play it safe and skip the risky refactor.",
        "exampleKo": "마감이 이렇게 빠듯하니 안전하게 가고 위험한 리팩터링은 건너뛰자."
      },
      {
        "cue": "(일부러) 반대 입장을 취해보다 (의도적으로 반론 제기)",
        "model": "play devil's advocate",
        "tier": 2,
        "easyEn": "to argue against something on purpose to test it",
        "example": "Let me play devil's advocate for a sec — what if nobody actually wants this feature?",
        "exampleKo": "잠깐 일부러 반대 입장을 취해볼게. 아무도 이 기능을 안 원하면 어떡하지?"
      },
      {
        "cue": "강점을 살리다, 잘하는 쪽으로 가다",
        "model": "play to [one's] strengths",
        "tier": 2,
        "easyEn": "to focus on what you are good at",
        "example": "Put Sarah on the backend — let's play to her strengths.",
        "exampleKo": "세라를 백엔드에 배치하자, 걔 강점을 살리는 거지."
      },
      {
        "cue": "강경하게 밀어붙이다, 빡세게 나가다",
        "model": "play hardball",
        "tier": 2,
        "easyEn": "to act tough and refuse to compromise",
        "example": "The vendor wouldn't budge, so we had to play hardball on the price.",
        "exampleKo": "업체가 꿈쩍도 안 해서 가격을 두고 강경하게 밀어붙여야 했어."
      },
      {
        "cue": "편애하다, 특정인을 봐주다",
        "model": "play favorites",
        "tier": 2,
        "easyEn": "to treat some people better than others unfairly",
        "example": "A good manager can't play favorites, even with the star engineer.",
        "exampleKo": "좋은 매니저는 스타 엔지니어라도 편애하면 안 돼."
      },
      {
        "cue": "~에 일조하다, 맞아떨어지다; 도리어 남 좋은 일 시키다",
        "model": "play into [thing] / play into [someone's] hands",
        "tier": 2,
        "easyEn": "to accidentally help someone who opposes you",
        "example": "Rushing the fix without tests just plays into more bugs down the line.",
        "exampleKo": "테스트 없이 급하게 고치면 결국 더 많은 버그를 만드는 데 일조할 뿐이야."
      },
      {
        "cue": "모르는 척하다, 시치미 떼다",
        "model": "play dumb",
        "tier": 2,
        "easyEn": "to pretend you do not know something",
        "example": "When they asked who deleted the file, he just played dumb.",
        "exampleKo": "누가 파일을 지웠냐고 물었을 때 걔는 그냥 모르는 척했어."
      },
      {
        "cue": "뒤처진 것을 따라잡다, 만회하려 애쓰다",
        "model": "play catch-up",
        "tier": 2,
        "easyEn": "to try to catch up after falling behind",
        "example": "We lost two weeks to the outage, so now we're playing catch-up.",
        "exampleKo": "장애로 2주를 날려서 지금 밀린 걸 따라잡는 중이야."
      },
      {
        "cue": "농간 부리다, 가지고 놀다 (stop playing games)",
        "model": "play games (with [person])",
        "tier": 2,
        "easyEn": "to behave dishonestly to trick or control someone",
        "example": "Just give me a straight answer and stop playing games.",
        "exampleKo": "그냥 솔직하게 답해, 사람 가지고 놀지 말고."
      },
      {
        "cue": "사이좋게 굴다, 협조적으로 행동하다",
        "model": "play nice",
        "tier": 2,
        "easyEn": "to behave well and cooperate with others",
        "example": "You two need to play nice — we ship this together tomorrow.",
        "exampleKo": "너희 둘 사이좋게 굴어, 내일 이거 같이 출시해야 하니까."
      },
      {
        "cue": "(요인·기능이) 작용하기 시작하다, 관여하게 되다 (this is where caching comes into play)",
        "model": "[thing] comes into play",
        "tier": 2,
        "easyEn": "to start to have an effect or become relevant",
        "example": "Once traffic spikes, that's where caching really comes into play.",
        "exampleKo": "트래픽이 치솟으면 바로 그때 캐싱이 제대로 작용하기 시작해."
      },
      {
        "cue": "침착한 척하다, 태연하게 굴다 (서두르지 않다)",
        "model": "play it cool",
        "tier": 2,
        "easyEn": "to stay calm and act unworried",
        "example": "I was freaking out inside, but I played it cool in front of the client.",
        "exampleKo": "속으로는 멘붕이었지만 고객 앞에서는 태연한 척했어."
      },
      {
        "cue": "길게 보고 전략적으로 움직이다, 장기전을 펼치다",
        "model": "play the long game",
        "tier": 2,
        "easyEn": "to follow a long-term plan instead of fast results",
        "example": "We're not chasing quick wins here — we're playing the long game.",
        "exampleKo": "우리는 빠른 성과를 좇는 게 아니라 길게 보고 움직이는 거야."
      },
      {
        "cue": "둘을 서로 경쟁·대립시키다, 이간질하다 (play them off against each other); 'play off each other' = 서로 주거니 받거니 받쳐주다",
        "model": "play [person] off against [person]",
        "tier": 3,
        "easyEn": "to make two people compete against each other",
        "example": "He tried to play the two vendors off against each other to cut the price.",
        "exampleKo": "걔는 가격을 깎으려고 두 업체를 서로 경쟁시키려고 했어."
      }
    ]
  },
  {
    "id": "hang",
    "verb": "HANG",
    "gloss": "hang은 '걸어서 매달다'가 뼈대다. 걸다, 매달다, 머물다, (전화를) 끊다, (프로그램이) 멈추다.",
    "items": [
      {
        "cue": "(전화를) 끊다",
        "model": "hang up",
        "tier": 1,
        "star": true,
        "easyEn": "end a telephone call",
        "example": "I've gotta run, I'll hang up now.",
        "exampleKo": "나 가봐야 해, 이제 전화 끊을게."
      },
      {
        "cue": "(편하게) 어울려 놀다, 시간을 보내다",
        "model": "hang out (with [person])",
        "tier": 1,
        "star": true,
        "easyEn": "spend relaxed free time with someone",
        "example": "You wanna hang out with Jake and me this weekend?",
        "exampleKo": "이번 주말에 제이크랑 나랑 같이 놀래?"
      },
      {
        "cue": "잠깐만 기다려; (꽉) 붙잡다",
        "model": "hang on",
        "tier": 1,
        "star": true,
        "easyEn": "wait for a short moment",
        "example": "Hang on, let me grab my charger real quick.",
        "exampleKo": "잠깐만, 나 충전기 좀 얼른 챙길게."
      },
      {
        "cue": "[물건]을 (벽·고리에) 걸다, 매달다",
        "model": "hang [thing] (on [place])",
        "tier": 2,
        "star": true,
        "example": "Can you hang your coat on the hook by the door?",
        "exampleKo": "코트 문 옆 고리에 걸어줄래?"
      },
      {
        "cue": "[것]의 요령·감을 익히다",
        "model": "get the hang of [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "learn how to do something",
        "example": "Give it a week, you'll get the hang of the new dashboard.",
        "exampleKo": "일주일만 해봐, 새 대시보드 금방 감 잡을 거야."
      },
      {
        "cue": "(하는 일 없이) 서성이다, 빈둥거리다; ~ 근처에서 시간 보내다",
        "model": "hang around",
        "tier": 2,
        "star": true,
        "example": "Don't just hang around the lobby, come on in.",
        "exampleKo": "로비에서 그냥 서성이지 말고 들어와."
      },
      {
        "cue": "포기하지 않고 버티다, 견디다",
        "model": "hang in (there)",
        "tier": 2,
        "star": true,
        "easyEn": "keep trying and do not give up",
        "example": "I know finals are brutal, just hang in there.",
        "exampleKo": "기말이 힘든 거 아는데, 조금만 버텨."
      },
      {
        "cue": "(프로그램·컴퓨터가) 멈추다, 먹통이 되다, 응답이 없다",
        "model": "[program/computer] hang(s)",
        "tier": 2,
        "star": true,
        "easyEn": "(a computer) stops responding and freezes",
        "example": "My laptop keeps hanging every time I open Figma.",
        "exampleKo": "피그마만 열면 노트북이 자꾸 먹통이 돼."
      },
      {
        "cue": "[사람]과의 전화를 (화나서) 일방적으로 끊다",
        "model": "hang up on [person]",
        "tier": 2,
        "easyEn": "suddenly end a phone call with someone",
        "example": "She got so mad she hung up on me mid-sentence.",
        "exampleKo": "걔가 너무 화나서 내 말 하는 도중에 전화를 확 끊어버렸어."
      },
      {
        "cue": "[것]을 계속 가지고 있다, 놓지 않다 (보관·유지)",
        "model": "hang on to [thing]",
        "tier": 2,
        "example": "Hang on to that receipt in case you need to return it.",
        "exampleKo": "혹시 반품할 수도 있으니 그 영수증 잘 가지고 있어."
      },
      {
        "cue": "숙취에 시달리다, 술이 덜 깨다",
        "model": "be/get hung over",
        "tier": 2,
        "easyEn": "feel ill after drinking too much alcohol",
        "example": "I'm so hung over, I can barely look at my screen.",
        "exampleKo": "숙취가 너무 심해서 화면 보기도 힘들어."
      },
      {
        "cue": "[사람]을 (답·반응 없이) 기다리게 하다; (응답·약속을 안 지켜) 곤란하게 내버려두다",
        "model": "leave [person] hanging",
        "tier": 2,
        "easyEn": "leave someone waiting without an answer",
        "example": "Just reply to him, don't leave the guy hanging.",
        "exampleKo": "그냥 답장 좀 해줘, 사람 마냥 기다리게 하지 말고."
      },
      {
        "cue": "[것]에 (지나치게) 집착하다·얽매이다; (그 문제 때문에) 막히다·지연되다",
        "model": "be/get hung up on [thing]",
        "tier": 2,
        "easyEn": "be too focused or worried about something",
        "example": "Don't get too hung up on the color, we can change it later.",
        "exampleKo": "색깔에 너무 집착하지 마, 나중에 바꾸면 되잖아."
      },
      {
        "cue": "선뜻 나서지 않고 머뭇거리다, 뒤에 남다",
        "model": "hang back",
        "tier": 3,
        "easyEn": "to stay back because you do not want to act",
        "example": "Everyone else volunteered, but Tom hung back as usual.",
        "exampleKo": "다들 자원했는데 톰은 늘 그렇듯 선뜻 안 나서고 뒤로 뺐어."
      },
      {
        "cue": "(위협·걱정이) ~위에 드리우다, 가시지 않다",
        "model": "hang over [person/thing]",
        "tier": 3,
        "easyEn": "(a problem) stays and keeps making you worried",
        "example": "The layoff rumors have been hanging over the whole team for weeks.",
        "exampleKo": "정리해고 소문이 몇 주째 팀 전체를 짓누르고 있어."
      },
      {
        "cue": "(결과가) 불확실한 상태다, 아직 결정 안 났다",
        "model": "hang in the balance",
        "tier": 3,
        "easyEn": "the outcome is uncertain and undecided",
        "example": "The deal's still hanging in the balance until legal signs off.",
        "exampleKo": "법무팀 승인 나기 전까진 그 계약 아직 불확실한 상태야."
      },
      {
        "cue": "위태롭다, 간당간당하다",
        "model": "hang by a thread",
        "tier": 3,
        "easyEn": "to be very close to failing or ending",
        "example": "After that outage, the whole project is hanging by a thread.",
        "exampleKo": "그 장애 이후로 프로젝트 전체가 간당간당해."
      },
      {
        "cue": "(주장·계획이) 앞뒤가 맞다, 일관되다; 서로 똘똘 뭉치다",
        "model": "hang together",
        "tier": 3,
        "easyEn": "be consistent; or stay united as a group",
        "example": "His excuse just doesn't hang together, the timeline's off.",
        "exampleKo": "걔 변명은 앞뒤가 안 맞아, 시간대가 어긋나잖아."
      },
      {
        "cue": "아래로 늘어지다, 처지다",
        "model": "hang down",
        "tier": 3,
        "easyEn": "hang loosely down toward the ground",
        "example": "There's a loose wire hanging down behind the TV.",
        "exampleKo": "티비 뒤에 전선 하나가 축 늘어져 있어."
      },
      {
        "cue": "(미국 구어) 좌회전/우회전하다",
        "model": "hang a left/right",
        "tier": 3,
        "easyEn": "turn left or right while driving",
        "example": "Hang a right at the gas station and we're there.",
        "exampleKo": "주유소에서 우회전하면 바로 거기야."
      }
    ]
  },
  {
    "id": "weigh",
    "verb": "WEIGH",
    "gloss": "weigh는 '무게'를 재는 동사다. 무게가 나가다, (선택지를) 따져보다·저울질하다, 마음을 짓누르다, 영향을 미치다.",
    "items": [
      {
        "cue": "무게가 ...이다, 무게가 나가다 — It weighs 3 kilos. / How much do you weigh?",
        "model": "weigh [amount]",
        "tier": 2,
        "star": true,
        "example": "My cat weighs like 15 pounds now, the vet's not happy.",
        "exampleKo": "우리 고양이 이제 15파운드쯤 나가는데, 수의사가 안 좋아해."
      },
      {
        "cue": "의견을 보태다, 한마디 거들다 — Feel free to weigh in. / Can you weigh in here?",
        "model": "weigh in",
        "tier": 2,
        "star": true,
        "easyEn": "give your opinion in a discussion",
        "example": "If you've got thoughts on this, feel free to weigh in.",
        "exampleKo": "이거에 대해 생각 있으면 편하게 한마디 보태."
      },
      {
        "cue": "...에 대해 의견을 내다 — Could you weigh in on the design decision?",
        "model": "weigh in on [topic]",
        "tier": 2,
        "easyEn": "give your opinion about a topic",
        "example": "Can you weigh in on the pricing before we ship it?",
        "exampleKo": "출시하기 전에 가격 책정에 대해 의견 좀 줄래?"
      },
      {
        "cue": "마음을 짓누르다, 부담이 되다 — The deadline is weighing on me. / It's been weighing on my mind.",
        "model": "weigh on [someone]",
        "tier": 2,
        "star": true,
        "easyEn": "cause someone ongoing worry or stress",
        "example": "This deadline has been weighing on me all week.",
        "exampleKo": "이 마감이 이번 주 내내 마음을 짓눌렀어."
      },
      {
        "cue": "...보다 더 크다/중요하다, 능가하다 — The benefits outweigh the risks.",
        "model": "outweigh [something]",
        "tier": 2,
        "star": true,
        "easyEn": "be more important or greater than something else",
        "example": "Honestly the benefits outweigh the risks here, let's do it.",
        "exampleKo": "솔직히 이건 득이 실보다 커, 그냥 하자."
      },
      {
        "cue": "짓누르다, (짐·걱정이) 무겁게 누르다 — He's weighed down by debt. / weighed down with bags.",
        "model": "weigh [someone/something] down",
        "tier": 2,
        "easyEn": "make someone feel heavy or full of worry",
        "example": "He's totally weighed down by student loans right now.",
        "exampleKo": "걔 지금 학자금 대출에 완전히 짓눌려 있어."
      },
      {
        "cue": "...을 ...과 견주어 따지다, 저울질하다 — Weigh the cost against the benefit.",
        "model": "weigh [A] against [B]",
        "tier": 2,
        "easyEn": "compare two things to reach a decision",
        "example": "You've gotta weigh the cost against how much time it saves.",
        "exampleKo": "비용을 그게 아껴주는 시간이랑 견줘서 따져봐야 해."
      },
      {
        "cue": "(의견·제안 등을) 내놓다, 보태다 — She weighed in with a couple of suggestions.",
        "model": "weigh in with [something]",
        "tier": 3,
        "easyEn": "add a comment or suggestion to a discussion",
        "example": "Sarah weighed in with a couple of good suggestions in the meeting.",
        "exampleKo": "회의에서 사라가 좋은 제안 몇 개를 보탰어."
      },
      {
        "cue": "무게·분량이 ...에 달하다 — He weighs in at 180 pounds. / The report weighs in at 300 pages.",
        "model": "weigh in at [amount]",
        "tier": 3,
        "easyEn": "be a certain weight when measured",
        "example": "The final report weighs in at almost 300 pages.",
        "exampleKo": "최종 보고서가 거의 300페이지에 달해."
      },
      {
        "cue": "...에게 불리하게 작용하다, 불리한 요소가 되다 — His lack of experience weighs against him.",
        "model": "weigh against [someone]",
        "tier": 3,
        "easyEn": "be a disadvantage for someone",
        "example": "His lack of experience really weighs against him for this role.",
        "exampleKo": "경험 부족이 이 자리엔 정말 불리하게 작용해."
      },
      {
        "cue": "말을 신중히 고르다, 단어를 가려 쓰다 — Weigh your words carefully in the review.",
        "model": "weigh your words",
        "tier": 3,
        "easyEn": "choose your words carefully before speaking",
        "example": "Weigh your words in that review, it's going to his manager.",
        "exampleKo": "그 리뷰에선 말 신중히 골라, 걔 매니저한테 갈 거야."
      }
    ]
  },
  {
    "id": "scale",
    "verb": "SCALE",
    "gloss": "scale의 뼈대는 '규모'다. 크기를 키우거나 줄이다, 규모가 커져도 감당하다(확장성), (벽·산을) 오르다, 저울·척도.",
    "items": [
      {
        "cue": "규모를 키우다 — 팀·생산·시스템의 용량을 늘리다. (기술) 더 강력한 장비로 수직 확장하다. 목적어 없이 'we need to scale up(우리는 규모를 키워야 한다)'처럼도 쓴다.",
        "model": "scale up [thing]",
        "tier": 2,
        "star": true,
        "example": "If sign-ups keep climbing like this, we'll need to scale up the servers before the weekend.",
        "exampleKo": "가입이 이렇게 계속 늘면, 주말 전에 서버 규모를 키워야 할 거야."
      },
      {
        "cue": "확장성이 있다, 규모가 커져도 감당하다 — 'this doesn't scale(이 방식은 규모가 커지면 안 통한다)'. 면접 단골 표현.",
        "model": "[thing] scales (well) / doesn't scale",
        "tier": 2,
        "star": true,
        "easyEn": "keep working well as size or usage grows",
        "example": "Copy-pasting the config into every repo works for now, but it just doesn't scale.",
        "exampleKo": "지금은 설정을 모든 레포에 복붙해도 되지만, 이 방식은 규모가 커지면 안 통해."
      },
      {
        "cue": "규모를 줄이다, 축소하다 (인원·생산·계획·서버 리소스를 작게 줄임).",
        "model": "scale down [thing]",
        "tier": 2,
        "star": true,
        "example": "Traffic dropped after the holidays, so we scaled down the cluster to save money.",
        "exampleKo": "연휴 끝나고 트래픽이 줄어서, 돈 아끼려고 클러스터 규모를 줄였어."
      },
      {
        "cue": "(계획·지출·범위를) 줄이다, 삭감하다, 보수적으로 축소하다. 'scale back operations(사업을 축소하다)'.",
        "model": "scale back [thing]",
        "tier": 2,
        "star": true,
        "example": "Sales are slow this quarter, so leadership decided to scale back the marketing budget.",
        "exampleKo": "이번 분기 매출이 부진해서, 경영진이 마케팅 예산을 삭감하기로 했어."
      },
      {
        "cue": "대규모로, 큰 규모에서 (운영·실행하다). 'run/operate at scale'. 테크 면접 빈출.",
        "model": "at scale",
        "tier": 2,
        "star": true,
        "easyEn": "operating at a very large size or volume",
        "example": "It's easy to make one work, but doing this at scale is a whole different problem.",
        "exampleKo": "하나 돌리는 건 쉽지만, 이걸 대규모로 하는 건 완전히 다른 문제야."
      },
      {
        "cue": "~규모까지 확장하다/감당하다. 'scale to millions of users(수백만 사용자까지 감당하다)'.",
        "model": "scale to [size/number]",
        "tier": 2,
        "easyEn": "grow to handle a certain size or number",
        "example": "The architecture is solid, but I'm not sure it can scale to a million users.",
        "exampleKo": "구조는 탄탄한데, 백만 사용자까지 감당할 수 있을지는 모르겠어."
      },
      {
        "cue": "~을 줄이다, ~에 대한 지출·규모를 삭감하다. 'scale back on hiring(채용을 줄이다)'.",
        "model": "scale back on [thing]",
        "tier": 2,
        "easyEn": "reduce the amount of something",
        "example": "With the recession coming, we're scaling back on hiring until next year.",
        "exampleKo": "경기 침체가 오고 있어서, 내년까지 채용을 줄이고 있어."
      },
      {
        "cue": "~의 규모·크기·범위. 'the scale of the problem(문제의 규모)'.",
        "model": "the scale of [thing]",
        "tier": 2,
        "example": "Nobody on the team really grasped the scale of the migration until we started.",
        "exampleKo": "우리가 시작하기 전까진 팀 누구도 이 마이그레이션의 규모를 제대로 이해하지 못했어."
      },
      {
        "cue": "1에서 10까지의 척도로 (평가하다). 정도를 묻는 표현.",
        "model": "on a scale of [1] to [10]",
        "tier": 2,
        "example": "On a scale of 1 to 10, how confident are you we ship on Friday?",
        "exampleKo": "1에서 10까지로, 금요일에 출시할 자신 얼마나 있어?"
      },
      {
        "cue": "(서버·노드·인스턴스를 늘려) 수평 확장하다. up(수직)과 대비되는 인프라 용어.",
        "model": "scale out [thing]",
        "tier": 3,
        "easyEn": "add more machines to handle more load",
        "example": "Instead of a bigger box, let's just scale out and add three more nodes.",
        "exampleKo": "더 큰 장비 대신, 그냥 수평 확장해서 노드 세 개 더 붙이자."
      },
      {
        "cue": "~에 비례해 늘어나다/커지다. 'costs scale with usage(비용이 사용량에 비례해 증가한다)'.",
        "model": "[thing] scales with [thing]",
        "tier": 3,
        "easyEn": "increase or decrease in proportion to something else",
        "example": "Heads up: our cloud costs scale with usage, so a viral post could get expensive.",
        "exampleKo": "참고로, 우리 클라우드 비용은 사용량에 비례해서 늘어나니까, 게시물 하나 떡상하면 비싸질 수 있어."
      },
      {
        "cue": "규모의 경제 — 생산량이 늘수록 단가가 낮아지는 효과.",
        "model": "economies of scale",
        "tier": 3,
        "easyEn": "lower cost per unit when producing more",
        "example": "Once we print 10,000 units, economies of scale kick in and the price per shirt drops.",
        "exampleKo": "만 장을 찍으면 규모의 경제가 작동해서 티셔츠 한 장당 단가가 떨어져."
      },
      {
        "cue": "(벽·담·산을) 기어오르다, 오르다. 물리적 등반 의미.",
        "model": "scale [a wall/mountain]",
        "tier": 3,
        "easyEn": "climb up something steep like a wall",
        "example": "The dog somehow scaled the backyard fence and ended up two streets over.",
        "exampleKo": "강아지가 어쩐 일인지 뒷마당 담을 기어올라서 두 블록 떨어진 데까지 갔어."
      },
      {
        "cue": "실제 비율대로, 축척에 맞게 (그려진/만든). 'not to scale(실제 비율 아님)'.",
        "model": "(drawn/built) to scale",
        "tier": 3,
        "easyEn": "drawn in correct proportion to real size",
        "example": "Just so you know, this floor plan isn't drawn to scale, so don't measure off it.",
        "exampleKo": "참고로 이 평면도는 실제 비율대로 그린 게 아니니까, 여기서 치수 재지 마."
      },
      {
        "cue": "차등제, 슬라이딩 스케일 — 소득·사용량에 따라 금액이 달라지는 방식.",
        "model": "(a) sliding scale",
        "tier": 3,
        "easyEn": "a system where amounts change by income or use",
        "example": "The therapist charges on a sliding scale, so it's cheaper if you're a student.",
        "exampleKo": "그 치료사는 차등제로 요금을 받아서, 학생이면 더 싸."
      },
      {
        "cue": "저울을 기울게 하다 — 결정적 영향을 주다, 판세를 바꾸다.",
        "model": "tip the scales (in favor of [person])",
        "tier": 3,
        "easyEn": "be the thing that finally decides the result",
        "example": "Her demo was so clean it tipped the scales in her favor for the promotion.",
        "exampleKo": "그녀의 데모가 워낙 완벽해서 승진 판세를 그녀 쪽으로 기울게 했어."
      }
    ]
  },
  {
    "id": "extra",
    "verb": "APPENDIX",
    "gloss": "",
    "items": [
      {
        "cue": "문제를 다루다",
        "model": "deal with [problem]",
        "tier": 1,
        "star": true,
        "example": "Can you deal with the angry customer on line two?",
        "exampleKo": "2번 라인 화난 고객 좀 처리해 줄래?"
      },
      {
        "cue": "~에 의존하다",
        "model": "depend on [thing]",
        "tier": 1,
        "star": true,
        "example": "The whole demo depends on the WiFi holding up.",
        "exampleKo": "데모 전체가 와이파이가 버텨주느냐에 달렸어."
      },
      {
        "cue": "~에 의존하다",
        "model": "rely on [thing]",
        "tier": 1,
        "star": true,
        "example": "I rely on my calendar for everything these days.",
        "exampleKo": "요즘은 뭐든 달력에 의존해."
      },
      {
        "cue": "~에 집중하다",
        "model": "focus on [thing]",
        "tier": 1,
        "star": true,
        "example": "Let's just focus on shipping the login fix today.",
        "exampleKo": "오늘은 로그인 수정 배포에만 집중하자."
      },
      {
        "cue": "~로 이어지다",
        "model": "lead to [result]",
        "tier": 1,
        "star": true,
        "example": "Skipping tests always leads to bugs in prod.",
        "exampleKo": "테스트 건너뛰면 항상 운영에서 버그로 이어져."
      },
      {
        "cue": "~가 ~하지 못하게 막다",
        "model": "prevent [person/thing] from [-ing]",
        "tier": 1,
        "star": true,
        "example": "The lock prevents the door from swinging open.",
        "exampleKo": "그 잠금장치가 문이 열리지 못하게 막아줘."
      },
      {
        "cue": "~을 ~로부터 보호하다",
        "model": "protect [thing] against [risk]",
        "tier": 1,
        "star": true,
        "example": "A good password protects your account against hackers.",
        "exampleKo": "좋은 비밀번호가 계정을 해커로부터 보호해 줘."
      },
      {
        "cue": "~에 지원하다",
        "model": "apply for [job/visa]",
        "tier": 1,
        "star": true,
        "example": "I'm applying for that PM role at Stripe.",
        "exampleKo": "나 스트라이프 그 PM 자리에 지원하는 중이야."
      },
      {
        "cue": "~에 적용되다",
        "model": "apply to [case/person]",
        "tier": 1,
        "star": true,
        "example": "That rule doesn't apply to remote employees.",
        "exampleKo": "그 규칙은 원격 직원한테는 적용 안 돼."
      },
      {
        "cue": "~을 가리키다 / 언급하다",
        "model": "refer to [thing]",
        "tier": 1,
        "star": true,
        "example": "When I say \"the doc,\" I'm referring to the Q3 plan.",
        "exampleKo": "내가 '그 문서'라고 하면 3분기 계획을 말하는 거야."
      },
      {
        "cue": "~에 응답하다",
        "model": "respond to [request]",
        "tier": 1,
        "star": true,
        "example": "Sorry, I forgot to respond to your email.",
        "exampleKo": "미안, 네 이메일에 답하는 걸 깜빡했어."
      },
      {
        "cue": "~와 관련 있다",
        "model": "relate to [thing]",
        "tier": 1,
        "star": true,
        "example": "How does this even relate to the deadline?",
        "exampleKo": "이게 마감이랑 무슨 상관이야?"
      },
      {
        "cue": "A와 B를 비교하다",
        "model": "compare A with B",
        "tier": 1,
        "star": true,
        "example": "Let's compare this plan with the one from last year.",
        "exampleKo": "이 요금제를 작년 거랑 비교해 보자."
      },
      {
        "cue": "A를 B에 비유하다 / 비교하다",
        "model": "compare A to B",
        "tier": 1,
        "star": true,
        "example": "People keep comparing our app to Notion.",
        "exampleKo": "사람들이 자꾸 우리 앱을 노션에 비교하더라."
      },
      {
        "cue": "~에 기반하다",
        "model": "be based on [thing]",
        "tier": 1,
        "star": true,
        "example": "The movie's based on a true story.",
        "exampleKo": "그 영화는 실화에 기반한 거야."
      },
      {
        "cue": "~에 속하다",
        "model": "belong to [person/group]",
        "tier": 1,
        "star": true,
        "example": "That mug belongs to Sarah, don't touch it.",
        "exampleKo": "그 머그컵 사라 거야, 건드리지 마."
      },
      {
        "cue": "~에 동의하다",
        "model": "agree with [person/idea]",
        "tier": 1,
        "star": true,
        "example": "I totally agree with you on that.",
        "exampleKo": "그 점에 대해선 너한테 완전 동의해."
      },
      {
        "cue": "~에 동의하지 않다",
        "model": "disagree with [person/idea]",
        "tier": 1,
        "star": true,
        "example": "I have to disagree with the timeline here.",
        "exampleKo": "이 일정에는 동의할 수 없어."
      },
      {
        "cue": "~에 신경 쓰다",
        "model": "care about [thing]",
        "tier": 1,
        "star": true,
        "example": "Honestly, nobody cares about the font choice.",
        "exampleKo": "솔직히 아무도 폰트 선택엔 신경 안 써."
      },
      {
        "cue": "~을 기다리다",
        "model": "wait for [person/thing]",
        "tier": 1,
        "star": true,
        "example": "I've been waiting for the build to finish for ten minutes.",
        "exampleKo": "빌드 끝나기를 10분째 기다리고 있어."
      },
      {
        "cue": "~을 듣다",
        "model": "listen to [person/thing]",
        "tier": 1,
        "star": true,
        "example": "Just listen to what the customer actually wants.",
        "exampleKo": "그냥 고객이 실제로 뭘 원하는지 들어봐."
      },
      {
        "cue": "~에 주의를 기울이다",
        "model": "pay attention to [thing]",
        "tier": 1,
        "star": true,
        "example": "Pay attention to the error message, it tells you everything.",
        "exampleKo": "에러 메시지에 주의를 기울여, 다 나와 있어."
      },
      {
        "cue": "(~을) 후속 조치하다, 챙겨서 마무리하다",
        "model": "follow up on [an action item / a lead]",
        "tier": 1,
        "star": true,
        "example": "I'll follow up on that ticket first thing tomorrow.",
        "exampleKo": "내일 아침 제일 먼저 그 티켓 후속 처리할게."
      },
      {
        "cue": "(~을) 조사하다, 알아보다",
        "model": "look into [the matter / a complaint]",
        "tier": 1,
        "star": true,
        "example": "Let me look into why the payment failed.",
        "exampleKo": "결제가 왜 실패했는지 내가 알아볼게."
      },
      {
        "cue": "~라는 결과를 낳다",
        "model": "result in [result]",
        "tier": 2,
        "star": true,
        "example": "That one typo resulted in a full outage.",
        "exampleKo": "그 오타 하나가 전체 장애로 이어졌어."
      },
      {
        "cue": "~에서 비롯되다",
        "model": "result from [cause]",
        "tier": 2,
        "star": true,
        "example": "Most of these crashes result from bad input.",
        "exampleKo": "이 크래시 대부분은 잘못된 입력에서 비롯돼."
      },
      {
        "cue": "~에 기여하다",
        "model": "contribute to [result]",
        "tier": 2,
        "star": true,
        "example": "Everyone on the team contributed to the launch.",
        "exampleKo": "팀원 모두가 이번 출시에 기여했어."
      },
      {
        "cue": "~을 설명하다 / 차지하다 / 고려하다",
        "model": "account for [thing]",
        "tier": 2,
        "star": true,
        "easyEn": "explain why something happens, or form part of a total",
        "example": "Mobile alone accounts for half our traffic.",
        "exampleKo": "모바일만으로 우리 트래픽의 절반을 차지해."
      },
      {
        "cue": "A를 B에 기반하다",
        "model": "base A on B",
        "tier": 2,
        "star": true,
        "example": "We based the pricing on what competitors charge.",
        "exampleKo": "경쟁사 가격을 기준으로 요금을 책정했어."
      },
      {
        "cue": "~로 구성되다",
        "model": "consist of [parts]",
        "tier": 2,
        "star": true,
        "example": "The kit consists of a charger, a cable, and a case.",
        "exampleKo": "그 키트는 충전기, 케이블, 케이스로 구성돼 있어."
      },
      {
        "cue": "~을 돌보다",
        "model": "care for [person]",
        "tier": 2,
        "star": true,
        "example": "She took the week off to care for her mom.",
        "exampleKo": "엄마를 돌보려고 그녀는 일주일 쉬었어."
      },
      {
        "cue": "(규정·정책·요청을) 준수하다, 따르다 — 격식체, 컴플라이언스 맥락에서 필수",
        "model": "comply with [a regulation / policy / request]",
        "tier": 2,
        "star": true,
        "easyEn": "follow or obey a rule, policy, or request",
        "example": "We have to comply with GDPR before we launch in the EU.",
        "exampleKo": "EU 출시 전에 GDPR을 준수해야 해."
      },
      {
        "cue": "(기준·일정·원칙을) 고수하다, 철저히 지키다",
        "model": "adhere to [standards / a schedule / principles]",
        "tier": 2,
        "star": true,
        "easyEn": "follow or stick closely to rules, a plan, or schedule",
        "example": "Please adhere to the style guide when you commit.",
        "exampleKo": "커밋할 때 스타일 가이드를 지켜줘."
      },
      {
        "cue": "(규격·업계 관행에) 부합하다, 들어맞다",
        "model": "conform to [specs / industry norms]",
        "tier": 2,
        "star": true,
        "easyEn": "match or follow standards, rules, or norms",
        "example": "The part has to conform to the safety specs.",
        "exampleKo": "그 부품은 안전 규격에 부합해야 해."
      },
      {
        "cue": "(목표·전략과) 부합하다, 결을 맞추다 — 면접 단골 표현",
        "model": "align with [our goals / the strategy]",
        "tier": 2,
        "star": true,
        "easyEn": "match or agree with goals or a strategy",
        "example": "Does this feature actually align with our goals?",
        "exampleKo": "이 기능이 정말 우리 목표에 부합해?"
      },
      {
        "cue": "(고객 요구·타깃층에) 맞추다, 부응하다",
        "model": "cater to [client needs / a target audience]",
        "tier": 2,
        "star": true,
        "easyEn": "give people exactly what they want or need",
        "example": "Our whole UI caters to first-time users.",
        "exampleKo": "우리 UI 전체가 초보 사용자에게 맞춰져 있어."
      },
      {
        "cue": "(상대의 판단·연장자에게) 따르다, 우선권을 양보하다",
        "model": "defer to [your judgment / senior staff]",
        "tier": 2,
        "star": true,
        "easyEn": "let someone else decide because you respect them",
        "example": "You know the codebase better, so I'll defer to your judgment.",
        "exampleKo": "네가 코드베이스를 더 잘 아니까 네 판단에 따를게."
      },
      {
        "cue": "(달리 방법이 없어 극단적 수단에) 의존하다, 결국 동원하다",
        "model": "resort to [drastic measures / layoffs]",
        "tier": 2,
        "star": true,
        "easyEn": "use something as a last option when nothing else works",
        "example": "We had to resort to layoffs to stay afloat.",
        "exampleKo": "버티려고 결국 정리해고까지 동원해야 했어."
      },
      {
        "cue": "(합쳐서 ~에) 이르다; 결국 ~와 마찬가지다",
        "model": "amount to [a significant figure / the same thing]",
        "tier": 2,
        "star": true,
        "easyEn": "add up to a total; or be the same in effect",
        "example": "The extra fees amount to almost fifty bucks.",
        "exampleKo": "추가 요금이 다 합치면 거의 50달러야."
      },
      {
        "cue": "(견해·이론에) 동의하다, 지지하다 — 구독이 아니라 '신봉하다' 뜻",
        "model": "subscribe to [a view / a theory / a philosophy]",
        "tier": 2,
        "star": true,
        "easyEn": "agree with or believe in an idea or theory",
        "example": "I don't really subscribe to that theory.",
        "exampleKo": "난 그 이론엔 별로 동의 안 해."
      },
      {
        "cue": "(제안·조건에) 반대하다, 이의를 제기하다",
        "model": "object to [a proposal / the terms]",
        "tier": 2,
        "star": true,
        "easyEn": "disagree with or oppose something",
        "example": "A couple of people objected to the new terms.",
        "exampleKo": "몇몇이 새 조건에 반대했어."
      },
      {
        "cue": "(조건·처리에) 동의하다, 승낙하다 — 법무·약관 맥락",
        "model": "consent to [the terms / data collection]",
        "tier": 2,
        "star": true,
        "easyEn": "agree to or allow something",
        "example": "You have to consent to the terms before signing up.",
        "exampleKo": "가입 전에 약관에 동의해야 해."
      },
      {
        "cue": "(성공을 팀의) 공·덕분으로 돌리다",
        "model": "attribute [the success] to [the team]",
        "tier": 2,
        "star": true,
        "easyEn": "say something was caused by or thanks to someone",
        "example": "I attribute the whole win to the dev team.",
        "exampleKo": "이번 성공은 전부 개발팀 덕분이라고 봐."
      },
      {
        "cue": "(변화·새 환경에) 적응하다, 맞춰가다",
        "model": "adapt to [change / a new environment]",
        "tier": 2,
        "star": true,
        "example": "It took me a month to adapt to the new stack.",
        "exampleKo": "새 기술 스택에 적응하는 데 한 달 걸렸어."
      },
      {
        "cue": "(~을) 열망하다, 지향하다",
        "model": "aspire to [a leadership role]",
        "tier": 2,
        "star": true,
        "easyEn": "strongly want to achieve something",
        "example": "She aspires to a director role someday.",
        "exampleKo": "그녀는 언젠가 디렉터 자리를 열망해."
      },
      {
        "cue": "(기한·계획에) 전념하다, 확실히 약속하다",
        "model": "commit to [a deadline / a plan]",
        "tier": 2,
        "star": true,
        "easyEn": "firmly promise to do or stick with something",
        "example": "Can you commit to Friday for the demo?",
        "exampleKo": "데모를 금요일로 확실히 약속할 수 있어?"
      },
      {
        "cue": "(자연스레 ~쪽으로) 끌리다, 기울다",
        "model": "gravitate toward [a particular solution]",
        "tier": 2,
        "star": true,
        "easyEn": "be naturally attracted to or move toward something",
        "example": "The team keeps gravitating toward the simplest fix.",
        "exampleKo": "팀이 자꾸 가장 단순한 해결책 쪽으로 끌려."
      },
      {
        "cue": "(압박·유혹에) 굴복하다, 무너지다",
        "model": "succumb to [pressure / temptation]",
        "tier": 2,
        "star": true,
        "easyEn": "stop resisting and give in to something",
        "example": "Don't succumb to the pressure to ship half-baked.",
        "exampleKo": "덜 된 채로 배포하라는 압박에 굴복하지 마."
      },
      {
        "cue": "(~와) 다르다, 차이가 나다 — differ '의견이 다르다' with도 가능",
        "model": "differ from [the original / the norm]",
        "tier": 2,
        "star": true,
        "example": "This version differs from the original in one key way.",
        "exampleKo": "이 버전은 원본과 한 가지 핵심에서 달라."
      },
      {
        "cue": "(~로부터) 도움을 받다, 덕을 보다",
        "model": "benefit from [feedback / mentorship]",
        "tier": 2,
        "star": true,
        "example": "You'd really benefit from talking to a mentor.",
        "exampleKo": "멘토랑 얘기해 보면 큰 도움이 될 거야."
      },
      {
        "cue": "(~을) 삼가다, 자제하다 — 정중한 금지 표현",
        "model": "refrain from [commenting / making promises]",
        "tier": 2,
        "star": true,
        "easyEn": "choose not to do something; hold yourself back",
        "example": "Please refrain from replying-all on these threads.",
        "exampleKo": "이 메일 스레드에선 전체 답장은 자제해 줘."
      },
      {
        "cue": "(데이터에서) 끌어내다, 도출하다",
        "model": "derive [value / insight] from [the data]",
        "tier": 2,
        "star": true,
        "easyEn": "get or obtain something from a source",
        "example": "We derive most of our insight from user interviews.",
        "exampleKo": "우리는 인사이트 대부분을 사용자 인터뷰에서 끌어내."
      },
      {
        "cue": "(~에서) 비롯되다, 기인하다",
        "model": "stem from [a misunderstanding / root causes]",
        "tier": 2,
        "star": true,
        "easyEn": "to be caused by or come from something",
        "example": "Half these bugs stem from one bad merge.",
        "exampleKo": "이 버그 절반이 잘못된 머지 하나에서 비롯됐어."
      },
      {
        "cue": "(계획·절차에서) 벗어나다, 이탈하다",
        "model": "deviate from [the plan / protocol]",
        "tier": 2,
        "star": true,
        "easyEn": "to move away from the usual plan or way",
        "example": "Let's not deviate from the plan this late.",
        "exampleKo": "이렇게 늦은 시점에 계획에서 벗어나진 말자."
      },
      {
        "cue": "(~의) 가치를 떨어뜨리다, 깎아내리다",
        "model": "detract from [the overall value]",
        "tier": 2,
        "star": true,
        "easyEn": "to make something seem less good or valuable",
        "example": "The typos really detract from an otherwise great deck.",
        "exampleKo": "오타들이 그 좋은 발표자료의 가치를 깎아먹어."
      },
      {
        "cue": "(~을 …와) 구별하다, 차별화하다",
        "model": "distinguish [X] from [Y]",
        "tier": 2,
        "star": true,
        "easyEn": "to see how one thing differs from another",
        "example": "It's hard to distinguish the free tier from the paid one.",
        "exampleKo": "무료 등급을 유료 등급과 구별하기가 어려워."
      },
      {
        "cue": "(~을 …에서) 면제하다, 예외로 두다",
        "model": "exempt [someone] from [a requirement]",
        "tier": 2,
        "star": true,
        "easyEn": "to free someone from a rule or duty",
        "example": "Interns are exempt from the on-call rotation.",
        "exampleKo": "인턴은 온콜 순번에서 면제야."
      },
      {
        "cue": "(스트레스·업무량을) 감당하다, 견디며 대처하다",
        "model": "cope with [stress / a heavy workload]",
        "tier": 2,
        "star": true,
        "easyEn": "to deal with something hard in a calm way",
        "example": "I've been coping with a crazy workload all week.",
        "exampleKo": "이번 주 내내 미친 업무량을 감당하고 있어."
      },
      {
        "cue": "(어려운 문제와) 씨름하다, 고심하다",
        "model": "grapple with [a tough problem]",
        "tier": 2,
        "star": true,
        "easyEn": "to try hard to deal with a problem",
        "example": "We're still grappling with the scaling issue.",
        "exampleKo": "우리 아직 확장 문제랑 씨름하는 중이야."
      },
      {
        "cue": "(상충하는 우선순위에) 대처하다, 맞붙다",
        "model": "contend with [competing priorities]",
        "tier": 2,
        "star": true,
        "easyEn": "to deal with something difficult",
        "example": "Every PM has to contend with competing priorities.",
        "exampleKo": "모든 PM은 상충하는 우선순위에 대처해야 해."
      },
      {
        "cue": "(전문가·법무팀과) 상의하다, 자문을 구하다",
        "model": "consult with [a specialist / legal]",
        "tier": 2,
        "star": true,
        "easyEn": "to ask someone for advice or information",
        "example": "Let me consult with legal before we send that.",
        "exampleKo": "그거 보내기 전에 법무팀이랑 상의해 볼게."
      },
      {
        "cue": "(여러 부서와) 조율·협력하다",
        "model": "coordinate with [cross-functional teams]",
        "tier": 2,
        "star": true,
        "easyEn": "to organize work together with other people",
        "example": "I'll coordinate with the design team on the mockups.",
        "exampleKo": "목업 건은 내가 디자인 팀이랑 조율할게."
      },
      {
        "cue": "(~을 …와) 조화시키다, 양립시키다; (수치를) 대사·맞춰보다",
        "model": "reconcile [X] with [Y]",
        "tier": 2,
        "star": true,
        "easyEn": "to make two different things agree or fit",
        "example": "We need to reconcile the numbers with the invoice.",
        "exampleKo": "수치를 인보이스랑 맞춰봐야 해."
      },
      {
        "cue": "(~을) 방해하다, ~에 지장을 주다",
        "model": "interfere with [operations / performance]",
        "tier": 2,
        "star": true,
        "easyEn": "to get in the way of something working",
        "example": "The pop-up interferes with the checkout flow.",
        "exampleKo": "그 팝업이 결제 흐름을 방해해."
      },
      {
        "cue": "(~을) 함부로 손대다, 조작·변조하다",
        "model": "tamper with [data / evidence]",
        "tier": 2,
        "star": true,
        "easyEn": "to touch or change something in a wrong way",
        "example": "Nobody should be able to tamper with the logs.",
        "exampleKo": "아무도 로그를 함부로 손대선 안 돼."
      },
      {
        "cue": "(~을) 전문으로 하다, 특화하다",
        "model": "specialize in [a domain / front-end]",
        "tier": 2,
        "star": true,
        "easyEn": "to focus mainly on one area or skill",
        "example": "Our team specializes in front-end performance.",
        "exampleKo": "우리 팀은 프론트엔드 성능을 전문으로 해."
      },
      {
        "cue": "(~에) 뛰어나다, 탁월하다 — 면접 강점 표현",
        "model": "excel at/in [a particular skill]",
        "tier": 2,
        "star": true,
        "easyEn": "to be very good at something",
        "example": "She really excels at breaking down hard problems.",
        "exampleKo": "그녀는 어려운 문제를 쪼개는 데 정말 뛰어나."
      },
      {
        "cue": "(~에) 참여하다, 적극 관여하다",
        "model": "engage in [discussions / negotiations]",
        "tier": 2,
        "star": true,
        "easyEn": "to take part in an activity",
        "example": "We're not ready to engage in pricing negotiations yet.",
        "exampleKo": "아직 가격 협상에 나설 준비는 안 됐어."
      },
      {
        "cue": "(~에) 개입하다, 중재하러 나서다",
        "model": "intervene in [a dispute / the process]",
        "tier": 2,
        "star": true,
        "easyEn": "to get involved to change a situation",
        "example": "I had to intervene in that Slack thread before it blew up.",
        "exampleKo": "그 슬랙 스레드가 터지기 전에 내가 개입해야 했어."
      },
      {
        "cue": "(~을) 고려에 넣다, 감안하다",
        "model": "factor [X] in / factor in [costs / risk]",
        "tier": 2,
        "star": true,
        "easyEn": "to include something when you decide or calculate",
        "example": "Did you factor in the cloud costs?",
        "exampleKo": "클라우드 비용은 감안했어?"
      },
      {
        "cue": "(~을) 고집하다, 강력히 요구하다",
        "model": "insist on [accuracy / doing it right]",
        "tier": 2,
        "star": true,
        "easyEn": "to firmly demand or require something",
        "example": "My manager insists on a code review for everything.",
        "exampleKo": "우리 매니저는 뭐든 코드 리뷰를 고집해."
      },
      {
        "cue": "(기회·흐름을) 십분 활용하다, 잘 이용하다",
        "model": "capitalize on [an opportunity / momentum]",
        "tier": 2,
        "star": true,
        "easyEn": "use a chance to get an advantage",
        "example": "We should capitalize on the buzz from the launch.",
        "exampleKo": "출시로 생긴 화제를 십분 활용해야 해."
      },
      {
        "cue": "(~을) 부연 설명하다, 자세히 풀어 말하다 — 면접관 단골 요청",
        "model": "elaborate on [a point / your answer]",
        "tier": 2,
        "star": true,
        "easyEn": "to explain something in more detail",
        "example": "Can you elaborate on what broke exactly?",
        "exampleKo": "정확히 뭐가 망가졌는지 좀 더 설명해 줄래?"
      },
      {
        "cue": "(~을) 더 깊이 설명하다, 확장해 말하다",
        "model": "expand on [an idea]",
        "tier": 2,
        "star": true,
        "easyEn": "to say more about an idea",
        "example": "Let me expand on that idea in the next slide.",
        "exampleKo": "그 아이디어는 다음 슬라이드에서 더 풀어 볼게."
      },
      {
        "cue": "(~에) 착수하다, 본격적으로 나서다",
        "model": "embark on [a new project / initiative]",
        "tier": 2,
        "star": true,
        "easyEn": "to start something new and important",
        "example": "We're about to embark on a full rewrite.",
        "exampleKo": "우리 곧 전면 재작성에 착수할 참이야."
      },
      {
        "cue": "(~을) 토대로 발전시키다, 쌓아 올리다",
        "model": "build on [prior work / strengths]",
        "tier": 2,
        "star": true,
        "easyEn": "to use something as a base to develop more",
        "example": "Let's build on the prototype instead of starting over.",
        "exampleKo": "처음부터 하지 말고 프로토타입을 토대로 발전시키자."
      },
      {
        "cue": "(~에 따라) 조치를 취하다, 실행에 옮기다",
        "model": "act on [feedback / a recommendation]",
        "tier": 2,
        "star": true,
        "example": "We actually acted on your feedback last sprint.",
        "exampleKo": "지난 스프린트에 네 피드백대로 실제로 조치했어."
      },
      {
        "cue": "(~을) 되돌아보다, 성찰하다 — 자기소개 단골",
        "model": "reflect on [the experience / a failure]",
        "tier": 2,
        "star": true,
        "example": "Looking back, I reflect on that failure a lot.",
        "exampleKo": "돌이켜보면 그 실패를 자주 되새겨."
      },
      {
        "cue": "(~에) 달려 있다, 전적으로 좌우되다",
        "model": "hinge on [a single factor / approval]",
        "tier": 2,
        "star": true,
        "easyEn": "depend completely on one thing",
        "example": "The whole deal hinges on their approval.",
        "exampleKo": "이 거래 전체가 그쪽 승인에 달려 있어."
      },
      {
        "cue": "(~에) 의견을 보태다, 한마디 거들다",
        "model": "weigh in on [a decision / the topic]",
        "tier": 2,
        "star": true,
        "easyEn": "give your opinion on something being discussed",
        "example": "Can you weigh in on which vendor we pick?",
        "exampleKo": "어느 업체를 고를지 의견 좀 보태줄래?"
      },
      {
        "cue": "(~을) 깊이 파고들다, 파헤치다",
        "model": "delve into [the details / root causes]",
        "tier": 2,
        "star": true,
        "easyEn": "look at or study something in great detail.",
        "example": "Let's delve into the root cause before we patch it.",
        "exampleKo": "패치하기 전에 근본 원인을 깊이 파보자."
      },
      {
        "cue": "(~을) 활용하다, 끌어다 쓰다",
        "model": "tap into [a market / hidden talent]",
        "tier": 2,
        "star": true,
        "easyEn": "start using a resource that is available",
        "example": "This launch lets us tap into the student market.",
        "exampleKo": "이번 출시로 학생 시장을 공략할 수 있어."
      },
      {
        "cue": "(~을) 보완하다, 상쇄하다, 만회하다",
        "model": "compensate for [a weakness / lost time]",
        "tier": 2,
        "star": true,
        "example": "Extra features can't compensate for a slow app.",
        "exampleKo": "기능을 더 넣어도 느린 앱을 상쇄하진 못해."
      },
      {
        "cue": "(~을) 옹호하다, 적극 대변·주장하다",
        "model": "advocate for [a policy / the user]",
        "tier": 2,
        "star": true,
        "example": "Someone in the room has to advocate for the user.",
        "exampleKo": "이 자리에서 누군가는 사용자를 대변해야 해."
      },
      {
        "cue": "(~을) 택하다, ~쪽으로 가다",
        "model": "opt for [the safer option]",
        "tier": 2,
        "star": true,
        "example": "Let's just opt for the safer rollout.",
        "exampleKo": "그냥 더 안전한 배포 방식을 택하자."
      },
      {
        "cue": "(~을) 감안하다, 여지를 두다",
        "model": "allow for [delays / a margin of error]",
        "tier": 2,
        "star": true,
        "easyEn": "leave enough time or room for something",
        "example": "Allow for a day or two of shipping delays.",
        "exampleKo": "배송 하루 이틀 지연은 감안해 둬."
      },
      {
        "cue": "(~을) 보증하다, 장담하다",
        "model": "vouch for [a candidate / the results]",
        "tier": 2,
        "star": true,
        "easyEn": "say you are sure someone or something is good",
        "example": "I've worked with her for years and I can vouch for her.",
        "exampleKo": "몇 년을 같이 일했는데 내가 그녀를 보증할 수 있어."
      },
      {
        "cue": "(~에) 대비하다, 마음의 각오를 하다",
        "model": "brace for [budget cuts / impact]",
        "tier": 2,
        "star": true,
        "easyEn": "get ready for something bad about to happen",
        "example": "Brace for a rough Q4, the numbers aren't great.",
        "exampleKo": "4분기 힘들 테니 각오해, 수치가 안 좋아."
      },
      {
        "cue": "(Y 대신 X를) 쓰다, 대체하다 — 순서 주의(넣는 것 for 빼는 것)",
        "model": "substitute [X] for [Y]",
        "tier": 2,
        "star": true,
        "example": "You can substitute honey for sugar in this recipe.",
        "exampleKo": "이 레시피에선 설탕 대신 꿀을 써도 돼."
      },
      {
        "cue": "(~을) 강력히 요구하다, 밀어붙이다",
        "model": "push for / press for [a raise / change]",
        "tier": 2,
        "star": true,
        "example": "I've been pushing for a raise for months.",
        "exampleKo": "몇 달째 임금 인상을 강하게 요구하고 있어."
      },
      {
        "cue": "(~에게) 보고하다, ~의 지휘를 받다 — 직속 관계 표현",
        "model": "answer to / report to [a manager]",
        "tier": 2,
        "star": true,
        "example": "Who do you report to now, Jenna?",
        "exampleKo": "너 이제 누구한테 보고해, 제나?"
      },
      {
        "cue": "(문제를 상부로) 보고·이관하다, 에스컬레이션하다",
        "model": "escalate [an issue] to [management]",
        "tier": 2,
        "star": true,
        "example": "If they push back again, just escalate it to management.",
        "exampleKo": "또 반발하면 그냥 상부로 이관해."
      },
      {
        "cue": "(업무를 ~에게) 위임하다, 넘기다",
        "model": "delegate [tasks] to [team members]",
        "tier": 2,
        "star": true,
        "example": "You should delegate the QA tasks to the interns.",
        "exampleKo": "QA 업무는 인턴들한테 넘겨."
      },
      {
        "cue": "(~와) 상관관계가 있다, 함께 움직이다",
        "model": "correlate with [performance / outcomes]",
        "tier": 2,
        "star": true,
        "example": "Load times correlate with our bounce rate.",
        "exampleKo": "로딩 시간이 이탈률과 상관관계가 있어."
      },
      {
        "cue": "(~와) 시기가 겹치다, 동시에 일어나다",
        "model": "coincide with [the product launch]",
        "tier": 2,
        "star": true,
        "example": "The outage happened to coincide with the launch.",
        "exampleKo": "하필 장애가 출시 시점과 겹쳤어."
      },
      {
        "cue": "(~에) 해당하다, 일치하다",
        "model": "correspond to [the figures / your records]",
        "tier": 2,
        "star": true,
        "example": "These totals should correspond to your records.",
        "exampleKo": "이 합계가 네 기록과 일치해야 해."
      },
      {
        "cue": "(~을 …와) 동일시하다, 같다고 보다",
        "model": "equate [X] with [Y]",
        "tier": 2,
        "star": true,
        "example": "Don't equate being busy with being productive.",
        "exampleKo": "바쁜 걸 생산적인 거랑 동일시하지 마."
      },
      {
        "cue": "(~을) 꺼리다, 피하려 하다",
        "model": "shy away from [conflict / hard conversations]",
        "tier": 2,
        "star": true,
        "easyEn": "avoid something because it feels hard or uncomfortable",
        "example": "Our lead tends to shy away from hard conversations.",
        "exampleKo": "우리 리드는 어려운 대화를 피하려는 편이야."
      },
      {
        "cue": "(~에서) 회복하다, 다시 일어서다",
        "model": "recover from [a setback]",
        "tier": 2,
        "star": true,
        "example": "It took the team a while to recover from that setback.",
        "exampleKo": "팀이 그 좌절에서 회복하는 데 좀 걸렸어."
      },
      {
        "cue": "(규칙·결정에) 따르다, 승복하다",
        "model": "abide by [the rules / a decision]",
        "tier": 3,
        "star": true,
        "easyEn": "accept and follow a rule or decision",
        "example": "Everyone has to abide by the new PTO policy.",
        "exampleKo": "모두 새 휴가 정책을 따라야 해."
      },
      {
        "cue": "(지연을 외부 요인의) 탓으로 돌리다, ~ 때문으로 보다",
        "model": "ascribe [the delay] to [external factors]",
        "tier": 3,
        "star": true,
        "easyEn": "say something was caused by a particular thing",
        "example": "They ascribe the delay to supply issues, but I'm not sure.",
        "exampleKo": "그들은 지연을 공급 문제 탓으로 돌리는데, 난 잘 모르겠어."
      },
      {
        "cue": "(~을) 입증하다, 보증하듯 증언하다 — 추천서 표현",
        "model": "attest to [someone's skill / the quality]",
        "tier": 3,
        "star": true,
        "easyEn": "confirm or prove that something is true",
        "example": "I can personally attest to how good she is under pressure.",
        "exampleKo": "압박 속에서 그녀가 얼마나 뛰어난지 내가 직접 증언할 수 있어."
      },
      {
        "cue": "(~을) 넌지시 언급하다, 에둘러 가리키다",
        "model": "allude to [an issue / a previous point]",
        "tier": 3,
        "star": true,
        "easyEn": "mention something indirectly without saying it openly",
        "example": "He alluded to some layoffs but never said it outright.",
        "exampleKo": "그는 정리해고를 넌지시 비쳤지만 대놓고 말하진 않았어."
      },
      {
        "cue": "(~에) 관련되다, 해당하다 — 격식체",
        "model": "pertain to [the matter at hand]",
        "tier": 3,
        "star": true,
        "easyEn": "be related or connected to something",
        "example": "Let's stick to what pertains to today's release.",
        "exampleKo": "오늘 릴리스에 관련된 것만 다루자."
      },
      {
        "cue": "(투표 등을) 기권하다, 삼가다",
        "model": "abstain from [a vote]",
        "tier": 3,
        "star": true,
        "easyEn": "choose not to do something, especially not to vote",
        "example": "I'll abstain from the vote since it's my own proposal.",
        "exampleKo": "내 제안이라 투표는 기권할게."
      },
      {
        "cue": "(~가 …하지 못하도록) 막다, 불가능하게 하다",
        "model": "preclude [someone] from [doing something]",
        "tier": 3,
        "star": true,
        "easyEn": "stop someone from being able to do something",
        "example": "A signed NDA precludes us from sharing those numbers.",
        "exampleKo": "NDA 때문에 우리가 그 수치를 공유하지 못해."
      },
      {
        "cue": "(이해관계자·타 팀과) 연락·협력하다 — 업무 메일 표현",
        "model": "liaise with [stakeholders / other teams]",
        "tier": 3,
        "star": true,
        "easyEn": "talk and work together with other people",
        "example": "I'll liaise with the vendor and loop you in.",
        "exampleKo": "내가 업체랑 연락하고 너도 끼워줄게."
      },
      {
        "cue": "(~을) 생략하다, 없애다, 안 거치다",
        "model": "dispense with [formalities / the middleman]",
        "tier": 3,
        "star": true,
        "easyEn": "do without something or skip it",
        "example": "Let's dispense with the intros and get to it.",
        "exampleKo": "인사말은 생략하고 바로 본론으로 가자."
      },
      {
        "cue": "(노력이 결국 ~로) 정점에 이르다, 귀결되다",
        "model": "culminate in [a successful launch]",
        "tier": 3,
        "star": true,
        "easyEn": "finally end with an important result",
        "example": "Months of work culminated in a flawless launch.",
        "exampleKo": "몇 달의 작업이 결국 완벽한 출시로 귀결됐어."
      },
      {
        "cue": "(~을) 전제로 하다, ~에 기반을 두다",
        "model": "be predicated on [an assumption]",
        "tier": 3,
        "star": true,
        "easyEn": "be based on something being true",
        "example": "The whole plan is predicated on getting funding.",
        "exampleKo": "이 계획 전체가 투자 유치를 전제로 해."
      }
    ]
  }
];
