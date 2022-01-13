import { jobAPI } from "app/api/modules/jobAPI";
import RecruiterLayout from "app/components/layouts/RecruiterLayout";
import JobInfinityScroll from "app/components/molecules/JobInfinityScroll";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useUserInfo } from "app/utils/hooks";
import router from "next/router";

export default function RecruiterJob() {
  const user = useUserInfo();
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
      jobAPI
        .getJobByOrganization(user.user.organizationId, 1)
        .then((res) => {
          if (res.status === 200) setJobs(res.data.data.jobs);
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (page > 1) {
      jobAPI
        .getJobByOrganization(user.user.organizationId, page)
        .then((res) => {
          if (res.status === 200) setJobs([...jobs, ...res.data.data.jobs]);

          setHasMore(res.data.data.jobs.length > 0);
        });
    }
  }, [page]);

  return (
    <RecruiterLayout>
      <Head>
        <title>Jobs | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col">
        <div className="flex justify-end pr-4">
          <button
            onClick={() => router.push("/recruiter/jobs/create")}
            type="button"
            className="bg-blue-600 text-white inline-flex px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium "
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
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Create</p>
          </button>
        </div>
        <JobInfinityScroll
          hasMore={hasMore}
          loading={loading}
          jobs={jobs}
          setPage={() => setPage(page + 1)}
        />
        {/* <MyCalendar /> */}
      </div>
    </RecruiterLayout>
  );
}
