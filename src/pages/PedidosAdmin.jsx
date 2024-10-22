import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';

function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const { auth } = useAuth(); 
  const token = auth.token;
  
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:4002/pedidos/ObtenerTodosAdmin', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };
    fetchPedidos();
  }, []);

  if (pedidos.length === 0) {
    return <p>No hay pedidos disponibles.</p>;
  }

  return (
    <div>
      <h1>Pedidos Administrador</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            <h3>Pedido ID: {pedido.id}</h3>
            <p>Comprador: {pedido.comprador.primerNombre} {pedido.comprador.apellido}</p>
            <p>Precio Total: ${pedido.precioTotal.toFixed(2)}</p>
            <p>Método de Pago: {pedido.metodoDePago}</p>
            <p>Dirección: {pedido.direccion}</p>
            <h4>Productos:</h4>
            <ul>
              {pedido.productos.map((producto) => (
                <li key={producto.id}>
                  {producto.titulo}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PedidosAdmin;
