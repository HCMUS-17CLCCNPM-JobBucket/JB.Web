import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";

export default function ReviewCv() {
  const PDFViewer = dynamic(import("app/components/cv/template"), {
    ssr: false,
  });

  const [color, setColor] = useState("#1e88e5");
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
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Review
        </button>
      </div>
      <div>
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
                <div className=" inline-block w-full max-w-7xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-300 shadow-xl rounded-2xl">
                  <div className="flex flex-col">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg> */}
                    <div>
                      <button onClick={() => setColor("red")}>red</button>
                      <button onClick={() => setColor("#1e88e5")}>blue</button>
                      <button onClick={() => setColor("yellow")}>yellow</button>
                    </div>
                    <PDFViewer color={color}></PDFViewer>
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
