import Portfolio from '../components/Portfolio';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Metrics from '../components/sections/Metrics';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';
export default function Home() {
  return (
    <Portfolio>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Metrics />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </Portfolio>
  );
}
