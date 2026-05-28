import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import HostingPage from './components/HostingPage';
import DomainPage from './components/DomainPage';
import AboutContactPage from './components/AboutContactPage';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';
import CheckoutPage from './components/CheckoutPage';
import { Currency, CartItem, ActiveHosting, ActiveDomain, SupportTicket, Invoice } from './types';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { CURRENCY_LIST, convertPrice } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('INR');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'client' | 'admin'>('client');
  const [selectedDomainName, setSelectedDomainName] = useState<string>('');

  // Global Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // CLIENT ACCOUNTS INITIAL MOCK DATABASES
  const [activeHostings, setActiveHostings] = useState<ActiveHosting[]>([
    {
      id: 'host-wp-growth-01',
      domainName: 'kapatil.in',
      planId: 'wp-growth',
      planName: 'Growth WordPress Dedicated',
      type: 'wordpress',
      status: 'Active',
      billingCycle: 'yearly',
      pricePaid: 4980,
      nextDueDate: '2027-05-28',
      maintenanceMode: false,
      autoUpdates: true,
      resourceUsage: { cpu: 14, ram: 48, disk: 18 }
    }
  ]);

  const [activeDomains, setActiveDomains] = useState<ActiveDomain[]>([
    {
      name: 'kapatil.in',
      registeredDate: '2024-05-28',
      expiryDate: '2027-05-28',
      status: 'Active',
      nameservers: ['ns1.ka-patil.in', 'ns2.ka-patil.in'],
      dnsRecords: [
        { id: 'dns-a-1', type: 'A', host: '@', value: '103.45.212.18', ttl: 3600 },
        { id: 'dns-a-2', type: 'CNAME', host: 'www', value: 'kapatil.in', ttl: 14400 },
        { id: 'dns-a-3', type: 'TXT', host: '@', value: 'google-site-verification=ka-patil-sandbox-key', ttl: 86400 }
      ]
    }
  ]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'TCK-5524',
      subject: 'Issue migrating databases from GoDaddy panel',
      service: 'Growth WordPress Dedicated',
      department: 'Technical',
      priority: 'High',
      status: 'Open',
      createdDate: '2026-05-28',
      replies: [
        {
          id: 'rep-01',
          sender: 'client',
          message: 'Please help, GoDaddy exported .sql file is larger than 150MB and upload aborts in phpMyAdmin.',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'rep-02',
          sender: 'support',
          message: 'Hi there! Our Bangalore server structures support up to 500MB database executions seamlessly. Try deploying using the BigDump script tool in cPanel, or upload the .sql file directly via secure FTP/File Manager and reply here—we will complete the import manually.',
          timestamp: new Date(Date.now() - 1800000).toISOString()
        }
      ]
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-44673',
      date: '2026-05-28',
      amount: 4980,
      status: 'Paid',
      items: [
        { description: 'Growth WordPress Dedicated Plan (Yearly extension)', amount: 4980 }
      ]
    }
  ]);

  // Handle adding custom items to the shopping cart
  const handleAddToCart = (item: CartItem) => {
    // Check if item already exists to prevent duplicates
    if (cart.some(cartItem => cartItem.id === item.id)) {
      showToast('This asset/plan is already in your checkout list.', 'info');
      return;
    }
    setCart([...cart, item]);
  };

  // Create an active technical ticket from Contact/Inquire form
  const handleCreateContactTicket = (ticketFields: {
    subject: string;
    department: 'Technical' | 'Billing' | 'Sales' | 'Abuse';
    priority: 'Low' | 'Medium' | 'High';
    message: string;
  }) => {
    const newTicket: SupportTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketFields.subject,
      service: 'Custom Presales Inquiry',
      department: ticketFields.department,
      priority: ticketFields.priority,
      status: 'Open',
      createdDate: new Date().toLocaleDateString(),
      replies: [
        {
          id: `rep-org-${Date.now()}`,
          sender: 'client',
          message: ticketFields.message,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setSupportTickets([newTicket, ...supportTickets]);
  };

  // Callback once billing forms checkout succeeds
  const handlePaymentSuccessful = (invoiceDetail: Invoice) => {
    // Log Invoice
    setInvoices([invoiceDetail, ...invoices]);

    // Provision services based on items bought
    invoiceDetail.items.forEach(boughtItem => {
      const type = (boughtItem as any).type;
      const planId = (boughtItem as any).planId;

      if (type === 'hosting') {
        const newHosting: ActiveHosting = {
          id: `host-new-${Date.now()}`,
          domainName: activeDomains.length > 0 ? activeDomains[0].name : 'mybusinesspath.in',
          planId: planId || 'wp-essential',
          planName: boughtItem.description.split(' (')[0],
          type: boughtItem.description.toLowerCase().includes('wordpress') ? 'wordpress' : 'shared',
          status: 'Active',
          billingCycle: boughtItem.description.toLowerCase().includes('yearly') ? 'yearly' : 'monthly',
          pricePaid: boughtItem.amount,
          nextDueDate: '2027-05-28',
          maintenanceMode: false,
          autoUpdates: false,
          resourceUsage: { cpu: 2, ram: 10, disk: 1 }
        };
        setActiveHostings((prev) => [newHosting, ...prev]);
        showToast(`Hosting plan: [${newHosting.planName}] deployed successfully!`);
      } 
      
      else if (type === 'domain_register') {
        const newDomain: ActiveDomain = {
          name: boughtItem.description,
          registeredDate: new Date().toLocaleDateString(),
          expiryDate: new Date(Date.now() + 31536000000).toLocaleDateString(), // +1 year
          status: 'Active',
          nameservers: ['ns1.ka-patil.in', 'ns2.ka-patil.in'],
          dnsRecords: [
            { id: `dns-${Date.now()}`, type: 'A', host: '@', value: '103.45.212.18', ttl: 3600 }
          ]
        };
        setActiveDomains((prev) => [newDomain, ...prev]);
        showToast(`Domain registration: [${newDomain.name}] hold locked active on account.`);
      } 
      
      else if (type === 'domain_transfer') {
        const pendingDomain: ActiveDomain = {
          name: boughtItem.description.replace(' (Transfer)', ''),
          registeredDate: new Date().toLocaleDateString(),
          expiryDate: new Date(Date.now() + 31536000000).toLocaleDateString(),
          status: 'Pending',
          nameservers: ['ns1.transferring.com', 'ns2.transferring.com'],
          dnsRecords: []
        };
        setActiveDomains((prev) => [pendingDomain, ...prev]);
        showToast(`Domain transfer: [${pendingDomain.name}] requested successfully.`);
      }
    });

    showToast(`Successfully purchased and provisioned all selected services! Check your Panel.`);
  };

  // Active Screen Selector mapping
  const renderViewContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <Homepage 
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
            setSelectedDomainName={setSelectedDomainName}
          />
        );
      case 'hosting-shared':
        return (
          <HostingPage 
            type="shared"
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        );
      case 'hosting-wp':
        return (
          <HostingPage 
            type="wordpress"
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        );
      case 'hosting-reseller':
        return (
          <HostingPage 
            type="reseller"
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        );
      case 'hosting-vps':
        return (
          <HostingPage 
            type="vps"
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        );
      case 'domain-register':
        return (
          <DomainPage 
            initialView="register"
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
            selectedDomainName={selectedDomainName}
            setSelectedDomainName={setSelectedDomainName}
          />
        );
      case 'domain-transfer':
        return (
          <DomainPage 
            initialView="transfer"
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
            selectedDomainName={selectedDomainName}
            setSelectedDomainName={setSelectedDomainName}
          />
        );
      case 'about':
        return (
          <AboutContactPage 
            initialTab="about"
            setCurrentView={setCurrentView}
            showToast={showToast}
          />
        );
      case 'contact':
        return (
          <AboutContactPage 
            initialTab="contact"
            setCurrentView={setCurrentView}
            showToast={showToast}
            onCreateTicket={handleCreateContactTicket}
          />
        );
      case 'login':
        return (
          <LoginScreen 
            setCurrentView={setCurrentView}
            setIsLoggedIn={setIsLoggedIn}
            showToast={showToast}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            cart={cart}
            setCart={setCart}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            showToast={showToast}
            onPaymentComplete={handlePaymentSuccessful}
          />
        );
      case 'dashboard-main':
        return (
          <Dashboard 
            currentTab="main"
            setCurrentTab={() => {}}
            selectedCurrency={selectedCurrency}
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            activeHostings={activeHostings}
            setActiveHostings={setActiveHostings}
            activeDomains={activeDomains}
            setActiveDomains={setActiveDomains}
            supportTickets={supportTickets}
            setSupportTickets={setSupportTickets}
            invoices={invoices}
            setInvoices={setInvoices}
            showToast={showToast}
            setCurrentView={setCurrentView}
          />
        );
      case 'dashboard-support':
        return (
          <Dashboard 
            currentTab="support"
            setCurrentTab={() => {}}
            selectedCurrency={selectedCurrency}
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            activeHostings={activeHostings}
            setActiveHostings={setActiveHostings}
            activeDomains={activeDomains}
            setActiveDomains={setActiveDomains}
            supportTickets={supportTickets}
            setSupportTickets={setSupportTickets}
            invoices={invoices}
            setInvoices={setInvoices}
            showToast={showToast}
            setCurrentView={setCurrentView}
          />
        );
      default:
        return (
          <Homepage 
            setCurrentView={setCurrentView}
            selectedCurrency={selectedCurrency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        );
    }
  };

  const handleRemoveCartItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-slate-800">
      
      {/* Toast banner widget */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-white border-2 border-[#003B2F]/30 text-[#003B2F] text-xs font-semibold leading-relaxed shadow-2xl flex items-center space-x-3.5 max-w-sm animate-in slide-in-from-bottom-2 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-800 font-bold leading-none pr-1">✕</button>
        </div>
      )}

      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        cart={cart}
        setCart={setCart}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setIsCartOpen={setIsCartOpen}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main visual output viewport */}
      <main className="flex-grow">
        {renderViewContent()}
      </main>

      <Footer 
        setCurrentView={setCurrentView}
        showToast={(msg) => showToast(msg, 'success')}
      />

      {/* Sliding Side Cart Navigation Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="slideover-cart">
          {/* backdrop click */}
          <div className="absolute inset-0 bg-[#003B2F]/20 backdrop-blur-3xs" onClick={() => setIsCartOpen(false)}></div>

          <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
            <div className="w-screen max-w-md bg-white border-l border-gray-200 flex flex-col justify-between py-6">
              
              {/* Header */}
              <div className="px-6 border-b border-gray-100 pb-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <ShoppingBag size={18} className="text-[#003B2F]" />
                  <span>Your Shopping Cart</span>
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-full text-gray-500 hover:text-slate-900"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3.5 text-gray-400">
                    <ShoppingBag size={32} className="mx-auto text-gray-300 animate-pulse" />
                    <p className="text-xs">Your shopping cart is currently empty.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={item.id} className="p-3.5 bg-gray-55/40 bg-gray-50 rounded-xl border border-gray-150 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-xs text-slate-900 leading-normal">{item.name}</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-wide">
                          {item.type === 'hosting' ? 'Web speed hosting engine' : 'Domain registry address'}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3.5">
                        <span className="font-mono text-xs font-semibold text-[#003B2F]">
                          {CURRENCY_LIST.find(c => c.code === selectedCurrency)?.symbol}
                          {convertPrice(item.price, selectedCurrency)}
                        </span>
                        <button
                          onClick={() => handleRemoveCartItem(idx)}
                          className="text-gray-400 hover:text-rose-500"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Total & Checkout */}
              {cart.length > 0 && (
                <div className="px-6 pt-5 border-t border-gray-100 space-y-5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-500 font-bold uppercase">Estimated Subtotal:</span>
                    <span className="text-xl text-[#003B2F] font-black">
                      {CURRENCY_LIST.find(c => c.code === selectedCurrency)?.symbol}
                      {convertPrice(cart.reduce((sum, item) => sum + item.price, 0), selectedCurrency)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('checkout');
                    }}
                    className="w-full py-3.5 bg-[#003B2F] hover:bg-[#002f25] text-white font-extrabold uppercase font-mono text-xs tracking-wider rounded transition duration-150 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
