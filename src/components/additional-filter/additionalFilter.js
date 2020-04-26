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

  componentDidUpdate(prevProps, prevState) {
    const { additionalParameters } = this.state;
    if (prevProps.disableSwitch !== this.props.disableSwitch) {
      let disablSwitchState = additionalParameters.slice();
      disablSwitchState.map((el) => {
        el.isRequired = false;
        if (el.position === 11 || el.position === 12 || el.position === 13) {
          el.disabled = true;
        }
      });
      this.setState({ additionalParameters: disablSwitchState });
    }

    if (prevState.additionalParameters !== additionalParameters) {
      this.props.updateAdditionalFilter(additionalParameters);
      if (
        !!prevState.additionalParameters[0] &&
        prevState.additionalParameters[0].isRequired !==
          additionalParameters[0].isRequired
      ) {
        additionalParameters[1].disabled = !additionalParameters[0].isRequired;
        additionalParameters[2].disabled = !additionalParameters[0].isRequired;
        additionalParameters[3].disabled = !additionalParameters[0].isRequired;
      }
    }

    if (prevProps.additionalParameters !== this.props.additionalParameters) {
      this.setState({
        additionalParameters: this.props.additionalParameters,
      });
    }
  }

  getDateFrom = (date) => {};

  getDateTo = (date) => {};

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
