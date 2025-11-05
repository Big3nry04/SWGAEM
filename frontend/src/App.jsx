import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProveedoresPage from './pages/admin/ProveedoresPage';

import LayoutCompras from "./pages/compras/LayoutCompras";
import ComprasPage from "./pages/compras/ComprasPage";
import RegistrarCompra from "./pages/compras/RegistrarCompra";
import HistorialPage from "./pages/compras/HistorialPage";
import GenerarOrden from "./pages/compras/GenerarOrden";
import GestionarProveedores from "./pages/compras/GestionarProveedores";

import GestionVentas from "./pages/ventas/VentasPage";
import NuevaVenta from './pages/ventas/NuevaVenta';
import HistorialVentas from "./pages/ventas/HistorialVentas";
import GenerarComprobante from './pages/ventas/GenerarComprobante';

import GestionInventario from './pages/productos/GestionProducto';

import ReportesPage from './pages/reportes/Reportes';
import ReporteInventarioResultado from './pages/reportes/ReporteInventarioResultado';
import ReporteComprasResultado from './pages/reportes/ReporteComprasResultado';
import ReporteVentasResultado from './pages/reportes/ReporteVentasResultado';

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Redirigir raíz al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* Principales */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />

          {/* COMPRAS (layout + subrutas) */}
          <Route path="/compras" element={<LayoutCompras />}>
            <Route index element={<ComprasPage />} />
            <Route path="registrar" element={<RegistrarCompra />} />
            <Route path="historial" element={<HistorialPage />} />
            <Route path="orden" element={<GenerarOrden />} />
            <Route path="proveedores" element={<GestionarProveedores />} />
          </Route>

          {/* VENTAS */}
          <Route path="/ventas">
            <Route index element={<GestionVentas />} />
            <Route path="nueva" element={<NuevaVenta />} />
            <Route path="historial" element={<HistorialVentas />} />
            <Route path="comprobante" element={<GenerarComprobante />} />
          </Route>

          {/* PRODUCTOS */}
          <Route path="/productos" element={<GestionInventario />} />

          {/* REPORTES */}
          <Route path="/reportes">
            <Route index element={<ReportesPage />} />
            <Route path="inventario" element={<ReporteInventarioResultado />} />
            <Route path="compras" element={<ReporteComprasResultado />} />
            <Route path="ventas" element={<ReporteVentasResultado />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#363636', color: '#fff' },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
