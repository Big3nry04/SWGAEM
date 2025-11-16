import React, { useState } from "react";
import { ArrowLeft, Filter, Search, Package, Trash2, FileDown, AlertTriangle } from "lucide-react";

export default function ReporteInventarioResultado() {
  const [filtros, setFiltros] = useState({
    categoria: "",
    estado: "",
    stockMinimo: "",
    producto: "",
  });

  const [reporteGenerado, setReporteGenerado] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // 📊 Datos simulados
  const [data, setData] = useState([
    {
      codigo: "PR0081",
      nombre: "Laptop Dell Inspiron 15",
      categoria: "Electrónica",
      estado: "Activo",
      stockActual: 25,
      stockMinimo: 10,
      actualizado: "2024-01-15",
    },
    {
      codigo: "PR0082",
      nombre: "Mouse Inalámbrico Logitech",
      categoria: "Accesorios",
      estado: "Activo",
      stockActual: 150,
      stockMinimo: 50,
      actualizado: "2024-01-14",
    },
    {
      codigo: "PR0083",
      nombre: 'Monitor Samsung 24"',
      categoria: "Electrónica",
      estado: "Activo",
      stockActual: 8,
      stockMinimo: 15,
      actualizado: "2024-01-13",
    },
    {
      codigo: "PR0084",
      nombre: "Teclado Mecánico RGB",
      categoria: "Electrónica",
      estado: "Inactivo",
      stockActual: 20,
      stockMinimo: 20,
      actualizado: "2024-01-12",
    },
    {
      codigo: "PR0085",
      nombre: "Impresora HP LaserJet",
      categoria: "Oficina",
      estado: "Activo",
      stockActual: 12,
      stockMinimo: 5,
      actualizado: "2024-01-15",
    },
    {
      codigo: "PR0086",
      nombre: "Webcam HD 1080p",
      categoria: "Accesorios",
      estado: "Agotado",
      stockActual: 0,
      stockMinimo: 10,
      actualizado: "2024-01-10",
    },
    {
      codigo: "PR0087",
      nombre: "Tablet Samsung Galaxy",
      categoria: "Electrónica",
      estado: "Activo",
      stockActual: 18,
      stockMinimo: 8,
      actualizado: "2024-01-14",
    },
    {
      codigo: "PR0088",
      nombre: "Auriculares Bluetooth",
      categoria: "Accesorios",
      estado: "Activo",
      stockActual: 45,
      stockMinimo: 25,
      actualizado: "2024-01-15",
    },
  ]);

  const [filteredData, setFilteredData] = useState([]);

  // 🧮 Manejo de cambios
  const handleChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  // 🧾 Generar reporte
  const handleGenerarReporte = () => {
    const { categoria, estado, stockMinimo, producto } = filtros;
    const resultados = data.filter((item) => {
      const cumpleCategoria = categoria ? item.categoria === categoria : true;
      const cumpleEstado = estado ? item.estado === estado : true;
      const cumpleStock = stockMinimo ? item.stockActual <= parseInt(stockMinimo) : true;
      const cumpleProducto = producto
        ? item.nombre.toLowerCase().includes(producto.toLowerCase()) ||
          item.codigo.toLowerCase().includes(producto.toLowerCase())
        : true;

      return cumpleCategoria && cumpleEstado && cumpleStock && cumpleProducto;
    });

    setFilteredData(resultados);
    setReporteGenerado(true);
  };

  // 🧹 Limpiar filtros
  const handleLimpiarFiltros = () => {
    setFiltros({
      categoria: "",
      estado: "",
      stockMinimo: "",
      producto: "",
    });
    setReporteGenerado(false);
    setFilteredData([]);
  };

  // 🗑 Confirmar eliminación
  const handleEliminar = (codigo) => {
    setProductoAEliminar(codigo);
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    setData((prev) => prev.filter((item) => item.codigo !== productoAEliminar));
    setFilteredData((prev) => prev.filter((item) => item.codigo !== productoAEliminar));
    setMostrarConfirmacion(false);
    setProductoAEliminar(null);
  };

  const cancelarEliminar = () => {
    setMostrarConfirmacion(false);
    setProductoAEliminar(null);
  };

  // 🧱 Etiqueta de estado con color
  const EstadoBadge = ({ estado }) => {
    const estilos = {
      Activo: "bg-green-50 text-green-700 border border-green-200",
      Inactivo: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      Agotado: "bg-red-50 text-red-700 border border-red-200",
    };
    return (
      <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${estilos[estado]}`}>
        {estado === "Activo" && "● "}
        {estado === "Inactivo" && "○ "}
        {estado === "Agotado" && "⚠ "}
        {estado}
      </span>
    );
  };

  // Calcular estadísticas
  const totalProductos = filteredData.length;
  const productosActivos = filteredData.filter(p => p.estado === "Activo").length;
  const stockBajo = filteredData.filter(p => p.stockActual < p.stockMinimo).length;
  const stockTotal = filteredData.reduce((sum, p) => sum + p.stockActual, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-white">
      {/* Header Moderno */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-200 group"
                title="Volver"
              >
                <span className="text-2xl group-hover:-translate-x-1 inline-block transition-all duration-200">←</span>
              </button>
              
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-400 rounded-full border-2 border-white"></div>
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">Reporte de Inventario</h1>
                <p className="text-xs text-gray-500">Control de Stock y Productos</p>
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
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                📦 Gestión de Inventario
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Reporte de <span className="text-purple-600">Inventario</span>
            </h2>
            <p className="text-gray-600">
              Analiza y controla el stock de productos en tiempo real
            </p>
          </div>

          {/* Panel de Filtros */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-purple-50/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Filter className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h3>
                  <p className="text-sm text-gray-500">Configura los parámetros para generar tu reporte</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Categoría */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📂 Categoría</label>
                  <select
                    name="categoria"
                    value={filtros.categoria}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Todas las categorías</option>
                    <option value="Electrónica">Electrónica</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Oficina">Oficina</option>
                  </select>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🔄 Estado</label>
                  <select
                    name="estado"
                    value={filtros.estado}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Todos los estados</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Agotado">Agotado</option>
                  </select>
                </div>

                {/* Stock mínimo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📊 Stock Mínimo</label>
                  <input
                    type="number"
                    name="stockMinimo"
                    placeholder="Ej: 10"
                    value={filtros.stockMinimo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Buscar producto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🔍 Buscar Producto</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="producto"
                      placeholder="Código o nombre..."
                      value={filtros.producto}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerarReporte}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <span>📊</span>
                  <span>Generar Reporte</span>
                </button>
                <button
                  onClick={handleLimpiarFiltros}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium transition-all duration-200"
                >
                  <span>🔄</span>
                  <span>Limpiar Filtros</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          {!reporteGenerado ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Listo para generar reporte</h3>
              <p className="text-gray-500">Configura los filtros y haz clic en "Generar Reporte"</p>
            </div>
          ) : (
            <>
              {/* Tarjetas Resumen */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Package className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Productos</p>
                      <h3 className="text-2xl font-bold text-gray-900">{totalProductos}</h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">✓</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Productos Activos</p>
                      <h3 className="text-2xl font-bold text-gray-900">{productosActivos}</h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                      <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Stock Bajo</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stockBajo}</h3>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">📦</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Stock Total</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stockTotal}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabla de Resultados */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-purple-50/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Resultados del Reporte</h3>
                        <p className="text-sm text-gray-500">{filteredData.length} productos encontrados</p>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                      <FileDown className="w-4 h-4" />
                      <span>Exportar</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {filteredData.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">No se encontraron productos que coincidan con los filtros.</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-100">
                      <thead className="bg-gray-50/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Producto</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoría</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock Actual</th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock Mínimo</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actualizado</th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {filteredData.map((item) => (
                          <tr key={item.codigo} className="hover:bg-purple-50/30 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-semibold text-gray-900">{item.codigo}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-900">{item.nombre}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">{item.categoria}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <EstadoBadge estado={item.estado} />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                item.stockActual < item.stockMinimo 
                                  ? 'bg-red-50 text-red-700' 
                                  : 'bg-green-50 text-green-700'
                              }`}>
                                {item.stockActual}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm text-gray-600">{item.stockMinimo}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className="text-base">📅</span>
                                <span className="text-sm text-gray-600">{item.actualizado}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleEliminar(item.codigo)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Eliminar producto"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Modal Confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 text-center transform transition-all">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Confirmar eliminación
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              ¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={confirmarEliminar}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105"
              >
                Eliminar
              </button>
              <button
                onClick={cancelarEliminar}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
