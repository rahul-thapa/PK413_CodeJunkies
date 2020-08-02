import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {};
  render() {
    // const loginOut = this.context.state.isLoggedIn ? (
    //   <Button
    //     onClick={() => {
    //       this.context.updateValue("isLoggedIn", false);
    //       localStorage.setItem("isLoggedIn", false);
    //     }}
    //   >
    //     {this.context.state.user}
    //   </Button>
    // ) : (
    //   <Login />
    // );

    return (
      <Navbar bg="success" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          CodeJunkies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav>
          <div id="google_translate_element"></div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
