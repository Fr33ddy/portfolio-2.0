import { useEffect, useRef } from 'react';

interface ScrollRevealOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const elementRef = useRef<T | null>(null);
  const { triggerOnce = true, ...observerOptions } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add initial class for styling
    element.classList.add('reveal-hidden');

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove('reveal-hidden');
        element.classList.add('reveal-visible');
        
        if (triggerOnce) {
          observer.unobserve(element);
        }
      } else if (!triggerOnce) {
        element.classList.remove('reveal-visible');
        element.classList.add('reveal-hidden');
      }
    }, {
      threshold: 0.15,
      ...observerOptions
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [triggerOnce, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold]);

  return elementRef;
}

