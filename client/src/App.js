import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LineGraph from "./components/Graphs/lineGraph";
import Header from "./components/Header/header";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";
import Homepage from "./components/Homepage/homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Dashboard />
        {/* <Homepage /> */}
      </div>
    </Router>
  );
}

export default App;
