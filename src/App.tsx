import React, { useState, useEffect } from 'react';
import { 
  Product, CartItem, Order, RestockEvent, ProductCategory, ProductReview 
} from './types/store';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data/initialProducts';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InventoryManager } from './components/InventoryManager';
import { Footer } from './components/Footer';
import { 
  Speaker, ArrowRight, CheckCircle2, Star, ShoppingBag, Box, Headphones
} from 'lucide-react';
import { ProductGraphic } from './components/ProductGraphic';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { 
  AboutPage, ShippingPage, WarrantyPage, ContactPage, TrackOrderPage, TermsPage 
} from './components/pages/StaticPages';
import { AdminPortal } from './components/admin/AdminPortal';
import { formatPKR } from './utils/currency';

const STORAGE_KEYS = {
  PRODUCTS: 'megadukan_products_v3',
  REVIEWS: 'megadukan_reviews_v3',
  CART: 'megadukan_cart_v3',
  ORDERS: 'megadukan_orders_v3',
  RESTOCK_EVENTS: 'megadukan_restock_events_v3'
};

export default function App() {
  // 1. Persistent State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!saved) return INITIAL_PRODUCTS;
      const parsed: Product[] = JSON.parse(saved);
      // Ensure all initial products (including newly added JLab JBuds Lux and their imageUrl) are present and updated
      return INITIAL_PRODUCTS.map(initProd => {
        const found = parsed.find(p => p.id === initProd.id);
        if (!found) return initProd;
        return {
          ...found,
          imageUrl: initProd.imageUrl || found.imageUrl,
          galleryAngles: initProd.galleryAngles || found.galleryAngles
        };
      });
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [reviews, setReviews] = useState<Record<string, ProductReview[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (!saved) return INITIAL_REVIEWS;
      const parsed: Record<string, ProductReview[]> = JSON.parse(saved);
      return { ...INITIAL_REVIEWS, ...parsed };
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [restockEvents, setRestockEvents] = useState<RestockEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESTOCK_EVENTS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'rst-seed-1',
          timestamp: 'Today at 04:12 AM',
          sku: 'MD-EAR-PRO',
          productName: 'AeroPods Pro Ultra ANC Earbuds',
          quantity: 40,
          cost: 680000,
          triggeredBy: 'automated_system',
          status: 'completed'
        },
        {
          id: 'rst-seed-2',
          timestamp: 'Yesterday at 02:45 PM',
          sku: 'MD-CAM-4K',
          productName: 'Sentinel 4K Solar PTZ Outdoor Security Camera',
          quantity: 25,
          cost: 537500,
          triggeredBy: 'automated_system',
          status: 'completed'
        }
      ];
    } catch {
      return [];
    }
  });

  // 2. Navigation & UI States
  const [activeTab, setActiveTab] = useState<
    'store' | 'product' | 'admin' | 'inventory' | 'about' | 'shipping' | 'warranty' | 'contact' | 'track' | 'terms'
  >('store');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [heroSpotlightId, setHeroSpotlightId] = useState<string>('md-jlab-lux-01');
  
  // Promo code
  const [discountRate, setDiscountRate] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

  // Micro toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hash synchronization for direct bookmarking & browser back/forward
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        if (activeTab === 'product' || activeTab === 'admin') {
          setActiveTab('store');
          setSelectedProduct(null);
        }
        return;
      }

      if (hash.startsWith('product/')) {
        const prodId = hash.replace('product/', '');
        const found = products.find(p => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          setActiveTab('product');
          return;
        }
      }

      const validPages = ['store', 'admin', 'inventory', 'about', 'shipping', 'warranty', 'contact', 'track', 'terms'];
      if (validPages.includes(hash)) {
        setActiveTab(hash as any);
        if (hash !== 'product') setSelectedProduct(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [products]);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as any);
    if (tab === 'store') {
      setSelectedProduct(null);
      window.location.hash = '';
    } else {
      window.location.hash = `#${tab}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductPage = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('product');
    window.location.hash = `#product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESTOCK_EVENTS, JSON.stringify(restockEvents));
  }, [restockEvents]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 3. Cart Actions
  const handleAddToCart = (product: Product, quantity = 1, color?: string) => {
    if (product.stock <= 0) {
      showToast(`Sorry, ${product.name} is currently out of stock.`);
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.selectedColor === color
      );

      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = Math.min(product.stock, currentQty + quantity);
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else {
        return [...prev, { product, quantity: Math.min(product.stock, quantity), selectedColor: color }];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.min(item.product.stock, quantity) };
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleApplyPromo = (code: string): boolean => {
    if (code === 'MEGABONUS') {
      setDiscountRate(0.15);
      setAppliedPromoCode('MEGABONUS');
      showToast('15% discount applied successfully!');
      return true;
    } else if (code === 'DUKAN10') {
      setDiscountRate(0.10);
      setAppliedPromoCode('DUKAN10');
      showToast('10% discount applied successfully!');
      return true;
    }
    return false;
  };

  // 4. Automated Inventory Engine
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // Clear cart
    setIsCartOpen(false);

    // Decrement stock for ordered items
    const restockTriggers: { product: Product; reorderQty: number }[] = [];

    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        const orderItem = newOrder.items.find(i => i.product.id === prod.id);
        if (!orderItem) return prod;

        const updatedStock = Math.max(0, prod.stock - orderItem.quantity);
        const updatedSold = prod.totalSold + orderItem.quantity;

        // Check Automated Reorder Threshold
        if (updatedStock <= prod.minThreshold && prod.autoReorderEnabled) {
          restockTriggers.push({ product: prod, reorderQty: prod.reorderQuantity });
        }

        return {
          ...prod,
          stock: updatedStock,
          totalSold: updatedSold
        };
      });
    });

    // If any items hit low stock threshold, fire automated reorder events
    if (restockTriggers.length > 0) {
      const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const newEvents: RestockEvent[] = restockTriggers.map(t => ({
        id: `rst-auto-${Date.now()}-${t.product.id}`,
        timestamp: `Today at ${nowStr}`,
        sku: t.product.sku,
        productName: t.product.name,
        quantity: t.reorderQty,
        cost: t.reorderQty * t.product.costPrice,
        triggeredBy: 'automated_system',
        status: 'completed'
      }));

      setRestockEvents(prev => [...newEvents, ...prev]);

      // Automatically replenish in inventory background simulator
      setTimeout(() => {
        setProducts(current => current.map(p => {
          const matched = restockTriggers.find(t => t.product.id === p.id);
          if (matched) {
            return { ...p, stock: p.stock + matched.reorderQty };
          }
          return p;
        }));
        showToast(`🤖 Automated Inventory: Auto-PO executed for ${restockTriggers.map(t => t.product.name).join(', ')}`);
      }, 5000);
    }
  };

  const handleUpdateStockManual = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  const handleRestockManual = (productId: string, quantity: number, isAutomated = false) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: p.stock + quantity } : p));

    const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newEvent: RestockEvent = {
      id: `rst-manual-${Date.now()}`,
      timestamp: `Today at ${nowStr}`,
      sku: product.sku,
      productName: product.name,
      quantity,
      cost: quantity * product.costPrice,
      triggeredBy: isAutomated ? 'automated_system' : 'manual_admin',
      status: 'completed'
    };

    setRestockEvents(prev => [newEvent, ...prev]);
    showToast(`Replenished +${quantity} units of ${product.name}`);
  };

  const handleToggleAutoReorder = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, autoReorderEnabled: !p.autoReorderEnabled } : p));
  };

  const handleUpdateThreshold = (productId: string, newThreshold: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, minThreshold: newThreshold } : p));
  };

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`New SKU ${newProduct.sku} created in inventory`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Product ${updated.sku} updated successfully`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product removed from catalog');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order ${orderId} status updated to ${status.toUpperCase()}`);
  };

  const handleDeleteReview = (productId: string, reviewId: string) => {
    setReviews(prev => {
      const list = prev[productId] || [];
      return {
        ...prev,
        [productId]: list.filter(r => r.id !== reviewId)
      };
    });
    showToast('Review removed from moderation queue');
  };

  const handleAddReviewReply = (_productId: string, _reviewId: string, _reply: string) => {
    showToast('Official store reply published');
  };

  // 5. User Reviews Actions
  const handleAddReview = (productId: string, newReview: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => {
    const reviewObj: ProductReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      helpfulCount: 0
    };

    setReviews(prev => {
      const existing = prev[productId] || [];
      const updated = [reviewObj, ...existing];
      
      const avg = updated.reduce((sum, r) => sum + r.rating, 0) / updated.length;
      setProducts(currProds => currProds.map(p => {
        if (p.id === productId) {
          return { ...p, rating: parseFloat(avg.toFixed(1)), reviewCount: updated.length };
        }
        return p;
      }));

      return { ...prev, [productId]: updated };
    });

    showToast('Thank you! Your verified review has been posted.');
  };

  const handleUpvoteReview = (productId: string, reviewId: string) => {
    setReviews(prev => {
      const list = prev[productId] || [];
      return {
        ...prev,
        [productId]: list.map(r => r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)
      };
    });
  };

  // 6. Filter & Sort Logic
  const filteredProducts = products.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (onlyInStock && p.stock <= 0) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchTag = p.tagline.toLowerCase().includes(q);
      const matchCat = p.categoryLabel.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      if (!matchName && !matchTag && !matchCat && !matchSku) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const lowStockCount = products.filter(p => p.stock <= p.minThreshold).length;
  const cartTotalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const getCategoryCount = (cat: ProductCategory) => {
    if (cat === 'all') return products.length;
    return products.filter(p => p.category === cat).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* When on Admin Portal */}
      {activeTab === 'admin' ? (
        <AdminPortal
          products={products}
          orders={orders}
          reviews={reviews}
          restockEvents={restockEvents}
          onUpdateProduct={handleUpdateProduct}
          onAddProduct={handleAddNewProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateStock={handleUpdateStockManual}
          onRestockProduct={handleRestockManual}
          onToggleAutoReorder={handleToggleAutoReorder}
          onUpdateThreshold={handleUpdateThreshold}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onDeleteReview={handleDeleteReview}
          onAddReviewReply={handleAddReviewReply}
          onExitAdmin={() => handleNavigate('store')}
        />
      ) : (
        <>
          {/* 1. Header adhering strictly to Top Bar Contract */}
          <Header
            cartCount={cartTotalItems}
            onOpenCart={() => setIsCartOpen(true)}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => { setActiveCategory(cat); handleNavigate('store'); }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeTab={activeTab}
            onTabChange={handleNavigate}
            lowStockCount={lowStockCount}
          />

          {/* 2. Main Content Routing */}
          {activeTab === 'product' && selectedProduct ? (
            <ProductDetailPage
              product={selectedProduct}
              allProducts={products}
              onBack={() => handleNavigate('store')}
              onSelectProduct={handleOpenProductPage}
              onAddToCart={(prod, qty, col) => handleAddToCart(prod, qty, col)}
              onBuyNow={(prod, qty, col) => {
                handleAddToCart(prod, qty, col);
                setIsCheckoutOpen(true);
              }}
              reviews={reviews[selectedProduct.id] || []}
              onAddReview={handleAddReview}
              onUpvoteReview={handleUpvoteReview}
            />
          ) : activeTab === 'about' ? (
            <AboutPage 
              onNavigateHome={() => handleNavigate('store')} 
              onExploreCatalog={() => handleNavigate('store')} 
            />
          ) : activeTab === 'shipping' ? (
            <ShippingPage 
              onNavigateHome={() => handleNavigate('store')} 
              onExploreCatalog={() => handleNavigate('store')} 
            />
          ) : activeTab === 'warranty' ? (
            <WarrantyPage 
              onNavigateHome={() => handleNavigate('store')} 
              onExploreCatalog={() => handleNavigate('store')} 
            />
          ) : activeTab === 'contact' ? (
            <ContactPage 
              onNavigateHome={() => handleNavigate('store')} 
              onExploreCatalog={() => handleNavigate('store')} 
            />
          ) : activeTab === 'track' ? (
            <TrackOrderPage 
              orders={orders}
              onNavigateHome={() => handleNavigate('store')} 
              onExploreCatalog={() => handleNavigate('store')} 
            />
          ) : activeTab === 'terms' ? (
            <TermsPage 
              onNavigateHome={() => handleNavigate('store')} 
              onExploreCatalog={() => handleNavigate('store')} 
            />
          ) : activeTab === 'inventory' ? (
            <InventoryManager
              products={products}
              restockEvents={restockEvents}
              onUpdateStock={handleUpdateStockManual}
              onRestockProduct={handleRestockManual}
              onToggleAutoReorder={handleToggleAutoReorder}
              onUpdateThreshold={handleUpdateThreshold}
              onAddNewProduct={handleAddNewProduct}
              onBackToStore={() => handleNavigate('store')}
            />
          ) : (
            <main className="flex-1">
              {/* Storefront Hero: 1 bold campaign focal point in crisp light aesthetic */}
              <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Hero Left Content */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-700 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full font-semibold">
                        <span>Direct Factory Authorized</span>
                        <span aria-hidden="true">·</span>
                        <span>Next-Day Priority Air</span>
                      </div>

                      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-xl text-balance leading-[1.15]">
                        Acoustic Precision. Smart Gadgets. Security Without Blindspots.
                      </h1>

                      <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
                        Shop genuine high-output studio speakers, hybrid ANC earbuds, 4K solar CCTV cameras, and precision computer gear at MegaDukan.com. Protected by 2-year replacement warranties and PCI-DSS encrypted checkout.
                      </p>

                      {/* Hero CTAs */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            const p = products.find(x => x.id === 'md-jlab-lux-01');
                            if (p) handleOpenProductPage(p);
                          }}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                        >
                          <Headphones className="w-4 h-4" />
                          <span>JLab JBuds Lux ANC (Sage) — {formatPKR(22499)}</span>
                        </button>
                        <button
                          onClick={() => setActiveCategory('earbuds')}
                          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                        >
                      <span>Explore Audio Gear</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('inventory')}
                      className="px-4 py-3 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 font-mono text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 font-bold shadow-xs"
                    >
                      <Box className="w-4 h-4" />
                      <span>Live Stock Telemetry</span>
                    </button>
                  </div>
                </div>

                {/* Hero Right Visual Showcase */}
                <div className="lg:col-span-5">
                  {(() => {
                    const spotlight = products.find(x => x.id === heroSpotlightId) || products[0];
                    return (
                      <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                        {/* Spotlight switcher tabs */}
                        <div className="flex items-center gap-2 mb-4 p-1 rounded-xl bg-slate-100 border border-slate-200">
                          <button
                            onClick={() => setHeroSpotlightId('md-jlab-lux-01')}
                            className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              heroSpotlightId === 'md-jlab-lux-01'
                                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                            <span>JLab Lux ANC (Sage)</span>
                          </button>
                          <button
                            onClick={() => setHeroSpotlightId('md-spk-01')}
                            className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              heroSpotlightId === 'md-spk-01'
                                ? 'bg-white text-blue-800 shadow-xs border border-blue-200'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <Speaker className="w-3.5 h-3.5 text-blue-600" />
                            <span>SonicBeam 360</span>
                          </button>
                        </div>

                        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                              {spotlight.badge || 'Featured Gear'}
                            </span>
                            <h4 className="text-base font-extrabold text-slate-900 mt-1 line-clamp-1">
                              {spotlight.name}
                            </h4>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-extrabold text-slate-900 text-lg block">
                              {formatPKR(spotlight.price)}
                            </span>
                            {spotlight.originalPrice && (
                              <span className="text-xs text-slate-400 line-through font-mono">
                                {formatPKR(spotlight.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="py-4 flex items-center justify-center">
                          <div className="w-full h-52 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden shadow-inner">
                            <ProductGraphic 
                              type={spotlight.iconType} 
                              angle="hero" 
                              imageUrl={spotlight.imageUrl}
                              alt={spotlight.name}
                              className="h-full w-full" 
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-slate-600">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-slate-900 font-bold font-mono">{spotlight.rating.toFixed(1)}</span>
                            <span>({spotlight.reviewCount} reviews)</span>
                          </div>
                          <button
                            onClick={() => handleOpenProductPage(spotlight)}
                            className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer hover:underline"
                          >
                            Inspect Specs & 4-Angle Gallery →
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* 4-Item Proof Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-10 mt-10 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-extrabold text-slate-900">24h</span>
                  <span>Average dispatch time from factory hubs</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-extrabold text-slate-900">18,500+</span>
                  <span>Verified electronics buyers satisfied</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-extrabold text-slate-900">4.9/5.0</span>
                  <span>Storewide verified customer satisfaction</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-extrabold text-slate-900">100%</span>
                  <span>Automated stock replenishment telemetry</span>
                </div>
              </div>
            </div>
          </section>

          {/* Catalog & Filter Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                All Gear ({getCategoryCount('all')})
              </button>
              <button
                onClick={() => setActiveCategory('speakers')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === 'speakers'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Speakers & Sound ({getCategoryCount('speakers')})
              </button>
              <button
                onClick={() => setActiveCategory('earbuds')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === 'earbuds'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Headphones & Earbuds ({getCategoryCount('earbuds')})
              </button>
              <button
                onClick={() => setActiveCategory('gadgets')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === 'gadgets'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Smart Gadgets ({getCategoryCount('gadgets')})
              </button>
              <button
                onClick={() => setActiveCategory('cctv-cameras')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === 'cctv-cameras'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                CCTV Security ({getCategoryCount('cctv-cameras')})
              </button>
              <button
                onClick={() => setActiveCategory('mobile-accessories')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === 'mobile-accessories'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Mobile Accessories ({getCategoryCount('mobile-accessories')})
              </button>
              <button
                onClick={() => setActiveCategory('computer-accessories')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === 'computer-accessories'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                PC Gear ({getCategoryCount('computer-accessories')})
              </button>
            </div>

            {/* Filter Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="text-slate-900 font-bold font-mono">
                  {filteredProducts.length} Items Available
                </span>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-blue-600 rounded cursor-pointer"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Sort By selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-600 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Card Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-900">No products found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing your search query or selecting a different category.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); setOnlyInStock(false); }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelect={(p) => handleOpenProductPage(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* User Reviews & Customer Testimonials Section */}
          <section className="border-t border-slate-200 bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-mono text-blue-600 font-bold">
                    Real Customer Verification
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                    What MegaDukan Customers Say
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Honest feedback from verified audiophiles, security specialists, and hardware enthusiasts.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-900 font-mono">4.9 / 5.0</span>
                  <span className="text-xs text-slate-500">(1,240+ Store Reviews)</span>
                </div>
              </div>

              {/* Curated Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Oct 24, 2026</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">"AeroPods Pro ANC is unreal on the metro"</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "Delivered in less than 24 hours in tamper-proof security packaging. The active noise cancelling completely blocks subway screeching, and battery lasted all week on one case charge."
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">David Chen</span>
                    <span className="text-emerald-700 text-[11px] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Verified Buyer
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Oct 18, 2026</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">"The Sentinel 4K Solar Camera has zero wires"</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "Mounted it on the side fence. The built-in solar keeps it at 100% battery consistently. The night vision is crystal sharp and detected courier deliveries instantly."
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Robert Sterling</span>
                    <span className="text-emerald-700 text-[11px] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Verified Buyer
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Oct 15, 2026</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">"SonicBeam 360 replaced my entire stereo"</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "Heavy aluminum body and pure audiophile sound tuning. MegaDukan's secure checkout was instantaneous and the real-time order tracking link kept me updated every step."
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Elena Rostova</span>
                    <span className="text-emerald-700 text-[11px] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Verified Buyer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* 3. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleNavigate('store');
        }}
        onNavigatePage={handleNavigate}
      />
    </>
  )}

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountRate={discountRate}
        appliedPromoCode={appliedPromoCode}
        onApplyPromo={handleApplyPromo}
      />

      {/* Multi-step Secure Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountRate={discountRate}
        onCompleteOrder={handleOrderCompleted}
      />
    </div>
  );
}
