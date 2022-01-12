import React from "react";
import Selector from "../atoms/Select";
import Select, { StylesConfig } from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
    height: "40px",
    borderRadius: "0.5rem",
    border: "1px solid #D1D5DB",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  placeholder: (provided, state) => ({
    ...provided,
    color: "#9CA3C1",
  }),
};

export default function ResultInterviewSelection({ value, onChange }) {
  const options = [
    { value: 0, label: "Disqualified " },
    { value: 1, label: "Potential" },
    { value: 2, label: "Qualified" },
  ];

  return (
    <Select
      styles={customStyles}
      value={options[value]}
      placeholder="Result"
      options={options}
      onChange={onChange}
    />
  );
}
