import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/solid";
import { orgAPI } from "app/api/modules/organization";
import { useUserInfo } from "app/utils/hooks";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ComponentWithLabel from "../molecules/ComponentWithLabel";

function DeleteMemDialog({ member, refreshPage }) {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleDelete = () => {
    orgAPI.deleteOrgRecruiterById(member.id).then((res) => {
      toast("Member deleted successfully");
      closeModal();
      refreshPage();
    });
  };

  return (
    <>
      <div className=" flex items-center justify-center">
        <TrashIcon
          onClick={openModal}
          className="text-red-600 h-6 w-6 cursor-pointer"
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={
            "fixed inset-0 z-10 overflow-y-auto" +
            (loading ? " opacity-50" : "")
          }
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
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="w-full h-full text-center">
                  <div className="flex h-full flex-col justify-between">
                    <svg
                      width={40}
                      height={40}
                      className="mt-4 w-12 h-12 m-auto text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
                    </svg>
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
                      Delete {member.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
                      Are you sure you want to delete this member ?
                    </p>
                    <div className="flex items-center justify-between gap-4 w-full mt-8">
                      <button
                        onClick={handleDelete}
                        type="button"
                        className="py-2 px-4  bg-red-600 hover:bg-red-700 
                         text-white w-full transition ease-in duration-200 text-center text-base 
                         font-semibold shadow-md focus:outline-none  rounded-lg "
                      >
                        Delete
                      </button>
                      <button
                        onClick={closeModal}
                        type="button"
                        className="py-2 px-4  bg-white hover:bg-gray-100 text-indigo-500  w-full 
                        transition ease-in duration-200 text-center text-base font-semibold 
                        shadow-md focus:outline-none rounded-lg "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-2 flex flex-col gap-4">
                  <p className="text-lg leading-5  font-semibold">
                    Are you sure you want to delete this member?
                  </p>

                  <button className="btn btn-primary  w-40 outline-none">
                    Confirm
                  </button>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const MemberCard = (member) => {
  const user = useUserInfo();

  console.log("member", member);
  return (
    <div className="relative flex gap-2 items-center w-[300px]">
      <img
        src={member.avatarUrl || "/avatar/avatar.png"}
        alt={member.name}
        className="h-24 w-24 rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{member.name}</p>
        <p>{member.roleId === 2 ? "Recruiter" : "Manager"}</p>
      </div>

      {user.id !== member.id && (
        <div className="absolute right-0 top-5">
          <DeleteMemDialog member={member} refreshPage={member.refreshPage} />
        </div>
      )}
    </div>
  );
};

export default MemberCard;
