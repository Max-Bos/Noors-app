# Norsk Leren 🇳🇴

Noors leren met flashcards en quiz. Per-user progress via Supabase.

## Bestandsstructuur

```
norsk-app/
├── index.html          ← login / signup pagina
├── app.html            ← hoofdapp (auth-protected)
├── manifest.json       ← PWA manifest
├── sw.js               ← service worker (offline support)
├── icon-192.png        ← app icoontje
├── icon-512.png        ← app icoontje (groot)
├── src/
│   ├── config.js       ← Supabase credentials ← VEREIST AANPASSEN
│   ├── data.js         ← alle woorden & zinnen
│   ├── auth.js         ← login, signup, logout
│   ├── progress.js     ← progress sync met Supabase
│   ├── flashcard.js    ← flashcard logica
│   ├── quiz.js         ← quiz logica
│   ├── reference.js    ← woordenboek renderer
│   └── app.js          ← navigatie + pagina controllers
└── styles/
    └── main.css        ← alle CSS
```

## Setup

### 1. Supabase tabel aanmaken

Voer dit SQL uit in je Supabase project → SQL Editor:

```sql
create table user_progress (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null unique,
  known      jsonb default '{}',
  difficult  jsonb default '{}',
  streak     int  default 0,
  updated_at timestamptz default now()
);

-- Row Level Security: elke user ziet alleen zijn eigen data
alter table user_progress enable row level security;

create policy "Users manage own progress"
  on user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### 2. Credentials invullen

Open `src/config.js` en vul in:

```js
export const SUPABASE_URL      = 'https://jouw-project.supabase.co'
export const SUPABASE_ANON_KEY = 'jouw-anon-key'
```

Te vinden in: Supabase dashboard → Project Settings → API

### 3. GitHub Pages

1. Maak een nieuwe GitHub repo aan (bijv. `norsk-app`)
2. Push alle bestanden naar de `main` branch
3. Ga naar Settings → Pages → Source: Deploy from branch → main / root
4. Na ~1 minuut live op: `https://jouwusername.github.io/norsk-app`

> **Let op:** Als je repo op een subpad staat (`/norsk-app`), pas dan in `manifest.json` aan:
> `"start_url": "/norsk-app/index.html"`

### 4. Als PWA installeren

- **Android (Chrome):** open de site → menu → "Toevoegen aan startscherm"
- **iOS (Safari):** open de site → deelknop → "Zet op beginscherm"

De app opent daarna zonder browserbalk als echte standalone app.

## Technische keuzes

| Onderdeel | Keuze |
|-----------|-------|
| Auth | Supabase Auth |
| Database | Supabase (Postgres) |
| Modules | ES Modules (type="module") |
| Supabase client | esm.sh CDN import |
| Styling | Vanilla CSS |
| Offline | Service Worker |

## Progress sync strategie

- Wijzigingen worden lokaal bijgehouden in geheugen
- Na 3 seconden inactiviteit → automatisch opslaan naar Supabase
- Bij `visibilitychange` (app naar achtergrond) → direct opslaan
- Bij laden → ophalen uit Supabase, merge met eventuele lokale data
