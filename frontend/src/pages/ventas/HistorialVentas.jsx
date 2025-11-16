import React, { useState } from 'react';
import { Filter, FileText, Search } from "lucide-react";

export default function HistorialVentas() {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    fechaInicio: '',
    fechaFin: '',
    vendedor: '',
    estado: '',
    montoMin: '',
    montoMax: ''
  });

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      fechaInicio: '',
      fechaFin: '',
      vendedor: '',
      estado: '',
      montoMin: '',
      montoMax: ''
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Historial de Ventas</h2>
        <p className="text-gray-600 text-sm mt-1">Consulte y filtre el historial de transacciones</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cliente, ID o documento..."
                value={filtros.busqueda}
                onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button 
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`px-6 py-2.5 ${mostrarFiltros ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} rounded-lg flex items-center gap-2 border border-gray-300 transition-all`}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {mostrarFiltros && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros Avanzados</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use los filtros para encontrar ventas específicas
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-2">Fecha Inicio</label>
                <input
                  type="date"
                  value={filtros.fechaInicio}
                  onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-2">Fecha Fin</label>
                <input
                  type="date"
                  value={filtros.fechaFin}
                  onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-2">Vendedor</label>
                <select
                  value={filtros.vendedor}
                  onChange={(e) => setFiltros({ ...filtros, vendedor: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos los vendedores</option>
                  <option value="Juan Perez">Juan Pérez</option>
                  <option value="Maria Gomez">María Gómez</option>
                  <option value="Carlos Lopez">Carlos López</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-2">Estado</label>
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos los estados</option>
                  <option value="Completada">Completada</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Anulada">Anulada</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-2">Monto Mínimo</label>
                <input
                  type="number"
                  step="0.01"
                  value={filtros.montoMin}
                  onChange={(e) => setFiltros({ ...filtros, montoMin: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-2">Monto Máximo</label>
                <input
                  type="number"
                  step="0.01"
                  value={filtros.montoMax}
                  onChange={(e) => setFiltros({ ...filtros, montoMax: e.target.value })}
                  placeholder="9999.99"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={limpiarFiltros}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-all"
              >
                Limpiar Filtros
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-2 transition-all">
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Resultados de Búsqueda</h3>
            <p className="text-sm text-gray-600">Ventas que coinciden con los filtros aplicados</p>
          </div>
        </div>

        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <FileText className="mx-auto text-gray-300 mb-3 w-12 h-12" />
          <p className="text-gray-600 font-medium">0 ventas encontradas</p>
          <p className="text-sm text-gray-400 mt-1">
            No se encontraron ventas que coincidan con los filtros aplicados.
          </p>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Total de ventas: 0
          </p>
          <p className="text-lg font-bold text-gray-900">
            Total: <span className="text-blue-600">S/ 0.00</span>
          </p>
        </div>
      </div>
    </div>
  );
}