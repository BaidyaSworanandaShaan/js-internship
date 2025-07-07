import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";
import type { ProductTypes } from "../types/productTypes";

export enum CartEvents {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
}

export type CartItem = ProductTypes & { quantity: number };

type CartState = {
  cart: CartItem[];
};

type CartAction =
  | { type: CartEvents.ADD_TO_CART; payload: CartItem }
  | { type: CartEvents.REMOVE_FROM_CART; payload: number }
  | { type: CartEvents.INCREMENT; payload: number }
  | { type: CartEvents.DECREMENT; payload: number };

const getCartFromStorage = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

const initialState: CartState = {
  cart: getCartFromStorage(),
};

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case CartEvents.ADD_TO_CART: {
//       const existing = state.cart.find((item) => item.id === action.payload.id);
//       if (existing) {
//         return {
//           ...state,
//           cart: state.cart.map((item) =>
//             item.id === action.payload.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//         };
//       }
//       return {
//         ...state,
//         cart: [
//           ...state.cart,
//           { ...action.payload, quantity: action.payload.quantity },
//         ],
//       };
//     }

//     case CartEvents.REMOVE_FROM_CART:
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload),
//       };

//     case CartEvents.INCREMENT:
//       return {
//         ...state,
//         cart: state.cart.map((item) =>
//           item.id === action.payload
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ),
//       };

//     case CartEvents.DECREMENT:
//       return {
//         ...state,
//         cart: state.cart.map((item) =>
//           item.id === action.payload
//             ? { ...item, quantity: Math.max(1, item.quantity - 1) }
//             : item
//         ),
//       };

//     default:
//       return state;
//   }
// };

// const CartContext = createContext<{
//   state: CartState;
//   cartDispatch: React.Dispatch<CartAction>;
// }>({
//   state: initialState,
//   cartDispatch: () => {},
// });

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [state, cartDispatch] = useReducer(cartReducer, initialState);
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(state.cart));
//   }, [state.cart]);
//   return (
//     <CartContext.Provider value={{ state, cartDispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
type CartContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
