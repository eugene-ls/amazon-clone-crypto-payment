"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { productsService } from "@/lib/services/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { ShoppingBag, Heart } from "lucide-react";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const cartCount = useCartStore((state) => state.count);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const wishlistCount = useWishlistStore((state) => state.count);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await productsService.getAll();
        setFeaturedProducts(products.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
      fetchWishlist();
    }
    
    loadProducts();
  }, [fetchCart, fetchWishlist]);

  return (
    <div className="w-full">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Your Style
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of fashion-forward pieces designed for the modern lifestyle
          </p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {["Men", "Women", "Accessories", "Sale"].map((cat, i) => (
            <Link key={cat} href={`/products?category=${cat.toLowerCase()}`}>
              <motion.div
                className="relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-700 group-hover:text-black transition-colors">
                    {cat}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              href="/products"
              className="text-gray-600 hover:text-black transition-colors"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
