import { ProductCard } from "@/products";
import { products } from "@/products/data/products";


export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        }
      </div>
    </div>
  )
}