import { useState } from "react";
import { ArrowLeft, FileDown, TrendingUp, CalendarDays, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReporteVentas() {
  const navigate = useNavigate();

  // 🔹 Datos simulados (puedes conectarlos luego a tu backend)
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

  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleGenerar = () => {
    setMostrarResultados(true);
  };

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

  // 🔹 Filtrado dinámico
  const ventasFiltradas = ventasData.filter((venta) => {
    const fechaVenta = new Date(venta.fecha);
    const desde = filtros.fechaInicio ? new Date(filtros.fechaInicio) : null;
    const hasta = filtros.fechaFin ? new Date(filtros.fechaFin) : null;

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

  // 🔹 Totales dinámicos
  const totalVentas = ventasFiltradas.length;
  const ingresosTotales = ventasFiltradas.reduce(
    (sum, v) => sum + v.cantidad * v.precio,
    0
  );
  const clientesUnicos = new Set(ventasFiltradas.map((v) => v.cliente)).size;
  const promedioVenta = totalVentas ? ingresosTotales / totalVentas : 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Volver */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/reportes")}
          className="flex items-center text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-800">Reporte de Ventas</h1>
      <p className="text-gray-500 mb-6">Análisis de rendimiento</p>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Filtros de Búsqueda</h2>
        <p className="text-sm text-gray-500 mb-6">
          Configura los parámetros para generar tu reporte de ventas
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
          {/* Fecha Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fecha Inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Fecha Fin */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fecha Fin</label>
            <input
              type="date"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Cliente</label>
            <select
              name="cliente"
              value={filtros.cliente}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Todos los clientes</option>
              {[...new Set(ventasData.map((v) => v.cliente))].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Producto */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Producto</label>
            <select
              name="producto"
              value={filtros.producto}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Todos los productos</option>
              {[...new Set(ventasData.map((v) => v.producto))].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Responsable */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Responsable</label>
            <select
              name="responsable"
              value={filtros.responsable}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Todos los responsables</option>
              {[...new Set(ventasData.map((v) => v.responsable))].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={handleGenerar}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
          >
            Generar Reporte
          </button>
          <button
            onClick={handleLimpiar}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

        {/* Resultados: RECUADRO con estilo idéntico a tu UI */}
      {mostrarResultados ? (
        <>
          {/* Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <Card icon={<TrendingUp />} label="Total Ventas" value={totalVentas} />
            <Card icon={<FileDown />} label="Ingresos Totales" value={`S/ ${ingresosTotales.toFixed(2)}`} />
            <Card icon={<Users />} label="Clientes Únicos" value={clientesUnicos} />
            <Card icon={<CalendarDays />} label="Promedio por Venta" value={`S/ ${promedioVenta.toFixed(2)}`} />
          </div>

          {/* Este contenedor es el "recuadro" — ajustado para verse igual a tu captura */}
          <div className="bg-white rounded-[14px] border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Resultados del Reporte</h3>

              {/* Botón Exportar estilo pill violeta como en la captura */}
              <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-shadow shadow-md">
                <FileDown className="w-4 h-4 mr-2" />
                Exportar
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Se encontraron {ventasFiltradas.length} ventas que coinciden con los filtros
            </p>

            <div className="overflow-x-auto">
              {/* Tabla con bordes finos, cabecera gris claro y celdas con borde */}
              <table className="w-full text-sm border-separate" style={{ borderSpacing: 0 }}>
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-left">
                    <th className="py-3 px-4 border-b border-gray-200 text-sm font-semibold">N° Venta</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-sm font-semibold">Fecha</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-sm font-semibold">Cliente</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-sm font-semibold">Producto</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-sm font-semibold text-center">Cant.</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-sm font-semibold text-right">Precio Unit.</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-sm font-semibold text-right">Importe</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-sm font-semibold">Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {ventasFiltradas.length > 0 ? (
                    ventasFiltradas.map((v) => (
                      <tr key={v.id} className="even:bg-white odd:bg-white hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-100">{v.id}</td>
                        <td className="py-3 px-4 border-b border-gray-100">{v.fecha}</td>
                        <td className="py-3 px-4 border-b border-gray-100">{v.cliente}</td>
                        <td className="py-3 px-4 border-b border-gray-100">{v.producto}</td>
                        <td className="py-3 px-4 border-b border-gray-100 text-center">{v.cantidad}</td>
                        <td className="py-3 px-4 border-b border-gray-100 text-right">S/ {v.precio.toFixed(2)}</td>
                        <td className="py-3 px-4 border-b border-gray-100 text-right text-indigo-600 font-medium">
                          S/ {(v.precio * v.cantidad).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100">{v.responsable}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-6 text-center text-gray-500 italic">
                        No se encontraron resultados
                      </td>
                        </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-gray-500 italic text-sm text-center">Listo para generar reporte</div>
      )}
    </div>
  );
}

// 🔹 Subcomponente para las tarjetas
function Card({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-center gap-3">
        <div className="text-indigo-600 w-6 h-6">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
        </div>
      </div>
    </div>
  );
}
