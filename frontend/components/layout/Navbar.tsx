"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import api from "@/lib/api";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const cartCount = useCartStore((state) => state.count);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const wishlistCount = useWishlistStore((state) => state.count);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await api.get("/v1/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data);
          setIsAuthenticated(true);
          fetchCart();
          fetchWishlist();
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [fetchCart, fetchWishlist]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-black">
              Mazon
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/products" className="text-gray-700 hover:text-black transition-colors">
                Products
              </Link>
              <Link href="/products?category=men" className="text-gray-700 hover:text-black transition-colors">
                Men
              </Link>
              <Link href="/products?category=women" className="text-gray-700 hover:text-black transition-colors">
                Women
              </Link>
              <Link href="/products?category=sale" className="text-red-600 hover:text-red-700 transition-colors font-medium">
                Sale
              </Link>
            </nav>
          </div>

          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>

          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative">
              <Heart className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role?.id === 2 && (
                  <Link
                    href="/admin"
                    className="hidden md:block text-gray-700 hover:text-black transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link href="/profile" className="hidden md:block">
                  <User className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block text-gray-700 hover:text-black transition-colors"
                >
                  Logout
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              {isAuthenticated && (
                <>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  {user?.role?.id === 2 && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
