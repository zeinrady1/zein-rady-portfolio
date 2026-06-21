import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Download, Send, Github, FileText, Phone } from "lucide-react";

const Starfield = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 220 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.4,
      duration: Math.random() * 3 + 1.5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const EarthScene = () => {
  const [scrollAngle, setScrollAngle] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        setScrollAngle(progress * 720);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const orbitRx = 220;
  const orbitRy = 140;
  const angleRad = (scrollAngle * Math.PI) / 180;
  const rocketX = Math.cos(angleRad) * orbitRx;
  const rocketY = Math.sin(angleRad) * orbitRy;
  const tangentAngle = Math.atan2(
    -orbitRy * Math.cos(angleRad),
    orbitRx * -Math.sin(angleRad)
  );
  const rocketDeg = (tangentAngle * 180) / Math.PI;

  return (
    <div className="fixed inset-0 z-1 pointer-events-none flex items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: 500, height: 500 }}>

        {/* Orbit ellipse ring */}
        <svg
          className="absolute"
          width="500"
          height="500"
          viewBox="-250 -250 500 500"
          style={{ opacity: 0.12 }}
        >
          <ellipse cx="0" cy="0" rx={orbitRx} ry={orbitRy} fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        </svg>

        {/* Earth */}
        <div className="relative" style={{ width: 240, height: 240 }}>
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            style={{ borderRadius: "50%", overflow: "hidden", display: "block" }}
          >
            <defs>
              {/* Ocean gradient */}
              <radialGradient id="oceanGrad" cx="38%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#1e5fa8" />
                <stop offset="40%" stopColor="#0d3d7a" />
                <stop offset="100%" stopColor="#061e3c" />
              </radialGradient>
              {/* Atmosphere rim gradient */}
              <radialGradient id="atmGrad" cx="50%" cy="50%" r="50%">
                <stop offset="75%" stopColor="transparent" />
                <stop offset="90%" stopColor="#3b82f680" />
                <stop offset="100%" stopColor="#60a5fa60" />
              </radialGradient>
              {/* Specular highlight */}
              <radialGradient id="specGrad" cx="35%" cy="30%" r="35%">
                <stop offset="0%" stopColor="#ffffff30" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              {/* Cloud gradient */}
              <radialGradient id="cloudGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff55" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <clipPath id="earthClip">
                <circle cx="120" cy="120" r="118" />
              </clipPath>
            </defs>

            {/* Ocean base */}
            <circle cx="120" cy="120" r="118" fill="url(#oceanGrad)" />

            {/* === CONTINENTS === */}
            <g clipPath="url(#earthClip)">
              {/* Africa */}
              <path
                d="M 148,65 C 162,62 175,70 178,88 C 181,105 176,125 172,145 C 168,165 160,185 148,195 C 136,205 122,200 116,185 C 110,170 112,148 118,128 C 124,108 128,90 135,78 C 140,70 144,66 148,65 Z"
                fill="#2d7a3a" opacity="0.9"
              />
              {/* Madagascar */}
              <path
                d="M 183,155 C 188,152 193,158 192,168 C 191,178 184,182 179,178 C 174,174 174,164 178,158 Z"
                fill="#2d7a3a" opacity="0.85"
              />
              {/* South America */}
              <path
                d="M 72,95 C 86,88 100,92 104,110 C 108,128 106,155 98,175 C 90,195 74,205 60,198 C 46,190 40,168 44,145 C 48,122 55,105 65,97 Z"
                fill="#3a8a45" opacity="0.88"
              />
              {/* North America (partial) */}
              <path
                d="M 28,30 C 52,22 80,28 92,50 C 104,70 100,96 84,104 C 68,112 44,104 30,85 C 16,66 12,38 28,30 Z"
                fill="#3a8545" opacity="0.82"
              />
              {/* Eurasia */}
              <path
                d="M 100,28 C 130,15 170,18 195,35 C 218,50 228,75 220,95 C 212,115 185,122 158,118 C 130,114 105,100 92,80 C 80,60 80,38 100,28 Z"
                fill="#2d7a3a" opacity="0.88"
              />
              {/* India sub */}
              <path
                d="M 178,105 C 185,100 192,108 190,122 C 188,136 178,142 170,136 C 162,130 162,115 170,108 Z"
                fill="#3a8a40" opacity="0.8"
              />
              {/* Australia */}
              <path
                d="M 195,168 C 215,162 230,172 228,188 C 226,204 208,212 192,206 C 178,200 174,185 180,175 C 184,168 190,170 195,168 Z"
                fill="#4a9a50" opacity="0.82"
              />
              {/* Antarctica hint */}
              <path
                d="M 40,218 C 80,208 160,205 200,215 C 220,220 230,232 220,240 L 20,240 C 10,232 20,222 40,218 Z"
                fill="#d0e8f0" opacity="0.5"
              />

              {/* Cloud patches */}
              <ellipse cx="85" cy="55" rx="30" ry="12" fill="#ffffff" opacity="0.18" transform="rotate(-20 85 55)" />
              <ellipse cx="160" cy="80" rx="22" ry="9" fill="#ffffff" opacity="0.15" transform="rotate(10 160 80)" />
              <ellipse cx="55" cy="140" rx="26" ry="10" fill="#ffffff" opacity="0.14" transform="rotate(-15 55 140)" />
              <ellipse cx="130" cy="170" rx="20" ry="8" fill="#ffffff" opacity="0.12" transform="rotate(5 130 170)" />
              <ellipse cx="200" cy="130" rx="18" ry="7" fill="#ffffff" opacity="0.13" transform="rotate(-8 200 130)" />
              <ellipse cx="105" cy="215" rx="28" ry="9" fill="#ffffff" opacity="0.1" transform="rotate(3 105 215)" />
            </g>

            {/* Atmosphere rim overlay */}
            <circle cx="120" cy="120" r="118" fill="url(#atmGrad)" />
            {/* Specular highlight */}
            <circle cx="120" cy="120" r="118" fill="url(#specGrad)" />
          </svg>

          {/* Atmospheric glow rings */}
          <div className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 40px 12px rgba(59,130,246,0.35), 0 0 80px 30px rgba(37,99,235,0.18), 0 0 0 3px rgba(96,165,250,0.25)" }} />
        </div>

        {/* Rocket + flame at orbit position */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${rocketX}px), calc(-50% + ${rocketY}px))`,
          }}
        >
          <div
            style={{
              transform: `rotate(${rocketDeg + 90}deg)`,
              transformOrigin: "center center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Flame — below rocket body */}
            <motion.div
              style={{
                width: 10,
                height: 28,
                background: "linear-gradient(to bottom, #f97316, #fbbf24, transparent)",
                borderRadius: "0 0 50% 50%",
                filter: "blur(3px)",
                order: 2,
              }}
              animate={{ scaleY: [1, 1.3, 0.85, 1.15, 1], scaleX: [1, 0.85, 1.1, 0.9, 1] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Glow behind flame */}
            <motion.div
              style={{
                position: "absolute",
                bottom: -8,
                width: 18,
                height: 18,
                background: "radial-gradient(circle, rgba(251,191,36,0.7) 0%, transparent 70%)",
                filter: "blur(5px)",
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.35, repeat: Infinity }}
            />
            {/* Rocket SVG */}
            <svg
              width="22"
              height="46"
              viewBox="0 0 22 46"
              style={{ order: 1, filter: "drop-shadow(0 0 6px rgba(251,191,36,0.9))" }}
            >
              {/* Nose cone */}
              <path d="M 11 2 L 18 16 L 4 16 Z" fill="#e2e8f0" />
              {/* Body */}
              <rect x="5" y="14" width="12" height="18" rx="2" fill="#cbd5e1" />
              {/* Window */}
              <circle cx="11" cy="21" r="3" fill="#7dd3fc" stroke="#93c5fd" strokeWidth="1" />
              {/* Left fin */}
              <path d="M 5 28 L 0 40 L 7 34 Z" fill="#94a3b8" />
              {/* Right fin */}
              <path d="M 17 28 L 22 40 L 15 34 Z" fill="#94a3b8" />
              {/* Engine nozzle */}
              <rect x="7" y="32" width="8" height="5" rx="1" fill="#64748b" />
              {/* Accent stripe */}
              <rect x="5" y="22" width="12" height="2" fill="#f97316" opacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navLinks = [
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
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

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 flex items-center gap-4">
    <span className="h-px bg-primary w-12 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
    {children}
  </h2>
);

export default function Home() {
  const { toast } = useToast();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [sending, setSending] = useState(false);
  const contactFormRef = useRef<HTMLFormElement>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormRef.current) return;
    setSending(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        contactFormRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast({
        title: "Transmission Sent",
        description: "Message successfully relayed to command center.",
      });
      contactFormRef.current.reset();
    } catch {
      toast({
        title: "Transmission Failed",
        description: "Something went wrong — try emailing directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-sans">
      <Starfield />
      <EarthScene />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-16 z-10">
          <div className="container relative px-4 mx-auto">

            {/* Row 1: Name (left) + Photo (right) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="flex-1 text-center sm:text-left"
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)] tracking-tight">
                  Zein Rady
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-primary mb-1">
                  University of California, San Diego
                </p>
                <p className="text-lg text-muted-foreground">
                  Aerospace Engineering · Astrodynamics and Space Applications
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="shrink-0"
              >
                <img
                  src="/profile.jpg"
                  alt="Zein Rady"
                  className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover object-top border-4 border-primary shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                />
              </motion.div>
            </div>

            {/* Row 2: About Me */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="bg-card/70 backdrop-blur-md border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
              <p className="text-muted-foreground leading-relaxed">
                I'm a junior at UC San Diego studying Aerospace Engineering with a specialization in Astrodynamics and Space Applications (GPA 3.65). My focus is on spacecraft guidance, navigation, and control, working toward a career in astrodynamics at organizations like NASA or SpaceX. I bring hands-on experience in CAD modeling, FEA simulation, embedded systems, and orbital mechanics research, alongside leadership roles in student engineering organizations.
              </p>
            </motion.div>

            {/* Row 3: Links in a single horizontal row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center sm:justify-start"
            >
              <a href="/resume.html" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-card/70 backdrop-blur-md border border-border px-5 py-3 rounded-xl hover:border-primary transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] group">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Resume</span>
              </a>
              <a href="mailto:radyzein2003@gmail.com" className="flex items-center gap-2 bg-card/70 backdrop-blur-md border border-border px-5 py-3 rounded-xl hover:border-primary transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] group">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Email</span>
              </a>
              <a href="tel:9495016098" className="flex items-center gap-2 bg-card/70 backdrop-blur-md border border-border px-5 py-3 rounded-xl hover:border-primary transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] group">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Phone</span>
              </a>
              <a href="https://linkedin.com/in/zein-rady-a3475227b" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-card/70 backdrop-blur-md border border-border px-5 py-3 rounded-xl hover:border-primary transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] group">
                <Linkedin className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">LinkedIn</span>
              </a>
              <a href="https://github.com/zeinrady1" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-card/70 backdrop-blur-md border border-border px-5 py-3 rounded-xl hover:border-primary transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] group">
                <Github className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">GitHub</span>
              </a>
            </motion.div>

          </div>
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
                  gpa: "3.65",
                  date: "Sep 2024 – Jun 2027",
                  details: "Relevant Coursework: Orbital Mechanics, Spacecraft Guidance & Navigation, Flight Simulation Techniques, Advanced Fluid Mechanics, Signals & Systems, Linear Control, Thermodynamics, Probability & Statistics for Engineers"
                },
                {
                  title: "Irvine Valley College",
                  degree: "Associates in Mathematics, Physics, Natural Sciences, and Liberal Arts",
                  gpa: "3.70",
                  date: "Aug 2021 – Jun 2024",
                  details: "Relevant Coursework: Calculus I–III, Physics I–III (Mechanics & Electricity/Magnetism), SolidWorks CAD, MATLAB, C Programming"
                },
                {
                  title: "Certified SolidWorks CAD Design Associate",
                  degree: "Certification",
                  date: "Aug 2024",
                  certImage: "/solidworks-cert.png",
                  certLink: "/solidworks-cert.pdf",
                }
              ].map((edu, idx) => (
                <div key={idx} className="bg-card/70 backdrop-blur-md border border-border p-6 rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300" data-testid={`card-education-${idx}`}>
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                      <p className="text-primary mt-1">{edu.degree}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm text-muted-foreground block">{edu.date}</span>
                      {edu.gpa && <span className="text-sm font-medium text-white block mt-1">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                  {edu.details && <p className="text-sm text-muted-foreground">{edu.details}</p>}
                  {edu.certImage && (
                    <div className="mt-4">
                      <a href={edu.certLink} target="_blank" rel="noreferrer" className="inline-block group/cert">
                        <img src={edu.certImage} alt="SolidWorks Certificate" className="max-h-72 rounded-lg border border-border/50 group-hover/cert:opacity-90 transition-opacity cursor-pointer" />
                        <p className="text-xs text-muted-foreground mt-1 group-hover/cert:text-primary transition-colors">Click to view full certificate</p>
                      </a>
                    </div>
                  )}
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
                  desc: "Manage financial documentation, forecasts, and budget reports for VFS engineering operations at UCSD. Coordinate procurement, vendor communication, and UCSD-compliant reimbursements for club materials and components. Partner with project leads to strategically allocate funding across active engineering initiatives and mission milestones."
                },
                {
                  title: "Behavioral Health Technician",
                  org: "Nyansa Learning Corporation",
                  date: "Jun 2025 – Sep 2025",
                  desc: "Delivered structured ABA-based intervention sessions for children with developmental differences, facilitating growth in communication, language development, and academic skills. Collected and analyzed behavioral data in real time to adapt intervention strategies. Collaborated with therapists, supervisors, and families to ensure consistent, individualized program delivery across home, school, and community settings."
                },
                {
                  title: "Lead Structural Designer",
                  org: "Freelance Engineering Project",
                  date: "Jun 2025 – Aug 2025",
                  desc: "Engineered 6 modular freestanding structures in SolidWorks, each rated to 5,000 lbs live load with a minimum factor of safety of 4.5 (30,000 lbs combined capacity). Designed a relocatable treehouse-style viewing platform and a 6-ft elevated deck with integrated bar area. Performed FEA simulations (stress, strain, displacement) to validate structural integrity, and collaborated on-site with contractors and architects to align technical specs with build requirements."
                },
                {
                  title: "Student Tutor",
                  org: "Berktree Learning Center",
                  date: "Jun 2024 – Sep 2024",
                  desc: "Provided personalized academic support in Calculus, Algebra, Geometry, English, ACT, and SAT prep. Developed tailored lesson plans using adaptive teaching methods to foster confidence and problem-solving skills. Helped students improve understanding of complex concepts and achieve measurable academic progress."
                },
                {
                  title: "Social Media Coordinator & Design Assistant",
                  org: "Youngfield USA",
                  date: "Feb 2023 – Jun 2024",
                  desc: "Developed and executed targeted campaigns across Instagram, Facebook, and TikTok, driving engagement and expanding brand presence. Used analytics to refine content strategy aligned with brand values. Collaborated with the creative team as Clothing Design Assistant, contributing input on new collections, materials, and aesthetics."
                },
              ].map((exp, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12" data-testid={`timeline-experience-${idx}`}>
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(245,158,11,1)]" />
                  <div className="bg-card/80 backdrop-blur-md border border-border/60 rounded-xl p-4">
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                      <span className="text-primary font-medium">{exp.org}</span>
                      <span className="hidden sm:inline text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{exp.date}</span>
                    </div>
                    <p className="text-muted-foreground">{exp.desc}</p>
                  </div>
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
                  title: "Batch Least-Squares Orbit Determination",
                  subtitle: "MAE 182 – Spacecraft GNC, UCSD | Apr 2026 – Jun 2026",
                  desc: "Implemented an iterative batch least-squares estimator in MATLAB that processes range and range-rate observations from 3 ground stations over a 5-hour arc to estimate an 18-state vector: spacecraft position & velocity, gravitational parameter μ, J2 oblateness coefficient, drag coefficient CD, and station location biases. Converges to millimeter-level position accuracy in 5 iterations with full 1-σ covariance ellipsoid output.",
                  tools: ["MATLAB", "Orbital Mechanics", "Batch Estimation", "STM Propagation", "Covariance Analysis"],
                  report: "/reports/mae182-batch-report.pdf",
                  github: "https://github.com/zeinrady1/MAE182-Orbit-Determination/tree/main/batch-least-squares"
                },
                {
                  title: "Sequential Orbit Determination (EKF)",
                  subtitle: "MAE 182 – Spacecraft GNC, UCSD | Final Exam Project, Jun 2026",
                  desc: "Implemented a sequential Extended Kalman Filter in MATLAB for the same 18-state orbit determination problem. Processes observations one at a time with segment-by-segment STM propagation via ode45. Uses the Joseph-form covariance update for numerical stability and back-propagates to t₀ after convergence. Validates against the batch solution via 1-σ error ellipsoid comparison.",
                  tools: ["MATLAB", "Extended Kalman Filter", "Numerical Integration", "Statistical Estimation", "Joseph Form"],
                  github: "https://github.com/zeinrady1/MAE182-Orbit-Determination/tree/main/sequential-ekf"
                },
                {
                  title: "High-Powered Rocket – Proxima (RPL @ UCSD)",
                  subtitle: "Lead Design Engineer | Oct 2024 – Jun 2025",
                  desc: "Led multidisciplinary team design of a high-powered rocket from scratch. Used SolidWorks for full CAD modeling and OpenRocket for aerodynamic simulations. Performed iterative design to optimize structural stability and maximize altitude. Manufactured components via 3D printing and launched successfully.",
                  tools: ["SolidWorks", "OpenRocket", "3D Printing", "Structural Analysis"],
                  report: "/reports/proxima-cdr.pdf",
                  coverImage: "/images/proxima/IMG_8165.jpg",
                  images: [
                    "/images/proxima/IMG_8165.jpg",
                    "/images/proxima/IMG_8167.jpg",
                    "/images/proxima/IMG_6281.jpg",
                    "/images/proxima/IMG_6282.jpg",
                    "/images/proxima/IMG_6283.jpg",
                    "/images/proxima/IMG_6321.jpg",
                  ]
                },
                {
                  title: "Autonomous Quadcopter – DBVF @ UCSD",
                  subtitle: "Embedded Systems Team Member | Nov 2024 – Jun 2025",
                  desc: "Integrated Pixhawk 4 flight controller, GPS, telemetry, and onboard sensors into a quadcopter platform. Configured and tested ESCs, calibrated motor thrust, and resolved stability and power-distribution issues. Collaborated with structural and software sub-teams for full system integration.",
                  tools: ["Pixhawk 4", "Arduino", "Avionics", "Embedded Systems", "Wiring"]
                },
                {
                  title: "Freestanding Bleacher Structures (Freelance)",
                  subtitle: "Lead Structural Designer | Jun 2025 – Aug 2025",
                  desc: "Designed and modeled six custom freestanding bleacher-style structures in SolidWorks, each rated to support 5,000 lbs of live load with a minimum factor of safety of 4.5 (30,000 lbs total capacity). Performed FEA simulations for stress, strain, and displacement. Worked directly with contractors and architects on-site.",
                  tools: ["SolidWorks", "FEA", "Structural Engineering", "CAD Documentation"],
                  coverImage: "/images/freelance/FULL_ASSEMBLY.png",
                  images: [
                    "/images/freelance/bar_area_with_measurements.png",
                    "/images/freelance/bar_area_withPlywood.png",
                    "/images/freelance/screenshot_175846.png",
                    "/images/freelance/HIGH_BOX_92.5_DIMENSIONS.png",
                    "/images/freelance/HIGH_BOX_92.5_FOS_TOP.png",
                    "/images/freelance/HIGH_BOX_92.5_FOS_BOTTOM.png",
                    "/images/freelance/HIGH_BOX_147_DIMENSIONS.png",
                    "/images/freelance/HIGH_BOX_147_FOS_TOP.png",
                    "/images/freelance/HIGH_BOX_147_FOS_BOTTOM.png",
                    "/images/freelance/LOW_BOX_92.5_DIMENSIONS.png",
                    "/images/freelance/LOW_BOX_92.5_FOS_BOTTOM.png",
                    "/images/freelance/LOW_BOX_92.5_FOS_TOP.png",
                    "/images/freelance/LOW_BOX_147_DIMENSIONS.png",
                    "/images/freelance/LOW_BOX_147_FOS_TOP.png",
                    "/images/freelance/LOW_BOX_147_FOS_BOTTOM.png",
                    "/images/freelance/MEDIUM_BOX_92.5_DIMENSIONS.png",
                    "/images/freelance/MEDIUM_BOX_92.5_FOS_TOP.png",
                    "/images/freelance/MEDIUM_BOX_92.5_FOS_BOTTOM.png",
                    "/images/freelance/MEDIUM_BOX_147_DIMENSIONS.png",
                    "/images/freelance/MEDIUM_BOX_147_FOS_BOTTOM.png",
                    "/images/freelance/MEDIUM_BOX_147_FOS_TOP.png",
                    "/images/freelance/left_side.png",
                    "/images/freelance/right_side.png",
                    "/images/freelance/screenshot_173417.png",
                    "/images/freelance/tree_structure_fos.png",
                    "/images/freelance/IMG_1749.jpg",
                    "/images/freelance/IMG_1748.jpg",
                    "/images/freelance/IMG_1744.jpg",
                    "/images/freelance/IMG_1743.jpg",
                    "/images/freelance/IMG_1742.jpg",
                    "/images/freelance/IMG_1741.jpg",
                    "/images/freelance/IMG_1740.jpg",
                  ]
                }
              ].map((proj, idx) => (
                <div key={idx} className="group bg-card/70 backdrop-blur-md border border-border p-6 rounded-2xl hover:border-primary transition-all duration-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] flex flex-col" data-testid={`card-project-${idx}`}>
                  {proj.coverImage && (
                    <img src={proj.coverImage} alt={proj.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                  )}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{proj.title}</h3>
                  <p className="text-sm font-medium text-primary/80 mb-4">{proj.subtitle}</p>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-secondary/80 text-xs rounded-full text-primary border border-primary/20 hover:border-primary/60 transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>
                  {(proj.report || proj.github) && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {proj.report && (
                        <a href={proj.report} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-all">
                          <FileText className="w-3.5 h-3.5" /> View Report
                        </a>
                      )}
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-white hover:border-white/40 transition-all">
                          <Github className="w-3.5 h-3.5" /> View Code
                        </a>
                      )}
                    </div>
                  )}
                  {proj.images && (
                    <div className="mt-4">
                      <button
                        onClick={() => { setGalleryImages(proj.images!); setGalleryTitle(proj.title); setGalleryOpen(true); }}
                        className="text-sm font-medium text-primary border border-primary/40 rounded-lg px-4 py-2 hover:bg-primary/10 hover:border-primary transition-all"
                      >
                        View all {proj.images.length} photos
                      </button>
                    </div>
                  )}
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
              <div className="bg-card/70 backdrop-blur-md border border-border p-8 rounded-2xl hover:border-primary/40 transition-colors">
                <h3 className="text-xl font-bold text-white mb-6">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {["MATLAB", "SolidWorks", "OpenRocket", "Structural Engineering", "FEA Analysis", "3D CAD Modeling", "CAD Documentation", "3D Printing", "Arduino", "Soldering & Wiring", "Excel", "C Programming", "Data Analysis & Visualization", "GitHub", "Project Management", "Claude AI", "ChatGPT"].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-secondary/80 text-sm rounded-lg text-primary border border-primary/20 hover:border-primary hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-default" data-testid={`tag-skill-${skill}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-card/70 backdrop-blur-md border border-border p-8 rounded-2xl hover:border-white/20 transition-colors">
                <h3 className="text-xl font-bold text-white mb-6">Soft Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {["Leadership", "Problem Solving", "Critical Thinking", "Cross-functional Collaboration", "Analytical Problem-Solving", "Attention to Detail", "Communication", "Adaptability", "Time Management", "Team Coordination", "Teamwork", "Public Speaking", "Creative Collaboration", "Multitasking", "Organization", "Emotional Intelligence"].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-secondary/80 text-sm rounded-lg text-white border border-border hover:border-white/40 transition-all cursor-default" data-testid={`tag-softskill-${skill}`}>
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

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <a href="mailto:radyzein2003@gmail.com" className="flex items-center justify-center gap-3 bg-card/70 backdrop-blur-md border border-border p-4 rounded-xl hover:border-primary transition-colors text-white hover:text-primary" data-testid="link-email">
                <Mail className="w-5 h-5" />
                <span className="text-sm">radyzein2003@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/zein-rady-a3475227b" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-card/70 backdrop-blur-md border border-border p-4 rounded-xl hover:border-primary transition-colors text-white hover:text-primary" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn Profile</span>
              </a>
              <a href="https://github.com/zeinrady1" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-card/70 backdrop-blur-md border border-border p-4 rounded-xl hover:border-primary transition-colors text-white hover:text-primary" data-testid="link-github">
                <Github className="w-5 h-5" />
                <span>GitHub Profile</span>
              </a>
            </div>

            <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-4 bg-card/70 backdrop-blur-md border border-border p-8 rounded-2xl">
              <Input name="name" placeholder="Name" required className="bg-secondary/50 border-border/50 focus-visible:ring-primary" data-testid="input-name" />
              <Input name="email" type="email" placeholder="Email" required className="bg-secondary/50 border-border/50 focus-visible:ring-primary" data-testid="input-email" />
              <Textarea name="message" placeholder="Message" required rows={5} className="bg-secondary/50 border-border/50 focus-visible:ring-primary resize-none" data-testid="textarea-message" />
              <Button type="submit" disabled={sending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]" data-testid="button-submit">
                <Send className="w-4 h-4 mr-2" /> {sending ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </section>
      </main>

      {/* Photo gallery modal */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 py-10"
          onClick={() => setGalleryOpen(false)}
        >
          <div
            className="bg-background border border-border rounded-2xl w-full max-w-5xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
              <h3 className="text-xl font-bold text-white">{galleryTitle} – Project Photos</h3>
              <button
                onClick={() => setGalleryOpen(false)}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary/20 hover:border-primary border border-transparent transition-all text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img, i) => (
                <a key={i} href={img} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`Photo ${i + 1}`}
                    className="w-full object-cover hover:scale-[1.02] transition-transform duration-200 cursor-zoom-in"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">Zein Rady © 2026</p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/zein-rady-a3475227b" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-linkedin">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:radyzein2003@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
