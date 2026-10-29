import React, { useState } from 'react';
import { Product, RestockEvent, ProductCategory } from '../types/store';
import { 
  Box, AlertTriangle, Plus, Minus, RefreshCw, 
  Check, Cpu, TrendingUp, Layers, History
} from 'lucide-react';
import { formatPKR, formatPKRCompact } from '../utils/currency';

interface InventoryManagerProps {
  products: Product[];
  restockEvents: RestockEvent[];
  onUpdateStock: (productId: string, newStock: number) => void;
  onRestockProduct: (productId: string, quantity: number, isAutomated?: boolean) => void;
  onToggleAutoReorder: (productId: string) => void;
  onUpdateThreshold: (productId: string, newThreshold: number) => void;
  onAddNewProduct: (newProduct: Product) => void;
  onBackToStore: () => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  products,
  restockEvents,
  onUpdateStock,
  onRestockProduct,
  onToggleAutoReorder,
  onUpdateThreshold,
  onAddNewProduct,
  onBackToStore
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'low' | 'healthy'>('all');
  const [searchSKU, setSearchSKU] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [restockSuccessId, setRestockSuccessId] = useState<string | null>(null);

  // New product form in PKR
  const [newSku, setNewSku] = useState('MD-NEW-01');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('gadgets');
  const [newStock, setNewStock] = useState(25);
  const [newThreshold, setNewThreshold] = useState(5);
  const [newReorderQty, setNewReorderQty] = useState(20);
  const [newPrice, setNewPrice] = useState(24900);
  const [newCost, setNewCost] = useState(12000);
  const [newSupplier, setNewSupplier] = useState('Global Tech Distribution');

