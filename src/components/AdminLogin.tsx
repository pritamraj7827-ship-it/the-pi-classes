import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  AlertCircle, 
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { checkAdminAuth, setAdminLoggedIn, ADMIN_PROFILE } from '../utils/leadStorage';
import { INSTITUTE_INFO } from '../data/instituteData';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [contactInput, setContactInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const isValid = checkAdminAuth(contactInput, passwordInput);
      if (isValid) {
        setAdminLoggedIn(true);
        onSuccess();
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          setIsLocked(true);
          setErrorMsg('Security lockout: Too many incorrect attempts. Please wait 30 seconds before retrying.');
          setTimeout(() => {
            setIsLocked(false);
            setFailedAttempts(0);
            setErrorMsg('');
          }, 30000);
        } else {
          setErrorMsg(
            `Access Denied: Unrecognized administrator credentials. Remaining attempts: ${5 - nextAttempts}`
          );
        }
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top back navigation */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-300 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-800 transition-colors shadow-xs cursor-pointer"
          id="admin-login-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Main Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Portal Shield & Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl shadow-indigo-500/10 flex items-center justify-center p-1 relative">
            <img 
              src={INSTITUTE_INFO.logo} 
              alt={INSTITUTE_INFO.name}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-serif text-2xl font-bold text-amber-400 absolute -z-10">π</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-white">
            The PI Classes
          </h1>
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mt-1">
            Director Management Portal
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Single-Admin Authorized Access Only</span>
          </div>
        </div>

        {/* Security Login Card */}
        <div className="mt-7 bg-slate-900/90 border border-slate-800/90 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/40 flex items-start gap-3 text-rose-200 text-sm animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-200 text-xs uppercase tracking-wider">Authentication Error</p>
                <p className="text-xs text-rose-300/90 mt-0.5 leading-relaxed">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <label 
                htmlFor="admin-phone" 
                className="block text-xs font-semibold text-slate-300 mb-1.5 tracking-wide"
              >
                Director Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="admin-phone"
                  name="adminMobileInput"
                  type="tel"
                  required
                  disabled={isLocked || isSubmitting}
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  placeholder="Enter 10-digit registered number"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="admin-password" 
                className="block text-xs font-semibold text-slate-300 mb-1.5 tracking-wide"
              >
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  name="adminSecurityPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLocked || isSubmitting}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isLocked}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-indigo-500 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
                id="admin-submit-btn"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Security Clearance...</span>
                  </span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Authenticate & Access Portal</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Secure System Notice */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2.5 text-[11px] text-slate-500">
            <ShieldAlert className="w-4 h-4 text-indigo-400/80 shrink-0" />
            <p>
              Protected administrative environment. All inquiries, fee discussions, and batch allocations are strictly confidential.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-[11px] text-slate-500">
          <p>{ADMIN_PROFILE.institute}</p>
          <p className="mt-0.5">{ADMIN_PROFILE.address}</p>
        </div>
      </div>
    </div>
  );
};
