import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ColorCamisetas from './pages/Camisetas/ColorCamisetas';
import Azul from './pages/Azul';
import Roja from './pages/Roja';
import Gris from './pages/Gris';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ColorCamisetas/>} />
                <Route path="/roja" element={<Roja/>} />
                <Route path="/gris" element={<Gris/>} />
                <Route path="/azul" element={<Azul/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;