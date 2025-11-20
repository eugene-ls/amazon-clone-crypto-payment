"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productsService } from "@/lib/services/products";

type Product = {
  id: number;
  name: string;
  price: number;
  images?: string[]; // подстрои под свой бекенд
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const data = await productsService.getAll();
      setProducts(data);
    })();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        <Link href="/admin/products/new">
          <div className="group flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-400/70 bg-gray-100/40 transition hover:border-gray-700 hover:bg-gray-200/70">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60 shadow-sm group-hover:bg-white">
              <span className="text-5xl text-gray-400 group-hover:text-gray-700">
                +
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500 group-hover:text-gray-700">
              Добавить товар
            </p>
          </div>
        </Link>

        {products.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}`}
            className="block"
          >
            <div className="flex h-56 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">

              <div className="h-32 w-full bg-gray-100">
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col p-3">
                <h2 className="line-clamp-2 text-sm font-semibold">
                  {product.name}
                </h2>
                <span className="mt-auto text-base font-bold">
                  {product.price} Kč
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}