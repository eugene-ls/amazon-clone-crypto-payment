import ProductCard from "@/components/ProductCard";
import { productService } from "@/lib/services/products";

export default async function HomePage() {
  const res = await productService.getAll();
  const products = res.data;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}