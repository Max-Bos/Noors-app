import { ALL_ITEMS, itemKey, shuffle } from './data.js'
import { markKnown, markUnknown, getStreak, updateStreak, isKnown } from './progress.js'

// ── State ─────────────────────────────────────────────────
let items = [], retry = [], idx = 0
let correct = 0, wrong = 0, round = 1
let dir = 'no-nl', streak = 0, answered = false

// ── Start ─────────────────────────────────────────────────

export function startQuiz({ cat, direction, count, onQuestion, onResult }) {
  const pool = filterPool(cat)
  if (pool.length < 4) return false

  items = shuffle(pool).slice(0, count)
  retry = []; idx = 0; correct = 0; wrong = 0; round = 1; streak = 0; answered = false
  dir = direction

  nextQuestion(onQuestion, onResult)
  return true
}

export function checkAnswer(chosen, onQuestion, onResult) {
  if (answered) return
  answered = true

  const item    = items[idx]
  const correct_ = dir === 'no-nl' ? item.nl : item.no
  const isRight  = chosen === correct_

  if (isRight) {
    correct++; streak++
    markKnown(itemKey(item))
    updateStreak(streak)
  } else {
    wrong++; streak = 0
    markUnknown(itemKey(item))
    retry.push(item)
  }

  return {
    isRight,
    correctAnswer: correct_,
    correct, wrong,
    retryCount: retry.length,
  }
}

export function nextQuestion(onQuestion, onResult) {
  idx++
  answered = false

  if (idx >= items.length) {
    if (retry.length > 0) {
      items = [...retry]; retry = []; idx = 0; round++
    } else {
      onResult({ correct, wrong, round, total: correct + wrong })
      return
    }
  }

  _buildQuestion(onQuestion)
}

// ── Intern ───────────────────────────────────────────────

function _buildQuestion(onQuestion) {
  const item     = items[idx]
  const question = dir === 'no-nl' ? item.no : item.nl
  const correct_ = dir === 'no-nl' ? item.nl : item.no

  const pool = ALL_ITEMS.filter(i => {
    const a = dir === 'no-nl' ? i.nl : i.no
    return a !== correct_ && i.type === item.type
  })
  const choices = shuffle([correct_, ...shuffle(pool).slice(0, 3).map(i => dir === 'no-nl' ? i.nl : i.no)])

  onQuestion({
    question,
    choices,
    cat: item.catLabel,
    round,
    isRetryRound: round > 1,
    progress: { current: idx + 1, total: items.length, correct, wrong, retryCount: retry.length },
  })
}

function filterPool(cat) {
  switch (cat) {
    case 'words':   return ALL_ITEMS.filter(i => i.type === 'word')
    case 'phrases': return ALL_ITEMS.filter(i => i.type === 'phrase')
    case 'unknown': return ALL_ITEMS.filter(i => !isKnown(itemKey(i)))
    default:        return [...ALL_ITEMS]
  }
}
