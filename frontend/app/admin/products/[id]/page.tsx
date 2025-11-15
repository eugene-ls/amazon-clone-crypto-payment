import { productsService } from "@/lib/services/products";
import ProductForm from "@/components/forms/ProductForm";

export default async function ProductEditPage({ params }: { params: { id: string } }) {
  const product = await productsService.getOne(Number(params.id));

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Edit Product #{params.id}</h1>

      <ProductForm
        initialValues={product}
        onSubmit={async (data) => {
          await productsService.update(Number(params.id), data);
        }}
      />
    </div>
  );
}