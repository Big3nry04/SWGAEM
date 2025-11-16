import React, { useState, useMemo } from "react";
import {
  ClipboardList,
  Banknote,
  LineChart,
  CheckCircle2,
  Filter,
  CalendarDays,
  Building2,
  User,
  ListFilter,
  CreditCard,
  RotateCcw,
  FileDown,
  FileSpreadsheet,
  ChevronDown,
  Eye,
  Download,
  Trash2,
  Search,
  ArrowLeft,
  ShoppingCart,
  TrendingUp,
  X
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      gradient: "from-blue-500 to-blue-600"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      gradient: "from-green-500 to-green-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      gradient: "from-purple-500 to-purple-600"
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      gradient: "from-emerald-500 to-emerald-600"
    }
  };

  const selectedColor = colors[color] || colors.blue;

  return (
    <div className={`${selectedColor.bg} rounded-2xl border ${selectedColor.border} shadow-sm p-6`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`${selectedColor.text} text-sm font-semibold`}>{title}</h3>
        <div className={`w-10 h-10 bg-gradient-to-br ${selectedColor.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <p className={`text-xs ${selectedColor.text} mt-1 flex items-center gap-1`}>
          <TrendingUp className="w-3 h-3" />
          {trend}
        </p>
      )}
    </div>
  );
};

const HistorialCompras = () => {
  const [filtros, setFiltros] = useState({
    fechaDesde: "",
    fechaHasta: "",
    proveedor: "",
    responsable: "",
    estado: "",
    metodoPago: "",
    montoMin: "",
    montoMax: "",
  });

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const comprasPorPagina = 10;

  const [compras] = useState([
    { 
      id: "COMP-2024-001", 
      codigo: "COMP-2024-001", 
      proveedor: "Proveedor ABC S.A.", 
      fecha: "2024-01-14", 
      fechaFormateada: "14/01/2024",
      responsable: "Juan Pérez", 
      monto: 15750.0, 
      estado: "completada", 
      estadoTexto: "Completada",
      metodoPago: "Transferencia Bancaria",
      items: 12,
      prioridad: "media"
    },
    { 
      id: "COMP-2024-002", 
      codigo: "COMP-2024-002", 
      proveedor: "Suministros XYZ Ltda.", 
      fecha: "2024-01-17", 
      fechaFormateada: "17/01/2024",
      responsable: "María García", 
      monto: 8920.5, 
      estado: "pendiente", 
      estadoTexto: "Pendiente",
      metodoPago: "Efectivo",
      items: 8,
      prioridad: "alta"
    },
    { 
      id: "COMP-2024-003", 
      codigo: "COMP-2024-003", 
      proveedor: "Distribuidora Central", 
      fecha: "2024-01-19", 
      fechaFormateada: "19/01/2024",
      responsable: "Carlos López", 
      monto: 23400.75, 
      estado: "completada", 
      estadoTexto: "Completada",
      metodoPago: "Tarjeta de Crédito",
      items: 15,
      prioridad: "baja"
    },
    { 
      id: "COMP-2024-004", 
      codigo: "COMP-2024-004", 
      proveedor: "Materiales del Norte", 
      fecha: "2024-01-21", 
      fechaFormateada: "21/01/2024",
      responsable: "Ana Rodríguez", 
      monto: 12680.25, 
      estado: "proceso", 
      estadoTexto: "En Proceso",
      metodoPago: "Transferencia Bancaria",
      items: 6,
      prioridad: "media"
    },
    { 
      id: "COMP-2024-005", 
      codigo: "COMP-2024-005", 
      proveedor: "Equipos Industriales SAC", 
      fecha: "2024-01-23", 
      fechaFormateada: "23/01/2024",
      responsable: "Luis Martínez", 
      monto: 34200.0, 
      estado: "completada", 
      estadoTexto: "Completada",
      metodoPago: "Crédito Comercial",
      items: 20,
      prioridad: "alta"
    }
  ]);

  const estados = [
    { valor: "", texto: "Todos los estados" },
    { valor: "completada", texto: "Completada" },
    { valor: "pendiente", texto: "Pendiente" },
    { valor: "proceso", texto: "En Proceso" },
    { valor: "cancelada", texto: "Cancelada" }
  ];

  const metodosPago = [
    { valor: "", texto: "Todos los métodos" },
    { valor: "Transferencia Bancaria", texto: "Transferencia Bancaria" },
    { valor: "Tarjeta de Crédito", texto: "Tarjeta de Crédito" },
    { valor: "Efectivo", texto: "Efectivo" },
    { valor: "Cheque", texto: "Cheque" },
    { valor: "Crédito Comercial", texto: "Crédito Comercial" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const limpiarFiltros = () => {
    setFiltros({
      fechaDesde: "",
      fechaHasta: "",
      proveedor: "",
      responsable: "",
      estado: "",
      metodoPago: "",
      montoMin: "",
      montoMax: "",
    });
    setPaginaActual(1);
  };

  const comprasFiltradas = useMemo(() => {
    return compras.filter((c) => {
      const fechaCompra = new Date(c.fecha);
      const desde = filtros.fechaDesde ? new Date(filtros.fechaDesde + "T00:00:00") : null;
      const hasta = filtros.fechaHasta ? new Date(filtros.fechaHasta + "T23:59:59") : null;
      
      const montoMin = filtros.montoMin ? parseFloat(filtros.montoMin) : 0;
      const montoMax = filtros.montoMax ? parseFloat(filtros.montoMax) : Infinity;

      return (
        (!desde || fechaCompra >= desde) &&
        (!hasta || fechaCompra <= hasta) &&
        (!filtros.proveedor || c.proveedor.toLowerCase().includes(filtros.proveedor.toLowerCase())) &&
        (!filtros.responsable || c.responsable.toLowerCase().includes(filtros.responsable.toLowerCase())) &&
        (!filtros.estado || c.estado === filtros.estado) &&
        (!filtros.metodoPago || c.metodoPago === filtros.metodoPago) &&
        c.monto >= montoMin &&
        c.monto <= montoMax
      );
    });
  }, [compras, filtros]);

  const indexUltimo = paginaActual * comprasPorPagina;
  const indexPrimero = indexUltimo - comprasPorPagina;
  const comprasActuales = comprasFiltradas.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(comprasFiltradas.length / comprasPorPagina);

  const estadisticas = useMemo(() => {
    const total = comprasFiltradas.length;
    const montoTotal = comprasFiltradas.reduce((sum, compra) => sum + compra.monto, 0);
    const promedio = total > 0 ? montoTotal / total : 0;
    const completadas = comprasFiltradas.filter(c => c.estado === "completada").length;
    
    return { total, montoTotal, promedio, completadas };
  }, [comprasFiltradas]);

  const exportarPDF = () => {
    console.log("Exportar PDF");
    alert("Funcionalidad de exportación PDF en desarrollo");
  };

  const exportarExcel = () => {
    console.log("Exportar Excel");
    alert("Funcionalidad de exportación Excel en desarrollo");
  };

  const getColorEstado = (estado) => {
    const colores = {
      completada: "bg-green-50 text-green-700 border-green-200",
      pendiente: "bg-yellow-50 text-yellow-700 border-yellow-200",
      proceso: "bg-blue-50 text-blue-700 border-blue-200",
      cancelada: "bg-red-50 text-red-700 border-red-200"
    };
    return colores[estado] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getColorPrioridad = (prioridad) => {
    const colores = {
      alta: "bg-red-50 text-red-700 border-red-200",
      media: "bg-orange-50 text-orange-700 border-orange-200",
      baja: "bg-green-50 text-green-700 border-green-200"
    };
    return colores[prioridad] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const handleVerDetalle = (compra) => {
    setCompraSeleccionada(compra);
    setMostrarModal(true);
  };

  const handleDescargarFactura = (compra) => {
    console.log("Descargar factura de:", compra);
    alert(`Descargando factura de ${compra.codigo}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Título */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Historial de Compras</h2>
            <p className="text-gray-600 mt-1">Consulta y analiza todas las compras realizadas</p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard 
              title="Total de Compras" 
              value={estadisticas.total} 
              icon={ClipboardList} 
              color="blue"
              trend={`${compras.length} totales`}
            />
            <StatCard 
              title="Monto Total" 
              value={`S/ ${estadisticas.montoTotal.toLocaleString('es-PE')}`} 
              icon={Banknote} 
              color="green"
              trend="Filtrado actual"
            />
            <StatCard 
              title="Promedio por Compra" 
              value={`S/ ${estadisticas.promedio.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
              icon={LineChart} 
              color="purple"
              trend="Monto promedio"
            />
            <StatCard 
              title="Completadas" 
              value={estadisticas.completadas}
              icon={CheckCircle2} 
              color="emerald"
              trend={`${Math.round((estadisticas.completadas / estadisticas.total) * 100) || 0}% del total`}
            />
          </div>

          {/* Panel de Filtros */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex gap-4 flex-wrap items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Filtros de Búsqueda</h3>
                  <p className="text-xs text-gray-600">Personaliza tu búsqueda</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className={`px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 font-medium ${
                    mostrarFiltros 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {mostrarFiltros ? 'Ocultar' : 'Mostrar'} Filtros
                </button>
                
                <button
                  onClick={exportarExcel}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center gap-2 transition-all font-medium shadow-lg shadow-green-500/30"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </button>
                
                <button
                  onClick={exportarPDF}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center gap-2 transition-all font-medium shadow-lg shadow-red-500/30"
                >
                  <FileDown className="w-4 h-4" />
                  PDF
                </button>
              </div>
            </div>

            {/* Filtros Expandibles */}
            {mostrarFiltros && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Fecha Desde */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Fecha Desde</label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        name="fechaDesde"
                        value={filtros.fechaDesde}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Fecha Hasta */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Fecha Hasta</label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        name="fechaHasta"
                        value={filtros.fechaHasta}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Proveedor */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Proveedor</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="proveedor"
                        placeholder="Buscar proveedor..."
                        value={filtros.proveedor}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Responsable */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Responsable</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="responsable"
                        placeholder="Buscar responsable..."
                        value={filtros.responsable}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Estado</label>
                    <div className="relative">
                      <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="estado"
                        value={filtros.estado}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        {estados.map(estado => (
                          <option key={estado.valor} value={estado.valor}>
                            {estado.texto}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Método de Pago */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Método de Pago</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="metodoPago"
                        value={filtros.metodoPago}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        {metodosPago.map(metodo => (
                          <option key={metodo.valor} value={metodo.valor}>
                            {metodo.texto}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Monto Mínimo */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Monto Mínimo (S/)</label>
                    <input
                      type="number"
                      name="montoMin"
                      placeholder="0.00"
                      value={filtros.montoMin}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Monto Máximo */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Monto Máximo (S/)</label>
                    <input
                      type="number"
                      name="montoMax"
                      placeholder="100000.00"
                      value={filtros.montoMax}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={limpiarFiltros}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-all font-medium flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tabla de resultados */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Resultados de Búsqueda</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {comprasFiltradas.length} compra{comprasFiltradas.length !== 1 ? 's' : ''} encontrada{comprasFiltradas.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Proveedor</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Responsable</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {comprasActuales.length > 0 ? (
                    comprasActuales.map((compra) => (
                      <tr key={compra.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-600 font-mono font-semibold">{compra.codigo}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getColorPrioridad(compra.prioridad)} font-medium w-fit`}>
                              {compra.prioridad.charAt(0).toUpperCase() + compra.prioridad.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{compra.proveedor}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{compra.fechaFormateada}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{compra.responsable}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-900 font-semibold">
                              S/ {compra.monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-xs text-gray-500">{compra.items} items</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorEstado(compra.estado)}`}>
                            {compra.estadoTexto}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleVerDetalle(compra)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Ver detalle"
                            >
                              <Eye className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleDescargarFactura(compra)}
                              className="p-2 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Descargar factura"
                            >
                              <Download className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Search className="h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg font-medium mb-2">No se encontraron compras</p>
                          <p className="text-sm">
                            {Object.values(filtros).some(val => val !== "") 
                              ? "No hay compras que coincidan con los filtros aplicados"
                              : "No hay compras registradas en el sistema"
                            }
                          </p>
                          {Object.values(filtros).some(val => val !== "") && (
                            <button
                              onClick={limpiarFiltros}
                              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Limpiar filtros
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {comprasFiltradas.length > 0 && (
              <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-600 font-medium">
                  Mostrando {indexPrimero + 1} a {Math.min(indexUltimo, comprasFiltradas.length)} de {comprasFiltradas.length} compras
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
            )}
          </div>
        </div>
      </main>

      {/* Modal de detalle */}
      {mostrarModal && compraSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Detalle de Compra</h2>
                <p className="text-blue-600 text-sm mt-1">{compraSeleccionada.codigo}</p>
              </div>
              <button
                onClick={() => setMostrarModal(false)}
                className="p-2 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <X className="w-6 h-6 text-red-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-semibold text-blue-900">Proveedor</p>
                  </div>
                  <p className="text-gray-900 font-bold">{compraSeleccionada.proveedor}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-semibold text-green-900">Monto Total</p>
                  </div>
                  <p className="text-gray-900 font-bold">
                    S/ {compraSeleccionada.monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays className="w-5 h-5 text-purple-600" />
                    <p className="text-sm font-semibold text-purple-900">Fecha</p>
                  </div>
                  <p className="text-gray-900 font-bold">{compraSeleccionada.fechaFormateada}</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-orange-600" />
                    <p className="text-sm font-semibold text-orange-900">Responsable</p>
                  </div>
                  <p className="text-gray-900 font-bold">{compraSeleccionada.responsable}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">Items</p>
                  <p className="text-2xl font-bold text-gray-900">{compraSeleccionada.items}</p>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">Estado</p>
                  <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorEstado(compraSeleccionada.estado)}`}>
                    {compraSeleccionada.estadoTexto}
                  </span>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">Prioridad</p>
                  <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorPrioridad(compraSeleccionada.prioridad)}`}>
                    {compraSeleccionada.prioridad.charAt(0).toUpperCase() + compraSeleccionada.prioridad.slice(1)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información de Pago</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Método de Pago</span>
                    <span className="text-sm font-semibold text-gray-900">{compraSeleccionada.metodoPago}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total de Items</span>
                    <span className="text-sm font-semibold text-gray-900">{compraSeleccionada.items} unidades</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monto por Item (promedio)</span>
                    <span className="text-sm font-semibold text-gray-900">
                      S/ {(compraSeleccionada.monto / compraSeleccionada.items).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setMostrarModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-200"
              >
                Cerrar
              </button>
              <button
                onClick={() => handleDescargarFactura(compraSeleccionada)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
              >
                <Download className="w-5 h-5" />
                Descargar Factura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialCompras;