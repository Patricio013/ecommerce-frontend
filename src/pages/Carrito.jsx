import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCarrito,
  quitarProducto,
  vaciarCarrito,
  modificarCantidad,
  realizarPedido,
} from '../Redux/cartSlice';
import { useEffect, useState } from 'react';
import '../components/Styles/Carrito.css';
import '../components/Styles/Catalogo.css';

function Carrito() {
  const dispatch = useDispatch();
  const { productos, precioTotal, loading, error } = useSelector((state) => state.carrito);
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

  useEffect(() => {
    dispatch(fetchCarrito());
  }, [dispatch]);

const handleQuitarProducto = (productId) => {
    dispatch(quitarProducto(productId));
  };

  const handleVaciarCarrito = () => {
    dispatch(vaciarCarrito());
  };

  const handleModificarCantidad = (productId, nuevaCantidad) => {
    dispatch(modificarCantidad({ productId, nuevaCantidad }));
  };

  const handleRealizarPedido = () => {
    if (!direccion || !metodoPago) {
      alert('Por favor ingresa la dirección y selecciona el método de pago.');
      return;
    }

    dispatch(
      realizarPedido({
        productos: productos.map((prod) => ({
          productId: prod.productId,
          cantidad: prod.cant,
        })),
        direccion,
        metodoPago,
      })
    );
  };

  if (loading) 
    return (
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Cargando...</p>
      </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='contenidoC'>
        <h1 className='titulo-principal'>Tu carrito</h1>
          {Array.isArray(productos) && productos?.length > 0 ? (
            <>
              <div>
                {productos.map((prod) => (
                  <div key={prod.productId} className="productC-card">
                    <div className="productC-info">
                      <span className="productC-title">{prod.titulo}</span>
                    </div>
                    <div className="productC-buttons">
                      <button
                        onClick={() => handleModificarCantidad(prod.productId, prod.cant - 1)}
                        disabled={prod.cant <= 1}
                        className={prod.cant <= 1 ? 'disabled' : ''}
                      >
                        <img src='src\components\iconos\resta.png' alt='resta' className='iconC'/>
                      </button>
                      <div className="productC-quantity">
                        <label>{prod.cant}</label>
                      </div>
                      <button
                        onClick={() => handleModificarCantidad(prod.productId, prod.cant + 1)}
                        disabled={prod.cant >= prod.stock}
                        className={prod.cant >= prod.stock ? 'disabled' : ''}
                      >
                        <img src='src\components\iconos\suma.png' alt='suma' className='iconC'/>
                      </button>
                      <button onClick={() => handleQuitarProducto(prod.productId)} className="btnC">
                        <img src='src\components\iconos\eliminar.png' alt='eliminar' className='iconC'/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="totalC-container">
                <p>
                  <strong>Total: ${precioTotal.toFixed(2)}</strong>
                </p>
              </div>
              <button onClick={handleVaciarCarrito} className='submitF'>Vaciar Carrito</button>
              <div className="shipping-container">
                <h2 className="title">Datos de envío</h2>
                <label>
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Ingresa tu dirección"
                    className="input"
                  />
                </label>

                <h3 className='envio-color'>Método de Pago</h3>
                <label className='cyberpunkF-checkbox-label'>
                  <input
                    type="radio"
                    value="efectivo"
                    checked={metodoPago === 'efectivo'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className='cyberpunkF-checkbox'
                  />
                  Efectivo
                </label>
                <label className='cyberpunkF-checkbox-label'>
                  <input
                    type="radio"
                    value="credito"
                    checked={metodoPago === 'credito'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className='cyberpunkF-checkbox'
                  />
                  Crédito
                </label>
                <button onClick={handleRealizarPedido} className='submitF'>Realizar Pedido</button>
              </div>
            </>
          ) : (
            <div className="totalC-container">
              <p>El carrito está vacío.</p>
            </div>
          )}
    </div>
  );
}

export default Carrito;
