import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Name is required.';
    
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    
    if (!form.message.trim()) tempErrors.message = 'Message is required.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error dynamically as the user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate server request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: '', email: '', message: '' });
      
      // Clear success notification after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" ref={revealRef}>
      <div className="glow-blob" style={{ bottom: '5%', left: '20%', width: '300px', height: '300px', background: 'hsl(var(--primary) / 0.15)' }}></div>

      <div className="section-title reveal-hidden delay-100">
        <h2>Get In Touch</h2>
        <p>Let's talk about architectures, collaborations, or job roles.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-panel reveal-hidden delay-200">
          <p>
            I am always open to new opportunities, projects, or just chatting about interactive technologies.
            Feel free to drop a line, and I will get back to you as soon as possible.
          </p>

          <div className="contact-details">
            <div className="contact-detail-card">
              <div className="contact-detail-icon">
                <Mail size={20} />
              </div>
              <div className="contact-detail-content">
                <h4>Email Me</h4>
                <p>fred.kiboga.dev@example.com</p>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-detail-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-detail-content">
                <h4>Location</h4>
                <p>Nairobi County, Kenya</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="project-link-icon" style={{ width: '44px', height: '44px' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/fredkiboga" target="_blank" rel="noreferrer" className="project-link-icon" style={{ width: '44px', height: '44px' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="project-link-icon" style={{ width: '44px', height: '44px' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>


        <form onSubmit={handleSubmit} className="contact-form glass-panel reveal-hidden delay-300">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Your Name"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="your@email.com"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleInputChange}
              className="form-input"
              rows={5}
              placeholder="Hi Fred, I'd love to chat about..."
              style={{ resize: 'vertical' }}
            />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" style={{ animation: 'rotate-slow 1.5s linear infinite' }} />
                Sending Message...
              </>
            ) : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </button>

          {isSuccess && (
            <div className="form-success-msg">
              <CheckCircle2 size={18} />
              <span>Message sent successfully! I will reply shortly.</span>
            </div>
          )}
        </form>
      </div>
      <div className="footer-spacer"></div>
    </section>
  );
}
