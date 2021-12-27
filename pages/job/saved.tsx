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
  //call api to get saved jobs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await jobAPI.getInterestedJobs(page);
      setJobs(response.data.data.jobs);
      setLoading(false);
      setHasMore(response.data.data.jobs.length > 0);
    };
    fetchData();
  }, [page]);

  return (
    <JobDashboard>
      <div className="flex">
        <JobInfinityScroll
          hasMore={hasMore}
          loading={loading}
          jobs={jobs}
          setPage={setPage}
        />
        <MyCalendar />
      </div>
    </JobDashboard>
  );
}
