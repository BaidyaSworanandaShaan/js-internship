import type { ProductTypes } from "./ProductTypes";

export type CartItem = ProductTypes & { quantity: number };
