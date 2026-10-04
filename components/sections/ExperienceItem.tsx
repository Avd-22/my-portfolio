import Tags from '../ui/Tags';

import type { Experience } from '../../constants/portfolio';
export default function ExperienceItem({ experience }: { experience: Experience }) {
  const { period, current, role, company, description, highlights, technologies } =
    experience;
  return (
    <article>
      <div className="timeline">
        <i aria-hidden="true" />
        <small>{period}</small>
        {current && <span className="current">CURRENT ROLE</span>}
      </div>
      <div className="job">
        <h3>{role}</h3>
        <div className="company">{company}</div>
        <p>{description}</p>
        <ul>
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <Tags items={technologies} />
      </div>
    </article>
  );
}
