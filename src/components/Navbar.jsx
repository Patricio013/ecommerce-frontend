import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function Navbar() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Inicio</Link>
      {auth.token ? (
        <>
          {auth.role === 'USER' && <Link to="/carrito">Carrito</Link>}
          {auth.role === 'USER' && <Link to="/pedidosUser">Pedidos</Link>}
          {auth.role === 'ADMIN' && <Link to="/crearProducto">Crear Producto</Link>}
          {auth.role === 'ADMIN' && <Link to="/admin">Ver Productos</Link>}
          {auth.role === 'ADMIN' && <Link to="/pedidosAdmin">Ver Pedidos</Link>}
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

