import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Selector from "../atoms/Select";

const subCategories = [
  { name: "IT", href: "#" },
  { name: "Marketing", href: "#" },
  { name: "Business", href: "#" },
];

export default function MobileFilterDialog(props) {
  const [selectedFilter, setSelectedFilter] = useState({});

  const handleSubmit = () => {
    props.callback(selectedFilter);
    props.setMobileFiltersOpen(false);
  };

  useEffect(() => {
    const query = Router.query as any;
    if (query.category) {
      const category = query.category.split(",");
      setSelectedFilter((oldObj) => ({
        ...oldObj,
        category: category.map(
          (item) => props.filters[4].options[parseInt(item)]
        ),
      }));
    }
  }, []);
  const handleChange = (value, section) => {
    if (value.length === 0) {
      setSelectedFilter({
        ...selectedFilter,
        page: 1,
        [section.name.toLowerCase()]: [],
      });
      return;
    }
    const newValue = value.map((item) => item.value);

    if (newValue.length === 0)
      setSelectedFilter({
        ...selectedFilter,
        page: 1,
        [section.name.toLowerCase()]: [],
      });

    if (selectedFilter[section.name.toLowerCase()])
      setSelectedFilter({
        ...selectedFilter,
        page: 1,
        [section.name.toLowerCase()]: [
          ...selectedFilter[section.name.toLowerCase()],
          newValue[newValue.length - 1],
        ],
      });
    else
      setSelectedFilter({
        ...selectedFilter,
        page: 1,
        [section.name.toLowerCase()]: [...newValue],
      });
  };
  return (
    <Transition.Root show={props.mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-[60] lg:hidden"
        onClose={props.setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                onClick={() => props.setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 border-t border-gray-200">
              {/* Filters */}
              <form className={`px-4 py-2 flex flex-col gap-4`}>
                <div className="flex flex-col gap-4">
                  {props.filters.map((section) => (
                    <div key={section.id} className="flex flex-col gap-1">
                      <p className="font-semibold text-gray-500">
                        {section.name}
                      </p>
                      <Selector
                        options={section.options.map((option) => {
                          return {
                            value: option.id || option.value,
                            label: option.name,
                          };
                        })}
                        onChange={(e) => handleChange(e, section)}
                        value={null}
                        placeholder={
                          section.options.length > 0
                            ? section.options[0].name
                            : ""
                        }
                        isMulti={true}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="px-8 py-3 font-semibold rounded-full bg-blue-600 text-white "
                  >
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
