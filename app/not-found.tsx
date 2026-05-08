import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <p className="eyebrow">404</p>
      <h1 className="page-title">That page doesn’t exist.</h1>
      <p className="page-intro">
        The link may be outdated, or the project may have moved.
      </p>
      <div className="inline-links">
        <Link href="/">Home</Link>
        <Link href="/work">Work</Link>
      </div>
    </section>
  );
}
