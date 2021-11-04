import router from "next/router";
import React from "react";

export default function JobDashboard(props) {
  //group styles my tab
  const myTab = (tabName: string) =>
    `${
      router.pathname === "/job/" + tabName
        ? "border-blue-600"
        : "border-coolGray-600"
    } flex items-center flex-shrink-0 px-5 py-2 border-b-4 text-coolGray-600`;

  return (
    <div className="px-16 ">
      <div
        className="flex items-center space-x-2 overflow-x-auto overflow-y-hidden 
      flex-nowrap bg-coolGray-100 text-coolGray-800"
      >
        <a href="#" className={`${myTab("saved")}`}>
          Saved
        </a>
        <a href="#" className={`${myTab("applied")}`}>
          Applied
        </a>
      </div>
      <div className="mt-8">{props.children}</div>
    </div>
  );
}
