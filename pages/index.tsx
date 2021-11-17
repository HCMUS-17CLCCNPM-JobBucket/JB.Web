import { jobAPI } from "app/api/modules/jobAPI";
import Footer from "app/components/organisms/Footer";
import Hero from "app/components/organisms/Hero";
import JobCategory from "app/components/organisms/JobCategory";
import JobMayYouLike from "app/components/organisms/JobMayYouLike";
import MobileApp from "app/components/organisms/MobileApp";
import { actions } from "app/redux/features/notification";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

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
