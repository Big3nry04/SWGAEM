import React, { useState } from "react";

const RegistrarCompra = () => {
  const [formData, setFormData] = useState({
    proveedor: "",
    descripcion: "",
    metodoPago: "",
    notas: "",
    fechaCompra: "",
    montoTotal: "",
    fechaEntrega: "",
    categoria: "",
    prioridad: "media",
    numeroFactura: "",
    contactoProveedor: ""
  });

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMostrarConfirmacion(true);
  };

  const handleConfirmar = () => {
    console.log("Compra registrada:", formData);
    setMostrarConfirmacion(false);
    // Reset form
    setFormData({
      proveedor: "",
      descripcion: "",
      metodoPago: "",
      notas: "",
      fechaCompra: "",
      montoTotal: "",
      fechaEntrega: "",
      categoria: "",
      prioridad: "media",
      numeroFactura: "",
      contactoProveedor: ""
    });
  };

  const handleCancelar = () => {
    setMostrarConfirmacion(false);
  };

  const categorias = [
    "Oficina",
    "Tecnología",
    "Mobiliario",
    "Limpieza",
    "Materiales",
    "Servicios",
    "Equipos",
    "Otros"
  ];

  const metodosPago = [
    "Transferencia Bancaria",
    "Tarjeta de Crédito",
    "Tarjeta de Débito",
    "Efectivo",
    "Cheque",
    "Crédito Comercial",
    "Yape/Plin"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">

        {/* Formulario principal */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Header del formulario */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <p className="text-blue-100 text-sm mt-1">
                Todos los campos marcados con * son obligatorios
              </p>
            </div>

            {/* Campos del formulario */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Proveedor */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Proveedor *
                  </label>
                  <input
                    type="text"
                    name="proveedor"
                    value={formData.proveedor}
                    onChange={handleChange}
                    placeholder="Ej: Distribuidora Central S.A.C."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Número de Factura y Contacto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Número de Factura
                  </label>
                  <input
                    type="text"
                    name="numeroFactura"
                    value={formData.numeroFactura}
                    onChange={handleChange}
                    placeholder="Ej: F001-25478"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Contacto del Proveedor
                  </label>
                  <input
                    type="text"
                    name="contactoProveedor"
                    value={formData.contactoProveedor}
                    onChange={handleChange}
                    placeholder="Ej: +51 987 654 321"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Fecha de Compra y Entrega */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Fecha de Compra *
                  </label>
                  <input
                    type="date"
                    name="fechaCompra"
                    value={formData.fechaCompra}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Fecha de Entrega *
                  </label>
                  <input
                    type="date"
                    name="fechaEntrega"
                    value={formData.fechaEntrega}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Categoría y Prioridad */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Categoría
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Prioridad
                  </label>
                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>

                {/* Monto Total */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Monto Total (S/.) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      S/.
                    </span>
                    <input
                      type="number"
                      name="montoTotal"
                      value={formData.montoTotal}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Método de Pago */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Método de Pago *
                  </label>
                  <select
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Seleccione método de pago</option>
                    {metodosPago.map((metodo) => (
                      <option key={metodo} value={metodo}>{metodo}</option>
                    ))}
                  </select>
                </div>

                {/* Descripción */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Describa los productos o servicios adquiridos..."
                    rows="3"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Notas adicionales */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Notas Adicionales
                  </label>
                  <textarea
                    name="notas"
                    value={formData.notas}
                    onChange={handleChange}
                    placeholder="Observaciones, términos especiales, condiciones de entrega..."
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 min-w-[200px]"
                >
                  <span>📋</span>
                  Registrar Compra
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      proveedor: "",
                      descripcion: "",
                      metodoPago: "",
                      notas: "",
                      fechaCompra: "",
                      montoTotal: "",
                      fechaEntrega: "",
                      categoria: "",
                      prioridad: "media",
                      numeroFactura: "",
                      contactoProveedor: ""
                    });
                  }}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-sm hover:bg-gray-200 transition-all duration-200 min-w-[200px]"
                >
                  <span>🔄</span>
                  Limpiar Formulario
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirmar Registro
              </h3>
              
              <p className="text-gray-600 mb-6">
                ¿Está seguro de que desea registrar esta compra? Esta acción no se puede deshacer.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-blue-800">
                  <strong>Proveedor:</strong> {formData.proveedor}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Monto:</strong> S/. {formData.montoTotal}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Fecha:</strong> {formData.fechaCompra}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleConfirmar}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Sí, Registrar
                </button>
                <button
                  onClick={handleCancelar}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarCompra;