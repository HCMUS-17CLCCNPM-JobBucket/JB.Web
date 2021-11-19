import React from "react";
import CompanyCulture from "app/components/molecules/culture-company-tab";
import UserProvider from "app/components/layouts/UserProvider";
import Toolbar from "app/components/atoms/Toolbar";
import JobHeader from "app/components/atoms/job-header";
import AboutJob from "app/components/atoms/about-job";
import RecommendJob from "app/components/atoms/recommend-job";
import CompanyLayout from "app/components/layouts/company-layout";
function index(props) {
  return (
    <CompanyLayout value={2}>
      <CompanyCulture />
    </CompanyLayout>
  );
}
export default UserProvider(index);
