import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Printer, Eye } from "lucide-react";

export default function GenerarComprobante() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Encabezado */}
      <header className="flex justify-between items-center mb-6 border-b pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/ventas")}
            className="flex items-center text-gray-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={18} className="mr-2" />
            Volver
          </button>
          <h1 className="text-xl font-semibold text-blue-600">
            Generar Comprobantes
          </h1>
        </div>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
          Administrador
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sección principal */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <FileText className="text-blue-600" size={20} />
            Emisión de Comprobantes
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Seleccione una venta completada y el tipo de comprobante a generar.
          </p>

          <div className="space-y-5">
            {/* Venta a facturar */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Venta a Facturar *
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none">
                <option>Seleccionar venta completada</option>
                <option>Venta #001 - Cliente: Juan Pérez</option>
                <option>Venta #002 - Cliente: María García</option>
              </select>
            </div>

            {/* Tipo de comprobante */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Tipo de Comprobante *
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none">
                <option>Boleta de Venta (para personas naturales)</option>
                <option>Factura (para empresas con RUC)</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto">
                <Download size={18} />
                Generar y Descargar PDF
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:text-blue-600 px-5 py-2 rounded-lg transition w-full md:w-auto">
                <Printer size={18} /> Imprimir
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:text-blue-600 px-5 py-2 rounded-lg transition w-full md:w-auto">
                <Eye size={18} /> Vista Previa
              </button>
            </div>
          </div>
        </div>

        {/* Panel lateral derecho */}
        <div className="flex flex-col gap-6">
          {/* Información */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-5">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Información</h3>
            <p className="text-sm font-semibold text-gray-700 mb-1">Boleta de Venta</p>
            <ul className="text-sm text-gray-500 mb-4 list-disc list-inside">
              <li>Para personas naturales</li>
              <li>No permite deducir gastos</li>
              <li>Documento más simple</li>
            </ul>
            <p className="text-sm font-semibold text-gray-700 mb-1">Factura</p>
            <ul className="text-sm text-gray-500 list-disc list-inside">
              <li>Para empresas con RUC</li>
              <li>Permite deducir gastos</li>
              <li>Requiere datos fiscales completos</li>
            </ul>
          </div>

          {/* Estadísticas */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-5">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Estadísticas</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Ventas Completadas: <span className="text-gray-800 font-medium">0</span></li>
              <li>Total Facturable: <span className="text-blue-600 font-semibold">S/ 0.00</span></li>
              <li>Comprobantes Disponibles: <span className="text-gray-800 font-medium">0</span></li>
            </ul>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-5 text-center">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Actividad Reciente</h3>
            <p className="text-sm text-gray-500">No hay actividad reciente</p>
          </div>
        </div>
      </div>
    </div>
  );
}