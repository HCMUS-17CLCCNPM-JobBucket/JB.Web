import React from "react";
import Select from "react-select";

export default function BlogTagSelection() {
  const customStyles = {
    // option: (provided, state) => ({
    //   ...provided,
    // }),
    control: (styles) => ({
      // none of react-select's styles are passed to <Control />
      //   height: 42,
      ...styles,
      height: "42px",
      width: "100%",
      borderRadius: "0.5rem",
      border: "1px solid #E5E7EB",
    }),
    // singleValue: (provided, state) => {
    //   const opacity = state.isDisabled ? 0.5 : 1;
    //   const transition = "opacity 300ms";

    //   return { ...provided, opacity, transition };
    // },
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return <Select isMulti styles={customStyles} options={options} />;
}
