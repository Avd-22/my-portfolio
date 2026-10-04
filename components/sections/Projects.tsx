import { LINKS, PROJECTS } from '../../constants/portfolio';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../projects/ProjectCard';
export default function Projects() {
  return (
    <section tabIndex={-1} id="projects" className="section reveal">
      <SectionHeading eyebrow="02 / SELECTED WORK" title="From idea to interface">
        <a className="textlink" href={LINKS.github} target="_blank" rel="noreferrer">
          More on GitHub ↗
        </a>
      </SectionHeading>
      <div className="projects">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
