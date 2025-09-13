import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function useEditProduct() {
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

  // Fetch product
  useEffect(() => {
    axios
      .get(`http://localhost:8081/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id, token]);

  // Input handlers
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

    if (!updatedMerchants[index].merchantId) {
      updatedMerchants[index].merchantId =
        updatedMerchants[index].merchantId || `m${index + 1}`;
    }

    setProduct((prev) => ({ ...prev, merchants: updatedMerchants }));
  };

  // Submit handler
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    for (let m of product.merchants) {
      if (!m.rating) m.rating = 0;
      if (!m.reviews) m.reviews = [];
      if (!m.merchantId)
        m.merchantId = `m${Math.random().toString(36).substr(2, 9)}`;

      // 👇 Add this to see what’s being sent
      console.log("Submitting merchant payload:", m);

     await axios.put(
  `http://localhost:8081/products/${id}`,
  { ...product },
  { headers: { Authorization: `Bearer ${token}` } }
);
    }
    navigate("/merchant/dashboard");
  } catch (err) {
    if (err.response) {
      // 👇 This shows the actual backend error message
      console.error("Backend error:", err.response.data);
    } else {
      console.error("Error updating product:", err.message);
    }
  }
};

  return {
    product,
    handleChange,
    handleMerchantChange,
    handleSubmit,
  };
}
