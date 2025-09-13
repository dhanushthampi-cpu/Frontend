import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import { useState } from "react";
import {
  getPlaceholderImage,
  getBestPrice,
  getTotalStock,
} from "../utils/ProductHelpers";
 import { getProductImage } from "../utils/ProductHelpers";
export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const bestPrice = getBestPrice(product);
  const totalStock = getTotalStock(product);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden bg-gray-200">
        

<img
  src={getProductImage(product)}
  alt={product.name}
  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
    imageLoaded ? "opacity-100" : "opacity-0"
  }`}
  onLoad={() => setImageLoaded(true)}
  onError={(e) => {
    e.target.src = getPlaceholderImage(product);
  }}
/>


        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-green-600">${bestPrice}</span>
            <span className="text-sm text-gray-500 ml-2">
              {totalStock} in stock
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <ShoppingBag className="w-4 h-4" />
            <span>{product.merchants?.length || 0} sellers</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
