import React, { useState, useMemo } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
      const fechaCompra = new Date(c.fecha);
      const desde = filtros.fechaDesde ? new Date(filtros.fechaDesde) : null;
      const hasta = filtros.fechaHasta ? new Date(filtros.fechaHasta) : null;
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
    const doc = new jsPDF();
    
    // Header del PDF
    doc.setFontSize(20);
    doc.setTextColor(30, 58, 138);
    doc.text("Historial de Compras", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-PE')}`, 14, 28);
    doc.text(`Total de compras: ${comprasFiltradas.length}`, 14, 34);
    doc.text(`Monto total: S/. ${estadisticas.montoTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`, 14, 40);

    // Tabla
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
      headStyles: { fillColor: [30, 58, 138] },
    });

    doc.save(`historial_compras_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportarExcel = () => {
    // Simulación de exportación Excel
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
    alert("✅ Funcionalidad de exportación Excel preparada - Los datos están en la consola");
  };

  const getColorEstado = (estado) => {
    const colores = {
      completada: "bg-green-100 text-green-800 border-green-200",
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      proceso: "bg-blue-100 text-blue-800 border-blue-200",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Historial de Compras
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Consulta y analiza todas las operaciones de compra realizadas
          </p>
        </header>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Compras</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monto Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  S/. {estadisticas.montoTotal.toLocaleString('es-PE')}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-green-600 text-lg">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio por Compra</p>
                <p className="text-2xl font-bold text-gray-900">
                  S/. {estadisticas.promedio.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg">📈</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.completadas}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <span className="text-emerald-600 text-lg">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Filtros */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">
              Filtros de Búsqueda
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Utilice los filtros para encontrar compras específicas
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Fechas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Desde
                </label>
                <input
                  type="date"
                  name="fechaDesde"
                  value={filtros.fechaDesde}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Hasta
                </label>
                <input
                  type="date"
                  name="fechaHasta"
                  value={filtros.fechaHasta}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Textos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proveedor
                </label>
                <input
                  type="text"
                  name="proveedor"
                  placeholder="Buscar proveedor..."
                  value={filtros.proveedor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsable
                </label>
                <input
                  type="text"
                  name="responsable"
                  placeholder="Buscar responsable..."
                  value={filtros.responsable}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Selects */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  name="estado"
                  value={filtros.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  {estados.map(estado => (
                    <option key={estado.valor} value={estado.valor}>
                      {estado.texto}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pago
                </label>
                <select
                  name="metodoPago"
                  value={filtros.metodoPago}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  {metodosPago.map(metodo => (
                    <option key={metodo.valor} value={metodo.valor}>
                      {metodo.texto}
                    </option>
                  ))}
                </select>
              </div>

              {/* Montos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto Mínimo (S/.)
                </label>
                <input
                  type="number"
                  name="montoMin"
                  placeholder="0.00"
                  value={filtros.montoMin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto Máximo (S/.)
                </label>
                <input
                  type="number"
                  name="montoMax"
                  placeholder="100000.00"
                  value={filtros.montoMax}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={limpiarFiltros}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 min-w-[150px]"
              >
                <span>🔄</span>
                Limpiar Filtros
              </button>
              
                            <button
                onClick={exportarExcel}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 min-w-[150px]"
              >
                <span>📊</span>
                Exportar Excel
              </button>
              
              <button
                onClick={exportarPDF}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 min-w-[150px]"
              >
                <span>📄</span>
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
                <h2 className="text-xl font-semibold text-gray-800">
                  Resultados de Compras
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {comprasFiltradas.length} compras encontradas
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 lg:mt-0">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Fecha (Más reciente)</option>
                  <option>Fecha (Más antigua)</option>
                  <option>Monto (Mayor a menor)</option>
                  <option>Monto (Menor a mayor)</option>
                </select>
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
                          <span className={`text-xs px-2 py-1 rounded-full ${getColorPrioridad(compra.prioridad)}`}>
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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVerDetalle(compra)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalle"
                          >
                            <span className="text-lg">👁️</span>
                          </button>
                          <button
                            onClick={() => handleDescargarFactura(compra)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Descargar factura"
                          >
                            <span className="text-lg">📥</span>
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <span className="text-lg">🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <span className="text-4xl mb-4">🔍</span>
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
                            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
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
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                    Anterior
                  </button>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                    1
                  </span>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
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