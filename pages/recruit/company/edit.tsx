import UserAPI from "app/api/modules/userAPI";
import RequiredText from "app/components/atoms/required-text";
import { storage } from "app/firebase";
import { updateProfile } from "app/redux/features/user";
import { useFormik } from "formik";
import moment from "moment";
import dynamic from "next/dynamic";
import Head from "next/head";
import router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "react-rainbow-components";
import { useDispatch, useSelector } from "react-redux";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const isFirebaseUrl = (str) => str.includes("firebasestorage.googleapis.com");
import { MultiSelect, Option } from "react-rainbow-components";
import JobAPI from "app/api/modules/jobAPI";
import { getAvatar } from "app/utils/getAvatar";

export default function index() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [gender, setGender] = useState(user.user.gender);
  const [address, setAddress] = useState(user.user.addressLine[0]);
  const [date, setDate] = useState<any>(user.user.birthDate);
  const [isProgress, setIsProgress] = useState(false);

  const [skillOptions, setSkillOptions] = useState([]);
  const [skill, setSkill] = useState([]);

  const [image, setImage] = useState({
    imageView: null,
    imagePost: null,
  });

  useMemo(async () => {
    const res = await JobAPI.getListSkill();
    if (res.status === 200) {
      setSkillOptions(res.data.data);
    }
  }, []);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // setPostedImg(event.target.files[0]);
      setImage({
        imageView: URL.createObjectURL(event.target.files[0]),
        imagePost: event.target.files[0],
      });
    }
  };
  const handleUpload = (dataToPost) => {
    const uploadTask = storage
      .ref(`images/${image.imagePost.name}`)
      .put(image.imagePost);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // console.log(image);
        storage
          .ref("images")
          .child(image.imagePost.name)
          .getDownloadURL()
          .then(async (url) => {
            const res = await UserAPI.updateEmployerDetail(
              { ...dataToPost, avatarUrl: url },
              user.token
            );
            if (res.status === 200) {
              if (isFirebaseUrl(user.user.avatarUrl)) {
                let photoRef = storage.refFromURL(user.user.avatarUrl);
                photoRef.delete();
              }
              dispatch(updateProfile({ ...dataToPost, avatarUrl: url }));
              router.back();
              setIsProgress(false);
            } else {
              setIsProgress(false);
            }
          });
      }
    );
  };
  const formik = useFormik({
    initialValues: {
      userRoles: user.user.userRoles,
      birthDate: user.user.birthDate !== undefined ? user.user.birthDate : "",
      phoneNumber:
        user.user.phoneNumber !== undefined ? user.user.phoneNumber : "",
      city: user.user.city !== undefined ? user.user.city : "",
      country: user.user.country !== undefined ? user.user.country : "",
      fullName: user.user.fullName !== undefined ? user.user.fullName : "",
      avatarUrl: user.user.avatarUrl !== undefined ? user.user.avatarUrl : "",
      gender: user.user.gender !== undefined ? user.user.gender : "",
      description: user.user.description,
      bio: user.user.bio,
      employeeCount: user.user.employeeCount,
      addressLines: user.user.addressLines,
    },
    onSubmit: async (values) => {
      const dataToPost = {
        ...values,
        skills: skill.map((item) => item.value),
        gender: gender,
        addressLine: [address],
        birthDate: date,
      };
      setIsProgress(true);

      if (image.imagePost == null) {
        const res = await UserAPI.updateEmployerDetail(
          { ...dataToPost },
          user.token
        );
        if (res.status === 200) {
          dispatch(updateProfile({ ...dataToPost }));
          router.back();
          setIsProgress(false);
        } else {
          setIsProgress(false);
        }
      } else handleUpload(dataToPost);
    },
  });

  return (
    <div>
      <Head>
        <title>Edit Profile | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="p-6 bg-coolGray-100 text-coolGray-900">
        <form
          onSubmit={formik.handleSubmit}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-coolGray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Information</p>
              <p className="text-xs">Thong tin co ban gioi thieu ve ban than</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full">
                <label htmlFor="bio" className="text-sm">
                  Avatar
                </label>
                <div className="flex items-center space-x-2">
                  <img
                    src={getAvatar(image.imageView || user.user.avatarUrl)}
                    className="w-10 h-10 rounded-full bg-coolGray-300"
                  />
                  <label className="cursor-pointer inline-block px-4 py-2 border rounded-md border-blue-600">
                    <input type="file" onChange={onImageChange} />
                    <p className="text-blue-600">Up a new photo</p>
                  </label>
                  {/* <input
                    type="file"
                    onChange={onImageChange}
                    className="filetype"
                    id="group_image"
                  /> */}
                </div>
              </div>
              <div className="col-span-full">
                <RequiredText content="Full Name" styles="text-sm" />
                <input
                  id="fullName"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-600 border-coolGray-300 text-coolGray-900"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  value={address}
                  onChange={(val) => setAddress(val.target.value)}
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-600 border-coolGray-300 text-coolGray-900"
                />
              </div>
              <div className="col-span-full">
                <DatePicker
                  maxDate={new Date()}
                  placeholder="Select a date"
                  value={date}
                  label="DatePicker Label"
                  onChange={(value) =>
                    setDate(moment(value).format("YYYY-MM-DDTHH:mm:ss.sss"))
                  }
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-600 border-coolGray-300 text-coolGray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="state" className="text-sm">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-600 border-coolGray-300 text-coolGray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="zip" className="text-sm">
                  Number Phone
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-600 border-coolGray-300 text-coolGray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-2 flex">
                <label htmlFor="zip" className="text-sm">
                  Gender
                </label>
                <div className="md:ml-16 flex items-center gap-8">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="vehicle"
                      checked={gender === 0}
                      onChange={() => setGender(0)}
                      className="h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">Other</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="vehicle"
                      checked={gender === 1}
                      onChange={() => setGender(1)}
                      className="h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="vehicle"
                      checked={gender === 2}
                      onChange={() => setGender(2)}
                      className="h-5 w-5 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="state" className="text-sm">
                  Employees
                </label>
                <input
                  id="employeeCount"
                  name="employeeCount"
                  value={formik.values.employeeCount}
                  onChange={formik.handleChange}
                  type="number"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-600 border-coolGray-300 text-coolGray-900"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="state" className="text-sm">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-600 border-coolGray-300 text-coolGray-900"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="state" className="text-sm">
                  description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  rows={3}
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-600 border-coolGray-300 text-coolGray-900"
                />
              </div>
            </div>
          </fieldset>

          {isProgress ? (
            <button
              type="button"
              className="cursor-not-allowed py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
              </svg>
              loading
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Update
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
