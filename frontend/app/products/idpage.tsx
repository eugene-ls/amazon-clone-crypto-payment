import { productService } from "@/lib/services/products";

export default async function ProductPage({ params }: any) {
  const res = await productService.getOne(params.id);
  const product = res.data;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>

      <p className="mt-4 text-2xl font-bold">{product.price}$</p>
    </div>
  );
}