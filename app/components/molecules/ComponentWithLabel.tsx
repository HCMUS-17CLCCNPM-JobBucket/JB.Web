import React from "react";

export default function ComponentWithLabel(props: any) {
  return (
    <div className="">
      <p className="text-sm text-gray-600">{props.label}</p>
      <div className="mt-1">{props.children}</div>
    </div>
  );
}
