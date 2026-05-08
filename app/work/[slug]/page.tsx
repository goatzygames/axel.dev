import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatProjectDate } from "@/lib/format";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found"
    };
  }

  return {
    title: project.title,
    description: project.shortDescription
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <p className="eyebrow">Project</p>
      <h1 className="page-title">{project.title}</h1>
      <p className="page-intro">{project.shortDescription}</p>

      <div className="detail-grid">
        <div className="stacked-copy">
          {project.imageUrl ? (
            <div className="image-frame">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={1400}
                height={900}
                priority
              />
            </div>
          ) : null}

          <p className="body-copy">{project.longDescription}</p>

          <div className="inline-links">
            {project.projectUrl ? (
              <a href={project.projectUrl} target="_blank" rel="noreferrer">
                Visit project
              </a>
            ) : null}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                View source
              </a>
            ) : null}
            <Link href="/work">Back to work</Link>
          </div>
        </div>

        <aside className="detail-aside">
          <div className="detail-list">
            <div>
              <p className="detail-label">Status</p>
              <p className="detail-value">{project.status}</p>
            </div>
            <div>
              <p className="detail-label">Technologies</p>
              <p className="detail-value">{project.technologies.join(", ")}</p>
            </div>
            <div>
              <p className="detail-label">Updated</p>
              <p className="detail-value">{formatProjectDate(project.updatedAt)}</p>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
