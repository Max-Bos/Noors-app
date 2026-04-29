import { signOut }                         from './auth.js'
import { initProgress, getStats, getDifficult, getStreak, isKnown, getDailyStreak, checkAndUpdateDailyStreak } from './progress.js'
import { ALL_ITEMS, itemKey, WORD_CATS, PHRASE_CATS }               from './data.js'
import { startFlashcards, flipCard, answer } from './flashcard.js'
import { startQuiz, checkAnswer, nextQuestion } from './quiz.js'
import { startTyping, submitAnswer, nextCard } from './typingmode.js'
import { renderReference, renderDifficult } from './reference.js'

// ── Init ─────────────────────────────────────────────────

export async function initApp(user) {
  await initProgress(user.id)
  checkAndUpdateDailyStreak()
  renderPage('home')
  setupNav()
  setupLogout(user)
  requestNotificationPermission()
  scheduleStudyReminder()
}

// ── Navigatie ─────────────────────────────────────────────

let currentPage = 'home'

function setupNav() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => renderPage(btn.dataset.page))
  })
}

function renderPage(page) {
  currentPage = page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'))
  document.getElementById(`page-${page}`)?.classList.add('active')
  document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active')

  switch (page) {
    case 'home':  renderHome(); break
    case 'ref':   setupRef();   break
    case 'fc':    setupFC();    break
    case 'quiz':  setupQuiz();  break
    case 'diff':  renderDiff(); break
    case 'type':  setupType();  break
  }
}

// ── Home ─────────────────────────────────────────────────

function renderHome() {
  const { known, total, pct } = getStats(ALL_ITEMS, itemKey)
  const diff = getDifficult()
  const dc   = Object.keys(diff).length
  const streak = getStreak()
  const dailyStreak = getDailyStreak()

  document.getElementById('h-known').textContent = known
  document.getElementById('h-total').textContent = total
  document.getElementById('h-pct').textContent   = pct + '%'
  document.getElementById('h-pbar').style.width  = pct + '%'
  document.getElementById('home-sub').textContent = `${known} van ${total} woorden & zinnen geleerd`
  document.getElementById('h-sub2').textContent   = `${total - known} items nog te leren`
  document.getElementById('h-diff-desc').textContent = dc
    ? `${dc} woorden die je moeite kosten`
    : 'Nog geen moeilijke woorden'

  // Daily streak card
  const dsc = document.getElementById('daily-streak-card')
  if (dsc) {
    document.getElementById('h-daily-streak').textContent = dailyStreak
    const lbl = document.getElementById('h-daily-streak-lbl')
    if (dailyStreak === 0) {
      lbl.textContent = 'Begin vandaag!'
    } else if (dailyStreak === 1) {
      lbl.textContent = 'dag op rij — goed begin!'
    } else {
      lbl.textContent = 'dagen op rij 🔥'
    }
  }

  const ss = document.getElementById('streak-section')
  if (streak > 0) {
    ss.style.display = ''
    document.getElementById('h-streak').textContent = streak
  } else {
    ss.style.display = 'none'
  }

  renderCategoryProgress()
}

// ── Category progress ─────────────────────────────────────

function renderCategoryProgress() {
  const container = document.getElementById('h-cat-progress')
  if (!container) return

  const entries = WORD_CATS.map(cat => {
    const total = cat.items.length
    const known = cat.items.filter(([no]) => isKnown(`word|${no}`)).length
    return { label: cat.label, known, total }
  })

  const phrasesTotal = PHRASE_CATS.reduce((sum, cat) => sum + cat.items.length, 0)
  const phrasesKnown = PHRASE_CATS.reduce((sum, cat) =>
    sum + cat.items.filter(([no]) => isKnown(`phrase|${no}`)).length, 0)
  entries.push({ label: 'Zinnen', known: phrasesKnown, total: phrasesTotal })

  container.innerHTML = entries.map(({ label, known, total }) => {
    const pct = total ? Math.round(known / total * 100) : 0
    return `
      <div class="cat-progress-card">
        <div class="cp-header">
          <span class="cp-label">${label}</span>
          <span class="cp-count">${known}/${total}</span>
        </div>
        <div class="cp-bar-wrap">
          <div class="cp-bar" style="width:${pct}%"></div>
        </div>
      </div>`
  }).join('')
}

