import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Building2, UserPlus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModalProveedor from '../../components/modals/proveedor/ModalProveedor'; // Ajusta la ruta según tu estructura

const ProveedoresPage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState(null);

  // Verificar autenticación
  useEffect(() => {
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      const user = JSON.parse(usuarioData);
      setUsuario(user);
      // Verificar permisos (admin o jefe_almacen pueden gestionar proveedores)
      if (user.rol !== 'admin' && user.rol !== 'jefe_almacen') {
        toast.error('No tienes permisos para acceder a esta página');
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Cargar proveedores
  useEffect(() => {
    if (usuario) {
      fetchProveedores();
    }
  }, [usuario]);

  const fetchProveedores = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/proveedores');
      if (response.ok) {
        const data = await response.json();
        setProveedores(data.proveedores || []);
      } else {
        toast.error('Error al cargar proveedores');
      }
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
      toast.error('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (proveedor) => {
    setEditingProveedor(proveedor);
    setShowModal(true);
  };

  const handleDelete = async (proveedor) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al proveedor "${proveedor.razon_social}"?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/proveedores/${proveedor.id_proveedor}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Proveedor eliminado correctamente');
          fetchProveedores();
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Error al eliminar proveedor');
        }
      } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        toast.error('Error al conectar con el servidor');
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingProveedor(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProveedor(null);
  };

  const handleModalSuccess = () => {
    fetchProveedores(); // Recargar la lista después de crear/editar
  };

  // Filtrar proveedores según búsqueda
  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.razon_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.ruc.includes(searchTerm) ||
    (proveedor.email && proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proveedores...</p>
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
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Volver
              </button>
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Gestión de Proveedores</h1>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">{usuario?.nombre}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Barra de acciones */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por razón social, RUC o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleOpenCreateModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Nuevo Proveedor
            </button>
          </div>

          {/* Tabla de proveedores */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Lista de Proveedores ({filteredProveedores.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              {filteredProveedores.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay proveedores</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? 'No se encontraron proveedores que coincidan con tu búsqueda.' : 'Comienza creando tu primer proveedor.'}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={handleOpenCreateModal}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 inline-flex items-center"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Crear Primer Proveedor
                    </button>
                  )}
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Razón Social
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RUC
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teléfono
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dirección
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProveedores.map((proveedor) => (
                      <tr key={proveedor.id_proveedor} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{proveedor.razon_social}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{proveedor.ruc}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{proveedor.telefono || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{proveedor.email || '-'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate" title={proveedor.direccion}>
                            {proveedor.direccion || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(proveedor)}
                              className="text-blue-600 hover:text-blue-900 transition duration-200"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(proveedor)}
                              className="text-red-600 hover:text-red-900 transition duration-200"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal para crear/editar proveedor */}
      <ModalProveedor
        isOpen={showModal}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        proveedor={editingProveedor}
      />
    </div>
  );
};

export default ProveedoresPage;