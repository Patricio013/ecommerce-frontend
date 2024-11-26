import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPedidosAdmin = createAsyncThunk(
  'pedidosAdmin/fetchPedidosAdmin',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const res = await fetch('http://localhost:4002/pedidos/ObtenerTodosAdmin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!res.ok) throw new Error('Error al obtener los pedidos de administrador.');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const pedidosAdminSlice = createSlice({
  name: 'pedidosAdmin',
  initialState: {
    pedidos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidosAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPedidosAdmin.fulfilled, (state, action) => {
        state.pedidos = action.payload;
        state.loading = false;
      })
      .addCase(fetchPedidosAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pedidosAdminSlice.reducer;