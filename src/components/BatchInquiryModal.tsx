import React, { useState } from 'react';
import { X, Calendar, Phone, CheckCircle2, MessageCircle, Sparkles, Send, Clock, User, ShieldCheck, ExternalLink } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';
import { addLead } from '../utils/leadStorage';
import { LeadItem } from '../types';

interface BatchInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
  defaultGrade?: string;
  onOpenAdmin?: () => void;
}

export const BatchInquiryModal: React.FC<BatchInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCourse,
  defaultGrade,
  onOpenAdmin
}) => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(defaultGrade || 'Class 10');
  const [preferredSlot, setPreferredSlot] = useState('Evening Batch (4:00 PM – 5:30 PM)');
  const [inquiryTopic, setInquiryTopic] = useState('Free Demo Class');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [savedLead, setSavedLead] = useState<LeadItem | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !phone.trim()) return;

    try {
      const newLead = addLead({
        studentName: studentName.trim(),
        parentName: parentName.trim(),
        phone: phone.trim(),
        classGrade: selectedGrade,
        subjectInterest: defaultCourse || (selectedGrade.includes('11') || selectedGrade.includes('12') ? 'Classes 11 & 12 — Physics' : 'CBSE Classes 7–10 (All Subjects)'),
        inquiryType: inquiryTopic,
        notes: `[Preferred Slot: ${preferredSlot}] ${notes ? `• Remarks: ${notes}` : 'Requested via website Book Free Demo modal'}`
      });
      setSavedLead(newLead);
    } catch (err) {
      console.error('Failed to save lead:', err);
    }
    setSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    const refCode = savedLead ? savedLead.id : 'NEW-REQUEST';
    const text = `Hello The PI Classes (Centre Director Binay Kumar)!
I have submitted a booking request on your website:
• Ref ID: ${refCode}
• Request Type: ${inquiryTopic}
• Student Name: ${studentName}
${parentName ? `• Parent Name: ${parentName}\n` : ''}• Target Class: ${selectedGrade}
• Preferred Slot: ${preferredSlot}
• Contact: ${phone}
${notes ? `• Question/Notes: ${notes}\n` : ''}
Please confirm my demo session seat at Mirchaibari, Katihar.`;

    return `https://wa.me/${INSTITUTE_INFO.cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const resetForm = () => {
    setStudentName('');
    setParentName('');
    setPhone('');
    setNotes('');
    setSubmitted(false);
    setSavedLead(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Accent Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white relative shrink-0">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>The PI Classes • The Centre of Excellence</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            Book a Free Demo Class
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Experience our concept-based learning methodology with no commitment.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-4 space-y-5">
              {/* Success badge */}
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Saved to Admin Portal & Admission Desk
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-2">
                  Demo Booking Registered!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Thank you, <strong>{studentName}</strong>! Your seat request has been recorded in our admission management system.
                </p>
              </div>

              {/* Reference & Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Booking Reference ID</span>
                  <span className="font-mono text-sm font-black text-indigo-900 bg-white px-2.5 py-0.5 rounded border border-indigo-100">
                    {savedLead?.id || 'PI-CONFIRMED'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                    <span className="font-bold text-slate-800">{studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Grade</span>
                    <span className="font-bold text-slate-800">{selectedGrade}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred Slot</span>
                    <span className="font-medium text-slate-700">{preferredSlot.split('(')[0]}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                    <span className="font-bold text-slate-800 font-mono">{phone}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Visible to Director Binay Kumar in Admin Leads Portal</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp (+91 9470040069)</span>
                </a>

                {onOpenAdmin && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdmin();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                    <span>View in Admin Portal</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Done & Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Option Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  I want to:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Free Demo Class', 'Admission Enquiry', 'Batch Timings', 'Fee Structure'].map((topic) => (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => setInquiryTopic(topic)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold text-center border cursor-pointer transition-all ${
                        inquiryTopic === topic
                          ? 'bg-indigo-900 text-white border-indigo-900 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Selection & Preferred Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Class / Grade *
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  >
                    <option value="CBSE Class 7">CBSE Class 7</option>
                    <option value="CBSE Class 8">CBSE Class 8</option>
                    <option value="CBSE Class 9">CBSE Class 9</option>
                    <option value="CBSE Class 10">CBSE Class 10</option>
                    <option value="Class 11 Physics">Class 11 — Physics</option>
                    <option value="Class 12 Physics">Class 12 — Physics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Demo Slot *
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Morning Batch (7:30 AM – 9:00 AM)">Morning (7:30 AM – 9:00 AM)</option>
                    <option value="Evening Batch (4:00 PM – 5:30 PM)">Evening (4:00 PM – 5:30 PM)</option>
                    <option value="Late Evening (5:30 PM – 7:00 PM)">Late Evening (5:30 PM – 7:00 PM)</option>
                    <option value="Weekend Special Session">Weekend Special Session</option>
                    <option value="Flexible (Call me to schedule)">Flexible (Call me)</option>
                  </select>
                </div>
              </div>

              {/* Student Name & Parent Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Student's name"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Parent's name (optional)"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9470040069"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-sm"
                />
              </div>

              {/* Specific query / notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Any Specific Question / School Name (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Current school, topics to focus on"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Instant Saving Notice */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automatically saved & synced with <strong>The PI Classes Admin Desk</strong>.</span>
              </div>

              {/* Actions */}
              <div className="pt-1 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Confirm Demo Booking & Save to Admin Portal</span>
                </button>

                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Or Message Directly via WhatsApp</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <Phone className="w-3 h-3 text-indigo-600" />
                <span>Helpline: Call {INSTITUTE_INFO.phone}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
