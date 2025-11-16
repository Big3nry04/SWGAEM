import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  DollarSign,
  CheckCircle2,
  Download,
  Eye,
  FilePenLine,
  Trash2,
  Search,
  PlusCircle,
  Filter,
  X,
  Calendar,
  User,
  TrendingUp,
  Users,
  FileText
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

const VentasPage = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const ventasPorPagina = 8;

  const [filtrosAvanzados, setFiltrosAvanzados] = useState({
    metodoPago: "",
    fechaDesde: "",
    fechaHasta: "",
    montoMin: "",
    montoMax: ""
  });

  const ventas = [
    {
      id: "VENTA-2024-001",
      codigo: "VENTA-2024-001",
      cliente: "Juan Pérez García",
      fecha: "2024-01-14",
      fechaFormateada: "14/01/2024",
      vendedor: "María López",
      monto: 2750.00,
      montoFormateado: "S/ 2,750.00",
      estado: "completada",
      estadoTexto: "Completada",
      items: 5,
      metodoPago: "tarjeta"
    },
    {
      id: "VENTA-2024-002",
      codigo: "VENTA-2024-002",
      cliente: "Ana Martínez Silva",
      fecha: "2024-01-17",
      fechaFormateada: "17/01/2024",
      vendedor: "Carlos Ruiz",
      monto: 1420.50,
      montoFormateado: "S/ 1,420.50",
      estado: "pendiente",
      estadoTexto: "Pendiente",
      items: 3,
      metodoPago: "efectivo"
    },
    {
      id: "VENTA-2024-003",
      codigo: "VENTA-2024-003",
      cliente: "Roberto Díaz Morales",
      fecha: "2024-01-19",
      fechaFormateada: "19/01/2024",
      vendedor: "Laura Ramírez",
      monto: 3890.75,
      montoFormateado: "S/ 3,890.75",
      estado: "completada",
      estadoTexto: "Completada",
      items: 8,
      metodoPago: "transferencia"
    },
    {
      id: "VENTA-2024-004",
      codigo: "VENTA-2024-004",
      cliente: "Carmen Flores Vega",
      fecha: "2024-01-21",
      fechaFormateada: "21/01/2024",
      vendedor: "Pedro González",
      monto: 980.25,
      montoFormateado: "S/ 980.25",
      estado: "proceso",
      estadoTexto: "En Proceso",
      items: 2,
      metodoPago: "tarjeta"
    },
    {
      id: "VENTA-2024-005",
      codigo: "VENTA-2024-005",
      cliente: "Luis Hernández Castro",
      fecha: "2024-01-23",
      fechaFormateada: "23/01/2024",
      vendedor: "Ana Torres",
      monto: 5200.00,
      montoFormateado: "S/ 5,200.00",
      estado: "completada",
      estadoTexto: "Completada",
      items: 12,
      metodoPago: "efectivo"
    },
    {
      id: "VENTA-2024-006",
      codigo: "VENTA-2024-006",
      cliente: "Patricia Sánchez Rojas",
      fecha: "2024-01-25",
      fechaFormateada: "25/01/2024",
      vendedor: "Miguel Ángel Ortiz",
      monto: 2150.50,
      montoFormateado: "S/ 2,150.50",
      estado: "pendiente",
      estadoTexto: "Pendiente",
      items: 6,
      metodoPago: "transferencia"
    }
  ];

  const ventasFiltradas = useMemo(() => {
    return ventas.filter((venta) => {
      const coincideBusqueda = [venta.codigo, venta.cliente, venta.vendedor]
        .some((campo) => campo.toLowerCase().includes(busqueda.toLowerCase()));
      
      const coincideEstado = filtroEstado === "todos" || venta.estado === filtroEstado;
      const coincideMetodoPago = !filtrosAvanzados.metodoPago || venta.metodoPago === filtrosAvanzados.metodoPago;
      const coincideMontoMin = !filtrosAvanzados.montoMin || venta.monto >= parseFloat(filtrosAvanzados.montoMin);
      const coincideMontoMax = !filtrosAvanzados.montoMax || venta.monto <= parseFloat(filtrosAvanzados.montoMax);
      
      return coincideBusqueda && coincideEstado && coincideMetodoPago && coincideMontoMin && coincideMontoMax;
    });
  }, [busqueda, filtroEstado, filtrosAvanzados]);

  const indexUltimo = paginaActual * ventasPorPagina;
  const indexPrimero = indexUltimo - ventasPorPagina;
  const ventasActuales = ventasFiltradas.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(ventasFiltradas.length / ventasPorPagina);

  const estadisticas = useMemo(() => {
    const total = ventas.length;
    const montoTotal = ventas.reduce((sum, venta) => sum + venta.monto, 0);
    const completadas = ventas.filter(v => v.estado === "completada").length;
    const pendientes = ventas.filter(v => v.estado === "pendiente").length;
    
    return { 
      total, 
      montoTotal: `S/ ${montoTotal.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      completadas,
      pendientes
    };
  }, []);

  const handleVerDetalle = (venta) => {
    setVentaSeleccionada(venta);
    setMostrarModal(true);
  };

  const handleEliminar = (venta) => {
    if (window.confirm(`¿Estás seguro de eliminar la venta ${venta.codigo}?`)) {
      console.log("Eliminar venta:", venta);
    }
  };

  const limpiarFiltros = () => {
    setFiltrosAvanzados({
      metodoPago: "",
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

  const getColorMetodoPago = (metodo) => {
    const colores = {
      efectivo: "bg-green-50 text-green-700 border-green-200",
      tarjeta: "bg-blue-50 text-blue-700 border-blue-200",
      transferencia: "bg-purple-50 text-purple-700 border-purple-200"
    };
    return colores[metodo] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Título y botón de acción */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Listado de Ventas</h2>
          <p className="text-gray-600 mt-1">Administra y monitorea todas las ventas</p>
        </div>
        <button 
          onClick={() => navigate("/ventas/nueva")}
          className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 group overflow-hidden hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <PlusCircle className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-medium relative z-10">Nueva Venta</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Ventas Totales" 
          value={estadisticas.montoTotal} 
          icon={DollarSign} 
          color="blue"
          trend="+12% vs mes anterior"
        />
        <StatCard 
          title="Transacciones" 
          value={estadisticas.total} 
          icon={ShoppingCart} 
          color="green"
          trend="+8% esta semana"
        />
        <StatCard 
          title="Completadas" 
          value={estadisticas.completadas} 
          icon={CheckCircle2} 
          color="purple"
        />
        <StatCard 
          title="Pendientes" 
          value={estadisticas.pendientes} 
          icon={FileText} 
          color="orange"
        />
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por código, cliente o vendedor..."
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
                <label className="block text-xs text-gray-700 font-semibold mb-2">Método de Pago</label>
                <select
                  value={filtrosAvanzados.metodoPago}
                  onChange={(e) => setFiltrosAvanzados({...filtrosAvanzados, metodoPago: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos los métodos</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
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

      {/* Tabla de ventas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vendedor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Método Pago</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {ventasActuales.length > 0 ? (
                ventasActuales.map((venta) => (
                  <tr key={venta.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono font-semibold">{venta.codigo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{venta.cliente}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{venta.fechaFormateada}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{venta.vendedor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorMetodoPago(venta.metodoPago)}`}>
                        {venta.metodoPago.charAt(0).toUpperCase() + venta.metodoPago.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold text-center">{venta.items}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{venta.montoFormateado}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorEstado(venta.estado)}`}>
                        {venta.estadoTexto}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleVerDetalle(venta)}
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
                          onClick={() => handleEliminar(venta)}
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
                          ? "No hay ventas que coincidan con tus filtros"
                          : "No hay ventas registradas"}
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
            Mostrando {indexPrimero + 1} a {Math.min(indexUltimo, ventasFiltradas.length)} de {ventasFiltradas.length} ventas
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

      {/* Modal de detalle */}
      {mostrarModal && ventaSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Detalle de Venta</h2>
                <p className="text-blue-600 text-sm mt-1">{ventaSeleccionada.codigo}</p>
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
                    <Users className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-semibold text-blue-900">Cliente</p>
                  </div>
                  <p className="text-gray-900 font-bold">{ventaSeleccionada.cliente}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-semibold text-green-900">Monto Total</p>
                  </div>
                  <p className="text-gray-900 font-bold">{ventaSeleccionada.montoFormateado}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <p className="text-sm font-semibold text-purple-900">Fecha</p>
                  </div>
                  <p className="text-gray-900 font-bold">{ventaSeleccionada.fechaFormateada}</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-orange-600" />
                    <p className="text-sm font-semibold text-orange-900">Vendedor</p>
                  </div>
                  <p className="text-gray-900 font-bold">{ventaSeleccionada.vendedor}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">Items</p>
                  <p className="text-2xl font-bold text-gray-900">{ventaSeleccionada.items}</p>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">Estado</p>
                  <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorEstado(ventaSeleccionada.estado)}`}>
                    {ventaSeleccionada.estadoTexto}
                  </span>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">Método Pago</p>
                  <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorMetodoPago(ventaSeleccionada.metodoPago)}`}>
                    {ventaSeleccionada.metodoPago.charAt(0).toUpperCase() + ventaSeleccionada.metodoPago.slice(1)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información Adicional</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Código de Venta</span>
                    <span className="text-sm font-semibold text-gray-900 font-mono">{ventaSeleccionada.codigo}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total de Items</span>
                    <span className="text-sm font-semibold text-gray-900">{ventaSeleccionada.items} unidades</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monto por Item (promedio)</span>
                    <span className="text-sm font-semibold text-gray-900">
                      S/ {(ventaSeleccionada.monto / ventaSeleccionada.items).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Método de Pago</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {ventaSeleccionada.metodoPago.charAt(0).toUpperCase() + ventaSeleccionada.metodoPago.slice(1)}
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
                Editar Venta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentasPage;