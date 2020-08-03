import React, { Component } from "react";
import * as d3 from "d3";
import dataFile from "../../Assets/final.csv";
//import Chart from "chart.js";
//import ChartDataSource from "chartjs-plugin-datasource";
import { Line, Bar } from "react-chartjs-2";
import { Container } from "react-bootstrap";

class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cropName: "",
      dataLoaded: false,
      csvData: [],
      chartdata: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: "rgba(33, 150, 243, 1)",
            borderColor: "rgba(33, 150, 243, 1)",
            fill: false,
          },
          // {
          //   label: "Winter",
          //   data: [],
          //   backgroundColor: "rgba(255,99,99,0.6)",
          //   borderColor: "rgba(255,99,99,0.6)",
          //   fill: false,
          // },
        ],

        cropType: "",
        stateName: "",
        summerCrops: ["dummy"],
      },
    };
  }

  componentDidMount(props) {
    // const prevState = this.state.summerCrops;
    // const summerCrops = new Set(prevState);

    d3.csv(dataFile, (data) => {
      const containsObject = (obj, list) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].x === obj.x) {
            return [true, i];
          }
        }

        return [false, -1];
      };
      if (
        data.Crop === this.props.cropName &&
        data.District_Name === this.props.district &&
        data.Season === this.props.season
      ) {
        const rows = this.state.chartdata.datasets[0].data;

        const obj = {
          x: data.Year,
          y: data.Production,
        };

        const [boolVal, ind] = containsObject(obj, rows);
        if (boolVal) {
          rows[ind].y = parseFloat(rows[ind].y) + parseFloat(data.Production);
        } else {
          rows.push(obj);
        }

        const chartData = this.state.chartdata;
        chartData.datasets.data = rows;
        chartData.datasets[0].label = this.props.season;

        if (!chartData.labels.includes(data.Year)) {
          chartData.labels.push(data.Year);
        }
        chartData.labels.sort();

        chartData.cropType = data.Crop;
        chartData.stateName = data.State_Name;
        this.setState({
          chartdata: chartData,
        });
      }
    }).then(() => {
      this.setState({ dataLoaded: true });
      const sortedData0 = this.state.chartdata.datasets[0].data;
      sortedData0.sort((a, b) => {
        return a.x - b.x;
      });
    });
    this.setState({ cropName: this.props.crop });
  }
  render() {
    const graph = this.state.dataLoaded ? (
      <Line
        data={this.state.chartdata}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text:
              this.state.chartdata.cropType +
              " Production(hectares) vs Year for " +
              this.state.chartdata.stateName,
          },
        }}
      />
    ) : null;

    return this.props.load ? (
      <div style={{ height: "90%", width: "95%" }}>
        <h2>Visualisation of the data of </h2>
        <h4>{this.props.cropName}</h4>
        {graph}
      </div>
    ) : null;
  }
}

export default LineGraph;
