import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductoAdmin = createAsyncThunk(
  'productosAdmin/fetchProductoAdmin',
  async (id, { getState, rejectWithValue }) => { 
    const { auth } = getState(); 
    try {
      const response = await fetch(`http://localhost:4002/productosAdmin/PorProducto?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) throw new Error('Error al cargar el producto');
      const data = await response.json();
      return {
        ...data,
        categoriasIds: data.categorias.map((cat) => cat.id),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategorias = createAsyncThunk(
  'productosAdmin/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4002/categorias/ObtenerCategorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Error al cargar las categorías');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductoAdmin = createAsyncThunk(
  'productosAdmin/updateProductoAdmin',
  async ({ id, producto }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const payload = {
        titulo: producto.titulo,
        precio: producto.precioTotal,
        descripcion: producto.descripcion,
        stock: producto.stock,
        descuento: producto.descuento,
        estadoDescuento: producto.estadoDescuento,
        categoriasIds: Array.from(producto.categoriasIds || []),
      };

      const response = await fetch(`http://localhost:4002/productosAdmin/actualizar?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al actualizar el producto');
      return payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductoAdmin = createAsyncThunk(
  'productosAdmin/deleteProductoAdmin',
  async (id, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const response = await fetch(`http://localhost:4002/productosAdmin/borrar?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) throw new Error('Error al eliminar el producto');
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleCategoriaProducto = createAsyncThunk(
  'productosAdmin/toggleCategoriaProducto',
  async ({ productId, categoriaId, action }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const endpoint = action === 'add'
        ? `http://localhost:4002/productosAdmin/AgregarCat?productId=${productId}&categoriaId=${categoriaId}`
        : `http://localhost:4002/productosAdmin/BorrarCat?productId=${productId}&categoriaId=${categoriaId}`;
      const method = action === 'add' ? 'PUT' : 'DELETE';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) throw new Error('Error al modificar la categoría');
      return { productId, categoriaId, action };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productosAdminSlice = createSlice({
  name: 'productosAdmin',
  initialState: {
    producto: null,
    categoriasDisponibles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductoAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductoAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.producto = action.payload;
      })
      .addCase(fetchProductoAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriasDisponibles = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductoAdmin.fulfilled, (state, action) => {
        state.producto = action.payload;
      })
      .addCase(deleteProductoAdmin.fulfilled, (state) => {
        state.producto = null;
      })
      .addCase(toggleCategoriaProducto.fulfilled, (state, action) => {
        const { categoriaId, action: toggleAction } = action.payload;
        if (toggleAction === 'add') {
          state.producto.categoriasIds.push(categoriaId);
        } else {
          state.producto.categoriasIds = state.producto.categoriasIds.filter(
            (id) => id !== categoriaId
          );
        }
      });
  },
});

export default productosAdminSlice.reducer;
