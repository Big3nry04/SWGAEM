import React, { useState } from "react";
import { ArrowLeft, Filter, CalendarDays, ShoppingCart, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReporteCompras() {
    const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    proveedor: "Todos los proveedores",
    producto: "Todos los productos",
    responsable: "Todos los responsables",
  });

  const [mostrarResultados, setMostrarResultados] = useState(false);

  // 📦 Datos simulados
  const comprasData = [
    { id: "C-2024-001", fecha: "2024-01-15", proveedor: "TechSupply S.A.", producto: "Laptop Dell Inspiron 15", cantidad: 10, costoUnit: 2500, responsable: "Carlos Mendoza" },
    { id: "C-2024-002", fecha: "2024-01-14", proveedor: "Accesorios Pro", producto: "Mouse inalámbrico Logitech", cantidad: 50, costoUnit: 45, responsable: "Ana García" },
    { id: "C-2024-003", fecha: "2024-01-13", proveedor: "Monitores Express", producto: "Monitor Samsung 24 pulgadas", cantidad: 15, costoUnit: 1750, responsable: "Luis Rodríguez" },
    { id: "C-2024-004", fecha: "2024-01-12", proveedor: "Gaming Store", producto: "Teclado Mecánico RGB", cantidad: 25, costoUnit: 120, responsable: "María López" },
    { id: "C-2024-005", fecha: "2024-01-11", proveedor: "Oficina Total", producto: "Impresora HP LaserJet", cantidad: 8, costoUnit: 700, responsable: "Carlos Mendoza" },
    { id: "C-2024-006", fecha: "2024-01-10", proveedor: "Accesorios Pro", producto: "Webcam HD 1080p", cantidad: 20, costoUnit: 90, responsable: "Ana García" },
    { id: "C-2024-007", fecha: "2024-01-09", proveedor: "TechSupply S.A.", producto: "Tablet Samsung Galaxy", cantidad: 12, costoUnit: 950, responsable: "Luis Rodríguez" },
    { id: "C-2024-008", fecha: "2024-01-08", proveedor: "Audio Solutions", producto: "Auriculares Bluetooth", cantidad: 30, costoUnit: 85, responsable: "María López" },
    { id: "C-2024-009", fecha: "2024-01-07", proveedor: "Oficina Total", producto: "Silla Ergonómica", cantidad: 5, costoUnit: 980, responsable: "Carlos Mendoza" },
    { id: "C-2024-010", fecha: "2024-01-06", proveedor: "Gaming Store", producto: "Mousepad Gaming XL", cantidad: 40, costoUnit: 25, responsable: "Ana García" },
  ];

  // 📅 Filtrado dinámico
  const comprasFiltradas = comprasData.filter((compra) => {
    const fechaCompra = new Date(compra.fecha);
    const desde = filtros.fechaInicio ? new Date(filtros.fechaInicio) : null;
    const hasta = filtros.fechaFin ? new Date(filtros.fechaFin) : null;

    const coincideProveedor =
      filtros.proveedor === "Todos los proveedores" || compra.proveedor === filtros.proveedor;
    const coincideProducto =
      filtros.producto === "Todos los productos" || compra.producto === filtros.producto;
    const coincideResponsable =
      filtros.responsable === "Todos los responsables" || compra.responsable === filtros.responsable;
    const coincideFecha =
      (!desde || fechaCompra >= desde) && (!hasta || fechaCompra <= hasta);

    return coincideProveedor && coincideProducto && coincideResponsable && coincideFecha;
  });

  // 📊 Totales
  const totalCompras = comprasFiltradas.length;
  const montoTotal = comprasFiltradas.reduce((sum, c) => sum + c.cantidad * c.costoUnit, 0);
  const promedioCompra = totalCompras ? montoTotal / totalCompras : 0;

  // 🧮 Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleGenerar = () => setMostrarResultados(true);
  const handleLimpiar = () => {
    setFiltros({
      fechaInicio: "",
      fechaFin: "",
      proveedor: "Todos los proveedores",
      producto: "Todos los productos",
      responsable: "Todos los responsables",
    });
    setMostrarResultados(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-white">
      {/* Header Moderno */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/reportes")}
                className="p-2 hover:bg-green-50 rounded-xl transition-all duration-200 group"
                title="Volver"
              >
                <span className="text-2xl group-hover:-translate-x-1 inline-block transition-all duration-200">←</span>
              </button>
              
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                  <span className="text-2xl">🛒</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">Reporte de Compras</h1>
                <p className="text-xs text-gray-500">Historial de Adquisiciones</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                📊 Análisis de Compras
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Reporte de <span className="text-green-600">Compras</span>
            </h2>
            <p className="text-gray-600">
              Analiza y filtra las compras realizadas por proveedor, producto y período
            </p>
          </div>

          {/* Panel de Filtros */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-green-50/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🔍</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h3>
                  <p className="text-sm text-gray-500">Configura los parámetros para generar tu reporte</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Fecha Inicio</label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={filtros.fechaInicio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Fecha Fin</label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={filtros.fechaFin}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🏢 Proveedor</label>
                  <select
                    name="proveedor"
                    value={filtros.proveedor}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option>Todos los proveedores</option>
                    {[...new Set(comprasData.map((v) => v.proveedor))].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📦 Producto</label>
                  <select
                    name="producto"
                    value={filtros.producto}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option>Todos los productos</option>
                    {[...new Set(comprasData.map((v) => v.producto))].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">👤 Responsable</label>
                  <select
                    name="responsable"
                    value={filtros.responsable}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option>Todos los responsables</option>
                    {[...new Set(comprasData.map((v) => v.responsable))].map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerar}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                >
                  <span>📊</span>
                  <span>Generar Reporte</span>
                </button>
                <button
                  onClick={handleLimpiar}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium transition-all duration-200"
                >
                  <span>🔄</span>
                  <span>Limpiar Filtros</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          {!mostrarResultados ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Listo para generar reporte</h3>
              <p className="text-gray-500">Configura los filtros y haz clic en "Generar Reporte"</p>
            </div>
          ) : (
            <>
              {/* Tarjetas Resumen */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🛒</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Compras</p>
                      <h3 className="text-2xl font-bold text-gray-900">{totalCompras}</h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Monto Total</p>
                      <h3 className="text-2xl font-bold text-gray-900">S/ {montoTotal.toFixed(2)}</h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">📊</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Promedio por Compra</p>
                      <h3 className="text-2xl font-bold text-gray-900">S/ {promedioCompra.toFixed(2)}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabla de Resultados */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-green-50/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="text-xl">📋</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Resultados del Reporte</h3>
                        <p className="text-sm text-gray-500">{comprasFiltradas.length} compras encontradas</p>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-green-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                      <span>⬇️</span>
                      <span>Exportar</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">N° Compra</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Proveedor</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Producto</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Cant.</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Costo Unit.</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Costo Total</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Responsable</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {comprasFiltradas.map((c) => (
                        <tr key={c.id} className="hover:bg-green-50/30 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-semibold text-gray-900">{c.id}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="text-base">📅</span>
                              <span className="text-sm text-gray-600">{c.fecha}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{c.proveedor}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">{c.producto}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">{c.cantidad}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-sm text-gray-600">S/ {c.costoUnit.toFixed(2)}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-sm font-bold text-green-600">S/ {(c.cantidad * c.costoUnit).toFixed(2)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                                {c.responsable.charAt(0)}
                              </div>
                              <span className="text-sm text-gray-600">{c.responsable}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
