import React, { useReducer, useState } from "react";
import type { ProductTypes } from "../types/productTypes";
import { CartEvents, useCart, type CartItem } from "../context/CartContext";

type Props = {
  product: CartItem;
};

export enum actionType {
  Increment,
  Decrement,
}

const Product = ({ product }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { cartItems, setCartItems } = useCart();

  const handleProductQuantity = (action: actionType) => {
    if (action === actionType.Increment) {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };
  const handleAddToCart = (cartItem: CartItem) => {
    const itemExist = cartItems.find((item) => item.id === cartItem.id);
    if (itemExist) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: cartItem.quantity }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, cartItem]);
    }
  };
  console.log(cartItems);
  return (
    <div className="bg-[#F6F6F6] p-4 sm:w-[375px] w-full rounded-xl flex flex-col gap-4 mx-auto">
      {/* Image */}
      <div className="w-full h-[250px] sm:h-[300px] overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={product.img}
          alt=""
        />
      </div>

      {/* Title */}
      <h1 className="text-blue-950 font-semibold text-lg sm:text-xl">
        {product.name}
      </h1>

      {/* Price */}
      <span className="text-base sm:text-lg font-bold block">
        Price: Rs. {product.price}
      </span>

      {/* Category */}
      <span className="text-sm sm:text-base text-gray-500">
        {product.categories}
      </span>

      {/* Description */}
      <div className="leading-6 sm:leading-7 text-sm sm:text-base">
        {product.desc}
      </div>

      {/* Quantity Controls */}
      <div className="text-center flex items-center justify-center gap-4 mt-2">
        <button
          className="text-xl sm:text-2xl bg-white p-2 sm:p-3 rounded-md shadow-sm"
          onClick={() => handleProductQuantity(actionType.Increment)}
        >
          +
        </button>

        <span className="text-xl sm:text-2xl font-bold">{quantity}</span>

        <button
          className="text-xl sm:text-2xl bg-white p-2 sm:p-3 rounded-md shadow-sm"
          onClick={() => handleProductQuantity(actionType.Decrement)}
        >
          -
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        className="bg-black p-3 text-white my-4 hover:bg-white hover:text-black transition-colors"
        onClick={() => handleAddToCart({ ...product, quantity })}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
