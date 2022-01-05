import React from "react";
import Select, { StylesConfig } from "react-select";

export default function Selector(props) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided) => ({
      ...provided,
      height: "100%",
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
  return (
    <Select
      styles={customStyles}
      placeholder={props.placeholder}
      options={props.options}
      onChange={props.onChange}
      isMulti={props.isMulti || false}
    />
  );
}
