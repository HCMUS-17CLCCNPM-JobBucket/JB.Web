import { jobAPI } from "app/api/modules/jobAPI";
import Multiselect from "multiselect-react-dropdown";
import React, { useMemo, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Selector from "../atoms/Select/Selector";

const sortOptionsCity = [
  { value: "hcm", label: "Ho Chi Minh" },
  { value: "dang_nang", label: "Da Nang" },
  { value: "ha_noi", label: "Ha Noi" },
];

const customStylesCity = {
  menu: (provided, state) => ({
    ...provided,
    focus: "none",
    width: "100%",
  }),
  control: (styles) => ({
    ...styles,
    width: "100%",
    height: "40px",
    borderRadius: "0.5rem",
    padding: "0 0 0 20px",
  }),
};

export default function EmployeeFilter({ onSearchSubmit }) {
  const [loading, setLoading] = useState(false);

  const [skills, setSkills] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await jobAPI.getJobProperties();
      if (res.status === 200) setSkills(res.data.data.jobProperties.skills);
      setLoading(false);
    };

    fetchData();
  }, []);

  const onSkillKeyPressFn = (event: any, value: string) => {
    if (event.key === "Enter" && value !== "") {
      event.preventDefault();

      setSelectedSkills((prev) => [
        ...prev,
        { id: value.trim(), name: value.trim() },
      ]);
    }
  };
  const onCityKeyPressFn = (event: any, value: string) => {
    if (event.key === "Enter" && value !== "") {
      event.preventDefault();
      setSelectedSkills((prev) => [
        ...prev,
        { id: value.trim(), name: value.trim() },
      ]);
    }
  };
  const onSearchFn = () => {
    onSearchSubmit({
      skills: selectedSkills.map((skill) => skill.name),
      city: city.map((item) => item.name),
    });
  };
  return (
    <div className="divide-y w-full flex flex-col gap-6 mt-4 pb-4 border-2 border-gray-50 shadow-md rounded-md px-4 pt-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative text-gray-700 flex-grow">
          <Selector
            options={skills.map((option) => {
              return { id: option.id, name: option.name };
            })}
            values={selectedSkills}
            setValues={setSelectedSkills}
            placeholder="Skills"
            displayValue="name"
            loading={false}
            isMulti={true}
          />
        </div>
        <div className="relative text-gray-700 flex-grow h-full">
          <Selector
            options={sortOptionsCity.map((option) => {
              return { id: option.value, name: option.label };
            })}
            values={city}
            setValues={setCity}
            placeholder="City"
            displayValue="name"
            loading={false}
            isMulti={true}
          />

          {/* <CreatableSelect
            instanceId="select-city "
            options={sortOptionsCity}
            isMulti
            isClearable
            styles={customStylesCity}
            onChange={handleChange}
            placeholder={"City"}
          /> */}
          {/* <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div> */}
        </div>
      </div>

      <button className="btn btn-primary w-full" onClick={onSearchFn}>
        Search
      </button>
      {/* <div className="flex cursor-pointer gap-2 justify-center items-end hover:text-blue-400 ease-in-trans">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <p>Filters</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div> */}
    </div>
  );
}
