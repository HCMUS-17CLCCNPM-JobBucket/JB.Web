import interviewAPI from "app/api/modules/interviewAPI";
import InterviewStatusCount from "app/components/atoms/InterviewStatusCount";
import RecruiterLayout from "app/components/layouts/RecruiterLayout";
import ScheduleInfinityScroll from "app/components/molecules/SchedulefinityScroll";
import SelectJob from "app/components/molecules/SelectJob";
import SelectScheduleStatus from "app/components/molecules/SelectScheduleStatus";
import { useUserInfo } from "app/utils/hooks";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function RecruiterJob() {
  const user = useUserInfo();
  const [applicants, setApplicants] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(-1);
  const [status, setStatus] = useState(-1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    interviewAPI.getListScheduleHr(user.user.id, { page }).then((res) => {
      if (res.status === 200)
        setApplicants([...applicants, ...res.data.data.interviews]);

      setHasMore(res.data.data.interviews.length > 0);
    });
  }, [page]);

  useEffect(() => {
    setLoading(true);
    interviewAPI
      .getListScheduleHr(user.user.id, { page: 0, jobId, status: status - 1 })
      .then((res) => {
        if (res.status === 200) setApplicants([...res.data.data.interviews]);

        setHasMore(res.data.data.interviews.length > 0);
        setLoading(false);
      });
  }, [jobId, status, refresh]);

  const onRefresh = () => setRefresh(!refresh);
  return (
    <RecruiterLayout>
      <Head>
        <title>Schedules | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col gap-2 md:justify-between w-full mt-4 md:flex-row">
        <InterviewStatusCount refresh={refresh} status={status} />
        <div className="flex gap-2">
          <SelectScheduleStatus onChange={(val) => setStatus(val)} />
          <SelectJob onChange={(val) => setJobId(val)} />
        </div>
      </div>
      <ScheduleInfinityScroll
        hasMore={hasMore}
        loading={loading}
        schedules={applicants}
        setPage={() => setPage(page + 1)}
        onRefresh={onRefresh}
      />
      <div className="h-[300px]"></div>
    </RecruiterLayout>
  );
}
