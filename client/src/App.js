import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LineGraph from "./components/Graphs/lineGraph";
import Header from "./components/Header/header";
import Dashboard from "./components/Dashboard/dashboard";
import Farmerlogin from "./components/Auth/farmerLogin";
import Govtlogin from "./components/Auth/govtLogin";
import Farmersignup from "./components/Auth/farmerSignup";
import Govtsignup from "./components/Auth/govtSignup";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/farmer/login" component={Farmerlogin} />
          <Route path="/govt/login" component={Govtlogin} />
          <Route path="/farmer/signup" component={Farmersignup} />
          <Route path="/govt/signup" component={Govtsignup} />
          {/* <Route path="/farmers" component={Farmers} />
          <Route path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
