import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
    // State to manage the selected food category, default is "All"
    const [category, setCategory] = useState("All");

    return (
        <div>
            {/* Header component which likely contains the site's header or navigation */}
            <Header />

            {/* ExploreMenu component to allow users to select food categories */}
            {/* Passes 'category' as the current selected category and 'setCategory' to update it */}
            <ExploreMenu category={category} setCategory={setCategory} />

            {/* FoodDisplay component to show food items based on the selected category */}
            {/* The selected category is passed as a prop to filter the displayed items */}
            <FoodDisplay category={category} />

            {/* AppDownload component which likely contains information to download the mobile app */}
            <AppDownload />
        </div>
    );
};

export default Home;
