import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LineGraph from "../Graphs/lineGraph";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      states: "",
      crop: "",
    };
  }
  username = "ABCD";
  statename = "Assam";

  reportGenerateHandler = () => {
    // const promise = await fetch("/model/post", {
    //   // Adding method type
    //   method: "POST",

    //   // Adding body or contents to send
    //   body: JSON.stringify({
    //     title: "foo",
    //     body: "bar",
    //     userId: 1,
    //   }),

    //   // Adding headers to the request
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // });
    // const data = await promise.then();
    //data.then(this.setState({ crop: "Rice", loaded: !this.state.loaded }));
    this.setState({ crop: "Rice" });
    this.setState({ loaded: !this.state.loaded });
  };

  render() {
    const graph = this.state.loaded ? (
      <LineGraph cropName={this.state.crop} load={this.state.loaded} />
    ) : null;

    return (
      <Container>
        <Row>
          <h2>Hello, {this.username}</h2>
        </Row>
        <Row>
          <Col>
            <p>Generate report for {this.statename}</p>
            <Button onClick={this.reportGenerateHandler} variant="success">
              Generate report
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={6}>{graph}</Col>
          <Col md={6}>{graph}</Col>
        </Row>
        <Row>
          <Col md={6}>{graph}</Col>
          <Col md={6}>{graph}</Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
