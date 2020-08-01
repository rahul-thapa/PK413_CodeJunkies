import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LineGraph from "./components/Graphs/lineGraph";
import Header from "./components/Header/header";
import Dashboard from "./components/Dashboard/dashboard";
import Signin from "./components/Auth/signin";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signin" component={Signin} />
          {/* <Route path="/farmers" component={Farmers} />
          <Route path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
