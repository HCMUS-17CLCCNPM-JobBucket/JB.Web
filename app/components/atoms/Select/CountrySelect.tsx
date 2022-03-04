import axios from "axios";
import React, { useEffect } from "react";
import Selector from "./";

export default function CountrySelect({ value, onChange }) {
  const [countries, setCountries] = React.useState([]);
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/iso")
      .then((res) => {
        setCountries(res.data.data);
      });
  }, []);
  return (
    <Selector
      options={countries.map((item) => {
        return { id: item.name, name: item.name };
      })}
      values={[]}
      setValues={(e) => onChange(e)}
      placeholder="Select Country"
      displayValue="name"
      loading={false}
      isMulti={false}
    />
    // <Selector
    //   options={countries.map((item) => {
    //     return { value: item.name, label: item.name };
    //   })}
    //   placeholder="Select Country"
    //   onChange={(e) => onChange(e.value)}
    //   value={{ value: value, label: value }}
    // />
  );
}
