import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface FloatingActionsProps {
  onOpenDemoModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenDemoModal }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <a
          href={`tel:${INSTITUTE_INFO.cleanPhone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
          id="mobile-float-call"
        >
          <Phone className="w-4 h-4 text-indigo-700" />
          <span>Call Now</span>
        </a>

        <a
          href={INSTITUTE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
          id="mobile-float-whatsapp"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenDemoModal}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          id="mobile-float-demo"
        >
          <Calendar className="w-4 h-4" />
          <span>Free Demo</span>
        </button>
      </div>
    </div>
  );
};
