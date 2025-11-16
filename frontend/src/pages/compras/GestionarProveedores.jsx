import React, { useState, useMemo } from "react";
import {
  Users,
  CheckCircle2,
  Star,
  Tags,
  Search,
  Filter,
  Building2,
  Hash,
  Mail,
  User,
  Phone,
  Package,
  MapPin,
  RotateCcw,
  Eye,
  Pencil,
  Trash2,
  X,
  PlusCircle,
  FileDown,
  FileSpreadsheet,
  ListFilter,
  TrendingUp,
  AlertTriangle
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
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      gradient: "from-yellow-500 to-yellow-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      gradient: "from-purple-500 to-purple-600"
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

const GetEstrellas = ({ evaluacion }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i <= evaluacion ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return <div className="flex gap-0.5">{stars}</div>;
};

const GestionProveedores = () => {
  const [filtros, setFiltros] = useState({
    busqueda: "",
    categoria: "",
    estado: "",
    evaluacionMin: "",
  });

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalConfirmar, setMostrarModalConfirmar] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [proveedorEliminar, setProveedorEliminar] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const proveedoresPorPagina = 8;

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
      categoriaTexto: "Tecnología",
      estado: "activo",
      estadoTexto: "Activo",
      evaluacion: 4,
      productos: "Equipos de computación, laptops, periféricos",
      fechaRegistro: "2024-01-15",
      fechaRegistroFormateada: "15/01/2024",
      comprasRealizadas: 24
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
      categoriaTexto: "Oficina",
      estado: "activo",
      estadoTexto: "Activo",
      evaluacion: 5,
      productos: "Materiales de oficina, papelería",
      fechaRegistro: "2024-01-10",
      fechaRegistroFormateada: "10/01/2024",
      comprasRealizadas: 18
    },
    {
      id: 3,
      nombre: "Distribuidora Norte SAC",
      email: "info@distribuidoranorte.com",
      telefono: "+51 987 654 323",
      ruc: "20123456781",
      direccion: "Jr. Industrial 789, Trujillo",
      contacto: "Carlos Rodríguez",
      categoria: "materiales",
      categoriaTexto: "Materiales",
      estado: "activo",
      estadoTexto: "Activo",
      evaluacion: 3,
      productos: "Materiales de construcción, herramientas",
      fechaRegistro: "2024-01-20",
      fechaRegistroFormateada: "20/01/2024",
      comprasRealizadas: 12
    },
    {
      id: 4,
      nombre: "Servicios Express EIRL",
      email: "contacto@serviciosexpress.com",
      telefono: "+51 987 654 324",
      ruc: "20123456782",
      direccion: "Av. Los Pinos 321, Cusco",
      contacto: "Ana Martínez",
      categoria: "servicios",
      categoriaTexto: "Servicios",
      estado: "inactivo",
      estadoTexto: "Inactivo",
      evaluacion: 2,
      productos: "Servicios de mantenimiento",
      fechaRegistro: "2024-02-01",
      fechaRegistroFormateada: "01/02/2024",
      comprasRealizadas: 5
    },
    {
      id: 5,
      nombre: "Limpieza Total S.A.",
      email: "ventas@limpiezatotal.com",
      telefono: "+51 987 654 325",
      ruc: "20123456783",
      direccion: "Calle Las Flores 555, Lima",
      contacto: "Pedro Sánchez",
      categoria: "limpieza",
      categoriaTexto: "Limpieza",
      estado: "activo",
      estadoTexto: "Activo",
      evaluacion: 4,
      productos: "Productos de limpieza, desinfectantes",
      fechaRegistro: "2024-02-10",
      fechaRegistroFormateada: "10/02/2024",
      comprasRealizadas: 15
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
    estado: "activo",
  });

  const categorias = [
    { valor: "", texto: "Todas las categorías" },
    { valor: "tecnologia", texto: "Tecnología" },
    { valor: "oficina", texto: "Oficina" },
    { valor: "materiales", texto: "Materiales" },
    { valor: "servicios", texto: "Servicios" },
    { valor: "limpieza", texto: "Limpieza" },
    { valor: "mobiliario", texto: "Mobiliario" },
    { valor: "equipos", texto: "Equipos" },
    { valor: "otros", texto: "Otros" }
  ];

  const estados = [
    { valor: "", texto: "Todos los estados" },
    { valor: "activo", texto: "Activo" },
    { valor: "inactivo", texto: "Inactivo" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleChangeProveedor = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor({ ...nuevoProveedor, [name]: value });
  };

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      categoria: "",
      estado: "",
      evaluacionMin: "",
    });
    setPaginaActual(1);
  };

  const proveedoresFiltrados = useMemo(() => {
    return proveedores.filter((p) => {
      const evaluacionMin = filtros.evaluacionMin ? parseInt(filtros.evaluacionMin) : 0;

      const coincideBusqueda = 
        !filtros.busqueda ||
        p.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        p.contacto.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        p.email.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        p.ruc.includes(filtros.busqueda);

      return (
        coincideBusqueda &&
        (!filtros.categoria || p.categoria === filtros.categoria) &&
        (!filtros.estado || p.estado === filtros.estado) &&
        p.evaluacion >= evaluacionMin
      );
    });
  }, [proveedores, filtros]);

  const indexUltimo = paginaActual * proveedoresPorPagina;
  const indexPrimero = indexUltimo - proveedoresPorPagina;
  const proveedoresActuales = proveedoresFiltrados.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(proveedoresFiltrados.length / proveedoresPorPagina);

  const estadisticas = useMemo(() => {
    const total = proveedoresFiltrados.length;
    const activos = proveedoresFiltrados.filter(p => p.estado === "activo").length;
    const evaluacionPromedio = total > 0 
      ? (proveedoresFiltrados.reduce((sum, p) => sum + p.evaluacion, 0) / total).toFixed(1)
      : "0.0";
    const categorias = new Set(proveedoresFiltrados.map(p => p.categoria)).size;
    
    return { total, activos, evaluacionPromedio, categorias };
  }, [proveedoresFiltrados]);

  const exportarPDF = () => {
    alert("Funcionalidad de exportación PDF en desarrollo");
  };

  const exportarExcel = () => {
    alert("Funcionalidad de exportación Excel en desarrollo");
  };

  const getColorEstado = (estado) => {
    return estado === "activo"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-700 border-red-200";
  };

  const getColorCategoria = (categoria) => {
    const colores = {
      tecnologia: "bg-blue-50 text-blue-700 border-blue-200",
      oficina: "bg-purple-50 text-purple-700 border-purple-200",
      materiales: "bg-orange-50 text-orange-700 border-orange-200",
      servicios: "bg-cyan-50 text-cyan-700 border-cyan-200",
      limpieza: "bg-emerald-50 text-emerald-700 border-emerald-200",
      mobiliario: "bg-amber-50 text-amber-700 border-amber-200",
      equipos: "bg-indigo-50 text-indigo-700 border-indigo-200",
      otros: "bg-gray-50 text-gray-700 border-gray-200"
    };
    return colores[categoria] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const handleVerDetalle = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setModoEdicion(false);
    setMostrarModal(true);
  };

  const handleEditarProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setNuevoProveedor({
      nombre: proveedor.nombre,
      email: proveedor.email,
      telefono: proveedor.telefono,
      ruc: proveedor.ruc,
      direccion: proveedor.direccion,
      contacto: proveedor.contacto,
      categoria: proveedor.categoria,
      productos: proveedor.productos,
      estado: proveedor.estado,
    });
    setModoEdicion(true);
    setMostrarModal(true);
  };

  const handleEliminarProveedor = (proveedor) => {
    setProveedorEliminar(proveedor);
    setMostrarModalConfirmar(true);
  };

  const confirmarEliminacion = () => {
    setProveedores(proveedores.filter(p => p.id !== proveedorEliminar.id));
    setMostrarModalConfirmar(false);
    setProveedorEliminar(null);
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
    setModoEdicion(false);
    setProveedorSeleccionado(null);
  };

  const handleGuardarProveedor = (e) => {
    e.preventDefault();
    
    if (!nuevoProveedor.nombre.trim()) {
      alert("El nombre del proveedor es obligatorio");
      return;
    }
    if (!nuevoProveedor.email.trim()) {
      alert("El email es obligatorio");
      return;
    }
    if (!nuevoProveedor.ruc.trim()) {
      alert("El RUC es obligatorio");
      return;
    }
    if (!/^\d{11}$/.test(nuevoProveedor.ruc)) {
      alert("El RUC debe tener 11 dígitos");
      return;
    }

    if (modoEdicion && proveedorSeleccionado) {
      // Actualizar proveedor existente
      const categoriaObj = categorias.find(c => c.valor === nuevoProveedor.categoria);
      setProveedores(proveedores.map(p => 
        p.id === proveedorSeleccionado.id 
          ? {
              ...p,
              ...nuevoProveedor,
              categoriaTexto: categoriaObj?.texto || "",
              estadoTexto: nuevoProveedor.estado === "activo" ? "Activo" : "Inactivo"
            }
          : p
      ));
    } else {
      // Agregar nuevo proveedor
      const categoriaObj = categorias.find(c => c.valor === nuevoProveedor.categoria);
      const fecha = new Date();
      const fechaISO = fecha.toISOString().split("T")[0];
      const fechaFormateada = fecha.toLocaleDateString('es-PE');
      
      const proveedor = {
        ...nuevoProveedor,
        id: Date.now(),
        categoriaTexto: categoriaObj?.texto || "",
        estadoTexto: nuevoProveedor.estado === "activo" ? "Activo" : "Inactivo",
        evaluacion: 0,
        fechaRegistro: fechaISO,
        fechaRegistroFormateada: fechaFormateada,
        comprasRealizadas: 0
      };
      setProveedores([proveedor, ...proveedores]);
    }

    setMostrarModal(false);
    limpiarFormulario();
  };

  const handleNuevoProveedor = () => {
    limpiarFormulario();
    setModoEdicion(true);
    setMostrarModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Título */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Gestión de Proveedores</h2>
              <p className="text-gray-600 mt-1">Administra tu directorio de proveedores</p>
            </div>
            <button
              onClick={handleNuevoProveedor}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl flex items-center gap-2 transition-all font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
            >
              <PlusCircle className="w-5 h-5" />
              Nuevo Proveedor
            </button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard 
              title="Total Proveedores" 
              value={estadisticas.total} 
              icon={Users} 
              color="blue"
              trend={`${proveedores.length} registrados`}
            />
            <StatCard 
              title="Proveedores Activos" 
              value={estadisticas.activos} 
              icon={CheckCircle2} 
              color="green"
              trend="Disponibles"
            />
            <StatCard 
              title="Evaluación Promedio" 
              value={estadisticas.evaluacionPromedio}
              icon={Star} 
              color="yellow"
              trend="De 5 estrellas"
            />
            <StatCard 
              title="Categorías" 
              value={estadisticas.categorias}
              icon={Tags} 
              color="purple"
              trend="Clasificaciones"
            />
          </div>

          {/* Panel de Filtros */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex gap-4 flex-wrap items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Filtros de Búsqueda</h3>
                  <p className="text-xs text-gray-600">Encuentra proveedores específicos</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className={`px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 font-medium ${
                    mostrarFiltros 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {mostrarFiltros ? 'Ocultar' : 'Mostrar'} Filtros
                </button>
                
                <button
                  onClick={exportarExcel}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center gap-2 transition-all font-medium shadow-lg shadow-green-500/30"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </button>
                
                <button
                  onClick={exportarPDF}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center gap-2 transition-all font-medium shadow-lg shadow-red-500/30"
                >
                  <FileDown className="w-4 h-4" />
                  PDF
                </button>
              </div>
            </div>

            {/* Filtros Expandibles */}
            {mostrarFiltros && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Búsqueda */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Búsqueda General</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="busqueda"
                        placeholder="Nombre, RUC, email..."
                        value={filtros.busqueda}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Categoría */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Categoría</label>
                    <div className="relative">
                      <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="categoria"
                        value={filtros.categoria}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        {categorias.map(cat => (
                          <option key={cat.valor} value={cat.valor}>
                            {cat.texto}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Estado</label>
                    <div className="relative">
                      <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="estado"
                        value={filtros.estado}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        {estados.map(estado => (
                          <option key={estado.valor} value={estado.valor}>
                            {estado.texto}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Evaluación Mínima */}
                  <div>
                    <label className="block text-xs text-gray-700 font-semibold mb-2">Evaluación Mínima</label>
                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="evaluacionMin"
                        value={filtros.evaluacionMin}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Todas</option>
                        <option value="1">1+ estrellas</option>
                        <option value="2">2+ estrellas</option>
                        <option value="3">3+ estrellas</option>
                        <option value="4">4+ estrellas</option>
                        <option value="5">5 estrellas</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={limpiarFiltros}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-all font-medium flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tabla de resultados */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Directorio de Proveedores</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {proveedoresFiltrados.length} proveedor{proveedoresFiltrados.length !== 1 ? 'es' : ''} encontrado{proveedoresFiltrados.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Proveedor</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">RUC</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Evaluación</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {proveedoresActuales.length > 0 ? (
                    proveedoresActuales.map((proveedor) => (
                      <tr key={proveedor.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-900 font-semibold">{proveedor.nombre}</span>
                            <span className="text-xs text-gray-500">{proveedor.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-800">{proveedor.contacto}</span>
                            <span className="text-xs text-gray-500">{proveedor.telefono}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">{proveedor.ruc}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorCategoria(proveedor.categoria)}`}>
                            {proveedor.categoriaTexto}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <GetEstrellas evaluacion={proveedor.evaluacion} />
                            <span className="text-xs text-gray-500">{proveedor.comprasRealizadas} compras</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorEstado(proveedor.estado)}`}>
                            {proveedor.estadoTexto}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleVerDetalle(proveedor)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Ver detalle"
                            >
                              <Eye className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleEditarProveedor(proveedor)}
                              className="p-2 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Editar"
                            >
                              <Pencil className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleEliminarProveedor(proveedor)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Search className="h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg font-medium mb-2">No se encontraron proveedores</p>
                          <p className="text-sm">
                            {Object.values(filtros).some(val => val !== "") 
                              ? "No hay proveedores que coincidan con los filtros aplicados"
                              : "No hay proveedores registrados en el sistema"
                            }
                          </p>
                          {Object.values(filtros).some(val => val !== "") && (
                            <button
                              onClick={limpiarFiltros}
                              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Limpiar filtros
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {proveedoresFiltrados.length > 0 && (
              <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-600 font-medium">
                  Mostrando {indexPrimero + 1} a {Math.min(indexUltimo, proveedoresFiltrados.length)} de {proveedoresFiltrados.length} proveedores
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
                    disabled={paginaActual === 1}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Anterior
                  </button>
                  {[...Array(totalPaginas)].map((_, i) => (
                    <button 
                      key={i + 1}
                      onClick={() => setPaginaActual(i + 1)}
                      className={`px-4 py-2 rounded-xl transition-all font-medium ${
                        paginaActual === i + 1 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
                    disabled={paginaActual === totalPaginas}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de detalle/edición */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {modoEdicion ? (proveedorSeleccionado ? 'Editar Proveedor' : 'Nuevo Proveedor') : 'Detalle del Proveedor'}
                </h2>
                {!modoEdicion && proveedorSeleccionado && (
                  <p className="text-blue-600 text-sm mt-1">{proveedorSeleccionado.nombre}</p>
                )}
              </div>
              <button
                onClick={() => {
                  setMostrarModal(false);
                  limpiarFormulario();
                }}
                className="p-2 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <X className="w-6 h-6 text-red-500" />
              </button>
            </div>

            {modoEdicion ? (
              <form onSubmit={handleGuardarProveedor} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="nombre"
                        value={nuevoProveedor.nombre}
                        onChange={handleChangeProveedor}
                        placeholder="Proveedor S.A.C."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">RUC *</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="ruc"
                        value={nuevoProveedor.ruc}
                        onChange={handleChangeProveedor}
                        placeholder="20123456789"
                        maxLength="11"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={nuevoProveedor.email}
                        onChange={handleChangeProveedor}
                        placeholder="proveedor@correo.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="telefono"
                        value={nuevoProveedor.telefono}
                        onChange={handleChangeProveedor}
                        placeholder="+51 999 999 999"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contacto</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="contacto"
                        value={nuevoProveedor.contacto}
                        onChange={handleChangeProveedor}
                        placeholder="Nombre del contacto"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                    <div className="relative">
                      <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="categoria"
                        value={nuevoProveedor.categoria}
                        onChange={handleChangeProveedor}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Seleccionar categoría</option>
                        {categorias.slice(1).map(cat => (
                          <option key={cat.valor} value={cat.valor}>
                            {cat.texto}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="direccion"
                        value={nuevoProveedor.direccion}
                        onChange={handleChangeProveedor}
                        placeholder="Av. Principal 123, Lima"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Productos/Servicios</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        name="productos"
                        value={nuevoProveedor.productos}
                        onChange={handleChangeProveedor}
                        placeholder="Descripción de productos o servicios"
                        rows="3"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                    <div className="relative">
                      <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="estado"
                        value={nuevoProveedor.estado}
                        onChange={handleChangeProveedor}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarModal(false);
                      limpiarFormulario();
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
                  >
                    {proveedorSeleccionado ? 'Actualizar' : 'Guardar'} Proveedor
                  </button>
                </div>
              </form>
            ) : (
              proveedorSeleccionado && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <p className="text-sm font-semibold text-blue-900">Proveedor</p>
                      </div>
                      <p className="text-gray-900 font-bold">{proveedorSeleccionado.nombre}</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="w-5 h-5 text-green-600" />
                        <p className="text-sm font-semibold text-green-900">RUC</p>
                      </div>
                      <p className="text-gray-900 font-bold font-mono">{proveedorSeleccionado.ruc}</p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-purple-600" />
                        <p className="text-sm font-semibold text-purple-900">Contacto</p>
                      </div>
                      <p className="text-gray-900 font-bold">{proveedorSeleccionado.contacto}</p>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-5 h-5 text-orange-600" />
                        <p className="text-sm font-semibold text-orange-900">Teléfono</p>
                      </div>
                      <p className="text-gray-900 font-bold">{proveedorSeleccionado.telefono}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium mb-1">Evaluación</p>
                      <div className="flex justify-center mb-1">
                        <GetEstrellas evaluacion={proveedorSeleccionado.evaluacion} />
                      </div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium mb-1">Estado</p>
                      <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorEstado(proveedorSeleccionado.estado)}`}>
                        {proveedorSeleccionado.estadoTexto}
                      </span>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium mb-1">Categoría</p>
                      <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-medium border ${getColorCategoria(proveedorSeleccionado.categoria)}`}>
                        {proveedorSeleccionado.categoriaTexto}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Información Adicional</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-600 font-semibold">Email</span>
                        <span className="text-sm text-gray-900">{proveedorSeleccionado.email}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-600 font-semibold">Dirección</span>
                        <span className="text-sm text-gray-900 text-right">{proveedorSeleccionado.direccion}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-600 font-semibold">Productos/Servicios</span>
                        <span className="text-sm text-gray-900 text-right max-w-md">{proveedorSeleccionado.productos}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-semibold">Fecha de Registro</span>
                        <span className="text-sm text-gray-900">{proveedorSeleccionado.fechaRegistroFormateada}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-semibold">Compras Realizadas</span>
                        <span className="text-sm text-gray-900 font-bold">{proveedorSeleccionado.comprasRealizadas}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setMostrarModal(false);
                        setProveedorSeleccionado(null);
                      }}
                      className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all border border-gray-200"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => {
                        setModoEdicion(true);
                        setNuevoProveedor({
                          nombre: proveedorSeleccionado.nombre,
                          email: proveedorSeleccionado.email,
                          telefono: proveedorSeleccionado.telefono,
                          ruc: proveedorSeleccionado.ruc,
                          direccion: proveedorSeleccionado.direccion,
                          contacto: proveedorSeleccionado.contacto,
                          categoria: proveedorSeleccionado.categoria,
                          productos: proveedorSeleccionado.productos,
                          estado: proveedorSeleccionado.estado,
                        });
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
                    >
                      <Pencil className="w-5 h-5" />
                      Editar Proveedor
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {mostrarModalConfirmar && proveedorEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirmar Eliminación</h3>
                <p className="text-gray-600 mb-6">
                  ¿Está seguro de eliminar a <strong>{proveedorEliminar.nombre}</strong>? Esta acción no se puede deshacer.
                </p>
              </div>
            </div>
            <div className="flex gap-3 bg-gray-50 p-4 rounded-b-2xl">
              <button
                onClick={() => {
                  setMostrarModalConfirmar(false);
                  setProveedorEliminar(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionProveedores;