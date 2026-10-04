import ProjectPreview from './ProjectPreview';
import Tags from '../ui/Tags';
import type { Project } from '../../constants/portfolio';
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project">
      <ProjectPreview type={project.style} />
      <div className="projecttext">
        <div className="projectmeta">
          <span>{project.category}</span>
          <span>0{index + 1}</span>
        </div>
        <div className="projecttitle">
          <h3>{project.name}</h3>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={'Visit ' + project.name}
            >
              ↗
            </a>
          )}
        </div>
        <h4>{project.description}</h4>
        <p>{project.detail}</p>
        <Tags items={project.tags} />
        <small className="previewnote">
          Illustrative interface · professional project contribution
        </small>
      </div>
    </article>
  );
}
