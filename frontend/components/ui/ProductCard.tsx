import Link from "next/link";

type ProductCardProps = {
  product: any;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col gap-2">
      <h2 className="font-semibold text-lg">{product.name ?? "No name"}</h2>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description ?? "No description"}
      </p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="font-bold">
          {product.price ? `${product.price} $` : "—"}
        </span>

        <Link
          href={`/products/${product.id}`}
          className="text-blue-600 text-sm hover:underline"
        >
          Details
        </Link>
      </div>
    </div>
  );
}