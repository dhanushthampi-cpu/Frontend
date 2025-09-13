import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Home from "./pages/user/Home.jsx";
import AddProduct from "./pages/merchant/AddProduct.jsx";
import MerchantDashboard from "./pages/merchant/MerchantDashboard.jsx";
import EditProduct from "./pages/merchant/EditProduct.jsx";
import ProductDetail from "./pages/user/ProductDetail.jsx";
import CartPage from "./pages/user/CartPage.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import Layout from "./layouts/Layout.jsx";

function App() {
  const role = localStorage.getItem("role"); // "MERCHANT" or "USER"

  return (
    <CartProvider>
      <Routes>
        {/* Public routes (no Navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with Layout (Navbar included) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Merchant routes (protected) */}
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
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
