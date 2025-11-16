import React, { useState, useMemo } from "react";
import {
  ClipboardList,
  DollarSign,
  CheckCircle2,
  Download,
  Eye,
  FilePenLine,
  Trash2,
  Search,
  PlusCircle,
  ChevronDown,
  Filter,
  X,
  Save,
  ArrowLeft,
  Package,
  Calendar,
  User,
  TrendingUp,
  ShoppingCart,
  AlertTriangle
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
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      gradient: "from-orange-500 to-orange-600"
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

const ComprasPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const comprasPorPagina = 8;

  const [filtrosAvanzados, setFiltrosAvanzados] = useState({
    prioridad: "",
    fechaDesde: "",
    fechaHasta: "",
    montoMin: "",
    montoMax: ""
  });

  const compras = [
    {
      id: "COMP-2024-001",
      codigo: "COMP-2024-001",
      proveedor: "Proveedor ABC S.A.",
      fecha: "2024-01-14",
      fechaFormateada: "14/01/2024",
      responsable: "Juan Pérez",
      monto: 15750.00,
      montoFormateado: "S/ 15,750.00",
      estado: "completada",
      estadoTexto: "Completada",
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
      monto: 8920.50,
      montoFormateado: "S/ 8,920.50",
      estado: "pendiente",
      estadoTexto: "Pendiente",
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
      montoFormateado: "S/ 23,400.75",
      estado: "completada",
      estadoTexto: "Completada",
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
      montoFormateado: "S/ 12,680.25",
      estado: "proceso",
      estadoTexto: "En Proceso",
      items: 6,
      prioridad: "media"
    },
    {
      id: "COMP-2024-005",
      codigo: "COMP-2024-005",
      proveedor: "Importadora Global",
      fecha: "2024-01-23",
      fechaFormateada: "23/01/2024",
      responsable: "Luis Martínez",
      monto: 34200.00,
      montoFormateado: "S/ 34,200.00",
      estado: "pendiente",
      estadoTexto: "Pendiente",
      items: 20,
      prioridad: "alta"
    },
    {
      id: "COMP-2024-006",
      codigo: "COMP-2024-006",
      proveedor: "Equipos Industriales SAC",
      fecha: "2024-01-25",
      fechaFormateada: "25/01/2024",
      responsable: "Patricia Vega",
      monto: 18500.50,
      montoFormateado: "S/ 18,500.50",
      estado: "completada",
      estadoTexto: "Completada",
      items: 10,
      prioridad: "media"
    }
  ];

  const comprasFiltradas = useMemo(() => {
    return compras.filter((compra) => {
      const coincideBusqueda = [compra.codigo, compra.proveedor, compra.responsable]
        .some((campo) => campo.toLowerCase().includes(busqueda.toLowerCase()));
      
      const coincideEstado = filtroEstado === "todos" || compra.estado === filtroEstado;
      const coincidePrioridad = !filtrosAvanzados.prioridad || compra.prioridad === filtrosAvanzados.prioridad;
      const coincideMontoMin = !filtrosAvanzados.montoMin || compra.monto >= parseFloat(filtrosAvanzados.montoMin);
      const coincideMontoMax = !filtrosAvanzados.montoMax || compra.monto <= parseFloat(filtrosAvanzados.montoMax);
      
      return coincideBusqueda && coincideEstado && coincidePrioridad && coincideMontoMin && coincideMontoMax;
    });
  }, [busqueda, filtroEstado, filtrosAvanzados]);

  const indexUltimo = paginaActual * comprasPorPagina;
  const indexPrimero = indexUltimo - comprasPorPagina;
  const comprasActuales = comprasFiltradas.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(comprasFiltradas.length / comprasPorPagina);

  const estadisticas = useMemo(() => {
    const total = compras.length;
    const montoTotal = compras.reduce((sum, compra) => sum + compra.monto, 0);
    const completadas = compras.filter(c => c.estado === "completada").length;
    const pendientes = compras.filter(c => c.estado === "pendiente").length;
    
    return { 
      total, 
      montoTotal: `S/ ${montoTotal.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      completadas,
      pendientes
    };
  }, []);

  const handleVerDetalle = (compra) => {
    setCompraSeleccionada(compra);
    setMostrarModal(true);
  };

  const handleEliminar = (compra) => {
    if (window.confirm(`¿Estás seguro de eliminar la compra ${compra.codigo}?`)) {
      console.log("Eliminar compra:", compra);
    }
  };

  const limpiarFiltros = () => {
    setFiltrosAvanzados({
      prioridad: "",
      fechaDesde: "",
      fechaHasta: "",
      montoMin: "",
      montoMax: ""
    });
    setFiltroEstado("todos");
    setPaginaActual(1);
  };

  const getColorEstado = (estado) => {
    const colores = {
      completada: "bg-green-50 text-green-700 border-green-200",
      pendiente: "bg-yellow-50 text-yellow-700 border-yellow-200",
      proceso: "bg-blue-50 text-blue-700 border-blue-200",
      cancelada: "bg-red-50 text-red-700 border-red-200",
    };
    return colores[estado] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getColorPrioridad = (prioridad) => {
    const colores = {
      alta: "bg-red-50 text-red-700 border-red-200",
      media: "bg-orange-50 text-orange-700 border-orange-200",
      baja: "bg-green-50 text-green-700 border-green-200"
    };
    return colores[prioridad] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Título y botón de acción */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Listado de Compras</h2>
              <p className="text-gray-600 mt-1">Administra y monitorea todas compra</p>
            </div>
            <button 
              className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 group overflow-hidden hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <PlusCircle className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium relative z-10">Nueva Compra</span>
            </button>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por código, proveedor o responsable..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
              >
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="proceso">En Proceso</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>

              <button 
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className={`px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 font-medium ${
                  mostrarFiltros 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>

              <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl flex items-center gap-2 border border-gray-200 transition-all font-medium">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>

            {/* Filtros avanzados */}
            {mostrarFiltros && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Prioridad</label>
                    <select
                      value={filtrosAvanzados.prioridad}
                      onChange={(e) => setFiltrosAvanzados({...filtrosAvanzados, prioridad: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Todas las prioridades</option>
                      <option value="alta">Alta</option>
                      <option value="media">Media</option>
                      <option value="baja">Baja</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Monto Mínimo</label>
                    <input
                      type="number"
                      value={filtrosAvanzados.montoMin}
                      onChange={(e) => setFiltrosAvanzados({...filtrosAvanzados, montoMin: e.target.value})}
                      placeholder="0.00"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Monto Máximo</label>
                    <input
                      type="number"
                      value={filtrosAvanzados.montoMax}
                      onChange={(e) => setFiltrosAvanzados({...filtrosAvanzados, montoMax: e.target.value})}
                      placeholder="99999.99"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={limpiarFiltros}
                      className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-all font-medium"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tabla de compras */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Proveedor</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Responsable</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prioridad</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {comprasActuales.length > 0 ? (
                    comprasActuales.map((compra) => (
                      <tr key={compra.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono font-semibold">{compra.codigo}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{compra.proveedor}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{compra.fechaFormateada}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{compra.responsable}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorPrioridad(compra.prioridad)}`}>
                            {compra.prioridad.charAt(0).toUpperCase() + compra.prioridad.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold text-center">{compra.items}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{compra.montoFormateado}</td>
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
                              className="p-2 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Editar"
                            >
                              <FilePenLine className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleEliminar(compra)}
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
                      <td colSpan="9" className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Search className="h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg font-medium mb-2">No se encontraron resultados</p>
                          <p className="text-sm">
                            {busqueda || filtroEstado !== "todos" 
                              ? "No hay compras que coincidan con tus filtros"
                              : "No hay compras registradas"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
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
          </div>
        </div>
      </main>

      {/* Modal de detalle */}
      {mostrarModal && compraSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
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
                    <Package className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-semibold text-blue-900">Proveedor</p>
                  </div>
                  <p className="text-gray-900 font-bold">{compraSeleccionada.proveedor}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-semibold text-green-900">Monto Total</p>
                  </div>
                  <p className="text-gray-900 font-bold">{compraSeleccionada.montoFormateado}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
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
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información Adicional</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Código de Compra</span>
                    <span className="text-sm font-semibold text-gray-900 font-mono">{compraSeleccionada.codigo}</span>
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
              >
                <FilePenLine className="w-5 h-5" />
                Editar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprasPage;