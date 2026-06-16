import { useEffect, useState } from 'react';
import { Home, User, FolderGit2, Mail, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      // Observe targets as they scroll through the middle area of the screen
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar-dock">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            aria-label={item.label}
          >
            <Icon size={20} strokeWidth={2.2} />
            <span className="nav-tooltip">{item.label}</span>
          </button>
        );
      })}
      
      <button
        onClick={toggleTheme}
        className="nav-item theme-toggle-btn"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun size={20} strokeWidth={2.2} />
        ) : (
          <Moon size={20} strokeWidth={2.2} />
        )}
        <span className="nav-tooltip">Theme</span>
      </button>
    </nav>
  );
}
