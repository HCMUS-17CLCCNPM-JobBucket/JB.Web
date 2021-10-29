import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";

export default function Educations() {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("Granduated");
  const educationList = useSelector((state: any) => state.cv.education);
  const dispatch = useDispatch();

  const onHandleAdd = () => {
    const newEduacation = {
      school: school,
      major: major,
      status: status,
    };
    dispatch(cvActions.addEducation(newEduacation));
    console.log(educationList);
    setSchool("");
    setMajor("");
  };

  const deleteHandler = (index) => {
    dispatch(cvActions.deleteEducation(index));
  };
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      <p className="font-bold mb-4">Education</p>
      {educationList.map((data, index) => (
        <div
          key={index}
          className="border-gray-300 border flex flex-row w-1/3 p-4 justify-between mb-4 items-center"
        >
          <div className="flex flex-row items-center">
            <div className="mr-2">
              {data.status == "Graduated" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              )}
            </div>
            <div>
              <p>{data.school}</p>
              <p>{data.major}</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => deleteHandler(index)}
              type="button"
              className="my-4 h-10 px-4 text-white transition-colors duration-150 bg-red-500 rounded-lg focus:outline-none hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="company" className="text-gray-700">
            School
          </label>
          <input
            value={school}
            type="text"
            id="company"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Your name"
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="com_position" className="text-gray-700">
            Major
          </label>
          <input
            value={major}
            type="text"
            id="com_position"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Your name"
            onChange={(e) => setMajor(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="duaration" className="text-gray-700">
            Status
          </label>
          <div className="w-full py-2 text-base">
            <label className="inline-flex items-center">
              <input
                defaultChecked
                type="radio"
                name="status"
                value="Granduated"
                onChange={(e) => setStatus("Graduated")}
              />
              <span className="ml-2 text-gray-700">Granduated</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="status"
                value="Studying"
                onChange={(e) => setStatus("Studying")}
              />
              <span className="ml-2 text-gray-700">Studying</span>
            </label>
          </div>
        </div>
      </div>
      <button
        onClick={onHandleAdd}
        type="button"
        className="my-4 h-10 px-4 text-white bg-blue-600 rounded-md"
      >
        Add
      </button>
    </div>
  );
}
