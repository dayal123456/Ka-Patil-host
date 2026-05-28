import React, { useState } from 'react';
import { 
  Building, MapPin, Phone, Mail, Award, CheckCircle2, 
  Send, Sparkles, ShieldCheck, HeartHandshake, ShieldAlert
} from 'lucide-react';

interface AboutContactPageProps {
  initialTab: 'about' | 'contact';
  setCurrentView: (view: string) => void;
  showToast: (msg: string) => void;

  // Callback to create a ticket in the client Area!
  onCreateTicket?: (ticket: {
    subject: string;
    department: 'Technical' | 'Billing' | 'Sales' | 'Abuse';
    priority: 'Low' | 'Medium' | 'High';
    message: string;
  }) => void;
}

export default function AboutContactPage({
  initialTab,
  setCurrentView,
  showToast,
  onCreateTicket
}: AboutContactPageProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>(initialTab);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState<'Technical' | 'Billing' | 'Sales' | 'Abuse'>('Technical');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      showToast('Validation Error: Please fill in all fields before sending.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      if (onCreateTicket) {
        onCreateTicket({
          subject: `Contact Query: ${subject}`,
          department: dept,
          priority: 'High',
          message: `Sender: ${fullName} (${email})\n\nMessage:\n${message}`
        });

        showToast('Success! Your secure message has been dispatched and auto-queued as an active support ticket.');
        setCurrentView('dashboard-main');
      } else {
        showToast('Your message has been sent successfully. Support will respond shortly.');
      }

      // Reset form
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen py-16 md:py-24" id="about-contact-root">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Switch Selector */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-100 p-1 rounded flex items-center space-x-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center space-x-2 transition ${
                activeTab === 'about' ? 'bg-[#003B2F] text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Building size={14} />
              <span>About Company</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center space-x-2 transition ${
                activeTab === 'contact' ? 'bg-[#003B2F] text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Mail size={14} />
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        {activeTab === 'about' ? (
          /* About us tab content */
          <div className="space-y-16 animate-in fade-in duration-200" id="about-tab-panel">
            {/* Mission Hero visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-[#003B2F] border border-emerald-100 rounded-full text-xs font-semibold">
                  <span>Powering the Digital Future from Bangalore</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                  We bridge the gap between premium speed and affordable hosting.
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed font-sans">
                  ka patil (incorporating Ka Patil Enterprises) is an MSME registered technology company dedicated to democratizing high-performance hosting. Originally established in 2019 in Bangalore, we leverage enterprise LiteSpeed servers, custom NVMe cluster nodes, and responsive local engineers to keep our clients running.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono font-bold text-slate-500">
                  <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded">
                    <CheckCircle2 size={13} className="text-emerald-700" />
                    <span>Registered MSME Govt. of India</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded">
                    <CheckCircle2 size={13} className="text-emerald-700" />
                    <span>Karnataka HQ Setup</span>
                  </div>
                </div>
              </div>

              {/* HQ Illustration block wrapper */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-50 rounded-full blur-2xl"></div>
                   <div className="flex justify-between items-start border-b border-gray-150 pb-4">
                    <Building className="w-10 h-10 text-[#003B2F] p-2 bg-emerald-50 border border-emerald-100 rounded" />
                    <span className="text-[10px] font-mono text-slate-400">Established Bangalore, 2019</span>
                  </div>

                  <div className="space-y-4 my-6">
                    <h4 className="text-base font-extrabold text-slate-900">Our Core Pillars</h4>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-emerald-605 bg-emerald-600 rounded-full"></span>
                        <span>Solid Uptime Guarantee: 99.9% backed by SLA.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                        <span>Transparent Budget rates starting ₹79/mo.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                        <span>Expert support always available via Chat/Ticket.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-emerald-50 p-3 rounded border border-emerald-100 text-center">
                    <p className="text-[10px] font-mono font-bold text-[#003B2F]">MSME REG NO: UDYAM-KR-03-XXXXXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values visual grids */}
            <div className="space-y-8 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-slate-900 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-3 shadow-3xs">
                  <Sparkles className="w-8 h-8 text-amber-600 p-1.5 bg-amber-50 border border-amber-100 rounded" />
                  <h4 className="font-bold text-slate-900 text-sm">Extreme Performance</h4>
                  <p className="text-xs text-slate-500 leading-normal">We reject standard, sluggish apache nodes. Every account hosting is routed through absolute NVMe drives and LiteSpeed web speed engines.</p>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-3 shadow-3xs">
                  <HeartHandshake className="w-8 h-8 text-[#003B2F] p-1.5 bg-emerald-50 border border-emerald-100 rounded" />
                  <h4 className="font-bold text-slate-900 text-sm">Professional Support</h4>
                  <p className="text-xs text-slate-500 leading-normal">We believe hosting should be stress-free. Our engineers provide instant technical help for backups, migration and installations.</p>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-3 shadow-3xs">
                  <ShieldAlert className="w-8 h-8 text-sky-600 p-1.5 bg-sky-50 border border-sky-100 rounded" />
                  <h4 className="font-bold text-slate-900 text-sm">cPGuard Malware Shield</h4>
                  <p className="text-xs text-slate-500 leading-normal">Security is not optional. Every server incorporates real-time cPGuard intrusion defense grids to hard isolate malware instantly.</p>
                </div>
              </div>
            </div>

            {/* MSME official notice layout */}
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#003B2F] flex items-center justify-center border border-emerald-250 border-emerald-100 flex-shrink-0">
                <Award size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Officially Registered MSME Enterprise</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                  ka patil operates as a registered Micro, Small, and Medium Enterprise in Bangalore, Karnataka, under the Ministry of MSME, Government of India. This legal accountability ensures full commitment to service delivery, customer security, and compliance.
                </p>
                <div className="flex gap-4 text-[10px] font-mono text-slate-400 pt-1">
                  <span>Reg: 2019-2026+</span>
                  <span>|</span>
                  <span>HQ: Whitefield & Kumaraswamy Layout, Bangalore</span>
                  <span>|</span>
                  <span>Verified Hosting Partner</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Contact Us Form and links */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in duration-200" id="contact-tab-panel">
            {/* General Info Left */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">Enterprise Support Available 24/7/365</h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We don't leave you stranded with robotic auto-responders. Meet our real support engineers ready to help over secure tickets and WhatsApp chat.
                </p>
              </div>

              {/* Direct Info list */}
              <div className="space-y-4">
                <div className="p-5 bg-white border border-gray-200 rounded-xl flex items-start space-x-4 shadow-3xs">
                  <Phone className="w-8 h-8 text-[#003B2F] p-1.5 bg-emerald-50 border border-emerald-100 rounded flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">WhatsApp & Direct Call Support</h4>
                    <p className="text-base font-black text-[#003B2F] mt-1">+91 80-SUPPORT-36</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Average response time: &lt; 60 seconds</p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-gray-200 rounded-xl flex items-start space-x-4 shadow-3xs">
                  <MapPin className="w-8 h-8 text-indigo-700 p-1.5 bg-indigo-50 border border-indigo-100 rounded flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Bangalore Headquarters</h4>
                    <p className="text-xs text-slate-600 mt-1 font-semibold leading-relaxed">
                      2nd Cross, 4th Main, Kumaraswamy Layout, Bangalore, Karnataka, India
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Consultative office consulting additionally in Whitefield</p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-gray-200 rounded-xl flex items-start space-x-4 shadow-3xs">
                  <Mail className="w-8 h-8 text-[#003B2F] p-1.5 bg-emerald-50 border border-emerald-100 rounded flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Official Inquiries</h4>
                    <p className="text-xs text-slate-750 text-slate-700 font-mono font-bold">support@ka-patil.in</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Replies generated round-the-clock</p>
                  </div>
                </div>
              </div>

              {/* Secure guarantee widget */}
              <div className="p-5 bg-gray-50 border border-gray-200 text-center rounded text-[10px] font-mono text-slate-400 leading-normal">
                ⭐ Rated 4.8/5 Customer Satisfaction Index from over 4,500 active feedback logs.
              </div>
            </div>

            {/* Support Message form Right */}
            <div className="lg:col-span-7 bg-white border border-gray-205 border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Send size={18} className="text-[#003B2F]" />
                <span>Send a Secure Message</span>
              </h2>

              <form onSubmit={handleSubmitContact} className="space-y-4 text-xs font-semibold">
                
                {/* Name & Mail row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-slate-400 font-bold">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-xs focus:border-[#003B2F] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-slate-400 font-bold">Work Email address</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-xs focus:border-[#003B2F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Dropdown & inquiry category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-slate-400 font-bold">Inquiry Type</label>
                    <select
                      value={dept}
                      onChange={(e: any) => setDept(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded focus:outline-none focus:border-[#003B2F] font-bold text-xs"
                    >
                      <option value="Technical">Technical Support</option>
                      <option value="Billing">Billing & Refunds</option>
                      <option value="Sales">Pre-sales Consultation</option>
                      <option value="Abuse">Abuse / DMCA claim</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-slate-400 font-bold">Inquiry Subject</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Migration request" 
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-xs focus:border-[#003B2F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Message body */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-400 font-bold">Detailed Message</label>
                  <textarea 
                    placeholder="Tell us about your web project needs or any technical issue you are currently facing..."
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-xs focus:border-[#003B2F] focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded bg-[#003B2F] hover:bg-[#002f25] text-white flex items-center justify-center space-x-2 transition duration-200 font-extrabold font-mono text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Dispatching Connection...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
