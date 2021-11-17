import React from "react";

export default function Badge({ content }) {
  const colors = ["purple", "pink", "red", "yellow", "blue"];

  const colorRng = "bg-" + colors[Math.floor(Math.random() * 5)] + "-500";
  return (
    <span
      className={`inline-block rounded-full text-white bg-blue-600 px-2 py-1 text-xs font-bold mr-3`}
    >
      {content}
    </span>
  );
}
