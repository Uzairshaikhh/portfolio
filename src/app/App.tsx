import { motion } from "motion/react";
import { Github, Linkedin, Mail, Phone, ExternalLink, Code2 } from "lucide-react";

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Responsive Design",
    "UI/UX Principles"
  ];

  return (
    <div className="size-full bg-background overflow-y-auto">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Uzair Shaikh</h1>
          <nav className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h2 className="text-6xl font-bold text-foreground mb-4">
                Frontend Developer
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Frontend developer focused on building responsive and user-friendly websites
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-all"
              >
                Contact Me
              </button>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/uzair-shaikh-1b9a8b274/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Uzairshaikhh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="/src/imports/Uzair_Shaikh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg border border-border hover:bg-foreground hover:text-background transition-all font-medium"
                aria-label="Resume"
              >
                {/* Document/Download Icon (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 2.75a.75.75 0 0 1 .75.75v8.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V3.5a.75.75 0 0 1 .75-.75z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 17.25a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 1.5 0v1.75h8.5v-1.75a.75.75 0 0 1 1.5 0v2.5a.75.75 0 0 1-.75.75h-10.5z" />
                </svg>
                Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">About</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  BSc IT student at Vivek College with hands-on experience building real-world websites. I focus on creating clean, responsive interfaces that work well across all devices.
                </p>
                <p>
                  Strong interest in frontend development and UI design, with practical experience in building business websites and implementing modern web solutions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-3xl font-bold text-foreground mb-6">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-muted text-foreground rounded-lg border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-16">Featured Project</h2>

            {/* Project Image */}
            <div className="mb-12">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=675&fit=crop"
                  alt="SM Fabrications Website"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">PROJECT</h3>
                <p className="text-xl font-bold text-foreground">SM Fabrications Website</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">TYPE</h3>
                <p className="text-xl font-bold text-foreground">Business Website</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">TECHNOLOGIES</h3>
                <p className="text-xl font-bold text-foreground">HTML, CSS, JavaScript</p>
              </div>
            </div>

            {/* Project Description */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-foreground mb-4">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                A responsive business website developed for a fabrication company to showcase services, products, and customer projects. The website serves as the primary digital presence for the company, enabling customers to explore their offerings and get in touch.
              </p>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-foreground mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2"></div>
                  <p className="text-muted-foreground">Responsive design that works across all devices</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2"></div>
                  <p className="text-muted-foreground">Product showcase pages with visual galleries</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2"></div>
                  <p className="text-muted-foreground">Contact and enquiry sections for customer outreach</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2"></div>
                  <p className="text-muted-foreground">Clean UI layout with intuitive navigation</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <a
                href="https://smfabrications.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Live Website
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-12">Contact</h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">EMAIL</h3>
                  <a
                    href="mailto:uzair.shaikh.01kb@gmail.com"
                    className="text-lg text-foreground hover:underline"
                  >
                    uzair.shaikh.01kb@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">PHONE</h3>
                  <a
                    href="tel:7304893326"
                    className="text-lg text-foreground hover:underline"
                  >
                    7304893326
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4">LINKS</h3>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.linkedin.com/in/uzair-shaikh-1b9a8b274/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/Uzairshaikhh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Open to internship opportunities in frontend development, React development, and full-stack roles. Let's connect and build something great together.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-muted-foreground">
            © 2026 Uzair Shaikh
          </p>
        </div>
      </footer>
    </div>
  );
}