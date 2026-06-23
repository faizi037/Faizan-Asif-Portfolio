import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { profileImageUrl } from "@/data/profile-image";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        <div className="container mx-auto px-4">
          <div
            className={`relative rounded-full px-6 py-3 transition-all duration-300 ${
              isScrolled
                ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                : "bg-transparent"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-3 group"
              >
                <div
                  className={`relative w-12 h-12 rounded-full p-1 border ${
                    isScrolled ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"
                  } backdrop-blur-sm shadow-sm`}
                >
                  <div
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "linear-gradient(to top right, hsl(var(--accent)), #a855f7)" }}
                  />
                  <motion.img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              </a>

              {/* Right side - All navigation and controls */}
              <div className="flex items-center gap-6">
                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={`text-sm font-medium transition-colors relative group ${
                        isScrolled
                          ? "text-foreground hover:text-accent"
                          : "text-foreground hover:text-accent"
                      }`}
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                    </a>
                  ))}
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Hire Me Button - Desktop */}
                <Button
                  variant="default"
                  className="hidden md:flex bg-accent text-navy hover:bg-accent/90 rounded-full px-6"
                  onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=faizanasif3037@gmail.com&su=Hiring%20Inquiry&body=Hi%20Faizan%20Asif,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20project%20opportunity%20with%20you.%0D%0A%0D%0ABest%20regards,', '_blank')}
                >
                  Hire Me
                </Button>
                
                {/* Mobile Menu Button */}
                <button
                  className={`md:hidden text-foreground`}
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-end mb-8">
                <button
                  className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex flex-col gap-8 items-center justify-center flex-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-3xl font-bold text-white hover:text-accent transition-colors"
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Button
                    size="lg"
                    className="bg-accent text-navy hover:bg-accent/90 rounded-full px-8 text-lg"
                    onClick={() => {
                      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=faizanasif3037@gmail.com&su=Hiring%20Inquiry&body=Hi%20Faizan%20Asif,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20project%20opportunity%20with%20you.%0D%0A%0D%0ABest%20regards,', '_blank');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Hire Me
                  </Button>
                </motion.div>
                
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
