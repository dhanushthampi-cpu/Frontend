import { useState } from "react";
import { ChevronLeft, ChevronRight, Grid, Smartphone, Shirt, Coffee, Book, Dumbbell } from "lucide-react";

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  const [showAll, setShowAll] = useState(false);

  const icons = {
    Electronics: Smartphone,
    Fashion: Shirt,
    Food: Coffee,
    Books: Book,
    Sports: Dumbbell,
    default: Grid
  };

  const getIcon = (cat) => {
    const Icon = icons[cat] || icons.default;
    return <Icon className="w-4 h-4" />;
  };

  const visibleCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Shop by Category</h3>
        {categories.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
          >
            {showAll ? 'Show Less' : 'Show All'}
            {showAll ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("")}
          className={`group relative px-6 py-3 rounded-2xl border-2 font-medium transition-all duration-300 flex items-center space-x-2 ${
            selectedCategory === "" ? "bg-blue-600 text-white border-transparent" : "bg-white border-gray-200 text-gray-700"
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>All Products</span>
        </button>

        {visibleCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`group relative px-6 py-3 rounded-2xl border-2 font-medium transition-all duration-300 flex items-center space-x-2 ${
              selectedCategory === cat ? "bg-blue-600 text-white border-transparent" : "bg-white border-gray-200 text-gray-700"
            }`}
          >
            {getIcon(cat)}
            <span>{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
