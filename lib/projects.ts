import { getDb } from "@/lib/db";
import { seedProjects } from "@/db/seed-projects";

export type ProjectStatus = "Alpha" | "Finished" | "Prototype" | "Archived";
export const projectStatuses: ProjectStatus[] = [
  "Alpha",
  "Finished",
  "Prototype",
  "Archived"
];

export type Project = {
  id: number | null;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  status: ProjectStatus;
  projectUrl: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  technologies: string;
  status: string;
  project_url: string | null;
  github_url: string | null;
  image_url: string | null;
  featured: number;
  created_at: string;
  updated_at: string;
};

function mapSeedProject(project: (typeof seedProjects)[number]): Project {
  return {
    id: null,
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    longDescription: project.longDescription,
    technologies: project.technologies,
    status: project.status,
    projectUrl: project.projectUrl ?? null,
    githubUrl: project.githubUrl ?? null,
    imageUrl: project.imageUrl ?? null,
    featured: project.featured,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
}

function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    technologies: JSON.parse(row.technologies) as string[],
    status: row.status as ProjectStatus,
    projectUrl: row.project_url,
    githubUrl: row.github_url,
    imageUrl: row.image_url,
    featured: Boolean(row.featured),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function sortProjects(projects: Project[]) {
  return [...projects].sort(
    (left, right) =>
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  );
}

async function readProjectsFromDb() {
  const db = getDb();

  if (!db) {
    return null;
  }

  const result = await db.execute(
    `SELECT
      id,
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
    FROM projects
    ORDER BY updated_at DESC, created_at DESC`
  );

  return result.rows.map((row) => mapProjectRow(row as unknown as ProjectRow));
}

export async function getAllProjects() {
  try {
    const projects = await readProjectsFromDb();
    if (projects) {
      return projects;
    }
  } catch (error) {
    console.warn("Falling back to local project seed data.", error);
  }

  return sortProjects(seedProjects.map(mapSeedProject));
}

export async function getFeaturedProjects() {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}
