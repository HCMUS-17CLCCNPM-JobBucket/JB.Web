import { blogAPI } from "app/api/modules/blogAPI";
import { imageAPI } from "app/api/modules/imageAPI";
import { jobAPI } from "app/api/modules/jobAPI";
import SalaryCurrencySelect from "app/components/atoms/Select/SalaryCurrencySelect";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select, { StylesConfig } from "react-select";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";

const config = {
  charCounterCount: true,
  imageUploadURL: "https://api.cloudinary.com/v1_1/derekzohar/image/upload",
  imageUploadParams: {
    api_key: "866395791528912",
    upload_preset: "images",
  },
  imageUploadMethod: "POST",
  events: {
    "froalaEditor.image.uploaded": (e, editor, response) => {
      response = JSON.parse(response);
      editor.image.insert(response.url, true, null, editor.image.get(), null);
      // return false;
    },
  },
};
const FroalaEditorComponent: React.ComponentType<any> = dynamic(
  () => {
    return new Promise((resolve) =>
      import("froala-editor/js/plugins.pkgd.min.js").then((e) => {
        import("react-froala-wysiwyg").then(resolve);
      })
    );
  },
  {
    loading: () => null,
    ssr: false,
  }
);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    border: "1px solid #D1D5DB",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  placeholder: (provided, state) => ({
    ...provided,
    color: "#9CA3C1",
  }),
};
export default function AddNewJob(props) {
  const currencyoptions = [
    { value: "VND", label: "VND" },
    { value: "USD", label: "USD" },
    { value: "EURO", label: "EURO" },
  ];
  const durationoptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];
  const [salaryCurrency, setCurrency] = useState("");
  const [salaryDuration, setDuration] = useState("");
  const [description, setDescrip] = useState("");
  const [benefits, setBenefit] = useState("");
  const [experiences, setExpe] = useState("");
  const [responsibilities, setRespons] = useState("");
  const [requirements, setRequire] = useState("");
  const [optionalRequirements, setOrequire] = useState("");
  const [whyJoinUs, setWhyjoin] = useState("");
  const [skills, setSkills] = useState([]);
  const [positions, setPositions] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const user = useSelector((state: any) => state.user);
  const [isUploadImg, setIsUploadImg] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };
  const handleChangeExpire = (value) => {
    if (value != null) {
      formik.values.expireDate = value.toISOString();
    } else {
      formik.values.expireDate = "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await jobAPI.getJobProperties();
      if (response.status === 200) {
        setSkills(
          response.data.data.jobProperties.skills.map((skill) => ({
            value: skill.id,
            label: skill.name,
          }))
        );
        setPositions(
          response.data.data.jobProperties.positions.map((position) => ({
            value: position.id,
            label: position.name,
          }))
        );
        setTypes(
          response.data.data.jobProperties.types.map((type) => ({
            value: type.id,
            label: type.name,
          }))
        );
        setCategories(
          response.data.data.jobProperties.categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: props.title,
      imageUrls: [],
      description: "",
      priority: 0, // 0: low, 1: medium, 2: high
      addresses: "",
      cities: "",
      minSalary: 0,
      maxSalary: 0,
      salaryCurrency: "",
      salaryDuration: "",
      skillIds: [],
      positionIds: [],
      typeIds: [],
      categoryIds: [],
      isVisaSponsorship: false,
      expireDate: null,
      benefits: "",
      experiences: "",
      responsibilities: "",
      requirements: "",
      optionalRequirements: "",
      cultures: "",
      whyJoinUs: "",
      numberEmployeesToApplied: 0,
      jobForm: "",
      gender: "",
    },
    onSubmit: async (values) => {
      const dataToPost = {
        ...values,
        salaryCurrency,
        salaryDuration,
        benefits,
        description,
        experiences,
        responsibilities,
        requirements,
        optionalRequirements,
        whyJoinUs,
      };

      const imageRes: any = await imageAPI.uploadImage(imageFile);
      const res = await jobAPI.add(
        {
          ...dataToPost,
          // imageUrl: imageRes.data.url,
        },
        user.token
      );
      console.log(res.status);
      if (res.status === 200) alert("add job success");
    },
  });

  return (
    <form className="py-4 flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      {/* <img
        src={previewSource || "https://via.placeholder.com/1134x160"}
        alt=""
        className="h-40 w-full object-cover rounded-lg"
      />
      <input type="file" onChange={handleImageChange} /> */}
      {/* <div className="flex justify-between">
        <div></div>
      </div> */}
      {/* <SalaryCurrencySelect
        values={[
          { name: "Emergency" },
          { name: "Actively hiring" },
          { name: "None" },
        ]}
        callback={() => {}}
      /> */}
      <div className="flex flex-col">
        <label className="text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="input"
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Images</label>
        <input type="file" onChange={handleImageChange} className="input" />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Address</label>
        <input
          type="text"
          id="addresses"
          name="addresses"
          placeholder="Enter your Address"
          className="input"
          value={formik.values.addresses}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">City</label>
        <input
          type="text"
          id="cities"
          name="cities"
          placeholder="Enter your City"
          className="input"
          value={formik.values.cities}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="flex flex-col w-80">
            <label>MinSalary</label>
            <input
              type="number"
              id="minSalary"
              value={formik.values.minSalary}
              onChange={formik.handleChange}
              className="input"
            />
          </div>
          <div className="flex flex-col w-80">
            <label>MaxSalary</label>
            <input
              type="number"
              id="maxSalary"
              value={formik.values.maxSalary}
              onChange={formik.handleChange}
              className="input"
            />
          </div>
        </div>
        <label>Salary</label>
        <div className="flex gap-4">
          <div className="w-80">
            <Select
              styles={customStyles}
              options={currencyoptions}
              placeholder="Currency"
              onChange={(value) => setCurrency(value.value)}
            />
          </div>
          <div className="w-80">
            <Select
              styles={customStyles}
              options={durationoptions}
              placeholder="Duration"
              onChange={(value) => setDuration(value.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-80">
          <label>Number employees</label>
          <input
            type="number"
            id="numberEmployeesToApplied"
            value={formik.values.numberEmployeesToApplied}
            onChange={formik.handleChange}
            className="input"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label>Skills</label>
        <Select
          styles={customStyles}
          placeholder="Skills"
          isMulti
          options={skills}
          onChange={(value) =>
            (formik.values.skillIds = value.map((skill) => skill.value))
          }
        />
      </div>
      <div className="flex flex-col">
        <label>Positions</label>
        <Select
          styles={customStyles}
          placeholder="Positions"
          isMulti
          options={positions}
          onChange={(value) =>
            (formik.values.positionIds = value.map(
              (position) => position.value
            ))
          }
        />
      </div>
      <div className="flex flex-col">
        <label>Types</label>
        <Select
          styles={customStyles}
          placeholder="Types"
          isMulti
          options={types}
          onChange={(value) =>
            (formik.values.typeIds = value.map((type) => type.value))
          }
        />
      </div>
      <div className="flex flex-col">
        <label>Categories</label>
        <Select
          styles={customStyles}
          placeholder="Categories"
          isMulti
          options={categories}
          onChange={(value) =>
            (formik.values.categoryIds = value.map(
              (category) => category.value
            ))
          }
        />
      </div>
      <div className="w-80 flex flex-col">
        <label className="text-gray-700">Expire date</label>
        <DatePicker
          onChange={(value) => handleChangeExpire(value)}
          format="DD-MM-YYYY"
          style={{ borderRadius: "0.5rem" }}
          size="large"
          disabledDate={(current) => {
            return current && current <= moment().subtract(1, "day");
          }}
        ></DatePicker>
      </div>
      <div className="flex flex-col ">
        <label htmlFor="gender" className="text-gray-700">
          Gender
        </label>
        <div className="w-full py-2 text-base">
          <label className="inline-flex items-center">
            <input
              // checked={cv.gender == "Male"}
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => (formik.values.gender = "Male")}
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              // checked={cv.gender == "Female"}
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => (formik.values.gender = "Female")}
            />
            <span className="ml-2 text-gray-700">Female</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col ">
        <label htmlFor="gender" className="text-gray-700">
          Visa Sponsorship
        </label>
        <div className="w-full py-2 text-base">
          <label className="inline-flex items-center">
            <input
              // checked={cv.gender == "Male"}
              type="radio"
              name="visa"
              onChange={(e) => (formik.values.isVisaSponsorship = true)}
            />
            <span className="ml-2 text-gray-700">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              // checked={cv.gender == "Female"}
              type="radio"
              name="visa"
              onChange={(e) => (formik.values.isVisaSponsorship = false)}
            />
            <span className="ml-2 text-gray-700">No</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col">
        <label>Descriptions</label>
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Descriptions" }}
          model={description}
          onModelChange={(model) => setDescrip(model)}
        />
      </div>
      <div className="flex flex-col">
        <label>Benefits</label>
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Benefits" }}
          model={benefits}
          onModelChange={(model) => setBenefit(model)}
        />
      </div>
      <div className="flex flex-col">
        <label>Experiences</label>
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Experiences" }}
          model={experiences}
          onModelChange={(model) => setExpe(model)}
        />
      </div>
      <div className="flex flex-col">
        <label>Responsibilities</label>
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Responsibilities" }}
          model={responsibilities}
          onModelChange={(model) => setRespons(model)}
        />
      </div>
      <div className="flex flex-col">
        <label>Requirements</label>
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Requirements" }}
          model={requirements}
          onModelChange={(model) => setRequire(model)}
        />
      </div>
      <div className="flex flex-col">
        <label>Optional Requirements</label>
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Optional Requirements" }}
          model={optionalRequirements}
          onModelChange={(model) => setOrequire(model)}
        />
      </div>
      <div className="flex flex-col">
        <label>Why Join Us</label>
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Why Join Us" }}
          model={whyJoinUs}
          onModelChange={(model) => setWhyjoin(model)}
        />
      </div>
      <button className="btn btn-primary w-40" type="submit">
        Post
      </button>
    </form>
  );
}
