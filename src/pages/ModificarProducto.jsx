import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductoAdmin, updateProductoAdmin, fetchCategorias, toggleCategoriaProducto } from '../Redux/productosAdminSlice';
import '../components/Styles/Filtrado.css';
import '../components/Styles/crearProducto.css';
import '../components/Styles/Catalogo.css';

function ModificarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { producto, categoriasDisponibles, loading, error } = useSelector((state) => state.productosAdmin);

  const [localProducto, setLocalProducto] = useState(null);

  useEffect(() => {
    dispatch(fetchProductoAdmin(id)).then((result) => {
      if (fetchProductoAdmin.fulfilled.match(result)) {
        setLocalProducto(result.payload);
      }
    });
    dispatch(fetchCategorias());
  }, [id, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalProducto({
      ...localProducto,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setLocalProducto({
      ...localProducto,
      estadoDescuento: !localProducto.estadoDescuento,
    });
  };

  const handleCategoriaChange = (categoriaId) => {
    const action = localProducto?.categoriasIds?.includes(categoriaId) ? 'remove' : 'add';
    dispatch(toggleCategoriaProducto({ productId: id, categoriaId, action }));

    const updatedProducto = {
        ...localProducto,
        categoriasIds: action === 'add'
            ? [...localProducto.categoriasIds, categoriaId]
            : localProducto.categoriasIds.filter((id) => id !== categoriaId),
    };

    setLocalProducto(updatedProducto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localProducto.precioTotal || localProducto.precioTotal <= 0) {
      alert('El precio total es obligatorio y debe ser mayor que 0.');
      return;
    }

    const result = await dispatch(updateProductoAdmin({ id, producto: localProducto }));

    if (updateProductoAdmin.fulfilled.match(result)) {
      alert('¡Producto actualizado con éxito!');
      navigate(`/productoAdmin/${id}`);
    } else {
      alert('Error al actualizar el producto. Por favor, inténtalo de nuevo.');
    }
  };

  const handleRegresar = () => {
    navigate(`/productoAdmin/${id}`);
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
    <div className='contenidoC'>
        <div className="crear-producto-container">
        <h1 className='titulo-principal'>Editar Producto: {producto.titulo}</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label>
                    <input
                        type="text"
                        name="titulo"
                        value={localProducto.titulo || ''}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </label>
                <label>
                    $
                    <input
                        type="number"
                        name="precioTotal"
                        value={localProducto.precioTotal || ''}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </label>
            </div>
            <label>
            <textarea
                name="descripcion"
                value={localProducto.descripcion || ''}
                onChange={handleInputChange}
                required
                className="input"
            />
            </label>

            <label>
            <input
                type="number"
                name="stock"
                value={localProducto.stock || ''}
                onChange={handleInputChange}
                required
                className="input"
            />
            </label>
            <label className='cyberpunkF-checkbox-label'>
                <input
                    type="checkbox"
                    checked={localProducto.estadoDescuento || false}
                    onChange={handleCheckboxChange}
                    className='cyberpunkF-checkbox'
                />
            Activar Descuento
            </label>
            {localProducto.estadoDescuento && (
                <label>
                <input
                    type="number"
                    name="descuento"
                    value={localProducto.descuento || ''}
                    onChange={handleInputChange}
                    min="0"
                    max="99.99"
                    className="input"
                />
                </label>
            )}
            <fieldset>
            <legend className='titulo-principal'>Categorías:</legend>
            <div className='checkboxF-container'>
                {categoriasDisponibles.map((categoria) => (
                    <label className='cyberpunkF-checkbox-label' key={categoria.id}>
                    <input
                        type="checkbox"
                        checked={localProducto.categoriasIds?.includes(categoria.id) || false}
                        onChange={() => handleCategoriaChange(categoria.id)}
                        className='cyberpunkF-checkbox'
                    />
                    {categoria.nombre}
                    </label>
                ))}
            </div>
            </fieldset>
            <button onClick={handleRegresar}>Volver</button>
            <button type="submit">Guardar Cambios</button>
        </form>
        </div>
    </div>
  );
}

export default ModificarProducto;
