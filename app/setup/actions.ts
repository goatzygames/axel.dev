'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { projectStatuses } from "@/lib/projects";

const setupCookieName = "axel_setup_access";
const setupPassword = "Hamsters2580";

export type SetupActionState = {
  error?: string;
  success?: string;
};

function normalizeOptionalValue(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : null;
}

async function ensureAuthorized() {
  const cookieStore = await cookies();
  return cookieStore.get(setupCookieName)?.value === "granted";
}

async function ensureProjectsTable() {
  const db = getDb();

  if (!db) {
    throw new Error("Database is not configured.");
  }

  await db.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      short_description TEXT NOT NULL,
      long_description TEXT NOT NULL,
      technologies TEXT NOT NULL,
      status TEXT NOT NULL,
      project_url TEXT,
      github_url TEXT,
      image_url TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  return db;
}

export async function unlockSetup(
  _previousState: SetupActionState,
  formData: FormData
): Promise<SetupActionState> {
  const password = formData.get("password");

  if (password !== setupPassword) {
    return {
      error: "Incorrect password."
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(setupCookieName, "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return {
    success: "Access granted."
  };
}

export async function lockSetup() {
  const cookieStore = await cookies();
  cookieStore.delete(setupCookieName);
  redirect("/");
}

export async function saveProjectAction(
  _previousState: SetupActionState,
  formData: FormData
): Promise<SetupActionState> {
  const authorized = await ensureAuthorized();

  if (!authorized) {
    return {
      error: "Setup access expired. Re-enter the password."
    };
  }

  const slug = normalizeOptionalValue(formData.get("slug"));
  const title = normalizeOptionalValue(formData.get("title"));
  const shortDescription = normalizeOptionalValue(formData.get("shortDescription"));
  const longDescription = normalizeOptionalValue(formData.get("longDescription"));
  const technologiesInput = normalizeOptionalValue(formData.get("technologies"));
  const status = normalizeOptionalValue(formData.get("status"));
  const projectUrl = normalizeOptionalValue(formData.get("projectUrl"));
  const githubUrl = normalizeOptionalValue(formData.get("githubUrl"));
  const imageUrl = normalizeOptionalValue(formData.get("imageUrl"));
  const featured = formData.get("featured") === "on";
  const createdAtInput = normalizeOptionalValue(formData.get("createdAt"));
  const updatedAtInput = normalizeOptionalValue(formData.get("updatedAt"));

  if (!slug || !title || !shortDescription || !longDescription || !technologiesInput || !status) {
    return {
      error: "Fill in slug, title, descriptions, technologies, and status."
    };
  }

  if (!projectStatuses.includes(status as (typeof projectStatuses)[number])) {
    return {
      error: "Invalid status value."
    };
  }

  const technologies = technologiesInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (technologies.length === 0) {
    return {
      error: "Add at least one technology."
    };
  }

  const now = new Date().toISOString();
  const createdAt = createdAtInput
    ? new Date(`${createdAtInput}T00:00:00.000Z`).toISOString()
    : now;
  const updatedAt = updatedAtInput
    ? new Date(`${updatedAtInput}T00:00:00.000Z`).toISOString()
    : now;

  try {
    const db = await ensureProjectsTable();

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
        slug,
        title,
        shortDescription,
        longDescription,
        JSON.stringify(technologies),
        status,
        projectUrl,
        githubUrl,
        imageUrl,
        featured ? 1 : 0,
        createdAt,
        updatedAt
      ]
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to save project."
    };
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${slug}`);
  revalidatePath("/setup");

  return {
    success: `Saved ${title}.`
  };
}

export async function hasSetupAccess() {
  return ensureAuthorized();
}
