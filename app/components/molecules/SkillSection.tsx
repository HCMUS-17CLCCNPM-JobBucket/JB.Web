import { SkillButton } from "pages/profile";
import React, { useState } from "react";
import ComponentWithLabel from "./ComponentWithLabel";

export default function SkillSection({ values, setValues }) {
  const [value, setValue] = useState("");
  const [level, setLevel] = useState(1);

  const handleAdd = () => {
    if (value !== "") {
      setValues((prev) => [...prev, { skillName: value, level }]);
      setValue("");
      setLevel(1);
    }
  };

  return (
    <ComponentWithLabel label="Skills">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            id=""
            name=""
            className="input"
            placeholder=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <input
            type="number"
            className="input"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          />
          <button
            type="button"
            className="btn btn-primary w-40 h-10"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="flex gap-4">
          {values.map((item, index) => (
            <div key={index}>
              <SkillButton
                {...item}
                index={index}
                onDelete={() => {
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
