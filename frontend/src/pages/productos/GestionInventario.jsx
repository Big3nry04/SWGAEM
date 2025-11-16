import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Package, ArrowLeft, FileText, History } from "lucide-react";

export default function GestionInventario({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentTab = () => {
    if (location.pathname.includes('/productos/lista')) return 'productos';
    if (location.pathname.includes('/productos/control')) return 'control';
    if (location.pathname.includes('/productos/movimientos')) return 'movimientos';
    return 'productos';
  };

  const vistaActual = getCurrentTab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header Moderno */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="relative flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
              title="Volver al panel"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden sm:inline font-medium">Volver</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MARSER PERÚ SAC</h1>
                <p className="text-xs text-blue-600">Sistema de Gestión</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación de pestañas moderna */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {[
              { id: 'productos', icon: Package, label: 'Productos', path: '/productos/lista' },
              { id: 'control', icon: FileText, label: 'Control de Inventario', path: '/productos/control' },
              { id: 'movimientos', icon: History, label: 'Movimientos', path: '/productos/movimientos' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`relative px-6 py-3 font-medium transition-all duration-300 ${
                    vistaActual === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {vistaActual === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}