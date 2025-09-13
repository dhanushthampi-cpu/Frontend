import { useCart } from "../../context/CartContext.jsx";

export default function CartPage() {
  const { cart, updateItem, removeItem, clearCart } = useCart();

  if (!cart || !cart.items || cart.items.length === 0) {
    return <div className="p-6 text-center">Your cart is empty 🛒</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.items.map((item, idx) => (
        <div key={idx} className="p-4 border rounded mb-3 flex justify-between items-center">
          <div>
            <p className="font-medium">Product: {item.productId}</p>
            <p>Merchant: {item.merchantId}</p>
            <p>Price: ${item.price}</p>
            <input
              type="number"
              min="1"
              value={item.quantity}
              className="border p-1 w-16 mt-2"
              onChange={(e) =>
                updateItem({ ...item, quantity: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => removeItem(item.productId, item.merchantId)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        onClick={clearCart}
      >
        Clear Cart
      </button>
    </div>
  );
}
