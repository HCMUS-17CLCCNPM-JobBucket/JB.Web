import { jobAPI } from "app/api/modules/jobAPI";
import Footer from "app/components/organisms/Footer";
import Hero from "app/components/organisms/Hero";
import JobCategory from "app/components/organisms/JobCategory";
import JobMayYouLike from "app/components/organisms/JobMayYouLike";
import MobileApp from "app/components/organisms/MobileApp";
import React, { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await jobAPI.getJobById(1).then((res) => console.log(res));
  //   };
  //   fetchData();
  // }, []);
  return (
    <div className="">
      <Hero />
      <JobCategory />
      <JobMayYouLike />
      <MobileApp />
      <Footer />
    </div>
  );
}
