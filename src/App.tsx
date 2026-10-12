/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoursesSection } from './components/CoursesSection';
import { PhysicsSpotlight } from './components/PhysicsSpotlight';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { BatchInfoCard } from './components/BatchInfoCard';
import { InquirySection } from './components/InquirySection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BatchInquiryModal } from './components/BatchInquiryModal';
import { FloatingActions } from './components/FloatingActions';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { isAdminLoggedIn, getAdminAnnouncement } from './utils/leadStorage';
import { Bell, Sparkles, Shield } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'website' | 'admin'>(() => {
    if (typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.hash === '#admin-portal')) {
      return 'admin';
    }
    return 'website';
  });

  const [isAdminAuthed, setIsAdminAuthed] = useState<boolean>(() => isAdminLoggedIn());
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedCourseForInquiry, setSelectedCourseForInquiry] = useState<string>('');
  const [selectedGradeForInquiry, setSelectedGradeForInquiry] = useState<string>('');
  const [announcement, setAnnouncement] = useState(() => getAdminAnnouncement());

  // Listen to hash changes (e.g., #admin)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#admin-portal') {
        setViewMode('admin');
      } else if (window.location.hash === '#home' || window.location.hash === '') {
        setViewMode('website');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update announcement whenever view changes or on focus
  useEffect(() => {
    setAnnouncement(getAdminAnnouncement());
  }, [viewMode]);

  const handleOpenDemoModal = (course = '', grade = '') => {
    setSelectedCourseForInquiry(course);
    setSelectedGradeForInquiry(grade);
    setDemoModalOpen(true);
  };

  const handleSelectCourseForInquiry = (courseTitle: string, classGrade: string) => {
    const admissionsEl = document.getElementById('admissions');
    if (admissionsEl) {
      admissionsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenDemoModal(courseTitle, classGrade);
    }
  };

  const handleOpenAdmin = () => {
    setViewMode('admin');
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWebsite = () => {
    setViewMode('website');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin Mode:
  if (viewMode === 'admin') {
    if (!isAdminAuthed) {
      return (
        <AdminLogin
          onSuccess={() => setIsAdminAuthed(true)}
          onCancel={handleBackToWebsite}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={() => {
          setIsAdminAuthed(false);
          handleBackToWebsite();
        }}
        onGoToWebsite={handleBackToWebsite}
      />
    );
  }

  // Otherwise, render Public Website:
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 lg:pb-0">
      {/* Top Navigation */}
      <Navbar 
        onOpenDemoModal={() => handleOpenDemoModal()} 
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Dynamic Announcement Ticker managed by Admin */}
      {announcement && announcement.isActive && announcement.text && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold shadow-xs flex items-center justify-between border-b border-amber-600/20">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-900 text-amber-300">
                {announcement.badge || 'NOTICE'}
              </span>
              <p className="truncate text-slate-900 font-bold">
                {announcement.text}
              </p>
            </div>
            <button
              onClick={() => handleOpenDemoModal()}
              className="shrink-0 hidden sm:inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-950 underline hover:text-indigo-900 cursor-pointer"
            >
              <span>Enroll Now</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero onOpenDemoModal={() => handleOpenDemoModal()} />

        <CoursesSection onSelectCourseForInquiry={handleSelectCourseForInquiry} />

        <PhysicsSpotlight onOpenDemoModal={() => handleOpenDemoModal('Classes 11 & 12 — Physics', 'Class 11')} />

        <WhyChooseUs onOpenDemoModal={() => handleOpenDemoModal()} />

        <GallerySection onOpenDemoModal={() => handleOpenDemoModal()} />

        <BatchInfoCard onOpenDemoModal={() => handleOpenDemoModal()} />

        <InquirySection 
          prefilledCourse={selectedCourseForInquiry} 
          prefilledGrade={selectedGradeForInquiry} 
          onOpenAdmin={handleOpenAdmin}
        />

        <FaqSection />

        <ContactSection />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Floating Action Bar for Mobile Visitors */}
      <FloatingActions onOpenDemoModal={() => handleOpenDemoModal()} />

      {/* Interactive Free Demo & Batch Inquiry Modal */}
      <BatchInquiryModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        defaultCourse={selectedCourseForInquiry}
        defaultGrade={selectedGradeForInquiry}
        onOpenAdmin={handleOpenAdmin}
      />
    </div>
  );
}
