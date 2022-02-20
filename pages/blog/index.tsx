import { blogAPI } from "app/api/modules/blogAPI";
import BlogInfinityScroll from "app/components/molecules/BlogInfinityScroll";
import { useUserInfo } from "app/utils/hooks";
import moment from "moment";
import Head from "next/head";
import React, { useEffect, useState } from "react";

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
        .getAll({ page: 1, size: 10 })
        .then((res) => {
          if (res.status === 200) setJobs(res.data.data.blogs);
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (page > 1) {
      blogAPI.getAll({ page, size: 10 }).then((res) => {
        if (res.status === 200) setJobs([...jobs, ...res.data.data.blogs]);

        setHasMore(res.data.data.blogs.length > 0);
      });
    }
  }, [page]);

  return (
    <div className="px-16 w-full">
      <Head>
        <title>Blog | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex">
        <BlogInfinityScroll
          hasMore={hasMore}
          loading={loading}
          blogs={jobs}
          setPage={() => setPage(page + 1)}
          refreshData={null}
        />
      </div>
    </div>
  );
}
