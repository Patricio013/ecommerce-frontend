import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCarrito = createAsyncThunk(
  'carrito/fetchCarrito',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState(); 
    try {
      const res = await fetch('http://localhost:4002/carrito', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 403) throw new Error('No tienes autorización para ver el carrito.');
        throw new Error('Error al obtener el carrito.');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const quitarProducto = createAsyncThunk(
  'carrito/quitarProducto',
  async (productId, { getState, rejectWithValue }) => {
    const { auth } = getState(); 
    try {
      const res = await fetch(`http://localhost:4002/carrito/quitar?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      if (!res.ok) throw new Error('Error al quitar el producto.');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const vaciarCarrito = createAsyncThunk(
  'carrito/vaciarCarrito',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState(); 
    try {
      const res = await fetch('http://localhost:4002/carrito/vaciar', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      if (!res.ok) throw new Error('Error al vaciar el carrito.');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const modificarCantidad = createAsyncThunk(
  'carrito/modificarCantidad',
  async ({ productId, nuevaCantidad }, { getState, rejectWithValue }) => {
    const { auth } = getState(); 
    try {
      const res = await fetch(
        `http://localhost:4002/carrito/modificarCantidad?productId=${productId}&nuevaCantidad=${nuevaCantidad}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Error al modificar la cantidad.');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const realizarPedido = createAsyncThunk(
  'carrito/realizarPedido',
  async ({ productos, direccion, metodoPago }, { getState, rejectWithValue }) => {
    const { auth } = getState(); 
    try {
      const res = await fetch('http://localhost:4002/pedidos/realizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ productos, direccion, metodoPago }),
      });

      if (!res.ok) throw new Error('Error al realizar el pedido.');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    productos: [],
    precioTotal: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarrito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarrito.fulfilled, (state, action) => {
        state.productos = action.payload.productos;
        state.precioTotal = action.payload.precioTotal;
        state.loading = false;
      })
      .addCase(fetchCarrito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(quitarProducto.fulfilled, (state, action) => {
        state.productos = action.payload.productos;
        state.precioTotal = action.payload.precioTotal;
      })
      .addCase(vaciarCarrito.fulfilled, (state) => {
        state.productos = [];
        state.precioTotal = 0;
      })
      .addCase(modificarCantidad.fulfilled, (state, action) => {
        state.productos = action.payload.productos;
        state.precioTotal = action.payload.precioTotal;
      })
      .addCase(realizarPedido.fulfilled, (state) => {
        state.productos = [];
        state.precioTotal = 0;
      });
  },
});

export default carritoSlice.reducer;