  // Compute Metrics
  const totalUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValuation = products.reduce((acc, p) => acc + (p.stock * p.price), 0);
  const lowStockItems = products.filter(p => p.stock <= p.minThreshold);
  const totalSoldUnits = products.reduce((acc, p) => acc + p.totalSold, 0);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchSKU.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchSKU.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchSKU.toLowerCase());
    if (!matchesSearch) return false;
    if (filterMode === 'low') return p.stock <= p.minThreshold;
    if (filterMode === 'healthy') return p.stock > p.minThreshold;
    return true;
  });

  const handleQuickRestock = (p: Product) => {
    onRestockProduct(p.id, p.reorderQuantity, false);
    setRestockSuccessId(p.id);
    setTimeout(() => setRestockSuccessId(null), 1800);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const createdProduct: Product = {
      id: `md-custom-${Date.now()}`,
      sku: newSku.trim().toUpperCase(),
      name: newName.trim(),
      category: newCategory,
      categoryLabel: newCategory.replace('-', ' ').toUpperCase(),
      tagline: 'High quality consumer electronics item',
      description: 'Manufactured with high standards and reliable circuitry.',
      price: Number(newPrice),
      rating: 4.8,
      reviewCount: 0,
      stock: Number(newStock),
      minThreshold: Number(newThreshold),
      reorderQuantity: Number(newReorderQty),
      autoReorderEnabled: true,
      costPrice: Number(newCost),
      supplier: newSupplier.trim(),
      totalSold: 0,
      iconType: 'gadget',
      warranty: '1 Year Warranty',
      features: ['Automated inventory tracking', 'High build quality', 'Certified components'],
      specs: [
        { label: 'Category', value: newCategory },
        { label: 'SKU Code', value: newSku }
      ]
    };

    onAddNewProduct(createdProduct);
    setShowAddModal(false);
    setNewName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Context */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Automated Inventory Management Suite
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry, auto-reorder replenishment threshold rules, and automated supplier Purchase Orders (PO).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New SKU</span>
          </button>

          <button
            onClick={onBackToStore}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Return to Store
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>Total Units In Stock</span>
            <Box className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalUnits.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Across {products.length} distinct active SKUs
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>Inventory Valuation</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {formatPKR(totalValuation)}
          </div>
          <span className="text-[11px] text-emerald-700 font-mono font-medium mt-1 block">
            Active retail stock value
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>Low-Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-mono tabular-nums">
            {lowStockItems.length}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {lowStockItems.length > 0 ? 'Automated POs dispatched' : 'All levels healthy'}
          </span>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>Sales Velocity</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalSoldUnits.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Total units dispatched
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              filterMode === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200'
            }`}
          >
            All SKUs ({products.length})
          </button>
          <button
            onClick={() => setFilterMode('low')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              filterMode === 'low'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200'
            }`}
          >
            Low Stock Alerts ({lowStockItems.length})
          </button>
          <button
            onClick={() => setFilterMode('healthy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              filterMode === 'healthy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200'
            }`}
          >
            Healthy Stock ({products.length - lowStockItems.length})
          </button>
        </div>

        <input
          type="text"
          value={searchSKU}
          onChange={(e) => setSearchSKU(e.target.value)}
          placeholder="Filter SKU or product..."
          className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-full sm:w-64"
        />
      </div>

      {/* Main Inventory Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
              <tr>
                <th className="p-4">SKU / Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stock Units</th>
                <th className="p-4">Trigger Threshold</th>
                <th className="p-4">Auto-Reorder</th>
                <th className="p-4">Retail Price</th>
                <th className="p-4">Supplier</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isCritical = p.stock <= p.minThreshold;
                const isOut = p.stock <= 0;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* SKU & Name */}
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="font-mono text-slate-400 text-[11px] font-medium">{p.sku}</div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="capitalize text-slate-600 font-mono text-[11px] font-medium">
                        {p.category.replace('-', ' ')}
                      </span>
                    </td>

                    {/* Stock level with controls */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 1))}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center cursor-pointer"
                          title="Decrement stock"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className={`w-12 text-center font-mono font-extrabold text-sm tabular-nums ${
                          isOut ? 'text-red-600' : isCritical ? 'text-amber-600' : 'text-emerald-700'
                        }`}>
                          {p.stock}
                        </span>

                        <button
                          onClick={() => onUpdateStock(p.id, p.stock + 1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center cursor-pointer"
                          title="Increment stock"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {isCritical && (
                        <div className="text-[10px] text-amber-700 font-bold flex items-center gap-1 mt-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Low stock trigger</span>
                        </div>
                      )}
                    </td>

                    {/* Reorder Threshold */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-slate-500 font-medium">Trigger at:</span>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={p.minThreshold}
                          onChange={(e) => onUpdateThreshold(p.id, parseInt(e.target.value) || 1)}
                          className="w-12 bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5 text-center text-xs text-slate-900 font-bold"
                        />
                        <span className="text-slate-400">units</span>
                      </div>
                    </td>

                    {/* Auto Reorder Toggle */}
                    <td className="p-4">
                      <button
                        onClick={() => onToggleAutoReorder(p.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer border ${
                          p.autoReorderEnabled
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {p.autoReorderEnabled ? '✓ Auto-PO ON' : 'Paused'}
                      </button>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Batch: +{p.reorderQuantity} units
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-mono tabular-nums">
                      <div className="text-slate-900 font-extrabold">{formatPKR(p.price)}</div>
                      <div className="text-slate-400 text-[10px]">Cost: {formatPKR(p.costPrice)}</div>
                    </td>

                    {/* Supplier */}
                    <td className="p-4 text-slate-600 text-xs">
                      {p.supplier}
                    </td>

                    {/* Quick Restock Action */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleQuickRestock(p)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          restockSuccessId === p.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200'
                        }`}
                      >
                        {restockSuccessId === p.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Restocked!</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Restock +{p.reorderQuantity}</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automated Restock Events Timeline */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Automated Reorder Event Log
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono font-medium">
            {restockEvents.length} events logged
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {restockEvents.slice(0, 6).map((ev) => (
            <div key={ev.id} className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${
                  ev.triggeredBy === 'automated_system' ? 'bg-amber-500 animate-pulse' : 'bg-blue-600'
                }`} />
                <div>
                  <span className="font-bold text-slate-900">{ev.productName}</span>
                  <span className="text-slate-400 font-mono ml-2 font-medium">({ev.sku})</span>
                  <div className="text-[11px] text-slate-500">
                    {ev.triggeredBy === 'automated_system' 
                      ? '🤖 Automated Supplier Purchase Order triggered by threshold breach' 
                      : '👤 Manual Administrator Replenishment'}
                  </div>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-emerald-700 font-bold">+{ev.quantity} Units</span>
                <div className="text-[10px] text-slate-400">{ev.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add SKU Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form 
            onSubmit={handleCreateProduct}
            className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-base font-extrabold text-slate-900">Add New Product to Inventory</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">SKU Code</label>
                <input
                  type="text"
                  required
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 uppercase font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-medium"
                >
                  <option value="speakers">Speakers</option>
                  <option value="earbuds">AirPods & Earbuds</option>
                  <option value="gadgets">Smart Gadgets</option>
                  <option value="cctv-cameras">CCTV Cameras</option>
                  <option value="mobile-accessories">Mobile Accessories</option>
                  <option value="computer-accessories">Computer Accessories</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. SonicBoom Portable Bluetooth 5.4"
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Stock</label>
                <input
                  type="number"
                  required
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Low-Stock Alert</label>
                <input
                  type="number"
                  required
                  value={newThreshold}
                  onChange={(e) => setNewThreshold(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Restock Qty</label>
                <input
                  type="number"
                  required
                  value={newReorderQty}
                  onChange={(e) => setNewReorderQty(parseInt(e.target.value) || 10)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Retail Selling Price (PKR)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Supplier / Factory</label>
                <input
                  type="text"
                  required
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm"
              >
                Register SKU
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
