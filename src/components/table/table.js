import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import DeleteButton from "./delete-button";
import ExportAndAddButtons from "../export-and-addrow-buttons";

export default class Table extends Component {
  state = {
    columnDefs: [],
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    paginationPageSize: 5,
    rowHeight: 80,
    headerHeight: 50,
    frameworkComponents: {
      deletebutton: DeleteButton,
    },
  };

  editTableHeader(tableHeader) {
    tableHeader = tableHeader.filter((el) => el.isVisible);
    tableHeader.map((element) => {
      element.headerName = element.label;
      element.field = element.name;
      element.cellStyle = { "white-space": "normal" };
      switch (element.name) {
        case "f_001":
        case "f_015":
        case "f_016":
          element.width = 140;
        case "f_003":
        case "f_011":
        case "f_012":
        case "f_013":
        case "f_014":
          element.maxWidth = 140;
        default:
          element.width = 200;
      }
    });
    const deleteColumn = {
      headerName: "Удалить",
      cellRenderer: "deletebutton",
    };
    tableHeader = [...tableHeader, deleteColumn];
    this.setState({ columnDefs: tableHeader });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.header !== this.props.header) {
      let tableHeader = this.props.header.slice();
      this.editTableHeader(tableHeader);
    }
  }

  componentDidMount() {
    let tableHeader = this.props.header.slice();
    this.editTableHeader(tableHeader);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onBtnExportDataAsExcel = () => {
    let params = {};
    console.log(params);
    this.gridApi.exportDataAsExcel(params);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        id="myGrid"
        style={{
          marginTop: 20,
          height: 510,
        }}
      >
        <ExportAndAddButtons
          onBtnExportDataAsExcel={this.onBtnExportDataAsExcel}
        />
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.props.data}
          defaultColDef={this.state.defaultColDef}
          headerHeight={this.state.headerHeight}
          rowHeight={this.state.rowHeight}
          paginationPageSize={this.state.paginationPageSize}
          pagination={true}
          onCellValueChanged={this.handleChange}
          onGridReady={this.onGridReady}
          frameworkComponents={this.state.frameworkComponents}
        />
      </div>
    );
  }
}
