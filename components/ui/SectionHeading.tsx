import type { ReactNode } from 'react';
export default function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="sectionhead">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>
          {title}
          <span>.</span>
        </h2>
      </div>
      {children}
    </div>
  );
}
