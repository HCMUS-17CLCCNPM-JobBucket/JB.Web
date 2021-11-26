import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";

export default function Activities() {
  const [isEdit, setIsEdit] = useState(false);
  const [editindex, setIndex] = useState(0);
  const [tempActi, setTempActi] = useState("");
  const [activity, setActivity] = useState("");
  const dispatch = useDispatch();
  const ActivityList = useSelector((state: any) => state.cv.activity);
  const onHandleAdd = () => {
    dispatch(cvActions.addActivity(activity));
    setActivity("");
  };
  const deleteHandler = (index) => {
    dispatch(cvActions.deleteActivity(index));
  };
  const editHander = (index, data) => {
    dispatch(cvActions.deleteActivity(index));
    setActivity(data);
    setTempActi(data);
    setIndex(index);
    setIsEdit(true);
  };
  const onSaveEdit = () => {
    const data = {
      index: editindex,
      data: activity,
    };
    dispatch(cvActions.editActivity(data));
    setIsEdit(false);
    setActivity("");
  };
  const onCancle = () => {
    const data = {
      index: editindex,
      data: tempActi,
    };
    dispatch(cvActions.editAward(data));
    setIsEdit(false);
    setActivity("");
  };
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      <p className="font-bold mb-4">Activities</p>
      {ActivityList.map((data, index) => (
        <div className="md:grid md:grid-cols-2">
          <div
            key={index}
            className="rounded-lg border-gray-300 border flex flex-col md:flex-row p-4 md:justify-between mb-4 md:items-center"
          >
            <div className="mb-2 mr-0 md:mb-0 md:mr-2">
              <p>{data}</p>
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
      <div className="flex flex-col md:grid md:grid-cols-2">
        <input
          onChange={(e) => setActivity(e.target.value)}
          value={activity}
          type="text"
          id="activities"
          className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="Activities"
        />
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
