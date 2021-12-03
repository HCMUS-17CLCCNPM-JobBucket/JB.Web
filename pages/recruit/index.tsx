import UserAPI from "app/api/modules/userAPI";
import KeywordNotFound from "app/components/atoms/KeywordNotFound";
import Loading from "app/components/atoms/Loading";
import EmployeeFilter from "app/components/molecules/EmployeeFilter";
import FoundUser from "app/components/molecules/FoundUser";
import userRoles, { getUserRole } from "app/utils/userRoles";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    focus: "none",
    width: 200,
  }),
  control: (styles) => ({ ...styles, width: 200 }),
};

// export const getServerSideProps = async () => {
//   const res = await JobAPI.getAll(0);
//   if (res.status === 200) return { props: { job: res.data.data } };
//   else return { props: { job: 0 } };
// };

function JobPage() {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state: any) => state.user);
  const [currentPage, setCurrentPage] = useState(0);

  const [jobLength, setJobLength] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState(0);

  const [isTimeOuted, IsTimeOuted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await UserAPI.getListEmployee(
        currentPage,
        user.token,
        keyword
      );
      if (res.status === 200) {
        setJobs(res.data.data);
        setLoading(false);
      }
    };
    if (getUserRole(user.user.userRoles) === userRoles.EMPLOYER) {
      fetchData();
    }
  }, [keyword, currentPage]);

  const jobSection =
    keyword !== "" && jobs.length === 0 ? (
      <KeywordNotFound keyword={keyword} />
    ) : (
      jobs.map((item, index) => <FoundUser {...item} key={index} />)
    );

  return (
    <div className="dark:bg-gray-900">
      <Head>
        <title>Find Employee | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <Toolbar /> */}
      <div className="xl:px-60 md:px-8 px-2 py-8 w-full">
        <p className="text-3xl">Search for Employees</p>
        <EmployeeFilter
          handleFilterSubmit={setCity}
          handleSearchSubmit={setKeyword}
        />
        <div className="flex w-full justify-between p-4">
          <p>{jobs.length} results</p>
          <Select
            instanceId="select-filter"
            options={categories}
            styles={customStyles}
            onChange={(value) => setCategory(value.value)}
            placeholder="Categories"
          />
        </div>
        <div className="grid grid-cols-2">
          {isTimeOuted ? (
            <p>Time Out. Let try again!</p>
          ) : loading ? (
            <Loading />
          ) : (
            jobSection
          )}
        </div>
      </div>
      <div className="h-16"></div>
    </div>
  );
}

export default JobPage;
