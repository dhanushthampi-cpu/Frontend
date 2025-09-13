import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { getAvailableMerchants, getAllReviews, getAvgRating, getProductImage } from "../../utils/ProductHelpers";

import ProductImages from "../../components/ProductImages";
import ProductInfo from "../../components/ProductInfo";
import ReviewsSection from "../../components/ReviewsSection";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:8081/products/${id}`)
      .then(res => {
        setProduct(res.data);
        if (res.data.merchants?.length > 0) setSelectedMerchant(res.data.merchants[0]);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const merchantsAvailable = getAvailableMerchants(product);
  const reviews = getAllReviews(product);
  const avgRating = getAvgRating(product);

  const handleAddToCart = () => {
    if (!selectedMerchant) return;
    addToCart({
      productId: product.id,
      merchantId: selectedMerchant.merchantId,
      quantity: 1,
      price: selectedMerchant.price,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/" className="text-blue-600 mb-4 inline-block">&larr; Back</Link>

      <div className="flex flex-col md:flex-row gap-8">
        <ProductImages images={product.images} product={product} />
        <ProductInfo 
          product={product} 
          avgRating={avgRating} 
          merchantsAvailable={merchantsAvailable} 
          selectedMerchant={selectedMerchant} 
          setSelectedMerchant={setSelectedMerchant} 
          handleAddToCart={handleAddToCart} 
        />
      </div>

      <ReviewsSection reviews={reviews} productId={product.id} selectedMerchant={selectedMerchant} />
    </div>
  );
}
