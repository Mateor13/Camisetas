import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KFC from "../../../public/images/logo.png";
import ARP from "../../../public/images/ARP.jpg";

const ColorCamisetas = () => {
    const [form, setForm] = useState({ fecha: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
            toast.error(error?.response.data.error)
        }
    };

    return (
        <div className="w-full min-h-screen bg-red-700 flex flex-col justify-center items-center" >
                <ToastContainer />
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <small className="text-black-700 text-center block my-4 text-lg">Color de Camiseta</small>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <img src={KFC} alt="Logo" className="w-1/2 rounded-lg shadow-md" />
                    <img src={ARP} alt="Logo" className="w-1/3 rounded-lg shadow-md" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="mb-2 block text-sm font-semibold">Seleccione una fecha para visualizar el color de la camiseta:</label>
                    <input
                        type="date"
                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                        min={new Date().toISOString().split("T")[0]} 
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                    />
                    </div>
                    
                    <button type="submit" className="py-2 w-full block text-center bg-gray-700/100 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Averiguar Camiseta</button>
                </form>
            </div>
        </div>
    );
};

export default ColorCamisetas;
