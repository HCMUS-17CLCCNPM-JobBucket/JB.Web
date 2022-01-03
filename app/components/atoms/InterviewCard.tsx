import React from "react";

export default function InterviewCard() {
  return (
    <div className="w-[800px] rounded-lg flex">
      <div>
        <p className="text-xl font-semibold">interview time</p>
        <div className="flex">
          <img src="" alt="" className="rounded-full h-12 w-12" />
          <img src="" alt="" className="rounded-full h-12 w-12" />
        </div>
      </div>
      <div>
        <p>ten job</p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
          expedita ad asperiores quas architecto quae iste blanditiis vitae nisi
          similique numquam adipisci, laborum sapiente animi sed doloribus.
          Illo, aperiam ad?
        </p>
        <button className="btn btn-primary">Interview</button>
      </div>
    </div>
  );
}
