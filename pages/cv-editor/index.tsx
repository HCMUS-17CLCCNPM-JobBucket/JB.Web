import dynamic from "next/dynamic";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonalInfo from "app/components/cv/PersonalInfo";
import Experience from "app/components/cv/experience";
import Skills from "app/components/cv/Skills";
import Activities from "app/components/cv/Activities";
import Awards from "app/components/cv/Awards";
import Certifications from "app/components/cv/Certifications";
import Educations from "app/components/cv/Educations";


export default function Home() {
  const PDFViewer = dynamic(import("app/components/cv/template"), {
    ssr: false,
  });
//   const dispatch = useDispatch();
//   const name = useSelector((state: any) => state.cv.name);

  return (
    <div className="grid grid-cols-3 w-full bg-gray-50">
      <div className="col-span-2 p-10">
        <PersonalInfo></PersonalInfo>
        <Experience></Experience>
        <Skills></Skills>
        <Educations></Educations>
        <Activities></Activities>
        <Certifications></Certifications>
        <Awards></Awards>
      </div>
      <div className="col-span-1 fixed right-8 top-32">
        <PDFViewer></PDFViewer>
      </div>
    </div>
  );
}
