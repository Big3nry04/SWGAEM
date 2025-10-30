import React, { useState, useMemo } from "react";

const ComprasPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const compras = [
    {
      id: "COMP-2024-001",
      codigo: "COMP-2024-001",
      proveedor: "Proveedor ABC S.A.",
      fecha: "2024-01-14",
      fechaFormateada: "14/01/2024",
      responsable: "Juan Pérez",
      monto: 15750.00,
      montoFormateado: "$15,750.00",
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
      montoFormateado: "$8,920.50",
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
      montoFormateado: "$23,400.75",
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
      montoFormateado: "$12,680.25",
      estado: "proceso",
      estadoTexto: "En Proceso",
      items: 6,
      prioridad: "media"
    },
  ];

  // Filtrado optimizado con useMemo
  const comprasFiltradas = useMemo(() => {
    return compras.filter((compra) => {
      const coincideBusqueda = [compra.codigo, compra.proveedor, compra.responsable]
        .some((campo) => campo.toLowerCase().includes(busqueda.toLowerCase()));
      
      const coincideEstado = filtroEstado === "todos" || compra.estado === filtroEstado;
      
      return coincideBusqueda && coincideEstado;
    });
  }, [busqueda, filtroEstado]);

  // Estadísticas
  const estadisticas = useMemo(() => {
    const total = comprasFiltradas.length;
    const montoTotal = comprasFiltradas.reduce((sum, compra) => sum + compra.monto, 0);
    const completadas = comprasFiltradas.filter(c => c.estado === "completada").length;
    
    return { total, montoTotal, completadas };
  }, [comprasFiltradas]);

  const handleVerDetalle = (compra) => {
    console.log("Ver detalle de compra:", compra);
    // Aquí iría la navegación o modal para ver detalles
  };

  const handleEditar = (compra) => {
    console.log("Editar compra:", compra);
    // Aquí iría la funcionalidad de edición
  };

  const handleExportar = () => {
    console.log("Exportar datos de compras");
    // Aquí iría la funcionalidad de exportación
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sistema de Gestión de Compras
          </h1>
          <p className="text-gray-600 text-lg">
            Control y seguimiento de adquisiciones empresariales
          </p>
        </header>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  ${estadisticas.montoTotal.toLocaleString('es-PE')}
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
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-2xl font-bold text-gray-900">{estadisticas.completadas}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header del panel con controles */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Listado de Compras</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Gestiona y revisa todas las operaciones de compra
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleExportar}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <span>📊</span>
                  Exportar
                </button>
                
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="proceso">En Proceso</option>
                  <option value="completada">Completada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Buscar por código, proveedor o responsable..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
                />
              </div>
            </div>
          </div>

          {/* Tabla */}
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
                            {compra.montoFormateado}
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
                            onClick={() => handleEditar(compra)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <span className="text-lg">✏️</span>
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
                        <p className="text-lg font-medium mb-2">No se encontraron resultados</p>
                        <p className="text-sm">
                          {busqueda || filtroEstado !== "todos" 
                            ? `No hay compras que coincidan con "${busqueda}"${filtroEstado !== "todos" ? ` y estado "${filtroEstado}"` : ''}`
                            : "No hay compras registradas"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComprasPage;