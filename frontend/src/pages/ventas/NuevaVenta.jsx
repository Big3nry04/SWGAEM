import { ArrowLeft, Calendar, User, ShoppingCart, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NuevaVenta() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b pb-3">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Marser Perú S.A.C.</h1>
          <p className="text-sm text-gray-500">Registrar nueva venta</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
            Administrador
          </span>
        </div>
      </header>

      {/* Botón volver */}
      <button
        onClick={() => navigate("/ventas")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario principal */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-6">
          {/* Información del cliente */}
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <User className="text-blue-600" size={20} /> Información del Cliente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nombre / Razón Social *
                </label>
                <input
                  type="text"
                  placeholder="Empresa ABC S.A.C."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">DNI / RUC *</label>
                <input
                  type="text"
                  placeholder="20123456789"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="cliente@empresa.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
                <input
                  type="text"
                  placeholder="999 123 456"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Información de la venta */}
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <Calendar className="text-blue-600" size={20} /> Información de la Venta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Fecha de Venta *</label>
                <input
                  type="date"
                  defaultValue="2025-10-31"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Vendedor Responsable *
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
                  <option value="">Seleccionar vendedor</option>
                  <option>Juan Perez</option>
                  <option>Maria Garcia</option>
                  <option>Carlos Lopez</option>
                  <option>Ana Rodriguez</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Observaciones</label>
                <textarea
                  placeholder="Notas adicionales sobre la venta..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Productos */}
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <ShoppingCart className="text-blue-600" size={20} /> Productos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Producto</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
                  <option value="">Seleccionar producto</option>
                  <option>Producto A: S/25.50 (100 stock)</option>
                  <option>Producto B: S/45.00 (50 stock)</option>
                  <option>Producto C: S/15.75 (200 stock)</option>
                  <option>Producto D: S/80.00 (30 stock)</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                  Agregar
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Resumen de venta */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} /> Resumen de Venta
          </h3>
          <div className="text-sm text-gray-600 space-y-2 mb-4">
            <p>
              Productos: <span className="font-medium text-gray-800">0</span>
            </p>
            <p>
              Cantidad total: <span className="font-medium text-gray-800">0</span>
            </p>
          </div>
          <div className="border-t pt-3 mb-4">
            <p className="text-xl font-bold text-gray-800">
              Total: <span className="text-blue-600">S/ 0.00</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
              <FileText size={18} /> Registrar Venta
            </button>
            <button
              onClick={() => navigate("/ventas")}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
