import React, { useState } from "react";

export default function Checkbox({ content, callback }) {
  const [checked, setChecked] = useState(false);

  const handleClick = (e) => {
    if (e.target.checked === true) {
      callback();
    }
  };
  return (
    <div>
      <input id="c1" type="checkbox" onChange={handleClick} />
      <label htmlFor="c1">{content}</label>
    </div>
  );
}
