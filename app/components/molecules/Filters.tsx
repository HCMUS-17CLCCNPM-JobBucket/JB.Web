import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Selector from "../atoms/Select/Selector";

function Panel({ section, handleChange }) {
  const [list, setList] = useState(
    section.options.map((option) => {
      return { ...option, checked: false };
    })
  );
  const [filteredList, setFilteredList] = useState(list);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value !== "") {
      setFilteredList(
        section.options.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredList(list);
    }
  }, [value]);

  const updateFilteredList = (e, optionIdx, option) => {
    let newList = [...list];
    newList[optionIdx].checked = !newList[optionIdx].checked;

    setList(newList);
    handleChange(e, section, option);
  };
  return (
    <div className="space-y-4">
      <input
        type="text"
        className="input"
        placeholder="keyword"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {filteredList.map((option, optionIdx) => (
        <div key={option.id} className="flex items-center">
          <input
            id={`filter-${section.id}-${optionIdx}`}
            name={`${section.id}[]`}
            defaultValue={option.id}
            type="checkbox"
            defaultChecked={option.checked}
            onChange={(e) => updateFilteredList(e, optionIdx, option)}
            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor={`filter-${section.id}-${optionIdx}`}
            className="ml-3 text-sm text-gray-600"
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default function Filters({ filters, callback }) {
  const [scrollOverHeight, setScrollOverHeight] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});

  useEffect(() => {
    const query = Router.query as any;
    if (query.category) {
      const category = query.category.split(",");
      setSelectedFilter((oldObj) => ({
        ...oldObj,
        category: category.map((item) => filters[4].options[parseInt(item)]),
      }));
    }
  }, []);
  const handleChange = (value, section) => {
    if (value.length === 0) {
      setSelectedFilter({
        ...selectedFilter,
        page: 1,
        [section.name.toLowerCase()]: [],
      });
      return;
    }
    const newValue = value.map((item) => item.id);

    if (newValue.length === 0)
      setSelectedFilter({
        ...selectedFilter,
        page: 1,
        [section.name.toLowerCase()]: [],
      });

    //if section.name exists in selectedFilter, add last item of newValue to it
    if (selectedFilter[section.name.toLowerCase()])
      setSelectedFilter({
        ...selectedFilter,
        page: 1,
        [section.name.toLowerCase()]: [
          ...selectedFilter[section.name.toLowerCase()],
          newValue[newValue.length - 1],
        ],
      });
    else
      setSelectedFilter({
        ...selectedFilter,
        page: 1,
        [section.name.toLowerCase()]: [...newValue],
      });
  };

  const handleSubmit = () => callback(selectedFilter);

  return (
    <form
      className={`filter sticky top-24 w-full h-[570px] hidden lg:block lg:col-span-3 overflow-y-scroll`}
    >
      <div className="flex flex-col gap-4">
        {filters.map((section) => (
          <div key={section.id} className="flex flex-col gap-1">
            <p className="font-semibold text-gray-500">{section.name}</p>
            <Selector
              options={section.options.map((option) => {
                return { id: option.id || option.value, name: option.name };
              })}
              values={[]}
              setValues={(e) => handleChange(e, section)}
              placeholder={
                section.options.length > 0 ? section.options[0].name : ""
              }
              displayValue="name"
              loading={false}
              isMulti={true}
            />
          </div>
        ))}
      </div>
      <div className="fixed bottom-5 left-32 flex justify-center items-center mt-4">
        <button
          onClick={handleSubmit}
          type="button"
          className="px-8 py-3 font-semibold rounded-full bg-blue-600 text-white "
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
