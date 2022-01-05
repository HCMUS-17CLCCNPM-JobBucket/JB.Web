import { jobAPI } from "app/api/modules/jobAPI";
import { orgAPI } from "app/api/modules/organization";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import RatingComponent from "./RatingComponent";

export const getServerSideProps = async ({ params }) => {
  const res = await orgAPI.getById(1);
  if (res.status === 200)
    return { props: { ...res.data.data.organizations[0] } };
  return {
    props: { id: params.id },
  };
};

export default function CompanyCard(props) {
  return (
    <div className="flex w-[850px] border border-gray-200 rounded-lg hover:shadow-lg ease-in-transition">
      <a href={"/company/" + props.id} target="_blank" rel="noreferrer">
        <img
          className="h-40 w-40 rounded-l-lg object-cover"
          src={props.avatarUrl || "/company.png"}
          alt={props.name}
          onClick={() => router.push("/company/" + props.id)}
        />
      </a>
      <div className="relative px-4 py-2 flex-1">
        <div className="">
          <div>
            <a href={"/company/" + props.id} target="_blank" rel="noreferrer">
              {" "}
              <p
                // onClick={() => router.push("/company/" + props.id)}
                className="text-xl font-semibold hover:underline cursor-pointer"
              >
                {props.name}
              </p>
            </a>

            <span className="text-sm">
              {/* {props.addresses == null ? "No addresses" : props.addresses[0]} */}
              {props.address}
            </span>
          </div>
          <div className="absolute top-0 right-10">
            <div className="flex items-center gap-3">
              <RatingComponent
                value={props.rating}
                styles=""
                quiet={true}
                callback={() => {}}
              />
              <p className="text-xl font-semibold">{props.rating.toFixed(1)}</p>
            </div>
            <div className="flex flex-col items-start mt-4 text-gray-600">
              <div className="flex  justify-between max-w-[170px] min-w-[170px]">
                <span className="text-sm">Benefit</span>
                <RatingComponent
                  styles="sub-rating"
                  quiet={true}
                  value={props.ratingBenefit.toFixed(1)}
                  callback={() => {}}
                />
              </div>
              <div className="flex justify-between max-w-[170px] min-w-[170px]">
                <span className="text-sm">Learning</span>
                <RatingComponent
                  styles="sub-rating"
                  quiet={true}
                  value={props.ratingLearning.toFixed(1)}
                  callback={() => {}}
                />
              </div>
              <div className="flex  justify-between max-w-[170px]  min-w-[170px]">
                <span className="text-sm">Culture</span>
                <RatingComponent
                  styles="sub-rating"
                  quiet={true}
                  value={props.ratingCulture.toFixed(1)}
                  callback={() => {}}
                />
              </div>
              <div className="flex  justify-between max-w-[170px]  min-w-[170px]">
                <span className="text-sm">Workspace</span>
                <RatingComponent
                  styles="sub-rating"
                  quiet={true}
                  value={props.ratingWorkspace.toFixed(1)}
                  callback={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-4 line-clamp-3">{props.bio}</div> */}
        <div className="mt-4">
          {/* <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p>{props.address}</p>
          </div> */}
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <p>{props.phoneNumber}</p>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <p>{props.email}</p>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="m12 17 1-2V9.858c1.721-.447 3-2 3-3.858 0-2.206-1.794-4-4-4S8 3.794 8 6c0 1.858 1.279 3.411 3 3.858V15l1 2z"></path>
              <path d="m16.267 10.563-.533 1.928C18.325 13.207 20 14.584 20 16c0 1.892-3.285 4-8 4s-8-2.108-8-4c0-1.416 1.675-2.793 4.267-3.51l-.533-1.928C4.197 11.54 2 13.623 2 16c0 3.364 4.393 6 10 6s10-2.636 10-6c0-2.377-2.197-4.46-5.733-5.437z"></path>
            </svg>
            <p>{props.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
