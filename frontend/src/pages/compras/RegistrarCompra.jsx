import React, { useState } from "react";
import {
  ShoppingCart,
  Building2,
  FileText,
  Phone,
  CalendarDays,
  Shapes,
  TriangleAlert,
  DollarSign,
  CreditCard,
  BookText,
  ChevronDown,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

// Estado inicial vacío para resetear el formulario
const initialState = {
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
};

const RegistrarCompra = () => {
  const [formData, setFormData] = useState(initialState);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleReset = () => {
     setFormData(initialState);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías añadir validación antes de mostrar la confirmación
    setMostrarConfirmacion(true);
  };

  const handleConfirmar = () => {
    console.log("Compra registrada:", formData);
    setMostrarConfirmacion(false);
    handleReset();
    // Aquí iría la lógica de envío a la API
    // Podrías mostrar un toast de "Éxito" aquí
  };

  const handleCancelar = () => {
    setMostrarConfirmacion(false);
  };

  const categorias = [
    "Oficina", "Tecnología", "Mobiliario", "Limpieza",
    "Materiales", "Servicios", "Equipos", "Otros"
  ];

  const metodosPago = [
    "Transferencia Bancaria", "Tarjeta de Crédito", "Tarjeta de Débito",
    "Efectivo", "Cheque", "Crédito Comercial", "Yape/Plin"
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">

        {/* Formulario principal */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Header del formulario */}
            <div className="bg-gradient-to-r from-[#4160BE] to-[#2A3E7A] px-8 py-6">
              <div className="flex items-center gap-4">
                <ShoppingCart className="h-9 w-9 text-white/90" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Registrar Nueva Compra</h2>
                  <p className="text-white/80 text-sm mt-1">
                    Complete los campos para registrar una nueva operación.
                  </p>
                </div>
              </div>
            </div>

            {/* Campos del formulario */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
                
                {/* Proveedor */}
                <div className="lg:col-span-2">
                  <label htmlFor="proveedor" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Proveedor *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="proveedor"
                      id="proveedor"
                      value={formData.proveedor}
                      onChange={handleChange}
                      placeholder="Ej: Distribuidora Central S.A.C."
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Número de Factura */}
                <div>
                  <label htmlFor="numeroFactura" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Número de Factura
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="numeroFactura"
                      id="numeroFactura"
                      value={formData.numeroFactura}
                      onChange={handleChange}
                      placeholder="Ej: F001-25478"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Contacto del Proveedor */}
                <div>
                  <label htmlFor="contactoProveedor" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Contacto del Proveedor
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="contactoProveedor"
                      id="contactoProveedor"
                      value={formData.contactoProveedor}
                      onChange={handleChange}
                      placeholder="Ej: +51 987 654 321"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Fecha de Compra */}
                <div>
                  <label htmlFor="fechaCompra" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Fecha de Compra *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <CalendarDays className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="fechaCompra"
                      id="fechaCompra"
                      value={formData.fechaCompra}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Fecha de Entrega */}
                <div>
                  <label htmlFor="fechaEntrega" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Fecha de Entrega *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <CalendarDays className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="fechaEntrega"
                      id="fechaEntrega"
                      value={formData.fechaEntrega}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <label htmlFor="categoria" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Categoría
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Shapes className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="categoria"
                      id="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="w-full appearance-none pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Prioridad */}
                <div>
                  <label htmlFor="prioridad" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Prioridad
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <TriangleAlert className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="prioridad"
                      id="prioridad"
                      value={formData.prioridad}
                      onChange={handleChange}
                      className="w-full appearance-none pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Monto Total */}
                <div>
                  <label htmlFor="montoTotal" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Monto Total (S/.) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">S/.</span>
                    </div>
                    <input
                      type="number"
                      name="montoTotal"
                      id="montoTotal"
                      value={formData.montoTotal}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Método de Pago */}
                <div>
                  <label htmlFor="metodoPago" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Método de Pago *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="metodoPago"
                      id="metodoPago"
                      value={formData.metodoPago}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
                    >
                      <option value="">Seleccione método de pago</option>
                      {metodosPago.map((metodo) => (
                        <option key={metodo} value={metodo}>{metodo}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="lg:col-span-2">
                  <label htmlFor="descripcion" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Descripción *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 flex items-center pointer-events-none">
                      <BookText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="descripcion"
                      id="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      placeholder="Describa los productos o servicios adquiridos..."
                      rows="3"
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200 resize-none"
                    />
                  </div>
                </div>

                {/* Notas adicionales */}
                <div className="lg:col-span-2">
                  <label htmlFor="notas" className="block text-sm font-semibold text-[#1E2C57] mb-2">
                    Notas Adicionales
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 flex items-center pointer-events-none">
                      <BookText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="notas"
                      id="notas"
                      value={formData.notas}
                      onChange={handleChange}
                      placeholder="Observaciones, términos especiales, condiciones de entrega..."
                      rows="2"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-200 transition-all duration-200 min-w-[180px]"
                >
                  <RotateCcw className="h-5 w-5" />
                  Limpiar
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#4160BE] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#2A3E7A] transition-all duration-200 min-w-[180px]"
                >
                  <Save className="h-5 w-5" />
                  Registrar Compra
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          {/* Aquí se aplica la animación */}
          <style>{`
            @keyframes scale-in {
              0% { transform: scale(0.9); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-scale-in {
              animation: scale-in 0.2s ease-out forwards;
            }
          `}</style>
          
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-9 w-9 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-[#1E2C57] mb-2">
                Confirmar Registro
              </h3>
              
              <p className="text-gray-600 mb-6">
                ¿Está seguro de que desea registrar esta compra?
              </p>

              {/* Resumen de datos */}
              <div className="bg-[#4160BE]/10 rounded-lg p-4 mb-6 text-left space-y-2">
                <p className="text-sm text-[#1E2C57]">
                  <strong>Proveedor:</strong> {formData.proveedor || "No especificado"}
                </p>
                <p className="text-sm text-[#1E2C57]">
                  <strong>Monto:</strong> S/. {parseFloat(formData.montoTotal || 0).toFixed(2)}
                </p>
                <p className="text-sm text-[#1E2C57]">
                  <strong>Fecha:</strong> {formData.fechaCompra || "No especificada"}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancelar}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmar}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Sí, Registrar
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