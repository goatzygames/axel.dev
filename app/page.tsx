import Link from "next/link";
import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Developer portfolio</p>
        <h1 className="hero-title">axel.dev</h1>
        <p className="hero-copy">
          I build small, useful software projects, web tools, and experimental
          developer platforms.
        </p>
        <div className="hero-links" aria-label="Primary links">
          <Link href="/work">View work</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </section>

      <Section
        id="work"
        title="Featured work"
        description="Selected projects pulled from Turso, with a local fallback while you're setting things up."
      >
        <ProjectList projects={featuredProjects} />
      </Section>

      <Section
        id="about"
        title="About"
        description="A short introduction you can edit later without touching the overall layout."
      >
        <div className="stacked-copy">
          <p className="body-copy" style={{ marginTop: 0 }}>
            I work across web apps, game-development tools, and small
            experiments that try to make software feel lighter, faster, and
            easier to use.
          </p>
          <p className="body-copy" style={{ marginTop: 0 }}>
            The focus here is simple: clear interfaces, strong fundamentals, and
            projects that are practical enough to ship.
          </p>
          <div className="inline-links">
            <Link href="/about">Read more</Link>
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        title="Contact"
        description="Keep this lightweight. Text links are enough for a personal homepage."
      >
        <div className="inline-links">
          <a href={`mailto:${siteConfig.email}`}>Email</a>
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link href="/contact">More links</Link>
        </div>
      </Section>
    </>
  );
}
