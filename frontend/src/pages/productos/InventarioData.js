export const productosIniciales = [
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

export const movimientosIniciales = [
  { id: 1, tipo: 'Entrada', producto: 'Guantes de Trabajo', categoria: 'Consumibles', cantidad: -1, fecha: '2024-10-28', usuario: 'Admin Usuario', motivo: 'Venta al cliente final' },
  { id: 2, tipo: 'Ingreso', producto: 'Cemento Portland Tipo I', categoria: 'Materiales', cantidad: 100, fecha: '2024-10-27', usuario: 'Admin Usuario', motivo: 'Compra al proveedor' },
  { id: 3, tipo: 'Salida', producto: 'Cable Eléctrico 3.5mm', categoria: 'Materiales', cantidad: -7, fecha: '2024-10-26', usuario: 'Admin Usuario', motivo: 'Venta al cliente final' },
  { id: 4, tipo: 'Ingreso', producto: 'Tablet Eléctrico Industrial', categoria: 'Electrónica', cantidad: 15, fecha: '2024-10-25', usuario: 'Admin Usuario', motivo: 'Compra al proveedor' },
  { id: 5, tipo: 'Salida', producto: 'Casco de Seguridad', categoria: 'Accesorios', cantidad: -20, fecha: '2024-10-24', usuario: 'Admin Usuario', motivo: 'Venta mayorista' },
  { id: 6, tipo: 'Ajuste', producto: 'Multímetro Digital', categoria: 'Electrónica', cantidad: 5, fecha: '2024-10-23', usuario: 'Admin Usuario', motivo: 'Corrección de inventario' },
];

export const categoriasInventario = [
  { nombre: 'Herramientas', productos: 3, stockTotal: 80, valorTotal: 1793.40 },
  { nombre: 'Consumibles', productos: 3, stockTotal: 238, valorTotal: 2546.90 },
  { nombre: 'Electrónica', productos: 3, stockTotal: 82, valorTotal: 39349.90 },
  { nombre: 'Equipos', productos: 3, stockTotal: 122, valorTotal: 6436.86 },
  { nombre: 'Accesorios', productos: 3, stockTotal: 192, valorTotal: 5480.80 },
  { nombre: 'Especializado', productos: 3, stockTotal: 238, valorTotal: 7246.90 },
];

export const categorias = ['Electrónica', 'Materiales', 'Equipos', 'Accesorios', 'Consumibles', 'Herramientas'];