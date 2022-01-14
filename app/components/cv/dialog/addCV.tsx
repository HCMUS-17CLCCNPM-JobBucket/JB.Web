import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { useSelector, useDispatch } from "react-redux";
import router from "next/router";
import { imageAPI } from "app/api/modules/imageAPI";
import { toast } from "react-toastify";

export default function AddCV() {
  let [isOpen, setIsOpen] = useState(false);
  const [cvName, setCvName] = useState("");
  const userToken = useSelector((state: any) => state.user);
  const cvInfo = useSelector((state: any) => state.cv);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const CreateCV = async () => {
    if (cvInfo.file != null) {
      const imageRes: any = await imageAPI.uploadCV(cvInfo.file);
      const cv = {
        cVName: cvName,
        name: cvInfo.name,
        avatarUrl: imageRes.data.url,
        email: cvInfo.email,
        phone: cvInfo.phonenumber,
        address: cvInfo.address,
        website: cvInfo.website,
        github: cvInfo.github,
        reference: cvInfo.reference,
        gender: cvInfo.gender,
        introduction: cvInfo.introduction,
        birthdate: cvInfo.birthDate,
        experiences: cvInfo.experience,
        skills: cvInfo.skill,
        educations: cvInfo.education,
        activities: cvInfo.activity,
        certifications: cvInfo.certification,
        awards: cvInfo.award,
      };
      await CvAPI.add(cv, userToken.token).then((res) => {
        if (res.data.errors) {
          closeModal();
          toast(res.data.errors[0].message, { type: "warning" });
          router.push("/list-cv");
        } else {
          closeModal();
          // setTimeout(function () {
          //   toast("Add success");
          // }, 100);
          toast("Add success");
          router.push("/list-cv");
        }
      });
    } else {
      const cv = {
        cVName: cvName,
        name: cvInfo.name,
        avatarUrl: cvInfo.avatar,
        email: cvInfo.email,
        phone: cvInfo.phonenumber,
        address: cvInfo.address,
        website: cvInfo.website,
        github: cvInfo.github,
        reference: cvInfo.reference,
        gender: cvInfo.gender,
        introduction: cvInfo.introduction,
        birthdate: cvInfo.birthDate,
        experiences: cvInfo.experience,
        skills: cvInfo.skill,
        educations: cvInfo.education,
        activities: cvInfo.activity,
        certifications: cvInfo.certification,
        awards: cvInfo.award,
      };
      await CvAPI.add(cv, userToken.token).then((res) => {
        if (res.data.errors) {
          closeModal();
          toast(res.data.errors[0].message, { type: "warning" });
          router.push("/list-cv");
        } else {
          closeModal();
          // setTimeout(function () {
          //   toast("Add success");
          // }, 100);
          toast("Add success");
          router.push("/list-cv");
        }
      });
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
          hover:bg-blue-700 focus:outline-none "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-ml-1 mr-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Create
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
                    Create CV
                  </Dialog.Title>
                  <input
                    onChange={(e) => setCvName(e.target.value)}
                    type="text"
                    className="mt-4 rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="CV name"
                  />
                  <div className="mt-2">
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={CreateCV}
                        type="button"
                        className=" px-4 py-2 text-sm font-semibold text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-800"
                      >
                        Create
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
