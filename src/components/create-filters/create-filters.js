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

}) {
  let item = parameters.map((element) => {
    switch (element.type) {
      case "period":
        return <PeriodType element={element} onToggle={onToggle} />;
      case "checkboxOnly":
        return <CheckboxOnlyType element={element} />;
      case "select":
        return <SelectType element={element} />;
      default:
        return (
          <InputTextType
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
