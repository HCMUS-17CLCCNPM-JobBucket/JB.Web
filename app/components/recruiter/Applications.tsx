import React from "react";
import Select, { StylesConfig } from "react-select";

export default function Applications() {
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
      }),
      control: (provided) => ({
        ...provided,
        borderRadius: "0.5rem",
        border: "1px solid #D1D5DB",
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return { ...provided, opacity, transition };
      },
      placeholder: (provided, state) => ({
        ...provided,
        color: "#9CA3C1",
      }),
    };
  return (
    <div>
      <div className="w-80 mb-4">
        <Select
          styles={customStyles}

          placeholder="Job"
        />
      </div>
      <div className="job-horizon-card hover:shadow-lg mb-4">
        <div className="job-horizon-card__header">
          <div className="job-horizon-card__company">
            <img src="/avatar/avatar.png" alt="Google" />

            <p className="my-auto">Candidate name</p>
          </div>
          <div className="job-horizon-card__desc line-clamp">
            Bosch Car Multimedia team is looking for full-time HMI Engineers
            working at Ho Chi Minh City, Vietnam. The CM team develops
            high-quality, state-of-the-art Automotive Head Unit and Home
            Appliance Linux/Android-based systems. Together with other Bosch
            locations worldwide, we provide software solutions for navigation,
            vehicle functions, autonomous driving, camera, and IoT features to
            the car marker.
          </div>
        </div>
      </div>
      <div className="job-horizon-card hover:shadow-lg mb-4">
        <div className="job-horizon-card__header">
          <div className="job-horizon-card__company">
            <img src="/avatar/avatar.png" alt="Google" />

            <p className="my-auto">Candidate name</p>
          </div>
          <div className="job-horizon-card__desc line-clamp">
            Bosch Car Multimedia team is looking for full-time HMI Engineers
            working at Ho Chi Minh City, Vietnam. The CM team develops
            high-quality, state-of-the-art Automotive Head Unit and Home
            Appliance Linux/Android-based systems. Together with other Bosch
            locations worldwide, we provide software solutions for navigation,
            vehicle functions, autonomous driving, camera, and IoT features to
            the car marker.
          </div>
        </div>
      </div>
      <div className="job-horizon-card hover:shadow-lg mb-4">
        <div className="job-horizon-card__header">
          <div className="job-horizon-card__company">
            <img src="/avatar/avatar.png" alt="Google" />

            <p className="my-auto">Candidate name</p>
          </div>
          <div className="job-horizon-card__desc line-clamp">
            Bosch Car Multimedia team is looking for full-time HMI Engineers
            working at Ho Chi Minh City, Vietnam. The CM team develops
            high-quality, state-of-the-art Automotive Head Unit and Home
            Appliance Linux/Android-based systems. Together with other Bosch
            locations worldwide, we provide software solutions for navigation,
            vehicle functions, autonomous driving, camera, and IoT features to
            the car marker.
          </div>
        </div>
      </div>
    </div>
  );
}
