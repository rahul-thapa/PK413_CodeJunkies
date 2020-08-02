import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import BarGraph from "../Graphs/barGraph";
import ProductionForm from "../PredictionForm/form";
import cc from "./govDashboard.module.css";

class GovDash extends Component {
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

  changeHandler = (key, val) => {
    const obj = {};
    obj[key] = val;
    this.setState({
      ...obj,
    });
  };

  reportGenerateHandler = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        state: this.state.state,
        season: this.state.season,
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
        <Form>
          <h4>
            {/* Generate recommended crops for {this.state.input.state} for the{" "}
            {this.state.input.season} season */}
            Overview
          </h4>
          <Row>
            <Col md={6}>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="state"
                placeholder="State"
                className={cc.formInputs}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="season"
                placeholder="Season"
                className={cc.formInputs}
              />
            </Col>
          </Row>
          <Button
            className={cc.submitBtn}
            onClick={this.reportGenerateHandler}
            variant="success"
          >
            Submit
          </Button>
        </Form>

        <Row>
          <div>
            {this.state.recommendation.loaded ? (
              <p>These are the most suitable crops for this state:</p>
            ) : null}
            {this.state.recommendation.Output.map((el, ind) => (
              <p>
                {ind + 1}. {el}
              </p>
            ))}
          </div>
        </Row>

        {this.state.recommendation.loaded ? (
          <Row className={cc.graphRow}>
            {this.state.recommendation.Output.map((el) => (
              <Col className={cc.graphCol} md={6}>
                <BarGraph
                  recommendedCropList={this.state.recommendation}
                  cropName={el}
                  load={this.state.recommendation.loaded}
                  season={this.state.season}
                  key={el}
                  state={this.state.state}
                />
              </Col>
            ))}
          </Row>
        ) : null}
      </Container>
    );
  }
}

export default GovDash;
