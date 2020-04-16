import React, { Component } from "react";
import ReactDOM from "react-dom";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import tableHeader from "../../data/table-header-data.json";
export default class Table extends Component {
  state = {
    columnDefs: [],
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    paginationPageSize: 5,
    rowHeight: 80,
  };

  componentDidMount() {
    console.log("TABLE DID MOUNT");
    let newTableHeader = tableHeader.slice();
    newTableHeader = newTableHeader.filter((el) => el.isVisible);
    newTableHeader.map((element) => {
      element.headerName = element.label;
      element.field = element.name;
    });
    console.log(newTableHeader);
    this.setState({ columnDefs: newTableHeader });
  }

  render() {

    return (
      <div
        className="ag-theme-balham"
        id="myGrid"
        style={{
          marginTop: 20,
          height: 500,
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.props.data}
          defaultColDef={this.state.defaultColDef}
          rowHeight={this.state.rowHeight}
          paginationPageSize={this.state.paginationPageSize}
          pagination={true}
        />
      </div>
    );
  }
}
