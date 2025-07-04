// src/data/products.ts

import type { Product } from "../types/ProductTypes";

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    img: "https://via.placeholder.com/150",
    categories: "electronics",
    desc: "High-quality wireless headphones with noise cancellation.",
    price: 199.99,
  },
  {
    id: 2,
    name: "Smart Watch",
    img: "https://via.placeholder.com/150",
    categories: "electronics",
    desc: "Track your fitness, notifications, and more with this smart watch.",
    price: 149.99,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    img: "https://via.placeholder.com/150",
    categories: "accessories",
    desc: "Ergonomic gaming mouse with customizable RGB lighting.",
    price: 59.99,
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    img: "https://via.placeholder.com/150",
    categories: "accessories",
    desc: "Mechanical keyboard with tactile switches for a satisfying typing experience.",
    price: 89.99,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    img: "https://via.placeholder.com/150",
    categories: "audio",
    desc: "Portable Bluetooth speaker with rich sound and deep bass.",
    price: 79.99,
  },
];
