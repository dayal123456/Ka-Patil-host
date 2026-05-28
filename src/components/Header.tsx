import React, { useState } from 'react';
import { 
  Menu, X, ChevronDown, ShoppingBag, User, LogOut, 
  Settings, Award, HelpCircle, Phone, Globe, Server, 
  ShieldCheck, ArrowRight, MessageSquare
} from 'lucide-react';
import { Currency, CartItem } from '../types';
import { CURRENCY_LIST } from '../data';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  userRole: 'client' | 'admin';
  setUserRole: (role: 'client' | 'admin') => void;
}

export default function Header({
  currentView,
  setCurrentView,
  selectedCurrency,
  setSelectedCurrency,
  cart,
  setCart,
  isLoggedIn,
  setIsLoggedIn,
  setIsCartOpen,
  userRole,
  setUserRole
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);
  const [hostingDropdownOpen, setHostingDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const activeCurrency = CURRENCY_LIST.find(c => c.code === selectedCurrency) || CURRENCY_LIST[0];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  const navLinkClass = (view: string) => 
    `px-3 py-2 text-sm font-bold tracking-tight transition-all relative ${
      currentView === view 
        ? 'text-[#003B2F] font-black border-b-2 border-[#003B2F]' 
        : 'text-slate-600 hover:text-[#003B2F]'
    }`;

  const navItemClassMobile = (view: string) => 
    `block px-4 py-2.5 text-base font-bold border-l-4 ${
      currentView === view 
        ? 'text-[#003B2F] bg-emerald-50/50 border-[#003B2F]' 
        : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-gray-50'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md" id="header-bar">
      {/* Top Banner Bar */}
      <div className="hidden py-2 px-4 text-xs font-semibold border-b border-gray-100 bg-gray-50 md:block">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-5 text-slate-500">
            <span className="flex items-center space-x-1.5">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>All Servers Operational</span>
            </span>
            <span>|</span>
            <span className="flex items-center space-x-1 hover:text-slate-950 transition-colors cursor-pointer" onClick={() => setCurrentView('contact')}>
              <Phone size={12} />
              <span>WhatsApp / Call: +91 *******36</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setCurrentView('about')} 
              className="text-slate-500 hover:text-slate-950 transition-colors font-semibold cursor-pointer"
            >
              Celebrating 6.8 Years
            </button>
            <span className="text-gray-300">|</span>
            
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-1 text-slate-650 text-slate-705 text-slate-800 hover:text-[#003B2F] transition-colors font-bold py-1 px-2 bg-white rounded border border-gray-200 cursor-pointer shadow-2xs"
              >
                <span>{activeCurrency.symbol} {activeCurrency.code}</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {currencyDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCurrencyDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-1.5 w-32 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {CURRENCY_LIST.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          selectedCurrency === currency.code ? 'text-[#003B2F] bg-emerald-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{currency.code}</span>
                        <span className="text-slate-450 text-slate-400 font-mono">{currency.symbol}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 bg-white" id="nav-inner">
        <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <span className="text-2xl font-black tracking-tight text-[#003B2F] font-sans">
              Ka Patil
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button onClick={() => setCurrentView('home')} className={navLinkClass('home')}>Home</button>

            {/* Domain Dropdown */}
            <div className="relative">
              <button 
                onMouseEnter={() => setDomainDropdownOpen(true)}
                onClick={() => setDomainDropdownOpen(!domainDropdownOpen)}
                className={`flex items-center space-x-1 ${navLinkClass('domain-register')}`}
              >
                <span>Domain</span>
                <ChevronDown size={14} />
              </button>
              
              {domainDropdownOpen && (
                <div 
                  onMouseLeave={() => setDomainDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-52 bg-white border border-gray-250 border-gray-200 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <button 
                    onClick={() => { setCurrentView('domain-register'); setDomainDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#003B2F] hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Globe size={15} className="text-[#003B2F]" />
                    <span>Register Domain</span>
                  </button>
                  <button 
                    onClick={() => { setCurrentView('domain-transfer'); setDomainDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#003B2F] hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <ArrowRight size={15} className="text-[#003B2F]" />
                    <span>Transfer Domain</span>
                  </button>
                </div>
              )}
            </div>

            {/* Hosting Dropdown */}
            <div className="relative">
              <button 
                onMouseEnter={() => setHostingDropdownOpen(true)}
                onClick={() => setHostingDropdownOpen(!hostingDropdownOpen)}
                className={`flex items-center space-x-1 ${navLinkClass('hosting-shared')}`}
              >
                <span>Hosting</span>
                <ChevronDown size={14} />
              </button>

              {hostingDropdownOpen && (
                <div 
                  onMouseLeave={() => setHostingDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <button 
                    onClick={() => { setCurrentView('hosting-shared'); setHostingDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#003B2F] hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Server size={14} className="text-[#003B2F]" />
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-tight">Shared Web Hosting</p>
                      <p className="text-[10px] text-gray-500 font-medium">LiteSpeed Power</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setCurrentView('hosting-wp'); setHostingDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#003B2F] hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Award size={14} className="text-amber-500" />
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-tight">WordPress Hosting</p>
                      <p className="text-[10px] text-gray-500 font-medium">Optimized Infrastructure</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setCurrentView('hosting-reseller'); setHostingDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#003B2F] hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <ShieldCheck size={14} className="text-sky-500" />
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-tight">Reseller Hosting</p>
                      <p className="text-[10px] text-gray-500 font-medium">WHM White-Label</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setCurrentView('hosting-vps'); setHostingDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#003B2F] hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Settings size={14} className="text-purple-500" />
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-tight">Cloud VPS Hosting</p>
                      <p className="text-[10px] text-gray-500 font-medium">Root SSH High Power</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* More Dropdown */}
            <div className="relative w-auto inline-block">
              <button 
                onMouseEnter={() => setMoreDropdownOpen(true)}
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center space-x-1 ${navLinkClass('about')}`}
              >
                <span>More</span>
                <ChevronDown size={14} />
              </button>

              {moreDropdownOpen && (
                <div 
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <button 
                    onClick={() => { setCurrentView('about'); setMoreDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#003B2F] hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <HelpCircle size={15} className="text-[#003B2F]" />
                    <span>About Us</span>
                  </button>
                  <button 
                    onClick={() => { setCurrentView('contact'); setMoreDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:text-[#003B2F] hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <MessageSquare size={15} className="text-[#003B2F]" />
                    <span>Contact Us</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={() => { setCurrentView('dashboard-support'); setMoreDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-500 hover:text-slate-950 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <span>Support Ticket</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Cart & Logged in details / Call to Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon Widget */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-full text-slate-700 hover:scale-105 transition duration-300 cursor-pointer shadow-3xs"
            >
              <ShoppingBag size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5.5 h-5.5 rounded-full bg-[#003B2F] font-bold text-white flex items-center justify-center text-[10px] shadow-lg animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Auth section */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentView('dashboard-main')}
                  className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 text-slate-800 rounded-lg border border-gray-200 transition-all text-xs font-bold shadow-2xs cursor-pointer"
                >
                  <User size={15} className="text-[#003B2F]" />
                  <span>My Panel</span>
                </button>
                
                {/* Admin quick toggle strictly for testing UI */}
                <button
                  onClick={() => {
                    const nextRole = userRole === 'admin' ? 'client' : 'admin';
                    setUserRole(nextRole);
                    setCurrentView('dashboard-main');
                  }}
                  className={`px-3 py-1 text-3xs uppercase tracking-wider rounded font-mono font-extrabold ${
                    userRole === 'admin' 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                  }`}
                  title="Testing toggle: Click to switch user authorization role safely"
                >
                  {userRole === 'admin' ? 'Admin Role' : 'Demo Mode'}
                </button>

                <button 
                  onClick={handleLogout}
                  className="p-2.5 bg-white border border-gray-200 hover:border-rose-100 text-gray-500 hover:text-rose-600 rounded-lg transition duration-200 cursor-pointer shadow-3xs"
                  title="Logout Account"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setCurrentView('login')}
                  className="px-4 py-2 text-slate-600 hover:text-[#003B2F] text-xs font-bold tracking-tight transition"
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentView('hosting-shared')}
                  className="px-5 py-2 rounded text-xs font-extrabold bg-[#003B2F] text-white hover:bg-[#002b22] active:scale-98 transition duration-200 cursor-pointer shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Currency selector for Mobile */}
            <button 
              onClick={() => setSelectedCurrency(selectedCurrency === 'INR' ? 'USD' : selectedCurrency === 'USD' ? 'GBP' : selectedCurrency === 'GBP' ? 'EUR' : 'INR')}
              className="px-2 py-1 text-3xs bg-white border border-gray-200 text-slate-800 font-bold rounded"
              title="Quick Toggle Currency"
            >
              {activeCurrency.symbol} {selectedCurrency}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-white border border-gray-200 rounded-full text-slate-700"
            >
              <ShoppingBag size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#003B2F] text-white text-[9px] font-extrabold flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 bg-white border border-gray-200 rounded-lg"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white py-3 block transition-all shadow-lg" id="mobile-nav-panel">
          <div className="space-y-1">
            <button 
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left ${navItemClassMobile('home')}`}
            >
              Home
            </button>

            <div className="px-4 py-1.5 text-3xs font-bold uppercase tracking-wider text-slate-400">Domains</div>
            <button 
              onClick={() => { setCurrentView('domain-register'); setMobileMenuOpen(false); }}
              className={`w-full text-left pl-8 ${navItemClassMobile('domain-register')}`}
            >
              Register New Domain
            </button>
            <button 
              onClick={() => { setCurrentView('domain-transfer'); setMobileMenuOpen(false); }}
              className={`w-full text-left pl-8 ${navItemClassMobile('domain-transfer')}`}
            >
              Transfer Domain Link
            </button>

            <div className="px-4 py-1.5 text-3xs font-bold uppercase tracking-wider text-slate-400">Hosting</div>
            <button 
              onClick={() => { setCurrentView('hosting-shared'); setMobileMenuOpen(false); }}
              className={`w-full text-left pl-8 ${navItemClassMobile('hosting-shared')}`}
            >
              Shared Hosting
            </button>
            <button 
              onClick={() => { setCurrentView('hosting-wp'); setMobileMenuOpen(false); }}
              className={`w-full text-left pl-8 ${navItemClassMobile('hosting-wp')}`}
            >
              WordPress Hosting
            </button>
            <button 
              onClick={() => { setCurrentView('hosting-reseller'); setMobileMenuOpen(false); }}
              className={`w-full text-left pl-8 ${navItemClassMobile('hosting-reseller')}`}
            >
              Reseller Hosting
            </button>
            <button 
              onClick={() => { setCurrentView('hosting-vps'); setMobileMenuOpen(false); }}
              className={`w-full text-left pl-8 ${navItemClassMobile('hosting-vps')}`}
            >
              Cloud VPS Hosting
            </button>

            <div className="px-4 py-1.5 text-3xs font-bold uppercase tracking-wider text-slate-400">Company & More</div>
            <button 
              onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
              className={`w-full text-left pl-8 ${navItemClassMobile('about')}`}
            >
              About Us Panel
            </button>
            <button 
              onClick={() => { setCurrentView('contact'); setMobileMenuOpen(false); }}
              className={`w-full text-left pl-8 ${navItemClassMobile('contact')}`}
            >
              Contact Support
            </button>

            <div className="border-t border-gray-100 my-2 pt-2 px-4 flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={() => { setCurrentView('dashboard-main'); setMobileMenuOpen(false); }}
                    className="w-full text-center px-4 py-2 bg-white text-slate-800 font-bold rounded-lg border border-gray-200"
                  >
                    My Control Panel
                  </button>
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-center px-4 py-2 bg-rose-50 text-rose-700 font-bold rounded-lg border border-rose-100"
                  >
                    Logout Account
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setCurrentView('login'); setMobileMenuOpen(false); }}
                    className="w-full text-center px-4 py-2 bg-white text-slate-800 font-bold rounded-lg border border-gray-200"
                  >
                    Access Login
                  </button>
                  <button 
                    onClick={() => { setCurrentView('hosting-shared'); setMobileMenuOpen(false); }}
                    className="w-full text-center px-4 py-2 bg-[#003B2F] text-white font-bold rounded hover:bg-[#002b22]"
                  >
                    Get Hosting Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
