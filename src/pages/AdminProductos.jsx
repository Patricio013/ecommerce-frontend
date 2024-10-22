import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const { auth } = useAuth(); 
    const token = auth.token;
  
    useEffect(() => {
      fetch('http://localhost:4002/productosAdmin/Todos', {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
      })
        .then(res => res.json())
        .then(data => setProductos(data))
        .catch(error => console.error('Error al obtener productos:', error));
    }, []);
  
    const handleVerProducto = (id) => {
      navigate(`/productoAdmin/${id}`);
    };
  
    const handleCrearProducto = () => {
      navigate('/crearProducto');
    };
  
    return (
      <div>
        <h1>Administrar Productos</h1>
        {productos.length > 0 ? (
          productos.map(prod => (
            <div key={prod.id}>
              <h3>{prod.titulo}</h3>
              <p>{prod.descripcion}</p>
              <button onClick={() => handleVerProducto(prod.id)}>Ver Detalle</button>
            </div>
          ))
        ) : (
          <p>No hay productos creados.</p>
        )}
        <button onClick={handleCrearProducto}>Crear Nuevo Producto</button>
      </div>
    );
  }
  
  export default AdminProductos;
  