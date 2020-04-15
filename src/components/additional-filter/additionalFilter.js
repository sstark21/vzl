import React, { Component } from "react";

import CreateFilters from "../create-filters";

export default class AdditionalFilter extends Component {
  state = {
    additionalParameters: [
      {
        name: "reportingDate",
        title: "Отчетная дата",
        type: "period",
        checked: false,
        contenierField: "",
      },
      {
        name: "newForThePeriod",
        title: "Новые за период",
        type: "checkboxOnly",
        checked: false,
        contenierField: "",
      },
      {
        name: "changeForThePeriodOrganization",
        title: "Изменения за период(организация)",
        type: "checkboxOnly",
        checked: false,
        contenierField: "",
      },
      {
        name: "changeForThePeriodParticipation",
        title: "Изменения за период(участие)",
        type: "checkboxOnly",
        checked: false,
        contenierField: "",
      },
      {
        name: "dataAcceptanceStatus",
        title: "Статус акцепта данных",
        type: "select",
        variants: [
          { name: "accepted", title: "Акцептованные" },
          { name: "notAccepted", title: "Неакцептованные" },
        ],
        checked: false,
        contenierField: "",
      },
      {
        name: "participationConflicts",
        title: "Наличие конфликтов участия",
        type: "checkboxOnly",
        checked: false,
        contenierField: "",
      },
      {
        name: "registrationConflicts",
        title: "Наличие конфликтов в регистрационных данных",
        type: "checkboxOnly",
        checked: false,
        contenierField: "",
      },
      {
        name: "participationInTheCapitalMore100Percent",
        title: "Прямое участие в капитале организации больше 100%",
        type: "checkboxOnly",
        checked: false,
        contenierField: "",
      },
      {
        name: "incoherentOrganizations",
        title: "Несвязные организации",
        type: "checkboxOnly",
        checked: false,
        contenierField: "",
      },
    ],
  };
  onToggle = (arr, idx, param, value) => {
    let oldItem = arr[idx];
    let newItem =
      param === "checked"
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
          "checked"
        ),
      };
    });
  };

  componentDidMount() {
    console.log("COMPONENT DID MOUN ADDITIONAL PARAMETRS");
    const { additionalParameters } = this.state;
    console.log("TEST DIDMOUNT STATE", additionalParameters[0]);
    if (additionalParameters[0].checked) {
      console.log("!!!!");
      let copyAdditionalParameters = additionalParameters.slice();
      for (let i = 1; i <= 3; i++) {
        copyAdditionalParameters[i].disabled = false;
      }
      console.log("TEST DISABLED SWITCH", copyAdditionalParameters);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { additionalParameters } = this.state;
    if (prevProps.disableSwitch !== this.props.disableSwitch) {
      console.log("test for disabled switch", this.props.disableSwitch);
      let disablSwitchState = additionalParameters.slice();
      disablSwitchState.map((el) => {
        el.checked = false;
      });
      this.setState({ additionalParameters: disablSwitchState });
    }
    if (prevState.additionalParameters !== additionalParameters) {
      //   this.props.updateMainFilter(this.state.mainParameters);
    }
  }

  render() {
    return (
      <CreateFilters
        parameters={this.state.additionalParameters}
        onToggle={this.onToggleCheckbox}
      />
    );
  }
}
