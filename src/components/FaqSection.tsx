import React, { useState } from 'react';
import { FAQS } from '../data/instituteData';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-700" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Common queries answered for students and parents considering The PI Classes.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-indigo-900 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div className={`p-1.5 rounded-full bg-white border border-slate-200 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-indigo-950 text-base">Have more questions?</h4>
            <p className="text-xs text-indigo-800/80 mt-0.5">
              Call our center directly for personalized consultation and batch timing assistance.
            </p>
          </div>
          <a
            href={`tel:${INSTITUTE_INFO.cleanPhone}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-900 text-white font-bold text-xs hover:bg-indigo-800 shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>Call +91 9470040069</span>
          </a>
        </div>
      </div>
    </section>
  );
};
