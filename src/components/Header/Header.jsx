import React from "react"; // Import React
import "./Header.css"; // Import the CSS file for styling the header

const Header = () => {
    return (
        // Main container for the header
        <div className="header">
            <div className="header-contents">
                {/* Main heading for the header section */}
                <h2>Order your favourite food here</h2>
                {/* Description paragraph providing details about the food service */}
                <p>
                    Choose from a diverse menu featuring a delectable array of
                    dishes crafted with the finest ingredients and culinary
                    expertise. Our mission is to satisfy your cravings and
                    elevate your dining experience, one delicious meal at a
                    time.
                </p>
                {/* Button to view the menu */}
                <button>View Menu</button>
            </div>
        </div>
    );
};

export default Header;
