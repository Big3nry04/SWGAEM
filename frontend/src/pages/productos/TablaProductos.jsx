import React from 'react';
import { Edit2, Trash2 } from "lucide-react";

export default function TablaProductos({ 
  productosActuales, 
  handleEditarProducto, 
  handleEliminarProducto,
  indexPrimero,
  indexUltimo,
  productosFiltrados,
  paginaActual,
  setPaginaActual,
  totalPaginas
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoría</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock Mín.</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {productosActuales.map((producto) => (
              <tr key={producto.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                <td className="px-6 py-4 text-sm text-gray-600 font-mono font-semibold">{producto.codigo}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{producto.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{producto.categoria}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">S/ {producto.precio.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{producto.stock}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{producto.stockMin}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${
                    producto.estado === 'Disponible' 
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : producto.estado === 'Bajo Stock'
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {producto.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditarProducto(producto)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110 group"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleEliminarProducto(producto.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 group"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-600 font-medium">
          Mostrando {indexPrimero + 1} a {Math.min(indexUltimo, productosFiltrados.length)} de {productosFiltrados.length} productos
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
            disabled={paginaActual === 1}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Anterior
          </button>
          {[...Array(totalPaginas)].map((_, i) => (
            <button 
              key={i + 1}
              onClick={() => setPaginaActual(i + 1)}
              className={`px-4 py-2 rounded-xl transition-all font-medium ${
                paginaActual === i + 1 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
            disabled={paginaActual === totalPaginas}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}