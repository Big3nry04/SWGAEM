import { useEffect, useState } from "react";
import { Plus, Search, FileText, Download, Clock, Users, ShoppingCart, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GestionVentas() {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);

  // 🔹 Cargar ventas desde localStorage
  useEffect(() => {
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
    setVentas(ventasGuardadas);
  }, []);

  // 🔹 Calcular estadísticas
  const totalVentas = ventas.reduce((acc, v) => acc + v.total, 0);
  const totalTransacciones = ventas.length;
  const clientesUnicos = new Set(ventas.map(v => v.cliente.nombre)).size;
  const porcentajeCompletadas = totalTransacciones > 0 ? "100%" : "0%";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b pb-3">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Marser Perú S.A.C.</h1>
          <p className="text-sm text-gray-500">Sistema de Gestión de Ventas</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
            Administrador
          </span>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <Card icon={<BarChart3 className="text-blue-600" />} title="Ventas Totales" value={`S/ ${totalVentas.toFixed(2)}`} subtitle={`${totalTransacciones > 0 ? `${totalTransacciones} ventas registradas` : "Sin ventas registradas"}`} />
        <Card icon={<ShoppingCart className="text-green-600" />} title="Transacciones" value={totalTransacciones} subtitle="Total de ventas" />
        <Card icon={<FileText className="text-indigo-600" />} title="Completadas" value={porcentajeCompletadas} subtitle={`${totalTransacciones} ventas completadas`} />
        <Card icon={<Users className="text-orange-600" />} title="Clientes" value={clientesUnicos} subtitle="Clientes únicos" />
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gestión de Ventas */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Gestión de Ventas</h2>
              <p className="text-sm text-gray-500">
                Administre las ventas, consulte el historial y genere comprobantes
              </p>
            </div>
            {/* 🔹 Botón Nueva Venta */}
            <button
              onClick={() => navigate("/nueva-venta")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Plus size={18} /> Nueva Venta
            </button>
          </div>

          {/* 🔍 Buscador */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por cliente o ID de venta..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              />
            </div>
            <button
              onClick={() => navigate("/historial-ventas")}
              className="border border-gray-300 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Filtros
            </button>
          </div>

          {/* 🧾 Tabla o mensaje vacío */}
          {ventas.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto text-gray-300 mb-3" size={40} />
              <p className="text-gray-500">No hay ventas registradas aún.</p>
              <p className="text-sm text-gray-400">Comience registrando una nueva venta.</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-2 text-left">Cliente</th>
                  <th className="p-2 text-left">Vendedor</th>
                  <th className="p-2 text-left">Fecha</th>
                  <th className="p-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id} className="border-b hover:bg-gray-50 text-sm">
                    <td className="p-2">{v.cliente.nombre}</td>
                    <td className="p-2">{v.vendedor}</td>
                    <td className="p-2">{v.fecha}</td>
                    <td className="p-2 font-semibold text-blue-600">S/ {v.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Acciones rápidas + Actividad reciente */}
        <div className="flex flex-col gap-6">
          {/* Acciones rápidas */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
            <div className="flex flex-col gap-3">
              <ActionButton icon={<Plus size={18} />} text="Registrar Nueva Venta" onClick={() => navigate("/nueva-venta")} />
              <ActionButton icon={<Search size={18} />} text="Consultar Historial" onClick={() => navigate("/historial-ventas")} />
              <ActionButton icon={<FileText size={18} />} text="Generar Comprobante" onClick={() => navigate("/generar-comprobante")} />
              <ActionButton icon={<Download size={18} />} text="Ver Reportes" />
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
            {ventas.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-400 py-10">
                <Clock size={40} className="mb-3" />
                <p>No hay actividad reciente</p>
              </div>
            ) : (
              <ul className="text-sm text-gray-600">
                {ventas.slice(-3).reverse().map(v => (
                  <li key={v.id} className="mb-2">
                    🧾 Venta registrada para <b>{v.cliente.nombre}</b> — S/ {v.total.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 🧱 Card Component
function Card({ icon, title, value, subtitle }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

// ⚙️ Action Button Component
function ActionButton({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition text-gray-700 hover:text-blue-700"
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}

