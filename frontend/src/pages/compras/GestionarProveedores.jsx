import React, { useState, useMemo } from "react";
import {
  Users,
  CheckCircle2,
  Star,
  Tags,
  Search,
  ListFilter,
  UserPlus,
  Building2,
  Hash,
  Mail,
  User,
  Phone,
  Package,
  MapPin,
  Save,
  RotateCcw,
  X,
  Pencil,
  Trash2,
  ChevronDown,
  AlertTriangle,
  PlusCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

// Componente de Tarjeta de Estadística
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "bg-[#4160BE]/10 text-[#4160BE]",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-500",
    purple: "bg-purple-100 text-purple-600",
  };
  const selectedColor = colors[color] || colors.blue;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${selectedColor}`}>
          {React.cloneElement(icon, { className: "h-6 w-6" })}
        </div>
      </div>
    </div>
  );
};

// Componente de Estrellas
const GetEstrellas = ({ evaluacion }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-5 w-5 ${
          i <= evaluacion ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

// Componente Modal
const Modal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type = "alert",
}) => {
  if (!isOpen) return null;

  const isConfirm = type === "confirm";
  const iconColor = isConfirm ? "text-red-600" : "text-yellow-500";
  const iconBgColor = isConfirm ? "bg-red-100" : "bg-yellow-100";
  const confirmButtonColor = isConfirm
    ? "bg-red-600 hover:bg-red-700"
    : "bg-[#4160BE] hover:bg-[#2A3E7A]";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
        <div className="p-6">
          <div className="text-center">
            <div
              className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              {isConfirm ? (
                <Trash2 className={`h-8 w-8 ${iconColor}`} />
              ) : (
                <AlertTriangle className={`h-8 w-8 ${iconColor}`} />
              )}
            </div>
            <h3 className="text-xl font-bold text-[#1E2C57] mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 bg-gray-50 p-4 rounded-b-2xl">
          {isConfirm && (
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`flex-1 text-white py-3 rounded-lg font-semibold transition-colors ${confirmButtonColor}`}
          >
            {isConfirm ? "Sí, Eliminar" : "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal ---

const GestionProveedores = () => {
  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      nombre: "Proveedor ABC S.A.C.",
      email: "contacto@proveedorabc.com",
      telefono: "+51 987 654 321",
      ruc: "20123456789",
      direccion: "Av. Principal 123, Lima",
      contacto: "Juan Pérez",
      categoria: "tecnologia",
      estado: "activo",
      evaluacion: 4,
      productos: "Equipos de computación",
      fechaRegistro: "2024-01-15",
    },
    {
      id: 2,
      nombre: "Suministros XYZ Ltda.",
      email: "ventas@suministrosxyz.com",
      telefono: "+51 987 654 322",
      ruc: "20123456780",
      direccion: "Calle Comercio 456, Arequipa",
      contacto: "María García",
      categoria: "oficina",
      estado: "activo",
      evaluacion: 5,
      productos: "Materiales de oficina",
      fechaRegistro: "2024-01-10",
    },
  ]);

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ruc: "",
    direccion: "",
    contacto: "",
    categoria: "",
    productos: "",
    estado: "activo",
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [proveedorEditando, setProveedorEditando] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "alert",
  });

  const categorias = [
    "tecnologia",
    "oficina",
    "materiales",
    "servicios",
    "limpieza",
    "mobiliario",
    "equipos",
    "otros",
  ];

  const handleChange = (name, value) => {
    setNuevoProveedor({ ...nuevoProveedor, [name]: value });
  };

  const handleModalConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
    setModalState({ isOpen: false, title: "", message: "", onConfirm: null });
  };

  const handleModalCancel = () => {
    setModalState({ isOpen: false, title: "", message: "", onConfirm: null });
  };

  const validarProveedor = () => {
    if (!nuevoProveedor.nombre.trim()) {
      setModalState({
        isOpen: true,
        type: "alert",
        title: "Campo Requerido",
        message: "El nombre del proveedor es obligatorio.",
        onConfirm: handleModalCancel,
      });
      return false;
    }
    if (!nuevoProveedor.email.trim()) {
      setModalState({
        isOpen: true,
        type: "alert",
        title: "Campo Requerido",
        message: "El email de contacto es obligatorio.",
        onConfirm: handleModalCancel,
      });
      return false;
    }
    if (!nuevoProveedor.ruc.trim()) {
      setModalState({
        isOpen: true,
        type: "alert",
        title: "Campo Requerido",
        message: "El RUC es obligatorio.",
        onConfirm: handleModalCancel,
      });
      return false;
    }
    if (!/^\d{11}$/.test(nuevoProveedor.ruc)) {
      setModalState({
        isOpen: true,
        type: "alert",
        title: "Error de Formato",
        message: "El RUC debe tener 11 dígitos.",
        onConfirm: handleModalCancel,
      });
      return false;
    }
    return true;
  };

  const agregarProveedor = (e) => {
    e.preventDefault();
    if (!validarProveedor()) return;

    const proveedor = {
      ...nuevoProveedor,
      id: Date.now(),
      fechaRegistro: new Date().toISOString().split("T")[0],
      evaluacion: 0,
    };

    setProveedores([proveedor, ...proveedores]);
    limpiarFormulario();
  };

  const editarProveedor = (proveedor) => {
    setNuevoProveedor(proveedor);
    setProveedorEditando(proveedor.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const actualizarProveedor = (e) => {
    e.preventDefault();
    if (!validarProveedor()) return;

    setProveedores(
      proveedores.map((p) =>
        p.id === proveedorEditando
          ? { ...nuevoProveedor, id: proveedorEditando }
          : p
      )
    );

    limpiarFormulario();
    setProveedorEditando(null);
  };

  const triggerEliminar = (proveedor) => {
    setModalState({
      isOpen: true,
      type: "confirm",
      title: "Confirmar Eliminación",
      message: `¿Está seguro de eliminar a ${proveedor.nombre}? Esta acción no se puede deshacer.`,
      onConfirm: () => ejecutarEliminacion(proveedor.id),
      onCancel: handleModalCancel,
    });
  };
  
  const ejecutarEliminacion = (id) => {
    setProveedores(proveedores.filter((p) => p.id !== id));
  };


  const limpiarFormulario = () => {
    setNuevoProveedor({
      nombre: "",
      email: "",
      telefono: "",
      ruc: "",
      direccion: "",
      contacto: "",
      categoria: "",
      productos: "",
      estado: "activo",
    });
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
    setProveedorEditando(null);
  };

  // Filtrado de proveedores
  const proveedoresFiltrados = useMemo(() => {
    return proveedores.filter((proveedor) => {
      const coincideBusqueda =
        proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (proveedor.contacto && proveedor.contacto.toLowerCase().includes(busqueda.toLowerCase())) ||
        proveedor.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        proveedor.ruc.includes(busqueda);

      const coincideCategoria =
        filtroCategoria === "todos" || proveedor.categoria === filtroCategoria;
      const coincideEstado =
        filtroEstado === "todos" || proveedor.estado === filtroEstado;

      return coincideBusqueda && coincideCategoria && coincideEstado;
    });
  }, [proveedores, busqueda, filtroCategoria, filtroEstado]);

  const getColorEstado = (estado) => {
    return estado === "activo"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getColorCategoria = (categoria) => {
    const colores = {
      tecnologia: "bg-blue-100 text-blue-800",
      oficina: "bg-purple-100 text-purple-800",
      materiales: "bg-orange-100 text-orange-800",
      servicios: "bg-cyan-100 text-cyan-800",
      limpieza: "bg-emerald-100 text-emerald-800",
      mobiliario: "bg-amber-100 text-amber-800",
      equipos: "bg-indigo-100 text-indigo-800",
      otros: "bg-gray-100 text-gray-800"
    };
    return colores[categoria] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Proveedores"
              value={proveedores.length}
              icon={<Users />}
              color="blue"
            />
            <StatCard
              title="Activos"
              value={proveedores.filter((p) => p.estado === "activo").length}
              icon={<CheckCircle2 />}
              color="green"
            />
            <StatCard
              title="Evaluación Promedio"
              value={
                proveedores.length > 0
                  ? (
                      proveedores.reduce((acc, p) => acc + p.evaluacion, 0) /
                      proveedores.length
                    ).toFixed(1)
                  : "0.0"
              }
              icon={<Star />}
              color="yellow"
            />
            <StatCard
              title="Categorías"
              value={new Set(proveedores.map((p) => p.categoria)).size}
              icon={<Tags />}
              color="purple"
            />
          </div>

          {/* Panel Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 sticky top-8">
                <div className="bg-gradient-to-r from-[#4160BE] to-[#2A3E7A] text-white p-6 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <UserPlus className="h-6 w-6" />
                    <h3 className="text-lg font-bold">
                      {proveedorEditando
                        ? "Editar Proveedor"
                        : "Nuevo Proveedor"}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <form
                    onSubmit={
                      proveedorEditando
                        ? actualizarProveedor
                        : agregarProveedor
                    }
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                        Nombre *
                      </label>
                      <IconInput
                        icon={<Building2 />}
                        value={nuevoProveedor.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                        placeholder="Proveedor S.A.C."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                        RUC *
                      </label>
                      <IconInput
                        icon={<Hash />}
                        value={nuevoProveedor.ruc}
                        onChange={(e) => handleChange("ruc", e.target.value)}
                        placeholder="20123456789"
                        maxLength="11"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                        Email *
                      </label>
                      <IconInput
                        icon={<Mail />}
                        type="email"
                        value={nuevoProveedor.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="proveedor@correo.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                        Contacto
                      </label>
                      <IconInput
                        icon={<User />}
                        value={nuevoProveedor.contacto}
                        onChange={(e) =>
                          handleChange("contacto", e.target.value)
                        }
                        placeholder="Nombre del contacto"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                        Teléfono
                      </label>
                      <IconInput
                        icon={<Phone />}
                        value={nuevoProveedor.telefono}
                        onChange={(e) =>
                          handleChange("telefono", e.target.value)
                        }
                        placeholder="+51 999 999 999"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                        Categoría
                      </label>
                      <IconSelect
                        icon={<ListFilter />}
                        value={nuevoProveedor.categoria}
                        onChange={(e) =>
                          handleChange("categoria", e.target.value)
                        }
                      >
                        <option value="">Seleccionar categoría</option>
                        {categorias.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </IconSelect>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                        Productos/Servicios
                      </label>
                      <IconTextarea
                        icon={<Package />}
                        value={nuevoProveedor.productos}
                        onChange={(e) =>
                          handleChange("productos", e.target.value)
                        }
                        placeholder="Descripción de productos"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E2C57] mb-2">
                        Dirección
                      </label>
                      <IconInput
                        icon={<MapPin />}
                        value={nuevoProveedor.direccion}
                        onChange={(e) =>
                          handleChange("direccion", e.target.value)
                        }
                        placeholder="Av. Principal 123, Lima"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#4160BE] text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#2A3E7A] transition-all duration-200"
                      >
                        {proveedorEditando ? (
                          <Save className="h-5 w-5" />
                        ) : (
                          <PlusCircle className="h-5 w-5" />
                        )}
                        {proveedorEditando ? "Actualizar" : "Agregar"}
                      </button>
                      {proveedorEditando && (
                        <button
                          type="button"
                          onClick={cancelarEdicion}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-200 transition-all duration-200"
                        >
                          <X className="h-5 w-5" />
                          Cancelar
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Lista de Proveedores */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <h3 className="text-xl font-semibold text-[#1E2C57]">
                      Directorio de Proveedores
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-64">
                        <IconInput
                          icon={<Search />}
                          placeholder="Buscar por nombre, RUC, email..."
                          value={busqueda}
                          onChange={(e) => setBusqueda(e.target.value)}
                        />
                      </div>
                      <div className="w-full sm:w-40">
                        <IconSelect
                          icon={<ListFilter />}
                          value={filtroCategoria}
                          onChange={(e) => setFiltroCategoria(e.target.value)}
                        >
                          <option value="todos">Categorías</option>
                          {categorias.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                          ))}
                        </IconSelect>
                      </div>
                      <div className="w-full sm:w-40">
                        <IconSelect
                          icon={<ListFilter />}
                          value={filtroEstado}
                          onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                          <option value="todos">Todos</option>
                          <option value="activo">Activos</option>
                          <option value="inactivo">Inactivos</option>
                        </IconSelect>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {proveedoresFiltrados.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium text-[#1E2C57]">
                        {proveedores.length === 0
                          ? "No hay proveedores registrados"
                          : "No se encontraron proveedores"}
                      </p>
                      <p className="text-gray-500">
                        {proveedores.length > 0 && "Intente ajustar los filtros de búsqueda."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {proveedoresFiltrados.map((proveedor) => (
                        <div
                          key={proveedor.id}
                          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-[#1E2C57]">
                                    {proveedor.nombre}
                                  </h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    RUC: {proveedor.ruc}
                                  </p>
                                </div>
                                <div className="flex gap-2 mt-2 sm:mt-0">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getColorEstado(
                                      proveedor.estado
                                    )}`}
                                  >
                                    {proveedor.estado === "activo"
                                      ? "Activo"
                                      : "Inactivo"}
                                  </span>
                                  {proveedor.categoria && (
                                    <span
                                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getColorCategoria(
                                        proveedor.categoria
                                      )}`}
                                    >
                                      {proveedor.categoria}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                <p className="text-gray-600">
                                  <strong className="text-gray-700">Contacto:</strong>{" "}
                                  {proveedor.contacto || "No especificado"}
                                </p>
                                <p className="text-gray-600">
                                  <strong className="text-gray-700">Email:</strong>{" "}
                                  {proveedor.email}
                                </p>
                                <p className="text-gray-600">
                                  <strong className="text-gray-700">Teléfono:</strong>{" "}
                                  {proveedor.telefono || "No especificado"}
                                </p>
                                <div className="flex items-center">
                                  <strong className="text-gray-700 mr-2">Evaluación:</strong>
                                  <GetEstrellas evaluacion={proveedor.evaluacion} />
                                </div>
                                <p className="text-gray-600 md:col-span-2">
                                  <strong className="text-gray-700">Productos:</strong>{" "}
                                  {proveedor.productos || "No especificado"}
                                </p>
                                <p className="text-gray-600 md:col-span-2">
                                  <strong className="text-gray-700">Dirección:</strong>{" "}
                                  {proveedor.direccion || "No especificada"}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 lg:flex-col lg:w-24">
                              <button
                                onClick={() => editarProveedor(proveedor)}
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                              >
                                <Pencil className="h-4 w-4" />
                                Editar
                              </button>
                              <button
                                onClick={() => triggerEliminar(proveedor)}
                                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default GestionProveedores;