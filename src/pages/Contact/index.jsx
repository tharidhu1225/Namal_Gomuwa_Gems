import React from "react";

export default function Contact() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-[url('/logo.jpg')] bg-cover bg-center h-[350px] flex items-center justify-center">
      </div>

      {/* Contact Info + Form Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Get In Touch</h2>
          <p className="text-gray-700">
            Whether you’re looking for a special gemstone, have a custom jewellery request, or simply want to know more
            about us – we’re here to help.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">📧 Email</h3>
              <a href="mailto:Jayasooriyatharidhu@gmail.com" className="text-blue-600 hover:underline">
                Jayasooriyatharidhu@gmail.com
              </a>
            </div>

            <div>
              <h3 className="font-semibold">📞 Phone</h3>
              <a href="tel:+94761918718" className="text-blue-600 hover:underline">
                +94 76 191 8718
              </a>
            </div>

            <div>
              <h3 className="font-semibold">🏠 Location</h3>
              <p>Namal Gomuwa, Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-gray-50 p-8 rounded-lg shadow-md space-y-6">
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <div>
            <label className="block mb-1 text-sm font-medium">Your Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              rows="5"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
