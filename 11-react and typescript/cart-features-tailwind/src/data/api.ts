import type { ProductTypes } from "../types/productTypes";
import axios from "axios";
export const fetchProducts = async (): Promise<ProductTypes[]> => {
  const res = await axios.get<ProductTypes[]>("/products.json");
  return res.data;
};
