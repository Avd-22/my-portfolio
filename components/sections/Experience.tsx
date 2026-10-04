import { EXPERIENCE } from '../../constants/portfolio';
import ExperienceItem from './ExperienceItem';
import SectionHeading from '../ui/SectionHeading';

export default function Experience() {
  return (
    <section tabIndex={-1} id="experience" className="section reveal">
      <SectionHeading eyebrow="01 / THE JOURNEY" title="Experience that shapes my craft">
        <span className="sectionnote">BUILDING. LEARNING. ITERATING.</span>
      </SectionHeading>
      <div className="experience">
        {EXPERIENCE.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  );
}
