import JobAPI from "app/api/modules/jobAPI";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import CreatableSelect from "react-select/creatable";
import * as Yup from "yup";

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

export default function EmployeeFilter({
  handleSearchSubmit,
  handleFilterSubmit,
}) {
  const [keyword, setKeyword] = useState("");
  const typingTimeoutRef = useRef(null);
  const handleChange = (newValue: any, actionMeta: any) => {
    handleFilterSubmit(newValue);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      handleSearchSubmit(e.target.value);
    }, 500);
  };
  return (
    <div className="divide-y w-full flex flex-col gap-6 mt-4 pb-4 border-2 border-gray-50 shadow-md rounded-md px-4 pt-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative text-gray-700 flex-grow">
          <input
            className="w-full bg-gray-100 focus:bg-white h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            placeholder="Your keyword"
            value={keyword}
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </div>
        </div>
        <div className="relative text-gray-700 flex-grow h-full">
          <CreatableSelect
            instanceId="select-city "
            options={sortOptionsCity}
            isMulti
            isClearable
            styles={customStylesCity}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
        </div>
      </div>
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
