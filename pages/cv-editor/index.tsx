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

export default function CvEditor() {
  const PDFViewer = dynamic(import("app/components/cv/template"), {
    ssr: false,
  });
  const [color, setColor] = useState("#1e88e5");

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
        <div>
          <button onClick={() => setColor("red")}>red</button>
          <button onClick={() => setColor("#1e88e5")}>blue</button>
          <button onClick={() => setColor("yellow")}>yellow</button>
        </div>
        <PDFViewer color={color}></PDFViewer>
      </div>
    </div>
  );
}
