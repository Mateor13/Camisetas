import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import KFC from "../../images/logo.png";
import ARP from "../../images/ARP.jpg";
import Tropi from "../../images/tropi.png";

const ColorCamisetas = () => {
    const [form, setForm] = useState({ fecha: "" });
    const [mensaje, setMensaje] = useState("");
    const [isError, setIsError] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const navigate = useNavigate();

    // Hook para detectar el tema del navegador
    useEffect(() => {
        // Verificar preferencia inicial del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mediaQuery.matches);

        // Listener para cambios en el tema del sistema
        const handleChange = (e) => {
            setIsDark(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        // Bloquear scroll en body y html
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.documentElement.style.height = '100vh';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        // Cleanup
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
            // Restaurar scroll al desmontar el componente
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.height = '';
            document.documentElement.style.height = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, []);

    const handleChange = (e) => {
        const nuevaFecha = e.target.value;
        setForm({ ...form, [e.target.name]: nuevaFecha });
        
        if (nuevaFecha) {
            const mensajeFormateado = fechaFormateada(nuevaFecha);
            setMensaje(mensajeFormateado);
            setIsError(mensajeFormateado.includes('anterior'));
        } else {
            setMensaje("");
            setIsError(false);
        }
    };

    const fechaFormateada = (fecha) => {
        if (!fecha) return "";

        // Obtener fecha actual en Ecuador (zona horaria UTC-5) en formato YYYY-MM-DD
        const fechaActualEcuador = new Date().toLocaleString('en-CA', { 
            timeZone: 'America/Guayaquil', 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        }).split(',')[0];

        if (fecha < fechaActualEcuador) {
            return 'La fecha no puede ser anterior a la actual.';
        }

        const [year, month, day] = fecha.split('-').map(Number);
        const fechaLocal = new Date(year, month - 1, day);
        return fechaLocal.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const obtenerCamiseta = (fecha) => {
        const fechaSeleccionada = new Date(fecha);
        const fechaBase = new Date('2025-03-31');
        const colores = ['roja', 'gris', 'azul'];
        const diasTranscurridos = Math.floor(
            (fechaSeleccionada.getTime() - fechaBase.getTime()) / (1000 * 60 * 60 * 24)
        );
        const indice = (diasTranscurridos % colores.length + colores.length) % colores.length;
        return colores[indice];
    };

    const navegarAColor = (color) => {
        const fechaSeleccionada = form.fecha;
        if (!fechaSeleccionada) {
            setMensaje('La fecha es obligatoria.');
            setIsError(true);
            return;
        }
        
        localStorage.setItem("fecha", fechaSeleccionada);
        
        switch (color) {
            case 'roja':
                navigate("/roja");
                break;
            case 'gris':
                navigate("/gris");
                break;
            case 'azul':
                navigate("/azul");
                break;
            default:
                setMensaje('Camiseta no reconocida.');
                setIsError(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!form.fecha) {
            setMensaje('La fecha es obligatoria.');
            setIsError(true);
            return;
        }

        if (isError) {
            return;
        }

        const camiseta = obtenerCamiseta(form.fecha);
        const coloresValidos = ['roja', 'gris', 'azul'];
        
        if (coloresValidos.includes(camiseta)) {
            navegarAColor(camiseta);
        } else {
            setMensaje('Camiseta no reconocida.');
            setIsError(true);
        }
    };

    // Obtener fecha mínima y máxima
    const fechaMinima = new Date().toLocaleString('en-CA', { 
        timeZone: 'America/Guayaquil', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }).split(',')[0];
    
    const fechaMaxima = (() => {
        const max = new Date();
        max.setMonth(max.getMonth() + 1);
        return max.toISOString().split('T')[0];
    })();

    return (
        <div 
            className={`w-full h-screen flex flex-col justify-center items-center p-2 sm:p-4 transition-colors duration-300 overflow-hidden ${
                isDark ? 'bg-red-900' : 'bg-red-700'
            }`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                touchAction: 'none',
                overscrollBehavior: 'none'
            }}
        >
            <div className={`p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl transition-colors duration-300 ${
                isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-black/20'
            }`}>
                <h1 className={`text-center block my-2 sm:my-3 md:my-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-black'
                }`}>
                    Color de Camiseta
                </h1>
                
                {/* Contenedor responsivo */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-8">
                    {/* Imágenes */}
                    <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 lg:mb-0 lg:flex-col lg:gap-6">
                        <img 
                            src={KFC} 
                            alt="Logo KFC" 
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-lg shadow-md object-contain" 
                        />
                        <img 
                            src={ARP} 
                            alt="Logo ARP" 
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-lg shadow-md object-contain" 
                        />
                        <div className={`rounded-lg shadow-md p-1 transition-colors duration-300 ${
                            isDark ? 'bg-white' : 'bg-white'
                        }`}>
                            <img 
                                src={Tropi} 
                                alt="Logo Tropi" 
                                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-lg object-contain" 
                            />
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="flex-1 lg:max-w-md xl:max-w-lg">
                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                            <div className="mb-3">
                                <label className={`mb-2 block text-sm sm:text-base md:text-lg lg:text-xl font-semibold transition-colors duration-300 ${
                                    isDark ? 'text-white' : 'text-black'
                                }`}>
                                    Selecciona una fecha:
                                </label>
                                <input
                                    type="date"
                                    className={`block w-full rounded-md border focus:outline-none focus:ring-1 py-2 sm:py-2.5 md:py-3 px-3 md:px-4 text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-300 ${
                                        isDark 
                                            ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                                            : 'bg-gray-50 text-gray-700 border-gray-300 focus:border-blue-700 focus:ring-blue-700'
                                    }`}
                                    min={fechaMinima}
                                    max={fechaMaxima}
                                    name="fecha"
                                    value={form.fecha}
                                    onChange={handleChange}
                                    placeholder="Selecciona una fecha"
                                    onKeyDown={(e) => e.preventDefault()}
                                    onInput={(e) => e.preventDefault()}
                                    onPaste={(e) => e.preventDefault()}
                                    onClick={(e) => {
                                        try {
                                            e.target.showPicker();
                                        } catch (error) {
                                            // Fallback para navegadores que no soportan showPicker
                                            e.target.focus();
                                        }
                                    }}
                                    onFocus={(e) => {
                                        try {
                                            e.target.showPicker();
                                        } catch (error) {
                                            // Fallback silencioso
                                        }
                                    }}
                                />
                            </div>
                            
                            <div className="text-center">
                                <small 
                                    className={`text-sm sm:text-base md:text-lg mb-2 block font-medium transition-colors duration-300 ${
                                        isError 
                                            ? (isDark ? 'text-red-400' : 'text-red-500')
                                            : (isDark ? 'text-green-400' : 'text-green-500')
                                    }`}
                                >
                                    {mensaje}
                                </small>
                            </div>
                            
                            <small className={`text-xs sm:text-sm md:text-base mb-4 block text-center transition-colors duration-300 ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                *Recuerda que la fecha es obligatoria y no puede ser anterior a la actual.
                            </small>
                            
                            <div className="pt-2 sm:pt-3">
                                <button 
                                    type="submit" 
                                    disabled={isError || !form.fecha}
                                    className={`py-3 sm:py-3.5 md:py-4 w-full block text-center text-white border rounded-xl transition-all duration-300 text-sm sm:text-base md:text-lg font-medium ${
                                        isError || !form.fecha 
                                            ? (isDark ? 'bg-gray-600 cursor-not-allowed border-gray-600' : 'bg-gray-400 cursor-not-allowed border-gray-400')
                                            : (isDark 
                                                ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-blue-500/25 border-blue-600' 
                                                : 'bg-blue-700 hover:bg-blue-900 hover:scale-105 shadow-lg hover:shadow-xl border-blue-700'
                                            )
                                    }`}
                                >
                                    Ver el color de camiseta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorCamisetas;
