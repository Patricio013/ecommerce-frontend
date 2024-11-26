import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPedidosUser = createAsyncThunk(
  'pedidos/fetchPedidosUser',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const res = await fetch('http://localhost:4002/pedidos/ObtenerTodosUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!res.ok) throw new Error('Error al obtener los pedidos.');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const pedidosUserSlice = createSlice({
  name: 'pedidosUser',
  initialState: {
    pedidos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidosUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPedidosUser.fulfilled, (state, action) => {
        state.pedidos = action.payload;
        state.loading = false;
      })
      .addCase(fetchPedidosUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pedidosUserSlice.reducer;
