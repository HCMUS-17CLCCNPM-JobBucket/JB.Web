import React from "react";
import SearchJob from "../atoms/SearchJob";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__quote">
        <p className="">
          Get The <span className="hero__quote--highlight"> Right Job</span>
        </p>
        <p>You Deserve</p>
      </div>
      <p className="hero__jobs">
        1,232,120 jobs listed here! Your dream job is waiting
      </p>
      <SearchJob />
    </div>
  );
}
