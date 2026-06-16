import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Import local images
import nebulaImg from '../assets/nebula_dashboard.png';
import novaImg from '../assets/nova_sync.png';
import hyperImg from '../assets/hyperlight_engine.png';
import vaporImg from '../assets/vapor_shop.png';

interface Project {
  id: string;
  title: string;
  desc: string;
  category: 'Frontend' | 'Fullstack' | 'Creative';
  tech: string[];
  image: string;
  demoUrl: string;
  repoUrl: string;
}

export default function Projects() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<string>('All');

  const projectsData: Project[] = [
    {
      id: 'nebula',
      title: 'Nebula ML Telemetry',
      desc: 'An interactive 3D telemetry dashboard coupled with a Python-based machine learning model to analyze and predict simulation telemetry patterns.',
      category: 'Frontend',
      tech: ['React', 'WebGL', 'Three.js', 'Python API', 'Data Analysis'],
      image: nebulaImg,
      demoUrl: 'https://github.com',
      repoUrl: 'https://github.com'
    },
    {
      id: 'nova',
      title: 'Nova Data Workspace',
      desc: 'A collaborative real-time team workspace SaaS dashboard displaying predictive data model analytics and integrated dataset upload pipelines.',
      category: 'Fullstack',
      tech: ['Next.js', 'Python Flask', 'Pandas', 'PostgreSQL', 'WebSockets'],
      image: novaImg,
      demoUrl: 'https://github.com',
      repoUrl: 'https://github.com'
    },
    {
      id: 'hyperlight',
      title: 'Neural Node Engine',
      desc: 'An interactive neural network particle canvas simulation visualising weight connections, gravity node fields, and backpropagation paths in real time.',
      category: 'Creative',
      tech: ['HTML5 Canvas', 'TypeScript', 'Neural Networks', 'Physics Models'],
      image: hyperImg,
      demoUrl: 'https://github.com',
      repoUrl: 'https://github.com'
    },
    {
      id: 'vapor',
      title: 'Vapor Digital Product',
      desc: 'An immersive digital product catalog design from scratch showcasing product architectures, retro animations, and custom style triggers.',
      category: 'Frontend',
      tech: ['React.js', 'Vanilla CSS', 'Product Design', 'Local State'],
      image: vaporImg,
      demoUrl: 'https://github.com',
      repoUrl: 'https://github.com'
    }
  ];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" ref={revealRef}>
      <div className="section-title reveal-hidden delay-100">
        <h2>Selected Projects</h2>
        <p>A handpicked selection of interactive systems and architectures I've designed.</p>
      </div>

      {/* Filter bar */}
      <div className="projects-filter-bar reveal-hidden delay-200">
        {['All', 'Frontend', 'Fullstack', 'Creative'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="project-card glass-panel reveal-hidden delay-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <div className="project-links">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link-icon"
                    title="Live Demo"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={18} />
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link-icon"
                    title="GitHub Repository"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>


            <div className="project-info">
              <div className="project-title-row">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-tech-badge" style={{ borderColor: 'hsl(var(--primary) / 0.3)', color: 'hsl(var(--primary))' }}>
                  {project.category}
                </span>
              </div>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-tech-badge">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
