import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategorias = createAsyncThunk(
  'categorias/fetchCategorias',
  async () => {
    const response = await fetch('http://localhost:4002/categorias/ObtenerCategorias');
    return response.json();
  }
);

export const filtrarProductos = createAsyncThunk(
  'categorias/filtrarProductos',
  async ({ filtros, token }) => {
    const nombresParam = filtros.join(',');
    const response = await fetch(`http://localhost:4002/categorias/filtro?nombres=${nombresParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error en el filtrado');
    return response.json();
  }
);

const filtradoSlice = createSlice({
  name: 'categorias',
  initialState: { categorias: [], productosFiltrados: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.categorias = action.payload;
        state.status = 'succeeded';
      })
      .addCase(filtrarProductos.fulfilled, (state, action) => {
        state.productosFiltrados = action.payload;
        state.status = 'succeeded';
      });
  },
});

export default filtradoSlice.reducer;
