import { SKILL_GROUPS } from '../../constants/portfolio';
import Tags from '../ui/Tags';
import SectionHeading from '../ui/SectionHeading';
export default function Skills() {
  return (
    <section tabIndex={-1} id="skills" className="section reveal">
      <SectionHeading
        eyebrow="03 / MY TOOLKIT"
        title="The right tools. A thoughtful approach"
      ></SectionHeading>
      <div className="skillgrid">
        {SKILL_GROUPS.map((s) => (
          <article className="skill" key={s.title}>
            <span className="skillicon">{s.icon}</span>
            <h3>{s.title}</h3>
            <Tags items={s.skills} />
          </article>
        ))}
      </div>
      <div className="education">
        <span>↗</span>
        <div>
          <small>THE FOUNDATION</small>
          <h3>B.Tech in Electrical Engineering</h3>
          <p>JIS University · Narula Institute of Technology</p>
        </div>
        <div>
          <strong>
            8.4 <span>/ 10 CGPA</span>
          </strong>
          <small>GRADUATED JULY 2022</small>
        </div>
      </div>
    </section>
  );
}
