import React, { useState } from 'react';
import { Globe, Search, ArrowRight, ShieldCheck, Check, AlertTriangle, RefreshCw } from 'lucide-react';
import { DOMAIN_PRICING, CURRENCY_LIST, convertPrice } from '../data';
import { Currency } from '../types';

interface DomainPageProps {
  initialView: 'register' | 'transfer';
  setCurrentView: (view: string) => void;
  selectedCurrency: Currency;
  onAddToCart: (item: any) => void;
  showToast: (msg: string) => void;
  selectedDomainName?: string;
  setSelectedDomainName?: (domain: string) => void;
}

export default function DomainPage({
  initialView,
  setCurrentView,
  selectedCurrency,
  onAddToCart,
  showToast,
  selectedDomainName = '',
  setSelectedDomainName
}: DomainPageProps) {
  const [activeTab, setActiveTab] = useState<'register' | 'transfer'>(initialView);
  const [searchVal, setSearchVal] = useState(selectedDomainName);
  const [years, setYears] = useState<number>(1);
  const [lookupResult, setLookupResult] = useState<any>(null);

  // Transfer states
  const [transferDomain, setTransferDomain] = useState('');
  const [eppCode, setEppCode] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authResult, setAuthResult] = useState<'unlocked' | 'locked' | null>(null);

  const activeCurrency = CURRENCY_LIST.find(c => c.code === selectedCurrency) || CURRENCY_LIST[0];

  const handleRegisterSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;

    const query = searchVal.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    const parts = query.split('.');
    const nameOnly = parts[0];
    const requestedTld = parts.length > 1 ? '.' + parts.slice(1).join('.') : '.com';

    // Try finding exact requested TLD, otherwise default to .com
    let pricing = DOMAIN_PRICING.find(p => p.tld === requestedTld);
    if (!pricing) {
      pricing = DOMAIN_PRICING[0]; // .com fallback
    }

    // Simulate search
    const isAvail = Math.random() > 0.15; // 85% available

    setLookupResult({
      domainName: nameOnly + pricing.tld,
      nameOnly,
      tld: pricing.tld,
      price: pricing.registerPrice,
      isAvailable: isAvail,
      suggestedTLDs: DOMAIN_PRICING.filter(p => p.tld !== pricing?.tld).map(p => ({
        tld: p.tld,
        price: p.registerPrice,
        isAvailable: Math.random() > 0.2
      }))
    });

    if (setSelectedDomainName) {
      setSelectedDomainName(nameOnly + pricing.tld);
    }
  };

  const handleAddDomainToCart = (domainName: string, price: number) => {
    onAddToCart({
      id: `domain-register-${domainName}`,
      name: domainName,
      type: 'domain_register',
      price: price * years,
      durationYears: years
    });
    showToast(`Added ${domainName} for ${years} Year(s) to Cart!`);
    setCurrentView('checkout');
  };

  const handleVerifyLock = () => {
    if (!transferDomain.trim()) return;
    setIsAuthorizing(true);
    setAuthResult(null);

    setTimeout(() => {
      setIsAuthorizing(false);
      // Simulate lock check. Often random, but let's say domains with length > 6 are "unlocked"
      if (transferDomain.length > 6) {
        setAuthResult('unlocked');
        showToast('Domain status: UNLOCKED. EPP Code is required.');
      } else {
        setAuthResult('locked');
        showToast('Error: Status is LOCKED at current registrar.');
      }
    }, 1200);
  };

  const handleDomainTransferCheckout = () => {
    if (!transferDomain.trim() || !eppCode.trim()) {
      showToast('Validation Error: EPP authorization key must be input.');
      return;
    }

    const tld = '.' + transferDomain.split('.').slice(1).join('.');
    const pricing = DOMAIN_PRICING.find(p => p.tld === tld) || DOMAIN_PRICING[0];

    onAddToCart({
      id: `domain-transfer-${transferDomain}`,
      name: `${transferDomain} (Transfer)`,
      type: 'domain_transfer',
      price: pricing.transferPrice,
      durationYears: 1
    });

    showToast(`Added transfer request for ${transferDomain} to Cart!`);
    setCurrentView('checkout');
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Toggle navigation bar */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded flex items-center space-x-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveTab('register')}
              className={`px-6 py-2.5 rounded text-sm font-bold flex items-center space-x-2 transition ${
                activeTab === 'register' ? 'bg-[#003B2F] text-white' : 'text-slate-550 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe size={15} />
              <span>Register New Domain</span>
            </button>
            <button
              onClick={() => setActiveTab('transfer')}
              className={`px-6 py-2.5 rounded text-sm font-bold flex items-center space-x-2 transition ${
                activeTab === 'transfer' ? 'bg-[#003B2F] text-white' : 'text-slate-550 text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowRight size={15} />
              <span>Transfer Domain</span>
            </button>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'register' ? (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Check Domain Availability</h1>
              <p className="text-sm text-slate-500">Instantly browse extension registry logs and secure your domain identity today.</p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegisterSearch} className="bg-gray-50 border border-gray-200 p-6 rounded-xl flex flex-col md:flex-row gap-3 shadow-sm">
              <input
                type="text"
                placeholder="Find my custom web address (e.g. deliciousfoods)"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="flex-1 px-5 py-4 bg-white border border-gray-200 rounded text-xs font-semibold focus:border-[#003B2F] focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#003B2F] hover:bg-[#002f25] text-white font-bold rounded flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Search size={18} />
                <span>Search Domain</span>
              </button>
            </form>

            {/* Lookup result display */}
            {lookupResult && (
              <div className="space-y-6">
                <div className={`p-6 rounded-xl border ${
                  lookupResult.isAvailable 
                    ? 'bg-emerald-50/20 border-emerald-200' 
                    : 'bg-rose-50/20 border-rose-200'
                }`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-mono font-extrabold text-slate-900 flex items-center space-x-2">
                        <span>{lookupResult.domainName}</span>
                        {lookupResult.isAvailable ? (
                          <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-200 text-emerald-800 text-[9px] uppercase font-mono font-bold rounded">Available</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-rose-100 border border-rose-250 border-rose-200 text-rose-800 text-[9px] uppercase font-mono font-bold rounded">Unavailable</span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {lookupResult.isAvailable 
                          ? 'This address is fully unassigned. Secure registration immediately!' 
                          : 'Apologies, this name is already active. Search another term or transfer below.'}
                      </p>
                    </div>

                    {lookupResult.isAvailable && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                        {/* selection years */}
                        <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded border border-gray-200 shadow-3xs">
                          <span className="text-[10px] text-slate-400 font-bold font-mono">Period:</span>
                          <select 
                            value={years} 
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="bg-transparent text-xs text-slate-800 focus:outline-none font-bold"
                          >
                            <option value={1}>1 Year</option>
                            <option value={2}>2 Years</option>
                            <option value={3}>3 Years</option>
                            <option value={5}>5 Years</option>
                          </select>
                        </div>

                        {/* Button and price */}
                        <div className="text-right sm:text-left flex items-center justify-between sm:justify-start gap-4">
                          <div className="font-mono text-lg font-black text-[#003B2F]">
                            {activeCurrency.symbol}{convertPrice(lookupResult.price * years, selectedCurrency)}
                          </div>
                          <button
                            onClick={() => handleAddDomainToCart(lookupResult.domainName, lookupResult.price)}
                            className="px-5 py-2.5 bg-[#003B2F] text-white hover:bg-[#002f25] text-xs font-bold rounded transition cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggested Alternatives */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-550 mb-4 text-slate-500">Suggested extensions for you:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {lookupResult.suggestedTLDs.map((sug: any, index: number) => (
                      <div key={index} className="bg-white p-4 border border-gray-150 rounded flex items-center justify-between shadow-3xs">
                        <div>
                          <p className="font-mono font-semibold text-xs text-slate-850">
                            {lookupResult.nameOnly}
                            <span className="text-[#003B2F] font-bold">{sug.tld}</span>
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {sug.isAvailable ? 'Highly available register' : 'Unavailable'}
                          </p>
                        </div>

                        {sug.isAvailable && (
                          <div className="flex items-center space-x-3.5">
                            <span className="font-mono text-xs font-semibold text-slate-600">
                              {activeCurrency.symbol}{convertPrice(sug.price, selectedCurrency)}
                            </span>
                            <button
                              onClick={() => handleAddDomainToCart(lookupResult.nameOnly + sug.tld, sug.price)}
                              className="p-1 px-2.5 bg-gray-50 border hover:border-[#003B2F] text-[#003B2F] rounded hover:bg-emerald-50/20 text-[10px] font-bold"
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Transfer tabular view */
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Transfer Your Existing Domain</h1>
              <p className="text-sm text-slate-500">Migrate your domain registrar oversight seamlessly. Get 1 extra free renewal year automations.</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
              {/* Domain Input & Check Lock Status */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Existing Domain Name</label>
                <div className="flex gap-2.5">
                  <input
                    type="text"
                    placeholder="myregisteredbrand.com"
                    value={transferDomain}
                    onChange={(e) => setTransferDomain(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded text-xs font-semibold focus:border-[#003B2F] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyLock}
                    disabled={isAuthorizing || !transferDomain.trim()}
                    className="px-5 py-3 bg-white border border-gray-200 rounded text-2xs hover:border-[#003B2F] disabled:opacity-50 text-[#003B2F] font-bold transition flex items-center space-x-1"
                  >
                    {isAuthorizing ? (
                      <>
                        <RefreshCw size={12} className="animate-spin text-[#003B2F]" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify Status</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Alert feedback */}
              {authResult && (
                <div className={`p-4 rounded border flex items-start space-x-3 text-xs leading-normal ${
                  authResult === 'unlocked' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                    : 'bg-rose-50 border-rose-205 border-rose-200 text-rose-800'
                }`}>
                  {authResult === 'unlocked' ? (
                    <>
                      <ShieldCheck size={18} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">Active status: UNLOCKED (Authorized to transfer)</strong>
                        <span>Your domain registry shows unlocked state. Input your EPP authorization key below to request transfer.</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">Security Alert: Status is LOCKED (Registry hard block)</strong>
                        <span>You must contact your current registrar (GoDaddy, HostingRaja, etc.) to toggle domain status to "Unlocked" before you can proceed.</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Epp Authorization input */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">EPP / Authorization Key Code</label>
                <input
                  type="text"
                  placeholder="Paste Auth-Info code (e.g. r8&T#g5@9)"
                  value={eppCode}
                  onChange={(e) => setEppCode(e.target.value)}
                  disabled={authResult !== 'unlocked'}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-xs font-mono tracking-widest text-[#003B2F] focus:outline-none focus:border-[#003B2F] disabled:opacity-40"
                />
                <p className="text-[10px] text-slate-400 font-mono">You can retrieve this code directly in the cPanel or DNS manager page of your current domain provider.</p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-bold">Estimated Transfer Cost:</p>
                  <p className="text-xl font-mono font-black text-slate-900 mt-0.5">
                    {activeCurrency.symbol}{convertPrice(849, selectedCurrency)}/yr
                  </p>
                  <p className="text-[10px] text-[#003B2F] font-bold">Includes 1 year free renew extension</p>
                </div>

                <button
                  onClick={handleDomainTransferCheckout}
                  disabled={authResult !== 'unlocked' || !eppCode.trim()}
                  className="px-6 py-3.5 rounded text-xs bg-[#003B2F] text-white hover:bg-[#002f25] font-extrabold transition disabled:opacity-50 flex items-center space-x-1 cursor-pointer"
                >
                  <Check size={14} />
                  <span>Initiate Domain Transfer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
