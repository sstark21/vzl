import React, { Component } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Table from "../table";
import "./app.css";

import Grid from "@material-ui/core/Grid";
import Data from "./table-data.json";

import MainFilter from "../main-filter";
import AdditionalFilter from "../additional-filter";
import ApplyRemoveFilters from "../apply-remove-filters";

export default class App extends Component {
  state = {
    tableData: Data,
    actualMainFilter: null,
    actualAdditionalFilter: null,
  };

  updateMainFilter = (updateData) => {
    this.setState({ actualMainFilter: updateData });
    console.log("TEST STATE", updateData);
  };

  updateAdditionalFilter = (updateData) => {
    this.setState({ actualAdditionalFilter: updateData });
  };

  checkUpdate = () => {
    console.log("BUTTON", this.state.actualMainFilter);
  };
  render() {
    return (
      <div className="mainDiv container">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <span>Параметры ВЗЛ</span>
              <MainFilter updateMainFilter={this.updateMainFilter} />
            </Grid>
            <Grid item xs={6}>
              <span>Дополнительные параметры</span>
              <AdditionalFilter
                updateAdditionalFilter={this.updateAdditionalFilter}
              />
            </Grid>
          </Grid>
          <ApplyRemoveFilters checkUpdate={this.checkUpdate} />
          <Table data={this.state.tableData} />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
