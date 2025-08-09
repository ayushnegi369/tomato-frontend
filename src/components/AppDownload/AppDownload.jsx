import React from "react"; // Import React to create the functional component
import "./AppDownload.css"; // Import the CSS file for styling the component
import { assets } from "../../assets/assets"; // Import assets (such as images for app download buttons)

const AppDownload = () => {
    return (
        // Main container with class 'app-download' for styling, and an id for anchor linking
        <div className="app-download" id="app-download">
            {/* Paragraph encouraging users to download the app */}
            <p>
                For Better Experience Download <br /> Tomato App
                {/* Container for app store and play store download images */}
                <div className="app-download-platforms">
                    {/* Play Store download image */}
                    <img src={assets.play_store} alt="Google Play Store" />
                    {/* App Store download image */}
                    <img src={assets.app_store} alt="Apple App Store" />
                </div>
            </p>
        </div>
    );
};

export default AppDownload;
