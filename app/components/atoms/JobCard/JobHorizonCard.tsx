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
            <span>{props.address}</span>
          </div>
        </div>
        <img
          src="bookmark.svg"
          alt="Bookmark"
          className="job-horizon-card__bookmark"
        />
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
