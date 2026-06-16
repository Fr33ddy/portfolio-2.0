import { Briefcase, Laptop, Server, Cpu, GraduationCap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  const timelineData = [
    {
      type: 'edu',
      date: '2023 - 2026',
      title: 'B.S. in Computer Science',
      company: 'Mount Kenya University - MKU',
      desc: 'Focusing on database architectures, programming principles, algorithms, and technical software engineering methods.'
    },
    {
      type: 'work',
      date: 'JULY 2025',
      title: 'AI Fundamentals & Data Analytics Essentials',
      company: 'Cisco & IBM SkillsBuild',
      desc: 'Earned certifications in AI structures, data analysis concepts, predictive models, and predictive telemetry systems.'
    },
    {
      type: 'work',
      date: 'AUG 2025',
      title: 'Digital Product Development Cert',
      company: 'Technical University of Munich (TUM)',
      desc: 'Completed "From Zero to Hero - Digital Product Development From Scratch", exploring lifecycle development and product strategies.'
    },
    {
      type: 'work',
      date: 'JUNE 2025',
      title: 'Python & Machine Learning Zero to Hero',
      company: 'DevTown Academy',
      desc: 'Intensive coursework covering Python syntaxes, core data structures, algorithms, and fundamentals of machine learning models.'
    }
  ];

  const skillCategories = [
    {
      title: 'AI/ML & Data Science',
      icon: Cpu,
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'Predictive Modeling', 'AI & Data Science Fundamentals']
    },
    {
      title: 'Programming & OOP',
      icon: Server,
      skills: ['C++', 'Object-Oriented Programming (OOP)', 'Data Structures', 'Algorithms', 'Logic Architectures']
    },
    {
      title: 'Web Technicals',
      icon: Laptop,
      skills: ['HTML5', 'CSS3', 'Responsive Design', 'Vite', 'Browser Mechanics']
    }
  ];

  return (
    <section id="about" ref={revealRef}>
      <div className="section-title reveal-hidden delay-100">
        <h2>About & Skills</h2>
        <p>My journey through machine learning, data structures, and computer science.</p>
      </div>

      <div className="about-grid">
        <div className="about-bio reveal-hidden delay-200">
          <p>
            I am a Computer Science student passionate about Artificial Intelligence and Machine Learning. 
            My focus is on building skills in data analysis, predictive modeling, and AI-driven solutions.
          </p>
          <p>
            I am continuously learning and working on projects that strengthen my technical knowledge while preparing for a future career as an AI/ML Engineer. 
            I am eager to connect, share knowledge, and explore opportunities that allow me to apply innovative technologies to solve real-world problems.
          </p>

          <div className="about-timeline">
            {timelineData.map((item, index) => {
              const Icon = item.type === 'work' ? Briefcase : GraduationCap;
              return (
                <div key={index} className="timeline-item reveal-hidden delay-300">
                  <div className="timeline-icon">
                    <Icon size={16} />
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-date">{item.date}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-company">{item.company}</p>
                    <p style={{ fontSize: '0.92rem', marginTop: '6px', color: 'hsl(var(--text-secondary))' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="skills-wrapper reveal-hidden delay-300">
          {skillCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div key={index} className="skills-category glass-panel">
                <h3 className="skills-category-title">
                  <Icon size={18} style={{ color: 'hsl(var(--primary))' }} />
                  {cat.title}
                </h3>
                <div className="skills-tags">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
