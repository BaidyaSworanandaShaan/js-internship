import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Products from "./components/Products";
import Home from "./components/Home";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
