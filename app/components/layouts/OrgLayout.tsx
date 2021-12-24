import React, { useState } from "react";
import MemberCard from "../atoms/MemberCard";
import ReviewOrgBoard from "../atoms/ReviewOrgBoard";
import InfoOrg from "../molecules/InfoOrg";
import ListJobOrg from "../molecules/ListJobOrg";
import ReviewOrg from "../molecules/ReviewOrg";

export default function OrgLayout({ company, organizationId }) {
  const [ratingPercentages, setRatingPercentages] = useState({ data: [] });

  return (
    <div className="py-4 px-16 w-full ">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-thumb.jpg"
        alt={company.name}
        className="w-full h-[400px] rounded-lg"
      />
      <div className="mx-auto w-11/12 -translate-y-24 bg-white rounded-lg">
        <InfoOrg {...company} handleScroll={null} />
        <div className="flex gap-8 mt-8">
          <div className="w-2/3">
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
            {company.members && (
              <div className="p-8 shadow-lg rounded-lg">
                <p className="text-2xl font-semibold">Members</p>
                <div className="flex gap-4">
                  {company.members.map((member) => (
                    <MemberCard key={member.id} {...member} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <ReviewOrgBoard values={ratingPercentages} />
        </div>
        <ReviewOrg
          companyId={organizationId}
          setRatingPercent={setRatingPercentages}
        />
      </div>
    </div>
  );
}
