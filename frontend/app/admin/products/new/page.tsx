"use client";

import { useRouter } from "next/navigation";
import { productsService } from "@/lib/services/products";
import ProductForm from "@/app/products/ProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>

      <ProductForm
        onSubmit={async (data) => {
          try {
            const product = await productsService.create(data);
            router.push(`/admin/products/${product.id}`);
          } catch (e) {
            console.error(e);
            alert("Ошибка при создании товара");
          }
        }}
      />
    </div>
  );
}