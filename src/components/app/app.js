import React, { Component } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "../table";
import Switch from "@material-ui/core/Switch";
import "./app.css";

import Grid from "@material-ui/core/Grid";
import originalData from "../../data/table-data.json";
import originalDataEn from "../../data/en-table-data.json";
import allParameters from "../../data/filters-data.json";
import allParametersEn from "../../data/en-filters-data.json";
import tableHeader from "../../data/table-header.json";
import tableHeaderEn from "../../data/en-table-header.json";

import MainFilter from "../main-filter";
import AdditionalFilter from "../additional-filter";
import ApplyRemoveFilters from "../apply-remove-filters";
import MenuRouter from "../menu-router";

export default class App extends Component {
  state = {
    tableData: originalData,
    actualMainFilter: null,
    actualAdditionalFilter: null,
    disableSwitch: false,
    lang: "ru",
    parameters: allParameters,
    tableHeader: tableHeader,
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
            return isFinite(item[kostilNavigator[el.name]])
              ? item[kostilNavigator[el.name]] === el.values
              : item[kostilNavigator[el.name]]
                  .toUpperCase()
                  .indexOf(el.values.toUpperCase()) >= 0;
          });
          this.setState({ tableData: newData });
        });
      } else {
        this.setState({ tableData: originalData });
      }
    }
  };

  editFilters = (parameters) => {
    let newMainParameters = parameters.slice(0, 9);
    let additionalParameters = parameters.slice(9, 17);
    additionalParameters = [...additionalParameters, parameters[20]];
    newMainParameters[0].type = "period";
    additionalParameters.map((el) => (el.type = "checkboxOnly"));
    additionalParameters[0].type = "period";
    additionalParameters[1].disabled = true;
    additionalParameters[2].disabled = true;
    additionalParameters[3].disabled = true;
    additionalParameters[4].type = "select";
    this.setState({
      actualMainFilter: newMainParameters,
      actualAdditionalFilter: additionalParameters,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lang !== this.state.lang) {
      if (this.state.lang === "en") {
        this.editFilters(allParametersEn);
        this.setState({
          tableData: originalDataEn,
          parameters: allParametersEn,
          tableHeader: tableHeaderEn,
        });
      } else {
        this.editFilters(allParameters);
        this.setState({
          tableData: originalData,
          parameters: allParameters,
          tableHeader: tableHeader,
        });
      }
      console.log("CHANGE LANG STATE HERE", prevState.lang, this.state.lang);
    }
  }

  componentDidMount() {
    const { parameters } = this.state;
    this.editFilters(parameters);
  }

  changeLang = (lang) => {
    console.log("CLICK SUKA", lang);

    lang === "ru"
      ? this.setState({ lang: "en" })
      : this.setState({ lang: "ru" });
  };

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
          <FormControlLabel
            control={
              <Switch
                color="primary"
                onClick={() => this.changeLang(this.state.lang)}
              />
            }
            className="changeLang"
            label={this.state.lang}
          />
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
              <Table
                data={this.state.tableData}
                header={this.state.tableHeader}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>
    );
  }
}
