import HeroIllustration from './HeroIllustration';
import { LINKS } from '../../constants/portfolio';
import Arrow from '../ui/Arrow';
export default function Hero() {
  return (
    <section className="hero">
      <div className="herocopy">
        <div className="eyebrow availability">
          <i /> OPEN TO NEW OPPORTUNITIES
        </div>
        <h1>
          Thoughtful code.
          <br />
          Meaningful <span>experiences.</span>
        </h1>
        <p>
          I’m Anuvab, a software engineer turning complex ideas into fast, intuitive web
          applications. Built with care. Made to scale.
        </p>
        <div className="heroactions">
          <a className="button primary" href="#projects">
            Explore my work <Arrow />
          </a>
          <a className="button secondary" href={LINKS.email}>
            Let’s talk <Arrow />
          </a>
        </div>
        <div className="herosocial">
          <a href={LINKS.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <span>
            BASED IN INDIA <i>↗</i>
          </span>
        </div>
      </div>
      <HeroIllustration />
    </section>
  );
}
