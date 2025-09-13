import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
const userId = localStorage.getItem("userId");

useEffect(() => {
  if (!userId) {
    setCart({ items: [] });
    return;
  }

  axios
    .get(`http://localhost:8088/cart/${userId}`)
    .then(res => setCart(res.data))
    .catch(() => setCart({ items: [] }));
}, [userId]);
  const addToCart = async (item) => {
    const res = await axios.post(`http://localhost:8088/cart/${userId}/add`, item);
    setCart(res.data);
  };

  const updateItem = async (item) => {
    const res = await axios.put(`http://localhost:8088/cart/${userId}/update`, item);
    setCart(res.data);
  };

const removeItem = async (productId, merchantId) => {
  try {
    // Make sure you use the same userId as in the rest of your cart code
    const res = await axios.delete(
      `http://localhost:8088/cart/${userId}/remove/${productId}/${merchantId}`
    );
    setCart(res.data);
  } catch (err) {
    console.error("Failed to remove item:", err.response?.data || err.message);
  }
};

  const clearCart = async () => {
    await axios.delete(`http://localhost:8088/cart/${userId}/clear`);
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
