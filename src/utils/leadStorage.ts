import { LeadItem, LeadStatus, FeeStatus, InstituteBatch, AdminAnnouncement } from '../types';

const LEADS_STORAGE_KEY = 'pi_inquiries_v2';
const BATCHES_STORAGE_KEY = 'pi_institute_batches';
const ADMIN_AUTH_KEY = 'pi_admin_authenticated';
const ANNOUNCEMENT_KEY = 'pi_admin_announcement';

// Single authorized administrator profile
export const ADMIN_PROFILE = {
  adminName: 'Binay Kumar',
  role: 'Centre Director & Head Faculty',
  authorizedPhone: '9470040069',
  institute: 'The PI Classes (The Centre of Excellence, Katihar)',
  address: 'Near Indira Gandhi Pustakalay, Mirchaibari, Katihar, Bihar'
};

// Seeded batches to track occupancy and student batch allocations
export const DEFAULT_INSTITUTE_BATCHES: InstituteBatch[] = [
  {
    id: 'BATCH-C10-M',
    name: 'Class 10 CBSE — Morning Master Batch',
    grade: 'Class 10',
    subject: 'CBSE All Subjects (Maths & Science Special)',
    timing: '7:30 AM – 9:00 AM',
    days: 'Mon to Sat',
    capacity: 20,
    enrolled: 17,
    faculty: 'Binay Kumar & Senior Faculty',
    room: 'Hall A (Mirchaibari)',
    status: 'Fast Filling'
  },
  {
    id: 'BATCH-C10-E',
    name: 'Class 10 CBSE — Evening Board Prep',
    grade: 'Class 10',
    subject: 'CBSE All Subjects (NCERT & Question Bank)',
    timing: '4:00 PM – 5:30 PM',
    days: 'Mon to Sat',
    capacity: 20,
    enrolled: 19,
    faculty: 'Binay Kumar & Faculty Team',
    room: 'Hall A (Mirchaibari)',
    status: 'Fast Filling'
  },
  {
    id: 'BATCH-C9-E',
    name: 'Class 9 CBSE — Concept Foundation',
    grade: 'Class 9',
    subject: 'Maths, Science & Social Studies',
    timing: '5:30 PM – 7:00 PM',
    days: 'Mon to Sat',
    capacity: 20,
    enrolled: 14,
    faculty: 'Senior Faculty Team',
    room: 'Hall B (Mirchaibari)',
    status: 'Open'
  },
  {
    id: 'BATCH-P11-M',
    name: 'Class 11 Physics — Conceptual & Numericals',
    grade: 'Class 11',
    subject: 'Physics (Mechanics, Waves, Thermodynamics)',
    timing: '6:30 AM – 7:30 AM',
    days: 'Mon to Sat + Sun Doubt Class',
    capacity: 20,
    enrolled: 16,
    faculty: 'Binay Kumar',
    room: 'Physics Lab Hall',
    status: 'Open'
  },
  {
    id: 'BATCH-P12-E',
    name: 'Class 12 Physics — Board Mastery & Derivations',
    grade: 'Class 12',
    subject: 'Physics (Electrodynamics, Optics, Modern Physics)',
    timing: '4:00 PM – 5:30 PM',
    days: 'Mon to Sat + Sun Test Series',
    capacity: 20,
    enrolled: 18,
    faculty: 'Binay Kumar',
    room: 'Physics Lab Hall',
    status: 'Fast Filling'
  },
  {
    id: 'BATCH-C78-F',
    name: 'Classes 7 & 8 CBSE — Junior Foundation',
    grade: 'Classes 7 & 8',
    subject: 'Mathematics, General Science & English',
    timing: '3:00 PM – 4:15 PM',
    days: 'Mon to Fri',
    capacity: 15,
    enrolled: 9,
    faculty: 'Specialized Junior Mentors',
    room: 'Hall C (Mirchaibari)',
    status: 'Open'
  }
];

