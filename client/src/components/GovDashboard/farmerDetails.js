import React, { Component } from "react";
import { Container } from "react-bootstrap";

class FarmerDetails extends Component {
  state = {};
  render() {
    return (
      <Container>
        {this.state.recommendation.loaded ? (
          <Row>
            <h4>Farmers in this district</h4>
          </Row>
        ) : null}
      </Container>
    );
  }
}

export default FarmerDetails;
