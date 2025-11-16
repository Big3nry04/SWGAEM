import React, { useState } from 'react';
import { Download, Search, Filter } from "lucide-react";
import GestionInventario from './GestionInventario';
import { movimientosIniciales } from './InventarioData';

export default function MovimientosPage() {
  const [busquedaMovimientos, setBusquedaMovimientos] = useState('');
  const [mostrarFiltrosMovimientos, setMostrarFiltrosMovimientos] = useState(false);
  const [filtroMovimientos, setFiltroMovimientos] = useState('');

  const movimientosFiltrados = movimientosIniciales.filter(m => {
    const cumpleBusqueda = m.producto.toLowerCase().includes(busquedaMovimientos.toLowerCase()) ||
      m.motivo.toLowerCase().includes(busquedaMovimientos.toLowerCase()) ||
      m.categoria.toLowerCase().includes(busquedaMovimientos.toLowerCase());

    const cumpleTipo = !filtroMovimientos || m.tipo === filtroMovimientos;

    return cumpleBusqueda && cumpleTipo;
  });

  return (
    <GestionInventario>
      <div className="space-y-6">
        
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Historial de Movimientos</h2>
            <p className="text-gray-600 mt-1">Registro completo de entradas, salidas y ajustes de inventario</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Movimientos', value: movimientosIniciales.length, color: 'blue' },
            { label: 'Ingresos', value: movimientosIniciales.filter(m => m.tipo === 'Ingreso').length, color: 'green' },
            { label: 'Salidas', value: movimientosIniciales.filter(m => m.tipo === 'Salida').length, color: 'red' },
            { label: 'Ajustes', value: movimientosIniciales.filter(m => m.tipo === 'Ajuste').length, color: 'purple' }
          ].map((stat, idx) => {
            const colors = {
              blue: 'bg-blue-50 border-blue-200 text-blue-700',
              green: 'bg-green-50 border-green-200 text-green-700',
              red: 'bg-red-50 border-red-200 text-red-700',
              purple: 'bg-purple-50 border-purple-200 text-purple-700'
            };
            return (
              <div key={idx} className={`${colors[stat.color].split(' ')[0]} rounded-2xl border ${colors[stat.color].split(' ')[1]} shadow-sm p-6 text-center`}>
                <p className={`${colors[stat.color].split(' ')[2]} text-sm mb-2 font-semibold`}>{stat.label}</p>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
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
                placeholder="Buscar por producto o motivo..."
                value={busquedaMovimientos}
                onChange={(e) => setBusquedaMovimientos(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button 
              onClick={() => setMostrarFiltrosMovimientos(!mostrarFiltrosMovimientos)}
              className={`px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 font-medium ${
                mostrarFiltrosMovimientos 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>

          {mostrarFiltrosMovimientos && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-700 font-semibold">Tipo de Movimiento:</label>
                <select
                  value={filtroMovimientos}
                  onChange={(e) => setFiltroMovimientos(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="">Todos los movimientos</option>
                  <option value="Entrada">Entrada</option>
                  <option value="Salida">Salida</option>
                  <option value="Ingreso">Ingreso</option>
                  <option value="Ajuste">Ajuste</option>
                </select>
                <button
                  onClick={() => setFiltroMovimientos('')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-all font-medium"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Movimientos Recientes</h3>
          <p className="text-sm text-gray-600 mb-6">
            {movimientosFiltrados.length} movimiento{movimientosFiltrados.length !== 1 ? 's' : ''} encontrado{movimientosFiltrados.length !== 1 ? 's' : ''}
          </p>
          
          <div className="space-y-3">
            {movimientosFiltrados.length > 0 ? (
              movimientosFiltrados.map((mov) => (
                <div key={mov.id} className="bg-gradient-to-r from-gray-50 to-blue-50/20 rounded-2xl p-4 border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                          mov.tipo === 'Ingreso'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : mov.tipo === 'Salida' || mov.tipo === 'Entrada'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {mov.tipo}
                        </span>
                        <span className="text-gray-900 font-bold">{mov.producto}</span>
                        <span className="text-gray-600 text-sm">- {mov.categoria}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Cantidad</p>
                          <p className={`text-lg font-bold ${mov.cantidad > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {mov.cantidad > 0 ? '+' : ''}{mov.cantidad}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Fecha</p>
                          <p className="text-lg font-bold text-gray-900">{mov.fecha}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 font-medium">Motivo</p>
                        <p className="text-sm text-gray-900 mt-1">{mov.motivo}</p>
                        <p className="text-xs text-gray-600 mt-1">Usuario: {mov.usuario}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No se encontraron movimientos con los filtros aplicados</p>
              </div>
            )}
          </div>
        </div>

      </div> {/* ← CIERRE QUE FALTABA */}
    </GestionInventario>
  );
}
