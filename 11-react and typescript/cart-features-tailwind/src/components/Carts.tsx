import React from "react";
import { CartEvents, useCart } from "../context/CartContext";
import { actionType } from "./Product";
import { useNavigate } from "react-router";

const Carts = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const handleProductQuantity = (productId: number, action: actionType) => {
    const itemExists = cartItems.find((item) => item.id === productId);

    if (itemExists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  action === actionType.Increment
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1),
              }
            : item
        )
      );
    }
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };

  const removeFromCart = (productId: number) => {
    const newCartItem = cartItems.filter((item) => item.id != productId);

    setCartItems(newCartItem);
  };
  console.log(cartItems);
  return (
    <div>
      <h2 className="text-3xl font-bold mb-10">Cart Items:</h2>

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <div key={index}>
              <div className="cart-item flex bg-[#F6F6F6] p-3 gap-7  mb-1 max-md:flex-col max-md:items-center ">
                <img
                  src={item.img}
                  alt=""
                  className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover"
                />
                <div className="flex  w-full justify-around items-center max-md:flex-col text-center ">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-950 max-md:text-xl">
                      {item.name}
                    </h3>
                    <span className="font-bold text-lg block max-md:text-xl ">
                      Rs. {item.price}
                    </span>
                  </div>
                  <div className="flex-1 cart-increment-btn">
                    <button
                      className="increment btn-add bg-black p-3 text-white my-5  hover:bg-white hover:text-black"
                      onClick={() =>
                        handleProductQuantity(item.id, actionType.Increment)
                      }
                    >
                      +
                    </button>
                    <span className="product-quantity text-lg px-5">
                      {" "}
                      {item.quantity}{" "}
                    </span>

                    <button
                      className="decrement btn-add bg-black p-3 text-white my-5  hover:bg-white hover:text-black"
                      onClick={() =>
                        handleProductQuantity(item.id, actionType.Decrement)
                      }
                    >
                      -
                    </button>
                  </div>
                  <span className="product-price text-xl font-bold flex-1">
                    Rs. {Number(item.quantity) * Number(item.price)}
                  </span>
                  <div className="flex-1">
                    {" "}
                    <button
                      className="cart-item-delete bg-red-700 p-2 text-white rounded-md border-none block"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-5 items-center ">
            <h2 className="font-bold text-2xl">
              Total Price : Rs.
              {cartItems
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </h2>

            <button
              className="bg-black text-white p-4"
              onClick={handleCheckout}
            >
              CHECKOUT{" "}
            </button>
          </div>
        </>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default Carts;
