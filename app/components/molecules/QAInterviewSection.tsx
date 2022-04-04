import React, { useState } from "react";
import ComponentWithLabel from "./ComponentWithLabel";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import RatingComponent from "../atoms/RatingComponent";

function QAList({ value }) {
  return (
    <div className="w-full">
      <div className="w-full max-w-md p-2 bg-white rounded-2xl flex flex-col gap-2">
        {value.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{item.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-col">
                  <p>Answer: {item.answer}</p>
                  <div className="mt-2">
                    <RatingComponent
                      value={item.rating}
                      styles="sub-rating"
                      quiet
                      callback={null}
                    />
                    <p>Note: {item.note}</p>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

export default function QAInterviewSection({ value, onChange }) {
  const [data, setData] = useState({
    question: "",
    answer: "",
    note: "",
    rating: 1,
  });
  const handleAdd = (e) => {
    e.preventDefault();
    onChange({ ...data });
  };
  return (
    <div>
      {/* {value.map((item, index) => (
        <p key={index}>{item.note}</p>
      ))} */}
      <QAList value={value} />
      <ComponentWithLabel label="Question">
        <input
          type="text"
          className="input"
          value={data.question}
          onChange={(e) => setData({ ...data, question: e.target.value })}
        />
      </ComponentWithLabel>
      <ComponentWithLabel label="Answer">
        <input
          type="text"
          className="input"
          value={data.answer}
          onChange={(e) => setData({ ...data, answer: e.target.value })}
        />
      </ComponentWithLabel>
      <ComponentWithLabel label="Note">
        <input
          type="text"
          className="input"
          value={data.note}
          onChange={(e) => setData({ ...data, note: e.target.value })}
        />
      </ComponentWithLabel>
      <ComponentWithLabel label="Rating">
        <input
          type="number"
          className="input"
          value={data.rating}
          onChange={(e) =>
            setData({ ...data, rating: parseInt(e.target.value) })
          }
          max={5}
          min={1}
        />
      </ComponentWithLabel>

      <button className="btn btn-primary w-40 mt-4" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
