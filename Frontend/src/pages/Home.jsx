import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import Bestseller from "../components/Bestseller";
function Home(){
    return(<>
    <Hero />
    <LatestCollection />
    <Bestseller/>
    </>);
}

export default Home;