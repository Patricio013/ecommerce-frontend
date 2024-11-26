import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Redux/authSlice';
import '../components/Styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    role: 'USER',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); 

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      register({
        firstname: formData.nombre,
        lastname: formData.apellido,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
    ).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        alert('Registro exitoso. Por favor, inicia sesión.');
        navigate('/login');
      } else {
        alert('Error al registrarse. Inténtalo de nuevo.');
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div>
        <form onSubmit={handleSubmit} className="form">
          <p className="title">Registro</p>
          <p className="message">Registrate para tener total acceso a nuestra web. </p>
          <div className="flex">
            <label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="input"
              />
            </label>
            <label>
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="input"
              />
            </label>
          </div>
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />
          </label>
          <div className="mb-3">
            <select name="role" value={formData.role} onChange={handleChange} className="form-select">
              <option value="USER">Usuario</option>
              <option value="ADMIN">Vendedor</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="submit">
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={() => navigate('/login')} className="signin">Ya tengo una cuenta</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

