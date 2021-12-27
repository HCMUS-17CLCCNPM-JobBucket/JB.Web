import UserAPI from "app/api/modules/userAPI";
import Hero from "app/components/organisms/Hero";
import JobCategory from "app/components/organisms/JobCategory";
import JobMayYouLike from "app/components/organisms/JobMayYouLike";
import MobileApp from "app/components/organisms/MobileApp";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <JobCategory />
      <JobMayYouLike />
      <MobileApp />
    </div>
  );
}
