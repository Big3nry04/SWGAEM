/// src/pages/compras/LayoutCompras.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

export default function LayoutCompras() {
  const navigate = useNavigate();

  const tabs = [
    { to: "/compras", label: "Listado de Compras", end: true },
    { to: "/compras/registrar", label: "Registrar" },
    { to: "/compras/historial", label: "Historial" },
    { to: "/compras/orden", label: "Generar Orden" },
    { to: "/compras/proveedores", label: "Proveedores" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Topbar compacto */}
      <header className="h-14 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-[#4160BE] hover:text-[#2A3E7A]"
            title="Volver al panel"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-[#4160BE] flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">MARSER PERÚ SAC</h1>
            <p className="text-xs text-gray-500">Sistema de Compras</p>
          </div>
        </div>
      </header>

      {/* Título de página */}
      <div className="px-4 sm:px-6 lg:px-8 py-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Compras</h2>
        <p className="text-sm text-gray-600 mt-1">
          Control y administración de compras empresariales
        </p>
      </div>

      {/* Tabs horizontales */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `whitespace-nowrap py-3 border-b-2 text-sm font-medium
                  ${isActive
                    ? "border-[#4160BE] text-[#4160BE]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenido de cada subruta */}
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
