import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, ShoppingCart, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NuevaVenta() {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [cliente, setCliente] = useState({
    nombre: "",
    documento: "",
    correo: "",
    telefono: "",
  });
  const [vendedor, setVendedor] = useState("");
  const [fecha, setFecha] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  // Lista de productos (local)
  const listaProductos = [
    { nombre: "Producto A", precio: 25.5, stock: 100 },
    { nombre: "Producto B", precio: 45.0, stock: 50 },
    { nombre: "Producto C", precio: 15.75, stock: 200 },
    { nombre: "Producto D", precio: 80.0, stock: 30 },
  ];

  // Calcular total automáticamente
  useEffect(() => {
    const totalCalculado = productos.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    setTotal(totalCalculado);
  }, [productos]);

  // Agregar producto
  const agregarProducto = () => {
    if (!productoSeleccionado) return alert("Selecciona un producto");
    const prod = listaProductos.find(p => p.nombre === productoSeleccionado);
    if (!prod) return;

    const existe = productos.find(p => p.nombre === prod.nombre);
    if (existe) {
      const actualizados = productos.map(p =>
        p.nombre === prod.nombre
          ? { ...p, cantidad: p.cantidad + cantidad }
          : p
      );
      setProductos(actualizados);
    } else {
      setProductos([...productos, { ...prod, cantidad }]);
    }
  };

  // Registrar venta (guardar en localStorage)
  const registrarVenta = () => {
    if (!cliente.nombre || !cliente.documento || !fecha || !vendedor)
      return alert("Completa los campos obligatorios (*)");

    if (productos.length === 0) return alert("Agrega al menos un producto");

    const nuevaVenta = {
      id: Date.now(),
      cliente,
      vendedor,
      fecha,
      observaciones,
      productos,
      total,
    };

    // Guardar en localStorage
    const historial = JSON.parse(localStorage.getItem("ventas")) || [];
    historial.push(nuevaVenta);
    localStorage.setItem("ventas", JSON.stringify(historial));

    alert("Venta registrada correctamente ✅");
    navigate("/venta");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b pb-3">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Marser Perú S.A.C.</h1>
          <p className="text-sm text-gray-500">Registrar nueva venta</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
            Administrador
          </span>
        </div>
      </header>

      {/* Botón volver */}
      <button
        onClick={() => navigate("/venta")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario principal */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-6">
          {/* Información del cliente */}
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <User className="text-blue-600" size={20} /> Información del Cliente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nombre / Razón Social *
                </label>
                <input
                  type="text"
                  placeholder="Empresa ABC S.A.C."
                  value={cliente.nombre}
                  onChange={e => setCliente({ ...cliente, nombre: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">DNI / RUC *</label>
                <input
                  type="text"
                  placeholder="20123456789"
                  value={cliente.documento}
                  onChange={e => setCliente({ ...cliente, documento: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="cliente@empresa.com"
                  value={cliente.correo}
                  onChange={e => setCliente({ ...cliente, correo: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
                <input
                  type="text"
                  placeholder="999 123 456"
                  value={cliente.telefono}
                  onChange={e => setCliente({ ...cliente, telefono: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Información de la venta */}
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <Calendar className="text-blue-600" size={20} /> Información de la Venta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Fecha de Venta *</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Vendedor Responsable *</label>
                <select
                  value={vendedor}
                  onChange={e => setVendedor(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Seleccionar vendedor</option>
                  <option>Juan Perez</option>
                  <option>Maria Garcia</option>
                  <option>Carlos Lopez</option>
                  <option>Ana Rodriguez</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Observaciones</label>
                <textarea
                  placeholder="Notas adicionales sobre la venta..."
                  value={observaciones}
                  onChange={e => setObservaciones(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Productos */}
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <ShoppingCart className="text-blue-600" size={20} /> Productos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Producto</label>
                <select
                  value={productoSeleccionado}
                  onChange={e => setProductoSeleccionado(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Seleccionar producto</option>
                  {listaProductos.map((p, i) => (
                    <option key={i} value={p.nombre}>
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
                  onChange={e => setCantidad(parseInt(e.target.value))}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                  onClick={agregarProducto}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Lista de productos agregados */}
            {productos.length > 0 && (
              <div className="mt-4 border-t pt-3">
                {productos.map((p, i) => (
                  <p key={i} className="text-gray-700 text-sm mb-1">
                    {p.nombre} x {p.cantidad} —{" "}
                    <span className="text-blue-600">
                      S/ {(p.precio * p.cantidad).toFixed(2)}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Resumen de venta */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} /> Resumen de Venta
          </h3>
          <div className="text-sm text-gray-600 space-y-2 mb-4">
            <p>
              Productos:{" "}
              <span className="font-medium text-gray-800">{productos.length}</span>
            </p>
            <p>
              Cantidad total:{" "}
              <span className="font-medium text-gray-800">
                {productos.reduce((acc, p) => acc + p.cantidad, 0)}
              </span>
            </p>
          </div>
          <div className="border-t pt-3 mb-4">
            <p className="text-xl font-bold text-gray-800">
              Total:{" "}
              <span className="text-blue-600">
                S/ {total.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={registrarVenta}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FileText size={18} /> Registrar Venta
            </button>
            <button
              onClick={() => navigate("/venta")}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

