import React, { Component } from "react";

import CreateFilters from "../create-filters";

export default class AdditionalFilter extends Component {
  state = {
    additionalParameters: [],
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

  onToggleCheckbox = (el) => {
    console.log(el);
    const index = this.state.additionalParameters.findIndex(
      (currentObject) => currentObject.name === el
    );
    this.setState(({ additionalParameters }) => {
      return {
        additionalParameters: this.onToggle(
          additionalParameters,
          index,
          "isRequired"
        ),
      };
    });
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { additionalParameters } = this.state;
    if (prevProps.disableSwitch !== this.props.disableSwitch) {
      console.log("test for disabled switch", this.props.disableSwitch);
      let disablSwitchState = additionalParameters.slice();
      disablSwitchState.map((el) => {
        el.isRequired = false;
      });
      this.setState({ additionalParameters: disablSwitchState });
    }
    if (prevState.additionalParameters !== additionalParameters) {
      this.props.updateAdditionalFilter(this.state.additionalParameters);
    }
    if (prevProps.additionalParameters !== this.props.additionalParameters) {
      console.log("!!!!!!", this.props.additionalParameters);
      this.setState({
        additionalParameters: this.props.additionalParameters,
      });
    }
  }

  getDateFrom = (date) => {
    console.log("GET DATE FROM", Date.parse(date));
  };

  getDateTo = (date) => {
    console.log("GET DATE TO", Date.parse(date));
  };

  render() {
    return (
      <CreateFilters
        parameters={this.state.additionalParameters}
        onToggle={this.onToggleCheckbox}
        getDateFrom={this.getDateFrom}
        getDateTo={this.getDateTo}
      />
    );
  }
}
