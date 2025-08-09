import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Orders from "./pages/Orders";

const App = () => {
    // State to control the visibility of the LoginPopup
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {/* Conditionally render the LoginPopup component if 'showLogin' is true */}
            {showLogin ? <LoginPopup setShowLoginFunc={setShowLogin} /> : <></>}

            {/* Main application wrapper */}
            <div className="app">
                {/* Navbar component, passing setShowLogin function to control login popup */}
                <Navbar setShowLoginFunc={setShowLogin} />

                {/* Define routes for navigating between pages */}
                <Routes>
                    {/* Home page route */}
                    <Route path="/" element={<Home />} />

                    {/* Cart page route */}
                    <Route path="/cart" element={<Cart />} />

                    {/* Place Order page route */}
                    <Route path="/order" element={<PlaceOrder />} />

                    {/* Orders page route */}
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </div>

            {/* Footer component for the bottom of the page */}
            <Footer />
        </>
    );
};

export default App;
