import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Home from "./Components/Home.js";
import Form from "./Components/Form.js";


const App = () => {
  return (
    <div classNAme="app">
      <h1>Lambda Eats</h1>
      <h2>where progammers eat</h2>
      <br></br>
      <Route exact path="/" component={Home}/>
      <Route path="/form" component={Form}/>
      </div>

  );
};
export default App;
