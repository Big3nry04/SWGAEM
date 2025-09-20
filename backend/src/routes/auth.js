const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const router = express.Router();

// Configuración de la base de datos
const sequelize = new Sequelize('ecommerce_abarrotes', 'postgres', 'canchano04', {
  host: 'localhost',
  dialect: 'postgres'
});

// Definir el modelo Usuario
const Usuario = sequelize.define('Usuario', {
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  rol: DataTypes.STRING,
  activo: DataTypes.BOOLEAN
}, {
  tableName: 'usuarios',
  timestamps: false
});

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    const usuario = await Usuario.findOne({
      where: { email: email, activo: true }
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar contraseña (por ahora sin encriptar)
    if (usuario.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    // Login exitoso
    res.json({
      success: true,
      message: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Ruta para obtener todos los usuarios (solo para admin)
router.get('/usuarios', async (req, res) => {
  try {
    // Obtener todos los usuarios
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'activo'], // Excluir password
      order: [['id', 'ASC']]
    });

    res.json({
      success: true,
      usuarios: usuarios
    });

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Ruta para crear un nuevo usuario (solo para admin)
router.post('/usuarios', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { email: email }
    });

    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password,
      rol,
      activo: true
    });

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        activo: nuevoUsuario.activo
      }
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Ruta para actualizar un usuario (solo para admin)
router.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol, activo } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Actualizar usuario
    await usuario.update({
      nombre,
      email,
      rol,
      activo
    });

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        activo: usuario.activo
      }
    });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Ruta para eliminar un usuario (solo para admin)
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Desactivar usuario en lugar de eliminarlo
    await usuario.update({ activo: false });

    res.json({
      success: true,
      message: 'Usuario desactivado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;