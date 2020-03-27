import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./Components/Home.js";
import Form from "./Components/Form.js";


function App () {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">
          <button name = 'homebutton'>Home</button>
        </Link>
        <Link to="/form">
          <button name = 'orderbutton'>Order</button>
        </Link>
      </nav>
    <div classNAme="app">
     <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/form" component={Form}/>
    
        </Switch>
      </div>
    </Router>

  );
};
export default App;
