import React, { useState } from 'react';
import { Calendar, User, ShoppingCart, FileText, Save, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NuevaVenta() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    cliente: '',
    documento: '',
    correo: '',
    telefono: '',
    fecha: new Date().toISOString().split('T')[0],
    vendedor: '',
    observaciones: ''
  });

  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);

  // Productos disponibles (simulación)
  const productosDisponibles = [
    { id: 'A', nombre: 'Producto A', precio: 25.50, stock: 100 },
    { id: 'B', nombre: 'Producto B', precio: 45.00, stock: 50 },
    { id: 'C', nombre: 'Producto C', precio: 15.75, stock: 200 },
    { id: 'D', nombre: 'Producto D', precio: 80.00, stock: 30 },
    { id: 'E', nombre: 'Producto E', precio: 120.00, stock: 15 },
  ];

  const handleAgregarProducto = () => {
    if (!productoSeleccionado) {
      alert('Seleccione un producto');
      return;
    }

    const producto = productosDisponibles.find(p => p.id === productoSeleccionado);
    if (!producto) return;

    if (cantidad > producto.stock) {
      alert(`Stock insuficiente. Disponible: ${producto.stock}`);
      return;
    }

    const productoExistente = productos.find(p => p.id === producto.id);

    if (productoExistente) {
      setProductos(productos.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + cantidad, subtotal: (p.cantidad + cantidad) * p.precio }
          : p
      ));
    } else {
      setProductos([...productos, {
        ...producto,
        cantidad,
        subtotal: producto.precio * cantidad
      }]);
    }

    setProductoSeleccionado('');
    setCantidad(1);
  };

  const handleEliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const calcularTotal = () => {
    return productos.reduce((sum, p) => sum + p.subtotal, 0);
  };

  const handleRegistrarVenta = () => {
    if (!formData.cliente || !formData.documento || !formData.fecha || !formData.vendedor) {
      alert('Por favor completa todos los campos obligatorios del cliente');
      return;
    }

    if (productos.length === 0) {
      alert('Debe agregar al menos un producto a la venta');
      return;
    }

    const nuevaVenta = {
      id: `VNT-${Date.now()}`,
      ...formData,
      productos,
      total: calcularTotal(),
      estado: "Completada",
      fechaRegistro: new Date().toISOString()
    };

    // Guardar en localStorage
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
    ventasGuardadas.push(nuevaVenta);
    localStorage.setItem("ventas", JSON.stringify(ventasGuardadas));

    alert("¡Venta registrada exitosamente!");
    navigate("/ventas");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Registrar Nueva Venta</h2>
        <p className="text-gray-600 text-sm mt-1">
          Complete los datos del cliente y agregue los productos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">

          {/* Información del Cliente */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Información del Cliente</h3>
                <p className="text-sm text-gray-600">Datos del cliente para la venta</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre / Razón Social <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  placeholder="Empresa ABC S.A.C."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI / RUC <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.documento}
                  onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                  placeholder="20123456789"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  placeholder="cliente@empresa.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="999 123 456"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Información de la Venta */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Información de la Venta</h3>
                <p className="text-sm text-gray-600">Detalles de la transacción</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Venta <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendedor Responsable <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.vendedor}
                  onChange={(e) => setFormData({ ...formData, vendedor: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar vendedor</option>
                  <option value="Juan Perez">Juan Perez</option>
                  <option value="Maria Garcia">Maria Garcia</option>
                  <option value="Carlos Lopez">Carlos Lopez</option>
                  <option value="Ana Rodriguez">Ana Rodriguez</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones
                </label>
                <textarea
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  rows={4}
                  placeholder="Notas adicionales sobre la venta..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg resize-none"
                />
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Productos</h3>
                <p className="text-sm text-gray-600">Agregue productos a la venta</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Producto
                </label>
                <select
                  value={productoSeleccionado}
                  onChange={(e) => setProductoSeleccionado(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccionar producto</option>
                  {productosDisponibles.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}: S/{p.precio.toFixed(2)} ({p.stock} stock)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                  className="w-20 px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                />

                <button
                  onClick={handleAgregarProducto}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </button>
              </div>
            </div>

            {productos.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Producto</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Precio</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Cantidad</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Subtotal</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {productos.map(producto => (
                      <tr key={producto.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{producto.nombre}</td>
                        <td className="px-4 py-3">S/ {producto.precio.toFixed(2)}</td>
                        <td className="px-4 py-3">{producto.cantidad}</td>
                        <td className="px-4 py-3 font-bold">S/ {producto.subtotal.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleEliminarProducto(producto.id)}
                            className="p-2 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border">
                <ShoppingCart className="mx-auto text-gray-300 mb-3 w-10 h-10" />
                <p className="text-gray-500 text-sm">No hay productos agregados</p>
              </div>
            )}
          </div>
        </div>

        {/*Resumen*/}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Resumen de Venta</h3>
          </div>

          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Productos:</span>
              <span className="font-medium">{productos.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cantidad total:</span>
              <span className="font-medium">
                {productos.reduce((sum, p) => sum + p.cantidad, 0)}
              </span>
            </div>
          </div>

          <p className="text-2xl font-bold mb-6">
            Total: <span className="text-blue-600">S/ {calcularTotal().toFixed(2)}</span>
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRegistrarVenta}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Registrar Venta
            </button>

            <button
              onClick={() => navigate("/ventas")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg border"
            >
              Cancelar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}