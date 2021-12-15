import ActivitySection from "app/components/molecules/ActivitySection";
import ComponentWithLabel from "app/components/molecules/ComponentWithLabel";
import SkillSection from "app/components/molecules/SkillSection";
import { useFormik } from "formik";
import React, { useState } from "react";
import { SkillButton } from ".";

export default function UpdateProfile() {
  //false: female, true: male
  const [gender, setGender] = useState(true);
  const [skills, setSkills] = useState([]);
  const [activities, setActivities] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [awards, setAwards] = useState([]);
  const [educations, setEducations] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      avatarUrl: "",
      gender: "",
      phone: "",
      address: "",
      introduction: "",
      website: "",
      github: "",
      reference: "",
      skills: [],
      activities: [],
      certifications: [],
      awards: [],
      educations: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="px-48 py-12 ">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <ComponentWithLabel label="Avatar">
          {/* <input
            type="text"
            id="avatarUrl"
            name="avatarUrl"
            className="input"
            placeholder="Avatar"
            value={formik.values.avatarUrl}
            onChange={formik.handleChange}
          /> */}
          <div>
            <div className="shrink-0">
              <img
                className="h-16 w-16 object-cover rounded-full"
                src={previewSrc || "/avatar/avatar.png"}
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </ComponentWithLabel>
        <div className="flex gap-8 items-center">
          <ComponentWithLabel label="Name" styles="w-4/5">
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              placeholder="John Smith"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </ComponentWithLabel>

          <ComponentWithLabel label="Gender">
            <div className="flex items-center gap-8 mt-3">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="vehicle"
                  className="h-5 w-5 text-red-600"
                  checked={gender}
                  onChange={() => setGender(true)}
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="vehicle"
                  className="h-5 w-5 text-red-600"
                  checked={gender}
                  onChange={() => setGender(false)}
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
          </ComponentWithLabel>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <ComponentWithLabel label="Address" styles="col-span-4">
            <input
              type="text"
              id="address"
              name="address"
              className="input"
              placeholder=""
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </ComponentWithLabel>
          <ComponentWithLabel label="Phone">
            <input
              type="text"
              id="phone"
              name="phone"
              className="input"
              placeholder="09123456789"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </ComponentWithLabel>
        </div>

        <ComponentWithLabel label="Introduction">
          <textarea
            id="introduction"
            name="introduction"
            className="input"
            placeholder="Introduction"
            value={formik.values.introduction}
            onChange={formik.handleChange}
            minLength={10}
          />
        </ComponentWithLabel>
        <div className="grid grid-cols-2 gap-4">
          <ComponentWithLabel label="Website">
            <input
              type="text"
              id="website"
              name="website"
              className="input"
              placeholder="www.google.com"
              value={formik.values.website}
              onChange={formik.handleChange}
            />
          </ComponentWithLabel>
          <ComponentWithLabel label="Github">
            <input
              type="text"
              id="github"
              name="github"
              className="input"
              placeholder="www.github.com"
              value={formik.values.github}
              onChange={formik.handleChange}
            />
          </ComponentWithLabel>
        </div>
        <ComponentWithLabel label="Reference">
          <input
            type="text"
            id="reference"
            name="reference"
            className="input"
            placeholder="Reference"
            value={formik.values.reference}
            onChange={formik.handleChange}
          />
        </ComponentWithLabel>
        <SkillSection values={skills} setValues={setSkills} />
        <ActivitySection values={activities} setValues={setActivities} />
        <ActivitySection
          values={certifications}
          setValues={setCertifications}
        />

        <ComponentWithLabel label="Awards">
          <input
            type="text"
            id=""
            name=""
            className="input"
            placeholder=""
            value={formik.values.avatarUrl}
            onChange={formik.handleChange}
          />
        </ComponentWithLabel>
        <ComponentWithLabel label="Educations">
          <input
            type="text"
            id=""
            name=""
            className="input"
            placeholder=""
            value={formik.values.avatarUrl}
            onChange={formik.handleChange}
          />
        </ComponentWithLabel>

        <button className="btn btn-primary w-40" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
