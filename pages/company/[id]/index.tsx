import { jobAPI } from "app/api/modules/jobAPI";
import { orgAPI } from "app/api/modules/organization";
import Divider from "app/components/atoms/Divider";
import ReviewOrgBoard from "app/components/atoms/ReviewOrgBoard";
import InfoOrg from "app/components/molecules/InfoOrg";
import ListJobOrg from "app/components/molecules/ListJobOrg";
import ReviewOrg from "app/components/molecules/ReviewOrg";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

export const getServerSideProps = async ({ params }) => {
  const res = await orgAPI.getById(parseInt(params.id));
  if (res.status === 200)
    return {
      props: { id: parseInt(params.id), ...res.data.data.organizations[0] },
    };
  return {
    props: { id: parseInt(params.id) },
  };
};

export default function CompanyDetail(props) {
  const user = useSelector((state: any) => state.user);
  const [jobs, setJobs] = useState<any>([]);
  if (user.token === "") router.push("/");
  useEffect(() => {
    jobAPI.getAll({ organizationId: props.id }).then((res) => {
      if (res.status === 200) {
        setJobs(res.data.data.jobs);
      }
    });
  }, []);
  return (
    <div className="py-4 px-16 w-full ">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-thumb.jpg"
        alt={props.name}
        className="w-full h-[400px] rounded-lg"
      />
      <div className="mx-auto w-11/12 -translate-y-24 bg-white rounded-lg">
        <InfoOrg {...props} />
        <div className="flex gap-8 mt-8">
          <div className="w-2/3">
            <div className="p-8 shadow-lg rounded-lg">
              <p className="text-2xl font-semibold">
                Overview about {props.name}
              </p>
              <p className="mt-4">{props.bio}</p>
            </div>
            <ListJobOrg jobs={jobs} styles=" p-8 shadow-lg rounded-lg" />
          </div>

          <ReviewOrgBoard />
        </div>
        <ReviewOrg companyId={props.id} />
      </div>
    </div>
  );
}