// Realistic seeded inquiries including Fee enquiries, Batch queries, Demo bookings, and Admission leads
const INITIAL_SEEDED_LEADS: LeadItem[] = [
  {
    id: 'PI-842109',
    studentName: 'Aarav Sharma',
    parentName: 'Rajesh Sharma',
    phone: '9835214780',
    classGrade: 'Class 11',
    subjectInterest: 'Classes 11 & 12 — Physics',
    inquiryType: 'Free Demo Class',
    category: 'demo',
    batchSlot: 'Morning Batch (6:30 AM – 7:30 AM)',
    notes: 'Requested demo class for Kinematics & Derivations. Prefers early morning batch before school.',
    status: 'Demo Scheduled',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000 * 24).toISOString(),
    followUpDate: 'Tomorrow 4:30 PM'
  },
  {
    id: 'PI-915432',
    studentName: 'Priya Kumari',
    parentName: 'Manoj Singh',
    phone: '9431876520',
    classGrade: 'Class 10',
    subjectInterest: 'CBSE Classes 7–10 (All Subjects)',
    inquiryType: 'Fee Details & Installment Query',
    category: 'fees',
    feeQuote: 18000,
    feePlan: '3 Installments (₹6,000 x 3)',
    feeStatus: 'Installment Plan Agreed',
    discountNotes: 'Sibling discount discussed (elder brother studied Physics with Binay Sir).',
    notes: 'Parent enquired regarding full board preparation fee structure and installment terms. Ready to enroll this week.',
    status: 'Fee Quoted',
    createdAt: new Date(Date.now() - 1 * 3600 * 1000 * 24).toISOString(),
    followUpDate: 'Today 6:00 PM'
  },
  {
    id: 'PI-738910',
    studentName: 'Rohan Verma',
    parentName: 'Sunita Verma',
    phone: '9122345678',
    classGrade: 'Class 12',
    subjectInterest: 'Classes 11 & 12 — Physics',
    inquiryType: 'Batch Timing Query',
    category: 'batch',
    batchSlot: 'Evening Batch (4:00 PM – 5:30 PM)',
    batchName: 'Class 12 Physics — Board Mastery',
    batchShiftRequested: true,
    notes: 'Student requested batch shift from morning to evening (4:00 PM) due to school practical classes.',
    status: 'Follow-up',
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    followUpDate: 'Tomorrow 11:00 AM'
  },
  {
    id: 'PI-629401',
    studentName: 'Ananya Roy',
    parentName: 'Debashis Roy',
    phone: '9708912345',
    classGrade: 'Class 9',
    subjectInterest: 'CBSE Classes 7–10 (All Subjects)',
    inquiryType: 'Course Details & Fee Concession',
    category: 'fees',
    feeQuote: 15000,
    feePlan: 'Monthly (₹1,500/month)',
    feeStatus: 'Paid',
    discountNotes: 'Early-bird admission concession applied.',
    notes: 'Admission confirmed and initial registration token paid at Mirchaibari center.',
    status: 'Enrolled',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000 * 24).toISOString()
  },
  {
    id: 'PI-512093',
    studentName: 'Vikramaditya Roy',
    parentName: 'Dr. S. K. Roy',
    phone: '9835012398',
    classGrade: 'Class 10',
    subjectInterest: 'CBSE Classes 7–10 (All Subjects)',
    inquiryType: 'Batch Availability Query',
    category: 'batch',
    batchSlot: 'Evening Batch (4:00 PM – 5:30 PM)',
    notes: 'Parent enquired about remaining vacant seats in Class 10 Evening Board batch.',
    status: 'New',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  }
];

// Helper to deduce inquiry category
export const categorizeInquiry = (
  inquiryType?: string,
  notes?: string
): 'fees' | 'batch' | 'demo' | 'admission' => {
  const combined = `${inquiryType || ''} ${notes || ''}`.toLowerCase();
  if (combined.includes('fee') || combined.includes('cost') || combined.includes('installment') || combined.includes('scholarship') || combined.includes('concession')) {
    return 'fees';
  }
  if (combined.includes('batch') || combined.includes('timing') || combined.includes('slot') || combined.includes('schedule') || combined.includes('shift')) {
    return 'batch';
  }
  if (combined.includes('demo') || combined.includes('trial')) {
    return 'demo';
  }
  return 'admission';
};

