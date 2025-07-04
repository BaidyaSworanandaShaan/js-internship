import React from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { state } = useCart();
  return (
    <div>
      <h2>Order</h2>

      {state.cart.length > 0 ? (
        <div>
          {state.cart.map((item, index) => (
            <div key={index}>
              <div className="cart-item">
                <h3>{item.name}</h3>
                <span>$ {item.price}</span>
                <span className="product-quantity"> {item.quantity} </span>
                <span className="product-price">
                  Price : $ {Number(item.quantity) * Number(item.price)}
                </span>
              </div>
            </div>
          ))}
          <h2>
            Total:{" "}
            {state.cart
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </h2>
        </div>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default Checkout;
