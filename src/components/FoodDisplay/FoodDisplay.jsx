import React, { useContext } from "react"; // Import React and useContext hook
import "./FoodDisplay.css"; // Import the CSS file for styling the component
import { StoreContext } from "../../context/StoreContext"; // Import the StoreContext for accessing global state
import FoodItem from "../FoodItem/FoodItem"; // Import the FoodItem component to display individual food items

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext); // Access food_list from the StoreContext

    return (
        // Main container for the food display section
        <div className="food-display" id="food-display">
            {/* Title of the section */}
            <h2>Top dishes near you</h2>
            {/* Container to hold the list of food items */}
            <div className="food-display-list">
                {/* Map through the food_list to display food items */}
                {food_list.map((item, index) => {
                    // Check if the category is "All" or if the item's category matches the selected category
                    if (category === "All" || category === item.category)
                        return (
                            <FoodItem
                                key={index} // Unique key for each food item
                                id={item._id} // ID of the food item
                                name={item.name} // Name of the food item
                                description={item.description} // Description of the food item
                                price={item.price} // Price of the food item
                                image={item.image} // Image of the food item
                            />
                        );
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
