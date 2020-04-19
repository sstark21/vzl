import React, { Component } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Table from "../table";
import "./app.css";

import Grid from "@material-ui/core/Grid";
import originalData from "../../data/new-table-data.json";

import MainFilter from "../main-filter";
import AdditionalFilter from "../additional-filter";
import ApplyRemoveFilters from "../apply-remove-filters";

import allParameters from "../../data/filters-data.json";

export default class App extends Component {
  state = {
    tableData: originalData,
    actualMainFilter: null,
    actualAdditionalFilter: null,
    disableSwitch: false,
  };

  updateMainFilter = (updateData) => {
    this.setState({ actualMainFilter: updateData });
  };

  updateAdditionalFilter = (updateData) => {
    this.setState({ actualAdditionalFilter: updateData });
  };

  applyFilter = () => {
    const { tableData, actualMainFilter } = this.state;
    const kostilNavigator = {
      f_002: "f_003",
      f_003: "f_005",
      f_004: "f_004",
      f_005: "f_006",
      f_006: "f_007",
      f_007: "f_008",
      f_008: "f_009",
      f_009: "f_002",
    };
    if (tableData && actualMainFilter !== null) {
      let newData = tableData.slice();
      let onlyCheckedParameters = actualMainFilter.filter(
        (n) => n.isRequired && n.values.length
      );
      console.log("ACTIVE SWITCHES", onlyCheckedParameters);
      if (onlyCheckedParameters.length) {
        console.log("IF");
        onlyCheckedParameters.map((el) => {
          newData = newData.filter((item) => {
            // return item[kostilNavigator[el.name]] == el.values;
            return (
              item[kostilNavigator[el.name]]
                .toLowerCase()
                .indexOf(el.values.toLowerCase()) > 0
            );
          });
          this.setState({ tableData: newData });
        });
      } else {
        console.log("ELSE", tableData);
        this.setState({ tableData: originalData });
      }
    }
  };

  componentDidMount() {
    let newMainParameters = allParameters.slice(0, 9);
    newMainParameters[0].type = "period";
    this.setState({ actualMainFilter: newMainParameters });
  }


  removeAllFilters = () => {
    this.setState({
      disableSwitch: !this.state.disableSwitch,
      tableData: originalData,
    }); // не помню можно ли так делать.
  };

  render() {
    return (
      <div className="mainDiv container">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <span>Параметры ВЗЛ</span>
              <MainFilter
                mainFilter={this.state.actualMainFilter}
                updateMainFilter={this.updateMainFilter}
                disableSwitch={this.state.disableSwitch}
              />
            </Grid>
            <Grid item xs={6}>
              <span>Дополнительные параметры</span>
              <AdditionalFilter
                updateAdditionalFilter={this.updateAdditionalFilter}
                disableSwitch={this.state.disableSwitch}
              />
            </Grid>
          </Grid>
          <ApplyRemoveFilters
            applyFilter={this.applyFilter}
            removeAllFilters={this.removeAllFilters}
          />
          <Table data={this.state.tableData} />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
