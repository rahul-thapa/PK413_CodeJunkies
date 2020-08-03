import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "../Table/table";

import DonutGraph from "../Graphs/donutGraph";

class FarmerDetails extends React.Component {
  state = {
    data: [],
    grievances: 0,
    production: 0,
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
        dataField: "phone",
        text: "Phone No.",
        sort: true,
        formatter: this.linkFormatter,
      },
    ],
  };
  componentDidMount() {
    fetch("/api/getallfarmers")
      .then((promise) => promise.json())
      .then((res) => {
        const objects = [];
        res.map((el, ind) => {
          const obj = {
            name: el.firstname + " " + el.lastname,
            district: el.district,
            phone: el.phone,
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
        <Row>
          <Col md={6}>
            <h4>Overview of registered farmers</h4>
            <p> Total farmers: {this.state.data.length}</p>
            <p>Total production reports filed: {this.state.production}</p>
            <p>Total grievances reports filed: {this.state.grievances}</p>
          </Col>

          <Col md={6}>
            <DonutGraph />
          </Col>
        </Row>
        <Row>
          <DataTable data={this.state.data} columns={this.state.columns} />
        </Row>
      </Container>
    );
  }
}

export default FarmerDetails;
