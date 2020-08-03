import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

class FarmerDetails extends Component {
  state = {
    loaded: false,
    data: [],
  };

  componentDidMount() {
    fetch("/api/getallfarmers")
      .then((promise) => promise.json())
      .then((data) => this.setState({ data: data, loaded: true }));
  }

  render() {
    return (
      <Container>
        {this.state.loaded ? (
          <Row>
            <h4>Farmers in this district</h4>
          </Row>
          <Row>
            
          </Row>

        ) : null}
      </Container>
    );
  }
}

export default FarmerDetails;
