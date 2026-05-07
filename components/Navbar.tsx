import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const userName = useAuthStore((s) => s.userName);
  const signOut = useAuthStore((s) => s.signOut);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navLinks = [
    { label: 'START', href: '#start' },
    { label: 'FEATURES', href: '#features' },
    { label: 'GROWTH', href: '#growth' },
    { label: 'STRATEGY', href: '#strategy' },
    { label: 'DASHBOARD', href: '#dashboard' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'py-3' : 'py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-full transition-all duration-300 ${
            isScrolled || isMenuOpen
              ? 'bg-surface backdrop-blur-md border border-borderSubtle shadow-soft-card'
              : 'bg-transparent border-transparent'
          }`}>
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg transition-opacity duration-200 hover:opacity-90"
            >
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center rotate-12 transition-transform duration-200 hover:rotate-0">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-heading font-bold tracking-tight text-primary">
                SCALEUP<span className="text-secondary">STUDIO</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium tracking-wide text-secondary transition-colors duration-200 hover:text-accent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop Actions + Mobile Burger */}
            <div className="flex items-center gap-3">
              {/* Desktop auth */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <>
                    <span className="text-sm font-medium text-primary truncate max-w-[140px]">
                      {userName ?? user.email}
                    </span>
                    <button
                      type="button"
                      onClick={() => { signOut(); navigate('/'); }}
                      className="text-sm font-medium text-secondary transition-colors duration-200 hover:text-accent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1 px-2"
                    >
                      LOG OUT
                    </button>
                    <Link
                      to="/assessment"
                      className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-accent/30 transition-all duration-200 hover:opacity-95 hover:shadow-xl hover:shadow-accent/40"
                    >
                      MY ASSESSMENT
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-sm font-medium text-secondary transition-colors duration-200 hover:text-accent rounded-sm py-1 px-2"
                    >
                      LOG IN
                    </Link>
                    <Link
                      to="/assessment"
                      className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-accent/30 transition-all duration-200 hover:opacity-95 hover:shadow-xl hover:shadow-accent/40"
                    >
                      GET STARTED
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile: CTA button (always visible) */}
              <Link
                to={user ? '/assessment' : '/assessment'}
                className="md:hidden bg-accent text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-accent/30"
              >
                {user ? 'ASSESSMENT' : 'START'}
              </Link>

              {/* Burger button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className={`block w-5 h-0.5 bg-primary rounded-full transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-primary rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-primary rounded-full transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        style={{ paddingTop: '72px' }}
      >
        <div className="mx-4 bg-surface border border-borderSubtle rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6">
            {/* Nav links */}
            <nav className="space-y-1 mb-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold tracking-widest text-secondary hover:text-accent hover:bg-accentSoft transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className="border-t border-borderSubtle mb-6" />

            {/* Auth section */}
            {user ? (
              <div className="space-y-3">
                <div className="px-4 py-3 rounded-2xl bg-accentSoft border border-accent/20">
                  <p className="text-xs font-bold text-accent tracking-widest uppercase mb-0.5">Logged in as</p>
                  <p className="text-sm font-medium text-primary truncate">{userName ?? user.email}</p>
                </div>
                <Link
                  to="/assessment"
                  className="block w-full text-center py-3.5 rounded-2xl bg-accent text-white font-bold text-sm shadow-lg shadow-accent/30"
                >
                  MY ASSESSMENT
                </Link>
                <button
                  type="button"
                  onClick={() => { signOut(); navigate('/'); setIsMenuOpen(false); }}
                  className="w-full py-3 rounded-2xl border-2 border-borderSubtle text-secondary font-medium text-sm hover:border-accent/40 hover:text-accent transition-all"
                >
                  LOG OUT
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/assessment"
                  className="block w-full text-center py-3.5 rounded-2xl bg-accent text-white font-bold text-sm shadow-lg shadow-accent/30"
                >
                  GET STARTED
                </Link>
                <Link
                  to="/login"
                  className="block w-full text-center py-3 rounded-2xl border-2 border-borderSubtle text-secondary font-medium text-sm hover:border-accent/40 hover:text-accent transition-all"
                >
                  LOG IN
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
