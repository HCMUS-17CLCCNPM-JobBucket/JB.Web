import UserAPI from "app/api/modules/userAPI";
import KeywordNotFound from "app/components/atoms/KeywordNotFound";
import ListEmpty from "app/components/atoms/ListEmpty";
import Loading from "app/components/atoms/Loading";
import EmployeeFilter from "app/components/molecules/EmployeeFilter";
import FoundUser from "app/components/molecules/FoundUser";
import SelectJob from "app/components/molecules/SelectJob";
import userRoles, { getUserRole } from "app/utils/userRoles";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector((state: any) => state.user);

  const [jobId, setJobId] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await UserAPI.getRecEmployees(currentPage, filters, jobId);
      if (res.status === 200) {
        setEmployees((pre) => [
          ...pre,
          ...res.data.data.profileRecommendations,
        ]);
        setHasMore(res.data.data.profileRecommendations.length > 0);
      }
    };
    if (user.user.roleId === 2 && currentPage > 1) {
      fetchData();
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await UserAPI.getRecEmployees(1, filters, jobId);
      if (res.status === 200) {
        setEmployees(res.data.data.profileRecommendations);
        setLoading(false);
        setHasMore(res.data.data.profileRecommendations.length > 0);
      }
    };
    if (user.user.roleId >= 2) {
      fetchData();
    }
  }, [filters, jobId]);

  const onSearchSubmit = (val) => {
    setFilters(val);
  };

  const fetchMoreData = () => {
    setCurrentPage((prev) => prev + 1);
  };
  return (
    <div className="dark:bg-gray-900">
      <Head>
        <title>Find Employee | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <Toolbar /> */}
      <div className="xl:px-60 md:px-8 px-2 py-8 w-full">
        <p className="text-3xl">Search for Employees</p>
        <EmployeeFilter onSearchSubmit={onSearchSubmit} />
        {/* <div className="flex w-full justify-between p-4">
          <p>{employees.length} results</p>
          <Select
            instanceId="select-filter"
            options={categories}
            styles={customStyles}
            onChange={(value) => setCategory(value.value)}
            placeholder="Categories"
          />
        </div> */}

        <div className="flex justify-between mt-4">
          <p>{employees.length} results</p>

          <SelectJob onChange={(val) => setJobId(val)} />
        </div>
        <div className="">
          {loading ? (
            <Loading />
          ) : employees.length === 0 && loading === false ? (
            <ListEmpty message="No result match" />
          ) : (
            <InfiniteScroll
              dataLength={employees.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Loading />}
              scrollableTarget="scrollableDiv"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {employees.map((item, index) => (
                <FoundUser {...item} key={index} />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
      <div className="h-16"></div>
    </div>
  );
}

export default JobPage;
