import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n';

interface NavItem {
  id: string;
  label: string;
}

export function FloatingNav() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('clusters');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['clusters', 'compare', 'bilateral-advice'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const navItems: NavItem[] = [
    { id: 'clusters', label: t('culturalClusters') },
    { id: 'compare', label: t('countrySelection') },
    { id: 'bilateral-advice', label: t('bilateralAdvice') },
  ];

  return (
    <nav
      aria-label="Quick Navigation"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex gap-1 rounded-full border border-white/10 bg-[#12172a]/85 backdrop-blur-xl shadow-2xl px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white/10 text-[var(--color-brass)]'
                  : 'text-[var(--color-ivory-muted)] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
