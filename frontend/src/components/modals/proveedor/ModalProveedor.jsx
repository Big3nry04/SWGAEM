import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const ModalProveedor = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  proveedor = null // Si se pasa un proveedor, es para editar
}) => {
  const [formData, setFormData] = useState({
    razon_social: '',
    ruc: '',
    telefono: '',
    direccion: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Resetear formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      if (proveedor) {
        // Modo edición - llenar campos con datos existentes
        setFormData({
          razon_social: proveedor.razon_social || '',
          ruc: proveedor.ruc || '',
          telefono: proveedor.telefono || '',
          direccion: proveedor.direccion || '',
          email: proveedor.email || ''
        });
      } else {
        // Modo creación - campos vacíos
        setFormData({
          razon_social: '',
          ruc: '',
          telefono: '',
          direccion: '',
          email: ''
        });
      }
    }
  }, [isOpen, proveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Formatear RUC para que solo contenga números
    if (name === 'ruc') {
      const numericValue = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.razon_social.trim()) {
      toast.error('La razón social es obligatoria');
      return;
    }

    if (!formData.ruc.trim()) {
      toast.error('El RUC es obligatorio');
      return;
    }

    if (formData.ruc.length !== 11) {
      toast.error('El RUC debe tener exactamente 11 dígitos');
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('El formato del email no es válido');
      return;
    }

    setIsLoading(true);

    try {
      const url = proveedor 
        ? `http://localhost:5000/api/proveedores/${proveedor.id_proveedor}`
        : 'http://localhost:5000/api/proveedores';
      
      const method = proveedor ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || (proveedor ? 'Proveedor actualizado correctamente' : 'Proveedor creado correctamente'));
        onSuccess(); // Callback para actualizar la lista
        onClose(); // Cerrar modal
      } else {
        toast.error(data.message || 'Error al guardar el proveedor');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {proveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Razón Social */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Razón Social *
            </label>
            <input
              type="text"
              name="razon_social"
              value={formData.razon_social}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="Ingrese la razón social"
            />
          </div>

          {/* RUC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RUC *
            </label>
            <input
              type="text"
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
              required
              maxLength="11"
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="12345678901"
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.ruc.length}/11 dígitos
            </p>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="Ingrese el teléfono"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="correo@empresa.com"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <textarea
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              rows="3"
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 resize-none"
              placeholder="Ingrese la dirección"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {proveedor ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                proveedor ? 'Actualizar' : 'Crear Proveedor'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProveedor;