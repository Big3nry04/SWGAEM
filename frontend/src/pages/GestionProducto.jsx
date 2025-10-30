import React, { useState } from 'react';
import { Package, FileText, History, Plus, Search, Download, Filter, Edit2, Trash2, AlertCircle, X, Save, AlertTriangle, ChevronDown } from 'lucide-react';

const productosIniciales = [
  { id: 'MAC-001', codigo: 'MAC-001', nombre: 'Tablet Eléctrico Industrial', categoria: 'Electrónica', precio: 1456.30, stock: 12, estado: 'Bajo Stock', stockMin: 15 },
  { id: 'HKJ-426', codigo: 'HKJ-426', nombre: 'Cable Eléctrico 3.5mm', categoria: 'Materiales', precio: 108.80, stock: 45, estado: 'Disponible', stockMin: 10 },
  { id: 'TRGF-841', codigo: 'TRGF-841', nombre: 'Generador Diesel 35KV', categoria: 'Equipos', precio: 21098.60, stock: 0, estado: 'Agotado', stockMin: 5 },
  { id: 'ACJ-882', codigo: 'ACJ-882', nombre: 'Casco de Seguridad', categoria: 'Accesorios', precio: 42.80, stock: 78, estado: 'Disponible', stockMin: 20 },
  { id: 'DME-855', codigo: 'DME-855', nombre: 'Guantes de Trabajo', categoria: 'Consumibles', precio: 12.50, stock: 145, estado: 'Disponible', stockMin: 50 },
  { id: 'UTLJ-915', codigo: 'UTLJ-915', nombre: 'Multímetro Digital', categoria: 'Electrónica', precio: 89.90, stock: 8, estado: 'Bajo Stock', stockMin: 10 },
  { id: 'GTMC-835', codigo: 'GTMC-835', nombre: 'Juego de llaves Allen', categoria: 'Herramientas', precio: 35.40, stock: 56, estado: 'Disponible', stockMin: 15 },
  { id: 'NKJ-020', codigo: 'NKJ-020', nombre: 'Cemento Portland Tipo I', categoria: 'Materiales', precio: 18.30, stock: 289, estado: 'Disponible', stockMin: 100 },
  { id: 'XYZ-123', codigo: 'XYZ-123', nombre: 'Destornillador Phillips', categoria: 'Herramientas', precio: 25.50, stock: 0, estado: 'Agotado', stockMin: 20 },
];

const movimientosIniciales = [
  { id: 1, tipo: 'Entrada', producto: 'Guantes de Trabajo', categoria: 'Consumibles', cantidad: -1, fecha: '2024-10-28', usuario: 'Admin Usuario', motivo: 'Venta al cliente final' },
  { id: 2, tipo: 'Ingreso', producto: 'Cemento Portland Tipo I', categoria: 'Materiales', cantidad: 100, fecha: '2024-10-27', usuario: 'Admin Usuario', motivo: 'Compra al proveedor' },
  { id: 3, tipo: 'Salida', producto: 'Cable Eléctrico 3.5mm', categoria: 'Materiales', cantidad: -7, fecha: '2024-10-26', usuario: 'Admin Usuario', motivo: 'Venta al cliente final' },
  { id: 4, tipo: 'Ingreso', producto: 'Tablet Eléctrico Industrial', categoria: 'Electrónica', cantidad: 15, fecha: '2024-10-25', usuario: 'Admin Usuario', motivo: 'Compra al proveedor' },
  { id: 5, tipo: 'Salida', producto: 'Casco de Seguridad', categoria: 'Accesorios', cantidad: -20, fecha: '2024-10-24', usuario: 'Admin Usuario', motivo: 'Venta mayorista' },
  { id: 6, tipo: 'Ajuste', producto: 'Multímetro Digital', categoria: 'Electrónica', cantidad: 5, fecha: '2024-10-23', usuario: 'Admin Usuario', motivo: 'Corrección de inventario' },
];

const categoriasInventario = [
  { nombre: 'Herramientas', productos: 3, stockTotal: 80, valorTotal: 1793.40 },
  { nombre: 'Consumibles', productos: 3, stockTotal: 238, valorTotal: 2546.90 },
  { nombre: 'Electrónica', productos: 3, stockTotal: 82, valorTotal: 39349.90 },
  { nombre: 'Equipos', productos: 3, stockTotal: 122, valorTotal: 6436.86 },
  { nombre: 'Accesorios', productos: 3, stockTotal: 192, valorTotal: 5480.80 },
  { nombre: 'Especializado', productos: 3, stockTotal: 238, valorTotal: 7246.90 },
];

