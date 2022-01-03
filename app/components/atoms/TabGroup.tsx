import React from "react";

const Tab = ({ name, active, callback }) => {
  return (
    <div
      className={
        (active ? "bg-blue-600 text-white " : "text-gray-400") +
        " rounded-full w-[150px] px-8 py-1 cursor-pointer"
      }
      onClick={callback}
    >
      <p className="text-center">{name}</p>
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
    <div className={"flex rounded-full w-max bg-gray-100 p-1 " + props.styles}>
      {props.tabs.map((tab) => (
        <Tab
          key={tab.name}
          name={tab.name}
          active={tab.active}
          callback={tab.callback}
        />
      ))}
    </div>
  );
}
