"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/forms/ProductForm";
import { productsService } from "@/lib/services/products";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>

      <ProductForm
        onSubmit={async (data) => {
          const product = await productsService.create(data);
          router.push(`/admin/products/${product.id}`);
        }}
      />
    </div>
  );
}