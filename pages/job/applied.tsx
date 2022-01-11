import { jobAPI } from "app/api/modules/jobAPI";
import JobDashboard from "app/components/layouts/JobDashboard";
import JobInfinityScroll from "app/components/molecules/JobInfinityScroll";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import Head from "next/head";
import { useUserInfo } from "app/utils/hooks";

const MyCalendar = (props) => (
  <div className="h-[500px]">
    <Calendar
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      className="w-[500px] h-[500px]"
    />
  </div>
);

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
      <div className="flex">
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
