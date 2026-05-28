import React, { useState } from 'react';
import { Lock, User, RefreshCw, ShieldCheck } from 'lucide-react';

interface LoginScreenProps {
  setCurrentView: (view: string) => void;
  setIsLoggedIn: (login: boolean) => void;
  showToast: (msg: string) => void;
}

export default function LoginScreen({
  setCurrentView,
  setIsLoggedIn,
  showToast
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Validation Error: Please enter email and password.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API authorization
    setTimeout(() => {
      setIsSubmitting(false);
      setIsLoggedIn(true);
      showToast('Success! Secure panel login authorized successfully.');
      setCurrentView('dashboard-main');
    }, 1200);
  };

  const handleQuickDemoJoin = () => {
    setIsLoggedIn(true);
    showToast('Success! Logged into instant sandbox profile.');
    setCurrentView('dashboard-main');
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen py-16 md:py-28 flex justify-center items-center px-4" id="login-container">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 shadow-md relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl"></div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">Client Area Portal Access</h2>
          <p className="text-xs text-slate-500">Sign in to control nameservers, database backup restore and billing.</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-semibold">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Email address</label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" 
                placeholder="name@company.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded focus:border-[#003B2F] focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <label className="uppercase font-mono tracking-wider text-slate-400 font-bold">Secret Key Password</label>
              <span className="text-[10px] text-[#003B2F] hover:underline cursor-pointer">Recover Code?</span>
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded focus:border-[#003B2F] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded bg-[#003B2F] hover:bg-[#002f25] text-white flex items-center justify-center space-x-1.5 transition duration-150 font-extrabold uppercase font-mono text-xs tracking-wider disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={13} className="animate-spin text-white" />
                <span>Checking credentials...</span>
              </>
            ) : (
              <span>Authorized Panel Login</span>
            )}
          </button>
        </form>

        <div className="border-t border-gray-100 pt-5 text-center space-y-4">
          <p className="text-[11px] text-slate-500 font-semibold">Need immediate testing access without passwords?</p>
          <button
            type="button"
            onClick={handleQuickDemoJoin}
            className="w-full py-3 bg-white hover:bg-gray-50 border border-gray-200 text-[#003B2F] font-mono text-2xs uppercase tracking-wide transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
          >
            <ShieldCheck size={13} className="text-[#003B2F]" />
            <span>Access Instant Sandbox Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
}
