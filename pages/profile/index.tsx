import React from "react";

const Contact = (props) => {
  return (
    <div className="flex gap-2 items-center">
      <img src={props.icon} alt="" className="h-4 w-4" />
      <p className="text-base font-semibold text-gray-600">{props.content}</p>
    </div>
  );
};

const ExperienceCard = (props) => {
  return (
    <div className="flex justify-between border-b-2 border-gray-200 pb-4">
      <div>
        <p className="text-xl font-medium">{props.position}</p>
        <p className="text-sm text-gray-400 hover:underline cursor-pointer">
          {props.company}
        </p>
      </div>
      <div>
        <a
          className="inline-block rounded-full text-black 
            bg-green-200 hover:bg-green-400 duration-300 
            text-sm font-medium 
            mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
            cursor-pointer"
        >
          {props.jobType}
        </a>

        <p className="text-xs text-gray-400">{props.workDate}</p>
      </div>
    </div>
  );
};

export default function Profile() {
  return (
    <div className="flex gap-16 px-16 py-4">
      <div className="sticky top-10 w-1/6 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/384/350/430/digital-art-artwork-cyber-cyberpunk-neon-hd-wallpaper-thumb.jpg"
            alt=""
            className="h-40 w-40 rounded-full object-cover"
          />
          <p className="title-section mt-6 ">John Smith</p>
          <p className="">Frontend Developer</p>
        </div>

        <div className="flex flex-col items-center gap-2 px-4">
          <Contact icon="profile/gmail.svg" content="user@example.com" />
          <hr className="border-t-1 border-gray-200 w-full" />
          <Contact icon="profile/location.svg" content="user@example.com" />
          <hr className="border-t-1 border-gray-200 w-full" />
          <Contact icon="profile/phone.svg" content="user@example.com" />
        </div>

        <button
          type="button"
          className="h-10 p-4 flex justify-center items-center bg-blue-600 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg "
        >
          Download Resume
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-12">
        <div>
          <p className="profile-title">Summary</p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
        </div>
        <div>
          <p className="profile-title">Skills</p>
          <p>ReactJs, NextJs, MongoDB</p>
        </div>
        <div>
          <p className="profile-title">Work Experience</p>
          <div className="flex flex-col gap-4">
            <ExperienceCard
              position="Senior Frontend"
              company="Microsoft"
              jobType="Fulltime"
              workDate="April 12, 2020"
            />
            <ExperienceCard
              position="Senior Frontend"
              company="Microsoft"
              jobType="Fulltime"
              workDate="April 12, 2020"
            />
            <ExperienceCard
              position="Senior Frontend"
              company="Microsoft"
              jobType="Fulltime"
              workDate="April 12, 2020"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="container">
//             <div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50">
//               {/* left */}
//               <div className="flex flex-row-reverse md:contents">
//                 <div className="bg-blue-500 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
//                   <h3 className="font-semibold text-lg mb-1">Lorem ipsum</h3>
//                   <p className="leading-tight text-justify">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Modi, quaerat?
//                   </p>
//                 </div>
//                 <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
//                   <div className="h-full w-6 flex items-center justify-center">
//                     <div className="h-full w-1 bg-blue-800 pointer-events-none" />
//                   </div>
//                   <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow" />
//                 </div>
//               </div>
//               {/* right */}
//               <div className="flex md:contents">
//                 <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
//                   <div className="h-full w-6 flex items-center justify-center">
//                     <div className="h-full w-1 bg-blue-800 pointer-events-none" />
//                   </div>
//                   <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow" />
//                 </div>
//                 <div className="bg-blue-500 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
//                   <h3 className="font-semibold text-lg mb-1">Lorem ipsum</h3>
//                   <p className="leading-tight text-justify">
//                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                     Vitae, facilis.
//                   </p>
//                 </div>
//               </div>
//               {/* left */}
//               <div className="flex flex-row-reverse md:contents">
//                 <div className="bg-blue-500 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
//                   <h3 className="font-semibold text-lg mb-1">Lorem ipsum</h3>
//                   <p className="leading-tight text-justify">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Modi, quaerat?
//                   </p>
//                 </div>
//                 <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
//                   <div className="h-full w-6 flex items-center justify-center">
//                     <div className="h-full w-1 bg-blue-800 pointer-events-none" />
//                   </div>
//                   <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow" />
//                 </div>
//               </div>
//               {/* left */}
//               <div className="flex flex-row-reverse md:contents">
//                 <div className="bg-blue-500 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
//                   <h3 className="font-semibold text-lg mb-1">Lorem ipsum</h3>
//                   <p className="leading-tight text-justify">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Modi, quaerat?
//                   </p>
//                 </div>
//                 <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
//                   <div className="h-full w-6 flex items-center justify-center">
//                     <div className="h-full w-1 bg-blue-800 pointer-events-none" />
//                   </div>
//                   <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow" />
//                 </div>
//               </div>
//               {/* right */}
//               <div className="flex md:contents">
//                 <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
//                   <div className="h-full w-6 flex items-center justify-center">
//                     <div className="h-full w-1 bg-blue-800 pointer-events-none" />
//                   </div>
//                   <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow" />
//                 </div>
//                 <div className="bg-blue-500 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
//                   <h3 className="font-semibold text-lg mb-1">Lorem ipsum</h3>
//                   <p className="leading-tight text-justify">
//                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                     Vitae, facilis.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
