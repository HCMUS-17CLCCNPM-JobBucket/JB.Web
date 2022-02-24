import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
export default function EmployerBox(props) {
  const user = useSelector((state: any) => state.user);

  if (user.user.id === props.senderId) {
    return (
      <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex gap-2 items-center justify-start flex-row-reverse">
          {/* <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {props.senderId}
          </div> */}
          <div className="flex flex-col items-end">
            <div className="relative lg:max-w-lg break-words mr-3 text-sm text-white bg-blue-500 py-2 px-4 shadow rounded-t-xl rounded-bl-xl">
              <div>{props.content}</div>
            </div>
            <Moment fromNow className="text-gray-500 text-sm px-4">
              {props.createdDate}
            </Moment>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex gap-2 flex-row">
          {/* <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 flex-shrink-0">
            {props.senderId}
          </div> */}
          <div>
            <div className="relative lg:max-w-lg break-words text-sm text-black bg-gray-300 py-2 px-4 shadow rounded-t-xl rounded-br-xl">
              <div>{props.content}</div>
            </div>
            <Moment fromNow className="text-gray-500 text-sm">
              {props.createdDate}
            </Moment>
          </div>
        </div>
      </div>
    );
  }
}
