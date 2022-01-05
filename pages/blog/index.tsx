import { blogAPI } from "app/api/modules/blogAPI";
import Blog from "app/components/atoms/Blog";
import LoadingFullPage from "app/components/molecules/LoadingFullPage";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Head from "next/head";
export default function BlogPage() {
  const user = useSelector((state: any) => state.user);

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState({
    isDescending: true,
    page: 1,
    size: 12,
    sortBy: "createDate",
    keyword: "",
    createdDate: [],
    tags: [],
    authorId: -1,
  });

  const fetchMoreData = async () => {
    const res = await blogAPI.getAll({ ...filter, page: filter.page + 1 });
    setBlogs(blogs.concat(res.data.data.blogs));
    setFilter({ ...filter, page: filter.page + 1 });
    setHasMore(res.data.data.blogs.length > 0);
  };
  const refreshData = async () => setIsFiltered(!isFiltered);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await blogAPI.getAll(filter);
      if (res.status === 200) setBlogs(res.data.data.blogs);
      setLoading(false);
    };
    fetchData();
  }, [isFiltered]);
  return (
    <div className="relative w-full h-full max-w-7xl p-6 mx-auto space-y-6 ">
      <Head>
        <title>Blog | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {loading && <LoadingFullPage />}
      {/* <a
        href="#"
        className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50"
      >
        <img
          src="https://source.unsplash.com/random/480x360"
          alt=""
          className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
        />
        <div className="p-6 space-y-2 lg:col-span-5">
          <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
            Noster tincidunt reprimique ad pro
          </h3>
          <span className="text-xs text-gray-600">February 19, 2021</span>
          <p>
            Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est in
            graece fuisset, eos affert putent doctus id.
          </p>
        </div>
      </a> */}
      {blogs.length === 0 && <div className="h-[300px]" />}
      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchMoreData}
        hasMore={hasMore}
        className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        loader={<LoadingFullPage />}
        scrollableTarget="scrollableDiv"
      >
        {blogs.map((item, index) => (
          <Blog key={index} {...item} refreshData={refreshData} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
