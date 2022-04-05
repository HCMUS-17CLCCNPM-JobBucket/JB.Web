import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { CvAPI } from "app/api/modules/cvAPI";
import { cvActions } from "app/redux/features/cv";
import { useSelector, useDispatch } from "react-redux";

export default function ApplicationCV(props) {
  const PDFViewer = dynamic(import("app/components/cv/template"), {
    ssr: false,
  });
  const PDFViewer1 = dynamic(import("app/components/cv/template1"), {
    ssr: false,
  });
  const PDFViewer2 = dynamic(import("app/components/cv/template2"), {
    ssr: false,
  });
  const PDFViewer3 = dynamic(import("app/components/cv/template3"), {
    ssr: false,
  });
  const PDFViewer4 = dynamic(import("app/components/cv/template4"), {
    ssr: false,
  });
  const templateId = useSelector((state: any) => state.cv.templateId);

  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user);

  // const [color, setColor] = useState("#1e88e5");
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const toReview = async () => {
    await CvAPI.getCvById(props.id, userToken.token).then((res) => {
      if (res.status === 200) {
        dispatch(cvActions.initData(res.data.data.cv[0]));
        openModal();
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <a
          onClick={toReview}
          target="_blank"
          rel="noreferrer"
          className="flex gap-3 items-center cursor-pointer"
        >
          <img
            src="/common/cv.png"
            alt=""
            className="h-10 w-10 rounded-lg object-cover"
          />
          <p className="text-blue-600 font-semibold">CV</p>
        </a>
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
                    {(templateId == "1" || templateId == "") && (
                      <PDFViewer></PDFViewer>
                    )}
                    {templateId == "2" && <PDFViewer1></PDFViewer1>}
                    {templateId == "3" && <PDFViewer2></PDFViewer2>}
                    {templateId == "4" && <PDFViewer3></PDFViewer3>}
                    {templateId == "5" && <PDFViewer4></PDFViewer4>}
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
