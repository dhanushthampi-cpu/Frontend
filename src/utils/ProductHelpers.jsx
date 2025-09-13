// src/utils/ProductHelpers.js
// ProductHelpers.js
// src/utils/ProductHelpers.js
export const getProductImage = (product, index = 0) => {
  if (product.images && product.images.length > 0) {
    return product.images[index]; // use actual uploaded image
  }
  // fallback to placeholder
  const colors = { Electronics: "667eea", Fashion: "f093fb", default: "94a3b8" };
  const color = colors[product.type] || colors.default;
  return `https://via.placeholder.com/400x300/${color}/ffffff?text=${encodeURIComponent(
    product.name.replace(/[^a-zA-Z0-9]/g, "")
  )}`;
};


// Generate placeholder image if no images are provided
export const getPlaceholderImage = (product) => {
  const colors = {
    Electronics: "667eea",
    Fashion: "f093fb",
    Food: "fb923c",
    Books: "4ade80",
    Sports: "38bdf8",
    default: "94a3b8",
  };
  const color = colors[product.type] || colors.default;
  return `https://dummyimage.com/400x300/${color}/ffffff&text=${encodeURIComponent(
    product.name.replace(/[^a-zA-Z0-9]/g, "")
  )}`;
};

// Compute best price among merchants
export const getBestPrice = (product) => {
  if (!product.merchants || product.merchants.length === 0) return null;
  return Math.min(...product.merchants.map((m) => m.price));
};

// Compute total stock across merchants
export const getTotalStock = (product) => {
  if (!product.merchants || product.merchants.length === 0) return 0;
  return product.merchants.reduce((sum, m) => sum + (m.stock || 0), 0);
};

// Compute average rating
export const getAvgRating = (product) => {
  if (!product.merchants || product.merchants.length === 0) return null;
  const ratings = product.merchants.map((m) => m.rating || 0);
  const total = ratings.reduce((sum, r) => sum + r, 0);
  return (total / ratings.length).toFixed(1);
};

// Flatten reviews from all merchants
export const getAllReviews = (product) => {
  if (!product.merchants) return [];
  return product.merchants.flatMap((m) => m.reviews || []);
};

// Get available merchants with stock
export const getAvailableMerchants = (product) => {
  if (!product.merchants) return [];
  return product.merchants.filter((m) => m.stock > 0);
};
