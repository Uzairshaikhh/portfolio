import { MotionConfig } from "motion/react";
import { Background } from "./components/site/Background";
import { Cursor } from "./components/site/Cursor";
import { Intro } from "./components/site/Intro";
import { ScrollMarquee } from "./components/site/ScrollMarquee";
import { Nav } from "./components/site/Nav";
import { Hero } from "./components/site/Hero";
import { TechTicker } from "./components/site/TechTicker";
import { About } from "./components/site/About";
import { Skills } from "./components/site/Skills";
import { Work } from "./components/site/Work";
import { Experience } from "./components/site/Experience";
import { Process } from "./components/site/Process";
import { Statement } from "./components/site/Statement";
import { GitHub } from "./components/site/GitHub";
import { ResumeCta } from "./components/site/ResumeCta";
import { Contact } from "./components/site/Contact";
import { Footer } from "./components/site/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <Cursor />
      <Nav />
      <Intro />
      <main>
        <Hero />
        <TechTicker />
        <About />
        <Skills />
        <Work />
        <ScrollMarquee />
        <Experience />
        <Process />
        <Statement />
        <GitHub />
        <ResumeCta />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
