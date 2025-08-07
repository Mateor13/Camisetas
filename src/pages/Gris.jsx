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

        // Cleanup
        return () => mediaQuery.removeEventListener('change', handleChange);
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
        <div className={`w-full min-h-screen flex flex-col justify-center items-center p-4 transition-colors duration-300 ${
            isDark ? 'bg-gray-700' : 'bg-gray-600'
        }`}>
            {/* Layout para pantallas grandes (landscape/desktop) */}
            <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:max-w-4xl lg:mx-auto lg:gap-8">
                {/* Imagen */}
                <div className={`border-4 rounded-3xl p-2 transition-colors duration-300 ${
                    isDark ? 'bg-gray-300 border-white' : 'bg-white border-gray-300'
                }`}>
                    <img 
                        src={gris} 
                        alt="Camiseta Gris" 
                        className="rounded-2xl w-48 h-48 xl:w-56 xl:h-56 object-contain shadow-lg" 
                    />
                </div>
                
                {/* Contenido de texto */}
                <div className="flex flex-col items-start justify-center max-w-md">
                    <h1 className={`text-5xl xl:text-6xl font-bold mb-4 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-white'
                    }`}>
                        Gris
                    </h1>
                    <p className={`text-xl xl:text-2xl mb-2 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-white'
                    }`}>
                        La camiseta de este día:
                    </p>
                    <p className={`text-lg xl:text-xl mb-6 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-white'
                    }`}>
                        {fechaFormateada}
                    </p>
                    <button
                        onClick={handleClick}
                        className={`py-3 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
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
            <div className="flex lg:hidden flex-col items-center justify-center max-w-lg mx-auto">
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-center transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-white'
                }`}>
                    Gris
                </h1>
                
                <div className={`border-4 rounded-3xl p-2 mb-6 transition-colors duration-300 ${
                    isDark ? 'bg-gray-300 border-white' : 'bg-white border-gray-300'
                }`}>
                    <img 
                        src={gris} 
                        alt="Camiseta Gris" 
                        className="rounded-2xl w-40 h-40 md:w-48 md:h-48 object-contain shadow-lg" 
                    />
                </div>
                
                <p className={`text-lg md:text-xl mb-2 text-center transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-white'
                }`}>
                    La camiseta de este día:
                </p>
                <p className={`text-base md:text-lg mb-6 text-center transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-white'
                }`}>
                    {fechaFormateada}
                </p>
                
                <button
                    onClick={handleClick}
                    className={`py-3 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
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