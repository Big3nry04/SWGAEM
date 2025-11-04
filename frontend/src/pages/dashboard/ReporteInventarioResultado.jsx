import React, { useState } from "react";
import { ArrowLeft, Filter, Search, Package, Trash2, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReporteInventarioResultado() {
  const navigate = useNavigate();

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
      Activo: "bg-green-100 text-green-700 border border-green-400",
      Inactivo: "bg-yellow-100 text-yellow-700 border border-yellow-400",
      Agotado: "bg-red-100 text-red-700 border border-red-400",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estilos[estado]}`}>
        {estado}
      </span>
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* 🔙 Volver */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/reportes")}
          className="flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Volver</span>
        </button>
      </div>

      {/* 🧾 Encabezado */}
      <div className="flex items-center mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Reporte de Inventario</h1>
      </div>
      <p className="text-gray-500 mb-6">Control de stock y productos</p>

      {/* 🔍 Filtros */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="text-gray-600 w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold text-gray-700">Filtros de Búsqueda</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Categoría */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Categoría</label>
            <select
              name="categoria"
              value={filtros.categoria}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="">Todas las categorías</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Oficina">Oficina</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Estado</label>
            <select
              name="estado"
              value={filtros.estado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Agotado">Agotado</option>
            </select>
          </div>

          {/* Stock mínimo */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Stock Mínimo</label>
            <input
              type="number"
              name="stockMinimo"
              placeholder="Ej: 10"
              value={filtros.stockMinimo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>

          {/* Buscar producto */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Buscar Producto</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                name="producto"
                placeholder="Código o nombre..."
                value={filtros.producto}
                onChange={handleChange}
                className="w-full text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-4">
          <button
            onClick={handleGenerarReporte}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm transition"
          >
            Generar Reporte
          </button>
          <button
            onClick={handleLimpiarFiltros}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm transition"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* 📋 Resultados */}
      {reporteGenerado && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Resultados del Reporte
            </h3>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition">
              <FileDown className="w-4 h-4" />
              Exportar
            </button>
          </div>

          {filteredData.length === 0 ? (
            <p className="text-gray-500 text-sm">No se encontraron productos que coincidan con los filtros.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-600 border-b">
                  <th className="p-3">Código</th>
                  <th className="p-3">Producto</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Stock Actual</th>
                  <th className="p-3">Stock Mínimo</th>
                  <th className="p-3">Actualizado el</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.codigo} className="hover:bg-gray-50 border-b">
                    <td className="p-3">{item.codigo}</td>
                    <td className="p-3">{item.nombre}</td>
                    <td className="p-3">{item.categoria}</td>
                    <td className="p-3">
                      <EstadoBadge estado={item.estado} />
                    </td>
                    <td className="p-3">{item.stockActual}</td>
                    <td className="p-3">{item.stockMinimo}</td>
                    <td className="p-3">{item.actualizado}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleEliminar(item.codigo)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* 🧾 Modal Confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirmar eliminación
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              ¿Estás seguro de eliminar este producto?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={confirmarEliminar}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Eliminar
              </button>
              <button
                onClick={cancelarEliminar}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm"
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
