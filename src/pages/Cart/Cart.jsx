import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    // Destructure necessary values and functions from the StoreContext
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
        useContext(StoreContext);

    const navigate = useNavigate(); // For navigating between routes

    return (
        <div className="cart">
            {/* Cart items display section */}
            <div className="cart-items">
                {/* Header row for cart items */}
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />

                {/* Map through the food_list and display cart items if they exist in cartItems */}
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                {/* Each cart item row */}
                                <div className="cart-items-title cart-items-item">
                                    {/* Item image */}
                                    <img
                                        src={url + "/images/" + item.image}
                                        alt=""
                                    />
                                    {/* Item name */}
                                    <p>{item.name}</p>
                                    {/* Item price */}
                                    <p>${item.price}</p>
                                    {/* Quantity of the item in the cart */}
                                    <p>{cartItems[item._id]}</p>
                                    {/* Total price for the item (price * quantity) */}
                                    <p>${item.price * cartItems[item._id]}</p>
                                    {/* Remove item from cart */}
                                    <p
                                        onClick={() => removeFromCart(item._id)}
                                        className="cross"
                                    >
                                        x
                                    </p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                })}
            </div>

            {/* Cart bottom section with totals and checkout button */}
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        {/* Subtotal display */}
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />

                        {/* Delivery fee display */}
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />

                        {/* Total amount display */}
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>
                                $
                                {getTotalCartAmount() === 0
                                    ? 0
                                    : getTotalCartAmount() + 2}
                            </b>
                        </div>
                    </div>

                    {/* Button to proceed to checkout page */}
                    <button onClick={() => navigate("/order")}>
                        PROCEED TO CHECKOUT
                    </button>
                </div>

                {/* Promo code input section */}
                <div className="cart-promocode">
                    <div>
                        {/* Instruction for promo code */}
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            {/* Promo code input field */}
                            <input type="text" placeholder="promo code" />
                            {/* Button to submit promo code */}
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
