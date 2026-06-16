import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Code2, Sparkles, Terminal } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const words = ["AI/ML Engineering", "Data Analytics", "Python Development"];

function TypingText() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  return (
    <span style={{ 
      borderRight: '3px solid hsl(var(--primary))', 
      paddingRight: '4px',
      animation: 'blink 0.75s step-end infinite'
    }}>
      {words[index].substring(0, subIndex)}
    </span>
  );
}

export default function Hero() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative mouse coordinate offsets
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max rotation 12 degrees
    const degX = (mouseY / (height / 2)) * -12;
    const degY = (mouseX / (width / 2)) * 12;
    
    setTilt({ x: degX, y: degY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={revealRef}>
      <div className="glow-blob" style={{ top: '10%', left: '10%', width: '350px', height: '350px', background: 'hsl(var(--primary) / 0.25)' }}></div>
      <div className="glow-blob" style={{ bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'hsl(var(--secondary) / 0.25)' }}></div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-tagline reveal-hidden delay-100" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} /> Aspiring AI/ML Engineer
          </div>
          <h1 className="reveal-hidden delay-200" style={{ textAlign: 'left' }}>
            Hi, I'm <span className="text-gradient">Fred Kiboga</span>
          </h1>
          <h2 className="hero-subtitle reveal-hidden delay-300">
            Specialized in <TypingText />
          </h2>
          <p className="reveal-hidden delay-300" style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.15rem', maxWidth: '540px', textAlign: 'left', marginTop: '8px' }}>
            Computer Science student at Mount Kenya University. Passionate about Artificial Intelligence, predictive modeling, data analysis, and building intelligent systems.
          </p>
          <div className="hero-buttons reveal-hidden delay-400">
            <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
              Explore Projects <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
              Let's Connect
            </button>
          </div>
        </div>

        <div className="hero-visual reveal-hidden delay-300">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mockup-card"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <div className="card-header">
              <div className="card-dots">
                <span className="card-dot"></span>
                <span className="card-dot"></span>
                <span className="card-dot"></span>
              </div>
              <Terminal size={16} style={{ color: 'hsl(var(--text-secondary))' }} />
            </div>

            <div className="card-avatar-wrapper">
              <div className="card-avatar">
                👨‍💻
              </div>
            </div>

            <div className="card-info">
              <h3 className="card-title">Fred Kiboga</h3>
              <p className="card-role">&lt;AI/ML Engineer /&gt;</p>
            </div>

            <div className="card-stats">
              <div className="stat-item">
                <span className="stat-val">2026</span>
                <span className="stat-lbl">Grad Year</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">5+</span>
                <span className="stat-lbl">Certs</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">
                  <Code2 size={16} style={{ color: 'hsl(var(--primary))', verticalAlign: 'middle' }} />
                </span>
                <span className="stat-lbl">Python</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
