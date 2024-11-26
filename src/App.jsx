import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito';
import AdminProductos from './pages/AdminProductos';
import Filtrado from './pages/Filtrado';
import Producto from './pages/Producto';
import Navbar from './components/Navbar';
import PedidosUser from './pages/PedidosUser';
import CrearProducto from './pages/CrearProducto';
import ProductoAdmin from './pages/ProductoAdmin';
import PedidosAdmin from './pages/PedidosAdmin';
import { Provider } from 'react-redux';
import store from './Redux/store';
import ModificarProducto from './pages/ModificarProducto';
import CambiarFoto from './pages/CambiarFoto';


function App() {
  return (
    <Provider store = {store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<AdminProductos />} />
          <Route path="/filtrado" element={<Filtrado />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/pedidosUser" element={<PedidosUser />} />
          <Route path="/crearProducto" element={<CrearProducto />} />
          <Route path="/productoAdmin/:id" element={<ProductoAdmin />} />
          <Route path="/pedidosAdmin" element={<PedidosAdmin />} />
          <Route path="/modificarProducto/:id" element={<ModificarProducto />} />
          <Route path="/cambiarFoto/:id" element={<CambiarFoto />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;


