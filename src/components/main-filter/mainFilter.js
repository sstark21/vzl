import React, { Component } from "react";

import CreateFilter from "../create-filters";

export default class MainFilter extends Component {
  state = {
    mainParameters: [],
  };
  onToggle = (arr, idx, param, value) => {
    let oldItem = arr[idx];
    let newItem =
      param === "isRequired"
        ? { ...oldItem, [param]: !oldItem[param] }
        : { ...oldItem, [param]: value };
    const newArr = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];

    return newArr;
  };

  onToggleCheckbox = (el, dateFrom, dateTo) => {
    console.log(dateFrom, dateTo);
    const index = this.state.mainParameters.findIndex(
      (currentObject) => currentObject.name === el
    );
    if (!!dateFrom && !!dateTo) {
      this.setState(({ mainParameters }) => {
        return {
          mainParameters: this.onToggle(mainParameters, 0, "values", [
            Date.parse(dateFrom),
            Date.parse(dateTo),
          ]),
        };
      });
    }
    this.setState(({ mainParameters }) => {
      return {
        mainParameters: this.onToggle(mainParameters, index, "isRequired"),
      };
    });
  };
  onChangeContentField = (e) => {
    const elemName = e.target.id;
    const value = e.target.value;
    const index = this.state.mainParameters.findIndex(
      (currentObject) => currentObject.name === elemName
    );
    this.setState(({ mainParameters }) => {
      return {
        mainParameters: this.onToggle(mainParameters, index, "values", value),
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.disableSwitch !== this.props.disableSwitch) {
      console.log("test for disabled switch", this.props.disableSwitch);
      let disablSwitchState = this.state.mainParameters.slice();
      disablSwitchState.map((el) => {
        el.isRequired = false;
      });
      this.setState({ mainParameters: disablSwitchState });
    }
    if (prevState.mainParameters !== this.state.mainParameters) {
      this.props.updateMainFilter(this.state.mainParameters);
    }
    if (prevProps.mainFilter !== this.props.mainFilter) {
      this.setState({ mainParameters: this.props.mainFilter });
    }
  }

  componentDidMount() {}

  getDateFrom = (date) => {
    const dateFrom = Date.parse(date);
    let newArr = this.state.mainParameters.slice();
    newArr[0].values[0] = dateFrom;

    this.setState({ mainParameters: newArr });
  };

  getDateTo = (date) => {
    const dateTo = Date.parse(date);
    let newArr = this.state.mainParameters.slice();
    newArr[0].values[1] = dateTo;
    this.setState({ mainParameters: newArr });
  };
  render() {
    console.log("FINAL STATE", this.state.mainParameters);
    return (
      <CreateFilter
        parameters={this.state.mainParameters}
        onToggle={this.onToggleCheckbox}
        onChangeContent={this.onChangeContentField}
        getDateFrom={this.getDateFrom}
        getDateTo={this.getDateTo}
      />
    );
  }
}
