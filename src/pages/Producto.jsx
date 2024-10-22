import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider'; 

function Producto() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const { auth } = useAuth(); 
  const token = auth.token;

  useEffect(() => {
    fetch(`http://localhost:4002/productosUser/PorProducto?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener el producto");
        }
        return res.json();
      })
      .then((data) => setProducto(data))
      .catch((error) => setError(error.message));
  }, [id]);

  const agregarAlCarrito = () => {

    fetch(`http://localhost:4002/carrito/agregar?productId=${id}&cantidad=${cantidad}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo agregar el producto al carrito');
        }
        return res.json();
      })
      .then((data) => setMensaje('Producto agregado al carrito exitosamente'))
      .catch((error) => setMensaje(error.message));
  };
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!producto) {
    return <div>Cargando...</div>;
  }
  

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{producto.titulo}</h1>
      <p>{producto.descripcion}</p>
      <p>Precio: {producto.precio}</p>
      <p>Descuento: {producto.estadoDescuento ? `${producto.descuento}%` : 'Sin descuento'}</p>
      <p>Stock: {producto.stock}</p>
      {/* Aquí podrías mostrar la imagen o cualquier otra información */}
      <div>
        <input
          type="number"
          value={cantidad}
          min="1"
          max={producto.stock}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button onClick={agregarAlCarrito}>Agregar al carrito</button>
      </div>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Producto;
