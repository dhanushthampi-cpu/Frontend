import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Home from './pages/Home.jsx';
import AddProduct from './pages/AddProduct.jsx';
import MerchantDashboard from './pages/MerchantDashboard.jsx';
import EditProduct from './pages/EditProduct.jsx'; // make sure this exists
import ProductDetail from "./pages/ProductDetail.jsx";
function App() {
  const role = localStorage.getItem("role"); // "MERCHANT" or "USER"

  return (
   
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<Home />} />

        {/* Merchant Routes (Protected) */}
        <Route
          path="/merchant/dashboard"
          element={
            role === "MERCHANT" ? <MerchantDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/merchant/add-product"
          element={
            role === "MERCHANT" ? <AddProduct /> : <Navigate to="/" />
          }
        />
        <Route
          path="/merchant/edit-product/:id"
          element={
            role === "MERCHANT" ? <EditProduct /> : <Navigate to="/" />
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default App;
