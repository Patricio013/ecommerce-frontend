import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../components/AuthProvider';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth(); // Traemos la función login desde el AuthContext
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4002/usuarios/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token && data.roles) {
          const token = data.access_token;
          const role = data.roles;

          // Llamamos al método login del AuthProvider pasando el token y el rol
          login(token, role);
          navigate('/');
        } else {
          alert('Error: No se recibieron las credenciales correctas');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Ocurrió un error durante la solicitud');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
      <button onClick={() => navigate('/register')}>Registrarme</button>
    </div>
  );
}

export default Login;


