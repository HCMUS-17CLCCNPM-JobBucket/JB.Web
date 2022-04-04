import { jobAPI } from "app/api/modules/jobAPI";
import { useUserInfo } from "app/utils/hooks";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import SetScheduleInterviewButton from "../atoms/Button/SetScheduleInterviewButton";
import InterviewCard from "../atoms/InterviewCard";
import JobHorizonCard from "../atoms/JobCard/JobHorizonCard";
import ListEmpty from "../atoms/ListEmpty";
import Loading from "../atoms/Loading";
import LoadingFullPage from "./LoadingFullPage";

export default function ScheduleInfinityScroll({
  hasMore,
  loading,
  schedules,
  setPage,
}) {
  const user = useUserInfo();
  const [isLoading, setIsLoading] = useState(loading);
  const [jobValues, setJobValues] = useState(schedules);
  const [hasMoreValue, setHasMoreValue] = useState(hasMore);

  useEffect(() => {
    if (isLoading !== loading) {
      setIsLoading(loading);
    }
    if (schedules !== jobValues) {
      setJobValues(schedules);
    }
    if (hasMore !== hasMoreValue) {
      setHasMoreValue(hasMore);
    }
  }, [loading, schedules, hasMore]);

  const fetchMoreData = () => {
    setPage();
  };
  return (
    <div className="mt-8">
      {isLoading ? (
        <Loading />
      ) : schedules.length === 0 && loading === false ? (
        <ListEmpty />
      ) : (
        <InfiniteScroll
          dataLength={schedules.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          className="grid grid-cols-2 gap-4 p-4 min-h-40 w-full"
        >
          {schedules.map((item, index) => (
            <InterviewCard key={index} {...item} />
          ))}
        </InfiniteScroll>
      )}
      {/* {!hasMore && <p className="text-center">No more data</p>} */}
    </div>
  );
}
