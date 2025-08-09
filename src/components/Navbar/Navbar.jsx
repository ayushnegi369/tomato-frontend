import React, { useContext, useState } from "react"; // Import necessary libraries and hooks
import "./Navbar.css"; // Import CSS file for styling
import { assets } from "../../assets/assets"; // Import assets for images
import { Link, useNavigate } from "react-router-dom"; // Import routing components
import { StoreContext } from "../../context/StoreContext"; // Import context for global state management

const Navbar = ({ setShowLoginFunc }) => {
    const [menu, setMenu] = useState("Home"); // State to track the current menu item

    // Access context values: function to get total cart amount, token, and function to set token
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate(); // Hook to programmatically navigate

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        setToken(""); // Clear token in context
        navigate("/"); // Redirect to homepage
    };

    return (
        <div className="navbar">
            {/* Logo linking to home page */}
            <Link to="/">
                <img src={assets.logo} alt="" className="logo" />
            </Link>
            <ul className="navbar-menu">
                {/* Links for navigation with active class based on state */}
                <Link
                    to="/"
                    onClick={() => setMenu("Home")}
                    className={menu === "Home" ? "active" : ""}
                >
                    Home
                </Link>
                <a
                    href="#explore-menu"
                    onClick={() => setMenu("Menu")}
                    className={menu === "Menu" ? "active" : ""}
                >
                    Menu
                </a>
                <a
                    href="#app-download"
                    onClick={() => setMenu("Mobile-App")}
                    className={menu === "Mobile-App" ? "active" : ""}
                >
                    Mobile App
                </a>
                <a
                    href="#footer"
                    onClick={() => setMenu("Contact-Us")}
                    className={menu === "Contact-Us" ? "active" : ""}
                >
                    Contact Us
                </a>
            </ul>
            <div className="navbar-right">
                {/* Search icon */}
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    {/* Link to cart with cart amount indicator */}
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    <div
                        className={getTotalCartAmount() === 0 ? "" : "dot"}
                    ></div>
                </div>
                {/* Conditional rendering for login button or profile menu */}
                {!token ? (
                    <button onClick={() => setShowLoginFunc(true)}>
                        Sign In
                    </button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        {/* Dropdown for user profile options */}
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate("/orders")}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
