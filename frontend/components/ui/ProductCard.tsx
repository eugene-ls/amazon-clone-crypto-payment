"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    images?: string[];
    description?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (wishlisted) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const imageUrl = product.images?.[0] || "/images/placeholder.jpg";

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {!imageError ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${
              wishlisted ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-black">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString()} Kč
            </span>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
