import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducto = createAsyncThunk(
  'producto/fetchProducto',
  async ({ id, token }) => {
    const response = await fetch(`http://localhost:4002/productosUser/PorProducto?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('No se pudo obtener el producto');
    return response.json();
  }
);

export const agregarAlCarrito = createAsyncThunk(
  'producto/agregarAlCarrito',
  async ({ id, cantidad, token }) => {
    const response = await fetch(
      `http://localhost:4002/carrito/agregar?productId=${id}&cantidad=${cantidad}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Error desconocido');
    }

    return await response.json();
  }
);

const productoSlice = createSlice({
  name: 'producto',
  initialState: { producto: null, mensaje: '', error: null, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducto.fulfilled, (state, action) => {
        state.producto = action.payload;
        state.status = 'succeeded';
      })
      .addCase(agregarAlCarrito.fulfilled, (state, action) => {
        state.mensaje = 'Producto agregado al carrito exitosamente';
        state.status = 'succeeded';
      });
  },
});

export default productoSlice.reducer;