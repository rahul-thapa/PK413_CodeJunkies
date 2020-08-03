import React, { Component } from "react";
import { Container } from "react-bootstrap";
import GovNav from "./govNav";
import DataTable from "../Table/table";

class AllSowReports extends Component {
  state = {
    data: [],
    grievances: 0,
    sowing: 0,
    indicationString: "Loading...",

    columns: [
      {
        dataField: "no",
        text: "No.",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "district",
        text: "District",
        sort: true,
      },
      {
        dataField: "crop",
        text: "Crop",
        sort: true,
      },
      {
        dataField: "area",
        text: "Area",
        sort: true,
      },
      {
        dataField: "date",
        text: "Filed Date",
        sort: true,
      },
    ],
  };
  componentDidMount() {
    fetch("/api/getallplantations")
      .then((promise) => promise.json())
      .then((res) => {
        const objects = [];
        res.map((el, ind) => {
          const obj = {
            name: el.name,
            district: el.district,
            crop: el.cropName,
            area: el.area,
            date: Date(el.filedTime).toString().slice(3, 15),
            no: ind + 1,
          };
          objects.push(obj);
        });
        this.setState({ data: objects });
      });
  }
  render() {
    return (
      <Container>
        <GovNav />
        <DataTable
          text="All reports of sown crops:"
          data={this.state.data}
          columns={this.state.columns}
        />
      </Container>
    );
  }
}

export default AllSowReports;
