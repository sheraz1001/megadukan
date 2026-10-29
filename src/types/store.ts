export type ProductCategory = 
  | 'all'
  | 'speakers'
  | 'earbuds'
  | 'gadgets'
  | 'mobile-accessories'
  | 'cctv-cameras'
  | 'computer-accessories';

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1 - 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  features: string[];
  specs: ProductSpec[];
  warranty: string;
  // Inventory state
  stock: number;
  minThreshold: number; // Auto-reorder trigger point
  reorderQuantity: number;
  autoReorderEnabled: boolean;
  costPrice: number;
  supplier: string;
  totalSold: number;
  iconType: 'speaker' | 'earbuds' | 'gadget' | 'cable-charger' | 'cctv' | 'keyboard' | 'mouse' | 'soundbar' | 'headphones';
  imageUrl?: string;
  galleryAngles?: { label: string; view: 'hero' | 'side' | 'folded' | 'cushion'; imageUrl?: string }[];
  featured?: boolean;
  badge?: string;
  colorOptions?: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethodType = 'credit_card' | 'upi' | 'paypal' | 'cod' | 'apple_pay';

export interface PaymentDetails {
  method: PaymentMethodType;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
  upiId?: string;
  is3dSecureApproved?: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'authorized' | 'paid' | 'pending_cod';
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
}

export interface RestockEvent {
  id: string;
  timestamp: string;
  sku: string;
  productName: string;
  quantity: number;
  cost: number;
  triggeredBy: 'automated_system' | 'manual_admin';
  status: 'completed' | 'in_transit';
}
