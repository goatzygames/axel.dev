import Link from "next/link";
import type { Project } from "@/lib/projects";
import { formatProjectDate } from "@/lib/format";

type ProjectListProps = {
  projects: Project[];
  showDates?: boolean;
};

export function ProjectList({ projects, showDates = false }: ProjectListProps) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article key={project.slug} className="project-row">
          <div className="stacked-copy">
            <div className="project-heading">
              <h3 className="project-title">
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h3>
              <span className="project-meta">{project.status}</span>
            </div>
            <p style={{ margin: 0 }}>{project.shortDescription}</p>
            <ul className="tech-list" aria-label={`${project.title} technologies`}>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>

          <div className="stacked-copy">
            {showDates ? (
              <p className="project-meta" style={{ margin: 0 }}>
                Updated {formatProjectDate(project.updatedAt)}
              </p>
            ) : null}
            <div className="inline-links" style={{ marginTop: 0 }}>
              <Link href={`/work/${project.slug}`}>Details</Link>
              {project.projectUrl ? (
                <a href={project.projectUrl} target="_blank" rel="noreferrer">
                  Live
                </a>
              ) : null}
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
