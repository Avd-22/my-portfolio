import { LINKS, PROFILE } from '../../constants/portfolio';
import Arrow from '../ui/Arrow';
export default function Contact() {
  return (
    <section tabIndex={-1} id="contact" className="contact reveal">
      <div className="eyebrow">
        <i /> LET’S BUILD SOMETHING GOOD
      </div>
      <h2>
        Have an idea?
        <br />
        Let’s make it <span>happen.</span>
      </h2>
      <p>
        A new product, a frontend challenge, or an opportunity to collaborate.
        <br />
        I’d love to hear what you’re working on.
      </p>
      <a className="contactemail" href={LINKS.email}>
        {PROFILE.email} <Arrow />
      </a>
      <div className="contactlinks">
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={LINKS.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href={PROFILE.leetcode} target="_blank" rel="noreferrer">
          LeetCode ↗
        </a>
        <a href={PROFILE.phoneHref}>{PROFILE.phone} ↗</a>
      </div>
    </section>
  );
}
