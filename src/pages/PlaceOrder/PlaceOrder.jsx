import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url, clearCart } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        setLoading(true);
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item };
                itemInfo.quantity = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
        let totalAmount = getTotalCartAmount() + 2; // 2 is delivery fee
        try {
            // 1. Create Razorpay order from backend
            const orderRes = await axios.post(
                url + "/api/order/razorpay/order",
                { amount: totalAmount, currency: "INR" },
                { headers: { token } }
            );
            if (!orderRes.data.success) throw new Error("Failed to create payment order");
            const { id: razorpayOrderId, amount } = orderRes.data.order;

            // 2. Load Razorpay script
            const loaded = await loadRazorpayScript();
            if (!loaded) throw new Error("Failed to load Razorpay SDK");

            // 3. Open Razorpay checkout
            const options = {
                key: razorpayKey, // Use env variable for Razorpay key
                amount: amount,
                currency: "INR",
                name: "Tomato Food Delivery",
                description: "Order Payment",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    // 4. Verify payment and save order
                    try {
                        const verifyRes = await axios.post(
                            url + "/api/order/razorpay/verify",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                items: orderItems,
                                amount: totalAmount,
                                address: data,
                            },
                            { headers: { token } }
                        );
                        if (verifyRes.data.success) {
                            alert("Payment successful! Order placed.");
                            clearCart();
                            navigate("/orders");
                        } else {
                            alert(verifyRes.data.message || "Payment verification failed");
                        }
                    } catch (err) {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: data.firstName + " " + data.lastName,
                    email: data.email,
                    contact: data.phone,
                },
                theme: { color: "#F37254" },
            };
            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response) {
                alert("Payment failed: " + response.error.description);
            });
            rzp.open();
        } catch (err) {
            alert(err.message || "Order/payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="place-order" onSubmit={placeOrder}>
            {/* Left section: Delivery information */}
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
                    <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
                </div>
                <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
                <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
                <div className="multi-fields">
                    <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
                    <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
                </div>
                <div className="multi-fields">
                    <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
                    <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
                </div>
                <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
            </div>
            {/* Right section: Cart totals and order submission */}
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>
                                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                            </b>
                        </div>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "PROCEED TO PAYMENT"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
