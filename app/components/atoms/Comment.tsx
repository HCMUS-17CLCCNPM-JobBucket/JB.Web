import React from "react";
import Moment from "react-moment";

export default function Comment(props) {
  console.log(props);
  return (
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
            <small>Like</small>
          </a>
          <small className="self-center">.</small>
          <a href="#" className="hover:underline">
            <small>Reply</small>
          </a>
          <small className="self-center">.</small>
          <small>
            <Moment fromNow date={props.createdDate} />
          </small>
        </div>
        {props.children.length > 0 && (
          <div className="text-gray-400 mt-1 px-4 flex items-center gap-2 hover:underline cursor-pointer hover:text-gray-700 ease-in-transition">
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
            <div className="text-sm font-semibold">
              {props.children.length} replies
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/*
<div className="flex">
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
        </div>*/
