import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

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
    // options.body = new FormData();
    // let values = {
    //   state: this.state.state,
    //   crop: this.state.crop,
    //   season: this.state.season,
    //   area: parseFloat(this.state.area),
    // };

    // for (let key in values) {
    //   options.body.append(key, values[key]);
    //   console.log(values[key]);
    // }

    // console.log(options.body);

    fetch("/py/production", options)
      .then((data) => data.json())
      .then((json) => this.setState({ ...json, loaded: !this.state.loaded }));
  };
  render() {
    const data = this.state.loaded && (
      <div>
        <h4>
          The estimated production for {this.state.area} hectares:
          {this.state.production}
        </h4>
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
                placeholder="State"
              />
            </Col>
            <Col>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="season"
                placeholder="Season"
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
              />
            </Col>
            <Col>
              <Form.Control
                onChange={(e) =>
                  this.changeHandler(e.target.name, e.target.value)
                }
                name="area"
                placeholder="Area"
              />
            </Col>
          </Row>
          <Button onClick={this.handleClick}>Submit</Button>
        </Form>
        {data}
      </div>
    );
  }
}

export default ProductionForm;
