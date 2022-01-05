import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import MyDoc from "app/components/cv/mydoc";

export default function download({ index }) {
  let [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user);
  const cvInfo = useSelector((state: any) => state.cv);
  const [cvName, setCvName] = useState("");
  function closeModal() {
    setIsOpen(false);
  }

  async function openModal() {
    await CvAPI.getCvById(index, userToken.token).then((res) => {
      if (res.status === 200) {
        dispatch(cvActions.initData(res.data.data.cv[0]));
        console.log(res.data.data.cv[0]);
      }
    });
    setIsOpen(true);
  }

  return (
    <>
      <button className="mr-2" onClick={openModal}>
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button>
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
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Download CV
                  </Dialog.Title>
                  <input
                    onChange={(e) => setCvName(e.target.value)}
                    type="text"
                    className="mt-4 rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="File name"
                  />
                  <div className="mt-2">
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={closeModal}
                        type="button"
                        className=" px-4 py-2 text-sm font-semibold text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-800"
                      >
                        <PDFDownloadLink
                          document={<MyDoc cvInfo={cvInfo} color="#1e88e5" />}
                          fileName={cvName}
                        >
                          <p className="text-white text-sm font-semibold m-0 p-0">
                            Download
                          </p>
                        </PDFDownloadLink>
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-semibold text-white bg-red-500 border border-transparent rounded-md hover:bg-red-800"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
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
