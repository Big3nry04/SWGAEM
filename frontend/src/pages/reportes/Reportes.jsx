import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  FileText,
  ShoppingCart,
  BarChart2,
} from "lucide-react";

export default function Reportes() {
  const navigate = useNavigate();

  const [exportaciones] = useState([
    { id: 1, nombre: "Reporte de Inventario", fecha: "2024-01-15 14:30", usuario: "Admin", formato: "PDF" },
    { id: 2, nombre: "Reporte de Ventas", fecha: "2024-01-15 10:15", usuario: "Vendedor1", formato: "Excel" },
    { id: 3, nombre: "Reporte de Compras", fecha: "2024-01-14 16:45", usuario: "Admin", formato: "PDF" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar unificado */}
      <header className="h-14 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-[#4160BE] hover:text-[#2A3E7A]"
          title="Volver al panel"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#4160BE] flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <div className="text-right">
            <h1 className="text-sm font-semibold text-gray-900">MARSER PERÚ SAC</h1>
            <p className="text-xs text-gray-500">Sistema de Reportes</p>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Gestión de Reportes</h1>
        <p className="text-gray-500 mb-6">Sistema Administrativo MARSER PERÚ SAC</p>

        {/* Tarjetas principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Inventario */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="text-blue-600" />
              </div>
              <h2 className="ml-3 text-lg font-semibold text-gray-700">Inventario</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Control de stock y productos. Genera reportes por categoría, estado y stock mínimo.
            </p>
            <button
              onClick={() => navigate("/reportes/inventario")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Generar Reporte
            </button>
          </div>

          {/* Compras */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <ShoppingCart className="text-green-600" />
              </div>
              <h2 className="ml-3 text-lg font-semibold text-gray-700">Compras</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Analiza compras por proveedor, producto, fechas y responsables.
            </p>
            <button
              onClick={() => navigate("/reportes/compras")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              Generar Reporte
            </button>
          </div>

          {/* Ventas */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center mb-3">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <BarChart2 className="text-indigo-600" />
              </div>
              <h2 className="ml-3 text-lg font-semibold text-gray-700">Ventas</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Revisa ventas por cliente, producto, períodos y vendedores asignados.
            </p>
            <button
              onClick={() => navigate("/reportes/ventas")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
            >
              Generar Reporte
            </button>
          </div>
        </div>

        {/* Historial de exportaciones */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Historial de Exportaciones</h3>
          <p className="text-sm text-gray-500 mb-4">Últimas exportaciones realizadas en el sistema</p>
          <div className="divide-y divide-gray-100">
            {exportaciones.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-700">{item.nombre}</p>
                  <p className="text-xs text-gray-400">
                    {item.fecha} · {item.usuario}
                  </p>
                </div>
                <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">
                  {item.formato}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
