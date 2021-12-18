import { jobAPI } from "app/api/modules/jobAPI";
import { orgAPI } from "app/api/modules/organization";
import SalaryRange from "app/components/atoms/SalaryRange";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Link from "next/link";
import LoadingFullPage from "app/components/molecules/LoadingFullPage";
import InfoOrg from "app/components/molecules/InfoOrg";
import ReviewOrg from "app/components/molecules/ReviewOrg";
import ListJobOrg from "app/components/molecules/ListJobOrg";
import ReviewOrgBoard from "app/components/atoms/ReviewOrgBoard";

const JobCard = (job) => {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex justify-between">
        <p
          className="cursor-pointer max-w-xl text-blue-600 text-lg hover:underline"
          onClick={() => router.push("/manager/job/" + job.id)}
        >
          {job.title} Sales Executive (Up To $5000)
        </p>
        <p className="text-gray-400">
          Expire in <Moment format="DD/MM/YYYY" date={job.expiredDate} />
        </p>
      </div>
      {/* content */}

      <div
        className="line-clamp-5 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
      <div className="flex justify-between">
        <div>
          <p>
            {job.city}HCM • {job.jobForm}Fulltime
          </p>
          <SalaryRange minSalary={job.minSalary} maxSalary={job.maxSalary} />
        </div>

        <Link href={"/manager/job/" + job.id + "/edit"} passHref>
          <button className="btn btn-primary h-10 w-36">Edit</button>
        </Link>
      </div>
    </div>
  );
};

const TabSection = (company) => {
  return (
    <div className="tabs">
      <input type="radio" id="radio-1" name="tabs" defaultChecked />
      <label htmlFor="radio-1">
        <span className="tab">
          Upcoming<span className="notification">2</span>
        </span>
      </label>
      <input type="radio" id="radio-2" name="tabs" />
      <label htmlFor="radio-2">
        <span className="tab">Development</span>
      </label>
      <span className="glider" />
    </div>
  );
};

const MemberCard = (member) => {
  console.log(member);
  return (
    <div className="flex gap-2 items-center w-[300px]">
      <img
        src={member.avatarUrl || "/avatar/avatar.png"}
        alt={member.name}
        className="h-24 w-24 rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{member.name}</p>
        <p>{member.roleId === 2 ? "Recruiter" : "Manager"}</p>
      </div>
    </div>
  );
};
function CompanyProfile() {
  const user = useSelector((state: any) => state.user);

  if (user.user.roleId !== 3) router.push("/");

  const [company, setCompany] = useState<any>({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    orgAPI.getOrganizationDetailById(user.user.organizationId).then((res) => {
      setCompany(res.data.data.organizationEmployersDetail);
    });
    Promise.all([
      orgAPI.getOrganizationDetailById(user.user.organizationId),
      jobAPI.getAll({ organizationId: user.user.organizationId }),
    ]).then((res) => {
      setCompany({
        ...res[0].data.data.organizationEmployersDetail,
        jobs: res[1].data.data.jobs,
        members: [
          ...res[0].data.data.organizationEmployersDetail.managers,
          ...res[0].data.data.organizationEmployersDetail.employers,
        ],
      });
      setLoading(false);
    });
  }, []);

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
          </div>

          <ReviewOrgBoard />
        </div>
        <ReviewOrg companyId={company.id} />
      </div>
    </div>
  );
}
export default React.memo(CompanyProfile);
