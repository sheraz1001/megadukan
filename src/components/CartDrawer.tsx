import React, { useState } from 'react';
import { CartItem } from '../types/store';
import { ProductGraphic } from './ProductGraphic';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { formatPKR } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  discountRate: number;
  appliedPromoCode: string | null;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountRate,
  appliedPromoCode,
  onApplyPromo
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const FREE_SHIPPING_THRESHOLD = 10000; // Rs. 10,000
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 450; // Rs. 450
  const estimatedTax = (subtotal - discountAmount) * 0.05; // 5% GST
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoError(null);
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try MEGABONUS for 15% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col text-slate-900">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Shopping Bag</h2>
              <span className="text-xs font-mono font-medium text-slate-500">
                ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 font-medium">
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-bold">🎉 You have unlocked Free Insured Delivery!</span>
                ) : (
                  <span>Add <strong className="text-blue-600 font-mono font-bold">{formatPKR(freeShippingRemaining)}</strong> more for Free Delivery</span>
                )}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Explore our curated high-performance speakers, wireless earbuds, CCTV security, and gadgets.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || 'default'}`}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex gap-3.5 items-center"
                >
                  {/* Thumb image */}
                  <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <ProductGraphic 
                      type={item.product.iconType} 
                      imageUrl={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-full w-full" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    {item.selectedColor && (
                      <p className="text-[11px] text-slate-500">Color: {item.selectedColor}</p>
                    )}
                    <div className="text-xs font-mono font-extrabold text-blue-600 mt-1 tabular-nums">
                      {formatPKR(item.product.price)}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-300 rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-500 hover:text-slate-800 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono text-slate-800 font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-0.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer ml-auto"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 p-5 bg-slate-50 space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. MEGABONUS)"
                      className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 uppercase font-mono focus:outline-none focus:border-blue-500 shadow-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromoCode && (
                  <p className="text-[11px] text-emerald-700 font-mono font-medium">
                    ✓ Promo {appliedPromoCode} applied ({(discountRate * 100).toFixed(0)}% OFF)
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 font-mono">{promoError}</p>
                )}
              </form>

              {/* Price rows */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-900 font-semibold tabular-nums">{formatPKR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({(discountRate * 100).toFixed(0)}%)</span>
                    <span className="font-mono tabular-nums">-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Courier Shipping</span>
                  <span className="font-mono text-slate-900 font-semibold tabular-nums">
                    {isFreeShipping ? 'FREE' : formatPKR(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (5%)</span>
                  <span className="font-mono text-slate-900 font-semibold tabular-nums">{formatPKR(estimatedTax)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="font-mono text-blue-600 tabular-nums">{formatPKR(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-[0.99]"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit Encrypted Checkout · 100% Buyer Protection</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
