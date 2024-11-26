import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPedidosAdmin } from '../Redux/pedidosAdminSlice';
import '../components/Styles/Pedidos.css';
import '../components/Styles/Catalogo.css';

function PedidosAdmin() {
  const dispatch = useDispatch();
  const {  pedidos, loading, error } = useSelector((state) => state.pedidosAdmin);

  useEffect(() => {
    dispatch(fetchPedidosAdmin());
  }, [dispatch]);

  if (loading) 
    return (
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Cargando...</p>
      </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='containerPe'>
      <h1 className='titulo-principalPe'>Pedidos Administrador</h1>
      {pedidos.length === 0 ? (
        <div className="totalC-container">
          <p>No tienes pedidos.</p>
        </div>
      ) : (
        <div className="contenedor-pedidos">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedidos-title">
                <h2>Pedido #{pedido.id}</h2>
              </div>
              <div className="pedidos-body">
                <p><strong>Comprador:</strong> {pedido.comprador?.primerNombre} {pedido.comprador?.apellido}</p>
                <p><strong>Precio Total:</strong> ${pedido.precioTotal?.toFixed(2)}</p>
                <p><strong>Método de Pago:</strong> {pedido.metodoDePago}</p>
                <p><strong>Dirección:</strong> {pedido.direccion}</p>
              </div>
              <hr />
              <div className="pedidos-footer">
                <h3 className="pedidos-title">Productos:</h3>
                <ul>
                  {pedido.productos.map((producto) => (
                    <li key={producto.id} className="pedidos-body">
                      <p className="pedidos-body">{producto.titulo}, Cantidad: {producto.cant}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PedidosAdmin;
