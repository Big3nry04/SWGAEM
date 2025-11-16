import React, { useState } from 'react';
import { Download, Search, Package, FileText, AlertCircle } from "lucide-react";
import GestionInventario from './GestionInventario';
import ModalIngresarStock from './ModalIngresarStock';
import { categorias, categoriasInventario, productosIniciales } from './InventarioData';

export default function ControlInventarioPage() {
  const productos = productosIniciales;
  const productosAlerta = productos.filter(p => p.stock <= p.stockMin);
  
  const stats = {
    totalProductos: 18,
    stockTotal: 889,
    alertasStock: productosAlerta.length,
    valorTotal: 34250.00
  };

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [mostrarModalStock, setMostrarModalStock] = useState(false);
  const [stockForm, setStockForm] = useState({
    cantidad: '',
    motivo: ''
  });

  const categoriasFiltradas = categoriaSeleccionada 
    ? categoriasInventario.filter(c => c.nombre === categoriaSeleccionada)
    : categoriasInventario;

  const handleIngresarStock = (categoriaNombre) => {
    setCategoriaSeleccionada(categoriaNombre);
    setMostrarModalStock(true);
  };

  const handleGuardarStock = () => {
    if (!stockForm.cantidad || !stockForm.motivo) {
      alert('Por favor completa todos los campos');
      return;
    }
    alert(`Stock ingresado: ${stockForm.cantidad} unidades en categoría ${categoriaSeleccionada}`);
    setStockForm({ cantidad: '', motivo: '' });
    setMostrarModalStock(false);
  };

  return (
    <GestionInventario>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Control de Inventario</h2>
            <p className="text-gray-600 mt-1">Vista general del estado del inventario y estadísticas</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Productos', value: stats.totalProductos, sublabel: 'Productos registrados', icon: Package, color: 'blue' },
            { label: 'Stock Total', value: stats.stockTotal, sublabel: 'Unidades en stock', icon: FileText, color: 'green' },
            { label: 'Alertas de Stock', value: stats.alertasStock, sublabel: 'Productos con stock bajo', icon: AlertCircle, color: 'red' },
            { label: 'Valor Total', value: `S/ ${stats.valorTotal.toLocaleString()}`, sublabel: 'Valor del inventario', icon: Package, color: 'purple' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colors = {
              blue: 'from-blue-500 to-blue-600 bg-blue-50 border-blue-200 text-blue-700',
              green: 'from-green-500 to-green-600 bg-green-50 border-green-200 text-green-700',
              red: 'from-red-500 to-red-600 bg-red-50 border-red-200 text-red-700',
              purple: 'from-purple-500 to-purple-600 bg-purple-50 border-purple-200 text-purple-700'
            };
            return (
              <div key={idx} className={`${colors[stat.color].split(' ')[2]} rounded-2xl border ${colors[stat.color].split(' ')[3]} p-6 shadow-sm`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`${colors[stat.color].split(' ')[4]} text-sm font-semibold`}>{stat.label}</h3>
                  <div className={`w-10 h-10 bg-gradient-to-br ${colors[stat.color].split(' ')[0]} ${colors[stat.color].split(' ')[1]} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs ${colors[stat.color].split(' ')[4]} mt-1`}>{stat.sublabel}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por producto o código..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Inventario por Categoría</h3>
          <p className="text-sm text-gray-600 mb-6">Distribución por categoría y stock de categoría</p>
          
          <div className="space-y-4">
            {categoriasFiltradas.map((cat, idx) => (
              <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-5 border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg">{cat.nombre}</h4>
                    <p className="text-sm text-gray-600 mt-1">{cat.productos} productos</p>
                  </div>
                  <button 
                    onClick={() => handleIngresarStock(cat.nombre)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    + Ingresar Stock
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Stock Total</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{cat.stockTotal}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Stock Mínimo</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">-</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Valor</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">S/ {cat.valorTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {mostrarModalStock && (
        <ModalIngresarStock 
          categoriaSeleccionada={categoriaSeleccionada}
          stockForm={stockForm}
          setStockForm={setStockForm}
          handleGuardarStock={handleGuardarStock}
          setMostrarModalStock={setMostrarModalStock}
        />
      )}
    </GestionInventario>
  );
}