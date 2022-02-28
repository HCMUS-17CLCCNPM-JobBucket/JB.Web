import UserAPI from "app/api/modules/userAPI";
import RecruiterLayout from "app/components/layouts/RecruiterLayout";
import ApplicationInfinityScroll from "app/components/molecules/ApplicationInfinityScroll";
import SelectJob from "app/components/molecules/SelectJob";
import SelectApplicationStatus from "app/components/molecules/SelectApplicationStatus";
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
  const [status, setStatus] = useState(0);

  useEffect(() => {
    setLoading(true);

    UserAPI.getApplicants(user.user.id, { page, jobId, status }).then((res) => {
      if (res.status === 200)
        setApplicants([...applicants, ...res.data.data.jobApplications]);

      setHasMore(res.data.data.jobApplications.length > 0);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    setLoading(true);

    UserAPI.getApplicants(user.user.id, { page: 0, jobId, status }).then(
      (res) => {
        if (res.status === 200)
          setApplicants([...res.data.data.jobApplications]);

        setHasMore(res.data.data.jobApplications.length > 0);
        setLoading(false);
      }
    );
  }, [jobId, status]);

  return (
    <RecruiterLayout>
      <Head>
        <title>Applications | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col gap-2 md:justify-end w-full mt-4 md:flex-row">
        <SelectApplicationStatus onChange={(val) => setStatus(val)} />
        <SelectJob onChange={(val) => setJobId(val)} />
      </div>
      <ApplicationInfinityScroll
        hasMore={hasMore}
        loading={loading}
        applications={applicants}
        setPage={() => setPage(page + 1)}
      />
      <div className="h-[300px]"></div>
    </RecruiterLayout>
  );
}
