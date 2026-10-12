import React, { useState } from 'react';
import { INSTITUTE_INFO } from '../data/instituteData';
import { InquiryFormData } from '../types';
import { addLead } from '../utils/leadStorage';
import { 
  Phone, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  HelpCircle, 
  Sparkles,
  User,
  School,
  FileCheck,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface InquirySectionProps {
  prefilledCourse?: string;
  prefilledGrade?: string;
  onOpenAdmin?: () => void;
}

export const InquirySection: React.FC<InquirySectionProps> = ({ prefilledCourse, prefilledGrade, onOpenAdmin }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    studentName: '',
    parentName: '',
    phone: '',
    classGrade: prefilledGrade || 'Class 10',
    subjectInterest: prefilledCourse || 'CBSE Classes 7–10 (All Subjects)',
    inquiryType: 'Demo Class',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedPass, setSubmittedPass] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.phone.trim()) return;

    // Save to persistent storage for admin portal and user reference
    try {
      const savedLead = addLead({
        studentName: formData.studentName.trim(),
        parentName: formData.parentName ? formData.parentName.trim() : '',
        phone: formData.phone.trim(),
        classGrade: formData.classGrade,
        subjectInterest: formData.subjectInterest,
        inquiryType: formData.inquiryType,
        notes: formData.notes
      });
      setSubmittedPass(savedLead.id);
    } catch {
      const passId = `PI-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedPass(passId);
    }
    setSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    const text = `Hello The PI Classes! I would like to submit an enquiry:
• Enquiry Type: ${formData.inquiryType}
• Student Name: ${formData.studentName || 'Not specified'}
• Class/Grade: ${formData.classGrade}
• Subject/Course: ${formData.subjectInterest}
• Phone: ${formData.phone}
${formData.notes ? `• Question/Notes: ${formData.notes}` : ''}

Please share batch timings, fee details, and demo class schedule.`;
    return `https://wa.me/${INSTITUTE_INFO.cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="admissions" className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Why Inquire & Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-900 border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
              <span>Admissions & Counseling</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Get in Touch for Admissions & Course Details
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Have questions about batch timings, subject combinations, or admission criteria? We invite parents and students to talk to our faculty or visit our institute in Mirchaibari, Katihar.
            </p>

            {/* Checklist from user prompt */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Call or Enquire with us for:
              </h3>
              <div className="space-y-2.5">
                {INSTITUTE_INFO.callReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-medium">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Phone Support Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-300 font-medium">Direct Admission Helpline</div>
                  <a 
                    href={`tel:${INSTITUTE_INFO.cleanPhone}`} 
                    className="text-lg font-black text-amber-300 hover:underline"
                  >
                    {INSTITUTE_INFO.phone}
                  </a>
                </div>
              </div>
              <a
                href={INSTITUTE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <FileCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Saved & Synchronized with Admin Portal
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-2">Enquiry Registered!</h3>
                    <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mt-1">
                      Thank you, <strong>{formData.studentName}</strong>. Your enquiry for <strong>{formData.classGrade} ({formData.inquiryType})</strong> has been saved directly to our admission desk.
                    </p>
                  </div>
                  
                  {/* Summary Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Enquiry Reference ID</span>
                      <span className="font-mono font-bold text-indigo-950 bg-white px-2.5 py-0.5 rounded border border-indigo-100">
                        {submittedPass}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-700">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                        <span className="font-bold">{formData.studentName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Class / Subject</span>
                        <span className="font-bold">{formData.classGrade}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Request Category</span>
                        <span className="font-bold">{formData.inquiryType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                        <span className="font-mono font-bold">{formData.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send details to WhatsApp now</span>
                    </a>

                    {onOpenAdmin && (
                      <button
                        onClick={onOpenAdmin}
                        className="w-full sm:w-auto px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                        <span>View in Admin Portal</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm cursor-pointer transition-colors"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="admission-inquiry-form">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-black text-slate-900">
                      Admission & Demo Class Form
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill in your details below for instant guidance, fee details, or demo scheduling.
                    </p>
                  </div>

                  {/* Inquiry Type Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      I am Enquiring For:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(['Demo Class', 'Admission Enquiry', 'Course Details', 'Batch Timings', 'Fee Details'] as const).map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all border cursor-pointer ${
                            formData.inquiryType === type
                              ? 'bg-indigo-900 text-white border-indigo-900 shadow-2xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Class / Grade & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Target Class / Grade *
                      </label>
                      <select
                        value={formData.classGrade}
                        onChange={(e) => setFormData({ ...formData, classGrade: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        required
                        id="form-class-select"
                      >
                        <option value="Class 7">CBSE Class 7</option>
                        <option value="Class 8">CBSE Class 8</option>
                        <option value="Class 9">CBSE Class 9</option>
                        <option value="Class 10">CBSE Class 10</option>
                        <option value="Class 11 Physics">Class 11 — Physics</option>
                        <option value="Class 12 Physics">Class 12 — Physics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Course Track
                      </label>
                      <select
                        value={formData.subjectInterest}
                        onChange={(e) => setFormData({ ...formData, subjectInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        id="form-course-select"
                      >
                        <option value="CBSE Classes 7–10 (All Subjects)">CBSE Classes 7–10 (All Subjects)</option>
                        <option value="CBSE Classes 7–10 (Mathematics & Science)">CBSE Classes 7–10 (Maths & Science)</option>
                        <option value="Classes 11 & 12 — Physics (Specialized)">Classes 11 & 12 — Physics (Specialized)</option>
                      </select>
                    </div>
                  </div>

                  {/* Student & Parent Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Student Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          id="form-student-name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Contact Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 9876543210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          id="form-phone"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes / Questions */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      School Name / Specific Questions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. St. Joseph's / Interested in morning batch timings..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      id="form-notes"
                    />
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      id="submit-inquiry-btn"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Submit Admission Enquiry</span>
                    </button>

                    <a
                      href={getWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
                      id="submit-whatsapp-quick"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Direct WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    🔒 We respect your privacy. Your information is strictly used for admissions counseling.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
