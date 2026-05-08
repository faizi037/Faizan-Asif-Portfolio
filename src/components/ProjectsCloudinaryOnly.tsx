import { motion, AnimatePresence } from "framer-motion";
import { Apple, Play, Github } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { getProjectImages } from '@/data/cloudinary-urls';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
  };
  projectKey: string;
  color: string;
  cardIndex?: number;
}

const ProjectCard = ({ title, description, tags, links, projectKey, color, cardIndex = 0 }: ProjectCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  // Get images from Cloudinary
  const cloudinaryImages = getProjectImages(projectKey);
  const screenshots = cloudinaryImages.map((img: any) => img.url);
  
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (screenshots.length <= 1) return;
    
    const startDelay = Math.floor(Math.random() * 1000) + 500;
    const stepInterval = 3500 + Math.floor(Math.random() * 1500);
    
    const start = window.setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % screenshots.length);
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((i) => (i + 1) % screenshots.length);
      }, stepInterval);
    }, startDelay);
    
    return () => {
      clearTimeout(start);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [screenshots.length, cardIndex]);

  if (screenshots.length === 0) {
    return (
      <div className="group relative">
        <div className="relative mx-auto w-[280px] h-[580px] bg-gray-200 dark:bg-gray-800 rounded-[3rem] border-[8px] border-gray-300 dark:border-gray-700 shadow-2xl overflow-hidden flex items-center justify-center">
          <p className="text-gray-500 text-center px-4">No images available for {title}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative mx-auto w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>

        {/* Screen Content */}
        <div className="relative w-full h-full bg-gray-800 overflow-hidden">
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={screenshots[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
    className="w-full h-full object-contain opacity-100 bg-gray-900"
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -24 }}
    transition={{
      opacity: { duration: 0.6, ease: "easeInOut" },
      x: { duration: 0.7, ease: "easeInOut" },
    }}
  />
</AnimatePresence>
<div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none z-10 rounded-[2rem]" />
</div>

<div className="absolute inset-x-0 bottom-0 z-10">
<div className="rounded-3xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl p-4 sm:p-5">
    <div className="mb-2">
      <motion.h3
        className="text-lg font-semibold text-white"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {title}
      </motion.h3>
    </div>
    <motion.p
      className="text-white/90 text-xs sm:text-sm mb-3 max-h-12 overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
    >
      {description}
    </motion.p>

    <div className="flex flex-wrap gap-1.5 mb-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20"
        >
          {tag}
        </span>
      ))}
    </div>

    <motion.div
      className={`grid ${((links.appStore ? 1 : 0) + (links.playStore ? 1 : 0) + (links.github ? 1 : 0)) > 1 ? "grid-cols-2" : "grid-cols-1"} gap-2 items-center mt-2 pt-2 border-t border-white/10`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
    >
      {links.appStore && (
        <a
          href={links.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 min-w-0 w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 px-2 py-2 text-xs rounded-md transition-colors duration-200 font-medium"
        >
          <Apple className="w-3.5 h-3.5" /> App Store
        </a>
      )}
      {links.playStore && (
        <a
          href={links.playStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 min-w-0 w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 px-2 py-2 text-xs rounded-md transition-colors duration-200 font-medium"
        >
          <Play className="w-3.5 h-3.5" /> Google Play
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 min-w-0 w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 px-2 py-2 text-xs rounded-md transition-colors duration-200 font-medium"
        >
          <Github className="w-3.5 h-3.5" /> GitHub
        </a>
      )}
    </motion.div>
</div>
</div>
</div>

{/* Reflection/Gloss Effect */}
<div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-20 rounded-[2.5rem]" />
</div>

{/* Shadow/Glow */}
<div
className={`absolute -inset-4 bg-gradient-to-b ${color} opacity-20 blur-2xl -z-10 group-hover:opacity-40 transition-opacity duration-500`}
/>
</motion.div>
);
};

const projects = [
{
title: "Everyday Muslim",
description: "Complete lifestyle companion with prayer analytics and intuitive design.",
tags: ["Flutter", "REST API", "Geolocator"],
links: {
appStore: "https://apps.apple.com/us/iphone/search?term=Everyday%20Muslim",
playStore: "https://play.google.com/store/search?q=Every%20Day%20uslim&c=apps&hl=en",
},
projectKey: "every-day-muslim",
color: "from-green-500 to-emerald-600",
},
{
title: "AI Flood Prediction",
description: "Intelligent early warning system using RNN models and real-time weather analytics.",
tags: ["Flutter", "Flask", "TensorFlow", "GetX"],
links: {
github: "https://github.com/faizi037/Flood-Prediction-Using-AI",
},
projectKey: "flood-prediction",
color: "from-blue-500 to-indigo-600",
},
{
title: "Urdu Audio Quran",
description: "Immersive audio experience with high-quality Urdu translation.",
tags: ["Flutter", "Audio Service", "Custom UI"],
links: {
appStore: "https://apps.apple.com/us/app/quran-urdu-audio-translation/id1574906752",
playStore: "https://play.google.com/store/apps/details?id=com.quran_only_urdu_audio&hl=en",
},
projectKey: "urdu-audio-quran",
color: "from-cyan-500 to-teal-600",
},
{
title: "Barber Booking App",
description: "Premium grooming service platform with Stripe integration and real-time scheduling.",
tags: ["Flutter", "Firebase", "Stripe", "Express"],
links: {
github: "https://github.com/faizi037/barber_booking_app",
},
projectKey: "barber-booking",
color: "from-amber-500 to-orange-600",
},
{
title: "MediRemind",
description: "Smart healthcare companion with AI label scanning and multi-role sync.",
tags: ["Flutter", "Google ML Kit", "Firebase", "PDF"],
links: {
github: "https://github.com/faizi037/Medi_Remind",
},
projectKey: "mediremind",
color: "from-teal-500 to-emerald-600",
},
{
title: "TikTok Clone",
description: "High-performance video streaming app with advanced editing and social features.",
tags: ["Flutter", "Cloudinary", "FFmpeg", "Hive"],
links: {
github: "https://github.com/faizi037/Tiktok_Clone_App",
},
projectKey: "tiktok-clone",
color: "from-pink-500 to-rose-600",
},
];

const ProjectsCloudinaryOnly = () => {
  return (
    <section id="projects" className="py-10 bg-background relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of my recent work in mobile and web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} cardIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsCloudinaryOnly;