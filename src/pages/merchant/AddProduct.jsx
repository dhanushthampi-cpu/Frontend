import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function AddProduct() {
  const { user } = useAuth(); // Logged-in user
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [usp, setUsp] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.userId) {
      setMessage("You must be logged in to add a product.");
      return;
    }

    try {
      // Step 1: Add product
      const productRes = await axios.post("http://localhost:8081/products", {
        name,
        type,
        usp,
        description,
        attributes: { color: "Default", size: "M" }, // dummy attributes
        images: image ? [image] : [], // optional image array
        merchants: [], // initially empty
      });

      const product = productRes.data;

      // Step 2: Add merchant info using logged-in user
      await axios.post(
        `http://localhost:8081/products/${product.id}/merchants`,
        {
          merchantName: user.name, // logged-in user's name
          merchantId: user.userId, // logged-in user's ID
          price: Number(price),
          stock: Number(stock),
          rating: 5, // default initial rating
          reviews: [], // optional initial reviews
        }
      );

      setMessage("Product added successfully!");
      // Reset form
      setName("");
      setType("");
      setUsp("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add product. See console for details.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Product Type (Electronics, Fashion, etc.)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="USP"
          value={usp}
          onChange={(e) => setUsp(e.target.value)}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
