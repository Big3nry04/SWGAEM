/// src/pages/compras/LayoutCompras.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  ListChecks,
  FilePlus2,
  Clock3,
  ClipboardList,
  Users,
} from "lucide-react";

export default function LayoutCompras() {
  const navigate = useNavigate();

  const tabs = [
    { to: "/compras", label: "Listado de Compras", icon: ListChecks, end: true },
    { to: "/compras/registrar", label: "Registrar", icon: FilePlus2 },
    { to: "/compras/historial", label: "Historial", icon: Clock3 },
    { to: "/compras/orden", label: "Generar Orden", icon: ClipboardList },
    { to: "/compras/proveedores", label: "Proveedores", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">

    
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            <button
              onClick={() => navigate("/dashboard")}
              className="relative flex items-center space-x-2 px-4 py-2.5 text-gray-600 
                         hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
              title="Volver al panel"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden sm:inline font-medium">Volver</span>
            </button>

        
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 
                                rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gestión de Compras</h1>
                <p className="text-xs text-blue-600">Módulo Empresarial</p>
              </div>
            </div>

          </div>
        </div>
      </header>

  
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="-mb-px flex gap-8" aria-label="Tabs">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <NavLink
                  key={t.to}
                  to={t.to}
                  end={t.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-4 border-b-2 font-medium text-base transition-all
                    ${
                      isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-blue-600 "
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* CONTENIDO DINÁMICO */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <Outlet />
      </main>

    </div>
  );
}
