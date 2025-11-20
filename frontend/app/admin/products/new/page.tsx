"use client";

import { useRouter } from "next/navigation";
import { productsService } from "@/lib/services/products";
import ProductForm from "@/app/products/ProductForm";
// или откуда он у тебя импортится

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">Create Product</h1>

      <ProductForm
        onSubmit={async (data) => {
          const product: any = await productsService.create(data);

          router.push(`/admin/products/${product.id}`);
        }}
      />
    </div>
  );
}