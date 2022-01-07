import { useFormik } from "formik";
import React, { useState } from "react";
import { EducationItem } from "../layouts/ProfileLayout";
import ComponentWithLabel from "./ComponentWithLabel";

export default function EducationSection({ values, setValues }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");
  const [profession, setProfession] = useState("");

  const handleAdd = () => {
    if (school !== "" && major && status && profession) {
      setValues((prev) => [
        ...prev,
        {
          school,
          major,
          status,
          profession,
        },
      ]);
      setSchool("");
      setMajor("");
      setStatus("");
      setProfession("");
    }
  };

  return (
    <ComponentWithLabel label="Educations">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="School"
            className="input"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
          <input
            type="text"
            placeholder="Major"
            className="input"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Status: Graduated, In-progress, etc."
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <input
            type="text"
            placeholder="Profession: Student, Teacher, etc."
            className="input"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-primary w-40 h-10"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="flex gap-4 ml-4">
          {values.map((item, index) => (
            <div key={index}>
              <EducationItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </ComponentWithLabel>
  );
}
