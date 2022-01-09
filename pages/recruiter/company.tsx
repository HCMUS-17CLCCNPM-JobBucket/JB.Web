import { jobAPI } from "app/api/modules/jobAPI";
import { orgAPI } from "app/api/modules/organization";
import OrgLayout from "app/components/layouts/OrgLayout";
import LoadingFullPage from "app/components/molecules/LoadingFullPage";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { toast } from "react-toastify";

function CompanyProfile() {
  const user = useSelector((state: any) => state.user);

  if (user.user.roleId === 1) {
    toast("You are not authorized to access this page");
    router.push("/");
  }

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
      <Head>
        <title>{company.name} | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
