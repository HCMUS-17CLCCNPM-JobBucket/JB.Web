import { jobAPI } from "app/api/modules/jobAPI";
import JobDashboard from "app/components/layouts/JobDashboard";
import JobInfinityScroll from "app/components/molecules/JobInfinityScroll";
import SelectApplicationStatus from "app/components/molecules/SelectApplicationStatus";
import SelectJob from "app/components/molecules/SelectJob";
import { useUserInfo } from "app/utils/hooks";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function AppliedJob() {
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(-1);
  const [status, setStatus] = useState(-1);
  const user = useUserInfo();

  useEffect(() => {
    setPage(1);
    setLoading(true);
    jobAPI
      .getAppliedJobs(user.user.id, { page: 1, jobId, status: status - 1 })
      .then((res) => {
        setPage(1);
        setJobs(res.data.data.jobApplications);

        setPage(1);

        setHasMore(res.data.data.jobApplications.length > 0);
        setLoading(false);
      })
      .catch((err) => {});
  }, [status]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      jobAPI
        .getAppliedJobs(user.user.id, { page, jobId, status: status - 1 })
        .then((res) => {
          // if (page === 1) setJobs(res.data.data.jobApplications);
          setJobs([...jobs, ...res.data.data.jobApplications]);

          setHasMore(res.data.data.jobApplications.length > 0);
          setLoading(false);
        })
        .catch((err) => {});
      setLoading(false);
    };
    if (page > 1) fetchData();
  }, [page]);

  return (
    <JobDashboard>
      <Head>
        <title>Applied Job | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col gap-2 md:justify-end w-full mt-4 md:flex-row">
        <SelectApplicationStatus onChange={(val) => setStatus(val)} />
      </div>
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
