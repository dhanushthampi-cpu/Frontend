import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 mb-4 inline-block">&larr; Back to Products</Link>

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-500 mb-4">{product.type}</p>
      <p className="mb-4">{product.description}</p>

      <h2 className="text-xl font-semibold mb-2">Merchants:</h2>
      <div className="space-y-2">
        {product.merchants.map((m) => (
          <div key={m.merchantId} className="p-3 border rounded-lg">
            <p className="font-medium">{m.merchantName}</p>
            <p>Price: ${m.price}</p>
            <p>Stock: {m.stock}</p>
            <p>Rating: {m.rating || "N/A"}</p>
            {m.reviews && m.reviews.length > 0 && (
              <div className="mt-1 text-sm text-gray-700">
                <p>Reviews:</p>
                <ul className="list-disc ml-5">
                  {m.reviews.map((r, idx) => (
                    <li key={idx}>{r.comment} ({r.rating}/5)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
