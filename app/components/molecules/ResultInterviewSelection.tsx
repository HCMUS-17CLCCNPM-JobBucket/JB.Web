import React from "react";
import Selector from "../atoms/Select";

export default function ResultInterviewSelection({ value, onChange }) {
  const options = [
    { value: 0, label: "Disqualified " },
    { value: 1, label: "Potential" },
    { value: 2, label: "Qualified" },
  ];
  return (
    <Selector
      options={options}
      placeholder="Result"
      value={options[value]}
      onChange={onChange}
    />
  );
}
