import axios from "axios";
import { useFormik } from "formik";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { DatePicker } from "react-rainbow-components";
import JobAPI from "app/api/modules/jobAPI";
import router from "next/router";
import InputWithLabel from "app/components/atoms/input-with-label";
import SelectWithLabel from "app/components/atoms/select-with-label";
import moment from "moment";
import { actions } from "app/redux/features/notification";

export const getServerSideProps = async ({ params }) => {
  const infoJob = await JobAPI.getJobById(params.id, "");

  return {
    props: infoJob.data.data,
  };
};

export default function index(props) {
  const [skill, setSkill] = useState<Array<any>>([]);
  const [position, setPosition] = useState<Array<any>>([]);
  const [education, setEducation] = useState<Array<any>>([]);

  const [category, setCategory] = useState({
    value: props.category.id,
    label: props.category.name,
  });

  const [gender, setGender] = useState(0);
  const [jobForm, setJobForm] = useState("FullTime");

  const user = useSelector((state: any) => state.user);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);

  const [value, setValue] = useState(props.description);
  const [requirement, setRequirement] = useState(props.requirement);
  const [experience, setExperience] = useState(props.experience);
  const [benefit, setBenefit] = useState(props.benefit);

  const [imageUrls, setImageUrl] = useState([]);
  const [startDate, setStartDate] = useState<any>(props.expireDate);
  const dispatch = useDispatch();
  const jobTypeOptions = [
    {
      value: "Full Time",
      label: "Full Time",
    },
    {
      value: "Part Time",
      label: "Part Time",
    },
    {
      value: "Freelance",
      label: "Freelance",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      axios
        .all([
          JobAPI.getCategories(),
          JobAPI.getListSkill(),
          JobAPI.getListEducation(),
          JobAPI.getListPosition(),
        ])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responseThree = responses[2];
            const responseFour = responses[3];

            setCategoryOptions(
              responseOne.data.data.map((item) => {
                return { value: item.id, label: item.name };
              })
            );

            if (responseTwo.status === 200)
              setSkillOptions(
                responseTwo.data.data.map((item) => {
                  return { value: item.id, label: item.name };
                })
              );
            if (responseThree.status === 200)
              setEducationOptions(
                responseThree.data.data.map((item) => {
                  return { value: item.id, label: item.name };
                })
              );
            if (responseFour.status === 200)
              setPositionOptions(
                responseFour.data.data.map((item) => {
                  return { value: item.id, label: item.name };
                })
              );
          })
        )
        .catch((errors) => {
          // react on errors.
        });
    };
    const fetchCategory = async () => {
      const res = await JobAPI.getCategories();
      if (res.status === 200) {
        setCategoryOptions(
          res.data.data.map((item) => {
            return { value: item.id, label: item.name };
          })
        );
      }
    };
    fetchCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: props.title,
      description: value,
      isActive: true,
      address: props.address,
      city: props.city,
      minSalary: props.minSalary,
      maxSalary: props.maxSalary,
      skillIds: skill,
      positionIds: position,
      educationIds: education,
      categoryId: category,
      imageUrls: imageUrls,
      expireDate: startDate,
      //
      benefits: props.benefits,
      experiences: props.experiences,
      requirements: props.requirements,
      numberEmployeesToApplied: props.numberEmployeesToApplied,
      jobForm: props.jobForm,
      gender: props.gender,
    },
    onSubmit: async (values) => {
      // const dataToPost = {...values};
      // const res = await JobAPI.postJob(dataToPost, user.token);
      // res.data === 200 && router.push("/recruit/company/jobs");
      await axios
        .put(
          process.env.url + "/api/job/" + props.id,
          {
            ...values,
            description: value,
            skillIds: skill,
            positionIds: position,
            educationIds: education,
            categoryId: category.value,
            imageUrls: imageUrls,
            expireDate: startDate,
            benefit: benefit,
            experience: experience,
            requirement: requirement,
            jobForm: jobForm,
            gender: gender,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            router.back();
            dispatch(
              actions.createAlert({
                message: "Job has updated",
                type: "success",
              })
            );
          }
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <div>
      <Head>
        <title>New job | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <section className="p-6 bg-gray-100 text-gray-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Basic Information</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <InputWithLabel
                title="Title"
                id="title"
                type="text"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                styles="col-span-full"
              />
              <InputWithLabel
                title="Address"
                id="address"
                type="text"
                placeholder=""
                value={formik.values.address}
                onChange={formik.handleChange}
                styles="col-span-full"
              />
              <InputWithLabel
                title="City"
                id="city"
                type="text"
                placeholder=""
                value={formik.values.city}
                onChange={formik.handleChange}
                styles="col-span-full"
              />

              <div className="col-span-full">
                <label htmlFor="city" className="text-sm">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={(item) => setValue(item)}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Recruit Information</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <InputWithLabel
                title="Min Salary"
                id="minSalary"
                type="number"
                placeholder="0"
                value={formik.values.minSalary}
                onChange={formik.handleChange}
                styles="col-span-full sm:col-span-3"
              />
              <InputWithLabel
                title="Max Salary"
                id="maxSalary"
                type="number"
                placeholder="0"
                value={formik.values.maxSalary}
                onChange={formik.handleChange}
                styles="col-span-full sm:col-span-3"
              />
              <SelectWithLabel
                title="Skills"
                id="skill-select"
                options={skillOptions}
                value={skill}
                onChange={(val) => console.log(val)}
                placeholder="Skills"
                styles="col-span-full"
                selectStyles=""
              />
              <SelectWithLabel
                title="Education"
                id="education-select"
                options={educationOptions}
                value={education}
                onChange={(val) => console.log(val)}
                placeholder="Educations"
                styles="col-span-full"
                selectStyles=""
              />
              <SelectWithLabel
                title="Positions"
                id="position-select"
                options={positionOptions}
                value={position}
                onChange={(val) => console.log(val)}
                placeholder="Positions"
                styles="col-span-full"
                selectStyles=""
              />
              <SelectWithLabel
                title="Category"
                id="category-select"
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Category"
                styles="col-span-full lg:col-span-2"
                selectStyles=""
              />

              <div className="col-span-full sm:col-span-3 lg:col-span-2">
                <label htmlFor="username" className="text-sm">
                  Job Type
                </label>
                <Select
                  instanceId="position-select"
                  options={jobTypeOptions}
                  onChange={(val) => setJobForm(val.value)}
                  // onChange={formik.handleChange}
                  // styles={customStyle  s}
                  placeholder="Fulltime"
                />
              </div>
              <div className="col-span-full lg:col-span-2">
                <label htmlFor="username" className="text-sm">
                  Number of Employees
                </label>
                <input
                  id="numberEmployeesToApplied"
                  name="numberEmployeesToApplied"
                  value={formik.values.numberEmployeesToApplied}
                  onChange={formik.handleChange}
                  type="number"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-600 border-gray-300 text-gray-900"
                />
              </div>

              <div className="col-span-full">
                <DatePicker
                  minDate={new Date()}
                  placeholder="Select a date"
                  value={startDate}
                  label="Expired Date"
                  onChange={(value) =>
                    setStartDate(
                      moment(value).format("YYYY-MM-DDTHH:mm:ss.sss")
                    )
                  }
                />
              </div>

              <div className="col-span-full flex flex-col md:flex-row ">
                <p>Gender</p>
                <div className="md:ml-16 flex items-center gap-8">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="vehicle"
                      onChange={() => setGender(0)}
                      className="h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">Both</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="vehicle"
                      onChange={() => setGender(1)}
                      className="h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="vehicle"
                      onChange={() => setGender(2)}
                      className="h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="website" className="text-sm">
                  Experience
                </label>
                <ReactQuill
                  theme="snow"
                  value={experience}
                  onChange={(item) => setExperience(item)}
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="website" className="text-sm">
                  Requirement
                </label>
                <ReactQuill
                  theme="snow"
                  value={requirement}
                  onChange={(item) => setRequirement(item)}
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="website" className="text-sm">
                  Benefit
                </label>
                <ReactQuill
                  theme="snow"
                  value={benefit}
                  onChange={(item) => setBenefit(item)}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Photo</p>
            </div>
            <div className="col-span-full">
              <label className="text-sm">Photo</label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Post a new job
          </button>
        </form>
      </section>
    </div>
  );
}
