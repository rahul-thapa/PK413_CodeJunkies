import React, { Component } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

class GovDash extends Component {
  state = {
    farmers: [
      {
        name: "Farmer A",
        district: "Place A",
      },
      {
        name: "Farmer B",
        district: "Place B",
      },
      {
        name: "Farmer C",
        district: "Place C",
      },
    ],
  };
  render() {
    return (
      <Container>
        <div>
          <Row>
            {this.state.farmers.map((el, ind) => {
              return (
                <Col md={4}>
                  <Card key={ind}>
                    <h4>Name: {el.name}</h4>
                    <h5>District: {el.district}</h5>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    );
  }
}

export default GovDash;