// ── Reference ─────────────────────────────────────────────

function setupRef() {
  let filter = 'all'
  let query  = ''
  const body = document.getElementById('ref-body')
  const input = document.getElementById('ref-search')

  const render = () => renderReference(body, filter, query)

  document.getElementById('ref-chips').querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('ref-chips').querySelectorAll('.chip').forEach(c => c.classList.remove('active'))
      chip.classList.add('active')
      filter = chip.dataset.filter
      render()
    })
  })

  input.value = ''
  input.oninput = () => { query = input.value.toLowerCase().trim(); render() }
  render()
}

// ── Flashcards ───────────────────────────────────────────

function setupFC() {
  showFCSetup()

  document.getElementById('fc-start-btn').onclick = () => {
    const cat = getOptVal('fc-cat-opts')
    const dir = getOptVal('fc-dir-opts')

    const ok = startFlashcards({
      cat, dir,
      onCard: data => renderFCCard(data, dir),
      onDone: data => renderFCDone(data),
    })
    if (!ok) return alert('Geen items. Kies een andere categorie.')
    showFCPlay()
  }

  document.getElementById('fc-flip-btn').onclick   = flipCard
  document.getElementById('fc-bad-btn').onclick    = () => doFCAnswer('bad')
  document.getElementById('fc-good-btn').onclick   = () => doFCAnswer('good')
  document.getElementById('fc-stop-btn').onclick   = showFCSetup
  document.getElementById('fc-retry-btn').onclick  = () => document.getElementById('fc-start-btn').click()
  document.getElementById('fc-back-btn').onclick   = showFCSetup
}

function doFCAnswer(result) {
  const dir = getOptVal('fc-dir-opts')
  answer(result, dir,
    data => renderFCCard(data, dir),
    data => renderFCDone(data)
  )
}

function renderFCCard({ front, back, frontHint, backHint, cat, isRetry, remaining, retryCount, done, total }) {
  document.getElementById('fc-card').classList.remove('flipped')
  document.getElementById('ff-hint').textContent = frontHint
  document.getElementById('ff-word').textContent = front
  document.getElementById('ff-cat').textContent  = cat
  document.getElementById('fb-hint').textContent = backHint
  document.getElementById('fb-word').textContent = back
  document.getElementById('fb-cat').textContent  = cat
  document.getElementById('fb-retry').style.display = isRetry ? '' : 'none'

  const pct = total ? Math.round(done / total * 100) : 0
  document.getElementById('fc-pbar').style.width   = pct + '%'
  document.getElementById('fc-ptxt').textContent   = `${done}/${total}`
  document.getElementById('fc-b-rem').textContent  = `${remaining} over`
  document.getElementById('fc-b-retry').textContent = `${retryCount} herhaling`
  document.getElementById('fc-b-done').textContent = `${done} klaar`
}

function renderFCDone({ done }) {
  document.getElementById('fc-play-wrap').classList.remove('active')
  document.getElementById('fc-result-wrap').style.display = 'flex'
  const { known, total } = getStats(ALL_ITEMS, itemKey)
  document.getElementById('fc-res-score').textContent = `${known}/${total}`
  document.getElementById('fc-res-sub').textContent   = `${done} kaartjes doorlopen`
}

function showFCSetup() {
  document.getElementById('fc-setup-wrap').style.display   = ''
  document.getElementById('fc-play-wrap').classList.remove('active')
  document.getElementById('fc-result-wrap').style.display  = 'none'
}
function showFCPlay() {
  document.getElementById('fc-setup-wrap').style.display   = 'none'
  document.getElementById('fc-result-wrap').style.display  = 'none'
  document.getElementById('fc-play-wrap').classList.add('active')
}

