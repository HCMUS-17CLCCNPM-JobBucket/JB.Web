import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";

export default function Awards() {
  const [isEdit, setIsEdit] = useState(false);
  const [editindex, setIndex] = useState(0);
  const [award, setAward] = useState("");
  const [tempaward, setTempAward] = useState("");
  const dispatch = useDispatch();
  const AwardList = useSelector((state: any) => state.cv.award);
  const onHandleAdd = () => {
    dispatch(cvActions.addAward(award));
    setAward("");
  };
  const deleteHandler = (index) => {
    dispatch(cvActions.deleteAward(index));
  };
  const editHander = (index, data) => {
    dispatch(cvActions.deleteAward(index));
    setAward(data);
    setTempAward(data);
    setIndex(index);
    setIsEdit(true);
  };
  const onSaveEdit = () => {
    const data = {
      index: editindex,
      data: award,
    };
    dispatch(cvActions.editAward(data));
    setIsEdit(false);
    setAward("");
  };
  const onCancle = () => {
    const data = {
      index: editindex,
      data: tempaward,
    };
    dispatch(cvActions.editAward(data));
    setIsEdit(false);
    setAward("");
  };
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      <p className="font-bold mb-4">Awards</p>
      {AwardList.map((data, index) => (
        <div
          key={index}
          className="border-gray-300 border flex flex-row w-1/3 px-4 justify-between mb-4 items-center"
        >
          <div className="flex flex-row items-center">
            <p>{data}</p>
          </div>
          <div>
            <button
              disabled={isEdit}
              onClick={() => editHander(index, data)}
              type="button"
              className="my-4 h-10 px-4 text-white transition-colors duration-150 bg-red-500 rounded-lg focus:outline-none hover:bg-red-600 disabled:opacity-50"
            >
              Edit
            </button>
            <button
              disabled={isEdit}
              onClick={() => deleteHandler(index)}
              type="button"
              className="my-4 h-10 px-4 text-white transition-colors duration-150 bg-red-500 rounded-lg focus:outline-none hover:bg-red-600 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {isEdit == false ? (
        <>
          <div className="flex flex-col">
            <input
              onChange={(e) => setAward(e.target.value)}
              value={award}
              type="text"
              id="awards"
              className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Award"
            />
          </div>
          <button
            onClick={onHandleAdd}
            type="button"
            className="my-4 h-10 px-4 text-white bg-blue-600 rounded-md"
          >
            Add
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <input
              onChange={(e) => setAward(e.target.value)}
              value={award}
              type="text"
              id="awards"
              className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Award"
            />
          </div>
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