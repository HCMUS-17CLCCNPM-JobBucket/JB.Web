import { Dialog, Transition } from "@headlessui/react";
import interviewAPI from "app/api/modules/interviewAPI";
import ComponentWithLabel from "app/components/molecules/ComponentWithLabel";
import QAInterviewSection from "app/components/molecules/QAInterviewSection";
import ResultInterviewSelection from "app/components/molecules/ResultInterviewSelection";
import { useUserInfo } from "app/utils/hooks";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

export default function SummaryButton(props) {
  let [isOpen, setIsOpen] = useState(false);

  const user = useUserInfo();

  /*{ note: "", round: "1", title: "", sections: [] }*/
  const [form, setForm] = useState({
    note: "",
    round: props.round.toString(),
    title: "",
    sections: [],
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: props.id,
      jobId: props.jobId,
      interviewTime: props.interviewTime || "",
      forms: props.forms || [],
    },

    onSubmit: async (values) => {
      console.log({
        ...values,
        forms: [...props.forms, form],
      });
      const res = await interviewAPI.update({
        ...values,
        forms: [...props.forms, form],
      });

      console.log(res);
      closeModal();
    },
  });
  return (
    <>
      <div className="h-fit">
        {user.user.roleId === 2 && (
          <button
            onClick={openModal}
            className="flex gap-2 justify-end items-end w-full  cursor-pointer"
          >
            <img src="/common/notepad.png" alt="" className="h-8 w-8" />
            <p className="font-semibold text-sm">Summary</p>
          </button>
        )}
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
              <Dialog.Overlay className="fixed inset-0  bg-white opacity-75" />
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
              <div className="inline-block w-full  max-w-[1000px] h-[600px] overflow-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-900 font-semibold"
                >
                  Summary Round {props.round}
                </Dialog.Title>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-4 mt-4"
                >
                  {/* <div className="flex gap-3"> */}
                  <ComponentWithLabel label="Title" styles="flex-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="input"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      required
                    />
                  </ComponentWithLabel>
                  {/* <ComponentWithLabel label="Round" styles=" w-20">
                      <input
                        type="number"
                        name="round"
                        id="round"
                        className="input"
                        value={form.round}
                        onChange={formik.handleChange}
                      />
                    </ComponentWithLabel> */}
                  {/* </div> */}

                  <ComponentWithLabel label="Note">
                    <textarea
                      name="note"
                      id="note"
                      value={form.note}
                      onChange={(e) =>
                        setForm({ ...form, note: e.target.value })
                      }
                      className="input h-[150px]"
                      placeholder="Note"
                    />
                  </ComponentWithLabel>
                  <hr />
                  {/* <ComponentWithLabel label="">
                    <QAInterviewSection
                      value={form.sections}
                      onChange={(val) =>
                        setForm({ ...form, sections: [val, ...form.sections] })
                      }
                    />
                  </ComponentWithLabel> */}

                  <div className="w-full flex justify-end">
                    <button type="submit" className="btn btn-primary w-40">
                      Note
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
