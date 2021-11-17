import React, { useState } from "react";
import Checkbox from "../Toggle/Checkbox";

export default function CVButton() {
  const [active, setActive] = useState(false);
  return (
    <div onClick={() => setActive(!active)} className="">
      <p></p>
    </div>
  );
}
