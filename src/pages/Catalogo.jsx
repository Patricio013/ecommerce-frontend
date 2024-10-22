import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider'; 

function Catalogo() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 
  const { auth } = useAuth(); 

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch('http://localhost:4002/categorias/ObtenerCategorias');
        if (!res.ok) throw new Error('Error al obtener categorías.');
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        setError(err.message);
        console.error('Error al obtener categorías:', err);
      }
    };
    obtenerCategorias();
  }, []);

  const handleVerProducto = (productoId) => {
    if (auth.role === 'USER') { 
      navigate(`/producto/${productoId}`);
    } else {
      alert('Necesitas ser un usuario con rol USER para ver este producto.');
      navigate('/login');
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Catálogo de productos</h1>
      <div>
        {categorias.map(cat => (
          <div key={cat.id}>
            <h3>{cat.nombre}</h3>
            <div>
              {cat.catalogo
                .filter((prod) => prod.stock >= 1) 
                .map((prod) => (
                  <div key={prod.id}>
                    <h4>{prod.titulo}</h4>
                    <p>{prod.descripcion}</p>
                    <p>${prod.precio}</p>
                    {auth.role === 'USER' && ( 
                      <button onClick={() => handleVerProducto(prod.id)}>
                        Ver Producto
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {auth.role === 'USER' && ( 
        <button onClick={() => navigate('/filtrado')}>Ir a filtrado</button>
      )}
    </div>
  );
}

export default Catalogo;



