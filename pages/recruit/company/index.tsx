import React, { useEffect, useState } from "react";
import CompanyOverview from "app/components/molecules/company-overview";
import UserProvider from "app/components/layouts/UserProvider";
import Toolbar from "app/components/atoms/Toolbar";
import JobHeader from "app/components/atoms/job-header";
import AboutJob from "app/components/atoms/about-job";
import RecommendJob from "app/components/atoms/recommend-job";
import CompanyLayout from "app/components/layouts/company-layout";
import UserAPI from "app/api/modules/userAPI";
import { useSelector } from "react-redux";

function index() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await UserAPI.getUserDetailVer2(user.token);
  //     if (res.status === 200) {
  //       setUserInfo(res.data.data);
  //       console.log(res.data.data);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <CompanyLayout value={1}>
      <CompanyOverview />
    </CompanyLayout>
  );
}
export default UserProvider(index);
