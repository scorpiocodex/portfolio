import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GitHub from "@/components/GitHub";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import PageReveal from "@/components/PageReveal";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import { getGitHubData } from "@/lib/github";

export default async function Home() {
  const githubData = await getGitHubData();
  return (
    <main id="main-content" className="min-h-screen relative flex flex-col overflow-x-hidden">
      <ScrollProgress />
      <Navigation />
      <PageReveal>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Philosophy />
        <div className="section-divider" />
        <Timeline />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <GitHub data={githubData} />
        <div className="section-divider" />
        <Contact />
        <Footer />
      </PageReveal>
    </main>
  );
}
