import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../components/Styles/Login.css';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='login-page'>
      <div className='login-container d-flex justify-content-center align-items-center vh-100'>
        <div className='login-form p-4 shadow-lg rounded bg-white'>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-between gap-3 mt-4">
                <button type="submit" disabled={loading} className="btn btn-primary w-100">
                  {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
              </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="btn btn-secondary w-100" onClick={() => navigate('/register')}>Registrarme</button>
        </div>
      </div>
    </div>
  );
}

export default Login;