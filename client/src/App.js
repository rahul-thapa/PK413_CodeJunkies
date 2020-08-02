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
import Homepage from "./components/Homepage/homepage";
import GovDash from "./components/GovDashboard/govDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/farmerlogin" component={Farmerlogin} />
          <Route path="/govtlogin" component={Govtlogin} />
          <Route path="/farmersignup" component={Farmersignup} />
          <Route path="/govtsignup" component={Govtsignup} />
          <Route path="/govdashboard" component={GovDash} />
          {/* <Route path="/farmers" component={Farmers} />
          <Route path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
