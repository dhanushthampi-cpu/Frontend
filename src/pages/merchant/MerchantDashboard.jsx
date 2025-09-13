import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MerchantDashboard() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token"); // use token for auth if backend requires

  useEffect(() => {
    axios
      .get("http://localhost:8081/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [token]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
        <Link
          to="/merchant/add-product"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.type}</p>
            <p className="mt-2 text-blue-600 font-bold">
              Merchants: {p.merchants?.length || 0}
            </p>
            <Link
              to={`/merchant/edit-product/${p.id}`}
              className="mt-2 inline-block bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
