import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductosAdmin } from '../Redux/adminProductosSlice';
import '../components/Styles/Catalogo.css';
import '../components/Styles/ProductoAdmin.css';

function AdminProductos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productos, loading, error } = useSelector((state) => state.adminProductos);

  useEffect(() => {
    dispatch(fetchProductosAdmin());
  }, [dispatch]);

  const handleVerProducto = (id) => {
    navigate(`/productoAdmin/${id}`);
  };

  const handleCrearProducto = () => {
    navigate('/crearProducto');
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
    <div className='contenido'>
      <h1 className='titulo-principal'>Administrar Productos</h1>
      <div className='contenedor-productos'>
        {productos.length > 0 ? (
          productos.map((prod) => (
            <div className='card' key={prod.id}>
                <div className='card-img'> 
                  <img src={prod.imagenUrl} alt={prod.titulo}/>
                </div>
                <div>
                  <p className="text-title">{prod.titulo}</p>
                  <p className="text-body">{prod.descripcion}</p>
                </div>
              <button onClick={() => handleVerProducto(prod.id)} className='submitPA'>Ver Detalle</button>
            </div>
          ))
        ) : (
          <p>No hay productos creados.</p>
        )}
      </div>
      <button onClick={handleCrearProducto} className='submitF'>Crear Nuevo Producto</button>
    </div>
  );
}

export default AdminProductos;

  