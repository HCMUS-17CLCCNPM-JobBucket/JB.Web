import React, { useState } from "react";

export default function Checkbox({ active, content, callback }) {
  const [checked, setChecked] = useState(active);

  const handleClick = () => {
    setChecked(!checked);
    if (checked) callback();
  };
  return (
    <div onClick={handleClick}>
      <input id="c1" type="checkbox" value={checked} />
      <label htmlFor="c1">{content}</label>
    </div>
  );
}
