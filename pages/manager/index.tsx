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
import OrgLayout from "app/components/layouts/OrgLayout";

function CompanyProfile() {
  const user = useSelector((state: any) => state.user);

  if (user.user.roleId !== 3) router.push("/");

  const [company, setCompany] = useState<any>({ members: [] });
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
    <OrgLayout company={company} organizationId={user.user.organizationId} />
  );
}
export default React.memo(CompanyProfile);
