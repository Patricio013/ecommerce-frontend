import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider'; 

function Carrito() {
  const [carrito, setCarrito] = useState({ productos: [], precioTotal: 0 });
  const [error, setError] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const { auth } = useAuth(); 
  const token = auth.token; 

  const obtenerCarrito = () => {
    fetch('http://localhost:4002/carrito', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) throw new Error('No tienes autorización para ver el carrito.');
          throw new Error('Error al obtener el carrito.');
        }
        return res.json();
      })
      .then((data) => setCarrito(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    obtenerCarrito();
  }, []);

  const handleQuitarProducto = (productId) => {
    fetch(`http://localhost:4002/carrito/quitar?productId=${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al quitar el producto.');
        return res.json();
      })
      .then((data) => setCarrito(data))
      .catch((err) => console.error('Error al quitar producto:', err));
  };

  const handleVaciarCarrito = () => {
    fetch('http://localhost:4002/carrito/vaciar', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al vaciar el carrito.');
        return res.json();
      })
      .then((data) => setCarrito(data))
      .catch((err) => console.error('Error al vaciar el carrito:', err));
  };

  const handleModificarCantidad = (productId, nuevaCantidad) => {
    fetch(`http://localhost:4002/carrito/modificarCantidad?productId=${productId}&nuevaCantidad=${nuevaCantidad}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al modificar la cantidad.');
        return res.json();
      })
      .then((data) => setCarrito(data))
      .catch((err) => console.error('Error al modificar la cantidad:', err));
  };

  const handleRealizarPedido = () => {
    if (!direccion || !metodoPago) {
      alert('Por favor ingresa la dirección y selecciona el método de pago.');
      return;
    }

    fetch('http://localhost:4002/pedidos/realizar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        productos: carrito.productos.map((prod) => ({
          productId: prod.productId,
          cantidad: prod.cant,
        })),
        direccion,
        metodoPago,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al realizar el pedido.');
        return res.json();
      })
      .then(() => {
        alert('Pedido realizado con éxito');
        setCarrito({ productos: [], precioTotal: 0 }); 
        setDireccion(''); 
        setMetodoPago(''); 
      })
      .catch((err) => console.error('Error al realizar el pedido:', err));
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Tu carrito</h1>
      {carrito.productos.length > 0 ? (
        <>
          {carrito.productos.map((prod) => (
            <div key={prod.productId}>
              <h3>{prod.titulo}</h3>
              <p>Cantidad: {prod.cant}</p>
              <button onClick={() => handleModificarCantidad(prod.productId, prod.cant + 1)}>
                Agregar
              </button>
              <button onClick={() => handleModificarCantidad(prod.productId, prod.cant - 1)}>
                Quitar
              </button>
              <button onClick={() => handleQuitarProducto(prod.productId)}>Eliminar</button>
            </div>
          ))}
          <p><strong>Total: ${carrito.precioTotal.toFixed(2)}</strong></p>
          <button onClick={handleVaciarCarrito}>Vaciar Carrito</button>
          <div>
            <h2>Datos de envío</h2>
            <label>
              Dirección:
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ingresa tu dirección"
              />
            </label>

            <h3>Método de Pago</h3>
            <label>
              <input
                type="radio"
                value="efectivo"
                checked={metodoPago === 'efectivo'}
                onChange={(e) => setMetodoPago(e.target.value)}
              />
              Efectivo
            </label>
            <label>
              <input
                type="radio"
                value="credito"
                checked={metodoPago === 'credito'}
                onChange={(e) => setMetodoPago(e.target.value)}
              />
              Crédito
            </label>
          </div>
          <button onClick={handleRealizarPedido}>Realizar Pedido</button>
        </>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
}

export default Carrito;
