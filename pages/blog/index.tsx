import { blogAPI } from "app/api/modules/blogAPI";
import Blog from "app/components/atoms/Blog";
import React, { useEffect, useState } from "react";

export default function BlogPage() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [blogs, setBlogs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [filter, setFilter] = useState({
    isDescending: false,
    page: 0,
    size: 10,
    sortBy: "",
    keyword: "",
    createdDate: [],
    tags: [],
    // authorId: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await blogAPI.getAll(filter);

      if (res.status === 200) setBlogs(res.data.data.blogs);
    };
    fetchData();
  }, [isFiltered]);
  return (
    <section className="text-gray-800">
      <div className="container max-w-8xl p-6 mx-auto space-y-6 ">
        <a
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
        </a>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((item, index) => (
            <Blog key={index} {...item} />
          ))}
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-3 text-sm rounded-md hover:underline bg-gray-50 text-gray-600">
            Load more posts...
          </button>
        </div>
      </div>
    </section>
  );
}
