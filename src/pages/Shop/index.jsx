import React, { useState } from "react";

const products = [
  {
    id: 1,
    type: "Gem",
    name: "Blue Sapphire",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnMzOEypO938yPFISxDuXVhm3nU-xQ78FvHQ&s",
    price: "LKR 85,000",
  },
  {
    id: 2,
    type: "Gem",
    name: "Loose Emerald",
    image: "https://www.nektanewyork.com/cdn/shop/files/2.27CARATEMERALDCUTNATURALVIVIDGREENEMERALDLOOSEGEMSTONE.jpg?v=1708379359",
    price: "LKR 120,000",
  },
  {
    id: 3,
    type: "Jewellery",
    name: "Ruby Stud Earrings",
    image: "https://sterlingwilde.co.uk/cdn/shop/files/STW162c.jpg?v=1720958106",
    price: "LKR 45,000",
  },
  {
    id: 4,
    type: "Jewellery",
    name: "White Diamond Pendant",
    image: "https://tiesh.lk/wp-content/uploads/2024/11/18k-white-gold-double-halo-diamond-pendant-300x300.jpg.webp",
    price: "LKR 200,000",
  },
];

const categories = ["Gem", "Jewellery"]; // ONLY two categories

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("Gem"); // DEFAULT = GEM

  const filteredProducts = products.filter(
    (p) => p.type === activeCategory
  );

  return (
    <div className="bg-white min-h-screen px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Shop Our Collection
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Discover premium Sri Lankan gems and jewellery.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border font-semibold transition ${
              activeCategory === cat
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded-t-xl"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-blue-600 font-bold mt-2">{product.price}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No items available in this category.
        </p>
      )}
    </div>
  );
}
