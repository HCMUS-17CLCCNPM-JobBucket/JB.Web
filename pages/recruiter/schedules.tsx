import { jobAPI } from "app/api/modules/jobAPI";
import RecruiterLayout from "app/components/layouts/RecruiterLayout";
import JobInfinityScroll from "app/components/molecules/JobInfinityScroll";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useUserInfo } from "app/utils/hooks";
import interviewAPI from "app/api/modules/interviewAPI";

export default function RecruiterJob() {
  const user = useUserInfo();
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    interviewAPI.getListScheduleHr(user.user.id).then((res) => {
      if (res.status === 200) {
        setJobs(res.data.data.jobs);
      }
    });

    // if (page === 1) {
    //   setLoading(true);
    //   interviewAPI.getListScheduleHr(user.user.id).then((res) => {
    //     if (res.status === 200) setJobs(res.data.data.jobs);
    //     setLoading(false);
    //   });
    // } else if (page > 1) {
    //   jobAPI
    //     .getJobByOrganization(user.user.organizationId, page)
    //     .then((res) => {
    //       if (res.status === 200) setJobs([...jobs, ...res.data.data.jobs]);

    //       setHasMore(res.data.data.jobs.length > 0);
    //     });
    // }
  }, [page]);
  console.log(jobs);
  return (
    <RecruiterLayout>
      <Head>
        <title>Saved Job | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex">
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
