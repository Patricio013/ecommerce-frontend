import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/authSlice';
import './Styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src\components\iconos\Logo.png" alt="Logo de Gambaro" className="logo" />
        <span>Gambaro</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        {token ? (
          <>
            {role === 'USER' && <Link to="/carrito">Carrito</Link>}
            {role === 'USER' && <Link to="/pedidosUser">Pedidos</Link>}
            {role === 'ADMIN' && <Link to="/crearProducto">Crear Producto</Link>}
            {role === 'ADMIN' && <Link to="/admin">Ver Productos</Link>}
            {role === 'ADMIN' && <Link to="/pedidosAdmin">Ver Pedidos</Link>}
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


