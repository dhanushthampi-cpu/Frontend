import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:8081/products") // fetch all products initially
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Fetch all categories separately
  useEffect(() => {
    axios
      .get("http://localhost:8081/products/types") // fetch all unique types
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? p.type === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 🔍 Search */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring focus:ring-blue-400"
        />
      </div>

      {/* 🏷️ Categories */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === ""
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
 
      {/* 📦 Product Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {filteredProducts.map((p) => (
    <Link key={p.id} to={`/product/${p.id}`}>
      <div className="p-4 border rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
        <h3 className="text-lg font-semibold">{p.name}</h3>
        <p className="text-sm text-gray-500">{p.type}</p>
        <p className="text-sm text-gray-700 mt-2 font-medium">
          {p.merchants.length} merchant(s) selling:
        </p>

        <div className="mt-2 space-y-1">
          {p.merchants.map((m) => (
            <p key={m.merchantId} className="text-gray-800">
              {m.merchantName}: ${m.price} ({m.stock} in stock)
            </p>
          ))}
        </div>
      </div>
    </Link>
  ))}
</div>


    </div>
  );
}
