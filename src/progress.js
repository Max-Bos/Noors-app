import { supabase } from './auth.js'

// ── Lokale state ─────────────────────────────────────────
// Werkt ook offline; wordt gesynchroniseerd met Supabase

let _known     = {}   // { 'word|jeg': true, ... }
let _difficult = {}   // { 'word|jeg': 3, ... }  (aantal keer fout)
let _streak    = 0
let _userId    = null
let _syncTimer = null

// ── Initialiseer voor ingelogde user ─────────────────────

export async function initProgress(userId) {
  _userId = userId

  // Haal op uit Supabase
  const { data, error } = await supabase
    .from('user_progress')
    .select('known, difficult, streak')
    .eq('user_id', userId)
    .single()

  if (data) {
    _known     = data.known     ?? {}
    _difficult = data.difficult ?? {}
    _streak    = data.streak    ?? 0
  } else {
    // Nieuwe user of error → begin leeg
    _known = {}; _difficult = {}; _streak = 0
  }
}

// ── Getters ───────────────────────────────────────────────

export const getKnown     = () => ({ ..._known })
export const getDifficult = () => ({ ..._difficult })
export const getStreak    = () => _streak
export const isKnown      = key => !!_known[key]

export function getStats(allItems, itemKey) {
  const known = allItems.filter(i => _known[itemKey(i)]).length
  return { known, total: allItems.length, pct: Math.round(known / allItems.length * 100) }
}

// ── Mutaties ──────────────────────────────────────────────

export function markKnown(key) {
  _known[key] = true
  delete _difficult[key]
  _scheduleSave()
}

export function markUnknown(key) {
  delete _known[key]
  _difficult[key] = (_difficult[key] ?? 0) + 1
  _scheduleSave()
}

export function updateStreak(value) {
  if (value > _streak) _streak = value
  _scheduleSave()
}

// ── Sync naar Supabase (debounced 3s) ────────────────────

function _scheduleSave() {
  clearTimeout(_syncTimer)
  _syncTimer = setTimeout(_save, 3000)
}

async function _save() {
  if (!_userId) return
  await supabase.from('user_progress').upsert({
    user_id:   _userId,
    known:     _known,
    difficult: _difficult,
    streak:    _streak,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' })
}

// Sla direct op bij pagina sluiten
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') _save()
})
