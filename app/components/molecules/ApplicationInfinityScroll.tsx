import { jobAPI } from "app/api/modules/jobAPI";
import { useUserInfo } from "app/utils/hooks";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import SetScheduleInterviewButton from "../atoms/Button/SetScheduleInterviewButton";
import JobHorizonCard from "../atoms/JobCard/JobHorizonCard";
import ListEmpty from "../atoms/ListEmpty";
import Loading from "../atoms/Loading";
import LoadingFullPage from "./LoadingFullPage";

export default function ApplicationInfinityScroll({
  hasMore,
  loading,
  applications,
  setPage,
}) {
  const user = useUserInfo();
  const [isLoading, setIsLoading] = useState(loading);
  const [jobValues, setJobValues] = useState(applications);
  const [hasMoreValue, setHasMoreValue] = useState(hasMore);

  useEffect(() => {
    if (isLoading !== loading) {
      setIsLoading(loading);
    }
    if (applications !== jobValues) {
      setJobValues(applications);
    }
    if (hasMore !== hasMoreValue) {
      setHasMoreValue(hasMore);
    }
  }, [loading, applications, hasMore]);

  const fetchMoreData = () => {
    setPage();
  };
  return (
    <div className="mt-8">
      {isLoading ? (
        <Loading />
      ) : applications.length === 0 && loading === false ? (
        <ListEmpty message="No result match" />
      ) : (
        <InfiniteScroll
          dataLength={applications.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          scrollableTarget="scrollableDiv"
          className="flex flex-col gap-4 p-4 min-h-40 w-full"
        >
          {applications.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-4 items-start justify-start w-1/4 overflow-hidden">
                <img
                  src={item.user.avatarUrl || "/avatar/avatar.png"}
                  className="h-16 w-16 rounded-full"
                  alt=""
                />
                <div>
                  <a
                    href={"/employee/" + item.user.id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="text-xl font-semibold hover:text-blue-600">
                      {item.user.name}
                    </p>
                  </a>
                  <div className="flex text-gray-400">{item.user.email}</div>
                </div>
              </div>

              <a
                href={item.cVPDFUrl}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 items-center cursor-pointer"
              >
                <img
                  src="/common/cv.png"
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <p className="text-blue-600 font-semibold">CV</p>
              </a>
              <div className="flex gap-3 items-center justify-center">
                <img
                  src={item.job.imageUrls[0]}
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <p className="max-w-[400px] truncate text-xl ">
                  {item.job.title}
                </p>
              </div>

              <p>
                Applied <Moment fromNow>{item.createdDate}</Moment>
              </p>

              <SetScheduleInterviewButton
                jobId={item.job.id}
                // description={"123123"}
                // interviewTime={""}
                intervieweeCVId={-1}
                intervieweeId={item.user.id}
                interviewerId={user.user.id}
              />
            </div>
          ))}
        </InfiniteScroll>
      )}
      {!hasMore && <p className="text-center">No more data</p>}
    </div>
  );
}
