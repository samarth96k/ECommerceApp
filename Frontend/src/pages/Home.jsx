import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import Bestseller from "../components/Bestseller";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";
function Home(){
    return(<>
    <Hero />
    <LatestCollection />
    <Bestseller/>
    <OurPolicy />
    <NewsLetter />
    </>);
}

export default Home;