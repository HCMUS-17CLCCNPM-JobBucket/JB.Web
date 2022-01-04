import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import MyDoc from "app/components/cv/mydoc";

export default function download(index) {
  let [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user);
  const cvInfo = useSelector((state: any) => state.cv);
  const [cvName, setCvName] = useState("");
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      await CvAPI.getCvById(index, userToken.token).then((res) => {
        if (res.status === 200) {
          dispatch(cvActions.initData(res.data.data.cv[0]));
          openModal();
        }
      });
      fetchData();
    };
  }, []);
  return (
    <>
      <button onClick={openModal}>download</button>
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
                    placeholder="CV name"
                  />
                  <PDFDownloadLink
                    document={<MyDoc cvInfo={cvInfo} />}
                    fileName= {cvName}
                  >
                    download
                  </PDFDownloadLink>
                  ;
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
