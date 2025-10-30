import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ComprasPage from "./pages/compras/ComprasPage";
import RegistrarCompra from "./pages/compras/RegistrarCompra";
import HistorialPage from "./pages/compras/HistorialPage";
import GenerarOrden from "./pages/compras/GenerarOrden";
import GestionarProveedores from "./pages/compras/GestionarProveedores";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="bg-[#f8fafc] min-h-screen flex flex-col">
        {/* 🟦 HEADER */}
        <header className="bg-gradient-to-r from-[#1E3A8A] to-[#2E4DA7] shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-6 py-4">
            {/* Logo o Título */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <span className="text-[#1E3A8A] font-extrabold text-lg">M</span>
              </div>
              <h1 className="text-white text-xl sm:text-2xl font-semibold tracking-wide">
                MARSER PERÚ SAC
              </h1>
            </div>

            {/* Navegación */}
            <nav className="flex flex-wrap gap-4 mt-4 sm:mt-0">
              {[
                { path: "/compras", label: "Listado de Compras" },
                { path: "/registrar", label: "Registrar Compra" },
                { path: "/historial", label: "Historial" },
                { path: "/orden", label: "Generar Orden" },
                { path: "/proveedores", label: "Gestionar Proveedores" },
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-[#1E3A8A] shadow-sm"
                        : "text-white hover:bg-white/20"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        {/* 🧾 Contenido principal */}
        <main className="flex-grow p-6 sm:p-8">
          <Routes>
            <Route path="/" element={<ComprasPage />} />
            <Route path="/compras" element={<ComprasPage />} />
            <Route path="/registrar" element={<RegistrarCompra />} />
            <Route path="/historial" element={<HistorialPage />} />
            <Route path="/orden" element={<GenerarOrden />} />
            <Route path="/proveedores" element={<GestionarProveedores />} />
          </Routes>
        </main>

        {/* ⚙️ Footer */}
        <footer className="bg-[#1E3A8A] text-white text-center py-4 text-sm">
          © 2025 MARSER PERÚ SAC — Sistema de Compras Empresariales
        </footer>
      </div>
    </Router>
  );
}

export default App;
