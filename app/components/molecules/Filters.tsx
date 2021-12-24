import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

export default function Filters({ filters, callback }) {
  const [scrollOverHeight, setScrollOverHeight] = useState(false);

  useEffect(() => {
    setScrollOverHeight(window.scrollY > 100);
  }, []);

  return (
    <form
      className={`filter sticky top-24 h-[400px] hidden lg:block lg:col-span-2 overflow-y-scroll`}
    >
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.id}
                        type="checkbox"
                        defaultChecked={false}
                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      <div className="fixed bottom-5 left-20 flex justify-center mt-4">
        <button
          onClick={callback}
          type="button"
          className="px-8 py-3 font-semibold rounded-full bg-blue-600 text-white "
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
