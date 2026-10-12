import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Phone, 
  MessageCircle, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  LogOut, 
  Plus, 
  Megaphone, 
  ShieldCheck, 
  ChevronRight, 
  Save, 
  RefreshCw,
  X,
  ChevronDown,
  DollarSign,
  Layers,
  Sparkles,
  Printer,
  FileText,
  CreditCard,
  UserCheck,
  Send,
  HelpCircle,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { 
  LeadItem, 
  LeadStatus, 
  FeeStatus,
  InquiryCategory, 
  InstituteBatch, 
  AdminAnnouncement 
} from '../types';
import { 
  getLeads, 
  addLead, 
  updateLead, 
  deleteLead, 
  exportLeadsToCsv, 
  getInstituteBatches, 
  updateBatch, 
  getAdminAnnouncement, 
  saveAdminAnnouncement, 
  setAdminLoggedIn, 
  ADMIN_PROFILE 
} from '../utils/leadStorage';
import { INSTITUTE_INFO } from '../data/instituteData';

interface AdminDashboardProps {
  onLogout: () => void;
  onGoToWebsite?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onGoToWebsite }) => {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [batches, setBatches] = useState<InstituteBatch[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<InquiryCategory>('all');
  const [activeTab, setActiveTab] = useState<'leads' | 'fees' | 'batches' | 'announcement'>('leads');

  // Announcement state
  const [announcement, setAnnouncement] = useState<AdminAnnouncement>({
    badge: 'NEW BATCHES',
    text: '',
    isActive: true
  });
  const [announcementSaved, setAnnouncementSaved] = useState(false);

  // Upload/Record Query Modal State
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<'fees' | 'batch' | 'demo' | 'admission'>('fees');
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    classGrade: 'Class 10',
    subjectInterest: 'CBSE Classes 7–10 (All Subjects)',
    inquiryType: 'Fee Details & Installment Query',
    feeQuote: '',
    feePlan: '3 Installments',
    feeStatus: 'Pending Discussion' as FeeStatus,
    discountNotes: '',
    batchSlot: 'Morning Batch (7:30 AM – 9:00 AM)',
    batchName: 'Class 10 CBSE — Morning Master Batch',
    batchShiftRequested: false,
    notes: '',
    status: 'New' as LeadStatus,
    followUpDate: ''
  });

  // Selected Lead for Detail / Print Slip Modal
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadData = () => {
    setLeads(getLeads());
    setBatches(getInstituteBatches());
    setAnnouncement(getAdminAnnouncement());
  };

  useEffect(() => {
    loadData();

    const handleLeadsUpdated = (e: Event) => {
      const customEv = e as CustomEvent<LeadItem>;
      setLeads(getLeads());
      if (customEv.detail?.studentName) {
        showToast(`🔔 New ${customEv.detail.category?.toUpperCase() || 'Query'} from ${customEv.detail.studentName}!`);
      }
    };

    const handleBatchesUpdated = () => {
      setBatches(getInstituteBatches());
    };

    window.addEventListener('pi_leads_updated', handleLeadsUpdated);
    window.addEventListener('pi_batches_updated', handleBatchesUpdated);
    window.addEventListener('storage', handleLeadsUpdated);

    return () => {
      window.removeEventListener('pi_leads_updated', handleLeadsUpdated);
      window.removeEventListener('pi_batches_updated', handleBatchesUpdated);
      window.removeEventListener('storage', handleLeadsUpdated);
    };
  }, []);

  const handleLogout = () => {
    setAdminLoggedIn(false);
    onLogout();
  };

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    updateLead(id, { status: newStatus });
    setLeads(getLeads());
    showToast(`Status updated to ${newStatus}`);
  };

  const handleDeleteLead = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the inquiry record for "${name}"?`)) {
      deleteLead(id);
      setLeads(getLeads());
      if (selectedLead?.id === id) {
        setIsDetailModalOpen(false);
        setSelectedLead(null);
      }
      showToast('Record removed successfully');
    }
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminAnnouncement(announcement);
    setAnnouncementSaved(true);
    showToast('Website announcement banner updated successfully!');
    setTimeout(() => setAnnouncementSaved(false), 3000);
  };

  // Open Record Query Modal with pre-configured category
  const handleOpenRecordModal = (category: 'fees' | 'batch' | 'demo' | 'admission' = 'fees') => {
    setModalCategory(category);
    let initialType = 'Admission Enquiry';
    if (category === 'fees') initialType = 'Fee Details & Installment Query';
    if (category === 'batch') initialType = 'Batch Timing & Schedule Query';
    if (category === 'demo') initialType = 'Free Demo Class Booking';

    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      classGrade: 'Class 10',
      subjectInterest: 'CBSE Classes 7–10 (All Subjects)',
      inquiryType: initialType,
      feeQuote: category === 'fees' ? '18000' : '',
      feePlan: '3 Installments',
      feeStatus: 'Pending Discussion',
      discountNotes: '',
      batchSlot: 'Morning Batch (7:30 AM – 9:00 AM)',
      batchName: 'Class 10 CBSE — Morning Master Batch',
      batchShiftRequested: false,
      notes: '',
      status: 'New',
      followUpDate: ''
    });
    setIsRecordModalOpen(true);
  };

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.phone.trim()) {
      showToast('Please enter both student name and phone number');
      return;
    }

    const newLead = addLead({
      studentName: formData.studentName.trim(),
      parentName: formData.parentName ? formData.parentName.trim() : undefined,
      phone: formData.phone.trim(),
      classGrade: formData.classGrade,
      subjectInterest: formData.subjectInterest,
      category: modalCategory,
      inquiryType: formData.inquiryType,
      feeQuote: formData.feeQuote ? Number(formData.feeQuote) : undefined,
      feePlan: formData.feePlan || undefined,
      feeStatus: formData.feeStatus,
      discountNotes: formData.discountNotes || undefined,
      batchSlot: formData.batchSlot || undefined,
      batchName: formData.batchName || undefined,
      batchShiftRequested: formData.batchShiftRequested,
      notes: formData.notes || undefined,
      status: formData.status,
      followUpDate: formData.followUpDate || undefined
    });

    setLeads(getLeads());
    setIsRecordModalOpen(false);
    showToast(`✓ Query recorded for ${newLead.studentName} (ID: ${newLead.id})`);
  };

  // Helper to open details modal
  const handleOpenDetails = (lead: LeadItem) => {
    setSelectedLead(lead);
    setIsDetailModalOpen(true);
  };

  // Helper to toggle batch status
  const handleBatchStatusToggle = (batchId: string, currentStatus: 'Open' | 'Fast Filling' | 'Full') => {
    const nextStatus = currentStatus === 'Open' ? 'Fast Filling' : currentStatus === 'Fast Filling' ? 'Full' : 'Open';
    updateBatch(batchId, { status: nextStatus });
    setBatches(getInstituteBatches());
    showToast(`Batch status updated to ${nextStatus}`);
  };

  // Helper to update batch enrolled count
  const handleBatchSeatAdjust = (batchId: string, delta: number) => {
    const batch = batches.find((b) => b.id === batchId);
    if (!batch) return;
    const nextEnrolled = Math.max(0, Math.min(batch.capacity, batch.enrolled + delta));
    updateBatch(batchId, { enrolled: nextEnrolled });
    setBatches(getInstituteBatches());
  };

  // Filter calculations
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.parentName && lead.parentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.notes && lead.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.inquiryType && lead.inquiryType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.batchSlot && lead.batchSlot.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    
    const matchesCourse =
      courseFilter === 'All' ||
      (courseFilter === 'Physics' && (lead.subjectInterest.includes('Physics') || lead.classGrade.includes('11') || lead.classGrade.includes('12'))) ||
      (courseFilter === 'CBSE' && (lead.subjectInterest.includes('CBSE') || lead.classGrade.includes('7') || lead.classGrade.includes('8') || lead.classGrade.includes('9') || lead.classGrade.includes('10')));

    const matchesCategory = 
      categoryFilter === 'all' || 
      lead.category === categoryFilter ||
      (categoryFilter === 'fees' && (lead.category === 'fees' || lead.inquiryType.toLowerCase().includes('fee') || !!lead.feeQuote)) ||
      (categoryFilter === 'batch' && (lead.category === 'batch' || lead.inquiryType.toLowerCase().includes('batch') || !!lead.batchSlot)) ||
      (categoryFilter === 'demo' && (lead.category === 'demo' || lead.inquiryType.toLowerCase().includes('demo')));

    return matchesSearch && matchesStatus && matchesCourse && matchesCategory;
  });

  // KPI calculations
  const totalLeadsCount = leads.length;
  const feeQueries = leads.filter((l) => l.category === 'fees' || l.inquiryType.toLowerCase().includes('fee') || l.feeQuote);
  const batchQueries = leads.filter((l) => l.category === 'batch' || l.inquiryType.toLowerCase().includes('batch') || l.batchSlot);
  const demoQueries = leads.filter((l) => l.category === 'demo' || l.inquiryType.toLowerCase().includes('demo'));
  const enrolledCount = leads.filter((l) => l.status === 'Enrolled').length;

  const totalQuotedFees = feeQueries.reduce((acc, curr) => acc + (curr.feeQuote || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* TOP EXECUTIVE BAR */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand & Director identity */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950 border border-indigo-500/30 overflow-hidden flex items-center justify-center p-0.5 shadow-md shrink-0">
                <img 
                  src={INSTITUTE_INFO.logo} 
                  alt={INSTITUTE_INFO.name} 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="font-serif text-xl font-bold text-amber-400 absolute">π</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                    The PI Classes
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                    Director Console
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{ADMIN_PROFILE.adminName}</span>
                  <span>•</span>
                  <span>{ADMIN_PROFILE.role}</span>
                  <span className="hidden md:inline text-slate-500">({ADMIN_PROFILE.authorizedPhone})</span>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleOpenRecordModal('fees')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
                id="header-record-query-btn"
                title="Upload or record a new student query"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Upload / Record Query</span>
                <span className="sm:hidden">New Query</span>
              </button>

              <button
                onClick={() => exportLeadsToCsv(filteredLeads)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                title="Export current inquiry records to CSV"
                id="header-export-csv-btn"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Export CSV</span>
              </button>

              {onGoToWebsite && (
                <button
                  onClick={onGoToWebsite}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  id="header-goto-website-btn"
                  title="Preview public institute website"
                >
                  <span>Website</span>
                </button>
              )}

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800/60 transition-colors cursor-pointer"
                id="header-logout-btn"
                title="Log out and protect admin portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Operational Navigation Tabs */}
        <div className="bg-slate-950/90 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar">
            <button
              onClick={() => setActiveTab('leads')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              id="tab-all-leads-btn"
            >
              <Users className="w-4 h-4" />
              <span>All Enquiries Hub ({totalLeadsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('fees')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'fees'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              id="tab-fees-btn"
            >
              <DollarSign className="w-4 h-4" />
              <span>Fees & Payment Queries ({feeQueries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('batches')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'batches'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              id="tab-batches-btn"
            >
              <Layers className="w-4 h-4" />
              <span>Batches & Timings ({batchQueries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('announcement')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'announcement'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              id="tab-announcement-btn"
            >
              <Megaphone className="w-4 h-4" />
              <span>Website Notice Board</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* ======================================================== */}
        {/* TAB 1: ALL ENQUIRIES HUB */}
        {/* ======================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* KPI Summary Cards (Interactive Filters) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('All');
                }}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  categoryFilter === 'all' && statusFilter === 'All'
                    ? 'bg-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enquiries</p>
                  <Users className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{totalLeadsCount}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">All student records</p>
              </button>

              <button
                onClick={() => {
                  setCategoryFilter('fees');
                  setStatusFilter('All');
                }}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  categoryFilter === 'fees'
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Fee Queries</p>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">{feeQueries.length}</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">Installment & fee inquiries</p>
              </button>

              <button
                onClick={() => {
                  setCategoryFilter('batch');
                  setStatusFilter('All');
                }}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  categoryFilter === 'batch'
                    ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-amber-50/40 border-amber-200 hover:border-amber-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Batch Queries</p>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">{batchQueries.length}</p>
                <p className="text-[11px] text-amber-700 mt-0.5">Timing & shift requests</p>
              </button>

              <button
                onClick={() => {
                  setCategoryFilter('demo');
                  setStatusFilter('All');
                }}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  categoryFilter === 'demo'
                    ? 'bg-purple-50 border-purple-500 shadow-md ring-2 ring-purple-500/20'
                    : 'bg-purple-50/30 border-purple-200 hover:border-purple-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-purple-800 uppercase tracking-wider">Free Demo Classes</p>
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-purple-950 mt-1">{demoQueries.length}</p>
                <p className="text-[11px] text-purple-700 mt-0.5">Trial class bookings</p>
              </button>

              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('Enrolled');
                }}
                className={`col-span-2 sm:col-span-1 text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  statusFilter === 'Enrolled'
                    ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-blue-50/30 border-blue-200 hover:border-blue-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Confirmed Enrolled</p>
                  <UserCheck className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">{enrolledCount}</p>
                <p className="text-[11px] text-blue-700 mt-0.5">Finalized admissions</p>
              </button>
            </div>

            {/* Sub-Category Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  id="filter-all-category-btn"
                >
                  All Categories ({totalLeadsCount})
                </button>

                <button
                  onClick={() => setCategoryFilter('fees')}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === 'fees'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                  id="filter-fees-category-btn"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Fee Enquiries ({feeQueries.length})</span>
                </button>

                <button
                  onClick={() => setCategoryFilter('batch')}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === 'batch'
                      ? 'bg-amber-500 text-slate-950 shadow-2xs'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                  }`}
                  id="filter-batch-category-btn"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Batch Queries ({batchQueries.length})</span>
                </button>

                <button
                  onClick={() => setCategoryFilter('demo')}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === 'demo'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
                  }`}
                  id="filter-demo-category-btn"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Demo Classes ({demoQueries.length})</span>
                </button>
              </div>

              {/* Quick upload triggers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenRecordModal('fees')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Fee Query</span>
                </button>
                <button
                  onClick={() => handleOpenRecordModal('batch')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Batch Query</span>
                </button>
              </div>
            </div>

            {/* Search & Select Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student, parent, phone, class, notes, or ref ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all shadow-xs"
                />
              </div>

              <div className="md:col-span-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-xs cursor-pointer font-medium"
                >
                  <option value="All">Status: All Records</option>
                  <option value="New">Status: New</option>
                  <option value="Follow-up">Status: Follow-up Needed</option>
                  <option value="Demo Scheduled">Status: Demo Scheduled</option>
                  <option value="Fee Quoted">Status: Fee Quoted</option>
                  <option value="Enrolled">Status: Confirmed Enrolled</option>
                  <option value="Closed">Status: Closed</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-xs cursor-pointer font-medium"
                >
                  <option value="All">Course: All Classes</option>
                  <option value="CBSE">CBSE Classes 7 to 10</option>
                  <option value="Physics">Classes 11 & 12 Physics</option>
                </select>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Live Enquiry Records ({filteredLeads.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Synchronized database of fee queries, batch questions, demo bookings, and admissions
                  </p>
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-700 font-semibold">No inquiries match current search criteria</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try clearing filters or click "Upload / Record Query" to add a walk-in or phone enquiry.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('All');
                      setCourseFilter('All');
                      setCategoryFilter('all');
                    }}
                    className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                        <th className="py-3.5 px-4 sm:px-6">Student & Ref ID</th>
                        <th className="py-3.5 px-4">Contact & Outreach</th>
                        <th className="py-3.5 px-4">Target Class</th>
                        <th className="py-3.5 px-4">Category & Specifics</th>
                        <th className="py-3.5 px-4">Status & Progression</th>
                        <th className="py-3.5 px-4">Notes & Query Detail</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredLeads.map((lead) => {
                        const cleanPhone = lead.phone.replace(/\D/g, '');
                        const isFee = lead.category === 'fees' || lead.inquiryType.toLowerCase().includes('fee') || !!lead.feeQuote;
                        const isBatch = lead.category === 'batch' || lead.inquiryType.toLowerCase().includes('batch') || !!lead.batchSlot;
                        const isDemo = lead.category === 'demo' || lead.inquiryType.toLowerCase().includes('demo');

                        // Tailored WhatsApp message
                        let waText = '';
                        if (isFee) {
                          waText = encodeURIComponent(
                            `Hello ${lead.studentName}! This is ${ADMIN_PROFILE.adminName} from The PI Classes (The Centre of Excellence, Katihar). Regarding your Fee Structure inquiry for ${lead.classGrade} (${lead.subjectInterest}), we have prepared your fee details${lead.feeQuote ? ` (Quoted: ₹${lead.feeQuote})` : ''}. Please let us know when you can visit our centre at Mirchaibari to finalize enrollment!`
                          );
                        } else if (isBatch) {
                          waText = encodeURIComponent(
                            `Hello ${lead.studentName}! This is ${ADMIN_PROFILE.adminName} from The PI Classes (The Centre of Excellence, Katihar). Regarding your Batch Timing query for ${lead.classGrade}${lead.batchSlot ? ` (${lead.batchSlot})` : ''}, we have confirmed batch availability. Please contact us to reserve your seat!`
                          );
                        } else if (isDemo) {
                          waText = encodeURIComponent(
                            `Hello ${lead.studentName}! This is ${ADMIN_PROFILE.adminName} from The PI Classes, Katihar. Regarding your Free Demo Class booking (Ref: ${lead.id}) for ${lead.classGrade}, your trial seat is reserved. Please visit our Mirchaibari centre on time!`
                          );
                        } else {
                          waText = encodeURIComponent(
                            `Hello ${lead.studentName}! This is ${ADMIN_PROFILE.adminName} from The PI Classes, Katihar. Regarding your academic inquiry (Ref: ${lead.id}) for ${lead.classGrade}, we invite you for a personal consultation at our Mirchaibari centre.`
                          );
                        }

                        const waUrl = `https://wa.me/91${cleanPhone}?text=${waText}`;

                        return (
                          <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                            {/* Student & Ref ID */}
                            <td className="py-4 px-4 sm:px-6">
                              <div className="font-bold text-slate-900">{lead.studentName}</div>
                              {lead.parentName && (
                                <div className="text-xs text-slate-500">Parent: {lead.parentName}</div>
                              )}
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="font-mono text-[10px] font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                                  {lead.id}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short'
                                  })}
                                </span>
                              </div>
                            </td>

                            {/* Contact & Outreach */}
                            <td className="py-4 px-4">
                              <div className="font-mono text-xs font-semibold text-slate-800">{lead.phone}</div>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <a
                                  href={`tel:${cleanPhone}`}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                  title="Call phone number"
                                >
                                  <Phone className="w-3 h-3 text-slate-600" />
                                  <span>Call</span>
                                </a>
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors border border-emerald-200"
                                  title="Send pre-filled WhatsApp response"
                                >
                                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </td>

                            {/* Target Class */}
                            <td className="py-4 px-4">
                              <span className="font-semibold text-slate-900">{lead.classGrade}</span>
                              <div className="text-xs text-slate-500 max-w-[170px] truncate" title={lead.subjectInterest}>
                                {lead.subjectInterest}
                              </div>
                            </td>

                            {/* Category & Specific Details */}
                            <td className="py-4 px-4">
                              {isFee && (
                                <div>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold">
                                    <DollarSign className="w-3 h-3 text-emerald-700" />
                                    Fee Enquiry
                                  </span>
                                  {lead.feeQuote && (
                                    <div className="text-xs font-black text-emerald-900 mt-1">
                                      ₹{lead.feeQuote.toLocaleString('en-IN')}
                                      {lead.feePlan && <span className="font-normal text-slate-500 text-[10px]"> ({lead.feePlan})</span>}
                                    </div>
                                  )}
                                </div>
                              )}

                              {isBatch && (
                                <div>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold">
                                    <Clock className="w-3 h-3 text-amber-700" />
                                    Batch Query
                                  </span>
                                  {lead.batchSlot && (
                                    <div className="text-xs text-amber-900 font-semibold mt-1">
                                      {lead.batchSlot}
                                    </div>
                                  )}
                                </div>
                              )}

                              {isDemo && (
                                <div>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 text-purple-950 border border-purple-300 text-xs font-bold">
                                    <Calendar className="w-3 h-3 text-purple-700" />
                                    Free Demo
                                  </span>
                                  {lead.batchSlot && (
                                    <div className="text-[11px] text-purple-900 mt-0.5">{lead.batchSlot}</div>
                                  )}
                                </div>
                              )}

                              {!isFee && !isBatch && !isDemo && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                                  {lead.inquiryType}
                                </span>
                              )}
                            </td>

                            {/* Status & 1-Click Fast Progression */}
                            <td className="py-4 px-4">
                              <div className="relative inline-block">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                  className={`text-xs font-bold py-1 pl-2.5 pr-6 rounded-md border appearance-none cursor-pointer ${
                                    lead.status === 'New'
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : lead.status === 'Fee Quoted'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : lead.status === 'Demo Scheduled'
                                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                                      : lead.status === 'Enrolled'
                                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                                      : lead.status === 'Follow-up'
                                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                                      : 'bg-slate-100 text-slate-700 border-slate-200'
                                  }`}
                                >
                                  <option value="New">New</option>
                                  <option value="Follow-up">Follow-up</option>
                                  <option value="Fee Quoted">Fee Quoted</option>
                                  <option value="Demo Scheduled">Demo Scheduled</option>
                                  <option value="Enrolled">Enrolled</option>
                                  <option value="Closed">Closed</option>
                                </select>
                                <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                              </div>

                              {lead.status === 'New' && (
                                <button
                                  onClick={() => handleStatusChange(lead.id, isFee ? 'Fee Quoted' : 'Demo Scheduled')}
                                  className="mt-1 block text-[10px] text-indigo-700 hover:text-indigo-900 font-bold underline cursor-pointer"
                                >
                                  → {isFee ? 'Quote Fee' : 'Schedule Demo'}
                                </button>
                              )}

                              {(lead.status === 'Fee Quoted' || lead.status === 'Demo Scheduled') && (
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'Enrolled')}
                                  className="mt-1 block text-[10px] text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                                >
                                  → Mark Enrolled
                                </button>
                              )}
                            </td>

                            {/* Notes & Query Detail */}
                            <td className="py-4 px-4 max-w-xs">
                              {lead.notes ? (
                                <p className="text-xs text-slate-600 line-clamp-2" title={lead.notes}>
                                  {lead.notes}
                                </p>
                              ) : (
                                <span className="text-xs text-slate-400 italic">No notes recorded</span>
                              )}
                              {lead.followUpDate && (
                                <div className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded inline-block mt-1">
                                  Follow-up: {lead.followUpDate}
                                </div>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenDetails(lead)}
                                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                  title="View record details & print slip"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id, lead.studentName)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: FEES & PAYMENT QUERIES MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            {/* Fees Management Header & Stats */}
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Fee Enquiries & Installment Tracking</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">Tuition Fee Inquiry Pipeline</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Manage parent fee negotiations, installment schedules, scholarship concessions, and payment confirmations for CBSE 7–10 and Classes 11 & 12 Physics.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleOpenRecordModal('fees')}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                  id="fees-tab-upload-btn"
                >
                  <Plus className="w-4 h-4" />
                  <span>Record New Fee Query</span>
                </button>
              </div>
            </div>

            {/* Fee Pipeline Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Fee Queries</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{feeQueries.length}</p>
                <p className="text-xs text-slate-500 mt-1">Students discussing fees & plans</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Total Quoted Pipeline</p>
                <p className="text-3xl font-black text-emerald-950 mt-1">₹{totalQuotedFees.toLocaleString('en-IN')}</p>
                <p className="text-xs text-emerald-700 mt-1">Combined value of open quotes</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-blue-200 bg-blue-50/20 shadow-xs">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Confirmed Fee Agreements</p>
                <p className="text-3xl font-black text-blue-950 mt-1">
                  {feeQueries.filter((l) => l.feeStatus === 'Installment Plan Agreed' || l.feeStatus === 'Paid' || l.status === 'Enrolled').length}
                </p>
                <p className="text-xs text-blue-700 mt-1">Installments finalized or paid</p>
              </div>
            </div>

            {/* Fee Inquiry Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {feeQueries.map((lead) => {
                const cleanPhone = lead.phone.replace(/\D/g, '');
                const waQuote = encodeURIComponent(
                  `Hello ${lead.studentName}! This is ${ADMIN_PROFILE.adminName} from The PI Classes, Katihar. Regarding the fee structure for ${lead.classGrade} (${lead.subjectInterest}):\n\n• Quoted Fee: ₹${lead.feeQuote || 'Discussed'}\n• Payment Option: ${lead.feePlan || 'Flexible installments'}\n• Concession / Notes: ${lead.discountNotes || 'Standard'}\n\nPlease visit our Mirchaibari centre to collect your official receipt and batch study material.`
                );

                return (
                  <div key={lead.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                            {lead.id}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-1.5">{lead.studentName}</h3>
                          {lead.parentName && <p className="text-xs text-slate-500">Parent: {lead.parentName}</p>}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                          lead.status === 'Enrolled' 
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                        }`}>
                          {lead.status}
                        </span>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Course & Class:</span>
                          <span className="font-semibold text-slate-800">{lead.classGrade}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Quoted Fee:</span>
                          <span className="font-black text-emerald-700 text-sm">
                            {lead.feeQuote ? `₹${lead.feeQuote.toLocaleString('en-IN')}` : 'To be quoted'}
                          </span>
                        </div>

                        {lead.feePlan && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Plan / Terms:</span>
                            <span className="font-medium text-slate-700">{lead.feePlan}</span>
                          </div>
                        )}

                        {lead.discountNotes && (
                          <div className="text-[11px] bg-slate-50 p-2 rounded border border-slate-200 text-slate-600">
                            <span className="font-semibold text-slate-700">Concession Note: </span>
                            {lead.discountNotes}
                          </div>
                        )}

                        {lead.notes && (
                          <p className="text-xs text-slate-500 line-clamp-2 italic mt-1">"{lead.notes}"</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href={`https://wa.me/91${cleanPhone}?text=${waQuote}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp Quote</span>
                      </a>

                      <button
                        onClick={() => handleOpenDetails(lead)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>Print Estimate</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Standard Fee Structure Quick Reference Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs mt-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span>Standard Institute Fee Guidelines & Concession Rules (Reference for Director)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-800 text-sm">CBSE Classes 7 to 10 (All Subjects Coaching)</p>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Covers Mathematics, Science (Physics, Chemistry, Biology), Social Science & English.</li>
                    <li>• Standard Installment Options: 3 Part Installments or Monthly plan.</li>
                    <li>• Includes NCERT exemplar books, chapter test series, and Board pattern mock papers.</li>
                    <li>• Sibling Concession: Up to 10% concession on secondary enrollment.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-800 text-sm">Classes 11 & 12 — Specialized Physics (Binay Sir)</p>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Comprehensive conceptual physics, derivations handbook, numerical practice sheets.</li>
                    <li>• Includes Sunday timed tests modeled strictly on CBSE Board marking scheme.</li>
                    <li>• Installment breakdown: Registration token + 2 or 3 session installments.</li>
                    <li>• Merit scholarship: Special fee waiver for meritorious Class 10 board toppers (90%+).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: BATCHES & BATCH-RELATED QUERIES */}
        {/* ======================================================== */}
        {activeTab === 'batches' && (
          <div className="space-y-8">
            {/* Top Bar for Batches */}
            <div className="bg-gradient-to-r from-amber-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Batch Allocation & Scheduling Console</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">Student Batch Queries & Capacity</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Track student batch timing requests, shift requests, morning vs evening preferences, and monitor seat occupancy per batch (strictly capped at 20 students).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenRecordModal('batch')}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                  id="batches-tab-upload-btn"
                >
                  <Plus className="w-4 h-4" />
                  <span>Record Batch Query</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: Active Batch Queries from Students */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Incoming Student Batch Requests ({batchQueries.length})</h3>
                  <p className="text-xs text-slate-500">Students requesting batch confirmation, timings, or batch shifts</p>
                </div>
              </div>

              {batchQueries.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
                  <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-600 font-semibold text-sm">No pending batch queries</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {batchQueries.map((lead) => {
                    const cleanPhone = lead.phone.replace(/\D/g, '');
                    const waBatch = encodeURIComponent(
                      `Hello ${lead.studentName}! This is ${ADMIN_PROFILE.adminName} from The PI Classes, Katihar. Regarding your batch query for ${lead.classGrade}:\n\nYour requested batch slot: ${lead.batchSlot || 'Selected timing'}\nCentre Location: Mirchaibari (Near Indira Gandhi Pustakalay)\n\nPlease confirm your seat today so your admission roll number can be generated.`
                    );

                    return (
                      <div key={lead.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-mono text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                                {lead.id}
                              </span>
                              <h4 className="font-bold text-slate-900 mt-1">{lead.studentName}</h4>
                              <p className="text-xs text-slate-500">{lead.phone}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                              lead.batchShiftRequested 
                                ? 'bg-purple-100 text-purple-900 border-purple-300' 
                                : 'bg-amber-100 text-amber-900 border-amber-300'
                            }`}>
                              {lead.batchShiftRequested ? 'Shift Request' : 'Timing Query'}
                            </span>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500">Target Grade:</span>
                              <span className="font-bold text-slate-800">{lead.classGrade}</span>
                            </div>

                            <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs">
                              <p className="font-semibold text-amber-950 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                                <span>Requested: {lead.batchSlot || 'Morning / Evening'}</span>
                              </p>
                            </div>

                            {lead.notes && (
                              <p className="text-xs text-slate-600 mt-1 italic">
                                "{lead.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <a
                            href={`https://wa.me/91${cleanPhone}?text=${waBatch}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
                            <span>Confirm on WhatsApp</span>
                          </a>

                          <button
                            onClick={() => handleOpenDetails(lead)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SECTION 2: Institute Batches & Seat Occupancy Monitor */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Active Institute Batches & Seat Occupancy</h3>
                  <p className="text-xs text-slate-500">
                    Personalized attention guarantee: Small batches capped at 15–20 students max
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {batches.map((batch) => {
                  const percentFilled = Math.round((batch.enrolled / batch.capacity) * 100);
                  const isFull = batch.enrolled >= batch.capacity;

                  return (
                    <div key={batch.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-400">{batch.id}</span>
                            <h4 className="font-bold text-slate-900 text-base mt-0.5">{batch.name}</h4>
                            <p className="text-xs text-indigo-700 font-semibold">{batch.grade} • {batch.room}</p>
                          </div>

                          <button
                            onClick={() => handleBatchStatusToggle(batch.id, batch.status)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border cursor-pointer ${
                              batch.status === 'Full'
                                ? 'bg-rose-100 text-rose-900 border-rose-300'
                                : batch.status === 'Fast Filling'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            }`}
                            title="Click to toggle batch status"
                          >
                            {batch.status}
                          </button>
                        </div>

                        <div className="mt-4 space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <Clock className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{batch.timing}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{batch.days}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span>Faculty: {batch.faculty}</span>
                          </div>
                        </div>

                        {/* Occupancy Progress Bar */}
                        <div className="mt-5 pt-3 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-semibold text-slate-600">Seat Occupancy:</span>
                            <span className="font-bold text-slate-900">
                              {batch.enrolled} / {batch.capacity} seats ({percentFilled}%)
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                isFull 
                                  ? 'bg-rose-500' 
                                  : percentFilled > 80 
                                  ? 'bg-amber-500' 
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${percentFilled}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Seat adjust buttons */}
                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-medium">Quick Seat Count:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleBatchSeatAdjust(batch.id, -1)}
                            disabled={batch.enrolled <= 0}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30"
                            title="Decrease enrolled count"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-800">{batch.enrolled}</span>
                          <button
                            onClick={() => handleBatchSeatAdjust(batch.id, 1)}
                            disabled={batch.enrolled >= batch.capacity}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30"
                            title="Increase enrolled count"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: WEBSITE NOTICE BOARD & BROADCAST */}
        {/* ======================================================== */}
        {activeTab === 'announcement' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-purple-50 text-purple-700 rounded-xl border border-purple-200">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Website Header Announcement Banner</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Broadcast urgent admissions, new batch start dates, or holiday notices on top of every public page
                  </p>
                </div>
              </div>

              {announcementSaved && (
                <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Banner updated live! Visitors to The PI Classes website will see this announcement.</span>
                </div>
              )}

              <form onSubmit={handleSaveAnnouncement} className="space-y-5">
                {/* Active Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Banner Visibility
                    </label>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enable or disable the top announcement banner on the live website
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnnouncement((prev) => ({ ...prev, isActive: !prev.isActive }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      announcement.isActive ? 'bg-indigo-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        announcement.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Badge text */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Highlight Pill / Badge Text
                  </label>
                  <input
                    type="text"
                    required
                    value={announcement.badge}
                    onChange={(e) => setAnnouncement((prev) => ({ ...prev, badge: e.target.value }))}
                    placeholder="e.g. NEW BATCHES, ADMISSIONS OPEN, IMPORTANT NOTICE"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-semibold"
                  />
                </div>

                {/* Notice text */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Announcement Notice Text
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={announcement.text}
                    onChange={(e) => setAnnouncement((prev) => ({ ...prev, text: e.target.value }))}
                    placeholder="e.g. Admissions Open for CBSE Classes 7–10 & Specialized Physics 11–12 | New Session Starting Soon! Call 9470040069."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                {/* Live Preview Box */}
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Live Public Preview
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs border border-slate-800 flex items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wide shrink-0">
                        {announcement.badge || 'NOTICE'}
                      </span>
                      <p className="truncate text-slate-200">
                        {announcement.text || 'Your announcement will appear here...'}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">Mirchaibari, Katihar</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Broadcast Banner</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: UPLOAD / RECORD NEW QUERY */}
      {/* ======================================================== */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Upload / Record Student Query</h3>
                <p className="text-xs text-slate-400">
                  Record walk-in, phone call, fee negotiation, or batch query directly into the Admin database
                </p>
              </div>
              <button
                onClick={() => setIsRecordModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Selector Tabs inside Modal */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => {
                  setModalCategory('fees');
                  setFormData((p) => ({ ...p, inquiryType: 'Fee Details & Installment Query' }));
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  modalCategory === 'fees'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>💰 Fee Query</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalCategory('batch');
                  setFormData((p) => ({ ...p, inquiryType: 'Batch Timing & Schedule Query' }));
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  modalCategory === 'batch'
                    ? 'bg-amber-500 text-slate-950 shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>⏰ Batch Query</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalCategory('demo');
                  setFormData((p) => ({ ...p, inquiryType: 'Free Demo Class Booking' }));
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  modalCategory === 'demo'
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>🎓 Free Demo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalCategory('admission');
                  setFormData((p) => ({ ...p, inquiryType: 'Admission Enquiry' }));
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  modalCategory === 'admission'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>📋 General Admission</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleRecordSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Manish Sharma"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. S. N. Sharma"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Contact / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9835012345"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Class / Grade
                  </label>
                  <select
                    value={formData.classGrade}
                    onChange={(e) => {
                      const grade = e.target.value;
                      const course = (grade.includes('11') || grade.includes('12'))
                        ? 'Classes 11 & 12 — Physics'
                        : 'CBSE Classes 7–10 (All Subjects)';
                      setFormData({ ...formData, classGrade: grade, subjectInterest: course });
                    }}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Class 10">Class 10 (CBSE Board)</option>
                    <option value="Class 9">Class 9 (CBSE Foundation)</option>
                    <option value="Class 8">Class 8 (Junior Foundation)</option>
                    <option value="Class 7">Class 7 (Junior Foundation)</option>
                    <option value="Class 11">Class 11 (Physics — Binay Sir)</option>
                    <option value="Class 12">Class 12 (Physics — Board Master)</option>
                  </select>
                </div>
              </div>

              {/* SPECIFIC FEE FIELDS */}
              {modalCategory === 'fees' && (
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Fee Negotiation & Payment Breakdown</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-950 mb-1">
                        Quoted Course Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.feeQuote}
                        onChange={(e) => setFormData({ ...formData, feeQuote: e.target.value })}
                        placeholder="e.g. 18000"
                        className="w-full px-3 py-1.5 text-sm bg-white border border-emerald-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-950 mb-1">
                        Installment / Payment Terms
                      </label>
                      <select
                        value={formData.feePlan}
                        onChange={(e) => setFormData({ ...formData, feePlan: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-emerald-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="One-Time Full Payment">One-Time Full Payment (Discounted)</option>
                        <option value="2 Installments">2 Installments</option>
                        <option value="3 Installments">3 Installments</option>
                        <option value="Monthly Plan">Monthly Plan</option>
                        <option value="Token Paid / Balance on Visit">Token Paid / Balance on Visit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-950 mb-1">
                      Concession / Scholarship / Sibling Discount Notes
                    </label>
                    <input
                      type="text"
                      value={formData.discountNotes}
                      onChange={(e) => setFormData({ ...formData, discountNotes: e.target.value })}
                      placeholder="e.g. 10% sibling discount agreed or early admission waiver"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-emerald-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* SPECIFIC BATCH FIELDS */}
              {modalCategory === 'batch' && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Batch Preference & Timing Request</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-950 mb-1">
                        Preferred Batch Slot
                      </label>
                      <select
                        value={formData.batchSlot}
                        onChange={(e) => setFormData({ ...formData, batchSlot: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm bg-white border border-amber-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Morning Batch (7:30 AM – 9:00 AM)">Morning Batch (7:30 AM – 9:00 AM)</option>
                        <option value="Evening Batch (4:00 PM – 5:30 PM)">Evening Batch (4:00 PM – 5:30 PM)</option>
                        <option value="Late Evening (5:30 PM – 7:00 PM)">Late Evening (5:30 PM – 7:00 PM)</option>
                        <option value="Early Morning Physics (6:30 AM – 7:30 AM)">Early Morning Physics (6:30 AM – 7:30 AM)</option>
                        <option value="Sunday Doubt & Special Test Batch">Sunday Doubt & Special Test Batch</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="modal-batch-shift"
                        checked={formData.batchShiftRequested}
                        onChange={(e) => setFormData({ ...formData, batchShiftRequested: e.target.checked })}
                        className="w-4 h-4 text-amber-600 rounded border-slate-300"
                      />
                      <label htmlFor="modal-batch-shift" className="text-xs font-semibold text-amber-950 cursor-pointer">
                        This is a Batch Shift Request (clash with school)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* SPECIFIC DEMO FIELDS */}
              {modalCategory === 'demo' && (
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-700" />
                    <span>Free Trial / Demo Class Session</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-950 mb-1">
                      Preferred Demo Session Slot
                    </label>
                    <select
                      value={formData.batchSlot}
                      onChange={(e) => setFormData({ ...formData, batchSlot: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-purple-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Tomorrow Morning (7:30 AM)">Tomorrow Morning (7:30 AM)</option>
                      <option value="Tomorrow Evening (4:00 PM)">Tomorrow Evening (4:00 PM)</option>
                      <option value="Weekend Special Trial Class">Weekend Special Trial Class</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Notes & Follow-up */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Parent / Student Query & Follow-up Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Parent requested callback at 6 PM. Interested in derivation notes."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Initial Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="New">New</option>
                    <option value="Follow-up">Follow-up Needed</option>
                    <option value="Fee Quoted">Fee Quoted</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Enrolled">Confirmed Enrolled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Follow-up Schedule
                  </label>
                  <input
                    type="text"
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                    placeholder="e.g. Tomorrow 5:00 PM"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Save to Admin Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: VIEW RECORD DETAIL & PRINT SLIP */}
      {/* ======================================================== */}
      {isDetailModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Header with Print CTA */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400">
                  {selectedLead.id}
                </span>
                <h3 className="text-base font-bold text-white">Student Inquiry & Fee Receipt Slip</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
                  title="Print official inquiry slip"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Content */}
            <div className="p-6 space-y-4 print:p-0">
              {/* Slip Official Banner */}
              <div className="text-center pb-4 border-b border-slate-200">
                <h2 className="text-lg font-black text-slate-900">{INSTITUTE_INFO.name}</h2>
                <p className="text-xs uppercase tracking-widest text-amber-600 font-bold">The Centre of Excellence</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{ADMIN_PROFILE.address}</p>
                <p className="text-[11px] font-semibold text-slate-700">Director Contact: {ADMIN_PROFILE.authorizedPhone}</p>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Student Name</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedLead.studentName}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Parent / Guardian</span>
                  <span className="font-semibold text-slate-800">{selectedLead.parentName || 'N/A'}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Contact Number</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedLead.phone}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Target Class & Stream</span>
                  <span className="font-semibold text-slate-800">{selectedLead.classGrade}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Query Category</span>
                  <span className="font-bold text-indigo-700 capitalize">{selectedLead.category || selectedLead.inquiryType}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Current Status</span>
                  <span className="font-bold text-emerald-700">{selectedLead.status}</span>
                </div>
              </div>

              {/* Fee and Batch Highlight */}
              {(selectedLead.feeQuote || selectedLead.batchSlot) && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  {selectedLead.feeQuote && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Quoted Tuition Fee:</span>
                      <span className="font-black text-emerald-800 text-sm">
                        ₹{selectedLead.feeQuote.toLocaleString('en-IN')}
                        {selectedLead.feePlan && ` (${selectedLead.feePlan})`}
                      </span>
                    </div>
                  )}

                  {selectedLead.batchSlot && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Allocated / Requested Batch:</span>
                      <span className="font-bold text-amber-800">{selectedLead.batchSlot}</span>
                    </div>
                  )}

                  {selectedLead.discountNotes && (
                    <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                      <span className="font-semibold">Concession Notes:</span> {selectedLead.discountNotes}
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              {selectedLead.notes && (
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase">Remarks / Academic History</span>
                  <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-1">
                    {selectedLead.notes}
                  </p>
                </div>
              )}

              {/* Signatory line */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <div>
                  <p>Inquiry Date: {new Date(selectedLead.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{ADMIN_PROFILE.adminName}</p>
                  <p className="text-[10px]">Authorised Centre Director</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Close Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
