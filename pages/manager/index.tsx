import { jobAPI } from "app/api/modules/jobAPI";
import { orgAPI } from "app/api/modules/organization";
import OrgLayout from "app/components/layouts/OrgLayout";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CompanyProfile() {
  const user = useSelector((state: any) => state.user);

  if (user.user.roleId !== 3) router.push("/");

  const [company, setCompany] = useState<any>({ members: [] });
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  const refreshPage = () => setRefresh(!refresh);

  return (
    <>
      {loading ? (
        <LoadingFullPage />
      ) : (
        <OrgLayout
          company={company}
          organizationId={user.user.organizationId}
          refreshPage={refreshPage}
        />
      )}
    </>
  );
}
export default React.memo(CompanyProfile);
