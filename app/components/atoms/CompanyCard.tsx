import { MoonIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";
import Router from "next/router";
import RatingComponent from "./RatingComponent";

export default function CompanyCard(props) {
  console.log(props);
  return (
    <div
      className="h-[14rem] w-full p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-700 
    flex flex-col ease-linear duration-300 md:flex-row-reverse"
    >
      <div className=" h-full w-full  shadow-md rounded-2xl basis-2/3 relative">
        {/* <div className=" text-white z-10 bg-[#5865F2] absolute pl-8 pr-8 pb-2 pt-2  rounded-tl-2xl rounded-br-2xl font-semibold">
          <h1>FREE</h1>
        </div> */}
        <div className="h-full w-full relative border-2 border-white rounded-2xl">
          <img
            src={props.avatarUrl || "/company.png"}
            alt="thumbnail"
            onClick={() => Router.push("/company/" + props.id)}
            className=" rounded-2xl h-full w-full object-cover"
          />
        </div>
      </div>

      <div className=" h-full w-full mr-2 rounded-2xl flex flex-col">
        {/* <p className="m-2 font-bold pl-1 text-lg text-[#5865F2]">Advanced</p> */}
        <RatingComponent
          value={props.rating}
          styles="sub-rating"
          quiet={true}
          callback={() => {}}
        />
        <div className="h-full flex flex-col justify-between">
          <a
            href={"/company/" + props.id}
            target="_blank"
            rel="noreferrer"
            className="text-2xl font-bold dark:text-white line-clamp-3 hover:text-blue-600"
          >
            {props.name}
          </a>

          <span className="text-sm">
            {props.addresses == null ? "" : props.addresses[0]}
            {/* {props.address} */}
          </span>
        </div>
        {/* <div className=" pt-16 pr-2 pl-2 flex flex-row justify-around flex-wrap">
          <div className="flex flex-row items-center m-2">
            <FaReact size={20} color="#61DBFB" />
            <h1 className="pl-1 dark:text-white">React Native</h1>
          </div>
          <div className="flex flex-row items-center m-2">
            <SiTypescript size={20} color="#007acc" />
            <h1 className="pl-1 dark:text-white">TypeScript</h1>
          </div>
          <div className="flex flex-row items-center m-2">
            <AiOutlineClockCircle size={20} className="dark:text-white" />
            <h1 className="pl-1 dark:text-white">32 Hour</h1>
          </div>
          <div className="flex flex-row items-center m-2">
            <VscChecklist size={20} className="dark:text-white" />
            <h1 className="pl-1 dark:text-white">5 Part</h1>
          </div>
        </div> */}

        {/* <div className="flex flex-row">
          <button className="md:m-2 m-auto mt-8 bg-[#5865F2] shadow-md shadow-[#5865f28a]  pt-2 pb-2 pl-6 pr-4 rounded-xl flex flex-row justify-center items-center hover:bg-[#424bb6] ease-linear duration-300">
            <FaPlay className="animate-ping" size={10} color="#fff" />
            <h1 className="text-white text-md font-semibold pl-2">
              Start Learning Now
            </h1>
          </button>
          <button
            className="md:m-2 m-auto mt-8 bg-[#5865F2] shadow-md shadow-[#5865f28a] p-2.5 rounded-xl flex flex-row justify-center items-center hover:bg-[#424bb6] ease-linear duration-300"
            onClick={() => settoggle(!toggle)}
          >
            {toggle ? (
              <MoonIcon className="h-5 w-5 text-white" />
            ) : (
              <SunIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div> */}
      </div>
    </div>
  );
}

// import { jobAPI } from "app/api/modules/jobAPI";
// import { orgAPI } from "app/api/modules/organization";
// import router from "next/router";
// import React, { useEffect, useState } from "react";
// import Moment from "react-moment";
// import { useSelector } from "react-redux";
// import RatingComponent from "./RatingComponent";

// export const getServerSideProps = async ({ params }) => {
//   const res = await orgAPI.getById(1);
//   if (res.status === 200)
//     return { props: { ...res.data.data.organizations[0] } };
//   return {
//     props: { id: params.id },
//   };
// };

// export default function CompanyCard(props) {
//   return (
//     <div className="flex w-full border border-gray-200 rounded-lg hover:shadow-lg ease-in-transition">
//       <a href={"/company/" + props.id} target="_blank" rel="noreferrer">
//         <img
//           className="h-40 w-40 rounded-l-lg object-cover"
//           src={props.avatarUrl || "/company.png"}
//           alt={props.name}
//           onClick={() => router.push("/company/" + props.id)}
//         />
//       </a>
//       <div className="relative px-4 py-2 flex-1">
//         <div className="">
//           <div>
//             <a href={"/company/" + props.id} target="_blank" rel="noreferrer">
//               {" "}
//               <p
//                 // onClick={() => router.push("/company/" + props.id)}
//                 className="text-xl font-semibold hover:underline cursor-pointer"
//               >
//                 c
//               </p>
//             </a>
//             <RatingComponent
//               value={props.rating}
//               styles="sub-rating"
//               quiet={true}
//               callback={() => {}}
//             />
//             <span className="text-sm">
//               {/* {props.addresses == null ? "No addresses" : props.addresses[0]} */}
//               {props.address}
//             </span>
//           </div>
//           {/* <div className="absolute top-0 right-10">
//             <div className="flex items-center gap-3">
//               <RatingComponent
//                 value={props.rating}
//                 styles=""
//                 quiet={true}
//                 callback={() => {}}
//               />
//               <p className="text-xl font-semibold">{props.rating.toFixed(1)}</p>
//             </div>
//             <div className="flex flex-col items-start mt-4 text-gray-600">
//               <div className="flex  justify-between max-w-[170px] min-w-[170px]">
//                 <span className="text-sm">Benefit</span>
//                 <RatingComponent
//                   styles="sub-rating"
//                   quiet={true}
//                   value={props.ratingBenefit.toFixed(1)}
//                   callback={() => {}}
//                 />
//               </div>
//               <div className="flex justify-between max-w-[170px] min-w-[170px]">
//                 <span className="text-sm">Learning</span>
//                 <RatingComponent
//                   styles="sub-rating"
//                   quiet={true}
//                   value={props.ratingLearning.toFixed(1)}
//                   callback={() => {}}
//                 />
//               </div>
//               <div className="flex  justify-between max-w-[170px]  min-w-[170px]">
//                 <span className="text-sm">Culture</span>
//                 <RatingComponent
//                   styles="sub-rating"
//                   quiet={true}
//                   value={props.ratingCulture.toFixed(1)}
//                   callback={() => {}}
//                 />
//               </div>
//               <div className="flex  justify-between max-w-[170px]  min-w-[170px]">
//                 <span className="text-sm">Workspace</span>
//                 <RatingComponent
//                   styles="sub-rating"
//                   quiet={true}
//                   value={props.ratingWorkspace.toFixed(1)}
//                   callback={() => {}}
//                 />
//               </div>
//             </div>
//           </div> */}
//         </div>
//         {/* <div className="mt-4 line-clamp-3">{props.bio}</div> */}
//         <div className="mt-4">
//           {/* <div className="flex gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-400"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <p>{props.address}</p>
//           </div> */}
//           <div className="flex gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-400"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//             </svg>
//             <p>{props.phoneNumber}</p>
//           </div>
//           <div className="flex gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-400"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//               <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//             </svg>
//             <p>{props.email}</p>
//           </div>
//           <div className="flex gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-400"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="m12 17 1-2V9.858c1.721-.447 3-2 3-3.858 0-2.206-1.794-4-4-4S8 3.794 8 6c0 1.858 1.279 3.411 3 3.858V15l1 2z"></path>
//               <path d="m16.267 10.563-.533 1.928C18.325 13.207 20 14.584 20 16c0 1.892-3.285 4-8 4s-8-2.108-8-4c0-1.416 1.675-2.793 4.267-3.51l-.533-1.928C4.197 11.54 2 13.623 2 16c0 3.364 4.393 6 10 6s10-2.636 10-6c0-2.377-2.197-4.46-5.733-5.437z"></path>
//             </svg>
//             <p>{props.country}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
