import React, { useState } from 'react';
import { ShoppingBag, CreditCard, Ticket, Check, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import { Currency, CartItem } from '../types';
import { CURRENCY_LIST, convertPrice } from '../data';

interface CheckoutPageProps {
  setCurrentView: (view: string) => void;
  selectedCurrency: Currency;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  showToast: (msg: string) => void;
  onPaymentComplete: (invoiceDetail: any) => void;
}

export default function CheckoutPage({
  setCurrentView,
  selectedCurrency,
  cart,
  setCart,
  isLoggedIn,
  setIsLoggedIn,
  showToast,
  onPaymentComplete
}: CheckoutPageProps) {
  // Coupon State
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Card Payment States
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const activeCurrency = CURRENCY_LIST.find(c => c.code === selectedCurrency) || CURRENCY_LIST[0];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'NEW50OFF') {
      setDiscountPercent(50);
      showToast('Promo Applied: 50% Flat Discount unlocked on hosting packages!');
    } else {
      showToast('Error: This promo code is expired or invalid.');
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const updated = [...cart];
    const removed = updated.splice(index, 1);
    setCart(updated);
    showToast(`Removed "${removed[0].name}" from checkout.`);
  };

  // Calculate totals
  const hostingSubtotal = cart
    .filter(i => i.type === 'hosting')
    .reduce((sum, item) => sum + item.price, 0);

  const otherSubtotal = cart
    .filter(i => i.type !== 'hosting')
    .reduce((sum, item) => sum + item.price, 0);

  // Only hostings get the yearly coupon code discount
  const hostingDiscountVal = (hostingSubtotal * discountPercent) / 100;
  const grandTotalINR = (hostingSubtotal - hostingDiscountVal) + otherSubtotal;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Error: Your checkout list is empty.');
      return;
    }

    if (!cardName.trim() || cardNumber.length < 15 || cardCvv.length < 3) {
      showToast('Validation Error: Please fill in a valid credit card details.');
      return;
    }

    setIsPaying(true);
    // Simulate transaction
    setTimeout(() => {
      setIsPaying(false);
      showToast('Success! Payment approved via secure SSL sandbox.');

      // Auto login user if they weren't logged in, or pass purchased items
      setIsLoggedIn(true);

      const itemsDetail = cart.map((i) => {
        // Adjust price local discount
        let finalPrice = i.price;
        if (i.type === 'hosting') {
          finalPrice = i.price - (i.price * discountPercent) / 100;
        }
        return {
          description: i.name,
          amount: finalPrice,
          type: i.type,
          planId: i.planId
        };
      });

      onPaymentComplete({
        id: `INV-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString(),
        amount: grandTotalINR,
        status: 'Paid',
        items: itemsDetail
      });

      // Clear cart
      setCart([]);
      setCurrentView('dashboard-main');
    }, 1500);
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen py-16 md:py-24" id="checkout-block">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left cart items */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold flex items-center space-x-2 text-slate-900">
            <ShoppingBag size={20} className="text-[#003B2F]" />
            <span>My Checkout Subscriptions</span>
          </h2>

          {cart.length === 0 ? (
            <div className="p-10 bg-gray-50 border border-gray-200 rounded-xl text-center space-y-4">
              <p className="text-sm text-slate-500 italic">Your checkout list is empty. Go add some hosting or domain assets first!</p>
              <button 
                onClick={() => setCurrentView('home')}
                className="px-6 py-2.5 bg-[#003B2F] text-white text-xs font-bold uppercase rounded cursor-pointer"
              >
                Go to Homepage
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => {
                let displayPriceInCurrency = item.price;
                if (item.type === 'hosting' && discountPercent > 0) {
                  displayPriceInCurrency = item.price - (item.price * discountPercent) / 100;
                }

                return (
                  <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-normal">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-wide">
                        {item.type === 'hosting' ? 'Web speed hosting engine' : 'Domain registry address'}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm font-extrabold text-[#003B2F]">
                        {activeCurrency.symbol}{convertPrice(displayPriceInCurrency, selectedCurrency)}
                      </span>
                      <button 
                        onClick={() => handleRemoveFromCart(index)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:border-rose-100 border border-transparent rounded bg-white shadow-3xs"
                        title="Remove Item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Promo Coupon Box */}
              <form onSubmit={handleApplyCoupon} className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex gap-2">
                <input 
                  type="text" 
                  placeholder="Promo Code (NEW50OFF)" 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded text-xs uppercase font-mono tracking-widest focus:outline-none focus:border-[#003B2F]"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#003B2F] hover:bg-[#002f25] text-white rounded text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                >
                  <Ticket size={13} />
                  <span>Apply Coupon</span>
                </button>
              </form>
            </div>
          )}

          {/* Pricing breakdown receipts */}
          {cart.length > 0 && (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl space-y-3 font-mono text-xs shadow-3xs">
              <h3 className="font-bold uppercase tracking-wider text-[11px] text-slate-400 border-b border-gray-200 pb-2">Subtotals</h3>
              
              <div className="flex justify-between text-slate-655 text-slate-600">
                <span>Core Subtotal (raw):</span>
                <span>{activeCurrency.symbol}{convertPrice(hostingSubtotal + otherSubtotal, selectedCurrency)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Deduction (50% WP/Shared):</span>
                  <span>-{activeCurrency.symbol}{convertPrice(hostingDiscountVal, selectedCurrency)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3 flex justify-between text-sm text-slate-900 font-extrabold">
                <span>Grand Total:</span>
                <span className="text-[#003B2F] text-base">{activeCurrency.symbol}{convertPrice(grandTotalINR, selectedCurrency)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right card inputs */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 shadow-md relative">
          <h2 className="text-lg font-bold flex items-center space-x-2 text-slate-900">
            <CreditCard size={18} className="text-[#003B2F]" />
            <span>Secure Checkout Gateway</span>
          </h2>

          <form onSubmit={handleProcessPayment} className="space-y-4 text-xs font-semibold">
            {/* Cardholder */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Holder Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded focus:border-[#003B2F] focus:outline-none"
              />
            </div>

            {/* Credit Card Details */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Card Number</label>
              <input 
                type="text" 
                placeholder="4111 2222 3333 4444" 
                maxLength={19}
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded focus:border-[#003B2F] focus:outline-none font-mono text-xs"
              />
            </div>

            {/* Expiry / CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  maxLength={5}
                  required
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded focus:border-[#003B2F] focus:outline-none font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">CVV Code</label>
                <input 
                  type="password" 
                  placeholder="•••" 
                  maxLength={4}
                  required
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded focus:border-[#003B2F] focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isPaying || cart.length === 0}
              className="w-full py-4 rounded bg-[#003B2F] hover:bg-[#002f25] text-white font-extrabold uppercase font-mono text-xs tracking-wider flex items-center justify-center space-x-1.5 transition disabled:opacity-50 shadow-sm cursor-pointer"
            >
              {isPaying ? (
                <>
                  <RefreshCw size={13} className="animate-spin text-white" />
                  <span>Processing secure invoice...</span>
                </>
              ) : (
                <>
                  <Check size={14} />
                  <span>Execute Payment</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-200 text-center text-[10px] font-mono text-slate-400 leading-relaxed">
            🔒 Fully encrypted sandbox connection. No cards will be billed. Powered by Ka Patil.
          </div>
        </div>

      </div>
    </div>
  );
}
