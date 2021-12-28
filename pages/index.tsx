import UserAPI from "app/api/modules/userAPI";
import Hero from "app/components/organisms/Hero";
import JobCategory from "app/components/organisms/JobCategory";
import JobMayYouLike from "app/components/organisms/JobMayYouLike";
import MobileApp from "app/components/organisms/MobileApp";
import Head from "next/head";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Home | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Hero />
      <JobCategory />
      <JobMayYouLike />
      <MobileApp />
    </div>
  );
}
