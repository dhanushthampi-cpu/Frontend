import { useState } from "react";
import { getProductImage } from "../utils/ProductHelpers";

export default function ProductImages({ images, product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  const handleNext = () => setCurrentIndex((currentIndex + 1) % images.length);

  const displayImages = images && images.length > 0 ? images : [getProductImage(product)];

  return (
    <div className="md:w-1/2 relative">
      <img 
        src={displayImages[currentIndex]} 
        alt={product.name} 
        className="w-full h-96 object-cover rounded-2xl" 
      />
      {displayImages.length > 1 && (
        <>
          <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">&#8592;</button>
          <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">&#8594;</button>
        </>
      )}
    </div>
  );
}
