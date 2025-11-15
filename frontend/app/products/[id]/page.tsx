import { productsService } from "@/lib/services/products";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const id = Number(params.id);
  const product = await productsService.getOne(id);

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">
        {product.description ?? "No description"}
      </p>

      <div className="text-lg font-semibold mb-4">
        Price: {product.price ? `${product.price} $` : "—"}
      </div>

      {/* сюда потом добавим кнопки: "Add to cart", "Add to wishlist" и т.п. */}
    </div>
  );
}