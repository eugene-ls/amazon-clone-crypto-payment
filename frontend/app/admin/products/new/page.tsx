"use client";

import { productsService } from "@/lib/services/products";
import ProductForm from "@/components/forms/ProductForm";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  const submit = async (data: any) => {
    const product = await productsService.create(data);
    router.push(`/admin/products/${product.id}`);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>
      <ProductForm onSubmit={submit} />
    </div>
  );
}