import React, { useState } from 'react';
import { Product, ProductReview } from '../types/store';
import { ProductGraphic } from './ProductGraphic';
import { ReviewsSection } from './ReviewsSection';
import { X, Check, Star, ShieldCheck, Truck, RefreshCw, Zap, Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatPKR } from '../utils/currency';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  reviews: ProductReview[];
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;
  onUpvoteReview: (productId: string, reviewId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  reviews,
  onAddReview,
  onUpvoteReview
}) => {
  if (!product) return null;

  const galleryAngles = product.galleryAngles || (
    product.iconType === 'headphones' 
      ? [
          { label: '3/4 Studio View', view: 'hero' as const },
          { label: 'Side Profile & Controls', view: 'side' as const },
          { label: 'Compact Folded Form', view: 'folded' as const },
          { label: 'Cloud Foam™ Ear Cushion', view: 'cushion' as const }
        ]
      : undefined
  );

  const [activeAngle, setActiveAngle] = useState<'hero' | 'side' | 'folded' | 'cushion'>('hero');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colorOptions?.[0]?.name
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.minThreshold;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="uppercase tracking-wider font-bold text-blue-600">
              {product.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{product.sku}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          {/* Main 2-column PDP grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Visual Showcase */}
            <div className="space-y-4">
              {(() => {
                const currentAngleObj = galleryAngles?.find(a => a.view === activeAngle);
                const currentImageUrl = currentAngleObj?.imageUrl || (activeAngle === 'hero' ? product.imageUrl : undefined);

                return (
                  <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 aspect-square flex items-center justify-center shadow-xs group">
                    <ProductGraphic 
                      type={product.iconType} 
                      badge={product.badge} 
                      angle={activeAngle}
                      imageUrl={currentImageUrl}
                      alt={`${product.name} - ${currentAngleObj?.label || 'View'}`}
                      className="h-full w-full" 
                    />

                    {galleryAngles && galleryAngles.length > 1 && (
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="text-[10px] font-mono font-bold bg-white/95 backdrop-blur-sm text-slate-700 px-2.5 py-1 rounded-md shadow-xs border border-slate-200 pointer-events-auto">
                          View: {currentAngleObj?.label || 'Studio'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-xs border border-slate-200">
                          {galleryAngles.findIndex(a => a.view === activeAngle) + 1} / {galleryAngles.length}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Multi-angle Gallery Thumbnails */}
              {galleryAngles && galleryAngles.length > 1 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 px-0.5">
                    <span className="font-bold text-slate-700">Official Product Views ({galleryAngles.length})</span>
                    <span className="text-slate-400 text-[10px]">Click image to inspect</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {galleryAngles.map((ang) => (
                      <button
                        key={ang.view}
                        type="button"
                        onClick={() => setActiveAngle(ang.view)}
                        className={`relative rounded-lg border p-1 text-left transition-all cursor-pointer bg-white overflow-hidden ${
                          activeAngle === ang.view
                            ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                        }`}
                        title={ang.label}
                      >
                        <div className="h-12 w-full overflow-hidden rounded bg-slate-50 flex items-center justify-center pointer-events-none">
                          <ProductGraphic 
                            type={product.iconType} 
                            angle={ang.view} 
                            imageUrl={ang.imageUrl || (ang.view === 'hero' ? product.imageUrl : undefined)}
                            alt={ang.label}
                            className="h-full w-full scale-90" 
                          />
                        </div>
                        <p className={`text-[10px] truncate text-center mt-1 font-medium ${
                          activeAngle === ang.view ? 'text-blue-700 font-bold' : 'text-slate-600'
                        }`}>
                          {ang.label.split(' ')[0]}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Guarantees Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center text-[11px] text-slate-600">
                <div className="flex flex-col items-center gap-1 p-2 rounded bg-slate-50 border border-slate-100">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Free Express Air</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{product.warranty}</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded bg-slate-50 border border-slate-100">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">30-Day Money Back</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="flex flex-col space-y-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Rating line */}
                <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
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
                  <span className="font-mono tabular-nums font-bold text-slate-800">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-300">·</span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    {product.reviewCount} customer reviews
                  </button>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                      {formatPKR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                        {formatPKR(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Includes all sales taxes & free priority transit insurance
                  </p>
                </div>

                {product.originalPrice && (
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded">
                    Save {formatPKR(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                isOutOfStock
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : isLowStock
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
                  }`} />
                  <span className="font-semibold">
                    {isOutOfStock
                      ? 'Out of Stock - Automated Reorder in Transit'
                      : isLowStock
                      ? `Urgent: Only ${product.stock} units remaining in warehouse`
                      : `In Stock: ${product.stock} units ready for immediate dispatch`}
                  </span>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">
                  Warehouse Hub Karachi / Lahore
                </span>
              </div>

              {/* Color Selection if available */}
              {product.colorOptions && product.colorOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Finish / Color: <span className="text-slate-900 normal-case font-semibold">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colorOptions.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Picker & Add to Cart */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-mono font-bold text-slate-900 tabular-nums">
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

                  {/* Add to Cart CTA */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer ${
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
                        <span>Added to Cart!</span>
                      </>
                    ) : isOutOfStock ? (
                      <span>Currently Sold Out</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart — {formatPKR(product.price * quantity)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation for Detailed Info */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Features & Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
                  activeTab === 'specs'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
                  activeTab === 'reviews'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Customer Reviews ({reviews.length})
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Product Description</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Key Engineering Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Technical Specifications */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-200 bg-white shadow-xs">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="sm:col-span-2 text-slate-900 font-mono font-semibold">{spec.value}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs">
                    <span className="text-slate-500 font-medium">Global Supplier</span>
                    <span className="sm:col-span-2 text-slate-900 font-mono font-semibold">{product.supplier}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs">
                    <span className="text-slate-500 font-medium">Warranty Coverage</span>
                    <span className="sm:col-span-2 text-slate-900 font-mono font-semibold">{product.warranty}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <ReviewsSection
                productName={product.name}
                productId={product.id}
                reviews={reviews}
                onAddReview={onAddReview}
                onUpvoteReview={onUpvoteReview}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
