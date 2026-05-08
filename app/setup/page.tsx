import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup",
  description: "Setup notes for Turso, Vercel environment variables, and adding projects."
};

const envSnippet = `TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-token`;

const projectSnippet = `{
  slug: "new-project",
  title: "New Project",
  shortDescription: "A short one-line summary.",
  longDescription: "A longer description for the project detail page.",
  technologies: ["Next.js", "TypeScript", "Turso"],
  status: "Prototype",
  projectUrl: "https://example.com",
  githubUrl: "https://github.com/your-github/new-project",
  featured: false,
  createdAt: "2026-05-08T00:00:00.000Z",
  updatedAt: "2026-05-08T00:00:00.000Z"
}`;

export default function SetupPage() {
  return (
    <section>
      <p className="eyebrow">Setup</p>
      <h1 className="page-title">Manage projects and env vars without guessing.</h1>
      <p className="page-intro">
        This page is a small control reference for the two things you’ll update
        most often: Turso credentials and project entries.
      </p>

      <section id="vercel-env" className="section">
        <div className="section-header">
          <h2 className="section-title">Vercel environment variables</h2>
          <p className="section-text">
            Add these exact keys in your Vercel project under Settings and then
            redeploy.
          </p>
        </div>
        <div className="stacked-copy">
          <pre className="code-block">
            <code>{envSnippet}</code>
          </pre>
          <ol className="steps-list">
            <li>Open your Vercel project.</li>
            <li>Go to <strong>Settings</strong> then <strong>Environment Variables</strong>.</li>
            <li>Add `TURSO_DATABASE_URL` with your Turso database URL.</li>
            <li>Add `TURSO_AUTH_TOKEN` with your Turso auth token.</li>
            <li>Save the variables and redeploy the site.</li>
          </ol>
          <div className="note-block">
            <p style={{ margin: 0 }}>
              Use the same values locally in `.env.local` if you want the site
              and seed script to read from the real database on your machine.
            </p>
          </div>
        </div>
      </section>

      <section id="add-projects" className="section">
        <div className="section-header">
          <h2 className="section-title">Add a project</h2>
          <p className="section-text">
            The fastest workflow is still one file: edit the project list, then
            run the seed command.
          </p>
        </div>
        <div className="stacked-copy">
          <ol className="steps-list">
            <li>Open `db/seed-projects.ts`.</li>
            <li>Add a new object to the `seedProjects` array using the template below.</li>
            <li>Keep the `slug` unique because it becomes the project URL.</li>
            <li>Run `npm run seed` to insert or update the project in Turso.</li>
          </ol>
          <pre className="code-block">
            <code>{projectSnippet}</code>
          </pre>
          <div className="note-block">
            <p style={{ margin: 0 }}>
              `featured: true` makes a project appear on the homepage. Running
              the seed command again safely updates existing projects by `slug`.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
