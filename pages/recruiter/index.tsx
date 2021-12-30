import React from "react";
import { Tab } from "@headlessui/react";
import helper from "app/utils/helper";
import RecuitJob from "app/components/recruiter/RecuitJob";
import Applications from "app/components/recruiter/Applications";
import Schedule from "app/components/recruiter/Schedule";

export default function index() {
  const categories = [
    {
      name: "Jobs",
    },
    {
      name: "Applications",
    },
    {
      name: "Schedule",
    },
  ];
  return (
    <div className="px-16 py-4 min-h-screen">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-gray-900/20 rounded-xl max-w-md mx-auto">
          {categories.map((category, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                helper.classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium rounded-lg",
                  "focus:outline-none ",
                  selected
                    ? "text-blue-600 bg-white shadow font-semibold"
                    : "text-gray-600 hover:bg-gray-600/[0.12] hover:text-white"
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="pt-6">
            <RecuitJob />
          </Tab.Panel>
          <Tab.Panel>
            <Applications />
          </Tab.Panel>
          <Tab.Panel>
            <Schedule />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
