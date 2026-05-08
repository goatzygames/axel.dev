import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "@libsql/client";
import { seedProjects } from "../db/seed-projects";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error(
      "Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN. Add them to your environment before seeding."
    );
  }

  const schemaPath = path.join(process.cwd(), "db", "schema.sql");
  const schemaSql = await readFile(schemaPath, "utf8");
  const db = createClient({ url, authToken });

  const statements = schemaSql
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await db.execute(statement);
  }

  for (const project of seedProjects) {
    await db.execute({
      sql: `
        INSERT INTO projects (
          slug,
          title,
          short_description,
          long_description,
          technologies,
          status,
          project_url,
          github_url,
          image_url,
          featured,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(slug) DO UPDATE SET
          title = excluded.title,
          short_description = excluded.short_description,
          long_description = excluded.long_description,
          technologies = excluded.technologies,
          status = excluded.status,
          project_url = excluded.project_url,
          github_url = excluded.github_url,
          image_url = excluded.image_url,
          featured = excluded.featured,
          created_at = excluded.created_at,
          updated_at = excluded.updated_at
      `,
      args: [
        project.slug,
        project.title,
        project.shortDescription,
        project.longDescription,
        JSON.stringify(project.technologies),
        project.status,
        project.projectUrl || null,
        project.githubUrl || null,
        project.imageUrl || null,
        project.featured ? 1 : 0,
        project.createdAt,
        project.updatedAt
      ]
    });
  }

  console.log(`Seeded ${seedProjects.length} project(s) into Turso.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
