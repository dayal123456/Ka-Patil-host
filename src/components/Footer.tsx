import React from 'react';
import { 
  Globe, Shield, Clock, HelpCircle, 
  Phone, Mail, MapPin, ExternalLink, Bookmark
} from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
  showToast: (msg: string) => void;
}

export default function Footer({ setCurrentView, showToast }: FooterProps) {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Subscribed! Thank you for subscribing to Ka Patil's newsletter alerts.");
  };

  return (
    <footer className="bg-[#FAFBFB] text-slate-600 border-t border-gray-200" id="global-footer">
      {/* Prime trust icons bar */}
      <div className="border-b border-gray-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-semibold">
          <div className="flex items-center space-x-3.5">
            <Clock size={20} className="text-[#003B2F] flex-shrink-0" />
            <div>
              <p className="text-slate-900 font-bold">99.9% Server Uptime Guarantee</p>
              <p className="text-slate-400 text-2xs">SLA contract backed nodes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <Shield size={20} className="text-[#003B2F] flex-shrink-0" />
            <div>
              <p className="text-slate-900 font-bold">cPGuard Malware Defence</p>
              <p className="text-slate-400 text-2xs">Real-time isolation scans</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <Globe size={20} className="text-[#003B2F] flex-shrink-0" />
            <div>
              <p className="text-slate-900 font-bold">Ultra-low Asia Latency</p>
              <p className="text-slate-400 text-2xs">True LiteSpeed hardware cluster</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <HelpCircle size={20} className="text-[#003B2F] flex-shrink-0" />
            <div>
              <p className="text-slate-900 font-bold">Fast Indian Engineer Support</p>
              <p className="text-slate-400 text-2xs">Real support, 10s wait time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link sections */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Branding box */}
        <div className="col-span-1 md:col-span-1 lg:col-span-4 space-y-5">
          <h3 className="text-xl font-black text-[#003B2F] tracking-tight">Ka Patil</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            High-performance enterprise hosting built for the future. Trusted by thousands of developers globally as a registered MSME Govt. of India hosting provider.
          </p>

          {/* Social / Trust icons */}
          <div className="flex items-center space-x-3 text-slate-400 pt-1">
            <span className="p-2 bg-white rounded-full border border-gray-200 hover:text-[#003B2F] transition duration-200 cursor-pointer">
              <Globe size={15} />
            </span>
            <span className="p-2 bg-white rounded-full border border-gray-200 hover:text-[#003B2F] transition duration-200 cursor-pointer">
              <Shield size={15} />
            </span>
          </div>

          {/* Business identity */}
          <div className="p-3 bg-white rounded-xl border border-gray-200 font-mono text-[10px] space-y-1 text-slate-500">
            <p className="font-bold text-slate-800 flex items-center space-x-1">
              <Bookmark size={11} className="text-[#003B2F]" />
              <span>Registered Enterprise</span>
            </p>
            <p className="leading-snug">Branch: Whitefield & Kumaraswamy Layout, Bangalore, Karnataka</p>
            <p className="text-emerald-700 font-bold">MSME UDYAM: UDYAM-KR-03-XXXXXX</p>
          </div>
        </div>

        {/* Column 1: Services */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Our Services</h4>
          <ul className="space-y-2.5 text-sm font-semibold">
            <li><button onClick={() => setCurrentView('hosting-shared')} className="hover:text-[#003B2F] transition cursor-pointer text-left">Shared Web Hosting</button></li>
            <li><button onClick={() => setCurrentView('hosting-wp')} className="hover:text-[#003B2F] transition cursor-pointer text-left">WordPress Hosting</button></li>
            <li><button onClick={() => setCurrentView('hosting-reseller')} className="hover:text-[#003B2F] transition cursor-pointer text-left">Reseller Hosting WHM</button></li>
            <li><button onClick={() => setCurrentView('hosting-vps')} className="hover:text-[#003B2F] transition cursor-pointer text-left">Cloud Linux VPS</button></li>
            <li><button onClick={() => setCurrentView('domain-register')} className="hover:text-[#003B2F] transition cursor-pointer text-left">Domain Name Registry</button></li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Company</h4>
          <ul className="space-y-2.5 text-sm font-semibold">
            <li><button onClick={() => setCurrentView('about')} className="hover:text-[#003B2F] transition cursor-pointer text-left">About Us Panel</button></li>
            <li><button onClick={() => setCurrentView('contact')} className="hover:text-[#003B2F] transition cursor-pointer text-left">Contact Bangalore HQ</button></li>
            <li><button onClick={() => setCurrentView('dashboard-main')} className="hover:text-[#003B2F] transition cursor-pointer text-left">Client Control Panel</button></li>
            <li><button onClick={() => showToast("Ka Patil Service SLA: uptime guarantee 99.9% fully monitored.")} className="hover:text-[#003B2F] transition cursor-pointer text-left">Uptime SLA Status</button></li>
            <li><button onClick={() => showToast("Affiliate manager script is active. Contact pre-sales.")} className="hover:text-[#003B2F] transition text-left">Affiliate Program</button></li>
          </ul>
        </div>

        {/* Column 3: Newsletter SignUp */}
        <div className="col-span-1 md:col-span-1 lg:col-span-4 space-y-4">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Hosting Insights</h4>
          <p className="text-xs leading-relaxed text-slate-500">
            Keep up with core speed improvements and PHP optimizations. Subscribe below:
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input 
              type="email" 
              required
              placeholder="name@company.com" 
              className="flex-1 px-3 py-2 bg-white border border-gray-200 text-xs font-semibold rounded focus:border-[#003B2F] focus:outline-none"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-[#003B2F] hover:bg-[#002f25] text-white text-xs font-bold rounded transition cursor-pointer"
            >
              Join
            </button>
          </form>

          {/* Contact quick look */}
          <div className="pt-2 text-2xs space-y-1.5 text-slate-500">
            <p className="flex items-center space-x-1.5 font-semibold">
              <Mail size={12} className="text-[#003B2F]" />
              <span>support@ka-patil.in</span>
            </p>
            <p className="flex items-center space-x-1.5 font-semibold">
              <Phone size={12} className="text-[#003B2F]" />
              <span>India Tel: +91 80-SUPPORT-36</span>
            </p>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="border-t border-gray-200 py-6 bg-white shrink-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4 font-semibold">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-slate-600 font-bold">© 2019-2026 Ka Patil Enterprises. All rights reserved.</p>
            <p className="text-3xs font-mono">MSME Registration No: UDYAM-KR-03-XXXXXX | Bangalore, Karnataka, India</p>
          </div>

          <div className="flex items-center space-x-6 text-slate-500">
            <button onClick={() => showToast("Security parameters fully encrypted via TLS 1.3.")} className="hover:text-slate-900 cursor-pointer">Security Certifications</button>
            <span>•</span>
            <button onClick={() => showToast("Refund policy terms: 2 days Money-back guarantee active.")} className="hover:text-slate-900 cursor-pointer">Refund Policy</button>
            <span>•</span>
            <button onClick={() => showToast("Privacy and cookies handling active.")} className="hover:text-slate-900 cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
