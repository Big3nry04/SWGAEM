const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de seguridad y utilidad
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Importar rutas
const authRoutes = require('./routes/auth');
const proveedoresRoutes = require('./routes/proveedores'); // ← NUEVA LÍNEA

// Registrar rutas
app.use('/api/auth', authRoutes);
app.use('/api/proveedores', proveedoresRoutes); // ← NUEVA LÍNEA

// Ruta principal
app.get('/', (req, res) => {
  res.json({
     message: '🚀 API Ecommerce Abarrotes funcionando correctamente!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de salud del servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor funcionando',
    timestamp: new Date().toISOString()
  });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📱 Modo: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Prueba la API en: http://localhost:${PORT}/api/health`);
  console.log(`📦 Rutas disponibles:`);
  console.log(`   - http://localhost:${PORT}/api/auth`);
  console.log(`   - http://localhost:${PORT}/api/proveedores`); // ← NUEVA LÍNEA
});

module.exports = app;