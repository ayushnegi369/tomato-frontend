import React, { useContext } from "react"; // Import React and useContext hook
import "./FoodItem.css"; // Import the CSS file for styling the component
import { assets } from "../../assets/assets"; // Import assets such as images
import { StoreContext } from "../../context/StoreContext"; // Import the StoreContext for accessing global state

const FoodItem = ({ id, name, price, description, image }) => {
    // Access the cart items and functions to add/remove items from the cart from the StoreContext
    const { cartItems, addToCart, removeFromCart, url } =
        useContext(StoreContext);

    return (
        // Main container for the food item
        <div className="food-item">
            <div className="food-item-img-container">
                {/* Display the food item's image */}
                <img
                    className="food-item-img"
                    src={url + "/images/" + image}
                    alt={name}
                />
                {/* Conditional rendering based on whether the item is in the cart */}
                {!cartItems[id] ? (
                    // If the item is not in the cart, show the "add to cart" button
                    <img
                        className="add"
                        onClick={() => addToCart(id)} // Add item to cart when clicked
                        src={assets.add_icon_white}
                        alt="Add to cart"
                    />
                ) : (
                    // If the item is in the cart, show the item count and controls to modify the quantity
                    <div className="food-item-counter">
                        {/* Remove item from cart when clicked */}
                        <img
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove from cart"
                        />
                        {/* Display the current item count */}
                        <p>{cartItems[id]}</p>
                        {/* Add item to cart when clicked */}
                        <img
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add more"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    {/* Display the food item's name and rating */}
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                {/* Display the food item's description */}
                <p className="food-item-desc">{description}</p>
                {/* Display the food item's price */}
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
