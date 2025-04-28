'use client'

import Image from "next/image"
import { IoAddCircleOutline, IoTrashOutline, IoStar, IoStarHalf } from "react-icons/io5"
import { FiShoppingBag } from "react-icons/fi"
import { addProductToCart, removeProductFromCart } from "@/shopping-cart/actions/actions"
import { useRouter } from 'next/navigation';

interface Props {
  id: string
  name: string
  price: number
  rating: number
  image: string
  category?: string
  discount?: number
}

export const ProductCard = ({ id, name, price, rating, image, category = "Electronics", discount = 0 }: Props) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(id);
    router.refresh()
  }

  const onDeleteToCart = () => {
    removeProductFromCart(id);
    router.refresh()
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Product Image with Badges */}
      <div className="relative h-56 w-full bg-gray-50">
        <Image
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        
        {/* Quick Add to Cart (shown on hover) */}
        <button className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <FiShoppingBag className="text-lg" />
          <span className="text-sm font-medium">Add to Cart</span>
        </button>
      </div>
      
      {/* Product Content */}
      <div className="p-4">
        {/* Category and Wishlist */}
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {category}
          </span>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Product Name */}
        <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400 mr-2">
            {[...Array(fullStars)].map((_, i) => (
              <IoStar key={`full-${i}`} className="w-4 h-4" />
            ))}
            {hasHalfStar && <IoStarHalf className="w-4 h-4" />}
            {[...Array(emptyStars)].map((_, i) => (
              <IoStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
            ))}
          </div>
          <span className="text-xs text-gray-500">({Math.floor(Math.random() * 100 + 10)})</span>
        </div>
        
        {/* Price Section */}
        <div className="flex items-end justify-between">
          <div>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through mr-2">${price.toFixed(2)}</span>
            )}
            <span className={`text-lg font-bold ${discount > 0 ? 'text-red-500' : 'text-indigo-600'}`}>
              ${(price * (1 - discount / 100)).toFixed(2)}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={onAddToCart}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
              <IoAddCircleOutline size={20} />
            </button>
            <button 
              onClick={onDeleteToCart}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
              <IoTrashOutline size={18} />
            </button>
          </div>
        </div>
        
        {/* Additional Info (shown on hover) */}
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between mb-1">
            <span>Shipping:</span>
            <span className="text-gray-700">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Stock:</span>
            <span className="text-green-500">Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}