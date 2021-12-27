import { blogAPI } from "app/api/modules/blogAPI";
import { imageAPI } from "app/api/modules/imageAPI";
import { jobAPI } from "app/api/modules/jobAPI";
import DropdownComponent from "app/components/atoms/Select/SalaryCurrencySelect";
import ComponentWithLabel from "app/components/molecules/ComponentWithLabel";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select, { StylesConfig } from "react-select";

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
    // backgroundColor: "white",
    // zIndex: 100,
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    borderRadius: "0.5rem",
    border: "1px solid #D1D5DB",
  }),
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = "opacity 300ms";

  //   return { ...provided, opacity, transition };
  // },
  placeholder: (provided, state) => ({
    ...provided,
    color: "#9CA3C1",
  }),
};

export default function AddNewJob() {
  const [isUploadImg, setIsUploadImg] = useState(true);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [jobFilterOptions, setJobFilterOptions] = useState<any>({});
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    jobAPI.getJobProperties().then((res) => {
      setJobFilterOptions(res.data.data.jobProperties);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      imageUrls: [],
      description: "",
      priority: 0, // 0: low, 1: medium, 2: high
      addresses: [],
      cities: [],
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
      gender: 0,
    },
    onSubmit: async (values) => {
      const imageRes: any = await imageAPI.uploadImage(imageFile);
      const res = await jobAPI.add({
        ...values,
        imageUrl: imageRes.data.url,
        content,
      });

      if (res.status === 200) router.push("/blog/" + res.data.data.blog.add.id);
    },
  });

  return (
    <form
      className="px-48 py-4 flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
    >
      {/* <img
        src={previewSource || "https://via.placeholder.com/1134x160"}
        alt=""
        className="h-40 w-full object-cover rounded-lg"
      />
      <input type="file" onChange={handleImageChange} /> */}
      {/* <div className="flex justify-between">
        <div></div>
      </div> */}
      <ComponentWithLabel label="Priority">
        <DropdownComponent
          values={[
            { name: "Emergency" },
            { name: "Actively hiring" },
            { name: "None" },
          ]}
          callback={() => {}}
        />
      </ComponentWithLabel>
      <ComponentWithLabel label="Title">
        <input
          type="text"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="input"
          placeholder="Title"
        />
      </ComponentWithLabel>
      <ComponentWithLabel label="Image Header">
        <input type="file" onChange={handleImageChange} className="input" />
      </ComponentWithLabel>
      <ComponentWithLabel label="Address">
        <input
          type="text"
          id="Address"
          placeholder="Enter your Address"
          className="input"
        />
        <div>{/* list address */}</div>
      </ComponentWithLabel>
      <ComponentWithLabel label="City">
        <input
          type="text"
          id="City"
          placeholder="Enter your City"
          className="input"
        />
        <div>{/* list City */}</div>
      </ComponentWithLabel>
      <ComponentWithLabel label="Salary">
        <div className="flex gap-2">
          <input
            type="number"
            id="minSalary"
            defaultValue={0}
            value={formik.values.minSalary}
            onChange={formik.handleChange}
            className="input"
          />
          <input
            type="number"
            id="maxSalary"
            defaultValue={0}
            value={formik.values.maxSalary}
            onChange={formik.handleChange}
            className="input"
          />

          <DropdownComponent
            values={[{ name: "VND" }, { name: "USD" }, { name: "Euro" }]}
            callback={() => {}}
          />
          <DropdownComponent
            values={[{ name: "Week" }, { name: "Month" }, { name: "Year" }]}
            callback={() => {}}
          />
        </div>
      </ComponentWithLabel>

      <ComponentWithLabel label="Skills">
        <Select
          styles={customStyles}
          placeholder="Skills"
          options={jobFilterOptions.skills.map((skill) => {
            return { value: skill.name, label: skill.name };
          })}
        />
      </ComponentWithLabel>
      <ComponentWithLabel label="Positions">
        <Select
          styles={customStyles}
          placeholder="Positions"
          options={jobFilterOptions.positions.map((skill) => {
            return { value: skill.name, label: skill.name };
          })}
        />
      </ComponentWithLabel>
      {/* <ComponentWithLabel label="Benefits">
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Benefits" }}
          model={content}
          onModelChange={(model) => setContent(model)}
        />
      </ComponentWithLabel> */}
      {/* <ComponentWithLabel label="Experiences">
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Experiences" }}
          model={content}
          onModelChange={(model) => setContent(model)}
        />
      </ComponentWithLabel>
      <ComponentWithLabel label="Descriptions">
        <FroalaEditorComponent
          tag="textarea"
          config={{ ...config, placeholderText: "Descriptions" }}
          // model={content}
          // onModelChange={(model) => setContent(model)}
          model={formik.values.description}
          onModelChange={formik.handleChange}
        />
      </ComponentWithLabel> */}

      <button className="btn btn-primary w-40" type="submit">
        Post
      </button>
    </form>
  );
}
