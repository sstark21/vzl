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

    if (tableData && actualMainFilter !== null) {
      let newData = tableData.slice();
      let onlyCheckedParameters = actualMainFilter.filter((n) => n.checked);

      onlyCheckedParameters.map((el) => {
        if (el.contenierField.length) {
          newData = newData.filter((item) => {
            return item[el.name] === el.contenierField;
          });
          this.setState({ tableData: newData });
        } else {
          this.setState({ tableData: tableData });
        }
      });
    }
  };

  removeAllFilters = () => {
    this.setState({
      disableSwitch: !this.state.disableSwitch,
      tableData: Data,
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
