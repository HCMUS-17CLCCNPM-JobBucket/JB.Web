// import { useQuery } from "@apollo/client";
import { jobAPI } from "app/api/modules/jobAPI";
import Badge from "app/components/atoms/Badge";
import ApplyButton from "app/components/atoms/Button/ApplyButton";
import SaveJobButton from "app/components/atoms/Button/SaveJobButton";
import Divider from "app/components/atoms/Divider";
import RecJob from "app/components/atoms/RecJob";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Head from "next/head";
import JobRecSection from "app/components/molecules/JobRecSection";
import router from "next/router";
import { chatAPI } from "app/api/modules/chatAPI";
import { useUserInfo } from "app/utils/hooks";
import UserAPI from "app/api/modules/userAPI";
import FoundUser from "app/components/molecules/FoundUser";

export const getServerSideProps = async ({ params }) => {
  const res = await jobAPI.getJobByIdWithoutToken(parseInt(params.id));
  if (res.status === 200) return { props: { ...res.data.data, id: params.id } };
  return {
    props: { id: params.id },
  };
};

export const EmployeeRecSection = ({ jobId, userId }) => {
  const [employees, setEmployees] = useState([]);
  const user = useUserInfo();

  useEffect(() => {
    const fetchData = async () => {
      const res = await UserAPI.getRecEmployees(1, { size: 6, userId }, jobId);
      if (res.status === 200) {
        setEmployees(res.data.data.profileRecommendations);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {user.user.roleId === 2 && (
        <div>
          <p className="text-xl font-semibold text-gray-500 px-4">
            Recommend Employees
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((item, index) => (
              <FoundUser {...item} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function JobDetail(props) {
  const user = useUserInfo();
  const [isExpired, setIsExpired] = useState(false);
  const [jobStatus, setJobStatus] = useState({
    isJobInterested: false,
    isJobApplied: false,
  });
  const [jobInfo, setjobInfo] = useState<any>(props.jobs[0]);
  useEffect(() => {
    var date1 = moment(jobInfo.expireDate);
    var date2 = moment();
    setIsExpired(date1.diff(date2) < 0);

    const fetchData = async () => {
      const res = await jobAPI.getJobById(parseInt(jobInfo.id));
      setJobStatus(res.data.data.jobs[0]);
    };
    fetchData();
  }, []);

  // const onCreateConversation = async () => {
  //   const res = await chatAPI.createConversation(jobInfo.employerId);
  //   if (res.status === 200) {
  //     router.push(`/chat/${res.data.data.chat.addOrGet.id}`);
  //   }
  // };

  return (
    <div className="flex-1 px-16 py-4">
      <Head>
        <title>{jobInfo.title} | JobBucket</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={jobInfo.description} />
      </Head>
      {/* <img
        src={
          jobInfo?.imageUrls[1] ||
          "https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-thumb.jpg"
        }
        alt=""
        className="h-52 w-full rounded-lg"
      /> */}
      <div className="mt-3"></div>
      {jobInfo.categories.length > 0 && (
        <Badge content={jobInfo?.categories[0].name} />
      )}
      <div className="flex gap-4">
        <img
          src={jobInfo?.imageUrls[0] || "/company.png"}
          alt=""
          className="h-20 w-20 rounded-lg border border-gray-200"
        />

        <div className="flex-1 min-w-0">
          <span className="w-full text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            <p>{jobInfo?.title}</p>
            {/* {jobInfo?.types.length > 0 && (
                <span className="text-red-500">
                  {" "}
                  - {jobInfo?.types[0].name}
                </span>
              )} */}
          </span>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              {/* Heroicon name: solid/briefcase */}
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <p className="capitalize">
                {jobInfo.types.length !== 0 && jobInfo.types[0].name}
              </p>
            </div>
            {/* Heroicon name: solid/location-marker */}
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              {jobInfo?.positions[0].name}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              ${jobInfo?.minSalary} - ${jobInfo?.maxSalary}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-500">
                Expired in{" "}
                {<Moment format="DD/MM/YYYY" date={jobInfo?.expireDate} />}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-fit gap-2 mt-3 flex justify-between items-center">
        {user.user.roleId === 1 && (
          <div className="flex gap-2">
            <ApplyButton
              value={jobStatus.isJobApplied}
              jobId={jobInfo.id}
              expire={isExpired}
            />
            <SaveJobButton
              isInterested={jobStatus.isJobInterested}
              jobId={jobInfo.id}
            />
            {/* <button
              className="btn btn-primary w-40"
              onClick={onCreateConversation}
            >
              Message
            </button> */}
          </div>
        )}

        <span className="ml-3 relative sm:hidden">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            id="mobile-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            More
            <svg
              className="-mr-1 ml-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div
            className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
            tabIndex={-1}
          >
            {/* Active: "bg-gray-100", Not Active: "" */}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="mobile-menu-item-0"
            >
              Edit
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="mobile-menu-item-1"
            >
              View
            </a>
          </div>
        </span>
      </div>
      <div className="flex justify-between gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="mt-4">
            <p className="text-xl font-semibold">Benefits</p>
            <div
              dangerouslySetInnerHTML={{
                __html: jobInfo.benefits || " No benefits",
              }}
            ></div>
          </div>
          <div className="">
            <p className="text-xl font-semibold">Description</p>
            <div
              dangerouslySetInnerHTML={{
                __html: jobInfo.description || " No description",
              }}
            ></div>
          </div>
          <div className="">
            <p className="text-xl font-semibold">Requirements</p>
            <div
              dangerouslySetInnerHTML={{
                __html: jobInfo.description || " No requirements",
              }}
            ></div>
          </div>
          <div className="">
            <p className="text-xl font-semibold">Skills</p>
            <div className="flex gap-1 flex-wrap">
              {jobInfo?.skills.map((item) => (
                <Badge key={item.id} content={item.name} type="skill" />
              ))}
            </div>
          </div>
        </div>
        <div className="w-[400px] flex flex-col gap-4">
          <div className="w-full border border-gray-200 rounded-lg p-4">
            <div className="flex gap-2 items-center mb-4">
              <img
                src={jobInfo.imageUrls[0] || "/company.png"}
                alt=""
                className="rounded-md h-10 w-10 object-cover border border-gray-200"
              />
              <div className="">
                <p
                  className="font-semibold cursor-pointer"
                  onClick={() =>
                    router.push("/company/" + jobInfo.organization.id)
                  }
                >
                  {jobInfo.organization.name}
                </p>
                <p className="text-xs text-gray-600 ">
                  Posted by:{" "}
                  <span className="font-semibold">{jobInfo.employer.name}</span>
                </p>
              </div>
            </div>
            <p className="font-semibold">
              Locations:{" "}
              <span className="font-medium">{jobInfo.addresses[0]}</span>
            </p>
          </div>
          <JobRecSection jobId={jobInfo.id} />
        </div>
      </div>

      <EmployeeRecSection jobId={jobInfo.id} userId={-1} />
    </div>
  );
}
