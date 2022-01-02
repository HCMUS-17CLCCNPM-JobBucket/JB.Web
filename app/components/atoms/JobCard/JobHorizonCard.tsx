import { jobAPI } from "app/api/modules/jobAPI";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Badge from "../Badge";
import SaveJobButton from "../Button/SaveJobButton";
import SalaryRange from "../SalaryRange";

export default function JobHorizonCard(props) {
  return (
    <div className="job-horizon-card hover:shadow-lg">
      <div className="job-horizon-card__header">
        <Badge
          content={props.categories.length !== 0 && props.categories[0].name}
        />
        <div className="job-horizon-card__company">
          <a href={"/job/" + props.id} target="_blank" rel="noreferrer">
            <img src={props.imageUrls[0]} alt="Google" />
          </a>
          <div className="flex justify-between w-full">
            <div>
              <a href={"/job/" + props.id} target="_blank" rel="noreferrer">
                <p>
                  {props.title} -{" "}
                  <span className="text-red-500">
                    {props.type !== undefined && props.types[0]}
                  </span>
                </p>
              </a>
              <span className="text-gray-600">
                {props.addresses == null ? "No addresses" : props.addresses[0]}
              </span>
            </div>
            <SalaryRange
              minSalary={props.minSalary}
              maxSalary={props.maxSalary}
            />
          </div>
        </div>
        <div className="job-horizon-card__desc line-clamp">
          Bosch Car Multimedia team is looking for full-time HMI Engineers
          working at Ho Chi Minh City, Vietnam. The CM team develops
          high-quality, state-of-the-art Automotive Head Unit and Home Appliance
          Linux/Android-based systems. Together with other Bosch locations
          worldwide, we provide software solutions for navigation, vehicle
          functions, autonomous driving, camera, and IoT features to the car
          marker.
        </div>

        <div className="flex mt-2">
          {props.skills.map((skill, index) => (
            <Badge key={index} content={skill.name} />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center px-6 py-2 border-t">
        <p>
          Expires in <Moment format="DD/MM/YYYY" date={props.expireDate} />
        </p>

        <SaveJobButton isInterested={props.isJobInterested} jobId={props.id} />
      </div>
    </div>
  );
}
