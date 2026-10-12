import React from 'react';
import { Phone, Calendar, ArrowRight, CheckCircle2, Award, Sparkles, MapPin, MessageCircle, ShieldCheck, GraduationCap } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface HeroProps {
  onOpenDemoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Pi Mathematical Wallpaper Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/pi-bg.jpg"
          alt="Pi Mathematics Wallpaper"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        {/* Soft gradient overlays to preserve deep contrast and typographic legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Background Geometric & Math Gradients */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-400/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline / Subtitle Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/80 border border-indigo-700/60 text-indigo-200 text-xs sm:text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>The Centre of Excellence • Katihar, Bihar</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Build Strong Concepts. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                Achieve Academic Excellence.
              </span>
            </h1>

            {/* Institute Motto Quote */}
            <div className="border-l-4 border-amber-400 pl-4 py-1 text-left inline-block bg-white/5 rounded-r-lg">
              <p className="text-amber-300 font-semibold text-base sm:text-lg tracking-wide italic">
                "{INSTITUTE_INFO.slogan}"
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              The PI Classes is a premier coaching institute dedicated to providing quality academic education and focused guidance to school students. We help students master core fundamentals, boost academic performance, and prepare with unshakeable confidence for school and board examinations.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200 text-left">
              <div className="flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">CBSE Classes 7 – 10 All Subjects</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">Classes 11 & 12 Specialized Physics</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">Rigorous Doubt-Solving & Regular Tests</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">Personal Attention & Small Batches</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4 justify-center lg:justify-start">
              <button
                onClick={onOpenDemoModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-slate-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 font-bold text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5 cursor-pointer"
                id="hero-book-demo-btn"
              >
                <Calendar className="w-5 h-5 text-slate-900" />
                <span>Book a Free Demo Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${INSTITUTE_INFO.cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-base transition-all"
                id="hero-call-btn"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {INSTITUTE_INFO.phone}</span>
              </a>

              <a
                href={INSTITUTE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 font-semibold text-sm transition-all"
                id="hero-whatsapp-btn"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Address snippet */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Location: Near Indira Gandhi Pustakalay, Mirchaibari, Katihar</span>
            </div>
          </div>

          {/* Right Column: Interactive Academy Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0 shadow-xs relative">
                    <img 
                      src={INSTITUTE_INFO.logo} 
                      alt={INSTITUTE_INFO.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="font-serif text-amber-300 font-black absolute -z-10">π</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">The PI Classes</h3>
                    <p className="text-xs text-amber-400 font-medium">The Centre of Excellence</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  New Batches Open
                </span>
              </div>

              {/* Card Content: Academic Highlights */}
              <div className="mt-6 space-y-4">
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                      Foundational Program
                    </span>
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
                      CBSE / NCERT
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">CBSE Classes 7, 8, 9 & 10</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Maths, Science, English, Social Science, Hindi & more. Focus on concept clarity, daily practice, and regular assessments.
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/10 rounded-full blur-lg" />
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Senior Secondary Specialization
                    </span>
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                      Board Target
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">Classes 11 & 12 — Physics</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Strong conceptual foundation, in-depth derivations, numerical problem-solving mastery, and board examination preparation.
                  </p>
                </div>

                {/* Real Classroom Glimpse */}
                <a
                  href="#gallery"
                  className="block relative rounded-xl overflow-hidden border border-slate-700/80 group hover:border-amber-400/60 transition-all shadow-md"
                  title="View Institute Classroom & Campus Photos"
                >
                  <div className="h-28 w-full bg-slate-950 overflow-hidden relative">
                    <img
                      src="https://thepiclasses.org.in/gallery/img-5.jpg"
                      alt="Classroom session at The PI Classes"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 drop-shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Real Classroom Session • Mirchaibari</span>
                      </div>
                      <span className="text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700 group-hover:border-amber-400 group-hover:text-amber-300 transition-colors">
                        Explore Photos →
                      </span>
                    </div>
                  </div>
                </a>

                {/* Institute Metrics / Trust Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-2.5">
                    <div className="text-lg font-black text-amber-400">100%</div>
                    <div className="text-[11px] text-slate-300 font-medium">Concept Based</div>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-2.5">
                    <div className="text-lg font-black text-indigo-300">Medium</div>
                    <div className="text-[11px] text-slate-300 font-medium">Batch Sizes</div>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-2.5">
                    <div className="text-lg font-black text-emerald-400">Regular</div>
                    <div className="text-[11px] text-slate-300 font-medium">Tests & Review</div>
                  </div>
                </div>

                {/* Call-in box */}
                <div className="pt-2">
                  <a
                    href={`tel:${INSTITUTE_INFO.cleanPhone}`}
                    className="flex items-center justify-between w-full p-3 rounded-xl bg-gradient-to-r from-indigo-900 to-blue-900 hover:from-indigo-800 hover:to-blue-800 text-white text-xs font-medium border border-indigo-600/40 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>Direct Admission Desk: <strong className="text-amber-300 font-bold">{INSTITUTE_INFO.phone}</strong></span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
