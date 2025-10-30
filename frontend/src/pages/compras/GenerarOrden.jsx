import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    productos: [{ id: 1, descripcion: "", cantidad: "", precio: "", unidad: "unidad" }],
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
    "Logística"
  ];

  const unidades = [
    "unidad",
    "kg",
    "lb",
    "litro",
    "galón",
    "metro",
    "caja",
    "paquete"
  ];

  const terminosPagoOptions = [
    "Contado",
    "15 días",
    "30 días",
    "60 días",
    "90 días",
    "Crédito comercial"
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
    const nuevoId = Math.max(...formData.productos.map(p => p.id)) + 1;
    setFormData({
      ...formData,
      productos: [
        ...formData.productos, 
        { id: nuevoId, descripcion: "", cantidad: "", precio: "", unidad: "unidad" }
      ],
    });
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = formData.productos.filter(producto => producto.id !== id);
    setFormData({ ...formData, productos: nuevosProductos });
  };

  const calcularSubtotal = (producto) => {
    return (parseFloat(producto.cantidad) || 0) * (parseFloat(producto.precio) || 0);
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
      numeroOrden: `OC-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      fechaGeneracion: new Date().toISOString().split('T')[0]
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
      productos: [{ id: 1, descripcion: "", cantidad: "", precio: "", unidad: "unidad" }],
    });
  };

  const getColorPrioridad = (prioridad) => {
    const colores = {
      baja: "bg-green-100 text-green-800",
      media: "bg-yellow-100 text-yellow-800",
      alta: "bg-orange-100 text-orange-800",
      urgente: "bg-red-100 text-red-800"
    };
    return colores[prioridad] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Generar Orden de Compra
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Complete el formulario para generar una nueva orden de compra
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <Card className="shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-2xl font-bold">
                  Nueva Orden de Compra
                </CardTitle>
                <Badge className={`mt-2 sm:mt-0 ${getColorPrioridad(formData.prioridad)}`}>
                  Prioridad: {formData.prioridad.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Información General */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Información General
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Proveedor *
                        </label>
                        <Input 
                          name="proveedor" 
                          value={formData.proveedor} 
                          onChange={(e) => handleChange("proveedor", e.target.value)} 
                          placeholder="Nombre del proveedor"
                          required 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contacto del Proveedor
                        </label>
                        <Input 
                          name="contactoProveedor" 
                          value={formData.contactoProveedor} 
                          onChange={(e) => handleChange("contactoProveedor", e.target.value)} 
                          placeholder="Teléfono o email de contacto"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Solicitante *
                        </label>
                        <Input 
                          name="solicitante" 
                          value={formData.solicitante} 
                          onChange={(e) => handleChange("solicitante", e.target.value)} 
                          placeholder="Nombre del solicitante"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Departamento
                        </label>
                        <Select value={formData.departamento} onValueChange={(value) => handleChange("departamento", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            {departamentos.map(depto => (
                              <SelectItem key={depto} value={depto}>{depto}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Centro de Costo
                        </label>
                        <Input 
                          name="centroCosto" 
                          value={formData.centroCosto} 
                          onChange={(e) => handleChange("centroCosto", e.target.value)} 
                          placeholder="Código de centro de costo"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prioridad
                        </label>
                        <Select value={formData.prioridad} onValueChange={(value) => handleChange("prioridad", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="baja">Baja</SelectItem>
                            <SelectItem value="media">Media</SelectItem>
                            <SelectItem value="alta">Alta</SelectItem>
                            <SelectItem value="urgente">Urgente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalles de Entrega y Pago */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Detalles de Entrega y Pago
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de Entrega *
                        </label>
                        <Input 
                          type="date" 
                          name="fechaEntrega" 
                          value={formData.fechaEntrega} 
                          onChange={(e) => handleChange("fechaEntrega", e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Términos de Pago
                        </label>
                        <Select value={formData.terminosPago} onValueChange={(value) => handleChange("terminosPago", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar términos" />
                          </SelectTrigger>
                          <SelectContent>
                            {terminosPagoOptions.map(termino => (
                              <SelectItem key={termino} value={termino}>{termino}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección de Entrega
                        </label>
                        <Input 
                          name="direccionEntrega" 
                          value={formData.direccionEntrega} 
                          onChange={(e) => handleChange("direccionEntrega", e.target.value)} 
                          placeholder="Dirección completa de entrega"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notas Adicionales
                        </label>
                        <Textarea 
                          name="notas" 
                          value={formData.notas} 
                          onChange={(e) => handleChange("notas", e.target.value)} 
                          placeholder="Instrucciones especiales o observaciones..."
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección Productos */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Productos y Servicios
                    </h3>
                    <Badge variant="secondary">
                      {formData.productos.length} items
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.productos.map((producto, index) => (
                      <div
                        key={producto.id}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="lg:col-span-5">
                          <Input
                            placeholder="Descripción del producto o servicio"
                            value={producto.descripcion}
                            onChange={(e) => handleProductoChange(index, "descripcion", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="lg:col-span-2">
                          <Input
                            type="number"
                            placeholder="Cantidad"
                            value={producto.cantidad}
                            onChange={(e) => handleProductoChange(index, "cantidad", e.target.value)}
                            min="1"
                            className="w-full"
                          />
                        </div>
                        
                        <div className="lg:col-span-2">
                          <Select 
                            value={producto.unidad} 
                            onValueChange={(value) => handleProductoChange(index, "unidad", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {unidades.map(unidad => (
                                <SelectItem key={unidad} value={unidad}>{unidad}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="lg:col-span-2">
                          <Input
                            type="number"
                            placeholder="Precio unitario"
                            value={producto.precio}
                            onChange={(e) => handleProductoChange(index, "precio", e.target.value)}
                            step="0.01"
                            min="0"
                            className="w-full"
                          />
                        </div>
                        
                        <div className="lg:col-span-1 flex items-center justify-between">
                          <span className="font-semibold text-gray-700 text-sm">
                            S/ {calcularSubtotal(producto).toFixed(2)}
                          </span>
                          {formData.productos.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => eliminarProducto(producto.id)}
                              className="ml-2"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    type="button" 
                    onClick={agregarProducto} 
                    variant="outline"
                    className="w-full"
                  >
                    + Agregar Producto
                  </Button>
                </div>

                {/* Resumen y Total */}
                <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="text-2xl font-bold text-gray-800">
                        S/ {calcularTotal().toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-600">IGV (18%)</p>
                      <p className="text-xl font-semibold text-gray-700">
                        S/ {calcularIGV().toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-600">Total</p>
                      <p className="text-3xl font-bold text-blue-600">
                        S/ {calcularTotalConIGV().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
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
                        productos: [{ id: 1, descripcion: "", cantidad: "", precio: "", unidad: "unidad" }],
                      });
                    }}
                    className="min-w-[200px]"
                  >
                    Limpiar Formulario
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 min-w-[200px]"
                    disabled={!formData.proveedor || !formData.solicitante || !formData.fechaEntrega}
                  >
                    Generar Orden de Compra
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Modal de Confirmación */}
        {mostrarConfirmacion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle className="text-center">Confirmar Orden de Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    ¿Está seguro de generar esta orden de compra?
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                    <p><strong>Proveedor:</strong> {formData.proveedor}</p>
                    <p><strong>Total:</strong> S/ {calcularTotalConIGV().toFixed(2)}</p>
                    <p><strong>Productos:</strong> {formData.productos.length} items</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setMostrarConfirmacion(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleConfirmar}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Confirmar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerarOrdenCompra;