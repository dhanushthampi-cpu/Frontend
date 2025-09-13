import { Star } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function ReviewsSection({ reviews, productId, selectedMerchant }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async () => {
    if (!selectedMerchant) return alert("Select a merchant first");

    try {
      await axios.post(`http://localhost:8081/products/${productId}/merchants/${selectedMerchant.merchantId}/reviews`, {
        userId: user.userId,
        rating,
        comment,
        merchantId: selectedMerchant.merchantId
      });
      alert("Review submitted!");
      setRating(5);
      setComment("");
      // You may want to refresh product data here
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
        <div className="mt-6">
      <h2 className="font-semibold mb-2">Reviews:</h2>
      {reviews.length === 0 && <p>No reviews yet</p>}
      {reviews.map((r, idx) => (
        <div key={idx} className="border-b py-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{r.userName || r.userId}</span> 
            <span className="text-yellow-400">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 inline" />
              ))}
            </span>
          </div>
          <p className="text-gray-700">{r.comment}</p>
        </div>
      ))}


      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-semibold">Leave a Review:</h3>
        <select value={rating} onChange={e => setRating(Number(e.target.value))} className="border p-1 rounded w-24">
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star</option>)}
        </select>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write your review"
          className="border p-2 rounded"
        />
        <button onClick={handleSubmitReview} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Review
        </button>
      </div>
    </div>
  );
}
