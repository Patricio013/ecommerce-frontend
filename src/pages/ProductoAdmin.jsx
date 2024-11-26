import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductoAdmin,  deleteProductoAdmin, fetchCategorias } from '../Redux/productosAdminSlice';
import '../components/Styles/ProductoUser.css';
import '../components/Styles/Modificar.css';
import '../components/Styles/Catalogo.css';

function ProductoAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { producto, loading, error } = useSelector((state) => state.productosAdmin);

  const [localProducto, setLocalProducto] = useState(null);

  useEffect(() => {
    dispatch(fetchProductoAdmin(id)).then((result) => {
      if (fetchProductoAdmin.fulfilled.match(result)) {
        setLocalProducto(result.payload);
      }
    });
    dispatch(fetchCategorias());
  }, [id, dispatch]);

  const handleEliminar = () => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.");
    if (confirmar) {
      dispatch(deleteProductoAdmin(id))
        .then(() => navigate('/admin'))
        .catch((err) => console.error('Error al eliminar producto:', err));
    }
  };

  const handleVerProducto = (id) => {
    navigate(`/modificarProducto/${id}`);
  };

  const handleCambiarFoto = (id) => {
    navigate(`/cambiarFoto/${id}`);
  };

  if (loading) 
    return (
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Cargando...</p>
      </div>
  );
  if (error) return <p>Error: {error}</p>;
  if (!localProducto) return <p>Producto no encontrado o eliminado.</p>;

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
            <div className='botonesM-container'>
              <button type="button" onClick={handleEliminar} className='submitM'>
                Eliminar Producto
              </button>
              <button onClick={() => handleVerProducto(producto.id)} className='submitM'>Modificar Producto</button>
              <button onClick={() => handleCambiarFoto(producto.id)} className='submitM'> Cambiar Imagen</button>
            </div>
          </div>
          <div className='cardP'>
            <img src={producto.imagenUrl} alt={producto.titulo}/>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductoAdmin;