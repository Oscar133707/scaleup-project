
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
      }`}>
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between px-6 py-4 rounded-full transition-all duration-300 ${isScrolled ? 'bg-surface backdrop-blur-md border border-borderSubtle shadow-soft-card' : 'bg-transparent border-transparent'
          }`}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center rotate-12 transition-transform hover:rotate-0">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-heading font-bold tracking-tight text-primary">
              SCALEUP<span className="text-secondary">STUDIO</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Start', 'Features', 'Growth', 'Strategy'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium tracking-wide text-secondary transition-colors hover:text-accent cursor-pointer"
              >
                {link.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium text-secondary transition-colors hover:text-accent cursor-pointer">
              LOG IN
            </button>
            <button className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-accent/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/40 active:scale-95 cursor-pointer">
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
