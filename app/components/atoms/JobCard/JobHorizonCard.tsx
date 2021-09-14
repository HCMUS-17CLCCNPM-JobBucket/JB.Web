import React from "react";

export default function JobHorizonCard() {
  return (
    <div className="job-horizon-card">
      <div className="job-horizon-card__company">
        <img
          src="https://cdn.dribbble.com/users/623359/screenshots/13230768/untitled-1-01_4x.png"
          alt="Google"
        />
        <div>
          <p>Frontend Developer</p>
          <span>HCM</span>
        </div>
      </div>
      <img
        src="bookmark.svg"
        alt="Bookmark"
        className="job-horizon-card__bookmark"
      />
      <div className="job-horizon-card__desc line-clamp">
        Bosch Car Multimedia team is looking for full-time HMI Engineers working
        at Ho Chi Minh City, Vietnam. The CM team develops high-quality,
        state-of-the-art Automotive Head Unit and Home Appliance
        Linux/Android-based systems. Together with other Bosch locations
        worldwide, we provide software solutions for navigation, vehicle
        functions, autonomous driving, camera, and IoT features to the car
        marker.
      </div>
    </div>
  );
}
