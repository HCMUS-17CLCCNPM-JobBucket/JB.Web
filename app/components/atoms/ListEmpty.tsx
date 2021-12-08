import React from "react";

export default function ListEmpty(props) {
  return (
    <div className="container mx-auto flex py-4 items-center justify-center flex-col">
      <img
        className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
        alt="hero"
        src="/common/empty.svg"
      />
      <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Nothing
        </h1>
        <p className="mb-8 leading-relaxed">
          {props.message || "Collection list is empty."}
        </p>
      </div>
    </div>
  );
}
