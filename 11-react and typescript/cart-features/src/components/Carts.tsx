import React from "react";
import { CartEvents, useCart } from "../context/CartContext";
import { actionType } from "./Product";
import { useNavigate } from "react-router";

const Carts = () => {
  const navigate = useNavigate();
  const { state, cartDispatch } = useCart();
  console.log(state);

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div>
      <h2>Cart Items:</h2>

      {state.cart.length > 0 ? (
        <>
          {state.cart.map((item, index) => (
            <div key={index}>
              <div className="cart-item">
                <h3>{item.name}</h3>
                <span>$ {item.price}</span>
                <button
                  className="increment"
                  onClick={() =>
                    cartDispatch({
                      type: CartEvents.INCREMENT,
                      payload: item.id,
                    })
                  }
                >
                  +
                </button>
                <span className="product-quantity"> {item.quantity} </span>
                <button
                  className="decrement"
                  onClick={() =>
                    cartDispatch({
                      type: CartEvents.DECREMENT,
                      payload: item.id,
                    })
                  }
                >
                  -
                </button>
                <span className="product-price">
                  Price : $ {Number(item.quantity) * Number(item.price)}
                </span>
                <button
                  className="cart-item-delete"
                  onClick={() =>
                    cartDispatch({
                      type: CartEvents.REMOVE_FROM_CART,
                      payload: item.id,
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h2>
            Total Price : $ $
            {state.cart
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </h2>

          <button onClick={handleCheckout}>CHECKOUT </button>
        </>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default Carts;
