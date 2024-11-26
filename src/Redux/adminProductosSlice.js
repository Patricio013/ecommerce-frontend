import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductosAdmin = createAsyncThunk(
  'adminProductos/fetchProductosAdmin',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    try {
      const response = await fetch(`http://localhost:4002/productosAdmin/Todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al obtener productos.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminProductosSlice = createSlice({
  name: 'adminProductos',
  initialState: {
    productos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductosAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductosAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      })
      .addCase(fetchProductosAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductosSlice.reducer;