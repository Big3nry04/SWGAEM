// src/pages/compras/LayoutCompras.jsx
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Menu, ShoppingBag, PlusCircle, History, FileText, Building2, User,
  Phone, Mail, ChevronsLeft, ChevronsRight
} from "lucide-react";

export default function LayoutCompras() {
  const [collapsed, setCollapsed] = useState(false);

  const nav = [
    { to: "/compras", label: "Listado de Compras", icon: ShoppingBag, end: true },
    { to: "/compras/registrar", label: "Registrar Compra", icon: PlusCircle },
    { to: "/compras/historial", label: "Historial", icon: History },
    { to: "/compras/orden", label: "Generar Orden", icon: FileText },
    { to: "/compras/proveedores", label: "Gestionar Proveedores", icon: Building2 },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen flex">
      {/* SIDEBAR */}
      <aside className={`bg-gradient-to-b from-[#1E3A8A] to-[#2E4DA7] shadow-xl sticky top-0 h-screen transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}>
        <div className="p-4 border-b border-blue-500/30 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <span className="text-[#1E3A8A] font-extrabold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-white text-lg font-bold">MARSER PERÚ</h1>
                <p className="text-blue-200 text-xs">Sistema de Compras</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(v => !v)}
            className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            title={collapsed ? "Expandir" : "Colapsar"}
          >
            {collapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200
                 ${isActive ? "bg-white text-[#1E3A8A] shadow-md" : "text-white hover:bg-white/10"}`
              }
              title={collapsed ? label : ""}
            >
              <Icon className={`flex-shrink-0 ${collapsed ? "w-6 h-6" : "w-5 h-5"}`} />
              {!collapsed && <span className="font-medium text-sm">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Usuario */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">Usuario Sistema</p>
                <p className="text-blue-200 text-xs truncate">Administrador</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* CONTENIDO */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCollapsed(v => !v)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors lg:hidden"
                title="Menú"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Sistema de Gestión de Compras</h2>
                <p className="text-gray-600 text-sm mt-1">Control y administración de compras empresariales</p>
              </div>
            </div>
          </div>
        </header>

        {/* Aquí se renderiza cada subpágina */}
        <main className="flex-grow p-6 bg-gray-50/50">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">© 2024 MARSER PERÚ SAC — Sistema de Compras</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>+51 999 999 999</span></span>
              <span className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>contacto@marser.com</span></span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
