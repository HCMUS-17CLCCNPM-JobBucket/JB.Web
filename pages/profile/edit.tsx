import { imageAPI } from "app/api/modules/imageAPI";
import UserAPI from "app/api/modules/userAPI";
import AddStringSection from "app/components/molecules/AddStringSection";
import ComponentWithLabel from "app/components/molecules/ComponentWithLabel";
import EducationSection from "app/components/molecules/EducationSection";
import ExperienceSection from "app/components/molecules/ExperienceSection";
import SkillSection from "app/components/molecules/SkillSection";
import { useFormik } from "formik";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Head from "next/head";

export default function UpdateProfile() {
  const [profile, setProfile] = useState<any>({});
  //false: female, true: male
  const [gender, setGender] = useState(true);
  const [skills, setSkills] = useState([]);
  const [activities, setActivities] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [awards, setAwards] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");

  useEffect(() => {
    UserAPI.getProfile().then((res) => {
      const data = res.data.data.profiles[0];
      setProfile(data);

      setGender(data.gender === "Male");
      setSkills(data.skills);
      setActivities(data.activities);
      setCertifications(data.certifications);
      setAwards(data.awards);
      setEducations(data.educations);
      setExperiences(data.experiences);
      setPreviewSrc(data.avatarUrl);
    });
  }, []);
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
      name: profile.name || "",
      avatarUrl: profile.avatarUrl || "",
      gender: "",
      phone: profile.phone || "",
      address: profile.address || "",
      introduction: profile.introduction || "",
      website: profile.website || "",
      github: profile.github || "",
      reference: profile.reference || "",
      skills: [],
      activities: [],
      certifications: [],
      awards: [],
      educations: [],
    },
    onSubmit: async (values) => {
      const dataToPost = {
        ...values,
        gender: gender === true ? "Male" : "Female",
        skills,
        activities,
        certifications,
        awards,
        educations,
        experiences,
      };
      if (imageFile) {
        const imageRes: any = await imageAPI.uploadImage(imageFile);
        UserAPI.updateProfile({
          ...dataToPost,
          avatarUrl: imageRes.data.url ? imageRes.data.url : "",
        }).then((res) => {
          router.push("/profile");
        });
      } else {
        UserAPI.updateProfile(dataToPost).then((res) => {
          router.push("/profile");
          toast("🦄 Your profile has updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      }
    },
  });
  return (
    <div className="px-48 py-12 ">
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>Update {profile.name} Profile | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
                  checked={gender === true}
                  onChange={() => setGender(true)}
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="vehicle"
                  className="h-5 w-5 text-red-600"
                  checked={gender === false}
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
            className="input h-[150px]"
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
        <AddStringSection
          values={activities}
          setValues={setActivities}
          label="Activities"
        />
        <AddStringSection
          values={certifications}
          setValues={setCertifications}
          label="Certifications"
        />
        <AddStringSection
          values={awards}
          setValues={setAwards}
          label="Awards"
        />

        <EducationSection values={educations} setValues={setEducations} />
        <ExperienceSection values={experiences} setValues={setExperiences} />
        <button className="btn btn-primary w-40" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
