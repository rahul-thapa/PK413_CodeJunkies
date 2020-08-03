import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import BarGraph from "../Graphs/line";
import cc from "./govDashboard.module.css";
import GovNav from "./govNav";

class GovDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      cropPrices: {},
      states: "",
      crop: "",
      input: {
        district: "",
        season: "",
        fert: 0,
      },
      recommendation: {
        season: "Kharif",
        loaded: false,
        Output: [],
      },
    };
  }
  changeHandler = (key, val) => {
    const obj = { ...this.state.input };
    obj[key] = val;
    this.setState({
      input: { ...obj },
    });
  };
  username = "ABCD";
  statename = "Assam";

  reportGenerateHandler = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        state: "Bihar",
        district: this.state.input.district.toUpperCase(),
        season: this.state.input.season,
        fert: this.state.input.fert,
      }),
    };
    fetch("/py/recommendationnew", options)
      .then((data) => data.json())
      .then((json) => {
        this.setState({
          recommendation: {
            ...this.state.recommendation,
            loaded: true,
            ...json,
          },
        });
      });
    //data.then(this.setState({ crop: "Rice", loaded: !this.state.loaded }));
    this.setState({ crop: "Rice" });
    this.setState({ loaded: !this.state.loaded });
  };

  render() {
    return (
      <Container>
        <GovNav />

        <Form>
          <h4>
            {/* Generate recommended crops for {this.state.input.state} for the{" "}
            {this.state.input.season} season */}
            Overview
          </h4>
          <Row>
            <Col>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="district"
                placeholder="District"
                className={cc.formInputs}
              />
            </Col>
            <Col>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="season"
                placeholder="Season"
                className={cc.formInputs}
              />
            </Col>
            <Col>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="fert"
                placeholder="Fertilizer(kg/hec)"
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
              <p>These are the most suitable crops for this district:</p>
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
              <Col className={cc.graphCol} md={12}>
                <BarGraph
                  recommendedCropList={this.state.recommendation}
                  cropName={el}
                  // cropName="Ragi"
                  load={this.state.recommendation.loaded}
                  season={this.state.input.season}
                  state={this.state.input.state}
                  district={this.state.input.district.toUpperCase()}
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
