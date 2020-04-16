import React, { Component } from "react";
import ReactDOM from "react-dom";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import tableHeader from "../../data/table-header-data.json";
export default class Table extends Component {
  state = {
    columnDefs: [
      { headerName: "Отчетная дата", field: "date", width: 130 },
      {
        headerName: "ЛИД",
        field: "LID",
        cellStyle: { "white-space": "normal" },
      },
      { headerName: "Ид. орг-ции", field: "idOrganization", width: 115 },
      {
        headerName: "Краткое наименование организации",
        field: "shortNameOrganization",
      },
      {
        headerName: "Полное наименование организации",
        field: "fullNameOrganization",
        cellStyle: { "white-space": "normal" },
      },
      { headerName: "ИНН", field: "INN", width: 100 },
      { headerName: "ОГРН", field: "OGRN" },
      { headerName: "КПП", field: "KPP" },
      { headerName: "Страна регистрации", field: "registrationCountry" },
      { headerName: "Адрес", field: "address" },
      { headerName: "Резидент (да/нет)", field: "isItResident" },
      { headerName: "ЕНВД (да/нет)", field: "ENVD" },
      { headerName: "Сколково (да/нет)", field: "skolkovo" },
      { headerName: "Особ. экон. зона (да/нет)", field: "specialEconomicZone" },
      { headerName: "Действует с (дата регистрации)", field: "startOfAction" },
      { headerName: "Действует по (дата прекращения)", field: "endOfAction" },
      { headerName: "Удаление", field: "remove" },
    ],
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    paginationPageSize: 5,
    rowHeight: 80,
    groupHeaderHeight: 75,
    headerHeight: 150,
    floatingFiltersHeight: 50,
    pivotGroupHeaderHeight: 50,
    pivotHeaderHeight: 100,
  };

  componentDidMount() {
    console.log("TABLE DID MOUNT");
    let newTableHeader = tableHeader.slice();
    newTableHeader.map((element) => {
      element.headerName = element.label;
      element.field = element.name;
    });
    console.log(newTableHeader);
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
