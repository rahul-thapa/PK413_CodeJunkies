import React, { Component } from "react";
import { Container } from "react-bootstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import "./table.css";

class Bootstraptab extends Component {
  state = {
    sentFaxes: [],
    indicationString: "Loading...",
  };

  defaultSorted = [
    {
      dataField: "no",
      order: "asc",
    },
  ];

  checkEmpty = () => {
    if (this.props.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  indication = () => {
    setTimeout(() => {
      if (this.checkEmpty) {
        this.setState({
          indicationString: "No  data found.",
        });
      }
    }, 3000);

    return this.state.indicationString;
  };

  render() {
    const options = {
      page: 1,

      sizePerPageList: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "20", value: 20 },
        { text: "All", value: this.props.data.length },
      ],

      sizePerPage: 5,

      pageStartIndex: 1,

      paginationSize: 3,

      prePage: "Prev",

      nextPage: "Next",

      firstPage: "First",

      lastPage: "Last",
    };

    return (
      <Container>
        <div class="row" className="hdr">
          <h5>{this.props.text}</h5>
        </div>

        <BootstrapTable
          bootstrap4
          hover
          keyField="no"
          data={this.props.data}
          columns={this.props.columns}
          pagination={paginationFactory(options)}
          defaultSorted={this.defaultSorted}
          wrapperClasses="table-responsive"
          noDataIndication={this.indication}
        ></BootstrapTable>
      </Container>
    );
  }
}

export default Bootstraptab;
