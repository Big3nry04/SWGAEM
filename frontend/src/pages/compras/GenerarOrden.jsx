import React, { useState } from "react";
import {
  FilePlus2,
  Building2,
  Phone,
  User,
  Building,
  Target,
  ShieldAlert,
  CalendarDays,
  MapPin,
  CreditCard,
  ClipboardPen,
  Package,
  Hash,
  Ruler,
  DollarSign,
  PlusCircle,
  Trash2,
  RotateCcw,
  Send,
  CheckCircle2,
  ChevronDown,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  FileText,
  X
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      gradient: "from-blue-500 to-blue-600"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      gradient: "from-green-500 to-green-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      gradient: "from-purple-500 to-purple-600"
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      gradient: "from-orange-500 to-orange-600"
    }
  };

  const selectedColor = colors[color] || colors.blue;

  return (
    <div className={`${selectedColor.bg} rounded-2xl border ${selectedColor.border} shadow-sm p-6`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`${selectedColor.text} text-sm font-semibold`}>{title}</h3>
        <div className={`w-10 h-10 bg-gradient-to-br ${selectedColor.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <p className={`text-xs ${selectedColor.text} mt-1 flex items-center gap-1`}>
          <TrendingUp className="w-3 h-3" />
          {trend}
        </p>
      )}
    </div>
  );
};

const GenerarOrdenCompra = () => {
  const [formData, setFormData] = useState({
    proveedor: "",
    solicitante: "",
    departamento: "",
    fechaEntrega: "",
    direccionEntrega: "",
    terminosPago: "",
    notas: "",
    prioridad: "media",
    centroCosto: "",
    contactoProveedor: "",
    productos: [
      { id: 1, descripcion: "", cantidad: "", precio: "", unidad: "unidad" },
    ],
  });

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const departamentos = [
    "Administración",
    "Contabilidad",
    "Recursos Humanos",
    "TI",
    "Operaciones",
    "Marketing",
    "Ventas",
    "Logística",
  ];

  const unidades = [
    "unidad",
    "kg",
    "lb",
    "litro",
    "galón",
    "metro",
    "caja",
    "paquete",
  ];

  const terminosPagoOptions = [
    "Contado",
    "15 días",
    "30 días",
    "60 días",
    "90 días",
    "Crédito comercial",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...formData.productos];
    nuevosProductos[index][field] = value;
    setFormData({ ...formData, productos: nuevosProductos });
  };

  const agregarProducto = () => {
    const nuevoId =
      formData.productos.length > 0
        ? Math.max(...formData.productos.map((p) => p.id)) + 1
        : 1;
    setFormData({
      ...formData,
      productos: [
        ...formData.productos,
        {
          id: nuevoId,
          descripcion: "",
          cantidad: "",
          precio: "",
          unidad: "unidad",
        },
      ],
    });
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = formData.productos.filter(
      (producto) => producto.id !== id
    );
    setFormData({ ...formData, productos: nuevosProductos });
  };

  const calcularSubtotal = (producto) => {
    return (
      (parseFloat(producto.cantidad) || 0) * (parseFloat(producto.precio) || 0)
    );
  };

  const calcularTotal = () => {
    return formData.productos.reduce(
      (total, producto) => total + calcularSubtotal(producto),
      0
    );
  };

  const calcularIGV = () => {
    return calcularTotal() * 0.18;
  };

  const calcularTotalConIGV = () => {
    return calcularTotal() + calcularIGV();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMostrarConfirmacion(true);
  };

  const handleConfirmar = () => {
    const ordenCompra = {
      ...formData,
      total: calcularTotal(),
      igv: calcularIGV(),
      totalConIGV: calcularTotalConIGV(),
      numeroOrden: `OC-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`,
      fechaGeneracion: new Date().toISOString().split("T")[0],
    };

    console.log("Orden generada:", ordenCompra);
    alert(`✅ Orden de Compra ${ordenCompra.numeroOrden} generada exitosamente`);
    setMostrarConfirmacion(false);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFormData({
      proveedor: "",
      solicitante: "",
      departamento: "",
      fechaEntrega: "",
      direccionEntrega: "",
      terminosPago: "",
      notas: "",
      prioridad: "media",
      centroCosto: "",
      contactoProveedor: "",
      productos: [
        { id: 1, descripcion: "", cantidad: "", precio: "", unidad: "unidad" },
      ],
    });
  };

  const getColorPrioridad = (prioridad) => {
    const colores = {
      baja: "bg-green-50 text-green-700 border-green-200",
      media: "bg-yellow-50 text-yellow-700 border-yellow-200",
      alta: "bg-orange-50 text-orange-700 border-orange-200",
      urgente: "bg-red-50 text-red-700 border-red-200",
    };
    return colores[prioridad] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const formularioCompleto = formData.proveedor && 
    formData.solicitante && 
    formData.fechaEntrega &&
    formData.productos.length > 0 &&
    !formData.productos.some(p => !p.descripcion || !p.cantidad || !p.precio);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Título */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Nueva Orden de Compra</h2>
            <p className="text-gray-600 mt-1">Complete los datos para generar la orden</p>
          </div>

          {/* Formulario Principal */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Información General */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FilePlus2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Información General</h3>
                    <p className="text-sm text-gray-600">Datos básicos de la orden</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Proveedor */}
                  <div>
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

                  {/* Contacto Proveedor */}
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
                        placeholder="Teléfono o email"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Solicitante */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Solicitante *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="solicitante"
                        value={formData.solicitante}
                        onChange={handleChange}
                        placeholder="Nombre del solicitante"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Departamento */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Departamento
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Seleccionar departamento</option>
                        {departamentos.map((depto) => (
                          <option key={depto} value={depto}>
                            {depto}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Centro de Costo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Centro de Costo
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="centroCosto"
                        value={formData.centroCosto}
                        onChange={handleChange}
                        placeholder="Código de centro"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Prioridad */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioridad
                    </label>
                    <div className="relative">
                      <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                </div>
              </div>

              {/* Detalles de Entrega y Pago */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CalendarDays className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Detalles de Entrega y Pago</h3>
                    <p className="text-sm text-gray-600">Información de entrega y condiciones</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* Términos de Pago */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Términos de Pago
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="terminosPago"
                        value={formData.terminosPago}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Seleccionar términos</option>
                        {terminosPagoOptions.map((termino) => (
                          <option key={termino} value={termino}>
                            {termino}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Dirección de Entrega */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dirección de Entrega
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="direccionEntrega"
                        value={formData.direccionEntrega}
                        onChange={handleChange}
                        placeholder="Dirección completa"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Notas Adicionales */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notas Adicionales
                    </label>
                    <div className="relative">
                      <ClipboardPen className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        placeholder="Instrucciones especiales..."
                        rows="3"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Productos y Servicios */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Productos y Servicios</h3>
                        <p className="text-sm text-gray-600">{formData.productos.length} item{formData.productos.length !== 1 ? 's' : ''} en la orden</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorPrioridad(formData.prioridad)}`}>
                      {formData.prioridad.charAt(0).toUpperCase() + formData.prioridad.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {formData.productos.map((producto, index) => (
                    <div
                      key={producto.id}
                      className="bg-gray-50/50 rounded-xl p-4 border border-gray-100"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Descripción */}
                        <div className="md:col-span-4">
                          <label className="block text-xs text-gray-600 font-medium mb-1">Descripción</label>
                          <div className="relative">
                            <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Producto o servicio"
                              value={producto.descripcion}
                              onChange={(e) =>
                                handleProductoChange(index, "descripcion", e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        {/* Cantidad */}
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-600 font-medium mb-1">Cantidad</label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              placeholder="0"
                              value={producto.cantidad}
                              onChange={(e) =>
                                handleProductoChange(index, "cantidad", e.target.value)
                              }
                              min="1"
                              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        {/* Unidad */}
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-600 font-medium mb-1">Unidad</label>
                          <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              value={producto.unidad}
                              onChange={(e) =>
                                handleProductoChange(index, "unidad", e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                              {unidades.map((unidad) => (
                                <option key={unidad} value={unidad}>
                                  {unidad}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Precio */}
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-600 font-medium mb-1">Precio (S/)</label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              placeholder="0.00"
                              value={producto.precio}
                              onChange={(e) =>
                                handleProductoChange(index, "precio", e.target.value)
                              }
                              step="0.01"
                              min="0"
                              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        {/* Subtotal y Eliminar */}
                        <div className="md:col-span-2 flex items-end justify-between gap-2">
                          <div className="flex-1">
                            <label className="block text-xs text-gray-600 font-medium mb-1">Subtotal</label>
                            <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                              <span className="text-sm font-bold text-blue-700">
                                S/ {calcularSubtotal(producto).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          {formData.productos.length > 1 && (
                            <button
                              type="button"
                              onClick={() => eliminarProducto(producto.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Eliminar item"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={agregarProducto}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl transition-all duration-200 font-medium"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Agregar Producto
                  </button>
                </div>
              </div>

              {/* Resumen de Totales */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de la Orden</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                    <p className="text-2xl font-bold text-gray-900">
                      S/ {calcularTotal().toFixed(2)}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">IGV (18%)</p>
                    <p className="text-xl font-semibold text-gray-900">
                      S/ {calcularIGV().toFixed(2)}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Total</p>
                    <p className="text-3xl font-bold text-blue-600">
                      S/ {calcularTotalConIGV().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={limpiarFormulario}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  Limpiar Formulario
                </button>

                <button
                  type="submit"
                  disabled={!formularioCompleto}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Generar Orden de Compra
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Modal de Confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Confirmar Orden</h2>
                </div>
                <p className="text-gray-600 ml-15">¿Está seguro de generar esta orden de compra?</p>
              </div>
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="p-2 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <X className="w-6 h-6 text-red-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Información de la Orden */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de la Orden</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Proveedor</p>
                    <p className="text-sm font-semibold text-gray-900">{formData.proveedor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Solicitante</p>
                    <p className="text-sm font-semibold text-gray-900">{formData.solicitante}</p>
                  </div>
                  {formData.departamento && (
                    <div>
                      <p className="text-xs text-gray-600 font-medium mb-1">Departamento</p>
                      <p className="text-sm font-semibold text-gray-900">{formData.departamento}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Fecha de Entrega</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(formData.fechaEntrega + 'T00:00:00').toLocaleDateString('es-PE')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Prioridad</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium border ${getColorPrioridad(formData.prioridad)}`}>
                      {formData.prioridad.charAt(0).toUpperCase() + formData.prioridad.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Total de Items</p>
                    <p className="text-sm font-semibold text-gray-900">{formData.productos.length} productos</p>
                  </div>
                </div>
              </div>

              {/* Lista de Productos */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Productos</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {formData.productos.map((producto, index) => (
                    <div key={producto.id} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{producto.descripcion}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {producto.cantidad} {producto.unidad} × S/ {parseFloat(producto.precio).toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-blue-600">
                            S/ {calcularSubtotal(producto).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totales */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Subtotal</span>
                    <span className="text-lg font-bold text-gray-900">S/ {calcularTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">IGV (18%)</span>
                    <span className="text-lg font-semibold text-gray-900">S/ {calcularIGV().toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-blue-300">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">S/ {calcularTotalConIGV().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirmar Orden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerarOrdenCompra;