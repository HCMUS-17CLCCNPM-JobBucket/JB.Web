import React from "react";
import ComponentWithLabel from "./ComponentWithLabel";

export default function QAInterviewSection() {
  return (
    <div>
      <ComponentWithLabel label="Question">
        <input type="text" className="input" />
      </ComponentWithLabel>
      <ComponentWithLabel label="Answer">
        <input type="text" className="input" />
      </ComponentWithLabel>
      <ComponentWithLabel label="Note">
        <input type="text" className="input" />
      </ComponentWithLabel>
      <ComponentWithLabel label="Rating">
        <input
          type="number"
          className="input"
          max={5}
          min={1}
          defaultValue={5}
        />
      </ComponentWithLabel>
    </div>
  );
}
