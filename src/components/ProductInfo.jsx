import { Star } from "lucide-react";

export default function ProductInfo({ product, avgRating, merchantsAvailable, selectedMerchant, setSelectedMerchant, handleAddToCart }) {
  return (
    <div className="md:w-1/2 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-500">{product.type}</p>
      <p>{product.description}</p>

      {avgRating && (
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-5 h-5" /> {avgRating} / 5
        </div>
      )}

      <div>
        <h2 className="font-semibold mb-2">Select Merchant:</h2>
        {merchantsAvailable.length > 0 ? (
          <select
            value={selectedMerchant?.merchantId}
            onChange={(e) => setSelectedMerchant(
              merchantsAvailable.find(m => m.merchantId === e.target.value)
            )}
            className="border rounded p-2 w-full"
          >
            {merchantsAvailable.map(m => (
              <option key={m.merchantId} value={m.merchantId}>
                {m.merchantName} - ${m.price} ({m.stock} in stock)
              </option>
            ))}
          </select>
        ) : <p className="text-red-500">Out of stock</p>}
      </div>

      <button 
        onClick={handleAddToCart}
        disabled={!selectedMerchant}
        className={`mt-4 px-6 py-3 rounded-xl text-white font-semibold transition ${!selectedMerchant ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
      >
        Add to Cart
      </button>
    </div>
  );
}