// ── Quiz ─────────────────────────────────────────────────

function setupQuiz() {
  showQuizSetup()

  document.getElementById('quiz-start-btn').onclick = () => {
    const cat   = getOptVal('qz-cat-opts')
    const dir   = getOptVal('qz-dir-opts')
    const count = parseInt(getOptVal('qz-len-opts'))

    const ok = startQuiz({
      cat, direction: dir, count,
      onQuestion: data => renderQuizQuestion(data, dir),
      onResult:   data => renderQuizResult(data),
    })
    if (!ok) return alert('Niet genoeg items. Kies een andere categorie.')
    showQuizPlay()
  }

  document.getElementById('quiz-stop-btn').onclick   = showQuizSetup
  document.getElementById('quiz-retry-btn').onclick  = () => document.getElementById('quiz-start-btn').click()
  document.getElementById('quiz-back-btn').onclick   = showQuizSetup
}

function renderQuizQuestion({ question, choices, cat, round, isRetryRound, progress }, dir) {
  const { current, total, correct, wrong, retryCount } = progress
  const letters = ['A','B','C','D']
  const qLabel  = dir === 'no-nl' ? 'Wat betekent dit in het Nederlands?' : 'Hoe zeg je dit in het Noors?'

  document.getElementById('qz-pbar').style.width    = `${Math.round((current-1)/total*100)}%`
  document.getElementById('qz-ptxt').textContent    = `${current}/${total}`
  document.getElementById('qz-b-ok').textContent    = `${correct} goed`
  document.getElementById('qz-b-wrong').textContent = `${wrong} fout`
  document.getElementById('qz-b-retry').textContent = `${retryCount} herhaling`
  document.getElementById('quiz-next-wrap').style.display = 'none'

  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-round-tag ${isRetryRound ? 'r2' : 'r1'}">
      ${isRetryRound
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>'
        : ''}
      ${isRetryRound ? `Herhaling ronde ${round}` : `Ronde ${round}`}
    </div>
    <div class="quiz-q-label">${qLabel}</div>
    <div class="quiz-q-word">${question}</div>
    <div class="quiz-q-cat">${cat}</div>
    <div class="choices">
      ${choices.map((c, i) => `
        <button class="choice-btn" data-val="${c.replace(/"/g,'&quot;')}">
          <span class="choice-letter">${letters[i]}</span>${c}
        </button>
      `).join('')}
    </div>
    <div class="quiz-feedback" id="qfb"></div>
  `

  // Attach answer handlers
  document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const result = checkAnswer(
        btn.dataset.val,
        data => renderQuizQuestion(data, dir),
        data => renderQuizResult(data)
      )
      if (!result) return

      document.querySelectorAll('.choice-btn').forEach(b => {
        b.disabled = true
        if (b.dataset.val === result.correctAnswer) b.classList.add('correct')
      })
      if (!result.isRight) btn.classList.add('wrong')

      const fb = document.getElementById('qfb')
      fb.className = `quiz-feedback show ${result.isRight ? 'correct' : 'wrong'}`
      fb.innerHTML = result.isRight
        ? 'Goed zo!'
        : `Fout! Juiste antwoord: <strong>${result.correctAnswer}</strong> — komt terug 🔄`

      document.getElementById('qz-b-ok').textContent    = `${result.correct} goed`
      document.getElementById('qz-b-wrong').textContent = `${result.wrong} fout`
      document.getElementById('qz-b-retry').textContent = `${result.retryCount} herhaling`
      document.getElementById('quiz-next-wrap').style.display = ''
    })
  })

  document.getElementById('quiz-next-btn').onclick = () =>
    nextQuestion(
      data => renderQuizQuestion(data, dir),
      data => renderQuizResult(data)
    )
}

function renderQuizResult({ correct, wrong, round, total }) {
  showQuizResult()
  const pct   = total ? Math.round(correct / total * 100) : 0
  const title = pct >= 90 ? 'Uitstekend!' : pct >= 70 ? 'Goed gedaan!' : pct >= 50 ? 'Aardig bezig!' : 'Blijf oefenen!'

  document.getElementById('qr-title').textContent = title
  document.getElementById('qr-score').textContent = `${correct}/${total}`
  document.getElementById('qr-sub').textContent   = `${pct}% correct — ${round} ronde${round > 1 ? 'n' : ''} gespeeld`
  document.getElementById('qr-stats').innerHTML   = `
    <div class="result-stat"><div class="rs-val" style="color:var(--accent-d)">${correct}</div><div class="rs-lbl">Correct</div></div>
    <div class="result-stat"><div class="rs-val" style="color:var(--red)">${wrong}</div><div class="rs-lbl">Fout</div></div>
    <div class="result-stat"><div class="rs-val" style="color:var(--warm)">${round}</div><div class="rs-lbl">Rondes</div></div>
  `
}

function showQuizSetup() {
  document.getElementById('quiz-setup-wrap').style.display  = ''
  document.getElementById('quiz-play-wrap').classList.remove('active')
  document.getElementById('quiz-result-wrap').style.display = 'none'
}
function showQuizPlay() {
  document.getElementById('quiz-setup-wrap').style.display  = 'none'
  document.getElementById('quiz-result-wrap').style.display = 'none'
  document.getElementById('quiz-play-wrap').classList.add('active')
}
function showQuizResult() {
  document.getElementById('quiz-play-wrap').classList.remove('active')
  document.getElementById('quiz-result-wrap').style.display = 'flex'
}

// ── Typemode ─────────────────────────────────────────────

function setupType() {
  showTypeSetup()

  document.getElementById('type-start-btn').onclick = () => {
    const cat = getOptVal('type-cat-opts')
    const dir = getOptVal('type-dir-opts')

    const ok = startTyping({
      cat, dir,
      onCard: data => renderTypeCard(data),
      onDone: data => renderTypeDone(data),
    })
    if (!ok) return alert('Geen items. Kies een andere categorie.')
    showTypePlay()
  }

  const input  = document.getElementById('type-input')
  const submit = document.getElementById('type-submit')

  const doSubmit = () => {
    if (submit.disabled) return
    const result = submitAnswer(
      input.value,
      data => { renderTypeCard(data); resetTypeInput() },
      data => renderTypeDone(data)
    )
    if (!result) return
    renderTypeFeedback(result)
  }

  submit.onclick = doSubmit
  input.onkeydown = e => { if (e.key === 'Enter') doSubmit() }

  document.getElementById('type-next-btn').onclick = () => {
    nextCard(
      data => { renderTypeCard(data); resetTypeInput() },
      data => renderTypeDone(data)
    )
  }

  document.getElementById('type-stop-btn').onclick  = showTypeSetup
  document.getElementById('type-retry-btn').onclick = () => document.getElementById('type-start-btn').click()
  document.getElementById('type-back-btn').onclick  = showTypeSetup
}

function renderTypeCard({ word, hint, cat, isRetry, remaining, retryCount, done, total }) {
  document.getElementById('type-hint').textContent  = hint
  document.getElementById('type-word').textContent  = word
  document.getElementById('type-cat').textContent   = cat
  document.getElementById('type-retry-tag').style.display = isRetry ? '' : 'none'

  const pct = total ? Math.round(done / total * 100) : 0
  document.getElementById('type-pbar').style.width    = pct + '%'
  document.getElementById('type-ptxt').textContent    = `${done}/${total}`
  document.getElementById('type-b-rem').textContent   = `${remaining} over`
  document.getElementById('type-b-retry').textContent = `${retryCount} herhaling`
  document.getElementById('type-b-done').textContent  = `${done} klaar`
}

function renderTypeFeedback(result) {
  const fb      = document.getElementById('type-feedback')
  const nextBtn = document.getElementById('type-next-btn')
  const input   = document.getElementById('type-input')
  const submit  = document.getElementById('type-submit')

  input.disabled  = true
  submit.disabled = true

  if (result.isCorrect) {
    fb.className = 'type-feedback show correct'
    fb.textContent = 'Goed! ✓'
    input.classList.add('correct')
    nextBtn.style.display = 'none'
  } else if (result.isAlmost) {
    fb.className = 'type-feedback show almost'
    fb.textContent = `Bijna! Het was: ${result.correctAnswer}`
    input.classList.add('almost')
    nextBtn.style.display = ''
  } else {
    fb.className = 'type-feedback show wrong'
    fb.textContent = `Fout! Het was: ${result.correctAnswer}`
    input.classList.add('wrong')
    nextBtn.style.display = ''
  }
}

function resetTypeInput() {
  const input  = document.getElementById('type-input')
  const submit = document.getElementById('type-submit')
  const fb     = document.getElementById('type-feedback')
  const nextBtn = document.getElementById('type-next-btn')

  input.value    = ''
  input.disabled = false
  input.className = 'type-input'
  submit.disabled = false
  fb.className    = 'type-feedback'
  fb.textContent  = ''
  nextBtn.style.display = 'none'
  input.focus()
}

function renderTypeDone({ done }) {
  document.getElementById('type-play-wrap').classList.remove('active')
  document.getElementById('type-result-wrap').style.display = 'flex'
  const { known, total } = getStats(ALL_ITEMS, itemKey)
  document.getElementById('type-res-score').textContent = `${done}`
  document.getElementById('type-res-sub').textContent   = `${done} woorden getypt — ${known}/${total} totaal geleerd`
}

function showTypeSetup() {
  document.getElementById('type-setup-wrap').style.display  = ''
  document.getElementById('type-play-wrap').classList.remove('active')
  document.getElementById('type-result-wrap').style.display = 'none'
}

function showTypePlay() {
  document.getElementById('type-setup-wrap').style.display  = 'none'
  document.getElementById('type-result-wrap').style.display = 'none'
  document.getElementById('type-play-wrap').classList.add('active')
  resetTypeInput()
}

// ── Moeilijk ─────────────────────────────────────────────

function renderDiff() {
  renderDifficult(document.getElementById('diff-body'), getDifficult())
}

// ── Logout ───────────────────────────────────────────────

function setupLogout(user) {
  const btn = document.getElementById('logout-btn')
  if (!btn) return
  const label = document.getElementById('user-email')
  if (label) label.textContent = user.email
  btn.addEventListener('click', async () => {
    await signOut()
    window.location.href = 'index.html'
  })
}

// ── Notifications ─────────────────────────────────────────

async function requestNotificationPermission() {
  if (!('Notification' in window)) return
  if (localStorage.getItem('norsk_notif_asked')) return
  setTimeout(async () => {
    await Notification.requestPermission()
    localStorage.setItem('norsk_notif_asked', 'true')
  }, 10000)
}

function scheduleStudyReminder() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  const now = new Date()
  const target = new Date(now)
  target.setHours(20, 0, 0, 0)
  if (target <= now) target.setDate(target.getDate() + 1)
  const msUntil2000 = target - now
  setTimeout(() => {
    const today = new Date().toISOString().slice(0, 10)
    let data = { streak: 0, lastStudied: null }
    try {
      const raw = localStorage.getItem('norsk_daily')
      if (raw) data = JSON.parse(raw)
    } catch { /* ignore */ }
    if (data.lastStudied !== today) {
      new Notification('Norsk leren 🇳🇴', {
        body: `Je hebt vandaag nog niet geoefend! Je streak is ${data.streak} dagen.`,
        icon: '/icon-192.png'
      })
    }
  }, msUntil2000)
}

// ── Helpers ───────────────────────────────────────────────

function getOptVal(groupId) {
  return document.getElementById(groupId)?.querySelector('.opt-btn.active')?.dataset.val ?? ''
}

// Option button toggling (delegated setup)
export function setupOptButtons() {
  document.querySelectorAll('[data-opt-group]').forEach(group => {
    group.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
      })
    })
  })
}
