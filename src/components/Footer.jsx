import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Top wave */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full -mb-1 text-background" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
         {/* Brand */}
<div className="lg:col-span-2">
  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
      <MessageCircle className="h-5 w-5 text-white" />
    </div>

    <div>
      <p className="font-heading text-lg font-black">SafeNet PH</p>
      <p className="font-body text-xs text-primary-foreground/60">
        Children's Online Safety Platform
      </p>
    </div>
  </div>

  <p className="font-body text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
    An academic IT case study from North Eastern Mindanao State University
    dedicated to advancing children's online safety and data protection
    across the Philippines.
  </p>

  {/* Emergency banners */}
  <div className="mt-5 flex flex-col gap-3">

    {/* MAKABATA */}
    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
      <span className="text-lg">🚨</span>
      <div>
        <p className="font-body text-xs font-bold text-primary-foreground">
          Emergency Hotline
        </p>
        <p className="font-body text-sm font-semibold text-accent">
          MAKABATA 1383
        </p>
      </div>
    </div>

    {/* DSWD */}
    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
      <span className="text-lg">📞</span>
      <div>
        <p className="font-body text-xs font-bold text-primary-foreground">
          DSWD Hotline
        </p>
        <p className="font-body text-sm font-semibold text-accent">
          0931-755-3702
        </p>
      </div>
    </div>

  </div>
</div>
          <div>
            <h4 className="font-heading text-sm font-bold mb-4 tracking-wide uppercase text-primary-foreground/50">
              Navigate
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About the Issue' },
                { to: '/case-studies', label: 'Case Studies' },
                { to: '/laws', label: 'Laws & Policy' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold mb-4 tracking-wide uppercase text-primary-foreground/50">
              Resources
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: '/solutions', label: 'Solutions' },
                { to: '/conclusion', label: 'Conclusion' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-primary-foreground/50">
              © 2026 SafeNet PH. North Eastern Mindanao State University. All rights reserved.
            </p>
            <p className="font-body text-xs text-primary-foreground/50">
              An academic research project for children's online safety advocacy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}