import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About the Issue' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/laws', label: 'Laws & Policy' },
  { path: '/solutions', label: 'Solutions' },
  { path: '/conclusion', label: 'Conclusion' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-border shadow-md shadow-primary/5'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-base font-900 text-primary">SafeNet PH</span>
              <span className="font-body text-[10px] text-muted-foreground font-medium -mt-0.5">Children's Online Safety</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-body font-semibold transition-all duration-300 rounded-xl ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* SafeBot CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full font-body text-sm font-semibold border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              SafeBot is Online
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 text-sm font-body font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-3 mx-4 flex items-center gap-2 bg-accent/10 text-accent px-4 py-3 rounded-2xl font-body text-sm font-semibold border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                SafeBot is Online — Ask a question!
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}