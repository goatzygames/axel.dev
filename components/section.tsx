import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-text">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
