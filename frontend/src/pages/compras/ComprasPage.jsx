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
  ChevronDown
} from "lucide-react";

const StatCard = ({ title, value, icon, color, customColors = {} }) => {
  const colors = {
    blue: "bg-[#4160BE]/10 text-[#4160BE]", // Usando color primario
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    ...customColors
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

const ComprasPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // Datos de ejemplo
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
  }, [busqueda, filtroEstado, compras]); // Añadido 'compras' a las dependencias

  // Estadísticas
  const estadisticas = useMemo(() => {
    const total = comprasFiltradas.length;
    const montoTotal = comprasFiltradas.reduce((sum, compra) => sum + compra.monto, 0);
    const completadas = comprasFiltradas.filter(c => c.estado === "completada").length;
    
    return { 
      total, 
      montoTotal: montoTotal.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' }), // Asumiendo PEN, ajusta si es necesario
      completadas 
    };
  }, [comprasFiltradas]);

  // --- Handlers ---
  const handleVerDetalle = (compra) => {
    console.log("Ver detalle de compra:", compra);
    // Aquí iría la navegación o modal para ver detalles
  };

  const handleEditar = (compra) => {
    console.log("Editar compra:", compra);
    // Aquí iría la funcionalidad de edición
  };
  
  const handleEliminar = (compra) => {
    console.log("Eliminar compra:", compra);
    // Aquí iría la lógica de eliminación, p.ej. mostrar un modal de confirmación
  };

  const handleExportar = () => {
    console.log("Exportar datos de compras");
    // Aquí iría la funcionalidad de exportación
  };
  
  const handleNuevaCompra = () => {
    console.log("Crear nueva compra");
    // Aquí iría la lógica para abrir un modal o navegar a una página de creación
  };

  // --- Funciones de Estilo ---
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
      alta: "text-red-600 bg-red-100",
      media: "text-orange-600 bg-orange-100",
      baja: "text-green-600 bg-green-100"
    };
    return colores[prioridad] || "text-gray-600 bg-gray-100";
  };

  // --- Renderizado ---
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total de Compras" 
            value={estadisticas.total} 
            icon={<ClipboardList />} 
            color="blue" // Usará el nuevo azul
          />
          <StatCard 
            title="Monto Total (Filtrado)" 
            value={estadisticas.montoTotal}
            icon={<DollarSign />} 
            color="green" 
          />
          <StatCard 
            title="Completadas (Filtrado)" 
            value={estadisticas.completadas} 
            icon={<CheckCircle2 />} 
            color="purple" 
          />
        </div>

        {/* Panel principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header del panel con controles */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Título */}
              <div>
                <h2 className="text-xl font-semibold text-[#1E2C57]">Listado de Compras</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Gestiona y revisa todas las operaciones de compra
                </p>
              </div>
              
              {/* Controles y Acciones */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Búsqueda */}
                <div className="relative w-full sm:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar compra..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] bg-white"
                  />
                </div>
                
                {/* Filtro Estado */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="w-full appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] bg-white"
                  >
                    <option value="todos">Todos los estados</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="proceso">En Proceso</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Exportar */}
                <button 
                  onClick={handleExportar}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 bg-white"
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
                
                {/* Nueva Compra */}
                <button 
                  onClick={handleNuevaCompra}
                  className="px-4 py-2 bg-[#4160BE] text-white rounded-lg text-sm font-medium hover:bg-[#2A3E7A] transition-colors flex items-center justify-center gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Nueva Compra
                </button>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Responsable
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                        <span className="font-medium text-gray-900 text-sm">
                          {compra.codigo}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-800">{compra.proveedor}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{compra.fechaFormateada}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-800">{compra.responsable}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorPrioridad(compra.prioridad)}`}>
                          {compra.prioridad.charAt(0).toUpperCase() + compra.prioridad.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                         <span className="text-sm text-gray-600 text-center">{compra.items}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-900 text-sm">
                          {compra.montoFormateado}
                        </span>
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
                            className="p-2 text-gray-500 hover:text-[#4160BE] hover:bg-[#4160BE]/10 rounded-full transition-colors"
                            title="Ver detalle"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditar(compra)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded-full transition-colors"
                            title="Editar"
                          >
                            <FilePenLine className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEliminar(compra)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
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
                    <td colSpan="9" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Search className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium mb-2">No se encontraron resultados</p>
                        <p className="text-sm">
                          {busqueda || filtroEstado !== "todos" 
                            ? `No hay compras que coincidan con tus filtros.`
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