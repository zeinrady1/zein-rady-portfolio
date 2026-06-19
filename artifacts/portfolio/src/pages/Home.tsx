import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Download, Rocket, Send } from "lucide-react";

const Starfield = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 200 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 3 + 2,
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.8,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight text-white hover:text-primary transition-colors">ZR</a>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            >
              {link.name}
            </a>
          ))}
          <Button variant="outline" className="ml-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]">
            <Download className="w-4 h-4 mr-2" /> Resume
          </Button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const orbitAngle = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Earth */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-600 via-blue-900 to-slate-900 shadow-[0_0_80px_rgba(37,99,235,0.4)] border border-blue-500/20" />
        
        {/* Orbit container */}
        <motion.div
          className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full"
          style={{ rotate: orbitAngle }}
        >
          {/* Rocket */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rotate-90 text-primary">
            <Rocket className="w-8 h-8 md:w-10 md:h-10 fill-primary drop-shadow-[0_0_10px_rgba(245,158,11,1)]" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-b from-orange-500 to-transparent blur-sm animate-pulse" />
          </div>
        </motion.div>
      </div>

      <div className="container relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        >
          Zein Rady
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium text-primary mb-6"
        >
          Aerospace Engineering Student | Astrodynamics & GNC
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10"
        >
          Pursuing spacecraft guidance, navigation, and orbital mechanics with a focus on real-world mission applications.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <a href="#projects">View My Work</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary">
            <a href="#contact">Contact Me</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4">
    <span className="h-px bg-primary w-12 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
    {children}
  </h2>
);

