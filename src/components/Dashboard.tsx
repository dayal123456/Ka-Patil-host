import React, { useState, useEffect } from 'react';
import { 
  Server, Globe, FileText, LifeBuoy, Settings, ChevronRight, CheckCircle2, 
  Trash2, Plus, Terminal, RefreshCw, AlertCircle, Send, User, MessageCircle, ShieldCheck, Play 
} from 'lucide-react';
import { ActiveHosting, ActiveDomain, SupportTicket, Invoice, DNSRecord } from '../types';
import { CURRENCY_LIST, convertPrice } from '../data';

interface DashboardProps {
  currentTab: string; // 'main' | 'support'
  setCurrentTab: (tab: string) => void;
  selectedCurrency: string;
  isLoggedIn: boolean;
  userRole: 'client' | 'admin';
  activeHostings: ActiveHosting[];
  setActiveHostings: React.Dispatch<React.SetStateAction<ActiveHosting[]>>;
  activeDomains: ActiveDomain[];
  setActiveDomains: React.Dispatch<React.SetStateAction<ActiveDomain[]>>;
  supportTickets: SupportTicket[];
  setSupportTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  showToast: (msg: string) => void;
  setCurrentView: (view: string) => void;
}

export default function Dashboard({
  currentTab,
  setCurrentTab,
  selectedCurrency,
  isLoggedIn,
  userRole,
  activeHostings,
  setActiveHostings,
  activeDomains,
  setActiveDomains,
  supportTickets,
  setSupportTickets,
  invoices,
  setInvoices,
  showToast,
  setCurrentView
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'domains' | 'billing' | 'tickets'>('services');

  // Modal selections
  const [selectedHosting, setSelectedHosting] = useState<ActiveHosting | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<ActiveDomain | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // New DNS Record states
  const [dnsType, setDnsType] = useState<'A' | 'CNAME' | 'TXT' | 'MX'>('A');
  const [dnsHost, setDnsHost] = useState('');
  const [dnsValue, setDnsValue] = useState('');

  // Support thread states
  const [chatMessage, setChatMessage] = useState('');
  const [adminReply, setAdminReply] = useState('');

  // Simulate server resource usage fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHostings(prev => 
        prev.map(h => {
          if (h.status !== 'Active') return h;
          const cpuMod = (Math.random() - 0.5) * 8;
          const ramMod = (Math.random() - 0.5) * 4;
          return {
            ...h,
            resourceUsage: {
              cpu: Math.max(2, Math.min(98, Math.round(h.resourceUsage.cpu + cpuMod))),
              ram: Math.max(12, Math.min(94, Math.round(h.resourceUsage.ram + ramMod))),
              disk: h.resourceUsage.disk
            }
          };
        })
      );
    }, 4500);
    return () => clearInterval(timer);
  }, [setActiveHostings]);

  // Adjust active tab when routed directly to support
  useEffect(() => {
    if (currentTab === 'support') {
      setActiveTab('tickets');
    }
  }, [currentTab]);

  const activeCurrency = CURRENCY_LIST.find(c => c.code === selectedCurrency) || CURRENCY_LIST[0];

  const formatPrice = (amt: number) => {
    return `${activeCurrency.symbol}${convertPrice(amt, selectedCurrency as any)}`;
  };

  const handleClientSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !selectedTicket) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      sender: 'client' as const,
      message: chatMessage.trim(),
      timestamp: new Date().toISOString()
    };

    const updated = supportTickets.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: 'Client Reply' as const,
          replies: [...t.replies, newReply]
        };
      }
      return t;
    });

    setSupportTickets(updated);
    setChatMessage('');

    const currentTicket = updated.find(t => t.id === selectedTicket.id);
    if (currentTicket) setSelectedTicket(currentTicket);

    showToast('Reply dispatched safely to dispatch log.');

    // Simulate auto-response in 3 seconds from Rohan
    setTimeout(() => {
      const updatedWithResponse = updated.map(t => {
        if (t.id === selectedTicket.id) {
          return {
            ...t,
            status: 'Answered' as const,
            replies: [
              ...t.replies,
              newReply,
              {
                id: `rep-auto-${Date.now()}`,
                sender: 'support' as const,
                message: `Hello! I have reviewed your submission details. Our technical Bangalore staff is monitoring the specific server cluster nodes involved. We will implement corrective measures immediately. Thank you for your patience constraint!`,
                timestamp: new Date().toISOString()
              }
            ]
          };
        }
        return t;
      });

      setSupportTickets(updatedWithResponse);
      const activeRef = updatedWithResponse.find(t => t.id === selectedTicket.id);
      if (activeRef) setSelectedTicket(activeRef);
    }, 3000);
  };

  const handleAdminSendReply = (ticketId: string) => {
    if (!adminReply.trim()) return;

    const replyObj = {
      id: `rep-adm-${Date.now()}`,
      sender: 'support' as const,
      message: adminReply.trim(),
      timestamp: new Date().toISOString()
    };

    const updated = supportTickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Answered' as const,
          replies: [...t.replies, replyObj]
        };
      }
      return t;
    });

    setSupportTickets(updated);
    setAdminReply('');

    const target = updated.find(t => t.id === ticketId);
    if (target) setSelectedTicket(target);

    showToast('Admin update dispatched directly to client area thread!');
  };

  const handleAddDnsRecord = (domainName: string) => {
    if (!dnsHost.trim() || !dnsValue.trim()) {
      showToast('DNS specifications cannot be empty.');
      return;
    }

    const rec: DNSRecord = {
      id: `dns-${Date.now()}`,
      type: dnsType,
      host: dnsHost.trim(),
      value: dnsValue.trim(),
      ttl: 3600
    };

    setActiveDomains(prev => 
      prev.map(d => d.name === domainName ? { ...d, dnsRecords: [...d.dnsRecords, rec] } : d)
    );

    setSelectedDomain(prev => {
      if (prev && prev.name === domainName) {
        return { ...prev, dnsRecords: [...prev.dnsRecords, rec] };
      }
      return prev;
    });

    setDnsHost('');
    setDnsValue('');
    showToast('Success: DNS Record successfully queued on nameservers.');
  };

  const handleDeleteDnsRecord = (domainName: string, recId: string) => {
    setActiveDomains(prev => 
      prev.map(d => d.name === domainName ? { ...d, dnsRecords: d.dnsRecords.filter(r => r.id !== recId) } : d)
    );

    setSelectedDomain(prev => {
      if (prev && prev.name === domainName) {
        return { ...prev, dnsRecords: prev.dnsRecords.filter(r => r.id !== recId) };
      }
      return prev;
    });

    showToast('DNS Record deleted successfully.');
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen py-10 md:py-16" id="dashboard-root">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title and stats summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-905 text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="text-[#003B2F]" />
              <span>{userRole === 'admin' ? 'Host Control Administration' : 'Client Accounts Area'}</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Ref Profile: <strong className="text-slate-600">nakliff123@gmail.com</strong> | Status: sandbox verified
            </p>
          </div>

          {/* Tab Switcher client only */}
          {userRole === 'client' && (
            <div className="flex bg-gray-100 p-1 rounded border border-gray-200">
              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2 text-xs font-bold rounded transition ${
                  activeTab === 'services' ? 'bg-[#003B2F] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Services ({activeHostings.length})
              </button>
              <button
                onClick={() => setActiveTab('domains')}
                className={`px-4 py-2 text-xs font-bold rounded transition ${
                  activeTab === 'domains' ? 'bg-[#003B2F] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Domains ({activeDomains.length})
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`px-4 py-2 text-xs font-bold rounded transition ${
                  activeTab === 'billing' ? 'bg-[#003B2F] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Billing ({invoices.length})
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`px-4 py-2 text-xs font-bold rounded transition ${
                  activeTab === 'tickets' ? 'bg-[#003B2F] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Tickets ({supportTickets.length})
              </button>
            </div>
          )}
        </div>

        {/* ----------------- ADMIN DASHBOARD LAYOUT ----------------- */}
        {userRole === 'admin' ? (
          <div className="space-y-8 animate-in fade-in" id="admin-view">
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-800 font-semibold flex items-start space-x-3">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-rose-600" />
              <div>
                <span className="block font-bold">Admin Privileges Active</span>
                <span>This simulation view allows managing all user tickets, monitoring cluster instances, and reviewing invoice payment records.</span>
              </div>
            </div>

            {/* Quick stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <p className="text-[10px] uppercase font-mono font-bold text-slate-400">Total accounts</p>
                <p className="text-2xl font-black text-slate-900 mt-1">1 Account</p>
              </div>
              <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <p className="text-[10px] uppercase font-mono font-bold text-slate-400">Active Subscribed Services</p>
                <p className="text-2xl font-black text-[#003B2F] mt-1">{activeHostings.length + activeDomains.length}</p>
              </div>
              <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <p className="text-[10px] uppercase font-mono font-bold text-slate-400">Pending support tickets</p>
                <p className="text-2xl font-black text-rose-700 mt-1">
                  {supportTickets.filter(t => t.status !== 'Closed').length} Active
                </p>
              </div>
            </div>

            {/* Admin Grid panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Tickets admin side */}
              <div className="lg:col-span-8 bg-white border border-gray-200 p-6 rounded-xl space-y-6">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">Active Administrative Tickets Queue</h3>
                <div className="space-y-4">
                  {supportTickets.map(t => (
                    <div 
                      key={t.id}
                      onClick={() => setSelectedTicket(t)}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedTicket?.id === t.id ? 'bg-emerald-50/10 border-[#003B2F]' : 'bg-gray-50/30 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="font-bold text-xs text-slate-900">{t.subject}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-1">Ref: {t.id} | Priority: {t.priority}</p>
                        </div>
                        <span className="px-2 py-0.5 bg-gray-200 text-slate-700 font-mono text-[9px] font-bold rounded">
                          {t.status}
                        </span>
                      </div>

                      {selectedTicket?.id === t.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                          <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
                            {t.replies.map(r => (
                              <div key={r.id} className={`p-3 rounded text-xs ${
                                r.sender === 'client' ? 'bg-gray-150 border border-gray-200 mr-8' : 'bg-emerald-50 border border-emerald-100 ml-8 text-emerald-950'
                              }`}>
                                <p className="text-[9px] font-mono text-slate-400 mb-1">
                                  <strong>{r.sender === 'client' ? 'Client User' : 'Admin Staff'}</strong> • {new Date(r.timestamp).toLocaleTimeString()}
                                </p>
                                <p className="leading-relaxed whitespace-pre-wrap">{r.message}</p>
                              </div>
                            ))}
                          </div>

                          {/* Reply write box */}
                          <div className="space-y-2 pt-2">
                            <textarea
                              placeholder="Write admin reply update..."
                              rows={3}
                              value={adminReply}
                              onChange={(e) => setAdminReply(e.target.value)}
                              className="w-full p-2.5 bg-white border border-gray-200 text-xs font-semibold rounded focus:border-[#003B2F] focus:outline-none"
                            ></textarea>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => handleAdminSendReply(t.id)}
                                className="px-4 py-2 bg-[#003B2F] hover:bg-[#002f25] text-white text-xs font-bold rounded cursor-pointer"
                              >
                                Submit Admin Answer
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Provisioned lists sidebar */}
              <div className="lg:col-span-4 bg-white border border-gray-200 p-6 rounded-xl space-y-6">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">System Deployments</h3>
                <div className="space-y-4">
                  {/* Hostings */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-2">
                    <p className="text-[10px] font-mono font-bold text-slate-400">Active Hosting nodes</p>
                    {activeHostings.map(h => (
                      <div key={h.id} className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-900">{h.planName}</span>
                        <span className="font-mono text-[10px] text-emerald-850 text-emerald-800">{h.domainName}</span>
                      </div>
                    ))}
                  </div>

                  {/* Domains */}
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-2">
                    <p className="text-[10px] font-mono font-bold text-slate-400">Registered domains</p>
                    {activeDomains.map(d => (
                      <div key={d.name} className="flex justify-between items-center text-xs">
                        <span className="font-mono text-slate-905 text-slate-900 font-bold">{d.name}</span>
                        <span className="text-[10px] text-slate-400">Expires {d.expiryDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ----------------- CLIENT ACCOUNTS LAYOUT ----------------- */
          <div className="space-y-8 animate-in fade-in" id="client-view">
            
            {/* Services tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-905 text-slate-900">Activated Web Hostings</h3>
                  <button 
                    onClick={() => setCurrentView('hosting-shared')}
                    className="px-4 py-2.5 bg-[#003B2F] text-white hover:bg-[#002f25] text-xs font-bold rounded cursor-pointer"
                  >
                    + Purchase New Hosting
                  </button>
                </div>

                {activeHostings.length === 0 ? (
                  <div className="p-12 text-center bg-gray-50 border border-gray-200 rounded-xl space-y-4 max-w-2xl mx-auto">
                    <Server className="w-12 h-12 text-slate-350 mx-auto text-slate-400" />
                    <p className="text-sm text-slate-500 font-medium">You have no active web hosting subscriptions under your profile yet.</p>
                    <button 
                      onClick={() => setCurrentView('hosting-shared')}
                      className="px-6 py-2.5 bg-[#003B2F] hover:bg-[#002f25] text-white text-xs font-bold rounded"
                    >
                      Browse Web Hosting Packages
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeHostings.map(h => (
                      <div key={h.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-2xs">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <span className="p-2.5 bg-emerald-50 rounded border border-emerald-100">
                              <Server className="w-4 h-4 text-[#003B2F]" />
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold rounded">
                              {h.status}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900">{h.planName}</h4>
                            <p className="text-xs font-mono text-emerald-800 font-bold mt-1">{h.domainName}</p>
                          </div>

                          {/* CPU / RAM details */}
                          <div className="space-y-2 pt-3 border-t border-gray-100 text-[10px] font-mono">
                            <div className="space-y-1">
                              <div className="flex justify-between text-slate-500">
                                <span>Core CPU:</span>
                                <span>{h.resourceUsage.cpu}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${h.resourceUsage.cpu}%` }}></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-slate-500">
                                <span>Memory RAM:</span>
                                <span>{h.resourceUsage.ram}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${h.resourceUsage.ram}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => setSelectedHosting(h)}
                            className="w-full py-2 bg-gray-50 border hover:border-[#003B2F] hover:bg-emerald-50/10 text-xs font-extrabold text-[#003B2F] rounded cursor-pointer transition flex items-center justify-center space-x-1"
                          >
                            <span>Manage Container (cPanel)</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Domains tab */}
            {activeTab === 'domains' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-905 text-slate-900">Registered Domain Names</h3>
                  <button 
                    onClick={() => setCurrentView('domain-register')}
                    className="px-4 py-2.5 bg-[#003B2F] text-white hover:bg-[#002f25] text-xs font-bold rounded cursor-pointer"
                  >
                    + Register New Domain
                  </button>
                </div>

                {activeDomains.length === 0 ? (
                  <div className="p-12 text-center bg-gray-50 border border-gray-200 rounded-xl space-y-4 max-w-2xl mx-auto">
                    <Globe className="w-12 h-12 text-slate-400 mx-auto" />
                    <p className="text-sm text-slate-500 font-medium font-sans">You have no domain registries under your account profile yet.</p>
                    <button 
                      onClick={() => setCurrentView('domain-register')}
                      className="px-6 py-2.5 bg-[#003B2F] hover:bg-[#002f25] text-white text-xs font-bold rounded"
                    >
                      Secure New Web Address
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-slate-400 font-mono text-[10px] uppercase font-bold">
                          <th className="p-4">Domain Name</th>
                          <th className="p-4">Registration Date</th>
                          <th className="p-4">Expiration Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Settings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeDomains.map(d => (
                          <tr key={d.name} className="border-b border-gray-150 hover:bg-gray-50">
                            <td className="p-4 font-mono font-extrabold text-slate-905 text-slate-900">{d.name}</td>
                            <td className="p-4 text-slate-500">{d.registeredDate}</td>
                            <td className="p-4 font-mono text-slate-500">{d.expiryDate}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-mono text-[9px] font-bold rounded border border-emerald-100">
                                {d.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => setSelectedDomain(d)}
                                className="px-3.5 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-slate-705 text-slate-800 text-[10px] font-bold rounded transition cursor-pointer"
                              >
                                DNS & Nameservers
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Billing tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Simulated Account Invoices</h3>
                {invoices.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No invoices are logged under this user.</p>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-slate-400 font-mono text-[10px] uppercase font-bold">
                          <th className="p-4">Invoice ID</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Subtotal</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map(inv => (
                          <tr key={inv.id} className="border-b border-gray-150 hover:bg-gray-50">
                            <td className="p-4 font-mono font-bold text-slate-900">{inv.id}</td>
                            <td className="p-4 text-slate-500">{inv.date}</td>
                            <td className="p-4 font-mono font-extrabold text-[#003B2F]">{formatPrice(inv.amount)}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-100 font-mono text-[9px] font-bold rounded">
                                {inv.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => {
                                  const details = inv.items.map(i => `- ${i.description}: ${formatPrice(i.amount)}`).join('\n');
                                  alert(`--- SSL TRANSACTION RECEIPT ---\nInvoice ID: ${inv.id}\nDate: ${inv.date}\n\nProducts Purchased:\n${details}\n\nTotal Paid: ${formatPrice(inv.amount)}\n\nStatus: Transaction Approved`);
                                }}
                                className="px-3.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-[10px] text-slate-800 font-bold rounded cursor-pointer shadow-3xs"
                              >
                                View Receipt
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tickets tab */}
            {activeTab === 'tickets' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-905 text-slate-900">Technical Support Tickets</h3>
                  <button
                    onClick={() => setCurrentView('contact')}
                    className="px-4 py-2.5 bg-[#003B2F] text-white hover:bg-[#002f25] text-xs font-bold rounded cursor-pointer"
                  >
                    + Open Support Ticket
                  </button>
                </div>

                {supportTickets.length === 0 ? (
                  <div className="p-12 text-center bg-gray-50 border border-gray-200 rounded-xl space-y-4 max-w-2xl mx-auto">
                    <LifeBuoy className="w-12 h-12 text-slate-400 mx-auto animate-spin" />
                    <p className="text-sm text-slate-500 font-medium">You currently have no active support tickets logged on file.</p>
                    <button
                      onClick={() => setCurrentView('contact')}
                      className="px-6 py-2.5 bg-[#003B2F] hover:bg-[#002f25] text-white text-xs font-bold rounded"
                    >
                      Create Service Ticket
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Ticket list side */}
                    <div className="lg:col-span-4 space-y-3">
                      {supportTickets.map(t => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTicket(t)}
                          className={`p-4 border rounded-xl cursor-pointer transition ${
                            selectedTicket?.id === t.id ? 'bg-emerald-50/10 border-[#003B2F]' : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-xs text-slate-900 line-clamp-2">{t.subject}</h4>
                            <span className="px-1.5 py-0.5 bg-gray-100 text-slate-700 text-[8px] font-mono font-bold rounded">
                              {t.status}
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2.5">
                            <span>ID: {t.id}</span>
                            <span>{t.createdDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat log side */}
                    <div className="lg:col-span-8 bg-white border border-gray-200 p-6 rounded-xl min-h-[400px] flex flex-col justify-between shadow-2xs">
                      {selectedTicket ? (
                        <div className="space-y-6 flex-1 flex flex-col justify-between">
                          <div className="border-b border-gray-100 pb-3">
                            <h4 className="font-extrabold text-sm text-slate-900">{selectedTicket.subject}</h4>
                            <p className="text-[10px] text-slate-400 font-mono mt-1">
                              Dept: <strong className="text-slate-600">{selectedTicket.department}</strong> | Status: <strong className="text-[#003B2F]">{selectedTicket.status}</strong>
                            </p>
                          </div>

                          {/* Message dialogue bubble loops */}
                          <div className="space-y-4 flex-1 overflow-y-auto max-h-64 pr-1">
                            {selectedTicket.replies.map(rep => (
                              <div
                                key={rep.id}
                                className={`p-3 rounded-lg text-xs max-w-[80%] border ${
                                  rep.sender === 'client'
                                    ? 'bg-gray-50 border-gray-205 border-gray-200 mr-auto text-slate-800'
                                    : 'bg-emerald-50/20 border-emerald-100 ml-auto text-slate-950'
                                }`}
                              >
                                <p className="text-[9px] font-mono text-slate-400 mb-1">
                                  <strong>{rep.sender === 'client' ? 'You' : 'WP Support Representative'}</strong> • {new Date(rep.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <p className="leading-relaxed whitespace-pre-wrap">{rep.message}</p>
                              </div>
                            ))}
                          </div>

                          {/* Write dialog reply */}
                          <form onSubmit={handleClientSendReply} className="border-t border-gray-200 pt-4 flex gap-2">
                            <input
                              type="text"
                              placeholder="Type reply message updates here..."
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-xs font-semibold rounded focus:border-[#003B2F] focus:outline-none"
                            />
                            <button
                              type="submit"
                              className="px-5 py-2.5 bg-[#003B2F] hover:bg-[#002f25] text-white text-xs font-bold rounded flex items-center space-x-1.5 cursor-pointer"
                            >
                              <Send size={12} />
                              <span>Send</span>
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-slate-405 text-slate-400 italic space-y-4">
                          <MessageCircle size={28} className="text-slate-350" />
                          <p className="text-xs">Select support ticket item on the left queue to view active dialogs.</p>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ----------------- MODALS ----------------- */}

        {/* HOSTING CONTROL PANEL MODAL (Light styled cPanel mockup) */}
        {selectedHosting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-xl">
              <button
                onClick={() => setSelectedHosting(null)}
                className="absolute top-6 right-6 p-1.5 bg-gray-55 hover:bg-gray-100 rounded-full border border-gray-200 text-slate-500 text-xs"
              >
                ✕
              </button>

              <div className="flex items-start space-x-4 border-b border-gray-100 pb-5">
                <span className="p-3 bg-emerald-50 rounded border border-emerald-100">
                  <Server className="w-6 h-6 text-[#003B2F]" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{selectedHosting.planName} Control Console</h3>
                  <p className="text-xs text-emerald-800 font-mono mt-1">Domain Address: <strong className="font-bold">{selectedHosting.domainName}</strong></p>
                </div>
              </div>

              {/* Resource charts simulation */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase font-mono font-bold text-slate-400">Node Real-Time Hardware Resource load</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                    <p className="text-[9px] font-mono text-slate-400">SIMULATED CPU LOAD</p>
                    <p className="text-xl font-mono font-black text-slate-905 text-slate-900 mt-1">{selectedHosting.resourceUsage.cpu}%</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${selectedHosting.resourceUsage.cpu}%` }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                    <p className="text-[9px] font-mono text-slate-400">SIMULATED RAM MEMORY</p>
                    <p className="text-xl font-mono font-black text-slate-900 mt-1">{selectedHosting.resourceUsage.ram}%</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${selectedHosting.resourceUsage.ram}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Server tools toggle settings */}
              <div className="space-y-4 pt-4 border-t border-gray-100 text-xs text-slate-600">
                <h4 className="text-[10px] uppercase font-mono font-bold text-slate-400">One-Click Server Infrastructure Settings</h4>
                
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded border border-gray-200">
                  <div>
                    <p className="font-bold text-slate-900">Maintenance Sandbox Lock</p>
                    <p className="text-[10px] text-slate-400">Force display a modern "Under Construction" template to visitors.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedHosting({ ...selectedHosting, maintenanceMode: !selectedHosting.maintenanceMode });
                      showToast('Maintenance template toggle applied.');
                    }}
                    className={`px-3.5 py-1.5 rounded font-mono text-[10px] font-bold ${
                      selectedHosting.maintenanceMode ? 'bg-[#003B2F] text-white' : 'bg-white border border-gray-250 text-slate-800'
                    }`}
                  >
                    {selectedHosting.maintenanceMode ? 'ACTIVE' : 'DISABLED'}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded border border-gray-200">
                  <div>
                    <p className="font-bold text-slate-900">Automated Core CMS Upgrades</p>
                    <p className="text-[10px] text-slate-400">Let our background cron patch security files on the server instantly.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedHosting({ ...selectedHosting, autoUpdates: !selectedHosting.autoUpdates });
                      showToast('Auto Core systems patches toggled.');
                    }}
                    className={`px-3.5 py-1.5 rounded font-mono text-[10px] font-bold ${
                      selectedHosting.autoUpdates ? 'bg-[#003B2F] text-white' : 'bg-white border border-gray-200 text-slate-800'
                    }`}
                  >
                    {selectedHosting.autoUpdates ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between gap-4">
                <button
                  onClick={() => alert(`PHP Version Configurator:\nWe have set PHP 8.3 as default for domain ${selectedHosting.domainName}. You can downgrade PHP dynamically if required.`)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-2xs font-bold text-slate-700 transition"
                >
                  Configure PHP version
                </button>
                <button
                  onClick={() => showToast('Command executed: Purged LiteSpeed servers cache loops.')}
                  className="px-4 py-2 bg-[#003B2F] hover:bg-[#002f25] text-white rounded text-2xs font-bold"
                >
                  Purge LiteSpeed Cache
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DNS / NAMESERVER MANAGEMENT MODAL */}
        {selectedDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-xl">
              <button
                onClick={() => setSelectedDomain(null)}
                className="absolute top-6 right-6 p-1.5 bg-gray-55 hover:bg-gray-100 border border-gray-200 rounded text-slate-500 text-xs"
              >
                ✕
              </button>

              <div className="flex items-start space-x-4 border-b border-gray-100 pb-5">
                <span className="p-3 bg-emerald-50 rounded border border-emerald-100">
                  <Globe className="w-6 h-6 text-[#003B2F]" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">DNS Zones Manager</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">Registry node domain: <strong className="font-bold">{selectedDomain.name}</strong></p>
                </div>
              </div>

              {/* DNS Addition form */}
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-4 text-xs font-semibold">
                <h4 className="font-bold text-slate-900 uppercase text-[10px] text-slate-400 font-mono">Create new DNS resource record</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400">Type</label>
                    <select
                      value={dnsType}
                      onChange={(e: any) => setDnsType(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded focus:outline-none"
                    >
                      <option value="A">A Record</option>
                      <option value="CNAME">CNAME</option>
                      <option value="TXT">TXT / SPF</option>
                      <option value="MX">MX Mail</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400">Host (Alias)</label>
                    <input
                      type="text"
                      placeholder="@ or www"
                      value={dnsHost}
                      onChange={(e) => setDnsHost(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-5 space-y-1">
                    <label className="text-[9px] font-mono tracking-wider text-slate-400">Target Value</label>
                    <input
                      type="text"
                      placeholder="e.g. 192.168.1.1 or spf.google.com"
                      value={dnsValue}
                      onChange={(e) => setDnsValue(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-end">
                    <button
                      type="button"
                      onClick={() => handleAddDnsRecord(selectedDomain.name)}
                      className="w-full py-2 bg-[#003B2F] hover:bg-[#002f25] text-white font-bold rounded flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Records Loop List */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-mono font-bold text-slate-400">Active Nameserver Resource Records</h4>
                
                <div className="border border-gray-205 border-gray-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-slate-400 font-mono text-[9px] uppercase font-bold">
                        <th className="p-3">Type</th>
                        <th className="p-3">Host</th>
                        <th className="p-3">Target Value</th>
                        <th className="p-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDomain.dnsRecords.map(r => (
                        <tr key={r.id} className="border-b border-gray-150 hover:bg-gray-50">
                          <td className="p-3 font-bold text-[#003B2F] font-mono">{r.type}</td>
                          <td className="p-3 font-mono text-slate-600">{r.host}</td>
                          <td className="p-3 font-mono text-slate-500 break-all">{r.value}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteDnsRecord(selectedDomain.name, r.id)}
                              className="p-1 hover:text-rose-600 hover:bg-rose-50 text-slate-400 rounded cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedDomain(null)}
                  className="px-5 py-2.5 bg-gray-50 border border-gray-200 text-slate-800 text-xs font-bold rounded"
                >
                  Close Manager
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
