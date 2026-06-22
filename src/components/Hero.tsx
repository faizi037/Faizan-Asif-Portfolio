import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileImageUrl } from "@/data/profile-image";

const Hero = () => {
  // Text reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 pb-10"
    >
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-golden/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold tracking-wider border border-accent/20">
                FLUTTER DEVELOPER
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-gradient">Faizan Asif</span>
              <br />
              <span className="text-4xl md:text-6xl text-foreground/80">
                Crafting Mobile Solutions
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              Transforming complex ideas into high-performance mobile applications
              using Flutter. Expert in developing high-performance, scalable,
              and user-centric solutions across diverse industries.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start pb-8 lg:pb-0"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-navy font-bold px-8 h-12 rounded-full shadow-glow hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent/50 text-foreground hover:bg-accent hover:text-white dark:hover:text-white hover:border-accent h-12 rounded-full px-8 hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-6 justify-center lg:justify-start mt-8"
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/faizi037"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: "hsl(var(--accent))" }}
                className="text-muted-foreground transition-colors"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/faizan-asif-ba59a130b/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: "hsl(var(--accent))" }}
                className="text-muted-foreground transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://mail.google.com/mail/?view=cm&fs=1&to=faizanasif3037@gmail.com&su=Contact%20from%20Portfolio&body=Hi%20Faizan%20Asif,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch.%0D%0A%0D%0ABest%20regards,', '_blank');
                }}
                whileHover={{ y: -5, color: "hsl(var(--accent))" }}
                className="text-muted-foreground transition-colors cursor-pointer"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay: 0.2
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-2 border-2 border-white/10 bg-white/5 backdrop-blur-sm">
                <motion.img
                  src="/faizi.png.jpg"
                  alt="Flutter Developer Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-accent/20 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Simplified floating elements */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white/10 backdrop-blur-md p-2 md:p-4 rounded-xl md:rounded-2xl border border-white/20 shadow-xl select-none pointer-events-none">
                <span className="text-lg md:text-2xl">🚀</span>
              </div>
              <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-white/10 backdrop-blur-md p-2 md:p-4 rounded-xl md:rounded-2xl border border-white/20 shadow-xl select-none pointer-events-none">
                <span className="text-lg md:text-2xl">💙</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
