"use client";

import { useRouter } from "next/navigation";
import { productsService } from "@/lib/services/products";
import ProductForm from "@/components/forms/ProductForm";
import api from "@/lib/api";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const { images, ...productData } = data;
    const product = await productsService.create(productData);
    
    if (images && images.length > 0) {
      try {
        const formData = new FormData();
        for (const imageUrl of images) {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: blob.type });
          formData.append("files", file);
        }
        await api.post(`/v1/products/${product.id}/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        console.error("Failed to add images:", err);
      }
    }
    
    router.push(`/admin/products/${product.id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
