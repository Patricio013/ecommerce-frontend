import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';

function CrearProducto() {
  const { auth } = useAuth(); 
  const token = auth.token;
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    stock: '',
    descuento: '',
    estadoDescuento: false,
    imagenes: null,
    categoriasIds: new Set(),
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:4002/categorias/ObtenerCategorias', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategorias();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProducto((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCategoriaChange = (e) => {
    const { value, checked } = e.target;
    setProducto((prev) => {
      const newCategorias = new Set(prev.categoriasIds);
      if (checked) {
        newCategorias.add(parseInt(value));
      } else {
        newCategorias.delete(parseInt(value));
      }
      return { ...prev, categoriasIds: newCategorias };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4002/productosAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...producto,
          categoriasIds: Array.from(producto.categoriasIds),
        }),
      });
      if (response.ok) {
        alert('Producto creado exitosamente');
      }
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" name="titulo" value={producto.titulo} onChange={handleInputChange} />
        </label>
        <label>
          Precio:
          <input type="number" name="precio" value={producto.precio} onChange={handleInputChange} />
        </label>
        <label>
          Descripción:
          <textarea name="descripcion" value={producto.descripcion} onChange={handleInputChange} />
        </label>
        <label>
          Stock:
          <input type="number" name="stock" value={producto.stock} onChange={handleInputChange} />
        </label>
        <label>
          Descuento:
          <input
            type="number"
            name="descuento"
            value={producto.descuento}
            onChange={handleInputChange}
            max="99.99"
            step="0.01"
          />
        </label>
        <label>
          Estado Descuento:
          <input
            type="checkbox"
            name="estadoDescuento"
            checked={producto.estadoDescuento}
            onChange={handleCheckboxChange}
          /> Activar Descuento
        </label>

        <h3>Categorías</h3>
        {categorias.map(categoria => (
          <label key={categoria.id}>
            <input
              type="checkbox"
              value={categoria.id}
              checked={producto.categoriasIds.has(categoria.id)}
              onChange={handleCategoriaChange}
            />
            {categoria.nombre}
          </label>
        ))}

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto;
