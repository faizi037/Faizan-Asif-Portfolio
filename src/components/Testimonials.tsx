import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Delivered beyond expectations — clean UI, solid performance, and great communication.",
    name: "Ali R.",
    role: "Product Manager",
  },
  {
    quote: "Fast, reliable, and professional. Our app shipped on time and looks amazing.",
    name: "Zara K.",
    role: "Product Lead, Everyday Muslim",
  },
  {
    quote: "Understood requirements perfectly and suggested smart improvements. Highly recommended.",
    name: "Hassan M.",
    role: "Tech Lead",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">What People Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
            A few words from clients and collaborators
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow hover:shadow-lg transition-all"
            >
              <p className="text-lg leading-relaxed">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold">{t.name}</span> — {t.role}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
