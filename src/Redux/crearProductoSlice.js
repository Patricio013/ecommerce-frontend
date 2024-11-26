import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategorias = createAsyncThunk(
  'productos/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4002/categorias/ObtenerCategorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al obtener categorías.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const crearProducto = createAsyncThunk(
  'productos/crearProducto',
  async (productoData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    try {
      const response = await fetch('http://localhost:4002/productosAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productoData),
      });

      if (!response.ok) throw new Error('Error al crear el producto.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const crearProductoSlice = createSlice({
  name: 'cProductos',
  initialState: {
    categorias: [],
    loadingCategorias: false,
    errorCategorias: null,
    creatingProducto: false,
    errorCrearProducto: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loadingCategorias = true;
        state.errorCategorias = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loadingCategorias = false;
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loadingCategorias = false;
        state.errorCategorias = action.payload;
      })
      .addCase(crearProducto.pending, (state) => {
        state.creatingProducto = true;
        state.errorCrearProducto = null;
      })
      .addCase(crearProducto.fulfilled, (state) => {
        state.creatingProducto = false;
      })
      .addCase(crearProducto.rejected, (state, action) => {
        state.creatingProducto = false;
        state.errorCrearProducto = action.payload;
      });
  },
});

export default crearProductoSlice.reducer;
