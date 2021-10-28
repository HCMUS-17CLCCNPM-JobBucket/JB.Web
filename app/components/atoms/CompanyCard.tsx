import { jobAPI } from "app/api/modules/jobAPI";
import { orgAPI } from "app/api/modules/organization";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

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
    <div className="flex border border-gray-200 rounded-lg hover:shadow-lg ease-in-transition">
      <img
        className="h-40 w-40 rounded-l-lg object-cover"
        src={props.avatarUrl}
        alt={props.name}
      />
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <div>
            <p
              onClick={() => router.push("/job/" + props.id)}
              className="text-xl font-semibold"
            >
              {props.name}
            </p>
            <span className="text-sm">
              {/* {props.addresses == null ? "No addresses" : props.addresses[0]} */}
              {props.address}
            </span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="w-full flex items-center border-l border-t border-b text-base 
              font-medium rounded-l-md text-black bg-white hover:bg-gray-100 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 1792 1792"
              >
                <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path>
              </svg>
              Star
            </button>
            <button
              type="button"
              className="w-full border text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2"
            >
              654
            </button>
          </div>
        </div>
        <div className="mt-4 line-clamp-3">{props.bio}</div>
      </div>
    </div>
  );
}
