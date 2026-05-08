'use client';

import { useActionState, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { lockSetup, saveProjectAction, type SetupActionState } from "@/app/setup/actions";
import { projectStatuses, type Project } from "@/lib/projects";

type SetupManagerProps = {
  projects: Project[];
};

type FormValues = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string;
  status: string;
  projectUrl: string;
  githubUrl: string;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

const initialActionState: SetupActionState = {};

function toInputDate(value: string) {
  return value.slice(0, 10);
}

function fromProject(project: Project): FormValues {
  return {
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    longDescription: project.longDescription,
    technologies: project.technologies.join(", "),
    status: project.status,
    projectUrl: project.projectUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    imageUrl: project.imageUrl ?? "",
    featured: project.featured,
    createdAt: toInputDate(project.createdAt),
    updatedAt: toInputDate(project.updatedAt)
  };
}

function createEmptyValues(): FormValues {
  const today = new Date().toISOString().slice(0, 10);

  return {
    slug: "",
    title: "",
    shortDescription: "",
    longDescription: "",
    technologies: "",
    status: "Prototype",
    projectUrl: "",
    githubUrl: "",
    imageUrl: "",
    featured: false,
    createdAt: today,
    updatedAt: today
  };
}

export function SetupManager({ projects }: SetupManagerProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveProjectAction, initialActionState);
  const [values, setValues] = useState<FormValues>(createEmptyValues);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    router.refresh();
  }, [router, state.success]);

  const livePreview = useMemo(
    () => values.technologies.split(",").map((item) => item.trim()).filter(Boolean),
    [values.technologies]
  );

  return (
    <section>
      <div className="setup-head">
        <div>
          <p className="eyebrow">Private setup</p>
          <h1 className="page-title">Project editor</h1>
          <p className="page-intro">
            Add or update projects in Turso through a small GUI. Saving an
            existing slug updates that project.
          </p>
        </div>
        <form action={lockSetup}>
          <button className="minimal-button">Lock setup</button>
        </form>
      </div>

      <div className="setup-grid">
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Add or edit project</h2>
            <p className="section-text">
              Fill in the fields, add image and link URLs, then save to Turso.
            </p>
          </div>

          <form action={formAction} className="setup-form">
            <div className="form-grid">
              <label className="form-field">
                <span className="detail-label">Slug</span>
                <input
                  name="slug"
                  value={values.slug}
                  onChange={(event) => setValues((current) => ({ ...current, slug: event.target.value }))}
                  className="text-input"
                  placeholder="my-project"
                  required
                />
              </label>
              <label className="form-field">
                <span className="detail-label">Title</span>
                <input
                  name="title"
                  value={values.title}
                  onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
                  className="text-input"
                  placeholder="Project title"
                  required
                />
              </label>
            </div>

            <label className="form-field">
              <span className="detail-label">Short description</span>
              <textarea
                name="shortDescription"
                value={values.shortDescription}
                onChange={(event) =>
                  setValues((current) => ({ ...current, shortDescription: event.target.value }))
                }
                className="text-area"
                rows={3}
                required
              />
            </label>

            <label className="form-field">
              <span className="detail-label">Long description</span>
              <textarea
                name="longDescription"
                value={values.longDescription}
                onChange={(event) =>
                  setValues((current) => ({ ...current, longDescription: event.target.value }))
                }
                className="text-area"
                rows={6}
                required
              />
            </label>

            <div className="form-grid">
              <label className="form-field">
                <span className="detail-label">Technologies</span>
                <input
                  name="technologies"
                  value={values.technologies}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, technologies: event.target.value }))
                  }
                  className="text-input"
                  placeholder="Next.js, TypeScript, Turso"
                  required
                />
              </label>
              <label className="form-field">
                <span className="detail-label">Status</span>
                <select
                  name="status"
                  value={values.status}
                  onChange={(event) => setValues((current) => ({ ...current, status: event.target.value }))}
                  className="text-input"
                >
                  {projectStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-grid">
              <label className="form-field">
                <span className="detail-label">Project URL</span>
                <input
                  name="projectUrl"
                  value={values.projectUrl}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, projectUrl: event.target.value }))
                  }
                  className="text-input"
                  placeholder="https://example.com"
                />
              </label>
              <label className="form-field">
                <span className="detail-label">GitHub URL</span>
                <input
                  name="githubUrl"
                  value={values.githubUrl}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, githubUrl: event.target.value }))
                  }
                  className="text-input"
                  placeholder="https://github.com/..."
                />
              </label>
            </div>

            <label className="form-field">
              <span className="detail-label">Image URL</span>
              <input
                name="imageUrl"
                value={values.imageUrl}
                onChange={(event) => setValues((current) => ({ ...current, imageUrl: event.target.value }))}
                className="text-input"
                placeholder="https://..."
              />
            </label>

            <div className="form-grid">
              <label className="form-field">
                <span className="detail-label">Created date</span>
                <input
                  name="createdAt"
                  type="date"
                  value={values.createdAt}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, createdAt: event.target.value }))
                  }
                  className="text-input"
                />
              </label>
              <label className="form-field">
                <span className="detail-label">Updated date</span>
                <input
                  name="updatedAt"
                  type="date"
                  value={values.updatedAt}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, updatedAt: event.target.value }))
                  }
                  className="text-input"
                />
              </label>
            </div>

            <label className="checkbox-field">
              <input
                name="featured"
                type="checkbox"
                checked={values.featured}
                onChange={(event) =>
                  setValues((current) => ({ ...current, featured: event.target.checked }))
                }
              />
              <span>Show this project on the homepage</span>
            </label>

            {state.error ? <p className="terminal-error">{state.error}</p> : null}
            {state.success ? <p className="setup-success">{state.success}</p> : null}

            <div className="inline-links">
              <button type="submit" className="minimal-button" disabled={pending}>
                {pending ? "Saving..." : "Save project"}
              </button>
              <button
                type="button"
                className="minimal-button"
                onClick={() => setValues(createEmptyValues())}
              >
                New blank form
              </button>
            </div>
          </form>
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Preview</h2>
            <p className="section-text">
              Quick check for the text, links, and image before saving.
            </p>
          </div>

          <div className="stacked-copy">
            <div className="project-heading">
              <h2 className="project-title">{values.title || "Untitled project"}</h2>
              <span className="project-meta">{values.status}</span>
            </div>
            <p style={{ margin: 0 }}>{values.shortDescription || "Short description preview."}</p>
            {livePreview.length > 0 ? (
              <ul className="tech-list">
                {livePreview.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {values.imageUrl ? (
              <div className="image-frame">
                <Image
                  src={values.imageUrl}
                  alt={values.title || "Project preview"}
                  width={1200}
                  height={720}
                />
              </div>
            ) : null}
            <p className="project-meta">
              {values.projectUrl || "No live URL yet"}
              {" · "}
              {values.githubUrl || "No GitHub URL yet"}
            </p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Existing projects</h2>
          <p className="section-text">
            Load one into the form to edit it, or leave the form blank to create
            a new entry.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article key={project.slug} className="project-row">
              <div className="stacked-copy">
                <div className="project-heading">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-meta">{project.status}</span>
                </div>
                <p style={{ margin: 0 }}>{project.shortDescription}</p>
                <ul className="tech-list">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              <div className="inline-links" style={{ marginTop: 0 }}>
                <button
                  type="button"
                  className="minimal-button"
                  onClick={() => setValues(fromProject(project))}
                >
                  Edit
                </button>
                <Link href={`/work/${project.slug}`}>Open</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
