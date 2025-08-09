import React from "react"; // Import React to create the functional component
import "./ExploreMenu.css"; // Import the CSS file for styling the component
import { menu_list } from "../../assets/assets"; // Import the list of menu items from assets

const ExploreMenu = ({ category, setCategory }) => {
    return (
        // Main container with class 'explore-menu' for styling, and an id for anchor linking
        <div className="explore-menu" id="explore-menu">
            {/* Heading of the explore menu section */}
            <h1>Explore our menu</h1>
            {/* Text description of the menu */}
            <p className="explore-menu-text">
                Choose from a diverse menu featuring a delectable array of
                dishes. Our mission is to satisfy your cravings and elevate your
                dining experience, one delicious meal at a time.
            </p>
            {/* Container to hold the list of menu items */}
            <div className="explore-menu-list">
                {/* Map through the menu_list array to display each menu item */}
                {menu_list.map((item, index) => {
                    return (
                        <div
                            // On clicking a menu item, toggle between selecting that category or showing "All"
                            onClick={() =>
                                setCategory(
                                    (prev) =>
                                        prev === item.menu_name
                                            ? "All" // Deselect the category if already selected
                                            : item.menu_name // Select the clicked category
                                )
                            }
                            key={index} // Unique key for each mapped element
                            className="explore-menu-list-item"
                        >
                            {/* Display the menu image, and add 'active' class if the category is selected */}
                            <img
                                className={
                                    category === item.menu_name ? "active" : ""
                                }
                                src={item.menu_image}
                                alt={item.menu_name}
                            />
                            {/* Display the name of the menu item */}
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
            {/* Divider line */}
            <hr />
        </div>
    );
};

export default ExploreMenu;
