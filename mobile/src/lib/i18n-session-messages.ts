import type { Locale } from './i18n-messages';

export const sessionMessages: Record<Locale, Record<string, string>> = {
  en: {
    'feedback.gradeFailedContinueMessage':
      "We moved you forward, but couldn't confirm that grade. Retrying may send the same grade again.",
    'sessionSummary.kicker': 'SESSION COMPLETE',
    'sessionSummary.drillTitle': 'Nice work today',
    'sessionSummary.sparringTitle': 'Conversation complete',
    'sessionSummary.practice': 'Practiced',
    'sessionSummary.mastered': 'Total mastered',
    'sessionSummary.streak': 'Day streak',
    'sessionSummary.turns': 'Turns',
    'sessionSummary.used': 'Used',
    'sessionSummary.missed': 'Missed',
    'sessionSummary.confirm': 'Done',
    'sessionSummary.reportReady': 'AI report · used and missed targets',
    'sessionSummary.reportLoading':
      'AI report is being prepared. Live detection is shown for now.',
    'sessionSummary.reportFallback':
      'AI report unavailable. Showing live target detection.',
    'drill.remaining': '{n} left!',
    'drill.warmupCredit': '1 warm-up credit added automatically',
    'drill.progressA11y':
      '{completed} of {total} cards completed, plus 1 warm-up card',
  },
  ko: {
    'feedback.gradeFailedContinueMessage':
      '다음 카드로 넘어갔지만 방금 채점의 기록 여부를 확인하지 못했어요. 재시도하면 같은 채점이 다시 전송될 수 있어요.',
    'sessionSummary.kicker': '세션 완료',
    'sessionSummary.drillTitle': '오늘도 잘했어요',
    'sessionSummary.sparringTitle': '대화를 마쳤어요',
    'sessionSummary.practice': '연습',
    'sessionSummary.mastered': '누적 마스터',
    'sessionSummary.streak': '일 연속',
    'sessionSummary.turns': '발화',
    'sessionSummary.used': '사용',
    'sessionSummary.missed': '놓침',
    'sessionSummary.confirm': '확인',
    'sessionSummary.reportReady': 'AI 리포트 · 사용한 표현과 놓친 표현',
    'sessionSummary.reportLoading':
      'AI 리포트를 준비 중이에요. 지금은 실시간 감지 결과를 보여드려요.',
    'sessionSummary.reportFallback':
      'AI 리포트를 불러오지 못했어요. 실시간 감지 결과를 보여드려요.',
    'drill.remaining': '{n}장 남음!',
    'drill.warmupCredit': '워밍업 보너스 1장 자동 반영',
    'drill.progressA11y':
      '{total}장 중 {completed}장 완료, 워밍업 1장 포함',
  },
};
