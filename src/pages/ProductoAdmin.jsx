import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider'; 

function ProductoAdmin() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth(); 
  const token = auth.token; 


  useEffect(() => {
    const fetchProducto = async () => {
      const response = await fetch(`http://localhost:4002/productosAdmin/PorProducto?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProducto({
        ...data,
        categoriasIds: new Set(data.categorias.map(cat => cat.id)), 
      });
    };

    const fetchCategorias = async () => {
      const response = await fetch(`http://localhost:4002/categorias/ObtenerCategorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategorias(data);
    };

    fetchProducto();
    fetchCategorias();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setProducto((prev) => ({ ...prev, estadoDescuento: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto.titulo || !producto.precio || !producto.descripcion || !producto.stock) {
      alert("Todos los campos deben estar completos.");
      return;
    }

    try {
      await fetch(`http://localhost:4002/productosAdmin/actualizar?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...producto,
          categoriasIds: Array.from(producto.categoriasIds),
        }),
      });
      alert('Producto actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const handleEliminar = async () => {
    try {
      await fetch(`http://localhost:4002/productosAdmin/borrar?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Producto eliminado');
      navigate('/productoAdmin');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleCategoriaChange = async (categoriaId) => {
    const categoriasIds = new Set(producto.categoriasIds);
    
    try {
      if (categoriasIds.has(categoriaId)) {
        await fetch(`http://localhost:4002/productosAdmin/BorrarCat?productId=${id}&categoriaId=${categoriaId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        categoriasIds.delete(categoriaId);
      } else {
        await fetch(`http://localhost:4002/productosAdmin/AgregarCat?productId=${id}&categoriaId=${categoriaId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        categoriasIds.add(categoriaId);
      }
      setProducto((prev) => ({ ...prev, categoriasIds }));
    } catch (error) {
      console.error('Error al modificar categorías:', error);
    }
  };


  if (!producto) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Editar Producto: {producto.titulo}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" name="titulo" value={producto.titulo} onChange={handleInputChange} required />
        </label>
        <label>
          Precio:
          <input type="number" name="precio" value={producto.precio} onChange={handleInputChange} required />
        </label>
        <label>
          Descripción:
          <textarea name="descripcion" value={producto.descripcion} onChange={handleInputChange} required />
        </label>
        <label>
          Stock:
          <input type="number" name="stock" value={producto.stock} onChange={handleInputChange} required />
        </label>
        <label>
          Descuento (%):
          <input type="number" name="descuento" value={producto.descuento} onChange={handleInputChange} min="0" max="99.99" />
        </label>
        <label>
          ¿Descuento Activo?
          <input type="checkbox" checked={producto.estadoDescuento} onChange={handleCheckboxChange} />
        </label>
        <fieldset>
          <legend>Categorías:</legend>
          {categorias.map(categoria => (
            <label key={categoria.id}>
              <input
                type="checkbox"
                checked={producto.categoriasIds?.has(categoria.id)} 
                onChange={() => handleCategoriaChange(categoria.id)} 
              />
              {categoria.nombre}
            </label>
          ))}
        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
      <button onClick={handleEliminar}>Eliminar Producto</button>
    </div>
  );
}

export default ProductoAdmin;
