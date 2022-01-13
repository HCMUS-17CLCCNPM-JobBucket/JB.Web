import React, { useEffect, useState } from "react";
import RecruiterLayout from "app/components/layouts/RecruiterLayout";
import Editor from "app/components/Recruiter/editor";

export default function create() {
  const data = {
    title: "",
    imageUrls: [],
    description: "",
    priority: 0, // 0: low, 1: medium, 2: high
    addresses: "",
    cities: "",
    minSalary: 0,
    maxSalary: 0,
    salaryCurrency: "",
    salaryDuration: "",
    skillIds: [],
    positionIds: [],
    typeIds: [],
    categoryIds: [],
    isVisaSponsorship: false,
    expireDate: null,
    benefits: "",
    experiences: "",
    responsibilities: "",
    requirements: "",
    optionalRequirements: "",
    cultures: "",
    whyJoinUs: "",
    numberEmployeesToApplied: 0,
    jobForm: "",
    gender: "",
  };
  return (
    <RecruiterLayout>
      <Editor {...data}></Editor>
    </RecruiterLayout>
  );
}