export const getLeads = (): LeadItem[] => {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      // Check legacy storage
      const legacyRaw = localStorage.getItem('pi_inquiries');
      if (legacyRaw) {
        const legacyParsed = JSON.parse(legacyRaw);
        const migrated = legacyParsed.map((item: any, idx: number): LeadItem => ({
          id: item.id || `PI-${100000 + idx}`,
          studentName: item.studentName || 'Student Enquiry',
          parentName: item.parentName || '',
          phone: item.phone || '',
          classGrade: item.classGrade || 'Class 10',
          subjectInterest: item.subjectInterest || 'CBSE Classes 7–10',
          inquiryType: item.inquiryType || 'General Enquiry',
          category: item.category || categorizeInquiry(item.inquiryType, item.notes),
          feeQuote: item.feeQuote,
          feePlan: item.feePlan,
          feeStatus: item.feeStatus || (item.feeQuote ? 'Quoted' : undefined),
          discountNotes: item.discountNotes,
          batchSlot: item.batchSlot,
          batchName: item.batchName,
          notes: item.notes || '',
          status: item.status || 'New',
          createdAt: item.createdAt || new Date().toISOString(),
          followUpDate: item.followUpDate
        }));
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }

      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_LEADS));
      return INITIAL_SEEDED_LEADS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error fetching leads:', err);
    return INITIAL_SEEDED_LEADS;
  }
};

export const saveLeads = (leads: LeadItem[]): void => {
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Error saving leads:', err);
  }
};

export const addLead = (data: {
  studentName: string;
  parentName?: string;
  phone: string;
  classGrade: string;
  subjectInterest: string;
  inquiryType?: string;
  category?: 'fees' | 'batch' | 'demo' | 'admission';
  feeQuote?: number;
  feePlan?: string;
  feeStatus?: FeeStatus;
  discountNotes?: string;
  batchSlot?: string;
  batchName?: string;
  batchTiming?: string;
  batchShiftRequested?: boolean;
  notes?: string;
  status?: LeadStatus;
  followUpDate?: string;
}): LeadItem => {
  const currentLeads = getLeads();
  const deducedCategory = data.category || categorizeInquiry(data.inquiryType, data.notes);

  const newLead: LeadItem = {
    id: `PI-${Math.floor(100000 + Math.random() * 900000)}`,
    studentName: data.studentName.trim(),
    parentName: data.parentName ? data.parentName.trim() : '',
    phone: data.phone.trim(),
    classGrade: data.classGrade,
    subjectInterest: data.subjectInterest,
    inquiryType: data.inquiryType || (deducedCategory === 'fees' ? 'Fee Details' : deducedCategory === 'batch' ? 'Batch Timings' : deducedCategory === 'demo' ? 'Free Demo Class' : 'Admission Enquiry'),
    category: deducedCategory,
    feeQuote: data.feeQuote,
    feePlan: data.feePlan,
    feeStatus: data.feeStatus,
    discountNotes: data.discountNotes,
    batchSlot: data.batchSlot,
    batchName: data.batchName,
    batchTiming: data.batchTiming,
    batchShiftRequested: data.batchShiftRequested,
    notes: data.notes || '',
    status: data.status || 'New',
    createdAt: new Date().toISOString(),
    followUpDate: data.followUpDate
  };

  const updated = [newLead, ...currentLeads];
  saveLeads(updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pi_leads_updated', { detail: newLead }));
  }

  return newLead;
};

export const updateLead = (id: string, updates: Partial<LeadItem>): void => {
  const currentLeads = getLeads();
  const updated = currentLeads.map((lead) => {
    if (lead.id === id) {
      return {
        ...lead,
        ...updates
      };
    }
    return lead;
  });
  saveLeads(updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pi_leads_updated'));
  }
};

export const updateLeadStatus = (id: string, status: LeadStatus, notes?: string): void => {
  updateLead(id, {
    status,
    ...(notes !== undefined ? { notes } : {})
  });
};

export const deleteLead = (id: string): void => {
  const currentLeads = getLeads();
  const updated = currentLeads.filter((lead) => lead.id !== id);
  saveLeads(updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pi_leads_updated'));
  }
};

