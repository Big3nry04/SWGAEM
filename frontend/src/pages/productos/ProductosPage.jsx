import React, { useState } from 'react';
import { Plus, Search, Download, Filter, Edit2, Trash2, AlertTriangle } from "lucide-react";
import GestionInventario from './GestionInventario';
import FormularioProducto from './FormularioProducto';
import TablaProductos from './TablaProductos';
import FiltrosProductos from './FiltrosProductos';
import { categorias, productosIniciales } from './InventarioData';

export default function ProductosPage() {
  const [productos, setProductos] = useState(productosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  
  const [filtros, setFiltros] = useState({
    categoria: '',
    estado: '',
    stockMin: '',
    stockMax: ''
  });
  
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

  return (
    <GestionInventario>
      {!mostrarFormulario && (
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Productos e Inventario</h2>
              <p className="text-gray-600 mt-1">Gestiona tu catálogo de productos y monitorea el inventario</p>
            </div>
            <button 
              onClick={handleAgregarProducto}
              className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 group overflow-hidden hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium relative z-10">Agregar Producto</span>
            </button>
          </div>

          {productosAlerta.length > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Alerta de Stock Bajo</h3>
                  <p className="text-red-700 mb-3">
                    {productosAlerta.length} producto{productosAlerta.length > 1 ? 's' : ''} con stock bajo o agotado
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {productosAlerta.map(p => (
                      <span key={p.id} className="px-3 py-1.5 bg-white border border-red-200 rounded-xl text-sm shadow-sm">
                        <span className="text-red-700 font-mono font-semibold">{p.codigo}</span>
                        <span className="text-red-600 ml-2">({p.stock === 0 ? 'Agotado' : `Stock: ${p.stock}`})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por código, nombre o categoría..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <button 
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className={`px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 font-medium ${
                  mostrarFiltros 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>
              <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl flex items-center gap-2 border border-gray-200 transition-all font-medium">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>

            {mostrarFiltros && (
              <FiltrosProductos 
                filtros={filtros}
                setFiltros={setFiltros}
                limpiarFiltros={limpiarFiltros}
              />
            )}
          </div>

          <TablaProductos 
            productosActuales={productosActuales}
            handleEditarProducto={handleEditarProducto}
            handleEliminarProducto={handleEliminarProducto}
            indexPrimero={indexPrimero}
            indexUltimo={indexUltimo}
            productosFiltrados={productosFiltrados}
            paginaActual={paginaActual}
            setPaginaActual={setPaginaActual}
            totalPaginas={totalPaginas}
          />
        </div>
      )}

      {mostrarFormulario && (
        <FormularioProducto 
          formData={formData}
          setFormData={setFormData}
          productoEditando={productoEditando}
          handleGuardarProducto={handleGuardarProducto}
          handleCancelar={handleCancelar}
        />
      )}
    </GestionInventario>
  );
}