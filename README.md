# Buildison Agency (React version)

Ito ang React version ng Buildison HTML site. Pareho ang itsura, pero nakahati na sa **components** at nakahiwalay ang **content** sa isang data file.

## Paano patakbuhin

Kailangan ng [Node.js LTS](https://nodejs.org).

```bash
npm install
npm run dev
```

Buksan ang link na lalabas (karaniwang http://localhost:5173).

Para gumawa ng final files na ia-upload (sa Vercel, Netlify, o hosting): `npm run build`, at nasa `dist/` folder ang output.

## Live site at auto-deploy

- Website: https://buildison-react.vercel.app
- Admin: https://buildison-react.vercel.app/#/admin

Naka-connect ang Vercel sa GitHub repo na ito. Tuwing mag-`git push` sa `main`, kusang magde-deploy ang Vercel. Nasa Vercel project settings (Environment Variables) ang Supabase keys, hindi sa repo.

## Saan makikita ang ano

```
src/
├── data/site.js        ← LAHAT ng text, presyo, features, contact (dito ka mag-e-edit)
├── App.jsx             ← Pagkakasunod-sunod ng mga section ng page
├── index.css           ← Design (kapareho ng original CSS)
├── lib/motion.js       ← Helper: reduced motion / mouse detection
└── components/
    ├── Header.jsx      ← Logo + menu (useState para sa mobile menu)
    ├── Hero.jsx        ← Headline + rolling stats
    ├── Marquee.jsx     ← Gumagalaw na listahan ng channels
    ├── FeatureRow.jsx  ← Isang text + screen row (5 beses ginamit)
    ├── Screens.jsx     ← Ang 5 mock app screens
    ├── Unlimited.jsx   ← "Unlimited" + feature grid
    ├── HowItWorks.jsx  ← 3 steps
    ├── Pricing.jsx     ← Plans + annual/monthly toggle
    ├── Footer.jsx
    ├── ChatBubble.jsx
    ├── CountUp.jsx     ← Number na nagbibilang pataas
    ├── BackgroundFx.jsx, CursorTrail.jsx, SoundToggle.jsx ← Effects
    ├── Cta.jsx, Logo.jsx ← Maliliit na reusable pieces
```

## Ano ang nagbago kumpara sa HTML

| HTML version | React version |
|---|---|
| Kinopya nang 3 beses ang pricing card | Isang `<Plan>` component, galing sa `plans` array |
| 5 halos magkaparehong feature rows | Isang `<FeatureRow>` component |
| `document.getElementById(...)` at `classList.toggle` | `useState`, React na ang nag-a-update ng page |
| Mano-manong nakasulat ang pipeline total ($9,950) | Kinukuwenta mula sa mga deal |
| Para magpalit ng presyo, hanapin sa HTML | I-edit lang ang `src/data/site.js` |

Inalis ang GoHighLevel-specific na code (ang pag-alis ng padding ng builder), dahil hindi na ito kailangan sa standalone na React site.

## Mga PLACEHOLDER na dapat palitan

Lahat ay nasa `src/data/site.js`: checkout links, promo code, contact details, login/privacy/terms links. Para sa background music, tingnan ang `MUSIC_URL` sa `src/components/SoundToggle.jsx`.

## Supabase (pricing galing sa database)

Kinukuha ang pricing plans sa Supabase `plans` table. Kung wala pang Supabase keys, o kung mag-fail ang connection, ang plans sa `src/data/site.js` ang ipapakita.

1. Patakbuhin ang [supabase/plans.sql](supabase/plans.sql) sa Supabase SQL Editor. Gagawin nito ang table, ang security (read-only para sa public), at ang laman.
2. Kopyahin ang `.env.example` papuntang `.env` at ilagay ang Project URL at anon/publishable key.
3. I-restart ang `npm run dev`.
4. Para magpalit ng presyo: Supabase → Table Editor → `plans`, tapos i-refresh ang website.

Mga file: `src/lib/supabase.js` (connection) at `src/lib/usePlans.js` (kumukuha ng plans).

## Admin page (pag-edit ng presyo mula sa website)

Buksan ang **http://localhost:5173/#/admin**, mag-log in, i-edit ang plan, at pindutin ang **Save changes**.

Dalawang layer ng security:
1. **Login** (Supabase Auth, email + password)
2. **`admins` table**: kahit naka-login, kailangang nakalista ang user dito para makapag-edit. Ito ang ginagawa ng [supabase/admin.sql](supabase/admin.sql).

Para magdagdag ng admin:
1. Supabase → **Authentication → Users → Add user → Create new user** (lagyan ng check ang "Auto Confirm User").
2. SQL Editor: `insert into public.admins (user_id) select id from auth.users where email = 'email@nila.com';`

Mga file: `src/admin/AdminApp.jsx` (login + access check), `src/admin/PlansEditor.jsx` (edit form), `src/admin/admin.css`.
