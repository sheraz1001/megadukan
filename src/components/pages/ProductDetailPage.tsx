import React, { useState } from 'react';
import { Product, ProductReview } from '../../types/store';
import { ProductGraphic } from '../ProductGraphic';
import { ReviewsSection } from '../ReviewsSection';
import { 
  ArrowLeft, Star, Truck, ShieldCheck, RefreshCw, Zap, Plus, Minus, 
  ShoppingBag, Check, Share2, Copy, Heart, CheckCircle2, PackageCheck, 
  MapPin, ShieldAlert
} from 'lucide-react';
import { formatPKR } from '../../utils/currency';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  reviews: ProductReview[];
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;
  onUpvoteReview: (productId: string, reviewId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  reviews,
  onAddReview,
  onUpvoteReview
}) => {
  const galleryAngles = product.galleryAngles || (
    product.iconType === 'headphones' 
      ? [
          { label: '3/4 Studio View', view: 'hero' as const, imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-A.jpg' },
          { label: 'Side Profile & Controls', view: 'side' as const, imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-B.jpg' },
          { label: 'Compact Folded Form', view: 'folded' as const, imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-C.jpg' },
          { label: 'Cloud Foam™ Ear Cushion', view: 'cushion' as const, imageUrl: 'https://images.activefitnessstore.com/product-large/HBJLUXANCRSGE62/HBJLUXANCRSGE62-D.jpg' }
        ]
      : undefined
  );

  const [activeAngle, setActiveAngle] = useState<'hero' | 'side' | 'folded' | 'cushion'>('hero');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colorOptions?.[0]?.name
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [copiedSku, setCopiedSku] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.minThreshold;

  const currentAngleObj = galleryAngles?.find(a => a.view === activeAngle);
  const currentImageUrl = currentAngleObj?.imageUrl || (activeAngle === 'hero' ? product.imageUrl : undefined);

  const handleCopySku = () => {
    navigator.clipboard?.writeText(product.sku);
    setCopiedSku(true);
    setTimeout(() => setCopiedSku(false), 2000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#product/${product.id}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    onBuyNow(product, quantity, selectedColor);
  };

  // Related products in the same category
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Breadcrumb & Action Header */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer mr-2 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>
            <span aria-hidden="true" className="text-slate-300">/</span>
            <span className="uppercase tracking-wider font-semibold text-blue-600 shrink-0">
              {product.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-slate-300">/</span>
            <span className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer shadow-xs"
              title="Copy link to product"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer shadow-xs ${
                isWishlisted 
                  ? 'border-red-200 bg-red-50 text-red-600 font-bold' 
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
              <span>{isWishlisted ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Multi-angle Photography Showcase (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Visual Box */}
            <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-white aspect-[4/3] sm:aspect-square flex items-center justify-center shadow-sm group">
              <ProductGraphic 
                type={product.iconType} 
                badge={product.badge} 
                angle={activeAngle}
                imageUrl={currentImageUrl}
                alt={`${product.name} - ${currentAngleObj?.label || 'View'}`}
                className="h-full w-full" 
              />

              {/* View Overlay Tag */}
              {galleryAngles && galleryAngles.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-mono font-bold bg-white/95 backdrop-blur-md text-slate-800 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 pointer-events-auto">
                    {currentAngleObj?.label || 'Studio View'}
                  </span>
                  <span className="text-xs font-mono text-slate-600 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200">
                    {galleryAngles.findIndex(a => a.view === activeAngle) + 1} / {galleryAngles.length} Views
                  </span>
                </div>
              )}
            </div>

            {/* Multi-angle Thumbnails Carousel */}
            {galleryAngles && galleryAngles.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span className="font-bold text-slate-800">Studio & Lifestyle Angles</span>
                  <span>Click thumbnail to switch view</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {galleryAngles.map((ang) => (
                    <button
                      key={ang.view}
                      type="button"
                      onClick={() => setActiveAngle(ang.view)}
                      className={`relative rounded-xl border p-1.5 text-left transition-all cursor-pointer bg-white overflow-hidden ${
                        activeAngle === ang.view
                          ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                          : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="h-16 sm:h-20 w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center pointer-events-none">
                        <ProductGraphic 
                          type={product.iconType} 
                          angle={ang.view} 
                          imageUrl={ang.imageUrl || (ang.view === 'hero' ? product.imageUrl : undefined)}
                          alt={ang.label}
                          className="h-full w-full scale-95" 
                        />
                      </div>
                      <p className={`text-[11px] truncate text-center mt-1.5 font-medium ${
                        activeAngle === ang.view ? 'text-blue-700 font-bold' : 'text-slate-600'
                      }`}>
                        {ang.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees & Protection Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-center text-xs text-slate-700">
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="font-bold">Free Express Delivery</span>
                <span className="text-[11px] text-slate-500">Across Pakistan &gt; Rs. 10,000</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-bold">{product.warranty}</span>
                <span className="text-[11px] text-slate-500">Official Direct Coverage</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <span className="font-bold">30-Day Money Back</span>
                <span className="text-[11px] text-slate-500">Zero-Hassle Return Policy</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Buying Actions & Specifications (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {product.categoryLabel}
                </span>
                
                <button
                  onClick={handleCopySku}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-mono transition-colors cursor-pointer"
                  title="Click to copy SKU"
                >
                  <span>SKU: {product.sku}</span>
                  {copiedSku ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating summary */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono font-bold text-slate-900">{product.rating.toFixed(1)}</span>
                <span className="text-slate-300">·</span>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  {product.reviewCount} Verified Reviews
                </button>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-mono font-medium">{product.totalSold}+ sold</span>
              </div>
            </div>

            {/* Price Module */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                      {formatPKR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-slate-400 line-through font-mono tabular-nums">
                        {formatPKR(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Inclusive of all GST, custom duties & free priority transit insurance
                  </p>
                </div>

                {product.originalPrice && (
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-lg">
                    Save {formatPKR(product.originalPrice - product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Inventory Status with Warehouse Details */}
            <div className={`p-4 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isOutOfStock
                ? 'bg-red-50 border-red-200 text-red-700'
                : isLowStock
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
                }`} />
                <span className="font-bold text-sm">
                  {isOutOfStock
                    ? 'Sold Out — Automated Restock in Transit'
                    : isLowStock
                    ? `Limited Stock: Only ${product.stock} units remaining`
                    : `In Stock: ${product.stock} units ready to dispatch`}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Hub Karachi / Lahore</span>
              </div>
            </div>

            {/* Color Finish Picker */}
            {product.colorOptions && product.colorOptions.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Color / Finish: <span className="text-slate-900 normal-case font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.colorOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs ring-1 ring-blue-600/30'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1 shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-mono font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer ${
                    isOutOfStock
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.99]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Sold Out</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag — {formatPKR(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Instant Checkout with Cash on Delivery / Card
              </button>
            </div>

            {/* Delivery & Payment Badges */}
            <div className="rounded-xl bg-slate-100/70 border border-slate-200 p-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <PackageCheck className="w-4 h-4 text-emerald-600" />
                <span>Express Order Fulfillment</span>
              </div>
              <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-600">
                <li>Orders confirmed before 2:00 PM ship same day</li>
                <li>Cash on Delivery (COD) available across 250+ cities in Pakistan</li>
                <li>Secure online payments via JazzCash, EasyPaisa, PayPak & Visa/Mastercard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Sections (Overview, Specs, Reviews) */}
        <div className="border-t border-slate-200 pt-10">
          <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Overview & Engineering
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === 'specs'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Technical Specifications ({product.specs.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Customer Reviews ({reviews.length})
            </button>
          </div>

          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Product Description</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Key Hardware Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feat, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 shadow-xs"
                    >
                      <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Technical Specifications */}
          {activeTab === 'specs' && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-200 bg-white shadow-xs">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs">
                    <span className="text-slate-500 font-medium">{spec.label}</span>
                    <span className="sm:col-span-2 text-slate-900 font-mono font-semibold">{spec.value}</span>
                  </div>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs">
                  <span className="text-slate-500 font-medium">Manufacturer / Global Supplier</span>
                  <span className="sm:col-span-2 text-slate-900 font-mono font-semibold">{product.supplier}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs">
                  <span className="text-slate-500 font-medium">Official Warranty Term</span>
                  <span className="sm:col-span-2 text-slate-900 font-mono font-semibold">{product.warranty}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs">
                  <span className="text-slate-500 font-medium">Authenticity Verification</span>
                  <span className="sm:col-span-2 text-emerald-700 font-mono font-semibold">100% Genuine Direct Import</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Customer Reviews */}
          {activeTab === 'reviews' && (
            <div className="max-w-4xl">
              <ReviewsSection
                productName={product.name}
                productId={product.id}
                reviews={reviews}
                onAddReview={onAddReview}
                onUpvoteReview={onUpvoteReview}
              />
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-200 pt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                  Recommended For You
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                  Frequently Paired Gear
                </h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                View Complete Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition-all p-4 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="h-40 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center mb-3">
                    <ProductGraphic 
                      type={p.iconType} 
                      imageUrl={p.imageUrl} 
                      alt={p.name}
                      className="h-full w-full" 
                    />
                  </div>
                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {p.categoryLabel}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {p.name}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {formatPKR(p.price)}
                      </span>
                      <span className="text-[11px] text-blue-600 font-semibold group-hover:underline">
                        View Specs →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
