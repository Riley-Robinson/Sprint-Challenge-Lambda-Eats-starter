import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="home">
            <h1>Big MAMA's Pizza House!! </h1>
            <h2>build a pizza for any flavor that you Crave Sweety!</h2>
            <h3>click here to order your Pizza</h3>
            <Link className="flexin" to={"/form"}>
                <button className="order-here">Get Your Pizza Sweety!!'</button>
            </Link>
        </div>
    )
}

export default Home;