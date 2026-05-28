import React, { useState } from 'react';
import { 
  Check, ArrowRight, Star, Globe, Shield, CreditCard, 
  Search, ShieldAlert, Award, Sparkles, RefreshCw, Server, Zap, CheckCircle2
} from 'lucide-react';
import { CURRENCY_LIST, convertPrice, HOSTING_PLANS } from '../data';
import { Currency } from '../types';

interface HomepageProps {
  setCurrentView: (view: string) => void;
  selectedCurrency: Currency;
  onAddToCart: (item: any) => void;
  showToast: (msg: string) => void;
  setSelectedDomainName?: (domain: string) => void;
}

export default function Homepage({
  setCurrentView,
  selectedCurrency,
  onAddToCart,
  showToast,
  setSelectedDomainName
}: HomepageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [domainSearch, setDomainSearch] = useState('');

  // Active currency symbol
  const activeCurrency = CURRENCY_LIST.find(c => c.code === selectedCurrency) || CURRENCY_LIST[0];

  // Specific WP plans shown on the homepage
  const homePlans = HOSTING_PLANS.filter(p => p.type === 'wordpress');

  const handleSelectPlan = (plan: any) => {
    const rawPrice = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    
    onAddToCart({
      id: `${plan.id}-${billingCycle}`,
      name: `${plan.name} (${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'})`,
      type: 'hosting',
      planId: plan.id,
      price: rawPrice,
      billingCycle: billingCycle
    });

    showToast(`Added ${plan.name} (${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}) to Cart!`);
    setCurrentView('checkout');
  };

  const handleDomainSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainSearch.trim()) return;

    if (setSelectedDomainName) {
      setSelectedDomainName(domainSearch.trim());
    }
    
    // Redirect to domain-register view with prepopulated state
    setCurrentView('domain-register');
  };

  return (
    <div className="bg-white text-slate-800 font-sans min-h-screen">
      
      {/* 1. HERO SECTION WITH OFF-WHITE/MINT BG & DASHBOARD DISPLAY */}
      <section className="relative pt-12 pb-20 md:py-28 bg-gradient-to-b from-[#F3F8F6] via-[#F8FBFA] to-white overflow-hidden" id="homepage-hero">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-[#003B2F] border border-emerald-100 rounded-full text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Flash Sale: 50% Off WordPress Yearly Infrastructure Hosting</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Experience Superior WordPress Performance
            </h1>

            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Enterprise-grade tech meets WordPress simplicity. Scale your digital projects on a blazing fast NVMe cloud server built for speed, malware protection, and automated backups.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-1">
              <button 
                onClick={() => {
                  const el = document.getElementById('plans-pricing-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#003B2F] hover:bg-[#002b22] text-white font-bold text-sm tracking-tight rounded shadow-md transition duration-200 cursor-pointer"
              >
                View WordPress Plans
              </button>
              
              <button 
                onClick={() => setCurrentView('contact')}
                className="px-6 py-3.5 text-slate-705 text-slate-800 hover:text-[#003B2F] border border-gray-200 hover:border-[#003B2F]/30 bg-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer flex items-center justify-center space-x-2 shadow-2xs"
              >
                <span>Talk to Cloud Expert</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Quick trust stamps */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-2xs font-bold text-slate-500 pt-3">
              <span className="flex items-center space-x-1"><Check size={14} className="text-emerald-600" /> <span>Real-time cPGuard Protection</span></span>
              <span className="flex items-center space-x-1"><Check size={14} className="text-emerald-600" /> <span>Free Automated Migrations</span></span>
              <span className="flex items-center space-x-1"><Check size={14} className="text-emerald-600" /> <span>Bangalore MSME Registered</span></span>
            </div>
          </div>

          {/* Right Graphical Dashboard Mockup (Instead of command line text) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Laptop bar styling */}
              <div className="flex items-center space-x-1.5 pb-2 mb-2 border-b border-slate-800 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] uppercase font-mono tracking-wider ml-2">Ka Patil Secure Monitor</span>
              </div>

              {/* Graphic stats contents */}
              <div className="bg-slate-950 p-4 rounded-xl space-y-4 font-sans text-xs">
                {/* Latency and Status */}
                <div className="flex justify-between items-center bg-slate-900/40 p-2.5 rounded border border-slate-900/60">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Global CDN Node</p>
                    <p className="text-white font-bold font-mono">Asia-APAC cluster active</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Real Response</p>
                    <p className="text-emerald-400 font-bold font-mono">180ms avg latency</p>
                  </div>
                </div>

                {/* Dashboard Chart simulator */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Performance Speed Rating</span>
                    <span className="font-bold text-emerald-400 font-mono">99% Optimized</span>
                  </div>
                  {/* Styled bars representing load speed */}
                  <div className="grid grid-cols-6 gap-1 h-14 items-end">
                    <div className="bg-emerald-500/20 h-5 rounded-t"></div>
                    <div className="bg-emerald-500/30 h-8 rounded-t"></div>
                    <div className="bg-emerald-500/40 h-10 rounded-t"></div>
                    <div className="bg-emerald-500/50 h-7 rounded-t animate-pulse"></div>
                    <div className="bg-emerald-500/70 h-11 rounded-t"></div>
                    <div className={`bg-[#003B2F] h-14 rounded-t`}></div>
                  </div>
                </div>

                {/* Secure checks bullets */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                  <div className="bg-[#003B2F]/10 px-2.5 py-1.5 rounded border border-emerald-950 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <span>cPGuard Shield: 0 threats</span>
                  </div>
                  <div className="bg-[#003B2F]/10 px-2.5 py-1.5 rounded border border-emerald-950 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <span>Uptime metric: 100.0%</span>
                  </div>
                  <div className="bg-[#003B2F]/10 px-2.5 py-1.5 rounded border border-emerald-950 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <span>NVMe Safe Write: Ok</span>
                  </div>
                  <div className="bg-[#003B2F]/10 px-2.5 py-1.5 rounded border border-emerald-950 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <span>24/7 Support Desk active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE PRICING GRID EXACT COPY OF IMAGE 1 */}
      <section className="py-20 bg-white" id="plans-pricing-section">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Transparent Pricing for Growing Sites
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              No hidden fees, no expensive setup loops. Choose the physical hosting capacity that matches your current development scope.
            </p>

            {/* Monthly vs Yearly Switch Toggle */}
            <div className="pt-2 flex justify-center items-center">
              <div className="bg-gray-105 bg-gray-100 p-1 rounded flex items-center space-x-1 shadow-sm border border-gray-200">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 text-xs font-bold rounded transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Monthly Plan
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 text-xs font-bold rounded transition-all flex items-center space-x-1.5 ${
                    billingCycle === 'yearly'
                      ? 'bg-[#003B2F] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span>Yearly Plan</span>
                  <span className="px-1 py-0.5 text-[9px] bg-[#E6F7F0] text-[#003B2F] font-mono font-bold rounded">Save 50%</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing cards wrapper matching the four columns in the image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {homePlans.map((plan) => {
              const basePrice = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
              const convertedValue = convertPrice(billingCycle === 'yearly' ? plan.priceYearly / 12 : plan.priceMonthly, selectedCurrency);
              
              const isGrowth = plan.id === 'wp-growth';

              return (
                <div 
                  key={plan.id}
                  className={`bg-white border rounded-lg p-6 flex flex-col justify-between transition-all duration-300 relative ${
                    isGrowth 
                      ? 'border-2 border-[#003B2F] shadow-xl' 
                      : 'border-gray-200'
                  }`}
                >
                  {isGrowth && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#003B2F] text-white font-mono font-black text-[9px] uppercase tracking-wider px-3.5 py-1 rounded">
                      Best Value
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="text-center md:text-left mb-6">
                      <h3 className="text-lg font-extrabold text-slate-900">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {plan.id === 'wp-essential' && 'Perfect first blog or prototype'}
                        {plan.id === 'wp-growth' && 'Built for commercial company sites'}
                        {plan.id === 'wp-advanced' && 'Power users requiring extra staging'}
                        {plan.id === 'wp-ultimate' && 'Heavy traffic web directories'}
                      </p>
                    </div>

                    {/* Numeric pricing details matching the image formatting */}
                    <div className="my-6 p-4 bg-gray-50 rounded-lg border border-gray-100 text-center md:text-left">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Base Rate</p>
                      <div className="flex items-baseline justify-center md:justify-start mt-1">
                        <span className="text-3xl font-black font-sans text-slate-900">
                          {activeCurrency.symbol}{convertedValue}
                        </span>
                        <span className="text-xs text-slate-500 ml-1">/mo</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 font-mono">
                        {billingCycle === 'yearly' 
                          ? `Yearly bill: ${activeCurrency.symbol}${convertPrice(plan.priceYearly, selectedCurrency)}/yr`
                          : `Monthly bill: ${activeCurrency.symbol}${convertPrice(plan.priceMonthly, selectedCurrency)}/mo`}
                      </p>
                    </div>

                    {/* Features checklist with clean custom check circle bullets matching imagery */}
                    <ul className="mb-8 space-y-3.5 text-xs text-slate-600">
                      {plan.features.map((feat, index) => (
                        <li key={index} className="flex items-start space-x-2.5">
                          <Check size={14} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded transition cursor-pointer ${
                      isGrowth
                        ? 'bg-[#003B2F] hover:bg-[#002f25] text-white shadow-sm'
                        : 'bg-white hover:bg-gray-50 text-slate-705 border border-gray-200 text-slate-800'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. COHESIVE WORDPRESS TECHNICAL TOOLSET SUITE */}
      <section className="py-20 bg-gray-50 border-y border-gray-100" id="toolkit-section">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Grid Cards with toolkit capabilities in light style */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 order-2 lg:order-1">
            <div className="p-6 bg-white border border-gray-200 rounded-lg space-y-3 shadow-2xs">
              <span className="p-3 bg-emerald-50 text-[#003B2F] border border-emerald-100 rounded inline-block"><Zap size={18} /></span>
              <h4 className="font-bold text-slate-900 text-sm">Blazing LSCache Engine</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Integrated LiteSpeed server-side caches deliver pages instantly, yielding optimal response times.</p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg space-y-3 shadow-2xs">
              <span className="p-3 bg-emerald-50 text-[#003B2F] border border-emerald-100 rounded inline-block"><RefreshCw size={18} /></span>
              <h4 className="font-bold text-slate-900 text-sm">Smart Automated Updates</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Our infrastructure auto-updates WordPress files securely, keeping core directories patched.</p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg space-y-3 shadow-2xs">
              <span className="p-3 bg-emerald-50 text-[#003B2F] border border-emerald-100 rounded inline-block"><Globe size={18} /></span>
              <h4 className="font-bold text-slate-900 text-sm">Automated Safe Sandbox</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Spawn fully isolated staging environments in one click. Push tested code to production safely.</p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg space-y-3 shadow-2xs">
              <span className="p-3 bg-emerald-50 text-[#003B2F] border border-emerald-100 rounded inline-block"><Shield size={18} /></span>
              <h4 className="font-bold text-slate-900 text-sm">Real-time Malware Shield</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Armed with cPGuard server-side heuristics. Automatically detects and isolates cyber threats.</p>
            </div>
          </div>

          {/* Right Text details exact matching */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-block bg-[#003B2F] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded">
              Ka Patil Toolkit
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              The Complete WordPress Management Suite
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Stop wasting precious hours on backups, security settings, or performance tweaking. Our platform puts complete technical mastery at your fingertips, allowing you to manage multiple sites with one coordinated click.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <span className="p-1 bg-emerald-50 text-[#003B2F] rounded mt-1"><Check size={14} /></span>
                <div>
                  <h5 className="font-bold text-sm text-slate-900">Expert Pre-Sales & Migration Setup</h5>
                  <p className="text-xs text-slate-500 mt-0.5">We migrate your files and tables securely from GoDaddy, HostingRaja, or Namecheap without any downtime.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="p-1 bg-emerald-50 text-[#003B2F] rounded mt-1"><Check size={14} /></span>
                <div>
                  <h5 className="font-bold text-sm text-slate-900">Uptime SLA Active Contract</h5>
                  <p className="text-xs text-slate-500 mt-0.5">We stand tall behind our cluster redundancy. Receive prompt service credits in case of any SLA breaches.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SOLID GREEN STAT STRIPE ACCENT BAR */}
      <section className="bg-[#003B2F] text-white py-12" id="accent-stats-stripe">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black">99.9%</p>
            <p className="text-xs uppercase tracking-wider font-semibold text-emerald-100">Guaranteed Node SLA</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black">20X</p>
            <p className="text-xs uppercase tracking-wider font-semibold text-emerald-100">Faster Caching Response</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black">24/7/365</p>
            <p className="text-xs uppercase tracking-wider font-semibold text-emerald-100">Direct WhatsApp Help</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black">10,000+</p>
            <p className="text-xs uppercase tracking-wider font-semibold text-emerald-100">Active India Clusters</p>
          </div>
        </div>
      </section>

      {/* 5. DOMAIN LOOKUP SEARCH STRIPE */}
      <section className="py-20 bg-white border-b border-gray-100" id="domain-search-section">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
              Secure Your Perfect Web Domain Address
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Claim your digital name today. Search extensions like .com, .in, .net instantly.
            </p>
          </div>

          <form onSubmit={handleDomainSearchSubmit} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col sm:flex-row gap-3 shadow-xs">
            <input
              type="text"
              placeholder="e.g. yourbusinessname (.com, .in, .org)"
              value={domainSearch}
              onChange={(e) => setDomainSearch(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 text-xs font-semibold rounded focus:border-[#003B2F] focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#003B2F] hover:bg-[#002f25] text-white text-xs font-bold rounded flex items-center justify-center space-x-1.5 transition cursor-pointer"
            >
              <Search size={14} />
              <span>Lookup Domain</span>
            </button>
          </form>

          {/* Quick price hints */}
          <div className="flex justify-center flex-wrap gap-4 text-3xs font-mono font-bold text-slate-400">
            <span>.COM starting ₹849</span>
            <span>•</span>
            <span>.IN starting ₹499</span>
            <span>•</span>
            <span>.NET starting ₹949</span>
            <span>•</span>
            <span>.XYZ starting ₹199</span>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-20 bg-white" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">What Our Active Clients Say</h2>
            <p className="text-xs sm:text-sm text-slate-500">We keep high accountability with transparent client feedback logs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
              <div className="flex text-amber-500">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Moving to Ka Patil’s WordPress hosting is the fastest response time I’ve ever experienced. Pages that used to load in 3 seconds now stream in under 200 milliseconds. Genuine LiteSpeed cache nodes."
              </p>
              <div>
                <p className="font-bold text-xs text-slate-900">Manish Singh</p>
                <p className="text-[10px] text-slate-400">CEO, NexaCorp Media</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
              <div className="flex text-amber-500">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "I migrated 12 client portfolios here. Not only is the pricing extremely nominal compared to foreign hosts, but the Indian support desk replies over WhatsApp in less than 30 seconds."
              </p>
              <div>
                <p className="font-bold text-xs text-slate-900">Ankit Rowdy</p>
                <p className="text-[10px] text-slate-400">Full Stack Web Developer</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
              <div className="flex text-amber-500">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "We experience huge customer rushes during holiday weekends. Their cPGuard and redundancy kept our checkout cart completely online without glitching. Very dependable service indeed."
              </p>
              <div>
                <p className="font-bold text-xs text-slate-900">Anshu Kumari</p>
                <p className="text-[10px] text-slate-400">E-commerce Store Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVOLUTIVE RISK-FREE MONEYBACK GUARANTEE PANEL */}
      <section className="py-12 bg-[#FAFBFB] border-t border-gray-200" id="guarantee-section">
        <div className="max-w-4xl mx-auto px-4 bg-gradient-to-b from-white to-gray-50 border border-gray-200 p-6 sm:p-10 rounded-2xl shadow-sm text-center space-y-4">
          <span className="inline-block p-4 bg-emerald-50 text-[#003B2F] border border-emerald-100 rounded-full">
            <CheckCircle2 size={32} />
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Hassle-Free 2-Day Money-Back Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We hold supreme confidence in our server optimization. If you encounter any technical performance issues or if you are not completely satisfied, communicate with our billing desk within 2 days for full refunds.
          </p>
        </div>
      </section>

    </div>
  );
}
