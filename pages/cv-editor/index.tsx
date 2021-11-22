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
          <Create></Create>
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
