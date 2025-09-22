import React from "react";

// Dummy product data – Replace with your own later or use API
const products = [
  {
    id: 1,
    name: "Blue Sapphire Ring",
    image: "/images/products/blue-sapphire.jpg",
    price: "LKR 85,000",
  },
  {
    id: 2,
    name: "Emerald Necklace",
    image: "/images/products/emerald-necklace.jpg",
    price: "LKR 120,000",
  },
  {
    id: 3,
    name: "Ruby Stud Earrings",
    image: "/images/products/ruby-earrings.jpg",
    price: "LKR 45,000",
  },
  {
    id: 4,
    name: "White Diamond Pendant",
    image: "/images/products/diamond-pendant.jpg",
    price: "LKR 200,000",
  },
];

export default function Shop() {
  return (
    <div className="bg-white min-h-screen px-4 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Shop Our Gems
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Hand-picked, ethically sourced, and beautifully crafted pieces from Sri Lanka.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded-t-xl"
            />
            <div className="p-4">
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
    </div>
  );
}
