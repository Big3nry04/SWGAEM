import React, { useState, useMemo } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
  DollarSign,
  RotateCcw,
  FileDown,
  FileSpreadsheet,
  ChevronDown,
  Eye,
  Download,
  Trash2,
  Search,
} from "lucide-react";

// Componente de Tarjeta de Estadística
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "bg-[#4160BE]/10 text-[#4160BE]",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    emerald: "bg-emerald-100 text-emerald-600",
  };
  const selectedColor = colors[color] || colors.blue;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${selectedColor}`}>
          {React.cloneElement(icon, { className: "h-6 w-6" })}
        </div>
      </div>
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

  // (Datos de ejemplo)
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
  };

  // Filtrado optimizado con useMemo
  const comprasFiltradas = useMemo(() => {
    return compras.filter((c) => {
      // Evitar crear fechas inválidas si el string está vacío
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

  // Estadísticas
  const estadisticas = useMemo(() => {
    const total = comprasFiltradas.length;
    const montoTotal = comprasFiltradas.reduce((sum, compra) => sum + compra.monto, 0);
    const promedio = total > 0 ? montoTotal / total : 0;
    const completadas = comprasFiltradas.filter(c => c.estado === "completada").length;
    
    return { total, montoTotal, promedio, completadas };
  }, [comprasFiltradas]);

  const exportarPDF = () => {
    // Verificar si jspdf está cargado en el objeto window
    if (!window.jspdf || !window.jspdf.jsPDF) {
      console.error("jsPDF no está cargado. Asegúrate de incluir la librería.");
      // Aquí se podría mostrar un modal de error en lugar de un alert.
      // alert("Error: La librería PDF no está cargada.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header del PDF
    doc.setFontSize(20);
    doc.setTextColor("#1E2C57"); // Color Título
    doc.text("Historial de Compras", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-PE')}`, 14, 28);
    doc.text(`Total de compras: ${comprasFiltradas.length}`, 14, 34);
    doc.text(`Monto total: S/. ${estadisticas.montoTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`, 14, 40);

    // Tabla
    // Verificar si autoTable está cargado
    if (typeof doc.autoTable !== 'function') {
      console.error("jspdf-autotable no está cargado.");
      // alert("Error: La librería de tablas PDF no está cargada.");
      return;
    }

    doc.autoTable({
      startY: 45,
      head: [["Código", "Proveedor", "Fecha", "Responsable", "Monto (S/.)", "Estado", "Método Pago"]],
      body: comprasFiltradas.map((c) => [
        c.codigo,
        c.proveedor,
        c.fechaFormateada,
        c.responsable,
        c.monto.toFixed(2),
        c.estadoTexto,
        c.metodoPago,
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: "#4160BE" }, // Color Header Tabla
    });

    doc.save(`historial_compras_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportarExcel = () => {
    // Simulación de exportación Excel - Eliminado alert()
    const datos = comprasFiltradas.map(c => ({
      Código: c.codigo,
      Proveedor: c.proveedor,
      Fecha: c.fechaFormateada,
      Responsable: c.responsable,
      'Monto (S/.)': c.monto,
      Estado: c.estadoTexto,
      'Método Pago': c.metodoPago,
      Items: c.items
    }));
    
    console.log("Datos para exportar a Excel:", datos);
    // Aquí se podría usar una librería como 'xlsx' para generar un archivo .xlsx real
    // Ejemplo:
    // const ws = XLSX.utils.json_to_sheet(datos);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "HistorialCompras");
    // XLSX.writeFile(wb, "historial_compras.xlsx");
  };

  const getColorEstado = (estado) => {
    const colores = {
      completada: "bg-green-100 text-green-800 border-green-200",
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      proceso: "bg-[#4160BE]/10 text-[#4160BE] border-[#4160BE]/20", // Color primario
      cancelada: "bg-red-100 text-red-800 border-red-200"
    };
    return colores[estado] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getColorPrioridad = (prioridad) => {
    const colores = {
      alta: "text-red-600 bg-red-50",
      media: "text-orange-600 bg-orange-50",
      baja: "text-green-600 bg-green-50"
    };
    return colores[prioridad] || "text-gray-600 bg-gray-50";
  };

  const handleVerDetalle = (compra) => {
    console.log("Ver detalle de compra:", compra);
    // Aquí iría la navegación o modal para ver detalles
  };

  const handleDescargarFactura = (compra) => {
    console.log("Descargar factura de:", compra);
    // Aquí iría la descarga de factura
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total de Compras" 
            value={estadisticas.total} 
            icon={<ClipboardList />} 
            color="blue" 
          />
          <StatCard 
            title="Monto Total" 
            value={`S/. ${estadisticas.montoTotal.toLocaleString('es-PE')}`} 
            icon={<Banknote />} 
            color="green" 
          />
          <StatCard 
            title="Promedio por Compra" 
            value={`S/. ${estadisticas.promedio.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
            icon={<LineChart />} 
            color="purple" 
          />
          <StatCard 
            title="Completadas" 
            value={estadisticas.completadas}
            icon={<CheckCircle2 />} 
            color="emerald" 
          />
        </div>

        {/* Panel de Filtros */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <Filter className="h-6 w-6 text-[#1E2C57]" />
              <div>
                <h2 className="text-xl font-semibold text-[#1E2C57]">
                  Filtros de Búsqueda
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Utilice los filtros para encontrar compras específicas
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Fecha Desde */}
              <div>
                <label htmlFor="fechaDesde" className="block text-sm font-medium text-[#1E2C57] mb-2">
                  Fecha Desde
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <CalendarDays className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="fechaDesde"
                    id="fechaDesde"
                    value={filtros.fechaDesde}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Fecha Hasta */}
              <div>
                <label htmlFor="fechaHasta" className="block text-sm font-medium text-[#1E2C57] mb-2">
                  Fecha Hasta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <CalendarDays className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="fechaHasta"
                    id="fechaHasta"
                    value={filtros.fechaHasta}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Proveedor */}
              <div>
                <label htmlFor="proveedor" className="block text-sm font-medium text-[#1E2C57] mb-2">
                  Proveedor
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="proveedor"
                    id="proveedor"
                    placeholder="Buscar proveedor..."
                    value={filtros.proveedor}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Responsable */}
              <div>
                <label htmlFor="responsable" className="block text-sm font-medium text-[#1E2C57] mb-2">
                  Responsable
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="responsable"
                    id="responsable"
                    placeholder="Buscar responsable..."
                    value={filtros.responsable}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Estado */}
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-[#1E2C57] mb-2">
                  Estado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <ListFilter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="estado"
                    id="estado"
                    value={filtros.estado}
                    onChange={handleChange}
                    className="w-full appearance-none pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                  >
                    {estados.map(estado => (
                      <option key={estado.valor} value={estado.valor}>
                        {estado.texto}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div>
                <label htmlFor="metodoPago" className="block text-sm font-medium text-[#1E2C57] mb-2">
                  Método de Pago
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="metodoPago"
                    id="metodoPago"
                    value={filtros.metodoPago}
                    onChange={handleChange}
                    className="w-full appearance-none pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                  >
                    {metodosPago.map(metodo => (
                      <option key={metodo.valor} value={metodo.valor}>
                        {metodo.texto}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Monto Mínimo */}
              <div>
                <label htmlFor="montoMin" className="block text-sm font-medium text-[#1E2C57] mb-2">
                  Monto Mínimo (S/.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium text-sm">S/.</span>
                  </div>
                  <input
                    type="number"
                    name="montoMin"
                    id="montoMin"
                    placeholder="0.00"
                    value={filtros.montoMin}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Monto Máximo */}
              <div>
                <label htmlFor="montoMax" className="block text-sm font-medium text-[#1E2C57] mb-2">
                  Monto Máximo (S/.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium text-sm">S/.</span>
                  </div>
                  <input
                    type="number"
                    name="montoMax"
                    id="montoMax"
                    placeholder="100000.00"
                    value={filtros.montoMax}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={limpiarFiltros}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-200 transition-all duration-200 min-w-[160px]"
              >
                <RotateCcw className="h-5 w-5" />
                Limpiar Filtros
              </button>
              
              <button
                onClick={exportarExcel}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all duration-200 min-w-[160px]"
              >
                <FileSpreadsheet className="h-5 w-5" />
                Exportar Excel
              </button>
              
              <button
                onClick={exportarPDF}
                className="flex items-center justify-center gap-2 bg-[#4160BE] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#2A3E7A] transition-all duration-200 min-w-[160px]"
              >
                <FileDown className="h-5 w-5" />
                Exportar PDF
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de resultados */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#1E2C57]">
                  Resultados de Compras
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {comprasFiltradas.length} compras encontradas
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 lg:mt-0">
                <label htmlFor="sort" className="text-sm font-medium text-[#1E2C57]">Ordenar por:</label>
                <div className="relative">
                  <select id="sort" className="text-sm appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#4160BE]">
                    <option>Fecha (Más reciente)</option>
                    <option>Fecha (Más antigua)</option>
                    <option>Monto (Mayor a menor)</option>
                    <option>Monto (Menor a mayor)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Responsable
                  </th>
                  <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comprasFiltradas.length > 0 ? (
                  comprasFiltradas.map((compra) => (
                    <tr 
                      key={compra.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 text-sm">
                            {compra.codigo}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getColorPrioridad(compra.prioridad)} font-medium w-min`}>
                            {compra.prioridad.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{compra.proveedor}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{compra.fechaFormateada}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{compra.responsable}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-sm">
                            S/. {compra.monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-xs text-gray-500">
                            {compra.items} items
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getColorEstado(compra.estado)}`}>
                          {compra.estadoTexto}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleVerDetalle(compra)}
                            className="p-2 text-gray-500 hover:text-[#4160BE] hover:bg-[#4160BE]/10 rounded-full transition-colors"
                            title="Ver detalle"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDescargarFactura(compra)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="Descargar factura"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-5 w-5" />
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
                        <p className="text-lg font-medium mb-2 text-[#1E2C57]">No se encontraron compras</p>
                        <p className="text-sm">
                          {Object.values(filtros).some(val => val !== "") 
                            ? "No hay compras que coincidan con los filtros aplicados"
                            : "No hay compras registradas en el sistema"
                          }
                        </p>
                        {Object.values(filtros).some(val => val !== "") && (
                          <button
                            onClick={limpiarFiltros}
                            className="mt-4 text-[#4160BE] hover:text-[#2A3E7A] font-medium"
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
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{comprasFiltradas.length}</span> de{" "}
                  <span className="font-medium">{compras.length}</span> compras
                </p>
                {/* Esta paginación es estática, se necesitaría más lógica para hacerla funcional */}
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors disabled:opacity-50" disabled>
                    Anterior
                  </button>
                  <span className="px-3 py-1 bg-[#4160BE] text-white rounded-lg text-sm font-medium">
                    1
                  </span>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors disabled:opacity-50" disabled>
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default HistorialCompras;