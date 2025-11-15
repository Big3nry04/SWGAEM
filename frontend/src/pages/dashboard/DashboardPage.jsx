import { useState, useEffect } from 'react';
import { LogOut, Package, ShoppingCart, Users, BarChart3, UserPlus, Edit, Trash2, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModalUsuario from '../../components/modals/usuario/ModalUsuario';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalUsuario, setShowModalUsuario] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);

  // Obtener datos del usuario desde localStorage
  useEffect(() => {
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      setUsuario(JSON.parse(usuarioData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Cargar usuarios si es admin
  useEffect(() => {
    if (usuario && usuario.rol === 'admin') {
      fetchUsuarios();
    } else {
      setIsLoading(false);
    }
  }, [usuario]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/usuarios');
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data.usuarios || []);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      toast.error('Error al cargar usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  const getRolDisplay = (rol) => {
    const roles = {
      'admin': 'Administrador',
      'jefe_almacen': 'Jefe de Almacén',
      'almacenero': 'Almacenero',
      'ejecutivo_ventas': 'Ejecutivo de Ventas'
    };
    return roles[rol] || rol;
  };

  const getRolColor = (rol) => {
    const colors = {
      'admin': 'bg-blue-50 text-blue-700 border border-blue-200',
      'jefe_almacen': 'bg-blue-50 text-blue-600 border border-blue-100',
      'almacenero': 'bg-slate-50 text-slate-700 border border-slate-200',
      'ejecutivo_ventas': 'bg-indigo-50 text-indigo-700 border border-indigo-200'
    };
    return colors[rol] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  // Funciones para manejar el modal de usuario
  const handleOpenCreateModal = () => {
    setEditingUsuario(null);
    setShowModalUsuario(true);
  };

  const handleEditUsuario = (usuarioToEdit) => {
    setEditingUsuario(usuarioToEdit);
    setShowModalUsuario(true);
  };

  const handleCloseModalUsuario = () => {
    setShowModalUsuario(false);
    setEditingUsuario(null);
  };

  const handleModalUsuarioSuccess = () => {
    fetchUsuarios(); // Recargar la lista después de crear/editar
  };

  const handleDeleteUsuario = async (usuarioToDelete) => {
    if (usuarioToDelete.id === usuario?.id) {
      toast.error('No puedes eliminar tu propio usuario');
      return;
    }

    if (window.confirm(`¿Estás seguro de que deseas desactivar al usuario "${usuarioToDelete.nombre}"?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/usuarios/${usuarioToDelete.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Usuario desactivado correctamente');
          fetchUsuarios();
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Error al desactivar usuario');
        }
      } catch (error) {
        console.error('Error al desactivar usuario:', error);
        toast.error('Error al conectar con el servidor');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Header Moderno */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MARSER PERÚ SAC</h1>
                <p className="text-xs text-gray-500">Sistema de Gestión</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-900">{usuario?.nombre}</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getRolColor(usuario?.rol)}`}>
                  {getRolDisplay(usuario?.rol)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="relative flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-300 group overflow-hidden shadow-sm hover:shadow-lg hover:shadow-red-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <LogOut className="w-5 h-5 relative z-10 group-hover:-rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline font-medium relative z-10">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Panel de Control
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              ¡Bienvenido, <span className="text-blue-600">{usuario?.nombre}</span>!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {usuario?.rol === 'admin' 
                ? 'Gestiona usuarios y controla todo el sistema desde aquí' 
                : 'Accede a todas las herramientas del sistema de gestión'
              }
            </p>
          </div>

          {/* Vista para Admin: Gestión de Usuarios */}
          {usuario?.rol === 'admin' ? (
            <div className="space-y-8">
              {/* Tarjetas de acceso rápido */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { icon: Package, title: 'Productos', desc: 'Inventario', color: 'blue', path: '/productos' },
                  { icon: ShoppingCart, title: 'Compras', desc: 'Órdenes', color: 'amber', path: '/compras' },
                  { icon: Building2, title: 'Proveedores', desc: 'Gestión', color: 'purple', path: '/proveedores' },
                  { icon: ShoppingCart, title: 'Ventas', desc: 'Pedidos', color: 'green', path: '/ventas' },
                  { icon: BarChart3, title: 'Análisis', desc: 'Reportes', color: 'orange', path: '/reportes' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  const colorClasses = {
                    blue: { gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', shadow: 'shadow-blue-500/30' },
                    amber: { gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', shadow: 'shadow-amber-500/30' },
                    purple: { gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', shadow: 'shadow-purple-500/30' },
                    green: { gradient: 'from-green-500 to-green-600', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', shadow: 'shadow-green-500/30' },
                    orange: { gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', shadow: 'shadow-orange-500/30' }
                  };
                  
                  const colors = colorClasses[item.color];
                  
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(item.path)}
                      className={`group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 hover:-translate-y-2 overflow-hidden`}
                    >
                      {/* Efecto de fondo en hover */}
                      <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      
                      {/* Contenido */}
                      <div className="relative z-10">
                        <div className={`w-11 h-11 bg-gradient-to-br ${colors.gradient} rounded-lg flex items-center justify-center mb-3 shadow-md ${colors.shadow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className={`font-bold text-gray-900 mb-0.5 group-hover:${colors.text} transition-colors text-sm`}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">{item.desc}</p>
                      </div>
                      
                      {/* Indicador de acción */}
                      <div className={`absolute bottom-2 right-2 w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}>
                        <span className={`text-xs ${colors.text}`}>→</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tabla de Usuarios */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-blue-50/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Gestión de Usuarios</h3>
                        <p className="text-sm text-gray-500">{usuarios.length} usuarios registrados</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleOpenCreateModal}
                      className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 group overflow-hidden hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <UserPlus className="w-4 h-4 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium relative z-10">Nuevo Usuario</span>
                      <div className="absolute -right-2 -top-2 w-8 h-8 bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></div>
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Rol
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {usuarios.map((user) => (
                        <tr key={user.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-md">
                                {user.nombre.charAt(0)}
                              </div>
                              <div className="text-sm font-semibold text-gray-900">{user.nombre}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${getRolColor(user.rol)}`}>
                              {getRolDisplay(user.rol)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                              user.activo 
                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                              {user.activo ? '● Activo' : '○ Inactivo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditUsuario(user)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Editar usuario"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {user.id !== usuario?.id && (
                                <button 
                                  onClick={() => handleDeleteUsuario(user)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                  title="Desactivar usuario"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Vista para otros roles */
            <div className="space-y-8">
              {/* Tarjetas de funcionalidades */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => navigate('/productos')}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                    Productos
                  </h3>
                  <p className="text-sm text-gray-500">Gestionar Inventario</p>
                </div>

                {/* Tarjeta de Proveedores - Solo para admin y jefe_almacen */}
                {(usuario?.rol === 'admin' || usuario?.rol === 'jefe_almacen') && (
                  <div 
                    onClick={() => navigate('/proveedores')}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                      Proveedores
                    </h3>
                    <p className="text-sm text-gray-500">Gestionar Proveedores</p>
                  </div>
                )}

                <div 
                  onClick={() => navigate('/ventas')}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ShoppingCart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                    Ventas
                  </h3>
                  <p className="text-sm text-gray-500">Gestionar Pedidos</p>
                </div>

                <div 
                  onClick={() => navigate('/clientes')}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                    Clientes
                  </h3>
                  <p className="text-sm text-gray-500">Base de Datos</p>
                </div>

                <div 
                  onClick={() => navigate('/reportes')}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                    Reportes
                  </h3>
                  <p className="text-sm text-gray-500">Análisis de Datos</p>
                </div>
              </div>

              {/* Información del rol */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mr-5">
                    <Package className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Panel de {getRolDisplay(usuario?.rol)}
                    </h3>
                    <p className="text-gray-600">
                      {usuario?.rol === 'jefe_almacen' && 'Gestiona el inventario, proveedores y control de stock.'}
                      {usuario?.rol === 'almacenero' && 'Registra entradas y salidas de productos del almacén.'}
                      {usuario?.rol === 'ejecutivo_ventas' && 'Gestiona clientes, pedidos y proceso de ventas.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal para crear/editar usuario */}
      <ModalUsuario
        isOpen={showModalUsuario}
        onClose={handleCloseModalUsuario}
        onSuccess={handleModalUsuarioSuccess}
        usuario={editingUsuario}
      />
    </div>
  );
};

export default DashboardPage;