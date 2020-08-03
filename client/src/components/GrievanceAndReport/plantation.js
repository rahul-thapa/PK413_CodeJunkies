import React, { Component } from "react";
import { Card, InputGroup } from "react-bootstrap";
import style from "./style.module.css";
import { API } from "../../backend/api";
import FarmerNav from "../Dashboard/farmerNav";

class Signin extends Component {
  state = {
    name: "",
    crop: "",
    area: 0,
    district: "",
  };

  // Simple POST request with a JSON body using fetch
  handleSubmit = () => {
    const newData = {
      name: this.state.name,
      crop: this.state.crop,
      area: this.state.area,
      district: this.state.district,
    };

    console.log(newData);

    fetch(`http://localhost:5000/api/plantationreport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    }).then((response) => response.json());
    window.location.href = "/dashboard";
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangeQuantity = (e) => {
    this.setState({ crop: e.target.value });
  };
  onChangeArea = (e) => {
    this.setState({ area: e.target.value });
  };
  onChangeDistrict = (e) => {
    this.setState({ district: e.target.value });
  };
  render() {
    return (
      <div>
        <FarmerNav />
        <Card className={style.card}>
          <h3>Please fill the form to file a Plantation Report</h3>
          <div className={style.row}>
            <input
              className={style.names}
              type="text"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.onChangeName}
            />
            <input
              className={style.names}
              type="text"
              placeholder="Enter Crop"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
            />
            <input
              className={style.names}
              type="text"
              placeholder="Enter District"
              value={this.state.district}
              onChange={this.onChangeDistrict}
            />
            <input
              className={style.names}
              type="text"
              placeholder="Enter Area"
              value={this.state.area}
              onChange={this.onChangeArea}
            />
          </div>
          <button onClick={this.handleSubmit}>Submit</button>
        </Card>
      </div>
    );
  }
}

export default Signin;
