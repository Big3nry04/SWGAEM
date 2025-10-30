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
      'admin': 'bg-red-100 text-red-800',
      'jefe_almacen': 'bg-blue-100 text-blue-800',
      'almacenero': 'bg-green-100 text-green-800',
      'ejecutivo_ventas': 'bg-purple-100 text-purple-800'
    };
    return colors[rol] || 'bg-gray-100 text-gray-800';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">MARSER PERÚ SAC</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{usuario?.nombre}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getRolColor(usuario?.rol)}`}>
                  {getRolDisplay(usuario?.rol)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Bienvenido, {usuario?.nombre}!
            </h2>
            <p className="text-lg text-gray-600">
              {usuario?.rol === 'admin' 
                ? 'Panel de administración del sistema' 
                : 'Sistema de gestión para abarrotes'
              }
            </p>
          </div>

          {/* Vista para Admin: Gestión de Usuarios */}
          {usuario?.rol === 'admin' ? (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Gestión de Usuarios
                    </h3>
                    <button 
                      onClick={handleOpenCreateModal}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Nuevo Usuario
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rol
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {usuarios.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${getRolColor(user.rol)}`}>
                              {getRolDisplay(user.rol)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.activo 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditUsuario(user)}
                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                title="Editar usuario"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {user.id !== usuario?.id && (
                                <button 
                                  onClick={() => handleDeleteUsuario(user)}
                                  className="text-red-600 hover:text-red-900 transition-colors"
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

              {/* Tarjetas de acceso rápido para Admin */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div 
                  onClick={() => navigate('/productos')}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Productos
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Gestionar Inventario
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => navigate('/proveedores')}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Building2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Proveedores
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Gestionar Proveedores
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => navigate('/venta')}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ShoppingCart className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Ventas
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Gestionar Pedidos
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => navigate('/reportes')}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BarChart3 className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Reportes
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Análisis de Datos
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Vista para otros roles: Dashboard normal */
            <div className="space-y-6">
              {/* Tarjetas de funcionalidades */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => navigate('/productos')}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Productos
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Gestionar Inventario
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tarjeta de Proveedores - Solo para admin y jefe_almacen */}
                {(usuario?.rol === 'admin' || usuario?.rol === 'jefe_almacen') && (
                  <div 
                    onClick={() => navigate('/proveedores')}
                    className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Building2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Proveedores
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              Gestionar Proveedores
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div 
                  onClick={() => navigate('/venta')}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ShoppingCart className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Ventas
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Gestionar Pedidos
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => navigate('/clientes')}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Clientes
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Base de Datos
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => navigate('/reportes')}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BarChart3 className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Reportes
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Análisis de Datos
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del rol actual */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-blue-900 mb-2">
                      Panel de {getRolDisplay(usuario?.rol)}
                    </h3>
                    <p className="text-blue-700">
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