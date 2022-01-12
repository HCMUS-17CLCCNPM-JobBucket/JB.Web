import interviewAPI from "app/api/modules/interviewAPI";
import InterviewButton from "app/components/atoms/Button/SetScheduleInterviewButton";
import InterviewCard from "app/components/atoms/InterviewCard";
import ListEmpty from "app/components/atoms/ListEmpty";
import RecruiterLayout from "app/components/layouts/RecruiterLayout";
import ScheduleInfinityScroll from "app/components/molecules/SchedulefinityScroll";
import { useUserInfo } from "app/utils/hooks";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";

export default function RecruiterJob() {
  const user = useUserInfo();
  const [applicants, setApplicants] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
      interviewAPI
        .getListScheduleHr(user.user.id)
        .then((res) => {
          if (res.status === 200) setApplicants(res.data.data.interviews);
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (page > 1) {
      interviewAPI.getListScheduleHr(user.user.id).then((res) => {
        if (res.status === 200)
          setApplicants([...applicants, ...res.data.data.interviews]);

        setHasMore(res.data.data.jobs.length > 0);
      });
    }
  }, [page]);

  return (
    <RecruiterLayout>
      <Head>
        <title>Schedules | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ScheduleInfinityScroll
        hasMore={hasMore}
        loading={loading}
        schedules={applicants}
        setPage={() => setPage(page + 1)}
      />
      <div className="h-[400px]"></div>
    </RecruiterLayout>
  );
}
