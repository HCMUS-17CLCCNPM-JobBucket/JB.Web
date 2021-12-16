import { blogAPI } from "app/api/modules/blogAPI";
import Blog from "app/components/atoms/Blog";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

export default function MyBlog() {
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
    // authorId: 1,
  });
  const user = useSelector((state: any) => state.user);

  const fetchMoreData = async () => {
    const res = await blogAPI.getAll({ ...filter, page: filter.page + 1 });
    setBlogs(blogs.concat(res.data.data.blogs));
    setFilter({ ...filter, page: filter.page + 1 });
    setHasMore(res.data.data.blogs.length > 0);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await blogAPI.getMyBlogs(user.user.id);
      console.log(res);
      if (res.status === 200) setBlogs(res.data.data.blogs);
    };
    fetchData();
  }, [isFiltered]);
  return (
    <section className="text-gray-800">
      <div className="container max-w-8xl p-6 mx-auto space-y-6 ">
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreData}
          hasMore={hasMore}
          className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          loader={
            <div className="flex justify-center">
              <button className="px-6 py-3 text-sm rounded-md hover:underline bg-gray-50 text-gray-600">
                Load more blogs...
              </button>
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          {blogs.map((item, index) => (
            <Blog key={index} {...item} />
          ))}
        </InfiniteScroll>
      </div>
    </section>
  );
}
