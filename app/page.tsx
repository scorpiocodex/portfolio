import ScrollProgress from "@/components/ScrollProgress";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import Architecture from "@/components/Architecture";
import Skills from "@/components/Skills";
import GitHub from "@/components/GitHub";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Philosophy />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />
      <Architecture />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <GitHub />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </main>
  );
}
