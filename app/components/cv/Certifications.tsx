import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";

export default function Certifications() {
  const [certi, setCerti] = useState("");
  const dispatch = useDispatch();
  const CertiList = useSelector((state: any) => state.cv.certification);
  const onHandleAdd = () => {
    dispatch(cvActions.addCertification(certi));
    setCerti("");
  };
  const deleteHandler = (index) => {
    dispatch(cvActions.deleteCertification(index));
  };
  return (
    <div className="border-gray-300 border p-10 bg-white mb-8">
      <p className="font-bold mb-4">Certificatiosn</p>
      {CertiList.map((data, index) => (
        <div
          key={index}
          className="border-gray-300 border flex flex-row w-1/3 px-4 justify-between mb-4 items-center"
        >
          <div className="flex flex-row items-center">
            <p>{data}</p>
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
      <div className="flex flex-col">
        <input
          onChange={(e) => setCerti(e.target.value)}
          value={certi}
          type="text"
          id="certifications"
          className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="Certification"
        />
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
