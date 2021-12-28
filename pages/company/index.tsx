import { orgAPI } from "app/api/modules/organization";
import CompanyCard from "app/components/atoms/CompanyCard";
import SearchOrg from "app/components/atoms/SearchBar/SearchOrg";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
export default function CompanyPage() {
  const [orgs, setOrgs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await orgAPI.getAll({
        page,
        size: 10,
      });
      setOrgs(res.data.data.organizations);
    };
    fetchData();
  }, []);

  const fetchMoreData = async () => {
    const res = await orgAPI.getAll({ size: 10, page: page + 1 });
    setPage(page + 1);
    setOrgs(orgs.concat(res.data.data.organizations));
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>Search Company | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SearchOrg />
      <InfiniteScroll
        dataLength={orgs.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        className="flex w-full flex-col gap-4"
      >
        {orgs.map((item, index) => (
          <CompanyCard key={index} {...item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
