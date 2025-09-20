# Ecommerce MARSER PERÚ SAC

Sistema de gestión integral para productos de abarrotes con control de inventario, ventas y administración de usuarios.

## 📁 Estructura del Proyecto

```
ecommerce-abarrotes/
├── frontend/                 # Aplicación React (interfaz de usuario)
│   ├── src/
│   │   ├── components/       # Componentes reutilizables (aún no utilizados)
│   │   ├── pages/           # Páginas principales
│   │   │   ├── auth/        # Página de login
│   │   │   └── dashboard/   # Panel principal
│   │   ├── hooks/           # Custom hooks (para futuro uso)
│   │   └── utils/           # Utilidades (para futuro uso)
│   ├── public/              # Archivos estáticos
│   └── package.json         # Dependencias del frontend
├── backend/                 # API servidor Node.js
│   ├── src/
│   │   ├── routes/          # Rutas de la API
│   │   │   └── auth.js      # Autenticación y gestión de usuarios
│   │   ├── controllers/     # Controladores (para futuro uso)
│   │   ├── models/          # Modelos de base de datos
│   │   ├── middleware/      # Middlewares (para futuro uso)
│   │   ├── config/          # Configuración de base de datos
│   │   └── app.js          # Servidor principal
│   ├── migrations/          # Migraciones de base de datos
│   ├── seeders/            # Datos de prueba
│   └── package.json        # Dependencias del backend
├── database/               # Scripts SQL (para futuro uso)
└── docs/                  # Documentación (para futuro uso)
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces de usuario
- **Vite** - Herramienta de desarrollo rápida
- **Tailwind CSS** - Framework de estilos
- **React Router** - Navegación entre páginas
- **Lucide React** - Iconos
- **React Hot Toast** - Notificaciones

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework para APIs
- **Sequelize** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **CORS, Helmet, Morgan** - Middlewares de seguridad

## 📋 Requisitos del Sistema

- **Node.js** versión 18 o superior
- **PostgreSQL** versión 12 o superior
- **npm** (incluido con Node.js)

## 🚀 Instalación Paso a Paso

### 1. Instalar PostgreSQL

1. Descargar desde: https://www.postgresql.org/download/
2. Instalar con configuración por defecto
3. **IMPORTANTE**: Anotar la contraseña del usuario `postgres`

### 2. Configurar Base de Datos

```sql
-- Conectarse a PostgreSQL
psql -U postgres

-- Crear la base de datos
CREATE DATABASE ecommerce_abarrotes;

-- Conectarse a la base de datos
\c ecommerce_abarrotes

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('admin', 'jefe_almacen', 'almacenero', 'ejecutivo_ventas')),
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios de demostración
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Administrador', 'admin@empresa.com', 'admin123', 'admin'),
('Jefe de Almacén', 'almacen@empresa.com', 'almacen123', 'jefe_almacen'),
('Almacenero', 'almacenero@empresa.com', 'almacenero123', 'almacenero'),
('Ejecutivo de Ventas', 'ventas@empresa.com', 'ventas123', 'ejecutivo_ventas');

-- Salir
\q
```

### 3. Configurar Backend

```bash
# Navegar al backend
cd backend

# Instalar dependencias
npm install

# Configurar base de datos
# Editar config/config.json y cambiar la contraseña por la tuya:
{
  "development": {
    "username": "postgres",
    "password": "TU_CONTRASEÑA_AQUI",
    "database": "ecommerce_abarrotes",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  }
}

# También editar src/routes/auth.js línea 8:
# Cambiar 'admin123' por tu contraseña real

# Ejecutar servidor
npm run dev
```

### 4. Configurar Frontend

```bash
# Abrir nueva terminal y navegar al frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar aplicación
npm run dev
```

## 🎯 Uso del Sistema

### Acceso al Sistema
- **URL**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Usuarios de Prueba
| Rol | Email | Contraseña | Permisos |
|-----|-------|------------|----------|
| Admin | admin@empresa.com | admin123 | Gestión completa de usuarios |
| Jefe Almacén | almacen@empresa.com | almacen123 | Dashboard estándar |
| Almacenero | almacenero@empresa.com | almacenero123 | Dashboard estándar |
| Ejecutivo Ventas | ventas@empresa.com | ventas123 | Dashboard estándar |

### Funcionalidades Actuales
- ✅ Sistema de autenticación
- ✅ Dashboard dinámico según rol
- ✅ Gestión de usuarios (solo admin)
- ✅ Interfaz responsive y moderna

### Funcionalidades Pendientes
- ⏳ Gestión de productos e inventario
- ⏳ Sistema de ventas y pedidos
- ⏳ Gestión de clientes
- ⏳ Reportes y análisis
- ⏳ Sistema de roles más granular

## 🔧 Comandos Útiles

### Backend
```bash
npm run dev          # Ejecutar en modo desarrollo
npm start           # Ejecutar en producción
npm install         # Instalar dependencias
```

### Frontend
```bash
npm run dev         # Ejecutar en modo desarrollo
npm run build       # Construir para producción
npm install         # Instalar dependencias
```

### Base de Datos
```bash
psql -U postgres                    # Conectarse a PostgreSQL
\c ecommerce_abarrotes             # Conectarse a la base de datos
\dt                                # Listar tablas
SELECT * FROM usuarios;            # Ver usuarios
```

## 🐛 Solución de Problemas Comunes

### Error de conexión a base de datos
- Verificar que PostgreSQL esté ejecutándose
- Confirmar credenciales en `config/config.json`
- Verificar que la base de datos existe

### Error de CORS
- Verificar que ambos servidores estén ejecutándose
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Error de dependencias
```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

## 📝 Notas Importantes

1. **Contraseñas**: Actualmente se almacenan en texto plano. En producción implementar bcrypt
2. **Autenticación**: No hay JWT tokens aún, usar localStorage temporal
3. **Carpetas vacías**: Existen para expansión futura del proyecto
4. **Puerto**: Backend usa puerto 5000, Frontend puerto 5173

## 🔮 Próximos Pasos de Desarrollo

1. Implementar JWT para autenticación segura
2. Crear gestión completa de productos
3. Desarrollar sistema de inventario
4. Implementar proceso de ventas
5. Agregar reportes y analytics
6. Optimizar para producción

## 📞 Soporte

Para dudas sobre el código o implementación, revisar:
- Logs del servidor backend
- Consola del navegador para errores frontend
- Logs de PostgreSQL para problemas de base de datos