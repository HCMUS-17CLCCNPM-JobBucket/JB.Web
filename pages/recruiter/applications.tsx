import { jobAPI } from "app/api/modules/jobAPI";
import RecruiterLayout from "app/components/layouts/RecruiterLayout";
import JobInfinityScroll from "app/components/molecules/JobInfinityScroll";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useUserInfo } from "app/utils/hooks";
import UserAPI from "app/api/modules/userAPI";
import ListEmpty from "app/components/atoms/ListEmpty";
import moment from "moment";
import Moment from "react-moment";
import InterviewButton from "app/components/atoms/Button/SetScheduleInterviewButton";
import SetScheduleInterviewButton from "app/components/atoms/Button/SetScheduleInterviewButton";
import ApplicationInfinityScroll from "app/components/molecules/ApplicationInfinityScroll";

export default function RecruiterJob() {
  const user = useUserInfo();
  const [applicants, setApplicants] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    UserAPI.getApplicants(user.user.id, page).then((res) => {
      if (res.status === 200)
        setApplicants([...applicants, ...res.data.data.jobApplications]);

      setHasMore(res.data.data.jobApplications.length > 0);
      setLoading(false);
    });
  }, [page]);

  return (
    <RecruiterLayout>
      <Head>
        <title>Applications | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ApplicationInfinityScroll
        hasMore={hasMore}
        loading={loading}
        applications={applicants}
        setPage={() => setPage(page + 1)}
      />
    </RecruiterLayout>
  );
}
