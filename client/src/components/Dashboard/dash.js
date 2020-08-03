import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LineGraph from "../Graphs/line";
import ProductionForm from "../PredictionForm/form2";
import cc from "./dashboard.module.css";
import FarmerNav from "./farmerNav";
import prices from "./prices";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      cropPrices: {},
      states: "",
      crop: "",
      input: {
        district: "NALANDA",
        season: "Kharif",
        state: "Bihar",
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
        state: "Bihar",
        district: this.state.input.district,
        season: this.state.input.season,
        fert: 0,
      }),
    };
    fetch("/py/recommendationnew", options)
      .then((data) => data.json())
      .then((json) => {
        const cropPrices = [];
        json.Output.map((el) => {
          const priceData = prices.find((item) => item.Crop === el);
          if (priceData) {
            cropPrices.push(priceData);
          } else {
            cropPrices.push("No data for this crop");
          }
        });
        this.setState({
          cropPrices: { loaded: true, prices: cropPrices },
          recommendation: {
            ...this.state.recommendation,
            loaded: true,
            ...json,
          },
        });
      });
    //data.then(this.setState({ crop: "Rice", loaded: !this.state.loaded }));
    this.setState({ crop: "Ragi" });
    this.setState({ loaded: !this.state.loaded });
  };

  render() {
    return (
      <Container>
        <FarmerNav />
        {/* <Row>
          <h2>Hello, {this.username}</h2>
        </Row> */}
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
                Generate recommended crops for {this.state.input.district} for
                the {this.state.input.season} season
              </h3>
              <Button onClick={this.reportGenerateHandler} variant="success">
                Generate report
              </Button>
              <div>
                {this.state.recommendation.loaded ? (
                  <p>These are the most suitable crops for your area:</p>
                ) : null}
                {this.state.cropPrices.loaded
                  ? this.state.recommendation.Output.map((el, ind) => (
                      <div key={ind}>
                        <p>
                          {ind + 1}. {el}
                        </p>
                        {/* <p>
                          Estimated market value:{" "}
                          {this.state.cropPrices.loaded
                            ? this.state.cropPrices.prices[0].max
                            : null}
                        </p> */}
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {this.state.recommendation.Output.map((el) => (
            <Col key={el} className={cc.graphCol} md={6}>
              <LineGraph
                recommendedCropList={this.state.recommendation}
                cropName={el}
                // cropName="Ragi"
                load={this.state.recommendation.loaded}
                season={this.state.input.season}
                state={this.state.input.state}
                district={this.state.input.district}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
