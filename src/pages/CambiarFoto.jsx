import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { subirImagen, resetState } from '../Redux/imagenSlice';

function CambiarFoto() {
    const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, successMessage, errorMessage } = useSelector((state) => state.imagen);

  const [imagen, setImagen] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      alert('Selecciona una imagen antes de enviar.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1]; 
      await dispatch(subirImagen({ id, imagen: base64Image }));
      alert('Imagen subida correctamente.');
    };

    reader.readAsDataURL(imagen); 
  };

  const handleReset = () => {
    dispatch(resetState());
    setImagen('');
    navigate(`/productoAdmin/${id}`);
  };

  return (
    <div className='contenidoC'>
        <div className="crear-producto-container">
            <div className="cambiar-imagen-container">
                <h1 className='titulo-principal'>Cambiar Imagen</h1>
                <form onSubmit={handleSubmit}>
                <label className="custum-file-upload">
                        {previewImage ? (
                        <>
                            <img
                            src={previewImage}
                            alt="Previsualización"
                            className="preview-image"
                            onClick={() => document.getElementById('file').click()}
                            />
                            <p className="change-text">Haz clic en la imagen para cambiar</p>
                        </>
                        ) : (
                        <>
                            <div className="iconCP">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path fill d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g>
                        </svg>
                            </svg>
                            </div>
                            <div className="textCP">
                            <span>Ingrese imagen</span>
                            </div>
                        </>
                        )}
                        <input
                        type="file"
                        id="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleImagenChange}
                        style={{ display: 'none' }}
                        />
                    </label>
                    <button type="submit" disabled={loading} className="submitF">
                    {loading ? 'Subiendo...' : 'Cambiar Imagen'}
                    </button>
                </form>
                <button onClick={handleReset} className="submitF">Volver</button>
                {successMessage && (
                    <div className="success-message">
                    <p>{successMessage}</p>
                    </div>
                )}
                {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
            </div>
        </div>
    </div>
  );
}

export default CambiarFoto;