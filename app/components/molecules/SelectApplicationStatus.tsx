import ApplicationStatus from "app/enums/ApplicationStatus";
import React from "react";
import Selector from "../atoms/Select";

export default function SelectApplicationStatus({ onChange }) {
  return (
    <Selector
      placeholder={`Status`}
      options={ApplicationStatus.map((item, index) => ({
        value: index,
        label: item,
      }))}
      onChange={(e) => onChange(e.value)}
    />
  );
}
