import React, { Component } from "react";
import { Card, InputGroup } from "react-bootstrap";
import style from "./style.module.css";

class Signin extends Component {
  state = {
    email: "testbug@gmail.com",
    password: "sih",
    newemail: "",
    newpassword: "",
  };

  handleSubmit = () => {
    if (
      this.state.newemail === this.state.email &&
      this.state.password === this.state.newpassword
    ) {
      window.location.href = "/govdashboard";
    } else {
      alert("Wrong Password or Email");
    }
  };

  onChangeEmail = (e) => {
    this.setState({ newemail: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ newpassword: e.target.value });
  };

  render() {
    return (
      <div>
        <Card className={style.card}>
          <h3>Govt. Login</h3>
          <input
            type="text"
            placeholder="Enter email"
            value={this.state.newemail}
            onChange={this.onChangeEmail}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={this.state.newpassword}
            onChange={this.onChangePassword}
          />
          <button onClick={() => this.handleSubmit()}>Submit</button>
          <a href="/govtsignup">Not Signed Up? Click Here to SignUp</a>
        </Card>
      </div>
    );
  }
}

export default Signin;
