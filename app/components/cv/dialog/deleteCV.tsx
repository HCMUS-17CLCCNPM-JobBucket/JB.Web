import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { useSelector, useDispatch } from "react-redux";

export default function DeleteCV({ index, callback }) {
  let [isOpen, setIsOpen] = useState(false);
  const userToken = useSelector((state: any) => state.user);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteCV = async () => {
    await CvAPI.delete(index, userToken.token).then((res) => {
      if (res.status === 200) {
        closeModal();
        callback();
      }
    });
  };

  return (
    <>
      <button onClick={openModal}>
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
                    Delete CV
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you want to delete this CV?
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        className=" px-4 py-2 text-sm font-semibold text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-800"
                        onClick={() => deleteCV()}
                      >
                        Yes
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
