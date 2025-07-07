import React from "react";
import Products from "./Products";
import Carts from "./Carts";

const Home = () => {
  return (
    <div className="w-[80%] mx-auto my-10">
      <Products />
      <Carts />
    </div>
  );
};

export default Home;
