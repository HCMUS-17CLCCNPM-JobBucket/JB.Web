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
import InterviewButton from "app/components/atoms/Button/InterviewButton";

export default function RecruiterJob() {
  const user = useUserInfo();
  const [applicants, setApplicants] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
      UserAPI.getApplicants(user.user.id, 1)
        .then((res) => {
          if (res.status === 200) setApplicants(res.data.data.jobApplications);
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (page > 1) {
      UserAPI.getApplicants(user.user.id, 1).then((res) => {
        if (res.status === 200)
          setApplicants([...applicants, ...res.data.data.jobApplications]);

        setHasMore(res.data.data.jobs.length > 0);
      });
    }
  }, [page]);

  return (
    <RecruiterLayout>
      <Head>
        <title>Saved Job | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {applicants.length > 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          {applicants.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-4 items-start justify-center">
                <img
                  src={item.user.avatarUrl || "/avatar/avatar.png"}
                  className="h-16 w-16 rounded-full"
                  alt=""
                />
                <div>
                  <a
                    href={"/employee/" + item.user.id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="text-xl font-semibold hover:text-blue-600">
                      {item.user.name}
                    </p>
                  </a>
                  <div className="flex text-gray-400">{item.user.email}</div>
                </div>
              </div>

              <a
                href={item.cVPDFUrl}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 items-center cursor-pointer"
              >
                <img
                  src="/common/cv.png"
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <p className="text-blue-600 font-semibold">CV</p>
              </a>
              <div className="flex gap-3 items-center justify-center">
                <img
                  src={item.job.imageUrls[0]}
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <p className="max-w-[400px] truncate text-xl ">
                  {item.job.title}
                </p>
              </div>

              <p>
                Applied <Moment fromNow>{item.createdDate}</Moment>
              </p>

              <InterviewButton
                jobId={item.job.id}
                // description={"123123"}
                // interviewTime={""}
                intervieweeCVId={-1}
                intervieweeId={item.user.id}
                interviewerId={user.user.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <ListEmpty />
      )}
      <div className="h-[400px]"></div>
    </RecruiterLayout>
  );
}
