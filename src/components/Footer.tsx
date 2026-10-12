import React from 'react';
import { INSTITUTE_INFO } from '../data/instituteData';
import { Phone, MapPin, MessageCircle, ArrowUp, Sparkles, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 text-white flex items-center justify-center font-bold text-2xl font-serif overflow-hidden shrink-0 shadow-md">
                <img 
                  src={INSTITUTE_INFO.logo} 
                  alt={INSTITUTE_INFO.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="font-serif tracking-tighter text-amber-400 absolute -z-10">π</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{INSTITUTE_INFO.name}</h3>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  {INSTITUTE_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Dedicated coaching institute providing quality academic education and focused guidance to school students. We help students build strong concepts, improve academic performance, and prepare confidently for examinations.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 inline-block">
              <p className="text-xs font-semibold text-amber-300 italic">
                "{INSTITUTE_INFO.slogan}"
              </p>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Programs Offered
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  CBSE Classes 7 – 10 (All Subjects)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  Class 7 Foundation
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  Class 8 Pre-Secondary
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  Class 9 Board Readiness
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  Class 10 CBSE Board Target Batch
                </a>
              </li>
              <li>
                <a href="#physics-special" className="hover:text-amber-400 transition-colors">
                  Class 11 Physics (Specialized)
                </a>
              </li>
              <li>
                <a href="#physics-special" className="hover:text-amber-400 transition-colors">
                  Class 12 Physics (Board Target)
                </a>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <a href="#gallery" className="text-amber-400 hover:underline font-medium">
                  📸 Campus & Classroom Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Timings */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Campus & Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{INSTITUTE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${INSTITUTE_INFO.cleanPhone}`} className="text-white hover:text-amber-400 font-semibold">
                  {INSTITUTE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={INSTITUTE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
                  WhatsApp: +91 9470040069
                </a>
              </div>
              <div className="pt-2 text-slate-500 text-[11px]">
                {INSTITUTE_INFO.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {INSTITUTE_INFO.name} ({INSTITUTE_INFO.tagline}). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Katihar, Bihar</span>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-amber-400 text-slate-400 flex items-center gap-1 transition-colors cursor-pointer"
                  id="footer-admin-link"
                >
                  <Shield className="w-3 h-3 text-indigo-400" />
                  <span>Admin Portal</span>
                </button>
              </>
            )}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
