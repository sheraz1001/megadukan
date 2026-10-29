import React from 'react';
import { Product } from '../types/store';
import { ProductGraphic } from './ProductGraphic';
import { Star, Plus, Check, AlertCircle } from 'lucide-react';
import { formatPKR } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isAdded = false
}) => {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.minThreshold;

  return (
    <div 
      className="group relative flex flex-col rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all duration-200 overflow-hidden hover:-translate-y-0.5"
    >
      {/* 1. Product Image / Graphic (65-75% visual weight) */}
      <div 
        onClick={() => onSelect(product)}
        className="cursor-pointer relative overflow-hidden bg-slate-50 aspect-[4/3] flex items-center justify-center border-b border-slate-100"
      >
        <ProductGraphic 
          type={product.iconType} 
          badge={product.badge} 
          imageUrl={product.imageUrl}
          alt={product.name}
          className="h-full w-full" 
        />
      </div>

      {/* 2. Content & Metadata */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Category & Rating single-line metadata without pills */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="uppercase tracking-wider font-bold text-[11px] text-blue-600">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1 text-slate-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono tabular-nums font-bold text-xs">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onSelect(product)}
          className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Short Tagline */}
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>

        {/* Stock Status Line without pill enclosure */}
        <div className="mt-3 text-xs flex items-center gap-1.5">
          {isOutOfStock ? (
            <span className="text-red-600 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-red-600" />
              <span>Out of stock</span>
            </span>
          ) : isLowStock ? (
            <span className="text-amber-700 font-semibold font-mono tabular-nums flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Only {product.stock} units left!</span>
            </span>
          ) : (
            <span className="text-emerald-700 font-mono tabular-nums text-[11px] font-medium">
              In stock ({product.stock} units)
            </span>
          )}
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="text-slate-400 font-mono text-[11px]">{product.sku}</span>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-[10px] text-emerald-700 font-semibold">
                Save {formatPKR(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-blue-600 text-white shadow-xs'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : isOutOfStock ? (
              <span>Sold Out</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
