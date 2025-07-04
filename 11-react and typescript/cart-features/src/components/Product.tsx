import React, { useReducer } from "react";
import type { ProductTypes } from "../types/productTypes";
import { CartEvents, useCart } from "../context/CartContext";

type Props = {
  product: ProductTypes;
};

export enum actionType {
  Increment,
  Decrement,
}

const intialstate = 1;

const quantityReducer = (state: number, action: actionType): number => {
  switch (action) {
    case actionType.Increment:
      return state + 1;

    case actionType.Decrement:
      return state > 1 ? state - 1 : 1;
  }
};
const Product = ({ product }: Props) => {
  const [count, dispatch] = useReducer(quantityReducer, intialstate);
  const { cartDispatch } = useCart();
  return (
    <div className="product-card">
      <h1 className="product-title">{product.name}</h1>
      <div className="product-img">
        <img src={product.img} alt="" />
      </div>
      <span className="product-price">Price: Rs. {product.price}</span>
      <span className="product-category">Category: {product.categories}</span>
      <div className="product-desc">{product.desc}</div>{" "}
      <button
        className="increment"
        onClick={() => dispatch(actionType.Increment)}
      >
        +
      </button>
      <span className="product-quantity"> {count} </span>
      <button
        className="decrement"
        onClick={() => dispatch(actionType.Decrement)}
      >
        -
      </button>
      <button
        onClick={() =>
          cartDispatch({
            type: CartEvents.ADD_TO_CART,
            payload: { ...product, quantity: count },
          })
        }
        className="btn-add"
      >
        {" "}
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
