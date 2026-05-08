import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "./AnimatedCounter";

// SVG Logo components
const FlutterLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
  </svg>
);

const DartLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 011.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263h4.263V9.89L14.3 1.071c-.483-.487-.964-.515-1.508-.498L4.784 4.784z" />
  </svg>
);

const FirebaseLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z" />
  </svg>
);

const AndroidLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M17.523 15.341a.96.96 0 100-1.92.96.96 0 000 1.92zm-11.046 0a.96.96 0 100-1.92.96.96 0 000 1.92zm11.405-6.02l1.997-3.46a.416.416 0 00-.152-.566.416.416 0 00-.566.152l-2.024 3.506a12.291 12.291 0 00-5.137-1.102c-1.82 0-3.546.39-5.137 1.102L4.84 5.447a.416.416 0 00-.566-.152.416.416 0 00-.152.566l1.997 3.46C2.688 11.196.343 14.914 0 19.2h24c-.343-4.286-2.688-8.004-6.118-9.879z" />
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
  </svg>
);

const skillCategories = [
  {
    Logo: FlutterLogo,
    title: "Flutter Development",
    skills: ["Flutter SDK", "Dart", "State Management", "Material Design"],
    color: "from-sky-400 to-blue-600",
    bgColor: "text-sky-500/10",
    iconColor: "text-sky-400",
    characteristics: ["Cross-platform", "Hot Reload", "60fps Performance", "Single Codebase"],
  },
  {
    Logo: AndroidLogo,
    title: "Android & App Development",
    skills: ["Android Development", "App Publishing", "Firebase Integration"],
    color: "from-green-400 to-emerald-600",
    bgColor: "text-green-500/10",
    iconColor: "text-green-400",
    characteristics: ["Platform APIs", "Store Ready", "Native Feel", "Multi-device"],
  },
  {
    Logo: FigmaLogo,
    title: "UI/UX Design",
    skills: ["Responsive Design", "Animation", "Custom Widgets"],
    color: "from-purple-400 to-pink-600",
    bgColor: "text-purple-500/10",
    iconColor: "text-purple-400",
    characteristics: ["Pixel Perfect", "User-Centric", "Interactive", "Accessible"],
  },
  {
    Logo: FirebaseLogo,
    title: "Backend & Integration",
    skills: ["REST APIs", "Firebase", "Stripe Integration", "Clean Architecture"],
    color: "from-amber-400 to-orange-600",
    bgColor: "text-amber-500/10",
    iconColor: "text-amber-400",
    characteristics: ["Real-time", "Scalable", "Secure", "Serverless"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-accent text-sm font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              Expertise
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive skill set in mobile development and modern technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-card rounded-2xl p-6 h-full border-2 border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl overflow-hidden hover:-translate-y-2">
                  {/* Large Background Logo */}
                  <div className={`absolute -right-8 -bottom-8 w-40 h-40 ${category.bgColor} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}>
                    <category.Logo />
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-xl p-3`}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="text-white w-full h-full">
                        <category.Logo />
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                      {category.title}
                    </h3>

                    {/* Skills List */}
                    <ul className="space-y-2 mb-6">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.05 * skillIndex + (index * 0.1) }}
                          className="flex items-center text-muted-foreground text-sm"
                        >
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${category.color} mr-3 flex-shrink-0`} />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Characteristics */}
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex flex-wrap gap-2">
                        {category.characteristics.map((char, charIndex) => (
                          <motion.span
                            key={char}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 * charIndex + (index * 0.1) }}
                            className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${category.color} text-white font-medium`}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { end: 2, suffix: "+", label: "Apps on Play Store" },
            { end: 200, suffix: "K+", label: "Downloads" },
            { end: 1, suffix: "+", label: "Year Experience" },
            { end: 100, suffix: "%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center p-6 rounded-2xl bg-gradient-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                duration={2000 + index * 200}
                className="text-4xl md:text-5xl font-bold text-gradient mb-2"
              />
              <div className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
