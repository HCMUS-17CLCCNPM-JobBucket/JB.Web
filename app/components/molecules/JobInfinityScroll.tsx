import { jobAPI } from "app/api/modules/jobAPI";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import JobHorizonCard from "../atoms/JobCard/JobHorizonCard";
import ListEmpty from "../atoms/ListEmpty";
import Loading from "../atoms/Loading";

export default function JobInfinityScroll({
  loading,
  jobs,
  filterOptions,
  setJobs,
  setFilterOptions,
}) {
  const user = useSelector((state: any) => state.user);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    const res = await jobAPI.getAll(
      { ...filterOptions, page: filterOptions.page + 1 },
      user.token
    );
    setFilterOptions !== null &&
      setFilterOptions({ ...filterOptions, page: filterOptions.page + 1 });
    setJobs(jobs.concat(res.data.data.jobs));
    setHasMore(res.data.data.jobs.length > 0);
  };
  return (
    <div>
      {jobs.length === 0 && loading === false ? (
        <ListEmpty message="No result match" />
      ) : (
        <InfiniteScroll
          dataLength={jobs.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          className="flex flex-col gap-4 p-4"
        >
          {jobs.map((item, index) => (
            <JobHorizonCard key={index} {...item} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
