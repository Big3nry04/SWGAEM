import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Package, ShoppingCart, Users, BarChart3, Shield, Truck, CheckCircle, Sparkles, TrendingUp, Zap } from 'lucide-react';
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
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative flex flex-col justify-center p-4 sm:p-6 lg:p-8 h-[35vh] lg:h-screen order-1 lg:order-1 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                        <div className="absolute top-20 sm:top-40 left-10 sm:left-20 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-10 sm:bottom-20 left-20 sm:left-40 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                    </div>
                    
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative z-10 max-w-xl mx-auto w-full">
                    <div className="mb-4 lg:mb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-3 lg:mb-4">
                            <div className="relative mb-2 sm:mb-0">
                                <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
                                <div className="relative w-12 h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                                    <Package className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                                </div>
                            </div>
                            <div className="sm:ml-4 text-center sm:text-left">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">MARSER PERÚ SAC</h1>
                                <p className="text-blue-100 text-xs font-medium mt-0.5 flex items-center justify-center sm:justify-start">
                                    <div className="w-13 h-3 mr-1" />
                                    Sistema de Gestión Integral
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight mb-2 lg:mb-3 text-center sm:text-left">
                            Gestiona tu negocio con
                            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200">
                                tecnología avanzada
                            </span>
                        </h2>

                        <p className="text-sm lg:text-base text-blue-50 leading-relaxed font-light text-center sm:text-left">
                            Productos de limpieza profesional, papel sanitario, dispensadores,
                            equipamiento de seguridad ocupacional y químicos especializados.
                        </p>
                    </div>

                    <div className="hidden lg:grid grid-cols-2 gap-3 mb-4">
                        {[
                            { icon: Package, label: 'Inventario', desc: 'Control en tiempo real', color: 'from-blue-400 to-blue-500' },
                            { icon: ShoppingCart, label: 'Ventas', desc: 'Gestión inteligente', color: 'from-blue-300 to-blue-400' },
                            { icon: Users, label: 'Clientes', desc: 'Base de datos completa', color: 'from-indigo-400 to-blue-500' },
                            { icon: BarChart3, label: 'Reportes', desc: 'Análisis detallado', color: 'from-blue-500 to-indigo-500' }
                        ].map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={idx} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                                    <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                        <div className="flex items-start mb-1">
                                            <div className={`w-8 h-8 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-lg`}>
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-white font-bold text-sm mb-0.5">{feature.label}</h3>
                                        <p className="text-blue-100 text-xs font-light">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="hidden lg:flex items-center justify-start space-x-6 text-blue-100">
                        {[
                            { icon: Shield, label: 'Seguro' },
                            { icon: Truck, label: 'Rápido' },
                            { icon: CheckCircle, label: 'Confiable' }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="flex items-center group cursor-pointer">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Panel derecho - Formulario de login */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative h-[65vh] lg:h-screen order-2 lg:order-2 overflow-y-auto">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30"></div>
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.03) 1px, transparent 0)',
                        backgroundSize: '30px 30px'
                    }}></div>
                </div>

                <div className="w-full max-w-md relative z-10 my-auto">
                    <div className="text-center mb-4 lg:mb-6">
                        <div className="inline-block mb-3 lg:mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                                <div className="relative w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <Lock className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1 lg:mb-2">
                            ¡Bienvenido!
                        </h2>
                        <p className="text-sm text-gray-600 font-medium">
                            Accede a tu panel de administración
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-xs font-bold text-gray-700">
                                Correo Electrónico
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 lg:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all duration-300 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400 font-medium text-sm"
                                    placeholder="admin@empresa.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-xs font-bold text-gray-700">
                                Contraseña
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full pl-10 pr-12 py-2.5 lg:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all duration-300 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400 font-medium text-sm"
                                    placeholder="Ingresa tu contraseña"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-blue-600 transition-colors duration-200" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400 hover:text-blue-600 transition-colors duration-200" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-lg cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700 font-medium cursor-pointer">
                                    Recordar sesión
                                </label>
                            </div>
                            <div className="text-xs">
                                <a href="#" className="font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2.5 lg:py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            {isLoading ? (
                                <div className="flex items-center relative z-10">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Iniciando sesión...
                                </div>
                            ) : (
                                <span className="relative z-10 flex items-center">
                                    Iniciar Sesión
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="mt-4 lg:mt-5 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl blur-sm"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm p-3 lg:p-4 rounded-xl border-2 border-gray-100 shadow-lg">
                            <h3 className="text-xs font-bold text-gray-700 mb-2 flex items-center">
                                <div className="w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-2">
                                    <Users className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white" />
                                </div>
                                Usuarios de demostración
                            </h3>
                            <div className="space-y-1.5 text-xs">
                                {[
                                    { role: 'Admin', email: 'admin@empresa.com' },
                                    { role: 'Almacén', email: 'almacen@empresa.com' },
                                    { role: 'Ventas', email: 'ventas@empresa.com' }
                                ].map((user, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200">
                                        <div className="flex items-center">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                                            <span className="font-bold text-gray-700">{user.role}:</span>
                                        </div>
                                        <span className="text-gray-600 font-medium">{user.email}</span>
                                    </div>
                                ))}
                                <div className="text-center pt-2 border-t-2 border-gray-100">
                                    <span className="text-gray-500 text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full inline-block">
                                        Contraseña: cualquier cosa
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;