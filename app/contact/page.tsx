import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact links for axel.dev."
};

export default function ContactPage() {
  return (
    <section>
      <p className="eyebrow">Contact</p>
      <h1 className="page-title">A few ways to reach me.</h1>
      <p className="page-intro">
        Keep these links current and simple. There’s no form here unless you
        decide you want one later.
      </p>

      <div className="section">
        <div className="project-list">
          <div className="project-row">
            <div>
              <h2 className="project-title">Email</h2>
              <p className="project-meta">Replace this placeholder with your real address.</p>
            </div>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className="project-row">
            <div>
              <h2 className="project-title">GitHub</h2>
              <p className="project-meta">Point this to your main profile.</p>
            </div>
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
              {siteConfig.githubUrl.replace("https://", "")}
            </a>
          </div>
          <div className="project-row">
            <div>
              <h2 className="project-title">X / Twitter or LinkedIn</h2>
              <p className="project-meta">Optional. Leave only the networks you actually use.</p>
            </div>
            <a href="https://x.com/your-handle" target="_blank" rel="noreferrer">
              x.com/your-handle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
