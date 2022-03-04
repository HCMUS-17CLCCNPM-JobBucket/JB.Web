import Multiselect from "multiselect-react-dropdown";
import React from "react";

export default function Selector({
  values,
  setValues,
  placeholder,
  options,
  isMulti,
  loading,
  displayValue,
  creatable,
}) {
  const onKeyPressFn = (event: any, value: string) => {
    if (event.key === "Enter" && value !== "") {
      event.preventDefault();
      setValues((prev) => [...prev, { id: value.trim(), name: value.trim() }]);
    }
  };

  return (
    <Multiselect
      options={options}
      loading={loading}
      avoidHighlightFirstOption
      showArrow
      singleSelect={!isMulti}
      selectedValues={values}
      onSelect={setValues}
      onRemove={(selected) => setValues(selected)}
      displayValue={displayValue}
      placeholder={placeholder}
      onKeyPressFn={creatable && onKeyPressFn}
      style={{
        chips: {
          background: "#0070f3",
          color: "#fff",
        },
        multiselectContainer: {
          color: "#0070f3",
          borderRadius: "8px",
        },
        searchBox: {
          // backgroundColor: "#e0f2fe",
          border: "1px solid",
          borderBottom: "1px solid blue",
          borderRadius: "8px",
          width: "100%",
        },
      }}
    />
  );
}
