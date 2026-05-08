import Hero from "@/components/Hero";
import ProjectsCloudinaryOnly from "@/components/ProjectsCloudinaryOnly";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import InteractiveBackground from "@/components/InteractiveBackground";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <InteractiveBackground />
      <div id="hero">
        <Hero />
      </div>
      <ProjectsCloudinaryOnly />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
