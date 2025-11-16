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
  X
} from "lucide-react";

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
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.proveedor || !formData.fechaCompra || !formData.fechaEntrega || 
        !formData.montoTotal || !formData.metodoPago || !formData.descripcion) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }
    
    setMostrarConfirmacion(true);
  };

  const handleConfirmar = () => {
    console.log("Compra registrada:", formData);
    alert(`✅ Compra registrada exitosamente\nProveedor: ${formData.proveedor}\nMonto: S/ ${parseFloat(formData.montoTotal).toFixed(2)}`);
    setMostrarConfirmacion(false);
    handleReset();
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

  const getColorPrioridad = (prioridad) => {
    const colores = {
      baja: "bg-green-50 text-green-700 border-green-200",
      media: "bg-yellow-50 text-yellow-700 border-yellow-200",
      alta: "bg-orange-50 text-orange-700 border-orange-200",
      urgente: "bg-red-50 text-red-700 border-red-200",
    };
    return colores[prioridad] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Título */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Registrar Nueva Compra</h2>
            <p className="text-gray-600 mt-1">Complete los datos de la operación de compra</p>
          </div>

          {/* Formulario Principal */}
          <div>
            <div className="space-y-6">
              {/* Información del Proveedor */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Información del Proveedor</h3>
                    <p className="text-sm text-gray-600">Datos del proveedor y documento</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Proveedor */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Proveedor *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="proveedor"
                        value={formData.proveedor}
                        onChange={handleChange}
                        placeholder="Nombre del proveedor"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Número de Factura */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número de Factura
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="numeroFactura"
                        value={formData.numeroFactura}
                        onChange={handleChange}
                        placeholder="F001-25478"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Contacto del Proveedor */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contacto del Proveedor
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="contactoProveedor"
                        value={formData.contactoProveedor}
                        onChange={handleChange}
                        placeholder="+51 987 654 321"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles de la Compra */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Detalles de la Compra</h3>
                    <p className="text-sm text-gray-600">Información de la operación</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Fecha de Compra */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Compra *
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        name="fechaCompra"
                        value={formData.fechaCompra}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Fecha de Entrega */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Entrega *
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        name="fechaEntrega"
                        value={formData.fechaEntrega}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Categoría */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Categoría
                    </label>
                    <div className="relative">
                      <Shapes className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Seleccione categoría</option>
                        {categorias.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Prioridad */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioridad
                    </label>
                    <div className="relative">
                      <TriangleAlert className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="prioridad"
                        value={formData.prioridad}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                        <option value="urgente">Urgente</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Monto Total */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monto Total (S/) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="montoTotal"
                        value={formData.montoTotal}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Método de Pago */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Método de Pago *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="metodoPago"
                        value={formData.metodoPago}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        required
                      >
                        <option value="">Seleccione método</option>
                        {metodosPago.map((metodo) => (
                          <option key={metodo} value={metodo}>{metodo}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción *
                    </label>
                    <div className="relative">
                      <BookText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Describa los productos o servicios adquiridos..."
                        rows="3"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Notas Adicionales */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notas Adicionales
                    </label>
                    <div className="relative">
                      <BookText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        placeholder="Observaciones, términos especiales, condiciones de entrega..."
                        rows="2"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  Limpiar Formulario
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
                >
                  <Save className="w-5 h-5" />
                  Registrar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Confirmar Registro</h2>
                  <p className="text-gray-600 text-sm mt-1">Verifique los datos antes de continuar</p>
                </div>
              </div>
              <button
                onClick={handleCancelar}
                className="p-2 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <X className="w-6 h-6 text-red-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Resumen de Datos */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de la Compra</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">Proveedor</span>
                    <span className="text-sm font-semibold text-gray-900 text-right max-w-xs">{formData.proveedor}</span>
                  </div>
                  {formData.numeroFactura && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">Factura</span>
                      <span className="text-sm font-semibold text-gray-900">{formData.numeroFactura}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">Fecha de Compra</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {new Date(formData.fechaCompra + 'T00:00:00').toLocaleDateString('es-PE')}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">Fecha de Entrega</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {new Date(formData.fechaEntrega + 'T00:00:00').toLocaleDateString('es-PE')}
                    </span>
                  </div>
                  {formData.categoria && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">Categoría</span>
                      <span className="text-sm font-semibold text-gray-900">{formData.categoria}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">Prioridad</span>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium border ${getColorPrioridad(formData.prioridad)}`}>
                      {formData.prioridad.charAt(0).toUpperCase() + formData.prioridad.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">Método de Pago</span>
                    <span className="text-sm font-semibold text-gray-900">{formData.metodoPago}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">Monto Total</span>
                      <span className="text-2xl font-bold text-blue-600">
                        S/ {parseFloat(formData.montoTotal || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-medium text-gray-600 mb-2">Descripción</p>
                <p className="text-sm text-gray-900">{formData.descripcion}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleCancelar}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50"
              >
                <CheckCircle2 className="w-5 h-5" />
                Sí, Registrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarCompra;