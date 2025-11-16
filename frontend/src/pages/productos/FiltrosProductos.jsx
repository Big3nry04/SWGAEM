import React from 'react';
import { categorias } from './InventarioData';

export default function FiltrosProductos({ filtros, setFiltros, limpiarFiltros }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-gray-700 font-semibold mb-2">Categoría</label>
          <select
            value={filtros.categoria}
            onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-700 font-semibold mb-2">Estado</label>
          <select
            value={filtros.estado}
            onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="Disponible">Disponible</option>
            <option value="Bajo Stock">Bajo Stock</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-700 font-semibold mb-2">Stock Mínimo</label>
          <input
            type="number"
            value={filtros.stockMin}
            onChange={(e) => setFiltros({...filtros, stockMin: e.target.value})}
            placeholder="0"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-700 font-semibold mb-2">Stock Máximo</label>
          <input
            type="number"
            value={filtros.stockMax}
            onChange={(e) => setFiltros({...filtros, stockMax: e.target.value})}
            placeholder="999"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={limpiarFiltros}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-all font-medium"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
}