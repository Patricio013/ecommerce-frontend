import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    role: 'USER',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4002/usuarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: formData.nombre,
        lastname: formData.apellido,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert('Registro exitoso. Por favor, inicia sesión.');
          navigate('/login'); // Redirige a login tras registro exitoso
        } else {
          alert('Error al registrarse. Inténtalo de nuevo.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Ocurrió un error durante la solicitud.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="USER">Usuario</option>
          <option value="ADMIN">Vendedor</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
      <button onClick={() => navigate('/login')}>
        Ya tengo una cuenta
      </button>
    </div>
  );
}

export default Register;
