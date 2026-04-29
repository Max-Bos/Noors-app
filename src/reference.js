import { WORD_CATS, PHRASE_CATS, ALL_ITEMS, itemKey } from './data.js'
import { isKnown } from './progress.js'

// ── Render woordenboek ───────────────────────────────────

export function renderReference(container, filter = 'all', query = '') {
  container.innerHTML = ''
  let wn = 1

  if (filter !== 'phrases') {
    WORD_CATS.forEach(cat => {
      const section = _section(cat.label)
      const list = document.createElement('div')
      list.className = 'word-list'

      cat.items.forEach(([no, nl]) => {
        const key = `word|${no}`
        if (query && !no.toLowerCase().includes(query) && !nl.toLowerCase().includes(query)) return

        const row = document.createElement('div')
        row.className = `word-row${isKnown(key) ? ' known' : ''}`
        row.innerHTML = `
          <span class="wr-n">${wn++}</span>
          <span class="wr-no">${no}</span>
          <span class="wr-nl">${nl}</span>
          <span class="wr-dot"></span>
        `
        list.appendChild(row)
      })

      if (list.children.length) { section.appendChild(list); container.appendChild(section) }
    })
  }

  if (filter !== 'words') {
    const ph = document.createElement('div')
    ph.className = 'cat-header'; ph.textContent = 'Zinnen'
    container.appendChild(ph)

    PHRASE_CATS.forEach(cat => {
      const ch = document.createElement('div')
      ch.className = 'cat-header'
      ch.style.paddingTop = '0.2rem'
      ch.textContent = '— ' + cat.tag
      container.appendChild(ch)

      cat.items.forEach(([no, nl]) => {
        if (query && !no.toLowerCase().includes(query) && !nl.toLowerCase().includes(query)) return
        const key = `phrase|${no}`
        const card = document.createElement('div')
        card.className = `phrase-card${isKnown(key) ? ' known' : ''}`
        card.innerHTML = `
          <div class="pc-no">${no}</div>
          <div class="pc-nl">${nl}</div>
          <div class="pc-tag">${cat.tag}</div>
        `
        container.appendChild(card)
      })
    })
  }
}

// ── Render moeilijke woorden ─────────────────────────────

export function renderDifficult(container, difficult) {
  const entries = Object.entries(difficult).sort((a, b) => b[1] - a[1])

  if (!entries.length) {
    container.innerHTML = `
      <div class="diff-empty">
        <div class="de-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
        </div>
        <div class="de-title">Geen moeilijke woorden!</div>
        <div class="de-sub">Foute woorden bij flashcards en quiz verschijnen hier automatisch.</div>
      </div>
    `
    return
  }

  const colors = ['#c97060','#c98a60','#b8a840','#74a874','#6dbf72']
  container.innerHTML = ''
  entries.forEach(([key, count]) => {
    const item = ALL_ITEMS.find(i => itemKey(i) === key)
    if (!item) return
    const lvl = Math.min(count - 1, 4)
    const div = document.createElement('div')
    div.className = 'diff-item'
    div.innerHTML = `
      <div class="di-bar" style="background:${colors[lvl]}"></div>
      <div class="di-no">${item.no}</div>
      <div class="di-nl">${item.nl}</div>
      <div class="di-count">${count}×</div>
    `
    container.appendChild(div)
  })
}

// ── Helper ───────────────────────────────────────────────

function _section(label) {
  const el = document.createElement('div')
  el.innerHTML = `<div class="cat-header">${label}</div>`
  return el
}
