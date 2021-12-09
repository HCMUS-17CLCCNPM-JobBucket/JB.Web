import { jobAPI } from "app/api/modules/jobAPI";
import { orgAPI } from "app/api/modules/organization";
import Divider from "app/components/atoms/Divider";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
const JobCard = (props) => {
  console.log(props);
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex justify-between">
        <p
          className="cursor-pointer max-w-xl text-blue-600 text-lg hover:underline"
          onClick={() => router.push("/job/" + props.id)}
        >
          {props.title} Sales Executive (Up To $5000)
        </p>
        <p className="text-gray-400">
          Expire in <Moment format="DD/MM/YYYY" date={props.expiredDate} />
        </p>
      </div>
      {/* content */}

      <div
        className="line-clamp-5 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
      <div className="flex justify-between">
        <div>
          <p>
            {props.city}HCM • {props.jobForm}Fulltime
          </p>
          <p>
            ${props.minSalary} 1.500 – ${props.maxSalary}2.500
          </p>
        </div>

        <button
          className={`${
            props.isJobApplied
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600"
          } h-10 px-10 text-white transition-colors duration-150 
        rounded-lg focus:shadow-outline`}
        >
          {props.isJobApplied ? "Applied" : "Apply now"}
        </button>
      </div>
    </div>
  );
};
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
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const user = useSelector((state: any) => state.user);

  const [jobs, setJobs] = useState<any>([]);
  if (user.token === "") router.push("/");
  useEffect(() => {
    jobAPI.getAll({ organizationId: props.id }, user.token).then((res) => {
      if (res.status === 200) {
        console.log(jobs);
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
        <div className=" p-4 w-full rounded-lg shadow-lg">
          <div className="flex justify-between">
            <div className="flex gap-8">
              <img
                src={props.avatarUrl}
                alt={props.name}
                className="h-40 w-40 rounded-md object-cover"
              />
              <div>
                <p className="text-3xl font-semibold">{props.name}</p>

                <div className="mt-4">
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>{props.addresses || "Updating"}</p>
                  </div>
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <p>{props.phoneNumber}</p>
                  </div>
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p>{props.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="m12 17 1-2V9.858c1.721-.447 3-2 3-3.858 0-2.206-1.794-4-4-4S8 3.794 8 6c0 1.858 1.279 3.411 3 3.858V15l1 2z"></path>
                      <path d="m16.267 10.563-.533 1.928C18.325 13.207 20 14.584 20 16c0 1.892-3.285 4-8 4s-8-2.108-8-4c0-1.416 1.675-2.793 4.267-3.51l-.533-1.928C4.197 11.54 2 13.623 2 16c0 3.364 4.393 6 10 6s10-2.636 10-6c0-2.377-2.197-4.46-5.733-5.437z"></path>
                    </svg>
                    <p>{props.country}</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary h-12 w-40">Write Review</button>
          </div>
          <p className="mt-4">{props.bio}</p>
        </div>
        <div className="flex flex-col mt-8">
          <p className="text-2xl font-semibold">
            We have {list.length} jobs for you
          </p>
          {jobs.map((item, index) => (
            <div key={index}>
              <JobCard {...item} />
              <hr className="my-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
