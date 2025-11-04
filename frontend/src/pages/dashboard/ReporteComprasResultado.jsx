import React, { useState } from "react";
import { ArrowLeft, Filter, CalendarDays, ShoppingCart, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReporteCompras() {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    proveedor: "Todos los proveedores",
    producto: "Todos los productos",
    responsable: "Todos los responsables",
  });

  const [mostrarResultados, setMostrarResultados] = useState(false);

  // 📦 Datos simulados (idénticos a la vista)
  const comprasData = [
    { id: "C-2024-001", fecha: "2024-01-15", proveedor: "TechSupply S.A.", producto: "Laptop Dell Inspiron 15", cantidad: 10, costoUnit: 2500, responsable: "Carlos Mendoza" },
    { id: "C-2024-002", fecha: "2024-01-14", proveedor: "Accesorios Pro", producto: "Mouse inalámbrico Logitech", cantidad: 50, costoUnit: 45, responsable: "Ana García" },
    { id: "C-2024-003", fecha: "2024-01-13", proveedor: "Monitores Express", producto: "Monitor Samsung 24”", cantidad: 15, costoUnit: 1750, responsable: "Luis Rodríguez" },
    { id: "C-2024-004", fecha: "2024-01-12", proveedor: "Gaming Store", producto: "Teclado Mecánico RGB", cantidad: 25, costoUnit: 120, responsable: "María López" },
    { id: "C-2024-005", fecha: "2024-01-11", proveedor: "Oficina Total", producto: "Impresora HP LaserJet", cantidad: 8, costoUnit: 700, responsable: "Carlos Mendoza" },
    { id: "C-2024-006", fecha: "2024-01-10", proveedor: "Accesorios Pro", producto: "Webcam HD 1080p", cantidad: 20, costoUnit: 90, responsable: "Ana García" },
    { id: "C-2024-007", fecha: "2024-01-09", proveedor: "TechSupply S.A.", producto: "Tablet Samsung Galaxy", cantidad: 12, costoUnit: 950, responsable: "Luis Rodríguez" },
    { id: "C-2024-008", fecha: "2024-01-08", proveedor: "Audio Solutions", producto: "Auriculares Bluetooth", cantidad: 30, costoUnit: 85, responsable: "María López" },
    { id: "C-2024-009", fecha: "2024-01-07", proveedor: "Oficina Total", producto: "Silla Ergonómica", cantidad: 5, costoUnit: 980, responsable: "Carlos Mendoza" },
    { id: "C-2024-010", fecha: "2024-01-06", proveedor: "Gaming Store", producto: "Mousepad Gaming XL", cantidad: 40, costoUnit: 25, responsable: "Ana García" },
  ];

  // 📅 Filtrado dinámico
  const comprasFiltradas = comprasData.filter((compra) => {
    const fechaCompra = new Date(compra.fecha);
    const desde = filtros.fechaInicio ? new Date(filtros.fechaInicio) : null;
    const hasta = filtros.fechaFin ? new Date(filtros.fechaFin) : null;

    const coincideProveedor =
      filtros.proveedor === "Todos los proveedores" || compra.proveedor === filtros.proveedor;
    const coincideProducto =
      filtros.producto === "Todos los productos" || compra.producto === filtros.producto;
    const coincideResponsable =
      filtros.responsable === "Todos los responsables" || compra.responsable === filtros.responsable;
    const coincideFecha =
      (!desde || fechaCompra >= desde) && (!hasta || fechaCompra <= hasta);

    return coincideProveedor && coincideProducto && coincideResponsable && coincideFecha;
  });

  // 📊 Totales
  const totalCompras = comprasFiltradas.length;
  const montoTotal = comprasFiltradas.reduce((sum, c) => sum + c.cantidad * c.costoUnit, 0);
  const promedioCompra = totalCompras ? montoTotal / totalCompras : 0;

  // 🧮 Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleGenerar = () => setMostrarResultados(true);
  const handleLimpiar = () => {
    setFiltros({
      fechaInicio: "",
      fechaFin: "",
      proveedor: "Todos los proveedores",
      producto: "Todos los productos",
      responsable: "Todos los responsables",
    });
    setMostrarResultados(false);
  };

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

      <h1 className="text-2xl font-bold text-gray-800">Reporte de Compras</h1>
      <p className="text-gray-500 mb-6">Historial de adquisiciones</p>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
        <div className="flex items-center mb-2">
          <Filter className="text-gray-600 w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold text-gray-700">Filtros de Búsqueda</h2>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Configura los parámetros para generar tu reporte de compras
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fecha Inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fecha Fin</label>
            <input
              type="date"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Proveedor</label>
            <select
              name="proveedor"
              value={filtros.proveedor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option>Todos los proveedores</option>
              {[...new Set(comprasData.map((v) => v.proveedor))].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Producto</label>
            <select
              name="producto"
              value={filtros.producto}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option>Todos los productos</option>
              {[...new Set(comprasData.map((v) => v.producto))].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Responsable</label>
            <select
              name="responsable"
              value={filtros.responsable}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option>Todos los responsables</option>
              {[...new Set(comprasData.map((v) => v.responsable))].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerar}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
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

      {/* Resultados */}
      {!mostrarResultados ? (
        <div className="text-gray-500 italic text-sm text-center">
          Listo para generar reporte
        </div>
      ) : (
        <>
          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <Card icon={<ShoppingCart />} label="Total Compras" value={totalCompras} />
            <Card icon={<FileDown />} label="Monto Total" value={`S/ ${montoTotal.toFixed(2)}`} />
            <Card icon={<CalendarDays />} label="Promedio por Compra" value={`S/ ${promedioCompra.toFixed(2)}`} />
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Resultados del Reporte</h3>
              <button className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-shadow shadow-md">
                <FileDown className="w-4 h-4 mr-2" />
                Exportar
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Se encontraron {comprasFiltradas.length} compras que coinciden con los filtros
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate" style={{ borderSpacing: 0 }}>
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-left">
                    <th className="py-3 px-4 border-b border-gray-200 font-semibold">N° Compra</th>
                    <th className="py-3 px-4 border-b border-gray-200 font-semibold">Fecha</th>
                    <th className="py-3 px-4 border-b border-gray-200 font-semibold">Proveedor</th>
                    <th className="py-3 px-4 border-b border-gray-200 font-semibold">Producto</th>
                    <th className="py-3 px-4 border-b border-gray-200 font-semibold text-center">Cant.</th>
                    <th className="py-3 px-4 border-b border-gray-200 font-semibold text-right">Costo Unit.</th>
                    <th className="py-3 px-4 border-b border-gray-200 font-semibold text-right">Costo Total</th>
                    <th className="py-3 px-4 border-b border-gray-200 font-semibold">Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {comprasFiltradas.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">{c.id}</td>
                      <td className="py-3 px-4 border-b">{c.fecha}</td>
                      <td className="py-3 px-4 border-b">{c.proveedor}</td>
                      <td className="py-3 px-4 border-b">{c.producto}</td>
                      <td className="py-3 px-4 border-b text-center">{c.cantidad}</td>
                      <td className="py-3 px-4 border-b text-right">S/ {c.costoUnit.toFixed(2)}</td>
                      <td className="py-3 px-4 border-b text-right text-green-600 font-medium">
                        S/ {(c.cantidad * c.costoUnit).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 border-b">{c.responsable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Card({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-center gap-3">
        <div className="text-green-600 w-6 h-6">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
        </div>
      </div>
    </div>
  );
}