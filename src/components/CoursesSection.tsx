import React, { useState } from 'react';
import { COURSES, INSTITUTE_INFO } from '../data/instituteData';
import { BookOpen, Atom, CheckCircle2, ChevronRight, Layers, Sparkles, Phone, MessageCircle, FileText, ArrowUpRight } from 'lucide-react';

interface CoursesSectionProps {
  onSelectCourseForInquiry: (courseName: string, classGrade: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourseForInquiry }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'cbse-7-10' | 'physics-11-12'>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('Class 10');

  const gradeDetailsMap: Record<string, { desc: string; focus: string; keySubjects: string[] }> = {
    'Class 7': {
      desc: "Building a rock-solid foundation in fundamental mathematics and scientific concepts, transition into logical reasoning.",
      focus: "NCERT basics, math fundamentals, science experiments & language confidence.",
      keySubjects: ["Mathematics", "Science", "English", "Social Science", "Sanskrit"]
    },
    'Class 8': {
      desc: "Deepening core subject conceptual clarity to prepare for the rigorous secondary curriculum of 9th & 10th.",
      focus: "Algebraic foundations, geometry, rational numbers, physical & biological sciences.",
      keySubjects: ["Mathematics", "Science", "English", "Social Science", "Sanskrit"]
    },
    'Class 9': {
      desc: "Critical stepping stone for Board exams. Emphasis on advanced physics, chemistry, biology, and coordinate math.",
      focus: "Strict NCERT alignment, numericals introduction, chapter-wise test series.",
      keySubjects: ["Mathematics", "Science (Physics, Chem, Bio)", "English", "Social Science", "Sanskrit"]
    },
    'Class 10': {
      desc: "CBSE Board Examination Target Batch. Complete syllabus mastery, answer-writing format, and sample paper drills.",
      focus: "100% Board pattern tests, previous year papers, step-marking techniques, doubt resolution.",
      keySubjects: ["Mathematics", "Science", "English", "Social Science", "Sanskrit"]
    },
    'Class 11 Physics': {
      desc: "Bridging the gap between 10th and 11th. Focus on Vectors, Kinematics, Laws of Motion, Work Energy, and Thermodynamics.",
      focus: "Derivations clarity, calculus foundations in physics, graph interpretations, numerical problem solving.",
      keySubjects: ["Physics (Mechanics, Thermal, Waves & Oscillations)"]
    },
    'Class 12 Physics': {
      desc: "Targeted CBSE Board Examination preparation in senior secondary physics with high-scoring derivation mastery.",
      focus: "Electromagnetism, Optics, Modern Physics, semiconductor electronics, board-pattern mock tests.",
      keySubjects: ["Physics (Electrodynamics, Optics, Modern Physics)"]
    }
  };

  const filteredCourses = activeTab === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.id === activeTab);

  return (
    <section id="courses" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
            <Layers className="w-3.5 h-3.5 text-indigo-700" />
            <span>Academic Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Courses Offered
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Structured curriculum, NCERT-focused methodology, and dedicated guidance designed to help every student excel.
          </p>

          {/* Course Tabs */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveTab('cbse-7-10')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'cbse-7-10'
                  ? 'bg-indigo-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              CBSE Classes 7–10
            </button>
            <button
              onClick={() => setActiveTab('physics-11-12')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'physics-11-12'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Classes 11 & 12 (Physics)
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {filteredCourses.map((course) => {
            const isPhysics = course.id === 'physics-11-12';

            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col overflow-hidden ${
                  isPhysics 
                    ? 'border-amber-400/80 ring-1 ring-amber-400/30' 
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                {/* Card Top Banner */}
                <div className={`p-6 sm:p-8 text-white relative ${
                  isPhysics 
                    ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900' 
                    : 'bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900'
                }`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs text-white border border-white/30">
                      {course.badge}
                    </span>
                    <span className="text-xs font-semibold text-amber-200 bg-black/20 px-2.5 py-1 rounded-md">
                      {course.grades}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                      {isPhysics ? <Atom className="w-6 h-6 text-amber-300" /> : <BookOpen className="w-6 h-6 text-amber-300" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{course.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium">{course.subtitle}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-100 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  {/* Subjects Taught */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      Subjects Covered
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {course.subjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Focus Points */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Core Focus & Methodology
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {course.focusPoints.map((focus, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Schedule & Batch Highlights */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Batch Advantage
                    </h5>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      {course.scheduleHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Triggers */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onSelectCourseForInquiry(course.title, isPhysics ? 'Class 11' : 'Class 10')}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isPhysics
                          ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                          : 'bg-indigo-900 hover:bg-indigo-800 text-white shadow-sm'
                      }`}
                      id={`inquire-${course.id}`}
                    >
                      <span>Enquire for {isPhysics ? 'Physics' : 'Classes 7–10'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/${INSTITUTE_INFO.cleanPhone}?text=${encodeURIComponent(`Hello The PI Classes! I want to enquire about ${course.title}. Please provide batch timings and fee details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                      id={`whatsapp-${course.id}`}
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Info</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Grade-by-Grade Preview Module */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Grade-Wise Academic Roadmap
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Explore Curriculum Focus by Class
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Click any class below to see targeted learning goals and exam preparation plan.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.keys(gradeDetailsMap).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedGrade === grade
                      ? 'bg-indigo-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-black bg-indigo-100 text-indigo-900">
                  {selectedGrade} Focus
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  At The PI Classes, Katihar
                </span>
              </div>
              <p className="text-base text-slate-800 font-medium leading-relaxed">
                {gradeDetailsMap[selectedGrade].desc}
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700">
                <strong className="text-indigo-900 font-semibold">Methodology Highlight: </strong>
                {gradeDetailsMap[selectedGrade].focus}
              </div>
            </div>

            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  Core Subjects
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {gradeDetailsMap[selectedGrade].keySubjects.map((s, idx) => (
                    <span key={idx} className="bg-white text-indigo-950 font-medium text-xs px-2.5 py-1 rounded border border-indigo-200/60 shadow-2xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onSelectCourseForInquiry(selectedGrade.includes('Physics') ? 'Classes 11 & 12 — Physics' : 'CBSE Classes 7–10', selectedGrade)}
                className="mt-4 text-xs font-bold text-indigo-900 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Book demo class for {selectedGrade}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
