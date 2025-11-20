"use client";


import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HEADER */}
      <header className="w-full border-b bg-white/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-3xl font-bold tracking-tight">Mazon</h1>

          <nav className="flex items-center gap-6 text-lg">
            <a href="#" className="hover:text-blue-600 transition">Men</a>
            <a href="#" className="hover:text-blue-600 transition">Women</a>
            <a href="#" className="hover:text-blue-600 transition">Kids</a>
            <a href="#" className="hover:text-blue-600 transition">Sale</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="/login" className="hover:text-blue-600 transition">Login</a>
            <a href="/register" className="hover:text-blue-600 transition">Register</a>
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 md:pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Step Into The World of
            <span className="text-blue-600"> Fashion</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Discover thousands of styles, premium clothing brands and exclusive deals.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-xl shadow hover:bg-blue-700 transition">
            Shop Now
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <img
            src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd47"
            className="rounded-3xl shadow-xl"
          />
        </motion.div>
      </section>

      {/* CATEGORY GRID */}
      <section className="max-w-7xl mx-auto p-8">
        <h3 className="text-3xl font-semibold mb-6">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Shoes", "Jackets", "Accessories", "Electronics"].map((cat, i) => (
            <motion.div
              key={i}
              className="relative h-48 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={`https://source.unsplash.com/random/400x400?${cat}`}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">{cat}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="max-w-7xl mx-auto p-8">
        <h3 className="text-3xl font-semibold mb-6">New Arrivals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="rounded-2xl border p-4 shadow hover:shadow-lg cursor-pointer transition"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={`https://source.unsplash.com/random/400x400?fashion-${i}`}
                className="rounded-xl mb-4"
              />

              <h4 className="font-semibold text-lg">Product {i}</h4>
              <p className="text-gray-500 text-sm mb-2">Premium quality fashion item</p>
              <p className="font-bold text-xl">${(i * 30).toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}