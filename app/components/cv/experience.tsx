import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";

export default function experience() {
  const [company, setConpany] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const experienceList = useSelector((state: any) => state.cv.experience);
  const dispatch = useDispatch();

  const onHandleAdd = () => {
    const newExperience = {
      company: company,
      duration: duration,
      position: position,
    };
    dispatch(cvActions.addexperience(newExperience))
    setConpany('')
    setPosition('')
    setDuration('')
  };

  const deleteHandler = (index) => {
    dispatch(cvActions.deleteexperience(index));
  };
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      <p className="font-bold mb-4">Work experience</p>
      {experienceList.map((data, index) => (
        <div
          key={index}
          className="border-gray-300 border flex flex-row w-1/3 p-4 justify-between mb-4 items-center"
        >
          <div className="flex flex-row items-center">
            <div className="border bg-gray-50 p-1 text-center mr-2">
              <p>{data.duration}</p>
            </div>
            <div>
              <p>{data.company}</p>
              <p>{data.position}</p>
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
            Company
          </label>
          <input
            value={company}
            type="text"
            id="company"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Your name"
            onChange={(e) => setConpany(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="com_position" className="text-gray-700">
            Position
          </label>
          <input
            value={position}
            type="text"
            id="com_position"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Your name"
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="duaration" className="text-gray-700">
            Duration
          </label>
          <input
            value={duration}
            type="text"
            id="duaration"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Your name"
            onChange={(e) => setDuration(e.target.value)}
          />
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
