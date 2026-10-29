import React, { useState } from 'react';
import { CartItem, Order, PaymentMethodType, ShippingAddress } from '../types/store';
import { 
  ShieldCheck, Lock, CreditCard, CheckCircle2, 
  Smartphone, Wallet, Truck, ArrowLeft, ArrowRight, Printer, Check, X
} from 'lucide-react';
import { formatPKR } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountRate: number;
  onCompleteOrder: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountRate,
  onCompleteOrder
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | '3dsecure' | 'success'>('shipping');

  // Form states tailored for Pakistan
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Hamza Farooq',
    email: 'hamza.farooq@example.com',
    phone: '+92 300 4829104',
    addressLine1: 'House 42, Street 8, Phase 5, DHA',
    city: 'Lahore',
    state: 'Punjab',
    postalCode: '54792',
    country: 'Pakistan'
  });

  const [shippingOption, setShippingOption] = useState<'free' | 'express'>('free');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card');

  // Card details
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardName, setCardName] = useState('HAMZA FAROOQ');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('742');
  const [upiId, setUpiId] = useState('03004829104@jazzcash');
  
  // 3D Secure Verification state
  const [otpCode, setOtpCode] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Financial calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const FREE_SHIPPING_THRESHOLD = 10000;
  const standardFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 450;
  const shippingFee = shippingOption === 'express' ? 950 : standardFee;
  const tax = (subtotal - discountAmount) * 0.05; // 5% GST
  const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'credit_card') {
      setStep('3dsecure');
    } else {
      finalizeOrder('paid');
    }
  };

  const handleVerify3DSecure = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      finalizeOrder('authorized');
    }, 1400);
  };

  const finalizeOrder = (paymentStatus: 'authorized' | 'paid' | 'pending_cod') => {
    const orderNumber = `MD-PK-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `TCS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const newOrder: Order = {
      id: orderNumber,
      createdAt: new Date().toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...items],
      shippingAddress: { ...shippingAddress },
      paymentMethod,
      paymentStatus,
      subtotal,
      tax,
      shipping: shippingFee,
      discount: discountAmount,
      total,
      status: 'confirmed',
      trackingNumber
    };

    setCompletedOrder(newOrder);
    onCompleteOrder(newOrder);
    setStep('success');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {step === 'success' ? 'Order Confirmed' : 'MegaDukan Secure Gateway (PKR)'}
            </h3>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress tracker */}
        {step !== 'success' && (
          <div className="bg-slate-100/70 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className={step === 'shipping' ? 'text-blue-600 font-bold' : 'text-slate-500'}>
              1. Shipping Address
            </span>
            <span className="text-slate-300">→</span>
            <span className={step === 'payment' ? 'text-blue-600 font-bold' : 'text-slate-500'}>
              2. Secure Payment
            </span>
            <span className="text-slate-300">→</span>
            <span className={step === '3dsecure' ? 'text-blue-600 font-bold' : 'text-slate-500'}>
              3. 3D Bank Verification
            </span>
          </div>
        )}

        {/* Step 1: Shipping Address Form */}
        {step === 'shipping' && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-4">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Enter your delivery details in Pakistan</span>
              <span className="font-mono font-bold text-blue-600">Total: {formatPKR(total)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email for Invoice</label>
                <input
                  type="email"
                  required
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (SMS Tracking)</label>
                <input
                  type="tel"
                  required
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Complete Street / Colony / Phase Address</label>
              <input
                type="text"
                required
                value={shippingAddress.addressLine1}
                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="e.g. Lahore / Karachi"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Province / Region</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  placeholder="e.g. Punjab / Sindh"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Shipping Option */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Courier Service
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShippingOption('free')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    shippingOption === 'free'
                      ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-0.5">
                    <span>TCS / Leopard Courier</span>
                    <span className="font-mono text-emerald-700 font-extrabold">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : formatPKR(450)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">2–4 Business Days · Live Tracking</p>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingOption('express')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    shippingOption === 'express'
                      ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-0.5">
                    <span>Express Air 24 Hours</span>
                    <span className="font-mono text-blue-600 font-bold">+{formatPKR(950)}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Next Day Delivery to major cities</p>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method Choice */}
        {step === 'payment' && (
          <form onSubmit={handleInitiatePayment} className="p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Payment Gateway (PKR)
                </label>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <Lock className="w-3 h-3" />
                  <span>256-Bit Encrypted</span>
                </div>
              </div>

              {/* Payment selector grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer text-xs transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Visa / PayPak</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer text-xs transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>JazzCash / Raast</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer text-xs transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span>EasyPaisa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer text-xs transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Cash on Delivery</span>
                </button>
              </div>
            </div>

            {/* Credit Card inputs */}
            {paymentMethod === 'credit_card' && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span className="font-medium">Card Details (Visa / Mastercard / PayPak)</span>
                  <span className="font-mono text-emerald-700 font-semibold">3D Secure OTP</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* JazzCash / Raast inputs */}
            {paymentMethod === 'upi' && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs text-slate-700 mb-2 font-semibold">
                  Instant JazzCash / Raast Direct Transfer
                </div>
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg border border-slate-300 shadow-xs flex items-center justify-center">
                  <div className="w-full h-full border-4 border-slate-900 p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-slate-900" />
                      <div className="w-6 h-6 bg-slate-900" />
                    </div>
                    <div className="text-[9px] font-mono font-bold text-slate-900 text-center">
                      RAAST PKR QR
                    </div>
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-slate-900" />
                      <div className="w-4 h-4 bg-slate-900" />
                    </div>
                  </div>
                </div>
                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="03001234567"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-center font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Enter your JazzCash / Raast registered mobile number
                  </span>
                </div>
              </div>
            )}

            {/* EasyPaisa */}
            {paymentMethod === 'paypal' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <p className="text-xs text-slate-600">
                  EasyPaisa mobile account approval prompt will be sent to your number.
                </p>
                <div className="text-xs font-mono text-blue-600 font-bold">
                  Mobile Number: {shippingAddress.phone}
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="text-xs text-slate-600">
                  Pay with exact Cash in Pakistani Rupees (PKR) at your doorstep to the TCS rider upon receiving the parcel.
                </p>
                <div className="text-[11px] text-blue-700 font-mono font-semibold">
                  A verification call / SMS will be made to {shippingAddress.phone} before dispatch.
                </div>
              </div>
            )}

            {/* Financial Summary */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Items ({items.length})</span>
                <span className="font-mono text-slate-900 font-semibold">{formatPKR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount</span>
                  <span className="font-mono">-{formatPKR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Courier Shipping</span>
                <span className="font-mono text-slate-900 font-semibold">
                  {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated GST (5%)</span>
                <span className="font-mono text-slate-900 font-semibold">{formatPKR(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Authorized Amount</span>
                <span className="font-mono text-blue-600">{formatPKR(total)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <span>Authorize & Pay {formatPKR(total)}</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: 3D Secure Bank Verification Simulator */}
        {step === '3dsecure' && (
          <div className="p-6 space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">State Bank of Pakistan 3D Secure 2.0</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                A verification one-time passcode (OTP) was sent to your registered SIM for transaction amount <strong className="text-slate-900">{formatPKR(total)}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 max-w-md mx-auto text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Merchant:</span>
                <span className="font-mono font-semibold text-slate-900">MEGADUKAN.COM PAKISTAN</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Card Ending:</span>
                <span className="font-mono font-semibold text-slate-900">•••• 8821</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Test OTP Passcode:</span>
                <span className="font-mono font-bold text-blue-600 text-sm">849201</span>
              </div>
            </div>

            <div className="max-w-xs mx-auto space-y-2">
              <label className="block text-xs text-slate-700 font-semibold">
                Enter 6-digit SMS Passcode
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="849201"
                className="w-full bg-white border border-slate-300 rounded-lg py-2.5 text-center text-lg font-mono tracking-widest text-slate-900 focus:outline-none focus:border-blue-500 shadow-xs"
              />
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('payment')}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerify3DSecure}
                disabled={isAuthorizing}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                {isAuthorizing ? (
                  <span>Contacting Issuing Bank...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm & Authorize</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Order Confirmation & Invoice */}
        {step === 'success' && completedOrder && (
          <div className="p-6 space-y-6 text-slate-800">
            {/* Success Hero */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Payment Successfully Verified!</h4>
              <p className="text-xs text-slate-600">
                Order <strong className="text-blue-600 font-mono font-bold">#{completedOrder.id}</strong> has been confirmed and routed to warehouse dispatch.
              </p>
            </div>

            {/* Tracking Status Timeline */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">TCS Airbill Number:</span>
                <span className="font-mono font-bold text-slate-900">{completedOrder.trackingNumber}</span>
              </div>

              {/* Step indicator */}
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-1">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">✓</div>
                  <span className="text-slate-900 font-bold mt-1">Confirmed</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">2</div>
                  <span className="text-blue-600 font-bold mt-1">Processing</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">3</div>
                  <span className="text-slate-500 mt-1">Dispatched</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">4</div>
                  <span className="text-slate-500 mt-1">Delivered</span>
                </div>
              </div>
            </div>

            {/* Receipt Breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200 text-slate-600">
                <span>Customer</span>
                <span className="text-slate-900 font-bold">{completedOrder.shippingAddress.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 text-slate-600">
                <span>Shipping Destination</span>
                <span className="text-slate-900 text-right max-w-xs truncate font-medium">
                  {completedOrder.shippingAddress.addressLine1}, {completedOrder.shippingAddress.city}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 text-slate-600">
                <span>Payment Method</span>
                <span className="text-slate-900 uppercase font-mono font-bold">{completedOrder.paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-1">
                <span>Total Amount</span>
                <span className="font-mono text-blue-600">{formatPKR(completedOrder.total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrintReceipt}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Tax Invoice</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
