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
        var i;
        for (i = 0; i < list.length; i++) {
          if (list[i].x === obj.x) {
            return [true, i];
          }
        }

        return [false, -1];
      };
      if (
        data.Crop === this.props.cropName &&
        data.State_Name === this.props.state &&
        data.Season === this.props.season
      ) {
        const rows = this.state.chartdata.datasets[0].data;

        const obj = {
          x: data.YEAR,
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

        if (!chartData.labels.includes(data.YEAR)) {
          chartData.labels.push(data.YEAR);
        }
        chartData.labels.sort();

        chartData.cropType = data.Crop;
        chartData.stateName = data.State_Name;
        this.setState({
          chartdata: chartData,
        });
      }
      //---------------------------------------------//
      //2nd seasonline -- Not required right now
      //-------------------------------------------//
      // else if (
      //   data.Crop === this.props.cropName &&
      //   data.State_Name === "Assam" &&
      //   data.Season === "Winter"
      // ) {
      //   const rows = this.state.chartdata.datasets[1].data;

      //   const obj = {
      //     x: data.YEAR,
      //     y: data.Production,
      //   };

      //   const [boolVal, ind] = containsObject(obj, rows);
      //   if (boolVal) {
      //     rows[ind].y = parseFloat(rows[ind].y) + parseFloat(data.Production);
      //   } else {
      //     rows.push(obj);
      //   }

      //   const chartData = this.state.chartdata;
      //   chartData.datasets.data = rows;

      //   this.setState({
      //     chartdata: chartData,
      //   });
      // }

      // summerCrops.add(data.Crop);

      // this.setState({ summerCrops: summerCrops });
    }).then(() => {
      this.setState({ dataLoaded: true });
      const sortedData0 = this.state.chartdata.datasets[0].data;
      sortedData0.sort((a, b) => {
        return a.x - b.x;
      });
      const sortedData1 = this.state.chartdata.datasets[1].data;
      sortedData1.sort((a, b) => {
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
        <p>{this.props.cropName}</p>
        {graph}
      </div>
    ) : null;
  }
}

export default LineGraph;
