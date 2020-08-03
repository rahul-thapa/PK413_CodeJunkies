import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
// import DonutGraph from "../Graphs/donutGraph";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import districts from "../GovDashboard/districtList";

class DonutGraph extends Component {
  randomColors = () => {
    const colors = [];
    for (let i = 0; i < 37; i++) {
      let color =
        "rgba(" +
        Math.floor(Math.random() * 256).toString() +
        "," +
        Math.floor(Math.random() * 256).toString() +
        "," +
        Math.floor(Math.random() * 256).toString() +
        "," +
        "1)";
      colors.push(color);
    }
    return colors;
  };
  state = {
    loaded: false,
    chartData: {
      datasets: [
        {
          data: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          backgroundColor: this.randomColors(),
          borderColor: "#ffffff",
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: districts,
    },
    cropName: "",
    dataLoaded: false,
    csvData: [],
  };

  componentDidMount() {
    fetch("/api/getallfarmers")
      .then((promise) => promise.json())
      .then((res) => {
        //this.setState({ data: data, loaded: true });
        const stateDists = [...this.state.chartData.datasets[0].data];

        res.map((el) => {
          const dist = districts.findIndex((item) => item === el.district);
          stateDists[dist] += 1;
        });
        this.setState({
          ...this.state,
          chartData: {
            datasets: [
              {
                data: stateDists,
              },
            ],
          },
        });
      });
  }

  render() {
    return (
      <Container>
        {/* {this.state.loaded ? (
          <div>
            <Row>
              <h4>Farmers in this district</h4>
            </Row>

            <Row>
              <DonutGraph />
            </Row>
          </div>
        ) : null} */}
        <Doughnut
          data={this.state.chartData}
          options={{
            maintainAspectRatio: true,
            title: {
              display: true,
              text: "Number of registered farmers from each district",
            },
            legend: {
              display: false,
            },
          }}
        />
      </Container>
    );
  }
}

export default DonutGraph;
