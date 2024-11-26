import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import catalogoReducer from './catalogoSlice';
import filtradoReducer from './filtradoSlice';
import productoReducer from './productoSlice';
import cartReducer from './cartSlice';
import pedidosUserReducer from './pedidosUserSlice';
import pedidosAdminReducer from './pedidosAdminSlice';
import productosAdminReducer from './productosAdminSlice';
import adminProductosReducer from './adminProductosSlice';
import crearProductoReducer from './crearProductoSlice';
import imagenReducer from './imagenSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    catalogo: catalogoReducer,
    categorias: filtradoReducer,
    producto: productoReducer,
    carrito: cartReducer,
    pedidosUser: pedidosUserReducer,
    pedidosAdmin: pedidosAdminReducer,
    productosAdmin: productosAdminReducer,
    adminProductos: adminProductosReducer,
    cProductos: crearProductoReducer,
    imagen: imagenReducer,
  },
});

export default store;