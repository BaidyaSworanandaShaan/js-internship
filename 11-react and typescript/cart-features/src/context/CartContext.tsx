import React, { createContext, useContext, useReducer, useEffect } from "react";

import type { CartState } from "../types/CartState";
import type { CartAction } from "../types/CartAction";

export enum CartEvents {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
}

const getCartFromStorage = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

const initialState: CartState = {
  cart: getCartFromStorage(),
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartEvents.ADD_TO_CART: {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, quantity: action.payload.quantity },
        ],
      };
    }

    case CartEvents.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case CartEvents.INCREMENT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case CartEvents.DECREMENT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  cartDispatch: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, cartDispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider value={{ state, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
