import React, { useState, useEffect } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { cvActions } from "app/redux/features/cv";
import { useSelector, useDispatch } from "react-redux";
import router from "next/router";

export default function ListCv() {
  const [myCv, setmyCv] = useState([
    {
      cVName: "Cv01",
      id: 1,
    },
    {
      cVName: "Cv02",
      id: 1,
    },
    {
      cVName: "Cv03",
      id: 1,
    },
    {
      cVName: "Cv04",
      id: 1,
    },
  ]);
  const dispatch = useDispatch();
  const toEditor = async (id) => {
    await CvAPI.getCvById(id).then((res) => {
      dispatch(cvActions.initData(res.data.data.cv[0]));
      console.log(res.data.data.cv[0]);
      router.push("/cv-editor");
    });
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await CvAPI.getAll().then((res) => {
  //       setmyCv(res.data.data.cv);
  //       console.log(myCv);
  //     });
  //   };
  //   fetchData();
  // }, []);
  const createCv = () => {
    dispatch(cvActions.resetState());
    router.push("/cv-editor")
  };
  return (
    <div className="px-16 py-4">
      <div className="flex justify-between mb-4">
        <h1 className="mb-2">My CV List</h1>
        <button
          onClick={() => createCv()}
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-semibold"
        >
          Create new CV
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 cursor-pointer">
        {myCv.map((data, index) => (
          <div
            key={index}
            className="border-gray-300 border text-center py-4"
            onClick={() => toEditor(data.id)}
          >
            {data.cVName}
          </div>
        ))}
      </div>
    </div>
  );
}
