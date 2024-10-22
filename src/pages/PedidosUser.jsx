import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';

function Pedido(){
    const [pedidos, setPedidos] = useState([]);
    const { auth } = useAuth(); 
    const token = auth.token;

    const obtenerPedidos = () => {
        fetch('http://localhost:4002/pedidos/ObtenerTodosUser', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return res.json(); // Asegúrate de llamar a `json()` aquí
        })
        .then(data => setPedidos(data))
        .catch(error => console.error('Error al obtener pedidos:', error));
    };

    useEffect(() => {
        obtenerPedidos();
    }, []);

    return (
        <div>
            <h1>Tus pedidos</h1>
            {pedidos.length === 0 ? (
                <p>No tienes pedidos.</p>
            ) : (
                <ul>
                    {pedidos.map(pedido => (
                        <li key={pedido.id}>
                            <h2>Pedido ID: {pedido.id}</h2>
                            <p>Comprador: {pedido.comprador?.primerNombre} {pedido.comprador?.apellido}</p>
                            <p>Precio Total: ${pedido.precioTotal?.toFixed(2)}</p>
                            <p>Método de Pago: {pedido.metodoDePago}</p>
                            <p>Dirección: {pedido.direccion}</p>
                            <h3>Productos:</h3>
                            <ul>
                                {pedido.productos.map(producto => (
                                    <li key={producto.id}>
                                        <p>{producto.titulo},  Cantidad: {producto.cant}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Pedido;