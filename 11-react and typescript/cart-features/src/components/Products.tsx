import React from "react";
import { products } from "../data/data";
import Product from "./Product";

const Products = () => {
  return (
    <div className="product-lists">
      {products.map((product) => (
        <div>
          <Product key={product.id} product={product} />
        </div>
      ))}{" "}
    </div>
  );
};

export default Products;
