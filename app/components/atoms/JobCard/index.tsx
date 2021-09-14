import React from "react";

export default function JobCard() {
  return (
    <div className="job-card">
      <div className="job-card__company">
        <img
          src="https://cdn.dribbble.com/users/623359/screenshots/13230768/untitled-1-01_4x.png"
          alt="Google"
        />
        <div>
          <p>Google</p>
          <span>5 stars</span>
        </div>
      </div>
      <div className="job-card__title">
        <p>React Dev</p>
        <p>Full time • HCM</p>
      </div>
      <p className="job-card__desc line-clamp">
        Bosch Car Multimedia team is looking for full-time HMI Engineers working
        at Ho Chi Minh City, Vietnam. The CM team develops high-quality,
        state-of-the-art Automotive Head Unit and Home Appliance
        Linux/Android-based systems. Together with other Bosch locations
        worldwide, we provide software solutions for navigation, vehicle
        functions, autonomous driving, camera, and IoT features to the car
        marker.
      </p>
      <div className="job-card__salary">
        <p>$1,000 - $2,000</p>
        <button className="btn btn-primary">Apply Now</button>
      </div>
    </div>
  );
}
