import React from 'react';
import { WHY_CHOOSE_US, INSTITUTE_INFO } from '../data/instituteData';
import { 
  Award, 
  Lightbulb, 
  Compass, 
  ClipboardCheck, 
  Users, 
  HelpCircle, 
  FileText, 
  Target, 
  CheckCircle,
  GraduationCap,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-6 h-6 text-amber-600" />,
  Lightbulb: <Lightbulb className="w-6 h-6 text-amber-600" />,
  Compass: <Compass className="w-6 h-6 text-amber-600" />,
  ClipboardCheck: <ClipboardCheck className="w-6 h-6 text-amber-600" />,
  Users: <Users className="w-6 h-6 text-amber-600" />,
  HelpCircle: <HelpCircle className="w-6 h-6 text-amber-600" />,
  FileText: <FileText className="w-6 h-6 text-amber-600" />,
  Target: <Target className="w-6 h-6 text-amber-600" />,
};

interface WhyChooseUsProps {
  onOpenDemoModal: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenDemoModal }) => {
  return (
    <section id="why-us" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>The PI Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Choose The PI Classes?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Every child possesses unique potential. We pair structured academic pedagogy with caring, individual mentorship to turn effort into top ranks and clear concepts.
          </p>
        </div>

        {/* 8 Core Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  {iconMap[item.icon] || <Award className="w-6 h-6 text-amber-600" />}
                </div>

                <h3 className="mt-4 font-bold text-lg text-slate-900 leading-snug group-hover:text-indigo-900 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1 text-xs font-semibold text-amber-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified PI Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Goal Feature Card */}
        <div className="mt-14 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>Our Guiding Purpose</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Our Institutional Goal
              </h3>

              <blockquote className="text-base sm:text-xl text-slate-200 font-medium italic border-l-4 border-amber-400 pl-4 py-1 leading-relaxed">
                "{INSTITUTE_INFO.goal}"
              </blockquote>

              <p className="text-amber-300 font-bold text-sm tracking-wide">
                — {INSTITUTE_INFO.name} ({INSTITUTE_INFO.tagline})
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center w-full max-w-sm">
                <div className="text-3xl font-black text-amber-300 font-serif">π</div>
                <div className="text-base font-bold text-white mt-1">Experience The Difference</div>
                <p className="text-xs text-slate-300 mt-1 mb-4">
                  Join our upcoming batch or request a one-on-one counseling session.
                </p>
                <button
                  onClick={onOpenDemoModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Book Free Demo Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
