import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import kvstone from "./assets/work/kvstone.jpg";
import kotaHero from "./assets/work/kota-hero.jpg";
import kotaSpaces from "./assets/work/kota-spaces.jpg";

gsap.registerPlugin(ScrollTrigger);

import giftingImg from "./assets/services/gifting.jpg";
import businessImg from "./assets/services/business.jpg";
import personalImg from "./assets/services/personal.jpg";
import studioImg from "./assets/services/studio.jpg";
import mvpsImg from "./assets/services/mvps.jpg";
import maintenanceImg from "./assets/services/maintenance.jpg";

const shots = [
  [kvstone, "K.V Stone"],
  [kotaHero, "Kota Furniture Hub"],
  [kotaSpaces, "Kota Furniture Hub — curated spaces"],
];

// CSS can't stop an autoplaying loop; the rest of the page handles this in @media
const stillness = matchMedia("(prefers-reduced-motion: reduce)").matches;

const services = [
  {
    id: "01",
    title: "GIFTING & OCCASION",
    desc: "Digital gifts that outlive the occasion. Timelines, secret letters, memory maps.",
    image: giftingImg,
    tags: ["Digital Gifts", "Timelines", "Secret Letters", "Memory Maps"]
  },
  {
    id: "02",
    title: "BUSINESS SHOWCASE",
    desc: "Blazing-fast sites for shops and businesses. No CMS bloat, no template smell.",
    image: businessImg,
    tags: ["Blazing-fast Sites", "Shops & Businesses", "No CMS Bloat", "No Template Smell"]
  },
  {
    id: "03",
    title: "PERSONAL & PORTFOLIO",
    desc: "Premium personal brands for people whose work deserves better than a grid.",
    image: personalImg,
    tags: ["Personal Branding", "Elite Portfolios", "Interactive Visuals", "Design Systems"]
  },
  {
    id: "04",
    title: "STUDIO PARTNERSHIPS",
    desc: "Your fractional engineering team. Multi-phase builds, ongoing.",
    image: studioImg,
    tags: ["Fractional Engineering", "Multi-phase Builds", "Dedicated Development", "Ongoing Rescues"]
  },
  {
    id: "05",
    title: "APPS & MVPS",
    desc: "Dashboards, AI interfaces, prototypes. Built fast enough to validate the idea.",
    image: mvpsImg,
    tags: ["Dashboards", "AI Integrations", "Functional Prototypes", "Idea Validation"]
  },
  {
    id: "06",
    title: "MAINTENANCE",
    desc: "Audits, redesigns, rescues. We make old sites fast again.",
    image: maintenanceImg,
    tags: ["Performance Audits", "Layout Redesigns", "Rescue Projects", "Speed Optimization"]
  }
];

