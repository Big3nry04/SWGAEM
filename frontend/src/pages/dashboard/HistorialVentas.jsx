import { useState, useEffect } from "react";
import { ArrowLeft, Filter, FileText, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HistorialVentas() {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [vendedor, setVendedor] = useState("");

  // Cargar ventas del localStorage
  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("ventas")) || [];
    setVentas(datos);
  }, []);

  // Filtrar ventas
  const filtrarVentas = () => {
    const datos = JSON.parse(localStorage.getItem("ventas")) || [];
    const filtradas = datos.filter(v => {
      const coincideTexto =
        v.cliente.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        v.cliente.documento.includes(filtroTexto);

      const coincideFechaInicio = fechaInicio ? v.fecha >= fechaInicio : true;
      const coincideFechaFin = fechaFin ? v.fecha <= fechaFin : true;
      const coincideVendedor = vendedor ? v.vendedor === vendedor : true;

      return coincideTexto && coincideFechaInicio && coincideFechaFin && coincideVendedor;
    });
    setVentas(filtradas);
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltroTexto("");
    setFechaInicio("");
    setFechaFin("");
    setVendedor("");
    const datos = JSON.parse(localStorage.getItem("ventas")) || [];
    setVentas(datos);
  };

  // Eliminar venta
  const eliminarVenta = id => {
    if (confirm("¿Deseas eliminar esta venta?")) {
      const actualizadas = ventas.filter(v => v.id !== id);
      setVentas(actualizadas);
      localStorage.setItem("ventas", JSON.stringify(actualizadas));
    }
  };

  const totalMonto = ventas.reduce((acc, v) => acc + v.total, 0);

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
        {/* Filtros */}
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
              value={filtroTexto}
              onChange={e => setFiltroTexto(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="date"
              value={fechaInicio}
              onChange={e => setFechaInicio(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="date"
              value={fechaFin}
              onChange={e => setFechaFin(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <select
              value={vendedor}
              onChange={e => setVendedor(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Todos los vendedores</option>
              <option>Juan Perez</option>
              <option>Maria Garcia</option>
              <option>Carlos Lopez</option>
              <option>Ana Rodriguez</option>
            </select>

            <div className="flex gap-2 mt-1">
              <button
                onClick={filtrarVentas}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <Search size={16} /> Buscar
              </button>
              <button
                onClick={limpiarFiltros}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition"
              >
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

          {ventas.length === 0 ? (
            <div className="text-center border rounded-xl py-10 text-gray-500">
              <p className="text-sm">0 ventas encontradas</p>
              <p className="text-gray-400 mt-2">
                No se encontraron ventas que coincidan con los filtros aplicados.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl overflow-hidden">
                <thead className="bg-blue-100 text-blue-800 text-sm">
                  <tr>
                    <th className="py-2 px-3 text-left">Cliente</th>
                    <th className="py-2 px-3 text-left">Documento</th>
                    <th className="py-2 px-3 text-left">Fecha</th>
                    <th className="py-2 px-3 text-left">Vendedor</th>
                    <th className="py-2 px-3 text-left">Total</th>
                    <th className="py-2 px-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map(v => (
                    <tr
                      key={v.id}
                      className="border-b hover:bg-gray-50 text-sm transition"
                    >
                      <td className="py-2 px-3">{v.cliente.nombre}</td>
                      <td className="py-2 px-3">{v.cliente.documento}</td>
                      <td className="py-2 px-3">{v.fecha}</td>
                      <td className="py-2 px-3">{v.vendedor}</td>
                      <td className="py-2 px-3 text-blue-600 font-medium">
                        S/ {v.total.toFixed(2)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => eliminarVenta(v.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Eliminar venta"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end mt-4 text-sm text-gray-600">
            <p>
              Total:{" "}
              <span className="font-semibold text-blue-600">
                S/ {totalMonto.toFixed(2)}
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