// Batch Management
export const getInstituteBatches = (): InstituteBatch[] => {
  try {
    const raw = localStorage.getItem(BATCHES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(DEFAULT_INSTITUTE_BATCHES));
      return DEFAULT_INSTITUTE_BATCHES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INSTITUTE_BATCHES;
  }
};

export const saveInstituteBatches = (batches: InstituteBatch[]): void => {
  try {
    localStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(batches));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pi_batches_updated'));
    }
  } catch (err) {
    console.error('Error saving batches:', err);
  }
};

export const updateBatch = (id: string, updates: Partial<InstituteBatch>): void => {
  const batches = getInstituteBatches();
  const updated = batches.map((b) => (b.id === id ? { ...b, ...updates } : b));
  saveInstituteBatches(updated);
};

// Strict Authentication Logic for Single Authorized Administrator
// Mobile: 9470040069 | Password: Binay@123
export const checkAdminAuth = (contactInput: string, passwordInput: string): boolean => {
  if (!contactInput || !passwordInput) return false;

  // Clean all non-digit characters from the contact input
  let cleanPhone = contactInput.replace(/\D/g, '');

  // If user entered +91 or 91 with 12 digits, strip country code
  if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
    cleanPhone = cleanPhone.substring(2);
  }
  // If user entered leading 0 with 11 digits
  if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.substring(1);
  }

  const authorizedPhone = '9470040069';
  const authorizedPassword = 'Binay@123';

  return cleanPhone === authorizedPhone && passwordInput.trim() === authorizedPassword;
};

export const isAdminLoggedIn = (): boolean => {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setAdminLoggedIn = (status: boolean): void => {
  try {
    if (status) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      localStorage.setItem('pi_admin_session_time', Date.now().toString());
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
      localStorage.removeItem('pi_admin_session_time');
    }
  } catch (err) {
    console.error('Error toggling auth:', err);
  }
};

// Announcement banner controls
export const getAdminAnnouncement = (): AdminAnnouncement => {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENT_KEY);
    if (!raw) {
      return {
        badge: 'NEW BATCHES',
        text: 'Admissions Open for CBSE Classes 7–10 & Specialized Physics 11–12 | New Session Starting Soon! Call 9470040069 to book a free demo.',
        isActive: true
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      badge: 'NEW BATCHES',
      text: 'Admissions Open for CBSE Classes 7–10 & Specialized Physics 11–12 | Call 9470040069.',
      isActive: true
    };
  }
};

export const saveAdminAnnouncement = (announcement: AdminAnnouncement): void => {
  try {
    localStorage.setItem(ANNOUNCEMENT_KEY, JSON.stringify(announcement));
  } catch (err) {
    console.error('Error saving announcement:', err);
  }
};

// Export to CSV supporting all fee and batch fields
export const exportLeadsToCsv = (leads: LeadItem[]): void => {
  const headers = [
    'Reference ID',
    'Date',
    'Student Name',
    'Parent Name',
    'Phone',
    'Class/Grade',
    'Course/Subject',
    'Category',
    'Inquiry Type',
    'Quoted Fee (INR)',
    'Fee Plan',
    'Fee Status',
    'Batch Slot/Timing',
    'Status',
    'Follow-up Date',
    'Notes'
  ];

  const rows = leads.map((lead) => [
    lead.id,
    new Date(lead.createdAt).toLocaleDateString(),
    `"${lead.studentName.replace(/"/g, '""')}"`,
    `"${(lead.parentName || '').replace(/"/g, '""')}"`,
    lead.phone,
    `"${lead.classGrade}"`,
    `"${lead.subjectInterest.replace(/"/g, '""')}"`,
    `"${lead.category || 'general'}"`,
    `"${lead.inquiryType}"`,
    lead.feeQuote !== undefined ? `"${lead.feeQuote}"` : '""',
    `"${(lead.feePlan || '').replace(/"/g, '""')}"`,
    `"${(lead.feeStatus || '').replace(/"/g, '""')}"`,
    `"${(lead.batchSlot || lead.batchName || '').replace(/"/g, '""')}"`,
    lead.status,
    `"${(lead.followUpDate || '').replace(/"/g, '""')}"`,
    `"${(lead.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `The_PI_Classes_All_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
