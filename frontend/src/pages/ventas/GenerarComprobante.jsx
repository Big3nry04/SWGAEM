import React, { useState } from 'react';
import { FileText, Download, Printer, Eye, ShoppingCart, AlertCircle } from "lucide-react";

export default function GenerarComprobante() {
  const [formData, setFormData] = useState({
    ventaId: '',
    tipoComprobante: 'boleta'
  });

  const handleGenerarComprobante = () => {
    if (!formData.ventaId) {
      alert('Por favor seleccione una venta');
      return;
    }
    alert('Comprobante generado exitosamente');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Generar Comprobantes</h2>
        <p className="text-gray-600 text-sm mt-1">Seleccione una venta completada y el tipo de comprobante a generar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sección principal */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Emisión de Comprobantes</h3>
              <p className="text-sm text-gray-600">Configure los datos del comprobante</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Venta a facturar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venta a Facturar <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.ventaId}
                onChange={(e) => setFormData({ ...formData, ventaId: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar venta completada</option>
                <option value="001">Venta #001 - Cliente: Juan Pérez</option>
                <option value="002">Venta #002 - Cliente: María García</option>
              </select>
            </div>

            {/* Tipo de comprobante */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Comprobante <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.tipoComprobante}
                onChange={(e) => setFormData({ ...formData, tipoComprobante: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="boleta">Boleta de Venta (para personas naturales)</option>
                <option value="factura">Factura (para empresas con RUC)</option>
              </select>
            </div>

            {/* Botones de acción */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Acciones</h4>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleGenerarComprobante}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all font-medium"
                >
                  <Download className="w-5 h-5" />
                  Generar y Descargar PDF
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-lg transition-all border border-gray-300 font-medium">
                  <Printer className="w-5 h-5" />
                  Imprimir
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-lg transition-all border border-gray-300 font-medium">
                  <Eye className="w-5 h-5" />
                  Vista Previa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel lateral derecho */}
        <div className="space-y-6">
          {/* Información */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Información</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Boleta de Venta</p>
                <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
                  <li>Para personas naturales</li>
                  <li>No permite deducir gastos</li>
                  <li>Documento más simple</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">Factura</p>
                <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
                  <li>Para empresas con RUC</li>
                  <li>Permite deducir gastos</li>
                  <li>Requiere datos fiscales completos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Estadísticas</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ventas Completadas:</span>
                <span className="text-sm font-bold text-gray-900">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Facturable:</span>
                <span className="text-sm font-bold text-blue-600">S/ 0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Comprobantes Disponibles:</span>
                <span className="text-sm font-bold text-gray-900">0</span>
              </div>
            </div>
          </div>

          {/*Actividad reciente*/}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h3>
            <div className="text-center py-8">
              <FileText className="mx-auto text-gray-300 mb-3 w-10 h-10" />
              <p className="text-sm text-gray-500">No hay actividad reciente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}