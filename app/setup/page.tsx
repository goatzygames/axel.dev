import type { Metadata } from "next";
import { SetupManager } from "@/components/setup-manager";
import { getAllProjects } from "@/lib/projects";
import { hasSetupAccess } from "./actions";

export const metadata: Metadata = {
  title: "Setup"
};

export default async function SetupPage() {
  const authorized = await hasSetupAccess();

  if (!authorized) {
    return (
      <section>
        <p className="eyebrow">Restricted</p>
        <h1 className="page-title">Setup is hidden.</h1>
        <p className="page-intro">
          Type the correct command to open the terminal prompt, then enter the
          password to unlock this page.
        </p>
      </section>
    );
  }

  const projects = await getAllProjects();

  return <SetupManager projects={projects} />;
}
