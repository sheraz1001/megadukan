import React, { useState } from 'react';
import { 
  Truck, ShieldCheck, RefreshCw, Mail, Phone, MapPin, Search, 
  CheckCircle2, Clock, PackageCheck, AlertCircle, Send, ArrowRight,
  Headphones, CreditCard, Lock, FileText
} from 'lucide-react';
import { Order } from '../../types/store';
import { formatPKR } from '../../utils/currency';

interface PageProps {
  onNavigateHome: () => void;
  onExploreCatalog: () => void;
}

// 1. ABOUT PAGE
export const AboutPage: React.FC<PageProps> = ({ onNavigateHome, onExploreCatalog }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            About MegaDukan.com
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Pakistan’s Premier High-Performance Electronics Store
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Founded with a singular mission: eliminating counterfeit electronics and substandard imports by providing 100% genuine studio speakers, hybrid ANC headphones, 4K solar CCTV cameras, and precision PC hardware with verifiable manufacturer warranties.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">100% Factory Direct Genuine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every unit in our catalog is sourced directly through certified distributor channels. Zero third-party marketplace clutter or untested clones.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <Truck className="w-8 h-8 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Priority Logistics Nationwide</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dual fulfillment centers in Karachi and Lahore ensure 24–48 hour delivery across major metros, complete with Cash on Delivery (COD) and insured transit.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <RefreshCw className="w-8 h-8 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">2-Year Replacement Shield</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We stand behind our audio and gadget gear with comprehensive local replacement warranties and dedicated customer support desks.
            </p>
          </div>
        </div>

        {/* Story details */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Our Warehouse & Inspection Standards</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every product batch that enters the MegaDukan fulfillment hubs undergoes rigorous 5-point quality verification — validating serial authenticity, packaging integrity, acoustic diaphragm balance, and battery capacity. Our automated inventory management system ensures critical items are never out of stock.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-center">
            <div>
              <span className="text-2xl font-mono font-extrabold text-blue-600 block">18,500+</span>
              <span className="text-xs text-slate-500">Orders Delivered</span>
            </div>
            <div>
              <span className="text-2xl font-mono font-extrabold text-blue-600 block">250+</span>
              <span className="text-xs text-slate-500">Cities Covered</span>
            </div>
            <div>
              <span className="text-2xl font-mono font-extrabold text-blue-600 block">4.9 / 5.0</span>
              <span className="text-xs text-slate-500">Customer Rating</span>
            </div>
            <div>
              <span className="text-2xl font-mono font-extrabold text-blue-600 block">24h</span>
              <span className="text-xs text-slate-500">Avg Metro Dispatch</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={onExploreCatalog}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Current Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. SHIPPING & DELIVERY PAGE
export const ShippingPage: React.FC<PageProps> = ({ onExploreCatalog }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Logistics & Delivery
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Shipping Across Pakistan
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Reliable, tracked, and insured delivery powered by TCS, Leopard, and Trax Logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <Truck className="w-5 h-5" />
              <h3 className="text-base text-slate-900">Free Express Delivery</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All orders over <strong>Rs. 10,000</strong> qualify for 100% Free Priority Air Shipping across Pakistan. Standard orders below Rs. 10,000 incur a flat subsidized fee of Rs. 450.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Orders ≥ Rs. 10,000:</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Orders &lt; Rs. 10,000:</span>
                <span className="font-bold">Rs. 450 Flat</span>
              </div>
              <div className="flex justify-between">
                <span>Rush 24h Air Express:</span>
                <span className="font-bold">Rs. 950</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Clock className="w-5 h-5" />
              <h3 className="text-base text-slate-900">Dispatch Timelines</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orders placed before <strong>2:00 PM PST</strong> (Monday – Saturday) are dispatched from our Karachi or Lahore hub on the same working day.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li><strong>Karachi & Lahore:</strong> 24 hours</li>
              <li><strong>Islamabad & Rawalpindi:</strong> 24–48 hours</li>
              <li><strong>Peshawar, Multan, Faisalabad:</strong> 48 hours</li>
              <li><strong>Other regional cities:</strong> 2–4 working days</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Cash on Delivery (COD) & Pre-Payment</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We offer Cash on Delivery across 250+ cities in Pakistan up to Rs. 75,000 per order. For higher tier soundbars and enterprise PTZ cameras, prepayment via JazzCash, EasyPaisa, or Visa/Mastercard is recommended for expedited VIP processing.
          </p>
        </div>
      </div>
    </div>
  );
};

// 3. WARRANTY & RETURNS PAGE
export const WarrantyPage: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            MegaDukan Shield
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Warranty & 30-Day Money Back Guarantee
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Zero hassle. Straightforward replacement policies without prolonged service loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">2-Year Official Warranty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every audio item, CCTV camera, GaN charger, and mechanical keyboard purchased from MegaDukan.com is backed by a minimum of 18 months to 2 years full replacement warranty.
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Hardware failures & component defects covered 100%</li>
              <li>Acoustic driver imbalances replaced free of charge</li>
              <li>Battery performance degradation protection</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <RefreshCw className="w-8 h-8 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">30-Day Return Policy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you are not completely satisfied with your audio gear or gadget, you may return it within 30 days of delivery in its original packaging for an exchange or full refund.
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Item must include all original packaging and cables</li>
              <li>Free courier pickup arranged for eligible returns</li>
              <li>Refunds processed within 3 business days</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900">How to File a Warranty Claim</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Simply reach out to our support desk via the Contact Us page or WhatsApp support with your Order ID (e.g. <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600">MD-ORD-XXXX</code>) and a 10-second video demonstrating the issue. Our technicians will authorize immediate replacement dispatch.
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. CONTACT & SUPPORT PAGE (with live ticket submission)
export const ContactPage: React.FC<PageProps> = () => {
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'order_status',
    subject: '',
    message: ''
  });
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.name || !ticketForm.email || !ticketForm.message) return;

    const ticketNumber = `MD-TCK-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(ticketNumber);
    setTicketForm({
      name: '',
      email: '',
      phone: '',
      category: 'order_status',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Customer Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Contact MegaDukan Support
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Our technical support specialists and order desk are available Monday to Saturday, 9:00 AM – 8:00 PM PST.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-center">
            <Phone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Direct Helpline</h4>
            <p className="text-xs text-slate-500 font-mono">+92 (21) 3584-9210</p>
            <p className="text-[11px] text-slate-400">Toll-free across Pakistan</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-center">
            <Mail className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Email Support</h4>
            <p className="text-xs text-slate-500 font-mono">support@megadukan.com</p>
            <p className="text-[11px] text-slate-400">Response within 2 hours</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-center">
            <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Fulfillment Hub</h4>
            <p className="text-xs text-slate-500">Phase 2 Ext, DHA Karachi</p>
            <p className="text-[11px] text-slate-400">Regional Center: Gulberg III, Lahore</p>
          </div>
        </div>

        {/* Support Ticket Submission Form */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
          {submittedTicket ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Support Ticket Created Successfully!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your ticket has been logged into our support ticketing system under reference:
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 font-mono text-base font-extrabold text-blue-600">
                {submittedTicket}
              </div>
              <p className="text-xs text-slate-500">
                A confirmation has been sent to your email. Our specialist will respond within 2 hours.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Create a Support Request</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Need help with an order, product compatibility, or warranty exchange? Submit a ticket below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={ticketForm.name}
                    onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                    placeholder="e.g. Asad Siddiqui"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={ticketForm.email}
                    onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={ticketForm.phone}
                    onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="order_status">Order Status & Tracking</option>
                    <option value="warranty">Warranty & Replacement Claim</option>
                    <option value="shipping">Delivery & Address Change</option>
                    <option value="product_inquiry">Product Specs & Compatibility</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  placeholder="Brief summary of your question"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                  placeholder="Please describe how we can help you..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket to Support Team</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. ORDER TRACKING PAGE
interface TrackOrderPageProps extends PageProps {
  orders: Order[];
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.trim().toLowerCase();
    const match = orders.find(
      o => o.id.toLowerCase() === q || 
           o.trackingNumber.toLowerCase() === q ||
           o.shippingAddress.phone.includes(q) ||
           o.shippingAddress.email.toLowerCase() === q
    );

    setFoundOrder(match || null);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Live Courier Telemetry
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Track Your MegaDukan Order
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Enter your Order ID (e.g. <code className="font-mono text-blue-600">MD-ORD-XXXX</code>) or registered phone number.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID (e.g. MD-ORD-8821) or phone number"
              className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer shrink-0"
          >
            Track Order
          </button>
        </form>

        {/* Results */}
        {searched && (
          <div>
            {foundOrder ? (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs text-slate-500">Order Reference</span>
                    <h3 className="text-lg font-mono font-extrabold text-slate-900">{foundOrder.id}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Placed on {foundOrder.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Status: {foundOrder.status.toUpperCase()}
                    </span>
                    <p className="text-xs text-slate-500 font-mono mt-1">Airway Bill: {foundOrder.trackingNumber}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-3">
                  <div className="grid grid-cols-4 text-center text-xs font-bold text-slate-700">
                    <div className="text-blue-600">Confirmed</div>
                    <div className={foundOrder.status !== 'confirmed' ? 'text-blue-600' : 'text-slate-400'}>Processing</div>
                    <div className={['shipped', 'delivered'].includes(foundOrder.status) ? 'text-blue-600' : 'text-slate-400'}>In Transit</div>
                    <div className={foundOrder.status === 'delivered' ? 'text-emerald-600' : 'text-slate-400'}>Delivered</div>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{
                        width: foundOrder.status === 'confirmed' ? '25%' :
                               foundOrder.status === 'processing' ? '50%' :
                               foundOrder.status === 'shipped' ? '75%' : '100%'
                      }}
                    />
                  </div>
                </div>

                {/* Items and Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Delivery Address</h4>
                    <p className="text-slate-600 font-medium">{foundOrder.shippingAddress.fullName}</p>
                    <p className="text-slate-500">{foundOrder.shippingAddress.addressLine1}</p>
                    <p className="text-slate-500">{foundOrder.shippingAddress.city}, {foundOrder.shippingAddress.country}</p>
                    <p className="text-slate-500 font-mono mt-1">Phone: {foundOrder.shippingAddress.phone}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Order Summary</h4>
                    <div className="space-y-1.5">
                      {foundOrder.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between text-slate-600">
                          <span>{i.quantity}x {i.product.name}</span>
                          <span className="font-mono font-bold text-slate-900">{formatPKR(i.product.price * i.quantity)}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                        <span>Total Paid:</span>
                        <span className="font-mono text-blue-600">{formatPKR(foundOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2 shadow-xs">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">No matching order found</h3>
                <p className="text-xs text-slate-500">
                  Please verify your Order ID or phone number. If you just placed your order, allow 5 minutes for carrier sync.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// 6. TERMS & PRIVACY PAGE
export const TermsPage: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            Legal & Compliance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Terms of Service & Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: October 2026 · MegaDukan.com Pakistan</p>
        </div>

        <div className="space-y-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">1. Authenticity Guarantee</h3>
            <p>
              MegaDukan.com guarantees that all consumer electronics, audio gear, CCTV cameras, and computer accessories sold through this platform are 100% authentic, legally imported, and backed by verifiable manufacturer warranties.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">2. Payment Security & PCI-DSS Compliance</h3>
            <p>
              All online card transactions are processed through 256-bit encrypted bank payment gateways with mandatory 3D Secure OTP verification. MegaDukan never stores raw credit card CVVs or card credentials.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">3. Cash on Delivery (COD)</h3>
            <p>
              COD orders are subjected to phone or SMS dispatch verification. Refusal of delivery without valid cause may result in restriction of COD privileges for future orders.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">4. Privacy & Data Protection</h3>
            <p>
              Customer shipping addresses and telephone numbers are shared exclusively with authorized logistics partners (TCS, Leopard, Trax) strictly for package delivery purposes and are never sold or rented.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
