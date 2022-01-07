import { XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import ComponentWithLabel from "./ComponentWithLabel";

export default function AddStringSection({ values, setValues, label }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value !== "") {
      setValues((prev) => [...prev, value]);
      setValue("");
    }
  };

  return (
    <ComponentWithLabel label={label}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            id=""
            name=""
            className="input"
            placeholder="Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary w-40 h-10"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {values.map((item, index) => (
            <div key={index} className="flex gap-2 group ml-4">
              {item}
              <XIcon
                className="h-4 w-4 text-red-600 hidden group-hover:block cursor-pointer"
                onClick={() => {
                  setValues((prev) => prev.filter((_, i) => i !== index));
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </ComponentWithLabel>
  );
}
