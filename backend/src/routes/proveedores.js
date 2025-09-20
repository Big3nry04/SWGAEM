const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const router = express.Router();

// Configuración de la base de datos (igual que en auth.js)
const sequelize = new Sequelize('ecommerce_abarrotes', 'postgres', 'canchano04', {
  host: 'localhost',
  dialect: 'postgres'
});

// Definir el modelo Proveedor
const Proveedor = sequelize.define('Proveedor', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  razon_social: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  ruc: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: true
  }
}, {
  tableName: 'proveedor',
  timestamps: false
});

// GET /api/proveedores - Obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll({
      order: [['razon_social', 'ASC']]
    });

    res.json({
      success: true,
      proveedores: proveedores
    });

  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// GET /api/proveedores/:id - Obtener un proveedor por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const proveedor = await Proveedor.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }

    res.json({
      success: true,
      proveedor: proveedor
    });

  } catch (error) {
    console.error('Error al obtener proveedor:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// POST /api/proveedores - Crear un nuevo proveedor
router.post('/', async (req, res) => {
  try {
    const { razon_social, ruc, telefono, direccion, email } = req.body;

    // Validaciones
    if (!razon_social || !ruc) {
      return res.status(400).json({
        success: false,
        message: 'Razón social y RUC son obligatorios'
      });
    }

    // Validar formato de RUC
    if (!/^\d{11}$/.test(ruc)) {
      return res.status(400).json({
        success: false,
        message: 'El RUC debe tener exactamente 11 dígitos'
      });
    }

    // Validar email si se proporciona
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido'
      });
    }

    // Verificar si el RUC ya existe
    const proveedorExistente = await Proveedor.findOne({
      where: { ruc: ruc.trim() }
    });

    if (proveedorExistente) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un proveedor con este RUC'
      });
    }

    // Crear nuevo proveedor
    const nuevoProveedor = await Proveedor.create({
      razon_social,
      ruc,
      telefono: telefono || null,
      direccion: direccion || null,
      email: email || null
    });

    res.status(201).json({
      success: true,
      message: 'Proveedor creado correctamente',
      proveedor: nuevoProveedor
    });

  } catch (error) {
    console.error('Error al crear proveedor:', error);
    console.error('Error name:', error.name);
    console.error('Error code:', error.original?.code);
    
    // Error de clave duplicada en Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un proveedor con este RUC'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// PUT /api/proveedores/:id - Actualizar un proveedor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { razon_social, ruc, telefono, direccion, email } = req.body;

    // Validaciones
    if (!razon_social || !ruc) {
      return res.status(400).json({
        success: false,
        message: 'Razón social y RUC son obligatorios'
      });
    }

    // Validar formato de RUC
    if (!/^\d{11}$/.test(ruc)) {
      return res.status(400).json({
        success: false,
        message: 'El RUC debe tener exactamente 11 dígitos'
      });
    }

    // Validar email si se proporciona
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido'
      });
    }

    // Buscar el proveedor
    const proveedor = await Proveedor.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }

    // Verificar si el RUC ya existe en otro proveedor
    const proveedorConRuc = await Proveedor.findOne({
      where: { 
        ruc: ruc,
        id_proveedor: { [Sequelize.Op.ne]: id }
      }
    });

    if (proveedorConRuc) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe otro proveedor con este RUC'
      });
    }

    // Actualizar proveedor
    await proveedor.update({
      razon_social,
      ruc,
      telefono: telefono || null,
      direccion: direccion || null,
      email: email || null
    });

    res.json({
      success: true,
      message: 'Proveedor actualizado correctamente',
      proveedor: proveedor
    });

  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    
    // Error de clave duplicada en Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'Ya existe otro proveedor con este RUC'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// DELETE /api/proveedores/:id - Eliminar un proveedor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el proveedor
    const proveedor = await Proveedor.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }

    const razonSocial = proveedor.razon_social;

    // Eliminar proveedor
    await proveedor.destroy();

    res.json({
      success: true,
      message: `Proveedor "${razonSocial}" eliminado correctamente`
    });

  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;