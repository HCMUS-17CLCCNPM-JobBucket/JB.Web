import React, { useRef, useState } from "react";
import MemberCard from "../atoms/MemberCard";
import ReviewOrgBoard from "../atoms/ReviewOrgBoard";
import InfoOrg from "../molecules/InfoOrg";
import ListJobOrg from "../molecules/ListJobOrg";
import MemberOrgSection from "../molecules/MemberOrgSection";
import ReviewOrg from "../molecules/ReviewOrg";
import Head from "next/head";
import helper from "app/utils/helper";
export default function OrgLayout({ company, organizationId, refreshPage }) {
  const [ratingPercentages, setRatingPercentages] = useState({ data: [] });
  const ref = useRef(null);

  const handleScroll = () => {
    if (ref.current) {
      helper.scrollToRef(ref);
    }
  };

  return (
    <div className="py-4 px-4 md:px-16 w-full ">
      <Head>
        <title>{company.name} | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <img
        src="https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-thumb.jpg"
        alt={company.name}
        className="w-full h-[400px] rounded-lg"
      /> */}
      <div className="mx-auto w-11/12 bg-white rounded-lg">
        <InfoOrg {...company} handleScroll={handleScroll} />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="w-full md:w-2/3">
            <div className="p-8 shadow-lg rounded-lg">
              <p className="text-2xl font-semibold">
                Overview about {company.name}
              </p>
              <p className="mt-4">{company.bio}</p>
            </div>
            {company.jobs && company.jobs.length > 0 && (
              <ListJobOrg
                jobs={company.jobs}
                styles=" p-8 shadow-lg rounded-lg"
              />
            )}
          </div>

          <ReviewOrgBoard values={ratingPercentages} />
        </div>
        <MemberOrgSection company={company} refreshPage={refreshPage} />
      </div>
      <div className="mx-auto w-11/12" ref={ref}>
        <ReviewOrg
          companyId={organizationId}
          setRatingPercent={setRatingPercentages}
        />
      </div>
    </div>
  );
}
