import { motion, AnimatePresence } from "framer-motion";
import { Apple, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import React from "react";
import profileImage from "@/assets/profile.png";
import { ProjectGallery } from "./ProjectGallery";

// Import Cloudinary URLs
import { projectImages, getProjectImages, getProjectThumbnail } from '@/data/cloudinary-urls';

// Fallback to local images if Cloudinary URLs not available
const sortModules = (modules: Record<string, { default: string }>) => {
  const entries = Object.entries(modules).map(([path, mod]) => ({ path, src: mod.default }));
  entries.sort((a, b) => {
    const nameA = a.path.split("/").pop() ?? "";
    const nameB = b.path.split("/").pop() ?? "";
    const numA = parseInt(nameA);
    const numB = parseInt(nameB);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return nameA.localeCompare(nameB);
  });
  return entries.map((e) => e.src as string);
};

const fallbackImages = {
  everyDayMuslim: sortModules(
    import.meta.glob("../../Projects_imgs/Every Day Muslim/*.{jpg,jpeg,png,webp}", { eager: true }) as Record<string, { default: string }>
  ),
  quranUrdu: sortModules(
    import.meta.glob("../../Projects_imgs/Urdu Audio Quran Only/*.{jpg,jpeg,png,webp}", { eager: true }) as Record<string, { default: string }>
  ),
  islamicTrivia: sortModules(
    import.meta.glob("../../Projects_imgs/Islamic Trivia/*.{jpg,jpeg,png,webp}", { eager: true }) as Record<string, { default: string }>
  ),
  rbb: sortModules(
    import.meta.glob("../../Projects_imgs/RBB App/*.{jpg,jpeg,png,webp}", { eager: true }) as Record<string, { default: string }>
  ),
  numerology: sortModules(
    import.meta.glob("../../Projects_imgs/Numerology WIzard/*.{jpg,jpeg,png,webp}", { eager: true }) as Record<string, { default: string }>
  ),
  salonary: sortModules(
    import.meta.glob("../../Projects_imgs/Salonary/*.{jpg,jpeg,png,webp}", { eager: true }) as Record<string, { default: string }>
  ),
  chateo: sortModules(
    import.meta.glob("../../Projects_imgs/Chateo/*.{jpg,jpeg,png,webp}", { eager: true }) as Record<string, { default: string }>
  ),
  easyCredit: sortModules(
    import.meta.glob("../../Projects_imgs/Easy Credit Repairs/*.{jpg,jpeg,png,webp}", { eager: true }) as Record<string, { default: string }>
  ),
};

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  links: {
    appStore: string;
    playStore: string;
  };
  projectKey: string;
  fallbackImages: string[];
  color: string;
  cardIndex?: number;
}

const ProjectCard = ({ title, description, tags, links, projectKey, fallbackImages, color, cardIndex = 0 }: ProjectCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // Get images from Cloudinary or fallback to local
  const cloudinaryImages = getProjectImages(projectKey);
  const hasCloudinaryImages = cloudinaryImages && cloudinaryImages.length > 0;
  const screenshots = hasCloudinaryImages 
    ? cloudinaryImages.map((img: any) => img.url)
    : fallbackImages;
  
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
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => setShowGallery(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={screenshots[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                className="w-full h-full object-cover opacity-100"
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
            
            {/* Click to view gallery hint */}
            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              View Gallery
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl p-4 sm:p-5">
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
                  className="text-white/80 text-xs sm:text-sm mb-3 max-h-12 overflow-hidden"
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
                  className={`grid ${links.appStore && links.playStore ? "grid-cols-2" : "grid-cols-1"} gap-2 items-center mt-2 pt-2 border-t border-white/10`}
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

      {/* Full Screen Gallery */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <ProjectGallery
            images={hasCloudinaryImages ? cloudinaryImages : fallbackImages.map((url, index) => ({ index, url, publicId: `fallback-${index}` }))}
            projectName={title}
            className="w-full h-full"
          />
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>
      )}
    </motion.div>
  );
};

const projects = [
  {
    title: "Everyday Muslim",
    description: "Prayer times, Qibla, and duas with a clean interface.",
    tags: ["Flutter", "REST API", "Location"],
    links: {
      appStore: "https://apps.apple.com/us/iphone/search?term=Everyday%20Muslim",
      playStore: "https://play.google.com/store/search?q=Every%20Day%20uslim&c=apps&hl=en",
    },
    projectKey: "every-day-muslim",
    fallbackImages: fallbackImages.everyDayMuslim,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Quran Urdu Audio Translation",
    description: "Listen to Quran with Urdu audio translation.",
    tags: ["Flutter", "Audio", "Quran"],
    links: {
      appStore: "https://apps.apple.com/us/app/quran-urdu-audio-translation/id1574906752",
      playStore: "https://play.google.com/store/apps/details?id=com.quran_only_urdu_audio&hl=en",
    },
    projectKey: "urdu-audio-quran",
    fallbackImages: fallbackImages.quranUrdu,
    color: "from-teal-500 to-emerald-600",
  },
  {
    title: "Islamic Trivia",
    description: "Quiz app with categories and leaderboards.",
    tags: ["Flutter", "Firebase", "AdMob"],
    links: {
      appStore: "https://apps.apple.com/pk/iphone/search?term=Islamic%20Trivia",
      playStore: "https://play.google.com/store/apps/details?id=com.umratech.islamic_trivia&hl=en",
    },
    projectKey: "islamic-trivia",
    fallbackImages: fallbackImages.islamicTrivia,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "RBB App",
    description: "Banking and finance app with account management and secure transactions.",
    tags: ["Flutter", "Security", "Finance"],
    links: {
      appStore: "https://apps.apple.com/pk/app/rbb-toolbox/id6739781109",
      playStore: "https://play.google.com/store/apps/details?id=com.app.rbb_app&hl=en",
    },
    projectKey: "rbb-app",
    fallbackImages: fallbackImages.rbb,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Numerology Wizard",
    description: "Numerology calculations and insights with shareable results.",
    tags: ["Flutter", "Charts", "Local DB"],
    links: {
      appStore: "",
      playStore: "https://play.google.com/store/apps/details?id=com.app.numerology_wizard&pcampaignid=web_share",
    },
    projectKey: "numerology-wizard",
    fallbackImages: fallbackImages.numerology,
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Salonary",
    description: "Salon management: appointments, staff, and inventory streamlined.",
    tags: ["Flutter", "Firebase", "Stripe"],
    links: { appStore: "", playStore: "" },
    projectKey: "salonary",
    fallbackImages: fallbackImages.salonary,
    color: "from-pink-500 to-purple-600",
  },
  {
    title: "Chateo",
    description: "Real-time chat with channels, media sharing, and notifications.",
    tags: ["Flutter", "Socket.io", "Push"],
    links: { appStore: "", playStore: "" },
    projectKey: "chateo",
    fallbackImages: fallbackImages.chateo,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Easy Credit Repairs",
    description: "Credit repair workflow with guidance and tracking.",
    tags: ["Flutter", "Forms", "Cloud"],
    links: { appStore: "", playStore: "" },
    projectKey: "easy-credit-repairs",
    fallbackImages: fallbackImages.easyCredit,
    color: "from-orange-500 to-amber-600",
  },
];

const ProjectsWithCloudinary = () => {
  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
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
          <div className="flex justify-center mb-6">
            <motion.img
              src={profileImage}
              alt="Muhammad Soban"
              className="w-20 h-20 rounded-full object-cover border-4 border-accent/20 shadow-2xl"
              initial={{ opacity: 0.9, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of my recent work in mobile and web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} cardIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsWithCloudinary;