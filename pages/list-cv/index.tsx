import React, { useState, useEffect, Fragment } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { cvActions } from "app/redux/features/cv";
import { useSelector, useDispatch } from "react-redux";
import router from "next/router";
import Loading from "app/components/atoms/Loading";
import LoadingTransition from "app/components/atoms/LoadingTransition";
import DeleteDialog from "app/components/cv/dialog/deleteCV";
import { Dialog, Transition } from "@headlessui/react";
import dynamic from "next/dynamic";
import Download from "app/components/cv/dialog/download";
import ListEmpty from "app/components/atoms/ListEmpty";
import UserAPI from "app/api/modules/userAPI";
import { jobAPI } from "app/api/modules/jobAPI";
// import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
// import MyDoc from "app/components/cv/mydoc";

export default function ListCv() {
  const PDFViewer = dynamic(import("app/components/cv/template"), {
    ssr: false,
  });

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingTrans, setLoadTrans] = useState(false);
  const [myCv, setmyCv] = useState([]);
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user);
  // const cvInfo = useSelector((state: any) => state.cv);
  const toEditor = async (id) => {
    setLoadTrans(true);
    await CvAPI.getCvById(id, userToken.token).then((res) => {
      if (res.status === 200) {
        dispatch(cvActions.initData(res.data.data.cv[0]));
        const tempListId = [];
        res.data.data.cv[0].skills.map((skill) => {
          tempListId.push(
            skills.find((data) => data.label == skill.skillName).value
          );
        });
        dispatch(cvActions.setListID(tempListId));
        dispatch(cvActions.changeUpdateState(true));
        dispatch(cvActions.changeID(id));
        router.push("/cv-editor");
        setLoadTrans(false);
      }
    });
  };
  const toReview = async (id) => {
    await CvAPI.getCvById(id, userToken.token).then((res) => {
      if (res.status === 200) {
        dispatch(cvActions.initData(res.data.data.cv[0]));
        openModal();
      }
    });
  };
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    if (userToken.token == "") {
      router.push("/login");
    } else {
      const fetchData = async () => {
        await CvAPI.getAll(userToken.token).then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setmyCv(res.data.data.cv);
          }
        });
        const response = await jobAPI.getJobProperties();
        if (response.status === 200) {
          setSkills(
            response.data.data.jobProperties.skills.map((skill) => ({
              value: skill.id,
              label: skill.name,
            }))
          );
        }
      };
      fetchData();
    }
  }, [shouldRefresh]);
  const createCv = () => {
    dispatch(cvActions.resetState());
    dispatch(cvActions.changeUpdateState(false));
    UserAPI.getProfile().then((res) => {
      dispatch(
        cvActions.initData({ ...res.data.data.profiles[0], skills: [] })
      );
    });
    router.push("/cv-editor");
  };
  const handleCallback = () => {
    setShouldRefresh(!shouldRefresh);
  };
  // const handleDownload = async (id) => {
  //   await CvAPI.getCvById(id, userToken.token).then((res) => {
  //     if (res.status === 200) {
  //       dispatch(cvActions.initData(res.data.data.cv[0]));
  //       <PDFDownloadLink
  //         document={<MyDoc cvInfo={cvInfo} />}
  //         fileName="somename.pdf"
  //       >
  //         download
  //       </PDFDownloadLink>;
  //     }
  //   });
  // };

  return (
    <>
      {loadingTrans && <LoadingTransition></LoadingTransition>}
      <div className="px-16 py-4 flex flex-col min-h-screen">
        <div className="mb-4">
          <button
            onClick={() => createCv()}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-semibold float-right"
          >
            Create new CV
          </button>
        </div>
        {loading && <Loading></Loading>}
        {myCv.length === 0 && loading === false ? (
          <ListEmpty message="List CV empty" />
        ) : (
          myCv.map((data, index) => (
            <div className="job-horizon-card mb-4" key={index}>
              <div className="job-horizon-card__header">
                <div className="job-horizon-card__company">
                  <div className="flex justify-between w-full">
                    <div onClick={() => toReview(data.id)}>
                      <p className="m-0">{data.cVName}</p>
                    </div>
                    <div className="flex">
                      <button
                        className="mr-2"
                        onClick={() => toEditor(data.id)}
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
                      <Download index={data.id}></Download>
                      <DeleteDialog
                        index={data.id}
                        callback={handleCallback}
                      ></DeleteDialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto bg-opacity-50 bg-gray-400"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className=" inline-block w-full max-w-7xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="flex flex-col">
                    <PDFViewer color="#1e88e5"></PDFViewer>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
