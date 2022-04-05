import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";
// import { DatePicker } from "react-rainbow-components";
import moment from "moment";

export default function PersonalInfo(props) {
  const cv = useSelector((state: any) => state.cv);
  const dispatch = useDispatch();
  const isUpdate = useSelector((state: any) => state.cv.isUpdate);
  const handleChangeBirthdate = (value) => {
    if (value != null) {
      dispatch(cvActions.changeBirthdate(moment(value).toISOString()));
    } else {
      dispatch(cvActions.changeBirthdate(null));
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    dispatch(cvActions.setFile(file));
    dispatch(cvActions.setAvatarURL(URL.createObjectURL(e.target.files[0])));
  };
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      {props.isUpdate && (
        <div className="md:grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col ">
            <label htmlFor="name" className="text-gray-700">
              CV Name
            </label>
            <input
              defaultValue={cv.cVName}
              type="text"
              id="name"
              className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="CV name"
              onChange={(e) => dispatch(cvActions.changeCVname(e.target.value))}
            />
          </div>
        </div>
      )}
      <div className="md:grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col ">
          <label className="text-gray-700">Template</label>
          <select
            value={cv.templateId}
            onChange={(e) => dispatch(cvActions.setTemplateId(e.target.value))}
            className=" rounded-lg border-transparent border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="1">Basic 1</option>
            <option value="2">Introfirst 1</option>
            <option value="3">Introfirst 2</option>
            <option value="4">Split 1</option>
            <option value="5">Split 2</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-gray-700">Avatar</label>
        <img
          src={cv.avatar || "https://via.placeholder.com/160x160"}
          alt=""
          className="h-52 w-auto object-cover rounded-lg mb-4"
        />
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="md:grid md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="fullname" className="text-gray-700">
            Full name
          </label>
          <input
            defaultValue={cv.name}
            type="text"
            id="fullname"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Your name"
            onChange={(e) => dispatch(cvActions.changeName(e.target.value))}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            defaultValue={cv.email}
            type="email"
            id="email"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Email"
            onChange={(e) => dispatch(cvActions.changeEmail(e.target.value))}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="phone" className="text-gray-700">
            Phone Number
          </label>
          <input
            defaultValue={cv.phonenumber}
            type="tel"
            id="phone"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Phone number"
            onChange={(e) =>
              dispatch(cvActions.changePhonenumber(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="address" className="text-gray-700">
            Address
          </label>
          <input
            defaultValue={cv.address}
            type="text"
            id="address"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Address"
            onChange={(e) => dispatch(cvActions.changeAddress(e.target.value))}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="website" className="text-gray-700">
            Website
          </label>
          <input
            defaultValue={cv.website}
            type="url"
            id="website"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Website"
            onChange={(e) => dispatch(cvActions.changeWebsite(e.target.value))}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="github" className="text-gray-700">
            Github
          </label>
          <input
            defaultValue={cv.github}
            type="url"
            id="github"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Github"
            onChange={(e) => dispatch(cvActions.changeGithub(e.target.value))}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="reference" className="text-gray-700">
            Reference
          </label>
          <input
            defaultValue={cv.reference}
            type="text"
            id="reference"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Reference"
            onChange={(e) =>
              dispatch(cvActions.changeReference(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="gender" className="text-gray-700">
            Gender
          </label>
          <div className="w-full py-2 text-base">
            <label className="inline-flex items-center">
              <input
                checked={cv.gender == "Male"}
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => dispatch(cvActions.changeGender("Male"))}
              />
              <span className="ml-2 text-gray-700">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                checked={cv.gender == "Female"}
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => dispatch(cvActions.changeGender("Female"))}
              />
              <span className="ml-2 text-gray-700">Female</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="birthdate" className="text-gray-700">
            BirthDate
          </label>
          {isUpdate ? (
            <input
              defaultValue={
                cv.birthDate == null || cv.birthDate == ""
                  ? null
                  : moment(cv.birthDate).format("YYYY-MM-DD")
              }
              type="date"
              className="input"
              placeholder="Birthdate"
              onChange={(e) => handleChangeBirthdate(e.target.value)}
            />
          ) : (
            <input
              defaultValue={moment().format("YYYY-MM-DD")}
              type="date"
              className="input"
              placeholder="Birthdate"
              onChange={(e) => handleChangeBirthdate(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-col col-span-2 ">
          <label htmlFor="introduction" className="text-gray-700">
            Introduction
          </label>
          <textarea
            defaultValue={cv.introduction}
            id="introduction"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
            placeholder="Introduction"
            onChange={(e) =>
              dispatch(cvActions.changeIntroduction(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
}
