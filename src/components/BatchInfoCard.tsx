import React from 'react';
import { Clock, Calendar, Users, BookOpen, CheckCircle, Phone } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface BatchInfoCardProps {
  onOpenDemoModal: () => void;
}

export const BatchInfoCard: React.FC<BatchInfoCardProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Session 2026–27 Batches
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Batch Timings & Academic Routine
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Convenient morning and evening shifts designed around school schedules in Katihar.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenDemoModal}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Join Upcoming Batch
              </button>
              <a
                href={`tel:${INSTITUTE_INFO.cleanPhone}`}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700"
              >
                Call for Timing
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Batch 1 */}
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Classes 7, 8, 9 & 10 (CBSE)
                </span>
                <span className="text-xs text-slate-400 font-medium">Monday to Saturday</span>
              </div>

              <h4 className="text-lg font-bold text-white">
                Comprehensive Academic Batches
              </h4>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Morning Shift: 7:00 AM – 8:30 AM | Evening Shift: 3:30 PM – 7:30 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Small batches for dedicated teacher-student engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sunday: Special Assessment Test & Evaluation Session</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Subjects: Maths, Science, Eng, SST, Hindi</span>
                <span className="text-amber-400 font-bold">Limited Seats</span>
              </div>
            </div>

            {/* Batch 2 */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Classes 11 & 12 (Physics)
                </span>
                <span className="text-xs text-slate-400 font-medium">Specialized Schedule</span>
              </div>

              <h4 className="text-lg font-bold text-white">
                Physics Intensive & Derivations Batch
              </h4>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Morning & Evening slots tailored for Class 11 & 12 Science schedules</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>NCERT line-by-line, derivations workshop & numerical drills</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Weekly CBSE Board pattern test + answer-sheet post-mortem</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Target: CBSE Board Exam Mastery</span>
                <span className="text-amber-400 font-bold">Free Demo Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
