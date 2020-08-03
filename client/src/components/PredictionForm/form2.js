import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import cc from "./form.module.css";

class ProductionForm extends Component {
  state = { loaded: false };

  changeHandler = (key, val) => {
    const obj = {};
    obj[key] = val;
    this.setState({
      ...obj,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    //check for empty
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        state: this.state.state,
        crop: this.state.crop,
        season: this.state.season,
        area: parseFloat(this.state.area),
      }),
    };

    fetch("/py/productionnew", options)
      .then((data) => data.json())
      .then((json) => this.setState({ ...json, loaded: !this.state.loaded }));
  };
  render() {
    const data = this.state.loaded && (
      <div>
        <h6>
          The estimated production for {this.state.area} hectares:{" "}
          {this.state.output[0].toFixed(2)} tonnes
        </h6>
      </div>
    );
    return (
      <div>
        <Form>
          <Row>
            <Col>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="state"
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
          </Row>
          <Row>
            <Col>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="crop"
                placeholder="Crop"
                className={cc.formInputs}
              />
            </Col>
            <Col>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="area"
                placeholder="Area"
                className={cc.formInputs}
              />
            </Col>
          </Row>
          <Button className={cc.submitBtn} onClick={this.handleClick}>
            Submit
          </Button>
        </Form>
        {data}
      </div>
    );
  }
}

export default ProductionForm;
