import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://axel.dev";
  const projects = await getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/contact", "/work"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.7
    })
  );

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.6
  }));

  return [...staticRoutes, ...projectRoutes];
}
