import { useNavigate } from "react-router-dom";
import azul from "../../public/images/azul.webp";

const Azul = () => {
    const navigate = useNavigate();
    const fecha = localStorage.getItem("fecha");
    
    const [year, month, day] = fecha.split("-").map(Number);
    const fechaLocal = new Date(year, month - 1, day);

    const fechaFormateada = fechaLocal.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="w-full min-h-screen bg-blue-700 flex flex-col justify-center items-center">
            <h1 className="text-white text-4xl font-bold mb-4">Azul</h1>
            <p className="text-white text-lg mb-4"> La camiseta de este día:</p>
            <p className="text-white text-lg mb-4">{fechaFormateada}</p>
            <img src={azul} alt="Camiseta Roja" className="mb-4 rounded-lg shadow-lg w-64 h-auto" />
            <button
                onClick={() => {
                    localStorage.removeItem("fecha");
                    handleClick()
                }}
                className="py-2 px-4 bg-gray-700/100 text-slate-300 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300"
            >
                Volver
            </button>
        </div>
    );
}

export default Azul;