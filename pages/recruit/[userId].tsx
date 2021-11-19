import UserAPI from "app/api/modules/userAPI";
import EducationSection from "app/components/molecules/education-section";
import SkillSection from "app/components/molecules/skill-section";
import Head from "next/head";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import Loading from "app/components/atoms/loading";
import { getAvatar } from "app/utils/getAvatar";
import ExperienceSection from "app/components/molecules/education-section";

export const getServerSideProps = async ({ params }) => {
  return {
    props: { userId: params.userId },
  };
};

export default function UserProfile(props) {
  const user = useSelector((state: any) => state.user);
  const [userInfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await UserAPI.getUserDetailById(props.userId, user.token);
      if (res.status === 200) {
        setUserInfo(res.data.data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mx-auto my-5">
      <Head>
        <title>Profile | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {loading ? (
        <Loading />
      ) : (
        <div className="px-4 xl:px-60  px-8 w-full flex flex-col gap-4">
          <div className="p-4 border-2 rounded-lg hover:shadow-lg ease-in-trans">
            <div className="flex gap-4">
              <img
                className="h-44 w-44 object-cover border-2 rounded-lg"
                src={getAvatar(userInfo.avatarUrl)}
              />
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <p className="text-3xl font-semibold">
                    {userInfo.fullName === "" ? "Updating" : userInfo.fullName}
                  </p>
                </div>
                <div className="flex  gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  {/* <p className="">{userInfo.positions[0] || "Updating"}</p> */}
                </div>
                <div className="flex  gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  <p className="">
                    {userInfo.city || "Updating"},
                    {userInfo.country || "Updating"}
                  </p>
                  <p>{userInfo.addressLine[0]}</p>
                </div>
                <div className="flex  gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="">{userInfo.email}</p>
                </div>
                <div className="flex  gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <p className="">{userInfo.phoneNumber || "Updating"}</p>
                </div>
                <div className="flex  gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {/* <p className="">{userInfo.birthDate}</p> */}
                  <Moment format="DD/MM/YYYY" date={userInfo.birthDate} />
                </div>
                {/* <p class=" pl-7">Nguyen Thi Minh Khai, Quan 3</p> */}
              </div>
            </div>
            <p className="mt-4">{userInfo.bio || "Bio: Updating"}</p>
          </div>
          <EducationSection list={userInfo.educations} />
          <SkillSection list={userInfo.skills} />
          <ExperienceSection list={userInfo.experiences} />
        </div>
      )}
    </div>
  );
}
