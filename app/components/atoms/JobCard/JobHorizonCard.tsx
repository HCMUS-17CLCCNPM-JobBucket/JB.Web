import router from "next/router";
import React from "react";
import Moment from "react-moment";

export default function JobHorizonCard(props) {
  return (
    <div className="job-horizon-card">
      <div className="job-horizon-card__header">
        <div className="job-horizon-card__company">
          <img src={props.imageUrls[0]} alt="Google" />
          <div>
            <p onClick={() => router.push("/job/" + props.id)}>{props.title}</p>
            <span className="text-gray-600">{props.address}</span>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-6 right-6 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <div className="job-horizon-card__desc line-clamp">
          Bosch Car Multimedia team is looking for full-time HMI Engineers
          working at Ho Chi Minh City, Vietnam. The CM team develops
          high-quality, state-of-the-art Automotive Head Unit and Home Appliance
          Linux/Android-based systems. Together with other Bosch locations
          worldwide, we provide software solutions for navigation, vehicle
          functions, autonomous driving, camera, and IoT features to the car
          marker.
        </div>
      </div>
      <div className="job-horizon-card__footer">
        <p>
          Expires in <Moment format="DD/MM/YYYY" date={props.expireDate} />
        </p>
        <p>
          ${props.minSalary} - ${props.maxSalary}
        </p>
      </div>
    </div>
  );
}
