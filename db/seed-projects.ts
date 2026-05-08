import type { ProjectStatus } from "@/lib/projects";

export type SeedProject = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  status: ProjectStatus;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

// Edit this file to add or update portfolio projects, then run `npm run seed`.
export const seedProjects: SeedProject[] = [
  {
    slug: "mazec",
    title: "Mazec",
    shortDescription:
      "A web-based 3D maze game engine inspired by Scratch, with block-based logic and scripting.",
    longDescription:
      "Mazec explores a friendlier way to build 3D maze games in the browser. It combines visual logic, lightweight scripting, and quick iteration so level design and gameplay rules can be shaped without a heavy engine workflow.",
    technologies: ["Vite", "Three.js", "Supabase", "JavaScript"],
    status: "Alpha",
    projectUrl: "",
    githubUrl: "",
    featured: true,
    createdAt: "2025-09-15T00:00:00.000Z",
    updatedAt: "2026-04-15T00:00:00.000Z"
  },
  {
    slug: "remotemac",
    title: "RemoteMac",
    shortDescription:
      "A browser-based remote control experiment for connecting a Mac and tablet.",
    longDescription:
      "RemoteMac is an experiment in low-friction remote interaction between desktop and tablet devices. The goal is to see how much of a native-feeling control surface can be recreated with modern browser APIs, real-time communication, and a restrained UI.",
    technologies: ["Next.js", "WebRTC", "Turso"],
    status: "Prototype",
    projectUrl: "",
    githubUrl: "",
    featured: true,
    createdAt: "2025-11-02T00:00:00.000Z",
    updatedAt: "2026-03-12T00:00:00.000Z"
  }
];
