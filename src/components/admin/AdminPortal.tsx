import React, { useState } from 'react';
import { 
  Product, Order, RestockEvent, ProductReview, ProductCategory 
} from '../../types/store';
import { AdminUser, PromoCode, StoreSettings } from '../../types/admin';
import { ProductGraphic } from '../ProductGraphic';
import { 
  LayoutDashboard, Package, ShoppingCart, TrendingDown, Star, Tag, 
  Settings, LogOut, ExternalLink, ShieldCheck, Plus, Search, Edit3, 
  Trash2, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, 
  RefreshCw, Check, X, Eye, Truck, User, Lock, Key, Calendar, 
  Percent, DollarSign, Filter, ChevronRight, Sliders
} from 'lucide-react';
import { formatPKR, formatPKRCompact } from '../../utils/currency';

interface AdminPortalProps {
  products: Product[];
  orders: Order[];
  reviews: Record<string, ProductReview[]>;
  restockEvents: RestockEvent[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateStock: (productId: string, stock: number) => void;
  onRestockProduct: (productId: string, quantity: number) => void;
  onToggleAutoReorder: (productId: string) => void;
  onUpdateThreshold: (productId: string, threshold: number) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onDeleteReview: (productId: string, reviewId: string) => void;
  onAddReviewReply: (productId: string, reviewId: string, reply: string) => void;
  onExitAdmin: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  orders,
  reviews,
  restockEvents,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onUpdateStock,
  onRestockProduct,
  onToggleAutoReorder,
  onUpdateThreshold,
  onUpdateOrderStatus,
  onDeleteReview,
  onAddReviewReply,
  onExitAdmin
}) => {
  // 1. Admin Authentication State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('megadukan_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@megadukan.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginRole, setLoginRole] = useState<'super_admin' | 'operations_manager' | 'inventory_controller'>('super_admin');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Navigation Tab inside Admin Portal
  const [activeAdminTab, setActiveAdminTab] = useState<
    'dashboard' | 'products' | 'orders' | 'inventory' | 'reviews' | 'coupons' | 'settings'
  >('dashboard');

  // Modals inside Admin
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Promo Codes State
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: 'prm-1',
      code: 'MEGABONUS',
      discountPercentage: 15,
      description: 'Exclusive 15% Welcome Storewide Discount',
      minOrderPKR: 15000,
      isActive: true,
      usageCount: 142,
      expiryDate: 'Dec 31, 2026'
    },
    {
      id: 'prm-2',
      code: 'DUKAN10',
      discountPercentage: 10,
      description: 'Standard 10% Electronics Voucher',
      minOrderPKR: 5000,
      isActive: true,
      usageCount: 389,
      expiryDate: 'Dec 31, 2026'
    }
  ]);
  const [newPromoCode, setNewPromoCode] = useState({
    code: '',
    discount: 10,
    minOrder: 10000,
    description: ''
  });

  // Store Settings State
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: 'MegaDukan.com Pakistan',
    supportEmail: 'support@megadukan.com',
    supportPhone: '+92 (21) 3584-9210',
    warehouseCity: 'Karachi & Lahore Fulfillment Centers',
    freeShippingThreshold: 10000,
    standardShippingFee: 450,
    expressShippingFee: 950,
    masterCurrency: 'PKR',
    currencySymbol: 'Rs.',
    autoInventoryReplenishment: true
  });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Filter & Search states for products
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState<ProductCategory | 'all'>('all');

  // New Product Form State
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: 'earbuds',
    categoryLabel: 'Headphones & Audio',
    tagline: '',
    description: '',
    price: 19999,
    originalPrice: 24999,
    costPrice: 11000,
    stock: 20,
    minThreshold: 5,
    reorderQuantity: 25,
    autoReorderEnabled: true,
    supplier: 'Direct Factory Global',
    iconType: 'headphones',
    imageUrl: '',
    warranty: '2 Year Official Warranty',
    badge: 'New Arrival',
    features: ['Ultra-high fidelity acoustic drivers', 'Fast wireless charging', 'Ergonomic comfort'],
    specs: [
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Battery Life', value: '40 Hours Playtime' }
    ]
  });

  // Review reply state
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // 2. Authentication Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    // Accept valid demo credentials
    if (loginPassword.length < 6) {
      setLoginError('Password must be at least 6 characters.');
      return;
    }

    const roleLabels = {
      super_admin: 'Super Administrator',
      operations_manager: 'Store Operations Manager',
      inventory_controller: 'Inventory Officer'
    };

    const userObj: AdminUser = {
      id: `usr-${Date.now()}`,
      name: loginEmail.includes('admin') ? 'Zain Hashmi' : loginEmail.includes('ops') ? 'Sara Qureshi' : 'Bilal Akhtar',
      email: loginEmail,
      role: loginRole,
      roleLabel: roleLabels[loginRole],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      lastLogin: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setAdminUser(userObj);
    localStorage.setItem('megadukan_admin_session', JSON.stringify(userObj));
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('megadukan_admin_session');
  };

  const fillDemoAccount = (email: string, pass: string, role: AdminUser['role']) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setLoginRole(role);
  };

  // 3. Analytics Aggregations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 1850000; // includes past batch revenue
  const totalOrdersCount = orders.length + 64;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockProducts = products.filter(p => p.stock <= p.minThreshold);
  const totalCatalogInventoryValue = products.reduce((sum, p) => sum + p.stock * p.price, 0);

  // 4. Product CRUD
  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.sku) return;

    const created: Product = {
      id: `md-${Date.now()}`,
      sku: newProd.sku || `MD-SKU-${Math.floor(100 + Math.random() * 900)}`,
      name: newProd.name,
      category: newProd.category || 'earbuds',
      categoryLabel: newProd.categoryLabel || 'Audio & Gadgets',
      tagline: newProd.tagline || 'High-performance hardware imported directly.',
      description: newProd.description || 'Precision engineered electronics with official warranty.',
      price: Number(newProd.price) || 19999,
      originalPrice: Number(newProd.originalPrice) || undefined,
      costPrice: Number(newProd.costPrice) || 10000,
      stock: Number(newProd.stock) || 15,
      minThreshold: Number(newProd.minThreshold) || 5,
      reorderQuantity: Number(newProd.reorderQuantity) || 20,
      autoReorderEnabled: newProd.autoReorderEnabled ?? true,
      supplier: newProd.supplier || 'Direct Factory Sourcing',
      totalSold: 0,
      rating: 5.0,
      reviewCount: 0,
      iconType: (newProd.iconType as any) || 'headphones',
      imageUrl: newProd.imageUrl?.trim() || undefined,
      warranty: newProd.warranty || '2 Year Replacement Warranty',
      badge: newProd.badge || undefined,
      features: newProd.features || ['Premium sound quality', 'Fast charging'],
      specs: newProd.specs || [{ label: 'Standard', value: 'Pro Spec' }]
    };

    onAddProduct(created);
    setIsAddProductOpen(false);
  };

  const handleUpdateExistingProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  // 5. Coupon creation
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.code) return;

    const created: PromoCode = {
      id: `prm-${Date.now()}`,
      code: newPromoCode.code.toUpperCase().trim(),
      discountPercentage: Number(newPromoCode.discount),
      description: newPromoCode.description || `${newPromoCode.discount}% Promotional Voucher`,
      minOrderPKR: Number(newPromoCode.minOrder),
      isActive: true,
      usageCount: 0,
      expiryDate: 'Dec 31, 2026'
    };

    setPromoCodes([created, ...promoCodes]);
    setNewPromoCode({ code: '', discount: 10, minOrder: 10000, description: '' });
  };

  // ==========================================
  // IF NOT LOGGED IN: DISPLAY ENTERPRISE LOGIN
  // ==========================================
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>MegaDukan Internal Enterprise Hub</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Store Administration Portal
          </h2>
          <p className="text-xs text-slate-400">
            Secure sign-in for store managers, fulfillment staff, and inventory controllers.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl space-y-6">
            
            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Administrative Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@megadukan.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Passcode / Secret
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Administrative Privilege Level
                </label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="super_admin">Super Administrator (Full System Access)</option>
                  <option value="operations_manager">Store Operations & Fulfillment</option>
                  <option value="inventory_controller">Inventory & Restock Controller</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </button>
              </div>
            </form>

            {/* Quick Demo Fill Buttons */}
            <div className="pt-4 border-t border-slate-700/60 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 block text-center">
                1-Click Preset Demo Roles:
              </span>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin@megadukan.com', 'admin123', 'super_admin')}
                  className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600 font-mono transition-colors cursor-pointer text-center"
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('ops@megadukan.com', 'ops1234', 'operations_manager')}
                  className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600 font-mono transition-colors cursor-pointer text-center"
                >
                  Operations
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('stock@megadukan.com', 'stock123', 'inventory_controller')}
                  className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600 font-mono transition-colors cursor-pointer text-center"
                >
                  Inventory
                </button>
              </div>
            </div>

            {/* Back to public store */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onExitAdmin}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <span>← Return to Public MegaDukan Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGGED-IN ADMIN WORKSPACE
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Admin Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Mode */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              MegaDukan<span className="text-blue-600">.Control</span>
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              v2.8 Enterprise
            </span>
          </div>

          {/* Quick links & Admin Profile */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onExitAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Public Storefront</span>
            </button>

            {/* User tag */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {adminUser.name[0]}
              </div>
              <div className="hidden md:block text-left">
                <p className="font-bold text-slate-900 leading-tight">{adminUser.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">{adminUser.roleLabel}</p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Sign Out of Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Admin Workspace Body: Sidebar + Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1 shrink-0">
          <div className="pb-3 mb-2 border-b border-slate-100 text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Management Consoles
          </div>

          <button
            onClick={() => setActiveAdminTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeAdminTab === 'dashboard'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('products')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeAdminTab === 'products'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 shrink-0" />
              <span>Catalog & Products</span>
            </div>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              activeAdminTab === 'products' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeAdminTab === 'orders'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-4 h-4 shrink-0" />
              <span>Orders & Fulfillment</span>
            </div>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              activeAdminTab === 'orders' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('inventory')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeAdminTab === 'inventory'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <TrendingDown className="w-4 h-4 shrink-0" />
              <span>Inventory Telemetry</span>
            </div>
            {lowStockProducts.length > 0 && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                {lowStockProducts.length} Alert
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab('reviews')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeAdminTab === 'reviews'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4 shrink-0" />
            <span>Customer Reviews</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('coupons')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeAdminTab === 'coupons'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4 shrink-0" />
            <span>Vouchers & Promos</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeAdminTab === 'settings'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Store Configuration</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeAdminTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Executive Dashboard</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-level performance metrics, Pakistan sales volume, and order pipeline.
                </p>
              </div>

              {/* 4 Stat KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-500">Gross Sales (PKR)</span>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">{formatPKRCompact(totalRevenue)}</div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+18.4% from last month</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-500">Total Fulfilled Orders</span>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">{totalOrdersCount}</div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Avg Order {formatPKR(avgOrderValue)}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-500">Inventory Asset Value</span>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">{formatPKRCompact(totalCatalogInventoryValue)}</div>
                  <span className="text-[11px] text-slate-400">Total {products.reduce((s, p) => s + p.stock, 0)} units warehoused</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-500">Stock Reorder Warnings</span>
                  <div className="text-2xl font-extrabold text-amber-600 font-mono">{lowStockProducts.length} SKUs</div>
                  <span className="text-[11px] text-amber-700 font-semibold">Automated PO engine active</span>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Recent Customer Orders</h3>
                  <button
                    onClick={() => setActiveAdminTab('orders')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View All Orders →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No customer orders placed yet in this session.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-mono text-[11px]">
                          <th className="pb-3 font-semibold">ORDER ID</th>
                          <th className="pb-3 font-semibold">CUSTOMER</th>
                          <th className="pb-3 font-semibold">CITY</th>
                          <th className="pb-3 font-semibold">TOTAL</th>
                          <th className="pb-3 font-semibold">PAYMENT</th>
                          <th className="pb-3 font-semibold">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id} className="hover:bg-slate-50">
                            <td className="py-3 font-mono font-bold text-slate-900">{o.id}</td>
                            <td className="py-3 text-slate-700">{o.shippingAddress.fullName}</td>
                            <td className="py-3 text-slate-500">{o.shippingAddress.city}</td>
                            <td className="py-3 font-mono font-bold text-slate-900">{formatPKR(o.total)}</td>
                            <td className="py-3 uppercase font-mono text-[11px] text-slate-600">{o.paymentMethod}</td>
                            <td className="py-3">
                              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS CATALOG CRUD */}
          {activeAdminTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">Product Catalog Management</h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create, edit, adjust stock, and manage high-resolution imagery for all electronics.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product SKU</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by SKU or Product Name..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Category:</span>
                  <select
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value as any)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="speakers">Speakers & Audio</option>
                    <option value="earbuds">Headphones & Earbuds</option>
                    <option value="gadgets">Smart Gadgets</option>
                    <option value="cctv-cameras">CCTV Security</option>
                    <option value="mobile-accessories">Mobile Gear</option>
                    <option value="computer-accessories">PC Accessories</option>
                  </select>
                </div>
              </div>

              {/* Product Table */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                      <tr>
                        <th className="py-3 px-4">ITEM / PHOTO</th>
                        <th className="py-3 px-4">SKU / CATEGORY</th>
                        <th className="py-3 px-4">RETAIL PRICE</th>
                        <th className="py-3 px-4">COST</th>
                        <th className="py-3 px-4">STOCK</th>
                        <th className="py-3 px-4">AUTO-REORDER</th>
                        <th className="py-3 px-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products
                        .filter(p => {
                          if (productCatFilter !== 'all' && p.category !== productCatFilter) return false;
                          if (productSearch.trim()) {
                            const q = productSearch.toLowerCase();
                            return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
                          }
                          return true;
                        })
                        .map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/80">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                  <ProductGraphic type={p.iconType} imageUrl={p.imageUrl} alt={p.name} className="h-full w-full" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-slate-900 truncate max-w-[200px]">{p.name}</p>
                                  {p.badge && (
                                    <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                      {p.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-mono font-bold text-slate-900 block">{p.sku}</span>
                              <span className="text-[11px] text-slate-500">{p.categoryLabel}</span>
                            </td>
                            <td className="py-3 px-4 font-mono font-extrabold text-slate-900">
                              {formatPKR(p.price)}
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-500">
                              {formatPKR(p.costPrice)}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="0"
                                  value={p.stock}
                                  onChange={(e) => onUpdateStock(p.id, parseInt(e.target.value) || 0)}
                                  className={`w-16 px-2 py-1 rounded border font-mono font-bold text-xs text-center focus:outline-none focus:border-blue-500 ${
                                    p.stock <= p.minThreshold 
                                      ? 'border-amber-300 bg-amber-50 text-amber-900' 
                                      : 'border-slate-300 bg-white text-slate-900'
                                  }`}
                                />
                                <span className="text-[11px] text-slate-400">units</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => onToggleAutoReorder(p.id)}
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded cursor-pointer border ${
                                  p.autoReorderEnabled
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-slate-100 text-slate-500 border-slate-200'
                                }`}
                              >
                                {p.autoReorderEnabled ? 'ENABLED' : 'PAUSED'}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingProduct(p)}
                                  className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                                  title="Edit Product Details"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                      onDeleteProduct(p.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & FULFILLMENT */}
          {activeAdminTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Orders & Fulfillment</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Process customer shipments, generate TCS/Trax airway bills, and mark delivery status.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-800">No Orders in Queue</h3>
                  <p className="text-xs text-slate-500">Orders placed by customers through the checkout modal will appear here.</p>
                </div>
              ) : (
                <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                        <tr>
                          <th className="py-3 px-4">ORDER REF</th>
                          <th className="py-3 px-4">CUSTOMER & CITY</th>
                          <th className="py-3 px-4">ITEMS</th>
                          <th className="py-3 px-4">TOTAL</th>
                          <th className="py-3 px-4">PAYMENT</th>
                          <th className="py-3 px-4">STATUS</th>
                          <th className="py-3 px-4 text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-slate-50/80">
                            <td className="py-3 px-4">
                              <span className="font-mono font-bold text-slate-900 block">{o.id}</span>
                              <span className="text-[11px] text-slate-400 font-mono">{o.trackingNumber}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-slate-800 block">{o.shippingAddress.fullName}</span>
                              <span className="text-[11px] text-slate-500">{o.shippingAddress.city}, Pakistan</span>
                            </td>
                            <td className="py-3 px-4 text-slate-700">
                              {o.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                            </td>
                            <td className="py-3 px-4 font-mono font-extrabold text-slate-900">
                              {formatPKR(o.total)}
                            </td>
                            <td className="py-3 px-4 uppercase font-mono text-[11px]">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                {o.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={o.status}
                                onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                                className={`text-xs font-mono font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                                  o.status === 'delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  o.status === 'shipped' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                  o.status === 'processing' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                                  'bg-slate-100 text-slate-700 border-slate-300'
                                }`}
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped (In Transit)</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setSelectedOrderDetails(o)}
                                className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                              >
                                Full Invoice →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INVENTORY TELEMETRY & AUTO-PO */}
          {activeAdminTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">Inventory Telemetry & Auto-PO</h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Automated purchase order trigger levels, safety stock cushions, and vendor replenishment audit trails.
                  </p>
                </div>
              </div>

              {/* Threshold Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => {
                  const percent = Math.min(100, Math.round((p.stock / (p.minThreshold * 3)) * 100));
                  const isCritical = p.stock <= p.minThreshold;

                  return (
                    <div 
                      key={p.id} 
                      className={`p-4 rounded-xl border bg-white shadow-xs space-y-3 ${
                        isCritical ? 'border-amber-300 ring-1 ring-amber-300/50' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400">{p.sku}</span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isCritical ? 'bg-amber-100 text-amber-900' : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {isCritical ? 'REORDER' : 'OPTIMAL'}
                        </span>
                      </div>

                      {/* Stock Bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Current Stock:</span>
                          <span className="font-mono font-bold text-slate-900">{p.stock} units</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCritical ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                          <span>Min Threshold: {p.minThreshold}</span>
                          <span>Reorder Qty: +{p.reorderQuantity}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => onRestockProduct(p.id, p.reorderQuantity)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Trigger PO (+{p.reorderQuantity})</span>
                        </button>

                        <button
                          onClick={() => onToggleAutoReorder(p.id)}
                          className="text-[11px] text-slate-500 hover:text-slate-800 font-mono cursor-pointer"
                        >
                          Auto: {p.autoReorderEnabled ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Restock Logs */}
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">Purchase Order Audit Trail</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-mono text-[11px]">
                        <th className="pb-3">TIMESTAMP</th>
                        <th className="pb-3">SKU</th>
                        <th className="pb-3">PRODUCT</th>
                        <th className="pb-3">UNITS</th>
                        <th className="pb-3">TOTAL COST</th>
                        <th className="pb-3">TRIGGER</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-xs">
                      {restockEvents.slice(0, 8).map((evt) => (
                        <tr key={evt.id} className="hover:bg-slate-50">
                          <td className="py-2.5 text-slate-500">{evt.timestamp}</td>
                          <td className="py-2.5 font-bold text-slate-800">{evt.sku}</td>
                          <td className="py-2.5 font-sans text-slate-900">{evt.productName}</td>
                          <td className="py-2.5 font-bold text-emerald-600">+{evt.quantity}</td>
                          <td className="py-2.5 text-slate-700">{formatPKR(evt.cost)}</td>
                          <td className="py-2.5">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {evt.triggeredBy === 'automated_system' ? '🤖 Telemetry' : '👤 Admin Manual'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS MODERATION */}
          {activeAdminTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Customer Reviews Moderation</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Monitor buyer feedback, respond as MegaDukan Support, and manage verified badges.
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(reviews).flatMap(([productId, prodReviews]) => {
                  const matchedProduct = products.find(p => p.id === productId);
                  return prodReviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                          <span className="text-slate-400 mx-2">·</span>
                          <span className="text-xs text-slate-500">{rev.date}</span>
                          <span className="text-slate-400 mx-2">·</span>
                          <span className="text-xs text-blue-600 font-medium">
                            Product: {matchedProduct?.name || productId}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{rev.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rev.comment}</p>
                      </div>

                      {/* Store Reply input */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Type official store reply to customer..."
                            value={replyTextMap[rev.id] || ''}
                            onChange={(e) => setReplyTextMap({ ...replyTextMap, [rev.id]: e.target.value })}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                          />
                          <button
                            onClick={() => {
                              if (replyTextMap[rev.id]) {
                                onAddReviewReply(productId, rev.id, replyTextMap[rev.id]);
                                setReplyTextMap({ ...replyTextMap, [rev.id]: '' });
                                alert('Official reply logged and posted.');
                              }
                            }}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                          >
                            Reply
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm('Delete this customer review?')) {
                              onDeleteReview(productId, rev.id);
                            }
                          }}
                          className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        >
                          Remove Review
                        </button>
                      </div>
                    </div>
                  ));
                })}
              </div>
            </div>
          )}

          {/* TAB 6: COUPONS & PROMOS */}
          {activeAdminTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">Vouchers & Promotional Codes</h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Generate campaign codes, configure minimum spend limits in PKR, and track redemption.
                  </p>
                </div>
              </div>

              {/* Add Promo Code Form */}
              <form onSubmit={handleAddCoupon} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Create New Discount Voucher</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">COUPON CODE</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MEGA20"
                      value={newPromoCode.code}
                      onChange={(e) => setNewPromoCode({ ...newPromoCode, code: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono uppercase focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">DISCOUNT %</label>
                    <input
                      type="number"
                      min="1"
                      max="70"
                      required
                      value={newPromoCode.discount}
                      onChange={(e) => setNewPromoCode({ ...newPromoCode, discount: parseInt(e.target.value) || 10 })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">MIN ORDER (PKR)</label>
                    <input
                      type="number"
                      value={newPromoCode.minOrder}
                      onChange={(e) => setNewPromoCode({ ...newPromoCode, minOrder: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer"
                    >
                      Save Voucher
                    </button>
                  </div>
                </div>
              </form>

              {/* Coupons List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promoCodes.map((c) => (
                  <div key={c.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                        {c.code}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-600">
                        {c.discountPercentage}% OFF
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{c.description}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Min Order: {formatPKR(c.minOrderPKR)}</span>
                      <span>Used: {c.usageCount} times</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: STORE SETTINGS */}
          {activeAdminTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Store Global Configuration</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Master currency, fulfillment rates across Pakistan, and contact desk endpoints.
                </p>
              </div>

              {settingsSavedToast && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Store settings updated successfully across storefront!</span>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Master Currency</label>
                    <input
                      type="text"
                      disabled
                      value="PKR (Pakistani Rupee - Rs.)"
                      className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Free Delivery Threshold (PKR)</label>
                    <input
                      type="number"
                      value={storeSettings.freeShippingThreshold}
                      onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Standard Subsidized Courier Fee</label>
                    <input
                      type="number"
                      value={storeSettings.standardShippingFee}
                      onChange={(e) => setStoreSettings({ ...storeSettings, standardShippingFee: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Support Helpline</label>
                    <input
                      type="text"
                      value={storeSettings.supportPhone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, supportPhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Support Email</label>
                    <input
                      type="email"
                      value={storeSettings.supportEmail}
                      onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSettingsSavedToast(true);
                      setTimeout(() => setSettingsSavedToast(false), 3000);
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Save Global Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD NEW PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Add New Electronics SKU</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProd.name || ''}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="e.g. NovaBass 200 Wireless Speaker"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">SKU Number *</label>
                  <input
                    type="text"
                    required
                    value={newProd.sku || ''}
                    onChange={(e) => setNewProd({ ...newProd, sku: e.target.value.toUpperCase() })}
                    placeholder="e.g. MD-SPK-NOV2"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProd.category || 'earbuds'}
                    onChange={(e) => {
                      const cat = e.target.value as ProductCategory;
                      const catLabels: Record<string, string> = {
                        speakers: 'Speakers & Audio',
                        earbuds: 'Headphones & Earbuds',
                        gadgets: 'Smart Gadgets',
                        'cctv-cameras': 'CCTV Security',
                        'mobile-accessories': 'Mobile Accessories',
                        'computer-accessories': 'Computer Accessories'
                      };
                      setNewProd({ ...newProd, category: cat, categoryLabel: catLabels[cat] });
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  >
                    <option value="earbuds">Headphones & Earbuds</option>
                    <option value="speakers">Speakers & Audio</option>
                    <option value="gadgets">Smart Gadgets</option>
                    <option value="cctv-cameras">CCTV Security</option>
                    <option value="mobile-accessories">Mobile Accessories</option>
                    <option value="computer-accessories">Computer Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Retail Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price || ''}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit Cost Price (PKR)</label>
                  <input
                    type="number"
                    value={newProd.costPrice || ''}
                    onChange={(e) => setNewProd({ ...newProd, costPrice: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">High-Res Image URL (Optional)</label>
                <input
                  type="url"
                  value={newProd.imageUrl || ''}
                  onChange={(e) => setNewProd({ ...newProd, imageUrl: e.target.value })}
                  placeholder="https://...jpg (falls back to vector studio graphic if empty)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={newProd.stock || 20}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Low-Stock Trigger</label>
                  <input
                    type="number"
                    value={newProd.minThreshold || 5}
                    onChange={(e) => setNewProd({ ...newProd, minThreshold: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reorder Quantity</label>
                  <input
                    type="number"
                    value={newProd.reorderQuantity || 25}
                    onChange={(e) => setNewProd({ ...newProd, reorderQuantity: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline Subtitle</label>
                <input
                  type="text"
                  value={newProd.tagline || ''}
                  onChange={(e) => setNewProd({ ...newProd, tagline: e.target.value })}
                  placeholder="e.g. Hybrid Active Noise Cancellation with 40mm drivers"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={newProd.description || ''}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Comprehensive description of components, acoustic tuning, and design..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                >
                  Save & Publish SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-4 my-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Edit Product: {editingProduct.sku}</h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateExistingProduct} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Retail Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original / List Price (PKR)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) || undefined })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={editingProduct.imageUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Warehouse Stock Units</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Promotional Badge</label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value || undefined })}
                    placeholder="e.g. Best Seller, Top Tier"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORDER INVOICE DETAILS */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4 my-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-mono">INVOICE PREVIEW</span>
                <h3 className="text-base font-extrabold text-slate-900 font-mono">{selectedOrderDetails.id}</h3>
              </div>
              <button onClick={() => setSelectedOrderDetails(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">{selectedOrderDetails.shippingAddress.fullName}</span>
                <span className="text-slate-600 block">{selectedOrderDetails.shippingAddress.addressLine1}</span>
                <span className="text-slate-600 block">{selectedOrderDetails.shippingAddress.city}, Pakistan</span>
                <span className="text-slate-500 font-mono block mt-1">Phone: {selectedOrderDetails.shippingAddress.phone}</span>
              </div>

              <div className="divide-y divide-slate-100">
                {selectedOrderDetails.items.map((i, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{i.product.name}</p>
                      <p className="text-[11px] text-slate-500">Qty: {i.quantity} {i.selectedColor ? `· ${i.selectedColor}` : ''}</p>
                    </div>
                    <span className="font-mono font-bold text-slate-900">{formatPKR(i.product.price * i.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Total Amount:</span>
                <span className="font-mono text-blue-600">{formatPKR(selectedOrderDetails.total)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs"
              >
                Close Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
