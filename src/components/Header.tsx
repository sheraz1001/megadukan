import React, { useState } from 'react';
import { ShoppingBag, Search, Box, Menu, X, ArrowRight, Lock, ShieldCheck, HelpCircle, Truck } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: any) => void;
  lowStockCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  lowStockCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-200 py-1.5 px-4 text-xs flex items-center justify-between">
        <div className="flex-1 text-center">
          <span className="font-semibold text-white">MegaDukan Express</span>
          <span className="mx-2 text-slate-500" aria-hidden="true">·</span>
          <span>Free Insured Delivery across Pakistan on orders over Rs. 10,000</span>
          <span className="mx-2 text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-amber-300 font-semibold hidden sm:inline">Use code MEGABONUS for 15% OFF</span>
        </div>
        <button
          onClick={() => onTabChange('admin')}
          className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 shrink-0 ml-3 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700"
          title="Access Administrative Control Panel"
        >
          <Lock className="w-3 h-3 text-blue-400" />
          <span>Admin Portal</span>
        </button>
      </div>

      {/* Strict 3-Zone Top Navigation Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* ZONE 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { onTabChange('store'); onSelectCategory('all'); }}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group-hover:text-blue-600 transition-colors">
                MegaDukan<span className="text-blue-600">.com</span>
              </span>
            </button>
          </div>

          {/* ZONE 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('all'); }}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'store' && activeCategory === 'all' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              All Electronics
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('speakers'); }}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'store' && activeCategory === 'speakers' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Speakers & Audio
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('earbuds'); }}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'store' && activeCategory === 'earbuds' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Headphones & Earbuds
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('cctv-cameras'); }}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'store' && activeCategory === 'cctv-cameras' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              CCTV & Security
            </button>
            <button
              onClick={() => { onTabChange('inventory'); }}
              className={`flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'inventory' ? 'text-blue-600 font-bold' : 'text-slate-600'
              }`}
            >
              <Box className="w-4 h-4 text-blue-600" />
              <span>Live Inventory</span>
              {lowStockCount > 0 && (
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold border border-amber-200">
                  {lowStockCount} alerts
                </span>
              )}
            </button>
          </nav>

          {/* ZONE 3: Primary Action & Essential controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search trigger */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 w-48 sm:w-64 transition-all shadow-xs">
                  <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search speakers, airpods..."
                    className="bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none w-full"
                    autoFocus
                  />
                  <button 
                    onClick={() => { onSearchChange(''); setShowSearchInput(false); }}
                    className="text-slate-400 hover:text-slate-700 ml-1 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Search Store"
                  aria-label="Search Store"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Admin Portal Quick Trigger */}
            <button
              onClick={() => onTabChange('admin')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Admin Management Portal"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Admin</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-lg text-sm transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white text-blue-700 text-xs px-1.5 py-0.5 rounded-full font-mono font-bold shadow-xs">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 lg:hidden rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search gadgets, audio, CCTV..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('all'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-slate-800 font-medium"
            >
              All Electronics
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('speakers'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-slate-800 font-medium"
            >
              Speakers & Audio
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('earbuds'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-slate-800 font-medium"
            >
              Headphones & Buds
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('gadgets'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-slate-800 font-medium"
            >
              Smart Gadgets
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('cctv-cameras'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-slate-800 font-medium"
            >
              CCTV Cameras
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('mobile-accessories'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-slate-800 font-medium"
            >
              Mobile Gear
            </button>
            <button
              onClick={() => { onTabChange('store'); onSelectCategory('computer-accessories'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-50 text-slate-800 font-medium"
            >
              PC Accessories
            </button>
            <button
              onClick={() => { onTabChange('admin'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-md bg-slate-900 text-white font-bold flex items-center justify-between"
            >
              <span>Admin Portal</span>
              <Lock className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <button onClick={() => { onTabChange('track'); setMobileMenuOpen(false); }} className="text-left py-1 hover:text-blue-600">
              Track Order
            </button>
            <button onClick={() => { onTabChange('shipping'); setMobileMenuOpen(false); }} className="text-left py-1 hover:text-blue-600">
              Shipping Rates
            </button>
            <button onClick={() => { onTabChange('warranty'); setMobileMenuOpen(false); }} className="text-left py-1 hover:text-blue-600">
              Warranty Shield
            </button>
            <button onClick={() => { onTabChange('contact'); setMobileMenuOpen(false); }} className="text-left py-1 hover:text-blue-600">
              Contact Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
