import { useFormik } from "formik";
import React, { useState } from "react";
import { ExperienceItem } from "../layouts/ProfileLayout";
import ComponentWithLabel from "./ComponentWithLabel";

export default function ExperienceSection({ values, setValues }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");

  const handleAdd = () => {
    if (company && position && duration) {
      setValues((prev) => [
        ...prev,
        {
          company,
          position,
          duration,
        },
      ]);
      setCompany("");
      setPosition("");
      setDuration("");
    }
  };

  return (
    <ComponentWithLabel label="Experiences">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Company"
            className="input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            className="input"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Duration"
            className="input"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-primary w-40 h-10"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="flex gap-4 flex-wrap ml-4">
          {values.map((item, index) => (
            <div key={index}>
              <ExperienceItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </ComponentWithLabel>
  );
}
