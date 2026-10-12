import React, { useState } from 'react';
import { Atom, Zap, BookOpen, Target, CheckCircle2, Calculator, Award, ArrowRight, FileCheck2, Compass } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface PhysicsSpotlightProps {
  onOpenDemoModal: () => void;
}

export const PhysicsSpotlight: React.FC<PhysicsSpotlightProps> = ({ onOpenDemoModal }) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  const physicsModules = [
    {
      title: "Strong Conceptual Foundation",
      tag: "Concept Clarity",
      desc: "Physics cannot be memorized. We teach from fundamental principles, physical intuition, and diagrams so formulas make complete sense.",
      deliverables: ["Visual concept building", "Real-world physics examples", "First-principles approach"]
    },
    {
      title: "Numerical Problem-Solving",
      tag: "Calculation Mastery",
      desc: "Systematic step-by-step problem-solving technique for CBSE boards and numerical challenges, from standard NCERT problems to complex multi-concept questions.",
      deliverables: ["Step-by-step numerical methodology", "Formula application workshops", "Unit conversion & error checks"]
    },
    {
      title: "Important Derivations & Diagrams",
      tag: "Derivation Drill",
      desc: "Comprehensive coverage of all high-weightage derivations with precise mathematical steps and labeled ray/circuit diagrams required for full marks in boards.",
      deliverables: ["Derivation summary registers", "Board-standard presentation style", "Frequent written recall tests"]
    },
    {
      title: "NCERT-Based Board Preparation",
      tag: "100% Board Aligned",
      desc: "Every single line of NCERT, including in-text questions, back exercises, and NCERT Exemplar problems, is solved and discussed thoroughly in class.",
      deliverables: ["Complete NCERT line-by-line coverage", "Exemplar problem discussions", "10 Years CBSE board paper trends"]
    },
    {
      title: "Regular Practice & Timed Tests",
      tag: "Exam Simulation",
      desc: "Periodic chapter-end tests and full-syllabus mock exams designed strictly according to latest CBSE marking scheme with individual feedback.",
      deliverables: ["Weekly 25-mark chapter tests", "Timed 3-hour board simulations", "Detailed answer-sheet evaluation"]
    },
    {
      title: "One-on-One Doubt-Solving",
      tag: "Zero Doubt Policy",
      desc: "Students receive individual attention to clear theoretical hurdles, confusing steps in derivations, or numerical roadblocks without hesitation.",
      deliverables: ["Daily dedicated doubt window", "Individual teacher attention", "Remedial revision for tough units"]
    }
  ];

  return (
    <section id="physics-special" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Atom className="w-4 h-4 text-amber-400" />
            <span>Senior Secondary Flagship</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Specialized Physics for Classes 11 & 12
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Physics requires deep conceptual clarity, mathematical precision in derivations, and systematic numerical problem-solving. At The PI Classes, we transform Physics from an intimidating subject into a scoring strength.
          </p>
        </div>

        {/* Interactive Feature Matrix */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Pillars List */}
          <div className="lg:col-span-6 space-y-3">
            {physicsModules.map((module, idx) => {
              const isSelected = activeTopicIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTopicIndex(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-slate-800 to-indigo-950 border-amber-400 shadow-md text-white'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {module.tag}
                      </span>
                      <h4 className={`text-sm sm:text-base font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {module.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {module.desc}
                    </p>
                  </div>
                  <div className={`p-1.5 rounded-full shrink-0 ${isSelected ? 'bg-amber-400 text-slate-900' : 'text-slate-500'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-dive Detail Box */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-b from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-5">
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Physics Pillar #{activeTopicIndex + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {physicsModules[activeTopicIndex].title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Atom className="w-6 h-6 animate-spin-slow" />
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {physicsModules[activeTopicIndex].desc}
              </p>

              <div className="mt-6 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What Students Master:
                </h5>
                <div className="space-y-2">
                  {physicsModules[activeTopicIndex].deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-700/60 text-sm text-slate-200">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class 11 vs 12 Syllabus quick checklist */}
              <div className="mt-6 pt-5 border-t border-slate-700/80 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-1">Class 11 Focus:</span>
                  <span className="text-slate-400">Mechanics, Kinematics, Gravitation, Thermodynamics, Oscillations</span>
                </div>
                <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-indigo-300 block mb-1">Class 12 Focus:</span>
                  <span className="text-slate-400">Electrostatics, Current, Magnetism, Optics, Modern Physics</span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenDemoModal}
                  className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                  id="physics-demo-btn"
                >
                  <span>Attend a Free Physics Demo Class</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${INSTITUTE_INFO.cleanPhone}`}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm text-center"
                >
                  Call +91 9470040069
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
