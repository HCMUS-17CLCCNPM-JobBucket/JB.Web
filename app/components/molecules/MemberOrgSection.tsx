import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/solid";
import { orgAPI } from "app/api/modules/organization";
import { useUserInfo } from "app/utils/hooks";
import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import MemberCard from "../atoms/MemberCard";
import ComponentWithLabel from "./ComponentWithLabel";

function AddNewMemDialog({ refreshPage }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      passwordPlain: "",
    },
    onSubmit: (values) => {
      orgAPI
        .addNewOrgRecruiter(values)
        .then((res) => {
          toast("New member added successfully");
          closeModal();
          refreshPage();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <div className=" flex items-center justify-center">
        <PlusIcon
          onClick={openModal}
          className="cursor-pointer h-7 w-7 text-gray-400"
        />
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add new Recruiter
                </Dialog.Title>
                <form
                  onSubmit={formik.handleSubmit}
                  className="mt-2 flex flex-col gap-3"
                >
                  <ComponentWithLabel label="Name">
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="input"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </ComponentWithLabel>
                  <ComponentWithLabel label="Email">
                    <input
                      type="email"
                      placeholder="johnsmith@gmail.com"
                      className="input"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </ComponentWithLabel>
                  <ComponentWithLabel label="Password">
                    <input
                      type="password"
                      placeholder="Password123!@#"
                      className="input"
                      id="passwordPlain"
                      name="passwordPlain"
                      onChange={formik.handleChange}
                      value={formik.values.passwordPlain}
                    />
                  </ComponentWithLabel>

                  <div className="mt-4">
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
    </>
  );
}

export default function MemberOrgSection({ company, refreshPage }) {
  const user = useUserInfo();
  return (
    <div>
      {company.members && (
        <div className="p-8 shadow-lg rounded-lg">
          <div className="flex justify-between w-full">
            <p className="text-2xl font-semibold">Members</p>
            {user.user.roleId === 3 && (
              <AddNewMemDialog refreshPage={refreshPage} />
            )}
          </div>
          <div className="flex gap-4 mt-8">
            {company.members.map((member) => (
              <MemberCard
                key={member.id}
                {...member}
                refreshPage={refreshPage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
