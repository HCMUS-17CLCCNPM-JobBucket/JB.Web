import { imageAPI } from "app/api/modules/imageAPI";
import { jobAPI } from "app/api/modules/jobAPI";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select, { StylesConfig } from "react-select";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "../atoms/Loading";

const config = {
  charCounterCount: true,
  // imageUploadURL: "https://api.cloudinary.com/v1_1/derekzohar/image/upload",
  // imageUploadParams: {
  //   api_key: "866395791528912",
  //   upload_preset: "images",
  // },
  // imageUploadMethod: "POST",
  // events: {
  //   "froalaEditor.image.uploaded": (e, editor, response) => {
  //     response = JSON.parse(response);
  //     editor.image.insert(response.url, true, null, editor.image.get(), null);
  //     // return false;
  //   },
  // },
};
const FroalaEditorComponent: React.ComponentType<any> = dynamic(
  () => {
    return new Promise((resolve) => {
      try {
        import("froala-editor/js/plugins.pkgd.min.js")
          .then((e) => {
            import("react-froala-wysiwyg").then(resolve);
          })
          .catch((e) => {});
      } catch (error) {}
    });
  },
  {
    loading: () => <Loading />,
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

export default function Editor(props) {
  const disable =
    Math.abs(moment(props.createdDate).diff(moment.now(), "day")) >= 3;

  console.log(disable);
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
  const [id, setID] = useState(props.id);
  const [salaryCurrency, setCurrency] = useState("");
  const [salaryDuration, setDuration] = useState("");
  const [description, setDescription] = useState(props.description);
  const [benefits, setBenefit] = useState(props.benefits);
  const [experiences, setExpe] = useState(props.experiences);
  const [responsibilities, setRespons] = useState(props.responsibilities);
  const [requirements, setRequire] = useState(props.requirements);
  const [optionalRequirements, setOrequire] = useState(
    props.optionalRequirements
  );
  const [whyJoinUs, setWhyjoin] = useState(props.whyJoinUs);
  const [skills, setSkills] = useState([]);
  const [positions, setPositions] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const user = useSelector((state: any) => state.user);
  const [isUploadImg, setIsUploadImg] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(props.imageUrls);
  const expireDate = moment(props.expireDate);
  const [isMale, setGender] = useState(props.gender == "Male");
  const [isVisa, setVisa] = useState(props.isVisaSponsorship);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(e.target.files[0]));
  };
  const handleChangeExpire = (value) => {
    if (value != null) {
      formik.values.expireDate = moment(value).toISOString();
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
      imageUrls: props.imageUrls,
      description: props.description,
      priority: props.priority, // 0: low, 1: medium, 2: high
      addresses: props.addresses,
      cities: props.cities,
      minSalary: props.minSalary,
      maxSalary: props.maxSalary,
      salaryCurrency: props.salaryCurrency,
      salaryDuration: props.salaryDuration,
      skillIds: props.skillIds.map((skill) => skill.id),
      positionIds: props.positionIds.map((position) => position.id),
      typeIds: props.typeIds.map((type) => type.id),
      categoryIds: props.categoryIds.map((category) => category.id),
      isVisaSponsorship: props.isVisaSponsorship,
      expireDate: props.expireDate,
      benefits: benefits,
      experiences: experiences,
      responsibilities: responsibilities,
      requirements: requirements,
      optionalRequirements: optionalRequirements,
      cultures: props.cultures,
      whyJoinUs: whyJoinUs,
      numberEmployeesToApplied: props.numberEmployeesToApplied,
      jobForm: props.jobForm,
      gender: props.gender,
    },
    onSubmit: async (values) => {
      const dataToPost = {
        ...values,
        gender: isMale ? "Male" : "Female",
        isVisaSponsorship: isVisa,
        id,
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

      if (
        (imageFile == null && dataToPost.imageUrls.length == 0) ||
        dataToPost.title == ""
      ) {
        toast("Job must have title and images", { type: "warning" });
        return;
      }

      if (props.isEdit) {
        const res = await jobAPI.update({
          ...dataToPost,
        });
        if (res.status === 200) {
          toast("Update success");
          router.push("/recruiter/jobs");
        }
      } else {
        const imageRes: any = await imageAPI.uploadImage(imageFile);
        const res = await jobAPI.add(
          {
            ...dataToPost,
            imageUrls: [imageRes.data.url],
          },
          user.token
        );
        if (res.status === 200) toast("Create job success");
        router.push("/recruiter/jobs");
      }
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
          disabled={disable}
          value={formik.values.title}
          onChange={formik.handleChange}
          className="input"
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Images</label>
        {previewSource != null && previewSource != "" ? (
          <img
            src={previewSource}
            alt=""
            className="h-52 w-52 rounded-lg mb-4"
          />
        ) : (
          <img
            src="https://via.placeholder.com/160x160"
            alt=""
            className="h-52 w-52 rounded-lg mb-4"
          />
        )}
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
        <div className="flex md:flex-row gap-4 flex-col">
          <div className="flex flex-col md:w-80 w-full">
            <label>MinSalary</label>
            <input
              min="0"
              type="number"
              id="minSalary"
              name="minSalary"
              disabled={disable}
              value={formik.values.minSalary}
              onChange={formik.handleChange}
              className="input"
            />
          </div>
          <div className="flex flex-col md:w-80 w-full">
            <label>MaxSalary</label>
            <input
              min="0"
              type="number"
              id="maxSalary"
              name="maxSalary"
              disabled={disable}
              value={formik.values.maxSalary}
              onChange={formik.handleChange}
              className="input"
            />
          </div>
        </div>
        <label>Salary</label>
        <div className="flex gap-4">
          <div className="w-80">
            {props.isEdit ? (
              <Select
                defaultValue={{
                  value: formik.values.salaryCurrency,
                  label: formik.values.salaryCurrency,
                }}
                styles={customStyles}
                options={currencyoptions}
                placeholder="Currency"
                onChange={(value) => setCurrency(value.value)}
              />
            ) : (
              <Select
                styles={customStyles}
                options={currencyoptions}
                placeholder="Currency"
                onChange={(value) => setCurrency(value.value)}
              />
            )}
          </div>
          <div className="w-80">
            {props.isEdit ? (
              <Select
                defaultValue={{
                  value: formik.values.salaryDuration,
                  label: formik.values.salaryDuration,
                }}
                styles={customStyles}
                options={durationoptions}
                placeholder="Duration"
                onChange={(value) => setDuration(value.value)}
              />
            ) : (
              <Select
                styles={customStyles}
                options={durationoptions}
                placeholder="Duration"
                onChange={(value) => setDuration(value.value)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col md:w-80 w-full">
          <label>Number employees</label>
          <input
            min="0"
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
        {props.isEdit ? (
          <Select
            defaultValue={props.skillIds.map((skill) => ({
              value: skill.id,
              label: skill.name,
            }))}
            styles={customStyles}
            placeholder="Skills"
            isMulti
            options={skills}
            onChange={(value) => {
              formik.values.skillIds = value.map((skill) => skill.value);
            }}
          />
        ) : (
          <Select
            styles={customStyles}
            placeholder="Skills"
            isMulti
            options={skills}
            onChange={(value) =>
              (formik.values.skillIds = value.map((skill) => skill.value))
            }
          />
        )}
      </div>
      <div className="flex flex-col">
        <label>Positions</label>
        {props.isEdit ? (
          <Select
            defaultValue={props.positionIds.map((position) => ({
              value: position.id,
              label: position.name,
            }))}
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
        ) : (
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
        )}
      </div>
      <div className="flex flex-col">
        <label>Types</label>
        {props.isEdit ? (
          <Select
            defaultValue={props.typeIds.map((type) => ({
              value: type.id,
              label: type.name,
            }))}
            styles={customStyles}
            placeholder="Types"
            isMulti
            options={types}
            onChange={(value) =>
              (formik.values.typeIds = value.map((type) => type.value))
            }
          />
        ) : (
          <Select
            defaultValue={props.typeIds.map((type) => ({
              value: type.id,
              label: type.name,
            }))}
            styles={customStyles}
            placeholder="Types"
            isMulti
            options={types}
            onChange={(value) =>
              (formik.values.typeIds = value.map((type) => type.value))
            }
          />
        )}
      </div>
      <div className="flex flex-col">
        <label>Categories</label>
        {props.isEdit ? (
          <Select
            defaultValue={props.categoryIds.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
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
        ) : (
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
        )}
      </div>
      <div className="md:w-80 w-full flex flex-col">
        <label className="text-gray-700">Expire date</label>
        {props.isEdit ? (
          <input
            defaultValue={moment(props.expireDate).format("YYYY-MM-DD")}
            type="date"
            className="input"
            placeholder="Expire Date"
            min={moment().format("YYYY-MM-DD")}
            onChange={(e) => handleChangeExpire(e.target.value)}
          />
        ) : (
          <input
            defaultValue={moment().format("YYYY-MM-DD")}
            type="date"
            className="input"
            placeholder="Expire Date"
            min={moment().format("YYYY-MM-DD")}
            onChange={(e) => handleChangeExpire(e.target.value)}
          />
        )}
      </div>
      <div className="flex flex-col ">
        <label htmlFor="gender" className="text-gray-700">
          Gender
        </label>
        <div className="w-full py-2 text-base">
          <label className="inline-flex items-center">
            <input
              checked={isMale}
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => setGender(true)}
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              checked={!isMale}
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => setGender(false)}
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
              checked={isVisa}
              type="radio"
              name="visa"
              onChange={(e) => setVisa(true)}
            />
            <span className="ml-2 text-gray-700">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              checked={!isVisa}
              type="radio"
              name="visa"
              onChange={(e) => setVisa(false)}
            />
            <span className="ml-2 text-gray-700">No</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col">
        <label>Descriptions</label>
        <FroalaEditorComponent
          tag="textarea"
          config={config}
          model={description}
          onModelChange={(model) => setDescription(model)}
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
      {props.isEdit ? (
        <button className="btn btn-primary w-40" type="submit">
          Save changes
        </button>
      ) : (
        <button className="btn btn-primary w-40" type="submit">
          Post
        </button>
      )}
    </form>
  );
}
