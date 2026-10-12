export interface CourseDetail {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  grades: string;
  description: string;
  subjects: string[];
  focusPoints: string[];
  suitableFor: string;
  scheduleHighlights: string[];
  icon: string;
}

export interface InquiryFormData {
  studentName: string;
  parentName?: string;
  phone: string;
  classGrade: string;
  subjectInterest: string;
  inquiryType: 'Demo Class' | 'Admission Enquiry' | 'Course Details' | 'Batch Timings' | 'Fee Details';
  notes?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Admissions' | 'Academics' | 'Batches';
}

export type LeadStatus = 'New' | 'Demo Scheduled' | 'Follow-up' | 'Fee Quoted' | 'Enrolled' | 'Closed';

export type InquiryCategory = 'all' | 'fees' | 'batch' | 'demo' | 'admission';

export type FeeStatus = 'Pending Discussion' | 'Quoted' | 'Installment Plan Agreed' | 'Paid' | 'Scholarship Concession';

export interface LeadItem {
  id: string;
  studentName: string;
  parentName?: string;
  phone: string;
  classGrade: string;
  subjectInterest: string;
  inquiryType: string;
  category?: 'fees' | 'batch' | 'demo' | 'admission' | 'general';
  feeQuote?: number;
  feePlan?: string;
  feeStatus?: FeeStatus;
  discountNotes?: string;
  batchSlot?: string;
  batchName?: string;
  batchTiming?: string;
  batchShiftRequested?: boolean;
  notes?: string;
  status: LeadStatus;
  createdAt: string;
  followUpDate?: string;
}

export interface InstituteBatch {
  id: string;
  name: string;
  grade: string;
  subject: string;
  timing: string;
  days: string;
  capacity: number;
  enrolled: number;
  faculty: string;
  room: string;
  status: 'Open' | 'Fast Filling' | 'Full';
}

export interface AdminAnnouncement {
  text: string;
  badge: string;
  isActive: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'Classroom' | 'Academic Sessions' | 'Celebrations & Events' | 'Mentorship';
  caption: string;
  tag: string;
}
