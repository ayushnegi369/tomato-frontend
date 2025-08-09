import { createRoot } from "react-dom/client";  // Import the ReactDOM method to render the application
import App from "./App.jsx";  // Import the main App component
import "./index.css";  // Import the global CSS file for styling
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter for enabling routing
import StoreContextProvider from "./context/StoreContext.jsx";  // Import StoreContextProvider for managing global state

// Create the root of the React application and render the components inside
createRoot(document.getElementById("root")).render(
    // Wrap the entire app with BrowserRouter for routing functionality
    <BrowserRouter>
        {/* Wrap the app with StoreContextProvider to provide global state/context to the entire application */}
        <StoreContextProvider>
            {/* Render the main App component */}
            <App />
        </StoreContextProvider>
    </BrowserRouter>
);
