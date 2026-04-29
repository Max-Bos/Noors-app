import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js'

// Supabase client (via CDN ESM)
const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ── Sessie ──────────────────────────────────────────────

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => callback(session))
}

// ── Login / Signup ───────────────────────────────────────

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export function currentUser() {
  return supabase.auth.getUser().then(({ data }) => data?.user ?? null)
}
