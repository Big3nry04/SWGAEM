import { ArrowLeft, Filter, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HistorialVentas() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b pb-3">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Historial de Ventas</h1>
          <p className="text-sm text-gray-500">
            Consulte y filtre el historial de transacciones
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
            Administrador
          </span>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Botón volver */}
      <button
        onClick={() => navigate("/venta")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      {/* Contenedor principal */}
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Filtros avanzados */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Filter className="text-blue-600" size={20} /> Filtros Avanzados
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Use los filtros para encontrar ventas específicas
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Cliente, ID o documento..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="">Todos los vendedores</option>
              <option>Juan Pérez</option>
              <option>María Gómez</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="">Todos los estados</option>
              <option>Completada</option>
              <option>Pendiente</option>
              <option>Anulada</option>
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Monto mínimo"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Monto máximo"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <div className="flex gap-2 mt-1">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Search size={16} /> Buscar
              </button>
              <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition">
                Limpiar Filtros
              </button>
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} /> Resultados de Búsqueda
          </h3>
          <div className="text-center border rounded-xl py-10 text-gray-500">
            <p className="text-sm">0 ventas encontradas</p>
            <p className="text-gray-400 mt-2">
              No se encontraron ventas que coincidan con los filtros aplicados.
            </p>
          </div>

          <div className="flex justify-end mt-4 text-sm text-gray-600">
            <p>
              Total: <span className="font-semibold text-blue-600">S/ 0.00</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
