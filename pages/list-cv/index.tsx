import React, { useState, useEffect } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { cvActions } from "app/redux/features/cv";
import { useSelector, useDispatch } from "react-redux";
import router from "next/router";

export default function ListCv() {
  const [myCv, setmyCv] = useState([
    {
      cVName: "Nguyen huu tuan",
      id: 1,
    },
    {
      cVName: "Nguyen huu tuan",
      id: 1,
    },
    {
      cVName: "Nguyen huu tuan",
      id: 1,
    },
    {
      cVName: "Nguyen huu tuan",
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
    router.push("/cv-editor");
  };
  return (
    <div className="px-16 py-4 flex flex-col">
      <div className="mb-4">
        <button
          onClick={() => createCv()}
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-semibold float-right"
        >
          Create new CV
        </button>
      </div>
      {myCv.map((data, index) => (
        <div className="job-horizon-card mb-4">
          <div className="job-horizon-card__header">
            <div className="job-horizon-card__company">
              <div className="flex justify-between w-full">
                <div>
                  <p>{data.cVName}</p>
                </div>
                <div className="flex">
                  <div className="mr-2">
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
                  </div>
                  <div>
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
