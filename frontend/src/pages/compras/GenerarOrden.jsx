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
} from "lucide-react";

// Componente de Input con Icono
const IconInput = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400" })}
    </div>
    <input
      {...props}
      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
    />
  </div>
);

// Componente de Select con Icono
const IconSelect = ({ icon, children, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400" })}
    </div>
    <select
      {...props}
      className="w-full appearance-none pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
      <ChevronDown className="h-5 w-5 text-gray-400" />
    </div>
  </div>
);

// Componente de Textarea con Icono
const IconTextarea = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute top-3.5 left-0 pl-3.5 flex items-center pointer-events-none">
      {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400" })}
    </div>
    <textarea
      {...props}
      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4160BE] focus:border-[#4160BE] transition-all duration-200"
    />
  </div>
);

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

  const handleChange = (name, value) => {
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
    return calcularTotal() * 0.18; // 18% IGV para Perú
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
    setMostrarConfirmacion(false);

    // Reset form
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
      baja: "bg-green-100 text-green-800",
      media: "bg-yellow-100 text-yellow-800",
      alta: "bg-orange-100 text-orange-800",
      urgente: "bg-red-100 text-red-800",
    };
    return colores[prioridad] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#4160BE] to-[#2A3E7A] text-white px-8 py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <FilePlus2 className="h-8 w-8" />
                  <h2 className="text-2xl font-bold">
                    Nueva Orden de Compra
                  </h2>
                </div>
                <span
                  className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full ${getColorPrioridad(
                    formData.prioridad
                  )}`}
                >
                  Prioridad: {formData.prioridad.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Información General */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#1E2C57] border-b border-gray-200 pb-2">
                    Información General
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Proveedor *
                        </label>
                        <IconInput
                          icon={<Building2 />}
                          name="proveedor"
                          value={formData.proveedor}
                          onChange={(e) =>
                            handleChange("proveedor", e.target.value)
                          }
                          placeholder="Nombre del proveedor"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Contacto del Proveedor
                        </label>
                        <IconInput
                          icon={<Phone />}
                          name="contactoProveedor"
                          value={formData.contactoProveedor}
                          onChange={(e) =>
                            handleChange("contactoProveedor", e.target.value)
                          }
                          placeholder="Teléfono o email de contacto"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Solicitante *
                        </label>
                        <IconInput
                          icon={<User />}
                          name="solicitante"
                          value={formData.solicitante}
                          onChange={(e) =>
                            handleChange("solicitante", e.target.value)
                          }
                          placeholder="Nombre del solicitante"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Departamento
                        </label>
                        <IconSelect
                          icon={<Building />}
                          value={formData.departamento}
                          onChange={(e) =>
                            handleChange("departamento", e.target.value)
                          }
                        >
                          <option value="">Seleccionar departamento</option>
                          {departamentos.map((depto) => (
                            <option key={depto} value={depto}>
                              {depto}
                            </option>
                          ))}
                        </IconSelect>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Centro de Costo
                        </label>
                        <IconInput
                          icon={<Target />}
                          name="centroCosto"
                          value={formData.centroCosto}
                          onChange={(e) =>
                            handleChange("centroCosto", e.target.value)
                          }
                          placeholder="Código de centro de costo"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Prioridad
                        </label>
                        <IconSelect
                          icon={<ShieldAlert />}
                          value={formData.prioridad}
                          onChange={(e) =>
                            handleChange("prioridad", e.target.value)
                          }
                        >
                          <option value="baja">Baja</option>
                          <option value="media">Media</option>
                          <option value="alta">Alta</option>
                          <option value="urgente">Urgente</option>
                        </IconSelect>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalles de Entrega y Pago */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#1E2C57] border-b border-gray-200 pb-2">
                    Detalles de Entrega y Pago
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Fecha de Entrega *
                        </label>
                        <IconInput
                          icon={<CalendarDays />}
                          type="date"
                          name="fechaEntrega"
                          value={formData.fechaEntrega}
                          onChange={(e) =>
                            handleChange("fechaEntrega", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Términos de Pago
                        </label>
                        <IconSelect
                          icon={<CreditCard />}
                          value={formData.terminosPago}
                          onChange={(e) =>
                            handleChange("terminosPago", e.target.value)
                          }
                        >
                          <option value="">Seleccionar términos</option>
                          {terminosPagoOptions.map((termino) => (
                            <option key={termino} value={termino}>
                              {termino}
                            </option>
                          ))}
                        </IconSelect>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Dirección de Entrega
                        </label>
                        <IconInput
                          icon={<MapPin />}
                          name="direccionEntrega"
                          value={formData.direccionEntrega}
                          onChange={(e) =>
                            handleChange("direccionEntrega", e.target.value)
                          }
                          placeholder="Dirección completa de entrega"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                          Notas Adicionales
                        </label>
                        <IconTextarea
                          icon={<ClipboardPen />}
                          name="notas"
                          value={formData.notas}
                          onChange={(e) =>
                            handleChange("notas", e.target.value)
                          }
                          placeholder="Instrucciones especiales o observaciones..."
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección Productos */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <h3 className="text-xl font-semibold text-[#1E2C57]">
                      Productos y Servicios
                    </h3>
                    <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                      {formData.productos.length} items
                    </span>
                  </div>

                  <div className="space-y-4">
                    {formData.productos.map((producto, index) => (
                      <div
                        key={producto.id}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="lg:col-span-4">
                          <IconInput
                            icon={<Package />}
                            placeholder="Descripción del producto"
                            value={producto.descripcion}
                            onChange={(e) =>
                              handleProductoChange(
                                index,
                                "descripcion",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="lg:col-span-2">
                          <IconInput
                            icon={<Hash />}
                            type="number"
                            placeholder="Cantidad"
                            value={producto.cantidad}
                            onChange={(e) =>
                              handleProductoChange(
                                index,
                                "cantidad",
                                e.target.value
                              )
                            }
                            min="1"
                          />
                        </div>

                        <div className="lg:col-span-2">
                          <IconSelect
                            icon={<Ruler />}
                            value={producto.unidad}
                            onChange={(e) =>
                              handleProductoChange(
                                index,
                                "unidad",
                                e.target.value
                              )
                            }
                          >
                            {unidades.map((unidad) => (
                              <option key={unidad} value={unidad}>
                                {unidad}
                              </option>
                            ))}
                          </IconSelect>
                        </div>

                        <div className="lg:col-span-2">
                          <IconInput
                            icon={<DollarSign />}
                            type="number"
                            placeholder="Precio (S/.)"
                            value={producto.precio}
                            onChange={(e) =>
                              handleProductoChange(
                                index,
                                "precio",
                                e.target.value
                              )
                            }
                            step="0.01"
                            min="0"
                          />
                        </div>

                        <div className="lg:col-span-2 flex items-center justify-between">
                          <span className="font-semibold text-gray-800 text-sm py-3">
                            S/ {calcularSubtotal(producto).toFixed(2)}
                          </span>
                          {formData.productos.length > 1 && (
                            <button
                              type="button"
                              onClick={() => eliminarProducto(producto.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                              title="Eliminar item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={agregarProducto}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-gray-300 text-gray-600 hover:text-[#4160BE] hover:border-[#4160BE] hover:bg-[#4160BE]/5 rounded-lg transition-all duration-200"
                  >
                    <PlusCircle className="h-5 w-5" />
                    Agregar Producto
                  </button>
                </div>

                {/* Resumen y Total */}
                <div className="bg-[#4160BE]/5 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="text-2xl font-bold text-[#1E2C57]">
                        S/ {calcularTotal().toFixed(2)}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-600">IGV (18%)</p>
                      <p className="text-xl font-semibold text-[#1E2C57]">
                        S/ {calcularIGV().toFixed(2)}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-600">Total</p>
                      <p className="text-3xl font-bold text-[#4160BE]">
                        S/ {calcularTotalConIGV().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
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
                          {
                            id: 1,
                            descripcion: "",
                            cantidad: "",
                            precio: "",
                            unidad: "unidad",
                          },
                        ],
                      });
                    }}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-200 transition-all duration-200 min-w-[220px]"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Limpiar Formulario
                  </button>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#4160BE] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#2A3E7A] transition-all duration-200 min-w-[220px] disabled:opacity-50"
                    disabled={
                      !formData.proveedor ||
                      !formData.solicitante ||
                      !formData.fechaEntrega ||
                      formData.productos.length === 0 ||
                      formData.productos.some(p => !p.descripcion || !p.cantidad || !p.precio)
                    }
                  >
                    <Send className="h-5 w-5" />
                    Generar Orden de Compra
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal de Confirmación */}
        {mostrarConfirmacion && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
              <div className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E2C57] mb-2">
                    Confirmar Orden
                  </h3>
                  <p className="text-gray-600 mb-6">
                    ¿Está seguro de generar esta orden de compra?
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 border border-gray-200">
                    <p className="text-sm">
                      <strong className="text-gray-700">Proveedor:</strong>{" "}
                      <span className="text-gray-900">{formData.proveedor}</span>
                    </p>
                    <p className="text-sm">
                      <strong className="text-gray-700">Total:</strong>{" "}
                      <span className="text-[#4160BE] font-bold">
                        S/ {calcularTotalConIGV().toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm">
                      <strong className="text-gray-700">Productos:</strong>{" "}
                      <span className="text-gray-900">{formData.productos.length} items</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 bg-gray-50 p-4 rounded-b-2xl">
                <button
                  onClick={() => setMostrarConfirmacion(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmar}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerarOrdenCompra;