import React, { Component } from "react";
import * as d3 from "d3";
import dataFile from "../../Assets/maindata.csv";
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
            label: "Summer",
            data: [],
            backgroundColor: "rgba(33, 150, 243, 1)",
            borderColor: "rgba(33, 150, 243, 1)",
            fill: false,
          },
          {
            label: "Winter",
            data: [],
            backgroundColor: "rgba(255,99,99,0.6)",
            borderColor: "rgba(255,99,99,0.6)",
            fill: false,
          },
        ],

        cropType: "",
        district: "",
        summerCrops: ["dummy"],
      },
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ cropName: nextCrops.crop });
  // }

  componentDidMount(props) {
    // const prevState = this.state.summerCrops;
    // const summerCrops = new Set(prevState);

    d3.csv(dataFile, (data) => {
      if (
        data.Crop === this.props.cropName &&
        data.District_Name === "BAKSA" &&
        data.Season === "Summer"
      ) {
        const rows = this.state.chartdata.datasets[0].data;
        rows.push(parseFloat(data.Production));
        const chartData = this.state.chartdata;
        chartData.datasets.data = rows;
        chartData.labels.push(data.YEAR);

        chartData.cropType = data.Crop;
        chartData.district = data.District_Name;
        this.setState({
          chartdata: chartData,
        });
      } else if (
        data.Crop === this.props.cropName &&
        data.District_Name === "BAKSA" &&
        data.Season === "Winter"
      ) {
        const rows = this.state.chartdata.datasets[1].data;
        rows.push(parseFloat(data.Production));
        const chartData = this.state.chartdata;
        chartData.datasets.data = rows;
        //chartData.labels.push(data.YEAR);
        this.setState({
          chartdata: chartData,
        });
      }

      // summerCrops.add(data.Crop);

      // this.setState({ summerCrops: summerCrops });
    }).then(() => this.setState({ dataLoaded: true }));
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
              this.state.chartdata.district,
          },
        }}
      />
    ) : null;

    return this.props.load ? (
      <div style={{ height: "90%", width: "95%" }}>
        <p>{this.props.cropName}</p>
        {graph}
      </div>
    ) : null;
  }
}

export default LineGraph;
