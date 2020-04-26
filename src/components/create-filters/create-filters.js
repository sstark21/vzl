import React from "react";

import {
  PeriodType,
  CheckboxOnlyType,
  SelectType,
  InputTextType,
} from "./index";

function CreateFilters({
  parameters,
  onToggle,
  onChangeContent,
  getDateFrom,
  getDateTo,
}) {
  let item = parameters.map((element) => {
    switch (element.type) {
      case "period":
        return (
          <PeriodType
            key={element.label}
            element={element}
            onToggle={onToggle}
            getDateFrom={getDateFrom}
            getDateTo={getDateTo}
          />
        );
      case "checkboxOnly":
        return (
          <CheckboxOnlyType
            key={element.label}
            element={element}
            onToggle={onToggle}
          />
        );
      case "select":
        return (
          <SelectType
            key={element.label}
            element={element}
            onToggle={onToggle}
          />
        );
      default:
        return (
          <InputTextType
            key={element.label}
            element={element}
            onToggle={onToggle}
            onChangeContent={onChangeContent}
          />
        );
    }
  });
  return <div>{item}</div>;
}

export default CreateFilters;
