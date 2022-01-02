import { blogAPI } from "app/api/modules/blogAPI";
import { jobAPI } from "app/api/modules/jobAPI";
import JobDashboard from "app/components/layouts/JobDashboard";
import BlogInfinityScroll from "app/components/molecules/BlogInfinityScroll";
import JobInfinityScroll from "app/components/molecules/JobInfinityScroll";
import { useUserInfo } from "app/utils/hooks";
import moment from "moment";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
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

export default function MyBlog() {
  const user = useUserInfo();
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //call api to get saved jobs
  useEffect(() => {
    if (page === 1) {
      setLoading(true);
      blogAPI
        .getMyBlogs(user.user.id, 1)
        .then((res) => {
          if (res.status === 200) setJobs(res.data.data.blogs);
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (page > 1) {
      blogAPI.getMyBlogs(user.user.id, page).then((res) => {
        if (res.status === 200) setJobs([...jobs, ...res.data.data.blogs]);

        setHasMore(res.data.data.blogs.length > 0);
      });
    }
  }, [page]);
  return (
    <div className="px-16 w-full">
      <Head>
        <title>Saved Job | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex">
        <BlogInfinityScroll
          hasMore={hasMore}
          loading={loading}
          blogs={jobs}
          setPage={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
