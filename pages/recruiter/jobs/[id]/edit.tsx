import React from "react";
import RecruiterLayout from "app/components/layouts/RecruiterLayout";
import Editor from "app/components/Recruiter/editor";
import { jobAPI } from "app/api/modules/jobAPI";

export const getServerSideProps = async ({ params }) => {
  const res = await jobAPI.getJobByIdWithoutToken(parseInt(params.id));
  if (res.status === 200) return { props: { ...res.data.data, id: params.id } };
  return {
    props: { id: params.id },
  };
};

export default function Edit(props) {
  console.log(props);
  const data = {
    id: parseInt(props.id),
    title: props.jobs[0].title,
    imageUrls: props.jobs[0].imageUrls,
    description: props.jobs[0].description,
    priority: 0, // 0: low, 1: medium, 2: high
    addresses: props.jobs[0].addresses,
    cities: props.jobs[0].cities,
    minSalary: props.jobs[0].minSalary,
    maxSalary: props.jobs[0].maxSalary,
    salaryCurrency: props.jobs[0].salaryCurrency,
    salaryDuration: props.jobs[0].salaryDuration,
    skillIds: [],
    positionIds: [],
    typeIds: [],
    categoryIds: [],
    isVisaSponsorship: false,
    expireDate: null,
    benefits: props.jobs[0].benefits,
    experiences: props.jobs[0].experiences,
    responsibilities: props.jobs[0].responsibilities,
    requirements: props.jobs[0].requirements,
    optionalRequirements: props.jobs[0].optionalRequirements,
    cultures: "",
    whyJoinUs: props.jobs[0].whyJoinUs,
    numberEmployeesToApplied: 0,
    jobForm: "",
    gender: "",
  };
  return (
    <RecruiterLayout>
      <Editor isEdit {...props.jobs[0]}></Editor>
    </RecruiterLayout>
  );
}
