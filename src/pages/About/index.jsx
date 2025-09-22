import React from "react";

export default function About() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-[url('/logo.jpg')] bg-cover bg-center h-[400px] flex items-center justify-center">
        <div className="bg-black bg-opacity-50 p-10 rounded">
          <h1 className="text-white text-4xl md:text-5xl font-bold">About Namal Gomuwa Gems</h1>
          <p className="text-gray-300 mt-4 text-lg">Crafting elegance through authentic Sri Lankan gemstones.</p>
        </div>
      </div>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <img
          src="/logo.jpg"
          alt="Gemstones Display"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At Namal Gomuwa Gems, we specialize in sourcing and curating the finest gems Sri Lanka has to offer.
            With decades of experience in gem trading and jewellery craftsmanship, our mission is to bring you
            timeless beauty through ethically sourced, authentic pieces.
          </p>
        </div>
      </section>

      {/* Mission / Vision Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
            <p className="text-gray-700">To deliver world-class gemstones with a touch of Sri Lankan heritage.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🌍 Our Vision</h3>
            <p className="text-gray-700">To become a globally trusted brand in the gem and jewellery industry.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">💎 Our Values</h3>
            <p className="text-gray-700">Authenticity, Transparency, Craftsmanship, and Local Empowerment.</p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        <img
          src="/logo.jpg"
          alt="Founder Namal"
          className="w-40 h-40 rounded-full object-cover shadow-md"
        />
        <div>
          <h3 className="text-2xl font-bold mb-2">Meet Namal</h3>
          <p className="text-gray-700 text-lg">
            Founder of Namal Gomuwa Gems, Namal has been in the gemstone industry for over 20 years. His passion for rare
            stones and commitment to fair trade practices is what drives the business forward.
          </p>
        </div>
      </section>
    </div>
  );
}
