import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";
// import { DatePicker } from "react-rainbow-components";

export default function PersonalInfo() {
  const cv = useSelector((state: any) => state.cv);
  const dispatch = useDispatch();
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      <div>
        <img className="h-28 w-28" src={cv.avatar}></img>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
          <label htmlFor="reference" className="text-gray-700">
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
          <label htmlFor="reference" className="text-gray-700">
            BirthDate
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Select date"
            />
          </div>
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
