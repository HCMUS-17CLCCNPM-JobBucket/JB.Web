import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Selector from "../atoms/Select/Selector";

export default function Filters({ filters, callback, loading }) {
  const [scrollOverHeight, setScrollOverHeight] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});

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
        // [section.name.toLowerCase()]: [
        //   ...selectedFilter[section.name.toLowerCase()],
        //   newValue[newValue.length - 1],
        // ],
        [section.name.toLowerCase()]: [...newValue],
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
              values={
                section.value
                  ? section.value.map((value) => ({
                      id: value,
                      name: section.options.find(
                        (option) => option.id === value
                      )?.name,
                    }))
                  : []
              }
              setValues={(e) => handleChange(e, section)}
              placeholder={
                section.options.length > 0 ? section.options[0].name : ""
              }
              displayValue="name"
              loading={loading}
              isMulti={true}
              creatable={false}
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
