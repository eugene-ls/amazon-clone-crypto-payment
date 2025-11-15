// frontend/app/admin/products/new/page.tsx
"use client";

import { productsService } from "@/lib/services/products";
import ProductForm from "@/components/forms/ProductForm";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Create Product</h1>

      <ProductForm
        onSubmit={async (data) => {
          const product: any = await productsService.create(data);

          // здесь TS может ругаться на тип Route – пофиг, делаем any
          router.push(`/admin/products/${product.id}` as any);
        }}
      />
    </div>
  );
}