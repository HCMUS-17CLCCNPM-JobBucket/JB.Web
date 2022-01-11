import { Dialog, Transition } from "@headlessui/react";
import interviewAPI from "app/api/modules/interviewAPI";
import ComponentWithLabel from "app/components/molecules/ComponentWithLabel";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

export default function SetScheduleInterviewButton({
  jobId,
  //   description,
  //   interviewTime,
  interviewerId,
  intervieweeId,
  intervieweeCVId,
}) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      jobId: jobId,
      description: "Internship 2022 program",
      intervieweeCVId,
      intervieweeId,
      interviewerId,
      interviewTime: "",
    },

    onSubmit: async (values) => {
      const res = await interviewAPI.add(values);
      if (res.status === 200) {
        toast("Interview added successfully", { type: "success" });
        closeModal();
      }
    },
  });

  return (
    <div>
      <div className="">
        <button onClick={openModal} className="btn btn-primary w-40">
          Interview
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
              <Dialog.Overlay className="fixed inset-0 bg-white opacity-75" />
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
              <div className="inline-block w-full  max-w-[600px] min-h-[200px] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-900 font-semibold"
                >
                  Interview Form
                </Dialog.Title>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-4 mt-4"
                >
                  <ComponentWithLabel label="Interview Time">
                    <input
                      id="interviewTime"
                      name="interviewTime"
                      value={formik.values.interviewTime}
                      onChange={formik.handleChange}
                      type="datetime-local"
                      className="input"
                      placeholder="Description"
                    />
                  </ComponentWithLabel>
                  <ComponentWithLabel label="Description">
                    <textarea
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      className="input h-[150px]"
                      placeholder="Description"
                    />
                  </ComponentWithLabel>

                  <div className="w-full flex justify-end">
                    <button type="submit" className="btn btn-primary w-40">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