export default function Home() {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transmission Sent",
      description: "Message successfully relayed to command center.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-transparent font-sans">
      <Starfield />
      <Navbar />
      
      <main>
        <Hero />

        {/* About */}
        <section id="about" className="py-24 relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>About Me</SectionHeading>
            <div className="bg-card/50 backdrop-blur-sm border border-border p-8 md:p-12 rounded-2xl shadow-xl hover:border-primary/50 transition-colors duration-500">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a junior at UC San Diego studying Aerospace Engineering with a specialization in Astrodynamics and Space Applications (GPA 3.7). My focus is on spacecraft guidance, navigation, and control, and I'm working toward a career in astrodynamics at organizations like NASA or SpaceX. I bring hands-on experience in CAD modeling, FEA simulation, embedded systems, and orbital mechanics research, alongside leadership roles in student engineering organizations.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Education */}
        <section id="education" className="py-24 relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>Education</SectionHeading>
            <div className="grid gap-6">
              {[
                {
                  title: "University of California, San Diego",
                  degree: "B.S. Aerospace Engineering, Specialization in Astrodynamics and Space Applications",
                  gpa: "3.7",
                  date: "Sep 2024 – Jun 2027",
                  details: "Relevant Coursework: Orbital Mechanics, Spacecraft Guidance & Navigation, Flight Simulation Techniques, Advanced Fluid Mechanics, Signals & Systems, Linear Control, Thermodynamics, Probability & Statistics for Engineers"
                },
                {
                  title: "Irvine Valley College",
                  degree: "Associates in Mathematics, Physics, Natural Sciences, and Liberal Arts",
                  gpa: "3.70",
                  date: "Aug 2021 – Jun 2024",
                },
                {
                  title: "Certified SolidWorks CAD Design Associate",
                  degree: "Certification",
                  date: "Aug 2024",
                }
              ].map((edu, idx) => (
                <div key={idx} className="bg-card/40 border border-border p-6 rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                      <p className="text-primary mt-1">{edu.degree}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground block">{edu.date}</span>
                      {edu.gpa && <span className="text-sm font-medium text-white block mt-1">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                  {edu.details && <p className="text-sm text-muted-foreground">{edu.details}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>Projects</SectionHeading>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "MATLAB Orbit Determination",
                  subtitle: "Course: MAE 182 - Spacecraft Guidance & Navigation, UCSD",
                  desc: "Developed a batch least-squares orbit determination program in MATLAB that processed simulated range and range-rate measurements from three ground stations to estimate spacecraft position and velocity. Achieved millimeter-level accuracy in position estimation through iterative statistical refinement.",
                  tools: ["MATLAB", "Orbital Mechanics", "Batch Estimation", "Linear Algebra"]
                },
                {
                  title: "High-Powered Rocket – Proxima (RPL @ UCSD)",
                  subtitle: "Lead Design Engineer | Oct 2024 – Jun 2025",
                  desc: "Led multidisciplinary team design of a high-powered rocket from scratch. Used SolidWorks for full CAD modeling and OpenRocket for aerodynamic simulations. Performed iterative design to optimize structural stability and maximize altitude. Manufactured components via 3D printing and launched successfully.",
                  tools: ["SolidWorks", "OpenRocket", "3D Printing", "Structural Analysis"]
                },
                {
                  title: "Autonomous Quadcopter – DBVF @ UCSD",
                  subtitle: "Embedded Systems Team Member | Nov 2024 – Jun 2025",
                  desc: "Integrated Pixhawk 4 flight controller, GPS, telemetry, and onboard sensors into a quadcopter platform. Configured and tested ESCs, calibrated motor thrust, and resolved stability and power-distribution issues. Collaborated with structural and software sub-teams for full system integration.",
                  tools: ["Pixhawk 4", "Arduino", "Avionics", "Embedded Systems", "Wiring"]
                },
                {
                  title: "Freestanding Bleacher Structures",
                  subtitle: "Lead Structural Designer | Jun 2025 – Aug 2025",
                  desc: "Designed and modeled six custom freestanding bleacher-style structures in SolidWorks, each rated to support 5,000 lbs of live load with a minimum factor of safety of 4.5. Performed FEA simulations for stress, strain, and displacement. Worked directly with contractors and architects on-site.",
                  tools: ["SolidWorks", "FEA", "Structural Engineering", "CAD Documentation"]
                }
              ].map((proj, idx) => (
                <div key={idx} className="group bg-card/60 backdrop-blur-sm border border-border p-6 rounded-2xl hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{proj.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-4">{proj.subtitle}</p>
                  <p className="text-muted-foreground mb-6 flex-grow">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-secondary text-xs rounded-full text-white border border-border/50">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24 relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>Experience</SectionHeading>
            <div className="relative border-l-2 border-primary/30 ml-4 md:ml-8 space-y-12">
              {[
                {
                  title: "Treasurer",
                  org: "Vertical Flight Society @ UCSD",
                  date: "Oct 2025 – Jun 2026",
                  desc: "Maintained financial documentation, forecasts, and budget reports for engineering operations. Tracked expenditures, analyzed cost trends, and prepared summaries for leadership."
                },
                {
                  title: "Behavior Technician",
                  org: "Nyansa Learning Corporation",
                  date: "Jun 2025 – Sep 2025",
                  desc: "Followed structured procedures and maintained detailed electronic records. Communicated across teams to ensure consistent program delivery."
                },
                {
                  title: "Lead Structural Designer",
                  org: "Freelance",
                  date: "Jun 2025 – Aug 2025",
                  desc: "Designed load-bearing structures in SolidWorks, performed FEA, created engineering documentation, and collaborated with contractors."
                },
                {
                  title: "Tutor",
                  org: "Berktree Learning Center",
                  date: "Jun 2024 – Sep 2024",
                  desc: "Tutored students in Calculus, Algebra, Geometry, English, ACT, and SAT prep."
                },
                {
                  title: "Social Media Head",
                  org: "Youngfield USA",
                  date: "Feb 2023 – Jun 2024",
                  desc: "Led social media strategy across Instagram, Facebook, and TikTok. Coordinated product launches and influencer partnerships."
                }
              ].map((exp, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(245,158,11,1)]" />
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                    <span className="text-primary font-medium">{exp.org}</span>
                    <span className="hidden sm:inline text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{exp.date}</span>
                  </div>
                  <p className="text-muted-foreground">{exp.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24 relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>Skills</SectionHeading>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card/40 border border-border p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {["MATLAB", "SolidWorks", "OpenRocket", "FEA Analysis", "3D CAD Modeling", "3D Printing", "Arduino", "Soldering & Wiring", "Excel", "C Programming", "Data Analysis & Visualization"].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-secondary text-sm rounded-lg text-primary border border-primary/20 hover:border-primary hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-card/40 border border-border p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Soft Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {["Leadership", "Cross-functional Collaboration", "Analytical Problem-Solving", "Attention to Detail", "Communication", "Adaptability", "Time Management", "Team Coordination"].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-secondary text-sm rounded-lg text-white border border-border hover:border-white/50 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 relative z-10 container mx-auto px-4 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Connect</h2>
              <p className="text-lg text-muted-foreground">Open to internship and research opportunities in aerospace, GNC, and astrodynamics.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <a href="mailto:radyzein2003@gmail.com" className="flex items-center justify-center gap-3 bg-card/40 border border-border p-4 rounded-xl hover:border-primary transition-colors text-white hover:text-primary">
                <Mail className="w-5 h-5" />
                <span>radyzein2003@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/zein-rady-a3475227b" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-card/40 border border-border p-4 rounded-xl hover:border-primary transition-colors text-white hover:text-primary">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 bg-card/60 backdrop-blur-sm border border-border p-8 rounded-2xl">
              <div>
                <Input placeholder="Name" required className="bg-secondary/50 border-border/50 focus-visible:ring-primary" />
              </div>
              <div>
                <Input type="email" placeholder="Email" required className="bg-secondary/50 border-border/50 focus-visible:ring-primary" />
              </div>
              <div>
                <Textarea placeholder="Message" required rows={5} className="bg-secondary/50 border-border/50 focus-visible:ring-primary resize-none" />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </motion.div>
        </section>

      </main>

      <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">Zein Rady © 2026</p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/zein-rady-a3475227b" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:radyzein2003@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
