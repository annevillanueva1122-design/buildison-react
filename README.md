# Buildison Agency (React version)

The React version of the Buildison HTML site. It looks the same, but the page is split into **components** and all the **content** lives in one data file.

## Run it locally

Requires [Node.js LTS](https://nodejs.org).

```bash
npm install
npm run dev
```

Open the link it prints (usually http://localhost:5173).

To build the production files (for Vercel, Netlify or any host): `npm run build`. The output goes to the `dist/` folder.

## Live site and auto-deploy

- Website: https://buildison-react.vercel.app
- Admin: https://buildison-react.vercel.app/#/admin

Vercel is connected to this repo, so every `git push` to `main` deploys automatically. The Supabase keys live in the Vercel project settings (Environment Variables), not in the repo.

## Where things are

```
src/
├── data/site.js        ← ALL text, prices, features and contact details (edit here)
├── App.jsx             ← Order of the page sections
├── index.css           ← Design (same as the original CSS)
├── lib/motion.js       ← Helper: reduced motion / mouse detection
└── components/
    ├── Header.jsx      ← Logo + menu (useState for the mobile menu)
    ├── Hero.jsx        ← Headline + rolling stats
    ├── Marquee.jsx     ← Scrolling list of channels
    ├── FeatureRow.jsx  ← One text + screen row (used 5 times)
    ├── Screens.jsx     ← The 5 mock app screens
    ├── Unlimited.jsx   ← "Unlimited" + feature grid
    ├── HowItWorks.jsx  ← 3 steps
    ├── Pricing.jsx     ← Plans + annual/monthly toggle
    ├── Footer.jsx
    ├── ChatBubble.jsx
    ├── CountUp.jsx     ← Number that counts up
    ├── BackgroundFx.jsx, CursorTrail.jsx, SoundToggle.jsx ← Effects
    ├── Cta.jsx, Logo.jsx ← Small reusable pieces
```

## What changed from the HTML version

| HTML version | React version |
|---|---|
| Pricing card copied 3 times | One `<Plan>` component, rendered from the `plans` array |
| 5 near-identical feature rows | One `<FeatureRow>` component |
| `document.getElementById(...)` and `classList.toggle` | `useState`, React updates the page |
| Pipeline total ($9,950) written by hand | Calculated from the deals |
| To change a price, search the HTML | Edit `src/data/site.js` |

The GoHighLevel-specific code (removing the builder's padding) was dropped, since a standalone React site doesn't need it.

## Placeholders to replace

All of them are in `src/data/site.js`: checkout links, promo code, contact details, and login/privacy/terms links. For background music, see `MUSIC_URL` in `src/components/SoundToggle.jsx`.

## Supabase (pricing from the database)

Pricing plans are loaded from the Supabase `plans` table. If there are no Supabase keys yet, or the connection fails, the plans in `src/data/site.js` are shown instead.

1. Run [supabase/plans.sql](supabase/plans.sql) in the Supabase SQL Editor. It creates the table, the security policy (read-only for the public) and the data.
2. Copy `.env.example` to `.env` and add the Project URL and anon/publishable key.
3. Restart `npm run dev`.
4. To change a price: Supabase → Table Editor → `plans`, then refresh the website.

Files: `src/lib/supabase.js` (connection) and `src/lib/usePlans.js` (loads the plans).

## Admin page (edit prices from the website)

Open **http://localhost:5173/#/admin**, log in, edit a plan and click **Save changes**.

Two layers of security:
1. **Login** (Supabase Auth, email + password)
2. **`admins` table**: even when logged in, a user must be listed here to edit. This is set up by `supabase/admin.sql`.

To add an admin:

1. Supabase → Authentication → Users → Add user → Create new user (check "Auto Confirm User").
2. SQL Editor: `insert into public.admins (user_id) select id from auth.users where email = 'their@email.com';`

Files: `src/admin/AdminApp.jsx` (login + access check), `src/admin/PlansEditor.jsx` (edit form), `src/admin/admin.css`.
