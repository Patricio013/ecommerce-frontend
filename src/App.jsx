import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito';
import AdminProductos from './pages/AdminProductos';
import Filtrado from './pages/Filtrado';
import Producto from './pages/Producto';
import Navbar from './components/Navbar';
import PedidosUser from './pages/PedidosUser';
import CrearProducto from './pages/CrearProducto';
import ProductoAdmin from './pages/ProductoAdmin';
import PedidosAdmin from './pages/PedidosAdmin';
import { AuthProvider, useAuth } from './components/AuthProvider';


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { auth, logout } = useAuth(); // Ahora está dentro de un componente envuelto por AuthProvider

  return (
    <>
      <Navbar isAuthenticated={!!auth.token} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<AdminProductos />} />
        <Route path="/filtrado" element={<Filtrado />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/pedidosUser" element={<PedidosUser />} />
        <Route path="/crearProducto" element={<CrearProducto />} />
        <Route path="/productoAdmin/:id" element={<ProductoAdmin />} />
        <Route path="/pedidosAdmin" element={<PedidosAdmin />} />
      </Routes>
    </>
  );
}

export default App;


