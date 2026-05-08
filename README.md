# axel.dev

A minimal personal developer portfolio built with Next.js, TypeScript, and Turso.

## Stack

- Next.js App Router
- TypeScript
- Plain CSS with a small global stylesheet
- Turso / libSQL for project content
- Vercel-friendly file structure and environment setup

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env.local
```

3. Add your Turso credentials to `.env.local`:

```bash
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-token
```

4. Start the dev server:

```bash
npm run dev
```

5. Open `http://localhost:3000`

If Turso is not configured yet, the site falls back to the local seed data in [db/seed-projects.ts](/Users/axel/Documents/Apps/axel.dev/db/seed-projects.ts:1) so you can still preview the UI.

## Turso setup

Create a database with the Turso CLI or dashboard, then use the generated database URL and auth token as:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

Schema lives in [db/schema.sql](/Users/axel/Documents/Apps/axel.dev/db/schema.sql:1).

## Seed projects

Projects are easiest to manage through the single seed file:

- Edit [db/seed-projects.ts](/Users/axel/Documents/Apps/axel.dev/db/seed-projects.ts:1)
- Run:

```bash
npm run seed
```

This will create the `projects` table if needed and upsert every project by `slug`.

## Project structure

```text
app/
  about/
  contact/
  work/
components/
db/
lib/
scripts/
```

## Where to edit content

- Home/about/contact copy: files inside `app/`
- Header links: [components/site-header.tsx](/Users/axel/Documents/Apps/axel.dev/components/site-header.tsx:1)
- Footer text: [components/site-footer.tsx](/Users/axel/Documents/Apps/axel.dev/components/site-footer.tsx:1)
- Portfolio project entries: [db/seed-projects.ts](/Users/axel/Documents/Apps/axel.dev/db/seed-projects.ts:1)
- Site metadata and branding: [app/layout.tsx](/Users/axel/Documents/Apps/axel.dev/app/layout.tsx:1)

## Vercel deployment

Set these environment variables in Vercel:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

The app is ready for standard Next.js deployment on Vercel.

## Tools used

- `next`
- `react`
- `react-dom`
- `@libsql/client`
- `typescript`
- `tsx`
- `eslint`
- `eslint-config-next`
