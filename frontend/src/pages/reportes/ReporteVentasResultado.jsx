import { useState } from "react";
import { FileDown, TrendingUp, Users, ShoppingBag } from "lucide-react";

export default function ReporteVentas() {
  // 🔹 Datos simulados
  const ventasData = [
    { id: "V-2024-001", fecha: "2024-01-15", cliente: "Corporación ABC S.A.C.", producto: "Laptop Dell Inspiron 15", cantidad: 5, precio: 3200, responsable: "Carlos Mendoza" },
    { id: "V-2024-002", fecha: "2024-01-15", cliente: "Empresa XYZ Ltda.", producto: "Mouse Inalámbrico Logitech", cantidad: 20, precio: 65, responsable: "Ana García" },
    { id: "V-2024-003", fecha: "2024-01-14", cliente: "Oficinas Modernas S.R.L.", producto: "Monitor Samsung 24\"", cantidad: 8, precio: 1100, responsable: "Luis Rodríguez" },
    { id: "V-2024-004", fecha: "2024-01-14", cliente: "Gaming Center Pro", producto: "Teclado Mecánico RGB", cantidad: 15, precio: 180, responsable: "María López" },
    { id: "V-2024-005", fecha: "2024-01-13", cliente: "Corporación ABC S.A.C.", producto: "Impresora HP LaserJet", cantidad: 3, precio: 1500, responsable: "Carlos Mendoza" },
    { id: "V-2024-006", fecha: "2024-01-13", cliente: "Startup Innovadora", producto: "Webcam HD 1080p", cantidad: 12, precio: 250, responsable: "Ana García" },
    { id: "V-2024-007", fecha: "2024-01-12", cliente: "Empresa XYZ Ltda.", producto: "Tablet Samsung Galaxy", cantidad: 6, precio: 1200, responsable: "Luis Rodríguez" },
    { id: "V-2024-008", fecha: "2024-01-12", cliente: "Audio Store Premium", producto: "Parlante JBL BoomBox", cantidad: 10, precio: 800, responsable: "María López" },
    { id: "V-2024-009", fecha: "2024-01-11", cliente: "Corporación ABC S.A.C.", producto: "Laptop HP Pavilion", cantidad: 4, precio: 3400, responsable: "Carlos Mendoza" },
    { id: "V-2024-010", fecha: "2024-01-10", cliente: "Startup Innovadora", producto: "Proyector Epson", cantidad: 2, precio: 2800, responsable: "Ana García" },
    { id: "V-2024-011", fecha: "2024-01-09", cliente: "Oficinas Modernas S.R.L.", producto: "Router TP-Link AX3000", cantidad: 7, precio: 400, responsable: "Luis Rodríguez" },
    { id: "V-2024-012", fecha: "2024-01-09", cliente: "Gaming Center Pro", producto: "Silla Ergonómica Cougar", cantidad: 5, precio: 1200, responsable: "María López" },
  ];

  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    cliente: "Todos los clientes",
    producto: "Todos los productos",
    responsable: "Todos los responsables",
  });

  const [mostrarResultados, setMostrarResultados] = useState(true);

  // 🔹 Función para formatear fecha a dd/mm/yyyy
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO + 'T00:00:00');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  // 🔹 Función para exportar a CSV
  const exportarCSV = () => {
    const headers = ['N° Venta', 'Fecha', 'Cliente', 'Producto', 'Cantidad', 'Precio Unit.', 'Importe', 'Responsable'];
    const rows = ventasFiltradas.map(v => [
      v.id,
      formatearFecha(v.fecha),
      v.cliente,
      v.producto,
      v.cantidad,
      v.precio.toFixed(2),
      (v.precio * v.cantidad).toFixed(2),
      v.responsable
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reporte_ventas_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleGenerar = () => setMostrarResultados(true);
  
  const handleLimpiar = () => {
    setFiltros({
      fechaInicio: "",
      fechaFin: "",
      cliente: "Todos los clientes",
      producto: "Todos los productos",
      responsable: "Todos los responsables",
    });
    setMostrarResultados(false);
  };

  // 🔹 Filtrado dinámico mejorado
  const ventasFiltradas = ventasData.filter((venta) => {
    const fechaVenta = new Date(venta.fecha + 'T00:00:00');
    const desde = filtros.fechaInicio ? new Date(filtros.fechaInicio + 'T00:00:00') : null;
    const hasta = filtros.fechaFin ? new Date(filtros.fechaFin + 'T00:00:00') : null;

    const coincideCliente =
      filtros.cliente === "Todos los clientes" || venta.cliente === filtros.cliente;
    const coincideProducto =
      filtros.producto === "Todos los productos" || venta.producto === filtros.producto;
    const coincideResponsable =
      filtros.responsable === "Todos los responsables" || venta.responsable === filtros.responsable;
    const coincideFecha =
      (!desde || fechaVenta >= desde) && (!hasta || fechaVenta <= hasta);

    return coincideCliente && coincideProducto && coincideResponsable && coincideFecha;
  });

  // 🔹 Obtener listas únicas para los selectores
  const clientesUnicos = [...new Set(ventasData.map((v) => v.cliente))];
  const productosUnicos = [...new Set(ventasData.map((v) => v.producto))];
  const responsablesUnicos = [...new Set(ventasData.map((v) => v.responsable))];

  // 🔹 Totales dinámicos
  const totalVentas = ventasFiltradas.length;
  const ingresosTotales = ventasFiltradas.reduce((sum, v) => sum + v.cantidad * v.precio, 0);
  const clientesUnicosCant = new Set(ventasFiltradas.map((v) => v.cliente)).size;
  const promedioVenta = totalVentas ? ingresosTotales / totalVentas : 0;

  // 🔹 Validación de fechas
  const fechasValidas = !filtros.fechaInicio || !filtros.fechaFin || 
    new Date(filtros.fechaInicio) <= new Date(filtros.fechaFin);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-white">
      {/* Header Moderno */}
      <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-400 rounded-full border-2 border-white"></div>
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">Reporte de Ventas</h1>
                <p className="text-xs text-gray-500">Análisis de Rendimiento</p>
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
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Análisis de Ventas
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Reporte de <span className="text-indigo-600">Ventas</span>
            </h2>
            <p className="text-gray-600">
              Analiza y filtra las ventas realizadas por cliente, producto y período
            </p>
          </div>

          {/* Panel de Filtros */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-indigo-50/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
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
                  <label htmlFor="fechaInicio" className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Fecha Inicio
                  </label>
                  <input
                    id="fechaInicio"
                    type="date"
                    name="fechaInicio"
                    value={filtros.fechaInicio}
                    onChange={handleChange}
                    max={filtros.fechaFin || undefined}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    aria-label="Fecha de inicio del reporte"
                  />
                </div>
                <div>
                  <label htmlFor="fechaFin" className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Fecha Fin
                  </label>
                  <input
                    id="fechaFin"
                    type="date"
                    name="fechaFin"
                    value={filtros.fechaFin}
                    onChange={handleChange}
                    min={filtros.fechaInicio || undefined}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    aria-label="Fecha de fin del reporte"
                  />
                </div>
                <div>
                  <label htmlFor="cliente" className="block text-sm font-semibold text-gray-700 mb-2">
                    👥 Cliente
                  </label>
                  <select
                    id="cliente"
                    name="cliente"
                    value={filtros.cliente}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    aria-label="Seleccionar cliente"
                  >
                    <option value="Todos los clientes">Todos los clientes</option>
                    {clientesUnicos.map((c, idx) => (
                      <option key={`cliente-${idx}`} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="producto" className="block text-sm font-semibold text-gray-700 mb-2">
                    📦 Producto
                  </label>
                  <select
                    id="producto"
                    name="producto"
                    value={filtros.producto}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    aria-label="Seleccionar producto"
                  >
                    <option value="Todos los productos">Todos los productos</option>
                    {productosUnicos.map((p, idx) => (
                      <option key={`producto-${idx}`} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="responsable" className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 Responsable
                  </label>
                  <select
                    id="responsable"
                    name="responsable"
                    value={filtros.responsable}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    aria-label="Seleccionar responsable"
                  >
                    <option value="Todos los responsables">Todos los responsables</option>
                    {responsablesUnicos.map((r, idx) => (
                      <option key={`responsable-${idx}`} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              {!fechasValidas && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
                  <span>⚠️</span>
                  <span>La fecha de inicio no puede ser mayor a la fecha de fin</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleGenerar}
                  disabled={!fechasValidas}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Generar reporte de ventas"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Generar Reporte</span>
                </button>
                <button
                  onClick={handleLimpiar}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium transition-all duration-200"
                  aria-label="Limpiar todos los filtros"
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
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Listo para generar reporte</h3>
              <p className="text-gray-500">Configura los filtros y haz clic en "Generar Reporte"</p>
            </div>
          ) : (
            <>
              {/* Tarjetas Resumen */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Ventas</p>
                      <h3 className="text-2xl font-bold text-gray-900">{totalVentas}</h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Ingresos Totales</p>
                      <h3 className="text-2xl font-bold text-gray-900">S/ {ingresosTotales.toLocaleString()}</h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Clientes Únicos</p>
                      <h3 className="text-2xl font-bold text-gray-900">{clientesUnicosCant}</h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">📊</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Promedio por Venta</p>
                      <h3 className="text-2xl font-bold text-gray-900">S/ {promedioVenta.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabla de Resultados */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-indigo-50/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Resultados del Reporte</h3>
                        <p className="text-sm text-gray-500">{ventasFiltradas.length} ventas encontradas</p>
                      </div>
                    </div>
                    <button 
                      onClick={exportarCSV}
                      disabled={ventasFiltradas.length === 0}
                      className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      aria-label="Exportar reporte a CSV"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Exportar CSV</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">N° Venta</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Producto</th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Cant.</th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio Unit.</th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Importe</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Responsable</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {ventasFiltradas.length > 0 ? (
                        ventasFiltradas.map((v) => (
                          <tr key={v.id} className="hover:bg-indigo-50/30 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-semibold text-gray-900">{v.id}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className="text-base">📅</span>
                                <span className="text-sm text-gray-600">{formatearFecha(v.fecha)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-900">{v.cliente}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-900">{v.producto}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">{v.cantidad}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm text-gray-600">S/ {v.precio.toFixed(2)}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm font-bold text-indigo-600">S/ {(v.precio * v.cantidad).toLocaleString()}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                                  {v.responsable.charAt(0)}
                                </div>
                                <span className="text-sm text-gray-600">{v.responsable}</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-12 text-center">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                <ShoppingBag className="w-8 h-8 text-gray-400" />
                              </div>
                              <p className="text-gray-500">No se encontraron ventas que coincidan con los filtros.</p>
                            </div>
                          </td>
                        </tr>
                      )}
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
