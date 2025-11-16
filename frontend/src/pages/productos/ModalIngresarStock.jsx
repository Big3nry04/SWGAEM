import React from 'react';
import { X, Save } from "lucide-react";

export default function ModalIngresarStock({ 
  categoriaSeleccionada, 
  stockForm, 
  setStockForm, 
  handleGuardarStock, 
  setMostrarModalStock 
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Ingresar Stock</h3>
            <p className="text-sm text-gray-600 mt-1">Categoría: {categoriaSeleccionada}</p>
          </div>
          <button 
            onClick={() => setMostrarModalStock(false)}
            className="p-2 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 text-red-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cantidad <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              value={stockForm.cantidad}
              onChange={(e) => setStockForm({...stockForm, cantidad: e.target.value})}
              placeholder="0"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Motivo <span className="text-red-600">*</span>
            </label>
            <textarea
              value={stockForm.motivo}
              onChange={(e) => setStockForm({...stockForm, motivo: e.target.value})}
              placeholder="Describe el motivo del ingreso de stock"
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setMostrarModalStock(false)}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardarStock}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
          >
            <Save className="w-5 h-5" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}