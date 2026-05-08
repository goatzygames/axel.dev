import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Axel and the kinds of software he builds."
};

export default function AboutPage() {
  return (
    <section>
      <p className="eyebrow">About</p>
      <h1 className="page-title">Building useful things on the web.</h1>
      <div className="stacked-copy">
        <p className="page-intro">
          I build web apps, game-development tools, and experimental software
          with a preference for simple interfaces and small, focused products.
        </p>
        <p className="body-copy">
          I’m interested in tools that feel approachable without losing depth:
          interactive browser software, creative systems, lightweight developer
          platforms, and experiments that test unusual product ideas.
        </p>
        <p className="body-copy">
          Edit this page freely to make it more personal. The content is plain
          on purpose so it stays easy to maintain.
        </p>
      </div>
    </section>
  );
}
