import React from 'react';
import { INSTITUTE_INFO } from '../data/instituteData';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation, 
  CheckCircle2, 
  ExternalLink,
  Building,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Visit or Connect With Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contact The PI Classes
          </h2>

          <p className="text-slate-300 text-base">
            Located conveniently in Mirchaibari, Katihar. Feel free to visit our campus or call our helpline for immediate assistance.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Address & Phone Card */}
          <div className="lg:col-span-6 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-2xl font-serif">
                  π
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{INSTITUTE_INFO.name}</h3>
                  <p className="text-xs text-amber-400 font-bold tracking-wider uppercase">
                    {INSTITUTE_INFO.tagline}
                  </p>
                </div>
              </div>

              {/* Address Highlight */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Campus Address
                  </div>
                  <div className="text-base font-bold text-white leading-relaxed">
                    {INSTITUTE_INFO.address}
                  </div>
                  <div className="pt-2">
                    <a
                      href={INSTITUTE_INFO.googleMapsQuery}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Helpline */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Official Contact & Admissions Helpline
                  </div>
                  <div className="text-xl font-black text-white tracking-wide">
                    <a 
                      href={`tel:${INSTITUTE_INFO.cleanPhone}`} 
                      className="hover:text-amber-400 transition-colors"
                    >
                      {INSTITUTE_INFO.phone}
                    </a>
                  </div>
                  <div className="text-xs text-slate-400">
                    Available for phone consultations, batch information, and queries.
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60">
                <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Class & Office Timings
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {INSTITUTE_INFO.workingHours}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${INSTITUTE_INFO.cleanPhone}`}
                className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call +91 9470040069</span>
              </a>

              <a
                href={INSTITUTE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Message</span>
              </a>
            </div>
          </div>

          {/* Right Column: Call Us For Checklist & Landmark Card */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            {/* Call Us For Card */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>We Are Here to Assist You</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">
                Feel Free to Call Us For:
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Our faculty and admission counselors are glad to answer all your academic questions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INSTITUTE_INFO.callReasons.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center gap-3 hover:border-amber-400/50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              {/* Motto quote */}
              <div className="mt-8 p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-center">
                <p className="text-sm font-bold text-amber-300 italic">
                  "{INSTITUTE_INFO.slogan}"
                </p>
                <span className="text-[11px] text-indigo-300 mt-0.5 block">
                  — The PI Classes, Katihar
                </span>
              </div>
            </div>

            {/* Landmark & Map Interactive Card */}
            <div className="bg-gradient-to-r from-blue-950 to-indigo-950 border border-indigo-800/40 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Building className="w-4 h-4" />
                  <span>Katihar Landmark</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Near Indira Gandhi Pustakalay, Mirchaibari
                </h4>
                <p className="text-xs text-slate-300">
                  Easy commute from all major residential areas and schools in Katihar.
                </p>
              </div>

              <a
                href={INSTITUTE_INFO.googleMapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
