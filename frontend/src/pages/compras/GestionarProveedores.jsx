import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
      fechaRegistro: "2024-01-15"
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
      fechaRegistro: "2024-01-10"
    }
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
    estado: "activo"
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [proveedorEditando, setProveedorEditando] = useState(null);

  const categorias = [
    "tecnologia",
    "oficina",
    "materiales",
    "servicios",
    "limpieza",
    "mobiliario",
    "equipos",
    "otros"
  ];

  const handleChange = (name, value) => {
    setNuevoProveedor({ ...nuevoProveedor, [name]: value });
  };

  const validarProveedor = () => {
    if (!nuevoProveedor.nombre.trim()) {
      alert("El nombre del proveedor es obligatorio.");
      return false;
    }
    if (!nuevoProveedor.email.trim()) {
      alert("El email de contacto es obligatorio.");
      return false;
    }
    if (!nuevoProveedor.ruc.trim()) {
      alert("El RUC es obligatorio.");
      return false;
    }
    if (!/^\d{11}$/.test(nuevoProveedor.ruc)) {
      alert("El RUC debe tener 11 dígitos.");
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
      fechaRegistro: new Date().toISOString().split('T')[0],
      evaluacion: 0
    };

    setProveedores([...proveedores, proveedor]);
    limpiarFormulario();
    setMostrarFormulario(false);
  };

  const editarProveedor = (proveedor) => {
    setNuevoProveedor(proveedor);
    setProveedorEditando(proveedor.id);
    setMostrarFormulario(true);
  };

  const actualizarProveedor = (e) => {
    e.preventDefault();

    if (!validarProveedor()) return;

    setProveedores(proveedores.map(p => 
      p.id === proveedorEditando ? { ...nuevoProveedor, id: proveedorEditando } : p
    ));
    
    limpiarFormulario();
    setMostrarFormulario(false);
    setProveedorEditando(null);
  };

  const eliminarProveedor = (id) => {
    if (confirm("¿Está seguro de eliminar este proveedor? Esta acción no se puede deshacer.")) {
      setProveedores(proveedores.filter((p) => p.id !== id));
    }
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
      estado: "activo"
    });
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
    setMostrarFormulario(false);
    setProveedorEditando(null);
  };

  // Filtrado de proveedores
  const proveedoresFiltrados = proveedores.filter(proveedor => {
    const coincideBusqueda = 
      proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      proveedor.contacto?.toLowerCase().includes(busqueda.toLowerCase()) ||
      proveedor.email.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCategoria = filtroCategoria === "todos" || proveedor.categoria === filtroCategoria;
    const coincideEstado = filtroEstado === "todos" || proveedor.estado === filtroEstado;

    return coincideBusqueda && coincideCategoria && coincideEstado;
  });

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
      equipos: "bg-indigo-100 text-indigo-800"
    };
    return colores[categoria] || "bg-gray-100 text-gray-800";
  };

  const getEstrellas = (evaluacion) => {
    return "★".repeat(evaluacion) + "☆".repeat(5 - evaluacion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <span className="text-2xl">🏢</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Gestión de Proveedores
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Administra y mantiene el directorio de proveedores de la empresa
          </p>
        </header>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Proveedores</p>
                    <p className="text-2xl font-bold text-gray-900">{proveedores.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-blue-600">👥</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Activos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {proveedores.filter(p => p.estado === "activo").length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-green-600">✅</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Evaluación Promedio</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {proveedores.length > 0 
                        ? (proveedores.reduce((acc, p) => acc + p.evaluacion, 0) / proveedores.length).toFixed(1)
                        : "0.0"
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <span className="text-yellow-600">⭐</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Categorías</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(proveedores.map(p => p.categoria)).size}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <span className="text-purple-600">🏷️</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg border border-gray-200 sticky top-8">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="text-lg">
                    {proveedorEditando ? "Editar Proveedor" : "Nuevo Proveedor"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={proveedorEditando ? actualizarProveedor : agregarProveedor} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <Input
                        value={nuevoProveedor.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                        placeholder="Proveedor S.A.C."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RUC *
                      </label>
                      <Input
                        value={nuevoProveedor.ruc}
                        onChange={(e) => handleChange("ruc", e.target.value)}
                        placeholder="20123456789"
                        maxLength="11"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={nuevoProveedor.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="proveedor@correo.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contacto
                      </label>
                      <Input
                        value={nuevoProveedor.contacto}
                        onChange={(e) => handleChange("contacto", e.target.value)}
                        placeholder="Nombre del contacto"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <Input
                        value={nuevoProveedor.telefono}
                        onChange={(e) => handleChange("telefono", e.target.value)}
                        placeholder="+51 999 999 999"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría
                      </label>
                      <Select value={nuevoProveedor.categoria} onValueChange={(value) => handleChange("categoria", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map(cat => (
                            <SelectItem key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Productos/Servicios
                      </label>
                      <Textarea
                        value={nuevoProveedor.productos}
                        onChange={(e) => handleChange("productos", e.target.value)}
                        placeholder="Descripción de productos o servicios"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección
                      </label>
                      <Input
                        value={nuevoProveedor.direccion}
                        onChange={(e) => handleChange("direccion", e.target.value)}
                        placeholder="Av. Principal 123, Lima"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        {proveedorEditando ? "Actualizar" : "Agregar"}
                      </Button>
                      {proveedorEditando && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelarEdicion}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Proveedores */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg border border-gray-200">
                <CardHeader className="bg-white border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      Directorio de Proveedores
                    </CardTitle>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        placeholder="Buscar proveedores..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full sm:w-64"
                      />
                      
                      <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todas las categorías</SelectItem>
                          {categorias.map(cat => (
                            <SelectItem key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="activo">Activos</SelectItem>
                          <SelectItem value="inactivo">Inactivos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {proveedoresFiltrados.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🔍</div>
                      <p className="text-gray-500 text-lg">
                        {proveedores.length === 0 
                          ? "No hay proveedores registrados" 
                          : "No se encontraron proveedores con los filtros aplicados"
                        }
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
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {proveedor.nombre}
                                  </h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    RUC: {proveedor.ruc}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Badge className={getColorEstado(proveedor.estado)}>
                                    {proveedor.estado === "activo" ? "Activo" : "Inactivo"}
                                  </Badge>
                                  {proveedor.categoria && (
                                    <Badge variant="outline" className={getColorCategoria(proveedor.categoria)}>
                                      {proveedor.categoria}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">
                                    <strong>Contacto:</strong> {proveedor.contacto || "No especificado"}
                                  </p>
                                  <p className="text-gray-600">
                                    <strong>Email:</strong> {proveedor.email}
                                  </p>
                                  <p className="text-gray-600">
                                    <strong>Teléfono:</strong> {proveedor.telefono || "No especificado"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600">
                                    <strong>Productos:</strong> {proveedor.productos || "No especificado"}
                                  </p>
                                  <p className="text-gray-600">
                                    <strong>Evaluación:</strong> 
                                    <span className="text-yellow-500 ml-2">
                                      {getEstrellas(proveedor.evaluacion)}
                                    </span>
                                  </p>
                                  <p className="text-gray-600">
                                    <strong>Registro:</strong> {proveedor.fechaRegistro}
                                  </p>
                                </div>
                              </div>

                              {proveedor.direccion && (
                                <p className="text-gray-600 text-sm mt-3">
                                  <strong>Dirección:</strong> {proveedor.direccion}
                                </p>
                              )}
                            </div>

                            <div className="flex gap-2 lg:flex-col">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editarProveedor(proveedor)}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => eliminarProveedor(proveedor.id)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionProveedores;