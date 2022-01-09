import { jobAPI } from "app/api/modules/jobAPI";
import { orgAPI } from "app/api/modules/organization";
import Divider from "app/components/atoms/Divider";
import ReviewOrgBoard from "app/components/atoms/ReviewOrgBoard";
import OrgLayout from "app/components/layouts/OrgLayout";
import InfoOrg from "app/components/molecules/InfoOrg";
import ListJobOrg from "app/components/molecules/ListJobOrg";
import ReviewOrg from "app/components/molecules/ReviewOrg";
import helper from "app/utils/helper";
import router from "next/router";
``;
import React, { useEffect, useRef, useState } from "react";
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
  const refReview = useRef(null);
  const [ratingPercentages, setRatingPercentages] = useState({ data: [] });
  // if (user.token === "") router.push("/");
  useEffect(() => {
    jobAPI.getAll({ organizationId: props.id }).then((res) => {
      if (res.status === 200) {
        setJobs(res.data.data.jobs);
      }
    });
  }, []);

  return (
    <OrgLayout
      company={{ ...props, jobs }}
      organizationId={props.id}
      refreshPage={null}
    />
  );
}
