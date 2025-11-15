import ProductCard from "@/components/ui/ProductCard";
import { productsService } from "@/lib/services/products";

export default async function ProductsPage() {
  const products = await productsService.getAll();

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