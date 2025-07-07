import React, { useEffect, useState } from "react";

import Product from "./Product";
import { ProductTypes } from "../types/productTypes";
import { fetchProducts } from "../data/api";

const Products = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetchProducts();
      console.log(res);
      setProducts(res);
    };
    loadProducts();
  }, []);

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold mb-10 text-center ">
        List of Products
      </h2>
      <div className="flex flex-wrap justify-center xs:justify-between gap-4">
        {products.map((product) => (
          <div key={product.id} className="">
            <Product product={product} />
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Products;
