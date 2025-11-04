import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProveedoresPage from './pages/admin/ProveedoresPage';
import LayoutCompras from "./pages/compras/LayoutCompras";
import ComprasPage from "./pages/compras/ComprasPage";           // listado
import RegistrarCompra from "./pages/compras/RegistrarCompra";
import HistorialPage from "./pages/compras/HistorialPage";
import GenerarOrden from "./pages/compras/GenerarOrden";
import GestionarProveedores from "./pages/compras/GestionarProveedores";
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Redirigir la ruta raíz al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas principales */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
            {/* --------- COMPRAS (layout + subrutas) --------- */}
        <Route path="/compras" element={<LayoutCompras />}>
          <Route index element={<ComprasPage />} />                 {/* /compras */}
          <Route path="registrar" element={<RegistrarCompra />} />  {/* /compras/registrar */}
          <Route path="historial" element={<HistorialPage />} />    {/* /compras/historial */}
          <Route path="orden" element={<GenerarOrden />} />         {/* /compras/orden */}
          <Route path="proveedores" element={<GestionarProveedores />} /> {/* /compras/proveedores */}
        </Route>

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        {/* Componente para mostrar notificaciones */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;