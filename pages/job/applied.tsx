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

export default function JobApplied() {
  const [jobs, setJobs] = useState([]);
  const user = useSelector((state: any) => state.user);
  //call api to get saved jobs
  useEffect(() => {
    const fetchData = async () => {
      const response = await jobAPI.getAll({}, user.token);
      setJobs(response.data.data.jobs);
    };
    fetchData();
  }, []);

  return (
    <JobDashboard>
      <div className="flex">
        <JobInfinityScroll
          jobs={jobs}
          setJobs={setJobs}
          filterOptions={{}}
          setFilterOptions={null}
        />
        <MyCalendar />
      </div>
    </JobDashboard>
  );
}
