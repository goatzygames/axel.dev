import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "All projects listed on axel.dev."
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <section>
      <p className="eyebrow">Work</p>
      <h1 className="page-title">Projects, experiments, and tools.</h1>
      <p className="page-intro">
        A simple vertical list keeps the focus on the work itself: what it is,
        what it uses, and where to explore it further.
      </p>

      <div className="section">
        <ProjectList projects={projects} showDates />
      </div>
    </section>
  );
}
