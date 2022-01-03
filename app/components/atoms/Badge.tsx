import React, { useEffect, useState } from "react";

export default function Badge(props) {
  const colors = ["purple", "pink", "red", "yellow", "blue"];

  const colorRng = "bg-" + colors[Math.floor(Math.random() * 5)] + "-500";

  // const [bg, setBg] = useState(colorRng);

  // useEffect(() => {
  //   if (props.type === "new") setBg("bg-red-500");
  //   else if (props.type === "skill") setBg("bg-gray-500");
  //   else setBg("bg-blue-500");
  // }, []);

  return (
    <span
      className={`${
        props.type === "new"
          ? "bg-red-500"
          : props.type === "skill"
          ? "bg-gray-500"
          : "bg-blue-500"
      } w-max inline-block rounded-full text-white px-4 py-1 text-xs font-bold mr-3`}
    >
      {props.content}
    </span>
  );
}
