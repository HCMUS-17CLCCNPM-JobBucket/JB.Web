import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";

export default function experience() {
  const [isEdit, setIsEdit] = useState(false);
  const [editindex, setIndex] = useState(0);
  const [tempEx, setTempEx] = useState({
    company: "",
    duration: "",
    position: "",
  });
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
    dispatch(cvActions.addexperience(newExperience));
    setConpany("");
    setPosition("");
    setDuration("");
  };

  const deleteHandler = (index) => {
    dispatch(cvActions.deleteexperience(index));
  };
  const editHander = (index, data) => {
    dispatch(cvActions.deleteexperience(index));
    setConpany(data.company);
    setPosition(data.position);
    setDuration(data.duration);
    setTempEx(data);
    setIndex(index);
    setIsEdit(true);
  };
  const onSaveEdit = () => {
    const data = {
      index: editindex,
      data: {
        company: company,
        duration: duration,
        position: position,
      },
    };
    dispatch(cvActions.editexperience(data));
    setIsEdit(false);
    setConpany("");
    setPosition("");
    setDuration("");
  };
  const onCancle = () => {
    const data = {
      index: editindex,
      data: {
        company: tempEx.company,
        duration: tempEx.duration,
        position: tempEx.position,
      },
    };
    dispatch(cvActions.editexperience(data));
    setIsEdit(false);
    setConpany("");
    setPosition("");
    setDuration("");
  };
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      <p className="font-bold mb-4">Work experience</p>
      {experienceList.map((data, index) => (
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div
            key={index}
            className="rounded-lg border-gray-300 border flex flex-col md:flex-row p-4 md:justify-between mb-4 md:items-center"
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
            <div className="flex flex-row">
              <button
                disabled={isEdit}
                onClick={() => editHander(index, data)}
                type="button"
                className="h-10 mr-2 px-4 text-white transition-colors duration-150 bg-red-500 rounded-lg focus:outline-none hover:bg-red-600 disabled:opacity-50"
              >
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                disabled={isEdit}
                onClick={() => deleteHandler(index)}
                type="button"
                className="h-10 px-4 text-white transition-colors duration-150 bg-red-500 rounded-lg focus:outline-none hover:bg-red-600 disabled:opacity-50"
              >
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
        <div className="flex flex-col">
          <label htmlFor="company" className="text-gray-700">
            Company
          </label>
          <input
            value={company}
            type="text"
            id="company"
            className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Company name"
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
            placeholder="Position"
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
            placeholder="Duration"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      {isEdit == false ? (
        <button
          onClick={onHandleAdd}
          type="button"
          className="my-4 h-10 px-4 text-white bg-blue-600 rounded-md"
        >
          Add
        </button>
      ) : (
        <>
          <button
            onClick={onSaveEdit}
            type="button"
            className="my-4 h-10 px-4 text-white bg-blue-600 rounded-md"
          >
            Save
          </button>
          <button
            onClick={onCancle}
            type="button"
            className="ml-4 my-4 h-10 px-4 text-white bg-red-600 rounded-md"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
