import axios from "axios";
import React, { useEffect } from "react";
import Selector from "app/components/atoms/Select";

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
        return { value: item.name, label: item.name };
      })}
      placeholder="Select Country"
      onChange={(e) => onChange(e.value)}
      value={{ value: value, label: value }}
    />
  );
}
