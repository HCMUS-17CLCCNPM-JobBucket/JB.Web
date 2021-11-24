import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonalInfo from "app/components/cv/PersonalInfo";
import Experience from "app/components/cv/experience";
import Skills from "app/components/cv/Skills";
import Activities from "app/components/cv/Activities";
import Awards from "app/components/cv/Awards";
import Certifications from "app/components/cv/Certifications";
import Educations from "app/components/cv/Educations";
import { CvAPI } from "app/api/modules/cvAPI";
import { cvActions } from "app/redux/features/cv";
import Review from "app/components/cv/reviewCv";
import Create from "app/components/cv/dialog/addCV";

export default function CvEditor() {
  const PDFViewer = dynamic(import("app/components/cv/template"), {
    ssr: false,
  });
  const isUpdate = useSelector((state: any) => state.cv.isUpdate);
  const userToken = useSelector((state: any) => state.user);
  const cvInfo = useSelector((state: any) => state.cv);

  const updateCV = async () => {
    const cv = {
      id: cvInfo.id,
      name: cvInfo.name,
      // avatarUrl: cvInfo.avatar,
      email: cvInfo.email,
      phone: cvInfo.phonenumber,
      address: cvInfo.address,
      website: cvInfo.website,
      github: cvInfo.github,
      reference: cvInfo.reference,
      gender: cvInfo.gender,
      introduction: cvInfo.introduction,
      //   birthdate: cvInfo.birthDate,
      experiences: cvInfo.experience,
      skills: cvInfo.skill,
      educations: cvInfo.education,
      activities: cvInfo.activity,
      certifications: cvInfo.certification,
      awards: cvInfo.award,
    };
    await CvAPI.update(cv, userToken.token).then((res) => {
      if (res.status === 200) {
        alert("Change success");
      }
    });
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="p-10">
        <PersonalInfo></PersonalInfo>
        <Experience></Experience>
        <Skills></Skills>
        <Educations></Educations>
        <Activities></Activities>
        <Certifications></Certifications>
        <Awards></Awards>
        <div className="flex fixed bottom-0 w-full bg-white py-4">
          <div className="mr-4">
            <Review></Review>
          </div>
          {isUpdate ? (
            <button
              onClick={updateCV}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
          hover:bg-blue-700 focus:outline-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save change
            </button>
          ) : (
            <Create></Create>
          )}
        </div>
      </div>
      {/* <div className="col-span-1 fixed right-8 top-32">
        <div>
          <button onClick={() => setColor("red")}>red</button>
          <button onClick={() => setColor("#1e88e5")}>blue</button>
          <button onClick={() => setColor("yellow")}>yellow</button>
        </div>
        <PDFViewer color={color}></PDFViewer>
      </div> */}
    </div>
  );
}
