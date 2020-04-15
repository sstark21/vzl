import React, { Component } from "react";

import CreateFilter from "../create-filters";

export default class MainFilter extends Component {
  state = {
    mainParameters: [
      {
        name: "actualPeriod",
        title: "Период актуальности",
        type: "period",
        checked: false,
        contenierField: "",
      },
      {
        name: "organizationId",
        title: "Идентификатора Организации",
        checked: false,
        contenierField: "",
      },
      {
        name: "fullNameOrganization",
        title: "Полное наименование организации",
        checked: false,
        contenierField: "",
      },
      {
        name: "shortNameOrganization",
        title: "Краткое наименование организации",
        checked: false,
        contenierField: "",
      },
      {
        name: "INNumber",
        title: "ИНН",
        checked: false,
        contenierField: "",
      },
      {
        name: "OGRNumber",
        title: "ОГРН",
        checked: false,
        contenierField: "",
      },
      {
        name: "KPPNumber",
        title: "КПП",
        checked: false,
        contenierField: "",
      },
      {
        name: "countryOfRegistration",
        title: "Страна регистрации",
        checked: false,
        contenierField: "",
      },
      {
        name: "LIDNumber",
        title: "ЛИД",
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
    const index = this.state.mainParameters.findIndex(
      (currentObject) => currentObject.name === el
    );
    this.setState(({ mainParameters }) => {
      return {
        mainParameters: this.onToggle(mainParameters, index, "checked"),
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
        mainParameters: this.onToggle(
          mainParameters,
          index,
          "contenierField",
          value
        ),
      };
    });

  };

  componentDidUpdate(prevState) {
    if (prevState !== this.state.mainParameters) {
      this.props.updateMainFilter(this.state.mainParameters);
    }
  }

  render() {
    return (
      <CreateFilter
        parameters={this.state.mainParameters}
        onToggle={this.onToggleCheckbox}
        onChangeContent={this.onChangeContentField}
        updateMainFilter={this.props.updateMainFilter}
      />
    );
  }
}
