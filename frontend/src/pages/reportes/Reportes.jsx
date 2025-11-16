import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  FileText,
  ShoppingCart,
  BarChart2,
} from "lucide-react";

export default function Reportes() {
  const navigate = useNavigate();

  const [exportaciones] = useState([
    { id: 1, nombre: "Reporte de Inventario", fecha: "2024-01-15 14:30", usuario: "Admin", formato: "PDF" },
    { id: 2, nombre: "Reporte de Ventas", fecha: "2024-01-15 10:15", usuario: "Vendedor1", formato: "Excel" },
    { id: 3, nombre: "Reporte de Compras", fecha: "2024-01-14 16:45", usuario: "Admin", formato: "PDF" },
    { id: 4, nombre: "Análisis de Stock", fecha: "2024-01-14 12:20", usuario: "Admin", formato: "Excel" },
  ]);

  const reportCards = [
    {
      title: "Inventario",
      description: "Control de stock y productos. Genera reportes por categoría, estado y stock mínimo.",
      icon: "📋",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      hoverShadow: "shadow-blue-500/30",
      path: "/reportes/inventario"
    },
    {
      title: "Compras",
      description: "Analiza compras por proveedor, producto, fechas y responsables.",
      icon: "🛒",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      hoverShadow: "shadow-green-500/30",
      path: "/reportes/compras"
    },
    {
      title: "Ventas",
      description: "Revisa ventas por cliente, producto, períodos y vendedores asignados.",
      icon: "📊",
      gradient: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-600",
      hoverShadow: "shadow-indigo-500/30",
      path: "/reportes/ventas"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header Moderno */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate ("/dashboard")}
                className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                title="Volver al panel"
              >
                <span className="text-2xl group-hover:-translate-x-1 inline-block transition-all duration-200">←</span>
              </button>
              
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white"></div>
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">MARSER PERÚ SAC</h1>
                <p className="text-xs text-gray-500">Sistema de Reportes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Análisis y Reportes
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Gestión de <span className="text-blue-600">Reportes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Genera informes detallados sobre inventario, compras y ventas para tomar mejores decisiones
            </p>
          </div>

          {/* Tarjetas de Reportes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reportCards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate (card.path)}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Efecto de fondo en hover */}
                <div className={`absolute inset-0 ${card.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Contenido */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${card.hoverShadow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <span className="text-3xl">{card.icon}</span>
                  </div>
                  
                  <h3 className={`font-bold text-gray-900 mb-2 text-xl group-hover:${card.textColor} transition-colors`}>
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-4 group-hover:text-gray-700 transition-colors">
                    {card.description}
                  </p>
                  
                  <button className={`w-full bg-gradient-to-r ${card.gradient} text-white py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105`}>
                    <span>Generar Reporte</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </div>
                
                {/* Decoración */}
                <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${card.bgColor} rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 blur-2xl`}></div>
              </div>
            ))}
          </div>

          {/* Historial de Exportaciones */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-blue-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">⬇️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Historial de Exportaciones</h3>
                    <p className="text-sm text-gray-500">{exportaciones.length} reportes generados recientemente</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Reporte
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Formato
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {exportaciones.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            item.formato === 'PDF' 
                              ? 'bg-red-50 text-red-600' 
                              : 'bg-green-50 text-green-600'
                          }`}>
                            <span className="text-xl">{item.formato === 'PDF' ? '📄' : '📊'}</span>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">{item.nombre}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="text-base">📅</span>
                          <span>{item.fecha}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                            {item.usuario.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-600">{item.usuario}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                          item.formato === 'PDF'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-green-50 text-green-700 border border-green-200'
                        }`}>
                          {item.formato === 'PDF' ? '📄 PDF' : '📊 Excel'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105 font-medium text-sm">
                          <span className="text-base">⬇️</span>
                          <span>Descargar</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
