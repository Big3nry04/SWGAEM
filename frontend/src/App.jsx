import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProveedoresPage from './pages/admin/ProveedoresPage';
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