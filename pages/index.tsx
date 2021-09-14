import Footer from "app/components/organisms/Footer";
import Hero from "app/components/organisms/Hero";
import JobCategory from "app/components/organisms/JobCategory";
import JobMayYouLike from "app/components/organisms/JobMayYouLike";
import MobileApp from "app/components/organisms/MobileApp";
import React from "react";

export default function Home() {
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
