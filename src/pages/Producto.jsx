import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducto, agregarAlCarrito } from '../Redux/productoSlice';
import '../components/Styles/ProductoUser.css';
import '../components/Styles/Catalogo.css';

function Producto() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { producto, mensaje, status, error } = useSelector((state) => state.producto); 

  const [cantidad, setCantidad] = useState(1);
  const [localMensaje, setLocalMensaje] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchProducto({ id, token }));
    }
  }, [id, token, dispatch]);

  useEffect(() => {
    if (mensaje) {
      setLocalMensaje(mensaje);
      const timer = setTimeout(() => {
        setLocalMensaje('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const handleAgregarAlCarrito = () => {
    if (token) {
      dispatch(agregarAlCarrito({ id, cantidad, token }))
      .unwrap()
      .catch((error) => {
        alert("Pasaste el stock maximo");
      });
    }
  };

  if (status === 'loading') {
    return (
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='containerP'>
      {producto && (
        <>
          <div className='cuerpo'>
            <h1>{producto.titulo}</h1>
            <p>{producto.descripcion}</p>
            <div className="container-precio">
              {producto.estadoDescuento ? (
                <div className="precios-descuento">
                  <span className="precio-tachado">${producto.precioTotal.toFixed(2)}</span>
                  <span className="precio-descuento">
                    ${producto.precioDescuento.toFixed(2)}
                  </span>
                  <span className="descuento">({producto.descuento}% OFF)</span>
                </div>
              ) : (
                <div className="precio-normal">
                  <span>${producto.precioTotal.toFixed(2)}</span>
                </div>
              )}
            </div>
            <p>Stock: {producto.stock}</p>
            <h2>Categorias</h2>
              {producto.categorias?.map((categoria) => (
                  <p className='cyberpunkF-checkbox-label' key={categoria.id}>
                    {categoria.nombre}
                  </p>
                ))}
            <div className='containerP2'>
              <input
                type="number"
                value={cantidad}
                min="1"
                max={producto.stock}
                className='inputP'
                placeholder='Ingrese cantidad'
                onChange={(e) => setCantidad(e.target.value)}
              />
              <button onClick={handleAgregarAlCarrito} className='buttonP'> 
                Agregar al carrito
                <svg className="cartIcon" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
              </button>
            </div>
            {error && <p className="error">{error}</p>}
            {localMensaje && <p>{localMensaje}</p>}
          </div>
          <div className='cardP'>
            <img src={producto.imagenUrl} alt={producto.titulo}/>
          </div>
        </>
      )}
    </div>
  );
}

export default Producto;
