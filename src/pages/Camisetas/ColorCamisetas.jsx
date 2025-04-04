import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import KFC from "../../../public/images/logo.png";
import ARP from "../../../public/images/ARP.jpg";
import Tropi from "../../../public/images/tropi.png";

const ColorCamisetas = () => {
    const [form, setForm] = useState({ fecha: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fechaFormateada = (fecha) => {
        if (!fecha) return "";
        const mensaje = document.getElementById("mensaje");
        const fechaActual = new Date().toISOString().split("T")[0];
        if (fecha < fechaActual) {
            mensaje.classList.remove("text-green-500");
            mensaje.classList.add("text-red-500");
        }else{
            mensaje.classList.remove("text-red-500");
            mensaje.classList.add("text-green-500");
        }
        const [year, month, day] = fecha.split("-").map(Number);
        const fechaLocal = new Date(year, month - 1, day);
        const fechaFormateada = fechaLocal.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        return fechaFormateada;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/color-camisetas`;
            const respuesta = await axios.post(url, form);
            const { fecha, camiseta } = respuesta.data;
            localStorage.setItem("fecha", form.fecha);
            if (camiseta === "roja") {
                navigate("/roja");
            } else if (camiseta === "gris") {
                navigate("/gris");
            }
            else if (camiseta === "azul") {
                navigate("/azul");
            }
        } catch (error) {
            console.error(error);
            const mensaje = document.getElementById("mensaje");
            mensaje.innerHTML = error?.response.data.error;
            mensaje.classList.remove("text-green-500");
            mensaje.classList.add("text-red-500");
        }
    };

    return (
        <div className="w-full min-h-screen bg-red-700 flex flex-col justify-center items-center" >
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <small className="text-black-700 text-center block my-4 text-3xl font-extrabold">Color de Camiseta</small>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <img src={KFC} alt="Logo" className="w-1/3 rounded-lg shadow-md" />
                    <img src={ARP} alt="Logo" className="w-1/3 rounded-lg shadow-md" />
                    <img src={Tropi} alt="Logo" className="w-1/3 rounded-lg shadow-md" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Seleccione una fecha a averiguar:</label>
                    <input
                        type="date"
                        className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-2 text-gray-500"
                        min={new Date().toISOString().split("T")[0]} 
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        placeholder="Fecha"
                    />
                    </div>
                    <small id="mensaje" className="text-center justify-center text-green-500 text-sm mb-2 block">
                        {fechaFormateada(form.fecha)}
                    </small>                    
                    <small className="text-gray-500 text-sm mb-4">*Recuerda que la fecha es obligatoria y no puede ser anterior a la actual.</small><br/><br/>
                    <button type="submit" className="py-2 w-full block text-center bg-blue-700/100 text-white border rounded-xl hover:scale-100 duration-300 hover:bg-blue-900 hover:text-white">Visualizar el Color de Camiseta</button>
                </form>
            </div>
        </div>
    );
};

export default ColorCamisetas;
