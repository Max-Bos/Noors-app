import { ALL_ITEMS, itemKey, shuffle } from './data.js'
import { markKnown, markUnknown, isKnown } from './progress.js'

// ── State ─────────────────────────────────────────────────
let deck = [], retry = [], done = 0, isRetry = false, flipped = false

// ── Start ─────────────────────────────────────────────────

export function startFlashcards({ cat, dir, onCard, onDone }) {
  const pool = filterPool(cat)
  if (!pool.length) return false

  deck = shuffle(pool); retry = []; done = 0; isRetry = false; flipped = false
  showCard(dir, onCard, onDone)
  return true
}

export function flipCard() {
  flipped = !flipped
  document.getElementById('fc-card')?.classList.toggle('flipped', flipped)
}

export function answer(result, dir, onCard, onDone) {
  const item = deck.shift()
  if (result === 'good') { markKnown(itemKey(item)); done++ }
  else                   { markUnknown(itemKey(item)); retry.push(item) }
  setTimeout(() => showCard(dir, onCard, onDone), 150)
}

// ── Intern ───────────────────────────────────────────────

function showCard(dir, onCard, onDone) {
  // Als hoofd-deck leeg is, schakel naar retry
  if (deck.length === 0 && retry.length > 0) {
    deck = shuffle([...retry]); retry = []; isRetry = true
  }
  if (deck.length === 0) { onDone({ done }); return }

  const item   = deck[0]
  const useDir = dir === 'random' ? (Math.random() > .5 ? 'no-nl' : 'nl-no') : dir
  flipped = false

  onCard({
    front:     useDir === 'no-nl' ? item.no : item.nl,
    back:      useDir === 'no-nl' ? item.nl : item.no,
    frontHint: useDir === 'no-nl' ? 'Noors' : 'Nederlands',
    backHint:  useDir === 'no-nl' ? 'Nederlands' : 'Noors',
    cat:       item.catLabel,
    isRetry,
    remaining: deck.length,
    retryCount: retry.length,
    done,
    total: done + deck.length + retry.length,
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
