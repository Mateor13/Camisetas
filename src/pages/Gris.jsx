import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import gris from "../images/gris.webp";

const Gris = () => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const fecha = localStorage.getItem("fecha");

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
    
    const [year, month, day] = fecha.split("-").map(Number);
    const fechaLocal = new Date(year, month - 1, day);

    const fechaFormateada = fechaLocal.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const handleClick = () => {
        localStorage.removeItem("fecha");
        navigate("/");
    };

    return (
        <div 
            className={`w-full h-screen flex flex-col justify-center items-center p-3 sm:p-4 md:p-6 transition-colors duration-300 overflow-hidden ${
                isDark ? 'bg-gray-800' : 'bg-gray-600'
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
            {/* Layout para pantallas grandes (landscape/desktop) */}
            <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:max-w-5xl lg:mx-auto lg:gap-10">
                {/* Imagen */}
                <div className={`border-4 rounded-3xl p-3 transition-colors duration-300 ${
                    isDark ? 'bg-gray-300 border-white' : 'bg-white border-gray-300'
                }`}>
                    <img 
                        src={gris} 
                        alt="Camiseta Gris" 
                        className="rounded-2xl w-56 h-56 xl:w-64 xl:h-64 object-contain shadow-lg" 
                    />
                </div>
                
                {/* Contenido de texto */}
                <div className="flex flex-col items-start justify-center max-w-lg">
                    <h1 className={`text-6xl xl:text-7xl font-bold mb-6 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-white'
                    }`}>
                        Gris
                    </h1>
                    <p className={`text-2xl xl:text-3xl mb-3 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-white'
                    }`}>
                        La camiseta de este día:
                    </p>
                    <p className={`text-xl xl:text-2xl mb-8 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-white'
                    }`}>
                        {fechaFormateada}
                    </p>
                    <button
                        onClick={handleClick}
                        className={`py-4 px-10 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-110 ${
                            isDark 
                                ? 'bg-gray-300 text-gray-800 hover:bg-gray-200' 
                                : 'bg-gray-300 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        Volver
                    </button>
                </div>
            </div>

            {/* Layout para pantallas pequeñas y medianas (portrait/mobile/tablet) */}
            <div className="flex lg:hidden flex-col items-center justify-center max-w-md sm:max-w-lg mx-auto">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-white'
                }`}>
                    Gris
                </h1>
                
                <div className={`border-4 rounded-3xl p-2 sm:p-3 mb-4 sm:mb-6 transition-colors duration-300 ${
                    isDark ? 'bg-gray-300 border-white' : 'bg-white border-gray-300'
                }`}>
                    <img 
                        src={gris} 
                        alt="Camiseta Gris" 
                        className="rounded-2xl w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain shadow-lg" 
                    />
                </div>
                
                <p className={`text-base sm:text-lg md:text-xl mb-2 text-center transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-white'
                }`}>
                    La camiseta de este día:
                </p>
                <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-center transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-white'
                }`}>
                    {fechaFormateada}
                </p>
                
                <button
                    onClick={handleClick}
                    className={`py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-110 ${
                        isDark 
                            ? 'bg-gray-300 text-gray-800 hover:bg-gray-200' 
                            : 'bg-gray-300 text-gray-800 hover:bg-gray-200'
                    }`}
                >
                    Volver
                </button>
            </div>
        </div>
    );
}

export default Gris;