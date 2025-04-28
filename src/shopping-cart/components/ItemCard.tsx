'use client';

import Image from "next/image";
import { IoAddCircleOutline, IoRemove, IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Product } from "@/products/data/products";
import { addProductToCart, removeProductFromCart, removeSingleItemFromCart } from '@/shopping-cart/actions/actions';

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCard = ({ product, quantity }: Props) => {
  const router = useRouter();


  const onAddToCart = () => {
    addProductToCart(product.id);
    router.refresh()
  }

  const onDeleteToCart = () => {
    removeProductFromCart(product.id);
    router.refresh()
  }

  function onRemoveAll() {
    removeSingleItemFromCart(product.id);
    router.refresh();
  }

  return (
    <div className="relative group flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] mb-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
      
      {/* Product Image */}
      <div className="relative z-10 w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 border-white/20 shadow-md">
        <Image
          fill
          className="object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
      
      {/* Product Info */}
      <div className="relative z-10 flex-grow px-4">
        <h3 className="text-lg font-bold text-white">{product.name}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-white/80">${product.price.toFixed(2)}</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">c/u</span>
        </div>
      </div>
      
      {/* Quantity Controls */}
      <div className="relative z-10 flex items-center space-x-4">
        <div className="flex items-center space-x-3 bg-white/10 rounded-full p-1">
          <button
            onClick={onDeleteToCart}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <IoRemove size={16} />
          </button>
          <span className="text-lg font-bold text-white w-6 text-center">{quantity}</span>
          <button
            onClick={onAddToCart}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <IoAddCircleOutline size={16} />
          </button>
        </div>
        
        {/* Total */}
        <div className="ml-4 text-right min-w-[80px]">
          <p className="text-lg font-bold text-white">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
        
        {/* Delete button */}
        <button 
          onClick={onRemoveAll}
          className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600"
        >
          <IoTrashOutline size={14} />
        </button>
      </div>
    </div>
  );
};