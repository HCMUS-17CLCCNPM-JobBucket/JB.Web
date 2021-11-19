import CompanyLayout from "app/components/layouts/company-layout";
import UserProvider from "app/components/layouts/UserProvider";
import CompanyJob from "app/components/molecules/company-job";
import React, { useState } from "react";
import { useSelector } from "react-redux";
function index() {
  const [follow, setFollow] = useState(false);
  const user = useSelector((state: any) => state.user);
  return (
    <CompanyLayout value={3}>
      <CompanyJob />
    </CompanyLayout>
  );
}
export default UserProvider(index);
