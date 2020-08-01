import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LineGraph from "../Graphs/lineGraph";
import ProductionForm from "../PredictionForm/form";
import cc from "./dashboard.module.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      states: "",
      crop: "",
      input: {
        state: "Assam",
        season: "Kharif",
      },
      recommendation: {
        season: "Kharif",
        loaded: false,
        Output: [],
      },
    };
  }
  username = "ABCD";
  statename = "Assam";

  reportGenerateHandler = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        state: this.state.input.state,
        season: this.state.input.season,
      }),
    };
    fetch("/py/recommendation", options)
      .then((data) => data.json())
      .then((json) =>
        this.setState({
          recommendation: {
            ...this.state.recommendation,
            loaded: true,
            ...json,
          },
        })
      );
    //data.then(this.setState({ crop: "Rice", loaded: !this.state.loaded }));
    this.setState({ crop: "Rice" });
    this.setState({ loaded: !this.state.loaded });
  };

  render() {
    return (
      <Container>
        <Row>
          <h2>Hello, {this.username}</h2>
        </Row>
        <Row>
          <Col md={6}>
            <div className={cc.colBox}>
              <h3>Predict production</h3>
              <ProductionForm />
            </div>
          </Col>
          <Col md={6}>
            <div className={cc.colBox}>
              <h3>
                Generate recommended crops for {this.state.input.state} for the{" "}
                {this.state.input.season} season
              </h3>
              <Button onClick={this.reportGenerateHandler} variant="success">
                Generate report
              </Button>
              <div>
                {this.state.recommendation.loaded ? (
                  <p>These are the most suitable crops for your area:</p>
                ) : null}
                {this.state.recommendation.Output.map((el, ind) => (
                  <p>
                    {ind + 1}. {el}
                  </p>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {this.state.recommendation.Output.map((el) => (
            <Col md={6}>
              <LineGraph
                recommendedCropList={this.state.recommendation}
                cropName={el}
                load={this.state.recommendation.loaded}
                season={this.state.input.season}
                key={el}
                state={this.state.input.state}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
