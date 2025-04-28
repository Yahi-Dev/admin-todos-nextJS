import { cookies } from "next/headers";
import { products, type Product } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import Link from "next/link";

export const metadata = {
  title: 'Carrito de Compras',
  description: 'SEO Title',
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: {[id:string]: number}): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for(const id of Object.keys(cart)){
    const product = products.find(prod => prod.id === id)
    if(product){
      productsInCart.push({product: product, quantity: cart[id]})
    }
  }

  return productsInCart;
}

export default async function CartPage() {
  const cookiesStore = await cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}');
  const productsInCart = getProductsInCart(cart);
  const subtotal = productsInCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-white">Carrito de Compras</h1>
            <p className="text-white/90 mt-2">Revisa y modifica los productos en tu carrito</p>
            <div className="absolute right-6 top-6 bg-white/10 px-3 py-1 rounded-full text-sm font-medium">
              {productsInCart.length} {productsInCart.length === 1 ? 'producto' : 'productos'}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product List */}
          <div className="lg:w-2/3">
            {productsInCart.length > 0 ? (
              <div className="space-y-4">
                {productsInCart.map(({product, quantity}) => (
                  <ItemCard key={product.id} product={product} quantity={quantity} />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white text-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
                <div className="relative z-10">
                  <p className="text-xl font-medium">Tu carrito está vacío</p>
                  <p className="text-white/80 mt-2">Agrega productos para comenzar</p>
                  <Link href='/dashboard/products' className="mt-7 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                    Ver productos
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg p-6 sticky top-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-5 pb-3 border-b border-white/20">
                  Resumen de compra
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/90">Subtotal</span>
                    <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">Envío</span>
                    <span className="font-medium text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">Inpuestos: </span>
                    <span className="font-medium text-white">${(Number(subtotal.toFixed(2)) / 4).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/20 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-2xl font-extrabold text-white">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-white text-blue-600 hover:bg-white/90 py-3 px-6 rounded-lg font-bold text-lg transition-all hover:shadow-md hover:scale-[1.02] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">PROCEDER AL PAGO</span>
                </button>

                <div className="mt-4 text-center text-xs text-white/60">
                  * Envío gratuito en todos los pedidos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}