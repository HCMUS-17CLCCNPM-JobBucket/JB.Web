import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Checkbox from "../Toggle/Checkbox";
import CVButton from "./CVButton";

export default function ApplyButton() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          onClick={openModal}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
          hover:bg-blue-700 focus:outline-none "
        >
          {/* Heroicon name: solid/check */}
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
          Apply Job
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <div className="inline-block h-82 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Choose your CV
                </Dialog.Title>
                <div className=" relative ">
                  <input
                    type="text"
                    id="rounded-email"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Name CV"
                  />
                </div>
                <div className="mt-2 flex flex-col justify-between">
                  <Checkbox
                    active={false}
                    content="CV-User.pdf"
                    callback={() => console.log(123)}
                  />
                  <Checkbox
                    active={false}
                    content="CV-User.pdf"
                    callback={() => console.log(123)}
                  />
                  <Checkbox
                    active={false}
                    content="CV-User.pdf"
                    callback={() => console.log(123)}
                  />
                  <Checkbox
                    active={false}
                    content="CV-User.pdf"
                    callback={() => console.log(123)}
                  />
                  <Checkbox
                    active={false}
                    content="CV-User.pdf"
                    callback={() => console.log(123)}
                  />
                  <Checkbox
                    active={false}
                    content="CV-User.pdf"
                    callback={() => console.log(123)}
                  />
                  <Checkbox
                    active={false}
                    content="CV-User.pdf"
                    callback={() => console.log(123)}
                  />
                </div>

                <div className="mt-4 w-full flex flex-row-reverse gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ease-in-transition"
                  >
                    Apply Job
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none ease-in-transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