const categorias = ['Electrónica', 'Materiales', 'Equipos', 'Accesorios', 'Consumibles', 'Herramientas'];

export default function GestionInventario() {
  const [vistaActual, setVistaActual] = useState('productos');
  const [productos, setProductos] = useState(productosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarFiltrosMovimientos, setMostrarFiltrosMovimientos] = useState(false);
  const [mostrarModalStock, setMostrarModalStock] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busquedaMovimientos, setBusquedaMovimientos] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  
  const [filtros, setFiltros] = useState({
    categoria: '',
    estado: '',
    stockMin: '',
    stockMax: ''
  });

  const [filtroMovimientos, setFiltroMovimientos] = useState('');
  
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: '',
    stockMinimo: '',
    imagen: '',
    estado: true
  });

  const [stockForm, setStockForm] = useState({
    cantidad: '',
    motivo: ''
  });

  const productosAlerta = productos.filter(p => p.stock <= p.stockMin);

  let productosFiltrados = productos.filter(p => {
    const cumpleBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase());
    
    const cumpleCategoria = !filtros.categoria || p.categoria === filtros.categoria;
    const cumpleEstado = !filtros.estado || p.estado === filtros.estado;
    const cumpleStockMin = !filtros.stockMin || p.stock >= parseInt(filtros.stockMin);
    const cumpleStockMax = !filtros.stockMax || p.stock <= parseInt(filtros.stockMax);

    return cumpleBusqueda && cumpleCategoria && cumpleEstado && cumpleStockMin && cumpleStockMax;
  });

  const indexUltimo = paginaActual * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const movimientosFiltrados = movimientosIniciales.filter(m => {
    const cumpleBusqueda = m.producto.toLowerCase().includes(busquedaMovimientos.toLowerCase()) ||
      m.motivo.toLowerCase().includes(busquedaMovimientos.toLowerCase()) ||
      m.categoria.toLowerCase().includes(busquedaMovimientos.toLowerCase());
    
    const cumpleTipo = !filtroMovimientos || m.tipo === filtroMovimientos;

    return cumpleBusqueda && cumpleTipo;
  });

  const categoriasFiltradas = categoriaSeleccionada 
    ? categoriasInventario.filter(c => c.nombre === categoriaSeleccionada)
    : categoriasInventario;

  const handleAgregarProducto = () => {
    setProductoEditando(null);
    setFormData({
      codigo: '',
      nombre: '',
      categoria: '',
      descripcion: '',
      precio: '',
      stockMinimo: '',
      imagen: '',
      estado: true
    });
    setMostrarFormulario(true);
  };

  const handleEditarProducto = (producto) => {
    setProductoEditando(producto);
    setFormData({
      codigo: producto.codigo,
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion || '',
      precio: producto.precio.toString(),
      stockMinimo: producto.stockMin.toString(),
      imagen: producto.imagen || '',
      estado: producto.estado !== 'Vendido'
    });
    setMostrarFormulario(true);
  };

  const handleGuardarProducto = () => {
    if (!formData.codigo || !formData.nombre || !formData.categoria || !formData.precio || !formData.stockMinimo) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (productoEditando) {
      setProductos(productos.map(p => 
        p.id === productoEditando.id 
          ? { 
              ...p, 
              codigo: formData.codigo,
              nombre: formData.nombre,
              categoria: formData.categoria,
              precio: parseFloat(formData.precio),
              stockMin: parseInt(formData.stockMinimo),
              estado: formData.estado ? 'Disponible' : 'Vendido'
            }
          : p
      ));
    } else {
      const nuevoProducto = {
        id: `PROD-${Date.now()}`,
        codigo: formData.codigo,
        nombre: formData.nombre,
        categoria: formData.categoria,
        precio: parseFloat(formData.precio),
        stock: 0,
        stockMin: parseInt(formData.stockMinimo),
        estado: 'Disponible'
      };
      setProductos([...productos, nuevoProducto]);
    }
    
    setMostrarFormulario(false);
    setProductoEditando(null);
  };

  const handleIngresarStock = (categoriaNombre) => {
    setCategoriaSeleccionada(categoriaNombre);
    setMostrarModalStock(true);
  };

  const handleGuardarStock = () => {
    if (!stockForm.cantidad || !stockForm.motivo) {
      alert('Por favor completa todos los campos');
      return;
    }
    alert(`Stock ingresado: ${stockForm.cantidad} unidades en categoría ${categoriaSeleccionada}`);
    setStockForm({ cantidad: '', motivo: '' });
    setMostrarModalStock(false);
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    setFormData({
      codigo: '',
      nombre: '',
      categoria: '',
      descripcion: '',
      precio: '',
      stockMinimo: '',
      imagen: '',
      estado: true
    });
  };

  const handleEliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  const limpiarFiltros = () => {
    setFiltros({
      categoria: '',
      estado: '',
      stockMin: '',
      stockMax: ''
    });
    setPaginaActual(1);
  };

  const stats = {
    totalProductos: 18,
    stockTotal: 889,
    alertasStock: productosAlerta.length,
    valorTotal: 34250.00
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-blue-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SWGAM</h1>
                <p className="text-xs text-blue-600">Marser Perú SAC</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Admin Usuario</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => {
                setVistaActual('productos');
                setMostrarFormulario(false);
              }}
              className={`px-6 py-3 font-medium transition-all ${
                vistaActual === 'productos'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Package className="w-4 h-4 inline mr-2" />
              Productos
            </button>
            <button
              onClick={() => {
                setVistaActual('control');
                setMostrarFormulario(false);
              }}
              className={`px-6 py-3 font-medium transition-all ${
                vistaActual === 'control'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Control de Inventario
            </button>
            <button
              onClick={() => {
                setVistaActual('movimientos');
                setMostrarFormulario(false);
              }}
              className={`px-6 py-3 font-medium transition-all ${
                vistaActual === 'movimientos'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <History className="w-4 h-4 inline mr-2" />
              Movimientos
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {vistaActual === 'productos' && !mostrarFormulario && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Productos e Inventario</h2>
                <p className="text-gray-600 text-sm mt-1">Gestiona tu catálogo de productos y monitorea el inventario</p>
              </div>
              <button 
                onClick={handleAgregarProducto}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all"
              >
                <Plus className="w-5 h-5" />
                Agregar Producto
              </button>
            </div>

            {productosAlerta.length > 0 && (
              <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Alerta de Stock Bajo</h3>
                    <p className="text-red-700 text-sm mb-3">
                      {productosAlerta.length} producto{productosAlerta.length > 1 ? 's' : ''} con stock bajo o agotado
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {productosAlerta.map(p => (
                        <span key={p.id} className="px-3 py-1.5 bg-red-100 border border-red-300 rounded-lg text-sm">
                          <span className="text-red-700 font-mono">{p.codigo}</span>
                          <span className="text-red-600 ml-2">({p.stock === 0 ? 'Agotado' : `Stock: ${p.stock}`})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por código, nombre o categoría..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className={`px-6 py-2.5 ${mostrarFiltros ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} rounded-lg flex items-center gap-2 border border-gray-300 transition-all`}
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
                <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 border border-gray-300 transition-all">
                  <Download className="w-4 h-4" />
                  Exportar
                </button>
              </div>

              {mostrarFiltros && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-gray-700 font-medium mb-2">Categoría</label>
                      <select
                        value={filtros.categoria}
                        onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Todas las categorías</option>
                        {categorias.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 font-medium mb-2">Estado</label>
                      <select
                        value={filtros.estado}
                        onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Todos los estados</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Bajo Stock">Bajo Stock</option>
                        <option value="Agotado">Agotado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 font-medium mb-2">Stock Mínimo</label>
                      <input
                        type="number"
                        value={filtros.stockMin}
                        onChange={(e) => setFiltros({...filtros, stockMin: e.target.value})}
                        placeholder="0"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 font-medium mb-2">Stock Máximo</label>
                      <input
                        type="number"
                        value={filtros.stockMax}
                        onChange={(e) => setFiltros({...filtros, stockMax: e.target.value})}
                        placeholder="999"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={limpiarFiltros}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-all"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Código</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock Mín.</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {productosActuales.map((producto) => (
                      <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">{producto.codigo}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{producto.nombre}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{producto.categoria}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">S/ {producto.precio.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{producto.stock}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{producto.stockMin}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            producto.estado === 'Disponible' 
                              ? 'bg-green-100 text-green-700 border border-green-300'
                              : producto.estado === 'Bajo Stock'
                              ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                              : 'bg-red-100 text-red-700 border border-red-300'
                          }`}>
                            {producto.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditarProducto(producto)}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                            </button>
                            <button 
                              onClick={() => handleEliminarProducto(producto.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Mostrando {indexPrimero + 1} a {Math.min(indexUltimo, productosFiltrados.length)} de {productosFiltrados.length} productos
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
                    disabled={paginaActual === 1}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  {[...Array(totalPaginas)].map((_, i) => (
                    <button 
                      key={i + 1}
                      onClick={() => setPaginaActual(i + 1)}
                      className={`px-4 py-2 ${paginaActual === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-all`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
                    disabled={paginaActual === totalPaginas}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {mostrarFormulario && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className="bg-white border border-blue-200 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {productoEditando ? 'Editar Producto' : 'Registrar Producto'}
                  </h2>
                  <p className="text-blue-600 text-sm mt-1">
                    {productoEditando
                      ? 'Actualiza los datos del producto seleccionado'
                      : 'Completa los datos del nuevo producto'}
                  </p>
                </div>
                <button
                  onClick={handleCancelar}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-red-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Código <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                    placeholder="Ej: MAC-001"
                    className="w-full px-4 py-2.5 bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-blue-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Nombre del producto"
                    className="w-full px-4 py-2.5 bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Descripción del producto"
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Precio (S/) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Stock Mínimo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stockMinimo}
                    onChange={(e) => setFormData({ ...formData, stockMinimo: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-2.5 bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    URL de Imagen (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.imagen}
                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full px-4 py-2.5 bg-white border border-blue-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.estado}
                      onChange={(e) =>
                        setFormData({ ...formData, estado: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-blue-400 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-blue-700">
                      Estado del Producto
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ml-8">
                    {formData.estado
                      ? 'Producto disponible para venta'
                      : 'Producto no disponible'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-blue-100">
                <button
                  onClick={handleCancelar}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-all border border-blue-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarProducto}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <Save className="w-5 h-5" />
                  {productoEditando ? 'Actualizar' : 'Registrar'}
                </button>
              </div>
            </div>
          </div>
        )}



        {vistaActual === 'control' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Control de Inventario</h2>
                <p className="text-gray-600 text-sm mt-1">Vista general del estado del inventario y estadísticas</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all">
                <Download className="w-5 h-5" />
                Exportar PDF
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-700 text-sm font-medium">Total Productos</h3>
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProductos}</p>
                <p className="text-xs text-blue-600 mt-1">Productos registrados</p>
              </div>

              <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-green-700 text-sm font-medium">Stock Total</h3>
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.stockTotal}</p>
                <p className="text-xs text-green-600 mt-1">Unidades en stock</p>
              </div>

              <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-red-700 text-sm font-medium">Alertas de Stock</h3>
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.alertasStock}</p>
                <p className="text-xs text-red-600 mt-1">Productos con stock bajo</p>
              </div>

              <div className="bg-purple-50 rounded-xl border border-purple-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-purple-700 text-sm font-medium">Valor Total</h3>
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">S/ {stats.valorTotal.toLocaleString()}</p>
                <p className="text-xs text-purple-600 mt-1">Valor del inventario</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por producto o código..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                  className="px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inventario por Categoría</h3>
              <p className="text-sm text-gray-600 mb-6">Distribución por categoría y stock de categoría</p>
              
              <div className="space-y-4">
                {categoriasFiltradas.map((cat, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900 font-semibold text-lg">{cat.nombre}</h4>
                        <p className="text-sm text-gray-600 mt-1">{cat.productos} productos</p>
                      </div>
                      <button 
                        onClick={() => handleIngresarStock(cat.nombre)}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium border border-blue-300 transition-all"
                      >
                        + Ingresar Stock
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-600">Stock Total</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{cat.stockTotal}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Stock Mínimo</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">-</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Valor</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">S/ {cat.valorTotal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {vistaActual === 'movimientos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Historial de Movimientos</h2>
                <p className="text-gray-600 text-sm mt-1">Registro completo de entradas, salidas y ajustes de inventario</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all">
                <Download className="w-5 h-5" />
                Exportar PDF
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
                <p className="text-blue-700 text-sm mb-2 font-medium">Total Movimientos</p>
                <p className="text-4xl font-bold text-gray-900">{movimientosIniciales.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
                <p className="text-green-700 text-sm mb-2 font-medium">Ingresos</p>
                <p className="text-4xl font-bold text-gray-900">
                  {movimientosIniciales.filter(m => m.tipo === 'Ingreso').length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
                <p className="text-red-700 text-sm mb-2 font-medium">Salidas</p>
                <p className="text-4xl font-bold text-gray-900">
                  {movimientosIniciales.filter(m => m.tipo === 'Salida').length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
                <p className="text-purple-700 text-sm mb-2 font-medium">Ajustes</p>
                <p className="text-4xl font-bold text-gray-900">
                  {movimientosIniciales.filter(m => m.tipo === 'Ajuste').length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por producto o motivo..."
                    value={busquedaMovimientos}
                    onChange={(e) => setBusquedaMovimientos(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  onClick={() => setMostrarFiltrosMovimientos(!mostrarFiltrosMovimientos)}
                  className={`px-6 py-2.5 ${mostrarFiltrosMovimientos ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} rounded-lg flex items-center gap-2 border border-gray-300 transition-all`}
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
              </div>

              {mostrarFiltrosMovimientos && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-700 font-medium">Tipo de Movimiento:</label>
                    <select
                      value={filtroMovimientos}
                      onChange={(e) => setFiltroMovimientos(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Todos los movimientos</option>
                      <option value="Entrada">Entrada</option>
                      <option value="Salida">Salida</option>
                      <option value="Ingreso">Ingreso</option>
                      <option value="Ajuste">Ajuste</option>
                    </select>
                    <button
                      onClick={() => setFiltroMovimientos('')}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-all"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Movimientos Recientes</h3>
              <p className="text-sm text-gray-600 mb-6">
                {movimientosFiltrados.length} movimiento{movimientosFiltrados.length !== 1 ? 's' : ''} encontrado{movimientosFiltrados.length !== 1 ? 's' : ''}
              </p>
              
              <div className="space-y-3">
                {movimientosFiltrados.length > 0 ? (
                  movimientosFiltrados.map((mov) => (
                    <div key={mov.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              mov.tipo === 'Ingreso'
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : mov.tipo === 'Salida' || mov.tipo === 'Entrada'
                                ? 'bg-red-100 text-red-700 border border-red-300'
                                : 'bg-blue-100 text-blue-700 border border-blue-300'
                            }`}>
                              {mov.tipo}
                            </span>
                            <span className="text-gray-900 font-semibold">{mov.producto}</span>
                            <span className="text-gray-600 text-sm">- {mov.categoria}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <p className="text-xs text-gray-600">Cantidad</p>
                              <p className={`text-lg font-bold ${mov.cantidad > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {mov.cantidad > 0 ? '+' : ''}{mov.cantidad}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Fecha</p>
                              <p className="text-lg font-bold text-gray-900">{mov.fecha}</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-600">Motivo</p>
                            <p className="text-sm text-gray-900 mt-1">{mov.motivo}</p>
                            <p className="text-xs text-gray-600 mt-1">Usuario: {mov.usuario}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No se encontraron movimientos con los filtros aplicados</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {mostrarModalStock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Ingresar Stock</h3>
                <p className="text-sm text-gray-600 mt-1">Categoría: {categoriaSeleccionada}</p>
              </div>
              <button 
                onClick={() => setMostrarModalStock(false)}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={stockForm.cantidad}
                  onChange={(e) => setStockForm({...stockForm, cantidad: e.target.value})}
                  placeholder="0"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivo <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={stockForm.motivo}
                  onChange={(e) => setStockForm({...stockForm, motivo: e.target.value})}
                  placeholder="Describe el motivo del ingreso de stock"
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setMostrarModalStock(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all border border-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarStock}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
              >
                <Save className="w-5 h-5" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}