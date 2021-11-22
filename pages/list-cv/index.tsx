import React, { useState, useEffect } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { cvActions } from "app/redux/features/cv";
import { useSelector, useDispatch } from "react-redux";
import router from "next/router";
import Loading from "app/components/atoms/Loading";
import LoadingTransition from "app/components/atoms/LoadingTransition";
import DeleteDialog from "app/components/cv/dialog/deleteCV";

export default function ListCv() {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingTrans, setLoadTrans] = useState(false);
  const [myCv, setmyCv] = useState([]);
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user);
  const toEditor = async (id) => {
    setLoadTrans(true);
    await CvAPI.getCvById(id).then((res) => {
      dispatch(cvActions.initData(res.data.data.cv[0]));
      router.push("/cv-editor");
      setLoadTrans(false);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await CvAPI.getAll(userToken.token).then((res) => {
        setLoading(false);
        setmyCv(res.data.data.cv);
      });
    };
    fetchData();
  }, [shouldRefresh]);
  const createCv = () => {
    dispatch(cvActions.resetState());
    router.push("/cv-editor");
  };
  const handleCallback = () => {
    setShouldRefresh(!shouldRefresh);
  };

  return (
    <>
      {loadingTrans && <LoadingTransition></LoadingTransition>}
      <div className="px-16 py-4 flex flex-col">
        <div className="mb-4">
          <button
            onClick={() => createCv()}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-semibold float-right"
          >
            Create new CV
          </button>
        </div>
        {loading && <Loading></Loading>}
        {myCv.map((data, index) => (
          <div className="job-horizon-card mb-4" key={index}>
            <div className="job-horizon-card__header">
              <div className="job-horizon-card__company">
                <div className="flex justify-between w-full">
                  <div>
                    <p>{data.cVName}</p>
                  </div>
                  <div className="flex">
                    <button className="mr-2" onClick={() => toEditor(data.id)}>
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
                    <DeleteDialog
                      index={data.id}
                      callback={handleCallback}
                    ></DeleteDialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
