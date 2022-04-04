import Badge from "app/components/atoms/Badge";
import SaveJobButton from "app/components/atoms/Button/SaveJobButton";
import SalaryRange from "app/components/atoms/SalaryRange";
import ApplicationCV from "app/components/cv/reviewCv/applicationCV";
import DeleteDialog from "app/components/Recruiter/DeleteDialog";
import ApplicationStatus from "app/enums/ApplicationStatus";
import { useUserInfo } from "app/utils/hooks";
import moment from "moment";
import router from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "react-moment";
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
    <div className="mt-8">
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
          className="flex flex-col gap-4 p-4 min-h-40 w-full"
        >
          {jobs.map((item, index) =>
            router.pathname === "/job/applied" ? (
              <AppliedJobCard key={index} {...item} />
            ) : (
              <JobHorizonCard isRecruiter key={index} {...item} />
            )
          )}
        </InfiniteScroll>
      )}
      {!hasMore && <p className="text-center">No more data</p>}
    </div>
  );
}
const AppliedJobCard = (props) => {
  const user = useUserInfo();
  return (
    <div className="job-horizon-card hover:shadow-lg relative w-full">
      <div className="job-horizon-card__header">
        {/* <div className="flex justify-between">
          <Badge
            content={
              props.job.categories.length > 0 && props.job.categories[0].name
            }
          />
          {moment(props.job.createdDate).diff(moment(), "days") * -1 <= 3 && (
            <Badge content="New for you" type="new" />
          )}
        </div> */}
        <div className="job-horizon-card__company">
          <a href={"/job/" + props.job.id} target="_blank" rel="noreferrer">
            <img src={props.job.imageUrls[0]} alt="Google" />
          </a>
          <div className="flex justify-between w-full">
            <div>
              <a href={"/job/" + props.job.id} target="_blank" rel="noreferrer">
                <p>
                  {props.job.title}
                  {props.job.types.length > 0 && (
                    <span className="text-red-500">
                      {" "}
                      - {props.job.types[0].name}
                    </span>
                  )}
                </p>
              </a>
              <span className="text-gray-600 line-clamp-1">
                {props.job.addresses == null
                  ? "No addresses"
                  : props.job.addresses[0]}
              </span>
            </div>
            <div className="hidden lg:block">
              <SalaryRange
                minSalary={props.job.minSalary}
                maxSalary={props.job.maxSalary}
              />
            </div>
          </div>
        </div>
        <p>
          Position:{" "}
          <span className="text-blue-600 font-semibold">
            {props.job.positions.length > 0
              ? props.job.positions[0].name
              : "No position"}
          </span>
        </p>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: props.job.description || " No description",
          }}
          className="job-horizon-card__desc line-clamp"
        ></div> */}
        <div className="block lg:hidden">
          <SalaryRange
            minSalary={props.job.minSalary}
            maxSalary={props.job.maxSalary}
          />
        </div>
        <div className="flex mt-2 flex-wrap gap-2">
          {props.job.skills.map((skill, index) => (
            <Badge key={index} content={skill.name} type="skill" />
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-2 border-t">
        <div className="flex gap-2">
          <p>
            Expires in{" "}
            <Moment format="DD/MM/YYYY" date={props.job.expireDate} />
          </p>

          {/* <p className="hidden md:block">
            - Posted <Moment fromNow date={props.job.createdDate} />
          </p> */}
        </div>
        <div className="">
          {user.user.roleId === 2 ? (
            <div>
              <button
                onClick={() =>
                  router.push("/recruiter/jobs/" + props.job.id + "/edit")
                }
                type="button"
                className="mr-4 bg-blue-600 text-white inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-ml-1 mr-2 h-5 w-5 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <p>Edit</p>
              </button>
              <DeleteDialog id={props.job.id}></DeleteDialog>
            </div>
          ) : (
            router.pathname !== "/job/applied" && (
              <SaveJobButton
                isInterested={props.job.isJobInterested}
                jobId={props.job.id}
              />
            )
          )}
        </div>
      </div>

      {router.pathname === "/job/applied" && (
        <div className="gap-4 flex flex-col md:flex-row md:justify-between md:items-center px-6 py-2 border-t">
          <div className="flex gap-2">
            <p className="text-red-600 font-semibold">
              {ApplicationStatus[props.status + 1]}
            </p>
            <p className="md:block">
              - Applied <Moment fromNow>{props.createdDate}</Moment>{" "}
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
            {props.cVId === -1 ? (
              <a
                href={props.cVPDFUrl}
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
              <ApplicationCV id={props.cVId} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
