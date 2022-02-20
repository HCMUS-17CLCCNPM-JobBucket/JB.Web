import { jobAPI } from "app/api/modules/jobAPI";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Blog from "../atoms/Blog";
import JobHorizonCard from "../atoms/JobCard/JobHorizonCard";
import ListEmpty from "../atoms/ListEmpty";
import Loading from "../atoms/Loading";
import LoadingFullPage from "./LoadingFullPage";

export default function BlogInfinityScroll({
  hasMore,
  loading,
  blogs,
  setPage,
  refreshData,
}) {
  const [isLoading, setIsLoading] = useState(loading);
  const [jobValues, setJobValues] = useState(blogs);
  const [hasMoreValue, setHasMoreValue] = useState(hasMore);

  useEffect(() => {
    if (isLoading !== loading) {
      setIsLoading(loading);
    }
    if (blogs !== jobValues) {
      setJobValues(blogs);
    }
    if (hasMore !== hasMoreValue) {
      setHasMoreValue(hasMore);
    }
  }, [loading, blogs, hasMore]);

  const fetchMoreData = () => {
    setPage();
  };
  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingFullPage />
      ) : blogs.length === 0 && loading === false ? (
        <ListEmpty message="No result match" />
      ) : (
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full min-h-40 "
        >
          {blogs.map((item, index) => (
            <Blog key={index} {...item} refreshData={refreshData} />
          ))}
        </InfiniteScroll>
      )}
      {!hasMore && <p className="text-center">No more data</p>}
    </div>
  );
}
