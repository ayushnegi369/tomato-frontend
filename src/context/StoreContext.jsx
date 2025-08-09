import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Creating a context for global state management
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // State to manage cart items with their quantities
    const [cartItems, setCartItems] = useState({});

    // Backend API URL (read from env for deployments)
    const url =
        "https://tomato-project-backend.onrender.com";

    // State to store the user token (for authentication)
    const [token, setToken] = useState("");

    // State to store the list of food items fetched from the backend
    const [food_list, setFoodList] = useState([]);

    /**
     * Function to add an item to the cart.
     * It updates the cartItems state and sends the data to the backend if the user is authenticated.
     * @param {string} itemId - The ID of the item to add to the cart.
     */
    const addToCart = async (itemId) => {
        // If the item is not in the cart, add it with a quantity of 1
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        // If the item is already in the cart, increase its quantity by 1
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        // If the user is authenticated, send the updated cart data to the backend
        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            );
        }
    };

    /**
     * Function to remove an item from the cart.
     * It decreases the quantity of the item and updates the cartItems state.
     * It also sends the update to the backend if the user is authenticated.
     * @param {string} itemId - The ID of the item to remove from the cart.
     */
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        // If the user is authenticated, update the cart in the backend
        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            );
        }
    };

    /**
     * Function to calculate the total amount of the items in the cart.
     * It loops through all items in the cart and calculates the total based on the quantity and price.
     * @returns {number} - The total cart amount.
     */
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        // Loop through cart items and calculate the total price
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Find the item in the food list by matching the item ID
                let itemInfo = food_list.find(
                    (product) => product._id === item
                );
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    };

    /**
     * Function to clear the cart after order placement.
     */
    const clearCart = () => {
        setCartItems({});
    };

    /**
     * Fetch the list of food items from the backend API.
     * It sets the retrieved data in the food_list state.
     */
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    /**
     * Load the user's cart data from the backend using their authentication token.
     * @param {string} token - The user's authentication token.
     */
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get",
                {},
                {
                    headers: {
                        token: token,
                    },
                }
            );
            // Set the cart items based on the response data from the server
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // useEffect hook to load initial data when the component is mounted
    useEffect(() => {
        async function loadData() {
            // Fetch the food list from the backend
            await fetchFoodList();

            // If a token is found in local storage, set the token state and load the cart data
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    // The context value that will be provided to all child components
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        clearCart, // Add clearCart to context
    };

    return (
        // Providing the context value to all child components
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
