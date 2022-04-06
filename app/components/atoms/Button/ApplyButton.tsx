import { Dialog, Tab, Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import axiosClient from "app/api/axiosClient";
import { imageAPI } from "app/api/modules/imageAPI";
import { jobAPI } from "app/api/modules/jobAPI";
import helper from "app/utils/helper";
import { useUserInfo } from "app/utils/hooks";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TabGroup from "../TabGroup";
import Checkbox from "../Toggle/Checkbox";
import AttachmentButton from "./AttachmentButton";
import CVButton from "./CVButton";

export default function ApplyButton({ value, jobId, expire }) {
  const [cv, setCv] = useState([]);
  const [cvIdSelected, setCvIdSelected] = useState(-1);
  const [hasActive, setHasActive] = useState(value);
  const [isOnlMode, setIsOnlMode] = useState(true);
  const user = useUserInfo();

  const [cvFile, setCvFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]); // attachments
  let [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (hasActive !== value) {
      setHasActive(value);
    }
  }, [value]);

  function closeModal() {
    setIsOpen(false);
  }

  const openModal = async () => {
    if (hasActive) {
      const res = await jobAPI.unApply(jobId);
      if (res.data?.errors) {
      }
      if (res.status === 200) {
        closeModal();
        setHasActive(false);
      }
    } else {
      setIsOpen(true);
    }
  };

  const uploadAttachment = async (images) => {
    let listImg = images.map(
      (file) =>
        new Promise((resolve, reject) => {
          imageAPI
            .uploadImage(file)
            .then((res) => {
              resolve(res.data.url);
            })
            .catch((err) => {
              reject(err);
            });
        })
    );

    let listImgUrl = await Promise.all(listImg);

    return listImgUrl;
  };

  const handleApply = async (e) => {
    if (isOnlMode === false) {
      if (imageFiles !== []) {
        const pdfRes: any = await imageAPI.uploadCV(cvFile);
        const images = await uploadAttachment(imageFiles);

        if (pdfRes.status === 200) {
          const res = await jobAPI.apply(
            jobId,
            -1,
            pdfRes.data.url,
            images,
            description
          );

          if (res.data.errors) {
            toast.error(res.data.errors[0].message);
          }
          if (res.status === 200) {
            closeModal();
            setHasActive(true);
          }
        }
      }
    } else {
      const images = await uploadAttachment(imageFiles);

      const res = await jobAPI.apply(
        jobId,
        cvIdSelected,
        "",
        images,
        description
      );
      if (res.data.errors) {
        toast.error(res.data.errors[0].message);
      }
      if (res.status === 200) {
        closeModal();
        setHasActive(true);
      }
    }
  };
  const handleCvFile = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handAttachFile = (e) => {
    console.log("attach");
    setImageFiles(Array.from(e.target.files));
  };

  useEffect(() => {
    axiosClient
      .post("/graphql", {
        query: `query listCV {
        cv {
          id
          cVName
          title
        }
      }`,
      })
      .then((res) => {
        if (res.status === 200) {
          setCv(res.data.data.cv);
        }
      });
  }, []);
  return (
    <>
      <div className="flex items-center justify-center relative">
        {expire || user.token === "" ? (
          <button
            className="cursor-not-allowed flex justify-center gap-2 bg-red-600 hover:bg-red-700 items-center px-4 py-2 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white focus:outline-none  w-40"
          >
            <LockClosedIcon className="h-4 w-4" />
            Apply Job
          </button>
        ) : (
          <button
            onClick={openModal}
            type="button"
            className={`${
              hasActive ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            } inline-flex items-center justify-center py-2 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white focus:outline-none w-40`}
          >
            {hasActive && (
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            Apply Job
          </button>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className=" px-4 text-center">
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
              className="inline-block h-screen align-middle "
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
              <div className="inline-block w-full max-w-md h-[400px] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Choose your CV
                </Dialog.Title>
                <div className="flex justify-center mt-2">
                  <TabGroup
                    tabs={[
                      {
                        name: "Online",
                        active: isOnlMode,
                        callback: () => setIsOnlMode(true),
                      },
                      {
                        name: "Local",
                        active: isOnlMode === false,
                        callback: () => setIsOnlMode(false),
                      },
                    ]}
                  />
                </div>
                <div className="mt-4"></div>
                {isOnlMode ? (
                  <div>
                    {/* <div className=" relative ">
                      <input
                        type="text"
                        id="rounded-email"
                        className="input"
                        placeholder="Name CV"
                      />
                    </div> */}
                    <div className="mt-2 flex flex-col justify-between">
                      {cv.map((item, index) => (
                        <Checkbox
                          key={index}
                          content={item.cVName}
                          callback={() => setCvIdSelected(item.id)}
                        />
                      ))}
                    </div>
                    <textarea
                      name=""
                      id=""
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="input h-32 mt-2"
                      placeholder="Description"
                    ></textarea>
                  </div>
                ) : (
                  <div>
                    <input type="file" onChange={handleCvFile} />
                    <textarea
                      name=""
                      id=""
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="input h-32 mt-6"
                      placeholder="Description"
                    ></textarea>
                  </div>
                )}

                <div className="absolute bottom-4 w-[90%] flex justify-between gap-2">
                  <AttachmentButton
                    onClick={handAttachFile}
                    files={imageFiles}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none ease-in-transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApply}
                      type="button"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ease-in-transition"
                    >
                      Apply Job
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
