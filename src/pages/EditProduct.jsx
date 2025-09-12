import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    name: "",
    type: "",
    description: "",
    usp: "",
    attributes: {},
    merchants: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
const handleMerchantChange = (index, field, value) => {
  const updatedMerchants = [...product.merchants];
  updatedMerchants[index][field] =
    field === "price" || field === "stock" || field === "rating"
      ? Number(value)
      : value;

  // Ensure merchantId is preserved
  if (!updatedMerchants[index].merchantId) {
    updatedMerchants[index].merchantId = updatedMerchants[index].merchantId || `m${index + 1}`;
  }

  setProduct((prev) => ({ ...prev, merchants: updatedMerchants }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    for (let m of product.merchants) {
      // Set defaults to avoid null issues
      if (!m.rating) m.rating = 0;
      if (!m.reviews) m.reviews = [];
      if (!m.merchantId) m.merchantId = `m${Math.random().toString(36).substr(2, 9)}`;

      await axios.post(
        `http://localhost:8081/products/${id}/merchants`,
        m,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    navigate("/merchant/dashboard");
  } catch (err) {
    console.error("Error updating product:", err);
  }
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Product Type"
          value={product.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="usp"
          placeholder="USP"
          value={product.usp}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Merchants */}
        <h3 className="text-lg font-semibold mt-4">Merchants</h3>
        {product.merchants.map((m, index) => (
          <div key={index} className="mb-2 p-2 border rounded">
            <input
  type="text"
  placeholder="Merchant Name"
  value={m.merchantName || ""}
  onChange={(e) =>
    handleMerchantChange(index, "merchantName", e.target.value)
  }
  className="w-full p-1 mb-1 border rounded"
/>
            <input
              type="number"
              placeholder="Price"
              value={m.price || ""}
              onChange={(e) =>
                handleMerchantChange(index, "price", e.target.value)
              }
              className="w-full p-1 mb-1 border rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={m.stock || ""}
              onChange={(e) =>
                handleMerchantChange(index, "stock", e.target.value)
              }
              className="w-full p-1 border rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
