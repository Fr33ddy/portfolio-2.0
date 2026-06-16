import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticlesBg from './components/ParticlesBg';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <ParticlesBg />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

export default App;

