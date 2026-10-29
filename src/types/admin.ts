export type AdminRole = 'super_admin' | 'operations_manager' | 'inventory_controller';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  roleLabel: string;
  avatar: string;
  lastLogin: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  description: string;
  minOrderPKR: number;
  isActive: boolean;
  usageCount: number;
  expiryDate: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  email: string;
  phone: string;
  subject: string;
  category: 'order_status' | 'warranty' | 'shipping' | 'product_inquiry' | 'general';
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  priority: 'normal' | 'urgent';
}

export interface StoreSettings {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  warehouseCity: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  masterCurrency: string;
  currencySymbol: string;
  autoInventoryReplenishment: boolean;
}
