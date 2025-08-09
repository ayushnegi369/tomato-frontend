import React from "react"; // Import React
import "./Footer.css"; // Import the CSS file for styling the footer
import { assets } from "../../assets/assets"; // Import assets such as images and icons

const Footer = () => {
    return (
        // Main container for the footer
        <div className="footer" id="footer">
            <div className="footer-content">
                {/* Left section of the footer */}
                <div className="footer-content-left">
                    {/* Logo of the company */}
                    <img src={assets.logo} alt="Company Logo" />
                    {/* Description of the company or service */}
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab ad eum eaque, maiores assumenda dolorum quos sunt
                        doloremque ducimus voluptates! Animi corporis ullam
                        adipisci aperiam cumque sequi officia aspernatur dolore?
                        Quasi beatae, officiis nesciunt consequuntur doloribus
                        excepturi labore eos voluptates vitae velit saepe
                        repellat ratione consectetur! Reiciendis, rem. Quis
                        expedita repellat tempora doloribus in esse illo quas
                        corrupti quo laborum!
                    </p>
                    {/* Social media icons for the company */}
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="Facebook" />
                        <img src={assets.twitter_icon} alt="Twitter" />
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>
                {/* Center section of the footer with company links */}
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/* Right section of the footer with contact information */}
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            {/* Copyright information */}
            <p className="footer-copyright">
                Copyright 2024 @ Tomato.com - All Right Reserved
            </p>
        </div>
    );
};

export default Footer;
