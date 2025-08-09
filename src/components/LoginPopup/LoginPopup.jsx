import React, { useContext, useState } from "react"; // Import necessary libraries and hooks
import "./LoginPopup.css"; // Import CSS file for styling
import { assets } from "../../assets/assets"; // Import assets for images
import { StoreContext } from "../../context/StoreContext"; // Import context for global state management
import axios from "axios"; // Import axios for making HTTP requests

const LoginPopup = ({ setShowLoginFunc }) => {
    // Access context values: API URL and function to set token
    const { url, setToken } = useContext(StoreContext);

    // State to track current form type (Login or Sign Up)
    const [currState, setCurrState] = useState("Sign Up");

    // State to hold form data for login/signup
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Handler for input changes
    const onChangeHandler = (event) => {
        const name = event.target.name; // Get the name of the input
        const value = event.target.value; // Get the input value
        // Update state with the new value
        setData((data) => ({ ...data, [name]: value }));
    };

    // Function to handle login/signup submission
    const onLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        let newUrl = url; // Start with base URL
        // Determine endpoint based on current state
        if (currState === "Login") {
            newUrl += "/api/user/login"; // Set URL for login
        } else {
            newUrl += "/api/user/register"; // Set URL for registration
        }

        // Make a POST request with form data
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            // On success, set token and store it in local storage
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLoginFunc(false); // Close the popup
        } else {
            alert(response.data.message); // Alert user with error message
        }
    };

    return (
        <div className="login-popup">
            {/* Form for login/signup */}
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    {/* Title of the popup */}
                    <h2>{currState}</h2>
                    {/* Close button */}
                    <img
                        onClick={() => setShowLoginFunc(false)} // Close popup on click
                        src={assets.cross_icon}
                        alt="Close"
                    />
                </div>
                <div className="login-popup-inputs">
                    {/* Conditionally render name input based on current state */}
                    {currState === "Login" ? (
                        <></>
                    ) : (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    )}

                    {/* Common inputs for email and password */}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="text"
                        placeholder="Your email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                {/* Submit button changes based on state */}
                <button type="submit">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                {/* Terms and conditions checkbox */}
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the T&C.</p>
                </div>
                {/* Conditional rendering for switch between Login and Sign Up */}
                {currState === "Login" ? (
                    <p>
                        Create a new Account ?{" "}
                        <span onClick={() => setCurrState("Sign Up")}>
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account ?{" "}
                        <span onClick={() => setCurrState("Login")}>
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
