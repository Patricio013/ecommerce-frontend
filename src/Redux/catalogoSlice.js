import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategorias = createAsyncThunk(
  'catalogo/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:4002/categorias/ObtenerCategorias');
      if (!res.ok) {
        throw new Error('Error al obtener categorías');
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const catalogoSlice = createSlice({
  name: 'catalogo',
  initialState: {
    categorias: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default catalogoSlice.reducer;
