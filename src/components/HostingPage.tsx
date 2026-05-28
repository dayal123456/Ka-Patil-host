import React, { useState } from 'react';
import { Server, Zap, ShieldCheck, Settings, Check, Star, Globe, Shield, CreditCard } from 'lucide-react';
import { HOSTING_PLANS, CURRENCY_LIST, convertPrice } from '../data';
import { Currency, HostingType } from '../types';

interface HostingPageProps {
  type: HostingType;
  setCurrentView: (view: string) => void;
  selectedCurrency: Currency;
  onAddToCart: (item: any) => void;
  showToast: (msg: string) => void;
}

export default function HostingPage({
  type,
  setCurrentView,
  selectedCurrency,
  onAddToCart,
  showToast
}: HostingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Filter plans based on requested type
  const filteredPlans = HOSTING_PLANS.filter(p => p.type === type);

  const activeCurrency = CURRENCY_LIST.find(c => c.code === selectedCurrency) || CURRENCY_LIST[0];

  const handleSelectPlan = (plan: any) => {
    const rawPrice = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    
    // Add to cart
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

  const getPageTitle = () => {
    switch (type) {
      case 'shared':
        return 'High-Performance Shared Web Hosting';
      case 'wordpress':
        return 'Optimized WordPress Infrastructure';
      case 'reseller':
        return 'White-Label Reseller Hosting WHM';
      case 'vps':
        return 'Low-Latency Enterprise Cloud VPS';
    }
  };

  const getPageDescription = () => {
    switch (type) {
      case 'shared':
        return 'Blazing fast loading powered by LiteSpeed server caching, cPGuard malware scan engines, and isolated server storage.';
      case 'wordpress':
        return 'Enterprise-grade tech meets WordPress simplicity. Integrated automatic staging sandboxes, code level caching, and security.';
      case 'reseller':
        return 'Launch your own hosting business! Fully brandable nameservers, unlimited panel seat structures, and WHM/WHMCS systems.';
      case 'vps':
        return 'Hyper-V virtualized physical sandboxes. Pure NVMe enterprise arrays, dedicated Indian/APAC IPs and full developer root shell access.';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'shared':
        return <Server className="w-8 h-8 text-[#003B2F]" />;
      case 'wordpress':
        return <Zap className="w-8 h-8 text-amber-500" />;
      case 'reseller':
        return <ShieldCheck className="w-8 h-8 text-sky-600" />;
      case 'vps':
        return <Settings className="w-8 h-8 text-purple-600" />;
    }
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto animate-in fade-in duration-200">
          <div className="flex justify-center mb-4">
            <span className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl shadow-xs">
              {getTypeIcon()}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {getPageTitle()}
          </h1>
          
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            {getPageDescription()}
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-6 flex justify-center items-center">
            <div className="bg-gray-100 p-1 rounded flex items-center space-x-1 shadow-sm border border-gray-200">
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
                <span className="px-1.5 py-0.5 text-[9px] bg-[#E6F7F0] text-[#003B2F] font-mono font-bold rounded">Save 50%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredPlans.map((plan) => {
            const perMonthPrice = billingCycle === 'yearly' ? plan.priceYearly / 12 : plan.priceMonthly;
            const convertedVal = convertPrice(perMonthPrice, selectedCurrency);

            return (
              <div 
                key={plan.id}
                className={`bg-white border rounded-xl p-6 flex flex-col justify-between transition-all duration-350 relative ${
                  plan.bestValue 
                    ? 'border-2 border-[#003B2F] shadow-xl' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Best Value Badge */}
                {plan.bestValue && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#003B2F] text-white font-mono font-black text-[9px] uppercase tracking-wider px-3.5 py-1 rounded">
                    Best Value
                  </span>
                )}

                <div>
                  <div className="mb-6 text-center md:text-left">
                    <h3 className="text-lg font-extrabold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {type === 'shared' ? 'Starter website standard resource allocation' : 'High storage optimized NVMe cluster'}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="my-6 p-4 bg-gray-50 rounded-lg border border-gray-100 text-center md:text-left">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Starts at</p>
                    <div className="flex items-baseline justify-center md:justify-start mt-1">
                      <span className="text-3xl font-black text-slate-900">
                        {activeCurrency.symbol}{convertedVal}
                      </span>
                      <span className="text-xs text-slate-500 ml-1">/mo</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-mono">
                      {billingCycle === 'yearly' 
                        ? `Billed yearly: ${activeCurrency.symbol}${convertPrice(plan.priceYearly, selectedCurrency)}/yr`
                        : `Billed monthly: ${activeCurrency.symbol}${convertPrice(plan.priceMonthly, selectedCurrency)}/mo`}
                    </p>
                  </div>

                  {/* Core Specifications */}
                  <div className="mb-6 space-y-2 border-b border-gray-100 pb-6 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Websites:</span>
                      <span className="font-bold text-slate-900">{plan.specs.websites}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">NVMe Storage:</span>
                      <span className="font-bold text-slate-900">{plan.specs.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bandwidth:</span>
                      <span className="font-bold text-slate-900">{plan.specs.bandwidth}</span>
                    </div>
                    {plan.specs.emails && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Business Mail:</span>
                        <span className="font-bold text-slate-900">{plan.specs.emails}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Restore Point:</span>
                      <span className="font-bold text-slate-900">{plan.specs.backup}</span>
                    </div>
                  </div>

                  {/* Full list features */}
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
                  className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded transition duration-200 cursor-pointer ${
                    plan.bestValue
                      ? 'bg-[#003B2F] hover:bg-[#002f25] text-white'
                      : 'bg-white hover:bg-gray-50 text-slate-800 border border-gray-200'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
