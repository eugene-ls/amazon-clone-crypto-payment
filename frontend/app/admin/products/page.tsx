"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productsService } from "@/lib/services/products";
import { Edit, Trash2, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import api from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsService.getAll();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productsService.delete(id);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Link href="/admin/products/new">
          <div className="group flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-gray-400 hover:bg-gray-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm group-hover:bg-gray-50">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500 group-hover:text-gray-700">
              Add New Product
            </p>
          </div>
        </Link>

        {products.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
          >
            <div className="aspect-square w-full bg-gray-100 overflow-hidden">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 text-sm font-semibold mb-2">{product.name}</h3>
              <p className="text-base font-bold text-gray-900 mb-4">
                {product.price?.toLocaleString()} Kč
              </p>

              <div className="mt-auto flex gap-2">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
