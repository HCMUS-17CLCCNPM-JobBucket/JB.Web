import React, { useState } from "react";
import useOutsideClicked from "app/hooks/useOutsideClicked";

function SelectOption({ content }) {
  return (
    <div className="option">
      <input type="radio" className="radio" id={content} name="category" />
      <label htmlFor={content}>{content}</label>
    </div>
  );
}
export default function Selection() {
  const [selectActive, setSelectActive] = useState(false);
  const [value, setValue] = useState("Salary Range");
  const filters = [">= 1k", "<= 1k"];

  const { ref } = useOutsideClicked(() => setSelectActive(false));

  const handleOptionClicked = (_value) => {
    setSelectActive(false);
    setValue(_value);
  };
  return (
    <div className="select-box">
      <div
        className={`${selectActive && "active"} options-container`}
        ref={ref}
      >
        {filters.map((item, index) => (
          <div key={index} onClick={() => handleOptionClicked(item)}>
            <SelectOption content=">= $1k" />
          </div>
        ))}
      </div>
      <div className="selected" onClick={() => setSelectActive(!selectActive)}>
        {value}
      </div>
    </div>
  );
}
