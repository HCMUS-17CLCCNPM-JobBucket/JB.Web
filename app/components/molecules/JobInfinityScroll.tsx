import { jobAPI } from "app/api/modules/jobAPI";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import JobHorizonCard from "../atoms/JobCard/JobHorizonCard";
import ListEmpty from "../atoms/ListEmpty";
import Loading from "../atoms/Loading";

export default function JobInfinityScroll({ hasMore, loading, jobs, setPage }) {
  const [isLoading, setIsLoading] = useState(loading);
  const [jobValues, setJobValues] = useState(jobs);
  const [hasMoreValue, setHasMoreValue] = useState(hasMore);

  useEffect(() => {
    if (isLoading !== loading) {
      setIsLoading(loading);
    }
    if (jobs !== jobValues) {
      setJobValues(jobs);
    }
    if (hasMore !== hasMoreValue) {
      setHasMoreValue(hasMore);
    }
  }, [loading, jobs, hasMore]);

  const fetchMoreData = () => {
    setPage();
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : jobs.length === 0 && loading === false ? (
        <ListEmpty message="No result match" />
      ) : (
        <InfiniteScroll
          dataLength={jobs.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          className="flex flex-col gap-4 p-4 min-h-40 "
        >
          {jobs.map((item, index) => (
            <JobHorizonCard key={index} {...item} />
          ))}
        </InfiniteScroll>
      )}
      {!hasMore && <p className="text-center">No more data</p>}
    </div>
  );
}
