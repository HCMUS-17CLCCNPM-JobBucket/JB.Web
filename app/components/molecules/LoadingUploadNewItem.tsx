import Lottie from "lottie-web";
import React, { useEffect } from "react";
import Loading from "../atoms/Loading";
import * as UploadAnimation from "app/lotties/upload-file.json";

export default function LoadingUploadNewItem() {
  useEffect(() => {
    Lottie.loadAnimation({
      container: document.querySelector("#react-logo"),
      animationData: UploadAnimation,
    });
  }, []);
  return (
    <div>
      <div className="fixed w-screen h-screen inset-0 z-40 filter bg-white"></div>
      <div className="fixed  w-screen h-screen inset-0 z-50 flex justify-center items-center">
        <div id="react-logo" className="h-[600px] w-[600px]" />
      </div>
    </div>
  );
}
