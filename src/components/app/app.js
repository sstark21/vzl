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
import MenuRouter from "../menu-router";
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
      f_001: "f_001",
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
      if (onlyCheckedParameters.length) {
        onlyCheckedParameters.map((el) => {
          newData = newData.filter((item) => {
            return item[kostilNavigator[el.name]] === el.values;
          });
          this.setState({ tableData: newData });
        });
      } else {
        this.setState({ tableData: originalData });
      }
    }
  };

  componentDidMount() {
    let newMainParameters = allParameters.slice(0, 9);
    let additionalParameters = allParameters.slice(9, 17);
    additionalParameters = [...additionalParameters, allParameters[20]];
    console.log("ADDITIOANL", additionalParameters);
    newMainParameters[0].type = "period";
    additionalParameters.map((el) => (el.type = "checkboxOnly"));
    additionalParameters[0].type = "period";
    additionalParameters[4].type = "select";
    console.log(additionalParameters);
    this.setState({
      actualMainFilter: newMainParameters,
      actualAdditionalFilter: additionalParameters,
    });
  }

  removeAllFilters = () => {
    this.setState({
      disableSwitch: !this.state.disableSwitch,
      tableData: originalData,
    }); // не помню можно ли так делать.
  };

  render() {
    return (
      <div>
        <div className="headerVTB"></div>
        <div id="parent">
          <div className="dummiesMenu">
            <MenuRouter />
          </div>
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
                    additionalParameters={this.state.actualAdditionalFilter}
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
        </div>
      </div>
    );
  }
}
