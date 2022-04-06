import { jobAPI } from "app/api/modules/jobAPI";
import ApplicationStatus from "app/enums/ApplicationStatus";
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
import ApplicationCV from "app/components/cv/reviewCv/applicationCV";

export default function ApplicationInfinityScroll({
  hasMore,
  loading,
  applications,
  setPage,
  onRefresh,
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

  const onFail = async (jobId, userId) => {
    const res = await jobAPI.failApplication(jobId, userId);
    onRefresh();
  };
  const onPass = async (jobId, userId) => {
    const res = await jobAPI.passApplication(jobId, userId);
    onRefresh();
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
            <div
              key={index}
              className="job-horizon-card hover:shadow-lg relative w-full"
            >
              <div className="job-horizon-card__header">
                <div className=" flex gap-4 items-start justify-start overflow-hidden">
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
                        {item.user.name} - {item.job.title}
                      </p>
                    </a>
                    <div className="flex text-gray-400">{item.user.email}</div>
                  </div>
                </div>
                <p>{item.introdution || "No Description"}</p>

                <div>
                  <p className="font-semibold mt-2">Attachments: </p>
                  <div className="flex flex-col gap-1">
                    {item.attachments.map((attach, index) => (
                      <a
                        key={index}
                        href={attach}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500"
                      >
                        {attach}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="gap-4 flex flex-col md:flex-row md:justify-between md:items-center px-6 py-2 border-t">
                <div className="flex gap-2">
                  <p className="text-red-600 font-semibold">
                    {ApplicationStatus[item.status + 1]}
                  </p>
                  <p className="md:block">
                    - Applied <Moment fromNow>{item.createdDate}</Moment>{" "}
                  </p>
                </div>
                <div className="xs:block flex gap-4">
                  {/* <a
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
                    
                  </a> */}

                  <div className="flex gap-2">
                    {item.cVId === -1 ? (
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
                    ) : (
                      <ApplicationCV id={item.cVId} />
                    )}
                    {item.status === 0 && (
                      <div className="flex gap-2">
                        <button
                          className="bg-red-600 text-white w-28 h-10 rounded-md"
                          onClick={() => onFail(item.job.id, item.user.id)}
                        >
                          Fail
                        </button>
                        <button
                          className="bg-green-500 text-white w-28 h-10 rounded-md"
                          onClick={() => onPass(item.job.id, item.user.id)}
                        >
                          Pass
                        </button>
                      </div>
                    )}
                  </div>
                  {/* )} */}
                  <SetScheduleInterviewButton
                    jobId={item.job.id}
                    // description={"123123"}
                    onReschedule={null}
                    interviewTime={""}
                    intervieweeCVId={-1}
                    intervieweeId={item.user.id}
                    interviewerId={user.user.id}
                  />
                </div>
              </div>
            </div>
            // <div key={index} className="flex justify-between items-center">
            //   <div className=" flex gap-4 items-start justify-start w-1/4 overflow-hidden">
            //     <img
            //       src={item.user.avatarUrl || "/avatar/avatar.png"}
            //       className="h-16 w-16 rounded-full"
            //       alt=""
            //     />
            //     <div>
            //       <a
            //         href={"/employee/" + item.user.id}
            //         target="_blank"
            //         rel="noreferrer"
            //       >
            //         <p className="text-xl font-semibold hover:text-blue-600">
            //           {item.user.name}
            //         </p>
            //       </a>
            //       <div className="flex text-gray-400">{item.user.email}</div>
            //     </div>
            //   </div>

            //   <a
            //     href={item.cVPDFUrl}
            //     target="_blank"
            //     rel="noreferrer"
            //     className="flex gap-3 items-center cursor-pointer"
            //   >
            //     <img
            //       src="/common/cv.png"
            //       alt=""
            //       className="h-10 w-10 rounded-lg object-cover"
            //     />
            //     <p className="text-blue-600 font-semibold">CV</p>
            //   </a>
            //   <p className="w-[40px] text-red-600 font-semibold">
            //     {ApplicationStatus[item.status]}
            //   </p>
            //   <div className="w-[200px] flex gap-3 items-center justify-center">
            //     <img
            //       src={item.job.imageUrls[0] || "/common/photo.png"}
            //       alt=""
            //       className="h-10 w-10 rounded-lg object-cover"
            //     />
            //     <p className="max-w-[400px] truncate text-xl ">
            //       {item.job.title}
            //     </p>
            //   </div>

            //   <p>
            //     Applied <Moment fromNow>{item.createdDate}</Moment>
            //   </p>

            //   <SetScheduleInterviewButton
            //     jobId={item.job.id}
            //     // description={"123123"}
            //     // interviewTime={""}
            //     intervieweeCVId={-1}
            //     intervieweeId={item.user.id}
            //     interviewerId={user.user.id}
            //   />
            // </div>
          ))}
        </InfiniteScroll>
      )}
      {!hasMore && <p className="text-center">No more data</p>}
    </div>
  );
}
