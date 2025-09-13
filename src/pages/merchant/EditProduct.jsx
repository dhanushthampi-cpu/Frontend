import React from "react";
import useEditProduct from "../../hooks/useEditProduct";

export default function EditProduct() {
  const { product, handleChange, handleMerchantChange, handleSubmit } = useEditProduct();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Info - Editable */}
        <div className="bg-gray-50 p-4 rounded-2xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Product Info</h3>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Product Type"
            value={product.type}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="usp"
            placeholder="USP"
            value={product.usp}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Merchants Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Merchants</h3>
          {product.merchants.map((m, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-2xl shadow-sm bg-white"
            >
              <input
                type="text"
                placeholder="Merchant Name"
                value={m.merchantName || ""}
                onChange={(e) =>
                  handleMerchantChange(index, "merchantName", e.target.value)
                }
                className="w-full mb-2 p-2 border rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={m.price || ""}
                  onChange={(e) =>
                    handleMerchantChange(index, "price", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={m.stock || ""}
                  onChange={(e) =>
                    handleMerchantChange(index, "stock", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
