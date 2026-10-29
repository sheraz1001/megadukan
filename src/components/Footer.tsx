import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock, Headphones, MapPin } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigatePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigatePage }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 text-slate-600">
      {/* Trust & Guarantee Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900">Priority Courier Pakistan</h5>
              <p className="text-[11px] text-slate-500">Free delivery on orders over Rs. 10,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900">2-Year Full Replacement</h5>
              <p className="text-[11px] text-slate-500">100% genuine factory direct import</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900">30-Day Money Back</h5>
              <p className="text-[11px] text-slate-500">Hassle-free returns & instant exchange</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900">Secure Payments</h5>
              <p className="text-[11px] text-slate-500">Cash on Delivery, JazzCash & Cards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <button
              onClick={() => onNavigatePage('store')}
              className="text-xl font-extrabold text-slate-900 tracking-tight text-left cursor-pointer"
            >
              MegaDukan<span className="text-blue-600">.com</span>
            </button>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Pakistan’s premier high-performance online destination for authentic audiophile studio speakers, JLab & Apple ANC headphones, 4K PTZ CCTV cameras, and precision PC hardware.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Karachi & Lahore Fulfillment Centers, Pakistan</span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] font-mono text-slate-700 px-2.5 py-1 bg-slate-100 rounded border border-slate-200">
                COD · JAZZCASH · EASYPAISA · VISA · MASTERCARD
              </span>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Shop Categories
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('speakers')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  Speakers & Soundbars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('earbuds')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer font-medium text-slate-800"
                >
                  Headphones & Earbuds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gadgets')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  Smartwatches & Gadgets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cctv-cameras')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  CCTV & Surveillance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('computer-accessories')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  PC & Gaming Hardware
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Dedicated Pages */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Customer Desk
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigatePage('track')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer font-medium"
                >
                  Track Courier Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('shipping')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  Shipping & Delivery Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('warranty')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  2-Year Warranty & Claims
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('contact')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer font-medium text-blue-600"
                >
                  Submit Support Ticket
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('about')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  About MegaDukan
                </button>
              </li>
            </ul>
          </div>

          {/* Operations & Admin Portal */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Operations & Legal
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigatePage('admin')}
                  className="text-blue-700 hover:text-blue-900 font-bold transition-colors text-left cursor-pointer flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded border border-blue-200"
                >
                  <Lock className="w-3 h-3 text-blue-600" />
                  <span>Admin Control Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('terms')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('terms')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  Privacy & Data Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('contact')}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  Direct Support Helpline
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <div>
            © 2026 MegaDukan.com. All rights reserved. Registered in Pakistan.
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0 font-mono text-[11px]">
            <span>Fast Courier Dispatch</span>
            <span aria-hidden="true">·</span>
            <span>PCI-DSS Level 1 Encrypted</span>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigatePage('admin')} className="text-blue-600 hover:underline">
              Staff Sign In
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
