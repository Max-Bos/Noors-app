import { ALL_ITEMS, itemKey, shuffle } from './data.js'
import { markKnown, markUnknown, isKnown } from './progress.js'

// ── State ─────────────────────────────────────────────────
let deck = [], retry = [], done = 0, isRetry = false
let _dir = 'nl-no'
let _autoTimer = null

// ── Start ─────────────────────────────────────────────────

export function startTyping({ cat, dir, onCard, onDone }) {
  const pool = filterPool(cat)
  if (!pool.length) return false

  _dir = dir
  deck = shuffle(pool); retry = []; done = 0; isRetry = false
  clearTimeout(_autoTimer)
  nextCard(onCard, onDone)
  return true
}

// ── Submit Answer ─────────────────────────────────────────

export function submitAnswer(input, onCard, onDone) {
  const item = deck[0]
  if (!item) return null

  const key     = itemKey(item)
  const correct = _dir === 'nl-no' ? item.no : item.nl
  const trimmed = input.trim()

  const isCorrect = trimmed.toLowerCase() === correct.toLowerCase()
  const isAlmost  = !isCorrect && levenshtein(trimmed.toLowerCase(), correct.toLowerCase()) <= 2

  deck.shift()

  if (isCorrect) {
    markKnown(key)
    done++
    _autoTimer = setTimeout(() => nextCard(onCard, onDone), 1000)
  } else {
    markUnknown(key)
    retry.push(item)
  }

  return {
    isCorrect,
    isAlmost,
    correctAnswer: correct,
    remaining: deck.length,
    retryCount: retry.length,
    done,
    total: done + deck.length + retry.length,
    isRetry,
  }
}

// ── Next Card ─────────────────────────────────────────────

export function nextCard(onCard, onDone) {
  clearTimeout(_autoTimer)
  if (deck.length === 0 && retry.length > 0) {
    deck = shuffle([...retry]); retry = []; isRetry = true
  }
  if (deck.length === 0) { onDone({ done }); return }

  const item = deck[0]
  const word = _dir === 'nl-no' ? item.nl : item.no
  const hint = _dir === 'nl-no' ? 'Vertaal naar Noors' : 'Vertaal naar Nederlands'

  onCard({
    word,
    hint,
    cat: item.catLabel,
    isRetry,
    remaining: deck.length,
    retryCount: retry.length,
    done,
    total: done + deck.length + retry.length,
  })
}

// ── Filter Pool ───────────────────────────────────────────

function filterPool(cat) {
  switch (cat) {
    case 'words':   return ALL_ITEMS.filter(i => i.type === 'word')
    case 'phrases': return ALL_ITEMS.filter(i => i.type === 'phrase')
    case 'unknown': return ALL_ITEMS.filter(i => !isKnown(itemKey(i)))
    default:        return [...ALL_ITEMS]
  }
}

// ── Levenshtein ───────────────────────────────────────────

function levenshtein(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}
