import React from "react";

const Tab = ({ name, active, callback, number }) => {
  return (
    <div
      className={
        (active ? "bg-blue-600 text-white " : "text-gray-400") +
        " rounded-full w-full  md:w-[150px] cursor-pointer px-2 py-1 md:px-4 "
      }
      onClick={callback}
    >
      <p className="text-center">
        <span>{number} </span>
        {name}
      </p>
    </div>
  );
};

/**
 *
 * @param tabs type of {name: string, active: boolean, callback: function}
 * @returns
 */
export default function TabGroup(props) {
  return (
    <div
      className={
        "flex rounded-full w-full md:w-max bg-gray-100 p-1 " + props?.styles
      }
    >
      {props.tabs.map((tab) => (
        <Tab
          key={tab.name}
          name={tab.name}
          active={tab.active}
          callback={tab.callback}
          number={tab.number || ""}
        />
      ))}
    </div>
  );
}
