import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";
import { jobAPI } from "app/api/modules/jobAPI";
import SearchJob from "app/components/atoms/SearchBar/SearchJob";
import helper from "app/utils/helper";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import TabGroup from "../atoms/TabGroup";
import Filters from "../molecules/Filters";
import JobInfinityScroll from "../molecules/JobInfinityScroll";
import MobileFilterDialog from "../molecules/MobileFilterDialog";
import { useUserInfo } from "app/utils/hooks";

const sortOptions = [
  { name: "Default", href: "default", current: false },
  { name: "Newest", href: "newest", current: false },
  { name: "Oldest", href: "oldest", current: false },
  // { name: "Most relevant", href: "most-relevant", current: false },
];

const QueryHandler = (query, filter) => {
  // if (query.category) {
  //   const category = query.category.split(",");
  //   filter.category = [
  //     ...filter.category,
  //     ...category.map((item, index) => (item = parseInt(item))),
  //   ];
  // }

  if (query?.keyword) filter.keyword = query.keyword as string;

  switch (query?.sort) {
    case "default":
      filter.sortBy = "";
      break;
    case "newest":
      filter.sortBy = "createdDate";
      filter.isDescending = true;
      break;
    case "oldest":
      filter.sortBy = "createdDate";
      filter.isDescending = false;
      break;
    // case "most-relevant":
    //   filter.sortBy = "";
    //   break;
    default:
      filter.sortBy = "";
      break;
  }
};

export default function JobLayout({ type, query }) {
  const router = useRouter();

  const user = useUserInfo();

  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [jobs, setJobs] = useState<any>([]);

  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    skills: [],
    positions: [],
    types: [],
  });

  const [hasMore, setHasMore] = useState(true);
  const [filterOptionsInput, setFilterOptionsInput] = useState({
    isDescending: false,
    page: 1,
    size: 10,
    sortBy: "",
    keyword: "",
    // numberEmployeesToApplied: [],
    createdDate: [],
    expireDate: [],
    category: query?.category
      ? query.category.split(",").map((item) => parseInt(item))
      : [],
    skill: [],
    position: [],
    salary: [],
  });

  const handleSearch = (keyword: string) => {
    if (keyword === "") {
      setFilterOptionsInput({
        ...filterOptionsInput,
        keyword,
        page: 1,
      });
    }
    let temp = keyword.trim();
    if (temp.length > 0 || jobs.length === 0) {
      setFilterOptionsInput({
        ...filterOptionsInput,
        page: 1,
        keyword,
      });
    }
  };

  const handleFilter = (values: any) => {
    setFilterOptionsInput({ ...values, page: 1 });
  };

  useMemo(() => {
    if (type === "recommend") {
      delete filterOptionsInput.keyword;
    }
    const fetchData = async () => {
      setLoading(true);
      const res = await jobAPI.getJobProperties();
      if (res.status === 200) setFilterOptions(res.data.data.jobProperties);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newFilter = { ...filterOptionsInput, page: 1 };

    QueryHandler(query, newFilter);

    setFilterOptionsInput({ ...newFilter });
  }, [query]);

  useEffect(() => {
    if (user.token === "" && type === "recommend") {
      return;
    }

    if (filterOptionsInput.page === 1) {
      setLoading(true);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      jobAPI
        .getJobByRoute({ ...filterOptionsInput, page: 1 }, type)
        .then((res) => {
          if (res.status === 200) {
            if (type === "all") setJobs(res.data.data.jobs);
            else setJobs(res.data.data.jobRecommendations);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (filterOptionsInput.page > 1) {
      jobAPI
        .getJobByRoute(
          {
            ...filterOptionsInput,
            page: filterOptionsInput.page,
          },
          type
        )
        .then((res) => {
          if (res.status === 200) {
            if (type === "all") {
              setJobs([...jobs, ...res.data.data.jobs]);
              setHasMore(res.data.data.jobs.length > 0);
            } else {
              setJobs([...jobs, ...res.data.data.jobRecommendations]);
              setHasMore(res.data.data.jobRecommendations.length > 0);
            }
          }
        });
    }
  }, [filterOptionsInput]); //,
  return (
    <div className="bg-white">
      <Head>
        <title>Job | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          callback={handleFilter}
          filters={[
            {
              id: "Cities",
              name: "Cities",
              options: [
                { id: "Ho Chi Minh", name: "Ho Chi Minh" },
                { id: "Ha Noi", name: "Ha Noi" },
              ],
            },
            {
              id: "Skills",
              name: "Skill",
              options: filterOptions.skills,
            },
            {
              id: "Positions",
              name: "Position",
              options: filterOptions.positions,
            },
            {
              id: "Types",
              name: "Type",
              options: filterOptions.types,
            },
            {
              id: "Category",
              name: "Category",
              value: filterOptionsInput.category,
              options: filterOptions.categories,
            },
            // {
            //   id: "Salary",
            //   name: "Salary",
            //   options: salaryOptions,
            // },
          ]}
        ></MobileFilterDialog>
        <div className="flex justify-center">
          <SearchJob
            styles="w-full lg:w-1/2 mx-4 md:mx-8 px-2 py-1 hover:shadow-lg"
            handleSearch={handleSearch}
            // handleReset={handleReset}
          />
        </div>
        <main className=" px-4 sm:px-6 lg:px-16">
          <div className="relative z-10 flex items-baseline justify-between pt-4 pb-6 border-b border-gray-200">
            <h1 className="hidden lg:block  text-xl font-medium text-center text-gray-900">
              Filters
            </h1>

            <TabGroup
              tabs={[
                {
                  name: "Browse All",
                  active: router.pathname === "/job",
                  callback: () => router.push("/job"),
                },
                {
                  name: "Recommend",
                  active: router.pathname === "/job/recommend",
                  callback: () => router.push("/job/recommend"),
                },
              ]}
            />
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              href={{
                                pathname:
                                  type === "all" ? "/job" : "/job/recommend",
                                query: {
                                  sort: option.href,
                                },
                              }}
                              passHref
                            >
                              <p
                                className={helper.classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                              >
                                {option.name}
                              </p>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                {/* <FilterIcon className="w-5 h-5" aria-hidden="true" /> */}
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10">
              {/* Filters */}

              <Filters
                filters={[
                  {
                    id: "Cities",
                    name: "Cities",
                    options: [
                      { id: "Ho Chi Minh", name: "Ho Chi Minh" },
                      { id: "Ha Noi", name: "Ha Noi" },
                    ],
                  },
                  {
                    id: "Skills",
                    name: "Skill",
                    options: filterOptions.skills,
                  },
                  {
                    id: "Positions",
                    name: "Position",
                    options: filterOptions.positions,
                  },
                  {
                    id: "Types",
                    name: "Type",
                    options: filterOptions.types,
                  },
                  {
                    id: "Category",
                    name: "Category",
                    value: filterOptionsInput.category,
                    options: filterOptions.categories,
                  },
                  // {
                  //   id: "Salary",
                  //   name: "Salary",
                  //   options: salaryOptions,
                  // },
                ]}
                callback={handleFilter}
                loading={loading}
              />
              {/* Product grid */}
              <div className="lg:col-span-9">
                <JobInfinityScroll
                  setPage={() =>
                    setFilterOptionsInput({
                      ...filterOptionsInput,
                      page: filterOptionsInput.page + 1,
                    })
                  }
                  hasMore={hasMore}
                  loading={loading}
                  jobs={jobs}
                  // filterOptions={filterOptionsInput}
                  // setFilterOptions={setFilterOptionsInput}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
