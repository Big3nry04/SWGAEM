import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import ComprasPage from "./pages/compras/ComprasPage";
import RegistrarCompra from "./pages/compras/RegistrarCompra";
import HistorialPage from "./pages/compras/HistorialPage";
import GenerarOrden from "./pages/compras/GenerarOrden";
import GestionarProveedores from "./pages/compras/GestionarProveedores";
import "./App.css";

// Iconos SVG
const Iconos = {
  Menu: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Compras: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  Registrar: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Historial: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  Orden: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Proveedores: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Usuario: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Telefono: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Email: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Collapse: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  ),
  Expand: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  )
};

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const navigationItems = [
    { 
      path: "/compras", 
      label: "Listado de Compras", 
      icon: Iconos.Compras 
    },
    { 
      path: "/registrar", 
      label: "Registrar Compra", 
      icon: Iconos.Registrar 
    },
    { 
      path: "/historial", 
      label: "Historial", 
      icon: Iconos.Historial 
    },
    { 
      path: "/orden", 
      label: "Generar Orden", 
      icon: Iconos.Orden 
    },
    { 
      path: "/proveedores", 
      label: "Gestionar Proveedores", 
      icon: Iconos.Proveedores 
    },
  ];

  return (
    <Router>
      <div className="bg-[#f8fafc] min-h-screen flex">
        {/* Sidebar Vertical */}
        <aside className={`bg-gradient-to-b from-[#1E3A8A] to-[#2E4DA7] shadow-xl min-h-screen sticky top-0 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}>
          {/* Logo y Botón de Colapsar */}
          <div className="p-4 border-b border-blue-500/30">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
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
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
                title={sidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
              >
                {sidebarCollapsed ? (
                  <Iconos.Expand className="w-5 h-5" />
                ) : (
                  <Iconos.Collapse className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Navegación */}
          <nav className="p-4 space-y-2">
            {navigationItems.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-white text-[#1E3A8A] shadow-md"
                      : "text-white hover:bg-white/10 hover:shadow-sm"
                  }`
                }
                title={sidebarCollapsed ? link.label : ""}
              >
                <link.icon className={`flex-shrink-0 ${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
                {!sidebarCollapsed && (
                  <span className="font-medium text-sm">{link.label}</span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Información de usuario */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/30">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Iconos.Usuario className="w-4 h-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Usuario Sistema</p>
                  <p className="text-blue-200 text-xs truncate">Administrador</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Contenido Principal */}
        <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
          {/* Header pequeño */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors lg:hidden"
                    title="Menú"
                  >
                    <Iconos.Menu className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Sistema de Gestión de Compras
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Control y administración de compras empresariales
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </header>

          {/* Contenido */}
          <main className={`flex-grow p-6 bg-gray-50/50 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
          }`}>
            <Routes>
              <Route path="/" element={<ComprasPage />} />
              <Route path="/compras" element={<ComprasPage />} />
              <Route path="/registrar" element={<RegistrarCompra />} />
              <Route path="/historial" element={<HistorialPage />} />
              <Route path="/orden" element={<GenerarOrden />} />
              <Route path="/proveedores" element={<GestionarProveedores />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4 px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">
                © 2024 MARSER PERÚ SAC — Sistema de Compras Empresariales
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center space-x-2">
                  <Iconos.Telefono className="w-4 h-4" />
                  <span>Soporte: +51 999 999 999</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Iconos.Email className="w-4 h-4" />
                  <span>contacto@marser.com</span>
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;