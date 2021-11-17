import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";

import { Menu, Transition } from "@headlessui/react";

const Alert = ({ type, message }) => {
  // const { alerts } = useSelector((state: any) => state.notifications);
  // const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    // if (alerts.length > 0) {
    //   setAlert(alerts[alerts.length - 1]);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
    // }
  }, []);

  const onClose = () => {
    setShow(false);
  };
  return (
    // show && (
    //   <Wrapper>
    <Transition
      show={show}
      // as={Fragment}
      // enter="transition ease-out duration-100"
      // enterFrom="transform opacity-0 scale-95"
      // enterTo="transform opacity-100 scale-100"
      // leave="transition ease-in duration-75"
      // leaveFrom="transform opacity-100 scale-100"
      // leaveTo="transform opacity-0 scale-95"
    >
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
          <div className="flex flex-row">
            <div className="px-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1792 1792"
                fill="#44C997"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
              </svg>
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold">Success</span>
              <span className="block text-gray-500">{message}</span>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition>
    // </Wrapper>
    // )
  );
};

export default Alert;
