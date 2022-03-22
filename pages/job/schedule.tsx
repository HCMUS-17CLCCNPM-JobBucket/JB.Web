import interviewAPI from "app/api/modules/interviewAPI";
import JobDashboard from "app/components/layouts/JobDashboard";
import ScheduleInfinityScroll from "app/components/molecules/SchedulefinityScroll";
import SelectJob from "app/components/molecules/SelectJob";
import SelectScheduleStatus from "app/components/molecules/SelectScheduleStatus";
import { useUserInfo } from "app/utils/hooks";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function ScheduleEmployee() {
  const user = useUserInfo();
  const [applicants, setApplicants] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(-1);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (page > 0)
      interviewAPI
        .getListScheduleEmployee(user.user.id, { page })
        .then((res) => {
          if (res.status === 200)
            setApplicants([...applicants, ...res.data.data.interviews]);

          setHasMore(res.data.data.interviews.length > 0);
        });
  }, [page]);

  useEffect(() => {
    setLoading(true);
    interviewAPI
      .getListScheduleEmployee(user.user.id, { page: 0, jobId, status })
      .then((res) => {
        if (res.status === 200) setApplicants([...res.data.data.interviews]);

        setHasMore(res.data.data.interviews.length > 0);
        setLoading(false);
      });
  }, [jobId, status]);
  return (
    <JobDashboard>
      <Head>
        <title>Schedule | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex gap-2 justify-end w-full">
        <SelectScheduleStatus onChange={(val) => setStatus(val)} />
        {/* <SelectJob onChange={(val) => setJobId(val)} /> */}
      </div>
      <ScheduleInfinityScroll
        hasMore={hasMore}
        loading={loading}
        schedules={applicants}
        setPage={() => setPage(page + 1)}
      />
      <div className="h-[300px]"></div>
    </JobDashboard>
  );
}
