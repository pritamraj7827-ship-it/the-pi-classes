import React, { useState } from 'react';
import { Phone, MapPin, Calendar, Menu, X, ArrowRight, MessageCircle, ShieldCheck, Shield } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface NavbarProps {
  onOpenDemoModal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Courses", href: "#courses" },
    { label: "Physics (11-12)", href: "#physics-special" },
    { label: "Why Us", href: "#why-us" },
    { label: "Gallery", href: "#gallery" },
    { label: "Admissions", href: "#admissions" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-slate-200">
      {/* Top Notification / Contact Strip */}
      <div className="bg-slate-900 text-slate-100 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Admissions Open 2026–27
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="text-slate-300 hidden md:inline">
              Near Indira Gandhi Pustakalay, Mirchaibari, Katihar
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${INSTITUTE_INFO.cleanPhone}`} 
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium"
              id="top-call-link"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {INSTITUTE_INFO.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={INSTITUTE_INFO.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              id="top-whatsapp-link"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors font-medium cursor-pointer"
              id="top-admin-portal-link"
              title="Admin & Faculty Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Branding */}
          <a href="#home" className="flex items-center gap-3 group" id="brand-logo-link">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shadow-md group-hover:scale-105 transition-transform duration-200 border border-slate-200 shadow-slate-200/50 relative overflow-hidden shrink-0">
              <img 
                src={INSTITUTE_INFO.logo} 
                alt={INSTITUTE_INFO.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  // Fallback to text icon if image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-serif tracking-tighter text-amber-400 absolute -z-10">π</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-900 transition-colors">
                  The PI Classes
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-amber-600">
                The Centre of Excellence
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-indigo-600 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${INSTITUTE_INFO.cleanPhone}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-300/80"
              id="header-call-btn"
            >
              <Phone className="w-4 h-4 text-indigo-700" />
              <span>Call Us</span>
            </a>

            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg text-white bg-indigo-900 hover:bg-indigo-800 shadow-sm transition-all hover:shadow-md cursor-pointer"
              id="header-book-demo-btn"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Free Demo</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-colors cursor-pointer"
              id="header-admin-portal-btn"
              title="Admin Login & Backend Leads Portal"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-700" />
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenDemoModal}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-900 text-white"
              id="mobile-quick-demo-btn"
            >
              Free Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2">
            Navigation
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${INSTITUTE_INFO.cleanPhone}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold bg-slate-100 text-slate-900"
            >
              <Phone className="w-4 h-4 text-indigo-700" />
              <span>Call +91 9470040069</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold bg-indigo-900 text-white shadow-sm"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Free Demo Class</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors"
              id="mobile-admin-portal-btn"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Portal Login (9470040069)</span>
            </button>
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 pt-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Mirchaibari, Katihar, Bihar</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
