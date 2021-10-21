import React, { useState } from "react";
import Moment from "react-moment";

const Replies = ({ length, children }) => {
  const [isOpened, setIsOpened] = useState(false);

  if (isOpened)
    return (
      <div>
        <div className="flex flex-col gap-2">
          {children.map((child, index) => (
            <Comment key={index} {...child} />
          ))}
        </div>
        <div
          onClick={() => setIsOpened(false)}
          className="flex items-center text-gray-400 hover:text-black hover:underline cursor-pointer"
        >
          <p>See less</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );

  return (
    <div>
      {length > 0 && (
        <div
          onClick={() => setIsOpened(true)}
          className="text-gray-400 mt-1 px-4 flex items-center gap-2 hover:underline cursor-pointer hover:text-gray-700 ease-in-transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm font-semibold">{length} replies</div>
        </div>
      )}
    </div>
  );
};
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { blogAPI } from "app/api/modules/blogAPI";

export default function Comment(props) {
  const user = useSelector((state: any) => state.user);

  const handleEdit = async () => {};
  const handleDelete = async () => {
    const res = await blogAPI.delete(props.id, user.token);
  };
  return (
    <div className="flex items-center group">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
            src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            alt=""
          />
        </div>
        <div>
          <div className="flex-1 border rounded-xl px-4 py-2 sm:px-4 sm:py-2 leading-relaxed bg-gray-200">
            <strong>{props.user.name}</strong>{" "}
            <span className="text-xs text-gray-400"></span>
            <p className="text-sm">{props.content}</p>
          </div>

          <div className="font-semibold px-4 text-gray-700 flex items-center space-x-1">
            <a href="#" className="hover:underline">
              <small>Like {props.interestCount}</small>
            </a>
            <small className="self-center">.</small>
            <a href="#" className="hover:underline">
              <small>Reply</small>
            </a>
            <small className="self-center">.</small>
            <small>
              <Moment add={{ hours: 7 }} fromNow date={props.createdDate} />
            </small>
          </div>
          {/* eslint-disable-next-line react/no-children-prop */}
          <Replies length={props.children?.length} children={props.children} />
        </div>
      </div>

      <div className="hidden gap-2 text-gray-400 group-hover:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={handleEdit}
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={handleDelete}
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

{
  /* <div className="flex">
          <div className="flex-shrink-0 mr-3">
            <img
              className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
              alt=""
            />
          </div>
          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <strong>Sarah</strong>{" "}
            <span className="text-xs text-gray-400">3:34 PM</span>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
            <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">
              Replies
            </h4>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <img
                    className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                    src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong>Sarah</strong>{" "}
                  <span className="text-xs text-gray-400">3:34 PM</span>
                  <p className="text-xs sm:text-sm">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <img
                    className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                    src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong>Sarah</strong>{" "}
                  <span className="text-xs text-gray-400">3:34 PM</span>
                  <p className="text-xs sm:text-sm">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */
}
