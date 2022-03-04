import { orgAPI } from "app/api/modules/organization";
import CompanyCard from "app/components/atoms/CompanyCard";
import SearchOrg from "app/components/atoms/SearchBar/SearchOrg";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import Loading from "app/components/atoms/Loading";
export default function CompanyPage() {
  const [orgs, setOrgs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await orgAPI.getAll({
        page,
        size: 10,
      });
      setOrgs([...orgs, ...res.data.data.organizations]);
      setHasMore(res.data.data.organizations.length > 0);
    };
    fetchData();
  }, [page]);

  const fetchMoreData = async () => {
    setPage(page + 1);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Head>
        <title>Search Company | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <SearchOrg /> */}
      <InfiniteScroll
        dataLength={orgs.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loading />}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full px-2 xl:px-12 py-4"
      >
        {orgs.map((item, index) => (
          <CompanyCard key={index} {...item} />
        ))}
      </InfiniteScroll>
      {!hasMore && <p className="text-center">No more data</p>}
    </div>
  );
}
