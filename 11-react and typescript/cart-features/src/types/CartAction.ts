import type { CartEvents } from "../context/CartContext";
import type { CartItem } from "./CartItem";

export type CartAction =
  | { type: CartEvents.ADD_TO_CART; payload: CartItem }
  | { type: CartEvents.REMOVE_FROM_CART; payload: number }
  | { type: CartEvents.INCREMENT; payload: number }
  | { type: CartEvents.DECREMENT; payload: number };
