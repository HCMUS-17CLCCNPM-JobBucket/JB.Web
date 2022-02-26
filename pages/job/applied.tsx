import { jobAPI } from "app/api/modules/jobAPI";
import JobDashboard from "app/components/layouts/JobDashboard";
import JobInfinityScroll from "app/components/molecules/JobInfinityScroll";
import { useUserInfo } from "app/utils/hooks";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function JobSaved() {
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const user = useUserInfo();
  //call api to get saved jobs
  useEffect(() => {
    if (page === 1) {
      setLoading(true);
      jobAPI
        .getAppliedJobs(user.user.id, 1)
        .then((res) => {
          if (res.status === 200)
            setJobs(res.data.data.jobApplications.map((job) => job.job));
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (page > 1) {
      jobAPI.getAppliedJobs(user.id, page).then((res) => {
        if (res.status === 200)
          setJobs([
            ...jobs,
            ...res.data.data.jobApplications.map((job) => job.job),
          ]);

        setHasMore(res.data.data.jobApplications.length > 0);
      });
    }
  }, [page]);
  return (
    <JobDashboard>
      <Head>
        <title>Saved Job | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col mt-1">
        <JobInfinityScroll
          hasMore={hasMore}
          loading={loading}
          jobs={jobs}
          setPage={() => setPage(page + 1)}
        />
        {/* <MyCalendar /> */}
      </div>
    </JobDashboard>
  );
}
