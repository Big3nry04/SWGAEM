import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Package, ShoppingCart, Users, BarChart3, Shield, Truck, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Hacer petición real a la API
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`¡Bienvenido ${data.usuario.nombre}!`);
                // Guardar datos del usuario (opcional)
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                navigate('/dashboard');
            } else {
                toast.error(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión con el servidor');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden fixed inset-0">
            {/* Panel izquierdo - Información corporativa */}
            <div className="flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative flex flex-col justify-center p-8 lg:p-16">
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-lg">
                    {/* Logo y título principal */}
                    <div className="mb-12">
                        <div className="flex items-center mb-6">
                            <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                                <Package className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">MARSER PERÚ SAC</h1>
                                <p className="text-blue-200 text-sm">Sistema de Gestión Integral</p>
                            </div>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            Gestiona tu negocio con
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> tecnología avanzada</span>
                        </h2>

                        <p className="text-xl text-blue-100 leading-relaxed">
                            Productos de limpieza profesional, papel sanitario, dispensadores,
                            equipamiento de seguridad ocupacional y químicos especializados.
                        </p>
                    </div>

                    {/* Características principales */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
                            <div className="flex items-center mb-2">
                                <Package className="w-6 h-6 text-blue-300 mr-3" />
                                <span className="text-white font-semibold">Inventario</span>
                            </div>
                            <p className="text-blue-200 text-sm">Control en tiempo real</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
                            <div className="flex items-center mb-2">
                                <ShoppingCart className="w-6 h-6 text-green-300 mr-3" />
                                <span className="text-white font-semibold">Ventas</span>
                            </div>
                            <p className="text-blue-200 text-sm">Gestión inteligente</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
                            <div className="flex items-center mb-2">
                                <Users className="w-6 h-6 text-purple-300 mr-3" />
                                <span className="text-white font-semibold">Clientes</span>
                            </div>
                            <p className="text-blue-200 text-sm">Base de datos completa</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
                            <div className="flex items-center mb-2">
                                <BarChart3 className="w-6 h-6 text-yellow-300 mr-3" />
                                <span className="text-white font-semibold">Reportes</span>
                            </div>
                            <p className="text-blue-200 text-sm">Análisis detallado</p>
                        </div>
                    </div>

                    {/* Indicadores de confianza */}
                    <div className="flex items-center space-x-6 text-blue-200">
                        <div className="flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            <span className="text-sm">Seguro</span>
                        </div>
                        <div className="flex items-center">
                            <Truck className="w-5 h-5 mr-2" />
                            <span className="text-sm">Rápido</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span className="text-sm">Confiable</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel derecho - Formulario de login */}
            <div className="flex-1 bg-white flex items-center justify-center p-8 relative">
                {/* Patrón de fondo sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-50"></div>

                <div className="w-full max-w-md relative z-10">
                    {/* Header del formulario */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Iniciar Sesión
                        </h2>
                        <p className="text-gray-600">
                            Accede a tu panel de administración
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Campo Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                                    placeholder="admin@empresa.com"
                                />
                            </div>
                        </div>

                        {/* Campo Contraseña */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                                    placeholder="Ingresa tu contraseña"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition duration-200" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition duration-200" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Opciones adicionales */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                                    Recordar sesión
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition duration-200">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        {/* Botón de envío */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Iniciando sesión...
                                </div>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    {/* Usuarios de demostración */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Usuarios de demostración
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span className="font-medium">Admin:</span>
                                <span>admin@empresa.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Almacén:</span>
                                <span>almacen@empresa.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Ventas:</span>
                                <span>ventas@empresa.com</span>
                            </div>
                            <div className="text-center pt-2 border-t border-gray-200">
                                <span className="text-gray-500 text-xs">Contraseña: cualquier cosa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;