function Arrow() {
  return (
    <svg
      className="anim-link-arrow"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnimLink({ href, className, children }) {
  return (
    <a href={href} className={className ? `anim-link ${className}` : "anim-link"}>
      {children}
      <Arrow />
    </a>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const swap = () => {
      const isDark = document.documentElement.classList.toggle("dark");
      sessionStorage.setItem("theme", isDark ? "dark" : "light");
    };
    if (!document.startViewTransition) return swap();
    document.startViewTransition(swap);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
        <g className="theme-toggle-halves">
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill="var(--fg)"
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill="var(--bg)"
          />
        </g>
        <path
          className="theme-toggle-ring"
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="var(--fg)"
        />
      </svg>
    </button>
  );
}

// distanceFromCenter drives x + rotateX; the keyframes read it off --d
function Scatter({ text }) {
  const center = Math.floor(text.length / 2);
  return text.split("").map((ch, i) => (
    <span key={i} style={{ "--d": i - center }}>
      {ch}
    </span>
  ));
}

// one span per word; --w drives the stagger via animation-range
function Words({ text }) {
  return text.split(" ").flatMap((w, i) => [
    i ? " " : null,
    <span key={i} style={{ "--w": i }}>
      {w}
    </span>,
  ]);
}

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("preloader-active");
    return () => {
      document.body.classList.remove("preloader-active");
    };
  }, []);

  // Update progress bar
  useEffect(() => {
    // If progress is 100, trigger completion
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Handle fallback duration in case video doesn't play
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
    }, 6000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleTimeUpdate = (e) => {
    const video = e.currentTarget;
    if (video.duration) {
      const current = Math.min(Math.floor((video.currentTime / video.duration) * 100), 99);
      setProgress((prev) => Math.max(prev, current));
    }
  };

  const handleVideoEnded = () => {
    setProgress(100);
  };

  const handleSkip = () => {
    onComplete(true);
  };

  return (
    <motion.div
      className="preloader-overlay"
      initial={{ opacity: 1 }}
      exit={{ 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
      }}
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div className="preloader-container">
        <motion.div 
          className="preloader-brand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="preloader-title">maggieaurcode</h2>
        </motion.div>

        <motion.div 
          className="preloader-video-wrapper"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <video
            ref={videoRef}
            className="preloader-video"
            src="/intro2.mp4"
            muted
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
          />
        </motion.div>

        <motion.div 
          className="preloader-progress-section"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="preloader-progress-info">
            <span>CRAFTING DIGITAL SPACES</span>
            <span className="preloader-percentage">{progress}%</span>
          </div>
          <div className="preloader-progress-bar">
            <div 
              className="preloader-progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>

      <motion.button 
        className="preloader-skip-btn" 
        onClick={handleSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Skip Intro
      </motion.button>
    </motion.div>
  );
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 18
    }
  }
};

function AntigravityCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const spacing = 45;
    const ringCount = Math.min(25, Math.ceil(Math.max(width, height) / spacing));
    const mouse = { x: null, y: null, active: false };

    // Initialize particles in concentric rings
    for (let r = 0; r < ringCount; r++) {
      const radius = 60 + r * spacing;
      const circumference = 2 * Math.PI * radius;
      const dashCount = Math.floor(circumference / 50);
      const angleStep = (2 * Math.PI) / Math.max(1, dashCount);

      for (let i = 0; i < dashCount; i++) {
        const baseAngle = i * angleStep;
        const dir = r % 2 === 0 ? 1 : -1;
        const speed = dir * (0.0002 + 0.0001 * (1.5 - radius / 1000));

        particles.push({
          radius,
          angle: baseAngle,
          speed,
          x: 0,
          y: 0,
          prevX: 0,
          prevY: 0,
          length: 6 + Math.random() * 8,
          width: 1.2 + Math.random() * 1.5,
          alpha: 0.04 + Math.random() * 0.12,
        });
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      const isDark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const r = isDark ? 255 : 120;
      const g = isDark ? 255 : 125;
      const b = isDark ? 255 : 135;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.angle += p.speed;

        const origX = centerX + p.radius * Math.cos(p.angle);
        const origY = centerY + p.radius * Math.sin(p.angle);

        let targetX = origX;
        let targetY = origY;

        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = origX - mouse.x;
          const dy = origY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const interactRadius = 180;
          if (dist < interactRadius) {
            const force = (interactRadius - dist) / interactRadius;
            
            const rx = dx / dist;
            const ry = dy / dist;

            const sx = -ry;
            const sy = rx;

            targetX += rx * force * 55;
            targetY += ry * force * 55;
            targetX += sx * force * 30;
            targetY += sy * force * 30;
          }
        }

        p.prevX = p.x;
        p.prevY = p.y;

        if (p.x === 0 && p.y === 0) {
          p.x = targetX;
          p.y = targetY;
          p.prevX = targetX;
          p.prevY = targetY;
        }

        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        let angle = p.angle;
        if (p.x - p.prevX !== 0 || p.y - p.prevY !== 0) {
          angle = Math.atan2(p.y - p.prevY, p.x - p.prevX);
        } else {
          angle = p.angle + Math.PI / 2;
        }

        ctx.beginPath();
        const halfLen = p.length / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        ctx.moveTo(p.x - cos * halfLen, p.y - sin * halfLen);
        ctx.lineTo(p.x + cos * halfLen, p.y + sin * halfLen);

        ctx.lineWidth = p.width;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-canvas-container">
      <canvas ref={canvasRef} className="hero-canvas" />
    </div>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 769px) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovered = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${isHovered ? 1.8 : 1})`;
      requestAnimationFrame(updateRing);
    };

    window.addEventListener("mousemove", onMouseMove);
    const animId = requestAnimationFrame(updateRing);

    const addHoverClass = () => {
      isHovered = true;
      ring.classList.add("cursor-hover");
      dot.classList.add("cursor-hover");
    };

    const removeHoverClass = () => {
      isHovered = false;
      ring.classList.remove("cursor-hover");
      dot.classList.remove("cursor-hover");
    };

    const attachListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], .services-item, .stat-card, .theme-toggle");
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
        el.addEventListener("mouseenter", addHoverClass);
        el.addEventListener("mouseleave", removeHoverClass);
      });
    };

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSkipped, setIsSkipped] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const triggerRefs = useRef([]);
  const scrollTrackRef = useRef(null);
  const videoFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 20) {
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setNavbarVisible(false);
      } else {
        // Scrolling up
        setNavbarVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // This timeline handles the entire pinned phase of the video
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrackRef.current,
        start: "top top",       // Action starts the moment the video wrapper fills the viewport
        end: "+=150%",          // How long the video stays pinned (1.5x viewport height)
        scrub: true,            // Links animation progress tightly to trackpad/scroll wheel
        pin: true,              // Locks the section in place while animating
      }
    });

    tl.to(videoFrameRef.current, {
      width: "85vw",            // Shrink from left & right sides
      height: "75vh",           // Shrink from top & bottom sides
      borderRadius: "24px",     // Smoothly round the corners into a card shape
      ease: "power1.inOut"
    });
  }, { scope: scrollTrackRef });

  const servicesContainerRef = useRef(null);

  // Track the scroll progress of the entire services section wrapper
  const { scrollYProgress } = useScroll({
    target: servicesContainerRef,
    offset: ["start start", "end end"],
  });

  // Calculate which item should be active based on scroll %
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalItems = services.length;
    const step = 1 / totalItems;
    const currentIndex = Math.min(
      Math.floor(latest / step),
      totalItems - 1
    );
    setActiveIndex(currentIndex);
  });

  const scrollToService = (index) => {
    if (!servicesContainerRef.current) return;
    const rect = servicesContainerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const containerHeight = rect.height;
    const step = containerHeight / services.length;
    // Scroll to the middle of the segment
    const targetScroll = scrollTop + (index * step) + (step / 2) - (window.innerHeight / 2);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isLoading && (
        isSkipped ? null : (
          <AnimatePresence>
            <Preloader 
              onComplete={(skipped) => {
                if (skipped) {
                  setIsSkipped(true);
                }
                setIsLoading(false);
              }} 
            />
          </AnimatePresence>
        )
      )}

      <motion.div
        className="page page-wrapper"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.97 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <CustomCursor />
      <header className={`logo ${navbarVisible ? "" : "logo--hidden"}`}>
        <div className="logo-container">
          <img src="/logo.jpeg" className="logo-img" alt="logo" />
          <div className="logo-text">
            <span className="logo-main">maggieaurcode</span>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#work">Work</a>
          <a href="#services">Approach</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <ThemeToggle />
      </header>

      {/* PHASE 1: THE HERO SECTION */}
      <section className="hero-section">
        <AntigravityCanvas />

        <div className="hero-grid">
          <h1 className="hero-text left">
            No handoffs, no templates.<br />Just one team obsessed with the details.
          </h1>
          <h1 className="hero-text right">
            We design it, build it, and make it move. One team taking your website from idea to launch.
          </h1>
        </div>
        
        {/* Sticky-style Stats Banner */}
        <div className="stats-banner">
          <div className="stat-item"><strong>100%</strong> obsessed with product details</div>
          <div className="stat-item"><strong>0</strong> handoff delay from design to code</div>
          <div className="stat-item"><strong>10x</strong> your project's launch speed</div>
        </div>
      </section>

      {/* PHASE 2: THE PINNED VIDEO TRACK */}
      <section ref={scrollTrackRef} className="video-track">
        {/* This frame starts at 100vw/100vh and will be manipulated by GSAP */}
        <div ref={videoFrameRef} className="animated-video-frame">
          <video 
            src="/ref.mp4" 
            autoPlay={!stillness}
            loop 
            muted 
            playsInline 
          />
          <button className="play-reel-btn">▶ Play Reel</button>
        </div>
      </section>

      {/* PHASE 3: ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-header">
            <div className="about-tag">
              <span className="about-tag-dot"></span>
              STUDIO IDENTITY
            </div>
            <h2 className="about-title">WHO WE ARE</h2>
            <p className="about-intro">
              We are <strong>maggieaurcode</strong>. A high-end web design and development studio founded by Sanyam and managed by Adit. Operating from Jaipur, Rajasthan, we skip the cookie-cutter shortcuts to build clean, story-driven digital systems focused on elite branding.
            </p>
          </div>
          
          <div className="about-founders">
            <div className="founder-card">
              <div className="founder-img-wrapper">
                <img src="/sanyam.jpeg" alt="Sanyam Bansal" className="founder-img" />
                <div className="corner-accent top-right"></div>
                <div className="corner-accent bottom-left"></div>
              </div>
              <div className="founder-info">
                <h4 className="founder-name">Sanyam Bansal</h4>
                <p className="founder-role">Founder & Director</p>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-img-wrapper">
                <img src="/adit.jpeg" alt="Adit Jain" className="founder-img" />
                <div className="corner-accent top-right"></div>
                <div className="corner-accent bottom-left"></div>
              </div>
              <div className="founder-info">
                <h4 className="founder-name">Adit Jain</h4>
                <p className="founder-role">Studio Manager</p>
              </div>
            </div>
          </div>

          <div className="about-footer-note">
            <svg className="footer-note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="footer-note-text">
              Portraits loaded successfully. We specialize in bespoke, identity-led web architectures that place humans and high-craft branding first.
            </p>
          </div>
        </div>
      </section>

      <section
        className="screen shipped-screen"
        id="work"
        style={{
          height: `${shots.length * 100}vh`,
          "--seg": `${100 / (shots.length - 1)}%`,
        }}
      >
        <div className="shipped-pin">
          <h2 className="shipped">
            <Scatter text="STUFF WE'VE SHIPPED" />
          </h2>

          <div className="shots-frame">
            {shots.map(([src, alt], i) => (
              <img key={src} src={src} alt={alt} style={{ "--i": i }} />
            ))}
          </div>

          <div className="work-row">
            <AnimLink href="#work" className="work-label">
              Work
            </AnimLink>
          </div>
        </div>
      </section>

      {/* Sticky Scroll Showcase Section */}
      <section ref={servicesContainerRef} className="scroll-container build-screen" id="services">
        {/* Sticky wrapper pinned to the top of screen */}
        <div className="sticky-wrapper">
          {/* Header/Title block styled beautifully */}
          <div className="services-header">
            <h2>
              MAGGIEAURCODE IS A HIGH-CRAFT WEB DESIGN &amp; DEVELOPMENT STUDIO THAT BUILDS OBSESSION-WORTHY DIGITAL EXPERIENCES FOR THE MODERN AGE.
            </h2>
          </div>

          <div className="services-grid desktop-only">
            {/* Column 1: Static Label */}
            <div className="services-static-label">
              <span>Our services</span>
            </div>

            {/* Column 2: Numbered Titles List (Active Index transitions color/opacity) */}
            <div className="services-list">
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={service.id}
                    className="services-item"
                    onClick={() => scrollToService(index)}
                  >
                    <span 
                      className="services-item-num" 
                      style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)" }}
                    >
                      {service.id}
                    </span>
                    <h3 
                      className="services-item-title"
                      style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)" }}
                    >
                      {service.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Column 3: Changing Image & Context Tags (Framer Motion) */}
            <div className="services-interactive-col">
              {/* Smooth Crossfading Image Container */}
              <div className="services-image-frame">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={services[activeIndex].image}
                    alt={services[activeIndex].title}
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>

              {/* Dynamic Description & Tags changing based on active state */}
              <div className="services-tags-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <p className="services-desc-text" style={{ fontSize: "1.1rem", lineHeight: "1.45", opacity: 0.85, fontWeight: 300 }}>
                      {services[activeIndex].desc}
                    </p>
                    <div style={{ width: "100%", height: "1px", background: "var(--fg)", opacity: 0.15 }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {services[activeIndex].tags.map((tag, idx) => (
                        <span key={idx} className="services-tag-item" style={{ fontWeight: 600 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Services Infinite Marquee */}
          <div className="services-marquee">
            <div className="marquee-track">
              {services.map((service) => (
                <span key={`ticker-1-${service.id}`} className="marquee-item">
                  {service.title}
                </span>
              ))}
              {services.map((service) => (
                <span key={`ticker-2-${service.id}`} className="marquee-item">
                  {service.title}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile-Only Layout: Simple vertical flow */}
          <div className="showcase-content-mobile mobile-only">
            {services.map((service, i) => (
              <div key={service.title} className="mobile-showcase-item">
                <div className="mobile-showcase-header">
                  <span className="mobile-showcase-num">{service.id}</span>
                  <h3 className="mobile-showcase-title">{service.title}</h3>
                </div>
                <div className="mobile-showcase-img-frame">
                  <img src={service.image} alt={service.title} className="mobile-showcase-img" />
                </div>
                <p className="mobile-showcase-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-hero">
            <h2 className="contact-title">LET&rsquo;S STAY IN TOUCH</h2>
            <AnimLink className="send-note-btn" href="mailto:connect.aditjain@gmail.com">
              SEND A NOTE
            </AnimLink>
          </div>

          <div className="footer-grid">
            <div className="footer-col">
              <span className="footer-col-label">STUDIO</span>
              <ul className="footer-links">
                <li>
                  <AnimLink href="https://www.instagram.com/maggieaurcode?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </AnimLink>
                </li>
                <li>
                  <AnimLink href="https://github.com/Real-sanyam" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </AnimLink>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-col-label">SANYAM BANSAL</span>
              <ul className="footer-links">
                <li>
                  <AnimLink href="https://www.linkedin.com/in/sanyam-b-238b25242/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </AnimLink>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-col-label">ADIT JAIN</span>
              <ul className="footer-links">
                <li>
                  <AnimLink href="https://www.linkedin.com/in/adit-jain-177380370/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </AnimLink>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="footer-col-label">CONTACT INFO</span>
              <ul className="footer-links">
                <li>
                  <span className="info-label">PHONE</span>
                  <AnimLink href="tel:+919571042644">+91 95710 42644</AnimLink>
                </li>
                <li>
                  <span className="info-label">EMAIL</span>
                  <AnimLink href="mailto:connect.aditjain@gmail.com">connect.aditjain@gmail.com</AnimLink>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} maggieaurcode. All rights reserved.</p>
          </div>
        </div>
      </section>
      </motion.div>
    </>
  );
}
